# Commit Notes — Smart Learning Solutions

All commits on `main`, newest first. Each entry includes the canonical tag,
commit hash, date, summary, and description.

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
