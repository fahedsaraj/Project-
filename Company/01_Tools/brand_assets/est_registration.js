// EST II registration-open offer: post (1080x1350) + story/WhatsApp status (1080x1920). Coupon/ticket layout.
// Data from Fahed (10 Oct 2026): classes start Sat 17 Oct 2026; 30% off when registering before that Saturday.
// Usage: NODE_PATH=$(npm root -g) node est_registration.js
const { chromium } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_EST_registration');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8')
  .replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg style="height:100%;width:auto;display:block" ');
const START = { ar: 'السبت 17 تشرين الأول', en: 'Saturday 17 October 2026' };

const css = (W, H) => `
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
@font-face{font-family:'AR';font-weight:700;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-700-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:#0B1626;color:#fff;font-family:'A',sans-serif;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(55% 35% at 50% 52%,#1f4258 0%,rgba(11,22,38,0) 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(216,218,223,.045) 2px,transparent 2px),linear-gradient(90deg,rgba(216,218,223,.045) 2px,transparent 2px);background-size:90px 90px}
.stripe{position:absolute;width:240px;top:-300px;bottom:-300px;background:#E2A02D;transform:skewX(-14deg);opacity:.95}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center}
.ar{font-family:'AR','A';direction:rtl}
.lbl{font-family:'AW';font-weight:600;letter-spacing:.2em;color:#D8DADF;white-space:nowrap}
.open{display:inline-flex;align-items:center;gap:16px;border:3px solid rgba(216,218,223,.45);border-radius:999px;padding:12px 30px}
.open i{width:16px;height:16px;border-radius:50%;background:#E2A02D;box-shadow:0 0 0 8px rgba(226,160,45,.22)}
.pill{display:inline-block;background:#29566C;font-family:'AW';font-weight:600;letter-spacing:.06em;border-radius:28px}
.ticket{position:relative;width:100%;background:#F5F4F0;color:#0B1626;border-radius:40px;display:flex;overflow:hidden}
.ticket .l{flex:1.25;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ticket .r{flex:1;background:#E2A02D;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}
.ticket .cut{position:absolute;left:calc(55.5% - 22px);width:44px;height:44px;border-radius:50%;background:#0B1626}
.ticket .perf{position:absolute;left:55.5%;top:40px;bottom:40px;border-left:4px dashed rgba(11,22,38,.35)}
.big{font-family:'A';font-weight:600;line-height:.85;letter-spacing:-.02em}
.big sup{font-size:.45em;vertical-align:.75em;margin-left:4px}
.k{font-family:'AW';font-weight:600;letter-spacing:.16em;color:#29566C}
.ph{font-family:'A';font-weight:600;white-space:nowrap}
`;
const ticket = (h, s) => `<div class="ticket" style="height:${h}px">
  <div class="l" style="padding:0 30px">
    <div class="k" style="font-size:${18 * s}px">CLASSES START</div>
    <div class="ar" style="font-weight:700;font-size:${30 * s}px;margin-top:${10 * s}px">تبدأ الحصص</div>
    <div class="ar" style="font-weight:700;font-size:${44 * s}px;color:#0B1626;margin-top:${6 * s}px;white-space:nowrap">${START.ar}</div>
    <div style="font-family:'N';font-style:italic;font-size:${28 * s}px;color:#29566C;margin-top:${6 * s}px;white-space:nowrap">${START.en}</div>
  </div>
  <div class="perf"></div><div class="cut" style="top:-22px"></div><div class="cut" style="bottom:-22px"></div>
  <div class="r">
    <div class="ar" style="font-weight:700;font-size:${26 * s}px">خصم</div>
    <div class="big" style="font-size:${150 * s}px">30<sup>%</sup></div>
    <div class="k" style="font-size:${18 * s}px;color:#0B1626;margin-top:${10 * s}px">OFF</div>
  </div></div>`;
const body = (st) => {
  const s = st ? 1.22 : 1.1;
  return `<div class="glow"></div><div class="grid"></div>
  <div class="stripe" style="left:${st ? 930 : 940}px;top:-300px;height:${st ? 520 : 420}px;bottom:auto"></div>
  <div class="stripe" style="left:${st ? 1000 : 1010}px;width:18px;top:-300px;height:${st ? 560 : 460}px;bottom:auto"></div>
  <div class="wrap" style="padding:${st ? '270px 70px 330px' : '70px 84px 64px'}">
    <div class="ar" style="font-weight:600;font-size:${30 * s}px;color:#D8DADF">طلابنا وأهالينا الأعزاء</div>
    <div class="open" style="margin-top:${26 * s}px"><i></i><span class="lbl" style="font-size:${22 * s}px;color:#fff">REGISTRATION OPEN</span></div>
    <div class="ar" style="font-weight:700;font-size:${92 * s}px;line-height:1.25;margin-top:${24 * s}px">باب التسجيل مفتوح</div>
    <div style="display:flex;align-items:center;gap:${24 * s}px;margin-top:${12 * s}px">
      <span class="ar" style="font-weight:700;font-size:${54 * s}px;color:#D8DADF">لمواد</span>
      <span class="pill" style="font-size:${64 * s}px;padding:${4 * s}px ${36 * s}px;color:#fff">EST II</span></div>
    <div style="width:100%;margin-top:${st ? 50 : 64}px">${ticket(st ? 430 : 400, s)}</div>
    <div class="ar" style="font-weight:700;font-size:${38 * s}px;margin-top:${st ? 50 : 52}px">سجّل قبل يوم السبت واحصل على <span style="color:#E2A02D">خصم <span dir="ltr" style="unicode-bidi:isolate;font-family:'A'">30%</span></span></div>
    <div style="font-family:'N';font-style:italic;font-size:${30 * s}px;color:#D8DADF;margin-top:${8 * s}px">Register before Saturday 17 October and save 30%.</div>
    <div style="flex:1"></div>
    ${st ? `<div style="height:76px;margin-top:50px">${LOGO}</div><div class="lbl" style="font-size:22px;margin-top:34px">CALL OR WHATSAPP</div><div class="ph" style="font-size:56px;margin-top:6px">+962 79 055 5890</div>`
    : `<div style="width:100%;display:flex;justify-content:space-between;align-items:flex-end;text-align:left">
      <div style="height:64px">${LOGO}</div>
      <div style="text-align:right"><div class="lbl" style="font-size:18px">CALL OR WHATSAPP</div><div class="ph" style="font-size:44px;margin-top:6px">+962 79 055 5890</div></div></div>`}
  </div>`;
};
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'est-reg-'));
  const b = await chromium.launch();
  for (const [name, W, H, st] of [['UIA_EST-II_registration_post_1080x1350.png', 1080, 1350, false], ['UIA_EST-II_registration_story_whatsapp_1080x1920.png', 1080, 1920, true]]) {
    fs.writeFileSync(path.join(tmp, 'a.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css(W, H)}</style></head><body>${body(st)}</body></html>`);
    const p = await b.newPage({ viewport: { width: W, height: H } });
    await p.goto('file://' + path.join(tmp, 'a.html')); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, name) }); await p.close(); console.log(name);
  }
  await b.close();
})();
