# Ads & Tracking Plan v1 (Spark)

> 7 Oct 2026 · Owner: Spark · Status: **PROPOSAL (Tier 0)**. Nothing in this file has been launched, paused or spent. Pausing and any budget are **Tier 2 (Fahed + management)**.
> Sources: `02_Reference/social_ads_audit_2026-10-07.md`, `05_Operations/phone_number_standard.md`, `00_Blueprint/strategy.md`, P01 tracker (tasks 1.7, 4.2, 4.3), decision D-08.

**Summary**
1. **Today:** pause both Meta campaigns (steps in §1). Metricool shows **0 scheduled posts** for 7 Oct–31 Dec (checked 7 Oct). Still check Meta's own Planner and boosts (§1.3).
2. **Tracking:** 8 tested, tagged WhatsApp links are ready (§2). The reveal story and IG bio go live with them tomorrow.
3. **Ads relaunch:** no earlier than **15 Nov**, and only after the 8 launch gates in §3.1 are met. EST II (December sitting) comes first, then a SAT cohort for the **6 Mar 2027** sitting. The proposed test budget is in §3.7, for Tier 2.

---

## 1. Pause the running campaigns today (D-08), steps for Fahed (~10 min)

### 1.1 Export the results first (2 min), so we keep the baseline
1. Go to **business.facebook.com → Ads Manager**, and pick ad account **act_2067581237184445** in the account switcher (top left).
2. Set the date range (top right) to **Maximum**.
3. Click **Reports → Export table data → .xlsx**. Save it to the academy Drive (`Analytics/Meta/2026-10-07_ads_export.xlsx`) for Compass.

### 1.2 Pause (don't delete)
1. **Campaigns** tab. Filter by **Delivery = Active** (and also check **Scheduled** and **In review**).
2. You should see two campaigns:
   - **"New Leads Campaign AP Track — International Reach (Sep 2026)"**: running since 23 Sep.
   - **"[9/30/2026] Promoting facebook page"** (Messages): set to run 30 Sep–7 Oct. It may end on its own today. Pause it anyway.
3. Switch the **toggle off** next to each campaign. Confirm the status shows **"Off"**, and that **Delivery** shows "Campaign off".
4. Open the **Ad sets** and **Ads** tabs, clear the filter, and confirm that nothing is "Active" (an ad set can't run if its campaign is off, but check anyway).
5. **Don't delete or edit** the campaigns. Pausing keeps the data and can be undone, while deleting is Tier 2 and irreversible.
6. Optional: under **Automated rules** (the ☰ menu → Automated rules), turn off any rule that could switch the campaigns back on.

### 1.3 Check that nothing old-brand is scheduled or boosted
| Where | What to check | Action if found |
|---|---|---|
| **Instagram app** → profile → ☰ → **Ad tools / Promotions** | Any active or scheduled **boosted post or reel** | Tap it → **Pause promotion** |
| **Facebook Page** → **Ad Center** (or Meta Business Suite → **Ads**) | Boosted posts, "Promote page" or "Get more messages" ads created outside Ads Manager | **Pause** |
| **Meta Business Suite → Planner / Content → Scheduled** | Scheduled posts, stories or reels for IG/FB | Unschedule anything with the old name, old logo, the old number (+962 79 070 4656) or a discount |
| **Metricool** (brand 7035734) → Planner | Scheduled posts | **Checked by Spark on 7 Oct: none scheduled** (7 Oct–31 Dec) |
| **Ads Manager → Campaigns**, filter **Scheduled** | Any campaign with a future start date | Toggle off |
| **WhatsApp Business** → Business tools → **Advertise** | Any WhatsApp-created ad | Pause |
| **Ads Manager → Billing** (look only) | Payment method owner (personal card?) | Note it for D-07. Don't change anything today |

### 1.4 Reply to Spark
Send one line: *"Paused: AP Track ✅, Promoting page ✅; boosts: none / X paused; scheduled: none / X removed; export saved ✅"*. Spark logs it, and D-08 / P01 1.7 are updated.

> **Why pause:** 0 form leads were recorded on the AP Track campaign, and no enrolments can be traced (audit). On top of that, old-brand ads running during the reveal would contradict the new identity. **Caveat:** if admissions knows of enrolments that came from these ads, tell us before pausing (D-08 condition).

---

## 2. Source-tag scheme & tagged WhatsApp links

### 2.1 Scheme
- **Format:** `CHANNEL-PLACEMENT[-CAMPAIGN][-VARIANT]`, all in CAPITALS, using A–Z, 0–9 and hyphens only. No spaces and no Arabic.
  - **Channel:** `IG`, `FB`, `WA`, `WEB`, `GBP`, `EMAIL`, `PRINT`, `AD`, `REF` (referral), `EVT` (event).
  - **Placement** (organic): `BIO`, `PAGE`, `STORY`, `REEL`, `POST`, `SIG`, `QR`, `HEADER`, `FOOTER`.
  - **Ads:** `AD-<PROGRAMME>-<MONYY>-<VARIANT>`, with programme codes `SAT`, `EST2`, `AP`, `IGCSE`, `IB`. Example: `AD-SAT-DEC26-A`.
  - **One-off moments** add a suffix, e.g. `IG-STORY-REVEAL`.
- **In the message:** the tag goes at the end as `[ref:TAG]`, after a short, natural Arabic opening line.
- **In the CRM:** admissions copies the tag into the **Source** field. If the tag was deleted by the sender, they ask "وين سمعت عنّا؟" and log `UNKNOWN-<answer>`.
- **On websites and forms later:** mirror the tag in UTMs, e.g. `utm_source=ig&utm_medium=bio&utm_campaign=organic`, and for ads `utm_source=meta&utm_medium=paid&utm_campaign=sat-dec26&utm_content=a`.
- **Register:** every new tag is added to table 2.2 *before* it goes live. Spark owns this list.

### 2.2 Live links (tested 7 Oct: each URL encodes without spaces, and decodes exactly to the message shown)
| Tag | Where it goes | Link | Decodes to | Test |
|---|---|---|---|---|
| `IG-BIO` | Instagram bio link / link-in-bio | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3AIG-BIO%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:IG-BIO]» | ✅ |
| `IG-STORY-REVEAL` | Reveal story 6, link sticker | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3AIG-STORY-REVEAL%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:IG-STORY-REVEAL]» | ✅ |
| `FB-PAGE` | Facebook Page: WhatsApp button / About link | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3AFB-PAGE%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:FB-PAGE]» | ✅ |
| `FB-REEL-REVEAL` | Reveal reel caption (Facebook; IG captions aren't clickable) | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3AFB-REEL-REVEAL%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:FB-REEL-REVEAL]» | ✅ |
| `EMAIL-SIG` | Email signature | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3AEMAIL-SIG%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:EMAIL-SIG]» | ✅ |
| `PRINT-QR` | Print QR (cards, posters, booklet) | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20United%20International%20Academy%20%5Bref%3APRINT-QR%5D` | «مرحباً، بدي أستفسر عن برامج United International Academy [ref:PRINT-QR]» | ✅ |
| `AD-SAT-DEC26-A` | Future ad: SAT (March 2027 sitting), Dec 2026 flight, variant A | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AF%D9%88%D8%B1%D8%A9%20SAT%20%5Bref%3AAD-SAT-DEC26-A%5D` | «مرحباً، بدي أستفسر عن دورة SAT [ref:AD-SAT-DEC26-A]» | ✅ |
| `AD-EST2-NOV26-A` | Future ad: EST II (December sitting), Nov 2026 flight, variant A | `https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AF%D9%88%D8%B1%D8%A9%20EST%20II%20%5Bref%3AAD-EST2-NOV26-A%5D` | «مرحباً، بدي أستفسر عن دورة EST II [ref:AD-EST2-NOV26-A]» | ✅ |

**Usage notes**
- **Instagram captions aren't clickable.** On the IG reveal reel, keep the caption as drafted (number + "link in bio"). The tagged link goes in the **Facebook** reel caption (`FB-REEL-REVEAL`). WhatsApp messages from IG reels will show up as `IG-BIO`. That's fine.
- **IG story link sticker:** paste the full `IG-STORY-REVEAL` URL. The sticker text can be "راسلنا على واتساب" / "WhatsApp us".
- **IG bio:** if a link-in-bio tool is used later, the WhatsApp button inside it uses `IG-BIO`.
- **Print QR:** Lens generates the QR from the `PRINT-QR` URL with error correction **M** or higher, at least **2 cm** wide, and tests it on 2 phones before sending to print. A long URL makes a dense QR, so if it scans poorly, Forge can host a short redirect on the academy domain (after D-04).
- **Email signature:** link the words "WhatsApp" to `EMAIL-SIG`, and show the number as **+962 79 055 5890**.
- **Facebook Page WhatsApp button:** Meta's native button doesn't accept a prefilled text. Use the `FB-PAGE` link in the **About → Website/links** field and in the pinned post. Native-button chats are logged as `FB-PAGE-BTN`.
- **Ad links** are examples. Final tags are set per ad when campaigns are built, and are registered here first.
- **Limits** *(assumption to monitor)*: some users delete the prefilled text, and chats that start from a saved contact carry no tag. We expect some untagged chats, so Keeper tracks the share of `UNKNOWN`. The target is under 20% *(target, not data)*.
- All links use the canonical number **+962 79 055 5890** (`962790555890`). The second number is not used (D-05).

---

## 3. Post-reveal ads plan v1 (proposal: budget is Tier 2)

### 3.1 Launch gates: no ad goes live until all 8 are ✅
| # | Gate | Owner | P01 ref |
|---|---|---|---|
| 1 | CRM sheet live, with **Source / Programme / Parent-or-student / Stage** fields, and admissions logging every chat | Keeper | 2.11 |
| 2 | Source tags in use on all organic links. One week of logging shows ≥ 80% of new chats tagged | Spark + Keeper | 4.2 |
| 3 | First-response time is measured. Target < 15 min during working hours | Keeper | — |
| 4 | Ad account, page and payment method under the **academy's** Business portfolio | Fahed | D-07 |
| 5 | Programme facts confirmed by the academic team: start dates, schedule, format, price (if shown) | Mgmt | — |
| 6 | Creative + copy approved, in the new identity, with no banned claims. Any student face needs written parental consent | Lens/Quill → Fahed | 3.5 |
| 7 | WhatsApp Business renamed, with greeting/away messages and labels set | Forge/Keeper | phone std §3 |
| 8 | Budget approved | Fahed + Mgmt | Tier 2 |

**Earliest start: Sun 15 Nov 2026** (P01 4.3). If the gates slip, the dates slip with them. We don't launch with blind tracking.

### 3.2 Products & timing (exam windows)
| Product | Exam window | Ad flight (proposal) | Offer to advertise |
|---|---|---|---|
| **EST II**: December sitting | December 2026. **Exact sitting date: unverified.** Admissions/academic team to confirm the date and registration deadline | **15 Nov → ~1 week before the sitting** (≈ 3 weeks) | Final-weeks EST II prep / practice tests (format to be confirmed by the academic team) |
| **SAT**: March 2027 cohort | SAT on **6 Mar 2027**, registration deadline **19 Feb 2027** *(per College Board's 2026-27 calendar as reported by third-party sites. Verify on satsuite.collegeboard.org before any ad states it)* | **29 Nov → ~10 Jan** for leads, so classes start early-to-mid January (≈ 8 weeks before the test) | SAT course for the March sitting: start date, schedule, free placement / diagnostic test *(to be confirmed by mgmt)* |

**Not chosen for now:**
- **SAT 7 Nov and 5 Dec 2026:** too close to the 15 Nov earliest start. The current SAT course (from 11 Oct) is served organically.
- **AP:** May 2027 finals. A recruitment flight would run Jan–Feb 2027, in v2.
- **IELTS, TOEFL, ACT:** wait for D-03.

### 3.3 Objective & conversion path
- **Primary: Engagement → Messages, click-to-WhatsApp** to +962 79 055 5890, with a prefilled message carrying the ad's tag.
  - The audit shows this path works: 29 conversations, at ~3.7 each (ad-account currency).
  - Families in Amman already use WhatsApp.
- **Not now:** Meta lead forms. The current leads campaign recorded 0 form leads, and forms need CRM intake + a privacy-policy URL (needs D-04 domain / website). We test them in v2 against WhatsApp.
- **Hand-off:**
  1. WhatsApp chat (tag) → admissions replies in < 15 min.
  2. Keeper logs it in the CRM as source + programme + parent/student.
  3. Placement / diagnostic or trial → enrolment.
  4. Spark reconciles the platform conversations against the CRM count every day.

### 3.4 Audiences (Amman parents first)
| Audience | Definition | Why |
|---|---|---|
| **A. Amman parents (core)** | Location: Amman, **people living in** the area (not "recently in"). Optionally a radius of ~10–15 km around Khalda to cover West Amman, where most international schools are *(assumption: check against where current students live)*. Age **35–55**, all genders, Arabic + English. Broad targeting (no interests), or light interests: parents of teenagers, international schools | 59% of followers are outside Amman, and 70% are 18–34 (audit). Ads must correct that |
| **B. Warm** | People who watched 50%+ of our videos, engaged with IG/FB, or messaged the page in the last 180 days. Amman only, 18+ | Cheapest conversations, already know us. Watch frequency |
| **C. Students (organic only)** | No paid targeting of under-18s. Students are reached through reels and content (role file rule) | Meta policy + minors |
| *D. Lookalike from the CRM* | *v2, needs approval:* uploading customer data to Meta is an outside-service transfer (CLAUDE.md rule 7) | Parked |

Exclusions: existing enrolled families, once the CRM can export them (with approval). Otherwise, admissions tags their chats as "Existing family".

### 3.5 Structure (per product)
- 1 campaign per product, with 1 ad set (audience A + B combined, or A only if the budget is low), so data isn't split too thin.
- 3 creatives per product, testing the angle:
  1. **Parent POV reel**: what the plan looks like, and how we report progress to parents. The best format in the audit.
  2. **Teacher-on-camera reel**: "what the test really asks", with the teacher's name and subject.
  3. **Static / carousel**: dates, schedule, CTA. Control only.
- One CTA: **"Send WhatsApp message"**. Each creative gets its own tag: `AD-EST2-NOV26-A/B/C`, `AD-SAT-DEC26-A/B/C`.
- Placements: Advantage+ (default), checked after week 1. Exclude Audience Network if conversations are low quality.

### 3.6 Creative & copy needs (brief to Lens + Quill by 2 Nov)
| Item | Owner | Spec |
|---|---|---|
| 2 reels per product (parent POV, teacher) | Lens (+ teacher on camera) | 9:16, 15–30 s, hook in the first 2 s, captions burned in AR/EN, new identity, logo from `03_Assets/Brand/Logo/` only |
| 1 static/carousel per product | Lens | 1:1 + 4:5 + 9:16 |
| Copy: 3 primary texts × 2 languages per product, plus headlines | Quill | Programme + date + benefit + one CTA. No "guaranteed", no score promises, no "best in Jordan", no discount unless management approves a price (Tier 2) |
| Prefilled messages (per tag) | Spark | As in §2.2 |
| Consent forms on file for any student on screen | Admissions | Written parental consent (minors) |

### 3.7 Budget (PROPOSAL, Tier 2 for Fahed + management)
*The ad account's currency isn't confirmed in our data (the audit says "currency as per ad account"). Figures are in that currency. All numbers are **estimates**.*
| Phase | Dates | Daily | Total (range) |
|---|---|---|---|
| EST II test | 15 Nov → ~5 Dec (≈ 21 days) | 5–8 | **≈ 105–170** |
| SAT March cohort | 29 Nov → 10 Jan (≈ 42 days) | 5–8 | **≈ 210–335** |
| **v1 total** | 15 Nov → 10 Jan | — | **≈ 315–505** |
- **Basis:** the last 2 campaigns spent ~106 in ~2 weeks (~7/day across 2 campaigns) for 29 conversations. At a similar ~3–5 per conversation *(assumption: new audience and creative will change this)*, v1 could bring roughly **65–170 conversations**. How many are *qualified* is unknown until the baseline.
- **Guardrails:**
  - a daily cap per campaign
  - pause any ad set with spend ≥ 3× the target cost per conversation and 0 conversations
  - no budget raise without Tier 2
  - Spark checks daily and reports anything abnormal the same day
- **Scale rule (week 3+):** if cost per *qualified* lead is under the agreed target and admissions can handle the volume, propose +20–30% per step (Tier 2).

### 3.8 KPIs
| KPI | Definition | Target (v1) |
|---|---|---|
| Cost per conversation | Spend ÷ WhatsApp conversations started (Meta) | Baseline in weeks 1–2. Reference: ~3.7 (audit) |
| **Qualified lead rate** | Share of conversations that are a parent/student, in Amman, grade 10–12, interested in the advertised programme, and reachable | Baseline. Hypothesis ≥ 40% *(unverified)* |
| **Cost per qualified lead (CPQL)** | Spend ÷ qualified leads (CRM) | **Main paid KPI.** Set the target after 2 weeks |
| Tag capture | Share of ad chats with the correct `ref` | ≥ 95% |
| CRM match | CRM-logged ad leads ÷ Meta conversations | ≥ 90% daily |
| First response | Median minutes to first reply | < 15 min (working hours) |
| Lead → placement/trial | Rate | Baseline |
| Trial → enrolment | Rate | Baseline. **North star:** enrolments from ads |
| Creative | Hook rate (3-s views ÷ impressions), CTR, cost per conversation per creative | Kill the bottom creative after ~1 week / enough spend |

### 3.9 Reporting
- **Daily:** spend, conversations, errors, CRM match (Spark → logs).
- **Weekly (Thursday review):** stop / start / scale, with Compass.
- **Week 4:** baseline read-out (CPL, CPQL, lead quality) → v2 plan (AP, lead forms vs. WhatsApp, lookalikes if approved).

### 3.10 Timeline
| Date | Step | Owner |
|---|---|---|
| **7 Oct** | Pause campaigns + boost/schedule check (§1) | Fahed |
| 8 Oct | Tagged links live: IG bio, reveal story, FB page (§2) | Fahed / Forge |
| By 22 Oct | CRM sheet with a Source field; admissions trained on logging `ref` | Keeper |
| 26 Oct | Confirm the EST II December sitting date + SAT March cohort start/schedule/price | Mgmt → Spark |
| By 2 Nov | Creative/copy brief → Lens + Quill | Spark |
| 9 Nov | Creative + copy to Fahed for approval; budget to Fahed + Mgmt | Spark |
| 12 Nov | Tracking gate check (§3.1) | Spark + Keeper |
| **15 Nov** | EST II flight live (if all gates ✅) | Spark builds, Fahed approves launch |
| 29 Nov | SAT March flight live | Spark |
| 10 Dec | Baseline read-out (week 4) | Spark + Compass |

---
**Sources for the exam dates:** [College Board SAT dates & deadlines](https://satsuite.collegeboard.org/sat/dates-deadlines), [Magoosh: SAT test dates 2026-27](https://magoosh.com/sat/sat-test-dates-find-best-date/). EST II dates: no reliable public source found. Confirm with the academic team.
