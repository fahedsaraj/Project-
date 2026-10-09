"""Sound for the registration reel: synthesised music bed (120 BPM) + sound effects, mixed under the voice-over.
Everything is generated here (no samples, no licences). Usage: python3 reg_reel_audio.py vo.mp3 out.wav
Hit times match reg_reel.js."""
import subprocess, sys, wave
import numpy as np

SR, DUR = 48000, 27.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
t_all = np.arange(N) / SR

def env_exp(n, k): return np.exp(-k * np.arange(n) / SR)
def place(buf, sig, at, gain=1.0):
    i = int(at * SR); j = min(N, i + len(sig))
    if i < N: buf[i:j] += gain * sig[: j - i]
def lp(x, a):  # one-pole low-pass, a in (0,1): smaller = darker
    y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
def hp(x, a): return x - lp(x, a)

# ---------- drum + bass bed ----------
music = np.zeros(N)
beat = 60 / 120
def kick():
    n = int(.45 * SR); tt = np.arange(n) / SR
    f = 45 + 110 * np.exp(-tt * 28); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env_exp(n, 9) * 0.95
def hat(open_=False):
    n = int((.18 if open_ else .05) * SR); x = rng.standard_normal(n)
    return hp(x, .35) * env_exp(n, 18 if open_ else 70) * .22
def clap():
    n = int(.25 * SR); x = rng.standard_normal(n); e = np.zeros(n)
    for d in (0, .012, .024): e[int(d * SR):] += env_exp(n - int(d * SR), 30)
    return hp(lp(x, .5), .08) * e * .35
K, H, HO, C = kick(), hat(), hat(True), clap()
roots = [55.0, 55.0, 43.65, 49.0]  # A1 A1 F1 G1, one bar each (4 beats)
start_drums, end_drums = 0.0, 24.6
b = 0
while b * beat < end_drums:
    at = b * beat
    if at >= start_drums:
        place(music, K, at)
        place(music, H, at + beat / 2)
        if b % 2 == 1: place(music, C, at)
        if b % 4 == 3: place(music, HO, at + beat * .75)
        # off-beat sub bass pluck
        f = roots[(b // 4) % 4]; n = int(beat * .48 * SR); tt = np.arange(n) / SR
        bass = (np.sin(2 * np.pi * f * tt) + .35 * np.sign(np.sin(2 * np.pi * f * 2 * tt))) * env_exp(n, 7)
        place(music, lp(bass, .08), at + beat / 2, .5)
    b += 1
# pad (A minor-ish triad) for warmth, slow fade in
pad = np.zeros(N)
for f in (220.0, 261.63, 329.63):
    pad += np.sin(2 * np.pi * f * t_all + rng.uniform(0, 6)) + .3 * np.sin(2 * np.pi * f * 2.003 * t_all)
pad = lp(pad, .02) * .05 * np.clip(t_all / 3, 0, 1) * np.clip((25.5 - t_all) / 1.5, 0, 1)
music += pad
# drop-out before the logo (tension), then back
gate = np.ones(N); gate[int(18.9 * SR):int(19.45 * SR)] = 0.15
music *= gate

# ---------- sound effects ----------
sfx = np.zeros(N)
def whoosh(d=.55, up=True):
    n = int(d * SR); x = rng.standard_normal(n); tt = np.linspace(0, 1, n)
    a = (.02 + .5 * tt) if up else (.52 - .5 * tt)
    y = np.empty(n); s = 0.0
    for i in range(n): s += a[i] * (x[i] - s); y[i] = s
    return y * np.sin(np.pi * tt) ** 1.5 * 1.4
def impact():
    n = int(1.4 * SR); tt = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-tt * 12)) * tt) * env_exp(n, 3.2)
    crack = hp(rng.standard_normal(n), .3) * env_exp(n, 40) * .6
    return (boom + crack) * .9
def riser(d=1.0):
    n = int(d * SR); x = rng.standard_normal(n); tt = np.linspace(0, 1, n)
    y = hp(x, .05) * tt ** 2.2 * .5
    tone = np.sin(2 * np.pi * np.cumsum(300 + 1500 * tt ** 2) / SR) * tt ** 2 * .18
    return y + tone
def glitch():
    n = int(.16 * SR); x = np.sign(np.sin(2 * np.pi * 1800 * np.arange(n) / SR)) * (rng.random(n) > .5)
    return x * env_exp(n, 25) * .25
def tick():
    n = int(.03 * SR); return np.sin(2 * np.pi * 2400 * np.arange(n) / SR) * env_exp(n, 160) * .3
def shimmer():
    n = int(2.2 * SR); tt = np.arange(n) / SR
    y = sum(np.sin(2 * np.pi * f * tt) for f in (1318.5, 1760, 2637, 3520)) * env_exp(n, 2.2) * (1 - np.exp(-tt * 60))
    return y * .07
def pop_():
    n = int(.12 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * (900 - 600 * tt / .12) * tt) * env_exp(n, 40) * .3

for c in (3.3, 7.6, 11.3, 13.8, 16.1, 19.4, 21.5):           # gold line wipes
    place(sfx, whoosh(), c - .4, .9)
for s in (3.4, 4.2, 5.0):                                   # AP / SAT / EST tiles slam
    place(sfx, impact(), s, .85)
place(sfx, glitch(), .05); place(sfx, glitch(), 1.6)          # hook glitches
place(sfx, impact(), .05, .6)
for i in range(14):                                         # counter ticks 0→14
    place(sfx, tick(), 7.75 + 1.3 * (1 - (1 - (i + 1) / 14) ** (1 / 3)))
for s in (11.6, 12.1, 13.9, 16.2, 16.8, 17.4, 18.5):        # pops on cards and modes
    place(sfx, pop_(), s, .9)
place(sfx, riser(1.0), 18.45)                                # riser into the logo
place(sfx, impact(), 19.45, 1.0); place(sfx, shimmer(), 19.5)
place(sfx, impact(), 21.55, .9); place(sfx, pop_(), 22.6)

def wavwrite(path, x):
    x = np.clip(x, -1, 1); w = wave.open(path, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype('<i2').tobytes()); w.close()

vo_mp3, out = sys.argv[1], sys.argv[2]
base = out.rsplit('.', 1)[0]
wavwrite(base + '_music.wav', music / np.max(np.abs(music)) * .8)
wavwrite(base + '_sfx.wav', sfx / np.max(np.abs(sfx)) * .9)
# Mix: VO cleaned + loud; music ducked under the VO (sidechain); SFX on top; master limiter. VO starts at 0.0 s.
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vo_mp3, '-i', base + '_music.wav', '-i', base + '_sfx.wav', '-filter_complex',
    '[0:a]aresample=48000,highpass=f=70,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,volume=1.6,apad=whole_dur=27,asplit=2[vo][key];'
    '[1:a]volume=0.55[mu];[mu][key]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=300[duck];'
    '[2:a]volume=0.75[fx];[vo][duck][fx]amix=inputs=3:normalize=0:duration=longest,'
    'loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.84:level=false,atrim=0:27[a]',
    '-map', '[a]', '-ar', '48000', '-ac', '2', out], check=True)
print('audio:', out)
