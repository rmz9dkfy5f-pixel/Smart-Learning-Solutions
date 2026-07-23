**Updated:** 2026-07-22 (H-4 — page-transition overlay timeout fallback, v2.26.1)

# Progress Note — Current Session

## H-4: Page-Transition Overlay Timeout Fallback (2026-07-22)

### Summary

`BACKLOG.md` H-4, the first item in the owner-confirmed 2026-07-22 ranked next-task queue
(`PLAN.md`): the shared `.is-navigating` page-transition overlay had no safety timer.
`initPage()` in `src/js/components.js` (called by all 10 pages) adds `.is-navigating` and
`overflow: hidden` on internal link clicks, then navigates via `window.location.assign()`. The
only code that ever removes `.is-navigating` is a `pageshow` listener that fires once the
destination page loads — an interrupted or failed navigation (offline, a stalled load, a
`location.assign` edge case) had no fallback, leaving the page stuck under the overlay
indefinitely with scrolling locked.

### Work Completed

- Added `NAVIGATION_TIMEOUT_MS` (4000ms) constant and a `navigationSafetyTimer`, started
  alongside the existing transition-delay timeout in the click handler, that force-clears
  `.is-navigating` and restores `overflow` if `pageshow` hasn't fired within that window.
- The `pageshow` listener now clears the pending safety timer first, so a normal navigation never
  leaves a dangling timeout running.
- Single file changed: `src/js/components.js`. No CSS/HTML changes needed — the overlay markup
  and styling were already correct.
- Version bumped to v2.26.1 (patch — bug fix, per `docs/VERSIONING.md` §5). `CHANGELOG.md`,
  `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md` (SR-013), `STATUS.md` updated.
  `BACKLOG.md` H-4 row closed; `PLAN.md` queue advanced to H-3 next.

### Validation Performed

- Local static server (`python3 -m http.server`) + a disposable Playwright script.
- Golden path: real link clicks navigating `index.html` → `about.html`, `book.html` →
  `index.html`, and `workshops.html` → `index.html` all confirmed `.is-navigating`/`overflow`
  cleared immediately on arrival, no regression.
- Edge case: aborted the destination request (`page.route(..., route => route.abort('failed'))`)
  right after a real click, confirming the overlay is correctly shown immediately after
  (`is-navigating: true`, `overflow: hidden`) and force-clears automatically ~4.3s later via the
  new safety timer, rather than staying stuck.

### Not Yet Verified / Open

- Not yet deployed to staging — this is a code-only fix pending the usual
  `scripts/deploy-staging.sh` run and the owner's release-ceremony convention for when to deploy
  (per `LESSONS_LEARNED.md` L-016, staging drift can recur silently if not redeployed).
- Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
  self-host proposal (OD-003).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
