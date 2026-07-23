**Updated:** 2026-07-23 (v2.27.0, About page logo watermark)

# Progress Note — Current Session

## Two-Line Logo Lockup Watermark on About Page (v2.27.0) (2026-07-23)

### Summary

Closed the non-blocking open item flagged at the end of the v2.26.0 logo session: the full
two-line logo lockup (including the "solutions" script swoosh, deliberately excluded from the
single-line header/footer crop) is now placed as a subtle background watermark behind the "Built
on Real Expertise" mission copy on `about.html`. Owner chose this placement over two alternatives
(a CTA-band accent, a fully visible hero mark) after reviewing mockups of each, and chose
repo-only scope for this pass — staging deploy is a deliberate, separate follow-up.

### Work Completed

- Confirmed no two-line asset existed anywhere in the repo (full-tree filename search). The
  source `pics/Logo/Logo.png.avif` (277×164, alpha) is the full, uncropped two-line lockup;
  exported it natively via `sips -s format png` to `src/images/brand-logo-lockup-full.png` — no
  crop needed, since the shipped single-line mark was already the one that excluded the swoosh.
- `about.html`: wrapped the mission column in a new `.about-mission` class, added an
  `aria-hidden` watermark `<div>` as its first child, and added CSS in the page's own `<style>`
  block following the site's existing `.cta-band-orb`/`.audience-photo-bg` decorative-layer
  pattern (`position: absolute; z-index: 0` on the image, `position: relative; z-index: 1`
  promotion on the real text — required for correct paint order).
- Opacity set to 0.08 — deliberately below the sitewide 0.09–0.11 decorative-image convention,
  since the mission paragraphs' `--text-muted` color already sits close to the AA 4.5:1 contrast
  floor independent of this change. Confirmed sufficient via a direct visual check across all 4
  standard breakpoints (375/768/1024/1440px), not just assumed — no adjustment was needed.
  Logged as `DECISION_LOG.md` ADR-019 (extends ADR-017).
- Native color (no CSS filter), extending ADR-017's reasoning for the same asset family.
- Full v2.27.0 release ceremony; `SLICE_REVIEWS.md` SR-014 added.

### Validation Performed

- Disposable Playwright script (local static server, real Chromium) across all 10 pages: 200
  status, zero console/page errors; new asset loads only on `about.html`; existing header/footer
  logo (`brand-logo-mark.png`) unaffected everywhere.
- Computed-style check: confirmed correct watermark/text stacking order (`z-index: 0` vs. `1`) and
  that the watermark's rendered box stays within the mission column's bounds.
- Visual check at 375/768/1024/1440px: watermark reads as intentionally subtle at every
  breakpoint, stays scoped to the mission column only (no bleed into the credentials list,
  including across the 768px stacking transition), and all three paragraphs plus the heading
  remain fully legible.
- `prefers-reduced-motion: reduce` confirmed unaffected — the existing `reveal-up` static fallback
  still resolves correctly with the new child present.

### Not Yet Verified / Open

- Staging deploy — intentionally out of scope for this pass. **Confirmed as the next task** at
  this session's `REPO_SESSION_END_CLOSEOUT.md` Step 4a (owner's explicit pick), ahead of
  resuming the concurrent session's own H-3/M-9/M-4/... queue (`PLAN.md`).
- Production domain not yet pointed to the VPS — unchanged from prior sessions; pending client
  acceptance of the self-host proposal (OD-003).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
