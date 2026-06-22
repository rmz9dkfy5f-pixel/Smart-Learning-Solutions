# Change Control

## Change Classes

### Class A — Documentation Only

Low risk. Still requires review for accuracy.

### Class B — Localized Code Change

Medium risk. Requires validation.

### Class C — Architecture / Dependency Change

High risk. Requires explicit plan, rollback path, and user approval before broad edits.

### Class D — Destructive / Irreversible Change

Requires explicit user approval. Examples:

- deleting files
- rewriting history
- database migrations
- credential changes
- production config changes
- broad refactors

## Required Change Record

For every substantial change, record:

- Date
- Agent/tool used
- Objective
- Files changed
- Validation performed
- Risks
- Rollback method

## No-Overwrite Policy

Existing files are user assets. If a template conflicts with an existing file, preserve the original and place the candidate file in `.v34_migration_review/`.
