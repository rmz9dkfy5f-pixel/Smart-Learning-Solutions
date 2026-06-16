# How To Use This Starter With Claude Code and Codex

Use this file to keep Claude Code and Codex from stepping on each other.

---

## Recommended Roles

### Claude Code

Use Claude Code for:

- repository inspection
- file edits
- multi-file implementation
- documentation updates
- refactors after approval
- local workflow guidance
- phase/slice execution

### Codex

Use Codex for:

- independent review
- implementation alternatives
- code reasoning
- bug analysis
- test suggestions
- PR-style review
- validating Claude's plan

---

## Operating Rule

Do not let both tools change the same files at the same time.

One tool implements.

The other reviews.

---

## Suggested Workflow

```text
1. Claude Code performs Phase 1 planning.
2. User reviews and approves.
3. Claude Code implements Phase 2.
4. Codex reviews the changes.
5. Claude Code fixes approved issues.
6. User approves final state.
7. Commit and push.
```

---

## Approval Required Before Changes

Both tools must obey this rule:

```text
No file changes before the planned change is reviewed and approved.
```

Allowed before approval:

- read files
- list project structure
- inspect git status
- identify likely files
- propose plan
- propose checks

Not allowed before approval:

- editing files
- adding dependencies
- generating large docs
- refactoring
- deleting files
- changing configuration
- committing
- pushing

---

## Avoiding Tool Conflict

Before switching tools, update:

```text
STATUS.md
PROGRESS_NOTE.md
COMMIT_NOTES.md
```

This gives the next tool current context.
