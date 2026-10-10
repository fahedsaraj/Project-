"""Swap every RGB fill/stroke colour in a PDF for the brand's CMYK values (Brand Guidelines p.13).
Only exact brand colours are mapped; anything else stops the script, so nothing is guessed.
Optional: --size W H (pt, the original page size; Chromium rounds pages up to whole px, so the extra sliver at the
right/bottom is cropped back off) and --trim-offset T --bleed-offset B (pt from the page edge) and --trim-size TW TH (pt) to set TrimBox/BleedBox.
Usage: python3 rgb_to_cmyk_pdf.py in.pdf out.pdf [--size W H] [--trim-offset T --bleed-offset B --trim-size TW TH]"""
import re, sys
import pikepdf

BRAND = {  # RGB 0-255 -> CMYK 0-100
    (11, 22, 38): (100, 80, 40, 70),    # Midnight
    (41, 86, 108): (85, 50, 30, 25),    # Academy Blue
    (226, 160, 45): (5, 40, 90, 0),     # Academy Gold
    (216, 218, 223): (14, 9, 8, 0),     # Platinum
    (38, 41, 46): (70, 60, 50, 70),     # Charcoal
    (245, 244, 240): (3, 2, 5, 0),      # Paper
    (255, 255, 255): (0, 0, 0, 0),      # White
    (0, 0, 0): (0, 0, 0, 100),          # crop marks / slug: black only
}
NUM = r'(-?\d*\.?\d+)'
OPS = re.compile(rf'{NUM}\s+{NUM}\s+{NUM}\s+(rg|RG)\b'.encode())
# Chrome writes colours as "/CSn cs r g b sc(n)"; normalise those first.
CS_OPS = re.compile(rf'/\w+\s+(cs|CS)\s+{NUM}\s+{NUM}\s+{NUM}\s+(scn|SCN|sc|SC)\b'.encode())

def cmyk(r, g, b, stroke):
    key = tuple(round(float(v) * 255) for v in (r, g, b))
    best = min(BRAND, key=lambda k: sum((a - c) ** 2 for a, c in zip(k, key)))
    if sum((a - c) ** 2 for a, c in zip(best, key)) > 12:
        sys.exit(f'unmapped colour {key}: not a brand colour, stopping')
    c, m, y, k = (v / 100 for v in BRAND[best])
    return f'{c:g} {m:g} {y:g} {k:g} {"K" if stroke else "k"}'.encode()

def convert(data):
    data = CS_OPS.sub(lambda mo: cmyk(mo.group(2), mo.group(3), mo.group(4), mo.group(1) == b'CS'), data)
    return OPS.sub(lambda mo: cmyk(mo.group(1), mo.group(2), mo.group(3), mo.group(4) == b'RG'), data)

def walk(obj, seen):
    """Rewrite content streams of pages and of any Form XObjects / tiling patterns they use."""
    for name in ('/XObject', '/Pattern'):
        res = obj.get('/Resources', {}).get(name, {}) if hasattr(obj, 'get') else {}
        for _, x in (res.items() if res else []):
            if x.objgen in seen: continue
            seen.add(x.objgen)
            if x.get('/Subtype') == '/Form' or x.get('/PatternType') == 1:
                x.write(convert(x.read_bytes())); walk(x, seen)

args = sys.argv[3:]
opt = lambda k, n=1: [float(v) for v in args[args.index(k) + 1:args.index(k) + 1 + n]] if k in args else None
pdf = pikepdf.open(sys.argv[1])
for page in pdf.pages:
    page.contents_coalesce()
    page.Contents.write(convert(page.Contents.read_bytes()))
    walk(page.obj, set())
for page in pdf.pages:
    x0, y0, x1, y1 = [float(v) for v in page.MediaBox]
    if opt('--size', 2):
        w, h = opt('--size', 2)
        x0, y0, x1, y1 = x0, y1 - h, x0 + w, y1  # Chromium content hangs from the top-left
        page.MediaBox = pikepdf.Array([x0, y0, x1, y1]); page.CropBox = page.MediaBox
    # Boxes are anchored to the top-left (where the artwork and crop marks are placed) and sized from --trim-size.
    if opt('--trim-offset') and opt('--trim-size', 2):
        tw, th = opt('--trim-size', 2); t = opt('--trim-offset')[0]; b = opt('--bleed-offset')[0]; bl = t - b
        page.obj['/TrimBox'] = pikepdf.Array([x0 + t, y1 - t - th, x0 + t + tw, y1 - t])
        page.obj['/BleedBox'] = pikepdf.Array([x0 + b, y1 - t - th - bl, x0 + t + tw + bl, y1 - b])
left = [m for p in pdf.pages for m in re.findall(rb'\b(rg|RG|scn|SCN)\b', p.Contents.read_bytes())]
pdf.save(sys.argv[2])
print('converted', sys.argv[2], '| leftover RGB ops on page:', len(left))
