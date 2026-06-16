# Project Name

## Summary

Describe the project in one paragraph.

Example:

> This project provides a small, controlled system for solving one specific problem. It is built using vertical slices, phase gates, and validation-first development.

---

## Current Status

See:

```text
STATUS.md
```

---

## Project Control Files

| File | Purpose |
|---|---|
| `PROJECT_BRIEF.md` | Project goal, scope, validation question |
| `CONTEXT.md` | Stable context and background |
| `STATUS.md` | Current progress and next action |
| `PLAN.md` | Active build plan |
| `PHASE_GATES.md` | Approval checkpoints |
| `BACKLOG.md` | Work queue |
| `ROADMAP.md` | Long-term direction |
| `DECISION_LOG.md` | Decisions and reasons |
| `SLICE_REVIEWS.md` | Completed slice reviews |
| `LESSONS_LEARNED.md` | Process lessons |
| `CHANGELOG.md` | Changes by date/version |
| `RELEASE_NOTES.md` | Release summaries |
| `COMMIT_NOTES.md` | GitHub commit tracking |
| `PROGRESS_NOTE.md` | Current GitHub progress note |
| `PROGRESS_NOTES.md` | Historical GitHub progress notes |
| `CLAUDE.md` | Claude Code instructions |
| `AGENTS.md` | Codex/agent instructions |

---

## Required Workflow

```text
Phase 1: Plan and get approval.
Phase 2: Implement only approved work.
```

Every implementation slice follows:

```text
check → fix → verify → commit → push
```

---

## Setup

Add setup instructions here once the first usable slice exists.

---

## Usage

Add usage instructions here once the project has a working workflow.

---

## Current Limitation

This README starts as a planning document. It should become a user/operator guide as the project matures.
