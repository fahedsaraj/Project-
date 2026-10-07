#!/usr/bin/env bash
# Rebuild every UIA logo file from the brand guidelines PDF.
# Needs: poppler-utils (pdftocairo, pdfimages), python3 + numpy + Pillow + potracer, node + playwright.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PDF="$HERE/../../03_Assets/Brand/UIA_Brand_Guidelines_v1.0_Oct2026.pdf"
OUT="$HERE/../../03_Assets/Brand/Logo"
WORK="$(mktemp -d)"
pdftocairo -svg -f 7 -l 7 "$PDF" "$WORK/p7.svg"
pdftocairo -svg -f 9 -l 9 "$PDF" "$WORK/p9.svg"
# Page 11, first image = full-colour symbol (gold + blue), second = its alpha mask.
pdfimages -png -f 11 -l 11 "$PDF" "$WORK/img11"
python3 "$HERE/trace_symbol.py" "$WORK/img11-000.png" "$WORK/img11-001.png" "$WORK/symbol_traced.svg"
cat > "$WORK/lockups.json" <<JSON
{"traced": "$WORK/symbol_traced.svg",
 "lockups": {
  "stacked":    {"page": "$WORK/p7.svg", "matrix": [0.45,0,0,0.448171,231.74999,264.749989], "region": [150, 440, 470, 480]},
  "horizontal": {"page": "$WORK/p9.svg", "matrix": [0.190909,0,0,0.192073,173.999993,592.499975], "region": [230, 590, 470, 650]},
  "symbol":     {"page": "$WORK/p7.svg", "matrix": [1,0,0,1,0,0]}
 }}
JSON
python3 "$HERE/build_lockups.py" "$WORK/lockups.json" "$WORK/parts.json"
NODE_PATH="$(npm root -g)" node "$HERE/export_logos.js" "$WORK/parts.json" "$OUT"
python3 -c "from PIL import Image; d='$OUT/Favicon'; Image.open(d+'/icon-48.png').save(d+'/favicon.ico', sizes=[(16,16),(32,32),(48,48)])"
echo "Logo files written to $OUT"
