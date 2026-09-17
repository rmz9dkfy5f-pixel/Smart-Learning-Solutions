**Updated:** 2026-09-16 (Project Starter Kit v3.10.0 installed, no version bump)

# Progress Note — Current Session

## Project Starter Kit v3.10.0 Installation (2026-09-16, no version bump)

### Summary

A `REPO_SESSION_START_RECOVERY_AUDIT.md` run this session found a stalled, never-reconciled
**V3.4** Starter Kit scaffold (installed 2026-06-21, `V34_INSTALL_REPORT.json`) sitting untouched
in this repo while the kit itself had since shipped **v3.10.0** — 3 quarantined
`.v34_migration_review/` candidates (`AGENTS.md.v34-candidate`, `CLAUDE.md.v34-candidate`,
`.DS_Store.v34-candidate`) were never dispositioned, and `docs/project/`/`docs/governance/`'s
V3.4-era stubs were still mostly `TBD` placeholders. Rather than reconcile V3.4 in place, ran a
real v3.10.0 migration via the new `project-starter-kit-invoke` skill (vault tooling built this
same session) against the pinned `v3.10.0` release clone.

### Work Completed

- Discarded the 3 unresolved v3.4 candidates (commit `ca44f3f`) — both markdown candidates
  carried generic V3.4 boilerplate with none of this repo's real business rules; root `AGENTS.md`
  and `CLAUDE.md` were left untouched and remain authoritative.
- Ran `inspect` (PASS — classified `git_backed_with_deployment`, `web_application` profile, high
  confidence), `plan-migration --profile web_application` (`PASS_WITH_WARNINGS`, 0 shadowed
  documents), then `migrate --apply` (`PASS_WITH_WARNINGS`, run `18d9b002-b07d-41f6-99f8-
  f62c126387c8`), then `validate` (**PASS**, 0 findings across all 6 layers) — committed as
  `470f81d`.
- 14 v3.4-owned templates upgraded to v3.10 content (`MODEL_SELECTION_GATE.md`,
  `PROMPT_MODEL_SELECTION_GATE.md`, `.agents/skills/v34-*`, `ai/agents/*`, `ai/prompts/*`, 3
  `docs/governance/*.md`, `docs/project/CHANGELOG.md`). 28 new files created (8 `starter-*` skill
  templates, `docs/governance/{AGENT_RUN_CONTRACT,FIRST_SESSION_REHEARSAL,
  PROJECT_CLASSIFICATION}.md`, `ADOPTION_POLICY.md`, 16 `.starter-kit/*.json` state files).
- 9 pre-existing files **preserved, not overwritten**: `AGENTS.md`, `ai/prompts/TASK_INTAKE.md`,
  5 `docs/governance/*.md` (including the real, filled-in `REPOSITORY_HANDOFF_CONFIG.md`),
  `00_MIGRATION_KICKOFF.md`, `MIGRATION_REPORT.md` — v3.10 candidate versions journaled to
  `.starter-kit/migrations/18d9b002-.../conflicts/` for future review, matching the migration's
  own "no existing content silently overwritten" guarantee.

### Validation Performed

- Every kit report's claim was independently checked against real repo state, not trusted as
  written: `git diff --stat` on `AGENTS.md` and `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`
  confirmed empty (genuinely untouched) before and after apply; `git status --porcelain=v1` file
  count matched the plan's 66 operations exactly.
- Post-apply `validate` returned PASS with 0 findings across `package_integrity`,
  `installation_structure`, `cross_file_consistency`, `configuration_completeness`,
  `operational`, and `governance` layers.
- A real invocation bug was found and fixed mid-session (not carried forward silently): the
  `project-starter-kit-invoke` skill's originally-documented `python3 -m starter_kit.cli`
  invocation silently exits 0 with no output (`cli.py` has no `__main__` guard) — corrected to
  invoke `main()` directly; the skill's own `SKILL.md` was updated with this fix.

### Not Yet Verified / Open

- **9 preserved-conflict candidates need review** — `.starter-kit/migrations/18d9b002-.../
  conflicts/` holds the v3.10 template version of each; no merge/keep/retire decision made yet.
  **Confirmed next task, this closeout's Step 4a gate.**
- `docs/project/` V3.4-era stub docs (still mostly `TBD`) were not touched by this migration —
  the original "V3.4 doc reconciliation" open item is now a "V3.4-and-v3.10 doc reconciliation"
  question instead.
- `CLAUDE.md` was not part of the `web_application` profile's plan at all (only `AGENTS.md`) —
  not yet understood why; flagged, not investigated.
- Commits `ca44f3f` and `470f81d` are local only — not pushed. Push was not authorized this
  session (Prepare-mode closeout, no explicit Git-publication request).
- H-3 (Cloudflare Web Analytics) remains paused — unchanged, unrelated to this session's work.

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).

---

## Inline Style Cleanup (2026-09-04, v2.29.1) — superseded above, preserved for record

### Summary

### Summary

Confirmed next task from the 2026-08-17 and 2026-08-31 closeouts: `BACKLOG.md` M-4. `AUDIT.md`'s
finding named 5 affected pages; direct inspection during planning found 7 — `book.html`/
`contact.html` also had inline `<style>` blocks, likely added during the later v2.23.0 Web3Forms
migration, after the audit was written. Owner confirmed (via `AskUserQuestion`) to widen scope to
all 7.

### Work Completed

- Moved each of the 7 pages' page-specific `<style>` block into `src/css/main.css`, each inserted
  next to its most related existing section (not appended at the end) — resolving two pre-existing
  base/modifier fragmentations along the way (`.credential-item--photo` and
  `.format-card:hover ...` already existed in `main.css` but depended on base classes that lived
  only inline).
- De-duplicated an identical `.form-success`/`.form-success.visible` pair that `book.html` and
  `contact.html` had each defined independently, into one shared definition.
- Removed the resulting empty `<style>` block from all 7 pages (`404.html`, `about.html`,
  `workshops.html`, `book.html`, `contact.html`, `programs/coding-with-robots.html`,
  `programs/pstem.html`); each page's unrelated line-6 FOUC-prevention `<style>` snippet untouched.
- Bumped the `main.css` cache-busting token (`?v=mobile-20260619d` → `?v=20260904`) across all 10
  pages.
- Ran the full release ceremony: `AUDIT.md`, `BACKLOG.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`,
  `SLICE_REVIEWS.md` (SR-021), `STATUS.md`, `PLAN.md` updated. Version bumped v2.29.0 → v2.29.1
  per `docs/VERSIONING.md` §5 ("CSS polish"). `COMMIT_NOTES.md` deliberately not yet updated (see
  Not Yet Verified below).

### Validation Performed

- `main.css` grew 2342 → 2723 lines, brace-balanced (467 open / 467 close); each moved class
  resolved to exactly one base definition.
- All 10 pages verified via a local Node HTTP server (`python3` unavailable on this machine — no
  Microsoft Store Python install) — all returned `200`; `main.css` served with the new token and
  contained the moved rules; `about.html`'s head confirmed clean.
- `grep -c '<style'` returned exactly 1 per changed file (was 2).
- `grep -rl 'mobile-20260619d'` returned zero hits after the token bump; the new token appeared on
  all 10 pages.
- `git diff --stat` confirmed exactly the 10 HTML files + `main.css` changed in slices 1-2 (net -5
  lines) — nothing unrelated touched.

### Confirmed Final State (2026-09-04)

Committed `1ddcdfe` (functional) → `01b1d10` (docs, final HEAD at push time) → `86e32f1`
(docs-only follow-up). Both pushed and remote-verified. Tagged
`v2.29.1__inline-style-cleanup__commit-1ddcdfe` at `01b1d10`, pushed and remote-verified.
Snapshot created and verified. Deployed to staging via a `scp` fallback (`DECISION_LOG.md`
ADR-025) and verified live via `curl` — see `SESSION_LOG.md` (vault) 2026-09-04 entry for full
detail. `CHANGELOG.md`/`RELEASE_NOTES.md`'s `**Tag:**` lines backfilled with the real hash;
`COMMIT_NOTES.md` has its entry.

### Not Yet Verified / Open

- H-3 (Cloudflare Web Analytics) remains paused — unchanged, unrelated to this session's work.
- Confirmed next task (2026-09-15 closeout): V3.4 doc reconciliation (`docs/project/`,
  `docs/governance/` vs. root-level equivalents).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
