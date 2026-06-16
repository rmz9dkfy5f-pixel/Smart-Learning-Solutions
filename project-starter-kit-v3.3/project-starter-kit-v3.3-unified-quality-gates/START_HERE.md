# Start Here — Unified Project Starter Kit v3.1

This project system merges three useful layers:

1. **Project control** from Project Starter Kit v2: phase gates, vertical slices, approval before changes, tracking, and GitHub discipline.
2. **AI engineering memory** from the new workflow: one problem per chat, clean extracted files, checkpoints, reusable prompts, reusable patterns, and context resets.
3. **Service/API design discipline** from the added documents: explicit API surface, data model, security design, failure scenarios, scaling strategy, and observability before implementation.

The result is a controlled AI-assisted engineering workflow.

```text
AI chat = temporary reasoning
Project files = permanent source of truth
/ai files = reusable AI engineering memory
Service design files = pre-implementation architecture control
Commits = proof of work
```

---

## The Hard Rule

Do not let important work live only in chat.

Every meaningful AI-assisted work session must produce one durable output:

| Work Type | Durable Output |
|---|---|
| Project idea | `PROJECT_BRIEF.md` |
| Current state | `STATUS.md` |
| Active plan | `PLAN.md` or `plans/YYYY-MM-DD_slice_name.md` |
| Architecture decision | `docs/ARCHITECTURE.md` and `DECISION_LOG.md` |
| Service/API design | `ai/sessions/designs/YYYY-MM-DD_service_name_api_design.md` using `api_design_template.md` |
| Generic design session | `ai/sessions/designs/YYYY-MM-DD_design_name.md` using `design_template.md` |
| Feature build | `ai/sessions/features/YYYY-MM-DD_feature_name.md` |
| Bug investigation | `ai/sessions/debug/YYYY-MM-DD_issue_name.md` |
| Messy or long chat | `ai/checkpoints/YYYY-MM-DD_checkpoint_name.md` |
| Reusable lesson | `ai/patterns/pattern_name.md` |
| Reusable instruction | `ai/prompts/prompt_name.md` |
| Completed slice | `SLICE_REVIEWS.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md` |

---

## What Belongs Where

### Root project files

Root files are the operational source of truth.

Use them to answer:

- What is this project?
- What phase are we in?
- What is the next action?
- What is approved?
- What changed?
- What is ready to commit?

Core root files:

```text
README.md
PROJECT_BRIEF.md
CONTEXT.md
STATUS.md
PLAN.md
PHASE_GATES.md
BACKLOG.md
ROADMAP.md
DECISION_LOG.md
SLICE_REVIEWS.md
LESSONS_LEARNED.md
CHANGELOG.md
RELEASE_NOTES.md
COMMIT_NOTES.md
PROGRESS_NOTE.md
PROGRESS_NOTES.md
CLAUDE.md
AGENTS.md
```

### `docs/`

`docs/` contains stable technical documentation.

Use it for approved architecture, security, testing, API, data model, performance, workflow, and versioning.

Do not dump raw AI session notes into `docs/`. Promote only clean, approved conclusions.

### `plans/`

`plans/` contains approved or proposed slice plans.

Use `PLAN.md` for the active plan. Use dated files in `plans/` for larger or historical task plans.

### `ai/`

`ai/` contains AI working memory and reusable AI system files.

This is not a replacement for project docs. It is the bridge between temporary AI conversations and permanent project knowledge.

---

## Unified Project Structure

```text
project-root/
├── START_HERE.md
├── README.md
├── PROJECT_BRIEF.md
├── CONTEXT.md
├── STATUS.md
├── PLAN.md
├── PHASE_GATES.md
├── BACKLOG.md
├── ROADMAP.md
├── DECISION_LOG.md
├── SLICE_REVIEWS.md
├── LESSONS_LEARNED.md
├── CHANGELOG.md
├── RELEASE_NOTES.md
├── COMMIT_NOTES.md
├── PROGRESS_NOTE.md
├── PROGRESS_NOTES.md
├── CLAUDE.md
├── AGENTS.md
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   ├── TESTING.md
│   ├── API.md
│   ├── DATA_MODEL.md
│   ├── STATE_MODEL.md
│   ├── PERFORMANCE.md
│   ├── VERSIONING.md
│   └── WORKFLOW.md
│
├── plans/
│   ├── PLAN_TEMPLATE.md
│   ├── FIRST_SLICE_TEMPLATE.md
│   └── PHASE_REVIEW_TEMPLATE.md
│
└── ai/
    ├── README.md
    ├── ai.config.json
    ├── templates/
    │   ├── design_template.md
    │   ├── api_design_template.md
    │   ├── feature_template.md
    │   ├── debug_template.md
    │   ├── checkpoint_template.md
    │   ├── ai_prompt_template.md
    │   └── pattern_template.md
    ├── sessions/
    │   ├── designs/
    │   ├── features/
    │   ├── debug/
    │   └── optimization/
    ├── checkpoints/
    ├── prompts/
    ├── patterns/
    └── reports/
```

---

## Template Selection Rule

Use the lightest template that still controls the risk.

| Situation | Use |
|---|---|
| Whole project setup | `PROJECT_BRIEF.md`, `CONTEXT.md`, `PLAN.md` |
| General architecture or subsystem design | `ai/templates/design_template.md` |
| API, auth, service boundary, data model, scaling, observability, or failure scenarios | `ai/templates/api_design_template.md` |
| Implementation of one approved feature | `ai/templates/feature_template.md` |
| One bug or failure | `ai/templates/debug_template.md` |
| Long/messy chat reset | `ai/templates/checkpoint_template.md` |
| Reusable AI instruction | `ai/templates/ai_prompt_template.md` |
| Repeated engineering solution | `ai/templates/pattern_template.md` |

---

## Default Workflow

### Phase 0 — Initialize the project

Use this phase only to create the control structure.

Do not build the application yet.

Create or confirm:

```text
PROJECT_BRIEF.md
CONTEXT.md
STATUS.md
PLAN.md
PHASE_GATES.md
BACKLOG.md
CLAUDE.md
AGENTS.md
ai/README.md
ai/templates/
```

Exit Phase 0 when the project has enough structure for Claude Code, Codex, or another agent to understand the rules.

---

### Phase 1 — Plan the smallest useful slice

Phase 1 decides what should happen.

Do not edit implementation files during Phase 1.

Phase 1 must answer:

1. What are we trying to prove?
2. What is the smallest useful vertical slice?
3. What is explicitly out of scope?
4. What files are expected to change?
5. What checks will run first?
6. How will success be verified?
7. What risks remain?
8. Is Phase 2 approved?

Use the API design template before implementation if the slice touches:

- auth
- API routes
- database models
- service boundaries
- rate limiting
- queues
- caching
- observability
- scaling
- production security behavior

Useful files:

```text
PROJECT_BRIEF.md
PLAN.md
PHASE_GATES.md
BACKLOG.md
DECISION_LOG.md
plans/FIRST_SLICE_TEMPLATE.md
ai/sessions/designs/YYYY-MM-DD_design_name.md
```

---

### Phase 2 — Implement only the approved slice

Phase 2 makes the approved change only.

Required loop:

```text
check → fix → verify → commit → push
```

Rules:

- Run the initial check first.
- Change only approved files.
- Do not add unrelated features.
- Do not refactor unrelated code.
- Do not fake verification.
- Update tracking files before commit.

Useful files:

```text
STATUS.md
PROGRESS_NOTE.md
COMMIT_NOTES.md
SLICE_REVIEWS.md
CHANGELOG.md
ai/sessions/features/YYYY-MM-DD_feature_name.md
```

---

### Phase 3 — Review, checkpoint, and promote knowledge

After the slice is complete, extract the value.

Do three things:

1. Review the slice against success criteria.
2. Checkpoint the clean current state for future AI sessions.
3. Promote reusable lessons into patterns or prompts.

Useful files:

```text
SLICE_REVIEWS.md
LESSONS_LEARNED.md
ai/checkpoints/YYYY-MM-DD_checkpoint_name.md
ai/patterns/pattern_name.md
ai/prompts/prompt_name.md
```

---

## When to Start a New AI Chat

Start a new chat when:

- the conversation is long
- the model is mixing old and new goals
- debugging has drifted away from the original issue
- architecture, coding, and debugging are being mixed together
- you are about to start a new feature
- you need an independent review

Before starting the new chat, create a checkpoint:

```text
ai/checkpoints/YYYY-MM-DD_checkpoint_name.md
```

Then paste only the checkpoint and the current goal into the new chat.

---

## One Problem Per File Rule

Use this rule to prevent documentation sprawl and context drift:

```text
One architecture = one design doc
One API/service boundary = one API design doc
One feature = one feature session file
One bug = one debug doc
One messy chat = one checkpoint
One repeated solution = one pattern
One reusable instruction = one prompt
```

Do not mix architecture, debugging, implementation, and optimization in the same AI session file.

---

## Approval Rule

Before any agent changes files, it must show:

1. current phase
2. current goal
3. exact files it wants to change
4. reason each file must change
5. smallest safe change
6. risks
7. check command before changes
8. verification after changes
9. rollback plan
10. approval request

Allowed before approval:

- list files
- inspect repo
- read docs
- run safe read-only checks
- propose a plan

Not allowed before approval:

- edit files
- delete files
- add dependencies
- refactor
- generate large unapproved docs
- commit
- push

---

## Claude Code and Codex Roles

Use one implementer and one reviewer.

| Tool | Best Role |
|---|---|
| Claude Code | Repo inspection, file edits, implementation, documentation updates, local workflow |
| Codex | Independent review, bug reasoning, alternative plans, test suggestions, PR-style critique |

Do not let both tools edit the same files at the same time.

Before switching tools, update:

```text
STATUS.md
PROGRESS_NOTE.md
COMMIT_NOTES.md
```

If the active chat is messy, create a checkpoint first.

---

## Minimum Viable Version of This System

For a small project, start with only this:

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

Add the rest only when needed.

Do not let the control system become heavier than the project.

---

## First Prompt to Use

```md
We are starting a project using the unified starter kit v3.1.

We are in Phase 1 only.

Do not write implementation code.
Do not edit files unless I explicitly approve scaffolding.

First, inspect the current project if it exists.

Then produce:

1. project goal
2. core user/operator action
3. validation question
4. smallest useful vertical slice
5. whether this requires generic design or API/service design
6. success criteria
7. out-of-scope items
8. risks and assumptions
9. expected files to change
10. first check command
11. whether an AI session file is needed under /ai/sessions
12. whether a checkpoint already exists or must be created
13. approval request before Phase 2

Stop after Phase 1 planning.
```

---

## Final Mental Model

```text
Project control files tell the agent what is true.
AI session files preserve what the agent figured out.
API design files control risky service boundaries before code exists.
Checkpoints reset the agent without losing the plot.
Patterns and prompts turn repeated work into reusable leverage.
Commits prove the work actually changed.
```

The system is working when you can leave a project for weeks, come back, open `STATUS.md` and the latest checkpoint, and restart without re-explaining everything.


## v3.3 Quality Gate Rule

Before significant implementation or migration work, read:

- `DONE_CRITERIA.md`
- `CHANGE_CONTROL.md`
- `REPO_HEALTH_CHECK.md`
- `ROLLBACK_PLAN.md`
- `PROJECT_RISK_REGISTER.md`
- `ai/agents/AGENT_REVIEW_GATES.md`

The project is not done because files changed. It is done when the done criteria, verification, status update, and rollback awareness are satisfied.
