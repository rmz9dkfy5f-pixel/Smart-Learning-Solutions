# Project Starter Kit v3.1 — Unified

This starter kit is designed for projects built with Claude Code, Codex, or other coding agents.

It merges two systems:

1. **Project Starter Kit v2** — phase gates, vertical slices, approval before file changes, GitHub tracking, and source-of-truth discipline.
2. **AI Engineering Memory** — clean AI session files, checkpoints, reusable prompts, reusable patterns, and controlled context resets.

The purpose is to prevent this failure pattern:

```text
vague idea → messy chat → bloated plan → AI overbuilds → source-of-truth confusion → stalled project
```

The corrected pattern is:

```text
clear brief → smallest slice → approved implementation → verified commit → checkpoint → reusable lesson
```

---

## Start Here

Read this first:

```text
START_HERE.md
```

Then use:

```text
RUN_FIRST.md
core-prompts/00_START_PROJECT_PROMPT.md
```

---

## Core Rule

The starter kit is not the project.

For a real project, copy or generate from:

```text
templates/project-root/
```

Do not copy every starter-kit explanation into the application repo unless it is useful.

---

## What v3 Adds Over v2

v2 controlled the project.

v3 also controls the AI context.

New first-class layer:

```text
ai/
  README.md
  ai.config.json
  templates/
  sessions/
  checkpoints/
  prompts/
  patterns/
  reports/
```

This layer prevents important reasoning from living only inside chat.

---



## What v3.1 Adds

The additional documents introduced a stronger API/service design layer. v3.1 adds:

```text
ai/templates/api_design_template.md
```

Use it when designing services, API surfaces, auth flows, data models, scaling behavior, observability, or security boundaries.

Keep `design_template.md` for broader architecture or non-API design sessions.

---

## Required Execution Loop

Every approved implementation slice follows:

```text
check → fix → verify → commit → push
```

The check step must come first.

---

## Phase Model

```text
Phase 0 = initialize project-control and AI-memory structure
Phase 1 = plan and approve the smallest useful slice
Phase 2 = implement only the approved slice
Phase 3 = review, checkpoint, and promote reusable knowledge
```

Do not mix planning, implementation, debugging, and optimization in the same AI session.

---

## Minimum Starting Files

For a small project, start with:

```text
README.md
PROJECT_BRIEF.md
CONTEXT.md
STATUS.md
PLAN.md
BACKLOG.md
DECISION_LOG.md
COMMIT_NOTES.md
PROGRESS_NOTE.md
CLAUDE.md
AGENTS.md
ai/README.md
ai/templates/
ai/checkpoints/
ai/sessions/
```

For larger projects, keep the full project-root template.

---

## v3.2 Update — Controlled Sub-Agent Layer

Version 3.2 adds a small Claude Code sub-agent layer for controlled delegation:

```text
.claude/agents/ = runtime Claude Code sub-agents
ai/agents/ = human-readable agent usage docs
```

Included agents:

- `repo-cartographer`
- `project-steward`
- `slice-planner`
- `debugger`
- `test-verifier`
- `security-reviewer`
- `docs-promoter`

Use these to inspect, plan, debug, verify, review security-sensitive changes, and promote durable documentation without polluting the main chat context.

For installation details, use one of the v3.2 prompts:

- `PROJECT_STARTER_KIT_V3_2_PUSH_BUTTON_STARTUP_PROMPT.md` for new repos
- `PROJECT_STARTER_KIT_V3_2_EXISTING_PROJECT_MIGRATION_PROMPT.md` for existing repos


## v3.3 Quality Gate Layer

v3.3 adds quality-control files to prevent unsafe AI-driven changes:

- `DONE_CRITERIA.md` — defines what complete means.
- `CHANGE_CONTROL.md` — defines what AI may edit and what requires approval.
- `REPO_HEALTH_CHECK.md` — baselines the repo before major work.
- `ROLLBACK_PLAN.md` — preserves recovery steps for migrations and risky changes.
- `PROJECT_RISK_REGISTER.md` — tracks risks across the project.
- `ai/agents/AGENT_REVIEW_GATES.md` — defines when sub-agents are required.

Use the v3.3 startup prompt for new repos and the v3.3 migration prompt for existing repos.
