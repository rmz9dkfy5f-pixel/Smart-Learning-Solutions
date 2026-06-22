# Rollback Plan

## Purpose

Every meaningful change should have a path back to a known-good state.

## Standard Rollback Options

### Git Rollback

Use when changes are tracked in Git:

```bash
git status
git diff
```

Do not run destructive Git commands unless explicitly approved.

### File-Level Rollback

Use when a single file changed:

- identify changed file
- compare before/after
- restore from Git, backup, or `.v34_migration_review/`

### Migration Rollback

V3.4 migration should be non-destructive. Rollback means removing newly added V3.4 files and leaving original project files untouched.

## Required Before High-Risk Work

Before Class C or D changes:

- Confirm current Git status.
- Identify restore point.
- List files at risk.
- Explain rollback command or manual rollback method.
