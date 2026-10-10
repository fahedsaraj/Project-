"""Cut teachers out of their photo backgrounds (local rembg model, nothing uploaded) and trim to the person.
Mild clean-up only: auto-level, slight sharpening for the low-quality scan (04). No face retouching.
Usage: python3 make_cutouts.py"""
import pathlib
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
from rembg import remove, new_session

HERE = pathlib.Path(__file__).parent
session = new_session('isnet-general-use')
PORTRAIT = {'10'}  # chair behind the person: the portrait model keeps only the person
portrait = None
KEEP = {'07': 0.70, '08': 0.40}
PRECROP = {'10': (500, 1150, 2560, 3440)}  # seated photo: keep the person above the desk, drop the shelf edges
for src in sorted((HERE / 'originals').iterdir()):
    im = Image.open(src)
    if im.mode in ('RGBA', 'LA', 'P'):  # already-cut photos: put them on white first so the model sees a clean background
        im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, 'white'); bg.alpha_composite(im); im = bg
    im = im.convert('RGB')
    if src.stem[:2] in PRECROP: im = im.crop(PRECROP[src.stem[:2]])
    if (HERE / 'cutouts' / (src.stem + '.png')).exists() and '--all' not in __import__('sys').argv: continue  # only new photos
    if src.stem.startswith('04_'):  # photographed print: lift contrast/clarity a little, reduce noise
        im = im.filter(ImageFilter.MedianFilter(3))
        im = ImageOps.autocontrast(im, cutoff=0.5)
        im = ImageEnhance.Sharpness(im).enhance(1.6)
        im = ImageEnhance.Color(im).enhance(1.05)
    if src.stem[:2] in PORTRAIT:
        portrait = portrait or new_session('birefnet-portrait')
    cut = remove(im, session=portrait if src.stem[:2] in PORTRAIT else session, post_process_mask=True)
    # Pull the edge in (removes white fringe from the original backgrounds), then soften it by a hair.
    a = cut.getchannel('A').point(lambda v: 255 if v > 128 else 0)
    a = a.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))  # 'opening': removes specks and hairline debris on the edge
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    cut.putalpha(a)
    cut = cut.crop(cut.getbbox())
    keep = KEEP.get(src.stem[:2], 1.0)  # full-length photos: keep head-to-waist so all posts are framed alike
    cut = cut.crop((0, 0, cut.width, int(cut.height * keep)))
    cut.save(HERE / 'cutouts' / (src.stem + '.png'))
    print(src.stem, cut.size)
