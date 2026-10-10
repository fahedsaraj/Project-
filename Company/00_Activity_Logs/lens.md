# Lens: Creative Studio: activity log

## 2026-10-07
- Done: rebuilt the official logo library from the guidelines PDF (3 lockups × 6 colour versions in SVG/PNG, print PDFs, social avatar, favicons, email-signature logo). Wordmark from the original vector outlines; symbol traced from the 330 px source image.
- Blocked / needs approval: Fahed's visual sign-off on the rebuilt files; the designer's source files (1.8) for large-format production.
- Next: template library spec (2.9) once the Canva brand kit exists.

## 2026-10-07 (evening)
- Done: reveal pack v1, 21 designs (teaser story, contest-thanks post, same-team post, 6 reveal-day stories, 5-slide FAQ carousel, Facebook cover, 5 highlight covers, reel end card); brand fonts stored locally; generator `01_Tools/brand_assets/reveal_pack.js`.
- Blocked / needs approval: Fahed's approval of the designs and of IBM Plex Sans Arabic as the Arabic font.
- Next: the reveal reel animation from the SVG layers; the teachers reel shot list for 15 Oct.

## 2026-10-07 (afternoon)
- Done: 12 s logo-reveal video in MP4 (reel 1080×1920 + screen 1920×1080, with covers); teaser and contest-thanks designs now say "tomorrow"; celebration print files (A3 poster PDF, cake print 2400 px).
- Next: the celebration recap reel from tomorrow's footage (only consented or non-identifiable student shots).

## 2026-10-07 (night)
- Done: celebration shot list (`P01/celebration_shot_list.md`, 14 shots with publish/consent marks); recap reel plan (`P01/celebration_recap_reel_plan.md`, 25 s, AR+EN text, end card) + 4 ready-made text overlays (`reveal_pack/recap-reel/`, generator `recap_overlays.js`); QA of all reveal-pack PNGs + MP4s: fixed same-team post label/symbol, story-6 symbol safe zone, programmes highlight, MP4 closing frame now has the symbol (re-rendered).
- Blocked / needs approval: Fahed approves the shot list, the reel plan and the fixes; a second camera person must be named tonight (Fahed is speaking); IBM Plex Sans Arabic still pending.
- Next: edit the recap reel from the ✅ footage once it's on the academy drive (Sat 10 Oct).

## 2026-10-07 (late)
- Done: building directory sign 600 × 250 mm (Midnight panel, reversed horizontal logo, gold base line): vector PDF (trim + 3 mm bleed), preview, mockup on the lobby photo, spec for the sign maker (`P01/building_sign/`); generator `building_sign.js`.
- Blocked / needs approval: Fahed approves the design; production cost (Tier 2); building management OK; a physical colour sample before production.
- Next: adjust after Fahed's feedback; hand the PDF to the sign maker once approved.
- Done (later): press-ready print PDF with 3 mm bleed + crop marks (`uia-building-sign-600x250mm-PRINT.pdf`).

## 2026-10-07 (late, 2)
- Done: roll-up banner 830 × 2000 mm from Fahed's text: 3 press PDFs (arrow up/left/right; 5 mm bleed, crop marks, fonts embedded), previews, mockup, printer spec (`P01/rollup_banner/`); generator `rollup_banner.js`; static Archivo cuts for print; memory: academy is on floor 4.
- Blocked / needs approval: Fahed approves the design; printing cost (Tier 2); colour strip before production.
- Next: Arabic version if Fahed wants it (needs D-06).

## 2026-10-07 (late, 3)
- Done: A4 print colour & production spec for printers (`03_Assets/Brand/Print/UIA_Print_Colour_Spec_A4.pdf`, generator `print_spec.js`): CMYK + Pantone + HEX + RGB from guidelines p.13, per-job material/finish notes. Corrected the sign and banner READMEs (they wrongly said CMYK/Pantone weren't defined) and added the values to the brand summary.
- Blocked / needs approval: printed colour proof before production (guidelines require it).

## 2026-10-07 (evening, reel)
- Done: edited Fahed's 7.5 s speaker clip into a 10 s branded reel, two versions (`P01/speaker_reel/`): A pre-reveal (no new logo, teaser end card, OK to post today) and B post-reveal (logo strip + official end card); synthesised SFX, voice clean-up, ≈ −15 LUFS; generator `speaker_reel.js`.
- Blocked / needs approval: Fahed approves and posts. Subtitles need the spoken words (offline speech-to-text is blocked by the network; an online service needs approval).
- Next: add subtitles once the words are sent.

## 2026-10-07 (evening, print fix)
- Done: the printer (CorelDRAW) lacked the brand fonts → made "PRINT-CMYK-curves" PDFs for the 3 roll-ups and the building sign: text as curves (0 fonts), exact brand CMYK values (guidelines p.13), Trim/Bleed boxes. Tools: `corel_export.sh`, `outline_pdf.js`, `rgb_to_cmyk_pdf.py`.
- Next: the printer's colour proof → Fahed approves.

## 2026-10-09
- Done: Facebook page kit (`P01/facebook_kit/`): cover v2 1640×624 (programmes, Floor 4, phone; mobile-safe), profile picture (official avatar), bio EN 100/101 + AR 95/101, page settings sheet. Found: the page phone shows the wrong grouping "+962 7 9055 5890"; the email is still the old-name Gmail.
- Blocked / needs approval: Fahed approves and applies; the address street, hours and email decision are Fahed's.
- Done (9 Oct, later): Instagram profile kit (`P01/instagram_kit/`): name 28/30 (UIA doesn't fit the 30-char name → in username/bio), bio EN 139/150 + AR 145/150, tagged WhatsApp link.
- Done (9 Oct, later): one-zip social kit for Fahed (profile/cover, FAQ carousel + same-team post, 6 stories, 5 highlight covers, 2 reels, recap overlays, READ_ME_FIRST.txt with all captions/bios; 37 files, 6.6 MB). Pre-reveal teaser/contest posts excluded (expired). Same-team post caption is a new draft.
- Done (9 Oct, later): AP weekly schedule post + story (`03_Assets/Posts/2026-10_AP_schedule/`), generator `ap_schedule.js`. Open: AP Calculus AB/BC, start date.
- Done (9 Oct, later): AP teacher campaign (`03_Assets/Posts/2026-10_AP_campaign/`): researched 45 IG posts via Metricool → 9 teachers / 14 AP subjects; 10 posts (intro + 1 per teacher, multi-subject teachers combined), captions AR+EN, overview, QC notes, zip. Typographic (no teacher photos reachable). 7 open points for the academic team (Micro vs Macro, Physics 1, CSP, Calc AB/BC, which subjects run this term…).
- Done (9 Oct, later): teacher photos added to the AP campaign (9 originals → local rembg cut-outs, edge clean-up, same framing on a brand panel; Bakheet scan lightly enhanced; Mina/Sara cropped to upper body). New zip delivered.
- Done (9 Oct, later): added Mr. Emad Dweik (عماد دويك; AP Calculus + AP Precalculus; English spelling to confirm) → 11 posts; portrait-model cut-out to remove the chair; zip rebuilt.
- Done (9 Oct, later): 'Digital SAT, decoded' post + story + caption (`03_Assets/Posts/2026-10_SAT_decoded/`), generator `sat_post.js`.
- Done (9 Oct, later): 'SAT Hint' series 01–03 (light Paper template, `03_Assets/Posts/2026-10_SAT_hints/`, generator `sat_hints.js`) + captions. Fixed Latin-in-Arabic font fallback in sat/AP generators; AP zip rebuilt.
- Done (9 Oct, later): illustrated student character added to SAT Hint 01–03 (brand-colour flat drawing, per-hint props) + 6 s animated MP4 versions. New illustration style: needs Fahed's OK (guidelines only cover photography).
- Done (9 Oct, later): registration reel AP·SAT·EST II (27 s, 1080x1920): kinetic animation + gold line wipes, Arabic VO (ElevenLabs 'Mohammad', 1 take; other 3 takes failed — ElevenLabs account flagged 'free tier disabled'), synthesised music bed + SFX, −15 LUFS. `03_Assets/Posts/2026-10_Registration_reel/`.
- Done (9 Oct, later): video skill `uia-video-studio` (`.claude/skills/uia-video-studio/`, package `01_Tools/skills/uia-video-studio.skill`): brief/fact check → storyboard → ElevenLabs VO → HTML scene template + frame renderer → synthesised music/SFX mix → QC (contact sheet, loudness) → delivery. Smoke test: 8 s demo rendered, −16.4 LUFS, peak −3.8 dBFS.
- Done (10 Oct): EST II exam-day Story (14 s, 1080x1920, motion + music/SFX, no VO) `03_Assets/Posts/2026-10_EST_exam_day_story/`; generator `est_story.html` + cues. Built with the uia-video-studio skill. −16.1 LUFS. Needs Fahed's OK before posting.
- Done (10 Oct): Digital SAT course schedule post + story (light Paper layout with week strip, distinct from the dark AP schedule) `03_Assets/Posts/2026-10_SAT_schedule/`, generator `sat_schedule.js`, AR+EN caption. Assumed 'thusday' = Tuesday; no start date/duration/mode shown (not given).
- Done (10 Oct): EST II registration-open + 30% early offer: post + story/WhatsApp status (coupon layout), AR+EN caption, WhatsApp message `03_Assets/Posts/2026-10_EST_registration/`, generator `est_registration.js`. Start date computed as Sat 17 Oct 2026. Discount is a pricing item: Fahed to confirm management approval + terms before posting.
- Update (10 Oct): EST II registration post: added 'لامتحانات شهر 12 · December exams', 'لمواد' now before EST II, EST II badge enlarged; captions updated.
- Done (10 Oct): EST Economics teacher ad reel (14.8 s, 1080x1920) from the teacher's footage: colour grade, punch-ins on the speech pauses, word-by-word Arabic captions of the given script, EST/ECONOMICS badge, UIA name card, strike-through, gold wipe at the shot change, end card + phone; synthesised beat/SFX ducked under the original voice, −15.5 LUFS. `03_Assets/Posts/2026-10_EST_Economics_reel/`. Skill: render_frames.js gained --alpha (transparent overlays for footage edits). Caption timing from pauses (no transcription available): Fahed to check sync.
