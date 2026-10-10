// Registration ad reel (AP · SAT · EST II), 1080x1920, 27 s, cut to the voice-over's pauses.
// Visual layer only (frames → silent MP4); audio is made by reg_reel_audio.py and muxed by reg_reel.sh.
// Usage: NODE_PATH=$(npm root -g) node reg_reel.js <out.mp4>
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const out = process.argv[2];
const FPS = 30, DUR = 27;
// Scene starts (s), matched to the VO pauses. Transitions (gold line wipe) sit on each boundary.
const CUTS = [0, 3.3, 7.6, 11.3, 13.8, 16.1, 19.4, 21.5];
const STACKED = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-stacked-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
const AP = ['Biology', 'Chemistry', 'Physics 1', 'Calculus', 'Precalculus', 'Computer Science Principles', 'English Language', 'English Literature', 'World History', 'Psychology', 'Human Geography', 'Microeconomics', 'Environmental Science', 'Business with Personal Finance'];
const EST = ['Math 1', 'Math 2', 'Biology', 'Physics', 'English Literature', 'Arabic'];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'A';font-weight:400;src:url('file://${BRAND}/Fonts/static/Archivo-Regular.ttf')}
@font-face{font-family:'A';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBold.ttf')}
@font-face{font-family:'AW';font-weight:600;src:url('file://${BRAND}/Fonts/static/Archivo-SemiBoldExpanded.ttf')}
@font-face{font-family:'N';font-style:normal;src:url('file://${BRAND}/Fonts/Newsreader-normal-400-latin.woff2')}
@font-face{font-family:'N';font-style:italic;src:url('file://${BRAND}/Fonts/Newsreader-italic-400-latin.woff2')}
@font-face{font-family:'AR';font-weight:600;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-600-arabic.woff2')}
@font-face{font-family:'AR';font-weight:700;src:url('file://${BRAND}/Fonts/IBMPlexSansArabic-normal-700-arabic.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#0B1626;color:#fff;font-family:'A',sans-serif}
#cam{position:absolute;inset:0}
.bg{position:absolute;inset:-200px;background:radial-gradient(60% 40% at 50% 45%,#1c3b52 0%,#0B1626 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(216,218,223,.05) 2px,transparent 2px),linear-gradient(90deg,rgba(216,218,223,.05) 2px,transparent 2px);background-size:90px 90px}
.sc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0}
.ar{font-family:'AR','A';direction:rtl}
.en{font-family:'N',serif}
.lbl{font-family:'AW';font-weight:600;letter-spacing:.2em;font-size:30px;color:#D8DADF}
.tile{width:620px;height:210px;border-radius:36px;background:#29566C;display:flex;align-items:center;justify-content:center;font-family:'AW';font-weight:600;font-size:120px;letter-spacing:.06em;margin:18px 0}
.tile.g{background:#E2A02D;color:#0B1626}
.chip{display:inline-block;border:3px solid rgba(216,218,223,.5);border-radius:999px;padding:14px 30px;font-size:38px;font-weight:600;margin:10px;white-space:nowrap}
.mode{width:780px;height:150px;border-radius:30px;border:3px solid rgba(216,218,223,.35);display:flex;align-items:center;justify-content:space-between;padding:0 50px;margin:16px 0;font-size:52px;font-weight:600}
.mode .ar{font-size:48px;color:#D8DADF}
.wipe{position:absolute;top:-400px;bottom:-400px;width:260px;background:#E2A02D;transform:skewX(-14deg);left:-700px}
.line{position:absolute;top:-400px;bottom:-400px;width:10px;background:#E2A02D;transform:skewX(-14deg);left:-700px}
.flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
</style></head><body><div id="cam"><div class="bg"></div><div class="grid" id="grid"></div>

<div class="sc" id="s0">
  <div class="ar" id="h1" style="font-weight:700;font-size:130px;line-height:1.2">جامعة أحلامك</div>
  <div class="ar" id="h2" style="font-weight:700;font-size:96px;color:#E2A02D;margin-top:10px">بتبدأ من علامتك</div>
  <div class="en" id="h3" style="font-size:52px;font-style:italic;color:#D8DADF;margin-top:60px">Your dream university starts with your score.</div>
</div>

<div class="sc" id="s1">
  <div class="lbl" style="margin-bottom:40px">ONE ACADEMY · كلها بمكان واحد</div>
  <div class="tile" id="t0">AP</div><div class="tile" id="t1">SAT</div><div class="tile g" id="t2">EST II</div>
  <div class="ar" id="one" style="font-weight:700;font-size:70px;margin-top:50px">كلها بمكان واحد</div>
</div>

<div class="sc" id="s2">
  <div class="lbl">ADVANCED PLACEMENT</div>
  <div style="display:flex;align-items:baseline;gap:30px;margin-top:20px"><div class="en" id="cnt" style="font-size:320px;line-height:1;color:#E2A02D">0</div><div style="font-family:'AW';font-weight:600;font-size:70px;text-align:left;line-height:1.1">AP<br>subjects</div></div>
  <div id="mq" style="width:1400px;margin-top:40px;white-space:nowrap;overflow:visible">${[...AP, ...AP].map((s) => `<span class="chip">${s}</span>`).join('')}</div>
  <div class="ar" id="tch" style="font-weight:700;font-size:62px;margin-top:70px">مع أساتذة بيعرفوا الامتحان</div>
  <div class="en" id="tch2" style="font-size:44px;font-style:italic;color:#D8DADF;margin-top:16px">with teachers who know the exams</div>
</div>

<div class="sc" id="s3">
  <div class="lbl">DIGITAL SAT · الـSAT الرقمي</div>
  <div class="en" style="font-size:150px;margin-top:20px">Digital SAT</div>
  <div style="display:flex;gap:30px;margin-top:60px"><div class="tile" id="r1" style="width:440px;height:260px;font-size:52px;flex-direction:column;font-family:'A'">Reading<br>&amp; Writing</div><div class="tile" id="r2" style="width:440px;height:260px;font-size:60px;font-family:'A'">Math</div></div>
  <div class="ar" style="font-weight:700;font-size:60px;margin-top:60px" id="bq">بقسميه</div>
</div>

<div class="sc" id="s4">
  <div class="lbl">EGYPTIAN SCHOLASTIC TEST</div>
  <div style="font-family:'AW';font-weight:600;font-size:220px;margin-top:10px;color:#E2A02D" id="est">EST II</div>
  <div style="width:960px;margin-top:40px" id="estc">${EST.map((s) => `<span class="chip">${s}</span>`).join('')}</div>
  <div class="ar" style="font-weight:700;font-size:70px;margin-top:60px" id="sbs">خطوة بخطوة</div>
</div>

<div class="sc" id="s5">
  <div class="lbl" style="margin-bottom:30px">YOUR WAY · إنت بتختار</div>
  <div class="mode" id="m0"><span>In-Person</span><span class="ar">حضوري</span></div>
  <div class="mode" id="m1"><span>Online</span><span class="ar">أونلاين</span></div>
  <div class="mode" id="m2"><span>Recorded</span><span class="ar">مسجّل</span></div>
  <div class="ar" id="yc" style="font-weight:700;font-size:84px;margin-top:60px;color:#E2A02D">إنت بتختار</div>
</div>

<div class="sc" id="s6"><div id="logo" style="width:760px">${STACKED.replace('<svg ', '<svg style="width:100%;height:auto;display:block" ')}</div>
  <div class="en" id="tag" style="font-style:italic;font-size:62px;color:#D8DADF;margin-top:60px">Shaping Global Minds.</div></div>

<div class="sc" id="s7">
  <div class="ar" id="c1" style="font-weight:700;font-size:150px">سجّل الآن</div>
  <div style="font-family:'AW';font-weight:600;font-size:56px;letter-spacing:.14em;margin-top:6px" id="c2">REGISTER NOW</div>
  <div id="c3" style="margin-top:90px;border:4px solid #E2A02D;border-radius:40px;padding:36px 60px">
    <div class="lbl">CALL OR WHATSAPP · اتصال أو واتساب</div>
    <div style="font-weight:600;font-size:96px;margin-top:14px;letter-spacing:.02em">+962 79 055 5890</div></div>
  <div style="font-size:40px;color:#D8DADF;margin-top:50px" id="c4">Floor 4 · Khalda, Amman</div>
  <div id="c5" style="width:520px;margin-top:90px">${fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg style="width:100%;height:auto;display:block" ')}</div>
</div>
</div>
<div class="line" id="l1"></div><div class="wipe" id="w"></div><div class="line" id="l2"></div><div class="flash" id="fl"></div>
<script>
const CUTS=${JSON.stringify(CUTS)};
const $=id=>document.getElementById(id);
const cl=x=>Math.max(0,Math.min(1,x));
const eo=x=>1-Math.pow(1-cl(x),3);            // ease out
const bk=x=>{x=cl(x);const c=1.9;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)}; // ease out back (overshoot)
const win=(t,a,b)=>eo((t-a)/(b-a));
const pop=(el,t,a,dur=.35,from=1.6)=>{const k=cl((t-a)/dur);el.style.opacity=k>0?1:0;const s=from+(1-from)*bk(k);el.style.transform='scale('+s+')';};
const rise=(el,t,a,dur=.4,dy=60)=>{const k=eo((t-a)/dur);el.style.opacity=k;el.style.transform='translateY('+((1-k)*dy)+'px)';};
window.setT=(t)=>{
  // which scene + gold wipe on every cut (0.45 s, scene swaps when the bar covers the centre)
  let si=0;for(let i=0;i<CUTS.length;i++) if(t>=CUTS[i]) si=i;
  for(let i=0;i<8;i++) $('s'+i).style.opacity=i===si?1:0;
  let wk=-1;for(let i=1;i<CUTS.length;i++){const d=t-(CUTS[i]-.22);if(d>=0&&d<.45){wk=d/.45;}}
  const X=wk<0?-900:-700+wk*2500;
  $('w').style.left=X+'px';$('l1').style.left=(X-120)+'px';$('l2').style.left=(X+380)+'px';
  // camera: slow push + shake on impacts
  const local=t-CUTS[si];let shake=0;
  for(const s of [3.45,4.25,5.05,19.5,21.6]){const d=t-s;if(d>=0&&d<.25)shake=Math.max(shake,(1-d/.25)*14);}
  const z=1+local*.012;
  $('cam').style.transform='scale('+z+') translate('+(Math.sin(t*90)*shake)+'px,'+(Math.cos(t*77)*shake)+'px)';
  $('grid').style.transform='translateY('+(-t*40%90)+'px)';
  // flashes on the logo + CTA hits
  let f=0;for(const s of [19.45,21.55]){const d=t-s;if(d>=0&&d<.3)f=Math.max(f,(1-d/.3)*.55);} $('fl').style.opacity=f;
  // S0 hook (glitchy slam-in)
  pop($('h1'),t,.05,.3,1.8);
  const gl=(t>.05&&t<.25)||(t>1.6&&t<1.75); $('h1').style.textShadow=gl?'8px 0 #E2A02D,-8px 0 #29566C':'none';
  pop($('h2'),t,1.6,.3,1.8); $('h2').style.textShadow=(t>1.6&&t<1.75)?'-8px 0 #fff,8px 0 #29566C':'none';
  rise($('h3'),t,2.1,.5);
  // S1 tiles slam
  pop($('t0'),t,3.4,.3,2.2);pop($('t1'),t,4.2,.3,2.2);pop($('t2'),t,5.0,.3,2.2);rise($('one'),t,6.15,.4);
  // S2 counter + marquee
  const n=Math.round(14*eo((t-7.75)/1.3));$('cnt').textContent=t<7.7?'0':n;
  $('mq').style.transform='translateX('+(-(t-7.6)*260)+'px)';rise($('tch'),t,9.2,.4);rise($('tch2'),t,9.5,.4);
  // S3
  pop($('r1'),t,11.6,.3,1.8);pop($('r2'),t,12.1,.3,1.8);rise($('bq'),t,12.9,.35);
  // S4
  pop($('est'),t,13.9,.35,1.9);
  [...$('estc').children].forEach((c,i)=>rise(c,t,14.3+i*.12,.3,40));rise($('sbs'),t,15.1,.35);
  // S5 modes light up
  ['m0','m1','m2'].forEach((id,i)=>{const a=16.2+i*.6;const k=win(t,a,a+.3);const el=$(id);el.style.opacity=.25+.75*k;
    el.style.borderColor=k>.5?'#E2A02D':'rgba(216,218,223,.35)';el.style.background='rgba(41,86,108,'+(k*.9)+')';el.style.transform='translateX('+((1-k)*80)+'px)';});
  pop($('yc'),t,18.5,.3,1.6);
  // S6 logo reveal
  pop($('logo'),t,19.45,.5,.6);rise($('tag'),t,20.3,.5);
  // S7 CTA
  pop($('c1'),t,21.6,.3,1.9);rise($('c2'),t,21.9,.35);pop($('c3'),t,22.6,.35,1.3);rise($('c4'),t,23.2,.4);rise($('c5'),t,23.6,.5);
  const pulse=t>23.5?1+.025*Math.sin((t-23.5)*6):1;if(t>22.95)$('c3').style.transform='scale('+pulse+')';
};
setT(0);
</script></body></html>`;

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-reg-'));
  fs.writeFileSync(path.join(tmp, 'r.html'), html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(tmp, 'r.html'));
  await p.evaluate(() => document.fonts.ready);
  for (let f = 0; f < FPS * DUR; f++) {
    await p.evaluate((t) => window.setT(t), f / FPS);
    await p.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
  }
  await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('video:', out);
})();
