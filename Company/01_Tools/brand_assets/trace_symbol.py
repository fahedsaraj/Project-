"""Trace the UIA symbol raster (colour + alpha) into a two-colour SVG."""
import sys, numpy as np, potrace
from PIL import Image, ImageFilter

src, mask, out = sys.argv[1:4]
SCALE = 10
im = np.asarray(Image.open(src).convert('RGB')).astype(float)
a = np.asarray(Image.open(mask).convert('L')).astype(float) / 255
gold = np.array([226, 160, 45.]); blue = np.array([41, 86, 108.])
dg = np.linalg.norm(im - gold, axis=2); db = np.linalg.norm(im - blue, axis=2)
wg = db / (dg + db + 1e-9)  # 1 = gold, 0 = blue
layers = {'gold': a * wg, 'blue': a * (1 - wg)}
H, W = a.shape
paths = {}
for name, soft in layers.items():
    img = Image.fromarray((soft * 255).astype(np.uint8))
    img = img.resize((W * SCALE, H * SCALE), Image.BICUBIC).filter(ImageFilter.GaussianBlur(SCALE * 0.6))
    bm = np.asarray(img) > 128  # potracer traces False pixels, hence ~bm below
    tr = potrace.Bitmap(~bm).trace(turdsize=SCALE * SCALE * 2, alphamax=1.0, opticurve=True, opttolerance=0.4)
    d = []
    f = lambda p: f'{p.x / SCALE:.2f} {p.y / SCALE:.2f}'
    for curve in tr:
        d.append('M' + f(curve.start_point))
        for s in curve.segments:
            if s.is_corner:
                d.append('L' + f(s.c) + 'L' + f(s.end_point))
            else:
                d.append('C' + f(s.c1) + ' ' + f(s.c2) + ' ' + f(s.end_point))
        d.append('Z')
    paths[name] = ''.join(d)
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
       f'<path id="gold" fill="#E2A02D" fill-rule="evenodd" d="{paths["gold"]}"/>'
       f'<path id="blue" fill="#29566C" fill-rule="evenodd" d="{paths["blue"]}"/></svg>')
open(out, 'w').write(svg)
print('wrote', out, {k: len(v) for k, v in paths.items()})
