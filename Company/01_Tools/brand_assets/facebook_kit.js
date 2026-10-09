// Facebook page kit: cover 1640x624 (v2, with programmes + location + phone) and the profile picture copy.
// All content sits in the centre 1100 px, which is what phones show (they crop the sides).
// Usage: NODE_PATH=$(npm root -g) node facebook_kit.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/facebook_kit');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1640px;height:624px;background:#0B1626;color:#fff;font-family:'A',sans-serif;overflow:hidden;position:relative}
.c{position:absolute;left:270px;right:270px;top:0;bottom:10px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.logo{width:560px}.logo svg{width:100%;height:auto;display:block}
.tag{font-family:'N',serif;font-style:italic;font-size:40px;color:#D8DADF;margin-top:22px}
.hair{width:90px;height:2px;background:rgba(216,218,223,.45);margin:30px 0 26px}
.prog{font-family:'AW';font-weight:600;font-size:23px;letter-spacing:.14em;color:#fff;white-space:nowrap}
.prog span{color:#D8DADF;font-weight:400;margin:0 .45em}
.info{font-size:21px;color:#D8DADF;margin-top:16px;letter-spacing:.02em}
.info b{font-weight:600;color:#fff}
.base{position:absolute;left:0;right:0;bottom:0;height:10px;background:#E2A02D}
</style></head><body>
<div class="c">
  <div class="logo">${LOGO}</div>
  <div class="tag">Shaping Global Minds.</div>
  <div class="hair"></div>
  <div class="prog">AP<span>·</span>IB<span>·</span>IGCSE<span>·</span>SAT<span>·</span>ACT<span>·</span>EST II<span>·</span>IELTS<span>·</span>TOEFL</div>
  <div class="info">Floor 4 · Khalda, Amman · <b>+962 79 055 5890</b></div>
</div>
<div class="base"></div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1640, height: 624 } });
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'uia-fb-')), 'c.html'); // file:// page so local fonts load
  fs.writeFileSync(tmp, html);
  await p.goto('file://' + tmp);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, 'uia-facebook-cover-1640x624.png') });
  await b.close();
  fs.copyFileSync(path.join(BRAND, 'Logo/Social/uia-avatar-midnight-1080.png'), path.join(OUT, 'uia-facebook-profile-1080.png'));
  console.log('facebook kit written to', OUT);
})();
