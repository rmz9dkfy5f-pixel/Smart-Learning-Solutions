# Plan: Web3Forms Migration

**Date:** 2026-07-16
**Status:** Slice 1 + 2 complete; inbox delivery confirmed 2026-07-18; merged to `main`

---

## Objective
Replace the non-functional Formspree `REPLACE_ME` placeholder in `contact.html` and `book.html`
with a production-ready Web3Forms integration, resolving launch blockers OD-001 / C-1 / R-002.

## Current State
- Both forms POST to `https://formspree.io/f/REPLACE_ME`. A JS guard detects `REPLACE_ME` and
  blocks submission with a plain `alert()`, so forms currently fail silently by design.
- No Web3Forms access key exists anywhere in the repo (confirmed by repo-wide search).
- Destination inbox is documented: `info@SmartLearningSolutions.org`.
- Deployment target (Netlify vs GitHub Pages, OD-003) is still open — no live production domain
  yet, so the deployed-domain verification step is blocked independent of this work.
- Neither form has a honeypot, loading state, or accessible status region today; failure/success
  feedback is via `alert()` and a `.form-success` panel swap.

## Assumptions
- Owner is registering the Web3Forms account for `https://www.smartlearningsolutions.org` (the
  canonical production domain already referenced in both pages' `<link rel="canonical">`).
- Owner has not yet supplied a real access key — this slice ships everything except the key itself.

## Constraints
- Start from repo root
- Use small approval slices
- Avoid unrelated edits
- Do not change navigation without updating `src/js/components.js`
- No build system — plain static HTML/CSS/JS only (Pattern A from the migration execution plan)
- Do not fabricate or deploy a placeholder access key (`REPLACE_ME`, `YOUR_ACCESS_KEY_HERE`, etc.)

## Files to Review
- `contact.html`, `book.html`
- `src/js/components.js` (shared JS conventions)
- `src/css/main.css` (design tokens, existing `.form-group` styles)
- `.env.example`, `README.md`, `STATUS.md`, `CHANGELOG.md`, `ARCHITECTURE.md`,
  `docs/DEPLOYMENT.md`, `docs/governance/PROJECT_RISK_REGISTER.md`, `plans/open-decisions.md`

## Files to Change
- `src/js/web3forms-config.js` (new — centralized access-key constant)
- `contact.html`, `book.html` (form markup + submission JS)
- `src/css/main.css` (honeypot + status-message styles)
- `.env.example`, `README.md`, `STATUS.md`, `CHANGELOG.md`, `ARCHITECTURE.md`,
  `docs/DEPLOYMENT.md`, `plans/open-decisions.md`, `docs/governance/PROJECT_RISK_REGISTER.md`,
  `PHASE_GATES.md`, `BACKLOG.md`

## Slice 1
**Goal:** Implement the Web3Forms submission flow on both forms, keyed to an empty/pending
access-key constant that fails safe until the owner supplies the real key.

**Planned edits:**
- Add `src/js/web3forms-config.js` exporting `WEB3FORMS_ACCESS_KEY` (empty string, documented).
- Rewrite each form's inline submit handler: honeypot, disable/relabel button, `AbortController`
  timeout, `fetch('https://api.web3forms.com/submit', ...)` with JSON body, accessible
  `role="status"` messaging for loading/error, existing `.form-success` panel kept for success.
- Add `botcheck` honeypot field + hidden `access_key`/`subject`/`from_name` fields.
- Add minimal CSS for the honeypot and status states to `main.css`.
- Remove the Formspree `action` URL and the `REPLACE_ME` JS guard/alert.

**Validation:**
- Open both pages via a local static server.
- Confirm the form refuses to submit and shows an inline (non-alert) "not configured yet" status,
  since the access key is intentionally empty.
- Keyboard-only pass: tab order skips the honeypot; focus reaches the submit button.
- No console errors.

## Slice 2 (after owner supplies real access key) — Done 2026-07-16
**Goal:** Wire in the real key and verify end-to-end delivery.

**What happened:**
- Owner supplied a live Web3Forms access key mid-session; set in `src/js/web3forms-config.js`.
- Server-side curl verification was attempted and correctly rejected (403) by Web3Forms/
  Cloudflare's anti-bot layer — confirms the integration cannot be faked from a script and must
  run from a real browser, consistent with the plan's client-side-only requirement.
- Owner manually tested `contact.html` and `book.html` via local static server
  (`python3 -m http.server`): both showed the "Sending…" loading state followed by the success
  panel. Inbox delivery to `info@SmartLearningSolutions.org` is pending confirmation from the
  business owner (separate party from the person testing).
- Deployed-domain submission — still blocked on OD-003 (hosting platform not chosen); no
  production URL exists yet to test against.

**Outstanding before this can be marked fully done:**
- ~~Confirmation that the test email actually landed in `info@SmartLearningSolutions.org`~~ — **Confirmed 2026-07-18.**
- Deployed-domain gate, once OD-003 is resolved and the site is live. Direction as of 2026-07-18: self-hosting is being proposed to the client (see OD-003); this gate still requires the client to accept and a live domain to test against.

## Risks
- No live production domain yet (OD-003 open) — deployed-domain verification (plan §11.4) cannot
  be completed in this pass regardless of the access key.
- Centralizing the key in a JS module (vs. inline per-form) is a deviation from the plan's literal
  Pattern A markup example; chosen because it matches §7's explicit guidance to centralize the key
  across multiple forms on a static site and avoids editing two files to rotate the key later.

## Rollback
Revert the feature branch commit(s) or redeploy the previous known-good commit. No production
deployment happens as part of this slice, so rollback is git-only.

## Open Questions
- OD-003 (hosting/deployment target) — unchanged by this work, still needs owner decision.
- Whether hCaptcha should be enabled (plan §6.7) — deferred; not in original Formspree
  implementation, so treated as optional hardening, not required for parity.
