# V3.5 Migration Agent Prompt

Use this when migrating an existing project.

```text
Use the V3.5 migration loop.

Objective:
Migrate this existing repository into Project Starter Kit V3.5 without overwriting or deleting existing files.

Rules:
- Treat unknown or modified existing files as user-owned assets.
- Upgrade only files proven checksum-identical to the frozen V3.4.3 templates.
- If a target file conflicts, preserve it and place the V3.5 candidate in the transaction's
  `.starter-kit/migrations/<run-id>/conflicts/` directory.
- Do not restructure the app unless explicitly requested.
- Do not modify build/deployment logic unless explicitly requested.
- Run validation after installation.
- Produce a migration report with conflicts and recommended merges.

Final response format:
## Status
## Existing Files Preserved
## V3.5 Files Installed
## Conflicts Created
## Validation
## Recommended Merge Actions
```
