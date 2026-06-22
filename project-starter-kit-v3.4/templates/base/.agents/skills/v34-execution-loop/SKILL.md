---
name: v34-execution-loop
description: Use for implementation, bugfixes, refactors, audit remediation, repo cleanup, documentation updates, and any project change that should follow V3.4 quality gates.
---

# V3.4 Execution Loop

Use this skill for substantial project work.

## Core Loop

```text
Inspect → Plan → Change → Verify → Document → Gate → Decide
```

## 1. Inspect

Before editing:

- Read `AGENTS.md` and `CLAUDE.md` if present.
- Inspect relevant files.
- Check `git status --short` if Git is available.
- Identify task type: feature, fix, refactor, audit, docs, cleanup, release, migration.
- Read relevant governance docs:
  - `docs/governance/DONE_CRITERIA.md`
  - `docs/governance/PHASE_GATES.md`
  - `docs/governance/CHANGE_CONTROL.md`
  - `docs/governance/TEST_STRATEGY.md`
  - `ai/agents/AGENT_REVIEW_GATES.md`

Do not edit files during inspection.

## 2. Plan

Produce a short plan:

- Objective
- Files likely to change
- Files that must not be touched
- Validation commands
- Risks and assumptions
- Rollback approach
- Stop conditions

If the task is destructive, broad, or ambiguous, stop and ask for approval.

## 3. Change

Make the smallest safe change.

Rules:

- Preserve existing user work.
- Do not overwrite without approval.
- Do not delete unless explicitly requested.
- Avoid broad refactors unless requested.
- Keep changes scoped to the objective.

## 4. Verify

Run the strongest available validation:

1. tests
2. build
3. typecheck
4. lint
5. security/dependency scan
6. app-specific smoke test
7. manual verification

If validation fails, fix the relevant issue and re-run once. If still failing, mark PARTIAL or BLOCKED.

## 5. Document

Update relevant docs when meaningful:

- `docs/project/STATUS.md`
- `docs/project/DECISION_LOG.md`
- `docs/governance/REPO_HEALTH_CHECK.md`
- `docs/governance/PROJECT_RISK_REGISTER.md`
- `docs/governance/AGENT_RUN_LOG.md`

## 6. Gate

Check:

- `docs/governance/DONE_CRITERIA.md`
- `docs/governance/PHASE_GATES.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

Assign one status:

- PASS
- PARTIAL
- BLOCKED
- FAIL

## 7. Decide

Final output:

```md
# V3.4 Execution Result

## Status
PASS / PARTIAL / BLOCKED / FAIL

## Objective
[What was attempted]

## Files Inspected
[List]

## Files Changed
[List]

## Validation Performed
[Commands and results]

## Risks / Assumptions
[List]

## V3.4 Gate Result
[Done criteria / phase gate result]

## Next Action
[Commit / continue / rollback / user decision]
```
