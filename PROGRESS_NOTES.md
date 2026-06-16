# Progress Notes — Smart Learning Solutions

This is the cumulative progress log for notable project sessions. `PROGRESS_NOTE.md`
remains the focused current-session note and may be overwritten as work advances.

---

## v2.16.0 — 2026-06-16 — Add Project Starter Kit v3.3 and Push Workflow Prompts

**Tag:** `v2.16.0`
**Commit:** `8dc05d7`

### Summary
Added project-starter-kit-v3.3/ reference library and two push workflow prompt files
to the repo. No site code changed.

### Files
- `project-starter-kit-v3.3/` — full v3.3 starter kit library (4 root files + subdirectory)
- `prompts/repo_push_handoff_snapshot_tag_prompt.md` — push/handoff/snapshot workflow prompt
- `prompts/_repo_push_handoff_snapshot_tag_prompt_post_check.md` — post-check verification prompt
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md`, `RELEASE_NOTES.md` — version records updated

### Notes for Next Agent
Formspree REPLACE_ME and deployment host remain the two hard launch blockers.
No site code changed in this push — tooling files only.

---

## v2.15.7 — 2026-06-04 — Remove Program Card Proof Strip

**Tag:** `v2.15.7`
**Commit:** `f96228c`

### Summary
Removed the 80px student photo strip (.program-card-proof) from both program cards
on programs/index.html and index.html. Each card now shows only the product photo.
Removed the corresponding CSS block from main.css. Strengthened the bottom gradient
on .program-card-media--product::after so the light product area fades into the dark
card body rather than cutting hard.

### Files
- `programs/index.html` — proof strip removed from both cards
- `index.html` — proof strip removed from both cards
- `src/css/main.css` — .program-card-proof block removed; ::after gradient strengthened
- `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — version records updated

---

## v2.15.6 — 2026-06-04 — Migration Decision Update and Checklist

**Tag:** `v2.15.6`
**Commit:** `41cb585`

### Summary
Updated ADR-008 in DECISION_LOG.md to reflect completed migration state (v2.15.5):
added Completed date, full files-added list, files-updated list, and Gate 1 fixes note.
Created MIGRATION_CHECKLIST.md — permanent verification record confirming all 18 required
v2 files exist, no app code changed, mandatory files preserved, Gate 0 defined, and file
responsibilities enforced. Result: PASS. Migration complete.

### Files
- `DECISION_LOG.md` — ADR-008 updated with Completed date and full file lists
- `MIGRATION_CHECKLIST.md` — Created
- `STATUS.md` — Version bump to v2.15.6, migration entry added to Done
- `PROGRESS_NOTE.md` — v2.15.6 session entry prepended
- `PROGRESS_NOTES.md` — v2.15.6 cumulative entry added
- `COMMIT_NOTES.md` — v2.15.6 entry prepended

---

## v2.15.5 — 2026-06-04 — File Responsibility Cleanup

**Tag:** `v2.15.5`
**Commit:** `b2b5e05`

### Summary
Enforced single-responsibility boundaries across planning docs per step 8 of the v2
migration guide. No content deleted — overlapping sections replaced with pointers to
canonical files. No application code changed.

### Files
- `ROADMAP.md` — Removed Completed/Deferred/Blockers sections; added pointers to CHANGELOG.md, BACKLOG.md, STATUS.md
- `PROJECT_BRIEF.md` — Condensed Programs/Audiences/Decisions/Tech Stack tables to summaries; deferred detail to CONTEXT.md
- `BACKLOG.md` — Removed Resolved/Closed section; added pointer to CHANGELOG.md
- `STATUS.md` — Condensed Audit Findings to one line; removed Deferred section
- `PLAN.md` — Replaced plan-index structure with Current State prose
- `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — version bump and session records

---

## v2.15.4 — 2026-06-04 — File Responsibility Map

**Tag:** `v2.15.4`
**Commit:** `28a8ae6`

### Summary
Created `FILE_MAP.md` — a full inventory of every tracked file in the repo, grouped by
category (site pages, core assets, planning docs, release tracking, config, docs/, plans/,
prompts/, legacy). Each entry records purpose, owner, and edit frequency. Updated PLAN.md
to reference it.

### Files
- `FILE_MAP.md` — Created
- `PLAN.md` — Updated (pointer to FILE_MAP.md)
- `STATUS.md` — Updated (version to v2.15.4, FILE_MAP entry in Done)
- `PROGRESS_NOTE.md` — Updated (v2.15.4 session entry)
- `PROGRESS_NOTES.md` — Updated (v2.15.4 cumulative entry)
- `COMMIT_NOTES.md` — Updated (v2.15.4 entry)

---

## v2.15.3 — 2026-06-04 — Gate 1 Launch-Readiness Fixes

**Tag:** `v2.15.3`
**Commit:** `b378f03`

### Summary
Executed all dev-executable Gate 1 launch-readiness items. No owner-gated items (Formspree,
deployment host) are included. Five audit findings resolved: C-2 cursor CSS gate, H-2 GSAP
SRI hashes, M-2 title em-dash, M-3 PSTEM image dimensions, M-6 tel: + prefix.

### Files
- `src/css/main.css` — C-2: removed ungated `cursor: none` from `.btn`
- `about.html`, `book.html`, `contact.html`, `index.html`, `resources.html`, `workshops.html`, `programs/coding-with-robots.html`, `programs/index.html`, `programs/pstem.html` — H-2: SRI hashes on GSAP scripts
- `programs/index.html` — M-2: title hyphen → em-dash; M-3: PSTEM image width/height
- `book.html`, `contact.html`, `src/js/components.js` — M-6: tel: + prefix
- `BACKLOG.md`, `PHASE_GATES.md`, `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — planning docs updated

---

## v2.15.2 — 2026-06-04 — v2 Planning Migration

**Tag:** `v2.15.2`
**Commit:** `505a500`

### Summary
Completed the v2 project-control planning system migration. Added 7 missing required
files and updated existing docs with planning system pointers. Resolved a remote sync
conflict (remote had advanced to v2.15.1 while migration was in progress) by rebasing
stashed changes onto the synced remote and updating version references to v2.15.2.

### Files
- `PROJECT_BRIEF.md` — Created
- `PLAN.md` — Created
- `PHASE_GATES.md` — Created
- `BACKLOG.md` — Created
- `DECISION_LOG.md` — Created
- `SLICE_REVIEWS.md` — Created
- `LESSONS_LEARNED.md` — Created
- `CLAUDE.md` — Updated (Planning System section appended)
- `AGENTS.md` — Updated (Planning System section appended)
- `STATUS.md` — Updated (version to v2.15.2, migration entry added)
- `PROGRESS_NOTE.md` — Updated (v2.15.2 session entry)
- `PROGRESS_NOTES.md` — Updated (v2.15.2 cumulative entry)
- `COMMIT_NOTES.md` — Updated (v2.15.2 entry prepended, conflict resolved)

---

## v2.15.1 — 2026-05-22 — Hash Correction and Docs Sync

**Tag:** `v2.15.1`
**Commit:** `04875a3` (tagged) + `967ba07` (docs update)

### Summary
Tagged the untagged hash-correction commit `04875a3` as `v2.15.1` and synced
all six release-tracking files to document it.

### Files
- `CHANGELOG.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`
- `ROADMAP.md`

---

## v2.15.0 — 2026-05-22 — Docs Sync and Tag Format Cleanup

**Tag:** `v2.15.0`
**Commit:** `b192aff`

### Summary
All six release-tracking documentation files synced to v2.15.0. Tag format
switched from verbose slug style to clean semver (`vX.Y.Z`) going forward.

### Files
- `CHANGELOG.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`
- `ROADMAP.md`

---

## v2.14.8 — 2026-05-16 — Update Workflow File List

**Tag:** `v2.14.8__prompts-update-file-list__commit-cc88cfd`
**Commit:** `cc88cfd`

### Summary
The update workflow prompt was adjusted so future documentation sync sessions name
both progress-note files: `PROGRESS_NOTE.md` for the current focused session and
`PROGRESS_NOTES.md` for the cumulative project progress log.

### Files
- `prompts/Update.md`

---

## v2.14.7 — 2026-05-16 — Documentation Sync

**Tag:** `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-894bc72`
**Commit:** `95727b6`

### Summary
Release tracking documents were synced through v2.14.7, and the roadmap was
updated to show the creation of root reference docs as completed work.

### Files
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `CHANGELOG.md`
- `PROGRESS_NOTE.md`
- `ROADMAP.md`

---

## v2.14.6 — 2026-05-16 — Session Progress Note

**Tag:** `v2.14.6__session-progress-note__commit-431f540`
**Commit:** `431f540`

### Summary
`PROGRESS_NOTE.md` was rewritten as a structured session log for the v2.14.3
through v2.14.5 work block.

### Files
- `PROGRESS_NOTE.md`

---

## v2.14.5 — 2026-05-15 — Context and Status Docs

**Tag:** `v2.14.5__context-and-status-docs__commit-c4a7d9d`
**Commit:** `c4a7d9d`

### Summary
Root-level `CONTEXT.md` and `STATUS.md` were created so future sessions can
quickly recover stable project background and present state without digging
through the full documentation set.

### Files
- `CONTEXT.md`
- `STATUS.md`

---

## v2.14.4 — 2026-05-15 — Local Settings Hygiene

**Tag:** `v2.14.4__ignore-claude-local-settings__commit-1055fd7`
**Commit:** `1055fd7`

### Summary
`.claude/` was added to `.gitignore` so local Claude Code settings do not appear
as untracked files or accidentally enter version control.

### Files
- `.gitignore`

---

## v2.14.3 — 2026-05-15 — Audit Publication and Docs Sync

**Tag:** `v2.14.3__audit-doc-and-docs-sync__commit-f8f8028`
**Commit:** `3dfc603`

### Summary
The full site audit was published and the release-tracking docs were brought
current through v2.14.3. This session also recovered from an interrupted docs
sync by carefully updating the remaining files and preserving UTF-8 encoding.

### Files
- `AUDIT.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `CHANGELOG.md`
- `PROGRESS_NOTE.md`
- `ROADMAP.md`
- `prompts/Update.md`
