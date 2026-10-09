// AP teacher campaign: one 1080x1350 post per teacher (all their AP subjects combined) + a campaign intro post.
// Source of truth: the academy's own Instagram AP posts (19 Sep and 6 Oct 2026, read via Metricool) and the
// 9 Oct AP schedule. No dates, times, prices or result claims by design.
// Optional real photos: put <teacher-id>.jpg in 03_Assets/Posts/2026-10_AP_campaign/photos/ and re-run.
// Usage: NODE_PATH=$(npm root -g) node ap_campaign.js
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Posts/2026-10_AP_campaign');
const PHOTOS = path.join(OUT, 'photos');
const svg = (f) => fs.readFileSync(path.join(BRAND, 'Logo/SVG', f), 'utf8').replace(/<title>.*?<\/title>/, '');
const LOGO_H = svg('uia-logo-horizontal-reversed.svg');

// Line icons, 64x64, drawn for this campaign (stroke only, so they read as one family).
const ICON = {
  bio: '<path d="M22 6c0 14 20 18 20 32s-20 18-20 20M42 6c0 14-20 18-20 32s20 18 20 20M25 14h14M23 24h18M23 40h18M25 50h14"/>',
  envsci: '<path d="M12 52C12 24 30 10 54 10c0 26-16 42-42 42z"/><path d="M12 52L38 26"/>',
  chem: '<path d="M25 8h14M27 8v18L12 52a4 4 0 0 0 3.5 6h33a4 4 0 0 0 3.5-6L37 26V8"/><path d="M18 42h28"/>',
  physics1: '<circle cx="32" cy="32" r="4"/><ellipse cx="32" cy="32" rx="26" ry="10"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-60 32 32)"/>',
  calc: '<path d="M40 8c-6 0-8 4-8 10v28c0 6-2 10-8 10"/><path d="M44 14h10M44 22h10M10 42h10M10 50h10"/>',
  precalc: '<path d="M8 56V8M8 56h48"/><path d="M12 48c8-2 12-30 20-30s10 18 20 6"/>',
  cs: '<path d="M22 18L8 32l14 14M42 18l14 14-14 14M36 12L28 52"/>',
  englang: '<path d="M8 12h40v28H26l-10 10V40H8z"/><path d="M16 22h24M16 30h16"/>',
  englit: '<path d="M32 16c-6-5-16-6-24-4v38c8-2 18-1 24 4 6-5 16-6 24-4V12c-8-2-18-1-24 4z"/><path d="M32 16v38"/>',
  worldhist: '<path d="M8 56h48M12 50h40M14 22h36M32 8l20 10H12z"/><path d="M18 24v24M28 24v24M36 24v24M46 24v24"/>',
  humgeo: '<circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8c8 7 12 15 12 24s-4 17-12 24c-8-7-12-15-12-24s4-17 12-24z"/>',
  psych: '<path d="M20 56V44c-6-4-10-10-10-18 0-11 9-20 21-20 11 0 19 8 19 18l5 9-5 2v6c0 3-2 5-5 5h-6v10"/><path d="M26 22a5 5 0 0 1 9-2 5 5 0 0 1 4 8"/>',
  micro: '<path d="M8 56V8M8 56h48"/><path d="M14 14l36 36M14 50l36-36"/>',
  bpf: '<ellipse cx="24" cy="44" rx="14" ry="5"/><path d="M10 44v6c0 3 6 5 14 5s14-2 14-5v-6M10 36v8M38 36v8"/><ellipse cx="24" cy="36" rx="14" ry="5"/><path d="M40 28l8-8 6 6 6-12M52 14h8v8"/>',
};
const SUBJECT = { // [English (official AP course name as used in our posts), Arabic]
  bio: ['AP Biology', 'الأحياء'],
  envsci: ['AP Environmental Science', 'العلوم البيئية'],
  chem: ['AP Chemistry', 'الكيمياء'],
  physics1: ['AP Physics 1', 'الفيزياء 1'],
  calc: ['AP Calculus', 'التفاضل والتكامل'],
  precalc: ['AP Precalculus', 'ما قبل التفاضل والتكامل'],
  cs: ['AP Computer Science Principles', 'مبادئ علوم الحاسوب'],
  englang: ['AP English Language and Composition', 'اللغة الإنجليزية والكتابة'],
  englit: ['AP English Literature and Composition', 'الأدب الإنجليزي والكتابة'],
  worldhist: ['AP World History', 'تاريخ العالم'],
  humgeo: ['AP Human Geography', 'الجغرافيا البشرية'],
  psych: ['AP Psychology', 'علم النفس'],
  micro: ['AP Microeconomics', 'الاقتصاد الجزئي'],
  bpf: ['AP Business with Personal Finance', 'الأعمال والتمويل الشخصي'],
};
// Teacher names exactly as in the source posts (only "AL" → "Al" normalised). ar = Arabic title.
const TEACHERS = [
  { id: '01_noor-al-lozi', name: 'Ms. Noor Al Lozi', ar: 'الأستاذة', subjects: ['bio', 'envsci'] },
  { id: '02_natheer-ali', name: 'Mr. Natheer Ali', ar: 'الأستاذ', subjects: ['chem'] },
  { id: '03_moath-al-abbadi', name: 'Mr. Moath Al Abbadi', ar: 'الأستاذ', subjects: ['physics1'] },
  { id: '04_mohammed-al-bakheet', name: 'Mr. Mohammed Al Bakheet', ar: 'الأستاذ', subjects: ['calc'] },
  { id: '05_naseem-al-labadi', name: 'Mr. Naseem Al Labadi', ar: 'الأستاذ', subjects: ['precalc'] },
  { id: '06_alaa-barrieh', name: 'Mr. Ala’a Barrieh', ar: 'الأستاذ', subjects: ['cs'] },
  { id: '07_sara-abd-el-raheem', name: 'Ms. Sara Abd El Raheem', ar: 'الأستاذة', subjects: ['englang', 'englit', 'worldhist'] },
  { id: '08_mina-nasiri', name: 'Ms. Mina Nasiri', ar: 'الأستاذة', subjects: ['psych', 'humgeo'] },
  { id: '09_hosam-al-khalil', name: 'Mr. Hosam Al Khalil', ar: 'الأستاذ', subjects: ['micro', 'bpf'] },
];
const icon = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

const CSS = `
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:400;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-400-arabic.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#0B1626;color:#fff;font-family:'A',sans-serif;overflow:hidden;position:relative}
.bg{position:absolute;right:-170px;bottom:200px;width:560px;height:560px;color:#29566C;opacity:.3}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:20px}
.bg svg{width:100%;height:100%}
.pad{position:absolute;inset:84px;display:flex;flex-direction:column}
.label{font-family:'AW';font-weight:600;letter-spacing:.18em;text-transform:uppercase;font-size:20px;color:#D8DADF}
.label .ar{font-family:'AR';letter-spacing:0;text-transform:none;font-size:22px}
.name{font-family:'N',serif;font-size:96px;line-height:1.02;color:#E2A02D;margin-top:22px;max-width:860px}
.photo{width:250px;height:250px;border-radius:50%;object-fit:cover;border:3px solid #29566C;margin-top:30px}
.hair{height:1.5px;background:rgba(216,218,223,.22);margin:44px 0 6px}
.subj{display:flex;align-items:center;gap:30px;padding:22px 0;border-bottom:1.5px solid rgba(216,218,223,.12)}
.subj:last-child{border-bottom:0}
.tile{flex:none;width:120px;height:120px;border-radius:24px;background:#29566C;color:#fff;display:flex;align-items:center;justify-content:center}
.tile svg{width:68px;height:68px}
.en{font-weight:600;font-size:46px;line-height:1.1}
.arsub{font-family:'AR';font-weight:400;font-size:31px;color:#D8DADF;direction:rtl;text-align:left;margin-top:6px}
.modes{display:flex;gap:12px;align-items:center}
.chip{border:1.5px solid rgba(216,218,223,.4);border-radius:999px;padding:9px 20px;font-size:21px;color:#D8DADF}
.chip .ar{font-family:'AR';margin-left:8px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;padding-top:30px;border-top:1.5px solid rgba(216,218,223,.22)}
.logo{width:330px}.logo svg{width:100%;height:auto;display:block}
.contact{text-align:right}
.contact .l{font-family:'AW';font-weight:600;letter-spacing:.16em;font-size:15px;color:#D8DADF;text-transform:uppercase}
.contact .n{font-weight:600;font-size:34px;margin-top:6px;letter-spacing:.02em}
.contact .loc{font-size:18px;color:#D8DADF;margin-top:4px}
`;
const foot = `<div class="foot"><div class="logo">${LOGO_H}</div>
  <div class="contact"><div class="l">Call or WhatsApp</div><div class="n">+962 79 055 5890</div><div class="loc">Floor 4 · Khalda, Amman</div></div></div>`;
const modes = `<div class="modes"><div class="chip">In-Person<span class="ar">حضوري</span></div><div class="chip">Online<span class="ar">أونلاين</span></div><div class="chip">Recorded<span class="ar">مسجّل</span></div></div>`;

const teacherPage = (t, photo) => {
  const many = t.subjects.length === 3;
  return `<div class="bg">${icon(t.subjects[0])}</div><div class="pad">
  <div class="label">AP teacher · <span class="ar">${t.ar}</span></div>
  <div class="mid"><div class="name" style="${many ? 'font-size:88px' : ''}">${t.name}</div>
  ${photo ? `<img class="photo" src="file://${photo}">` : ''}
  <div class="hair" style="${many ? 'margin-top:38px' : ''}"></div>
  ${t.subjects.map((k) => `<div class="subj" style="${many ? 'padding:14px 0' : ''}"><div class="tile">${icon(k)}</div><div><div class="en">${SUBJECT[k][0]}</div><div class="arsub">${SUBJECT[k][1]}</div></div></div>`).join('')}</div>
  ${modes}${foot}</div>`;
};

const introPage = () => {
  const all = TEACHERS.flatMap((t) => t.subjects);
  return `<div class="pad">
  <div class="label">AP courses · <span class="ar">دورات AP</span></div>
  <div class="mid"><div class="name" style="color:#fff;font-size:84px;margin-top:0">Advanced Placement<br><span style="font-style:italic;color:#E2A02D">with our AP teachers.</span></div>
  <div style="font-family:'AR';font-weight:600;font-size:36px;direction:rtl;text-align:left;margin-top:18px">دورات AP مع نفس الأساتذة، باسمنا الجديد</div>
  <div class="hair" style="margin:34px 0 22px"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px 30px">
  ${all.map((k) => `<div style="display:flex;align-items:center;gap:16px"><div class="tile" style="width:60px;height:60px;border-radius:14px"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" style="width:34px;height:34px">${ICON[k]}</svg></div><div style="font-weight:600;font-size:26px;line-height:1.15">${SUBJECT[k][0].replace(' and Composition', '')}</div></div>`).join('')}
  </div>
  <div style="margin-top:26px;font-size:21px;color:#D8DADF">${all.length} AP subjects · ${TEACHERS.length} teachers · Formerly Success 4Sure – Khalda</div></div>
  ${modes}${foot}</div>`;
};

(async () => {
  const outDir = path.join(OUT, 'Social_Media_Designs');
  fs.mkdirSync(outDir, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-apc-'));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const jobs = [['00_AP-campaign-intro', introPage()],
    ...TEACHERS.map((t) => { const ph = path.join(PHOTOS, t.id + '.jpg'); return [t.id, teacherPage(t, fs.existsSync(ph) ? ph : null)]; })];
  for (const [id, body] of jobs) {
    fs.writeFileSync(path.join(tmp, 'p.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`);
    await p.goto('file://' + path.join(tmp, 'p.html'));
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const e = document.querySelector('.pad'); return e.scrollHeight - e.clientHeight; });
    if (over > 0) console.warn(`${id}: overflows by ${over}px`);
    await p.screenshot({ path: path.join(outDir, `UIA_AP_${id}_1080x1350.png`) });
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, 'campaign_data.json'), JSON.stringify({ TEACHERS, SUBJECT }, null, 2));
  console.log('rendered', jobs.length, 'posts to', outDir);
})();
