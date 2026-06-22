# Done Criteria

A task is not done because files changed. A task is done when the result is verified, documented, and safe to hand off.

## Universal Done Criteria

A task reaches **PASS** only when:

- Objective is clear.
- Relevant files were inspected.
- Changes are scoped to the objective.
- Existing user work was preserved.
- Validation was run or a clear reason is documented.
- Remaining risks are listed.
- Follow-up work is identified.
- The final report includes changed files and validation results.

## Status Levels

### PASS

The task satisfies the objective and validation passed.

### PARTIAL

The task is useful but has known gaps, missing validation, or follow-up work.

### BLOCKED

The task cannot continue safely because of missing access, missing context, tool failure, or conflicting requirements.

### FAIL

The task produced an unsafe or invalid result and should be revised or rolled back.

## Never Mark PASS If

- Tests/build were available but not run.
- Validation failed.
- The agent overwrote existing files without approval.
- The solution depends on unverified assumptions.
- There are unresolved merge conflicts.
- Security-sensitive changes were made without review.
