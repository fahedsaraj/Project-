// UIA payment receipt (print PDF): A5 (original receipt-pad size) + A4 (office printer). Bilingual labels, fill-in lines.
// Replaces the old Success 4Sure receipt. Usage: NODE_PATH=$(npm root -g) node receipt.js
const { chromium } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../03_Assets/Print/2026-10_Receipt');
const LOGO = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-full-colour.svg'), 'utf8')
  .replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg style="height:100%;width:auto;display:block" ');
const box = (en, ar) => `<label class="cb"><i></i><span>${en}</span>${ar ? `<em>${ar}</em>` : ''}</label>`;
const line = (en, ar, extra = '') => `<div class="row ${extra}"><div class="k">${en}<em>${ar}</em></div><div class="dots"></div></div>`;
const body = `
<div class="top"></div>
<header><div class="logo">${LOGO}</div><div class="ttl"><b>RECEIPT</b><em>إيصال استلام</em></div></header>
<div class="bar"><span></span></div>
<section class="meta">
  ${line('Receipt No.', 'رقم الإيصال')}
  <div class="two">${line('Date', 'التاريخ')}${line('Received by', 'المستلم')}</div>
</section>
<h2>STUDENT DETAILS<em>بيانات الطالب</em></h2>
<section>
  ${line('Full name', 'الاسم الكامل')}
  <div class="two">${line('Student phone', 'هاتف الطالب')}${line('Parent phone', 'هاتف ولي الأمر')}</div>
  <div class="two">${line('Grade', 'الصف')}${line('School', 'المدرسة')}</div>
</section>
<h2>COURSE<em>الدورة</em></h2>
<section class="grid4">
  ${box('AP')}${box('SAT')}${box('EST II')}${box('IGCSE')}${box('IB')}${box('IELTS')}${box('TOEFL')}${box('Other', 'أخرى')}
</section>
${line('Subject(s)', 'المادة / المواد', 'mt')}
<h2>PAYMENT<em>الدفع</em></h2>
<section>
  <div class="lbl">Method<em>طريقة الدفع</em></div>
  <div class="grid4 g3">${box('Cash', 'نقداً')}${box('Visa', 'فيزا')}${box('CliQ', 'كليك')}</div>
  <div class="lbl mt">Instalment<em>الدفعة</em></div>
  <div class="grid4 g3">${box('1st', 'الأولى')}${box('2nd', 'الثانية')}${box('3rd', 'الثالثة')}</div>
  <table class="amt">
    <tr><td>Total fee<em>المبلغ الكلي</em></td><td class="v"><span>JOD</span></td></tr>
    <tr><td>Amount paid<em>المبلغ المدفوع</em></td><td class="v"><span>JOD</span></td></tr>
    <tr class="tot"><td>Balance due<em>المبلغ المتبقي</em></td><td class="v"><span>JOD</span></td></tr>
  </table>
</section>
<div class="sig"><div><div class="sl"></div>Student / Parent signature<em>توقيع الطالب / ولي الأمر</em></div><div><div class="sl"></div>Academy signature &amp; stamp<em>توقيع وختم الأكاديمية</em></div></div>
<footer>
  <div class="terms"><b>Terms</b> · Payments are non-refundable.<em dir="rtl" style="text-align:left;unicode-bidi:isolate">الشروط: المبالغ المدفوعة غير قابلة للاسترداد.</em></div>
  <div class="thx">Thank you<em>شكراً لثقتكم</em></div>
  <div class="contact">Floor 4 · Khalda, Amman<br><b>+962 79 055 5890</b></div>
</footer>
<div class="bot"></div>`;
const css = `
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'AR';font-weight:400;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-400-arabic.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
@page{margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#fff}
.page{width:148mm;height:210mm;position:relative;overflow:hidden;color:#26292E;font-family:'A',sans-serif;font-size:8.6pt;padding:9mm 10mm 8mm;display:flex;flex-direction:column}
em{font-style:normal;font-family:'AR','A';font-weight:400;color:#29566C;margin-left:5px;font-size:.92em}
.top{position:absolute;left:0;right:0;top:0;height:2.2mm;background:#0B1626}
.bot{position:absolute;left:0;right:0;bottom:0;height:2.2mm;background:#0B1626}
.bot:before,.top:after{content:'';position:absolute;left:0;width:38mm;height:.8mm;background:#E2A02D}
.top:after{bottom:-.8mm}.bot:before{top:-.8mm}
header{display:flex;justify-content:space-between;align-items:center;margin-top:2mm}
.logo{height:13mm}
.ttl{text-align:right}.ttl b{display:block;font-family:'AW';font-weight:600;font-size:17pt;letter-spacing:.14em;color:#0B1626}
.ttl em{display:block;margin:0;font-family:'AR';font-weight:600;font-size:10pt}
.bar{height:.5mm;background:#D8DADF;margin:4mm 0 3mm;position:relative}.bar span{position:absolute;left:0;top:-.25mm;height:1mm;width:22mm;background:#E2A02D}
h2{font-family:'AW';font-weight:600;font-size:7.6pt;letter-spacing:.16em;color:#0B1626;margin:4.2mm 0 1.6mm;padding-bottom:1.2mm;border-bottom:.3mm solid #0B1626;display:flex;justify-content:space-between;align-items:baseline}
h2 em{font-family:'AR';font-weight:600;letter-spacing:0;font-size:8.6pt}
.row{display:flex;align-items:flex-end;gap:2mm;height:7.4mm}
.row .k{white-space:nowrap;font-weight:600;color:#0B1626}
.dots{flex:1;border-bottom:.25mm dotted #8a8f98;height:4mm}
.two{display:flex;gap:6mm}.two .row{flex:1}
.mt{margin-top:2mm}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm 3mm;margin-top:1mm}
.grid4.g3{grid-template-columns:repeat(3,1fr)}
.cb{display:flex;align-items:center;gap:2mm;font-weight:600;color:#0B1626;height:5.6mm}
.cb i{width:3.6mm;height:3.6mm;border:.3mm solid #0B1626;border-radius:.7mm;flex:none}
.lbl{font-family:'AW';font-weight:600;font-size:6.8pt;letter-spacing:.14em;color:#6b717b;margin-top:1mm}
.lbl em{font-family:'AR';letter-spacing:0;font-size:8pt}
.amt{width:100%;border-collapse:collapse;margin-top:3mm}
.amt td{border:.25mm solid #D8DADF;height:8mm;padding:0 3mm;font-weight:600;color:#0B1626}
.amt td:first-child{width:52%;background:#F5F4F0}
.amt .v{text-align:right;color:#8a8f98;font-size:7.6pt;letter-spacing:.1em}
.amt .tot td{border-color:#0B1626;border-width:.35mm}.amt .tot td:first-child{background:#0B1626;color:#fff}.amt .tot em{color:#E2A02D}
.sig{display:flex;gap:10mm;margin-top:auto;font-size:7.4pt;color:#6b717b}.sig>div{flex:1}
.sig .sl{border-bottom:.3mm solid #0B1626;height:11mm;margin-bottom:1.4mm}
footer{display:flex;justify-content:space-between;align-items:flex-end;gap:4mm;margin-top:5mm;padding-top:3mm;border-top:.25mm solid #D8DADF;font-size:7.2pt;color:#26292E}
footer em{display:block;margin:0;margin-top:.6mm}
.terms{flex:1.3}.thx{text-align:center;font-family:'AW';font-weight:600;letter-spacing:.12em;color:#0B1626;font-size:8pt}.thx em{letter-spacing:0;font-size:8pt}
.contact{text-align:right}.contact b{font-size:8.4pt;color:#0B1626}
`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'receipt-'));
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [name, w, h, z] of [['UIA_Receipt_A5.pdf', '5.8268in', '8.2677in', 1], ['UIA_Receipt_A4.pdf', '8.2677in', '11.6929in', 1.41421]]) {
    fs.writeFileSync(path.join(tmp, 'r.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="page" style="zoom:${z}">${body}</div></body></html>`);
    await p.goto('file://' + path.join(tmp, 'r.html')); await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(OUT, name), width: w, height: h, printBackground: true, pageRanges: '1' });
    if (z === 1) { await p.setViewportSize({ width: 560, height: 794 }); await p.screenshot({ path: path.join(OUT, 'preview_A5.png'), fullPage: false }); }
    console.log(name);
  }
  await b.close();
})();
