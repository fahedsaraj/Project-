// Digital SAT class schedule: post (1080x1350) + story (1080x1920). Light "Paper" layout with a week strip,
// as a visual contrast to the dark AP schedule. Data from Fahed (10 Oct 2026). Edit DAYS / SESSIONS and re-run.
// Usage: NODE_PATH=$(npm root -g) node sat_schedule.js
const { chromium } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_SAT_schedule');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-full-colour.svg'), 'utf8')
  .replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg style="height:100%;width:auto;display:block" ');

const WEEK = [['SAT', 'السبت'], ['SUN', 'الأحد'], ['MON', 'الاثنين'], ['TUE', 'الثلاثاء'], ['WED', 'الأربعاء'], ['THU', 'الخميس'], ['FRI', 'الجمعة']];
const DAYS = ['SUN', 'TUE', 'THU'];
const SESSIONS = [
  { en: 'Math', ar: 'الرياضيات', time: '5:00', bg: '#29566C' },
  { en: 'English', sub: 'Reading & Writing', ar: 'الإنجليزي · القراءة والكتابة', time: '6:30', bg: '#0B1626' },
];

const css = (W, H) => `
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
@font-face{font-family:'AR';font-weight:700;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-700-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:#F5F4F0;color:#26292E;font-family:'A',sans-serif;position:relative}
.ar{font-family:'AR','A';direction:rtl}
.lbl{white-space:nowrap;font-family:'AW';font-weight:600;letter-spacing:.2em;font-size:22px;color:#29566C}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(41,86,108,.13) 2px,transparent 2px);background-size:36px 36px;
  -webkit-mask-image:linear-gradient(160deg,#000 0%,transparent 45%)}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column}
h1{white-space:nowrap;font-family:'N',serif;font-weight:400;font-size:112px;line-height:1;color:#0B1626;letter-spacing:-.01em}
h1 i{color:#E2A02D}
.week{display:flex;gap:12px}
.d{flex:1;border-radius:22px;text-align:center;padding:18px 0 16px;border:2px dashed rgba(41,86,108,.25);color:rgba(38,41,46,.38)}
.d b{display:block;font-family:'AW';font-weight:600;font-size:24px;letter-spacing:.14em}
.d span{display:block;font-family:'AR';font-weight:600;font-size:20px;margin-top:6px}
.d.on{background:#0B1626;border:2px solid #0B1626;color:#fff;position:relative}
.d.on span{color:#D8DADF}
.d.on:after{content:'';position:absolute;left:50%;bottom:-11px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:#E2A02D;border:5px solid #F5F4F0}
.card{border-radius:36px;color:#fff;display:flex;align-items:center;padding:0 52px;position:relative;overflow:hidden}
.card .t{font-family:'A';font-weight:600;line-height:1;white-space:nowrap}
.card .t small{font-size:.32em;letter-spacing:.08em;margin-left:8px;color:#D8DADF}
.card .bar{width:6px;align-self:stretch;margin:44px 40px;background:#E2A02D;border-radius:3px}
.card .n{flex:1}
.card .en{font-family:'A';font-weight:600}
.card .sub{font-family:'N';font-style:italic;color:#D8DADF}
.card .arl{font-family:'AR','A';font-weight:600;color:#D8DADF;direction:rtl;text-align:left}
.card .days{position:absolute;right:44px;bottom:26px;font-family:'AW';font-weight:600;font-size:18px;letter-spacing:.18em;color:#E2A02D}
.foot{display:flex;align-items:flex-end;justify-content:space-between}
.ph{font-family:'A';font-weight:600;font-size:46px;color:#0B1626;margin-top:8px;text-align:right}
`;
const weekHTML = () => `<div class="week">${WEEK.map(([e, a]) => `<div class="d ${DAYS.includes(e) ? 'on' : ''}"><b>${e}</b><span>${a}</span></div>`).join('')}</div>`;
const cards = (h, fs) => SESSIONS.map((s) => `<div class="card" style="background:${s.bg};height:${h}px">
  <div class="days">SUN · TUE · THU</div>
  <div class="t" style="font-size:${fs}px">${s.time}<small>PM</small></div><div class="bar"></div>
  <div class="n"><div class="en" style="font-size:${fs * .42}px">${s.en}</div>${s.sub ? `<div class="sub" style="font-size:${fs * .26}px;margin-top:4px">${s.sub}</div>` : ''}
  <div class="arl" style="font-size:${fs * .25}px;margin-top:8px">${s.ar}</div></div></div>`).join('');

const post = () => `<div class="dots"></div><div class="wrap" style="padding:76px 84px 70px">
  <div class="lbl">COURSE SCHEDULE · <span class="ar" style="unicode-bidi:isolate;letter-spacing:0;font-size:26px">جدول الدورة</span></div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px">
    <h1>Digital <i>SAT</i></h1>
    <div class="ar" style="white-space:nowrap;font-weight:700;font-size:40px;color:#0B1626;padding-bottom:16px">دورة الـ SAT الرقمي</div></div>
  <div style="margin-top:52px">${weekHTML()}</div>
  <div style="display:flex;flex-direction:column;gap:22px;margin-top:52px">${cards(280, 116)}</div>
  <div class="ar" style="font-weight:600;font-size:30px;color:#29566C;margin-top:30px;text-align:center">
    ثلاث أيام بالأسبوع · الرياضيات <span style="font-family:'A'" dir="ltr">5:00</span> ثم الإنجليزي <span style="font-family:'A'" dir="ltr">6:30</span> مساءً</div>
  <div style="flex:1"></div>
  <div class="foot"><div style="height:74px">${LOGO}</div>
    <div><div class="lbl" style="text-align:right;font-size:18px">REGISTER · CALL OR WHATSAPP</div><div class="ph">+962 79 055 5890</div></div></div></div>`;

const story = () => `<div class="dots"></div><div class="wrap" style="padding:260px 76px 360px">
  <div class="lbl" style="text-align:center">COURSE SCHEDULE · <span class="ar" style="unicode-bidi:isolate;letter-spacing:0;font-size:26px">جدول الدورة</span></div>
  <h1 style="text-align:center;font-size:150px;margin-top:20px">Digital <i>SAT</i></h1>
  <div class="ar" style="font-weight:700;font-size:50px;color:#0B1626;text-align:center;margin-top:14px">دورة الـ SAT الرقمي</div>
  <div style="margin-top:60px">${weekHTML()}</div>
  <div style="display:flex;flex-direction:column;gap:24px;margin-top:60px">${cards(262, 116)}</div>
  <div style="flex:1"></div>
  <div style="display:flex;flex-direction:column;align-items:center;margin-top:50px"><div style="height:84px">${LOGO}</div>
    <div class="lbl" style="margin-top:30px">REGISTER · CALL OR WHATSAPP</div><div class="ph" style="text-align:center">+962 79 055 5890</div></div></div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sat-sched-'));
  const b = await chromium.launch();
  for (const [name, W, H, body] of [['UIA_Digital-SAT_schedule_post_1080x1350.png', 1080, 1350, post()], ['UIA_Digital-SAT_schedule_story_1080x1920.png', 1080, 1920, story()]]) {
    fs.writeFileSync(path.join(tmp, 'a.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css(W, H)}</style></head><body>${body}</body></html>`);
    const p = await b.newPage({ viewport: { width: W, height: H } });
    await p.goto('file://' + path.join(tmp, 'a.html')); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, name) }); await p.close(); console.log(name);
  }
  await b.close();
})();
