# Decision Log

Canonical log of significant architectural and process decisions made during this project.

Historical ADRs (ADR-001 through ADR-007) are in `DECISIONS.md` and are preserved there.
New decisions from v2.15.0 onward are recorded here.

---

## ADR-008 — Adopt v2 Project-Control Planning System
**Date:** 2026-05-16
**Completed:** v2.15.5 · 2026-06-04
**Decision:** Migrate the repo's planning and documentation to the v2 project-control system.
**Context:** The repo had grown to 15+ root-level docs files with overlapping purposes,
no phase gates, no backlog, no lessons-learned record, and no formal decision log.
The v2 system introduces a defined file set, phase gates, a backlog, and a canonical
decision log to bring structure to the pre-launch and post-launch work.
**Options considered:** Keep existing ad-hoc structure; adopt v2 system
**Chosen:** Adopt v2 system
**Reason:** The site is pre-launch and adding structure now costs little; waiting until
post-launch adds it to an already-live maintenance burden.
**Consequences:**
- Positive: clear phase gates; backlog is trackable; lessons are recorded; decisions are findable
- Negative: more files to maintain; some overlap between old and new docs during transition
- Risk: doc maintenance burden if update discipline lapses
**Files added:** PROJECT_BRIEF.md, PLAN.md, PHASE_GATES.md, BACKLOG.md, DECISION_LOG.md,
SLICE_REVIEWS.md, LESSONS_LEARNED.md, PROGRESS_NOTES.md, FILE_MAP.md
**Files updated:** CLAUDE.md, AGENTS.md, STATUS.md, PROGRESS_NOTE.md, COMMIT_NOTES.md,
ROADMAP.md, PROJECT_BRIEF.md, BACKLOG.md, PLAN.md
**Gate 1 fixes (v2.15.3):** C-2 cursor CSS gate, H-2 GSAP SRI hashes, M-2 title em-dash,
M-3 PSTEM image dimensions, M-6 tel: + prefix — all resolved during migration window

---

## ADR-009 — nginx `try_files` Pattern for Static HTML Sites with Clean URLs
**Date:** 2026-06-17
**Version:** v2.16.1

### Decision
Use `try_files $uri $uri/ $uri.html =404` in nginx for this static site, plus
`error_page 404 /404.html` with `location = /404.html { internal; }`.

### Reason
The site uses `.html` files (e.g. `about.html`, `workshops.html`) but links and
users navigate to clean URLs without the extension. Without `$uri.html`, nginx
returns 404 for any clean URL even though the file exists. The custom 404 page
must be declared `internal` to prevent direct access to `/404.html` returning 200.

### Alternatives Considered
- Rename all pages to `index.html` inside subdirectories — rejected as too disruptive
- Use nginx `rewrite` rules — unnecessary; `try_files` handles this cleanly

### Consequences
- All clean URLs resolve correctly
- Custom 404 page served on all unmatched routes
- Pattern must be replicated if site is moved to a new nginx host

---

## ADR-010 — (next decision)
_Reserved for future use._
