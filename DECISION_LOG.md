# Decision Log

Canonical log of significant architectural and process decisions made during this project.

Historical ADRs (ADR-001 through ADR-007) are in `DECISIONS.md` and are preserved there.
New decisions from v2.15.0 onward are recorded here.

---

## ADR-008 — Adopt v2 Project-Control Planning System
**Date:** 2026-05-16
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
SLICE_REVIEWS.md, LESSONS_LEARNED.md, PROGRESS_NOTES.md

---

## ADR-009 — (next decision)
_Reserved for future use._
