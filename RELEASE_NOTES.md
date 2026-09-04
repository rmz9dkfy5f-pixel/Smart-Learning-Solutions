# Release Notes

---

## v2.29.1 — 2026-09-04 — Inline Style Cleanup

**Tag:** `v2.29.1__inline-style-cleanup__commit-1ddcdfe`

### Summary
Closed `AUDIT.md`/`BACKLOG.md` M-4: page-specific layout CSS that had been scattered across 7
pages' inline `<style>` blocks (the audit originally named 5 — `book.html`/`contact.html` had each
picked up their own block later, during the v2.23.0 Web3Forms migration, after the audit was
written) is now in `src/css/main.css` under labeled sections. Resolves two pre-existing
base/modifier fragmentations along the way — `main.css` already had photo-variant modifiers
(`.credential-item--photo`, `.format-card:hover ...`) whose base classes lived only inline — and
de-duplicates an identical `.form-success`/`.form-success.visible` pair `book.html`/`contact.html`
had each defined independently. No visual or behavioral change intended; verified via local server
across all 10 pages at their relevant breakpoints.

### Changed
- Page-specific CSS relocated from inline `<style>` blocks into `src/css/main.css`
- Cache-busting token refreshed on all 10 pages

---

## v2.29.0 — 2026-08-17 — Robots Meta Tags

**Tag:** `v2.29.0__robots-meta-tags__commit-5b757b4`

### Summary
Added an explicit `<meta name="robots">` directive to every page, closing the one open
Medium-severity `AUDIT.md` gap (M-9) where the site had no page-level SEO control and relied
entirely on default crawler behavior. The 9 public pages get `content="index, follow"`; `404.html`
gets `content="noindex, nofollow"`. `BACKLOG.md`'s original M-9 scope note ("staging/thank-you
pages") did not correspond to any real page in this site — no thank-you page exists (forms use an
inline success state, not a redirect) and staging-noindex is a server-header concern
(`docs/DEPLOYMENT.md` §8), not an HTML one — so scope followed the audit finding's own literal
recommendation instead, confirmed with the owner before implementation.

### Added
- `<meta name="robots" content="index, follow">` on all 9 public pages
- `<meta name="robots" content="noindex, nofollow">` on `404.html`

---

## v2.28.0 — 2026-08-11 — Real Favicon From Client Logo

**Tag:** `v2.28.0__favicon-brand-icon__commit-784d1fc`

### Summary
Replaced the placeholder SVG favicon (a hand-drawn orange badge unrelated to the real client
logo, carried over from before the real logo was implemented in v2.26.0) with a real favicon
derived directly from the brand mark. The icon+kite glyph was isolated from the surrounding
"Smart"/"Learning" wordmark using pixel-level connected-component analysis — a simple rectangular
crop wasn't possible, since the "Learning" flourish runs directly through that region — producing
a clean 32×32 favicon and 180×180 apple-touch-icon with no letter fragments and no invented or
redrawn art, just the real logo's own pixels. Resolves the long-open `docs/DESIGN.md` "Favicon
final? — confirm it matches brand" item.

### Added
- `src/images/favicon.png` (new) — 32×32 PNG
- `src/images/apple-touch-icon.png` (new) — 180×180 PNG

### Changed
- All 10 HTML pages — swapped the placeholder `<link rel="icon">` for the new PNG favicon and
  added `<link rel="apple-touch-icon">`

---

## v2.27.0 — 2026-07-23 — About Page Logo Watermark

**Tag:** `v2.27.0__about-page-logo-watermark__commit-9caee7e`

### Summary
Closed the non-blocking open item from the v2.26.0 logo session: the full two-line lockup
(including the "solutions" script swoosh, deliberately excluded from the single-line
header/footer crop) is now placed as a subtle background watermark behind the "Built on Real
Expertise" mission copy on `about.html` — the owner's choice among three placement options after
reviewing mockups of each. Native color (extending ADR-017's reasoning); opacity set to 8%, below
this site's existing decorative-background convention, since the mission paragraphs'
`--text-muted` color already sits close to the AA contrast floor independent of this change.

### Added
- `src/images/brand-logo-lockup-full.png` (new) — full 277×164 two-line lockup, native-size PNG
  export from `pics/Logo/Logo.png.avif`
- `about.html` — `.about-mission`/`.about-mission-watermark` markup and CSS

---

## v2.26.1 — 2026-07-22 — Page-Transition Overlay Timeout Fallback

**Tag:** `v2.26.1__page-transition-overlay-timeout-fallback__commit-e1950fb`

### Summary
`BACKLOG.md` H-4: the shared `.is-navigating` page-transition overlay used by all 10 pages had no
safety timer — its only removal path was a `pageshow` listener that fires once the destination
page loads. An interrupted or failed navigation (offline, a stalled load, a `location.assign`
edge case) would leave the overlay stuck indefinitely, covering the page with scrolling locked.

### Fixed
- `src/js/components.js` — added a `NAVIGATION_TIMEOUT_MS` (4000ms) fallback timer, started
  alongside the existing transition delay, that force-clears `.is-navigating` and restores
  `overflow` if `pageshow` never fires. The `pageshow` listener now clears the pending timer on a
  normal navigation, so no dangling timeout is left behind.

---

## v2.26.0 — 2026-07-22 — Client Logo Implementation

**Tag:** `v2.26.0__client-logo-implementation__commit-dd36fe6`

### Summary
Replaced the placeholder inline-SVG-badge + text wordmark in the header and footer with the
client's actual logo. Source file (`pics/Logo/Logo.png.avif`) turned out to be a full-color
orange/teal version, not the black line art initially expected from a pasted reference image —
used as-is (native color) rather than forcing a monochrome treatment, since it already carries
real alpha transparency and its colors track the site's existing accent/cyan tokens closely.

### Changed
- `src/images/brand-logo-mark.png` (new) — single-line "icon + SmartLearning" crop
- `src/js/components.js` — header/footer logo markup now an `<img>`, not inline SVG + text
- `src/css/main.css` — `.site-logo` restyled for an image child; dead text-color rule removed

### Fixed
- `AUDIT.md` L-2 (footer logo SVG size/viewBox mismatch) — moot, old SVG removed entirely

---

## v2.25.0 — 2026-07-19 — Staging Redeploy + Deploy-Allowlist Hardening

**Tag:** `v2.25.0__staging-redeploy-deploy-allowlist__commit-25cc2e2`

### Summary
Staging was found running a stale deploy from ~2026-06-19/23 — predating the Web3Forms migration
and OG-image PNG conversion. Both booking/contact forms were live-POSTing to the dead Formspree
endpoint. Redeployed current `main` to staging via a new allowlist-based deploy script, closing
that gap and hardening against future internal-doc exposure (R-004).

### Fixed
- Staging `book.html`/`contact.html` now call `api.web3forms.com` (previously the dead
  `formspree.io/f/REPLACE_ME` endpoint)
- Staging `index.html` `og:image` now points to `og-image.png` (previously `og-image.svg`)

### Added
- `scripts/deploy-staging.sh` — explicit path allowlist over rsync/SSH; see `docs/DEPLOYMENT.md`
  §11

### Changed
- `docs/DEPLOYMENT.md`, `docs/governance/PROJECT_RISK_REGISTER.md`, `LESSONS_LEARNED.md`,
  `DECISION_LOG.md` (ADR-016) updated — see `SLICE_REVIEWS.md` SR-009 for full detail

---

## v2.24.0 — 2026-07-18 — OG Image PNG Conversion

**Tag:** `v2.24.0__og-image-png-conversion__commit-45fa82e`

### Summary
Resolved M-1 (`AUDIT.md`): `og-image.svg` rendered to a 1200×630 PNG via headless Chromium and
wired into all 9 pages' `og:image` tags, restoring social-share preview images across the site.
`PHASE_GATES.md`'s duplicate Gate 1/Gate 3 listing for this requirement reconciled.

### Fixed
- `src/images/og-image.png` — new 1200×630 raster export of `og-image.svg`
- `index.html`, `about.html`, `book.html`, `contact.html`, `resources.html`, `workshops.html`,
  `programs/index.html`, `programs/coding-with-robots.html`, `programs/pstem.html` — `og:image`
  now points to the PNG

### Changed
- `BACKLOG.md`, `STATUS.md`, `FILE_MAP.md`, `PHASE_GATES.md` — M-1 marked resolved; Gate 1/Gate 3
  duplicate criterion reconciled

---

## v2.23.0 — 2026-07-18 — Web3Forms Merge + Hosting Decision

**Tag:** `v2.23.0__web3forms-merge-hosting-proposal__commit-c34a72e`

### Summary
Merged the Web3Forms migration (Formspree → Web3Forms) into `main`, confirmed inbox delivery,
and logged the hosting direction: self-hosting on the existing staging VPS is being proposed to
the client (OD-003). Resolves the C-1/OD-001 launch blocker.

### Changed
- Migrated `book.html` and `contact.html` from Formspree to Web3Forms, resolving the C-1/OD-001/
  R-002 launch blocker (`REPLACE_ME` placeholder). Access key centralized in new
  `src/js/web3forms-config.js`.
- Added `botcheck` honeypot spam protection, an accessible `role="status"` loading/error region,
  a 15s request timeout via `AbortController`, and a duplicate-submission guard to both forms.
- Updated `.env.example`, `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `BACKLOG.md`,
  `PHASE_GATES.md`, `STATUS.md`, `docs/DEPLOYMENT.md`, `docs/TESTING.md`, `docs/STRATEGY.md`,
  `docs/governance/PROJECT_RISK_REGISTER.md`, `plans/open-decisions.md` (OD-001), and
  `legal/privacy-policy.md` to reflect Web3Forms as the form provider.
- Logged the hosting direction: self-hosting on the existing staging VPS (`74.208.9.49`) proposed
  to the client (OD-003), superseding the earlier Netlify/GitHub Pages recommendation.

### Confirmed
- Inbox delivery to `info@SmartLearningSolutions.org` confirmed working.

### Notes
- Merged branch `feat/web3forms-integration` into `main`; see
  `plans/2026-07-16-web3forms-migration.md` and `DECISION_LOG.md` ADR-015.
- Deployed-domain verification remains blocked on OD-003.

---

## v2.22.0 — 2026-07-10 — Model Selection Gate

**Tag:** `v2.22.0__model-selection-gate__commit-8f6cde7`

### Summary
Adopted the AntBrainOS vault-wide Model Selection Gate for this repo: a mandatory brief shown
before substantial AI-assisted work, with per-surface routing and a Model Usage Record. Also
fast-forwarded `main` to the previously unmerged `audit/production-readiness` branch (v2.21.0).

### Added
- `MODEL_SELECTION_GATE.md` — mandatory Model Selection Brief template (task classification,
  per-surface routing table, VS Code Codex-vs-Claude-Code choice, execution/escalation section)
  and routing rules
- `PROMPT_MODEL_SELECTION_GATE.md` — paste-ready prompt version of the same gate

### Changed
- `AGENTS.md`, `CLAUDE.md` — added "Mandatory Model Selection Gate" section
- `ai/prompts/TASK_INTAKE.md` — requires the gate be run and its brief attached before execution
- `docs/governance/AGENT_RUN_LOG.md` — added a "Model Usage Record" section

### Notes
- These files were rolled out repo-wide across ten AntBrainOS-tracked repos on 2026-07-08 and
  deliberately left uncommitted pending per-repo review; this release is that review for Smart
  Learning Solutions. See `DECISION_LOG.md` ADR-014.
- `main` was fast-forwarded to the previously unmerged `origin/audit/production-readiness`
  branch (v2.21.0, see below) as part of this same pass — no new code changes from that
  fast-forward itself.

---

## v2.21.0 — 2026-06-27 — Second Production-Readiness Audit

**Tag:** `v2.21.0__second-production-readiness-audit-docs__commit-2d30ad0`

### Summary
Second V3.4 production-readiness audit pass. Result: BLOCKED for client launch — same two hard
blockers as v2.20.0 (Formspree `REPLACE_ME`; hosting platform unconfirmed). One notable
confirmation: C-2 (cursor CSS gate) verified fixed in current code; the `AUDIT.md` entry
describing it was stale.

### Changed
- `STATUS.md` — second production-readiness audit section added (2026-06-27 scorecard); version
  bumped to v2.21.0
- `docs/governance/REPO_HEALTH_CHECK.md` — Last Health Check updated to 2026-06-27; prior
  2026-06-23 entry preserved as Previous Health Check
- `docs/governance/RELEASE_GATE.md` — Release Decision date re-confirmed 2026-06-27; C-2 fix
  noted; held items list clarified
- `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md` — v2.21.0 session entries

### Confirmed Fixed
- C-2 cursor CSS gate (`src/css/main.css:135-142`) — `cursor: none` correctly gated by
  `body.custom-cursor-enabled`; prior `AUDIT.md` entry was stale (fixed in `9ea4936`, v2.15.3)

### Held (deferred until hosting platform confirmed per ADR-013)
- Formspree endpoint (`REPLACE_ME` in `book.html`, `contact.html`)
- Internal-doc exclusion from deploy root
- OG image SVG → PNG/JPEG conversion
- AVIF `<picture>` fallback, form a11y, overlay safety timer
- Security headers at server level, privacy policy publish + footer link

---

## v2.20.0 — 2026-06-25 — Audit + Portable Fixes

**Tag:** `v2.20.0__audit-privacy-policy-doc-fixes__commit-97ad30c`

### Summary
V3.4 production-readiness audit (result: BLOCKED). Privacy policy draft added. Governance
stubs filled. ADR-013, L-012, L-013, R-002–R-004 logged. All code-level fixes held until
hosting platform is confirmed (possible Wix incompatibility — see ADR-013 and R-003).

### Added
- `legal/privacy-policy.md` — portable privacy policy draft

### Changed
- `docs/governance/REPO_HEALTH_CHECK.md` — filled from empty stub; result BLOCKED
- `docs/governance/RELEASE_GATE.md` — filled from empty stub; status BLOCKED
- `docs/governance/PROJECT_RISK_REGISTER.md` — R-002/R-003/R-004 added; R-001 closed
- `DECISION_LOG.md` — ADR-013 (portable-fixes-only scope)
- `LESSONS_LEARNED.md` — L-012, L-013
- `PHASE_GATES.md` — Gate 1 privacy policy criterion; Wix risk note
- `BACKLOG.md`, `README.md`, `STATUS.md` — updated

---

## v2.16.0 - 2026-06-16 - Toolkit

**Tag:** `v2.16.0`

### Summary
Add project starter kit v3.3 reference library and push workflow prompts. No site code changed.

### Added
- `project-starter-kit-v3.3/` — full v3.3 starter kit library
- `prompts/repo_push_handoff_snapshot_tag_prompt.md` — push/handoff/snapshot workflow prompt
- `prompts/_repo_push_handoff_snapshot_tag_prompt_post_check.md` — post-check verification prompt

---

## v2.15.1 - 2026-05-22 - Hash Correction

**Tag:** `v2.15.1`

### Summary
Correct v2.15.0 commit hash in three release-record files after amend changed the hash.

### Changed
- `COMMIT_NOTES.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md` — hash updated to `bb0bcfa`

---

## v2.15.0 - 2026-05-22 - Docs Sync

**Tag:** `v2.15.0`

### Summary
Documentation sync through v2.15.0. All six release-tracking files updated.
Tag format simplified from verbose slug style to clean semver.

### Changed
- `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md` — synced to v2.15.0
- `PROGRESS_NOTE.md` — current session record updated
- `PROGRESS_NOTES.md` — cumulative log appended
- `ROADMAP.md` — tag format cleanup marked completed

---

## v2.14.8 - 2026-05-16 - Prompt List

**Tag:** `v2.14.8__prompts-update-file-list__commit-56be1ea`

### Changed
- `prompts/Update.md` — update workflow file list expanded to include both `PROGRESS_NOTE.md` and `PROGRESS_NOTES.md`, aligning the prompt with the intended current-session and cumulative progress records

---

## v2.14.7 - 2026-05-16 - Docs Sync

**Tag:** `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-0715806`

### Changed
- `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — synced to v2.14.7
- `PROGRESS_NOTE.md` — updated to v2.14.7
- `ROADMAP.md` — CONTEXT.md and STATUS.md creation added to Completed section

---

## v2.14.6 - 2026-05-16 - Session Progress Note

**Tag:** `v2.14.6__session-progress-note__commit-d72e671`

### Changed
- `PROGRESS_NOTE.md` — full session log for v2.14.3–v2.14.5 work

---

## v2.14.5 - 2026-05-15 - Reference Docs

**Tag:** `v2.14.5__context-and-status-docs__commit-7ea223c`

### Added
- `CONTEXT.md` — stable project background: identity, programs, audiences,
  confirmed decisions, tech stack, architecture, page inventory, content rules
- `STATUS.md` — present state: version, done list, launch blockers, audit
  findings, next actions table, deferred items

---

## v2.14.4 - 2026-05-15 - Gitignore

**Tag:** `v2.14.4__ignore-claude-local-settings__commit-7269da5`

### Changed
- `.gitignore` — added `.claude/` to prevent Claude Code local settings from
  appearing as untracked files in GitHub Desktop

---

## v2.14.3 - 2026-05-15 - Audit

**Tag:** `v2.14.3__audit-doc-and-docs-sync__commit-46fcf2a`

### Added
- `AUDIT.md` — full diagnostic audit of the static site covering all 10 pages,
  JS, CSS, sitemap, and robots.txt. 2 critical defects, 4 high risks,
  9 medium issues, 6 low findings, 4 unverified items.

### Changed
- `prompts/Update.md` — snapshot instruction added; trailing newline fixed
- `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — synced to v2.14.3
- `PROGRESS_NOTE.md` — updated to v2.14.3
- `ROADMAP.md` — audit added to Completed section

---

## v2.14.2 - 2026-05-15 - Sync

**Tag:** `v2.14.2__docs-current-to-v2-14-1__commit-53e752e`

### Changed
- `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — synced with full
  tagged history through v2.14.1; entries added for v2.12.7–v2.14.1
- `ROADMAP.md` — completed milestones moved to Completed section; resolved
  blockers removed
- `PROGRESS_NOTE.md` — created as current-state snapshot

---

## v2.14.1 - 2026-05-15 - Templates

**Tag:** `v2.14.1__prompts-workflow-templates__commit-2416a94`

### Added
- `prompts/` directory with three saved workflow instruction files:
  `Commit notes`, `Update.md`, `Snapshot`

---

## v2.14.0 - 2026-05-15 - Anchor

**Tag:** `v2.14.0__programs-launch-site-hardening__commit-c47d388`

### Added
- `programs/index.html` — Programs landing page as a proper `/programs/` route
- `sitemap.xml` — `/programs/` entry with `changefreq: monthly`, `priority: 0.9`

### Changed
- `src/js/components.js` — Programs nav updated to `/programs/`; same-page hash links now skip the page-transition overlay
- `src/js/animations.js` — Custom cursor only activates on fine-pointer devices via `.custom-cursor-enabled` body class
- `src/css/main.css` — `cursor: none` moved inside `.custom-cursor-enabled`; default pointer cursor restored
- `book.html` / `contact.html` — `novalidate` removed; `maxlength` added to all fields; submission blocked when Formspree endpoint is unconfigured
- `docs/DEPLOYMENT.md` — Nginx security headers, staging noindex config, expanded pre-deploy checklist
- `docs/TESTING.md` — Programs nav, CDN graceful fallback, form validation, and staging header checks

---

## v2.13.7 - 2026-05-07 - Archive

**Tag:** `v2.13.7__changelog-backfill__commit-5d3b69f`

### Changed
- `CHANGELOG.md` — backfilled all missing entries v2.1.0–v2.13.6

---

## v2.13.6 - 2026-05-07 - Record

**Tag:** `v2.13.6__release-notes-v2-13__commit-7969d14`

### Changed
- `RELEASE_NOTES.md` — added v2.13.0–v2.13.5 entries with canonical tag hashes and photography-themed code names

---

## v2.13.5 - 2026-05-07 - Frame

**Tag:** `v2.13.5__workshops-photo-cards__commit-699c1af`

### Changed
- Format cards now use `.format-card-photo-bg` at 9% opacity, lifting to 15% on hover:
  - Half-Day — `people-children-thinking.webp`
  - Full-Day — `people-classroom-teacher-children-800.webp`
  - Programme Series — `people-teens-outdoor-tutoring.webp`
- Audience cards receive the same `.audience-photo-bg` low-opacity treatment as the homepage audience section
- CTA band gains photo background consistent with all other pages

---

## v2.13.4 - 2026-05-07 - Depth

**Tag:** `v2.13.4__program-pages-photography__commit-e3dc18c`

### Changed
- **Coding with Robots** (`programs/coding-with-robots.html`): hero media column now stacks a student proof photo below the Edison robot product shot; full-width photo section break added above the levels grid; CTA band gains photo background
- **PSTEM** (`programs/pstem.html`): hero media column stacks a focused-student photo below the Whybricks product shot; "Learning That Starts With Why?" section restructured as a two-column grid with the children-thinking photo alongside the copy; CTA band gains photo background

---

## v2.13.3 - 2026-05-07 - Portrait

**Tag:** `v2.13.3__about-photo-redesign__commit-f5e9f05`

### Added
- New three-column "What We Bring" visual proof strip before the CTA band — Real Engineers & Educators / Industry-Recognised Equipment / Genuine STEM Confidence — each column a photo with overlay caption

### Changed
- Hero replaced with a split-panel layout: narrative text left, full-height classroom photo right with left-edge gradient feathering into the dark panel
- All four credential cards restructured to lead with a photo header — product shots for platform cards, people photos for team and reach cards
- CTA band gains photo background consistent with all other pages

---

## v2.13.2 - 2026-05-07 - Exposure

**Tag:** `v2.13.2__homepage-photo-redesign__commit-ab0cd79`

### Added
- New "Real Workshops. Real Students." four-photo mosaic section inserted before the activities grid — the site's primary social proof moment
- Trust strip: Edison and Whybricks trust items now display product image thumbnails (`.trust-item-thumb`) instead of generic SVG icons

### Changed
- Hero: CSS illustration replaced with a full-bleed classroom photo; dark gradient overlay preserves headline legibility; Pexels photo credit strip added
- Program cards: student proof photo strip added below each product shot
- Audience cards: low-opacity photo backgrounds added — each segment (Parents, Schools, Community) shows relevant students through the card surface
- Differentiators section replaced with a three-photo visual proof band, each panel captioned with the claim it supports (Expert-Led / Hands-On / Engaged)
- CTA band gains classroom hands-raised photo background with orange radial gradient overlay

---

## v2.13.1 - 2026-05-07 - Overlay

**Tag:** `v2.13.1__photo-css-utilities__commit-03ca0c8`

### Added
- `src/css/main.css` — 14 new layout and overlay utility classes supporting the photo-driven redesign:
  - `.hero--photo` / `.hero-photo-bg` — full-bleed photo hero variant with gradient overlay
  - `.split-hero` — two-column hero layout (text panel + full-height photo panel)
  - `.page-hero-media-stack` / `.page-hero-proof-photo` — stacked media column for program heroes
  - `.pstem-approach-grid` — two-column inquiry approach section
  - `.photo-proof-grid` / `.photo-proof-item` / `.photo-proof-caption` — three-column visual proof band
  - `.photo-mosaic` / `.photo-mosaic-item--large` / `.photo-mosaic-footer` — four-photo asymmetric mosaic
  - `.audience-photo-bg` — low-opacity photo background for audience cards
  - `.program-card-proof` — student proof photo strip below program card product images
  - `.format-card-photo-bg` — low-opacity background for workshops format cards
  - `.cta-band-photo-bg` — photo background layer for CTA band sections
  - `.about-proof-grid` / `.about-proof-item` / `.about-proof-caption` — about page three-photo proof strip
  - `.credential-item--photo` / `.credential-photo` / `.credential-item-body` — photo-headed credential cards
  - `.trust-item-thumb` — product image thumbnail variant for trust strip icons
  - `.program-section-break` — full-width photo break image within program pages
- Responsive overrides at 1024px, 768px, and 480px breakpoints for all new components

---

## v2.13.0 - 2026-05-07 - Gallery

**Tag:** `v2.13.0__webp-photo-library__commit-5509929`

### Added
- 11 optimised WebP images to `src/images/` for the photo-driven redesign:
  - Hero images at two widths for `srcset` delivery: `people-classroom-teacher-children-1920.webp` (158 KB) and `people-classroom-teacher-children-800.webp` (41 KB)
  - Supporting people images (all under 100 KB): `people-children-floor-activity.webp`, `people-children-thinking.webp`, `people-classroom-hands-raised.webp`, `people-teens-collaborating.webp`, `people-teens-outdoor-study.webp`, `people-teens-outdoor-tutoring.webp`, `people-teens-studying-focused.webp`, `people-teens-studying-together.webp`
  - Product image: `product-edison-robot.webp` (31 KB)
- `.imgtemp/` added to `.gitignore` to prevent temporary Sharp conversion artefacts from being tracked

---

## v2.12.6 - 2026-05-06 - Spotlight

**Tag:** `v2.12.6__program-prominence-visuals__commit-2995955`

### Added
- `src/images/program-coding-edison.jpg` and `src/images/program-pstem-whybricks.avif` added as live site assets for the two flagship programs
- `plans/2026-05-06-program-prominence-assets.md` added for the approved program prominence and asset placement slice

### Changed
- Coding with Robots and PSTEM made more prominent across the homepage, workshops page, and dedicated program pages
- Homepage and workshops program cards updated with program-specific Edison and Whybricks visuals
- Coding with Robots and PSTEM program page heroes updated with product visuals
- Shared Programs navigation now points to the neutral workshops program selector

---

## v2.12.5 - 2026-05-06 - Prism

**Tag:** `v2.12.5__source-image-library__commit-8f36957`

### Added
- `pics/Edison/` — 10 Edison robotics platform reference images
- `pics/Whybricks/` — 2 Whybricks PSTEM platform images (AVIF)
- `pics/Logo/` — Logo asset (AVIF)
- `pics/` — 20 curated Pexels STEM workshop photography references (students, educators, hands-on science and coding scenes) for future homepage, program page, and brand imagery work

---

## v2.12.4 - 2026-05-05 - Meridian

**Tag:** `v2.12.4__release-notes-v2-12-3__commit-722471a`

### Added
- `RELEASE_NOTES.md` — v2.12.3 entry added using the real tag and commit hash so the release log matches the current tagged history

---

## v2.12.3 - 2026-05-05 - Meridian

**Tag:** `v2.12.3__version-narrative-alignment__commit-deab715`

### Changed
- `README.md` version line updated from `v2.3.0` to `v2.12.2`
- `ROADMAP.md` rewritten from stale `v1.x` milestone planning into a forward-looking roadmap based on the current shipped site baseline
- `RELEASE_NOTES.md` extended so the top of the file reflects the current release sequence through `v2.12.2`

### Fixed
- Version narrative drift between `README.md`, `RELEASE_NOTES.md`, the Git tags, and `ROADMAP.md`
- Stale roadmap items that still treated analytics, sitemap, robots, and workshops completion as future work

---

## v2.12.2 - 2026-05-05 - Chronicle

**Tag:** `v2.12.2__commit-history-backfill__commit-ba8316a`

### Added
- Missing commit-log entries for `v2.12.1` and the untagged `4c77245` history-maintenance commit added to `COMMIT_NOTES.md`

### Changed
- `COMMIT_NOTES.md` tag reference table refreshed through `v2.12.2`

### Fixed
- The structured commit backlog no longer skipped past commits that existed in Git history but were absent from `COMMIT_NOTES.md`

---

## v2.12.1 - 2026-05-05 - Compass

**Tag:** `v2.12.1__release-record-sync__commit-aabc664`

### Added
- `RELEASE_NOTES.md` entry for the `v2.12.0` Beacon release
- Missing `v2.11.0` release-note entry so the file reflects the actual tagged history

### Changed
- `COMMIT_NOTES.md` updated to record `v2.12.0` using the real tagged commit hash

### Fixed
- Release-tracking docs no longer depended on placeholder or lagging hash references for `v2.12.0`

---

## v2.12.0 - 2026-05-05 - Beacon

**Tag:** `v2.12.0__polish-seo-analytics__commit-7701534`

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

**Tag:** `v2.11.0__release-notes-current__commit-928a381`

### Added
- `RELEASE_NOTES.md` entries for v2.7.0 through v2.10.0 so the release log matches the current tagged history

### Fixed
- Stale pre-rewrite hashes on the v2.4.0, v2.5.0, and v2.6.0 tag lines in `RELEASE_NOTES.md`

---

## v2.10.0 - 2026-05-05 - Index

**Tag:** `v2.10.0__commit-notes-current__commit-45c2c73`

### Added
- `COMMIT_NOTES.md` — v2.7.0, v2.8.0, and v2.9.0 entries backlogged with full summary, description, and stats

### Fixed
- Stale pre-rewrite commit hashes corrected for v2.4.0, v2.5.0, and v2.6.0 entries and tag reference table in `COMMIT_NOTES.md`

---

## v2.9.0 - 2026-05-05 - Anchor

**Tag:** `v2.9.0__docs-scaffold-aligned__commit-83e2ce4`

### Changed
- `CHANGELOG.md` — fixed broken versioning link (`docs/strategy/version-number-system.md` → `docs/VERSIONING.md`); added [2.8.0] entry covering all 19 scaffold files and alignment findings
- `plans/open-decisions.md` — OD-007 (Testimonials) added; trust signal section flagged as needing real quotes; fabrication prohibited
- `plans/2026-05-05-initial-project-docs.md` — Slices 2–4 marked complete

### Fixed
- Broken link in `CHANGELOG.md` pointing to a versioning file that does not exist

---

## v2.8.0 - 2026-05-05 - Atlas

**Tag:** `v2.8.0__docs-scaffold-complete__commit-a540d23`

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

**Tag:** `v2.7.0__release-notes-reform__commit-837bd5b`

### Changed
- `RELEASE_NOTES.md` — all version headers rewritten to `vX.Y.Z - YYYY-MM-DD - CodeName` format; slug-style code names replaced with single proper-word names across all 9 versions; v2.5.0 (Ledger) and v2.6.0 (Chronicle) entries added; redundant bold sub-headers removed

---

## v2.6.0 - 2026-05-05 - Chronicle

**Tag:** `v2.6.0__release-notes-codenames__commit-a8c6428`

### Added
- Code name and canonical tag line to every version header in `RELEASE_NOTES.md`
- Backfilled v2.1.0 (Pulse) and v2.4.0 (Archive) entries which were missing from the release log

### Changed
- All version headers updated to include snapshot code name alongside version and date

---

## v2.5.0 - 2026-05-05 - Ledger

**Tag:** `v2.5.0__commit-notes-baseline__commit-4428f41`

### Added
- `COMMIT_NOTES.md` — structured commit log documenting all commits on `main`: summary, description, file stats, and canonical tag per entry
- Tag reference table covering v1.0.0 through v2.4.0 in the snapshot-naming standard

---

## v2.4.0 - 2026-05-05 - Archive

**Tag:** `v2.4.0__project-docs-baseline__commit-2cfe46a`

### Added
- `Documents/00 Core Documents/` — 11 Claude Code prompt files: run-first, repo planning, scaffolding, strategy, architecture, CLAUDE.md spec, workflow, plan template, versioning, first task, and Codex bridge
- `Documents/01 Reference Documents/` — versioning guide, doc placement reference, and full project-planning-stack template (16 doc types: ARCHITECTURE, API, DATA_MODEL, FLOWS, STATE_MODEL, TESTING, ACCESSIBILITY, PERFORMANCE, SECURITY, ROADMAP, CHANGELOG, DECISIONS, RULES, WIREFRAMES, IA, DOCUMENT_MAP)
- `Documents/03 Optional Documents/` — Codex and Claude implementation bridge
- `Documents/# Snapshot Info.md` — repo snapshot metadata
- `TASK-polish-and-seo.md` — active scoped task plan for the next site pass: analytics platform decision, SEO meta tags, favicon, SVG icons, nav fix, CSS cleanup, 404 page

---

## v2.3.0 - 2026-04-28 - Signal

**Tag:** `v2.3.0__build-version-sync__commit-2ed79ce`

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

**Tag:** `v2.2.0__hero-polish-cursor__commit-7c36aa2`

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

**Tag:** `v2.1.0__animation-richness__commit-ac03343`

### Added
- Extended GSAP stagger sequences and scroll-triggered reveal coverage to all interior pages
- `workshops.html` — structured content sections with new program and audience blocks

### Changed
- Refined animation timing, easing curves, and entrance delays across the full motion system introduced in v2.0.0
- `src/js/components.js` — updated shared header with additional nav refinements

---

## v2.0.0 - 2026-04-24 - Obsidian

**Tag:** `v2.0.0__dark-redesign-gsap__commit-3b7eecd`

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

**Tag:** `v1.1.0__project-docs-infra__commit-5c495d7`

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
