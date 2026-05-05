# Release Notes

---

## v2.6.0 - 2026-05-05 - Chronicle

**Tag:** `v2.6.0__release-notes-codenames__commit-1d5b48e`

### Added
- Code name and canonical tag line to every version header in `RELEASE_NOTES.md`
- Backfilled v2.1.0 (Pulse) and v2.4.0 (Archive) entries which were missing from the release log

### Changed
- All version headers updated to include snapshot code name alongside version and date

---

## v2.5.0 - 2026-05-05 - Ledger

**Tag:** `v2.5.0__commit-notes-baseline__commit-c276b7a`

### Added
- `COMMIT_NOTES.md` — structured commit log documenting all commits on `main`: summary, description, file stats, and canonical tag per entry
- Tag reference table covering v1.0.0 through v2.4.0 in the snapshot-naming standard

---

## v2.4.0 - 2026-05-05 - Archive

**Tag:** `v2.4.0__project-docs-baseline__commit-3e0a2ee`

### Added
- `Documents/00 Core Documents/` — 11 Claude Code prompt files: run-first, repo planning, scaffolding, strategy, architecture, CLAUDE.md spec, workflow, plan template, versioning, first task, and Codex bridge
- `Documents/01 Reference Documents/` — versioning guide, doc placement reference, and full project-planning-stack template (16 doc types: ARCHITECTURE, API, DATA_MODEL, FLOWS, STATE_MODEL, TESTING, ACCESSIBILITY, PERFORMANCE, SECURITY, ROADMAP, CHANGELOG, DECISIONS, RULES, WIREFRAMES, IA, DOCUMENT_MAP)
- `Documents/03 Optional Documents/` — Codex and Claude implementation bridge
- `Documents/# Snapshot Info.md` — repo snapshot metadata
- `TASK-polish-and-seo.md` — active scoped task plan for the next site pass: analytics platform decision, SEO meta tags, favicon, SVG icons, nav fix, CSS cleanup, 404 page

---

## v2.3.0 - 2026-04-28 - Signal

**Tag:** `v2.3.0__build-version-sync__commit-c9c9c4e`

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

## v2.2.0 - 2026-04-27 - Orbit

**Tag:** `v2.2.0__hero-polish-cursor__commit-d650ed2`

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

## v2.1.0 - 2026-04-25 - Pulse

**Tag:** `v2.1.0__animation-richness__commit-01cd06d`

### Added
- Extended GSAP stagger sequences and scroll-triggered reveal coverage to all interior pages
- `workshops.html` — structured content sections with new program and audience blocks

### Changed
- Refined animation timing, easing curves, and entrance delays across the full motion system introduced in v2.0.0
- `src/js/components.js` — updated shared header with additional nav refinements

---

## v2.0.0 - 2026-04-24 - Obsidian

**Tag:** `v2.0.0__dark-redesign-gsap__commit-e8ea95f`

### Added
- `src/js/animations.js` — GSAP animation module: lerp cursor, hero word-split stagger, ScrollTrigger reveals, card batch staggers, orb parallax scrub, magnetic buttons, CTA pulse
- Custom cursor — orange dot + trailing ring; expands on hover; disabled on touch devices
- Hero background orbs — blurred radial gradients with scroll parallax
- Dot-grid texture on hero and process sections
- `gradient-text` utility — orange → cyan gradient on hero headline
- GSAP CDN (`gsap@3.12.5` + `ScrollTrigger@3.12.5`)

### Changed
- `src/css/main.css` — full rewrite: dark token system, Space Grotesk display font, glow buttons, glass header, card glow borders
- `index.html` — cursor elements, hero orbs, animation hook classes, `initAnimations()` call
- All pages — Google Fonts updated to include Space Grotesk

---

## v1.1.0 - 2026-04-24 - Blueprint

**Tag:** `v1.1.0__project-docs-infra__commit-e8b2634`

### Added
- `CLAUDE.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `DECISIONS.md`, `README.md`
- `.claude/settings.json`
- `docs/strategy/sls-project-context.md`
- `docs/workflow/claude-code-workflow.md`
- `plans/PLAN_TEMPLATE.md`, `plans/open-decisions.md`

### Removed
- `RELEASE_NOTES.md` — superseded by `CHANGELOG.md`

---

## v1.0.0 - 2026-04-24 - Foundation

**Tag:** `v1.0.0__initial-site-rebuild__commit-633602f`

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
