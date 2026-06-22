# V3.4 Migration Agent Prompt

Use this when migrating an existing project.

```text
Use the V3.4 migration loop.

Objective:
Migrate this existing repository into Project Starter Kit V3.4 without overwriting or deleting existing files.

Rules:
- Treat all existing files as user-owned assets.
- Install missing V3.4 files only.
- If a target file exists, preserve it and place the V3.4 candidate in .v34_migration_review/.
- Do not restructure the app unless explicitly requested.
- Do not modify build/deployment logic unless explicitly requested.
- Run validation after installation.
- Produce a migration report with conflicts and recommended merges.

Final response format:
## Status
## Existing Files Preserved
## V3.4 Files Installed
## Conflicts Created
## Validation
## Recommended Merge Actions
```
