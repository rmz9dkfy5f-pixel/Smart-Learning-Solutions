# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](docs/strategy/version-number-system.md).

---

## [Unreleased]

---

## [2.3.0] — 2026-04-28

### Summary
Launch audit remediation and version alignment. Aligns local documentation with GitHub's current `v2.2.0` release, adds a real Open Graph fallback image, corrects a workflow-doc path mismatch, and records the current navigation first-paint investigation.

### Added
- `plans/2026-04-28-site-audit-remediation.md` — Audit remediation plan and validation notes
- `src/images/og-image.svg` — Branded social preview fallback asset
- Early inline dark paint guard on all HTML pages
- Page transition overlay styles in `src/css/main.css` for internal navigation testing

### Changed
- `README.md` version updated to `v2.3.0`
- Existing pre-launch polish release corrected from `2.1.0` to `2.2.0` to match GitHub
- All page `og:image` references now point to `/src/images/og-image.svg`
- All page stylesheet/module query strings bumped for cache refresh during local validation
- `AGENTS.md` canonical workflow file reference corrected to `docs/workflow/claude-code-workflow.md`

### Fixed
- Missing Open Graph asset path that would have produced a 404
- Stale local version docs that did not match the GitHub release history

### Known Issues
- `book.html` / `contact.html` — Formspree endpoint still `REPLACE_ME` (OD-001 open)
- Internal navigation white flash is still under investigation and should be resolved before deploy

---

## [2.2.0] — 2026-04-27

### Summary
Pre-launch polish pass. Fixes broken CSS tokens on interior pages, wires GSAP animations to all pages, adds SEO infrastructure, completes the workshops page, and enriches hover and entrance animations across the site.

### Added
- `workshops.html` — Full page replacing placeholder stub: session formats, audience cards, program selector, 3-step process, CTA band
- `404.html` — Branded error page with helpful navigation links
- `sitemap.xml` — All 8 pages listed with priorities and change frequency
- `robots.txt` — Crawler permissions with sitemap reference
- SVG favicon (data-URI) on all pages
- Open Graph meta tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`) on all pages
- Canonical `<link>` tags on all pages
- GSAP + `initAnimations()` added to all interior pages (`workshops.html`, `programs/`, `resources.html`, `about.html`, `book.html`, `contact.html`)
- Page-hero entrance animation (eyebrow → h1 → p stagger) on all interior pages
- Footer column reveal animations on all pages
- CTA band content reveal animations on all pages
- Program card tag stagger animations
- Animated gradient shimmer on `.gradient-text` (`gradientShift` keyframe, 6s loop)
- Spring bounce-in entrance for `.step-number` elements (`back.out(1.7)` ease)
- Header nav link entrance stagger on every page load

### Changed
- `.diff-item:hover` — upgraded from border-only to `translateY(-4px)` + shadow + icon scale/rotate
- `.process-step:hover` — upgraded from border-only to `translateY(-4px)` + shadow
- `.audience-icon` — micro-scale on parent hover
- `src/js/components.js` — `initPage()` now injects `#cursor`/`#cursor-follower` on all pages (single source of truth)
- Mobile nav active state now highlights the current page
- Emoji icons replaced with inline SVGs in `index.html`, `about.html`, `resources.html`

### Fixed
- Broken CSS tokens (`--color-*`, `--shadow-sm`, `--shadow-md`) on 6 interior pages — cards were invisible on dark theme
- Custom cursor disappeared on all interior pages
- Native cursor leaked through on `input`, `textarea`, `select` form elements
- Hardcoded cursor divs removed from `index.html` — `initPage()` is now sole injector

### Known Placeholders
- `book.html` / `contact.html` — Formspree endpoint still `REPLACE_ME` (OD-001 open)
- `src/images/` — photography not yet added; og:image URL will 404 until resolved

---

## [2.0.0] — 2026-04-24

### Summary
Complete visual overhaul to a dark dramatic aesthetic paired with a production-grade GSAP animation system. No content or structure changes — purely design and motion.

### Added
- `src/js/animations.js` — GSAP animation module: lerp cursor with follower ring, hero word-split stagger on load, ScrollTrigger section reveals, `ScrollTrigger.batch()` card staggers, hero orb parallax scrub, magnetic button effect with elastic spring-back, CTA band orb pulse
- Custom cursor (`#cursor` + `#cursor-follower`) — orange dot + trailing ring; expands on interactive element hover; disabled on touch devices
- Hero background orbs (`.orb-1`, `.orb-2`, `.orb-3`) — blurred radial gradients with scroll parallax
- Dot-grid texture on hero and process sections
- `gradient-text` utility — orange → cyan gradient on hero headline accent word
- GSAP CDN scripts (`gsap@3.12.5` + `ScrollTrigger@3.12.5`) added to `index.html`

### Changed
- `src/css/main.css` — Full rewrite: dark token system (`#060A14` base, glass cards, glow borders), Space Grotesk display font, eyebrow line-rule treatment, glow button variants with `box-shadow`, backdrop-filter glass header
- `index.html` — Animation hook classes (`reveal-up`, `stagger-card`), cursor DOM elements, `initAnimations()` call
- All pages — Google Fonts updated to include Space Grotesk alongside Inter

---

## [1.1.0] — 2026-04-24

### Summary
Project documentation infrastructure scaffolded from planning documents. Gives the repo a durable operating structure so every future session starts from a clear, documented state.

### Added
- `CLAUDE.md` — Claude Code operating guide: canonical structure, confirmed decisions, content rules, guardrails, definition of done
- `ARCHITECTURE.md` — Tech stack, ES module header/footer pattern, routing table, form handling, deployment model
- `ROADMAP.md` — Milestone plan v1.1 through v1.4, blockers, and deferred items
- `DECISIONS.md` — Full ADR log for all seven confirmed decisions
- `README.md` — Project overview, stack, local dev instructions, file structure
- `.claude/settings.json` — Harness settings: `planModeDefault: true`, denyList for secrets
- `docs/strategy/sls-project-context.md` — Business context, audience definitions, credentials, offerings, constraints
- `docs/workflow/claude-code-workflow.md` — Workflow rules, slice standard, key technical rules, verification checklist
- `plans/PLAN_TEMPLATE.md` — Reusable task plan template
- `plans/open-decisions.md` — Six open decisions pending owner input (Formspree, imagery, deployment, workshops content, social links, analytics)

### Removed
- `RELEASE_NOTES.md` — superseded by `CHANGELOG.md`

---

## [1.0.0] — 2026-04-24 — Foundation

### Summary
Initial rebuild of smartlearningsolutions.org as a hand-coded static marketing site. Primary goal: workshop booking conversion. Eliminates three broken 404 pages and replaces a weak, template-like design with a focused, premium experience.

### Added
- `index.html` — Full 11-section homepage: hero, trust strip, program cards (Coding with Robots / PSTEM), audience selector, 3-step process, outcomes grid, sample activities, differentiators, booking CTA band, footer
- `workshops.html` — Workshops overview page (shell; full content pending)
- `programs/coding-with-robots.html` — Edison platform program page with all 4 coding levels (Barcode → EdBlocks → EdScratch → EdPy)
- `programs/pstem.html` — PSTEM program page with all 10 Whybricks investigation modules
- `resources.html` — Resources page (replaces old Downloads page; repackaged as conversion support)
- `about.html` — About page with credentials, partnership info, and team description
- `book.html` — Dedicated workshop enquiry form (Formspree-ready); fields: name, email, phone, program, group size, age range, preferred dates, location, message
- `contact.html` — Contact page with direct phone/email links and simple message form
- `src/css/main.css` — Full design system: colour tokens, type scale, spacing grid, button variants, all component styles, responsive breakpoints
- `src/js/components.js` — Shared header and footer injected via ES module on every page; includes sticky header scroll behaviour and mobile nav toggle

### Removed
- Navigation items: Order, Curriculum, Professional Development (all dead or empty)

### Fixed
- Three broken 404 pages eliminated from navigation
- Copyright updated from 2021 to current year
- Navigation reduced from 8+ items (with dead links) to 7 clean, working links

### Known Placeholders
- `book.html` — Formspree action URL contains `REPLACE_ME` placeholder
- `contact.html` — Formspree action URL contains `REPLACE_ME` placeholder
- `src/images/` — Empty; hero image and photography not yet added
- `workshops.html` — Placeholder shell; full page content not yet written
