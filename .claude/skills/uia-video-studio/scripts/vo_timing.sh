#!/usr/bin/env bash
# Print the speech segments of a voice-over (start, end, length in seconds) so scene cuts can land on the pauses.
# Usage: vo_timing.sh vo.mp3 [noise_dB=-35] [min_pause_s=0.25]
set -euo pipefail
f="$1"; n="${2:--35}"; d="${3:-0.25}"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
ffmpeg -hide_banner -nostats -i "$f" -af "silencedetect=noise=${n}dB:d=${d}" -f null - 2>&1 |
awk -v dur="$dur" '
  /silence_start/ {s=$NF; if (s>last+0.05) {printf "seg %2d  %6.2f → %6.2f  (%.2f s)\n", ++k, last, s, s-last}}
  /silence_end/   {split($0,a,"silence_end: "); split(a[2],b," "); last=b[1]}
  BEGIN {last=0}
  END {if (dur-last>0.05) printf "seg %2d  %6.2f → %6.2f  (%.2f s)\n", ++k, last, dur, dur-last; printf "total %.2f s\n", dur}'
echo "Tip: put each scene cut ~0.1 s before a segment start; whoosh ~0.4 s before the cut."
