# Plan: Implement Client Logo

**Date:** 2026-07-22
**Status:** Complete

---

## Objective
Replace the site's placeholder inline-SVG-badge + text wordmark (in `src/js/components.js`,
duplicated in the header and footer) with the client's actual logo image, confirmed as the
next task at the 2026-07-21 closeout.

## Current State
The "logo" was an inline hand-coded SVG (orange badge + white arrow glyph) plus plain-text
"Smart**Learning**", duplicated separately in `buildHeader()` and `buildFooter()` in
`components.js`, and reused a third time as the favicon data-URI. No logo image file existed in
`src/images/`. The site is 100% dark-themed (`#060A14`-family background everywhere), no light
sections exist anywhere.

## Assumptions
- Favicon stays untouched (existing inline SVG data-URI) — out of scope, owner-confirmed.
- The full two-line logo lockup (with the "solutions" script swoosh) is not placed anywhere in
  this pass — only a cropped single-line "icon + SmartLearning" version, for header + footer.

## Constraints
- Start from repo root
- Small approval slices
- Avoid unrelated edits
- Nav changes only via `src/js/components.js`, not per-page HTML

## Files to Review
- `pics/Logo/Logo.png.avif`, `pics/Logo/169B49B9-553F-4E10-82BC-E5EE7636C266.jpeg`
- `src/js/components.js`, `src/css/main.css`
- `AUDIT.md` (L-2)

## Files to Change
- `src/images/brand-logo-mark.png` (new)
- `src/js/components.js` — `buildHeader()`, `buildFooter()`
- `src/css/main.css` — `.site-logo`, `.footer-brand .site-logo`
- `AUDIT.md` — L-2 resolved

## Slice 1 — Asset preparation
**Goal:** Produce a usable logo asset from the owner-confirmed source file.

**Planned edits:**
- Decode `pics/Logo/Logo.png.avif` via `sips` (only conversion tool available locally; no
  ImageMagick/PIL) and inspect it directly.
- **Discovery mid-slice:** the decoded file is a full-color (orange + teal) version with real
  alpha transparency — not black line art as the reference image suggested. A second file in the
  same folder, `169B49B9-...jpeg` (untracked, no alpha, opaque white background), is the actual
  black-line-art version. Flagged to the owner rather than guessing; owner deferred the
  color-vs-mono call. Recommended and used the color AVIF: real alpha transparency (no
  background-removal risk with only `sips` available), and its orange/teal already closely track
  the site's existing `--accent`/icon-badge orange and `--cyan` tokens.
- Cropped the decoded 277×164 source to a 277×120 top-aligned single-line "icon + SmartLearning"
  lockup (excludes the "solutions" swoosh), confirmed via direct visual inspection (no clipping,
  correct exclusion boundary).
- Saved as `src/images/brand-logo-mark.png` (PNG chosen over WebP/AVIF for guaranteed universal
  `<img>` alpha support at negligible size cost — 25KB).

**Validation:** `sips -g hasAlpha` confirmed `yes` before and after crop; visual inspection via
direct image read confirmed clean crop boundaries.

## Slice 2 — Code integration
**Goal:** Wire the new asset into the shared header/footer component.

**Planned edits:**
- `components.js`: replaced the inline SVG + `Smart<span>Learning</span>` markup in both
  `buildHeader()` and `buildFooter()` with `<img src="/src/images/brand-logo-mark.png" alt=""
  width="277" height="120">` inside the existing `.site-logo` link (kept the link's
  `aria-label="Smart Learning Solutions home"`; `alt=""` on the image since it would otherwise
  duplicate the announcement).
- `main.css`: `.site-logo` stripped of now-dead text-styling properties (font-family/weight/
  size/letter-spacing/color), replaced with `.site-logo img { height: 36px; width: auto; }`.
  Removed the dead `.site-logo span { color: var(--accent); }` rule (no more `<span>` anywhere).
  `.footer-brand .site-logo` lost its `font-size` override (no more text), gained
  `.footer-brand .site-logo img { height: 40px; }`.
- No CSS color filter needed — native logo color composites cleanly on the dark background.

**Validation:** `git diff --stat`; confirmed no leftover references to the old SVG fill color or
the dead `span` rule anywhere in the two changed files.

## Slice 3 — Validation
**Goal:** Confirm the change renders correctly across the real site, not just in isolation.

**Planned edits:** none (verification only).

**Validation:**
- Local static server (`python3 -m http.server`) + a disposable Playwright script (already
  cached locally from prior sessions; installed ad hoc into a scratchpad `node_modules`, not
  added to the repo) drove real Chromium against all 10 pages.
- Smoke pass (all 10 pages): 200 status, zero console/page errors, logo image request 200 on
  every page.
- Visual pass (`index.html`): header at top-of-page (transparent state over the hero), header
  scrolled (opaque `.scrolled` state), footer, header at 1100px width (the repo's documented
  historical nav-squeeze zone — nav had already collapsed to the hamburger by this width, so no
  regression), mobile header (390px), mobile nav-open overlay, mobile footer. All render the logo
  in full orange/teal color, correctly sized, no clipping or squeeze.
- Confirmed `AUDIT.md` L-2 (footer SVG `width`/`viewBox` mismatch) is genuinely moot — the old
  SVG no longer exists in either builder function.

## Risks
- Source image is low-resolution (277×164 native) — acceptable for the ~36–40px display height
  used, at the edge of ideal retina headroom; a higher-res source from the client would be a
  future nice-to-have, not a blocker.
- The full two-line lockup (with "solutions") isn't used anywhere yet — fine for now since no
  larger placement was confirmed, but worth a future decision if one is wanted (e.g. an About
  page).

## Rollback
`git checkout -- src/js/components.js src/css/main.css` and `git rm src/images/brand-logo-mark.png`
before commit; after commit, `git revert` the release commit.

## Open Questions
None blocking. Two loose ends noted for later, not this slice: (1) whether the full two-line
lockup should be placed anywhere (e.g. About page), (2) the untracked
`pics/Logo/169B49B9-...jpeg` file was left in place, unused — worth a future decision on whether
to keep it as a reference or remove it.
