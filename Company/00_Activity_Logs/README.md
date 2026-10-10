# Activity Logs

One log per agent. Each agent appends an entry at the end of every session where it worked. Newest entries go at the bottom. After updating, run:
`python3 Company/01_Tools/build_combined_log.py` → regenerates `combined_activity_log.pdf`.

## Entry format
```
## YYYY-MM-DD
- Done: …
- In progress: …
- Blocked / needs approval: …
- Next: …
```
Facts only, no filler. Never log passwords, codes or customer personal data.
