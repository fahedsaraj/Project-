# Email Rebrand & Migration Plan: Gmail → United International Academy

> Owner: **Forge**. Customer data triage: **Keeper**. Messages: **Quill**. Approvals: **Fahed** (Tier 1) and **Fahed + management** (Tier 2: purchases, ownership changes, anything deleted).
> v1, 7 Oct 2026. Builds on `../email_setup.md` (structure and DNS) and `../ownership_and_access.md` (ownership model).
> **Golden rule: nothing is deleted, deactivated or switched off until the new system is verified (Phase 9). Every deletion needs Fahed's written OK.**

## Where we are (audit started 7 Oct 2026)
| Item | Finding | Source |
|---|---|---|
| Google account connected to this workspace | **sarajfahed@gmail.com, Fahed's personal Gmail** | Google Calendar / Drive connectors |
| Calendar | Personal + family calendars only; no academy calendar | Calendar connector |
| Drive | Mostly Fahed's personal and creative work (videos, other clients' shoots). Academy-related: the "success vedio" folder (2023); September 2026 reports (`Daily-Report-2026-09-20.pdf`, `Individual-Alignment-Briefs-2026-09-20.pdf`, `Information-Needed-2026-09-21.pdf`) | Drive connector |
| Old brand files | "Success 4 Sure" folder owned by a **third party's** personal account (shared with Fahed) | Drive search |
| Metricool | Registered to Fahed's personal Gmail | Metricool |
| Gmail inbox, contacts, signatures, filters | **Not visible yet:** Gmail is not connected to this workspace | — |
| Is there a separate old business Gmail? | **Unknown: Fahed to confirm (decision E-01)** | — |

**What this means:** the academy's digital life is mixed into personal accounts. The migration has two goals:
1. Move the business into academy-owned accounts.
2. Leave Fahed's personal life untouched in his personal Gmail.

---

## Phase 1: Audit (8–11 Oct, after the reveal)
**Goal:** a complete list of what exists, where, and who owns it. Read-only.

| # | Check | How | Owner |
|---|---|---|---|
| 1.1 | Identify every Gmail used for academy business (personal Gmail? an old `success4sure…@gmail.com`? admissions staff Gmails?) | Fahed lists them (E-01) | Fahed |
| 1.2 | For each: the address, who knows the password, recovery phone/email, 2-step status | Google Account → Security | Fahed (Forge worksheet) |
| 1.3 | Important contacts: parents, students, teachers, partners, suppliers | Google Contacts export (CSV) + "Other contacts" → **academy Sheet only, never the git repo** | Keeper |
| 1.4 | Important conversations: enrollments, payments, partner and school threads, legal/admin | Gmail search (below); label them `UIA/Keep` | Fahed (Keeper assists) |
| 1.5 | Attachments: contracts, receipts, results, IDs | Gmail search `has:attachment` + the label above | Fahed |
| 1.6 | Drive: academy files vs. personal | Drive audit list (Forge prepares) | Fahed |
| 1.7 | Calendar: academy events/bookings? | Calendar review (currently none found) | Fahed |
| 1.8 | Existing signatures | Gmail → Settings → Signature | Forge |
| 1.9 | **Every account that logs in with, or sends mail to, the old email** | Gmail searches: `"verify your email"`, `"welcome to"`, `"your account"`, `"receipt"`, `"invoice"`, `"password reset"`, `from:(facebookmail.com OR instagram.com OR business.facebook.com OR google.com OR metricool.com OR canva.com OR whatsapp.com)` | Forge (with Fahed) |
| 1.10 | Social and Meta assets, Google Business Profile, website/domain, subscriptions, payment platforms, education platforms | Same searches + `05_Operations/ownership_and_access.md` §4 worksheet | Forge |

**Gmail search pack for 1.4/1.5** (paste in the Gmail search bar):
- Parents and enrollments: `(تسجيل OR registration OR enrol OR enroll OR "AP" OR "SAT" OR "EST") -category:promotions`
- Money: `(invoice OR receipt OR payment OR دفع OR فاتورة) has:attachment`
- Partners and schools: `(school OR partnership OR مدرسة OR شراكة)`
- Accounts: `("verify your email" OR "confirm your email" OR "welcome to" OR "password reset")`

**Output:** `asset_audit_checklist.md`, filled in, plus the migration tracker (`migration_tracker.md`) with every platform listed.

## Phase 2: Create the new official email (once the domain is bought, D-04)
- **Domain:** one academy-owned domain in the academy's legal name (recommendation in `../email_setup.md` §1).
- **Platform:** Google Workspace, with the academy as the customer and `admin@` as super admin.

**Naming structure (decision E-02):**

| Address | Type | Purpose |
|---|---|---|
| `info@` | Group | Public address everywhere (social bios, website, print) |
| `admissions@` | Group | Enquiries, trials, enrollment |
| `marketing@` | Group | Login and owner email for Instagram, Metricool, Canva, ad tools |
| `management@` | Group | Management correspondence, partners, legal |
| `accounts@` | Group | Finance: invoices, payments (only if needed now) |
| `admin@` | User (no one uses it daily) | Owner of the Workspace and of every platform; break-glass |
| `firstname@` | User | Staff mailboxes (e.g. `fahed@`); `firstname.l@` if two staff share a name |

- Groups are free and survive staff changes. Only real people and `admin@` take paid seats.
- Never name an address after a person for a role (`fahed.marketing@`), so roles can change hands.

## Phase 3: Ownership & security
| Control | Setting |
|---|---|
| Ownership | Workspace customer = the academy's legal name; billing on the academy card; domain registrant = the academy |
| Admins | `admin@` (super admin) + 2 named admins (management + Fahed) on their academy accounts |
| Recovery | Recovery phone and email for `admin@` = academy-controlled (the academy SIM, not a personal number); backup codes printed and sealed + stored in the password manager |
| 2-step verification | **Enforced for everyone**; security keys or the authenticator app for admins (no SMS-only for admins) |
| Passwords | Password manager (academy business plan) only; 12+ character passphrases; no reuse; no sharing over WhatsApp |
| Permissions | Least privilege: staff get their mailbox + the groups they need; delegation instead of shared passwords |
| Backup & recovery | Monthly Google Takeout/Workspace data export of the shared drives to an academy-owned backup; `admin@` recovery drill once per quarter; consider Google Vault (Business Plus) later for retention |
| Leaver procedure | Same day: suspend the account, transfer Drive files, move the mailbox to a group alias, remove admin roles (`../ownership_and_access.md` §6) |

## Phase 4: Transfer important information
**Order:** Contacts → Important emails → Attachments → Drive files → Calendar → Business information.

**Triage rule for everything found in Phase 1:**

| Decision | Meaning | Examples | Where it goes |
|---|---|---|---|
| **Keep / Transfer** | Active business, needed going forward | Current families, teachers, partners, open enquiries, active contracts | New academy accounts (Workspace contacts / CRM sheet / Shared Drive) |
| **Archive** | Business history, needed for reference, not daily | Past years' enrollments, old invoices, the old brand's materials | "Archive – Success 4Sure (pre-Oct 2026)" folder in the academy Shared Drive, read-only |
| **Leave** | Personal: not academy business | Fahed's personal mail, family, other clients' work | Stays in the personal Gmail, untouched |
| **Delete** | Only true junk, and **only with Fahed's written approval** | Duplicate exports, `.DS_Store` files | Listed first, approved, then deleted |

**Methods:**
- **Contacts:** export the selected contacts (CSV) and import them into the academy Workspace Contacts / CRM sheet.
- **Emails:**
  - Option A: forward the key threads to the new `admissions@` / `management@`.
  - Option B (bulk, for a dedicated old business Gmail only): the Workspace "Data migration" tool.
  - *Never* bulk-migrate a personal Gmail.
- **Drive:** copy (don't move) academy files into the academy Shared Drive; check sharing permissions after copying. Third-party-owned files: request a copy from the owner if UIA legitimately needs them ⚖️.
- **Calendar:** recreate academy events in an "UIA – Academy" calendar owned by Workspace.

## Phase 5: Update connected platforms (gradual, documented)
- One platform at a time.
- Each change is logged in `migration_tracker.md` **before** and **after**.
- Test login + recovery after every change.
- **Order:**
  1. Domain registrar & Workspace
  2. Meta Business (business email) → Facebook Page → Instagram login email → ad account billing email
  3. WhatsApp Business (email field + linked Facebook page)
  4. Google Business Profile owner
  5. Metricool → `marketing@`
  6. Canva Teams
  7. Website/hosting
  8. CRM / booking / payment / education platforms
  9. Subscriptions
- **Never** change an account's login email and its 2-step phone on the same day.

## Phase 6: Customer communication
- **Message:** *New Brand. Same Team. Bigger Vision.* Same phone number, **+962 79 055 5890**. No mention of separation or disagreements.
- **Channels, in order:**
  1. WhatsApp (already planned for the reveal)
  2. An email announcement from `info@` to contacts who have email, sent in small batches during warm-up
  3. The website / Instagram "Where to find us" post
- Draft texts: §A below (bilingual). Final wording is approved by Fahed before sending.

## Phase 7: Transition period (90 days, to ~6 Jan 2027)
- **Keep the old business email(s) active and monitored daily** by admissions; reply from the new address.
- **Auto-reply:**
  - **If the old account is a dedicated business Gmail:** turn on Gmail's vacation responder (Settings → General → Vacation responder) with text §B. It answers each sender once every 4 days.
  - **If the old account is Fahed's personal Gmail:** **don't** use the vacation responder (it would answer personal contacts too). Use a Gmail filter on business senders/keywords + a saved template reply (§B), or reply manually with the template.
- **Forwarding:** for a dedicated business Gmail, forward a copy to `admissions@` (Settings → Forwarding). Keep a copy in the old inbox.
- **Weekly check:** count how many business emails still arrive at the old address. When close to zero for 4 weeks, decide (Tier 2) whether to keep the auto-reply only.

## Phase 8: New email signature
- Template: `03_Assets/Brand/Email_Signature/signature_template.html`.
- It includes:
  - the horizontal logo (180 px)
  - name and title
  - the phone **+962 79 055 5890** + WhatsApp link
  - email
  - website
  - Instagram / Facebook links (after the reveal rename)
  - location "Khalda, Amman, Jordan"
  - "Shaping Global Minds."
  - "Formerly Success 4Sure – Khalda" until 6 Jan 2027
- Same layout for every account; groups sign as "United International Academy | Admissions".
- Installed in Phase 2; checked in Gmail web, Gmail mobile and Outlook before roll-out.

## Phase 9: Final verification (target: 30-day checkpoint, ~5–8 Nov 2026)
| Check | How we verify | ✔ |
|---|---|---|
| New email works (send/receive, inside and outside Gmail) | Test to/from 3 external providers; check spam placement | ☐ |
| SPF, DKIM, DMARC pass | Header check on a sent email ("PASS" ×3) | ☐ |
| Customers can reach us | Test enquiry via the website, the Instagram email button and `info@`; WhatsApp number unchanged | ☐ |
| Important contacts preserved | Contact count in the CRM sheet vs. the Phase 1 export | ☐ |
| Important emails accessible | Spot-check 10 `UIA/Keep` threads from the new account or archive | ☐ |
| Drive files safe | Academy Shared Drive has every Phase 1 "Keep" file; permissions correct | ☐ |
| Connected platforms use the new email | Every row in the migration tracker = "Done" + login tested | ☐ |
| Recovery methods configured | Recovery drill on `admin@` | ☐ |
| 2-step verification active | Workspace Admin → Security report: 100% enrolled | ☐ |
| Correct permissions | The access register matches each platform's people list | ☐ |
| Old inbox monitored and auto-reply live | Weekly count logged | ☐ |

Only after this table is all ✔, and Fahed signs off, can anything old be deactivated (Tier 2).

---

## A. Customer announcement (draft, needs Fahed's approval)
**Subject (bilingual, recommended):** New Brand. Same Team. Bigger Vision. | هوية جديدة. نفس الفريق. رؤية أكبر.
**Short alternatives:**
- AR: اسم جديد ونفس الفريق: United International Academy
- EN: Same team, new name: United International Academy

*Send Arabic first (parent-facing). Arabic is in clean MSA, as voice.md asks for email.*

**Arabic**
> الأهالي الكرام،
> هوية جديدة. نفس الفريق. رؤية أكبر.
> يسعدنا أن نشارككم أن أكاديميتنا أصبحت اليوم **United International Academy** (سابقاً Success 4Sure – خلدا).
> نفس الفريق، ونفس الأساتذة، ونفس المكان، ونفس التزامنا مع طلابنا وعائلاتهم. وجميع الدورات مستمرة دون أي تغيير.
> بريدنا الإلكتروني الرسمي الجديد: ⟦info@domain⟧. نرجو حفظه لديكم، وسنتواصل معكم منه من الآن فصاعداً.
> ورقمنا كما هو للاتصال والواتساب: +962 79 055 5890
> شكراً لثقتكم الدائمة.
> فريق United International Academy

**English**
> Dear families,
> New Brand. Same Team. Bigger Vision.
> We're pleased to share that our academy is now **United International Academy** (formerly Success 4Sure – Khalda).
> Same team, same teachers, same place, and the same commitment to our students and their families. All courses continue unchanged.
> Our new official email is ⟦info@domain⟧. Please save it; we'll write to you from this address from now on.
> Our number stays the same for calls and WhatsApp: +962 79 055 5890
> Thank you for your continued trust.
> The United International Academy team
> Shaping Global Minds.

## B. Old-inbox auto-reply (draft, needs Fahed's approval)
**Subject (if the tool asks for one):** United International Academy: our new email | بريدنا الجديد

> شكراً لرسالتك. أكاديميتنا أصبحت **United International Academy** (سابقاً Success 4Sure – خلدا)، بنفس الفريق ورؤية أكبر.
> بريدنا الرسمي الجديد: ⟦info@domain⟧، نرجو استخدامه من الآن. وسنرد على رسالتك من العنوان الجديد.
> للتواصل السريع (اتصال أو واتساب): +962 79 055 5890
>
> Thank you for your message. Our academy is now **United International Academy** (formerly Success 4Sure – Khalda): the same team, with a bigger vision.
> Our new official email is ⟦info@domain⟧; please use it from now on. We'll reply to your message from the new address.
> For a quick reply, call or WhatsApp +962 79 055 5890.

*(⟦info@domain⟧ is filled in once D-04 is decided. Nothing goes out with that placeholder.)*
*Quill polish, 7 Oct 2026: Arabic moved to clean MSA for email; added the line "New Brand. Same Team. Bigger Vision." (AR «هوية جديدة. نفس الفريق. رؤية أكبر.»); added "same place" and "all courses continue" to match the reveal messages; English auto-reply simplified and aligned with the Arabic; short subject lines in each language. The auto-reply promises "we'll reply from the new address", which matches Phase 7 (admissions replies from the new address). §A says "is now": if the email goes out weeks after 8 Oct, that still reads correctly.*

## Decisions needed
| ID | Decision | Owner |
|---|---|---|
| E-01 | Which Gmail account(s) are used for academy business today? Only sarajfahed@gmail.com, or also an old Success 4Sure / admissions Gmail? | Fahed |
| E-02 | Approve the naming structure (info@, admissions@, marketing@, management@, accounts@, admin@, firstname@) | Fahed |
| D-04 | Domain + Google Workspace purchase | Fahed + management (Tier 2) |
| E-03 | Allow read-only Gmail access for the audit (connect Gmail to this workspace), or Fahed runs the search pack himself | Fahed |
