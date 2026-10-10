// AP class schedule as a branded post (1080x1350) and story (1080x1920).
// Data from the academic team's schedule PDF (9 Oct 2026). Edit SCHEDULE and re-run when times change.
// Usage: NODE_PATH=$(npm root -g) node ap_schedule.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_AP_schedule');
const SYMBOL = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-symbol-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');

// Week runs Saturday → Friday. Times are as given on the schedule (all PM).
const SCHEDULE = [
  ['Sciences', [
    ['AP Biology', [['Sat', '2:00'], ['Thu', '5:30'], ['Fri', '1:30']]],
    ['AP Chemistry', [['Mon', '6:30'], ['Wed', '6:30']]],
    ['AP Computer Science Principles', [['Sat', '12:00'], ['Tue', '3:30']]],
  ]],
  ['Mathematics', [
    ['AP Calculus', [['Sat', '2:00'], ['Tue', '5:00']]],
    ['AP Precalculus', [['Sun', '6:30'], ['Tue', '6:30'], ['Thu', '6:30']]],
  ]],
  ['Humanities & social sciences', [
    ['AP English Language', [['Sun', '3:00'], ['Tue', '3:00'], ['Thu', '3:00']]],
    ['AP World History', [['Sat', '3:30'], ['Mon', '3:30']]],
    ['AP Psychology', [['Sun', '7:00'], ['Tue', '7:00'], ['Thu', '4:00']]],
    ['AP Macroeconomics', [['Sun', '4:00'], ['Tue', '3:30']]],
  ]],
];

const page = (w, h, story) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:#0B1626;color:#fff;font-family:'A',sans-serif;overflow:hidden;position:relative}
.pad{position:absolute;left:84px;right:84px;top:${story ? 220 : 72}px;bottom:${story ? 300 : 72}px;display:flex;flex-direction:column}
.label{font-family:'AW';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:21px;color:#D8DADF}
h1{font-family:'N',serif;font-weight:400;font-size:${story ? 92 : 80}px;line-height:1.02;margin-top:14px}
h1 b{font-weight:400;color:#E2A02D}
.ar{font-family:'AR',sans-serif;direction:rtl;text-align:right;font-size:${story ? 40 : 34}px;margin-top:${story ? 14 : 6}px;color:#D8DADF}
.grp{font-family:'AW';font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:16px;color:#8fa6b3;margin:${story ? 22 : 18}px 0 ${story ? 6 : 4}px}
.row{display:flex;align-items:center;justify-content:space-between;padding:${story ? 13 : 11}px 0;border-top:1.5px solid rgba(216,218,223,.16)}
.subj{font-weight:600;font-size:${story ? 30 : 27}px;letter-spacing:.005em;max-width:420px;line-height:1.15}
.slots{display:flex;gap:10px}
.slot{width:${story ? 150 : 142}px;padding:${story ? 10 : 8}px 0;border-radius:10px;background:#29566C;text-align:center}
.slot .d{font-family:'AW';font-weight:600;font-size:15px;letter-spacing:.16em;color:#D8DADF;text-transform:uppercase}
.slot .t{font-weight:600;font-size:${story ? 27 : 25}px;margin-top:2px}
.slot .t small{font-size:.6em;font-weight:400;margin-left:3px;color:#D8DADF}
.foot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between}
.sym{width:${story ? 110 : 96}px}.sym svg{width:100%;height:auto;display:block}
.contact{text-align:right}
.contact .l{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:16px;color:#D8DADF;text-transform:uppercase}
.contact .n{font-weight:600;font-size:${story ? 40 : 34}px;margin-top:6px;letter-spacing:.02em}
.note{font-size:17px;color:#8fa6b3;margin-top:${story ? 22 : 12}px}
</style></head><body><div class="pad">
<div class="label">Weekly class schedule · جدول الحصص الأسبوعي</div>
<h1><b>AP</b> classes</h1>
<div class="ar">مواعيد حصص الـ AP</div>
${SCHEDULE.map(([g, rows]) => `<div class="grp">${g}</div>` + rows.map(([s, slots]) => `<div class="row"><div class="subj">${s}</div><div class="slots">${
  slots.map(([d, t]) => `<div class="slot"><div class="d">${d}</div><div class="t">${t}<small>PM</small></div></div>`).join('')}</div></div>`).join('')).join('')}
<div class="note">Saturday to Friday · All times in Amman time</div>
<div class="foot"><div class="sym">${SYMBOL}</div>
<div class="contact"><div class="l">Register · Call or WhatsApp</div><div class="n">+962 79 055 5890</div></div></div>
</div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-ap-'));
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [name, w, h, story] of [['uia-ap-schedule-post-1080x1350.png', 1080, 1350, false], ['uia-ap-schedule-story-1080x1920.png', 1080, 1920, true]]) {
    fs.writeFileSync(path.join(tmp, 'a.html'), page(w, h, story));
    await p.setViewportSize({ width: w, height: h });
    await p.goto('file://' + path.join(tmp, 'a.html'));
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const pad = document.querySelector('.pad'); return pad.scrollHeight - pad.clientHeight; });
    if (over > 0) console.warn(`${name}: content overflows by ${over}px`);
    await p.screenshot({ path: path.join(OUT, name) });
  }
  await b.close();
  console.log('written to', OUT);
})();
