# AGENTS.md — Project Starter Kit V3.4

## Purpose

This file gives coding agents the minimum always-loaded guidance needed to work safely in this repository.

Detailed workflows live in skills and docs so this file stays concise.

## Agent Operating Rule

For any non-trivial task, use the V3.4 loop:

```text
Inspect → Plan → Change → Verify → Document → Gate → Decide
```

Do not jump directly into edits.

## Safety Rules

- Preserve existing project files.
- Do not overwrite user-authored files without explicit approval.
- Do not delete files unless the task explicitly requires deletion.
- Prefer small scoped changes over broad rewrites.
- Quarantine conflicts instead of forcing merges.
- If a command is destructive, explain the risk before running it.
- Do not claim success unless verification has run or you clearly state why verification could not run.

## Required References

Before implementation, inspect relevant files from:

- `docs/governance/DONE_CRITERIA.md`
- `docs/governance/PHASE_GATES.md`
- `docs/governance/CHANGE_CONTROL.md`
- `docs/governance/ROLLBACK_PLAN.md`
- `docs/governance/REPO_HEALTH_CHECK.md`
- `docs/governance/TEST_STRATEGY.md`
- `docs/governance/SECURITY_BASELINE.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

## Skills

Use these skills when available:

- `v34-execution-loop` for implementation, bugfixes, refactors, repo cleanup, and audit remediation.
- `v34-migration-loop` for migrating existing projects into V3.4.
- `v34-production-readiness` for production readiness audits.
- `v34-context-eval-loop` for prompt, context, eval, and failure-loop work.

## Output Standard

For substantial work, end with:

```md
## Status
PASS / PARTIAL / BLOCKED / FAIL

## What Changed
[List]

## Validation
[Commands and results]

## Risks
[Remaining issues]

## Next Action
[Commit / continue / rollback / user decision]
```

## Git Discipline

Use this sequence when changing the repo:

```text
check → fix → verify → document → commit suggestion
```

Do not commit unless the user asks you to commit.
