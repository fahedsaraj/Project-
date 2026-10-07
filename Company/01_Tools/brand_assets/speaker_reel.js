// Edit a short talking-head clip into a branded 1080x1920 reel, in two versions:
//   A = pre-reveal (no new logo; ends on the teaser card), B = post-reveal (logo strip + official end card).
// Adds: slow push-in, a punch-in cut mid-clip, a slide transition into the end card, voice clean-up + loudness
// normalisation (-14 LUFS), and synthesised sound effects (whoosh, impact, shimmer), so there are no licensing issues.
// Usage: NODE_PATH=$(npm root -g) node speaker_reel.js <clip.mp4> <out-dir>
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const [clip, outDir] = process.argv.slice(2);
if (!clip || !outDir) { console.error('usage: speaker_reel.js <clip.mp4> <out-dir>'); process.exit(1); }
const BRAND = path.resolve(__dirname, '../../03_Assets/Brand');
const PACK = path.resolve(__dirname, '../../04_Projects/P01_Foundation_and_Transition/reveal_pack');
const FPS = 30, CARD = 3.0, XF = 0.4; // end card length, transition overlap (s)
const DUR = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', clip]).toString());
const PUNCH = +(DUR / 2).toFixed(2); // punch-in cut point
const TOTAL = DUR + CARD - XF;
const T_END = DUR - XF; // end-card transition starts

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'uia-reel-'));

  // Lower-third for version B: reversed horizontal logo on a Midnight strip (logo never sits on the busy footage).
  const logo = fs.readFileSync(path.join(BRAND, 'Logo/SVG/uia-logo-horizontal-reversed.svg'), 'utf8').replace(/<title>.*?<\/title>/, '');
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: 760, height: 190 } });
  await p.setContent(`<html><body style="margin:0;background:transparent"><div style="width:760px;height:190px;background:#0B1626;display:flex;align-items:center;padding:0 48px;box-sizing:border-box;border-bottom:6px solid #E2A02D"><div style="width:600px">${logo.replace('<svg ', '<svg style="width:100%;height:auto;display:block" ')}</div></div></body></html>`);
  await p.screenshot({ path: path.join(tmp, 'lt.png'), omitBackground: true });
  await browser.close();

  // Sound effects (mono 48 kHz WAV).
  const sfx = {
    whoosh: ['-f', 'lavfi', '-i', 'anoisesrc=d=0.8:c=pink:a=0.6:r=48000', '-af', 'highpass=f=350,lowpass=f=6000,afade=t=in:d=0.45:curve=exp,afade=t=out:st=0.45:d=0.35,volume=0.9'],
    impact: ['-f', 'lavfi', '-i', "aevalsrc='0.9*sin(2*PI*52*t)*exp(-5*t)+0.35*sin(2*PI*104*t)*exp(-8*t)+0.25*(random(0)-0.5)*exp(-40*t)':d=1.6:s=48000"],
    shimmer: ['-f', 'lavfi', '-i', "aevalsrc='0.10*(sin(2*PI*1318.5*t)+0.8*sin(2*PI*1975.5*t)+0.6*sin(2*PI*2637*t))*exp(-2.2*t)*(1-exp(-60*t))':d=2.2:s=48000"],
    swish: ['-f', 'lavfi', '-i', 'anoisesrc=d=0.4:c=white:a=0.25:r=48000', '-af', 'highpass=f=2500,afade=t=in:d=0.12,afade=t=out:st=0.12:d=0.28'],
  };
  for (const [k, a] of Object.entries(sfx)) run([...a, '-ac', '1', path.join(tmp, `${k}.wav`)]);

  for (const v of ['A', 'B']) {
    const card = v === 'A' ? path.join(PACK, 'pre-reveal/01-teaser-story.png') : path.join(PACK, 'covers/reel-end-card.png');
    const name = v === 'A' ? 'uia-speaker-reel-A-pre-reveal-1080x1920.mp4' : 'uia-speaker-reel-B-post-reveal-1080x1920.mp4';
    const n1 = Math.round(PUNCH * FPS), n2 = Math.round((DUR - PUNCH) * FPS), nc = Math.round(CARD * FPS);
    const grade = 'eq=contrast=1.04:saturation=1.06:gamma=0.98';
    // Footage: upscale first so the slow zoom is smooth; part 1 pushes 1.00→1.04, part 2 punches in at 1.12→1.15.
    let vf = `[0:v]setpts=PTS-STARTPTS,scale=2160:3840,${grade},split[a][b];` +
      `[a]trim=0:${PUNCH},setpts=PTS-STARTPTS,zoompan=z='1+0.04*on/${n1}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps=${FPS}[p1];` +
      `[b]trim=${PUNCH}:${DUR},setpts=PTS-STARTPTS,zoompan=z='1.12+0.03*on/${n2}':x='iw/2-iw/zoom/2':y='ih/2.25-ih/zoom/2.25':d=1:s=1080x1920:fps=${FPS}[p2];` +
      `[p1][p2]concat=n=2:v=1:a=0,fps=${FPS},settb=1/${FPS},format=yuv420p,setsar=1[foot];` +
      // End card settles from 1.06 to 1.00.
      `[1:v]scale=2160:3840,zoompan=z='max(1,1.06-0.06*on/${Math.round(nc * 0.7)})':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=${nc}:s=1080x1920:fps=${FPS},settb=1/${FPS},format=yuv420p,setsar=1[card];` +
      `[foot][card]xfade=transition=smoothup:duration=${XF}:offset=${T_END.toFixed(3)}[mix]`;
    if (v === 'B') {
      // Lower third slides in from the left at 0.6 s and out at 3.4 s (eased), above Instagram's caption area.
      const ease = (a, b) => `(1-pow(1-min(max((t-${a})/${b - a},0),1),3))`;
      vf += `;[mix][2:v]overlay=shortest=1:x='-780+840*${ease(0.6, 1.05)}-840*${ease(3.2, 3.6)}':y=1290:eval=frame[outv]`;
    } else vf += ';[mix]null[outv]';

    // Audio: cleaned, normalised voice + SFX at the cuts.
    const sIn = v === 'B' ? 3 : 2;
    const at = (i, s, vol) => `[${sIn + i}:a]adelay=${Math.round(s * 1000)}:all=1,volume=${vol}[s${i}]`;
    const fx = [['swish', v === 'B' ? 0.55 : 0.05, 0.5], ['swish', PUNCH - 0.12, 0.35], ['whoosh', T_END - 0.35, 0.8], ['impact', T_END + XF - 0.05, 0.9]];
    if (v === 'B') fx.push(['shimmer', T_END + XF, 0.9], ['whoosh', 3.15, 0.35]);
    const af = `[0:a]aresample=48000,afftdn=nf=-25,highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=out:st=${(DUR - 0.2).toFixed(2)}:d=0.2,apad=whole_dur=${TOTAL.toFixed(2)}[voice];` +
      fx.map(([, s, vol], i) => at(i, s, vol)).join(';') + ';' +
      `[voice]${fx.map((_, i) => `[s${i}]`).join('')}amix=inputs=${fx.length + 1}:normalize=0:duration=first,alimiter=limit=0.75:level=false[outa]`;

    const inputs = ['-i', clip, '-loop', '1', '-framerate', String(FPS), '-t', String(CARD), '-i', card];
    if (v === 'B') inputs.push('-loop', '1', '-framerate', String(FPS), '-t', TOTAL.toFixed(2), '-i', path.join(tmp, 'lt.png'));
    for (const [k] of fx) inputs.push('-i', path.join(tmp, `${k}.wav`));
    run([...inputs, '-filter_complex', `${vf};${af}`, '-map', '[outv]', '-map', '[outa]', '-t', TOTAL.toFixed(2),
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', path.join(outDir, name)]);
    run(['-ss', '1.5', '-i', path.join(outDir, name), '-frames:v', '1', path.join(outDir, name.replace('.mp4', '-cover.jpg'))]);
    console.log('wrote', name);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
})();
