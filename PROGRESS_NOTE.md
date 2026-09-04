**Updated:** 2026-09-04 (Inline style cleanup shipped, v2.29.1)

# Progress Note — Current Session

## Inline Style Cleanup (2026-09-04, v2.29.1)

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

### Not Yet Verified / Open

- Commit, tag, and push for this work — deliberately deferred to a separate, explicitly-requested
  step this session (owner chose "docs only, no commit" for this slice). `CHANGELOG.md`/
  `RELEASE_NOTES.md`'s `**Tag:**` lines are placeholders (`pending — assigned at commit`) until
  then; `COMMIT_NOTES.md` has no entry yet since no commit exists.
- H-3 (Cloudflare Web Analytics) remains paused — unchanged, unrelated to this session's work.
- Next standing task once this is committed: V3.4 doc reconciliation (`docs/project/`,
  `docs/governance/` vs. root-level equivalents).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
