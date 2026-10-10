---
type: reference
---
The team agents are Claude Code subagents in `/.claude/agents/`: atlas, quill, lens, spark, keeper, compass, forge. Each loads its role file from Company/00_Blueprint/Team/ at the start of a task and logs to Company/00_Activity_Logs/<name>.md at the end. Invoke one by name (e.g. "ask Quill to draft…").
