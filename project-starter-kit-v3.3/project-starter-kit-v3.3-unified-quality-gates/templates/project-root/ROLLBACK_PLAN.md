# Rollback Plan

Use this file to preserve an escape path for migrations, risky changes, dependency updates, refactors, and deployment work.

## Current Change

| Field | Value |
|---|---|
| Date | TBD |
| Branch | TBD |
| Current commit before change | TBD |
| Change type | TBD |
| Risk level | TBD |
| Person/agent making change | TBD |

## Pre-Change State

```bash
# Record before changing files
git status --short
git branch --show-current
git rev-parse --short HEAD
```

## Files Added

- TBD

## Files Modified

- TBD

## Files Moved

- TBD

## Files Quarantined

- TBD

## Files Not Touched Intentionally

- TBD

## Rollback Method

### Preferred Git Rollback

Use this only after confirming it will not discard unrelated work.

```bash
git status --short
git restore <file-path>
```

For a committed change:

```bash
git revert <commit-hash>
```

### Manual Rollback

1. Review `.starter-kit/install/INSTALL_LOG.md` if this was a starter-kit migration.
2. Remove files listed under “Files Added” if they are not needed.
3. Restore modified files from git or backup.
4. Move quarantined files back only after review.
5. Rerun verification.

## Verification After Rollback

| Check | Command/Method | Expected Result | Actual Result |
|---|---|---|---|
| Git status | `git status --short` | Clean or expected changes only | TBD |
| Build | TBD | Pass | TBD |
| Test | TBD | Pass | TBD |
| Manual smoke test | TBD | Pass | TBD |

## Irreversible or High-Risk Actions

List anything that cannot be safely undone.

- TBD

## Final Rollback Status

- [ ] Rollback not needed
- [ ] Rollback plan ready
- [ ] Rollback completed
- [ ] Rollback failed
- [ ] Needs human review
