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


// Illustrated student (flat, brand colours; clearly a drawing, not a real student). Props change per hint.
const PROPS = {
  '01': `<g class="card c1"><rect x="262" y="40" width="110" height="96" rx="18" fill="#fff" stroke="#D8DADF" stroke-width="3"/><text x="317" y="112" text-anchor="middle" font-family="N" font-size="74" fill="#29566C">?</text></g>
         <g class="card c2"><rect x="28" y="70" width="92" height="64" rx="14" fill="#29566C"/><path d="M52 88v30M52 88h34l-8 9 8 9H52" stroke="#E2A02D" stroke-width="5" stroke-linejoin="round" fill="none"/></g>`,
  '02': `<g class="card c1"><rect x="250" y="34" width="130" height="112" rx="18" fill="#fff" stroke="#D8DADF" stroke-width="3"/><path d="M268 130V52M268 130h96" stroke="#D8DADF" stroke-width="3"/><path d="M272 122L360 60" stroke="#29566C" stroke-width="5" stroke-linecap="round"/><path d="M272 70Q318 150 360 104" stroke="#0B1626" stroke-width="5" fill="none" stroke-linecap="round"/><circle class="dot" cx="319" cy="89" r="9" fill="#E2A02D"/></g>
         <g class="card c2"><rect x="30" y="76" width="92" height="56" rx="14" fill="#29566C"/><text x="76" y="113" text-anchor="middle" font-family="A" font-weight="600" font-size="24" fill="#fff">y = x</text></g>`,
  '03': `<g class="card c1"><rect x="252" y="36" width="126" height="112" rx="18" fill="#fff" stroke="#D8DADF" stroke-width="3"/><path d="M272 64h86M272 82h86M272 100h62M272 118h74" stroke="#D8DADF" stroke-width="7" stroke-linecap="round"/><path d="M272 82h52" stroke="#E2A02D" stroke-width="7" stroke-linecap="round"/></g>
         <g class="card c2"><circle cx="72" cy="104" r="30" fill="#fff" stroke="#29566C" stroke-width="6"/><path d="M94 126l22 22" stroke="#29566C" stroke-width="9" stroke-linecap="round"/></g>`,
};
const student = (n) => `<svg viewBox="0 0 400 400" class="kid">
  <defs><clipPath id="disc"><circle cx="200" cy="215" r="170"/></clipPath></defs>
  <circle cx="200" cy="215" r="170" fill="#E9E6DD"/>
  <g clip-path="url(#disc)">
  <path d="M96 400Q100 296 200 286Q300 296 304 400Z" fill="#29566C"/>
  <path d="M168 288Q200 318 232 288" stroke="#1f4559" stroke-width="6" fill="none"/>
  <rect x="186" y="246" width="28" height="40" fill="#C98B67"/>
  <circle cx="146" cy="214" r="10" fill="#C98B67"/><circle cx="254" cy="214" r="10" fill="#C98B67"/>
  <ellipse cx="200" cy="208" rx="54" ry="62" fill="#D69C78"/>
  <path d="M144 206Q140 136 200 132Q262 134 256 206Q248 172 214 164Q178 178 146 204Z" fill="#26292E"/>
  <g class="eyes"><circle cx="181" cy="214" r="5" fill="#26292E"/><circle cx="219" cy="214" r="5" fill="#26292E"/></g>
  <path d="M187 240Q200 252 213 240" stroke="#8a4f3a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="112" y="318" width="176" height="96" rx="12" fill="#0B1626"/>
  <text x="200" y="374" text-anchor="middle" font-family="AW" font-weight="600" font-size="22" letter-spacing="4" fill="#E2A02D">SAT</text>
  <circle cx="122" cy="322" r="15" fill="#D69C78"/><circle cx="278" cy="322" r="15" fill="#D69C78"/>
  </g>
  ${PROPS[n]}
</svg>`;

const page = (h, anim = false) => `<!doctype html><html><head><meta charset="utf-8"><style>
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
.hero{display:flex;justify-content:space-between;align-items:flex-end;margin-top:26px}
.num{font-family:'N';font-size:200px;line-height:.9;color:#E2A02D;letter-spacing:-.02em}
.kid{width:330px;height:330px;display:block}
${anim ? `.card{animation:bob 3s ease-in-out infinite}.c2{animation-delay:-1.5s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.eyes{transform-origin:200px 214px;animation:blink 4s infinite}
@keyframes blink{0%,46%,50%,100%{transform:scaleY(1)}48%{transform:scaleY(.1)}}
.dot{transform-origin:319px 89px;animation:pulse 1.5s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}` : ''}
h1{font-family:'N',serif;font-weight:400;font-size:76px;line-height:1.04;margin-top:10px;max-width:880px;text-wrap:balance}
.arh{font-family:'AR','A';font-weight:600;font-size:42px;direction:rtl;text-align:right;margin-top:12px;color:#29566C}
.why{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:30px;padding-top:24px;border-top:1.5px solid #D8DADF}
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
  <div class="hero"><div class="num">${h.n}</div>${student(h.n)}</div>
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
  // Animated versions (6 s, 30 fps): scrub CSS animations frame by frame, encode with ffmpeg.
  const { execFileSync } = require('child_process');
  for (const h of HINTS) {
    fs.writeFileSync(path.join(tmp, 'h.html'), page(h, true));
    await p.goto('file://' + path.join(tmp, 'h.html'));
    await p.evaluate(() => document.fonts.ready);
    const fdir = fs.mkdtempSync(path.join(tmp, 'f'));
    for (let f = 0; f < 180; f++) {
      await p.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), f * 1000 / 30);
      await p.screenshot({ path: path.join(fdir, `${String(f).padStart(4, '0')}.png`) });
    }
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '30', '-i', path.join(fdir, '%04d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', path.join(OUT, `UIA_SAT-hint-${h.n}_animated_1080x1350.mp4`)]);
  }
  await b.close();
  console.log('written to', OUT);
})();
