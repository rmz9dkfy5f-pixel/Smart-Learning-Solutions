# Quality Gate Review Prompt

Use this before marking any slice complete.

## Prompt

Review the current work against the project quality gates.

Read these files first if they exist:

- `DONE_CRITERIA.md`
- `CHANGE_CONTROL.md`
- `STATUS.md`
- `PLAN.md`
- `DECISION_LOG.md`
- `PROJECT_RISK_REGISTER.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

Then report:

1. Approved scope
2. Files changed
3. Whether unrelated files changed
4. Verification commands run
5. Verification results
6. Source-of-truth files that need updates
7. Risks found
8. Rollback readiness
9. Whether the slice is truly done
10. Next action

Do not mark the work done unless it meets `DONE_CRITERIA.md`.

If anything is missing, label the state as:

- `Blocked`
- `Partially complete`
- `Needs verification`
- `Needs approval`
- `Failed`
