# Contact Triage Procedure: Google Contacts → academy Sheet/CRM

> **Plan steps:** Phase 1 (1.3, audit) and Phase 4 (transfer contacts) of `email_migration_plan.md`. Feeds the verification check "Important contacts preserved" (Phase 9).
> **Owner:** Keeper (procedure) · **Does it:** Fahed for his personal Gmail; admissions for any business Gmail they hold · **Approver:** Fahed · **Target:** done by 11 Oct (Phase 1 window).
> **Destination:** the academy Sheet `UIA – Master Contact List` (template `04_Projects/P01_Foundation_and_Transition/parent_contact_list_TEMPLATE.csv`, v1.1 with the 7 triage columns).
> **Data rules:** real contacts never go into git, email, chat, AI tools or any outside service. Personal contacts (`Leave`) never leave the Gmail they're in. Nothing is deleted from Google Contacts (golden rule of the plan).

## 0. Before you start (5 min)
- [ ] Decision **E-01** answered: the list of Gmail accounts used for academy business. Repeat this procedure **once per account**.
- [ ] The parent contact list (built 7 Oct) is up to date: it's the master we dedupe against.
- [ ] Sign in on a computer you control (not a shared or public one).

## 1. Export (10 min per account)
1. Open **contacts.google.com** signed in to the account.
2. **Contacts:** left menu → *Contacts* → tick the box at the top to select all → ⋮ **Export** → *Google CSV* → Export. File: `contacts_<account>_<date>.csv`.
3. **Other contacts:** left menu → *Other contacts* (people you emailed but never saved) → select all → **Export** → *Google CSV*. File: `other_contacts_<account>_<date>.csv`.
4. Note the two row counts (you need them in step 6).

**Where the files go:** upload both to **a private Google Sheet in the same account** (File → Import → Upload → "Insert new sheet(s)"), named `TRIAGE – <account> – private`. Don't share it. Delete the downloaded CSV files from the computer's Downloads folder once uploaded.

## 2. Prepare the triage sheet (10 min)
In the private triage sheet, merge the two tabs into one tab `triage` and keep only these columns (delete the rest of the Google columns in the *triage copy only*):
`Name` · `E-mail 1 - Value` · `Phone 1 - Value` · `Phone 2 - Value` · `Organization 1 - Name` · `Notes`
Then add 3 columns: `source_file` (`Contacts` / `Other contacts`), `phone_key`, `decision`. Resulting order: A Name · B E-mail · C Phone 1 · D Phone 2 · E Organization · F Notes · G source_file · H phone_key · I decision.

**`phone_key`** (normalises any Jordan format to one key for matching). In the first row, assuming the phone is in column C:
```
=LET(d, REGEXREPLACE(TO_TEXT(C2), "[^0-9]", ""),
 IF(d="", "",
 IF(LEFT(d,5)="00962", "+"&MID(d,3,99),
 IF(LEFT(d,3)="962", "+"&d,
 IF(LEFT(d,2)="07", "+962"&MID(d,2,99),
 IF(LEFT(d,1)="7", "+962"&d, "+"&d))))))
```
Fill down. `079 055 5890`, `0790555890`, `00962790555890` all become `+962790555890`.
*Assumption: numbers without a country code are Jordanian. Check any foreign-looking result by eye.*

## 3. Decide each row: Keep / Archive / Leave (the slow part)
Sort by `Organization`, then `Name`. Use the plan's triage rule; for contacts it means:

| `decision` | Who | Goes where |
|---|---|---|
| **Keep** | Current families (parents, students), teachers and staff, active partners and schools, suppliers in use, open enquiries from the last 12 months | Master list, main tab |
| **Archive** | Past families older than 2 years, old enquiries (12+ months, never enrolled), former suppliers and partners, old-brand contacts we may need for reference | Master list, tab `Archive (pre-Oct 2026)`: **never** used for messaging |
| **Leave** | Personal: family, friends, Fahed's other clients and creative work, services unrelated to the academy | Stays in the personal Gmail. **Not copied anywhere** |
| *(Delete)* | Not an option here. Junk (no name, no-reply addresses, newsletters) is simply marked **Leave** | — |

**Rules of thumb**
- Not sure if it's business? → **Leave** for now, add `?` in `Notes`, and ask Fahed at the end. Mixing personal contacts into the academy Sheet is worse than missing one.
- `Other contacts` is mostly noise (no-reply, newsletters, one-off emails). Expect most of it to be **Leave**. *Estimate.*
- A teacher who is also a friend: **Keep** the business details only.
- Students are minors: store only name, phone/email and academic fields. No photos, IDs or health notes.

**Speed tip:** filter `Name`/`E-mail` for `noreply`, `no-reply`, `notifications`, `newsletter`, `mailer` → mark all **Leave** in one go.

## 4. Dedupe against the parent contact list (15 min)
1. In the **master list**, add a helper column `phone_key` with the same formula (pointing at its `phone` column).
2. In the triage sheet, for **Keep** and **Archive** rows only, add a check column. Using `IMPORTRANGE` to the master list is allowed (both are academy-controlled Google files), or paste the master's `phone_key` column into a hidden tab `master_keys`:
```
=IF(H2="", "NO PHONE", IF(COUNTIF(master_keys!A:A, H2)>0, "DUPLICATE", "NEW"))
```
3. Then:
   - **DUPLICATE** → don't add a new row. Open the existing master row and **only fill empty fields** (usually `email`). Never overwrite what admissions entered. Put the master `record_id` in the triage sheet so you know it's done.
   - **NEW** → add to the master (step 5).
   - **NO PHONE** → check by email and by name + student name by eye; then treat as NEW or DUPLICATE.
4. Two Google rows for the same person (e.g. one in Contacts, one in Other contacts) → keep one, the one with more information.

## 5. Import into the master list (10 min)
For each **NEW Keep/Archive** row, add a row to the right tab with:

| Master column | Value |
|---|---|
| `record_id` / `family_id` | Next number / existing family code if you can link them, else a new one |
| `full_name`, `phone`, `email` | From Google; phone in the standard format `+962 7X XXX XXXX` |
| `role` | `Parent` · `Student` · or put the business role in `notes` (Teacher, Partner, Supplier) |
| `segment` | `Current` · `Past` · `Lead-never-enrolled` (or empty for staff/partners) |
| `contact_origin` | `Google Contacts` or `Other contacts` |
| `triage_decision` | `Keep` or `Archive` |
| `triage_date`, `triaged_by` | Today, your name |
| `imported_on` | Today |
| `consent_marketing` | **`Unknown`** (a saved contact is not consent: nobody imported here joins a broadcast until they say yes) |
| `consent_photo` | `Unknown` |

For merged duplicates: fill `email`, `contact_origin` (if empty), `triage_*`, and in the **triage sheet** note the master `record_id` (the master's `duplicate_of` column is only for rows you later merge inside the master itself).

## 6. Check and close (5 min)
Write these numbers (counts only, never names) in the master list's `Audit log` tab and send them to Keeper:

> `Contact triage · <account> · <date> · exported: Contacts <n> + Other <n> · Keep <n> · Archive <n> · Leave <n> · new rows added <n> · merged into existing <n> · open questions for Fahed <n>`

**The counts must add up:** Keep + Archive + Leave = total exported. Keep + Archive = new rows + merged. If not, find the gap before closing.

Then:
- [ ] Fahed answers the `?` rows; move them to Keep/Archive (repeat 4–5) or leave them.
- [ ] The private triage sheet stays in Fahed's account until the Phase 9 check "Important contacts preserved" is ✔; after that, removing it is Fahed's personal choice (it holds his personal contacts, not academy data).
- [ ] Forge updates row 14 of `migration_tracker.md` (Google Contacts) to `In progress` → `Done (tested)`.
- [ ] Once Workspace exists (D-04): import the master list's `Keep` contacts into the academy Workspace Contacts (Phase 4). Keeper prepares that step when the domain is live.

## Time estimate
About 1.5–3 hours per account, mostly step 3; depends on how many contacts there are. *Estimate; we don't have the counts yet.*
