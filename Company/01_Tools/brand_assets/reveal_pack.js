// Render the transition/reveal design pack (stories, posts, FAQ carousel, covers) as PNG.
// Usage: NODE_PATH=$(npm root -g) node reveal_pack.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/reveal_pack');
const svg = (f) => fs.readFileSync(path.join(BRAND, 'Logo/SVG', f), 'utf8').replace(/<title>.*?<\/title>/, '');
const SYMBOL = svg('uia-logo-symbol-reversed.svg');
const STACKED = svg('uia-logo-stacked-reversed.svg');
const HORIZONTAL = svg('uia-logo-horizontal-reversed.svg');
const PHONE = '+962 79 055 5890';

const CSS = `
@import url('file://${BRAND}/Fonts/fonts-local.css');
:root{--midnight:#0B1626;--blue:#29566C;--gold:#E2A02D;--platinum:#D8DADF;--paper:#F5F4F0;--charcoal:#26292E}
*{margin:0;padding:0;box-sizing:border-box}
body{width:var(--w);height:var(--h);background:var(--midnight);color:#fff;font-family:'Archivo',sans-serif;overflow:hidden;position:relative}
.pad{position:absolute;inset:var(--m);display:flex;flex-direction:column}
.label{font-weight:600;font-stretch:125%;letter-spacing:.18em;text-transform:uppercase;font-size:var(--label);color:var(--platinum)}
.serif{font-family:'Newsreader',serif;font-weight:400;line-height:1.08}
.ar{font-family:'IBM Plex Sans Arabic',sans-serif;direction:rtl;line-height:1.35}
.gold{color:var(--gold)}
.rule{width:120px;height:4px;background:var(--gold)}
.sym{position:absolute;left:var(--m);bottom:var(--m);width:var(--sym)}
.sym svg,.logo svg{width:100%;height:auto;display:block}
.num{font-weight:600;font-stretch:110%;letter-spacing:.02em;direction:ltr;unicode-bidi:isolate}
.blue{background:var(--blue)}
`;

const page = (w, h, body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}
body{--w:${w}px;--h:${h}px;--m:${Math.round(w * 0.085)}px;--label:${Math.round(w * 0.022)}px;--sym:${Math.round(w * 0.1)}px}${extra}</style></head><body>${body}</body></html>`;

const STORY = [1080, 1920], POST = [1080, 1350];

const assets = {
  // Pre-reveal (no new logo yet). 03 is posted Sat/Sun AFTER the reveal, so it carries the symbol.
  'pre-reveal/01-teaser-story.png': [...STORY, `<div class="pad" style="justify-content:center;gap:56px">
    <div class="label">Tomorrow · بكرا</div>
    <div class="serif" style="font-size:132px">Something new<br>arrives tomorrow.</div>
    <div class="ar" style="font-size:84px;font-weight:600">بكرا… شي جديد.</div>
    <div class="rule"></div>
    <div style="font-size:46px;color:var(--platinum)">Same people behind it.</div>
    <div class="ar" style="font-size:46px;color:var(--platinum)">ونفس الناس وراه.</div></div>`],
  'pre-reveal/02-contest-thanks-post.png': [...POST, `<div class="pad" style="justify-content:center;gap:40px">
    <div class="label">Thank you · شكراً</div>
    <div class="serif" style="font-size:112px">You suggested.<br>We listened.</div>
    <div class="ar" style="font-size:66px;font-weight:600">اقترحتوا… وسمعناكم.</div>
    <div class="rule"></div>
    <div style="font-size:38px;color:var(--platinum)">Our new name is chosen. The reveal is tomorrow.<br>The winning suggestion gets a free course.</div>
    <div class="ar" style="font-size:38px;color:var(--platinum)">اخترنا الاسم الجديد والكشف بكرا. وصاحب أفضل اقتراح ربح دورة مجانية.</div></div>`],
  'pre-reveal/03-same-team-post.png': [...POST, `<div class="pad" style="justify-content:center;gap:34px">
    <div class="label">New name · اسم جديد</div>
    <div class="serif" style="font-size:96px">Same team.<br>Same teachers.<br>Same place.<br>Same number.</div>
    <div class="ar" style="font-size:52px;font-weight:600">نفس الفريق. نفس الأساتذة. نفس المكان. نفس الرقم.</div>
    <div class="num gold" style="font-size:60px">${PHONE}</div></div><div class="sym">${SYMBOL}</div>`],

  // Reveal-day stories
  'reveal-day/story-1.png': [...STORY, `<div class="pad" style="justify-content:center;align-items:center;text-align:center;gap:40px">
    <div class="ar" style="font-size:120px;font-weight:600">شي جديد…</div>
    <div class="serif" style="font-size:96px;color:var(--platinum)">Something new.</div></div>`],
  'reveal-day/story-2-logo.png': [...STORY, `<div class="pad" style="justify-content:center;align-items:center;gap:90px">
    <div class="logo" style="width:78%">${STACKED}</div>
    <div class="serif gold" style="font-size:72px;font-style:italic">Shaping Global Minds.</div></div>`],
  'reveal-day/story-3-team.png': [...STORY, `<div class="pad" style="justify-content:center;gap:56px">
    <div class="ar" style="font-size:104px;font-weight:600">نفس الفريق.<br>نفس الأساتذة.</div>
    <div class="rule"></div>
    <div class="serif" style="font-size:96px;color:var(--platinum)">Same team.<br>Same teachers.</div></div>`],
  'reveal-day/story-4-number.png': [...STORY, `<div class="pad" style="justify-content:center;gap:56px">
    <div class="ar" style="font-size:96px;font-weight:600">نفس المكان.<br>نفس الرقم.</div>
    <div class="serif" style="font-size:84px;color:var(--platinum)">Same place.<br>Same number.</div>
    <div class="num gold" style="font-size:84px">${PHONE}</div></div>`],
  'reveal-day/story-5-formerly.png': [...STORY, `<div class="pad" style="justify-content:center;align-items:center;text-align:center;gap:70px">
    <div class="logo" style="width:88%">${HORIZONTAL}</div>
    <div class="rule"></div>
    <div style="font-size:50px;color:var(--platinum)">Formerly Success 4Sure – Khalda</div>
    <div class="ar" style="font-size:54px;color:var(--platinum)">سابقاً Success 4Sure – خلدا</div></div>`],
  'reveal-day/story-6-whatsapp.png': [...STORY, `<div class="pad" style="gap:44px;padding-top:180px">
    <div class="ar" style="font-size:96px;font-weight:600">راسلنا على واتساب</div>
    <div class="serif" style="font-size:84px;color:var(--platinum)">Message us on WhatsApp.</div>
    <div class="num gold" style="font-size:72px">${PHONE}</div>
    <div style="margin-top:60px;height:360px"></div><!-- empty space reserved for the Instagram link sticker --></div>
    <div class="sym" style="bottom:340px">${SYMBOL}</div><!-- above the Instagram reply bar -->`],

  // FAQ carousel (pin after reveal)
  'faq-carousel/1-cover.png': [...POST, `<div class="pad" style="justify-content:center;gap:40px">
    <div class="label">FAQ · أسئلتكم</div>
    <div class="serif" style="font-size:120px">Same team.<br>New name.</div>
    <div class="ar" style="font-size:72px;font-weight:600">نفس الفريق، باسم جديد.</div>
    <div class="rule"></div>
    <div style="font-size:40px;color:var(--platinum)">Your questions, answered. · إجابات أسئلتكم ←</div></div><div class="sym">${SYMBOL}</div>`],
  'faq-carousel/2-team.png': [...POST, faq('Is it the same team? Same teachers?', 'Yes. Same team, same teachers.', 'نفس الفريق؟ نفس الأساتذة؟', 'أكيد. نفس الفريق ونفس الأساتذة.')],
  'faq-carousel/3-courses.png': [...POST, faq('Do courses continue? Do I need to do anything?', 'Every course continues unchanged. Nothing to do: just save our new name.', 'الدورات مستمرة؟ لازم أعمل شي؟', 'كل الدورات مستمرة بدون تغيير. ما في شي مطلوب، بس احفظ اسمنا الجديد.')],
  'faq-carousel/4-contact.png': [...POST, faq('Can I still contact you?', 'Yes. Same place, same number:', 'بقدر أتواصل معكم؟', 'نعم. نفس المكان ونفس الرقم:', `<div class="num gold" style="font-size:66px;margin-top:10px">${PHONE}</div>`)],
  'faq-carousel/5-why.png': [...POST, faq('Why the new name?', 'Our students come from many international systems. One academy unites them.', 'ليش الاسم الجديد؟', 'طلابنا من أنظمة دولية مختلفة، والاسم الجديد بيجمعهم بأكاديمية وحدة.', `<div style="font-size:30px;color:var(--platinum);margin-top:20px">Formerly Success 4Sure – Khalda · سابقاً Success 4Sure – خلدا</div>`)],

  // Covers
  'covers/facebook-cover-1640x624.png': [1640, 624, `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px">
    <div class="logo" style="width:620px">${HORIZONTAL}</div>
    <div class="serif" style="font-size:46px;font-style:italic;color:var(--platinum)">Shaping Global Minds.</div></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:10px;background:var(--gold)"></div>`],
  'covers/reel-end-card.png': [...STORY, `<div class="pad" style="justify-content:center;align-items:center;text-align:center;gap:70px">
    <div class="logo" style="width:74%">${STACKED}</div>
    <div class="serif" style="font-size:66px;font-style:italic;color:var(--platinum)">Shaping Global Minds.</div>
    <div class="num gold" style="font-size:64px">${PHONE}</div>
    <div style="font-size:34px;color:var(--platinum)">Formerly Success 4Sure – Khalda</div></div>`],
};
for (const [file, inner] of [['new-name', `<div style="width:62%">${SYMBOL}</div>`], ['faq', '<div class="label" style="font-size:150px;color:#fff;letter-spacing:.08em">FAQ</div>'],
  ['programmes', '<div class="label" style="font-size:60px;color:#fff;letter-spacing:.06em">PROGRAMMES</div>'], ['results', '<div class="label" style="font-size:78px;color:#fff;letter-spacing:.06em">RESULTS</div>'],
  ['contact', '<div class="label" style="font-size:78px;color:#fff;letter-spacing:.06em">CONTACT</div>']]) {
  assets[`covers/highlight-${file}.png`] = [1080, 1920, `<div style="position:absolute;left:50%;top:50%;width:760px;height:760px;transform:translate(-50%,-50%);border-radius:50%;border:8px solid var(--gold);display:flex;align-items:center;justify-content:center" class="blue">${inner}</div>`];
}

function faq(qEn, aEn, qAr, aAr, extra = '') {
  return `<div class="pad" style="justify-content:center;gap:26px">
    <div class="label">FAQ · أسئلتكم</div>
    <div class="serif" style="font-size:70px">${qEn}</div>
    <div style="font-size:40px;color:var(--platinum);line-height:1.4">${aEn}</div>
    <div class="rule" style="margin:20px 0;background:var(--platinum);opacity:.5"></div><!-- gold is reserved for one emphasis -->
    <div class="ar" style="font-size:60px;font-weight:600">${qAr}</div>
    <div class="ar" style="font-size:40px;color:var(--platinum)">${aAr}</div>${extra}</div><div class="sym">${SYMBOL}</div>`;
}

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-'));
  const browser = await chromium.launch();
  const p = await browser.newPage();
  for (const [file, [w, h, body]] of Object.entries(assets)) {
    const html = path.join(tmp, 'a.html');
    fs.writeFileSync(html, page(w, h, body));
    await p.setViewportSize({ width: w, height: h });
    await p.goto('file://' + html);
    await p.evaluate(() => document.fonts.ready);
    const out = path.join(OUT, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await p.screenshot({ path: out });
  }
  // Celebration print files
  const LOGO_FC = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-stacked-full-colour.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
  const poster = `<div class="pad" style="justify-content:center;align-items:center;text-align:center;gap:16mm">
    <div class="logo" style="width:150mm">${STACKED}</div>
    <div class="serif gold" style="font-size:30pt;font-style:italic">Shaping Global Minds.</div>
    <div class="ar" style="font-size:34pt;margin-top:10mm">نفس الفريق. اسم جديد.</div>
    <div class="serif" style="font-size:30pt;color:var(--platinum)">Same team. New name.</div>
    <div style="font-size:12pt;color:var(--platinum);margin-top:8mm">Formerly Success 4Sure – Khalda</div></div>`;
  const posterHtml = path.join(tmp, 'poster.html');
  fs.writeFileSync(posterHtml, page(1123, 1587, poster, '@page{size:297mm 420mm;margin:0}html{background:#0B1626}body{width:297mm;height:420mm;--m:25mm}'));
  await p.goto('file://' + posterHtml); await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.join(OUT, 'celebration'), { recursive: true });
  await p.pdf({ path: path.join(OUT, 'celebration/poster-A3-print.pdf'), width: '297mm', height: '420mm', printBackground: true, pageRanges: '1' });
  const cakeHtml = path.join(tmp, 'cake.html');
  fs.writeFileSync(cakeHtml, page(2400, 2400, `<div style="position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:90px">
    <div class="logo" style="width:1500px">${LOGO_FC}</div>
    <div class="serif" style="font-size:120px;font-style:italic;color:#29566C">Shaping Global Minds.</div></div>`));
  await p.setViewportSize({ width: 2400, height: 2400 });
  await p.goto('file://' + cakeHtml); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, 'celebration/cake-print-2400px.png') });
  await browser.close();
  console.log(`rendered ${Object.keys(assets).length} assets to ${OUT}`);
})();
