**Updated:** v2.18.0 · 2026-06-19

# Progress Note — Current Session

## v2.18.0 — Mobile Responsive Fixes (2026-06-19)

Four-slice mobile responsive fix pass triggered by on-device iPhone screenshots
showing menu bleed-through, cropped hero photos, faded button text, and a
squeezed eyebrow label on mobile.

**Slice 1 — Full-screen nav overlay**
Converted `.mobile-nav` from a content-height dropdown to an `inset:0` full-screen
overlay with solid `--bg` background. Added `body.nav-open .site-header` opaque
rule so the page `<h1>` no longer shows behind the logo while the menu is open.
Added `closeNav()` helper; menu closes on link-tap, Escape, and `pageshow`.
Scroll-lock resets cleanly in all exit paths.

**Slice 2 — Program hero proof-photo fixes**
Program page proof photos: `border-radius` unified to `--radius-lg`, `object-position`
recentered to `center center`, fixed `180px` height replaced with `aspect-ratio: 16/10`
at ≤768px. Section-break strip: same pattern with `aspect-ratio: 16/9`. Subjects are
no longer cropped.

**Slice 3 — Eyebrow font-size specificity fix**
CSS specificity bug: `.hero-content p` (0,1,1) was overriding `.eyebrow` base rule (0,1,0)
and inflating the eyebrow to 16px on mobile, causing it to wrap. Fixed with
`.hero-content .eyebrow` (0,2,0) inside the ≤1100px media query.

**Slice 4 — Hamburger breakpoint raised to ≤1100px**
Measured: the full desktop header (logo + 6 nav links + CTA button) needs ~1100px. Between
769–1099px the CTA was flexbox-squished to as little as 64px and its label was clipped.
Raised nav-swap breakpoint to ≤1100px (ADR-011). Added `.header-cta { flex-shrink: 0 }`.
Also fixed `.mobile-nav a.btn--primary` colour — muted-grey link rule was out-specificing
the white button colour.

Cache token bumped to `?v=mobile-20260619c` on `main.css` and `components.js` across
all 10 HTML files.

---

## Code Commit

| Hash | Branch | Message |
|---|---|---|
| `ca43fb2` | `fix/mobile-responsive-20260619` | fix(mobile): full-screen nav overlay, hero crop fixes, tablet breakpoint |

---

## Decisions Logged

| ADR | Decision |
|---|---|
| ADR-010 | Mobile nav → full-screen overlay |
| ADR-011 | Hamburger breakpoint raised to ≤1100px |

---

## Files Changed

| File | Change |
|---|---|
| `src/css/main.css` | Full-screen overlay, 1100px breakpoint, eyebrow fix, photo crop fix, CTA colour fix |
| `src/js/components.js` | `closeNav()` helper, link-tap/Escape/pageshow resets |
| All 10 HTML files | Cache token `?v=mobile-20260619c` |
| `DECISION_LOG.md` | ADR-010, ADR-011 |
| `PLAN.md` | History row added |
| `plans/2026-06-19-mobile-responsive-fixes.md` | New plan file |

---

## What's Next

Branch `fix/mobile-responsive-20260619` is pushed to origin.
Merge to `main` when owner approves.

**Launch blockers unchanged:**
1. Configure Formspree — replace `REPLACE_ME` in `book.html` and `contact.html`
2. Point production domain to VPS (74.208.9.49); verify routing end-to-end
3. Convert `og-image.svg` to PNG/JPEG 1200×630
