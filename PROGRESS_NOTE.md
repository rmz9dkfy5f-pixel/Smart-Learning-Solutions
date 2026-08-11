**Updated:** 2026-08-11 (real favicon from client logo, v2.28.0)

# Progress Note — Current Session

## Real Favicon From Client Logo (2026-08-11, v2.28.0)

### Summary

Replaced the stale placeholder favicon (predates the real logo, color-mismatched) with a real
favicon + apple-touch-icon derived directly from the client's brand mark, across all 10 HTML
pages. Resolves the long-open `docs/DESIGN.md` "Favicon final?" item and completes the task
confirmed as next at the 2026-07-24 closeout.

### Work Completed

- Cropped the icon (running figure + kite) out of `src/images/brand-logo-mark.png` using
  pixel-level connected-component analysis, since a simple rectangular crop bled into the
  "Learning" wordmark's flourish. Exported `src/images/favicon.png` (32×32, new) and
  `src/images/apple-touch-icon.png` (180×180, new).
- Replaced the placeholder `<link rel="icon">` tag in all 10 HTML pages with the new favicon,
  and added a new `<link rel="apple-touch-icon">` tag to each.
- Updated `docs/DESIGN.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`,
  `SLICE_REVIEWS.md` (SR-019), `STATUS.md`, `PLAN.md`.

### Validation Performed

- All 10 pages loaded via local server (`python3 -m http.server`); `favicon.png`/
  `apple-touch-icon.png` both confirmed `200`/`image/png`.
- Real headless-browser screenshot check on `index.html`, `404.html`, and the one-directory-down
  `programs/coding-with-robots.html` — no visual regressions, real logo unaffected.
- `git diff --stat` confirmed scope: only the 10 HTML files + 2 new PNGs, nothing in
  `main.css`/`components.js`.
- `grep -rn "E85D1A"` across live code — zero remaining references to the old placeholder.

### Not Yet Verified / Open

- Push/tag held for explicit owner go-ahead, per this repo's standing norm — commits are local
  only as of this entry (code: `784d1fc`, docs: pending).
- Confirmed-queue backlog (H-3 GoatCounter, then M-9/M-4/...) unaffected, remains standing next
  task — no next task confirmed this session.

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
