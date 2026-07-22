# Plan

## Current State

**Phase:** Gate 1 — Launch Readiness (in progress)

All dev-executable items for Gate 1 are complete. C-1 (Formspree → Web3Forms, v2.23.0) and
M-1 (OG image SVG → PNG, v2.24.0) are both resolved. The one remaining blocker is
owner/client-gated and cannot advance without external input:

| Blocker | Owner action required |
|---|---|
| H-1 / OD-003 — Deployment host | Client to accept/reject the self-host proposal (existing staging VPS); once accepted, point production DNS and verify `/programs/` routing end-to-end |

**Confirmed queue (2026-07-22):** M-7 (`_next` redirect field) was scoped and closed as not
applicable (see `DECISION_LOG.md` ADR-018). Owner confirmed working the remaining Medium-priority
Gate-1/Gate-2 backlog in order of importance: (1) H-4 — page-transition overlay timeout
fallback; (2) H-3 — pin/document the Plausible analytics URL; (3) M-9 — noindex meta on
non-public pages; (4) M-4 — remove inline style blocks; (5) reconcile V3.4 stub docs; (6) M-8 —
email casing (held pending OD-003). OD-003 itself remains owner/client-gated throughout. Starting
with H-4.

See `BACKLOG.md` for the full prioritised work queue.
See `PHASE_GATES.md` for Gate 1 criteria.
See `plans/open-decisions.md` for all pending owner decisions.

---

## Plan History

| File | Date | Summary |
|---|---|---|
| `plans/2026-04-28-site-audit-remediation.md` | 2026-04-28 | Audit findings remediation plan |
| `plans/2026-05-05-initial-project-docs.md` | 2026-05-05 | Initial project documentation setup |
| `plans/2026-05-06-polish-and-seo.md` | 2026-05-06 | Polish, SEO, analytics pass |
| `plans/2026-05-06-program-prominence-assets.md` | 2026-05-06 | Program page prominence and assets |
| `plans/2026-05-13-site-debug-remediation.md` | 2026-05-13 | Site debug and full remediation pass |
| `plans/2026-06-17-website-status-audit.md` | 2026-06-17 | Website status / production-readiness audit |
| `plans/2026-06-19-mobile-responsive-fixes.md` | 2026-06-19 | Mobile nav overlay + program hero photo crop/radius fixes |
| `plans/2026-07-16-web3forms-migration.md` | 2026-07-16 | Formspree → Web3Forms migration (C-1/OD-001) |
| `plans/2026-07-18-og-image-png-conversion.md` | 2026-07-18 | OG image SVG → PNG conversion (M-1) + release ceremony |
| `plans/2026-07-22-implement-client-logo.md` | 2026-07-22 | Client logo image implemented in header/footer (v2.26.0) |

---

## Plan Template

Use `plans/PLAN_TEMPLATE.md` for new task plans. Name files `YYYY-MM-DD-task-name.md`.

Every plan should include: Objective, Current State, Files to Review, Files to Change,
Slice Plan, Validation, Risks, Open Questions.

For the full file inventory and owner map, see `FILE_MAP.md`.
