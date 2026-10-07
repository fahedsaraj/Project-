# Phone Number Standard

> **The number never changes: +962 79 055 5890.** It's in almost every post we've published, so it's the strongest continuity asset of the transition. Owner: Forge (setup), Quill/Spark (usage), Keeper (operations).

## 1. Canonical formats (use exactly these)
| Context | Format |
|---|---|
| English text, ads, signatures, print | **+962 79 055 5890** |
| Arabic text | **+962 79 055 5890** (same digits, kept left-to-right), e.g. «للتسجيل والاستفسار (اتصال أو واتساب): +962 79 055 5890» |
| Local-only print (flyers in Amman) | 079 055 5890 |
| Click-to-call link | `tel:+962790555890` |
| WhatsApp link | `https://wa.me/962790555890` |
| WhatsApp link with source tag | `https://wa.me/962790555890?text=<urlencoded message>` (see §4) |

**Retired formats:** 0790555890, 00962790555890, +962 7 9055 5890, 0790 555 890, +962790555890 written without spaces. Replace them whenever we touch an asset.
**Second number +962 79 070 4656:** don't use in marketing until D-05 is decided.

## 2. Integration plan by surface
| Surface | What to set | Transition line (cleared, D-01) | Owner | Phase |
|---|---|---|---|---|
| **WhatsApp Business** | Display name "United International Academy"; profile photo = avatar; category Education; description (below); address; hours; website/IG links; catalog with one item per programme | Description mentions "Same number, same team" | Forge sets up, Fahed approves | Reveal week |
| **Instagram** | Contact button (call + WhatsApp), the number in the bio, the WhatsApp link in the link-in-bio | Bio line "Formerly Success 4Sure – Khalda" for 90 days | Forge/Quill | Reveal week |
| **Facebook Page** | Phone, WhatsApp button (linked account), CTA "Send WhatsApp message" | About section | Forge | Reveal week |
| **Website** | Header click-to-call, sticky WhatsApp button, footer; schema.org `telephone` | Footer note | Forge | Before reveal |
| **Google Business Profile** | Primary phone; WhatsApp chat link; hours; address | Business description | Forge | Before reveal (verification can take days) |
| **Ads** | Click-to-WhatsApp ads, or lead forms with a call button; every ad has its own source tag | — | Spark | Phase 4 |
| **Email signatures** | Phone + WhatsApp link | Signature transition line | Forge | Email go-live |
| **Print** (cards, letterhead, booklet, kit, signage) | +962 79 055 5890 + QR to the WhatsApp link | — | Lens | As produced |
| **Customer support** | Greeting/away messages, quick replies, labels (below) | Greeting mentions the new name | Keeper | Reveal week |

## 3. WhatsApp Business configuration (draft for approval)
- **About:** «United International Academy | Shaping Global Minds.»
- **Description (AR/EN):** «أكاديمية دولية لطلاب الأنظمة الدولية (AP، SAT، EST II، IGCSE، IB). نفس الفريق ونفس الرقم، بهوية جديدة.» / "International academy for international-curriculum students (AP, SAT, EST II, IGCSE, IB). Same team, same number, new identity."
- **Greeting message:** «أهلاً بك في United International Academy 👋 (سابقاً Success 4Sure – خلدا). كيف نقدر نساعدك؟ اكتب اسم البرنامج (AP / SAT / EST II / IGCSE / IB) وصف الطالب.»
- **Away message:** «شكراً لتواصلك مع United International Academy. سنرد عليك أول ما نفتح (من الأحد إلى الخميس، ⟦الساعات⟧).»
- **Labels:** New lead · Parent · Student · AP · SAT · EST II · IGCSE · IB · Trial booked · Enrolled · Existing family · Follow-up.
- **Quick replies:** `/programmes`, `/location`, `/trial`, `/schedule`, `/thanks`. Text from Keeper's script library.

## 4. Source tags in WhatsApp links (measurement)
Every link carries a short reference so the CRM knows where the chat came from:
`https://wa.me/962790555890?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A8%D8%AF%D9%8A%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20SAT%20%5Bref%3AIG-BIO%5D`
(decodes to «مرحباً بدي أستفسر عن SAT [ref:IG-BIO]»).
**Tag scheme:** `CHANNEL-PLACEMENT[-CAMPAIGN]`, e.g. `IG-BIO`, `FB-PAGE`, `WEB-HEADER`, `GBP`, `AD-SAT-NOV`, `PRINT-CARD`, `EMAIL-SIG`. Admissions copies the ref into the CRM "source" field.
