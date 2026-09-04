# Plan

## Current State

**Phase:** Gate 1 — Launch Readiness (in progress)

All dev-executable items for Gate 1 are complete. C-1 (Formspree → Web3Forms, v2.23.0) and
M-1 (OG image SVG → PNG, v2.24.0) are both resolved. The one remaining blocker is
owner/client-gated and cannot advance without external input:

| Blocker | Owner action required |
|---|---|
| H-1 / OD-003 — Deployment host | Client to accept/reject the self-host proposal (existing staging VPS); once accepted, point production DNS and verify `/programs/` routing end-to-end |

**M-4 resolved (2026-09-04, v2.29.1):** Confirmed next task from the 2026-08-17 and 2026-08-31
closeouts. Moved page-specific CSS out of inline `<style>` blocks on 7 pages (corrected from the
audit's original 5 — `book.html`/`contact.html` also had inline blocks, added later during the
v2.23.0 Web3Forms migration) into `src/css/main.css`; de-duplicated a `.form-success` pair
`book.html`/`contact.html` had each defined independently. See `SLICE_REVIEWS.md` SR-021. With
M-4 done and H-3 still paused (`DECISION_LOG.md` ADR-023), the confirmed queue now points to V3.4
doc reconciliation (`docs/project/`, `docs/governance/` vs. root-level equivalents) as the next
standing candidate, then M-8 (email casing, held pending OD-003). Commit/tag/push for this work
deferred to a separate, explicitly-requested step.

**M-9 resolved (2026-08-17, v2.29.0):** Confirmed next task from the 2026-08-14 closeout. Added
`<meta name="robots" content="index, follow">` to all 9 public pages and
`<meta name="robots" content="noindex, nofollow">` to `404.html`. `BACKLOG.md`'s original scope
note ("staging/thank-you pages") didn't correspond to any real page in this repo — owner confirmed
(via `AskUserQuestion`) the real scope should follow `AUDIT.md`'s own M-9 finding instead. See
`SLICE_REVIEWS.md` SR-020. Remaining queue: H-3 (paused, `DECISION_LOG.md` ADR-023), M-4 (remove
inline style blocks), then V3.4 doc reconciliation, then M-8 (email casing, held pending OD-003).

**Confirmed queue (2026-07-22):** M-7 (`_next` redirect field) was scoped and closed as not
applicable (see `DECISION_LOG.md` ADR-018). Owner confirmed working the remaining Medium-priority
Gate-1/Gate-2 backlog in order of importance: (1) ~~H-4~~ — page-transition overlay timeout
fallback, **resolved 2026-07-22 (v2.26.1, `SLICE_REVIEWS.md` SR-013)**; (2) H-3 — pin/document
the Plausible analytics URL; (3) ~~M-9~~ — noindex meta, **resolved 2026-08-17 (v2.29.0)**; (4)
M-4 — remove inline style blocks; (5) reconcile V3.4 stub docs; (6) M-8 — email casing (held
pending OD-003). OD-003 itself remains owner/client-gated throughout.

**H-3 update (2026-07-23, same day):** Owner chose to replace Plausible with a free
privacy-friendly analytics provider rather than just pin its URL. Google Analytics rejected;
Cloudflare Web Analytics attempted but blocked by a reproducible onboarding-wizard bug (see
`DECISION_LOG.md` ADR-020, `SLICE_REVIEWS.md` SR-015). Confirmed next task at that point: (1)
deploy the already-shipped v2.27.0 to staging, then (2) try GoatCounter's signup for H-3.

**H-3 retry paused (2026-08-13):** Owner retried Cloudflare per the 2026-08-11 closeout's
confirmed next task. Dashboard wizard still blocked (same bug as above); the documented API
bypass hit a second, independent blocker — no findable scoped API-token permission for Web
Analytics/RUM write access, and the Global API Key fallback needs `info@SmartLearningSolutions.org`
inbox access the owner doesn't currently have. Paused pending that credential access, not
abandoned; GoatCounter remains the fallback. No code changed. See `DECISION_LOG.md` ADR-023.

**Staging deploy complete (2026-07-24, no version bump, `SLICE_REVIEWS.md` SR-016):** v2.27.0
(About page logo watermark) and the previously-undeployed v2.26.1 (H-4 fix) are both now live on
staging, verified via direct `curl` checks.

**No next task confirmed at that earlier closeout (2026-07-24):** presented the confirmed-queue
order above (starting at H-3) as the top candidate, but the owner explicitly chose not to pick a
next task at that point ("None — end session here"). The queue order above remained the standing
plan.

**Git history AI-attribution scrub + VPS default_server hygiene fix (2026-07-24, continued, later
same day):** Two unrelated owner requests, both infra/hygiene, no application code changed. (1)
Removed every "Claude" mention from git history — rewrote all 6 branches via `git filter-repo`,
renamed 64 tags (fixing 4 pre-existing drifted ones found along the way), backfilled 329 doc hash
references, force-pushed. (2) Fixed the two hero-video review subdomains showing "Prompt Vault" —
root cause was a URL typo plus a real shared-VPS nginx `default_server` hygiene gap; fixed both.
See `DECISION_LOG.md` ADR-021/ADR-022, `SLICE_REVIEWS.md` SR-017/SR-018. This work did **not**
touch the standing H-3/M-9/M-4/... queue above, which remains queued.

**Confirmed next task (2026-07-24, this closeout's Step 4a gate):** add favicons for browser tabs
across the site — the owner stated this directly mid-session, before closeout ran, and confirmed
it again explicitly when presented the ranked candidate list, ahead of resuming H-3.

**Favicon task complete (2026-08-11, v2.28.0):** The confirmed next task above is done. The
placeholder favicon was replaced with a real favicon + apple-touch-icon derived directly from the
client logo (owner-confirmed sourcing approach and icon scope this session) — see
`CHANGELOG.md`/`RELEASE_NOTES.md`/`SLICE_REVIEWS.md` SR-019 for detail. **No next task confirmed
this session** — the standing queue remains as above, starting at H-3 (GoatCounter analytics
signup), then M-9, M-4, V3.4 stub-doc reconciliation, and M-8 (held pending OD-003).

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
| `plans/2026-07-22-page-transition-overlay-timeout.md` | 2026-07-22 | H-4: timeout fallback for `.is-navigating` page-transition overlay (v2.26.1) |
| `plans/2026-07-22-two-line-logo-watermark.md` | 2026-07-22 | Two-line logo lockup placed as About page watermark (v2.27.0) |

---

## Plan Template

Use `plans/PLAN_TEMPLATE.md` for new task plans. Name files `YYYY-MM-DD-task-name.md`.

Every plan should include: Objective, Current State, Files to Review, Files to Change,
Slice Plan, Validation, Risks, Open Questions.

For the full file inventory and owner map, see `FILE_MAP.md`.
