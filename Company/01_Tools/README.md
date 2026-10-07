# Tools

| Tool | What it does | Run |
|---|---|---|
| `build_combined_log.py` | Combines all agent logs into `00_Activity_Logs/combined_activity_log.pdf` | `python3 Company/01_Tools/build_combined_log.py` |
| `brand_assets/build.sh` | Rebuilds the full logo library from the guidelines PDF (vector wordmark from the PDF + traced symbol) | `Company/01_Tools/brand_assets/build.sh` |

`brand_assets/` needs poppler-utils, Python (numpy, Pillow, potracer) and Node with Playwright/Chromium.
