# Phase 1 vs Phase 2 Guide

This guide explains how to use Phase 1 and Phase 2 correctly.

The short version:

```text
Phase 1 = Decide what should happen.
Phase 2 = Make it happen.
```

Do not mix them unless the task is tiny and explicitly approved.

---

# Phase 1 — Planning, Scope Control, and Approval

Phase 1 is not busywork.

Phase 1 prevents Claude Code or Codex from creating the wrong thing quickly.

## Goal of Phase 1

The goal is to define:

- the project goal
- the current problem
- the smallest useful vertical slice
- the validation question
- success criteria
- out-of-scope items
- risks and assumptions
- files likely to change
- checks that must pass
- approval before implementation

## Phase 1 Output

By the end of Phase 1, these should be updated:

```text
PROJECT_BRIEF.md
CONTEXT.md
STATUS.md
PLAN.md
PHASE_GATES.md
BACKLOG.md
DECISION_LOG.md
```

If the work is a specific task, create or update:

```text
plans/FIRST_SLICE_TEMPLATE.md
```

or a dated plan file based on it.

## Phase 1 Must Answer

```text
What are we proving?
What is the smallest useful slice?
What should not be built yet?
What files are expected to change?
How will we verify success?
What approval is needed before changes?
```

## Phase 1 Exit Criteria

Phase 1 is complete only when:

- the slice is small enough
- success criteria are testable
- out-of-scope items are clear
- risks are listed
- expected files are identified
- check/verify commands are known
- you approve implementation

## Phase 1 Prompt

Use this:

```md
We are in Phase 1 only.

Do not edit files yet.

Plan the smallest safe vertical slice.

Show:

1. project goal
2. validation question
3. proposed slice
4. success criteria
5. out-of-scope items
6. expected files to change
7. risks
8. check commands
9. verification method
10. approval request before Phase 2

Stop after the plan.
```

---

# Phase 2 — Implementation, Verification, Commit, Push

Phase 2 begins only after Phase 1 is approved.

## Goal of Phase 2

The goal is to implement the approved slice and verify it.

Do not expand scope.

Do not refactor unrelated code.

Do not add nice-to-have features.

## Phase 2 Output

By the end of Phase 2, these should be updated as needed:

```text
STATUS.md
SLICE_REVIEWS.md
PROGRESS_NOTE.md
PROGRESS_NOTES.md
COMMIT_NOTES.md
CHANGELOG.md
RELEASE_NOTES.md
LESSONS_LEARNED.md
```

Code/config files may also change if the approved slice requires them.

## Required Phase 2 Loop

Always use:

```text
check → fix → verify → commit → push
```

The check step comes first.

## Phase 2 Must Answer

```text
What changed?
Did it pass checks?
What failed?
What was fixed?
What remains risky?
What was committed?
What is next?
```

## Phase 2 Exit Criteria

Phase 2 is complete only when:

- approved files were changed
- no unrelated scope was added
- checks were run
- failures were fixed or documented
- success criteria passed
- commit notes were updated
- progress notes were updated
- changes were committed
- changes were pushed, if required
- slice review was written

## Phase 2 Prompt

Use this:

```md
We are entering Phase 2.

Implement only the approved slice.

Before editing:

1. inspect current state
2. confirm files expected to change
3. run the initial check
4. make the smallest safe change
5. run verification
6. update tracking files
7. prepare commit notes

Do not add scope.

Follow:

check → fix → verify → commit → push
```

---

# When To Stay In Phase 1

Stay in Phase 1 if:

- the goal is unclear
- success criteria are vague
- the slice is too large
- dependencies are unknown
- file impact is unknown
- there are conflicting requirements
- approval has not been given

---

# When To Move To Phase 2

Move to Phase 2 only when:

- the plan is approved
- the slice is small
- success criteria are testable
- expected files are known
- the first check is known
- rollback is understood
- out-of-scope items are listed

---

# Common Mistake

Bad:

```text
Plan the app and build it.
```

Better:

```text
Phase 1: Plan the first vertical slice.
Review and approve.
Phase 2: Build only that slice.
Verify, commit, push.
Review.
```

---

# Hard Rule

If Claude Code or Codex starts writing code during Phase 1, stop it.

Use:

```md
Stop. We are still in Phase 1.

Do not edit files.

Return to the current validation goal, success criteria, risks, and approval request.
```
