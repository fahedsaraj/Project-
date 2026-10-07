# Team Directory: each employee has their own chat

Each AI employee runs in its own Claude Code session (chat). Open a chat from the Claude app (Code → sessions) or the link below, and give that employee tasks directly. Atlas can also route tasks to them.

| Employee | Role | Session (chat) | Logs to |
|---|---|---|---|
| **Atlas** | Marketing Director & team lead | [session_01J31BnpF8D2P6j5zcxzSPfg](https://claude.ai/code/session_01J31BnpF8D2P6j5zcxzSPfg) | `00_Activity_Logs/atlas.md` |
| **Quill** | Content & Community | [session_01GNzQQKDYu5Q7q5c7veEVFj](https://claude.ai/code/session_01GNzQQKDYu5Q7q5c7veEVFj) | `quill.md` |
| **Lens** | Creative Studio (design + video) | [session_013Nk38vjPosMKdibboCdVbm](https://claude.ai/code/session_013Nk38vjPosMKdibboCdVbm) | `lens.md` |
| **Spark** | Ads & Lead Generation | [session_01YZXw4wsiXpYbpHumb9qp5z](https://claude.ai/code/session_01YZXw4wsiXpYbpHumb9qp5z) | `spark.md` |
| **Keeper** | CRM & Admissions Follow-up | [session_012qhsS2LFnJ5BdrUpKERPG9](https://claude.ai/code/session_012qhsS2LFnJ5BdrUpKERPG9) | `keeper.md` |
| **Compass** | Analytics & Insights | [session_01R9TXutjFXb91oTjWsoVYm3](https://claude.ai/code/session_01R9TXutjFXb91oTjWsoVYm3) | `compass.md` |
| **Forge** | Web, SEO & Digital Ops | [session_019ks3CEUXrYk4i87U4AY48e](https://claude.ai/code/session_019ks3CEUXrYk4i87U4AY48e) | `forge.md` |

All sessions carry the tag `uia-team` (plus `uia-<name>`), work in the repo `fahedsaraj/Project-` on branch `claude/jolly-wright-jvf598`, and follow `/CLAUDE.md`.

## How tasks reach each employee
1. **Directly:** Fahed opens an employee's chat and types the task. That employee answers in the intake shape (can do now / blocks / recommended path / estimate) and executes approved work.
2. **Through Atlas:** Fahed gives any task to Atlas. Atlas decides the owner and sends it to that employee's chat (`send_message` to the session ID above), with the deadline and the approver. Atlas tracks it in the P01 tracker.
3. **Hand-offs between employees** go through Atlas (or are written in the tracker), so every task has one owner and nothing is lost.

## Working rules for the shared repo
- Everyone works on the same branch: `git pull --rebase` before each push, with small commits.
- Each employee writes only its own log; **only Atlas** regenerates `combined_activity_log.pdf`.
- No real customer personal data in the repo; templates and structures only.
- Approval tiers apply in every chat. Publishing, customer messages, money, accounts and legal matters always come back to Fahed (and management for Tier 2).
