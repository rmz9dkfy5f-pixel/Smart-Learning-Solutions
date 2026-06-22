# Phase Gates

Use phase gates to prevent uncontrolled project drift.

## Gate 0 — Intake

Required before work starts:

- Objective identified
- Task type identified
- Relevant files located
- Risks and assumptions listed
- Stop conditions known

## Gate 1 — Plan

Required before edits:

- Minimal implementation path selected
- Files likely to change listed
- Validation method selected
- Rollback path identified

## Gate 2 — Implementation

Required before claiming completion:

- Changes are scoped
- No unrelated rewrites
- No unauthorized deletions
- Conflicts quarantined

## Gate 3 — Verification

Required before PASS:

- Tests/build/lint/typecheck/manual validation run as applicable
- Failures fixed or documented
- Unverified areas listed

## Gate 4 — Documentation

Required before handoff:

- Status updated
- Decisions logged
- Risks updated
- Run log updated
- Commit message suggested if appropriate

## Gate 5 — Release / Production Readiness

Required before production:

- Security baseline reviewed
- Compatibility matrix reviewed
- Rollback plan reviewed
- Release gate reviewed
- User-facing impact understood
