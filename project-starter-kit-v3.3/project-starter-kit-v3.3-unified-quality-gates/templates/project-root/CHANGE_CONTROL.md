# Change Control

This file defines what AI agents may change without approval, what requires approval, and what must never be changed automatically.

## Default Rule

The AI may inspect freely. The AI may only edit within the approved scope.

When uncertain, stop and ask.

## Safe-to-Edit Areas

These are usually safe when the change matches the approved task:

- `ai/`
- `docs/`
- `plans/`
- `tests/`
- documentation templates
- project status files
- feature files directly named in the approved slice

## Approval Required Before Editing

Ask before changing:

- `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`
- database schema, migrations, seed files, or stored data models
- authentication, authorization, sessions, cookies, password handling, or token logic
- deployment config
- Docker files
- CI/CD files
- DNS, hosting, nginx, reverse proxy, or server config
- environment variable examples
- routing files
- app entry points
- major component structure
- broad formatting across many files
- generated files
- dependency versions
- file/folder names used by imports or routing

## Never Do Without Explicit Approval

Do not do any of these automatically:

- delete source code
- delete assets
- delete user/client content
- delete backups
- delete existing documentation
- delete config files
- rewrite commit history
- run destructive shell commands
- reset the working tree
- overwrite environment files
- expose secrets
- install packages globally
- change production deployment targets
- migrate live data

## Conflict Handling

When the starter kit contains a file that already exists in the repo:

1. Do not overwrite it.
2. Copy the starter version to `.starter-kit/review/conflicts/`.
3. Record the conflict in `.starter-kit/install/INSTALL_LOG.md`.
4. Recommend a merge only after review.

## Risk Levels

Use these risk levels in summaries:

| Risk | Meaning | Action |
|---|---|---|
| Low | Documentation or isolated change | Continue if in scope |
| Medium | Could affect build, routing, workflow, or user behavior | Verify before commit |
| High | Auth, data, deployment, dependencies, major refactor | Ask before editing |
| Critical | Data loss, secrets, production exposure, destructive commands | Stop immediately |

## Approval Format

When approval is needed, ask using this format:

```text
Approval needed before continuing.

Reason:
Files affected:
Risk level:
Recommended action:
Rollback path:
```

## Stop Conditions

Stop immediately if:

- repo state is unclear
- git working tree has unexpected changes
- the requested action conflicts with `PLAN.md`
- source-of-truth files disagree
- a destructive action appears necessary
- tests fail in a way that may be caused by the current change
- secrets or private credentials are discovered
