# Site Audit — Smart Learning Solutions
**Date:** 2026-09-18
**Scope:** Full project-readiness audit — structural integrity, refactoring necessity,
efficiency/performance, cybersecurity (non-destructive), and production readiness. Source review
plus live `curl`/`ssh` verification against the deployed staging site
(`https://smart-learning-solutions.craftandconscious.com`) and its VPS nginx config.
**Auditor:** Claude Code (Opus 5, high effort — see `MODEL_SELECTION_GATE.md` brief for this run)
**Supersedes:** `AUDIT_2026-05-15_ARCHIVED.md`, which predated nearly every fix recorded in
`STATUS.md` since and no longer reflected current reality.

---

## 1. Review Scope

### Method
Direct source review of the full repo, plus live verification: `curl -sI` against the deployed
site for headers, `ssh` (read-only) against the VPS to confirm the nginx security-headers snippet's
actual scope and content, `grep`/`du` across the repo for structural/asset findings. Every finding
below is tied to an actual file/line or command output — none are general impressions.

### What Could NOT Be Verified
- No authenticated or adversarial penetration testing was performed (form fuzzing, header
  injection attempts, etc.) — out of scope for a non-destructive review against a live third
  party's infrastructure without separately-scoped authorization.
- Real-device/cross-browser rendering was not re-verified in this pass (relies on prior sessions'
  own device checks, recorded in `STATUS.md`/`SLICE_REVIEWS.md`).

---

## 2. Executive Summary

The site is functionally solid — forms work, the design system is coherent, accessibility basics
are followed, and the deploy pipeline has a real safety mechanism (explicit path allowlist). It is
**not yet production-grade** for two independent reasons: (1) a handful of concrete, fixable gaps
(no live privacy policy despite collecting PII, HSTS/CSP not enforced, a stale server-version
header, a 21MB unoptimized hero video, and a 4-month-stale canonical audit document); and (2) the
client is not currently using this site at all — they moved to Wix temporarily as of
`DECISION_LOG.md` ADR-027, so this repo is the *return-target*, not the live customer-facing site.

No critical, actively-exploited vulnerabilities were found. No secrets or credentials are exposed
beyond an intentionally-public form-relay identifier (documented as safe by its own vendor).

---

## 3. Findings by Severity

---

### HIGH

---

**H-1: No Live Privacy Policy, Despite Forms Collecting PII**
- **Severity:** High
- **Affected:** `book.html`, `contact.html` (collect name, email, phone, organization), `legal/privacy-policy.md` (draft only, never published)
- **What is happening:** `legal/privacy-policy.md` is explicitly a portable draft source file — its own header says "to publish: convert this into `privacy.html`... add a link to the footer." Confirmed via `grep`: no page or footer link references it anywhere.
- **Evidence:** File content and structure; `grep -rn "privacy-policy" *.html src/js/components.js` returns no matches.
- **Cannot self-resolve:** the draft has real unfilled placeholders (`[LEGAL ENTITY NAME]`, `[REGISTERED BUSINESS ADDRESS]`, `[DATA RETENTION PERIOD]`, `[GOVERNING JURISDICTION]`) that the file's own instructions say must never be invented. Checked the client's real live site (`smartlearningsolutions.org`) directly — none of this information is published there either.
- **Confidence:** Confirmed (source + live site check)
- **Recommended next step:** Owner supplies the four missing facts; then convert to `privacy.html` and link in the footer.

---

**H-2: HSTS Header Not Enforced Live**
- **Severity:** High
- **Affected:** VPS nginx (`/etc/nginx/snippets/security-headers.conf`)
- **What is happening:** `Strict-Transport-Security` is documented as baseline in `docs/DEPLOYMENT.md` §7 but absent from the live response.
- **Evidence:** `curl -sI https://smart-learning-solutions.craftandconscious.com/` — header not present. Matches a known, intentional gap recorded 2026-07-19 in `STATUS.md`, never closed since.
- **Confidence:** Confirmed (live header check)
- **Recommended next step:** Add to the shared snippet (confirmed scoped only to this project's own three vhosts — no cross-tenant risk), `nginx -t`, reload, re-verify.

---

### MEDIUM

---

**M-1: CSP Is Report-Only, Not Enforced**
- **Severity:** Medium
- **Affected:** VPS nginx (`/etc/nginx/snippets/security-headers.conf`)
- **What is happening:** Live header is `Content-Security-Policy-Report-Only`, not
  `Content-Security-Policy` — violations are logged, never blocked. The policy also allows
  `'unsafe-inline'` on `script-src`/`style-src`, required by the site's own inline
  `<script type="module">` blocks and anti-FOUC `<style>` tags, which weakens (but doesn't
  eliminate) its XSS-mitigation value even once enforced.
- **Evidence:** `curl -sI` live header content.
- **Confidence:** Confirmed
- **Recommended next step:** Promote to enforced with the same policy string (real, proportionate
  improvement — still blocks any unlisted-origin script/style/frame). Removing `unsafe-inline`
  entirely is a larger follow-up (would need external script files or server-side nonce injection,
  neither of which this static site has today) — not resolved in this pass.

---

**M-2: 21MB Unoptimized Hero Video**
- **Severity:** Medium
- **Affected:** `src/videos/edison-robot-promo.mp4`, `index.html`
- **What is happening:** The homepage hero video is 21MB. It's correctly gated (skipped for
  `prefers-reduced-motion` and viewports under 768px), but every qualifying desktop visitor
  downloads the full 21MB.
- **Evidence:** `du -h src/videos/edison-robot-promo.mp4`.
- **Confidence:** Confirmed
- **Recommended next step:** Re-encode to a smaller H.264 target (lower resolution ceiling +
  moderate CRF), per `docs/PERFORMANCE.md` §6's existing "prefer 720p" guidance.

---

**M-3: Server Version Disclosed**
- **Severity:** Medium (low individual risk, easy fix)
- **Affected:** VPS nginx (global config)
- **What is happening:** Live response includes `Server: nginx/1.24.0 (Ubuntu)`.
- **Evidence:** `curl -sI` live header.
- **Confidence:** Confirmed
- **Recommended next step:** `server_tokens off;` in the shared `http {}` block.

---

**M-4: Canonical Audit Document Was 4 Months Stale**
- **Severity:** Medium (documentation debt, not a code defect)
- **Affected:** `AUDIT.md` (this file — now refreshed), `BACKLOG.md` (pointed at it as current)
- **What is happening:** The prior `AUDIT.md` was dated 2026-05-15 and predated nearly every fix
  since recorded in `STATUS.md`. Anyone reading it got a materially wrong picture of site state.
- **Evidence:** Date comparison against `STATUS.md`'s own changelog.
- **Confidence:** Confirmed
- **Recommended next step:** Done as part of this audit — archived the old version, replaced this
  file. Keep this file current going forward rather than letting it drift again.

---

**M-5: Governance Templates Left Unfilled Since the v3.10 Install**
- **Severity:** Medium (process gap)
- **Affected:** `docs/governance/SECURITY_BASELINE.md` ("Security Status" section),
  `docs/governance/TEST_STRATEGY.md` ("Project Commands" section)
- **What is happening:** Both sat as blank fillable templates since the v3.10.0 Starter Kit
  install (2026-09-16) — never completed with this repo's real values.
- **Evidence:** File content, direct read.
- **Confidence:** Confirmed
- **Recommended next step:** Fill with this repo's real values (done as part of this audit pass).

---

### LOW

---

**L-1: `innerHTML`-Based Header/Footer Injection Has No Explicit Safety Invariant Documented**
- **Severity:** Low (not currently exploitable)
- **Affected:** `src/js/components.js`, `buildHeader()`/`buildFooter()`
- **What is happening:** Both functions build markup via string interpolation assigned through
  `innerHTML`. Every interpolated value (`activePage`, `PHONE`, `EMAIL`, `NAV_LINKS`) is a
  hardcoded constant today, never derived from a URL param, query string, or any visitor input —
  **not exploitable as written**. But nothing in the code previously stated that as an invariant,
  so a future edit could introduce reflected XSS without any warning.
- **Evidence:** Direct read of `NAV_LINKS`, and every call site of `initPage({ activePage: '...' })`
  across all 10 pages — all string literals.
- **Confidence:** Confirmed
- **Recommended next step:** Done as part of this audit — added an explicit code comment stating
  the invariant and the required fix path if it's ever violated.

---

## 4. Not Findings (Verified, Confirmed Safe)

- **Web3Forms access key** (`src/js/web3forms-config.js`) is intentionally public per the vendor's
  own documentation — a form-relay identifier, not an authentication secret. Not a leaked credential.
- **GSAP loaded from cdnjs with SRI integrity hashes** — correct mitigation for a CDN-sourced
  script dependency.
- **No secrets, tokens, or credentials found** anywhere in the codebase beyond the above.
- **Both forms have honeypot spam protection** (`botcheck` field).
- **Deploy allowlist structurally prevents shipping internal docs** — `scripts/deploy-staging.sh`
  names an explicit allowlist, not a denylist, so `AUDIT.md`/`.claude/`/`plans/`/governance docs
  etc. cannot be shipped regardless of what new internal files land in the repo later.
- **CSS is well-organized** — 29 clearly labeled sections, no duplicate top-level selectors found,
  minimal (`8`) `!important` usage. Not a refactor-necessity item.

---

## 5. N/A (No Applicable Target in This Project)

- SQL/LDAP/XPath injection, parameterized queries — no database or query layer exists.
- Authentication/authorization/"least privilege" access control — no auth system, no admin
  routes, no user accounts exist.
- Server-side sensitive-value logging — no server-side application logging exists; this is a
  static file server.
- FDA/medical/financial regulatory compliance — no health, financial, or regulated claims appear
  on this site.

---

## 6. Priority Order

1. H-1 — Privacy policy (blocked on owner input)
2. H-2 — Enforce HSTS
3. M-1 — Enforce CSP
4. M-2 — Compress hero video
5. M-3 — Disable server version disclosure
6. M-4, M-5 — done as part of this audit pass
7. L-1 — done as part of this audit pass

## 7. Open Questions

- Legal entity name, registered address, data retention period, governing jurisdiction (H-1) —
  owner input required, not discoverable publicly.
- Whether full CSP hardening (removing `unsafe-inline`) is worth the architecture change it would
  require, given this repo's static/no-build-step nature — flagged, not decided.

See `plans/` for the execution plan resolving the items above where possible without invented facts.
