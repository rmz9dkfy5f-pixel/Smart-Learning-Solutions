# Rollback Review Prompt

Use this before risky changes, after migrations, and after failed verification.

## Prompt

Review rollback safety for the current change.

Read these files first if they exist:

- `ROLLBACK_PLAN.md`
- `CHANGE_CONTROL.md`
- `.starter-kit/install/INSTALL_LOG.md`
- `git status --short`
- `git branch --show-current`
- `git rev-parse --short HEAD`

Then report:

1. Current branch
2. Current commit
3. Uncommitted changes
4. Files added
5. Files modified
6. Files moved or quarantined
7. Safe rollback command if appropriate
8. Manual rollback steps
9. Irreversible actions or risks
10. Whether rollback is ready

Do not run destructive rollback commands unless explicitly approved.
