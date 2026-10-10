# KPI definitions v1 (7 Oct 2026)

> **Owner of this sheet:** Compass. **Validated by:** Atlas. **Approved by:** Fahed.
> **Rule:** one definition per metric, used by everyone. If a number in a report doesn't match a definition here, it isn't a KPI.
> **Targets:** none yet, except first-response time. Targets are set after a 4-week baseline (`team_operating_model.md` §8; P01 task 4.5, due 10 Dec).
> **Status column:** ✅ measurable now · 🟡 partly (manual or incomplete) · ⛔ not measurable until the named dependency exists.

## North star
| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| **Enrollments from marketing-sourced leads** | Students who paid/registered for a programme in the period **and** whose first contact has a marketing source tag (social organic, paid ad, website, Google, referral campaign). Walk-ins and existing-family re-enrolments are counted separately. | CRM sheet (lead record with source tag + "Enrolled" stage) | Compass (reports) · Keeper (data) | Weekly + monthly | ⛔ needs CRM v1 (P01 2.11) and source tags (4.2) |

## 1. Lead generation (Spark)
| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| **Leads** | New person (parent or student) who contacts us about a programme for the first time in the period, on any channel. One person = one lead, even across channels. | CRM sheet | Spark | Weekly | ⛔ CRM v1 |
| **Qualified leads** | Lead that meets all 3: (1) student in a target age/grade, (2) asks about a programme we offer, (3) gives a reachable contact and a time frame (this term / next exam). Keeper marks it in the CRM. | CRM sheet | Spark (Keeper qualifies) | Weekly, by **source** and **programme** | ⛔ CRM v1 |
| **Cost per qualified lead (CPQL)** | Meta ad spend in the period ÷ qualified leads tagged "paid" in the same period. | Meta Ads (via Metricool) + CRM | Spark | Weekly | ⛔ CRM v1 + source tags |
| **Paid messaging conversations** | Meta "messaging conversations started" (7-day attribution). A *proxy*, not leads. | Metricool → Meta Ads | Spark | Weekly | ✅ |
| **Cost per messaging conversation** | Spend ÷ paid messaging conversations. Proxy only. | Metricool → Meta Ads | Spark | Weekly | ✅ (≈ 3.7 per conversation, Sep 23–Oct 7: audit 7 Oct) |
| **Lead source mix** | % of leads by source tag: IG organic, FB organic, paid Meta, WhatsApp direct, Google, website, referral, walk-in, other. | CRM sheet | Compass + Spark | Weekly | ⛔ source-tag taxonomy (4.2) |

## 2. Conversion and follow-up (Keeper)
| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| **Median first-response time** | Median minutes from a lead's first message/call to our first human reply, **working hours only** (hours to be confirmed by Fahed). Auto-replies don't count. | WhatsApp Business (manual sample until CRM logs time) | Keeper + admissions | Weekly | 🟡 manual sample. **Target: < 15 min (proposed)** |
| **Lead → trial rate** | Leads that attended a free/trial class ÷ leads created in the same period (cohort by lead-creation week). | CRM sheet | Keeper | Weekly (4-week rolling) | ⛔ CRM v1 |
| **Trial → enrollment rate** | Trial attendees who enrolled within 30 days ÷ trial attendees (cohort by trial week). | CRM sheet | Keeper | Weekly (4-week rolling) | ⛔ CRM v1 |
| **Lead → enrollment rate** | Enrolled ÷ leads, by cohort week, source and programme. | CRM sheet | Keeper (Compass reports) | Monthly | ⛔ CRM v1 |
| **Existing-family retention** | Families with a student enrolled on 7 Oct 2026 who are still enrolled or re-enrolled at each checkpoint ÷ families enrolled on 7 Oct. **Churn** = 1 − retention. | Admissions register / contact list | Keeper | At 30/60/90 days (5 Nov, 5 Dec, 5 Jan) + any withdrawal flagged at once | 🟡 needs the 7 Oct family list (reveal plan) as the base |
| **Parent message reach (transition)** | Parents messaged / delivered / replied / raised a concern, for the reveal notice. | Keeper's contact list | Keeper | One-off (8–10 Oct), then per campaign | 🟡 manual |

## 3. Brand (Atlas)
| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| **Brand consistency score** | Touchpoints on the new identity (name, logo, phone +962 79 055 5890, bio, links) ÷ all touchpoints on the checklist. Target **100% by end of P01**. | Touchpoint checklist (`brand_change_kit.md`) | Atlas | Weekly until 100% | 🟡 checklist exists; score starts 8 Oct |
| **Pre-publish defects** | Published items with a placeholder, wrong programme name, wrong phone or unverified claim. Target **0**. | Compass weekly content scan | Atlas (Compass detects) | Weekly | ✅ (1 known: 4 Oct reel) |

## 4. Content and reach (Quill): secondary metrics only
These are useful signals, never goals on their own.

| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| **Followers (IG, FB)** | Account follower count at the end of the period (last value). | Metricool evolution (IGEV01, FBEV17) | Quill | Weekly | ✅ |
| **Net follower change** | Followers gained − followers lost in the period; report **unfollows separately**. | Metricool (IGEV43, IGEV44; FBEV47, FBEV48) | Quill | Weekly (daily during reveal week) | ✅ |
| **Avg reach per reel / per post / per story** | Metricool's average organic reach per item published in the period. | Metricool (IGEV30, IGEV19, IGEV20) | Quill | Weekly | ✅ |
| **Engagement rate** | Metricool aggregated engagement: interactions per avg reach per post, per Metricool's formula. Always state the formula when comparing with other tools. | Metricool (IGEV21; reels IGEV31) | Quill | Weekly | ✅ |
| **Shares + saves per reel** | Shares + saves ÷ reels in the period. Best organic signal of useful content. | Metricool reels (IGRE21, IGRE12) | Quill | Weekly | ✅ |
| **Content-to-conversation** | DMs + WhatsApp chats that mention a specific post, per post. | Tally sheet / CRM "first touch" field | Quill + Keeper | Monthly | ⛔ CRM v1 |
| **Top / bottom 3 posts** | Ranked by reach and by shares + saves (two lists). | Metricool | Compass | Weekly | ✅ |

## 5. Ads efficiency (Spark): diagnostic only
| KPI | Definition | Source | Owner | Frequency | Status |
|---|---|---|---|---|---|
| Spend, reach, CPM, CTR (link) | As defined by Meta (Metricool FACA13, FACA12, FACA20, FACA152). Currency = ad-account currency (assumed JOD, *to confirm*). | Metricool → Meta Ads | Spark | Weekly | ✅ |
| Frequency | Impressions ÷ reach (FACA151). Flag above 3 in 7 days. | Metricool → Meta Ads | Spark | Weekly | ✅ |
| Form leads | Meta on-platform leads (FACA91). Must match the CRM count; gaps are flagged. | Metricool → Meta Ads + CRM | Spark | Weekly | ✅ (0 recorded to date) |

## Reporting rules
1. **Every number carries its source and a confidence label:** High (direct from source) · Medium (calculated by us) · Low (estimate). "Unknown" is a valid answer; zero is not the same as unknown.
2. **Periods:** weeks run **Thursday → Wednesday**, so the Thursday review covers a complete week. Timezone Asia/Amman.
3. **Metricool lag:** IG data settles after ~2 days. Weekly numbers are pulled Thursday morning for the week ending the previous day, and figures from the last 2 days are marked *provisional*.
4. **Organic vs. paid:** report separately whenever an ad ran in the period.
5. **No personal data** in any report: counts and rates only.
6. **Changing a definition** needs a note in this file (date, what changed, why) and Atlas's sign-off. Old reports are not recalculated silently.

## Dependencies to make the north star measurable
| Needed | Task | Owner | Due |
|---|---|---|---|
| CRM sheet v1 with stages: New → Qualified → Trial booked → Trial attended → Enrolled / Lost | P01 2.11 | Keeper | 22 Oct |
| Source-tag taxonomy + tagged WhatsApp links / UTMs | P01 4.2 | Spark + Compass | after 2.11 |
| Daily WhatsApp enquiry tally (stopgap until CRM) | from 8 Oct | Admissions → Keeper | 8 Oct |
| Working hours for response-time KPI | decision | Fahed | next weekly review |

## Change log
- **v1, 7 Oct 2026:** first draft (Compass). Pending Atlas validation and Fahed approval.
