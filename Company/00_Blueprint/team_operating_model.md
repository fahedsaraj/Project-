# UIA Marketing Department: Team Operating Model

> v1.0, 7 Oct 2026. Designed as an internal agency for United International Academy: one human leader, a small human crew, and seven AI specialists working as one system under a Marketing Director.

## 1. Design logic
- **Build for this stage, not for show.**
  - UIA is a single-location academy in transition.
  - It needs a launch and leads, not a 15-person org chart.
  - The 15 capability areas are all covered, but combined into **7 AI roles**, each with one clear owner.
- **AI does the volume; humans do the trust.**
  - AI handles planning, writing, design briefs, analysis, follow-up structure and chasing.
  - Humans handle faces on camera, live conversations with parents, money, legal, and final approval.
- **One owner per outcome.** Every deliverable has exactly one producing role and one approver.

## 2. The team

### Human roles
| Role | Person | Owns | Approves |
|---|---|---|---|
| **Head of Marketing & Creative Director** | Fahed | Vision, creative direction, priorities, key relationships, hero shoots | Tier 1 (all publishing, customer messaging, ad creative); co-approves Tier 2 |
| **Academy Management (Owner/GM)** | ⟦name to confirm⟧ | Legal entity, money, contracts, licensing | Tier 2: budgets, offers, legal, ownership |
| **Admissions / Front Desk** | ⟦who answers WhatsApp & calls today?⟧ | Live conversations, trial bookings, enrollment, payments | Not an approver; executes Keeper's scripts |
| **Teachers** | Existing faculty | Subject expertise, on-camera content, results data | Accuracy of academic content |
| **Freelance videographer/editor** *(optional, add when needed)* | ⟦TBD⟧ | Extra shooting/editing capacity | Not an approver |

### AI roles (role files in `Team/`)
| # | Name | Role | Covers these capability areas |
|---|---|---|---|
| 01 | **Atlas** | Marketing Director (CMO) & Chief of Staff | Marketing Strategy · Brand Management · Creative Direction (support) · Project Management |
| 02 | **Quill** | Content & Community Lead | Content Strategy · Social Media · Copywriting (AR/EN) · Community Management |
| 03 | **Lens** | Creative Studio | Graphic Design · Reels & Video (concepts, scripts, shot lists, edit briefs, templates) |
| 04 | **Spark** | Paid Ads & Lead Generation | Paid Advertising · Lead Generation · Landing/lead forms · Tracking |
| 05 | **Keeper** | CRM & Admissions Follow-up | CRM & Customer Follow-up · Sales enablement · Retention & referrals |
| 06 | **Compass** | Analytics & Insights | Marketing Analytics · KPI dashboard · Reporting · Test analysis |
| 07 | **Forge** | Web, SEO & Digital Operations | Website & SEO · Google Business Profile · Email/domain/DNS · Accounts & access register · Tools |

**Why Analytics is separate from Ads:** Spark shouldn't grade its own homework. Compass reports the truth across every role.
**Why Forge exists now:** Fahed's first six build steps (ownership, access, email, phone, assets, accounts) are infrastructure. Without a clear owner, they stall.

## 3. Essential now vs. combined vs. later

**Essential now:**
- All 7 AI roles.
- Fahed.
- Management (for Tier 2).
- One named admissions person.

**Combined on purpose:**
- **Strategy + Brand + PM → Atlas.** One brain holding priorities, brand rules and the tracker.
- **Content + Social + Copy + Community → Quill.** The same voice plans, writes and answers.
- **Design + Video → Lens.** One creative system and one template library.
- **Ads + Lead gen → Spark.** Whoever buys the click owns the form and the hand-off.

**Add later, with a trigger:**
| Role | Add when |
|---|---|
| Human community manager | DMs and comments exceed ~40/day, or the median first reply exceeds 1 hour for 2 weeks |
| Human content creator / editor | More than 4 reels a week needed, or Fahed spends more than 10 h/week editing |
| Partnerships & school outreach (06_Outreach) | After the reveal; when the brand is live and the proof library exists |
| SEO content writer | When the multi-page website and blog are live (60-day checkpoint) |
| Product lead (academic kit & merch) | When the kit becomes a paid product, not just an enrollment welcome kit |
| Second admissions person | Leads exceed what one person can answer within 1 hour during working hours |

## 4. What AI does vs. what needs a human
| AI handles (Tier 0 to draft, Tier 1 to release) | Human required |
|---|---|
| Strategy docs, plans, calendars, briefs | Final approval of anything public (Fahed) |
| Arabic/English copy, captions, scripts, ad variants | Filming and photographing real students and teachers, with parental consent |
| Design briefs, template specs, layout direction | Live calls and WhatsApp conversations with parents (admissions) |
| Audience, targeting and budget proposals | Spending money and setting budgets (Fahed + management) |
| CRM structure, follow-up sequences and scripts, reminders | Prices, discounts, offers (management) |
| Dashboards, weekly reports, test reads | Legal: old-name use, contracts, licensing, data protection |
| Website copy, SEO plans, setup guides, DNS checklists | Account ownership actions needing ID/2FA (management/Fahed) |
| QA: brand, voice, programme names, phone format, placeholders | Crisis responses and public complaints (Fahed) |
| Scheduling approved posts in Metricool | Hero creative calls ("does this feel like UIA?") |

## 5. One connected system: the pipeline

```
 Strategy ──► Brand ──► Content ──► Creative ──► Production ──► Publishing ──► Advertising ──► Leads ──► Sales ──► Analytics ──► Optimization
  Atlas      Atlas      Quill       Lens        Lens + humans    Quill          Spark          Spark→Keeper  Keeper +     Compass      Atlas
  (Fahed ✓)  (Fahed ✓)                          (Fahed shoots)   (Fahed ✓)      (Fahed ✓ /     (auto)        Admissions                (loops back
                                                                                 Mgmt ✓ budget)                                         to Strategy)
```

### Hand-off table: what each step receives, produces, passes on, and who approves
| Step | Owner | Receives | Produces | Passes to | Approver | What happens next |
|---|---|---|---|---|---|---|
| Strategy | Atlas | Business goals, priorities, Compass insights | Monthly marketing plan: objectives, programme focus, budgets proposed | Quill, Spark, Forge | Fahed (Tier 1), budgets by Mgmt (Tier 2) | Quill builds the calendar; Spark builds the campaign plan |
| Brand | Atlas | Guidelines, voice.md | Brand rules, template rules, QA checklist | Everyone | Fahed | Applied as a gate before every approval |
| Content | Quill | Monthly plan | Content calendar (pillars, posts, reels, stories), captions AR/EN, creative briefs | Lens | Atlas (QA) → Fahed (calendar approval) | Lens produces assets |
| Creative | Lens | Creative briefs | Designs, reel scripts, shot lists, edit notes, thumbnails | Fahed/freelancer (shoot), Quill | Atlas (brand QA) | Shoot is scheduled |
| Production | Lens + Fahed/freelancer | Shot lists, consent forms | Final edited assets | Quill | Fahed | Ready for publishing |
| Publishing | Quill | Approved assets + captions | Scheduled posts (Metricool), community replies within templates | Spark (boost candidates), Compass | Fahed approves each batch | Organic data flows to Compass |
| Advertising | Spark | Plan, approved creatives, budget | Campaigns, audiences, lead forms, click-to-WhatsApp links with source tags | Keeper (leads), Compass | Fahed (creative), Mgmt (budget) | Leads arrive tagged by source |
| Leads | Spark → Keeper | Form leads, WhatsApp chats, DMs, walk-ins | Lead records in the CRM (name, parent/student, programme, source, stage) | Admissions | — (automatic intake) | First reply within the response target |
| Sales | Keeper + Admissions | Lead records | Scripts, follow-up sequences, trial bookings, enrollments | Compass | Fahed approves scripts (once) | Enrollment, or a reason for loss is logged |
| Analytics | Compass | Metricool, Meta Ads, CRM | Weekly KPI report, funnel, tests read-out | Atlas | — | Insights go to the weekly review |
| Optimization | Atlas | Compass report | Decisions: stop / start / scale, updated plan | All roles | Fahed (weekly review) | Next cycle starts |

### RACI on the key deliverables
*R = responsible, A = approves, C = consulted, I = informed*

| Deliverable | Atlas | Quill | Lens | Spark | Keeper | Compass | Forge | Fahed | Mgmt |
|---|---|---|---|---|---|---|---|---|---|
| 90-day & monthly plan | R | C | C | C | C | C | C | A | I |
| Content calendar | C | R | C | C | I | C | I | A | — |
| Posts & reels | C (QA) | R (copy) | R (asset) | I | I | I | — | A | — |
| Ad campaigns | C | C | C | R | C | C | I | A (creative) | A (budget) |
| CRM & follow-up scripts | C | C | — | C | R | C | C (tool) | A | I |
| Weekly KPI report | C | I | I | I | I | R | I | I | I |
| Accounts, email, domain, access | C | — | — | C | — | — | R | A | A (ownership) |
| Transition campaign (P01) | R | R (copy) | R (creative) | C | R (families) | C | R (infra) | A | A (legal) |

## 6. Operating rhythm (times proposed; see D-10)
| When | What | Owner | Output |
|---|---|---|---|
| Daily 08:30 (Sun–Thu) | Morning brief | Atlas | `07_Briefs/YYYY-MM-DD.md` |
| Daily | Community & DM check (with admissions), lead hand-offs | Quill, Keeper | CRM up to date |
| Daily 18:00 | End-of-day log per active agent | Each role | `00_Activity_Logs/*.md` + combined PDF |
| Weekly, Sunday | Plan the week: calendar, shoots, campaigns | Atlas + Quill + Spark | Weekly plan in the morning brief |
| Weekly, Thursday afternoon | Weekly review: KPIs → decisions | Compass → Atlas | `08_Reviews/YYYY-Www.md` |
| Monthly, 1st Sunday | Access review, plan for next month | Forge, Atlas | Updated access register, monthly plan |
| 5 Nov / 5 Dec / 5 Jan | 30/60/90 checkpoint | Atlas | Priorities revisited |

## 7. How the team thinks (operating principles)
1. **Every problem gets an owner and a date.** Atlas never leaves an issue as "noted".
2. **Propose, don't ask open questions.** Bring 1 recommended option (plus 1 alternative if real), not a menu.
3. **Execute what's approved without waiting**, then report.
4. **Measure everything that touches a lead:** source tags on every link, every form and every WhatsApp entry.
5. **Weekly improvement:** each review ends with stop / start / scale decisions.
6. **Gatekeeping is a job:** Atlas QA blocks anything off-brand, unverified or with placeholders.

## 8. Success metrics owned by the team
**North star:** enrollments from marketing-sourced leads (Compass).

| Metric | Owner | Target |
|---|---|---|
| Qualified leads per week, by source and programme | Spark | Baseline in weeks 1–4, then set |
| Cost per qualified lead | Spark | Baseline in weeks 1–4, then set |
| Median first-response time | Keeper + Admissions | **< 15 min in working hours** (proposed) |
| Lead → trial rate; trial → enrollment rate | Keeper | Baseline in weeks 1–4, then set |
| Existing-family retention through the transition (re-enrollment, churn) | Keeper | Baseline in weeks 1–4, then set |
| Brand consistency audit (all touchpoints on the new identity) | Atlas | 100% by end of P01 |
| Reach and engagement | Quill | Secondary metrics only |

Targets beyond the response-time target are set after a 4-week baseline, because there is no reliable historical data yet.
