# Project Classification

Determine this before any other kickoff decision. It governs which sections of
`REPOSITORY_HANDOFF_CONFIG.md` apply and how the Model Selection Gate and Agent Run Contract get
used for this project.

## Categories

The labels below are the human-readable form of this project's classification. The
canonical machine-readable value lives in `.starter-kit/manifest.json`
(`project_classification`, e.g. `git_backed_with_deployment`); validation normalizes
case, spacing, and hyphens on both sides before comparing them, so writing the prose
label verbatim (e.g. "Git-backed with deployment") is equivalent to writing the raw
token.

- **Vault-only** — lives inside a knowledge base or note vault with no Git history of its own
  (snapshot/sync governed instead of commit governed).
- **Local non-Git** — a local folder or working copy with no version control at all.
- **Git-backed** — has Git history, no configured remote.
- **Git-backed with remote** — has Git history and pushes to a remote (GitHub, GitLab, etc.), but
  nothing is deployed from it.
- **Git-backed with deployment** — has Git history, a remote, and a real deployment target (VPS,
  hosting platform, app store, package registry, etc.).

## This Project

- **Classification:** git_backed_with_deployment
- **Confirmed by:** `starter_kit.py inspect` deterministic repository inspection
- **Confirmed on:** See `.starter-kit/manifest.json` `installed_at`
- **Evidence:** See `.starter-kit/project-profile.json` facts and `.starter-kit/manifest.json`
  `project_classification`.

Never infer a classification from assumption or convenience. If unconfirmed, leave every field
above as unknown in `.starter-kit/project-profile.json` rather than guessing.

## What Each Classification Implies

| Classification | `REPOSITORY_HANDOFF_CONFIG.md` sections that apply |
|---|---|
| Vault-only | None — use the vault's own snapshot/session-lifecycle SOPs instead, if any exist. |
| Local non-Git | Repository Identity (partial), Validation Contract only. |
| Git-backed | Repository Identity, Validation Contract, Snapshot Contract. |
| Git-backed with remote | Adds Safety Boundaries (push/tag authorization rules). |
| Git-backed with deployment | Adds the full Deployment Contract. |

Re-check this classification if the project's Git/remote/deployment status changes materially
(e.g. a local prototype gets its first remote, or a repo gets its first real deployment target) —
do not leave a stale classification in place.
