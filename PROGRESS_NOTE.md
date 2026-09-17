**Updated:** 2026-09-17 (record reconciliation + AI-attribution trailer strip, no version bump)

# Progress Note — Current Session

## Record Reconciliation + Trailer Strip (2026-09-17, no version bump)

### Summary

A `REPO_SESSION_START_RECOVERY_AUDIT.md` run opened this session and produced a
🟡 PASS WITH CONDITIONS verdict. Two findings drove the work: every record describing the
2026-09-16 v3.10.0 session was wrong about its own publication state and cited commit hashes that
no longer resolve, and four published commits carried `Co-Authored-By: Claude` trailers in breach
of `DECISION_LOG.md` ADR-021.

### Work Completed

- **Trailer strip on published history (ADR-026).** Rewrote four commit messages via
  `git rebase 95015c4 --exec`, scoped to the range. Force-pushed with `--force-with-lease`. Final
  published hashes: `7a425df`, `a51bea6`, `5ea595b`, `3b3dc11`.
- **Incorporated a concurrent push rather than clobbering it.** The first push attempt was
  *rejected* by the lease: Anthony's MacBook Pro had pushed `8fb709c` 52 minutes earlier during its
  own session-end run, adding its snapshot-destination row. That commit also carried a trailer. It
  was fetched, cherry-picked onto the rewritten history, stripped, and republished as `3b3dc11`.
- **Record corrections.** `STATUS.md` (branch line, v3.10.0 section hashes, new 2026-09-17 entry),
  this file, `COMMIT_NOTES.md` (hashes, publication state, two previously-unrecorded commits),
  `PROGRESS_NOTES.md` (backfilled the missing 2026-09-16 entry), `DECISION_LOG.md` (ADR-026).
- **Vault records reconciled** in the same session — `HANDOFF_TO_CLAUDE.md` corrected;
  `CURRENT_CONTEXT.md`, `SESSION_LOG.md` and vault-root `AGENT_HANDOFF.md` backfilled.

### Validation Performed

- **Content-identity gate before any push:** `git diff` between the pre-rewrite tip and the
  rewritten tip returned **empty** — proving the rewrite changed messages only. Repeated against
  `8fb709c` after incorporating the MacBook Pro's commit; also empty, proving no machine's work was
  lost.
- Zero `Co-Authored-By` trailers reachable from `main` (`%(trailers:key=...)`, not a text grep).
- `a3a291a` — which *narrates* the 2026-07-24 scrub and would be corrupted by a repo-wide message
  filter — verified intact; it sits outside the rewritten range.
- Author dates preserved on all four commits; commit count in range = 4.
- Post-push: local `HEAD` == `git ls-remote origin refs/heads/main`; working tree clean; 0 ahead,
  0 behind.
- `grep` for `470f81d`/`ca44f3f` across the repo returns **no stale claims** — every remaining
  mention is a deliberate hash-lineage or history reference (`COMMIT_NOTES.md` lineage lines,
  ADR-026's rejected-alternative note, the superseded bullet below, this section). Checked by
  reading each hit in context, not by hit count.

### Not Yet Verified / Open

- **Other clones have diverged and must hard-reset** (`git fetch origin && git reset --hard
  origin/main`) before their next session — a merge or rebase there would reintroduce the trailered
  commits.
- **Recurrence is not fixed.** The trailer was reintroduced on 2026-09-17 by a session on another
  machine. The ban is configured in this machine's user-level `~/.claude/CLAUDE.md`; the Macs
  evidently lack it, and that config is not reachable from here. A repo-level `commit-msg` hook was
  offered and deferred — see ADR-026 Consequences.
- **Confirmed next task is unchanged:** review the 9 v3.10 migration conflict candidates in
  `.starter-kit/migrations/18d9b002-.../conflicts/`.
- H-3 (Cloudflare Web Analytics) remains paused — unrelated.

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).

---

## Project Starter Kit v3.10.0 Installation (2026-09-16, no version bump) — superseded above

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

- Discarded the 3 unresolved v3.4 candidates (commit `7a425df`) — both markdown candidates
  carried generic V3.4 boilerplate with none of this repo's real business rules; root `AGENTS.md`
  and `CLAUDE.md` were left untouched and remain authoritative.
- Ran `inspect` (PASS — classified `git_backed_with_deployment`, `web_application` profile, high
  confidence), `plan-migration --profile web_application` (`PASS_WITH_WARNINGS`, 0 shadowed
  documents), then `migrate --apply` (`PASS_WITH_WARNINGS`, run `18d9b002-b07d-41f6-99f8-
  f62c126387c8`), then `validate` (**PASS**, 0 findings across all 6 layers) — committed as
  `a51bea6`.
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
- ~~Commits `ca44f3f` and `470f81d` are local only — not pushed.~~ **Superseded 2026-09-17.** Both
  were pushed from another machine after this note was written, and were replayed onto `95015c4` in
  the process, so neither recorded hash ever existed on `origin/main`. They were rewritten a second
  time by the 2026-09-17 trailer strip (ADR-026). Final published hashes: `7a425df` (v3.4 candidate
  cleanup) and `a51bea6` (v3.10.0 migration), plus `5ea595b` (this session's own closeout commit,
  which no record mentioned at all). Full lineage in `COMMIT_NOTES.md`.
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
