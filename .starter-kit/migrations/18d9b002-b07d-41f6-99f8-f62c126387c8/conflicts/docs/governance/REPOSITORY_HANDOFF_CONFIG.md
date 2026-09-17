# Repository Handoff Configuration

Project-local handoff/closeout configuration. Fill in only real, confirmed values — never
placeholder paths or commands presented as facts. For any section that does not apply given this
repository's `PROJECT_CLASSIFICATION.md` entry, write `N/A — <reason>` instead of deleting the
section or inventing a value.

Store operational coordinates here, never credentials. If this repository already has equivalent
configuration in `AGENTS.md`, deployment docs, or another canonical file, reference it rather than
duplicate it.

## Repository Identity

- Project name: TBD
- Repository root: TBD
- Canonical remote: TBD
- Default branch: TBD
- Canonical handoff file: TBD

## Validation Contract

Discover these from the real toolchain (`package.json`, `pyproject.toml`, `Makefile`, CI config,
etc.) — do not invent commands that were not actually found.

- Install command: TBD
- Focused test commands: TBD
- Full test command: TBD
- Lint/type-check commands: TBD
- Production build command: TBD
- Runtime smoke test: TBD
- Manual or device checks: TBD

## Snapshot Contract

Applies to Git-backed classifications (see `PROJECT_CLASSIFICATION.md`). Write `N/A — not
Git-backed` if this repository is Vault-only or Local non-Git.

- Snapshot required: yes/no/conditional
- Naming rule: TBD
- Exclusions: TBD
- Verification method: TBD
- Checksum requirement: TBD
- Retention policy: TBD
- Restore/rollback procedure: TBD

### Snapshot Destination by Machine

Only relevant if snapshots are machine-path-dependent (e.g. an external backup drive). Detect the
current machine before resolving a destination:

```bash
scutil --get ComputerName 2>/dev/null || hostname
```

| Machine | Detection | Snapshot destination | Notes |
|---|---|---|---|
| <machine 1> | <detection command/value> | <exact path> | |
| <machine 2> | <detection command/value> | <exact path> | |

If the current machine does not match any row above, or more than one row could plausibly match,
stop and ask before picking a destination — do not guess or infer a path pattern.

## Deployment Contract

Applies only to the "Git-backed with deployment" classification. Write `N/A — no deployment
target` otherwise.

- Deployment in scope: yes/no/conditional
- VPS/server alias: TBD
- Deployment root: TBD
- Deployment branch or artifact: TBD
- Service/container names: TBD
- Read-only health checks: TBD
- Log locations: TBD
- Rollback target: TBD
- Actions requiring approval: TBD

## Safety Boundaries

- Protected paths: TBD
- Secret-bearing files: TBD
- Prohibited actions: TBD
- Commit/push authorization rule: TBD
- Tag/release authorization rule: TBD
- Deploy/merge authorization rule: TBD
