// Student-feedback thank-you Story (1080x1920). The student's message is re-typeset (no screenshot, no name/photo:
// students are minors), the teacher is thanked with her campaign cut-out.
// Usage: NODE_PATH=$(npm root -g) node feedback_story.js
const { chromium } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_Feedback_Ms_Sara');
const PHOTO = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_AP_campaign/photos/cutouts/07_sara-abd-el-raheem.png');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8')
  .replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg style="height:100%;width:auto;display:block" ');
const QUOTE_EN = 'Thank you, Miss, because everything you taught us actually came in the exam. Inshallah high marks!';
const QUOTE_AR = 'شكراً مس، لأنه كل اللي علّمتينا إياه إجا بالامتحان. إن شاء الله علامات عالية!';

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
@font-face{font-family:'AR';font-weight:700;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-700-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{background:#0B1626;color:#fff;font-family:'A',sans-serif;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(60% 30% at 50% 36%,#1f4258 0%,rgba(11,22,38,0) 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(216,218,223,.04) 2px,transparent 2px),linear-gradient(90deg,rgba(216,218,223,.04) 2px,transparent 2px);background-size:90px 90px}
.ar{font-family:'AR','A';direction:rtl}
.lbl{font-family:'AW';font-weight:600;letter-spacing:.2em;color:#D8DADF;white-space:nowrap}
.wrap{position:absolute;inset:0;padding:250px 80px 330px;display:flex;flex-direction:column;align-items:center;text-align:center}
.bubble{position:relative;width:100%;background:#F5F4F0;color:#0B1626;border-radius:44px 44px 44px 12px;padding:54px 60px 48px;text-align:left;box-shadow:0 30px 60px rgba(0,0,0,.35)}
.bubble .q{position:absolute;top:-58px;left:44px;font-family:'N';font-size:220px;line-height:1;color:#E2A02D}
.bubble .en{font-family:'N';font-size:50px;line-height:1.3}
.bubble .en b{font-weight:400;background:linear-gradient(transparent 62%,rgba(226,160,45,.45) 62%)}
.bubble .arq{font-family:'AR','A';font-weight:600;font-size:32px;color:#29566C;direction:rtl;text-align:right;margin-top:24px;line-height:1.6}
.from{display:flex;align-items:center;gap:16px;margin-top:22px;align-self:flex-start;margin-left:8px}
.from i{width:52px;height:52px;border-radius:50%;background:#29566C;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:'AW';font-size:20px;color:#D8DADF}
.from span{font-family:'A';font-size:26px;color:#D8DADF}
.thanks{position:relative;width:100%;margin-top:30px;display:flex;align-items:flex-end;gap:30px}
.ph{position:relative;width:360px;height:440px;flex:none}
.ph .ring{position:absolute;left:10px;right:10px;bottom:0;height:340px;border-radius:200px 200px 40px 40px;background:#29566C;border:6px solid #E2A02D}
.ph img{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);height:430px;width:auto;border-radius:0 0 34px 34px}
.tx{flex:1;text-align:right;padding-bottom:20px}
</style></head><body><div class="glow"></div><div class="grid"></div>
<div class="wrap">
  <div class="lbl" style="font-size:26px">STUDENT FEEDBACK · <span class="ar" style="unicode-bidi:isolate;letter-spacing:0;font-size:30px">من رسائل طلابنا</span></div>
  <div class="ar" style="font-weight:700;font-size:74px;margin-top:22px;margin-bottom:76px">لما تعب الأستاذ يبان بالامتحان</div>
  <div class="bubble"><div class="q">“</div>
    <div class="en">Thank you, Miss, because <b>everything you taught us actually came</b> in the exam. Inshallah high marks! 💕</div>
    <div class="arq">${QUOTE_AR}</div></div>
  <div class="from"><i>✦</i><span>— one of our students</span></div>
  <div class="thanks">
    <div class="tx">
      <div class="lbl" style="font-size:22px;color:#E2A02D">THANK YOU</div>
      <div class="ar" style="font-weight:700;font-size:54px;margin-top:10px;line-height:1.3">شكراً للأستاذة</div>
      <div class="ar" style="font-weight:700;font-size:66px;color:#E2A02D;line-height:1.3">سارة عبد الرحيم</div>
      <div style="font-family:'N';font-style:italic;font-size:36px;color:#D8DADF;margin-top:8px">Ms. Sara Abd El Raheem</div>
      <div class="ar" style="font-weight:600;font-size:28px;color:#D8DADF;margin-top:16px">على تعبك وإخلاصك مع طلابنا 🤍</div>
    </div>
    <div class="ph"><div class="ring"></div><img src="file://${PHOTO}"></div>
  </div>
  <div style="flex:1"></div>
  <div style="height:62px;margin-top:30px">${LOGO}</div>
</div></body></html>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fb-story-'));
  fs.writeFileSync(path.join(tmp, 'a.html'), html);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(tmp, 'a.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, 'UIA_feedback_Ms-Sara_story_1080x1920.png') }); await b.close(); console.log('ok');
})();
