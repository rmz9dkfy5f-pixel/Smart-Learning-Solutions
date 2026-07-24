**Updated:** 2026-07-24 (staging deploy — v2.27.0 + v2.26.1)

# Progress Note — Current Session

## Staging Deploy: v2.27.0 + v2.26.1 (2026-07-24, no version bump)

### Summary

Deployed the two-line logo watermark (v2.27.0) and the previously-undeployed page-transition
overlay timeout fix (v2.26.1) to staging via `scripts/deploy-staging.sh` — the confirmed next
task from the prior closeout. No repo code changed; deploy-only session.

### Work Completed

- Dry-run confirmed staging was stale on exactly the expected files (`about.html`,
  `src/images/brand-logo-lockup-full.png`, `src/js/components.js`); ran the real deploy via the
  proven SR-009 runbook.
- Running `ssh`/`rsync` to the VPS's raw IP required disabling Claude Code's default Bash network
  sandbox for those specific commands — the sandbox otherwise times out raw-IP port-22
  connections even though HTTPS to the same host works. Checked the AntBrainOS vault first; no
  precedent existed either way, so proceeded only after explicit owner confirmation. Logged as
  `LESSONS_LEARNED.md` L-017.
- `SLICE_REVIEWS.md` SR-016 added (renumbered from a draft SR-015 after a concurrent session's
  push landed SR-015/ADR-020 for the H-3 work below first); `STATUS.md`, `PLAN.md`,
  `COMMIT_NOTES.md` updated.

### Validation Performed

Post-deploy `curl` verification directly against the live staging URL: `about.html` references
`brand-logo-lockup-full.png` (asset itself `200`); `components.js` contains
`NAVIGATION_TIMEOUT_MS`; all 7 standard pages return `200` (`/404.html` itself correctly still
`404`s). Staging now matches `main` HEAD.

### Not Yet Verified / Open

- Production domain not yet pointed to the VPS — unchanged from prior sessions; pending client
  acceptance of the self-host proposal (OD-003).
- Confirmed-queue backlog (H-3/M-9/M-4/...) resumes next, starting at H-3 (see the entry below —
  try GoatCounter next, per that session's finding).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).

---

## H-3: Analytics Swap — Cloudflare Web Analytics Attempted, Blocked (2026-07-23)

### Summary

Resumed the post-H-4 backlog queue (`PLAN.md`). Owner decided to replace Plausible ($9/mo) with a
free, privacy-friendly analytics provider rather than just pin its script URL as H-3 originally
scoped. Walked through the free/low-cost options (Google Analytics, Cloudflare Web Analytics,
GoatCounter); Google Analytics was rejected (would require a cookie-consent banner and a
privacy-policy rewrite for this site — a real scope increase this site doesn't currently carry).
Owner picked Cloudflare Web Analytics and created an account under
`info@SmartLearningSolutions.org` (matching the Web3Forms account). Its "Add a site" onboarding
wizard turned out to have a reproducible bug: a typed hostname is rejected as invalid even while
visibly present in the field, and clicking the hostname dropdown clears the field entirely,
producing an unbreakable loop. Reproduced identically in Chrome, Brave, and a private/incognito
window — ruling out a local browser/extension cause. No site or JS-snippet token was ever
generated, so no code change was made; Plausible remains live and unchanged.

### Work Completed

- No code change (`src/js/components.js` untouched, Plausible still the live provider).
- `BACKLOG.md` H-3 reframed from "pin the Plausible URL" to the provider-swap goal, with the
  Cloudflare blocker and GoatCounter fallback recorded.
- `DECISION_LOG.md` ADR-020 added: records the Google Analytics rejection, the Cloudflare attempt
  and its exact reproduced failure mode, and the alternatives considered.
- `SLICE_REVIEWS.md` SR-015 added.
- `STATUS.md`, `PLAN.md` updated with the current state and confirmed next step.

### Validation Performed

- Live, in-session attempt at Cloudflare's actual account-creation and site-onboarding flow, with
  the owner sharing screenshots at each step — the bug was found this way, not assumed or inferred
  from documentation.
- Reproduced across three separate browser/session combinations (Chrome, Brave, Brave private
  window) before concluding it was a platform-side issue rather than continuing to troubleshoot
  locally.

### Not Yet Verified / Open

- **Confirmed next task, in order:** (1) deploy the already-shipped v2.27.0 (About page logo
  watermark) to staging via `scripts/deploy-staging.sh` — **done 2026-07-24, see the entry
  above**; (2) then resume H-3 by trying GoatCounter's signup instead of Cloudflare.
- Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
  self-host proposal (OD-003).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
