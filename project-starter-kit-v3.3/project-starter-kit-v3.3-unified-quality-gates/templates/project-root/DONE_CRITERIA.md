# Done Criteria

This file defines what “done” means for this project.

A task is not done because an AI agent says it is done. A task is done when the repo state proves it.

## Universal Definition of Done

A slice is complete only when all applicable items are true:

- The approved scope is complete.
- No unrelated refactor or cleanup was performed.
- Relevant files changed are listed in the final summary.
- Build, test, lint, typecheck, or manual verification was run where applicable.
- Any failed verification is documented with the reason and next action.
- `STATUS.md` reflects the current state.
- `PLAN.md` reflects the next slice.
- `DECISION_LOG.md` is updated if architecture, security, data model, dependency, deployment, or workflow changed.
- An AI session record exists when AI materially helped:
  - feature work → `ai/sessions/features/`
  - bug work → `ai/sessions/debug/`
  - design work → `ai/sessions/designs/`
  - optimization work → `ai/sessions/optimization/`
- A checkpoint exists if the chat became long, ambiguous, or likely to be continued later.
- Rollback path is known for risky changes.
- Commit message is prepared.

## Feature Slice Done Criteria

A feature slice is done when:

- The feature matches the approved slice in `PLAN.md`.
- The user-facing behavior is described.
- Edge cases are listed.
- Verification steps are recorded.
- No unrelated UI, routing, dependency, or architecture changes were made.
- New assumptions are captured in `DECISION_LOG.md` or `STATUS.md`.

## Debug Slice Done Criteria

A debug slice is done when:

- The symptom is documented.
- Evidence is documented.
- Hypotheses were considered.
- Root cause is identified or explicitly marked unresolved.
- The fix is minimal.
- Verification proves the bug is fixed or narrows the issue.
- Preventative measure is listed if appropriate.

## Design Slice Done Criteria

A design slice is done when:

- The design addresses a real project need.
- Tradeoffs are listed.
- Security, data, failure, scaling, and maintenance implications are considered where relevant.
- Approved decisions are promoted to stable docs.
- Unapproved ideas remain in `ai/sessions/designs/`.

## Migration Done Criteria

A starter-kit migration is done when:

- Existing source code was preserved.
- Existing documentation was not overwritten without approval.
- Conflicts were quarantined in `.starter-kit/review/conflicts/`.
- Added files are listed.
- Modified files are listed.
- `REPO_HEALTH_CHECK.md` exists or was updated.
- `ROLLBACK_PLAN.md` exists or was updated.
- Risky recommendations are listed but not executed without approval.

## Exception Rule

If a task cannot meet the done criteria, it may still be paused, but it must be labeled as one of:

- `Blocked`
- `Partially complete`
- `Needs verification`
- `Needs approval`
- `Failed`

Never mark incomplete or unverified work as done.
