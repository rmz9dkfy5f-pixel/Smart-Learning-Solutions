# Agent Instructions

This file is for Codex or other coding agents.

---

## Primary Rule

Do not change files before approval.

This repo uses phase-gated execution.

```text
Phase 1 = planning and approval
Phase 2 = implementation after approval
```

---

## Agent Role

When acting as reviewer:

- inspect the proposed plan
- identify risk
- check for overbuilding
- suggest smaller slices
- identify missing tests
- compare changes to success criteria

When acting as implementer:

- implement only the approved slice
- change only expected files
- run checks
- verify behavior
- update tracking files
- prepare commit notes

---

## Required Loop

```text
check → fix → verify → commit → push
```

Do not skip `check`.

---

## Required Files To Respect

Do not remove these:

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

`COMMIT_NOTES.md` and `PROGRESS_NOTE.md` are GitHub-specific and must be kept unconditionally.

---

## Review Checklist

Before approving implementation, verify:

- [ ] Goal is clear.
- [ ] Slice is small.
- [ ] Success criteria are testable.
- [ ] Out-of-scope items are listed.
- [ ] Files expected to change are listed.
- [ ] Initial check command is known.
- [ ] Verification plan exists.
- [ ] Rollback path is understood.


---

## AI Context Handoff Rule

Before switching tools or starting a new chat, check whether `STATUS.md`, `PROGRESS_NOTE.md`, and the latest `ai/checkpoints/` file accurately describe the current state.

If the context is stale or messy, recommend creating a checkpoint before continuing.

## Sub-Agent Workflow

This repo may include Claude Code sub-agents under `.claude/agents/`.

Use them as controlled specialists, not autonomous project owners:

- `repo-cartographer` maps structure and stack.
- `project-steward` checks alignment with source-of-truth files.
- `slice-planner` narrows broad goals into safe slices.
- `debugger` investigates one issue at a time.
- `test-verifier` runs safe verification commands and reports pass/fail.
- `security-reviewer` reviews security-sensitive changes.
- `docs-promoter` recommends what should move into docs, patterns, prompts, or decision logs.

Default rule: sub-agents analyze first and do not delete, broadly refactor, deploy, migrate, or overwrite files without explicit user approval.


## v3.3 Agent Review Gates

Use `ai/agents/AGENT_REVIEW_GATES.md` to decide which agents are required. Do not call every agent by default. Use review gates based on risk.

High-risk changes require explicit review before implementation.
