# Gmail Routines: `UIA/Keep` labelling + weekly old-inbox count

> **Plan steps:** 1.4 / 1.5 (important conversations and attachments), Phase 4 (transfer emails) and Phase 7 (90-day transition, weekly check) of `email_migration_plan.md`.
> **Owner:** Keeper (routine) · **Does it:** Fahed in his personal Gmail; admissions in any dedicated business Gmail (E-01) · **Approver:** Fahed.
> **Rules:** labels only. Nothing is deleted, archived away, moved or forwarded in bulk by this routine. Counts go in the academy Sheet and Keeper's log; **never names, addresses or email content**.

---

## Part A. Labelling important conversations: `UIA/Keep` (one-off, 8–11 Oct)

### A1. Create the labels (2 min)
Gmail (web) → left menu → **Labels → +** (Create new label):
| Label | Use |
|---|---|
| `UIA` | Parent label (create first) |
| `UIA/Keep` | Business threads to transfer to the academy accounts (Phase 4) |
| `UIA/Archive` | Business history: reference only, goes to the read-only archive |
| `UIA/Incoming` | Business emails that arrive **after the reveal** (Part B counts these) |

To nest: when creating `Keep`, tick **"Nest label under" → UIA**.

### A2. Run the search pack, one query at a time (60–120 min, *estimate*)
Paste each query in the Gmail search bar. Review **page by page (50 threads)**, tick the business threads, click the label icon → `UIA/Keep` (or `UIA/Archive` if older than 2 years and only for reference).

| # | Looks for | Query |
|---|---|---|
| 1 | Parents and enrollments | `(تسجيل OR registration OR enrol OR enroll OR "AP" OR "SAT" OR "EST") -category:promotions -category:social` |
| 2 | Money | `(invoice OR receipt OR payment OR دفع OR فاتورة) has:attachment` |
| 3 | Partners and schools | `(school OR partnership OR مدرسة OR شراكة) -category:promotions` |
| 4 | Accounts and platforms (for Forge's list too) | `("verify your email" OR "confirm your email" OR "welcome to" OR "password reset")` |
| 5 | Results, certificates, contracts | `(results OR certificate OR contract OR agreement OR نتائج OR شهادة OR عقد) has:attachment` |
| 6 | **Known families and partners** | `from:(addr1 OR addr2 OR … ) OR to:(addr1 OR addr2 OR …)` built from the **Keep** emails in the master list (contact triage step 5), **20 addresses per query**. Copy the addresses from the Sheet into the search bar; don't save them anywhere else |

**Rules while labelling**
- **Never use "Select all conversations that match this search"** for queries 1–5: they are broad (e.g. "AP" also matches unrelated mail) and would pull personal threads in. Bulk-select is fine **only** for query 6, after a quick scroll.
- Personal, family or other-client threads: **leave them alone**, no label.
- Unsure → don't label, write the thread subject in a private note for Fahed. Personal mail never reaches the academy by mistake; a missed business thread can be added later.
- Attachments (1.5): label the thread; the attachment travels with it. Contracts, IDs and results go to `UIA/Keep` even if old.
- Students are minors: threads with student IDs, passports or results are `UIA/Keep`, and in Phase 4 go **only** to `management@` / the restricted archive, never to a group many people read.

### A3. Check and report (5 min)
Search `label:UIA-keep` and `label:UIA-archive` (Gmail writes nested labels with a hyphen in search). Gmail shows the count at the top right ("1–50 of N"); if it says "many", select all on the page → "Select all conversations that match" just to read the number, then **deselect**.
Send Keeper: `UIA/Keep labelling · <account> · <date> · Keep <n> threads · Archive <n> threads · queries run 1–6 · open questions <n>`.

**Next (Phase 4, after D-04):** Option A forwards key `UIA/Keep` threads to `admissions@` / `management@`; Option B (dedicated business Gmail only) migrates them with the Workspace tool. Forge runs it; this label is the input.

---

## Part B. Weekly old-inbox count (90 days: Sun 11 Oct 2026 → Sun 3 Jan 2027)

**Why:** Phase 7 keeps the old address monitored for 90 days. The count tells us when it's safe to step down to an auto-reply only (Tier 2 decision).

### B1. Set up once (10 min, on 11 Oct)
1. **Auto-label new business mail.** Gmail → Settings ⚙ → *See all settings* → **Filters and blocked addresses** → *Create a new filter*:
   - **From:** the Keep email addresses from the master list (up to ~20 per filter; make 2–3 filters if needed).
   - Click *Create filter* → tick **Apply the label: `UIA/Incoming`** → *Create filter*. **Don't** tick "Skip the inbox", "Delete it" or "Forward it".
   - Add one more filter with **Has the words:** `(تسجيل OR registration OR enrol OR enroll OR "SAT" OR "IGCSE" OR "EST II") -category:promotions` → label `UIA/Incoming`.
2. Anything business that the filters miss: label it `UIA/Incoming` by hand when you see it during the daily check.
3. In the academy Sheet, add a tab **`Old inbox – weekly count`** with these columns:

| week_ending (Sat) | account | business_emails_in | from_parents_students | from_partners_schools_suppliers | platform_or_account_emails | new_enquiries | replied_from_new_address | sender_told_new_address | notes |
|---|---|---|---|---|---|---|---|---|---|

### B2. Every Sunday, 10:00 (10 min)
1. Search: `label:UIA-incoming after:<last Sunday, YYYY/MM/DD> before:<today, YYYY/MM/DD>`
2. Count the threads, then split them by sender type (columns above). Platform/account emails (Meta, Google, Canva, Metricool…) → tell Forge: each one is a platform still using the old address (`migration_tracker.md`).
3. Fill one row in the tab. Before the new address exists (D-04), `replied_from_new_address` and `sender_told_new_address` stay `n/a`.
4. Send Keeper the one-liner: `Old inbox · week ending <date> · business in <n> (parents <n>, partners <n>, platforms <n>, new enquiries <n>) · told new address <n>`.
5. **New enquiry in the old inbox:** add it to the master list today (`contact_origin = Google Contacts`, `stage = New`) and reply within the working day; never let it wait for the weekly count.

### B3. Reading the trend (Keeper, monthly, to Compass and Fahed)
| Signal | Action |
|---|---|
| Parents still writing to the old address after 4 weeks | Admissions resends the "new email" note personally; check the email announcement reached them |
| Platform/account emails still arriving | Forge moves that platform to the new email (Phase 5 order) |
| **≤ 2 business emails a week for 4 weeks in a row** *(proposed threshold, Fahed to confirm)* | Keeper proposes to Fahed + management (Tier 2): keep the old address on auto-reply only |
| A spike | Find the source (an old flyer, a directory listing, an old signature) and fix it |

**Constraints to respect**
- If the old address is **Fahed's personal Gmail**, only Fahed can do Part B (admissions must not access a personal inbox), and the Phase 7 vacation responder must **not** be used: use the filter + template reply from the plan.
- The count starts as a **baseline** on 11 Oct even before the new email exists; it shows how much traffic will need to move.
- Last count: Sun 3 Jan 2027. The 90-day decision is at the Phase 9 / 6 Jan checkpoint; nothing is switched off before Fahed signs off.
