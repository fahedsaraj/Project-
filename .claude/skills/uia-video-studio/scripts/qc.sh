#!/usr/bin/env bash
# QC a finished video: contact sheet (one frame every STEP s), frames around given cut times, loudness + peak.
# Usage: qc.sh final.mp4 [outdir=qc] [step=2.5] [cut times...]
set -euo pipefail
f="$1"; o="${2:-qc}"; step="${3:-2.5}"; shift $(( $# < 3 ? $# : 3 )); mkdir -p "$o"
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate:format=duration -of compact "$f"
ffmpeg -v error -y -i "$f" -vf "fps=1/${step},scale=270:-1,tile=6x3" -frames:v 1 "$o/contact_sheet.jpg"
for t in "$@"; do  # frames just before, during and after each transition
  for dt in -0.15 0.05 0.3; do tt=$(awk -v a="$t" -v b="$dt" 'BEGIN{x=a+b; if(x<0)x=0; printf "%.2f",x}')
    ffmpeg -v error -y -ss "$tt" -i "$f" -frames:v 1 -vf scale=540:-1 "$o/cut_${t}_${tt}.jpg"; done; done
ffmpeg -hide_banner -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -A20 'Summary' | grep -E 'I:|LRA:|Peak:' || echo "(no audio)"
echo "Targets: I ≈ -14 to -16 LUFS, true peak < -1 dBFS. Now view $o/*.jpg (safe zone: top 250 px, bottom 340 px on 9:16)."
