# Release Notes

## v2.3.0 — 2026-04-28

**Launch audit remediation + version alignment**

### Added
- `plans/2026-04-28-site-audit-remediation.md` — focused remediation record for the external launch audit
- `src/images/og-image.svg` — branded Open Graph fallback image so social metadata no longer points to a missing asset
- Early dark paint guard on all HTML pages to reduce default white first-paint flashes before the full stylesheet loads
- Internal navigation transition styling and cache-busted CSS/JS imports for the current navigation-flash investigation

### Changed
- Corrected local release history to align with GitHub's current `v2.2.0` tag
- Updated all `og:image` references from the missing JPG to the new SVG asset
- Updated `AGENTS.md` to point at the real workflow file path: `docs/workflow/claude-code-workflow.md`

### Fixed
- Missing Open Graph image asset
- Stale local documentation that still implied the latest release was `v2.1.0`

### Known Issues
- `book.html` / `contact.html` — Formspree endpoint still `REPLACE_ME` pending owner endpoint
- Internal navigation still needs final browser validation for the reported white flash before deployment

---

## v2.2.0 — 2026-04-27

**Pre-launch polish + animation pass**

### Added
- `workshops.html` — full page replacing placeholder stub: session formats, audience selector, program cards, 3-step process, CTA band
- `404.html` — branded error page with helpful nav links
- `sitemap.xml` + `robots.txt` — SEO infrastructure
- SVG favicon, Open Graph meta tags, and canonical links on all pages
- GSAP + `initAnimations()` wired to all interior pages
- Animated gradient shimmer on hero headline accent text
- Spring bounce-in entrance for process step numbers
- Header nav link entrance stagger on every page load
- Hover lift (`translateY`) on `.diff-item` and `.process-step` cards
- Icon micro-animations: scale/rotate on `.diff-icon`, scale on `.audience-icon`

### Fixed
- Broken CSS tokens (`--color-*`, `--shadow-sm/md`) on 6 interior pages — cards were invisible on dark theme
- Custom cursor disappeared on all interior pages — `initPage()` is now sole injector
- Native cursor leaked through on form elements (`input`, `textarea`, `select`)
- Mobile nav active state not highlighted on interior pages

---

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
