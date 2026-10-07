# Official Email: Setup Plan

> Owner: **Forge**. Purchases and ID steps: **Fahed + Management** (Tier 2). Blocked on **D-04** (domain).

## 1. Decisions
| Item | Recommendation | Why |
|---|---|---|
| Domain | A short `.com` the academy registers in its legal name, e.g. `unitedinternationalacademy.com` (check availability) or a short alternative | `.edu` is US-only; `.jo`/`.edu.jo` need local documents and take longer. A `.jo` can be added later and redirected |
| Provider | **Google Workspace** (Business Starter is enough to begin; check current pricing) | The team already uses Google Drive/Docs; shared drives; Calendar for trials |
| Registrar | One with 2FA, auto-renew and transfer lock (e.g. Cloudflare, Namecheap, Google's registrar partner) | Ownership safety |

## 2. Address structure
| Address | Type | Used for | Who reads it |
|---|---|---|---|
| `admin@` | User (seat) | Owner identity for every platform; never used for daily mail | Nobody day-to-day; break-glass via the password manager |
| `fahed@` | User | Fahed's mailbox | Fahed |
| `⟦gm⟧@` | User | Management's mailbox | Management |
| `info@` | Group (free) | Public address on every channel | Admissions + Fahed |
| `admissions@` | Group | Leads, trials, enrollment | Admissions + Fahed |
| `marketing@` | Group | Login/owner email for Instagram, TikTok, Metricool, Canva; vendor mail | Fahed (+ marketing staff) |
| `accounts@` | Group | Invoices, payments, finance | Management |
| Teacher/staff `firstname@` | User | Add as needed | Each person |

Groups don't cost a seat, and mail goes to the right people even when staff change.

## 3. Setup checklist (in order)
1. **Buy the domain** in the academy's legal name. Auto-renew on, transfer lock on, registrar 2FA on.
2. **Create Workspace** with `admin@`, and verify the domain (TXT record).
3. **DNS records** (Forge prepares the exact values):
   - MX → Google
   - **SPF:** `v=spf1 include:_spf.google.com ~all`
   - **DKIM:** generate in Admin console → publish the TXT → start authentication
   - **DMARC:** start with `v=DMARC1; p=none; rua=mailto:admin@⟦domain⟧`. Move to `p=quarantine` after 2–4 clean weeks.
4. **Security:**
   - enforce 2-step verification for all users
   - two admins (Mgmt, Fahed) besides `admin@`
   - recovery info = academy phone/email only
   - store all codes in the password manager
5. **Create users and groups** from §2. Set the group "send as" so `info@`/`admissions@` replies come from the group address.
6. **Profile:**
   - account photo = the UIA symbol avatar (`03_Assets/Brand/Logo/Social/uia-avatar-midnight-320.png`)
   - display names "Name, United International Academy"
   - groups display as "United International Academy"
7. **Signatures:** install from `03_Assets/Brand/Email_Signature/` (Workspace admin can push a standard footer; individuals paste the HTML).
8. **Shared Drive** "UIA Brand" with the guidelines + logo library; "UIA Marketing"; "UIA Admissions (restricted)".
9. **Warm-up:** first 2 weeks, normal person-to-person mail only (no bulk). The first broadcast to families goes via WhatsApp; the email announcement goes in small batches.
10. **Move accounts to academy emails:** Metricool → `marketing@`; Meta business email → `admin@`; Instagram login email → `marketing@`; GBP owner → `admin@`.

## 4. Continuity with existing customers
- There is no old official email to forward (none existed). Continuity comes from the **same phone number** and from personal outreach.
- Gather email addresses into the master contact list (Keeper), with consent to receive updates.
- Announcement email (draft in P01) from `info@`: short, bilingual, "same team, same number, new identity", with the WhatsApp link.

## 5. Signature spec (built to the guidelines)
- **Logo:** horizontal lockup, full colour (guidelines §07: email signatures use the horizontal lockup), displayed at **180 px wide** (the guideline minimum for screens), served as a hosted PNG (Gmail blocks embedded images).
- **Text:** Arial/Helvetica fallback (Archivo won't load in mail clients).
  - name: Academy Blue #29566C, bold
  - title: gold-deep caps
  - details: Charcoal
- **Lines:**
  1. name
  2. title
  3. phone + WhatsApp link
  4. email
  5. website
  6. address
  7. "Shaping Global Minds." (Newsreader-style italic → Georgia fallback)
  8. transition line (90 days, if D-01 allows)
- **No:** quotes, banners, social icon walls, or more than one gold element.
