#!/usr/bin/env bash
# Print-shop export: text converted to curves (no fonts needed, e.g. CorelDRAW) + brand CMYK colours + Trim/Bleed boxes.
# Usage: corel_export.sh in.pdf out.pdf TRIM_OFFSET_MM BLEED_OFFSET_MM TRIM_W_MM TRIM_H_MM   (offsets from the page's top-left)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; IN="$1"; OUT="$2"; T="$3"; B="$4"; TW="$5"; TH="$6"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
read -r W H < <(pdfinfo "$IN" | awk '/Page size/{print $3, $5}')
pdftocairo -svg "$IN" "$WORK/a.svg"                                   # glyphs become paths
NODE_PATH="$(npm root -g)" node "$HERE/outline_pdf.js" "$WORK/a.svg" "$WORK/b.pdf"
pt() { python3 -c "print(round($1*72/25.4,3))"; }
python3 "$HERE/rgb_to_cmyk_pdf.py" "$WORK/b.pdf" "$OUT" --size "$W" "$H" --trim-offset "$(pt "$T")" --bleed-offset "$(pt "$B")" --trim-size "$(pt "$TW")" "$(pt "$TH")"
[ "$(pdffonts "$OUT" | tail -n +3 | wc -l)" -eq 0 ] || { echo "fonts left in $OUT"; exit 1; }
