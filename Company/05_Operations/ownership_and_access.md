# Digital Ownership & Access Structure

> Owner: **Forge**. Approvers: **Fahed + Academy Management** (Tier 2). v1.0, 7 Oct 2026.
> **Principle:** the academy owns everything. People get only the access their role needs, for as long as they need it.
> This is an operational framework, not legal advice. Contract and data-protection points marked ⚖️ should be confirmed by the academy's lawyer.

## 1. The ownership model (5 levels)
| Level | Who | What they can do | Rules |
|---|---|---|---|
| **L0: Legal owner** | United International Academy (the registered legal entity) | Named as registrant, account holder and contract party | Domain registrant, SIM/line owner, Meta business verification, invoices, and contracts are all in the academy's legal name |
| **L1: Academy owner identity** | `admin@⟦domain⟧`, a Google Workspace account no single person uses day-to-day | Super-admin / owner on every platform | Password and recovery codes in the academy password manager; 2FA with two hardware keys or authenticator devices held by two people |
| **L2: Admins (break-glass)** | Academy Management (owner/GM) + Fahed | Full admin on every platform, using their **academy** accounts (`name@⟦domain⟧`), never personal Gmail | Two admins on everything so one person leaving never locks the academy out; 2FA enforced |
| **L3: Managers / Contributors** | Staff by role (admissions, content staff) | Task-level roles only (e.g. Page "Content" or "Messages", ad account "Advertiser") | Granted per role from the matrix below; reviewed monthly |
| **L4: Temporary / Partner** | Freelancers, agencies, printers | Partner access or time-boxed roles; files shared via links from academy Shared Drives | Never admin, never owner; access ends on project end date; contract assigns IP to the academy ⚖️ |

**Personal accounts never own academy assets.** People log in with academy accounts; the academy's L1 identity holds ownership.

## 2. Asset-by-asset structure
| Asset | Owner (L0/L1) | Admins (L2) | Role access (L3/L4) | Key settings |
|---|---|---|---|---|
| **Domain** ⟦D-04⟧ | Registrant: academy legal name; registrar login `admin@` | Mgmt, Fahed | Forge guides; no one else | Auto-renew on the academy card; registrar 2FA; transfer lock on |
| **Google Workspace** (email, Drive, Calendar) | `admin@` = super admin | Mgmt, Fahed (admin roles) | Staff mailboxes; role groups (`info@`, `admissions@`…) | 2FA enforced; Shared Drives (not My Drive) for all academy files |
| **Meta Business portfolio** (2726542811076338: verify ownership, D-07) | Business verified in the academy's legal name | Mgmt, Fahed (full control) | Staff: partial access per asset | 2FA required for all; academy card as payment method; `admin@` as business email |
| **Facebook Page** (1240732079125060) | Owned by the portfolio | Mgmt, Fahed | Admissions: Messages; content staff: Content | Page name change to UIA (Meta review) |
| **Instagram** @success4sure_khalda → @unitedinternationalacademy | Connected to the portfolio; login email `marketing@` | Mgmt, Fahed | Content staff via Meta Business Suite (no shared password) | 2FA; recovery email/phone = academy's |
| **Ad account** act_2067581237184445 | Owned by the portfolio (verify; D-07) | Mgmt, Fahed | Spark/freelancer: Advertiser (not admin) | Spending limit set; academy invoice details |
| **WhatsApp Business** (+962 79 055 5890) | SIM/line contract in the academy's legal name ⚖️; account linked to the FB page | Fahed + Mgmt hold the device and the 2-step PIN | Admissions via linked devices only | 2-step verification PIN in the password manager; business profile per the phone standard |
| **Google Business Profile** | Primary owner `admin@` | Mgmt, Fahed (owners) | Forge/admissions: Manager | Verify at Marka Complex – Khalda, 4th floor (confirm address) |
| **Website & hosting** | Hosting account `admin@`; academy card | Mgmt, Fahed | Forge/developer: scoped access | Domain DNS stays with the academy registrar |
| **YouTube** (when started) | Brand account owned by `admin@` | Mgmt, Fahed | Managers as needed | Parked until 60-day checkpoint |
| **TikTok** (when started) | Business account, login `marketing@` | Fahed | Content staff | Parked until 60-day checkpoint |
| **Canva** | Canva Teams owned by `admin@` | Fahed | Designers/freelancers as members, removed at the end | Brand Kit = guidelines colours/fonts/logos |
| **Metricool** (brand 7035734) | **Currently Fahed's personal Gmail.** Move to `marketing@` | Fahed | Team as members | Re-link after the handle rename |
| **Logo files & guidelines** | Academy Shared Drive `Brand/` + this repo | Fahed | View-only links for printers/partners | Source files from the original designer: request them plus an IP assignment ⚖️ |
| **Customer database / CRM** | Academy account (Sheet in Shared Drive, later a CRM tool on `admin@`) | Fahed, Mgmt | Admissions edit; others view or aggregate only | Data protection: Jordan's Personal Data Protection Law (2023) obligations to confirm ⚖️; parental consent for minors |
| **Marketing data & reports** | Shared Drive + this repo | Fahed | Team | No personal data in reports beyond aggregates |
| **Password manager** (e.g. Bitwarden/1Password business) | Academy organisation account | Mgmt, Fahed | Shared vaults by role | The only place credentials live |

## 3. Current state: known risks (7 Oct 2026)
| Finding | Risk | Action |
|---|---|---|
| Metricool registered to Fahed's **personal** Gmail | Analytics/scheduling tied to one person | Move to `marketing@` once the domain exists |
| The old brand's Drive files ("Success 4 Sure" folder, incl. `Success 4 Sure 04.ai/.pdf`) are owned by a third party's personal account | The academy doesn't control historical files | Don't depend on them; copy anything needed that UIA legitimately owns into the academy Shared Drive ⚖️ |
| UIA logo exists only inside the guidelines PDF (no source files) | Can't print at large sizes with confidence; no IP chain | Rebuilt library done (`03_Assets/Brand/Logo/`); request the designer's source files + IP assignment ⚖️ |
| Ownership of IG, FB page, Meta portfolio, ad account and the phone SIM is unverified | Can't safely rename or migrate | P01 task 1.2: ownership audit (below) |
| Two phone numbers in public posts | Confusion, split leads | D-05 |

## 4. Ownership audit: how to verify (Fahed, ~45 min)
1. **Meta Business Suite → Settings → Business info:** note the legal name, verification status, and every person with admin ("Full control") access.
2. **Settings → Accounts → Pages / Instagram accounts / Ad accounts:** confirm each is **owned** (not just "shared") by this portfolio.
3. **Settings → People:** list everyone with access, and remove anyone who shouldn't have it (ex-staff, the previous network) ⚖️. Do this carefully and after D-01/legal advice if the separation agreement covers it.
4. **Instagram app → Settings → Accounts Center:** check the login email and phone, and which Meta accounts are linked.
5. **Phone line:** check which name the SIM contract is registered under with the operator.
6. **WhatsApp Business → Settings → Account:** turn on two-step verification; note which devices are linked.
7. Send the results to Forge, who fills in the access register below.

## 5. Access register (live; Forge maintains it, no passwords here)
| Asset | Account/ID | Owner identity | Admins | Other access (person → role) | Verified on |
|---|---|---|---|---|---|
| Meta Business portfolio | 2726542811076338 | ⟦audit⟧ | ⟦audit⟧ | ⟦audit⟧ | — |
| Facebook Page | 1240732079125060 | ⟦audit⟧ | ⟦audit⟧ | ⟦audit⟧ | — |
| Instagram | @success4sure_khalda | ⟦audit⟧ | ⟦audit⟧ | ⟦audit⟧ | — |
| Ad account | act_2067581237184445 | ⟦audit⟧ | ⟦audit⟧ | ⟦audit⟧ | — |
| WhatsApp Business | +962 79 055 5890 | ⟦SIM owner⟧ | ⟦device holders⟧ | ⟦linked devices⟧ | — |
| Metricool | brand 7035734 | Fahed (personal Gmail) | Fahed | — | 7 Oct 2026 |
| Domain / Workspace / GBP / Website | not yet created | — | — | — | — |

## 6. Joiner / mover / leaver
- **Joiner:**
  - an academy email account
  - the role from the matrix (never admin)
  - password manager access to role vaults only
  - signs the confidentiality + IP clause ⚖️
- **Mover:** remove the old role's access the same day the new role starts.
- **Leaver (same day):**
  - suspend the Workspace account
  - remove from Meta, GBP, Canva, Metricool and the password manager
  - rotate any shared credentials they could see
  - transfer Drive ownership
  - log it in the register
- **Monthly (1st Sunday):** Forge reviews the register against each platform's people list and reports any differences.
