# Slice Reviews

Record of significant work slices reviewed before and after implementation.

---

## SR-002 — VPS nginx Routing Fix (v2.16.1)
**Date:** 2026-06-17
**Version:** v2.16.1

**Slice:** Fix nginx clean URL routing and custom 404 on staging VPS.

**Pre-review finding:** `curl` confirmed `/workshops.html` → 200 but `/workshops` → 404.
nginx default 404 (162 bytes) served instead of custom `404.html`.

**Change:** Updated `/etc/nginx/sites-available/smart-learning-solutions`:
- `try_files $uri $uri/ =404` → `try_files $uri $uri/ $uri.html =404`
- Added `error_page 404 /404.html; location = /404.html { internal; }`

**Post-review result:** `/workshops`, `/about` → 200. Custom 404 → 2795 bytes. `nginx -t` ok.

**Risk:** None remaining. Config backed up to `smart-learning-solutions.bak` on server.

---

## SR-001 — v2 Planning Migration (v2.15.0)
**Date:** 2026-05-16
**Version:** v2.15.0
**Commit:** `docs: migrate project planning system to v2`

**What was reviewed:**
- Phase 1 audit of existing docs against v2 required file list
- Gap analysis: 7 missing files identified
- Overlap analysis: AGENTS.md/CLAUDE.md duplication; confirmed-decisions scattered across 5 files
- Source-of-truth conflicts mapped

**What was changed:**
- Added 8 missing v2 files (PROJECT_BRIEF, PLAN, PHASE_GATES, BACKLOG, DECISION_LOG, SLICE_REVIEWS, LESSONS_LEARNED, PROGRESS_NOTES)
- Updated CLAUDE.md and AGENTS.md with v2 planning system pointers
- Updated STATUS.md and PROGRESS_NOTE.md to v2.15.0

**What was preserved:**
- All existing content in all existing files
- COMMIT_NOTES.md unconditionally
- PROGRESS_NOTE.md unconditionally
- ROADMAP.md, CHANGELOG.md, RELEASE_NOTES.md, STATUS.md, CONTEXT.md
- DECISIONS.md (historical ADRs intact; DECISION_LOG.md is additive)

**Unresolved after this slice:**
- AGENTS.md/CLAUDE.md duplication not yet resolved (additive only; merge deferred)
- Confirmed-decisions tables still exist in 5 places (consolidation deferred)
- TASK-polish-and-seo.md at root level not moved (awaiting specific approval)
- README.md version line not updated (kept out of migration scope)

---

## SR-002 — (next review)
_Reserved for next significant work slice._
