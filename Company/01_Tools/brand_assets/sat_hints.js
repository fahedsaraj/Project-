// "SAT Hint" series: one practical, accurate Digital SAT tip per post (1080x1350), light Paper template.
// Tips rely only on the official test format (no-penalty scoring, built-in Desmos, one question per R&W passage, Bluebook tools).
// Usage: NODE_PATH=$(npm root -g) node sat_hints.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_SAT_hints');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-full-colour.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');

const HINTS = [
  { n: '01', area: 'Whole test', areaAr: 'كل الامتحان',
    en: 'Never leave a question blank.', ar: 'لا تترك أي سؤال بدون إجابة.',
    why: 'The SAT has no penalty for wrong answers. A blank scores nothing; a smart guess might score.',
    whyAr: 'ما في خصم على الإجابة الغلط. السؤال الفاضي علامته صفر، والتخمين الذكي ممكن يجيب علامة.',
    pro: 'Stuck? Eliminate what you can, pick an answer, flag it in Bluebook, and come back if time allows.',
    proAr: 'علقت؟ استبعد الخيارات الغلط، اختار إجابة، علّم السؤال بـ Bluebook، وارجعله إذا ضل وقت.' },
  { n: '02', area: 'Math', areaAr: 'الرياضيات',
    en: 'Let Desmos do the heavy lifting.', ar: 'خلّي Desmos يشتغل عنك.',
    why: 'The Desmos graphing calculator is built into every Math question. Graphing is often faster than solving by hand.',
    whyAr: 'آلة Desmos موجودة داخل الامتحان بكل أسئلة الرياضيات، والرسم أحياناً أسرع من الحل اليدوي.',
    pro: 'Type each side of an equation as its own graph. Where they cross is your solution.',
    proAr: 'اكتب كل طرف من المعادلة كرسم لحاله. نقطة التقاطع هي الحل.' },
  { n: '03', area: 'Reading and Writing', areaAr: 'القراءة والكتابة',
    en: 'Read the question before the passage.', ar: 'اقرأ السؤال قبل النص.',
    why: 'Every Reading and Writing question has its own short passage. Knowing the task first tells you what to look for.',
    whyAr: 'كل سؤال بالقراءة والكتابة إله نص قصير خاص فيه. لما تعرف المطلوب أول، بتعرف شو تدوّر.',
    pro: 'Spot the task (main idea, evidence, grammar, transition), then read the passage with that one goal.',
    proAr: 'حدّد نوع السؤال (فكرة رئيسية، دليل، قواعد، ربط)، وبعدين اقرأ النص وإنت عارف هدفك.' },
];

const page = (h) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'AR','A';font-weight:400;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-400-arabic.woff2')}
@font-face{font-family:'AR','A';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#F5F4F0;color:#0B1626;font-family:'A',sans-serif;overflow:hidden;position:relative}
.pad{position:absolute;inset:80px 84px 70px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center}
.label{font-family:'AW';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:20px;color:#29566C}
.label .ar{font-family:'AR','A';letter-spacing:0;font-size:22px}
.area{font-size:19px;color:#26292E;border:1.5px solid #D8DADF;border-radius:999px;padding:8px 18px;background:#fff}
.area .ar{font-family:'AR','A';margin-left:8px;color:#29566C}
.num{font-family:'N';font-size:200px;line-height:.9;color:#E2A02D;margin-top:40px;letter-spacing:-.02em}
h1{font-family:'N',serif;font-weight:400;font-size:80px;line-height:1.04;margin-top:14px;max-width:880px;text-wrap:balance}
.arh{font-family:'AR','A';font-weight:600;font-size:44px;direction:rtl;text-align:right;margin-top:18px;color:#29566C}
.why{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:40px;padding-top:30px;border-top:1.5px solid #D8DADF}
.why .k{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:15px;color:#29566C;margin-bottom:10px}
.why p{font-size:25px;line-height:1.42;color:#26292E}
.why .rtl{direction:rtl;text-align:right}
.why .rtl p{font-family:'AR','A';font-size:25px;line-height:1.6}
.pro{margin-top:auto;background:#0B1626;color:#fff;border-radius:22px;padding:30px 34px}
.pro .k{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:15px;color:#D8DADF}
.pro .k .ar{font-family:'AR','A';letter-spacing:0;font-size:18px}
.pro p{font-size:27px;line-height:1.38;margin-top:10px}
.pro .par{font-family:'AR','A';direction:rtl;text-align:right;font-size:25px;line-height:1.55;color:#D8DADF;margin-top:12px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:34px}
.logo{width:300px}.logo svg{width:100%;height:auto;display:block}
.contact{text-align:right}
.contact .l{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:14px;color:#29566C;text-transform:uppercase}
.contact .n{font-weight:600;font-size:32px;margin-top:6px}
</style></head><body><div class="pad">
  <div class="top"><div class="label">SAT hint · <span class="ar" dir="rtl" style="unicode-bidi:isolate">نصيحة SAT</span></div><div class="area">${h.area}<span class="ar">${h.areaAr}</span></div></div>
  <div class="num">${h.n}</div>
  <h1>${h.en}</h1>
  <div class="arh">${h.ar}</div>
  <div class="why"><div><div class="k">WHY IT WORKS</div><p>${h.why}</p></div><div class="rtl"><div class="k" style="font-family:'AR','A';letter-spacing:0;font-size:18px">ليش بتنفع؟</div><p>${h.whyAr}</p></div></div>
  <div class="pro"><div class="k">PRO MOVE · <span class="ar" dir="rtl" style="unicode-bidi:isolate">جرّبها</span></div><p>${h.pro}</p><div class="par">${h.proAr}</div></div>
  <div class="foot"><div class="logo">${LOGO}</div><div class="contact"><div class="l">Digital SAT prep · Call or WhatsApp</div><div class="n">+962 79 055 5890</div></div></div>
</div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-hint-'));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const h of HINTS) {
    fs.writeFileSync(path.join(tmp, 'h.html'), page(h));
    await p.goto('file://' + path.join(tmp, 'h.html'));
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const e = document.querySelector('.pad'); return e.scrollHeight - e.clientHeight; });
    if (over > 0) console.warn(`hint ${h.n}: overflows by ${over}px`);
    await p.screenshot({ path: path.join(OUT, `UIA_SAT-hint-${h.n}_1080x1350.png`) });
  }
  await b.close();
  console.log('written to', OUT);
})();
