# Parent Contact List: how to fill it (for admissions, today 7 Oct)

> **Owner:** Keeper (structure) · **Fills it:** admissions · **Deadline:** today, before 18:00 (reveal plan) · **Used:** tomorrow at ⟦T⟧ + 30 min for the parent WhatsApp, then it becomes the master contact list (P01 task 1.10).
> **Template:** `parent_contact_list_TEMPLATE.csv` (header only).

## 1. Where the real list lives
- Create **one Google Sheet in the academy's Google account** (not a personal account): `UIA – Master Contact List`.
- File → Import → Upload `parent_contact_list_TEMPLATE.csv` → "Replace current sheet". The header row appears; freeze it (View → Freeze → 1 row).
- Share it **only** with admissions and Fahed. Never export it, email it, paste it into another app or AI tool, or upload it to this repo. Real names and phone numbers never go into git.

## 2. Who goes on the list today
1. **Current students and their parents** (priority: they get the message tomorrow).
2. **Past students and parents from the last 2 years.**
3. **Open leads who never enrolled** (fill if time allows; they're not in tomorrow's send unless Fahed says so).

**One row per person.** A parent and their child are two rows with the same `family_id`. Two siblings = one parent row + two student rows, same `family_id`.
**Sources:** WhatsApp chats and labels on the academy phone, registration forms, class lists, payment records.

## 3. Columns
**Must fill today** (needed for tomorrow's send) are marked ★. Everything else can wait.

| Column | What to write | Allowed values / format |
|---|---|---|
| `record_id` ★ | Running number | 1, 2, 3… |
| `family_id` ★ | Same code for everyone in one family | F001, F002… |
| `full_name` ★ | Name as the family uses it | Text |
| `role` ★ | Parent or student | `Parent` · `Student` |
| `phone` ★ | WhatsApp number | `+962 7X XXX XXXX` (spaces as shown). Non-Jordan numbers: `+country code` then the number |
| `preferred_language` ★ | Language they write to us in | `AR` · `EN` |
| `linked_student_or_parent` ★ | For a parent: the child's name. For a student: the parent's name | Text; several names separated by `;` |
| `school` | Student's school | Text |
| `curriculum` | Student's system | `American` · `British` · `IB` · `Other` |
| `grade` | Current grade | 9–12 |
| `programmes` ★ | What they study with us | `AP` · `SAT` · `EST II` · `IGCSE` · `IB` (exact capitals; several separated by `;`) |
| `segment` ★ | Relationship to the academy | `Current` · `Past` · `Lead-never-enrolled` |
| `saved_our_number` ★ | Have they saved the academy number? | `Yes` · `No` · `Unknown`. *Unknown is fine today; the broadcast test tomorrow fills it in (playbook §3).* |
| `source_tag` | Where they first came from | e.g. `ig`, `fb`, `referral`, `walk-in`, `unknown` |
| `first_contact_date` | First contact | `YYYY-MM-DD` |
| `stage` | Lead stage | `New` · `Contacted` · `Qualified` · `Trial booked` · `Trial attended` · `Enrolled` · `Lost`. Current families = `Enrolled` |
| `next_step` | The next action | Short text |
| `next_step_date` | When | `YYYY-MM-DD` |
| `owner` ★ | Admissions person responsible for this family tomorrow | Name of the staff member |
| `consent_marketing` | OK to receive academy updates/broadcasts? | `Yes` · `No` · `Unknown` |
| `consent_photo` | Signed photo/video consent for the student? | `Yes` · `No` · `Unknown` (default `Unknown` until the form, task 2.12) |
| `notified_8_oct` | Did they receive tomorrow's message? | Leave **empty** today. Tomorrow: `Yes` · `No` · `Failed` |
| `notified_method` | How it was sent | `Broadcast` · `Individual` · `Call` |
| `notified_time` | Time sent | `HH:MM` |
| `notified_by` | Who sent it | Staff name |
| `reply_received` | Did they reply? | `Yes` · `No` |
| `reply_topic` | What they asked | Short code from the playbook §5 (e.g. `congrats`, `teachers`, `fees`) |
| `escalated_to_fahed` | Passed to Fahed? | `Yes` · `No` |
| `notes` | Anything useful | Short. **No** sensitive details (health, family issues, payments) |

**Columns added for the email migration (v1.1, 7 Oct).** They sit at the end, so a Sheet built from v1 just adds 7 columns on the right. Filled during the contact triage (`05_Operations/email_migration/contact_triage_procedure.md`), not needed for 8 Oct:

| Column | What to write | Allowed values / format |
|---|---|---|
| `email` | Email address, if known | lowercase |
| `contact_origin` | Where the row came from | `WhatsApp` · `Registration` · `Google Contacts` · `Other contacts` · `Walk-in` · `Ads` |
| `triage_decision` | Result of the triage | `Keep` · `Archive` (`Leave` rows never reach this Sheet) |
| `triage_date` | When triaged | `YYYY-MM-DD` |
| `triaged_by` | Who decided | Staff name |
| `duplicate_of` | If this person already had a row: the `record_id` it was merged into | Number, or empty |
| `imported_on` | Date the row entered the master list | `YYYY-MM-DD` |

## 4. Quick quality check before 18:00 (5 minutes)
- [ ] Every **Current** family has at least one parent row with a phone number.
- [ ] Phones are in `+962 7X XXX XXXX` format; no duplicates (Data → Data cleanup → Remove duplicates on the `phone` column, after checking).
- [ ] Every parent row has an `owner` and a `preferred_language`.
- [ ] Programme names are exact: AP, SAT, EST II, IGCSE, IB.
- [ ] Add a filter (Data → Create a filter) so tomorrow you can show "Current + Parent + notified_8_oct empty".
- [ ] Tell Keeper/Fahed the counts: **current parents**, **past parents**, **parents with no phone**.

## 5. Make tomorrow fast (optional, if time)
- Split current parents into two halves by `owner` so two people can send in parallel (playbook §2).
- On the academy phone, make sure each current parent is **saved as a contact** (needed to add them to a broadcast list). Name format: `UIA P – Parent name (Student name)`.
