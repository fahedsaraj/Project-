---
name: uia-video-studio
description: >-
  Produce finished, on-brand marketing VIDEOS for United International Academy (UIA): animated reels and ads,
  kinetic-typography explainers, registration/course promos (AP, SAT, EST II, IGCSE, IB, IELTS, TOEFL), logo reveals,
  animated versions of posts, edits of uploaded footage (talking heads, celebration clips), with Arabic/English
  voice-over, music bed, sound effects, transitions, captions and a delivery folder. Use this skill whenever the user
  asks for a video, reel, Reel/TikTok/Story video, animation, motion graphic, "animated post", promo/ad video,
  voice-over, VO, sound effects, transitions, "make it move", or uploads an .mp4/.mov to edit — even if they only say
  "make it modern/fancy/crazy for marketing" or describe the scenes without saying "video".
---

# UIA Video Studio

Make short marketing videos for United International Academy that are on-brand, factually safe and ready to post.
Everything is built from code (HTML scenes → frames → MP4, synthesised audio), so every video is reproducible and editable.

Read `references/brand.md` once per session before designing (colours, fonts, logo files, voice and claim rules, phone).
Bundled scripts live in `scripts/` (relative to this file); call them with absolute paths.

## 1. Brief and fact check (before any design)

Work out, from the request and the repo, then state your assumptions in one or two lines (ask only when a wrong guess would be expensive):

- **Goal and placement**: Reel/TikTok/Story (1080×1920, default), feed (1080×1350) or screen (1920×1080); length (15–30 s for ads).
- **Facts**: programmes, teachers, subjects, modes, location, phone. Use only facts found in the repo (`Company/03_Assets/Posts/*/QC_NOTES.md`, campaign READMEs, `00_Context/`) or given by the user. If a fact is missing, leave it out instead of inventing it. Never add dates, prices, discounts, "guaranteed", "score a 5", "limited seats", "the best", or statistics we can't document. These rules exist because a post with a placeholder and unverified claims already went live once.
- **Timing sensitivity**: anything showing the new name/logo must not go out before a planned reveal; minors (students 15–18) never appear identifiably without logged parental consent. Illustrated characters are fine (they're clearly drawings).
- **Language**: Arabic-first for Jordanian audiences, English as support lines; programme names exactly: AP, SAT, EST II, IGCSE, IB, IELTS, TOEFL.

## 2. Script and storyboard

Write a short scene table before building anything (it's what the user approves and what the timeline is built from):

| # | time | on-screen (AR / EN) | VO line | motion | SFX |
|---|---|---|---|---|---|

Good ad structure (≈ 22–27 s): hook (0–3 s, the problem or ambition) → offer (what we teach) → proof that is real (counts, modes, teachers' names from sources) → how (in-person/online/recorded) → logo hit → CTA (REGISTER / سجّل الآن + **+962 79 055 5890**, Floor 4 · Khalda, Amman). One idea per scene, max ~8 words on screen at once, text big enough for phones.

## 3. Voice-over (optional but expected for ads)

Use the ElevenLabs connector (`mcp__ElevenLabs__*`, load with ToolSearch). See `references/voiceover.md` for voice IDs, phonetic spelling of exam names, and the account gotchas. Key points:
- Write the VO script in natural Levantine-leaning Arabic; spell exam names phonetically in the TTS prompt («إيه بي، إس إيه تي، إي إس تي تو») but keep the Latin names on screen.
- One successful take is enough; never re-run to retry (it charges again). If generation fails for account reasons, tell the user plainly and continue with a VO-free version or a text-led cut.
- Download the take, then get line timings with `scripts/vo_timing.sh vo.mp3` (silence-based segments). **Cut scenes on the VO pauses**: that is what makes an animation feel professionally edited.

## 4. Visuals

Two paths:

**A. Animated / kinetic video (no footage).** Copy `assets/scene_template.html` to the scratchpad, edit the scenes and the `setT(t)` timeline, then render:
```
NODE_PATH=$(npm root -g) node scripts/render_frames.js scene.html out_silent.mp4 --dur 27 --w 1080 --h 1920
```
The template already has: brand tokens + fonts, an animated grid background, a gold diagonal "line wipe" transition on every cut, `pop` (overshoot slam), `rise`, counters, marquee chips, camera push + impact shake, white flash on big hits, and a logo-reveal scene using the official SVG. Keep motion purposeful: slams on key words, wipes on scene changes, one gold emphasis per scene.

**B. Edit uploaded footage.** Probe it (`ffprobe`), look at a contact sheet, then grade lightly (no heavy filters), push-in/punch-in, add a branded end card, lower-third logo strip (logo only on a Midnight plate, never on busy footage). The repo tool `Company/01_Tools/brand_assets/speaker_reel.js` is a worked example (talking head → branded reel with SFX). For people cut-outs use `scripts/cutout.py` (local rembg; `--portrait` model removes chairs/props).

Text inside Arabic that contains Latin words must use `font-family:'AR','A'` (Arabic font has no Latin glyphs) and RTL runs inside English lines need `dir="rtl" style="unicode-bidi:isolate"`; otherwise word order flips or Times appears.

## 5. Sound design

Generate the music bed and SFX locally (no licences needed) and mix under the VO:
```
python3 scripts/sound.py cues.json out_audio.wav
```
`cues.json` lists duration, BPM, an optional VO file, music drop-outs (tension before the logo) and hits: `whoosh` (each wipe, ~0.4 s before the cut), `impact` (slams, logo, CTA), `riser` (1 s into the logo), `glitch`, `tick` (counters), `pop` (cards), `shimmer` (logo). The script ducks music under the voice (sidechain) and normalises to about −14/−15 LUFS with safe peaks. Example: `assets/cues_example.json`.

Then mux: `ffmpeg -i out_silent.mp4 -i out_audio.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4`.

## 6. QC before delivery (look, don't assume)

Run `scripts/qc.sh final.mp4` → contact sheet (every ~2.5 s) + transition frames + loudness. Then actually view the images and check: text not clipped and inside the safe zone (top 250 px / bottom 340 px of a 9:16 frame are covered by Instagram UI), Arabic order correct, no Times/fallback fonts, logo is the official file, phone format exact, no dates/prices/claims, loudness ≈ −14 to −16 LUFS, peaks < −1 dBFS. Fix and re-render rather than shipping known issues. You cannot hear audio: say so, and ask the user to listen once for VO pronunciation and sync.

## 7. Deliver

Save to `Company/03_Assets/Posts/<YYYY-MM>_<Name>/`: final MP4, cover JPG (a clean frame, usually the CTA), `VO_SCRIPT_and_CAPTION.txt` (VO, on-screen text, Arabic + English caption with hashtags `#UnitedInternationalAcademy #UIA …` and the "Formerly Success 4Sure – Khalda" line while the 90-day rule applies), and keep the generator (scene HTML/JS + cues) next to the brand tools in `Company/01_Tools/brand_assets/` so it can be re-rendered. Append to the role log, commit, pull --rebase, push, and send the MP4 with `SendUserFile`.

Report back briefly: what's in the video (scene table), sound, what needs the user's ears/approval, open fact questions.
