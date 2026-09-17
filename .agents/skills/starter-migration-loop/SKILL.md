---
name: starter-migration-loop
description: Plan, apply, validate, evidence, and roll back a non-destructive Starter Kit migration.
---

# Starter Migration Loop

1. Run the read-only adoption audit.
2. Stop for a dirty tree, detached state, unresolved `.v34_migration_review/`, or ambiguous scope.
3. Map existing authority as canonical, generated, compatibility, project-owned, deprecated, or
   conflict.
4. Review `plan-migration` and every proposed conflict.
5. Apply only with `--apply` and the matching plan ID.
6. Run semantic validation, quality, evidence, closeout, and cold session-start rehearsal.
7. Use the recorded transaction run ID for rollback if any gate fails.

Never overwrite, rename, delete, or silently reinterpret user-authored content.

