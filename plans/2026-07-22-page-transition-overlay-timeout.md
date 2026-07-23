# Page-Transition Overlay Timeout Fallback (H-4)

## Objective
Add a safety timer to the shared `.is-navigating` page-transition overlay so an interrupted or
failed navigation can't leave the page stuck under it indefinitely. Owner-confirmed as the first
item in the 2026-07-22 ranked next-task queue (`PLAN.md`).

## Current State
`initPage()` in `src/js/components.js` (shared by all 10 pages) intercepts same-origin link
clicks: it adds `body.is-navigating` (fades in a full-viewport `#page-transition` cover-up per
`main.css`), sets `overflow: hidden`, then navigates via `window.location.assign()` after
`TRANSITION_DELAY_MS` (100ms). The only removal path is a `pageshow` listener firing once the
destination page loads — no fallback exists if navigation is interrupted (offline, a stalled
load, a `location.assign` edge case).

## Files to Review
- `src/js/components.js` — `initPage()`, click handler, `pageshow` listener
- `src/css/main.css` — `#page-transition` / `.is-navigating` styling (no change needed, reviewed
  to confirm overlay behavior)

## Files to Change
- `src/js/components.js` only

## Slice Plan
One slice: add `NAVIGATION_TIMEOUT_MS` (4000ms) constant and a `navigationSafetyTimer`, started
in the click handler alongside the existing transition-delay timeout, that force-clears
`.is-navigating`/`overflow` if `pageshow` hasn't fired within that window. The `pageshow`
listener clears the pending timer first, so a normal navigation never leaves a dangling timeout.

## Validation
Local static server + a disposable Playwright script:
- Golden path: real link clicks across `index.html`, `book.html`, `workshops.html` confirmed the
  overlay clears immediately on arrival, no regression to timing or `closeNav()`.
- Edge case: aborted the destination request right after a real click, confirming the overlay is
  correctly shown immediately after and force-clears automatically ~4.3s later via the new safety
  timer, instead of staying stuck.

## Risks
Low — additive-only defensive timer on one shared function; doesn't touch CSS/HTML or the
golden-path navigation flow/timing.

## Open Questions
None.
