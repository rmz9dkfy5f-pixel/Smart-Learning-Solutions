**Updated:** 2026-07-22 (v2.26.0 + same-day deploy/hygiene follow-up, no further version bump)

# Progress Note — Current Session

## Client Logo Implementation (v2.26.0) + Staging Deploy + Reference-File Hygiene (2026-07-22)

### Summary

Replaced the placeholder inline-SVG-badge + text wordmark in the header/footer with the client's
actual logo (`src/images/brand-logo-mark.png`), owner-confirmed as the next task from the
2026-07-21 closeout. Same day, closed the two loose ends flagged at that point: deployed the
change to staging (verified genuinely stale beforehand, genuinely current afterward — not
assumed either way) and resolved the fate of an unused black-line-art reference file
(owner-confirmed keep, renamed and tracked).

### Work Completed

- Owner provided the logo image directly in-session. Confirmed source file
  (`pics/Logo/Logo.png.avif`, git-tracked since 2026-05-08, never wired in) decoded via `sips` to
  a full-color orange/teal version with real alpha transparency — not the black line art the
  pasted reference image suggested. Flagged this rather than guessing a color treatment; owner
  deferred the call, color AVIF used natively (no CSS filter) since its orange/teal already track
  the site's existing accent-orange/cyan tokens. Logged as `DECISION_LOG.md` ADR-017.
- Cropped to a single-line "icon + SmartLearning" lockup (`src/images/brand-logo-mark.png`),
  wired into `components.js`'s `buildHeader()`/`buildFooter()` as a single `<img>`, restyled
  `.site-logo` in `main.css`. Resolved `AUDIT.md` L-2 as a side effect.
- Validated live (local server + a disposable Playwright script) across all 10 pages, header
  transparent/scrolled states, the documented ~1100px nav-squeeze zone, and mobile.
- Full v2.26.0 release ceremony; tagged
  `v2.26.0__client-logo-implementation__commit-7594701`, pushed.
- Same day, user asked to close the two flagged loose ends:
  - Verified staging was genuinely stale (old `E85D1A` SVG fill present, new asset 404) before
    deploying, per `LESSONS_LEARNED.md` L-016.
  - Deployed via `scripts/deploy-staging.sh` following `docs/DEPLOYMENT.md` §9/§11's documented
    backup → dry-run → real-run → curl-verify sequence (same runbook already proven in SR-009).
  - Renamed and tracked the unused reference file
    (`pics/Logo/169B49B9-...jpeg` → `pics/Logo/logo-black-line-art.jpeg`) — owner chose
    keep-not-delete (higher native resolution than the AVIF actually used).
  - `SLICE_REVIEWS.md` SR-011 added (no version bump — operational/housekeeping, matching the
    SR-008 precedent); `STATUS.md`, `COMMIT_NOTES.md`, `DECISION_LOG.md` updated.
  - Retroactively created the missing `RepoBackups/Smart Learning Solutions/
    v2.26.0__client-logo-implementation__commit-7594701/` snapshot this session (had been missed
    at the time of the original v2.26.0 push).

### Validation Performed

- Logo implementation: Playwright smoke pass across all 10 pages (200 status, zero console
  errors, logo image 200); visual pass on header states, ~1100px breakpoint, mobile.
- Staging deploy: `curl` confirmed the new asset live (`200`/`image/png`), old SVG fill gone,
  full SR-009 regression checklist unaffected (forms, OG image, security headers, internal-path
  404s).
- `git status`/`git diff --stat` reviewed before each commit to confirm only intended files
  changed.

### Not Yet Verified / Open

- Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
  self-host proposal (OD-003).
- The full two-line logo lockup (with the "solutions" script swoosh) isn't placed anywhere yet —
  non-blocking, a future candidate if a larger placement (e.g. an About page) is ever wanted.

### Launch Blockers (updated)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
