# Smart Learning Solutions — Status

**Current Version:** v2.27.0 · 2026-07-23
**Branch:** `main`

---

## Site Health

Feature-complete for pre-launch. All 10 pages are built, navigation is correct, and the design system is consistent sitewide. A full diagnostic audit has been completed and documented in `AUDIT.md`. The remaining blockers are operational and content decisions — not missing site structure.

---

## H-3 Analytics Swap: Cloudflare Web Analytics Attempted, Blocked — 2026-07-23 (no version bump)

Owner decided to replace Plausible ($9/mo) with a free, privacy-friendly analytics provider.
Google Analytics was considered and rejected (would require a cookie-consent banner and a
privacy-policy rewrite for this site). Cloudflare Web Analytics was tried first: an account was
created under `info@SmartLearningSolutions.org` (matching the Web3Forms account), but its "Add a
site" onboarding wizard has a reproducible bug — a typed hostname is rejected as invalid even when
visibly present in the field, and clicking the hostname dropdown clears it entirely. Reproduced
across Chrome, Brave, and a private window, so this is very likely a platform-side issue, not a
local one. No site/token was generated; Plausible remains live and unchanged in
`src/js/components.js`. See `DECISION_LOG.md` ADR-020 and `SLICE_REVIEWS.md` SR-015. **Next
session (after the queued v2.27.0 staging deploy): try GoatCounter instead** — same free/no-cookie
category, simpler signup with no hostname wizard.

---

## About Page Logo Watermark — 2026-07-23 (v2.27.0)

The full two-line logo lockup (including the "solutions" script swoosh, deliberately excluded
from the v2.26.0 header/footer crop) is now placed as a subtle background watermark behind the
"Built on Real Expertise" mission copy on `about.html` — closing that session's flagged open item.
Native orange/teal color (extends `DECISION_LOG.md` ADR-017), 8% opacity (below the sitewide
0.09–0.11 decorative-image convention, given the mission text's `--text-muted` color already sits
close to the AA contrast floor independent of this change — confirmed sufficient via a direct
visual check at all 4 standard breakpoints, not just assumed). Repo-only scope for this pass —
staging deploy is a deliberate, separate follow-up. See `SLICE_REVIEWS.md` SR-014 and
`DECISION_LOG.md` ADR-019.

---

## Page-Transition Overlay Timeout Fallback — 2026-07-22 (v2.26.1)

`BACKLOG.md` H-4 — the shared `.is-navigating` page-transition overlay (used by all 10 pages via
`initPage()` in `src/js/components.js`) had no safety timer: its only removal path was a
`pageshow` listener that fires once the destination page loads. An interrupted or failed
navigation (offline, a stalled load, a `location.assign` edge case) would leave the page stuck
under the overlay with scrolling locked, with no way out short of a manual reload. Added a
`NAVIGATION_TIMEOUT_MS` (4000ms) fallback timer that force-clears the overlay state if `pageshow`
never fires; the `pageshow` listener now clears the pending timer so a normal navigation never
leaves a dangling timeout. Verified via local server + a disposable Playwright script — golden
path unaffected, simulated stalled navigation now self-clears after ~4s instead of staying stuck.
See `SLICE_REVIEWS.md` SR-013. Next confirmed task (per the 2026-07-22 ranked queue): H-3 (pin
Plausible analytics URL).

---

## M-7 Closed as Not Applicable — 2026-07-22 (no version bump)

`BACKLOG.md` M-7 ("populate `book.html`'s `_next` redirect field") was scoped before
implementation, per the Model Selection Gate's task-classification step, rather than implemented
as originally written. Both `book.html` and `contact.html` submit via a JS handler that calls
`e.preventDefault()` and posts to Web3Forms with `fetch()` — success is shown in-page via
`#form-success`, and no native form POST or browser navigation ever occurs. A `_next`/redirect
field only has an effect on a native, non-intercepted submission, so it would be inert even if
added; the literal field AUDIT.md's original finding described no longer exists in `book.html`
at all, having been removed when the form was rebuilt for the Web3Forms/AJAX migration (v2.23.0).
Flagged to the owner rather than adding a no-op field; owner chose to close the item. See
`DECISION_LOG.md` ADR-018 and `SLICE_REVIEWS.md` SR-012. No confirmed next task remains as of
this closure.

---

## Staging Deploy + Reference-File Hygiene — 2026-07-22 (v2.26.0, no new version)

The v2.26.0 client logo is now confirmed live on staging (`smart-learning-solutions.craftandconscious.com`),
not just shipped in the repo — deployed via `scripts/deploy-staging.sh` following the standard
backup → dry-run → real-run → curl-verify sequence (SR-009's proven runbook). Verified directly
(not assumed): the old placeholder logo code was confirmed present on staging before the deploy,
and the new logo asset plus updated `components.js` are confirmed present after, with the full
regression checklist (forms, OG image, security headers, internal-path 404s) unaffected. Also
resolved the one remaining loose end from the logo session: the unused black-line-art reference
file is now tracked in git under a real name (`pics/Logo/logo-black-line-art.jpeg`), closing out
`DECISION_LOG.md` ADR-017's flagged open item. See `SLICE_REVIEWS.md` SR-011.

---

## Client Logo Implementation — 2026-07-22 (v2.26.0)

Replaced the placeholder inline-SVG-badge + text wordmark in the header and footer with the
client's actual logo (`src/images/brand-logo-mark.png`), owner-confirmed as the next task at the
2026-07-19 closeout. The confirmed source file decoded to a full-color orange/teal version with
real alpha transparency, not the black line art a pasted reference image had suggested — used
natively (no CSS filter) since its colors already track the site's existing accent-orange and
cyan tokens and it composites cleanly on the dark background. Cropped to a single-line "icon +
SmartLearning" lockup for the fixed 72px header. Validated live across all 10 pages, the
transparent/scrolled header states, the documented ~1100px nav-squeeze zone (no regression), and
mobile (header, nav-open, footer). Resolves `AUDIT.md` L-2 as a side effect. See
`SLICE_REVIEWS.md` SR-010 and `DECISION_LOG.md` ADR-017.

---

## Staging Redeploy + Deploy-Allowlist Hardening — 2026-07-19 (v2.25.0)

Staging (`smart-learning-solutions.craftandconscious.com`) was found serving a stale deploy from
~2026-06-19/23 — predating the Web3Forms migration and OG-image PNG conversion. Both forms were
live-POSTing to the dead `formspree.io/f/REPLACE_ME` endpoint. Redeployed current `main`
(`2b39333`) via a new `scripts/deploy-staging.sh`, which uses an explicit path allowlist (not a
denylist) so internal docs structurally cannot be shipped regardless of what new internal files
land in the repo later. Verified via `curl`: forms now hit Web3Forms, OG image is the PNG, all
pages are live and current, security headers and internal-path 404s (from SR-008) unaffected. See
`SLICE_REVIEWS.md` SR-009 and `DECISION_LOG.md` ADR-016.

---

## Nginx Security Headers — Staging — 2026-07-19 (no version bump, server-side only)

Applied the `docs/DEPLOYMENT.md` §7 baseline (`X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy-Report-Only`) to the staging
vhost (`smart-learning-solutions.craftandconscious.com`) on the VPS. Server-side only — no repo
code change. CSP kept in report-only mode per the doc's own guidance (pages still use inline
styles/scripts); HSTS and the separate `X-Robots-Tag` staging-indexing header (§8) were
intentionally not added in this pass. Verified via `curl -sI` on 3 pages (all 5 headers present,
CSP confirmed report-only, existing routing/404 behavior unaffected); config change confirmed as a
single additive `include` line via `diff` against a timestamped pre-change backup. See
`SLICE_REVIEWS.md` SR-008.

Also corrected a stale operational detail found during this session: prior docs
(`PROGRESS_NOTES.md` v2.16.1, `COMMIT_NOTES.md`, `CHANGELOG.md`) reference SSH access via
`~/.ssh/id_ed25519`, but that key no longer exists on the local machine. Working access was
re-established via a different, already-authorized local key. This session also confirmed the VPS
is a shared, multi-tenant host serving several other unrelated client sites alongside this one, not
a dedicated host as earlier docs implied. Historical entries are left as-is (accurate at the time
they were written); this note documents current reality going forward.

---

## OG Image PNG Conversion — 2026-07-18 (v2.24.0)

Resolved M-1: `src/images/og-image.svg` rendered to a 1200×630 PNG via headless Chromium
(an already-present Playwright-cache binary — no new dependency added). All 9 pages carrying an
`og:image` tag now reference `src/images/og-image.png`; the SVG source remains in the repo as
the editable design asset. No `twitter:image` tag exists anywhere, so Twitter/X's
`summary_large_image` card already fell back to `og:image` and needed no separate change.
`PHASE_GATES.md` carried this requirement twice — Gate 1's "Open Graph metadata verified"
criterion and a stale duplicate filed under Gate 3 (Deferred). Gate 1's is now checked; the
Gate 3 duplicate is removed.

---

## Web3Forms Migration + Hosting Decision — 2026-07-18 (v2.23.0)

Launch blocker C-1/OD-001 (Formspree `REPLACE_ME`) is resolved: both forms migrated to
Web3Forms on branch `feat/web3forms-integration`, reviewed, merged into `main`, and pushed.
Inbox delivery to `info@SmartLearningSolutions.org` is confirmed. See
`plans/2026-07-16-web3forms-migration.md` and `DECISION_LOG.md` ADR-015.

Hosting (OD-003): self-hosting on the existing staging VPS (`74.208.9.49`) is being proposed
to the client, superseding the earlier Netlify/GitHub Pages recommendation and the earlier
Wix consideration. Not yet accepted — deployed-domain verification for Gate 1 stays open
until the client accepts and a production domain is live.

---

## Production-Readiness Audit — 2026-06-27 (v2.21.0)

Second V3.4 production-readiness audit run. Overall result: **BLOCKED for client launch** —
same two hard blockers as v2.20.0. Full audit report in plan file
`~/.claude/plans/encapsulated-sauteeing-mist.md`. No code changes executed (all held per
ADR-013 until hosting platform confirmed). One notable confirmation: **C-2 (cursor CSS gate)
is verified fixed** in current code — `cursor: none` is gated by `body.custom-cursor-enabled`
at `src/css/main.css:135-142`; AUDIT.md entry is stale.

### Scorecard (2026-06-27)

| Category | Status | Notes |
|---|---|---|
| Build/runtime | Pass | No build step; `npx serve .` works; ES modules documented |
| Routes/pages | Pass | 10 pages; `programs/` routing verified; custom 404 present |
| Booking/forms | **Fail** | Both forms POST to `REPLACE_ME`; zero conversion possible |
| Security/auth | Fail | No secrets exposed; SRI present; but security headers not applied at server |
| Accessibility | Pass (with gaps) | ARIA, focus states, form validation; gaps: form success a11y, skip links |
| SEO/social | Pass (with gaps) | Canonical, OG, Twitter, robots, sitemap; gap: OG image is SVG |
| Performance | Pass | WebP + responsive `<picture>`; lazy loading; deferred scripts |
| Deployment/HTTPS | **Fail** | Platform unconfirmed; no live config; no HTTPS yet |
| Observability | Pass (minimal) | Plausible configured; form failures visible in Formspree dashboard |
| Documentation/handoff | Pass | README, ARCHITECTURE, DEPLOYMENT, CHANGELOG, PHASE_GATES, DECISION_LOG current |

---

## Production-Readiness Audit — 2026-06-23 (released v2.20.0)

V3.4 production-readiness audit run. Overall result: **BLOCKED for client launch** — same two
hard blockers as below (Formspree `REPLACE_ME`; host/domain unconfirmed). Result recorded in
`docs/governance/REPO_HEALTH_CHECK.md` and `docs/governance/RELEASE_GATE.md`. Risks logged in
`docs/governance/PROJECT_RISK_REGISTER.md` (R-002–R-004); decision logged as ADR-013.

- **Added:** portable privacy policy draft at `legal/privacy-policy.md` (closes the
  "no privacy policy" gap; owner placeholders pending). Footer link + published page are
  deferred until the host platform is confirmed.
- **New open decision — hosting platform:** owner indicated the site may go on **Wix**. Wix
  cannot host this hand-coded static repo as-is (it would require a rebuild in the Wix
  editor). This must be resolved before host-specific work (security headers/CSP, clean-URL
  and 404 wiring, deploy-root doc exclusion) — and before investing further in this
  codebase if the client truly moves to Wix.
- **Held (throwaway-if-Wix):** AVIF `<picture>` fallback, form a11y (live region + focus,
  skip link, `aria-current`), page-transition overlay safety timer, OG image conversion.

---

## Done

- Full 10-page site built: Home, Workshops, Programs (landing + 2 detail), Resources, About, Book, Contact, 404
- Photo-driven redesign sitewide — hero, program pages, about, workshops (v2.13.x)
- Programs landing page at `/programs/` with nav and sitemap wired up (v2.14.0)
- Both booking forms hardened: validation, maxlength constraints, placeholder guard (v2.14.0)
- Custom cursor gracefully degrades on touch/pointer-only devices (v2.14.0)
- SEO: canonical tags, Open Graph, Twitter meta, `robots.txt`, `sitemap.xml`
- Plausible analytics injected via `components.js`
- Security headers and staging noindex documented in `docs/DEPLOYMENT.md`
- Full site diagnostic audit — findings in `AUDIT.md` (v2.14.3)
- `.claude/` added to `.gitignore` (v2.14.4)
- v2 project-control planning system adopted — 7 new docs, CLAUDE.md + AGENTS.md updated (v2.15.2)
- Gate 1 dev-executable fixes: C-2 cursor gate, H-2 SRI hashes, M-2 title, M-3 img dimensions, M-6 tel: (v2.15.3)
- File responsibility map created — `FILE_MAP.md` (v2.15.4)
- File responsibility cleanup — overlapping content removed from ROADMAP, PROJECT_BRIEF, BACKLOG, STATUS, PLAN (v2.15.5)
- Migration complete — ADR-008 updated, MIGRATION_CHECKLIST.md created, result: PASS (v2.15.6)
- Program card proof strip removed — product photo only on programs/index.html and index.html (v2.15.7)
- Project starter kit v3.3 added — tooling reference library under project-starter-kit-v3.3/ (v2.16.0)
- Push workflow prompts added under prompts/ (v2.16.0)
- All release docs (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG) current to v2.16.0
- VPS nginx routing fixed: `$uri.html` added to `try_files`, custom 404 page wired — clean URLs now work (v2.16.1)
- SSH public key added to VPS (74.208.9.49) for direct Claude Code access (v2.16.1)
- nginx 404 root cause documented in `docs/debug/nginx-404-debug.md` (v2.16.1)
- Full production-readiness audit completed and documented — `plans/2026-06-17-website-status-audit.md` (v2.17.0)
- Mobile responsive fixes: full-screen nav overlay, hamburger breakpoint ≤1100px, hero proof-photo crop/radius fixed, eyebrow font-size specificity fixed, CTA button colour in mobile nav — all 10 HTML files cache-busted (v2.18.0)
- Mobile-nav CTA label centring fix: `display: flex` added to `.mobile-nav .btn` so the existing `justify-content: center` takes effect (button was a block box, label left-aligned); `main.css` cache token bumped to `?v=mobile-20260619d` across all 10 HTML files (v2.18.1)
- Project Starter Kit V3.4 migrated into repo — 40 new files: `docs/governance/` (15 governance docs), `docs/project/` (9 project docs), `ai/` (agent prompts, roles, run logs), `.agents/skills/` (4 Codex skills), `MIGRATION_REPORT.md`, `00_MIGRATION_KICKOFF.md`, `V34_INSTALL_REPORT.json`; validator: PASS; AGENTS.md/CLAUDE.md preserved, V3.4 candidates in `.v34_migration_review/` for manual merge (v2.19.0)
- Production-readiness audit (V3.4) + portable doc/governance fixes: BLOCKED result recorded in `REPO_HEALTH_CHECK.md` + `RELEASE_GATE.md`; portable privacy-policy draft added at `legal/privacy-policy.md`; README version/staleness fixed; risks R-002–R-004 + ADR-013 + lessons L-012/L-013 logged (v2.20.0)
- Second production-readiness audit pass: BLOCKED result unchanged (v2.21.0); `main` fast-forwarded to this work after it sat unmerged on `audit/production-readiness` for two weeks
- Mandatory Model Selection Gate adopted repo-wide (`MODEL_SELECTION_GATE.md`, `PROMPT_MODEL_SELECTION_GATE.md`) — see ADR-014; stale `project-starter-kit-v3.3/`/`v3.4/` template folders (and gitignored leftovers) fully removed (v2.22.0)
- Formspree → Web3Forms migration: C-1 launch blocker resolved — both forms wired to a live Web3Forms access key (`src/js/web3forms-config.js`), honeypot spam protection, accessible loading/error states, request timeout added; inbox delivery confirmed; merged to `main` (v2.23.0); see `plans/2026-07-16-web3forms-migration.md`
- Hosting direction logged: self-hosting on the existing VPS proposed to the client (OD-003), pending acceptance (v2.23.0)
- OG image converted from SVG to PNG (1200×630) for social-share compatibility — M-1 resolved via headless-Chromium render; `PHASE_GATES.md` Gate 1/Gate 3 duplicate criterion reconciled (v2.24.0)
- Nginx security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, CSP-Report-Only) applied to the staging vhost per `docs/DEPLOYMENT.md` §7 — server-side only, no repo code change (2026-07-19)
- Staging redeployed to current `main` via new `scripts/deploy-staging.sh` (explicit path allowlist, replacing an untracked, four-week-stale manual deploy) — fixed live forms that were still POSTing to the dead Formspree endpoint and a stale OG image reference; R-004 mitigated for staging (v2.25.0)
- M-7 (`_next` redirect field in `book.html`) closed as not applicable — both forms submit via JS `fetch()` with `e.preventDefault()`, never performing a native POST/redirect, so the field would be inert; it no longer exists in the form at all, removed during the Web3Forms/AJAX migration (v2.23.0); see `DECISION_LOG.md` ADR-018, `SLICE_REVIEWS.md` SR-012 (2026-07-22, no version bump)

---

## Launch Blockers

| # | Blocker | File(s) | Required? |
|---|---|---|---|
| 1 | ~~**Formspree endpoint** — `REPLACE_ME` still in form action; forms cannot submit~~ — **Resolved in code 2026-07-16**, migrated to Web3Forms; **actually deployed to staging 2026-07-19** — the code fix sat undeployed on staging for 3 weeks (staging was still serving the dead endpoint until this session's redeploy, SR-009) | `book.html`, `contact.html` | Yes |
| 2 | **Deployment target** — staging VPS confirmed at `smart-learning-solutions.craftandconscious.com`; production domain not yet pointed | — | Yes |
| 3 | **Testimonials** — owner-supplied quotes pending | — | No (optional) |

---

## Open Audit Items

See `AUDIT.md` for full findings. Open items: H-1 (production domain routing), H-3 (Plausible), H-4 (overlay timeout), M-4, M-8, M-9 (medium). H-1 staging routing resolved (v2.16.1). C-1 (Formspree) resolved 2026-07-16 — migrated to Web3Forms. M-1 (OG image) resolved 2026-07-18 — converted to PNG. M-6 (`tel:` prefix) resolved v2.15.3. M-7 (`_next` redirect) closed 2026-07-22 — not applicable.

---

## Next Actions

| Priority | Action | Finding |
|---|---|---|
| 1 | ~~Create Formspree account → replace `REPLACE_ME`~~ — done via Web3Forms migration, merged to `main` (v2.23.0) | C-1 |
| 2 | Client to accept/reject self-host proposal; once accepted, point production domain to VPS and verify routing end-to-end | H-1 / OD-003 |
| 3 | ~~Convert `og-image.svg` to PNG/JPEG 1200×630~~ — done: `src/images/og-image.png` generated and referenced on all 9 pages, 2026-07-18 | M-1 |
| 4 | Reconcile V3.4 stub docs (`docs/project/`, `docs/governance/`) with existing root-level equivalents | V3.4 follow-up |
| 5 | Review V3.4 candidate AGENTS.md/CLAUDE.md in `.v34_migration_review/` and merge any useful additions | V3.4 follow-up |
| 6 | Run `scripts/deploy-staging.sh` after merging future changes to `main` — there is no automatic trigger; staging silently drifted 4 weeks behind before this session caught it (L-016) | SR-009 follow-up |

---

See `BACKLOG.md` for deferred and post-launch items.
