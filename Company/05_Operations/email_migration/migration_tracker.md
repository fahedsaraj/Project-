# Email & Platform Migration Tracker

> Owner: Forge. Update **before** and **after** each change. One platform at a time; test login + recovery after each. No passwords or codes here.
> Status values: `Audit` → `Planned` → `In progress` → `Done (tested)` · or `Blocked` (say why).
> Guides: `workspace_setup_guide.md` (rows 1–2, 24), `gmail_transition_guide.md` (rows 14, 20).
> "New email" = the target account on the academy domain (D-04). ⟦domain⟧ is filled in once purchased.

| # | Platform | Old email (login / contact) | New email | Owner (L1 academy identity) | Access updated | 2FA | Status | Changed on / by | Notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Domain registrar | — (new) | admin@⟦domain⟧ | Academy (legal name) | — | ☐ | Blocked: D-04 | | Auto-renew + transfer lock |
| 2 | Google Workspace | — (new) | admin@⟦domain⟧ | Academy | — | ☐ | Blocked: D-04 | | Super admin + 2 admins |
| 3 | Meta Business portfolio (2726542811076338) | ⟦audit⟧ | admin@⟦domain⟧ (business email) | Academy (verified business) | ☐ | ☐ | Audit | | Ownership check first (D-07) |
| 4 | Facebook Page (1240732079125060) | ⟦audit⟧ | info@⟦domain⟧ (public contact) | Portfolio | ☐ | ☐ | Audit | | Renamed at the reveal 8 Oct |
| 5 | Instagram @success4sure_khalda → new handle | ⟦audit⟧ | marketing@⟦domain⟧ (login) · info@ (contact button) | Portfolio | ☐ | ☐ | Audit | | Don't change the login email on reveal day |
| 6 | Meta ad account (act_2067581237184445) | ⟦audit⟧ | accounts@⟦domain⟧ (billing) | Portfolio | ☐ | ☐ | Audit | | Paused (D-08) |
| 7 | WhatsApp Business (+962 79 055 5890) | ⟦audit⟧ | info@⟦domain⟧ (profile email) | Academy (SIM owner) | ☐ | ☐ (2-step PIN) | Audit | | The number never changes |
| 8 | Google Business Profile | — (to create/claim) | admin@⟦domain⟧ (owner) | Academy | ☐ | ☐ | Blocked: D-04 | | |
| 9 | Metricool (brand 7035734) | sarajfahed@gmail.com | marketing@⟦domain⟧ | Academy | ☐ | ☐ | Planned | | Personal → academy |
| 10 | Canva | ⟦audit⟧ | marketing@⟦domain⟧ (Teams owner admin@) | Academy | ☐ | ☐ | Audit | | |
| 11 | Website / hosting | — (none yet) | admin@⟦domain⟧ | Academy | — | ☐ | Blocked: D-04 | | |
| 12 | Google Drive (academy files) | sarajfahed@gmail.com (mixed with personal) | Academy Shared Drive | Academy | ☐ | ☐ | Audit | | Copy, don't move |
| 13 | Google Calendar (academy events) | none found | "UIA – Academy" calendar | Academy | — | — | Audit | | |
| 14 | Google Contacts (business contacts) | sarajfahed@gmail.com ⟦+ others, E-01⟧ | Workspace contacts / CRM sheet | Academy | ☐ | — | Audit | | Never in git |
| 15 | CRM / contact sheet | — (new) | admissions@⟦domain⟧ | Academy | — | — | Planned | | Keeper |
| 16 | Booking system | ⟦audit⟧ | admissions@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | If any |
| 17 | Payment platforms | ⟦audit⟧ | accounts@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | If any |
| 18 | Education platforms (online classes, LMS, Zoom/Meet) | ⟦audit⟧ | admissions@ / staff accounts | Academy | ☐ | ☐ | Audit | | |
| 19 | Software subscriptions | ⟦audit⟧ | accounts@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | List each |
| 20 | Old business Gmail(s) | ⟦E-01⟧ | Monitored 90 days + auto-reply | Academy | ☐ | ☐ | Audit | | Not deleted before Phase 9 |
| 21 | YouTube / TikTok (when started) | — | marketing@⟦domain⟧ | Academy | — | ☐ | Parked | | 60-day checkpoint |
| 22 | Password manager (academy business plan) | — (new, P01 1.4) | admin@⟦domain⟧ (organisation owner) | Academy | — | ☐ | Planned | | The only place credentials live; needed before Workspace sign-up |
| 23 | Instagram holding account `@success4sure_khalda` (if approved, Tier 2) | Interim academy Gmail (reveal guide Part 4) | marketing@⟦domain⟧ | Portfolio | ☐ | ☐ | Blocked: Tier 2 decision | | Old handle may be reserved ~14 days after the rename (*unverified*) |
| 24 | DMARC reports group | — (new) | dmarc@⟦domain⟧ | Academy | — | — | Blocked: D-04 | | Created in Workspace Step 5 |
| 25 | GitHub repo `fahedsaraj/Project-` (this marketing OS) | Fahed's personal GitHub account | Academy GitHub organisation owned by admin@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Found 7 Oct: the department's workspace sits in a personal account. Transfer to an academy org is Tier 2 |
| 26 | Claude workspace (AI team sessions + connectors) | sarajfahed@gmail.com (*assumption: the connected Google account*) | fahed@⟦domain⟧ or an academy team plan | Academy | ☐ | ☐ | Audit | | Connectors are linked to whichever accounts Fahed signed in with; list them in Phase 1 |
| 27 | Adobe (Express / Creative Cloud) | ⟦audit⟧ (connector present) | marketing@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Seen as a connector in the AI workspace; login email unknown |
| 28 | Figma | ⟦audit⟧ (connector present) | marketing@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Same |
| 29 | Miro | ⟦audit⟧ (connector present) | marketing@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Same |
| 30 | Slack | ⟦audit⟧ (connector present) | fahed@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Same; confirm whether it's academy or another client's workspace |
| 31 | WordPress / WP Agent | ⟦audit⟧ (connector present) | admin@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | Only if a site exists for the academy |
| 32 | vidIQ / YouTube | ⟦audit⟧ (connector present) | marketing@⟦domain⟧ | Academy | ☐ | ☐ | Audit | | YouTube is parked; check which channel is linked |

## Change log
| Date | Platform | Change | By | Tested (login / recovery) |
|---|---|---|---|---|
| | | | | |
