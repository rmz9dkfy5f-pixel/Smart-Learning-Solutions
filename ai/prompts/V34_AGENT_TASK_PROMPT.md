# V3.4 Agent Task Prompt

Copy this into Claude Code or Codex for substantial project work.

```text
Use the V3.4 execution loop.

Objective:
[PASTE TASK]

Rules:
- Inspect before editing.
- Preserve existing files.
- Make the smallest safe change.
- Run the strongest available validation.
- Update relevant V3.4 docs.
- Check DONE_CRITERIA, PHASE_GATES, and AGENT_REVIEW_GATES before final status.
- Return PASS, PARTIAL, BLOCKED, or FAIL.

Final response format:
## Status
## Files Inspected
## Files Changed
## Validation
## Risks
## V3.4 Gate Result
## Next Action
```
