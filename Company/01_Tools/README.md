# Tools

| Tool | What it does | Run |
|---|---|---|
| `build_combined_log.py` | Combines all agent logs into `00_Activity_Logs/combined_activity_log.pdf` | `python3 Company/01_Tools/build_combined_log.py` |
| `brand_assets/reveal_pack.js` | Renders the transition/reveal designs (stories, posts, FAQ carousel, covers) into `04_Projects/P01_Foundation_and_Transition/reveal_pack/` | `NODE_PATH=$(npm root -g) node Company/01_Tools/brand_assets/reveal_pack.js` |
| `brand_assets/reveal_video.js` | Renders the 12 s logo-reveal video (reel 1080×1920 + screen 1920×1080) as MP4 | `NODE_PATH=$(npm root -g) node Company/01_Tools/brand_assets/reveal_video.js` |
| `brand_assets/build.sh` | Rebuilds the full logo library from the guidelines PDF (vector wordmark from the PDF + traced symbol) | `Company/01_Tools/brand_assets/build.sh` |

`brand_assets/` needs poppler-utils, Python (numpy, Pillow, potracer) and Node with Playwright/Chromium.
