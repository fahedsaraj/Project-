# Voice-over with ElevenLabs

Load tools with `ToolSearch` (`select:mcp__ElevenLabs__creative_generate_speech,mcp__ElevenLabs__creative_get_flow_run_status,mcp__ElevenLabs__creative_list_voices`).

## Voices that worked for UIA
| Voice | ID | Notes |
|---|---|---|
| Mohammad – Warm Arabic Commercial (male, Levantine) | `vszNunPGBVqJg1Qd4H7Z` | used for the Oct 2026 registration reel; energetic ad read |
| Farah (female, Jordanian) | `4wf10lgibMnboGJGCLrP` | alternative; softer, good for parent-facing content |
Voice IDs must come from `creative_list_voices` or the user: re-check they still exist before using them.
Model: `eleven_v4` (or the current default the tool suggests).

## Writing the script for TTS
- Short lines, one idea each, with «…» or a full stop where you want a pause: the pauses become your scene cuts.
- Spell exam names phonetically in the TTS text so they're pronounced in English letters: «إيه بي» (AP), «إس إيه تي» (SAT), «إي إس تي تو» (EST II), «آي جي سي إس إي» (IGCSE), «آي بي» (IB), «آيلتس» (IELTS), «توفل» (TOEFL). Keep the Latin spelling on screen and in the caption.
- Don't read the phone number in the VO unless asked (it's on screen); say «اتصل أو راسلنا على واتساب».
- The academy name is read in English: "United International Academy".
- Typical 25–27 s ad = 7–8 lines, ~55–65 Arabic words.

## Generating
1. `creative_generate_speech` once with the full script → poll `creative_get_flow_run_status` (wait `poll_after_seconds`) until done.
2. **Never call generate again to "retry"**: each call is charged. If it fails, read the error. In Oct 2026 the account returned "Free Tier access has been disabled" for most calls (1 of 4 succeeded): tell the user the account needs a paid plan or re-activation, and offer a text-led version without VO.
3. Several variations may come back: listen-check isn't possible for you, so pick the one whose duration best fits the plan and tell the user which one, so they can listen and swap.
4. Download the audio URL to the scratchpad (`curl -L -o vo.mp3 <url>`).

## Timing
`scripts/vo_timing.sh vo.mp3` → speech segments. Build `CUTS` in the scene HTML from the segment starts (cut ~0.1 s before a line starts), set `vo` and `vo_offset` in `cues.json`, and put a `whoosh` ~0.4 s before each cut. If a line runs long, stretch that scene rather than speeding up the voice.

## Ask the user to listen
You cannot hear the result. Always say: "please listen once for pronunciation (especially the exam names) and sync before posting."
