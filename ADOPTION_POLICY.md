# Adoption Policy — Bringing an Existing Repository Onto v3.10.0

Rules for migrating an already-mature repository onto v3.10.0 without disrupting it. These apply in
addition to the general safety rules in `AGENTS.md`.

## Before Installing Anything

Run `python3 scripts/starter_kit.py --target <this repo> adopt-audit` first. It is strictly read-only — it
never writes into this repository. Read its full report, especially:

- Any `BLOCKED` status (dirty working tree, non-default branch, unresolved
  `.v34_migration_review/` conflicts) — resolve these first, on their own, before touching v3.10.0.
- The Legacy Continuity File Role Mapping table — every pre-existing file with a mapped v3.10.0
  equivalent represents a decision, not an automatic replacement.

## Rule 1 — Never Silently Replace a Legacy File

If this repository already has its own `STATUS.md`, `CONTEXT.md`, `DECISION_LOG.md`, or similar
file that a v3.10.0 template would also create, do not overwrite, rename, or delete it. A file proven
checksum-identical to the frozen V3.4.3 template may be upgraded only through the reviewed,
journaled migration plan. Otherwise, record it as
an alias of its nearest v3.10.0 equivalent and decide, explicitly, whether to merge, keep both, or
retire the older one — never as a side effect of running the installer.

## Rule 2 — Add Missing Contracts Only After Project-Specific Approval

The adoption audit finding "no structural blockers" is informational, not authorization. Installing
any missing v3.10.0 file (including `docs/governance/PROJECT_CLASSIFICATION.md`,
`AGENT_RUN_CONTRACT.md`, `REPOSITORY_HANDOFF_CONFIG.md`, `FIRST_SESSION_REHEARSAL.md`) into this
specific repository requires its own explicit approval — the audit alone never grants it.

## Rule 3 — One Repository at a Time

Each adoption pass targets exactly one repository. Do not batch multiple repositories into a
single migration run, even if several were audited around the same time.

## Rule 4 — Preserve Compatibility Aliases

Before removing or renaming any legacy filename the audit flagged, confirm nothing else — another
script, a CI job, a deployment step, a habit documented elsewhere — depends on that exact name.
When in doubt, keep the legacy file in place and add the v3.10.0 file alongside it rather than
replacing it.

## Rule 5 — The Gate

A migration into this repository is only complete when it has preserved: full Git history, all
user changes, this repository's own existing conventions, and its existing deployment behavior.
If any of those would be put at risk, stop and ask before continuing.
