# UIA brand essentials for video

Source of truth: `Company/03_Assets/Brand/UIA_Brand_Guidelines_v1.0_Oct2026.pdf` (summary: `Company/02_Reference/brand_guidelines_summary.md`). If anything here conflicts with those, they win.

## Name and identity
- **United International Academy** (short: UIA). Tagline: *Shaping Global Minds.*
- The new name was revealed on 8 Oct 2026. Until **6 Jan 2027** add the small secondary line «سابقاً Success 4Sure – خلدا» / "Formerly Success 4Sure – Khalda" in captions (never larger than or before the UIA name). Never mention the separation from the previous network or any internal conflict.
- Location: **Floor 4 · Khalda, Amman**. Phone (never changes, always this format): **+962 79 055 5890** (call or WhatsApp).

## Logo (official files only: never redraw, retype, recolour or stretch)
`Company/03_Assets/Brand/Logo/` → `SVG/`, `PNG/`, `PDF/`.
- On Midnight/dark: `uia-logo-stacked-reversed.svg`, `uia-logo-horizontal-reversed.svg`, `uia-logo-symbol-reversed.svg` (render_frames.js inlines these as `{{LOGO_STACKED}}`, `{{LOGO_H}}`, `{{SYMBOL}}`).
- On Paper/light: `*-full-colour.svg`. Single-colour versions exist in black/blue/gold/white.
- Over footage: put the logo on a solid Midnight plate or end card, never directly on busy video.

## Colour
| Name | HEX | Use |
|---|---|---|
| Midnight | #0B1626 | main background |
| Academy Blue | #29566C | tiles, secondary panels |
| Gold | #E2A02D | **one** emphasis per scene (key word, wipe, CTA frame) |
| Platinum | #D8DADF | labels, support text |
| Paper | #F5F4F0 | light backgrounds (posts, hint cards) |
| Charcoal | #26292E | text on Paper |

## Type (files in `Company/03_Assets/Brand/Fonts/`)
- **Archivo** (`static/Archivo-Regular.ttf`, `Archivo-SemiBold.ttf`, `Archivo-SemiBoldExpanded.ttf`): headlines, labels (Expanded + letter-spacing .2em for small caps labels), numbers, phone.
- **Newsreader** (woff2, normal + italic): English support lines, quotes.
- **IBM Plex Sans Arabic** (600/700 woff2): Arabic. *Pending formal approval (D-06)*: fine to use, flag if asked.
- Arabic containing Latin words: `font-family:'AR','A'`. Arabic runs inside English lines: `<span dir="rtl" style="unicode-bidi:isolate">`.

## Programmes (write exactly)
AP · SAT (Digital SAT: Reading & Writing + Math) · EST II · IGCSE · IB · IELTS · TOEFL.
Facts already confirmed in earlier work (check the post folders' QC notes for the latest): 14 AP subjects; EST II subjects Math 1, Math 2, Biology, Physics, English Literature, Arabic (*verify which run this term*); modes In-person / Online / Recorded. Teacher names and subjects: `Company/03_Assets/Posts/2026-10_AP_campaign/campaign_data.json`.

## Voice and claims
Clear, precise, warm, ambitious (`Company/00_Context/voice.md`). Arabic-first, Levantine-friendly; English as the support line.
Never: "guaranteed", "best in Jordan", invented statistics, score promises, prices, dates, discounts, scarcity ("limited seats") unless the user supplies and confirms them. No placeholders in anything sent for approval.

## People
Students are 15–18 (minors): no identifiable student photo/video without logged written parental consent. Teachers: use photos the academy supplied; note consent as an open item. Illustrated/animated characters are fine.

## Formats and safe zones
| Placement | Size | Keep text out of |
|---|---|---|
| Reel / Story / TikTok | 1080×1920 | top 250 px, bottom 340 px, right 120 px (buttons) |
| Feed | 1080×1350 | 60 px margin |
| Landscape / screen | 1920×1080 | 80 px margin |
Cover image for Reels: the middle 1080×1350 crop of the 9:16 frame is what shows on the profile grid, so put the title there.
