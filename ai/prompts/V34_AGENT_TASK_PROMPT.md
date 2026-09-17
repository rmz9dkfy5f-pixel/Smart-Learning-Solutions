# V3.5 Agent Task Prompt

Copy this into your coding agent for substantial project work.

```text
Use the V3.5 execution loop.

Objective:
[PASTE TASK]

Rules:
- Inspect before editing.
- Preserve existing files.
- Make the smallest safe change.
- Run the strongest available validation.
- Update relevant V3.5 docs.
- Check DONE_CRITERIA, PHASE_GATES, and AGENT_REVIEW_GATES before final status.
- Return PASS, PARTIAL, BLOCKED, or FAIL.

Final response format:
## Status
## Files Inspected
## Files Changed
## Validation
## Risks
## V3.5 Gate Result
## Next Action
```
