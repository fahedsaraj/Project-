#!/usr/bin/env bash
# Per-shot colour correction for the EST Economics teacher clip (measured, natural look; no stylised LUT).
# Shot 1 (0–6.933 s, logo wall): warm/dull cast → cool to 7200K, set black point, lift mids so skin matches shot 2.
# Shot 2 (6.933 s–end, books set): already balanced → light luma contrast only.
# Targets checked on stills: skin hue 22–26°, sat ≈0.5; light-blue shirt reads blue (hue ≈210°) in both shots.
# Usage: est_econ_grade.sh source.mp4 graded.mp4
set -euo pipefail
G1="colortemperature=temperature=7200:mix=1:pl=0.6,colorlevels=rimin=0.07:gimin=0.07:bimin=0.07,eq=gamma=1.1:saturation=0.92:contrast=1.05,curves=master='0/0 0.35/0.42 0.7/0.78 1/1',unsharp=3:3:0.3"
G2="eq=contrast=1.04:brightness=0.005:saturation=0.97,unsharp=3:3:0.3"
ffmpeg -v error -y -i "$1" -filter_complex "[0:v]split[a][b];[a]trim=end_frame=208,setpts=PTS-STARTPTS,$G1[v1];[b]trim=start_frame=208,setpts=PTS-STARTPTS,$G2[v2];[v1][v2]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -map 0:a -c:v libx264 -crf 14 -preset slow -c:a copy "$2"
