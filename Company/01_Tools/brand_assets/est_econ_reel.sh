#!/usr/bin/env bash
# EST Economics teacher reel: grade + punch-ins on the source clip, transparent motion-graphics overlay, synthesised music/SFX under the voice.
# Usage: est_econ_reel.sh source.mp4 overlay.mov workdir out.mp4
set -euo pipefail
SRC="$1"; OV="$2"; W="$3"; OUT="$4"; HERE="$(cd "$(dirname "$0")" && pwd)"; SKILL="$HERE/../../../.claude/skills/uia-video-studio/scripts"
# punch-in zoom per spoken phrase (cuts on the speech pauses)
Z="if(lt(it,1.88),1.16-0.02*it,if(lt(it,3.87),1.0+0.025*(it-1.88),if(lt(it,5.49),1.09,if(lt(it,6.93),1.17+0.01*(it-5.49),if(lt(it,8.31),1.0+0.03*(it-6.93),if(lt(it,9.73),1.14,1.04+0.04*(it-9.73)))))))"
ffmpeg -v error -y -i "$SRC" -i "$OV" -filter_complex "
 [0:v]scale=1080:1920,setsar=1,
  eq=contrast=1.07:saturation=1.12:brightness=0.01,
  colorbalance=rs=-0.03:gs=-0.01:bs=0.05:rh=0.04:gh=0.01:bh=-0.03,
  curves=master='0/0 0.25/0.22 0.75/0.79 1/1',
  vignette=angle=PI/5,unsharp=5:5:0.4,
  zoompan=z='${Z//it/in/30}':d=1:x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*0.30':s=1080x1920:fps=30,
  tpad=stop_mode=clone:stop_duration=3.6,trim=0:14.8,setpts=PTS-STARTPTS[bg];
 [1:v]format=rgba[ov];[bg][ov]overlay=0:0:format=auto,format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 17 -preset slow "$W/video_silent.mp4"
ffmpeg -v error -y -i "$SRC" -vn -af "highpass=f=80,afftdn=nf=-25,loudnorm=I=-16:TP=-2" -ar 48000 "$W/vo.wav"
sed "s#VO_PLACEHOLDER#$W/vo.wav#" "$HERE/est_econ_reel_cues.json" > "$W/cues.json"
python3 "$SKILL/sound.py" "$W/cues.json" "$W/audio.wav"
ffmpeg -v error -y -i "$W/video_silent.mp4" -i "$W/audio.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
echo "out: $OUT"
