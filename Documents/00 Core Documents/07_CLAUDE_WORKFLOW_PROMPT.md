Create `docs/workflow/claude-code-workflow.md`.

This document defines the repeatable workflow Claude Code must follow when working in this repo.

Do not duplicate all of `CLAUDE.md`.
This file should explain the operating process step by step.

# Required Output

# Claude Code Workflow

## 1. Purpose
Explain that this document defines the repeatable working process for Claude Code inside this repo.

## 2. Required Start Procedure
Every session must begin with:

1. Confirm repo root
2. Inspect top-level structure
3. Read `CLAUDE.md`
4. Read relevant source-of-truth docs
5. Check current git status if applicable
6. Summarize current state before proposing changes

## 3. Required Workflow Pattern
Use this workflow:

inspect → plan → approve → edit → validate → summarize

For git work, use:

check → fix → verify → commit → push

Explain what each step means.

## 4. Plan-First Rule
Before non-trivial edits:
- create or update a plan in `plans/`
- use `plans/PLAN_TEMPLATE.md`
- list files to review
- list files to change
- define slice boundaries
- define validation
- define rollback
- identify open questions

## 5. Slice Approval Standard
Work must be broken into narrow slices.

Good slices:
- one page
- one component
- one content section
- one bug fix
- one documentation update
- one workflow improvement

Bad slices:
- redesign entire site
- refactor everything
- update all docs and code at once
- combine strategy, copy, design, and implementation
- touch unrelated files

## 6. Inspection Rules
Before editing, Claude must inspect:
- existing files
- existing conventions
- relevant docs
- package/build configuration when needed
- current implementation before replacing it

Claude must not assume the repo matches the plan. The repo state wins unless the user says otherwise.

## 7. Editing Rules
Claude must:
- make the smallest useful change
- preserve existing intent
- avoid unrelated formatting
- avoid duplicate docs
- avoid unnecessary dependencies
- avoid fake data unless clearly marked as placeholder
- update docs when structural decisions change

## 8. Validation Rules
After each meaningful slice, Claude must validate using the narrowest useful check.

Examples:
- lint
- typecheck
- test
- build
- preview
- manual file review
- link/path verification

If validation cannot run, Claude must explain why and provide the next best verification.

## 9. Rollback Rules
Every plan should define how to reverse the change.

Rollback options may include:
- revert edited file
- restore prior component
- remove added dependency
- undo route change
- restore previous copy
- revert commit if already committed

## 10. Open Decisions
Use `plans/open-decisions.md` for decisions that block or materially affect the project.

Each open decision should include:
- decision needed
- why it matters
- options
- recommended default
- owner
- status

## 11. When to Stop
Claude should stop and request direction when:
- requirements conflict
- a destructive change is needed
- source-of-truth docs disagree
- the requested task exceeds approved scope
- validation fails and the fix is not obvious
- continuing would require guessing a business or technical decision

## 12. Completion Report
At the end of each slice, report:

- files changed
- summary of changes
- validation performed
- issues found
- risks
- next recommended action

# Quality Bar

Keep this procedural.
Do not turn it into project strategy.
Do not duplicate every rule from `CLAUDE.md`.
Make it easy for Claude to follow during real work.