// "The Digital SAT, decoded": exam-anatomy post (1080x1350) + story (1080x1920).
// Exam facts are College Board's public Digital SAT structure; teachers are from our 19/28 Sep 2026 SAT posts.
// No dates, prices or score promises. Usage: NODE_PATH=$(npm root -g) node sat_post.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const CUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_AP_campaign/photos/cutouts');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_SAT_decoded');
const LOGO_H = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');

const SECTIONS = [ // name, arabic, questions per module, minutes per module
  ['Reading and Writing', 'القراءة والكتابة', 27, 32],
  ['Math', 'الرياضيات', 22, 35],
];
const TEACHERS = [
  ['Ms. Sara Abd El Raheem', 'Reading and Writing', '07_sara-abd-el-raheem.png'],
  ['Mr. Naseem Al Labadi', 'Math', '05_naseem-al-labadi.png'],
];

const css = (story) => `
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR','A';font-weight:400;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-400-arabic.woff2')}
@font-face{font-family:'AR','A';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:${story ? 1920 : 1350}px;background:#0B1626;color:#fff;font-family:'A',sans-serif;overflow:hidden;position:relative}
.pad{position:absolute;left:84px;right:84px;top:${story ? 230 : 76}px;bottom:${story ? 300 : 70}px;display:flex;flex-direction:column}
.label{font-family:'AW';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:20px;color:#D8DADF}
.label .ar{font-family:'AR','A';letter-spacing:0;font-size:22px}
h1{font-family:'N',serif;font-weight:400;font-size:70px;line-height:1.06;margin-top:16px}
h1 em{color:#E2A02D}
.sub{font-family:'AR','A';font-weight:600;font-size:${story ? 34 : 30}px;direction:rtl;text-align:left;margin-top:12px;color:#D8DADF}
.sect{margin-top:${story ? 40 : 28}px;display:grid;grid-template-columns:1fr;gap:${story ? 22 : 16}px}
.row{display:grid;grid-template-columns:286px 190px 1fr;align-items:center;gap:0;border-top:1.5px solid rgba(216,218,223,.18);padding-top:${story ? 20 : 14}px}
.sname{font-weight:600;font-size:28px;line-height:1.15}
.sname .ar{display:block;font-family:'AR','A';font-weight:400;font-size:22px;color:#D8DADF;margin-top:4px}
.sname .q{display:block;font-size:16px;color:#8fa6b3;margin-top:8px;font-weight:400}
.m1{height:104px;border-radius:16px;background:#29566C;display:flex;flex-direction:column;align-items:center;justify-content:center}
.m .t{font-family:'AW';font-weight:600;font-size:14px;letter-spacing:.16em;color:#D8DADF}
.m .v{font-weight:600;font-size:24px;margin-top:4px}
.branch{position:relative;height:160px}
.branch svg{position:absolute;left:0;top:5px;width:70px;height:150px}
.m2{position:absolute;left:70px;right:0;height:66px;border-radius:14px;border:1.5px solid rgba(216,218,223,.45);display:flex;align-items:center;justify-content:space-between;padding:0 18px}
.m2 .v{font-size:20px;margin:0}
.m2.hi{top:0}.m2.lo{bottom:0}
.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:${story ? 40 : 26}px}
.fact{border:1.5px solid rgba(216,218,223,.25);border-radius:14px;padding:18px 16px 16px}
.fact .k{font-weight:600;font-size:28px}
.fact .d{font-size:16px;color:#D8DADF;margin-top:4px;line-height:1.3}
.teach{margin-top:auto;display:flex;align-items:center;gap:22px}
.teach .lead{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:15px;color:#D8DADF;width:130px;line-height:1.5}
.tc{display:flex;align-items:center;gap:14px;flex:1}
.ph{width:${story ? 150 : 132}px;height:${story ? 150 : 132}px;border-radius:50%;background:radial-gradient(circle at 50% 60%,#326a85,#29566C);overflow:hidden;flex:none}
.ph img{width:100%;height:100%;object-fit:cover;object-position:top center}
.tn{font-family:'N';font-size:${story ? 32 : 29}px;line-height:1.1}
.tr{font-size:16px;color:#D8DADF;margin-top:4px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:${story ? 50 : 30}px;padding-top:24px;border-top:1.5px solid rgba(216,218,223,.22)}
.logo{width:300px}.logo svg{width:100%;height:auto;display:block}
.contact{text-align:right}
.contact .l{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:14px;color:#D8DADF;text-transform:uppercase}
.contact .n{font-weight:600;font-size:32px;margin-top:6px}
`;
const branchSvg = '<svg viewBox="0 0 70 150" fill="none" stroke="#D8DADF" stroke-width="2" stroke-linecap="round"><path d="M0 75H24M24 75C40 75 40 31 62 31M24 75C40 75 40 119 62 119" opacity=".6"/><path d="M56 25l7 6-7 6M56 113l7 6-7 6" opacity=".6"/></svg>';

const body = (story) => `<div class="pad">
  <div class="label">Digital SAT · <span class="ar" dir="rtl" style="unicode-bidi:isolate">الـSAT الرقمي</span></div>
  <h1>Two sections. Four modules.<br>One <em>adaptive</em> test.</h1>
  <div class="sub">افهم الامتحان… قبل ما تقدّمه.</div>
  <div class="sect">${SECTIONS.map(([n, ar, q, m]) => `<div class="row">
    <div class="sname">${n}<span class="ar">${ar}</span><span class="q">${q} questions · ${m} min per module</span></div>
    <div class="m m1"><div class="t">MODULE 1</div><div class="v">Everyone</div></div>
    <div class="branch">${branchSvg}<div class="m m2 hi"><span class="t">MODULE 2</span><span class="v">Harder</span></div><div class="m m2 lo"><span class="t">MODULE 2</span><span class="v">Easier</span></div></div>
  </div>`).join('')}</div>
  <div style="font-size:18px;color:#8fa6b3;margin-top:14px">How you do in Module 1 decides which Module 2 you get.</div><div dir="rtl" style="font-family:'AR','A';font-size:19px;color:#8fa6b3;margin-top:4px;text-align:right">أداءك بالجزء الأول بيحدّد مستوى الجزء الثاني.</div>
  <div class="facts">
    <div class="fact"><div class="k">400–1600</div><div class="d">Total score<br>(200–800 per section)</div></div>
    <div class="fact"><div class="k">2 h 14 min</div><div class="d">Testing time,<br>plus a short break</div></div>
    <div class="fact"><div class="k">Desmos</div><div class="d">Calculator built in<br>for all of Math</div></div>
    <div class="fact"><div class="k">Bluebook</div><div class="d">College Board's<br>testing app</div></div>
  </div>
  <div class="teach"><div class="lead">PREPARE<br>WITH</div>
    ${TEACHERS.map(([n, r, f]) => `<div class="tc"><div class="ph"><img src="file://${path.join(CUT, f)}"></div><div><div class="tn">${n}</div><div class="tr">${r}</div></div></div>`).join('')}
  </div>
  <div class="foot"><div class="logo">${LOGO_H}</div><div class="contact"><div class="l">Call or WhatsApp</div><div class="n">+962 79 055 5890</div></div></div>
</div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-sat-'));
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [name, story] of [['UIA_Digital-SAT-decoded_post_1080x1350.png', false], ['UIA_Digital-SAT-decoded_story_1080x1920.png', true]]) {
    fs.writeFileSync(path.join(tmp, 's.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css(story)}</style></head><body>${body(story)}</body></html>`);
    await p.setViewportSize({ width: 1080, height: story ? 1920 : 1350 });
    await p.goto('file://' + path.join(tmp, 's.html'));
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const e = document.querySelector('.pad'); return e.scrollHeight - e.clientHeight; });
    if (over > 0) console.warn(`${name}: overflows by ${over}px`);
    await p.screenshot({ path: path.join(OUT, name) });
  }
  await b.close();
  console.log('written to', OUT);
})();
