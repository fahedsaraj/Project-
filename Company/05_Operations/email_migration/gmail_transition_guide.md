# Gmail Transition Guide (Phase 7, decision E-01)

> Owner: **Forge**. Executes: **Fahed** (and admissions for daily monitoring). Messages: Fahed approves the reply text (Tier 1).
> **Starts when:** Workspace is live and tested (`workspace_setup_guide.md` Step 9). The reply text names the new address, so nothing here goes live before D-04.
> **Nothing is deleted, deactivated or switched off.** The old inbox keeps every message; we only add a reply, a label and (case A) a copy to the new address. Duration: 90 days, to **6 Jan 2027**, then a Tier 2 decision (plan Phase 7).
> Which case applies depends on **E-01**: is there a separate old business Gmail, or is the business mail in Fahed's personal Gmail (`sarajfahed@gmail.com`)? Both can be true: then do Case A on the business Gmail and Case B on the personal one.

| | Case A: dedicated old business Gmail | Case B: Fahed's personal Gmail |
|---|---|---|
| Auto-reply | **Vacation responder** to everyone | **No vacation responder.** A filter + saved template, business senders only |
| Copy to the new address | **Forward everything** to `admissions@` | Optional: forward **business senders only** (filter) |
| Personal mail affected? | n/a (business only) | Never: personal contacts get no reply and nothing is forwarded |

---

## The reply text (approve once, used in both cases)
From `email_migration_plan.md` §B. Forge fills in the real address when D-04 is done; it's shown here as `info@⟦domain⟧` only until then. **Don't switch anything on while the address is still a fill-in.**

**Subject:** `United International Academy | Our new email`
**Message:**
> شكراً لتواصلك. أكاديميتنا أصبحت **United International Academy**، ونفس الفريق مستمر بخدمتكم. بريدنا الرسمي الجديد: info@⟦domain⟧. وللتواصل السريع: +962 79 055 5890 (اتصال أو واتساب).
>
> Thank you for your message. We are pleased to continue our journey as **United International Academy**. Our team remains the same, and our commitment to our students and families continues. Please update your records with our new official email: info@⟦domain⟧. For a quick reply, call or WhatsApp +962 79 055 5890.

---

## Case A: a dedicated old business Gmail (e.g. an old Success 4Sure address)
Do this on a computer, signed in to **that** account only (use an incognito window to avoid mixing accounts).

### A0. Secure it first (5 min)
1. Avatar → **Manage your Google Account → Security** → **2-Step Verification** = On (authenticator app on an academy device).
2. **Recovery phone / email:** academy-controlled (management's academy address once it exists). Not a former staff member's phone.
3. Note in `migration_tracker.md` row 20: address, who holds access (role), 2-step on. **No password here.**

### A1. Forwarding to `admissions@` (10 min)
1. Gmail → ⚙ (top right) → **See all settings** → tab **Forwarding and POP/IMAP**.
2. **Add a forwarding address** → `admissions@⟦domain⟧` → **Next → Proceed → OK**.
3. Google emails a confirmation code to `admissions@`. A group member opens it in the new inbox and either clicks the link or reads the code to you.
4. Back in the old Gmail, refresh the settings page → enter the code if asked → **Verify**.
5. Select **Forward a copy of incoming mail to** `admissions@⟦domain⟧` **and** → **keep Gmail's copy in the Inbox**. *(Never choose "delete Gmail's copy".)*
6. Scroll down → **Save Changes**.
7. Test: from another address, send "test A1" to the old Gmail → it arrives in both the old inbox and `admissions@`.

### A2. Vacation responder (5 min)
1. ⚙ → **See all settings** → tab **General** → scroll to **Vacation responder**.
2. **Vacation responder on.**
3. **First day:** the day Workspace is tested. **Last day:** tick and set `6 Jan 2027`.
4. **Subject** and **Message:** paste the approved reply text above (use **Rich formatting** so the bold shows).
5. **Only send a response to people in my Contacts:** **unticked** (new enquiries must get it too).
6. **Save Changes.** A banner at the top of Gmail now says the responder is on.
7. Test: send from an outside address → you get the reply once. (Gmail answers each sender **at most once every 4 days**, so test from a fresh address.)

### A3. Signature on the old account (2 min)
⚙ → **See all settings → General → Signature** → replace the old one with:
`United International Academy (formerly Success 4Sure – Khalda) | Please write to us at info@⟦domain⟧ | +962 79 055 5890`
→ **Save Changes.** *(Plain text: no old logo.)*

### A4. Daily routine (admissions, 5 min/day)
- Replies go **from the new account**, never from the old one. Open the forwarded copy in `admissions@` and reply there.
- Each Sunday: count the business emails that arrived at the old address that week → write the number in the tracker's change log. (Phase 7: when it's near zero for 4 weeks, Fahed + management decide the next step.)

### A5. Optional later: bring old mail across in bulk
Only for a **dedicated** business Gmail, and only after Phase 1 triage: Workspace **Admin console → Data → Data import & export → Data migration** → source Gmail. Forge writes that guide when needed. *(Never for a personal Gmail.)*

---

## Case B: Fahed's personal Gmail (`sarajfahed@gmail.com`)
**Why not the vacation responder:** it would answer **everyone**: family, friends, other clients. So we answer **business senders only**, using a filter that recognises them plus a saved template.

### B1. Turn on templates (1 min)
⚙ → **See all settings** → tab **Advanced** → **Templates: Enable** → **Save Changes** (Gmail reloads).

### B2. Save the reply as a template (3 min)
1. **Compose** → leave **To** empty → **Subject:** `United International Academy | Our new email` → paste the approved message.
2. Bottom-right **⋮ (More options) → Templates → Save draft as template → Save as new template** → name `UIA new email` → **Save**.
3. Close the draft (discard it; the template is saved).

### B3. Make the business-sender list (15 min, Fahed; Keeper can help)
Write it in the Gmail search box as one line, joined by `OR`. Use what Phase 1 found:
- **Known business senders:** parents, schools, partners, suppliers: `from:(parent1@… OR school@… OR …)`. *(The list stays in Gmail only; never paste customer emails into this repo or a chat.)*
- **Business words:** `(تسجيل OR registration OR enrol OR enroll OR "Success 4Sure" OR "Success4Sure" OR SAT OR EST OR IGCSE OR "AP course")`

Test the search first: press Enter and check the results. **If you see any personal or family email in the results, narrow the search** (remove the word that caught it) before going on.

### B4. Create the filter (5 min)
1. In the search box, click the **sliders icon** (Show search options) → put the sender list in **From** and/or the words in **Has the words** → **Create filter**.
2. Tick:
   - **Apply the label:** **New label…** → `UIA/Business` → **Create**
   - **Star it** *(so it stands out)*
   - **Never send it to Spam**
   - **Optional, recommended:** **Forward it to:** `admissions@⟦domain⟧` (first add and verify it as in Case A, step A1.1–A1.4, but **don't** turn on "Forward a copy of incoming mail"; leave that set to **Disable forwarding**). This sends **only** the filtered business mail.
   - **Send template:** `UIA new email` → **only if you choose option 2 below**
3. **Don't** tick "Also apply filter to matching conversations" (it would act on old mail).
4. **Create filter.**

**Option 1 (recommended): label + manual reply.** Leave **Send template** unticked. Each day, open the `UIA/Business` label, and for each new sender: **Reply → ⋮ → Templates → UIA new email** → send. Personal judgement stays in the loop, and nobody gets the same reply twice.
**Option 2: automatic reply.** Tick **Send template**. Faster, but Gmail sends it on **every** matching email, not once per 4 days, so a parent who writes 3 times gets it 3 times. Use only with a **narrow, tested sender list** (no broad keywords).

### B5. What never happens on the personal Gmail
- No vacation responder.
- No "forward all mail".
- No bulk migration to Workspace.
- No signature change (unless Fahed wants a line "For the academy: info@⟦domain⟧" on business replies).
- Personal mail, contacts and Drive stay where they are: plan Phase 4 "Leave".

### B6. Weekly (Fahed, 5 min)
Each Sunday: count new items in `UIA/Business` → write the number in the tracker's change log. Add any new business sender to the filter: **⚙ → See all settings → Filters and Blocked Addresses → edit**.

---

## Switch-off (not before 6 Jan 2027, Tier 2)
Nothing in this guide is undone or deleted without Fahed's written OK after the Phase 9 checklist is all ✔. When that time comes, Forge writes the switch-off steps (turn off responder/forwarding/filter; keep the account and its mail).
