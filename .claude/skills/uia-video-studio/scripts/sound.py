"""Synthesised soundtrack for UIA videos: music bed + sound effects, mixed under an optional voice-over.
No samples, no licences. Usage: python3 sound.py cues.json out.wav

cues.json:
{
  "duration": 27,               # seconds
  "bpm": 120,                   # music tempo
  "music": true,                # drums + bass + pad
  "music_end": 24.6,            # stop drums here (let the CTA breathe); default = duration - 2
  "drops": [[18.9, 19.45]],     # music dips (tension) before big hits
  "vo": "vo.mp3", "vo_offset": 0.0,   # optional voice-over (music is ducked under it)
  "hits": [ {"type": "whoosh", "at": 3.1}, {"type": "impact", "at": 3.4, "gain": 0.85}, ... ]
}
Hit types: whoosh, impact, riser (use "dur"), glitch, tick, pop, shimmer.
Target: about -14 LUFS, peaks below -1.5 dBFS."""
import json, subprocess, sys, wave
import numpy as np

cfg = json.load(open(sys.argv[1])); out = sys.argv[2]
SR = 48000; DUR = float(cfg['duration']); N = int(SR * DUR)
rng = np.random.default_rng(7); t_all = np.arange(N) / SR

def env(n, k): return np.exp(-k * np.arange(n) / SR)
def place(buf, sig, at, gain=1.0):
    i = int(at * SR); j = min(N, i + len(sig))
    if 0 <= i < N: buf[i:j] += gain * sig[: j - i]
def lp(x, a):
    y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
def hp(x, a): return x - lp(x, a)

# ---------- music ----------
music = np.zeros(N)
if cfg.get('music', True):
    beat = 60 / float(cfg.get('bpm', 120)); end = float(cfg.get('music_end', DUR - 2))
    n = int(.45 * SR); tt = np.arange(n) / SR
    K = np.sin(2 * np.pi * np.cumsum(45 + 110 * np.exp(-tt * 28)) / SR) * env(n, 9) * .95
    def hat(o=False):
        m = int((.18 if o else .05) * SR); return hp(rng.standard_normal(m), .35) * env(m, 18 if o else 70) * .22
    H, HO = hat(), hat(True)
    m = int(.25 * SR); e = np.zeros(m)
    for d in (0, .012, .024): e[int(d * SR):] += env(m - int(d * SR), 30)
    C = hp(lp(rng.standard_normal(m), .5), .08) * e * .35
    roots = [55.0, 55.0, 43.65, 49.0]
    b = 0
    while b * beat < end:
        at = b * beat
        place(music, K, at); place(music, H, at + beat / 2)
        if b % 2: place(music, C, at)
        if b % 4 == 3: place(music, HO, at + beat * .75)
        f = roots[(b // 4) % 4]; k = int(beat * .48 * SR); tt = np.arange(k) / SR
        place(music, lp((np.sin(2 * np.pi * f * tt) + .35 * np.sign(np.sin(4 * np.pi * f * tt))) * env(k, 7), .08), at + beat / 2, .5)
        b += 1
    pad = sum(np.sin(2 * np.pi * f * t_all + rng.uniform(0, 6)) + .3 * np.sin(2 * np.pi * f * 2.003 * t_all) for f in (220.0, 261.63, 329.63))
    music += lp(pad, .02) * .05 * np.clip(t_all / 3, 0, 1) * np.clip((DUR - .5 - t_all) / 1.5, 0, 1)
    for a, z in cfg.get('drops', []): music[int(a * SR):int(z * SR)] *= .15

# ---------- sfx ----------
def whoosh(d=.55):
    n = int(d * SR); x = rng.standard_normal(n); tt = np.linspace(0, 1, n); a = .02 + .5 * tt
    y = np.empty(n); s = 0.0
    for i in range(n): s += a[i] * (x[i] - s); y[i] = s
    return y * np.sin(np.pi * tt) ** 1.5 * 1.4
def impact():
    n = int(1.4 * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * (38 + 60 * np.exp(-tt * 12)) * tt) * env(n, 3.2) + hp(rng.standard_normal(n), .3) * env(n, 40) * .6) * .9
def riser(d=1.0):
    n = int(d * SR); tt = np.linspace(0, 1, n)
    return hp(rng.standard_normal(n), .05) * tt ** 2.2 * .5 + np.sin(2 * np.pi * np.cumsum(300 + 1500 * tt ** 2) / SR) * tt ** 2 * .18
def glitch():
    n = int(.16 * SR); return np.sign(np.sin(2 * np.pi * 1800 * np.arange(n) / SR)) * (rng.random(n) > .5) * env(n, 25) * .25
def tick():
    n = int(.03 * SR); return np.sin(2 * np.pi * 2400 * np.arange(n) / SR) * env(n, 160) * .3
def pop():
    n = int(.12 * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * (900 - 600 * tt / .12) * tt) * env(n, 40) * .3
def shimmer():
    n = int(2.2 * SR); tt = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * tt) for f in (1318.5, 1760, 2637, 3520)) * env(n, 2.2) * (1 - np.exp(-tt * 60)) * .07
FX = {'whoosh': whoosh, 'impact': impact, 'riser': riser, 'glitch': glitch, 'tick': tick, 'pop': pop, 'shimmer': shimmer}
sfx = np.zeros(N)
for h in cfg.get('hits', []):
    fn = FX[h['type']]; sig = fn(h['dur']) if 'dur' in h and h['type'] in ('riser', 'whoosh') else fn()
    place(sfx, sig, float(h['at']), float(h.get('gain', 1.0)))

def wavwrite(p, x):
    x = np.clip(x, -1, 1); w = wave.open(p, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype('<i2').tobytes()); w.close()
base = out.rsplit('.', 1)[0]
norm = lambda x, g: x / (np.max(np.abs(x)) or 1) * g
wavwrite(base + '_music.wav', norm(music, .8)); wavwrite(base + '_sfx.wav', norm(sfx, .9))

vo = cfg.get('vo')
if vo:
    off = int(float(cfg.get('vo_offset', 0)) * 1000)
    fc = (f'[0:a]aresample=48000,adelay={off}:all=1,highpass=f=70,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,'
          f'volume=1.6,apad=whole_dur={DUR},asplit=2[vo][key];[1:a]volume=0.55[mu];'
          '[mu][key]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=300[duck];[2:a]volume=0.75[fx];'
          '[vo][duck][fx]amix=inputs=3:normalize=0:duration=longest,')
    ins = ['-i', vo, '-i', base + '_music.wav', '-i', base + '_sfx.wav']
else:
    fc = '[0:a]volume=0.7[mu];[1:a]volume=0.85[fx];[mu][fx]amix=inputs=2:normalize=0:duration=longest,'
    ins = ['-i', base + '_music.wav', '-i', base + '_sfx.wav']
fc += f'loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.84:level=false,atrim=0:{DUR}[a]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', fc, '-map', '[a]', '-ar', '48000', '-ac', '2', out], check=True)
print('audio:', out)
