# Claude Code Instructions

Claude Code must follow these rules when working in this repo.

---

## Operating Mode

Default to Phase 1 unless explicitly told Phase 2 is approved.

```text
Phase 1 = plan, inspect, propose, ask approval
Phase 2 = implement approved change only
```

---

## Approval Before Changes

Do not edit files until approval is given.

Allowed before approval:

- inspect files
- list structure
- read docs
- run safe read-only checks
- propose changes
- identify risks
- identify expected files

Not allowed before approval:

- editing files
- deleting files
- adding dependencies
- refactoring
- generating large new docs
- committing
- pushing

---

## Required Workflow

For implementation:

```text
check → fix → verify → commit → push
```

The check step comes first.

---

## Scope Rules

- Implement only the approved vertical slice.
- Do not add features outside the approved slice.
- Do not refactor unrelated code.
- Do not change unrelated files.
- Do not silently ignore errors.
- Do not fake success.
- If a command cannot run, say so and document manual verification.

---

## Required Tracking Files

Keep these files updated as relevant:

```text
STATUS.md
PLAN.md
PHASE_GATES.md
BACKLOG.md
SLICE_REVIEWS.md
PROGRESS_NOTE.md
PROGRESS_NOTES.md
COMMIT_NOTES.md
CHANGELOG.md
RELEASE_NOTES.md
LESSONS_LEARNED.md
```

`COMMIT_NOTES.md` and `PROGRESS_NOTE.md` must be kept unconditionally.

---

## Placeholder Rule

Use clearly marked placeholders only.

Good:

```text
<EXAMPLE_API_KEY>
<EXAMPLE_COMMIT_HASH>
<PROJECT_ROOT>
```

Bad:

```text
abc123
fake-token
todo
```


---

## AI Engineering Memory Rules

Do not let important reasoning live only in chat.

Use `ai/` files this way:

- Architecture or system-design work goes in `ai/sessions/designs/`.
- Feature implementation records go in `ai/sessions/features/`.
- Debugging records go in `ai/sessions/debug/`.
- Long or messy conversations must be summarized into `ai/checkpoints/` before continuing.
- Reusable lessons should be promoted into `ai/patterns/`.
- Reusable instructions should be promoted into `ai/prompts/`.

Never mix architecture, debugging, implementation, and optimization in the same AI session file unless explicitly approved.

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


## v3.3 Quality Gate Rules

Before risky edits, inspect `CHANGE_CONTROL.md`, `DONE_CRITERIA.md`, `ROLLBACK_PLAN.md`, and `ai/agents/AGENT_REVIEW_GATES.md`.

Do not overwrite existing files during starter-kit migration. Quarantine conflicts in `.starter-kit/review/conflicts/`.

Do not mark work complete unless verification is run or the missing verification is explicitly documented.
