---
name: v34-migration-loop
description: Use when migrating an existing repository into Project Starter Kit V3.4 without overwriting existing files or losing project history.
---

# V3.4 Migration Loop

## Goal

Install V3.4 into an existing repository while preserving existing files and history.

## Migration Rules

- Existing files are user-owned assets.
- Do not overwrite existing files.
- Do not delete existing files.
- Do not restructure the project unless explicitly requested.
- Put conflicting V3.4 candidate files in `.v34_migration_review/`.
- Produce a migration report before claiming completion.

## Steps

### 1. Inspect Existing Repo

Check:

- Git status
- Existing `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.agents/`
- Existing docs
- Existing prompts
- Existing scripts
- Build/test commands
- Project type and stack

### 2. Install Missing V3.4 Structure

Install missing files only.

If a V3.4 file conflicts with an existing file:

- Keep the existing file unchanged.
- Copy the V3.4 candidate to `.v34_migration_review/<relative-path>.v34-candidate.md`.
- Log the conflict.

### 3. Merge Instructions Safely

For `AGENTS.md` and `CLAUDE.md` conflicts:

- Do not replace existing instructions.
- Recommend a minimal merge.
- Prefer adding a small V3.4 section rather than rewriting the whole file.

### 4. Validate

Run `scripts/v34_validate.py` if available.

Also run project-specific validation if discovered.

### 5. Report

Return:

```md
# V3.4 Migration Result

## Status
PASS / PARTIAL / BLOCKED / FAIL

## Existing Files Preserved
[List]

## V3.4 Files Installed
[List]

## Conflicts Created
[List]

## Validation
[Results]

## Recommended Merge Actions
[List]

## Next Action
[What should happen next]
```
