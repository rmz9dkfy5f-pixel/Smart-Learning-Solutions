# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](docs/VERSIONING.md).

---

## [Unreleased]

---

## [2.18.0] — 2026-06-19

**Tag:** `v2.18.0__mobile-responsive-fixes__commit-ca43fb2` (code) — see COMMIT_NOTES for docs commit hash

### Summary
Four-slice mobile responsive fix pass across all 10 pages. Full-screen nav overlay, hamburger breakpoint raised to ≤1100px, program hero photo crop and radius fixes, eyebrow font-size specificity fix, and CTA button colour fix inside the mobile nav.

### Fixed
- Mobile nav converted from content-height dropdown to `inset: 0` full-screen overlay (solid `--bg` background) — page content no longer bleeds through the open menu
- Header bar is opaque while the mobile overlay is open (`body.nav-open .site-header` rule)
- Mobile nav CTA button text kept white — `.mobile-nav a` muted-grey override was out-specificing `.btn--primary` white
- Hamburger breakpoint raised from ≤768px to ≤1100px — the full desktop header (logo + 6 links + CTA) was being squished to near zero on iPad portrait (800–860px); CTA now hidden and hamburger shown where the full nav doesn't fit
- `header-cta { flex-shrink: 0 }` — belt-and-suspenders against CTA label clipping at intermediate widths
- Homepage hero eyebrow label fixed to 12px (`--text-xs`) through ≤1100px — `.hero-content p` rule (16px) was beating `.eyebrow` base rule due to specificity; fixed with `.hero-content .eyebrow` (0,2,0)
- Program page proof photos: radius unified to `--radius-lg`, `object-position` recentered to `center center`, fixed `180px` height replaced with `aspect-ratio: 16/10` at ≤768px — subjects no longer decapitated
- Section-break photo strip: same pattern — `object-position: center center` + `aspect-ratio: 16/9` at ≤768px

### Changed
- `main.css`: all layout/style fixes above; cache token `?v=mobile-20260619c`
- `components.js`: `closeNav()` helper; closes on link tap, Escape, and `pageshow`; scroll-lock resets
- All 10 HTML files: cache token bumped to `?v=mobile-20260619c`
- `DECISION_LOG.md`: ADR-010 (nav overlay) and ADR-011 (1100px breakpoint) added

---

## [2.17.0] — 2026-06-17

**Tag:** `v2.17.0`

### Summary
Full production-readiness audit completed and documented for cross-machine access.

### Added
- `plans/2026-06-17-website-status-audit.md` — structured production-readiness audit covering all 10 pages, shared chrome, planning system, deployment/infra, and Gate 1 launch blockers

---

## [2.16.1] — 2026-06-17

**Tag:** `v2.16.1`

### Summary
Fix nginx routing on VPS: clean URLs now resolve without `.html` extension; custom 404 page now served.

### Fixed
- nginx `try_files` updated to include `$uri.html` — clean URLs like `/workshops` and `/about` now return 200 without requiring the `.html` extension
- `error_page 404 /404.html` added to nginx config — custom 404 page now served instead of nginx default

### Added
- SSH public key added to VPS (74.208.9.49) for direct deployment access
- `docs/debug/nginx-404-debug.md` — documents nginx 404 root cause, fix, and verification

---

## [2.16.0] — 2026-06-16

**Tag:** `v2.16.0`

### Summary
Add project starter kit v3.3 reference library and push workflow prompt files. No site code changed.

### Added
- `project-starter-kit-v3.3/` — full v3.3 starter kit library (root files + quality gates subdirectory)
- `prompts/repo_push_handoff_snapshot_tag_prompt.md` — push/handoff/snapshot/tag workflow prompt
- `prompts/_repo_push_handoff_snapshot_tag_prompt_post_check.md` — post-check verification prompt

---

## [2.15.1] — 2026-05-22

**Tag:** `v2.15.1`

### Summary
Correct v2.15.0 commit hash reference in release records after amend shifted the hash.

### Changed
- `COMMIT_NOTES.md` — updated v2.15.0 commit hash to `b192aff`
- `PROGRESS_NOTE.md` — updated v2.15.0 commit hash to `b192aff`
- `PROGRESS_NOTES.md` — updated v2.15.0 commit hash to `b192aff`

---

## [2.15.0] — 2026-05-22

**Tag:** `v2.15.0`

### Summary
Sync all release documentation to v2.15.0. Switch tag format from verbose slug
style to clean semver (`vX.Y.Z`).

### Changed
- `CHANGELOG.md` — added v2.15.0 entry
- `RELEASE_NOTES.md` — added v2.15.0 entry
- `COMMIT_NOTES.md` — added v2.15.0 entry
- `PROGRESS_NOTE.md` — updated for current session
- `PROGRESS_NOTES.md` — appended v2.15.0 cumulative entry
- `ROADMAP.md` — added tag format cleanup to Completed

---

## [2.14.8] — 2026-05-16

**Tag:** `v2.14.8__prompts-update-file-list__commit-cc88cfd`

### Summary
Update the release-documentation workflow prompt so it names both progress-note files expected by the documentation sync process.

### Changed
- `prompts/Update.md` — file list now includes both `PROGRESS_NOTE.md` and `PROGRESS_NOTES.md`

---

## [2.14.7] — 2026-05-16

**Tag:** `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-894bc72`

### Summary
Sync all release documentation with entries for v2.14.4 through v2.14.7.

### Changed
- `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — synced to v2.14.7
- `PROGRESS_NOTE.md` — updated to v2.14.7
- `ROADMAP.md` — CONTEXT.md and STATUS.md creation added to Completed section

---

## [2.14.6] — 2026-05-16

**Tag:** `v2.14.6__session-progress-note__commit-431f540`

### Summary
Session log for the v2.14.3–v2.14.5 work block.

### Changed
- `PROGRESS_NOTE.md` — structured session log: tasks, commits, tags, files, next milestone

---

## [2.14.5] — 2026-05-15

**Tag:** `v2.14.5__context-and-status-docs__commit-c4a7d9d`

### Summary
Add root-level reference files: stable background (CONTEXT.md) and present state (STATUS.md).

### Added
- `CONTEXT.md` — project identity, programs, audiences, decisions, tech stack, architecture
- `STATUS.md` — current version, done list, blockers, audit findings, next actions

---

## [2.14.4] — 2026-05-15

**Tag:** `v2.14.4__ignore-claude-local-settings__commit-1055fd7`

### Summary
Stop tracking Claude Code local settings in git.

### Changed
- `.gitignore` — `.claude/` directory added

---

## [2.14.3] — 2026-05-15

**Tag:** `v2.14.3__audit-doc-and-docs-sync__commit-f8f8028`

### Summary
Add full site audit document and sync all release docs to v2.14.3.

### Added
- `AUDIT.md` — full diagnostic audit: 2 critical, 4 high, 9 medium, 6 low,
  4 unverified findings across all 10 pages, JS, CSS, sitemap, and robots.txt

### Changed
- `prompts/Update.md` — snapshot instruction added; trailing newline fixed
- `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — synced to v2.14.3
- `PROGRESS_NOTE.md` — updated to v2.14.3
- `ROADMAP.md` — audit added to Completed section

---

## [2.14.2] — 2026-05-15

**Tag:** `v2.14.2__docs-current-to-v2-14-1__commit-179f16a`

### Summary
Sync all release documentation with the full tagged history through v2.14.1.

### Changed
- `RELEASE_NOTES.md` — v2.13.6–v2.14.1 entries added
- `COMMIT_NOTES.md` — v2.12.7–v2.14.1 entries and tag table rows added
- `CHANGELOG.md` — v2.13.7–v2.14.1 entries added
- `ROADMAP.md` — Completed section added; resolved blockers removed
- `PROGRESS_NOTE.md` — created as current-state snapshot

---

## [2.14.1] — 2026-05-15

**Tag:** `v2.14.1__prompts-workflow-templates__commit-9457ab9`

### Summary
Add `prompts/` directory with three saved workflow instruction files for
commit, update, and snapshot tasks.

### Added
- `prompts/Commit notes` — GitHub commit-style notes workflow prompt
- `prompts/Update.md` — release docs update workflow prompt
- `prompts/Snapshot` — repo snapshot workflow prompt

---

## [2.14.0] — 2026-05-15

**Tag:** `v2.14.0__programs-launch-site-hardening__commit-fcdfda6`

### Summary
Launch `/programs/` as a proper landing page, harden both booking forms,
fix custom cursor for non-mouse devices, and fix same-page hash navigation overlay.

### Added
- `programs/index.html` — Programs landing page at `/programs/`
- `sitemap.xml` — `/programs/` entry (priority 0.9)

### Changed
- `src/js/components.js` — nav → `/programs/`; same-page hash links skip overlay
- `src/js/animations.js` — cursor gated on `.custom-cursor-enabled` (fine pointer only)
- `src/css/main.css` — `cursor: none` moved to `.custom-cursor-enabled` class
- `book.html` / `contact.html` — `novalidate` removed; `maxlength` added; placeholder endpoint blocked
- `docs/DEPLOYMENT.md` — security headers, staging noindex, expanded checklist
- `docs/TESTING.md` — Programs nav, CDN fallback, form validation, staging header checks

---

## [2.13.7] — 2026-05-07

**Tag:** `v2.13.7__changelog-backfill__commit-aaa3399`

### Summary
Changelog backfill — all missing entries v2.1.0–v2.13.6 added.

### Changed
- `CHANGELOG.md` — all missing entries added

---

## [2.13.6] — 2026-05-07

**Tag:** `v2.13.6__release-notes-v2-13__commit-ca9beb7`

### Summary
Release notes documentation for the full v2.13.x photo-driven redesign block. Adds six entries (Gallery → Overlay → Exposure → Portrait → Depth → Frame) to RELEASE_NOTES.md so the release log matches the tagged history.

### Added
- `RELEASE_NOTES.md` — v2.13.0 through v2.13.5 entries with canonical tag hashes, Changed/Added sections, and photography-themed code names

---

## [2.13.5] — 2026-05-07

**Tag:** `v2.13.5__workshops-photo-cards__commit-b5fa45e`

### Summary
Photo-layered format and audience cards on the Workshops page, completing the sitewide photo-driven redesign.

### Changed
- Format cards: `.format-card-photo-bg` elements at 9% opacity (15% on hover) — Half-Day uses `people-children-thinking.webp`, Full-Day uses `people-classroom-teacher-children-800.webp`, Programme Series uses `people-teens-outdoor-tutoring.webp`
- Audience cards: `.audience-photo-bg` low-opacity treatment consistent with homepage
- CTA band: photo background added consistent with all other pages

---

## [2.13.4] — 2026-05-07

**Tag:** `v2.13.4__program-pages-photography__commit-d19873c`

### Summary
Student proof photography on both program detail pages, which previously showed only a single product shot each.

### Changed
- **Coding with Robots** (`programs/coding-with-robots.html`): hero media column stacks a student proof photo below the Edison robot product shot; full-width photo section break added above the levels grid; CTA band gains photo background
- **PSTEM** (`programs/pstem.html`): hero media column stacks a focused-student photo below the Whybricks product shot; "Learning That Starts With Why?" restructured as a two-column grid with children-thinking photo alongside the copy; CTA band gains photo background

---

## [2.13.3] — 2026-05-07

**Tag:** `v2.13.3__about-photo-redesign__commit-56fc29d`

### Summary
About page redesigned from a text-only page to a visually credible split-panel layout with photographic credential cards.

### Added
- New three-column "What We Bring" visual proof strip — Real Engineers & Educators / Industry-Recognised Equipment / Genuine STEM Confidence — each column a photo with overlay caption

### Changed
- Hero: replaced plain text block with split-panel layout — narrative text left, full-height classroom photo right with left-edge gradient feathering
- All four credential cards restructured to lead with a photo header (product shots for platform cards, people photos for team and reach cards)
- CTA band: photo background added consistent with other pages

---

## [2.13.2] — 2026-05-07

**Tag:** `v2.13.2__homepage-photo-redesign__commit-1f44b7f`

### Summary
Homepage hero and supporting sections redesigned around photography — replacing the CSS illustration with a full-bleed classroom photo and adding social proof throughout.

### Added
- New "Real Workshops. Real Students." four-photo mosaic section before the activities grid — primary social proof moment
- Trust strip: Edison and Whybricks items now display `.trust-item-thumb` product image thumbnails instead of generic SVG icons

### Changed
- Hero: CSS illustration replaced with full-bleed classroom photo; dark gradient overlay; Pexels photo credit strip added
- Program cards: student-in-use proof photo strip added below each product shot
- Audience cards: low-opacity photo backgrounds — each segment (Parents, Schools, Community) shows relevant students
- Differentiators section replaced with a three-photo visual proof band (Expert-Led / Hands-On / Engaged)
- CTA band: classroom photo background with orange radial gradient overlay

---

## [2.13.1] — 2026-05-07

**Tag:** `v2.13.1__photo-css-utilities__commit-251e80e`

### Summary
Design system extended with new photo composition utility classes required by the photo-driven redesign across all pages.

### Added
- `src/css/main.css` — new utility classes: `.hero--photo`, `.hero-photo-bg`, `.split-hero`, `.page-hero-media-stack`, `.page-hero-proof-photo`, `.pstem-approach-grid`, `.photo-proof-grid`, `.photo-proof-item`, `.photo-proof-caption`, `.photo-mosaic`, `.photo-mosaic-item--large`, `.photo-mosaic-footer`, `.audience-photo-bg`, `.program-card-proof`, `.format-card-photo-bg`, `.cta-band-photo-bg`, `.about-proof-grid`, `.about-proof-item`, `.about-proof-caption`, `.credential-item--photo`, `.credential-photo`, `.credential-item-body`, `.trust-item-thumb`, `.program-section-break`
- Responsive overrides at 1024px, 768px, and 480px breakpoints for all new components

---

## [2.13.0] — 2026-05-07

**Tag:** `v2.13.0__webp-photo-library__commit-7754187`

### Summary
Optimised WebP photo library added to `src/images/` — 11 images sourced from Pexels and one Edison product shot, forming the asset layer for the entire photo-driven redesign.

### Added
- `src/images/people-classroom-teacher-children-1920.webp` — hero photo, 1920px wide, 158 KB
- `src/images/people-classroom-teacher-children-800.webp` — hero photo, 800px srcset fallback, 41 KB
- `src/images/people-classroom-hands-raised.webp`, `people-children-floor-activity.webp`, `people-children-thinking.webp`, `people-teens-collaborating.webp`, `people-teens-outdoor-study.webp`, `people-teens-outdoor-tutoring.webp`, `people-teens-studying-focused.webp`, `people-teens-studying-together.webp` — supporting images, all under 100 KB
- `src/images/product-edison-robot.webp` — Edison robot product image, 31 KB
- `.imgtemp/` added to `.gitignore` to exclude temporary Sharp conversion artefacts

---

## [2.12.9] — 2026-05-07

**Tag:** `v2.12.9__planning-doc-extensions__commit-e4b9855`

### Summary
Planning document filenames normalised from stray `.txt` extensions to clean `.md` Markdown extensions.

### Changed
- `Planning Documents/` — 10 files renamed to `.md`: Acceptance Criteria, Component Map, Constraints, Homepage wireframe, IA sitemap, Implementation Roadmap, Recommended minimal docs, Technical Architecture, UX Content Model (content unchanged in all files)

---

## [2.12.8] — 2026-05-07

**Tag:** `v2.12.8__reference-doc-filename__commit-3bc8887`

### Changed
- `Planning Documents/` — "Recommended minimal docs and where to place them" reference file renamed to remove stray colon and extra spacing from filename (content unchanged)

---

## [2.12.7] — 2026-05-06

**Tag:** `v2.12.7__release-record-sync__commit-67cad9f`

### Changed
- `RELEASE_NOTES.md` — v2.12.6 tag reference updated from provisional to real annotated tag hash
- `CHANGELOG.md` — v2.12.6 tag reference corrected to match

### Added
- `COMMIT_NOTES.md` — v2.12.6 entry added with full summary, description, and file stats using the real commit hash

---

## [2.12.6] — 2026-05-06

**Tag:** `v2.12.6__program-prominence-visuals__commit-7edcdfc`

### Summary
Program prominence and live asset placement pass for the two flagship offerings. Makes Coding with Robots and PSTEM easier to find across the site, adds selected Edison and Whybricks visuals to live site assets, and points shared Programs navigation to a neutral program selector.

### Added
- `src/images/program-coding-edison.jpg` — Edison robot image for Coding with Robots cards and hero
- `src/images/program-pstem-whybricks.avif` — Whybricks kit image for PSTEM cards and hero
- `plans/2026-05-06-program-prominence-assets.md` — approved implementation plan for program prominence and asset placement

### Changed
- Homepage and workshops program cards now include program-specific visuals
- Coding with Robots and PSTEM program page heroes now include product visuals
- Shared Programs navigation now targets `/workshops.html#programs`

---

## [2.12.5] — 2026-05-05

**Tag:** `v2.12.5__source-image-library__commit-3e445a0`

### Summary
Curated source image library added to `pics/` — Edison, Whybricks, Logo, and 20 Pexels workshop photography references staged for future site imagery work.

### Added
- `pics/Edison/` — 10 Edison robotics platform reference images
- `pics/Whybricks/` — 2 Whybricks PSTEM platform images (AVIF)
- `pics/Logo/` — Logo asset (AVIF)
- `pics/` — 20 curated Pexels STEM workshop photography references (students, educators, hands-on science and coding scenes)

---

## [2.12.4] — 2026-05-05

**Tag:** `v2.12.4__release-notes-v2-12-3__commit-b8c246a`

### Added
- `RELEASE_NOTES.md` — v2.12.3 entry added using the real tag and commit hash

---

## [2.12.3] — 2026-05-05

**Tag:** `v2.12.3__version-narrative-alignment__commit-860c1df`

### Changed
- `README.md` — version line updated from `v2.3.0` to `v2.12.2`
- `ROADMAP.md` — rewritten from stale v1.x milestone planning into a forward-looking roadmap from the current shipped baseline
- `RELEASE_NOTES.md` — extended to reflect the current release sequence through v2.12.2

### Fixed
- Version narrative drift between `README.md`, `RELEASE_NOTES.md`, Git tags, and `ROADMAP.md`
- Stale roadmap items treating analytics, sitemap, and workshops as future work

---

## [2.12.2] — 2026-05-05

**Tag:** `v2.12.2__commit-history-backfill__commit-545016b`

### Added
- `COMMIT_NOTES.md` — missing entries for v2.12.1 and untagged commit `619becc`

### Changed
- `COMMIT_NOTES.md` — tag reference table refreshed through v2.12.2

### Fixed
- Structured commit backlog no longer skipped commits present in Git history but absent from `COMMIT_NOTES.md`

---

## [2.12.1] — 2026-05-05

**Tag:** `v2.12.1__release-record-sync__commit-541f575`

### Added
- `RELEASE_NOTES.md` — entries for v2.12.0 (Beacon) and v2.11.0 (Current)

### Changed
- `COMMIT_NOTES.md` — v2.12.0 recorded using the real tagged commit hash

### Fixed
- Release-tracking docs no longer depended on placeholder hash references for v2.12.0

---

## [2.12.0] — 2026-05-06

**Tag:** `v2.12.0__polish-seo-analytics__commit-6c9a427`

### Summary
Final polish, SEO, and analytics pass for the static marketing site. Adds sitewide Plausible analytics, completes social card metadata coverage, refreshes sitemap metadata, tightens the 404 recovery path, and records the analytics decision in project planning docs.

### Added
- `plans/2026-05-06-polish-and-seo.md` — execution plan for the final polish, SEO, and analytics pass
- Plausible analytics injected sitewide from `src/js/components.js`, tracking both `smartlearningsolutions.org` and `www.smartlearningsolutions.org`
- Twitter summary card metadata on all public pages

### Changed
- `sitemap.xml` `lastmod` values refreshed to `2026-05-06` and priorities aligned with `TASK-polish-and-seo.md`
- `404.html` recovery actions simplified to Home and Request a Workshop
- `plans/open-decisions.md` — OD-006 marked resolved for Plausible analytics

---

## [2.11.0] — 2026-05-05

**Tag:** `v2.11.0__release-notes-current__commit-ecb25ab`

### Added
- `RELEASE_NOTES.md` — entries for v2.7.0 through v2.10.0

### Fixed
- Stale pre-rewrite hashes on v2.4.0, v2.5.0, and v2.6.0 tag lines in `RELEASE_NOTES.md`

---

## [2.10.0] — 2026-05-05

**Tag:** `v2.10.0__commit-notes-current__commit-3977f77`

### Added
- `COMMIT_NOTES.md` — v2.7.0, v2.8.0, and v2.9.0 entries backlogged with full summary, description, and stats

### Fixed
- Stale pre-rewrite commit hashes corrected for v2.4.0, v2.5.0, and v2.6.0 entries and the tag reference table in `COMMIT_NOTES.md`

---

## [2.9.0] — 2026-05-05

**Tag:** `v2.9.0__docs-scaffold-aligned__commit-b0a13f2`

### Changed
- `CHANGELOG.md` — fixed broken versioning link (`docs/strategy/version-number-system.md` → `docs/VERSIONING.md`); added [2.8.0] entry
- `plans/open-decisions.md` — OD-007 (Testimonials) added
- `plans/2026-05-05-initial-project-docs.md` — Slices 2–4 marked complete

### Fixed
- Broken link in `CHANGELOG.md` pointing to a non-existent versioning file

---

## [2.8.0] — 2026-05-05

**Tag:** `v2.8.0__docs-scaffold-complete__commit-cb62d55`

### Summary
Full project documentation library scaffolded via `Documents/00 Core Documents/00_RUN_FIRST.md`. Establishes authoritative reference docs for strategy, design, content, accessibility, performance, testing, deployment, and versioning so agents have complete source material before making content or code changes.

### Added
- `REPO_PLANNING.md` — repo strategy, documentation philosophy, source-of-truth map, file tree, duplicate prevention rules, agent execution rules
- `CONTRIBUTING.md` — contributor guide with SLS-specific constraints (no virtual language, no pricing, nav changes via `components.js` only)
- `.env.example` — documents that no server-side env vars exist; notes `REPLACE_ME` Formspree endpoint location
- `docs/STRATEGY.md` — structured business strategy: goals, audiences, value proposition, CTA rules, content policy, brand direction, constraints, non-negotiables, open questions
- `docs/DESIGN.md` — design system rules: token policy, typography, colour, component patterns, GSAP animation guidelines, responsive rules, iconography
- `docs/CONTENT.md` — copy rules: tone, voice, CTA strategy, program names, claims policy, audience framing, metadata standards, placeholder policy
- `docs/ACCESSIBILITY.md` — WCAG 2.1 AA expectations: semantic HTML rules, keyboard nav, focus management, ARIA usage, form error handling, motion rules
- `docs/PERFORMANCE.md` — asset loading rules, third-party script policy, critical rendering, image rules when photography is added, known risks
- `docs/TESTING.md` — manual QA checklist: pre-commit, per-component (header/footer, animations, forms, SEO), cross-browser, responsive, accessibility spot checks
- `docs/DEPLOYMENT.md` — deploy process, pre-deploy checklist, hosting options (Netlify preferred), local dev requirements, rollback procedure
- `docs/VERSIONING.md` — semver definitions, tag naming standard (`vX.Y.Z__snapshot__commit-HASH`), release code name conventions, agent rules
- `design/README.md`, `design/wireframes/README.md`, `design/references/README.md` — design asset folder structure
- `sample-data/README.md` — placeholder for dev sample content
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist with SLS-specific content and nav rules
- `.github/ISSUE_TEMPLATE.md` — issue form with type, priority, and reproduction steps
- `plans/2026-05-05-initial-project-docs.md` — task plan for this scaffolding work
- `plans/open-decisions.md` — OD-007 (testimonials) added

### Changed
- `.gitignore` — added `!.env.example` exception so the template file is tracked despite the `.env.*` ignore rule
- `CHANGELOG.md` — fixed broken versioning link (`docs/strategy/version-number-system.md` → `docs/VERSIONING.md`)
- `plans/open-decisions.md` — OD-007 added for testimonials

### Skipped (non-empty existing files, not overwritten)
`ARCHITECTURE.md` · `CLAUDE.md` · `CHANGELOG.md` · `ROADMAP.md` · `README.md` · `plans/PLAN_TEMPLATE.md` · `plans/open-decisions.md` · `docs/workflow/claude-code-workflow.md`

### Alignment Check Results (Slice 2)
- `docs/STRATEGY.md` ↔ `ARCHITECTURE.md` — no conflicts; complementary domains
- `docs/STRATEGY.md` ↔ `docs/strategy/sls-project-context.md` — fully aligned
- `docs/workflow/claude-code-workflow.md` — active and consistent with new structure

---

## [2.7.0] — 2026-05-05

**Tag:** `v2.7.0__release-notes-reform__commit-2600d9d`

### Changed
- `RELEASE_NOTES.md` — all version headers rewritten to `vX.Y.Z - YYYY-MM-DD - CodeName` format; proper-word code names applied across all versions; v2.5.0 (Ledger) and v2.6.0 (Chronicle) entries added; redundant bold sub-headers removed

---

## [2.6.0] — 2026-05-05

**Tag:** `v2.6.0__release-notes-codenames__commit-b3f3bf3`

### Added
- `RELEASE_NOTES.md` — code name and canonical tag line added to every version header; backfilled v2.1.0 (Pulse) and v2.4.0 (Archive) entries which were missing from the release log

### Changed
- All version headers updated to include snapshot code name alongside version and date

---

## [2.5.0] — 2026-05-05

**Tag:** `v2.5.0__commit-notes-baseline__commit-d19389d`

### Added
- `COMMIT_NOTES.md` — structured commit log documenting all commits on `main`: summary, description, file stats, and canonical tag per entry
- Tag reference table covering v1.0.0 through v2.4.0 in the snapshot-naming standard

---

## [2.4.0] — 2026-05-05

**Tag:** `v2.4.0__project-docs-baseline__commit-9e87d2b`

### Added
- `Documents/00 Core Documents/` — 11 Claude Code prompt files: run-first, repo planning, scaffolding, strategy, architecture, CLAUDE.md spec, workflow, plan template, versioning, first task, and Codex bridge
- `Documents/01 Reference Documents/` — versioning guide, doc placement reference, and full project-planning-stack template (16 doc types)
- `Documents/03 Optional Documents/` — Codex and Claude implementation bridge
- `Documents/# Snapshot Info.md` — repo snapshot metadata
- `TASK-polish-and-seo.md` — scoped task plan for the next site pass (analytics, SEO, favicon, nav fix, CSS cleanup, 404 page)

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

## [2.1.0] — 2026-04-25

**Tag:** `v2.1.0__animation-richness__commit-01cd06d`

### Summary
Animation system enriched with extended stagger sequences and scroll-triggered reveals across all interior pages.

### Added
- Extended GSAP stagger sequences and scroll-triggered reveal coverage to all interior pages
- `workshops.html` — structured content sections with program and audience blocks

### Changed
- Refined animation timing, easing curves, and entrance delays across the motion system introduced in v2.0.0
- `src/js/components.js` — shared header updated with additional nav refinements

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
