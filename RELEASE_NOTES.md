# Release Notes

---

## v2.12.3 - 2026-05-05 - Meridian

**Tag:** `v2.12.3__version-narrative-alignment__commit-860c1df`

### Changed
- `README.md` version line updated from `v2.3.0` to `v2.12.2`
- `ROADMAP.md` rewritten from stale `v1.x` milestone planning into a forward-looking roadmap based on the current shipped site baseline
- `RELEASE_NOTES.md` extended so the top of the file reflects the current release sequence through `v2.12.2`

### Fixed
- Version narrative drift between `README.md`, `RELEASE_NOTES.md`, the Git tags, and `ROADMAP.md`
- Stale roadmap items that still treated analytics, sitemap, robots, and workshops completion as future work

---

## v2.12.2 - 2026-05-05 - Chronicle

**Tag:** `v2.12.2__commit-history-backfill__commit-545016b`

### Added
- Missing commit-log entries for `v2.12.1` and the untagged `619becc` history-maintenance commit added to `COMMIT_NOTES.md`

### Changed
- `COMMIT_NOTES.md` tag reference table refreshed through `v2.12.2`

### Fixed
- The structured commit backlog no longer skipped past commits that existed in Git history but were absent from `COMMIT_NOTES.md`

---

## v2.12.1 - 2026-05-05 - Compass

**Tag:** `v2.12.1__release-record-sync__commit-541f575`

### Added
- `RELEASE_NOTES.md` entry for the `v2.12.0` Beacon release
- Missing `v2.11.0` release-note entry so the file reflects the actual tagged history

### Changed
- `COMMIT_NOTES.md` updated to record `v2.12.0` using the real tagged commit hash

### Fixed
- Release-tracking docs no longer depended on placeholder or lagging hash references for `v2.12.0`

---

## v2.12.0 - 2026-05-05 - Beacon

**Tag:** `v2.12.0__polish-seo-analytics__commit-6c9a427`

### Added
- Sitewide Plausible analytics injected from `src/js/components.js`, tracking both `smartlearningsolutions.org` and `www.smartlearningsolutions.org`
- `twitter:card` metadata on all public pages
- `plans/2026-05-06-polish-and-seo.md` — execution plan for the final polish, SEO, and analytics pass

### Changed
- `sitemap.xml` refreshed to `2026-05-06` and priorities aligned with the active SEO task plan
- `404.html` recovery actions simplified to Home and Request a Workshop
- `plans/open-decisions.md` — OD-006 resolved for Plausible analytics

### Fixed
- Sitewide analytics was still missing despite the SEO and polish pass already being in place
- Social card coverage was incomplete because public pages were missing the Twitter summary card tag

---

## v2.11.0 - 2026-05-05 - Current

**Tag:** `v2.11.0__release-notes-current__commit-ecb25ab`

### Added
- `RELEASE_NOTES.md` entries for v2.7.0 through v2.10.0 so the release log matches the current tagged history

### Fixed
- Stale pre-rewrite hashes on the v2.4.0, v2.5.0, and v2.6.0 tag lines in `RELEASE_NOTES.md`

---

## v2.10.0 - 2026-05-05 - Index

**Tag:** `v2.10.0__commit-notes-current__commit-3977f77`

### Added
- `COMMIT_NOTES.md` — v2.7.0, v2.8.0, and v2.9.0 entries backlogged with full summary, description, and stats

### Fixed
- Stale pre-rewrite commit hashes corrected for v2.4.0, v2.5.0, and v2.6.0 entries and tag reference table in `COMMIT_NOTES.md`

---

## v2.9.0 - 2026-05-05 - Anchor

**Tag:** `v2.9.0__docs-scaffold-aligned__commit-b0a13f2`

### Changed
- `CHANGELOG.md` — fixed broken versioning link (`docs/strategy/version-number-system.md` → `docs/VERSIONING.md`); added [2.8.0] entry covering all 19 scaffold files and alignment findings
- `plans/open-decisions.md` — OD-007 (Testimonials) added; trust signal section flagged as needing real quotes; fabrication prohibited
- `plans/2026-05-05-initial-project-docs.md` — Slices 2–4 marked complete

### Fixed
- Broken link in `CHANGELOG.md` pointing to a versioning file that does not exist

---

## v2.8.0 - 2026-05-05 - Atlas

**Tag:** `v2.8.0__docs-scaffold-complete__commit-cb62d55`

### Added
- `docs/STRATEGY.md` — structured business strategy: goals, audiences, value proposition, CTA rules, claims policy, brand direction, constraints, non-negotiables, open questions
- `docs/DESIGN.md` — design system rules: token policy, typography, colour, component patterns, GSAP animation guidelines, responsive rules, iconography
- `docs/CONTENT.md` — copy rules: tone, voice, CTA strategy, program names, claims policy, audience framing, metadata standards, placeholder policy
- `docs/ACCESSIBILITY.md` — WCAG 2.1 AA expectations: semantic HTML, keyboard nav, focus management, ARIA usage, form error handling, motion rules
- `docs/PERFORMANCE.md` — asset loading rules, third-party script policy, critical rendering, image rules, known risks
- `docs/TESTING.md` — manual QA checklist: pre-commit, per-component, cross-browser, responsive, accessibility spot checks
- `docs/DEPLOYMENT.md` — deploy process, pre-deploy checklist, hosting options, local dev requirements, rollback procedure
- `docs/VERSIONING.md` — semver definitions, tag naming standard, release code name conventions, agent rules
- `REPO_PLANNING.md` — repo strategy, documentation philosophy, source-of-truth map, file tree, duplicate prevention rules, agent execution rules
- `CONTRIBUTING.md` — contributor guide with SLS-specific constraints
- `.env.example` — documents that no server-side env vars exist; notes `REPLACE_ME` Formspree endpoint location
- `design/README.md`, `design/wireframes/README.md`, `design/references/README.md` — design asset folder structure
- `sample-data/README.md` — placeholder for dev sample content
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist with SLS-specific content and nav rules
- `.github/ISSUE_TEMPLATE.md` — issue form with type, priority, and reproduction steps
- `plans/2026-05-05-initial-project-docs.md` — task plan for scaffolding work

### Changed
- `.gitignore` — added `!.env.example` exception so the template file is tracked

---

## v2.7.0 - 2026-05-05 - Reform

**Tag:** `v2.7.0__release-notes-reform__commit-2600d9d`

### Changed
- `RELEASE_NOTES.md` — all version headers rewritten to `vX.Y.Z - YYYY-MM-DD - CodeName` format; slug-style code names replaced with single proper-word names across all 9 versions; v2.5.0 (Ledger) and v2.6.0 (Chronicle) entries added; redundant bold sub-headers removed

---

## v2.6.0 - 2026-05-05 - Chronicle

**Tag:** `v2.6.0__release-notes-codenames__commit-b3f3bf3`

### Added
- Code name and canonical tag line to every version header in `RELEASE_NOTES.md`
- Backfilled v2.1.0 (Pulse) and v2.4.0 (Archive) entries which were missing from the release log

### Changed
- All version headers updated to include snapshot code name alongside version and date

---

## v2.5.0 - 2026-05-05 - Ledger

**Tag:** `v2.5.0__commit-notes-baseline__commit-d19389d`

### Added
- `COMMIT_NOTES.md` — structured commit log documenting all commits on `main`: summary, description, file stats, and canonical tag per entry
- Tag reference table covering v1.0.0 through v2.4.0 in the snapshot-naming standard

---

## v2.4.0 - 2026-05-05 - Archive

**Tag:** `v2.4.0__project-docs-baseline__commit-9e87d2b`

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
