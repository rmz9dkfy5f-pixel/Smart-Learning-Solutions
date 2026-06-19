# Decision Log

Canonical log of significant architectural and process decisions made during this project.

Historical ADRs (ADR-001 through ADR-007) are in `DECISIONS.md` and are preserved there.
New decisions from v2.15.0 onward are recorded here.

---

## ADR-008 — Adopt v2 Project-Control Planning System
**Date:** 2026-05-16
**Completed:** v2.15.5 · 2026-06-04
**Decision:** Migrate the repo's planning and documentation to the v2 project-control system.
**Context:** The repo had grown to 15+ root-level docs files with overlapping purposes,
no phase gates, no backlog, no lessons-learned record, and no formal decision log.
The v2 system introduces a defined file set, phase gates, a backlog, and a canonical
decision log to bring structure to the pre-launch and post-launch work.
**Options considered:** Keep existing ad-hoc structure; adopt v2 system
**Chosen:** Adopt v2 system
**Reason:** The site is pre-launch and adding structure now costs little; waiting until
post-launch adds it to an already-live maintenance burden.
**Consequences:**
- Positive: clear phase gates; backlog is trackable; lessons are recorded; decisions are findable
- Negative: more files to maintain; some overlap between old and new docs during transition
- Risk: doc maintenance burden if update discipline lapses
**Files added:** PROJECT_BRIEF.md, PLAN.md, PHASE_GATES.md, BACKLOG.md, DECISION_LOG.md,
SLICE_REVIEWS.md, LESSONS_LEARNED.md, PROGRESS_NOTES.md, FILE_MAP.md
**Files updated:** CLAUDE.md, AGENTS.md, STATUS.md, PROGRESS_NOTE.md, COMMIT_NOTES.md,
ROADMAP.md, PROJECT_BRIEF.md, BACKLOG.md, PLAN.md
**Gate 1 fixes (v2.15.3):** C-2 cursor CSS gate, H-2 GSAP SRI hashes, M-2 title em-dash,
M-3 PSTEM image dimensions, M-6 tel: + prefix — all resolved during migration window

---

## ADR-009 — nginx `try_files` Pattern for Static HTML Sites with Clean URLs
**Date:** 2026-06-17
**Version:** v2.16.1

### Decision
Use `try_files $uri $uri/ $uri.html =404` in nginx for this static site, plus
`error_page 404 /404.html` with `location = /404.html { internal; }`.

### Reason
The site uses `.html` files (e.g. `about.html`, `workshops.html`) but links and
users navigate to clean URLs without the extension. Without `$uri.html`, nginx
returns 404 for any clean URL even though the file exists. The custom 404 page
must be declared `internal` to prevent direct access to `/404.html` returning 200.

### Alternatives Considered
- Rename all pages to `index.html` inside subdirectories — rejected as too disruptive
- Use nginx `rewrite` rules — unnecessary; `try_files` handles this cleanly

### Consequences
- All clean URLs resolve correctly
- Custom 404 page served on all unmatched routes
- Pattern must be replicated if site is moved to a new nginx host

---

## ADR-010 — Mobile Nav Becomes a Full-Screen Overlay
**Date:** 2026-06-19

### Decision
Change the open mobile menu from a content-height dropdown panel to a full-screen overlay
(`inset: 0`, solid `--bg` background, `padding-top` clearing the header), and make the header
bar opaque while the menu is open (`body.nav-open .site-header`).

### Reason
On-device screenshots showed page content bleeding through the open menu — the page `<h1>`
behind the transparent header and page content/CTA below the short panel — which read as broken.
The dropdown only covered its own content height. A full-screen overlay fully owns the screen
(matching stripe.com / vercel.com / linear.app), eliminating the bleed-through.

### Alternatives Considered
- Keep the dropdown and add an opaque header + dark scrim behind it — smaller change, but the
  page stays faintly visible behind the dim; rejected in favor of the cleaner overlay (owner choice).

### Consequences
- No page content visible while the menu is open; header opaque on open.
- Menu now closes on link tap and Escape; scroll-lock and `pageshow` reset preserved.
- Purely CSS + existing static template — no new dependency, no user-input innerHTML.
- Shipped with a cache-bust bump (`?v=mobile-20260619`) on `main.css` and `components.js`.

### Related
- Plan: `plans/2026-06-19-mobile-responsive-fixes.md`
- Also in this pass: program-page hero photo crop/radius fixes (CSS only, no decision needed).

---

## ADR-011 — Hamburger Nav Breakpoint Raised to 1100px (Tablet CTA Fix)
**Date:** 2026-06-19

### Decision
Switch the nav from the full desktop horizontal nav to the full-screen hamburger
overlay at **≤1100px** (previously ≤768px). Also normalize the homepage hero
eyebrow to its intended 12px (`--text-xs`) through ≤1100px; desktop (≥1101px) is
unchanged. Added `.header-cta { flex-shrink: 0 }` as belt-and-suspenders.

### Reason
Measured: the full header (logo + 6 nav links + "Request a Workshop" CTA) needs
~1100px to display the CTA label. Between 769–1099px the desktop nav was showing
but flexbox shrank the CTA and `.btn { overflow: hidden }` clipped its label —
severe on iPad portrait (~800–860px), where the button was almost entirely hidden.
Raising the hamburger breakpoint means the desktop nav only appears where it fits.

### Alternatives Considered
- Hamburger only to 1024px — leaves the 1025–1099px band still clipping; rejected.
- Shrink the desktop nav to fit on tablets — nav physically needs ~1127px; cramped
  and unreliable on iPad portrait; rejected.

### Consequences
- iPad portrait + small landscape (≤1100px) use the full-screen overlay menu.
- The compact 12px hero eyebrow is now consistent from phone through tablet.
- Header eyebrow on desktop (≥1101px) intentionally left at its larger 18–20px.
- Related: [[ADR-010]] (mobile nav overlay); plan `plans/2026-06-19-mobile-responsive-fixes.md`.

---

## ADR-012 — (next decision)
_Reserved for future use._
