**Updated:** feat/web3forms-integration (unmerged, uncommitted → committed this pass) · 2026-07-17

# Progress Note — Current Session

## Formspree → Web3Forms Migration (2026-07-16/17)

### Summary

Resolved launch blocker C-1/OD-001 (`REPLACE_ME` Formspree placeholder) by migrating `book.html`
and `contact.html` to Web3Forms, per the AntBrainOS vault's Web3Forms Migration Execution Plan.
Work happened on branch `feat/web3forms-integration`, not `main` — no version bump or tag is
assigned yet; that's deferred until the branch is reviewed and merged. Two real items remain
open and are **not** resolved by this pass: inbox delivery to `info@SmartLearningSolutions.org`
is unconfirmed, and deployed-domain verification is still blocked on OD-003 (hosting/production
domain not yet finalized). See `plans/2026-07-16-web3forms-migration.md` for the full
slice-by-slice record and repo `DECISION_LOG.md` ADR-015 for the formal decision record.

### Work Completed

- `src/js/web3forms-config.js` (new) — centralized `WEB3FORMS_ACCESS_KEY` constant; owner
  supplied a live key mid-session.
- `book.html`, `contact.html` — removed the dead Formspree `action` URL and `REPLACE_ME` alert
  guard; added a `fetch()`-based submission flow to `https://api.web3forms.com/submit`, a
  `botcheck` honeypot, an `AbortController` request timeout, a duplicate-submission guard, and an
  accessible `role="status"` loading/success/error region.
- `src/css/main.css` — honeypot and status-message styles.
- `CLAUDE.md`, `AGENTS.md` — Confirmed Decisions table updated: booking flow now reads
  "Web3Forms" instead of "Formspree".
- `DECISION_LOG.md` — ADR-015 added, recording the decision and its real, current caveats.
- Docs updated for consistency: `.env.example`, `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`,
  `STATUS.md`, `BACKLOG.md`, `PHASE_GATES.md`, `docs/DEPLOYMENT.md`, `docs/STRATEGY.md`,
  `docs/TESTING.md`, `docs/governance/PROJECT_RISK_REGISTER.md`, `plans/open-decisions.md`,
  `legal/privacy-policy.md`, `CHANGELOG.md`.

### Validation Performed

- Local browser testing (`python3 -m http.server`) on both forms: loading state and success
  panel both confirmed rendering correctly with the live access key.
- A server-side `curl` probe against the Web3Forms API was correctly rejected (403) by its
  anti-bot layer — confirms the integration cannot be faked from a script and must be exercised
  from a real browser, consistent with the migration plan's client-side-only requirement.
- No project build/lint/test tooling exists for this static site (expected, longstanding) — none
  applicable to skip.

### Not Yet Verified / Open

- **Inbox delivery** — the business owner has not yet confirmed the test message actually
  arrived at `info@SmartLearningSolutions.org`.
- **Deployed-domain gate** (migration plan §11.4) — blocked on OD-003; no live production URL
  exists yet to test the real integration end-to-end.
- This branch is pushed to GitHub as of this pass but is **not merged into `main` and not
  tagged** — that decision is deliberately deferred until the two items above clear.

### Launch Blockers (updated)

1. ~~Formspree `REPLACE_ME`~~ — **resolved 2026-07-16** via Web3Forms migration (pending final
   owner confirmation above).
2. Production domain (`smartlearningsolutions.org`) not yet pointed to the VPS — unchanged.
