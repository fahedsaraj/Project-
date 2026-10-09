// Render an HTML animation that exposes window.setT(t) into a silent H.264 MP4.
// Tokens in the HTML are replaced before rendering:
//   {{BRAND}}         absolute path of Company/03_Assets/Brand (fonts, logos)
//   {{LOGO_STACKED}}  inline official stacked reversed logo SVG (full width of its container)
//   {{LOGO_H}}        inline official horizontal reversed logo SVG
//   {{SYMBOL}}        inline official symbol (reversed) SVG
// Usage: NODE_PATH=$(npm root -g) node render_frames.js scene.html out.mp4 [--dur 27] [--fps 30] [--w 1080] [--h 1920] [--brand <dir>] [--still t:out.png ...]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const args = process.argv.slice(2);
const [src, out] = args;
const opt = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const DUR = +opt('dur', 20), FPS = +opt('fps', 30), W = +opt('w', 1080), H = +opt('h', 1920);
const stills = args.flatMap((a, i) => (a === '--still' ? [args[i + 1]] : []));

function findBrand() {
  let d = process.cwd();
  for (let i = 0; i < 8; i++) {
    const c = path.join(d, 'Company/03_Assets/Brand');
    if (fs.existsSync(c)) return c;
    d = path.dirname(d);
  }
  return path.resolve(__dirname, '../../../../Company/03_Assets/Brand');
}
const BRAND = path.resolve(opt('brand', findBrand()));
const svg = (f) => fs.readFileSync(path.join(BRAND, 'Logo/SVG', f), 'utf8').replace(/<title>.*?<\/title>/, '')
  .replace('<svg ', '<svg style="width:100%;height:auto;display:block" ');

(async () => {
  if (!src || !out) { console.error('usage: render_frames.js scene.html out.mp4 [--dur s] [--fps n] [--w px] [--h px]'); process.exit(1); }
  let html = fs.readFileSync(src, 'utf8')
    .replaceAll('{{BRAND}}', BRAND)
    .replaceAll('{{LOGO_STACKED}}', svg('uia-logo-stacked-reversed.svg'))
    .replaceAll('{{LOGO_H}}', svg('uia-logo-horizontal-reversed.svg'))
    .replaceAll('{{SYMBOL}}', svg('uia-logo-symbol-reversed.svg'));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-frames-'));
  fs.writeFileSync(path.join(tmp, 'scene.html'), html); // file:// page so local fonts load
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + path.join(tmp, 'scene.html'));
  await p.evaluate(() => document.fonts.ready);
  for (const s of stills) { const [t, f] = s.split(':'); await p.evaluate((x) => window.setT(x), +t); await p.screenshot({ path: f }); }
  const n = Math.round(DUR * FPS);
  for (let f = 0; f < n; f++) {
    await p.evaluate((t) => window.setT(t), f / FPS);
    await p.screenshot({ path: path.join(tmp, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
    if (f % 150 === 0) process.stdout.write(`frame ${f}/${n}\n`);
  }
  await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(tmp, 'f%05d.jpg'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', '-movflags', '+faststart', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('video:', out);
})();
