# UIA Brand Asset Library (official)

**Source of truth:** `UIA_Brand_Guidelines_v1.0_Oct2026.pdf`. Everything here follows it. **Never redraw, recolour, stretch, rearrange or retype the logo.**

## Logo files: `Logo/`
| Folder | Contents | Use for |
|---|---|---|
| `SVG/` | 3 lockups × 6 colour versions, tight-cropped vectors | Design work, website, Canva, printers (editable in Illustrator/Figma/Inkscape) |
| `PNG/` | Same 18 files, transparent, high-res, **with clear space included** (stacked 3000 px, horizontal 4000 px, symbol 2048 px) | Documents, slides, social designs |
| `PNG/web/` | Full-colour and reversed at 1000 px | Web, email, quick use |
| `PDF/` | Vector PDFs, full colour and reversed (reversed sits on Midnight) | Print shops |
| `Social/` | Avatar: reversed symbol on Midnight, 1080 / 320 px + SVG | Instagram, Facebook, WhatsApp, Google, email profile photos |
| `Favicon/` | `favicon.ico`, `favicon.svg`, 16/32/48/192/512 px, `apple-touch-icon.png` | Website, app icons |
| `../Email_Signature/` | Signature logo (360 px, shown at 180 px) + HTML template | Email signatures |

**Lockups (guidelines §07):**
- `stacked`: the primary logo
- `horizontal`: website headers, fascias, email signatures, lanyards
- `symbol`: avatars, favicons, crests

**Colour versions (§09):**
- `full-colour`: default, on white/Paper
- `reversed`: on Midnight
- `blue`, `black`: one-ink
- `gold`: foil/thread, on dark
- `white`: on dark/photos with enough contrast

**Minimum sizes (§08):**

| Lockup | Print | Screen |
|---|---|---|
| Stacked | 30 mm | 120 px |
| Horizontal | 45 mm | 180 px |
| Symbol | 10 mm | 24 px |

**Clear space:** x = the height of the UNITED letters, on all sides.

## How these files were made (7 Oct 2026)
- The approved logo existed only inside the guidelines PDF; no source files were available.
- **Wordmark:** the original Archivo letter outlines were lifted directly from the PDF's vector data, so the letterforms and spacing are exact.
- **Symbol:** the PDF only contains it as a 330 × 328 px image. It was traced into smooth vector curves in the two brand colours (#E2A02D, #29566C) and checked visually against the original.
- **Caveat:** the traced symbol is a high-fidelity reconstruction and is fine for screen, social and normal print. **Before very large or precision production (building fascia, embroidery, foil),** get the designer's original source file, or have a designer do a final vector clean-up.
- To rebuild everything: `01_Tools/brand_assets/build.sh`.

## Colours
| Name | HEX | RGB | Use |
|---|---|---|---|
| Midnight | #0B1626 | 11 22 38 | Dark ground: covers, signage, social posts |
| Academy Blue | #29566C | 41 86 108 | Primary colour, wordmark |
| Academy Gold | #E2A02D | 226 160 45 | One emphasis per layout; never behind long text |
| Platinum | #D8DADF | 216 218 223 | Neutral |
| Charcoal | #26292E | 38 41 46 | Text |
| Paper | #F5F4F0 | 245 244 240 | Light ground |

## Fonts (free Google Fonts)
- **Archivo:** text, labels (SemiBold caps, +180 tracking), body (Regular, 150% leading).
- **Newsreader:** headlines (24 pt+), quotes (italic).
- *Arabic font:* not defined in the guidelines. Lens will propose a pairing for approval (D-06 follow-up).

## Still needed
- Designer's original source files + IP assignment (P01 task 1.8)
- Approved photo library (real students, with consent)
- Canva brand kit (P01 task 2.8)
- Templates (P01 task 2.9)
