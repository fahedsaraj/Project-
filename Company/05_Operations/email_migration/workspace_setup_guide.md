# Google Workspace Setup Guide (click by click)

> Owner: **Forge**. Executes: **Fahed + management**. Tier 2: the purchase, accepting Google's terms and the billing card are **management's** decisions; Forge never clicks "Agree" or "Buy".
> **Starts when:** the domain is bought in the academy's legal name (D-04). Until then, this is the ready-to-run plan.
> `⟦domain⟧` below = that domain (e.g. `unitedinternationalacademy.com`). It's the only fill-in, and it comes from D-04.
> Structure follows `email_migration_plan.md` Phase 2–3 and Phase 8. Where it differs from `../email_setup.md`, this guide wins (e.g. `management@` group; DMARC reports to `dmarc@`).
> Google's screens change. If a label doesn't match, use the **search bar at the top of the Admin console** (admin.google.com) and type the item name.
> **Time:** ~2–3 hours of clicks, spread over 2–3 days (DNS and DKIM need waiting time). *Estimate.*
> **Cost:** Google Workspace per-user monthly fee × 3 paid seats (check today's price on workspace.google.com; Forge doesn't quote prices from memory). Groups are free.

**Contents**
- Step 0: Before you start
- Step 1: Sign up (academy's legal name)
- Step 2: Verify the domain + switch on Gmail (DNS sheet)
- Step 3: Secure the account (`admin@`, the 2 admins, recovery)
- Step 4: Users
- Step 5: Groups
- Step 6: Enforce 2-step verification
- Step 7: DKIM and DMARC
- Step 8: Signatures roll-out
- Step 9: Test and hand back to Forge
- DNS record sheet (one page)

---

## Step 0: Before you start (15 min)
| ☐ | Item | Who |
|---|---|---|
| ☐ | Domain bought, registrant = the academy's **legal name**; auto-renew on; transfer lock on; registrar 2FA on | Fahed + Mgmt |
| ☐ | Registrar login is ready (you'll add DNS records there) | Fahed |
| ☐ | Academy **password manager** ready (P01 1.4). If not: a new passphrase is written on paper, sealed, kept by management, and moved in later | Mgmt |
| ☐ | **Authenticator app** on two devices: one held by management, one by Fahed (for `admin@`) | Mgmt + Fahed |
| ☐ | The academy's **legal name**, address and a contact phone (**+962 79 055 5890**) | Mgmt |
| ☐ | The management person's first name (for their mailbox) | Mgmt |
| ☐ | Approved naming structure (E-02): `info@`, `admissions@`, `marketing@`, `management@`, `accounts@`, `admin@`, `firstname@` | Fahed |
| ☐ | The academy card for billing | Mgmt |

---

## Step 1: Sign up (≈15 min, on a computer)
1. Open an **incognito/private window** (so no personal Google account gets mixed in). Go to `workspace.google.com` → **Get started**.
2. **Business name:** the academy's **legal name** as registered (not "UIA", not a person's name).
3. **Number of employees:** `2–9`. **Region:** `Jordan` → **Next**.
4. **Contact info:** first/last name of the person signing up (management), and a **current** email for Google to reach them during setup. Use management's existing address for now; it's only contact info, not ownership. → **Next**.
5. **"Does your business have a domain?"** → **Yes, I have one I can use** → type `⟦domain⟧` → **Next** → **Next**.
6. **"How you'll sign in":** username **`admin`** → `admin@⟦domain⟧`.
   - Password: a new 16+ character passphrase from the password manager. Never reused, never sent over WhatsApp.
7. **Plan:** choose **Business Starter** (enough to start; upgrade later if we need Vault or bigger storage). *If Google offers a free trial, that's fine; add the academy card before the trial ends.*
8. **Stop here for management:** reading and accepting Google's terms and entering the academy card are **management's** clicks (Tier 2).
9. You land in the **Admin console** (admin.google.com), signed in as `admin@⟦domain⟧`.

---

## Step 2: Verify the domain + switch on Gmail (≈20 min + waiting)
The Admin console shows a setup guide. Follow it with this sheet.

### 2.1 Verify you own the domain
1. Admin console → **Domains → Manage domains** (or the setup banner) → **Verify** next to `⟦domain⟧`.
2. Choose **"Add a TXT record"** (if Google offers "Sign in to your domain host" for automatic setup, that's fine too).
3. Copy the value Google shows (it starts `google-site-verification=`).
4. In a second tab, open the **registrar → DNS settings** for `⟦domain⟧` → **Add record**: Type `TXT`, Host `@`, Value = the copied text, TTL `3600` (or "Automatic") → **Save**.
5. Back in Google → **Verify**. If it says "not found yet", wait 15–60 min and press Verify again (DNS can take up to 48 h; usually much faster. *Estimate.*)
6. **Keep this TXT record forever.** Removing it can unverify the domain.

### 2.2 Activate Gmail (MX record)
1. Admin console → setup guide → **Activate Gmail** (or **Apps → Google Workspace → Gmail → Setup**).
2. At the registrar: **delete any old MX records** the registrar added by default (only if the domain is new and nobody uses email on it yet; if in doubt, screenshot and ask Forge first).
3. **Add record:** Type `MX`, Host `@`, Value `smtp.google.com`, Priority `1`, TTL `3600` → **Save**.
4. Google → **Activate Gmail**. Wait until it says Gmail is active (minutes to hours).

### 2.3 SPF (who may send mail for us)
1. At the registrar → **Add record:** Type `TXT`, Host `@`, Value `v=spf1 include:_spf.google.com ~all` → **Save**.
2. **Only one SPF record per domain.** If the registrar already created one (starts `v=spf1`), edit that one instead of adding a second.
3. Later, if the website or a mailing tool sends email for us, Forge adds its `include:` to this same record.

---

## Step 3: Secure the account (≈20 min)
### 3.1 `admin@` itself
1. Top-right avatar → **Manage your Google Account → Security**.
2. **2-Step Verification → Get started** → add the **authenticator app** on management's device, then a **second authenticator** (Fahed's device) or a **security key**.
3. **Backup codes → Get backup codes** → print once → seal in an envelope (management keeps it) → also store them in the password manager. Not in this repo, not in chat, not in photos.
4. **Recovery phone:** the academy number (+962 79 055 5890) only if the SIM is in the academy's name (Part 5F of the reveal worksheet); otherwise management's number for now and change it once the SIM is confirmed. **Recovery email:** management's academy address (after Step 4).
5. **Profile photo:** `03_Assets/Brand/Logo/Social/uia-avatar-midnight-320.png`. **Name:** first name `United International`, last name `Academy`.

### 3.2 Super-admin recovery
Admin console → **Security → Authentication → Account recovery → Super admin account recovery** → **Allow super admins to recover their account** = ON → **Save**. (Needs the recovery phone/email from 3.1.)

### 3.3 The 2 named admins
After Step 4 creates their mailboxes: Admin console → **Directory → Users** → click the person → **Admin roles and privileges** → **Assign roles** → **Super Admin** = Assigned → **Save**. Do this for:
- **management's** mailbox
- **`fahed@`**

Result: **3 super admins** (`admin@` + 2 people). Nobody else gets an admin role.

---

## Step 4: Users (paid seats; ≈10 min)
Admin console → **Directory → Users → Add new user**. For each:
| First name | Last name | Primary email | Who uses it |
|---|---|---|---|
| United International | Academy | `admin@⟦domain⟧` | Nobody day-to-day (already created in Step 1) |
| Fahed | (surname) | `fahed@⟦domain⟧` | Fahed |
| (management's first name) | (surname) | `firstname@⟦domain⟧` | Management |

For each new user:
1. **Add new user** → fill in → **Manage user's password**: **Automatically generate** + **Ask for a password change at next sign-in** = ON.
2. **Add new user** → Google shows the temporary password once. Hand it over **in person** (or via the password manager's sharing); never WhatsApp/SMS.
3. The person signs in at `mail.google.com` on their own device, sets their passphrase and turns on 2-step verification within the first week (Step 6 enforces it).
4. **Profile photo:** their own photo, or the avatar for role accounts.

More staff (teachers, admissions) later: same steps, `firstname@`. If two people share a first name: `firstname.l@`.

---

## Step 5: Groups (free; ≈20 min)
Admin console → **Directory → Groups → Create group**. For each row:
| Group name | Email | Members (owner → others) | Purpose |
|---|---|---|---|
| United International Academy | `info@⟦domain⟧` | Fahed (owner), admissions staff | Public address everywhere |
| United International Academy \| Admissions | `admissions@⟦domain⟧` | Fahed (owner), admissions staff | Enquiries, trials, enrollment |
| United International Academy \| Marketing | `marketing@⟦domain⟧` | Fahed (owner) (+ marketing staff) | Login/owner email for Instagram, Metricool, Canva, ad tools |
| United International Academy \| Management | `management@⟦domain⟧` | Management (owner), Fahed | Management, partners, legal |
| United International Academy \| Accounts | `accounts@⟦domain⟧` | Management (owner) | Invoices, payments (create only if needed now) |
| DMARC reports | `dmarc@⟦domain⟧` | Fahed (owner) | Daily DMARC reports (Step 7); Fahed forwards a weekly one to Forge |

**For each group:**
1. **Create group** → name, email, description → **Group owners:** the owner in the table → **Next**.
2. **Access settings:**
   - **Who can contact group owners:** Organization users
   - **Who can view conversations:** Group members
   - **Who can post:** **External** (anyone on the web) + Group members, for `info@`, `admissions@`, `management@`, `accounts@`, `marketing@`, `dmarc@` (they must receive mail from outside)
   - **Who can view members:** Group managers
   - **Who can join the group:** **Only invited users**
   - **Allow external members:** OFF
3. **Create group** → **Add members** → add the people from the table → **Add to group**.
4. **Make it work like a shared inbox (optional, for `admissions@`):** open `groups.google.com` → the group → **Group settings → Enable additional Google Groups features → Collaborative inbox** (lets staff assign and mark conversations done). *Unverified: the setting's exact location moves.*

**Reply as the group (each member, once):** in Gmail → ⚙ **See all settings → Accounts → Send mail as → Add another email address** → Name `United International Academy`, Email `info@⟦domain⟧` (and/or `admissions@`) → **Treat as an alias** = ON → **Next** → Google sends a confirmation to the group (members receive it) → click the link. Then, when replying, pick the group address in the **From** field.

---

## Step 6: Enforce 2-step verification (≈5 min)
1. Admin console → **Security → Authentication → 2-step verification**.
2. **Allow users to turn on 2-Step Verification** = ON.
3. **Enforcement:** **On from** = 7 days after the last user was created.
4. **New user enrollment period:** `1 week`.
5. **Methods:** **Any except verification codes via text, phone call** (authenticator app, Google prompt or security key; no SMS).
6. **Save**.
7. After the enforcement date: **Reporting → User reports → Security** → the **2-Step Verification enrolment** column should be 100%. Anyone missing is reminded in person.

**Also in Security (2 min):**
- **Security → Authentication → Password management:** enforce strong passwords, minimum length `12`.
- **Security → Access and data control → Less secure apps:** leave disallowed (default).

---

## Step 7: DKIM and DMARC (≈15 min, about 1–3 days after Gmail is active)
### 7.1 DKIM (signs our mail so it isn't spoofed)
1. Admin console → **Apps → Google Workspace → Gmail → Authenticate email**.
2. Domain `⟦domain⟧` → **Generate new record** → key length **2048** → prefix `google` → **Generate**.
   - If "Generate" isn't available yet: Gmail is still activating. Try again after 24–72 h. *Estimate from Google's guidance.*
3. Google shows **DNS Host name** (`google._domainkey`) and a long **TXT record value** (`v=DKIM1; k=rsa; p=…`).
4. Registrar → **Add record:** Type `TXT`, Host `google._domainkey`, Value = paste the whole value exactly → **Save**. (Some registrars need the long value split into parts; if it errors, screenshot and send to Forge.)
5. Wait ~1 hour → back in Google → **Start authentication**. Status should say **Authenticating email with DKIM**.

### 7.2 DMARC (tells receivers what to do with fakes; sends us reports)
1. Registrar → **Add record:** Type `TXT`, Host `_dmarc`, Value:
   `v=DMARC1; p=none; rua=mailto:dmarc@⟦domain⟧; fo=1`
2. **Save.**
3. **After 2–4 clean weeks** (Forge reviews the reports from `dmarc@`), Forge sends the change to `p=quarantine`, and later `p=reject`. Each change is approved by Fahed.

---

## Step 8: Signatures roll-out (≈10 min per person)
Template: `03_Assets/Brand/Email_Signature/signature_template.html` (logo PNG `uia-signature-logo-360w.png` in the same folder). Spec: `email_migration_plan.md` Phase 8.

**8.1 Forge prepares (before roll-out)**
1. **Host the logo:** the signature needs a public `https` image link. Best: the website (`https://⟦domain⟧/assets/uia-signature-logo-360w.png`) once it's live. Until then, Forge proposes a temporary academy-owned host (Fahed approves). *Gmail blocks embedded images, so a hosted link is required.*
2. **Fill a copy per person** (Forge does this, no placeholders left): name, title, email, `⟦domain⟧`, and the address **only once confirmed** (the address line is removed if it isn't confirmed by then).
3. Groups: one shared version "United International Academy | Admissions" with `admissions@⟦domain⟧`.
4. Forge sends each person their own file.

**8.2 Each person installs it**
1. Open the personal file in **Chrome** → **Ctrl/Cmd + A** → **Ctrl/Cmd + C**.
2. Gmail → ⚙ **See all settings → General → Signature → Create new** → name `UIA` → click into the box → **Ctrl/Cmd + V**.
3. **Signature defaults:** For new emails `UIA` · On reply/forward `UIA` → tick **Insert signature before quoted text** → **Save changes** (bottom of the page).
4. For each "Send mail as" group address (Step 5): pick it in the **Signature defaults** dropdown and set the group signature.
5. **Gmail mobile app:** the app uses its own plain-text signature. Settings → the account → **Mobile signature** → `Name | United International Academy | +962 79 055 5890`.

**8.3 Check before calling it done**
- Send a test to a Gmail, an Outlook/Hotmail and an iCloud/Yahoo address. Check: logo shows (not as an attachment), links work, phone reads **+962 79 055 5890**, nothing in spam.
- Screenshot each, send to Forge.
- **Calendar reminder for 6 Jan 2027:** remove the "Formerly Success 4Sure – Khalda" line (Forge sends the updated files).

*Don't use the Admin console "Append footer" setting for signatures: it adds text under every email (including internal ones) and can't show per-person names.*

---

## Step 9: Test and hand back to Forge (≈15 min)
| ☐ | Test | How |
|---|---|---|
| ☐ | Receive from outside | From a personal Gmail, send to `info@`, `admissions@`, `fahed@` → all arrive |
| ☐ | Send to outside | From `fahed@` (and as `info@`) to Gmail, Outlook, iCloud → arrives in the inbox, not spam |
| ☐ | SPF / DKIM / DMARC pass | In the received Gmail test: ⋮ → **Show original** → SPF **PASS**, DKIM **PASS**, DMARC **PASS** → screenshot to Forge |
| ☐ | 2-step on for all | Reporting → Security → 100% |
| ☐ | 3 super admins | Admin console → Account → Admin roles → Super Admin → 3 names |
| ☐ | Recovery set | `admin@` has an academy recovery phone/email; backup codes sealed + in the password manager |

Then Forge updates `migration_tracker.md` rows 1–2 to **Done (tested)**, fills the access register, and starts Phase 4–5 (moving platforms to the new addresses, one at a time).

---

## DNS record sheet (one page, for the registrar)
| # | Type | Host / Name | Value | Priority | TTL | When | Notes |
|---|---|---|---|---|---|---|---|
| 1 | TXT | `@` | `google-site-verification=…` (copy from Admin console) | — | 3600 | Step 2.1 | Keep forever |
| 2 | MX | `@` | `smtp.google.com` | 1 | 3600 | Step 2.2 | Remove other MX records first (new domain only) |
| 3 | TXT (SPF) | `@` | `v=spf1 include:_spf.google.com ~all` | — | 3600 | Step 2.3 | Only one SPF record |
| 4 | TXT (DKIM) | `google._domainkey` | `v=DKIM1; k=rsa; p=…` (copy from Admin console, 2048-bit) | — | 3600 | Step 7.1 | Then "Start authentication" |
| 5 | TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@⟦domain⟧; fo=1` | — | 3600 | Step 7.2 | → `p=quarantine` after 2–4 clean weeks (Fahed approves) |
| 6 | A / CNAME (website) | `@` / `www` | From the website host | — | 3600 | When the site is built (P01 2.10) | Forge sends the values |

*Host `@` means the bare domain. Some registrars want it left blank, or want the full name (`_dmarc.⟦domain⟧`); if a record won't save, screenshot the form and send it to Forge.*
