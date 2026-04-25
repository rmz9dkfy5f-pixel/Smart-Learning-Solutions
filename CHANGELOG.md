# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](docs/strategy/version-number-system.md).

---

## [Unreleased]

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
