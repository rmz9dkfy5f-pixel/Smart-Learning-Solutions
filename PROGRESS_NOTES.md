# Progress Notes — Smart Learning Solutions

This is the cumulative progress log for notable project sessions. `PROGRESS_NOTE.md`
remains the focused current-session note and may be overwritten as work advances.

---

## v2.20.0 — 2026-06-25 — V3.4 Production-Readiness Audit + Portable Fixes

**Commit:** TBD · branch `main`

### Summary
V3.4 production-readiness audit run across all 10 pages, shared JS/CSS, forms, SEO,
accessibility, and deployment posture. Result: **BLOCKED for client launch**. New critical
finding: owner indicated site "may go on Wix" — Wix cannot host this hand-coded static repo.
Scope restricted to portable fixes only: privacy policy draft added, governance stubs filled,
README corrected, ADR-013/L-012/L-013/R-002–R-004 logged. All held code fixes documented.

### Work Completed
- V3.4 production-readiness audit — full read-only pass
- `legal/privacy-policy.md` — new portable privacy policy draft
- `docs/governance/REPO_HEALTH_CHECK.md` — filled from empty stub with real audit findings
- `docs/governance/RELEASE_GATE.md` — filled from empty stub — status BLOCKED
- `docs/governance/PROJECT_RISK_REGISTER.md` — R-002, R-003, R-004 added; R-001 closed
- `README.md` — version corrected; stale note removed
- `STATUS.md` — v2.20.0 bump + audit section + ADR/risk/lesson references
- `DECISION_LOG.md` — ADR-013 filled (Wix/portable-fixes-only decision)
- `LESSONS_LEARNED.md` — L-012, L-013 added
- `PHASE_GATES.md` — Gate 1 privacy policy criterion + Wix risk note
- `BACKLOG.md` — hosting blocker added; M-7, M-8 hold conditions noted

### Notes for Next Agent
Two hard blockers: (1) Formspree `REPLACE_ME` in `book.html` + `contact.html`; (2) hosting
platform unconfirmed (possible Wix rebuild). Do not invest in code fixes until platform is
confirmed. Privacy policy draft ready at `legal/privacy-policy.md` — owner must fill
placeholders and publish on chosen platform.

---

## v2.19.0 — 2026-06-21 — V3.4 Project Starter Kit Migration

**Commit:** `2100943` · branch `main`

### Summary
Project Starter Kit V3.4 migrated into the repo in MIGRATE_EXISTING_PROJECT mode. Non-destructive install: 40 new files added across `docs/governance/`, `docs/project/`, `ai/`, `.agents/skills/`. Existing AGENTS.md and CLAUDE.md preserved; V3.4 template versions quarantined in `.v34_migration_review/`. V3.4 validator: PASS.

### Work Completed
- Ran V3.4 installer dry-run, confirmed predicted outcome (38 fresh installs, 3 conflicts)
- Applied install: 40 new files; no tracked files modified
- Ran V3.4 validator: `Status: PASS` (exit 0) — all 22 required paths present, all 8 skill frontmatters valid
- Performed agent review of core V3.4 governance files per `00_EXECUTE_ME.md` Step 7

### Files Changed (new — none modified)
- `docs/governance/` — 15 governance documents
- `docs/project/` — 9 project documents
- `ai/agents/`, `ai/prompts/`, `ai/reports/` — agent ops
- `.agents/skills/v34-{execution-loop,migration-loop,production-readiness,context-eval-loop}/SKILL.md`
- `00_MIGRATION_KICKOFF.md`, `MIGRATION_REPORT.md`, `V34_INSTALL_REPORT.json`
- `.v34_migration_review/` — AGENTS.md + CLAUDE.md + .DS_Store V3.4 candidates

### Validation
- Dry-run output matched prediction before apply
- `git diff --stat` empty after install (no tracked file modified)
- V3.4 validator: PASS

### Notes for Next Agent
V3.4 is installed and validated. `.claude/skills/` was already gitignored — reload Claude Code to pick up the new skills from `.claude/skills/`. Follow-up: reconcile V3.4 stub docs in `docs/governance/` and `docs/project/` with existing root-level equivalents; review/merge `.v34_migration_review/` candidates.

---

## v2.18.1 — 2026-06-19 — Mobile-Nav CTA Label Centering

**Commit:** `e0127b0` · branch `fix/mobile-responsive-20260619`

### Summary
Follow-up to the v2.18.0 mobile pass. The **Request a Workshop** CTA inside the open mobile nav rendered with its label hard against the left edge instead of centered. Fixed by restoring flex centering on the button, then bumped the `main.css` cache token so the fix is fetched on all 10 pages.

### Work Completed
- Added `display: flex` to `.mobile-nav .btn` (specificity 0,2,0) so the already-present `justify-content: center` takes effect
- Diagnosed root cause: `.mobile-nav a { display: block }` (0,1,1) was overriding `.btn { display: inline-flex }` (0,1,0); the button was a block box, so `justify-content: center` was inert and the label fell back to start/left alignment
- Bumped cache token `?v=mobile-20260619c` → `?v=mobile-20260619d` on `main.css` across all 10 HTML files; `components.js` token left unchanged (not modified)

### Files Changed
- `src/css/main.css` — one declaration added to `.mobile-nav .btn`
- All 10 HTML files — `main.css` cache token bumped
- `STATUS.md`, `PROGRESS_NOTES.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — handoff/release records

### Validation
- CSS brace count balanced
- All 10 HTML files confirmed on `?v=mobile-20260619d` (main.css); `components.js` token unchanged at `?v=mobile-20260619`
- `git diff --stat` reviewed

### Notes for Next Agent
Branch `fix/mobile-responsive-20260619` — merge to `main` when owner approves. Formspree and production domain remain the two launch blockers.

---

## v2.18.0 — 2026-06-19 — Mobile Responsive Fixes

**Code commit:** `ca43fb2` · branch `fix/mobile-responsive-20260619`

### Summary
Four-slice mobile responsive fix pass. Diagnosed defects from on-device iPhone screenshots and fixed them across all 10 pages: full-screen nav overlay (no page content bleed-through), hamburger breakpoint raised to ≤1100px (iPad CTA clipping fixed), hero proof-photo crop and radius normalised, eyebrow font-size specificity bug fixed, and mobile nav CTA button colour fixed.

### Work Completed
- Converted `.mobile-nav` from content-height dropdown to `inset:0` full-screen overlay with solid `--bg` background (ADR-010)
- Added `body.nav-open .site-header` opaque rule so page `<h1>` no longer shows behind the logo
- Added `closeNav()` helper called on link-tap, Escape, and `pageshow` — menu can never get stuck open
- Raised hamburger breakpoint to ≤1100px (ADR-011); measured: CTA was squished to ~64px at 800px
- Added `.header-cta { flex-shrink: 0 }` to prevent flexbox from collapsing the CTA label
- Fixed `.hero-content .eyebrow` specificity (0,2,0) to beat `.hero-content p` (0,1,1) at 16px
- Program proof photos: `border-radius: --radius-lg`, `object-position: center center`, `aspect-ratio: 16/10` at ≤768px
- Section-break strip: same pattern with `aspect-ratio: 16/9`
- Fixed `.mobile-nav a.btn--primary` colour to stay `#fff` (`.mobile-nav a` muted grey was winning)
- Bumped cache token to `?v=mobile-20260619c` on all 10 HTML files

### Files Changed
- `src/css/main.css` — all layout and style fixes
- `src/js/components.js` — nav open/close logic rewritten with `closeNav()` helper
- All 10 HTML files — cache token bumped
- `DECISION_LOG.md` — ADR-010 + ADR-011
- `PLAN.md`, `plans/2026-06-19-mobile-responsive-fixes.md` — plan records
- `STATUS.md`, `PROGRESS_NOTES.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md`, `CHANGELOG.md`, `SLICE_REVIEWS.md`, `LESSONS_LEARNED.md`, `BACKLOG.md` — handoff docs

### Validation
- CSS brace count balanced: 397 open / 397 close
- JS syntax check: pass
- All 10 HTML files confirmed on `mobile-20260619c` token
- Visual: headed Playwright preview at ~390px (phone) and ~820px (iPad portrait), resizable window confirmed hamburger/desktop nav flip at 1100px

### Notes for Next Agent
Branch `fix/mobile-responsive-20260619` is pushed. Merge to `main` when owner approves. The two launch blockers (Formspree, production domain) are unchanged.

---

## v2.17.0 — 2026-06-17 — Full Production-Readiness Audit

**Tag:** `v2.17.0`
**Commit:** `c002cd2`

### Summary
Read-only production-readiness audit of the full site. Audit confirms the site is content-complete and Gate 0 passed. Gate 1 (Launch Readiness) remains blocked on two owner-gated decisions: Formspree endpoint and production domain DNS. All dev work is otherwise done. Audit documented in `plans/2026-06-17-website-status-audit.md` for cross-machine access.

### Work Completed
- Audited all 10 pages against content rules (CTAs, virtual language, pricing, parent framing, program names)
- Audited shared chrome (components.js, main.css, animations.js)
- Audited planning system consistency (STATUS, PHASE_GATES, BACKLOG, PLAN, DECISION_LOG — all consistent)
- Audited deployment/infra (nginx, sitemap, robots.txt, Formspree, Plausible, CDN deps, asset paths)
- Produced full structured audit report in `plans/2026-06-17-website-status-audit.md`

### Files Changed
- `plans/2026-06-17-website-status-audit.md` — new audit report
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — version records updated

### Validation
- Read-only audit — no code changes; all findings based on repo state at v2.16.1
- Repo working tree was clean before and after audit

### Notes for Next Agent
Both launch blockers are owner-gated. No code work possible until:
1. Formspree endpoint ID provided (C-1 / OD-001)
2. Production domain target confirmed (H-1 / OD-003)
See `plans/2026-06-17-website-status-audit.md` §5 for the 5-step Gate 1 → Production checklist.

---

## v2.16.1 — 2026-06-17 — VPS nginx Routing Fix and SSH Access

**Tag:** `v2.16.1`
**Commit:** `d920627`

### Summary
Diagnosed and fixed nginx 404 on `smart-learning-solutions.craftandconscious.com`. Root cause
was missing `$uri.html` in `try_files` — clean URLs like `/workshops` and `/about` 404'd even
though the `.html` files existed. Custom 404 page was also not configured. Both fixed directly
on the VPS. SSH key added to VPS for future direct Claude Code access. Debug notes documented
in `docs/debug/nginx-404-debug.md`.

### Work Completed
- Diagnosed nginx 404 via curl: `.html` routes returned 200, clean URLs returned 404
- Fixed `/etc/nginx/sites-available/smart-learning-solutions`: added `$uri.html` to `try_files`
  and added `error_page 404 /404.html` with `location = /404.html { internal; }`
- Verified all routes: `/workshops`, `/about`, `/programs` all correct; custom 404 confirmed
- Added SSH public key (`~/.ssh/id_ed25519.pub`) to VPS authorized_keys
- Renamed 9 sloppy RepoBackup snapshot folders (v2.15.0–v2.16.0) to full descriptive names
- Created `docs/debug/nginx-404-debug.md` documenting root cause and fix

### Files
- `docs/debug/nginx-404-debug.md` — new debug notes
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — version records updated
- VPS: `/etc/nginx/sites-available/smart-learning-solutions` (server-side, not in repo)

### Validation
- `curl https://smart-learning-solutions.craftandconscious.com/workshops` → 200
- `curl https://smart-learning-solutions.craftandconscious.com/about` → 200
- `curl https://smart-learning-solutions.craftandconscious.com/nonexistent` → 404 (custom page, 2795 bytes)
- `sudo nginx -t` → ok; `systemctl reload nginx` → ok

### Notes for Next Agent
VPS is accessible via `ssh -i ~/.ssh/id_ed25519 root@74.208.9.49`. Formspree REPLACE_ME
and production domain pointing remain the two hard launch blockers.

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
