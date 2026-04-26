# Release Notes

## v2.0.0 — 2026-04-24

### Summary
Significant redesign. Complete visual overhaul to a dark dramatic aesthetic with a production-grade GSAP animation system. No content or structural changes — design and motion only.

---

### Added
- `src/js/animations.js` — GSAP animation module: lerp cursor, hero word-split stagger, ScrollTrigger reveals, card batch staggers, orb parallax scrub, magnetic buttons, CTA pulse
- Custom cursor — orange dot + trailing ring; expands on hover; disabled on touch devices
- Hero background orbs — blurred radial gradients with scroll parallax
- Dot-grid texture on hero and process sections
- `gradient-text` utility — orange → cyan gradient on hero headline
- GSAP CDN (`gsap@3.12.5` + `ScrollTrigger@3.12.5`)

### Changed
- `src/css/main.css` — Full rewrite: dark token system, Space Grotesk display font, glow buttons, glass header, card glow borders
- `index.html` — Cursor elements, hero orbs, animation hook classes, `initAnimations()` call
- All pages — Google Fonts updated to include Space Grotesk

---

## v1.1.0 — 2026-04-24

### Summary
Project documentation infrastructure scaffolded from planning documents.

### Added
- `CLAUDE.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `DECISIONS.md`, `README.md`
- `.claude/settings.json`
- `docs/strategy/sls-project-context.md`
- `docs/workflow/claude-code-workflow.md`
- `plans/PLAN_TEMPLATE.md`, `plans/open-decisions.md`

### Removed
- `RELEASE_NOTES.md` — superseded by `CHANGELOG.md`

---

## v1.0.0 — 2026-04-24 — Foundation

### Summary
Initial rebuild of smartlearningsolutions.org as a hand-coded static marketing site.

### Added
- Full 8-page site: Home, Workshops, Programs (×2), Resources, About, Book, Contact
- `src/css/main.css` — design system
- `src/js/components.js` — shared header + footer

### Fixed
- Three broken 404 pages removed from navigation
- Copyright updated from 2021 to current year
- Navigation reduced from 8+ dead-link items to 7 clean links

### Known Placeholders
- `book.html` / `contact.html` — Formspree `REPLACE_ME` pending
- `src/images/` — hero photography not yet added
- `workshops.html` — placeholder shell
