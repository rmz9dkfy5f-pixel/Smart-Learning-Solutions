# Plan: Resolve the 2026-09-18 Project-Readiness Audit Findings

**Date:** 2026-09-18
**Status:** Slices 1-4 Complete; Slice 5 Blocked (see below)

---

## Objective
Resolve the findings from the 2026-09-18 full project-readiness audit (`AUDIT.md`) that can be
resolved without inventing facts; isolate the one that can't (H-1, the privacy policy).

## Current State
See `AUDIT.md` for the full findings. Summary: 2 High (privacy policy blocked on owner input, HSTS
not enforced), 5 Medium (CSP report-only, 21MB hero video, server version disclosed, stale audit
doc — now fixed as part of this pass, unfilled governance templates — now fixed), 1 Low (innerHTML
safety invariant — now fixed).

## Assumptions
- The nginx `security-headers.conf` snippet is scoped only to this project's own three vhosts, not
  shared with unrelated tenants on the shared VPS — confirmed via direct SSH read before this plan
  was approved.
- `ffmpeg` may be installed locally via Homebrew for the one-time video re-encode — approved by the
  owner.

## Constraints
- Start from repo root
- Use small approval slices
- Avoid unrelated edits
- Do not change navigation without updating `src/js/components.js`
- Do not invent legal facts for the privacy policy (H-1) — stays blocked until the owner supplies
  them

## Files to Review
- `docs/DEPLOYMENT.md`, `docs/PERFORMANCE.md`

## Files to Change
- `src/js/components.js` (done — safety-invariant comments)
- `AUDIT.md`, `AUDIT_2026-05-15_ARCHIVED.md` (done — refresh/archive)
- `docs/governance/SECURITY_BASELINE.md`, `docs/governance/TEST_STRATEGY.md` (in progress — fill templates)
- `BACKLOG.md`, `STATUS.md` (pending — point at refreshed audit)
- `src/videos/edison-robot-promo.mp4` (pending — compress)
- VPS `/etc/nginx/snippets/security-headers.conf`, global `http {}` block (pending — HSTS, enforce CSP, `server_tokens off`)

## Slice 1 — Code hardening + doc refresh (repo-only)
**Goal:** Close L-1, M-4, M-5 without touching the server or requiring owner input.

**Planned edits:**
- `src/js/components.js` safety-invariant comments (done)
- Archive old `AUDIT.md`, write new one (done)
- Fill `SECURITY_BASELINE.md`/`TEST_STRATEGY.md` (in progress)
- Point `BACKLOG.md`/`STATUS.md` at the refreshed audit

**Validation:**
- `git diff --stat` shows exactly these files
- `starter_kit.cli validate` still PASS

## Slice 2 — Video compression
**Goal:** Close M-2.

**Planned edits:**
- Install `ffmpeg` (local tool only)
- Re-encode `src/videos/edison-robot-promo.mp4` to a smaller H.264 target, ~720p ceiling, moderate CRF
- Replace the file in the repo

**Validation:**
- New file plays correctly locally (poster frame still matches)
- Size reduction confirmed via `du -h`
- Local server check: `workshops.html`... no, `index.html`'s hero still renders correctly

## Slice 3 — Server-side security hardening (VPS)
**Goal:** Close H-2, M-1, M-3.

**Planned edits:**
- Add `Strict-Transport-Security` to `security-headers.conf`
- Promote CSP from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` (same policy string)
- Add `server_tokens off;` to the global `http {}` block

**Validation:**
- `nginx -t` passes before each reload
- `curl -sI` independently confirms each new header live, one change at a time

## Slice 4 — Redeploy and re-verify
**Goal:** Ship Slices 1-2's repo changes; confirm Slice 3's server changes are live together with them.

**Planned edits:**
- Commit, redeploy via `scripts/deploy-staging.sh`

**Validation:**
- All 9 pages 200
- New headers live (HSTS present, CSP enforced, no `Server` version)
- Homepage video hero renders correctly at the new smaller size

## Slice 5 — Privacy policy (BLOCKED)
**Goal:** Close H-1.

**Blocked on:** legal entity name, registered business address, data retention period, governing
jurisdiction — none discoverable publicly (checked the live `smartlearningsolutions.org` site
directly). Owner must supply these.

**Planned edits (once unblocked):**
- Fill `legal/privacy-policy.md` placeholders
- Convert to `privacy.html` using the existing page template pattern
- Add a "Privacy" link to the footer's "Navigation" column (`src/js/components.js`, `buildFooter()`)
- Redeploy

## Risks
- Video re-encode could visibly degrade quality if CRF is too aggressive — validate visually
  before committing, not just by file size.
- Server config edits, even scoped safely, touch production infrastructure — validate each change
  independently (`nginx -t` + live `curl`) before moving to the next, per Slice 3.

## Rollback
- Repo changes: revert the specific commit(s) for the affected slice.
- Server changes: each edit is a small, additive snippet change; revert via the pre-edit backup of
  `security-headers.conf` / the global config, then `nginx -t` + reload.

## Open Questions
- Whether to pursue full CSP hardening (removing `unsafe-inline`) as a future, separate effort —
  flagged in `AUDIT.md`, not decided here.
