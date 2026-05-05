# Claude Code Project Starter Kit

A reusable scaffolding template for any new project started with Claude Code. Paste the relevant sections into a new chat to replicate the planning-first, slice-approved workflow.

---

## What This System Does

- Forces Claude to read before it edits
- Keeps strategy, content, and implementation separated
- Gates all non-trivial work behind a written plan
- Breaks changes into small, reviewable approval slices
- Gives Claude a clear operating guide specific to your project

---

## Folder Structure to Create

```
ProjectName/
├── CHANGELOG.md                     ← project changelog (Keep a Changelog format)
├── CLAUDE.md                        ← Claude's operating guide for this project
├── .claude/
│   └── settings.json                ← Claude Code harness settings
├── docs/
│   ├── strategy/
│   │   └── [project-context].md     ← Business context, goals, audiences, offerings
│   └── workflow/
│       └── claude-code-workflow.md  ← Workflow rules for this project
└── plans/
    ├── PLAN_TEMPLATE.md             ← Reusable plan template
    ├── open-decisions.md            ← Blockers requiring owner input
    └── [YYYY-MM-DD-task-name].md    ← Active task plans (dated)
```

---

## CLAUDE.md Template

Copy this file to your repo root and fill in the bracketed sections.

```markdown
# CLAUDE.md

## Project Identity
This repository is for the **[Project Name]** [brief description: what it is and what it does].

[1–3 sentences of business context. What does this product do? Who does it serve? What must it stay aligned with?]

Do not invent decisions that the repository does not support. When strategy is ambiguous, flag it rather than guessing.

## Canonical Repo Structure
Treat this structure as the source of truth for where information belongs:

- `docs/strategy/` = business context, goals, audience definitions, and strategic reference documents
- `docs/workflow/` = Claude Code operating instructions and team workflow documents
- `plans/` = active task plans, execution plans, and planning templates

Canonical files:
- `docs/strategy/[project-context].md` = primary business and product context document
- `docs/workflow/claude-code-workflow.md` = Claude Code workflow and operating process
- `plans/PLAN_TEMPLATE.md` = template for new task plans

File placement rules:
- New strategy or reference docs go in `docs/strategy/`
- New workflow or process docs go in `docs/workflow/`
- New task-specific or execution plans go in `plans/`
- Do not create duplicate versions of the same doc in multiple folders unless explicitly requested

## Working Mode
- Start in the repo root
- Read relevant files before proposing edits
- Use Plan Mode first for any non-trivial task
- For multi-step work, create or update a markdown plan file in `plans/` before making broad edits
- Keep plans concrete: scope, files to review, files to change, risks, validation, and rollback
- Approve and execute changes in small slices
- Validate after each slice using the narrowest useful checks first

## Repo Interpretation Rules
- Treat files in `docs/strategy/` as reference material and source of truth, not task checklists
- Treat files in `plans/` as active execution artifacts
- When strategy and implementation conflict, flag the conflict instead of guessing
- When requirements are missing, identify assumptions explicitly before editing
- Do not overwrite strategic ambiguity with invented certainty

## Content Rules for This Repo
[Customize these for your project. Examples below — keep what applies, rewrite the rest.]

- Use direct, plain language tied to real features, outcomes, and audiences
- Do not fabricate metrics, testimonials, results, or capabilities
- Keep calls to action explicit and audience-specific
- [Add project-specific content rules here]

## Editing Guardrails
- Do not rewrite unrelated files
- Do not reformat the entire repo unless explicitly asked
- Do not introduce new dependencies without a clear reason in the plan
- Do not merge multiple large concerns into one unreviewable edit
- Do not move canonical docs without updating any references that depend on them
- Keep strategy work, content work, and implementation work logically separated

## Planning Standard
Every non-trivial plan in `plans/` should include:
- Objective
- Current State
- Assumptions
- Constraints
- Files to Review
- Files to Change
- Slice Plan
- Validation
- Risks
- Rollback
- Open Questions

## Preferred Execution Pattern
1. Inspect repo root and relevant canonical docs
2. Summarize the current state
3. Create or update a plan in `plans/`
4. Get approval on the plan or first slice
5. Execute one slice
6. Validate
7. Report what changed, what remains, and any new risks

## Default Response Shape
When working in this repo, respond in this order when practical:
1. What you found
2. What you plan to change
3. What files are affected
4. What checks you will run
5. What changed after the slice

## Definition of Done
A task is not done until:
- the approved slice is complete
- relevant checks pass or failures are clearly explained
- changed files are listed
- obvious regressions are considered
- the user can review the work in a bounded, understandable scope
```

---

## docs/strategy/[project-context].md Template

This is the business truth document. Claude reads it before making any recommendations.

```markdown
# [Project Name] — Project Context

## Overview
[2–4 sentences describing what this project is, why it exists, and what problem it solves.]

## Mission / Purpose
[One sentence: what this project is trying to accomplish in the world.]

## Goals and Objectives
- **Goal 1:** [Label] — [Objective: what success looks like]
- **Goal 2:** [Label] — [Objective]
- **Goal 3:** [Label] — [Objective]

## Target Audiences
[Who uses or benefits from this? List each distinct audience with a one-line description.]

- **Audience 1:** [Who they are and what they need from this project]
- **Audience 2:** [Who they are and what they need]
- **Audience 3:** [Who they are and what they need]

## Primary Offering / Core Features
[What does this product or service actually deliver? Be specific. This is the section Claude should reference when writing copy, building features, or making recommendations.]

- [Feature or offering 1]
- [Feature or offering 2]
- [Feature or offering 3]

## Key Constraints
[What does Claude need to know to avoid making bad decisions? Examples: budget, timeline, tech stack, legal, brand rules.]

- [Constraint 1]
- [Constraint 2]

## What to Avoid
[Optional but useful: things Claude should not do, say, or assume about this project.]
```

---

## docs/workflow/claude-code-workflow.md Template

```markdown
# Claude Code Workflow Instructions

## Required Files
- `CLAUDE.md`
- `.claude/settings.json`
- `plans/PLAN_TEMPLATE.md`

## Repo Start Procedure
Always begin in the repo root.

1. Confirm the working directory.
2. Inspect the top-level structure.
3. Review `CLAUDE.md` before proposing any edits.
4. Start in Plan Mode.

## Plan-First Rule
Before making changes:
1. Inspect the repo.
2. Create a plan file in `plans/`.
3. List affected files.
4. Break work into approval slices.
5. Get approval for the first slice.

Plan filename pattern: `plans/YYYY-MM-DD-task-name.md`

## Slice Approval Standard
Approve work in narrow slices such as:
- one page only
- one feature only
- one content section only
- one form flow only

Each slice should include:
- changed files
- reason for the change
- validation performed
- known follow-up work

## Good Workflow Pattern
inspect → plan → approve slice 1 → edit → validate → summarize → approve next slice

## Bad Workflow Pattern
- Jump straight into editing
- Touch many files without a written plan
- Combine strategy, design, and implementation in one approval step
- Invent claims not supported by the project's source documents

## First Session Sequence
1. Open repo root.
2. Read `CLAUDE.md`.
3. Confirm Plan Mode.
4. Inspect structure.
5. Create a plan file.
6. Present slice 1.
7. After approval, make only slice 1 edits.
8. Validate and report.
```

---

## plans/PLAN_TEMPLATE.md Template

```markdown
# Plan: [task name]

## Objective
State the exact request in one or two sentences.

## Current State
What exists now in the repo that is relevant to this task?

## Assumptions
- Assumption 1
- Assumption 2

## Constraints
- Start from repo root
- Use small approval slices
- Avoid unrelated edits

## Files to Review
- path/to/file
- path/to/file

## Files to Change
- path/to/file
- path/to/file

## Slice 1
**Goal**

**Planned edits**
- edit A
- edit B

**Validation**
- command or check

## Slice 2
**Goal**

**Planned edits**
- edit A
- edit B

**Validation**
- command or check

## Slice 3
**Goal**

**Planned edits**
- edit A
- edit B

**Validation**
- command or check

## Risks
- risk 1
- risk 2

## Rollback
How to reverse the change if the slice fails review or validation.

## Open Questions
- question 1
- question 2
```

---

## CHANGELOG.md Template

```markdown
# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project uses [Semantic Versioning](version_number_system.md).

---

## [Unreleased]

---

## [1.0.0] — YYYY-MM-DD

### Added
- [Feature or section 1]
- [Feature or section 2]

### Changed
- [What changed and why]

### Fixed
- [Bug or issue resolved]

### Project Infrastructure
- `CLAUDE.md` — Claude Code operating guide
- `.claude/settings.json` — harness settings
- `docs/strategy/[project-context].md` — business context
- `docs/workflow/claude-code-workflow.md` — workflow rules
- `plans/PLAN_TEMPLATE.md` — reusable plan template
- `plans/open-decisions.md` — decisions pending owner input
- `CHANGELOG.md`

### Known Placeholders (not production-ready)
- [placeholder 1]
- [placeholder 2]
```

---

## .claude/settings.json Template

```json
{
  "planModeDefault": true,
  "denyList": [
    ".env",
    "*.env.*",
    "*.key",
    "*.pem",
    "package-lock.json",
    "yarn.lock"
  ],
  "plansDir": "plans"
}
```

---

## How to Open the First Session

Paste this into your first message in the new chat:

```
You are starting a new project called [Project Name].

The repo is at: [path to repo]

Before doing anything else:
1. Read CLAUDE.md
2. Read docs/strategy/[project-context].md
3. Confirm you are in Plan Mode
4. Summarize what you understand about the project from those files
5. Ask me what task we are starting with

Do not make any edits until I give you a task and approve a plan.
```

---

## Quick Reference: File Placement Rules

| Type of content | Where it goes |
|---|---|
| Business context, goals, audiences | `docs/strategy/` |
| Workflow and process rules | `docs/workflow/` |
| Active task plans | `plans/` (dated filenames) |
| Reusable planning templates | `plans/` |
| Blocker/decision tracker | `plans/open-decisions.md` |
| Claude's operating guide | `CLAUDE.md` (repo root) |
| Claude Code settings | `.claude/settings.json` |
| Changelog | `CHANGELOG.md` (repo root) |

---

*Template derived from the K to Career website project. Adapt the content rules and strategy sections for each new project.*
