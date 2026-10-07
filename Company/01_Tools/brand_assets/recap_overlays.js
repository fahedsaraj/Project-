// Transparent on-screen text overlays (1080x1920) for the celebration recap reel.
// Drop them over the footage in any on-device editor. Usage: NODE_PATH=$(npm root -g) node recap_overlays.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/reveal_pack/recap-reel');
const LINES = [
  ['1-revealed', 'كشفنا اسمنا الجديد مع طلابنا.', 'We revealed our new name with our students.'],
  ['2-same-team', 'نفس الفريق. نفس الأساتذة.', 'Same team. Same teachers.'],
  ['3-vision', 'اسم جديد، ورؤية أكبر.', 'A new name. A bigger vision.'],
  ['4-thanks', 'شكراً إنكم احتفلتوا معنا.', 'Thank you for celebrating with us.'],
];

const page = (ar, en) => `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('file://${BRAND}/Fonts/fonts-local.css');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;background:transparent;overflow:hidden}
/* Midnight shade behind the text only, kept inside the Instagram safe zone (clear of the caption and buttons) */
.band{position:absolute;left:0;right:0;top:1080px;height:600px;background:linear-gradient(to bottom,rgba(11,22,38,0),rgba(11,22,38,.78) 30%,rgba(11,22,38,.78) 75%,rgba(11,22,38,0))}
.t{position:absolute;left:92px;right:150px;top:1200px;display:flex;flex-direction:column;gap:22px}
.ar{font-family:'IBM Plex Sans Arabic',sans-serif;direction:rtl;font-weight:600;font-size:76px;line-height:1.3;color:#fff;text-wrap:balance}
.en{font-family:'Newsreader',serif;font-size:64px;line-height:1.12;color:#D8DADF;text-wrap:balance}
</style></head><body><div class="band"></div><div class="t"><div class="ar">${ar}</div><div class="en">${en}</div></div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-ov-'));
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, ar, en] of LINES) {
    const f = path.join(tmp, 'o.html');
    fs.writeFileSync(f, page(ar, en));
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, `overlay-${name}.png`), omitBackground: true });
  }
  await browser.close();
  console.log('wrote', LINES.length, 'overlays to', OUT);
})();
