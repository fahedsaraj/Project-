// One-page A4 print colour & production spec for printers (values from the brand guidelines, p.13).
// Usage: NODE_PATH=$(npm root -g) node print_spec.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.join(BRAND, 'Print/UIA_Print_Colour_Spec_A4.pdf');
const COLOURS = [ // name, hex, rgb, cmyk, pantone, used on
  ['Midnight', '#0B1626', '11 22 38', '100 80 40 70', '5395 C', 'Sign panel · banner ground'],
  ['Academy Blue', '#29566C', '41 86 108', '85 50 30 25', '7700 C', 'Banner "Floor 4" band'],
  ['Academy Gold', '#E2A02D', '226 160 45', '5 40 90 0', '7409 C', 'Logo gold · sign base line · floor number + arrow'],
  ['Platinum', '#D8DADF', '216 218 223', '14 9 8 0', 'Cool Gray 1 C', 'Banner small text, thin lines'],
  ['White', '#FFFFFF', '255 255 255', '0 0 0 0', '—', 'Logo letters · main text'],
  ['Charcoal', '#26292E', '38 41 46', '70 60 50 70', '433 C', 'Not used on these two jobs'],
  ['Paper', '#F5F4F0', '245 244 240', '3 2 5 0', 'Uncoated white', 'Not used on these two jobs'],
];
const MLOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-full-colour.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@page{size:210mm 297mm;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{width:210mm;height:297mm;padding:14mm 15mm;font:400 8.6pt/1.45 'A',sans-serif;color:#26292E;background:#fff}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:0.4mm solid #E2A02D;padding-bottom:4mm}
.top svg{width:62mm;height:auto;display:block}
h1{font:400 19pt/1.1 'N',serif;color:#0B1626}
h2{font:600 7.5pt 'AW',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#29566C;margin:6mm 0 2.5mm}
table{width:100%;border-collapse:collapse}
td,th{padding:1.8mm 1.5mm;border-bottom:0.2mm solid #D8DADF;text-align:left;vertical-align:middle}
th{font:600 6.8pt 'AW',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#6b6f76}
.sw{width:13mm;height:9mm;border:0.2mm solid #D8DADF}
.v{font-weight:600;white-space:nowrap}
ul{padding-left:4mm}li{margin:0.8mm 0}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:7mm}
.note{margin-top:5mm;padding:3mm 4mm;background:#F5F4F0;border-left:1mm solid #29566C}
.foot{position:absolute;left:15mm;right:15mm;bottom:9mm;font-size:7pt;color:#6b6f76;display:flex;justify-content:space-between}
</style></head><body>
<div class="top"><div><h1>Print colours &amp; production spec</h1><div style="margin-top:1.5mm">Building sign 600 × 250 mm · Roll-up banner 830 × 2000 mm</div></div>${MLOGO}</div>
<h2>Brand colours (UIA Brand Guidelines v1.0, p. 13)</h2>
<table><tr><th></th><th>Colour</th><th>CMYK</th><th>Pantone</th><th>HEX</th><th>RGB</th><th>Used on</th></tr>
${COLOURS.map(([n, h, r, c, p, u]) => `<tr><td><div class="sw" style="background:${h}"></div></td><td class="v">${n}</td><td class="v">${c.split(' ').map((v, i) => 'CMYK'[i] + v).join(' ')}</td><td class="v">${p}</td><td>${h}</td><td style="white-space:nowrap">${r}</td><td>${u}</td></tr>`).join('')}
</table>
<div class="note"><b>Important:</b> the artwork PDFs are built in RGB. When preparing the files, <b>set these exact CMYK values</b> (or the Pantone for spot/vinyl/acrylic matching). Don't rely on automatic RGB→CMYK conversion. The guidelines say the values must be <b>confirmed against a printed proof</b>, so print a colour strip on the final material and send a photo in daylight for approval before the full run.</div>
<div class="cols">
<div><h2>Building sign · 600 × 250 mm</h2><ul>
<li>File: <b>uia-building-sign-600x250mm-PRINT.pdf</b> (3 mm bleed, crop marks) or the exact-size PDF for CNC/laser cutting.</li>
<li>Panel: 5 mm acrylic or 3–4 mm ACP, <b>Midnight</b>, matt or satin finish (no gloss: the lobby has strong window light).</li>
<li>Logo 480 × 108 mm, centred. White + <b>Academy Gold</b>: raised 3 mm acrylic letters, or UV print.</li>
<li>Gold base line: full width, 8 mm, along the bottom edge.</li>
<li>Gold = flat <b>Pantone 7409 C</b> colour. <b>No mirror or chrome gold</b>, no gradients.</li>
<li>Fixing: 4 stand-offs or hidden fixings, positions per installer, clear of the logo.</li></ul></div>
<div><h2>Roll-up banner · 830 × 2000 mm</h2><ul>
<li>Files: <b>uia-rollup-830x2000mm-arrow-up/left/right-PRINT.pdf</b> (5 mm bleed, crop marks). Print one.</li>
<li>Material: 440–510 g matt PVC or 200 µm polyester film (anti-curl, non-glare).</li>
<li>Print ≥ 720 dpi, eco-solvent/latex/UV. Total ink on Midnight ≈ 290%: within large-format limits. Keep it rich, not grey.</li>
<li>Stand: standard 85 × 200 cm roll-up (visible 83 cm). Bottom 150 mm sits in the cassette, top 30 mm in the rail; nothing important is placed there.</li>
<li>Thin lines are Platinum at reduced strength and must stay visible but subtle.</li></ul></div>
</div>
<h2>Never</h2>
<ul><li>Redraw, retype, stretch, rotate or recolour the logo. Use only the supplied files.</li><li>Change the phone number: <b>+962 79 055 5890</b>.</li><li>Add effects (shadow, glow, bevel) or put the logo on a busy background.</li></ul>
<div class="foot"><span>United International Academy · Shaping Global Minds.</span><span>Lens · 7 Oct 2026 · questions: +962 79 055 5890</span></div>
</body></html>`;

(async () => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-spec-'));
  fs.writeFileSync(path.join(tmp, 's.html'), html);
  const browser = await chromium.launch();
  const p = await browser.newPage();
  await p.goto('file://' + path.join(tmp, 's.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: OUT, width: '210mm', height: '297mm', printBackground: true });
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('wrote', OUT);
})();
