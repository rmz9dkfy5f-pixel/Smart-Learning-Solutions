# Project Starter Kit v3.3 — Quality Gate Layer Plan

## Purpose

v3.3 strengthens the starter kit by adding enforcement, verification, rollback, and risk controls.

v3.2 added sub-agents. v3.3 tells the workflow when work is actually done, what AI may touch, how to baseline a repo, how to recover from mistakes, and when agent reviews are required.

## What Changed

Added to `templates/project-root/`:

- `DONE_CRITERIA.md`
- `CHANGE_CONTROL.md`
- `REPO_HEALTH_CHECK.md`
- `ROLLBACK_PLAN.md`
- `PROJECT_RISK_REGISTER.md`

Added to `templates/project-root/ai/agents/`:

- `AGENT_REVIEW_GATES.md`

Added to `core-prompts/`:

- `10_QUALITY_GATE_REVIEW_PROMPT.md`
- `11_ROLLBACK_REVIEW_PROMPT.md`

Updated startup and migration prompts to require:

- repo inspection before changes
- conflict quarantine
- install log
- repo health check
- rollback plan
- done criteria
- change-control rules
- agent review gates

## Strategic Reason

The kit already had enough templates. The missing layer was enforcement.

Without v3.3, the system could still fail by:

- letting AI overwrite existing project files
- marking unverified work as done
- skipping rollback planning
- using sub-agents inconsistently
- letting documentation drift away from implementation
- turning migration into uncontrolled cleanup

v3.3 reduces those risks.

## Use Rules

### New Repos

Use:

```text
PROJECT_STARTER_KIT_V3_3_PUSH_BUTTON_STARTUP_PROMPT.md
```

### Existing Repos

Use:

```text
PROJECT_STARTER_KIT_V3_3_EXISTING_PROJECT_MIGRATION_PROMPT.md
```

### Risky Work

Before risky edits, read:

- `CHANGE_CONTROL.md`
- `DONE_CRITERIA.md`
- `PROJECT_RISK_REGISTER.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

### After Work

Update:

- `STATUS.md`
- `PLAN.md`
- `PROGRESS_NOTE.md`
- `ROLLBACK_PLAN.md` if risk was meaningful
- `PROJECT_RISK_REGISTER.md` if a risk was found or closed

## What Not to Add Yet

Do not expand the agent roster yet.

The current agent set is sufficient:

- repo-cartographer
- project-steward
- slice-planner
- debugger
- test-verifier
- security-reviewer
- docs-promoter

The next bottleneck is real-world usage, not more abstraction.
