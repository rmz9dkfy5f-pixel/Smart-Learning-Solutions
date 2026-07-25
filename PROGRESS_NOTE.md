**Updated:** 2026-07-24 (git history AI-attribution scrub + VPS default_server hygiene fix)

# Progress Note — Current Session

## Git History AI-Attribution Scrub + VPS default_server Hygiene Fix (2026-07-24, no version bump)

### Summary

Two unrelated fixes, both infrastructure/hygiene, no application code changed. (1) Owner asked to
remove all "Claude" mentions from git history; rewrote all 6 branches via `git filter-repo`,
renamed 64 tags (fixing 4 pre-existing drifted tags found along the way), backfilled 329 doc hash
references, force-pushed. (2) Owner reported the two hero-video review subdomains showing "Prompt
Vault" — root-caused to a URL typo (missing prefix) plus a real underlying VPS hygiene gap
(`prompt-vault`'s vhost was the shared box's HTTP `default_server`); fixed both.

### Work Completed

- **Git history:** Verified via direct git commands that only 13/113 commits on `main` carried the
  `Co-Authored-By: Claude` trailer, not every commit. Classified all 34 Claude-mentioning commits
  by hand (22 mechanical trailer-strips, 5 hand-reworded, 6 filename-only left untouched, 1
  borderline judged filename-only). Ran `git filter-repo --commit-callback` across all 6 branches
  in one pass. Renamed all 64 hash-suffixed tags, discovering and fixing 4 with a pre-existing
  name/target drift unrelated to this rewrite. Backfilled 329 doc hash references via targeted
  literal-string substitution. Force-pushed all 6 branches and 74 tags; re-synced the local working
  directory. Found and removed an unrelated, pre-existing orphaned `refs/original/refs/heads/main`
  ref (from an earlier, unrelated rewrite predating this session).
- **VPS routing bug:** Diagnosed via `curl`/`dig`/`openssl s_client`. Confirmed via SSH that
  `prompt-vault`'s nginx vhost had `listen 80 default_server` — the HTTP catch-all for the entire
  shared VPS. Removed it; added a minimal explicit catch-all (`return 444` / `ssl_reject_handshake`).
- `DECISION_LOG.md` ADR-021/ADR-022, `SLICE_REVIEWS.md` SR-017/SR-018, `STATUS.md`, `PLAN.md`,
  `COMMIT_NOTES.md`, `PROGRESS_NOTES.md` updated.

### Validation Performed

- Tree-identity check empty for all 6 branches (byte-identical content, only metadata changed).
- Commit-count parity per branch unchanged; zero remaining unwanted `Claude` mentions; all 74 tags
  resolve with correct name/hash consistency; local vs. origin hash comparison exact match.
- Nginx: unmatched hostnames now close/444; real hero-video URLs and 2 sibling tenants unaffected.

### Not Yet Verified / Open

- Confirmed-queue backlog (H-3 GoatCounter, then M-9/M-4/...) unaffected, remains standing next task.
- Rewrite-workspace clone and pre-rewrite backups left outside the repo for rollback safety.
- This repo still has no `REPOSITORY_HANDOFF_CONFIG.md` — this session's own closeout snapshot step
  will stop rather than guess a destination.

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
