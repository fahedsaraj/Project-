// Roll-up banner 830 x 2000 mm (lobby wayfinding): print PDFs (5 mm bleed + crop marks) in three arrow versions,
// PNG previews and a mockup on the lobby photo. Static Archivo cuts are used so the PDF embeds TrueType, not Type 3.
// Usage: NODE_PATH=$(npm root -g) node rollup_banner.js [lobby-photo.jpg]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/rollup_banner');
const STACKED = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-stacked-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
const W = 830, H = 2000, BLEED = 5, MARGIN = 20; // mm
const FLOOR = 4;
// Arrow drawn in a 100 x 100 box pointing right; rotated per version.
const ARROWS = { up: -90, right: 0, left: 180 };
const arrow = (deg) => `<svg viewBox="0 0 100 100" style="transform:rotate(${deg}deg)"><path d="M8 43h58V22l30 28-30 28V57H8z" fill="#E2A02D"/></svg>`;

const css = `
@font-face{font-family:'Archivo Static';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'Archivo Static';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'Archivo Wide';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'Newsreader';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'Newsreader';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
.art{position:absolute;background:#0B1626;overflow:hidden;color:#fff;font-family:'Archivo Static',sans-serif}
.trim{position:absolute;left:${BLEED}mm;top:${BLEED}mm;width:${W}mm;height:${H}mm}
.abs{position:absolute;left:0;right:0;text-align:center}
.label{font-family:'Archivo Wide',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:#D8DADF}
.serif{font-family:'Newsreader',serif;font-weight:400}
.logo svg{width:100%;height:auto;display:block}
.keyline{position:absolute;left:40mm;right:40mm;top:40mm;bottom:905mm;border:0.6mm solid rgba(216,218,223,.35)}
.prog{display:flex;flex-direction:column;gap:9mm;align-items:center}
.prog .cat{font-size:13mm}
.prog .names{font-weight:600;font-size:44mm;letter-spacing:.04em;line-height:1}
.prog .names span{color:#D8DADF;font-weight:400;margin:0 9mm}
.hair{width:120mm;height:0.6mm;background:rgba(216,218,223,.45);margin:0 auto}
.band{position:absolute;left:-${BLEED}mm;right:-${BLEED}mm;top:1135mm;height:470mm;background:#29566C}
`;

const art = (deg) => `<div class="trim">
  <div class="keyline"></div>
  <div class="abs logo" style="top:150mm;left:205mm;right:205mm">${STACKED}</div>
  <div class="abs serif" style="top:520mm;font-size:34mm;font-style:italic;color:#D8DADF">Shaping Global Minds.</div>
  <div class="hair" style="position:absolute;left:355mm;top:610mm"></div>
  <div class="abs serif" style="top:655mm;font-size:52mm;line-height:1.1">International courses<br>&amp; exam preparation</div>
  <div class="abs" style="top:815mm;display:flex;flex-direction:column;gap:24mm">
    <div class="prog"><div class="label cat">Curriculum</div><div class="names">AP<span>•</span>IB<span>•</span>IGCSE</div></div>
    <div class="prog"><div class="label cat">University admission</div><div class="names">SAT<span>•</span>ACT<span>•</span>EST II</div></div>
    <div class="prog"><div class="label cat">English language</div><div class="names">IELTS<span>•</span>TOEFL</div></div>
  </div>
  <div class="band">
    <div style="position:absolute;left:0;right:0;top:0;height:100%;display:flex;flex-direction:${deg === 180 ? 'row-reverse' : 'row'};align-items:center;justify-content:center;gap:40mm">
      <div style="display:flex;flex-direction:column;align-items:flex-start;gap:6mm">
        <div class="label" style="font-size:20mm;color:#fff">Find us on</div>
        <div style="display:flex;align-items:baseline;gap:14mm">
          <div style="font-family:'Archivo Wide';font-weight:600;font-size:62mm;letter-spacing:.08em">FLOOR</div>
          <div class="serif" style="font-size:250mm;line-height:.8;color:#E2A02D">${FLOOR}</div>
        </div>
      </div>
      <div style="width:150mm;height:150mm">${arrow(deg)}</div>
    </div>
  </div>
  <div class="abs serif" style="top:1650mm;font-size:40mm">Visit us to explore your options.</div>
  <div class="abs label" style="top:1727mm;font-size:14mm">Phone / WhatsApp</div>
  <div class="abs" style="top:1755mm;font-weight:600;font-size:56mm;letter-spacing:.03em">+962 79 055 5890</div>
</div>`;

const doc = (deg, marks) => {
  const PW = W + 2 * BLEED + (marks ? 2 * MARGIN : 0), PH = H + 2 * BLEED + (marks ? 2 * MARGIN : 0), off = marks ? MARGIN : 0, o = off + BLEED;
  const cm = !marks ? '' : `<svg style="position:absolute;inset:0" viewBox="0 0 ${PW} ${PH}" width="${PW}mm" height="${PH}mm" stroke="#000" stroke-width="0.1">${
    [[o, o], [o + W, o], [o, o + H], [o + W, o + H]].flatMap(([x, y]) => {
      const dx = x === o ? -1 : 1, dy = y === o ? -1 : 1;
      return [`<line x1="${x}" y1="${y + dy * (BLEED + 2)}" x2="${x}" y2="${y + dy * (BLEED + 15)}"/>`, `<line x1="${x + dx * (BLEED + 2)}" y1="${y}" x2="${x + dx * (BLEED + 15)}" y2="${y}"/>`];
    }).join('')}</svg>
    <div style="position:absolute;left:${o + 8}mm;bottom:5mm;font:400 8pt 'Archivo Static',sans-serif;color:#000">United International Academy · roll-up banner · trim 830 × 2000 mm · bleed 5 mm · arrow ${Object.keys(ARROWS).find(k => ARROWS[k] === deg)} · Midnight #0B1626 · Academy Blue #29566C · Academy Gold #E2A02D · Platinum #D8DADF · RGB file: match a physical colour sample before production · bottom 150 mm sits in the cassette</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
@page{size:${PW}mm ${PH}mm;margin:0}html,body{width:${PW}mm;height:${PH}mm;background:#fff;overflow:hidden;position:relative}
.art{left:${off}mm;top:${off}mm;width:${W + 2 * BLEED}mm;height:${H + 2 * BLEED}mm}</style></head>
<body><div class="art">${art(deg)}</div>${cm}</body></html>`;
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-rollup-'));
  const browser = await chromium.launch();
  const p = await browser.newPage();
  for (const [name, deg] of Object.entries(ARROWS)) {
    fs.writeFileSync(path.join(tmp, 'b.html'), doc(deg, true));
    await p.goto('file://' + path.join(tmp, 'b.html'));
    await p.evaluate(() => document.fonts.ready);
    const PW = W + 2 * (BLEED + MARGIN), PH = H + 2 * (BLEED + MARGIN);
    await p.pdf({ path: path.join(OUT, `uia-rollup-830x2000mm-arrow-${name}-PRINT.pdf`), width: `${PW}mm`, height: `${PH}mm`, printBackground: true, pageRanges: '1' });
    // Preview at trim size, 1.5 px per mm
    fs.writeFileSync(path.join(tmp, 'b.html'), doc(deg, false));
    await p.setViewportSize({ width: Math.round((W + 2 * BLEED) * 96 / 25.4), height: Math.round((H + 2 * BLEED) * 96 / 25.4) });
    await p.goto('file://' + path.join(tmp, 'b.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(tmp, 'full.png') });
    const px = (mm) => Math.round(mm * 96 / 25.4);
    execFileSync('convert', [path.join(tmp, 'full.png'), '-crop', `${px(W)}x${px(H)}+${px(BLEED)}+${px(BLEED)}`, '+repage',
      '-resize', `${Math.round(W * 1.5)}x${Math.round(H * 1.5)}!`, path.join(OUT, `uia-rollup-preview-arrow-${name}.png`)]);
  }
  await browser.close();

  // Mockup on the lobby photo (corners of the current banner measured on the 1500 x 2000 photo; the bottom runs past the frame).
  const photo = process.argv[2];
  if (photo) {
    const prev = path.join(OUT, 'uia-rollup-preview-arrow-up.png');
    const map = `0,0 266,172 1245,0 1106,182 1245,3000 1020,2210 0,3000 292,2215`;
    execFileSync('convert', [photo, '(', prev, '-alpha', 'set', '-virtual-pixel', 'transparent', '-background', 'none',
      '-distort', 'Perspective', map, '-extent', '1500x2000', ')', '-layers', 'flatten', '-quality', '90', path.join(OUT, 'uia-rollup-mockup.jpg')]);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('roll-up banner written to', OUT);
})();
