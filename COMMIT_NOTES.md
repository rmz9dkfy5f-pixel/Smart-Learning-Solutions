# Commit Notes — Smart Learning Solutions

All commits on `main`, newest first. Each entry includes the canonical tag,
commit hash, date, summary, and description.

---

## v2.15.6 — Migration Decision Update and Checklist
**Tag:** `v2.15.6`
**Commit:** `41cb585` · 2026-06-04
**Type:** `docs`

**Summary:** docs: migration decision update and checklist (steps 9-10)

**Description:**
Update ADR-008 in DECISION_LOG.md to reflect completed migration state (v2.15.5):
add Completed date, full files-added list, files-updated list, Gate 1 fixes note.
Create MIGRATION_CHECKLIST.md — permanent verification record confirming all 18
required v2 files exist, mandatory files preserved, no app code changed, Gate 0
defined, file responsibilities enforced. Result: PASS.

**Stats:** 6 files changed

---

## v2.15.5 — File Responsibility Cleanup
**Tag:** `v2.15.5`
**Commit:** `b2b5e05` · 2026-06-04
**Type:** `docs`

**Summary:** docs: clean file responsibilities per step 8 migration

**Description:**
Enforce single-responsibility boundaries across planning docs.
ROADMAP.md: remove Completed/Deferred/Blockers sections, replace with pointers.
PROJECT_BRIEF.md: condense duplicated tables to summaries, defer detail to CONTEXT.md.
BACKLOG.md: remove Resolved/Closed section, replace with pointer to CHANGELOG.md.
STATUS.md: condense Audit Findings to one line, remove Deferred section.
PLAN.md: replace plan-index structure with Current State prose.
No content deleted. No application code changed.

**Stats:** 5 files changed (content cleanup)

---

## v2.15.4 — File Responsibility Map
**Tag:** `v2.15.4`
**Commit:** `28a8ae6` · 2026-06-04
**Type:** `docs`

**Summary:** docs: add file responsibility map

**Description:**
Create FILE_MAP.md — full inventory of every tracked file with purpose, owner
(Dev / Owner / Both / Auto), and edit frequency. Grouped by: site pages, core
assets, root reference docs, v2 planning system docs, release tracking docs,
config files, docs/, plans/, prompts/, and legacy directories.
Update PLAN.md to reference FILE_MAP.md.

**Stats:** 2 files changed (1 created)

---

## v2.15.3 — Gate 1 Launch-Readiness Fixes
**Tag:** `v2.15.3`
**Commit:** `b378f03` · 2026-06-04
**Type:** `fix`

**Summary:** fix: gate 1 launch-readiness fixes (C-2 H-2 M-2 M-3 M-6)

**Description:**
Gate .btn cursor: none behind body.custom-cursor-enabled (C-2).
Add SRI integrity hashes to GSAP 3.12.5 CDN script tags on all 9 pages (H-2).
Fix programs/index.html title: hyphen to em-dash (M-2).
Add width/height to PSTEM product image card on programs/index.html (M-3).
Fix tel: href to include + prefix in book.html, contact.html, components.js (M-6).
No content changes. No structural changes.

**Stats:** 13 files changed

---

## v2.15.2 — v2 Planning Migration
**Tag:** `v2.15.2`
**Commit:** `505a500` · 2026-06-04
**Type:** `docs`

**Summary:** docs: migrate project planning system to v2

**Description:**
Add missing v2 project-control planning files: PROJECT_BRIEF.md, PLAN.md,
PHASE_GATES.md, BACKLOG.md, DECISION_LOG.md, SLICE_REVIEWS.md, LESSONS_LEARNED.md.
Update CLAUDE.md and AGENTS.md with v2 planning system pointers.
Update STATUS.md and PROGRESS_NOTE.md to reflect v2.15.2.
Update PROGRESS_NOTES.md with v2.15.2 session entry.
No application code changed. No existing content deleted. No files renamed.

**Stats:** 12 files changed

---

## v2.15.1 — Hash Correction
**Tag:** `v2.15.1`
**Commit:** `04875a3` · 2026-05-22
**Type:** `chore`

**Summary:** chore(docs): set v2.15.0 commit hash to b192aff in release records

**Description:**
After amending the v2.15.0 docs-sync commit, the commit hash shifted. This
follow-up corrects the hash reference to `b192aff` in COMMIT_NOTES.md,
PROGRESS_NOTE.md, and PROGRESS_NOTES.md.

**Files changed:**
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`

---

## v2.15.0 — Docs Sync
**Tag:** `v2.15.0`
**Commit:** `b192aff` · 2026-05-22
**Type:** `docs`

**Summary:** docs(release): sync all docs to v2.15.0

**Description:**
Update six documentation files to reflect the v2.15.0 release and switch tag
format from verbose slug style (`vX.Y.Z__slug__commit-hash`) to clean semver
(`vX.Y.Z`) going forward.

**Files changed:**
- `CHANGELOG.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`
- `ROADMAP.md`

---

## v2.14.8 — Prompts Update File List
**Tag:** `v2.14.8__prompts-update-file-list__commit-cc88cfd`
**Commit:** `cc88cfd` · 2026-05-16
**Type:** `chore`

**Summary:** chore(prompts): add PROGRESS_NOTES.md to Update.md file list

**Description:**
Update the release-documentation workflow prompt so it names both progress-note
files used by the project: `PROGRESS_NOTE.md` for the current focused session
record and `PROGRESS_NOTES.md` for the cumulative progress log.

**Stats:** 1 file changed · 1 insertion · 1 deletion

---

## v2.14.7 — Docs Sync v2.14.4–v2.14.7
**Tag:** `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-894bc72`
**Commit:** `894bc72` · 2026-05-16
**Type:** `docs`

**Summary:** docs(release): sync all docs to v2.14.7

**Description:**
Sync RELEASE_NOTES.md, COMMIT_NOTES.md, and CHANGELOG.md with entries for
v2.14.4 through v2.14.7. Update PROGRESS_NOTE.md version line to v2.14.7.
Add CONTEXT.md and STATUS.md creation to ROADMAP.md Completed section.

**Stats:** 5 files changed

---

## v2.14.6 — Session Progress Note
**Tag:** `v2.14.6__session-progress-note__commit-431f540`
**Commit:** `431f540` · 2026-05-16
**Type:** `docs`

**Summary:** docs(session): progress note for v2.14.3–v2.14.5 session

**Description:**
Overwrite PROGRESS_NOTE.md with a structured session log covering v2.14.3
through v2.14.5: tasks completed, commits table, tags table, files changed
table, and next milestone.

**Stats:** 1 file changed · 83 insertions · 46 deletions

---

## v2.14.5 — Context and Status Docs
**Tag:** `v2.14.5__context-and-status-docs__commit-c4a7d9d`
**Commit:** `c4a7d9d` · 2026-05-15
**Type:** `docs`

**Summary:** docs: add CONTEXT.md and STATUS.md root reference files

**Description:**
Add two root-level reference files to make the repo self-documenting.
CONTEXT.md covers stable background — project identity, programs, audiences,
confirmed decisions, tech stack, architecture, page inventory, and content rules.
STATUS.md covers present state — current version, done list, launch blockers
table, audit findings summary, next actions table, and deferred items.

**Stats:** 2 files added · 188 insertions

---

## v2.14.4 — Ignore .claude/ Local Settings
**Tag:** `v2.14.4__ignore-claude-local-settings__commit-1055fd7`
**Commit:** `1055fd7` · 2026-05-15
**Type:** `chore`

**Summary:** chore(git): ignore .claude/ local settings directory

**Description:**
Add `.claude/` to `.gitignore` so Claude Code local settings files
(tool permissions, session state) are never staged or committed. Prevents
the directory from appearing as untracked in GitHub Desktop.

**Stats:** 1 file changed · 1 insertion

---

## v2.14.3 — Audit Doc and Docs Sync
**Tag:** `v2.14.3__audit-doc-and-docs-sync__commit-f8f8028`
**Commit:** `f8f8028` · 2026-05-15
**Type:** `docs`

**Summary:** docs(audit): add site audit and bring docs current to v2.14.3

**Description:**
Add `AUDIT.md` — full diagnostic audit covering all 10 pages, JS, CSS,
sitemap, and robots.txt. Findings: 2 critical defects (Formspree endpoint
unconfigured; ungated .btn cursor: none CSS rule), 4 high risks (/programs/
routing dependency, no SRI on GSAP CDN scripts, Plausible mutable URL,
page transition overlay no timeout fallback), 9 medium issues, 6 low
findings, and 4 unverified items.
Update `prompts/Update.md`: snapshot instruction line added, trailing
newline fixed.
Sync RELEASE_NOTES.md, COMMIT_NOTES.md, and CHANGELOG.md with v2.14.2
and v2.14.3 entries. Update PROGRESS_NOTE.md to v2.14.3. Add audit
completion to ROADMAP.md Completed section.

**Stats:** 7 files changed

---

## v2.14.2 — Docs Current to v2.14.1
**Tag:** `v2.14.2__docs-current-to-v2-14-1__commit-179f16a`
**Commit:** `179f16a` · 2026-05-15
**Type:** `docs`

**Summary:** docs(release): bring all docs current to v2.14.1

**Description:**
Sync RELEASE_NOTES.md, COMMIT_NOTES.md, and CHANGELOG.md with the full
tagged history through v2.14.1. Entries added: v2.12.7–v2.14.1 in
COMMIT_NOTES, v2.13.6–v2.14.1 in RELEASE_NOTES, v2.13.7–v2.14.1 in
CHANGELOG.
Update ROADMAP.md: move completed milestones to a new Completed section;
remove resolved blockers.
Create PROGRESS_NOTE.md as current-state snapshot.

**Stats:** 5 files changed · 344 insertions · 2 deletions

---

## v2.14.1 — Prompts Workflow Templates
**Tag:** `v2.14.1__prompts-workflow-templates__commit-9457ab9`
**Commit:** `9457ab9` · 2026-05-15
**Type:** `chore`

**Summary:** chore(prompts): add saved prompt templates for commit and update workflows

**Description:**
Add `prompts/` directory with three reusable instruction files that capture the
project's standard workflows: "Commit notes" for GitHub commit-style notes,
"Update.md" for updating release docs, and "Snapshot" for repo backups.

**Stats:** 3 files added · 14 insertions

---

## v2.14.0 — Programs Launch & Site Hardening
**Tag:** `v2.14.0__programs-launch-site-hardening__commit-fcdfda6`
**Commit:** `fcdfda6` · 2026-05-15
**Type:** `feat`

**Summary:** feat(site): programs page, form hardening, cursor and nav fixes

**Description:**
Add `/programs/` landing page as a proper route replacing the old anchor-only link.
Update nav in `components.js` to `/programs/` and add sitemap entry at priority 0.9.
Harden book and contact forms: remove `novalidate`, add `maxlength` on all fields,
block submission when Formspree endpoint contains placeholder.
Fix custom cursor to only activate on fine-pointer devices by gating `cursor: none`
and element visibility behind a `.custom-cursor-enabled` body class set by
`animations.js` at runtime.
Fix same-page hash navigation to skip the page-transition overlay, preventing
it from getting stuck on anchor-only links.
Expand `DEPLOYMENT.md` with Nginx security headers and staging noindex config.
Update `TESTING.md` to cover Programs nav, CDN graceful fallback, form field
validation, and staging header checks.

**Stats:** 11 files changed · 299 insertions · 22 deletions

---

## v2.13.7 — Changelog Backfill
**Tag:** `v2.13.7__changelog-backfill__commit-aaa3399`
**Commit:** `aaa3399` · 2026-05-07
**Type:** `docs`

**Summary:** docs(changelog): backfill all missing entries v2.1.0–v2.13.6

**Description:**
Adds all missing `CHANGELOG.md` entries from v2.1.0 through v2.13.6 so the
human-readable history matches the full tagged history on main.

---

## v2.13.6 — Release Notes v2.13
**Tag:** `v2.13.6__release-notes-v2-13__commit-aded593`
**Commit:** `aded593` · 2026-05-07
**Type:** `docs`

**Summary:** docs(release): add v2.13.0–v2.13.5 release notes

**Description:**
Adds six release-note entries (Gallery → Overlay → Exposure → Portrait →
Depth → Frame) to `RELEASE_NOTES.md` so the release log matches the tagged history.

---

## v2.13.5 — Workshops Photo Cards
**Tag:** `v2.13.5__workshops-photo-cards__commit-e75b131`
**Commit:** `e75b131` · 2026-05-07
**Type:** `feat`

**Summary:** feat(workshops): photo-layered format cards and audience section

**Description:**
Format cards use `.format-card-photo-bg` at 9% opacity (15% on hover). Audience
cards get `.audience-photo-bg` treatment consistent with the homepage. CTA band
gains a photo background consistent with all other pages.

---

## v2.13.4 — Program Pages Photography
**Tag:** `v2.13.4__program-pages-photography__commit-8693b15`
**Commit:** `8693b15` · 2026-05-07
**Type:** `feat`

**Summary:** feat(programs): student proof photography on program detail pages

**Description:**
Coding with Robots hero stacks a student proof photo below the Edison product
shot; full-width photo section break added above the levels grid; CTA band gains
photo background. PSTEM hero stacks a focused-student photo below Whybricks;
"Learning That Starts With Why?" restructured as two-column grid with
children-thinking photo; CTA band gains photo background.

---

## v2.13.3 — About Photo Redesign
**Tag:** `v2.13.3__about-photo-redesign__commit-962def2`
**Commit:** `962def2` · 2026-05-07
**Type:** `feat`

**Summary:** feat(about): split-panel hero and photographic credential cards

**Description:**
Hero replaced with split-panel layout: text left, full-height classroom photo
right with left-edge gradient feathering. All four credential cards restructured
to lead with a photo header. Three-column "What We Bring" visual proof strip
added before the CTA band. CTA band gains photo background.

---

## v2.13.2 — Homepage Photo Redesign
**Tag:** `v2.13.2__homepage-photo-redesign__commit-9b478f5`
**Commit:** `9b478f5` · 2026-05-07
**Type:** `feat`

**Summary:** feat(homepage): photo-driven hero, mosaic proof strip, visual credentialing

**Description:**
Hero replaces CSS illustration with full-bleed classroom photo and dark gradient
overlay. Four-photo mosaic "Real Workshops. Real Students." proof section added.
Trust strip gains product image thumbnails. Audience cards get low-opacity photo
backgrounds. Differentiators section replaced with three-photo visual proof band.
CTA band gains photo background.

---

## v2.13.1 — Photo CSS Utilities
**Tag:** `v2.13.1__photo-css-utilities__commit-fbbd35b`
**Commit:** `fbbd35b` · 2026-05-07
**Type:** `feat`

**Summary:** feat(css): add photo composition utilities to design system

**Description:**
Adds photo background, overlay, mosaic grid, and proof-strip utility classes to
`main.css` in preparation for the sitewide photo-driven redesign.

---

## v2.13.0 — WebP Photo Library
**Tag:** `v2.13.0__webp-photo-library__commit-1a0c2d5`
**Commit:** `1a0c2d5` · 2026-05-07
**Type:** `feat`

**Summary:** feat(assets): add optimised WebP photo library for visual redesign

**Description:**
Adds the full set of optimised WebP images to `src/images/` for use across hero
sections, program pages, audience cards, format cards, and proof strips.

---

## v2.12.9 — Planning Doc Extensions
**Tag:** `v2.12.9__planning-doc-extensions__commit-e4b9855`
**Commit:** `e4b9855` · 2026-05-07
**Type:** `docs`

**Summary:** docs(planning): normalize planning document extensions

**Description:**
Normalizes file extensions on planning documents for consistent tooling across
the project.

---

## v2.12.8 — Reference Doc Filename
**Tag:** `v2.12.8__reference-doc-filename__commit-3bc8887`
**Commit:** `3bc8887` · 2026-05-07
**Type:** `docs`

**Summary:** docs(reference): normalize minimal docs filename

**Description:**
Renames or normalizes a reference document filename for consistency with the
rest of the docs directory.

---

## v2.12.7 — Release Record Sync
**Tag:** `v2.12.7__release-record-sync__commit-67cad9f`
**Commit:** `67cad9f` · 2026-05-06
**Type:** `docs`

**Summary:** docs(release): sync v2.12.6 records with real tag

**Description:**
Backfills the release tracking docs after the actual v2.12.6 release commit was
created so the human-readable history references the real tagged hash.

---

## v2.12.6 — Program Prominence Visuals
**Tag:** `v2.12.6__program-prominence-visuals__commit-7edcdfc`
**Commit:** `7edcdfc` · 2026-05-06
**Type:** `feat`

**Summary:** feat(programs): spotlight flagship offerings with visuals

**Description:**
Make Coding with Robots and PSTEM more prominent across the marketing site by
adding selected Edison and Whybricks visuals to the homepage, workshops page,
and dedicated program heroes. Update shared Programs navigation to target the
neutral workshops program selector, and record the approved program prominence
implementation in release notes, changelog, and planning docs.

**What changed:**
- `index.html` and `workshops.html` — program cards now include Edison and
  Whybricks visuals for the two flagship offerings
- `programs/coding-with-robots.html` and `programs/pstem.html` — page heroes
  now include matching product visuals
- `src/css/main.css` and `src/js/components.js` — responsive visual card/hero
  styling and neutral Programs navigation target
- `CHANGELOG.md`, `RELEASE_NOTES.md`, and
  `plans/2026-05-06-program-prominence-assets.md` — release and planning records

**Stats:** 11 files changed · 289 insertions · 14 deletions

---

## v2.12.1 — Release Record Sync
**Tag:** `v2.12.1__release-record-sync__commit-541f575`
**Commit:** `541f575` · 2026-05-05
**Type:** `docs`

**Summary:** docs(release): sync v2.12.0 notes with real commit hash

**Description:**
Backfill the release-tracking docs after the actual `v2.12.0` release commit
was created so the human-readable history can reference the real tagged hash.
Also adds the missing `v2.11.0` release-notes entry so release records match
the tagged history on `main`.

**What changed:**
- `RELEASE_NOTES.md` — added v2.12.0 (Beacon) and the missing v2.11.0 entry
- `COMMIT_NOTES.md` — added the v2.12.0 release entry with the real hash

**Stats:** 2 files changed · 98 insertions

---

## v2.12.0 — Polish, SEO & Analytics Completion
**Tag:** `v2.12.0__polish-seo-analytics__commit-6c9a427`
**Commit:** `6c9a427` · 2026-05-05
**Type:** `feat`

**Summary:** feat(seo): complete polish, analytics, and metadata pass

**Description:**
Ship the remaining polish pass for the marketing site. Adds sitewide
Plausible analytics, completes Twitter card coverage, refreshes sitemap
metadata, simplifies the 404 recovery path, and closes the analytics open
decision in planning docs.

**What changed:**
- `src/js/components.js` — injects Plausible once per page for both apex and
  `www` domains
- Public HTML pages — Twitter summary card metadata added where missing
- `sitemap.xml` and `404.html` — refreshed SEO metadata and streamlined
  recovery paths
- `CHANGELOG.md`, `plans/open-decisions.md`, and
  `plans/2026-05-06-polish-and-seo.md` — release record and planning updates

**Stats:** 14 files changed · 105 insertions · 19 deletions

---

## v2.11.0 — Release Notes Current
**Tag:** `v2.11.0__release-notes-current__commit-ecb25ab`
**Commit:** `ecb25ab` · 2026-05-05
**Type:** `docs`

**Summary:** docs: update RELEASE_NOTES with v2.7.0–v2.10.0 and fix stale hashes

**Description:**
Bring RELEASE_NOTES.md back in sync with the tagged history. Adds the four
missing release entries for v2.7.0 through v2.10.0 and corrects stale
pre-rewrite hashes on older tag lines.

**What changed:**
- `RELEASE_NOTES.md` — added v2.7.0, v2.8.0, v2.9.0, and v2.10.0 entries
- `RELEASE_NOTES.md` — corrected stale hashes for v2.4.0, v2.5.0, and v2.6.0

**Stats:** 1 file changed · 65 insertions · 3 deletions

---

## v2.10.0 — Commit Notes Current
**Tag:** `v2.10.0__commit-notes-current__commit-3977f77`
**Commit:** `3977f77` · 2026-05-05
**Type:** `docs`

**Summary:** docs: backlog v2.7.0–v2.9.0 into COMMIT_NOTES and fix stale hashes

**Description:**
Backfill the structured commit log with the missing v2.7.0, v2.8.0, and
v2.9.0 entries. Also correct stale pre-rewrite hashes so the canonical tag
references match the actual tagged history.

**What changed:**
- `COMMIT_NOTES.md` — added entries for v2.7.0, v2.8.0, and v2.9.0
- `COMMIT_NOTES.md` — corrected stale hashes for v2.4.0, v2.5.0, and v2.6.0

**Stats:** 1 file changed · 103 insertions · 9 deletions

---

## v2.9.0 — Doc Scaffold Alignment + Open Decisions + Changelog
**Tag:** `v2.9.0__docs-scaffold-aligned__commit-b0a13f2`
**Commit:** `b0a13f2` · 2026-05-05
**Type:** `docs`

**Summary:** docs: complete doc scaffold alignment check, open decisions, and changelog

**Description:**
Slices 2–4 of plans/2026-05-05-initial-project-docs.md. Alignment check
confirmed no conflicts across strategy, architecture, and workflow docs.
Fixed a broken versioning link in CHANGELOG.md. Added OD-007 (Testimonials)
to open decisions. Added the v2.8.0 changelog entry.

**What changed:**
- `CHANGELOG.md` — fixed broken link (`docs/strategy/version-number-system.md`
  → `docs/VERSIONING.md`); added [2.8.0] entry covering all 19 scaffold files
- `plans/open-decisions.md` — OD-007 (Testimonials) added
- `plans/2026-05-05-initial-project-docs.md` — Slices 2–4 marked complete

**Stats:** 3 files changed · 85 insertions · 12 deletions

---

## v2.8.0 — Full Documentation Scaffold
**Tag:** `v2.8.0__docs-scaffold-complete__commit-cb62d55`
**Commit:** `cb62d55` · 2026-05-05
**Type:** `docs`

**Summary:** docs: scaffold full project documentation library from 00_RUN_FIRST.md

**Description:**
Execute the 10-step setup controller in Documents/00 Core Documents.
Creates the complete reference documentation set so agents have
authoritative source material before making content or code changes.
19 files changed; 8 non-empty existing files preserved per stop conditions.

**What changed:**
- `docs/STRATEGY.md` — structured business strategy: goals, audiences,
  value proposition, CTA rules, claims policy, brand direction
- `docs/DESIGN.md` — design system rules: tokens, typography, colour,
  GSAP animation guidelines, responsive rules
- `docs/CONTENT.md` — copy rules: tone, CTA strategy, claims policy,
  program names, metadata standards, placeholder policy
- `docs/ACCESSIBILITY.md` — WCAG 2.1 AA expectations: semantic HTML,
  keyboard nav, focus management, ARIA, form error handling
- `docs/PERFORMANCE.md` — asset loading rules, third-party script policy,
  critical rendering, image rules, known risks
- `docs/TESTING.md` — manual QA checklist: pre-commit, per-component,
  cross-browser, responsive, accessibility spot checks
- `docs/DEPLOYMENT.md` — deploy process, pre-deploy checklist, hosting
  options, local dev requirements, rollback procedure
- `docs/VERSIONING.md` — semver definitions, tag naming standard, release
  code name conventions, agent rules
- `REPO_PLANNING.md` — repo strategy, doc philosophy, source-of-truth map,
  file tree, duplicate prevention, agent execution rules
- `CONTRIBUTING.md` — contributor guide with SLS-specific constraints
- `.env.example` — documents no server-side env vars; notes REPLACE_ME location
- `.gitignore` — added `!.env.example` exception
- `design/README.md`, `design/wireframes/README.md`,
  `design/references/README.md` — design asset folder structure
- `sample-data/README.md` — placeholder for dev sample content
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist with SLS rules
- `.github/ISSUE_TEMPLATE.md` — issue form with type and priority
- `plans/2026-05-05-initial-project-docs.md` — task plan for this work

**Stats:** 19 files changed · 1,259 insertions

---

## v2.7.0 — Release Notes Reform
**Tag:** `v2.7.0__release-notes-reform__commit-2600d9d`
**Commit:** `2600d9d` · 2026-05-05
**Type:** `docs`

**Summary:** docs: reformat RELEASE_NOTES to GitHub style with proper code names

**Description:**
Rewrite all version headers to `vX.Y.Z - YYYY-MM-DD - CodeName` format.
Replace slug-style code names with single proper-word names across all
9 versions. Add missing v2.5.0 (Ledger) and v2.6.0 (Chronicle) entries.
Remove redundant bold sub-headers — sections use ### only.

**What changed:**
- `RELEASE_NOTES.md` — all 9 version headers reformatted; code names
  assigned: Foundation, Blueprint, Obsidian, Pulse, Orbit, Signal,
  Archive, Ledger, Chronicle

**Stats:** 1 file changed · 37 insertions · 37 deletions

---

## Untagged — Commit Notes Backfill for v2.5.0 and v2.6.0
**Tag:** _(none)_
**Commit:** `619becc` · 2026-05-05
**Type:** `docs`

**Summary:** docs: backlog v2.5.0 and v2.6.0 entries into COMMIT_NOTES

**Description:**
Backfill the structured commit log with entries for the two commits that
established `COMMIT_NOTES.md` and the release-notes code-name pass. Extends
the tag reference table so the canonical tag list covered the first nine
release snapshots in the repo.

**What changed:**
- `COMMIT_NOTES.md` — added entries for v2.5.0 and v2.6.0
- `COMMIT_NOTES.md` — extended the tag reference table to cover nine tags

**Stats:** 1 file changed · 44 insertions

---

## v2.6.0 — Release Notes Code Names + Backfill
**Tag:** `v2.6.0__release-notes-codenames__commit-b3f3bf3`
**Commit:** `b3f3bf3` · 2026-05-05
**Type:** `docs`

**Summary:** docs: update RELEASE_NOTES with code names and backfill v2.1.0 + v2.4.0

**Description:**
Add snapshot code names and canonical tag strings to every version header
in RELEASE_NOTES.md, aligning the file with the new tag naming standard.
Backfills the two entries that were missing from the release log:
v2.1.0 (animation-richness) and v2.4.0 (project-docs-baseline).

**What changed:**
- `RELEASE_NOTES.md` — code name + tag line added to all 7 version headers;
  v2.1.0 and v2.4.0 entries written and inserted in correct order

**Stats:** 1 file changed · 52 insertions · 5 deletions

---

## v2.5.0 — Commit Notes Baseline
**Tag:** `v2.5.0__commit-notes-baseline__commit-d19389d`
**Commit:** `d19389d` · 2026-05-05
**Type:** `docs`

**Summary:** docs: add COMMIT_NOTES.md with full commit history and tag reference

**Description:**
Establishes COMMIT_NOTES.md as the structured commit log for the project.
Documents all commits on main — summary, description, file stats, and
canonical tag per entry — with a tag reference table at the end covering
v1.0.0 through v2.4.0 in the new snapshot-naming standard.

**What changed:**
- `COMMIT_NOTES.md` — new file, 158 lines; full history for 8 commits
  plus tag reference table

**Stats:** 1 file added · 158 insertions

---

## v2.4.0 — Project Documents Library + Polish/SEO Task Plan
**Tag:** `v2.4.0__project-docs-baseline__commit-9e87d2b`
**Commit:** `9e87d2b` · 2026-05-05
**Type:** `docs`

**Summary:** docs: add project Documents library and polish/SEO task plan

**Description:**
Add the full Documents/ prompt library used to scaffold and guide Claude Code
sessions, plus TASK-polish-and-seo.md — the active scoped task plan for the
next site improvement pass.

**What changed:**
- `Documents/00 Core Documents/` — 11 prompt files (run-first, scaffolding,
  strategy, architecture, versioning, workflow, CLAUDE.md spec, etc.)
- `Documents/01 Reference Documents/` — versioning guide, doc placement notes,
  and full project-planning-stack template (16 doc types)
- `Documents/03 Optional Documents/` — Codex/Claude implementation bridge
- `Documents/# Snapshot Info.md` — repo snapshot metadata
- `TASK-polish-and-seo.md` — scoped task plan: analytics platform decision,
  SEO meta tags, favicon, SVG icons, nav fix, CSS cleanup, 404 page

**Stats:** 36 files added · 3,285 insertions

---

## v2.3.0 — Build Version Sync
**Tag:** `v2.3.0__build-version-sync__commit-c9c9c4e`
**Commit:** `c9c9c4e` · 2026-04-27
**Type:** `chore`

**Summary:** chore(sync): copy Build Version updates into GitHub repo

**Description:**
Sync pass copying updated build-version tracking files from the local build
environment into the GitHub repository to keep versioning records aligned
across both locations.

**Stats:** 17 files changed · 387 insertions · 29 deletions

---

## v2.2.0 — Hero Polish + Custom Cursor
**Tag:** `v2.2.0__hero-polish-cursor__commit-d650ed2`
**Commit:** `d650ed2` · 2026-04-26
**Type:** `feat`

**Summary:** feat(home): polish hero visual system and restore custom cursor

**Description:**
Refinement pass on the homepage hero section — tightened the visual hierarchy,
polished motion behaviour, and restored the custom cursor that was dropped
during the GSAP redesign. Scoped to the home page and shared animation layer.

**Stats:** 11 files changed · 422 insertions · 32 deletions

---

## v2.1.0 — Animation Richness Pass
**Tag:** `v2.1.0__animation-richness__commit-01cd06d`
**Commit:** `01cd06d` · 2026-04-25
**Type:** `feat`

**Summary:** feat: enhance animation richness across site

**Description:**
Expanded GSAP-driven animation coverage across all pages. Added stagger
sequences, scroll-triggered reveals, and timing refinements to deepen the
motion system introduced in v2.0.0. Also extended the workshops page with
new structured content sections.

**Stats:** 16 files changed · 834 insertions · 137 deletions

---

## v2.0.0 — Dark Dramatic Redesign + GSAP Motion System
**Tag:** `v2.0.0__dark-redesign-gsap__commit-e8ea95f`
**Commit:** `e8ea95f` · 2026-04-24
**Type:** `feat`

**Summary:** feat: dark dramatic redesign with full GSAP motion system

**Description:**
Major visual overhaul. Replaced the light design system with a dark, high-
contrast aesthetic. Introduced GSAP as the animation engine with a full motion
system: page-entry animations, scroll-triggered reveals, hover states, and
a custom cursor. Breaking visual change from v1.x — new design direction for
all pages.

**Stats:** 12 files changed · 869 insertions · 522 deletions

---

## v1.1.0 — Project Documentation Infrastructure
**Tag:** `v1.1.0__project-docs-infra__commit-e8b2634`
**Commit:** `e8b2634` · 2026-04-24
**Type:** `feat`

**Summary:** feat: implement project documentation infrastructure

**Description:**
Established the docs/ and plans/ directory structure to support structured
Claude Code workflows. Added the plan template, open decisions log, and
strategy/workflow reference docs that underpin all future task planning.

**Stats:** 10 files changed · 674 insertions

---

## v1.0.0 — Initial Site Rebuild
**Tag:** `v1.0.0__initial-site-rebuild__commit-633602f`
**Commit:** `633602f` · 2026-04-24
**Type:** `feat`

**Summary:** feat: initial site rebuild — static marketing site with full page set

**Description:**
Complete rebuild of the Smart Learning Solutions marketing site as a static
HTML/CSS/JS site. Full page set delivered: home, about, workshops, programs
(Coding with Robots + PSTEM), resources, contact, and booking. Shared header
and footer managed via components.js. Design system established in main.css.

**Stats:** 42 files changed · 4,141 insertions

---

## Untagged — Initial Commit
**Tag:** _(none)_
**Commit:** `99eacf5` · 2026-04-24
**Type:** `chore`

**Summary:** Initial commit

**Description:**
Repository initialisation commit. Empty baseline before site work began.

**Stats:** 1 file added

---

## Tag Reference

| Tag | Commit | Date |
|-----|--------|------|
| `v2.15.6` | `41cb585` | 2026-06-04 |
| `v2.15.5` | `b2b5e05` | 2026-06-04 |
| `v2.15.4` | `28a8ae6` | 2026-06-04 |
| `v2.15.3` | `b378f03` | 2026-06-04 |
| `v2.15.2` | `505a500` | 2026-06-04 |
| `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-894bc72` | `894bc72` | 2026-05-16 |
| `v2.14.6__session-progress-note__commit-431f540` | `431f540` | 2026-05-16 |
| `v2.14.5__context-and-status-docs__commit-c4a7d9d` | `c4a7d9d` | 2026-05-15 |
| `v2.14.4__ignore-claude-local-settings__commit-1055fd7` | `1055fd7` | 2026-05-15 |
| `v2.14.3__audit-doc-and-docs-sync__commit-f8f8028` | `f8f8028` | 2026-05-15 |
| `v2.14.2__docs-current-to-v2-14-1__commit-179f16a` | `179f16a` | 2026-05-15 |
| `v2.14.1__prompts-workflow-templates__commit-9457ab9` | `9457ab9` | 2026-05-15 |
| `v2.14.0__programs-launch-site-hardening__commit-fcdfda6` | `fcdfda6` | 2026-05-15 |
| `v2.13.7__changelog-backfill__commit-aaa3399` | `aaa3399` | 2026-05-07 |
| `v2.13.6__release-notes-v2-13__commit-aded593` | `aded593` | 2026-05-07 |
| `v2.13.5__workshops-photo-cards__commit-e75b131` | `e75b131` | 2026-05-07 |
| `v2.13.4__program-pages-photography__commit-8693b15` | `8693b15` | 2026-05-07 |
| `v2.13.3__about-photo-redesign__commit-962def2` | `962def2` | 2026-05-07 |
| `v2.13.2__homepage-photo-redesign__commit-9b478f5` | `9b478f5` | 2026-05-07 |
| `v2.13.1__photo-css-utilities__commit-fbbd35b` | `fbbd35b` | 2026-05-07 |
| `v2.13.0__webp-photo-library__commit-1a0c2d5` | `1a0c2d5` | 2026-05-07 |
| `v2.12.9__planning-doc-extensions__commit-e4b9855` | `e4b9855` | 2026-05-07 |
| `v2.12.8__reference-doc-filename__commit-3bc8887` | `3bc8887` | 2026-05-07 |
| `v2.12.7__release-record-sync__commit-67cad9f` | `67cad9f` | 2026-05-06 |
| `v2.12.6__program-prominence-visuals__commit-7edcdfc` | `7edcdfc` | 2026-05-06 |
| `v2.12.4__release-notes-v2-12-3__commit-b8c246a` | `b8c246a` | 2026-05-05 |
| `v2.12.3__version-narrative-alignment__commit-860c1df` | `860c1df` | 2026-05-05 |
| `v2.12.2__commit-history-backfill__commit-545016b` | `545016b` | 2026-05-05 |
| `v2.12.1__release-record-sync__commit-541f575` | `541f575` | 2026-05-05 |
| `v2.12.0__polish-seo-analytics__commit-6c9a427` | `6c9a427` | 2026-05-05 |
| `v2.11.0__release-notes-current__commit-ecb25ab` | `ecb25ab` | 2026-05-05 |
| `v2.10.0__commit-notes-current__commit-3977f77` | `3977f77` | 2026-05-05 |
| `v2.9.0__docs-scaffold-aligned__commit-b0a13f2` | `b0a13f2` | 2026-05-05 |
| `v2.8.0__docs-scaffold-complete__commit-cb62d55` | `cb62d55` | 2026-05-05 |
| `v2.7.0__release-notes-reform__commit-2600d9d` | `2600d9d` | 2026-05-05 |
| `v2.6.0__release-notes-codenames__commit-b3f3bf3` | `b3f3bf3` | 2026-05-05 |
| `v2.5.0__commit-notes-baseline__commit-d19389d` | `d19389d` | 2026-05-05 |
| `v2.4.0__project-docs-baseline__commit-9e87d2b` | `9e87d2b` | 2026-05-05 |
| `v2.3.0__build-version-sync__commit-c9c9c4e` | `c9c9c4e` | 2026-04-27 |
| `v2.2.0__hero-polish-cursor__commit-d650ed2` | `d650ed2` | 2026-04-26 |
| `v2.1.0__animation-richness__commit-01cd06d` | `01cd06d` | 2026-04-25 |
| `v2.0.0__dark-redesign-gsap__commit-e8ea95f` | `e8ea95f` | 2026-04-24 |
| `v1.1.0__project-docs-infra__commit-e8b2634` | `e8b2634` | 2026-04-24 |
| `v1.0.0__initial-site-rebuild__commit-633602f` | `633602f` | 2026-04-24 |
