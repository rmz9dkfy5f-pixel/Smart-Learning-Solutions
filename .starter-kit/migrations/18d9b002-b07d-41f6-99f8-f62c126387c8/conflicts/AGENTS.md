# AGENTS.md — Project Starter Kit V3.5

## Purpose

This file gives coding agents the minimum always-loaded guidance needed to work safely in this repository.

Detailed workflows live in skills and docs so this file stays concise.

## Agent Operating Rule

For any non-trivial task, use the V3.5 loop:

```text
Inspect → Plan → Change → Verify → Document → Gate → Decide
```

Do not jump directly into edits.

## Step 0 — Determine Project Classification

Before anything else, read `docs/governance/PROJECT_CLASSIFICATION.md` and confirm (or fill in)
this repository's classification: vault-only, local non-Git, Git-backed, Git-backed with remote,
or Git-backed with deployment. Never guess it — leave it `TBD` if unconfirmed. This determines
which sections of `docs/governance/REPOSITORY_HANDOFF_CONFIG.md` apply.

## Mandatory Model Selection Gate

After classification, and before substantial work, read `MODEL_SELECTION_GATE.md` and show its
complete brief. If working in VS Code, show every coding agent available there, then choose a
primary and fallback. The visible picker overrides dated model examples.

Also read `docs/governance/AGENT_RUN_CONTRACT.md` before implementation — it defines how any
named, repeatable run type for this repository should be registered and governed.

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

- `MODEL_SELECTION_GATE.md`
- `docs/governance/PROJECT_CLASSIFICATION.md`
- `docs/governance/AGENT_RUN_CONTRACT.md`
- `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`
- `docs/governance/DONE_CRITERIA.md`
- `docs/governance/PHASE_GATES.md`
- `docs/governance/CHANGE_CONTROL.md`
- `docs/governance/ROLLBACK_PLAN.md`
- `docs/governance/REPO_HEALTH_CHECK.md`
- `docs/governance/TEST_STRATEGY.md`
- `docs/governance/SECURITY_BASELINE.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

When filling `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`, use only real, confirmed values
(discovered from the actual toolchain, Git remotes, and deployment config) — never a placeholder
path or command presented as fact. Mark any inapplicable section `N/A — <reason>` per its own
instructions.

## Skills

Use these skills when available:

- `starter-execution-loop` for implementation, bugfixes, refactors, repo cleanup, and audit remediation.
- `starter-migration-loop` for migrating existing projects into V3.5.
- `starter-production-readiness` for production readiness audits.
- `starter-context-eval-loop` for prompt, context, eval, and failure-loop work.

## Instruction Loading

Keep this file concise. Long procedures belong in `.agents/skills/` or `docs/`.

## Memory Hygiene

When you learn persistent project-specific facts, update the relevant project doc rather than
bloating this file.

Preferred locations:

- Architecture facts → `docs/project/ARCHITECTURE.md`
- Current state → `docs/project/STATUS.md`
- Decisions → `docs/project/DECISION_LOG.md`
- Known risks → `docs/governance/PROJECT_RISK_REGISTER.md`
- Validation rules → `docs/governance/TEST_STRATEGY.md`
- Agent workflow notes → `ai/agents/AGENT_REVIEW_GATES.md`

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
