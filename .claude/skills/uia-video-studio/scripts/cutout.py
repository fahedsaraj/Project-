"""Cut a person out of a photo with a local rembg model (nothing is uploaded) and trim to the subject.
Usage: python3 cutout.py in.jpg out.png [--portrait] [--keep 0.7] [--enhance]
  --portrait  use birefnet-portrait (drops chairs/props behind the person; slower)
  --keep F    keep the top fraction F of the subject (e.g. 0.7 = head to waist) so a set of people frame alike
  --enhance   light clean-up for low-quality/photographed prints (denoise, auto-level, sharpen). No face retouching.
First run downloads the model from GitHub releases (Hugging Face is blocked here)."""
import sys
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
from rembg import remove, new_session

a = sys.argv[1:]; src, out = a[0], a[1]
keep = float(a[a.index('--keep') + 1]) if '--keep' in a else 1.0
im = Image.open(src); im = ImageOps.exif_transpose(im)
if im.mode in ('RGBA', 'LA', 'P'):  # already-cut photos: flatten on white so the model sees a clean background
    im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, 'white'); bg.alpha_composite(im); im = bg
im = im.convert('RGB')
if '--enhance' in a:
    im = ImageEnhance.Sharpness(ImageOps.autocontrast(im.filter(ImageFilter.MedianFilter(3)), cutoff=0.5)).enhance(1.6)
cut = remove(im, session=new_session('birefnet-portrait' if '--portrait' in a else 'isnet-general-use'), post_process_mask=True)
al = cut.getchannel('A').point(lambda v: 255 if v > 128 else 0)
al = al.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))   # opening: removes specks/hairline debris
al = al.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))  # pull edge in (kills white fringe), soften
cut.putalpha(al); cut = cut.crop(cut.getbbox())
cut = cut.crop((0, 0, cut.width, int(cut.height * keep)))
cut.save(out); print(out, cut.size)
