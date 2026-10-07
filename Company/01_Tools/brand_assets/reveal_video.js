// Render the UIA logo reveal as MP4: 1080x1920 (Instagram reel) and 1920x1080 (screen at the celebration).
// Frame-by-frame with Playwright, encoded with ffmpeg. No audio (add music in Instagram).
// Usage: NODE_PATH=$(npm root -g) node reveal_video.js
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const OUT = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/reveal_pack/video');
const STACKED = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-stacked-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
const FPS = 30, SECONDS = 12;

const html = (w, h) => `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('file://${BRAND}/Fonts/fonts-local.css');
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:#0B1626;color:#fff;overflow:hidden;font-family:'Archivo',sans-serif}
.c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
#logo{width:${w > h ? 30 : 64}%}
#logo svg{width:100%;height:auto;display:block;overflow:visible}
.serif{font-family:'Newsreader',serif}
.ar{font-family:'IBM Plex Sans Arabic',sans-serif;direction:rtl;font-weight:600}
.line{height:4px;background:#E2A02D}
</style></head><body>
<div class="c" id="intro"><div class="ar" style="font-size:${w > h ? 96 : 110}px">شي جديد…</div>
  <div class="serif" style="font-size:${w > h ? 72 : 84}px;color:#D8DADF;margin-top:24px">Something new.</div></div>
<div class="c" id="main" style="gap:${w > h ? 40 : 70}px">
  <div id="logo">${STACKED}</div>
  <div id="tag" class="serif" style="font-style:italic;font-size:${w > h ? 52 : 70}px;color:#E2A02D">Shaping Global Minds.</div>
</div>
<div class="c" id="end" style="gap:${w > h ? 26 : 40}px">
  <div class="ar" style="font-size:${w > h ? 74 : 92}px">نفس الفريق. اسم جديد.</div>
  <div class="serif" style="font-size:${w > h ? 64 : 80}px;color:#D8DADF">Same team. New name.</div>
  <div class="line" id="rule" style="width:0"></div>
  <div style="font-size:${w > h ? 34 : 40}px;color:#D8DADF">Formerly Success 4Sure – Khalda · <span style="direction:ltr;unicode-bidi:isolate">+962 79 055 5890</span></div>
</div>
<script>
const ease = x => x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3);
const win = (t, a, b) => ease((t - a) / (b - a));
const svg = document.querySelector('#logo svg');
// Wrap each path in a <g> so animation transforms don't override the path's own transform attribute.
const groups = [...svg.querySelectorAll('path')].map(p => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  p.parentNode.insertBefore(g, p); g.appendChild(p); return g;
});
const gold = groups[0], accent = groups[1], letters = groups.slice(2);
window.setT = (t) => {
  // 0–2.2s intro text
  const intro = document.getElementById('intro');
  intro.style.opacity = Math.min(win(t, 0.2, 0.9), 1 - win(t, 1.7, 2.2));
  // 2.4s symbol rises in; accents follow; letters stagger; tagline
  const main = document.getElementById('main');
  main.style.opacity = 1 - win(t, 8.0, 8.5);
  const s = win(t, 2.4, 3.6);
  gold.setAttribute('opacity', s); gold.setAttribute('transform', 'translate(0 ' + ((1 - s) * 12).toFixed(2) + ')');
  accent.setAttribute('opacity', win(t, 3.3, 4.1));
  letters.forEach((g, i) => { const k = win(t, 4.1 + i * 0.05, 4.7 + i * 0.05); g.setAttribute('opacity', k); g.setAttribute('transform', 'translate(0 ' + ((1 - k) * 4).toFixed(2) + ')'); });
  document.getElementById('tag').style.opacity = win(t, 5.6, 6.4);
  // 8.6–12s end card
  const end = document.getElementById('end');
  end.style.opacity = win(t, 8.6, 9.3);
  document.getElementById('rule').style.width = win(t, 9.0, 9.8) * 160 + 'px';
};
setT(0);
</script></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [name, w, h] of [['uia-reveal-reel-1080x1920', 1080, 1920], ['uia-reveal-screen-1920x1080', 1920, 1080]]) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-vid-'));
    fs.writeFileSync(path.join(tmp, 'v.html'), html(w, h));
    await page.setViewportSize({ width: w, height: h });
    await page.goto('file://' + path.join(tmp, 'v.html'));
    await page.evaluate(() => document.fonts.ready);
    for (let f = 0; f < FPS * SECONDS; f++) {
      await page.evaluate((t) => window.setT(t), f / FPS);
      await page.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, '0')}.png`) });
    }
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'),
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', path.join(OUT, name + '.mp4')]);
    fs.copyFileSync(path.join(tmp, `f${String(Math.round(FPS * 6.8)).padStart(4, '0')}.png`), path.join(OUT, name + '-cover.png'));
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log('wrote', name);
  }
  await browser.close();
})();
