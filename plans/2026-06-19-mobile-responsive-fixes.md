# Plan: Mobile Responsive UI Defect Fixes

**Date:** 2026-06-19
**Status:** Complete (code) · on-device visual verification pending

---

## Objective
Fix mobile responsive UI defects shown in on-device screenshots: (1) the open mobile menu
leaks page content (no full coverage), and (2) the program-page hero photos crop subjects'
heads and have a mismatched corner radius. Audit the remaining pages for similar issues.

## Current State (before this task)
- `.mobile-nav` was a content-height dropdown (`top: var(--header-height)`, no bottom/height),
  near-opaque, with a transparent header behind it → page `<h1>` showed behind the logo and
  page content showed below the menu's CTA.
- `.page-hero-proof-photo` / `.program-section-break` used fixed `height: 180px` + high
  `object-position` (`center 20%` / `center 30%`) → subjects decapitated on full-width mobile.
- `.page-hero-proof-photo` used `--radius-md` vs the product card's `--radius-lg`.
- Other pages already collapse multi-column photo grids to single column at ≤768px.

## Assumptions
- Full-screen overlay nav is an accepted visual change (owner-confirmed during planning).
- GSAP loads in production (reveal animations fire in screenshots); animation logic untouched.
- The "faded CTA text" in one nav screenshot is a transient capture artifact, not a CSS defect.

## Constraints
- No desktop (≥1024px) regression; no redesign, copy, route, or dependency changes.
- Nav behavior changes must keep `components.js` `NAV_LINKS`/template intact (no user-input innerHTML).
- Keep GSAP pinned at 3.12.5 with existing SRI hashes.

## Files Changed
- `src/css/main.css` — `.mobile-nav` (overlay), `body.nav-open .site-header` (opaque header),
  `.page-hero-proof-photo` (radius + object-position), `.program-section-break` (object-position),
  `@media (max-width:1024px)` stack max-width, `@media (max-width:768px)` proof/section aspect-ratios.
- `src/js/components.js` — `closeNav()` helper; toggle sets `nav-open` on body; close on link tap
  and Escape; `pageshow` resets via `closeNav()`.
- All 10 HTML files — cache-bust bump `?v=visual-20260428-navfix`→`mobile-20260619` (CSS) and
  `?v=navfix-20260428`→`mobile-20260619` (components.js).

## Slice 1 — Mobile nav → full-screen overlay (shared, all pages)
**Edits:** `.mobile-nav` now `inset:0`, solid `--bg`, `padding-top: header-height + space-6`,
`overflow-y:auto`; added `body.nav-open .site-header { background: var(--bg) }`; JS adds `nav-open`
class, closes on link/Escape, resets on `pageshow`.
**Validation:** JS `--check` passes; CSS braces balanced; served files contain changes.

## Slice 2 — Program hero proof photo
**Edits:** radius `--radius-md`→`--radius-lg`; `object-position center 20%`→`center center`;
≤768 `height:auto; aspect-ratio:16/10`; ≤1024 cap `.page-hero-media-stack` to 520px so both
stacked images share one width.

## Slice 3 — Program section-break strip
**Edits:** `object-position center 30%`→`center center`; ≤768 `height:auto; aspect-ratio:16/9`.

## Slice 4 — Full mobile sweep (other pages)
**Outcome:** Static audit found existing responsive coverage on all other pages (photo-proof,
photo-mosaic, about-proof, split-hero, credentials, program-card-media all collapse to single
column with sensible heights at ≤768). **No speculative changes made** — shared nav fix covers them.

## Validation
- `node --check --input-type=module` on components.js: **OK**.
- CSS brace balance: **393/393**.
- Local server (`python3 -m http.server`): all 13 routes/assets return **200**; served CSS/JS
  contain the changes; pages reference the new versioned assets.
- **Pending (needs a browser/device):** visual checks at 320/375/390/414/430/768 + desktop —
  see acceptance/verification checklist in `/Users/ant/.claude/plans/you-are-auditing-and-composed-sprout.md` §4–§5.

## Risks
- Full-screen overlay is a deliberate visual change to the open-menu appearance (owner-approved).
- `aspect-ratio` is well supported in modern mobile browsers; older browsers fall back to intrinsic
  height (graceful, not broken).
- Cache-bust bump must ship together with the CSS/JS so clients fetch the new assets.

## Rollback
Revert the `src/css/main.css` and `src/js/components.js` hunks and restore the prior `?v=` tokens
in the 10 HTML files (single commit revert).

## Open Questions
- Confirm on a real device that the previously "faded" in-menu CTA renders at full contrast once
  the overlay transition settles (expected: it does; was a capture artifact).
