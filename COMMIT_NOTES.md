# Commit Notes — Smart Learning Solutions

All commits on `main`, newest first. Each entry includes the canonical tag,
commit hash, date, summary, and description.

---

## v2.6.0 — Release Notes Code Names + Backfill
**Tag:** `v2.6.0__release-notes-codenames__commit-1d5b48e`
**Commit:** `1d5b48e` · 2026-05-05
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
**Tag:** `v2.5.0__commit-notes-baseline__commit-c276b7a`
**Commit:** `c276b7a` · 2026-05-05
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
**Tag:** `v2.4.0__project-docs-baseline__commit-3e0a2ee`
**Commit:** `3e0a2ee` · 2026-05-05
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
| `v2.6.0__release-notes-codenames__commit-1d5b48e` | `1d5b48e` | 2026-05-05 |
| `v2.5.0__commit-notes-baseline__commit-c276b7a` | `c276b7a` | 2026-05-05 |
| `v2.4.0__project-docs-baseline__commit-3e0a2ee` | `3e0a2ee` | 2026-05-05 |
| `v2.3.0__build-version-sync__commit-c9c9c4e` | `c9c9c4e` | 2026-04-27 |
| `v2.2.0__hero-polish-cursor__commit-d650ed2` | `d650ed2` | 2026-04-26 |
| `v2.1.0__animation-richness__commit-01cd06d` | `01cd06d` | 2026-04-25 |
| `v2.0.0__dark-redesign-gsap__commit-e8ea95f` | `e8ea95f` | 2026-04-24 |
| `v1.1.0__project-docs-infra__commit-e8b2634` | `e8b2634` | 2026-04-24 |
| `v1.0.0__initial-site-rebuild__commit-633602f` | `633602f` | 2026-04-24 |
