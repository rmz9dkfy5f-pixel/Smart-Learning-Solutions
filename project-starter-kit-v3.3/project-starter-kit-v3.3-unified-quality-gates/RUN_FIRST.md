# RUN FIRST

Read `START_HERE.md` before using this starter kit.

---

## What This Kit Is

This is a reusable project-control and AI-context-control system.

It helps you:

- define the project before building
- prevent scope creep
- force approval before code changes
- plan vertical slices
- run phase gates
- track GitHub progress
- keep Claude Code and Codex aligned
- create clean AI session files
- checkpoint messy or long AI chats
- promote repeated lessons into reusable prompts and patterns

---

## What This Kit Is Not

This is not meant to be copied wholesale into every application repo.

For normal projects, copy or generate from:

```text
templates/project-root/
```

Then fill out only what is needed.

---

## First Action

Before coding, create the actual project root and fill out:

```text
START_HERE.md
PROJECT_BRIEF.md
CONTEXT.md
STATUS.md
PLAN.md
BACKLOG.md
CLAUDE.md
AGENTS.md
ai/README.md
```

Do not write implementation code until Phase 1 is approved.

---

## Approval Rule

Claude Code, Codex, or any agent must not change project files until it has:

1. inspected current state
2. identified intended files
3. proposed the smallest safe change
4. listed risks
5. shown the validation/check plan
6. received approval

Exception: read-only inspection, file listing, and status checks are allowed.

---

## Required Execution Loop

Every implementation slice must follow:

```text
check → fix → verify → commit → push
```

The check step must always come first.

---

## AI Context Rule

When a chat becomes long, confused, or mixed across topics, stop and create:

```text
ai/checkpoints/YYYY-MM-DD_checkpoint_name.md
```

Then start a new chat from the checkpoint.

---

## Do Not Skip

For GitHub-backed projects, keep these unconditionally:

```text
COMMIT_NOTES.md
PROGRESS_NOTE.md
PROGRESS_NOTES.md
STATUS.md
CONTEXT.md
CHANGELOG.md
RELEASE_NOTES.md
ROADMAP.md
```

For tiny local-only experiments, keep at minimum:

```text
STATUS.md
PLAN.md
COMMIT_NOTES.md
PROGRESS_NOTE.md
ai/checkpoints/
```
