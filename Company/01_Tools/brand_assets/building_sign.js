// Building directory sign, 600 x 250 mm: reversed horizontal logo on Midnight with a gold base line
// (signage rule in the guidelines: fascia = horizontal reversed on Midnight, gold base line).
// Writes a vector PDF at trim size, a PDF with 3 mm bleed, a PNG preview and a mockup on the lobby photo.
// Usage: NODE_PATH=$(npm root -g) node building_sign.js [lobby-photo.jpg]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/building_sign');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
const W = 600, H = 250, LOGO_W = 480, BASE = 8; // mm. Logo 480 x 108 mm; clear space x (UNITED cap height) = 34 mm.

const html = (bleed) => `<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${W + 2 * bleed}mm ${H + 2 * bleed}mm;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W + 2 * bleed}mm;height:${H + 2 * bleed}mm;background:#0B1626;overflow:hidden}
.trim{position:absolute;left:${bleed}mm;top:${bleed}mm;width:${W}mm;height:${H}mm}
.logo{position:absolute;left:50%;top:${(H - BASE) / 2}mm;width:${LOGO_W}mm;transform:translate(-50%,-50%)}
.logo svg{width:100%;height:auto;display:block}
.base{position:absolute;left:-${bleed}mm;right:-${bleed}mm;bottom:-${bleed}mm;height:${BASE + bleed}mm;background:#E2A02D}
</style></head><body><div class="trim"><div class="logo">${LOGO}</div><div class="base"></div></div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-sign-'));
  const browser = await chromium.launch();
  const p = await browser.newPage();
  for (const [bleed, name] of [[0, 'uia-building-sign-600x250mm.pdf'], [3, 'uia-building-sign-600x250mm-bleed3mm.pdf']]) {
    fs.writeFileSync(path.join(tmp, 's.html'), html(bleed));
    await p.goto('file://' + path.join(tmp, 's.html'));
    await p.pdf({ path: path.join(OUT, name), width: `${W + 2 * bleed}mm`, height: `${H + 2 * bleed}mm`, printBackground: true, pageRanges: '1' });
  }
  // Preview PNG, 4 px per mm (2400 x 1000)
  fs.writeFileSync(path.join(tmp, 's.html'), html(0));
  await p.setViewportSize({ width: Math.round(W * 96 / 25.4), height: Math.round(H * 96 / 25.4) });
  await p.goto('file://' + path.join(tmp, 's.html'));
  const preview = path.join(OUT, 'uia-building-sign-preview.png');
  await p.screenshot({ path: path.join(tmp, 'p.png') });
  await browser.close();
  execFileSync('convert', [path.join(tmp, 'p.png'), '-resize', '2400x1000!', preview]);

  // Mockup: place the sign over the old panel on the lobby wall (corners measured on the 2000 x 1500 photo).
  const photo = process.argv[2];
  if (photo) {
    const [tl, tr] = [[1157, 532], [1313, 577]];
    const len = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]) * H / W; // keep the 600:250 proportion
    const bl = [tl[0] + 0.073 * len, tl[1] + 0.997 * len], br = [tr[0] + 0.2 * len, tr[1] + 0.98 * len];
    const map = [[0, 0, tl], [2400, 0, tr], [2400, 1000, br], [0, 1000, bl]].map(([x, y, q]) => `${x},${y} ${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');
    execFileSync('convert', [photo, '(', preview, '-alpha', 'set', '-virtual-pixel', 'transparent', '-background', 'none',
      '-distort', 'Perspective', map, '-extent', '2000x1500', ')', '-layers', 'flatten', '-quality', '90', path.join(OUT, 'uia-building-sign-mockup.jpg')]);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('building sign written to', OUT);
})();
