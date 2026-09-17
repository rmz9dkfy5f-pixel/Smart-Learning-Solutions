# Plan — Record Reconciliation + AI-Attribution Trailer Strip

**Date:** 2026-09-17
**Status:** Complete (repo half); vault half tracked in the AntBrainOS vault project folder
**Version impact:** none — docs/governance only, no site content changed, no version bump

## Objective

Make every continuity record state the real, final, published commit hashes for the 2026-09-16
Project Starter Kit v3.10.0 session, and remove the `Co-Authored-By: Claude` trailers that four
published commits had acquired in breach of ADR-021.

## Current State (at session start)

A `REPO_SESSION_START_RECOVERY_AUDIT.md` run produced 🟡 PASS WITH CONDITIONS. The repo itself was
clean and in sync, but:

- `STATUS.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md` and the vault's `HANDOFF_TO_CLAUDE.md` all
  described the 2026-09-16 work as "local only — not pushed" at `ca44f3f` / `470f81d`. Both hashes
  fail `git cat-file -t`. The work had been pushed from another machine and replayed onto `95015c4`,
  so neither hash ever existed on `origin/main`.
- A third commit (`c809946`) was pushed that no record mentioned at all.
- `PROGRESS_NOTES.md`, and the vault's `CURRENT_CONTEXT.md` / `SESSION_LOG.md` / `AGENT_HANDOFF.md`,
  had no 2026-09-16 entry whatsoever.
- Three published commits carried AI-attribution trailers, against ADR-021 and the owner's standing
  ban. A fourth (`8fb709c`) arrived from a third machine mid-session.

## Files to Review

`STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `DECISION_LOG.md`
(ADR-021, ADR-024, ADR-025), `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`,
`docs/governance/PROJECT_CLASSIFICATION.md`; vault `03_PROJECTS/Active/Smart Learning Solutions/*`
and `00_START_HERE/AGENT_HANDOFF.md`.

## Files to Change

| File | Change |
|---|---|
| `STATUS.md` | Branch line → final HEAD; v3.10.0 section hashes; new 2026-09-17 entry |
| `PROGRESS_NOTE.md` | Hashes; push-state bullet superseded; new 2026-09-17 section |
| `COMMIT_NOTES.md` | Hashes + publication state; entries for `5ea595b` and `3b3dc11` |
| `PROGRESS_NOTES.md` | Backfilled 2026-09-16 entry; new 2026-09-17 entry |
| `DECISION_LOG.md` | ADR-026 |
| `plans/2026-09-17-record-reconciliation.md` | This file |
| `PLAN.md` | Index entry |

## Slice Plan

1. **Safety** — backup branches + verified `git bundle` exports for both pre-rewrite tips.
2. **Rewrite** — range-scoped `git rebase 95015c4 --exec` stripping the trailer.
3. **Gate** — content-identity proof before any push.
4. **Push** — `--force-with-lease`.
5. **Records** — the table above.
6. **Vault** — snapshot, then vault record reconciliation (separate slice, vault-side).

## Validation

- `git diff <pre-rewrite tip> <rewritten tip>` → empty (run twice: before and after incorporating
  the concurrent `8fb709c`). This is the gate that authorises the push.
- Zero `Co-Authored-By` trailers reachable from `main`, via `%(trailers:key=...)` — **not** a text
  grep, which produces a false positive on `a3a291a`.
- `a3a291a`'s narrative mention verified intact (outside the rewritten range).
- Author dates preserved; 4 commits in range.
- Post-push: local `HEAD` == `git ls-remote origin refs/heads/main`; clean tree; 0 ahead / 0 behind.
- `grep -rn "470f81d\|ca44f3f"` across the repo → no *stale claims* remain. Hits are expected and
  are deliberate hash-lineage / history references; each must be read in context rather than
  counted. (A zero-hit target would be wrong here: the lineage is what makes the churn traceable.)
- No HTML/CSS/JS touched, so no browser validation applies.

## Risks

1. **Force-push to published `main`** — other clones diverge and must hard-reset. Mitigated by
   backup branches, bundles, `--force-with-lease`, and an explicit reset instruction in `STATUS.md`
   and the vault handoff.
2. **Range escape** — a repo-wide message filter would corrupt `a3a291a`. Mitigated by range
   scoping plus an explicit post-rewrite check.
3. **Content drift** — mitigated by the empty-`git diff` gate, which blocks the push.
4. **Concurrent writers** — realised, not hypothetical: a third machine pushed mid-session. The
   lease caught it. Kept as a standing risk for any future rewrite here.
5. **Recurrence** — the trailer has now been reintroduced twice after ADR-021. Not fixed by this
   work; see ADR-026 Consequences.

## Open Questions

- Whether to add a repo-level `commit-msg` hook rejecting the trailer (offered, deferred).
- Whether the Macs' user-level `~/.claude/CLAUDE.md` should carry the ban — not reachable from this
  machine.
- Unchanged and deferred: the 9 v3.10 migration conflict candidates (the standing confirmed next
  task), and upgrading the flat Deployment Contract to a `### Deploy Targets` table.
