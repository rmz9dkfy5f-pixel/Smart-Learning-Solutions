# Slice Reviews

Record of significant work slices reviewed before and after implementation.

---

## SR-011 — Deploy v2.26.0 to Staging + Reference-File Hygiene (server-side + housekeeping, no version bump)
**Date:** 2026-07-22
**Version:** v2.26.0 (deployed, not newly released)
**Commit:** `<pending>` (docs/housekeeping only — the logo code itself already shipped in `7594701`/`3ae77b9`)

**Slice:** Close out two loose ends explicitly flagged (not silently done) at the end of the
SR-010 logo session: (1) staging still served the pre-logo placeholder wordmark, since deploying
wasn't part of that session's ask; (2) an unused black-line-art reference file sat untracked
under a meaningless device-export filename.

**Pre-review finding:** Per `LESSONS_LEARNED.md` L-016 ("a confirmed host is not a confirmed
deploy pipeline"), staleness was verified directly rather than assumed — `curl`-ing the live
`src/js/components.js` showed the old inline SVG fill (`E85D1A`, 2 matches) and zero references
to `brand-logo-mark`; requesting the new asset path directly returned `404`. Confirmed genuinely
stale, not just presumed so.

**Change:** Followed `docs/DEPLOYMENT.md` §9/§11 exactly (same runbook SR-009 already proved
once): SSH `cp -a` backup (`smart-learning-solutions.bak-20260722-090930`) → `--dry-run` (showed
only the 3 expected changed/new files: `main.css`, `brand-logo-mark.png`, `components.js`) →
real `scripts/deploy-staging.sh` run → full `curl` verification. Separately, renamed the unused
reference file (owner-confirmed: keep, not delete — it's the only higher-resolution native mono
source of the design) from `pics/Logo/169B49B9-553F-4E10-82BC-E5EE7636C266.jpeg` to
`pics/Logo/logo-black-line-art.jpeg` and tracked it in git for the first time (previously
untracked). `DECISION_LOG.md` ADR-017's Consequences updated to close out its own flagged open
item rather than leaving it stale.

**Findings:** Dry run matched expectations exactly, no surprises. Real deploy transferred
cleanly. Post-deploy `curl` verification: `/src/images/brand-logo-mark.png` → `200`,
`image/png`; live `components.js` now contains `brand-logo-mark` (2 matches) and zero `E85D1A`
matches. Full SR-009-style regression net re-run and unaffected: all pages `200` (`/404.html`
itself correctly still `404`s, ADR-009 `internal`); both forms reference
`web3forms-config.js`, zero `formspree`/`REPLACE_ME`; `og:image` resolves; all 5 SR-008 security
headers present (CSP still report-only); internal paths (`/AUDIT.md`, `/.git/config`,
`/.claude/settings.json`, `/scripts/deploy-staging.sh`) all still `404`.

**Post-review result:** Staging now reflects `main` @ `3ae77b9` (v2.26.0) — the real client logo
is live, not just shipped to the repo. The black-line-art reference asset is now a properly
named, tracked file instead of an untracked leftover with no decision behind it.

**Risk:** Low — repeat of an already-proven runbook (SR-009), backed up first, dry-run-verified
before the real transfer, scoped to `/var/www/smart-learning-solutions/` only on a shared
multi-tenant host. The file rename/tracking touches nothing live (confirmed unused by any code
path in the SR-010 session).

---

## SR-010 — Client Logo Implementation (v2.26.0)
**Date:** 2026-07-22
**Version:** v2.26.0
**Commit:** `7594701`

**Slice:** Replace the placeholder inline-SVG-badge + text wordmark in `components.js`'s
`buildHeader()`/`buildFooter()` with the client's actual logo image, owner-confirmed as the
next task at the 2026-07-21 closeout.

**Pre-review finding:** The owner-pasted reference image looked like black line art, but the
confirmed source file (`pics/Logo/Logo.png.avif`, already git-tracked, added 2026-05-08, never
wired in) decoded to a full-color orange/teal version with real alpha transparency. A second,
untracked file in the same folder (`169B49B9-...jpeg`) is the actual black version but has an
opaque white background with no alpha channel, and only `sips` is available locally (no
ImageMagick/PIL for chroma-key background removal) — using it would have meant either a risky
improvised background-removal attempt or accepting a visible white box against the site's
transparent-by-default header. Surfaced this plainly rather than guessing; owner deferred the
color-treatment call.

**Change:** Used the color AVIF, native color, no CSS filter — cropped to a 277×120 single-line
"icon + SmartLearning" lockup (excludes the "solutions" swoosh) and saved as
`src/images/brand-logo-mark.png`. Wired into both builder functions as a single `<img>`; restyled
`.site-logo`/`.footer-brand .site-logo` for an image child; removed the dead `.site-logo span`
color rule. `AUDIT.md` L-2 resolved as a side effect (old mismatched SVG no longer exists).

**Findings:** Smoke pass (disposable Playwright script, local static server, real Chromium)
across all 10 pages: 200 status, zero console/page errors, logo image request 200 everywhere.
Visual pass on `index.html`: logo renders in full orange/teal color, correctly sized, in the
transparent top-of-page header, the scrolled/opaque header, the footer, at 1100px width (this
repo's documented historical nav-squeeze zone — no regression), mobile header, mobile nav-open
overlay, and mobile footer.

**Post-review result:** Header/footer now show the client's real logo. No favicon change (out of
scope, owner-confirmed). Two loose ends noted for later, not blocking: whether the full two-line
lockup (with "solutions") should be placed anywhere, and whether the unused
`pics/Logo/169B49B9-...jpeg` should be kept or removed.

**Risk:** Low — scoped to the shared header/footer component and one new image asset; validated
live across all pages and the documented regression zone before shipping.

---

## SR-009 — Staging Redeploy + Deploy-Allowlist Hardening (v2.25.0)
**Date:** 2026-07-19
**Version:** v2.25.0
**Commit:** `b0e0371`

**Slice:** Redeploy current `main` (HEAD `2b39333`) to the staging VPS, replacing a stale
deployment last touched ~2026-06-19/23, and add a durable, allowlist-based deploy mechanism so
internal-only files can never be shipped by a future careless deploy (R-004).

**Pre-review finding:** Investigating a narrower, originally-scoped task ("add `.claude/`/
`.agents/` to rsync excludes") found the staging web root had no `.git/`, deploy script, or CI
workflow — the last deploy was a one-time manual copy that was never repeated. It predated the
Web3Forms migration (both forms still POSTed to the dead `formspree.io/f/REPLACE_ME` endpoint on
live) and the OG-image PNG conversion (`index.html` still referenced `og-image.svg`). All pages
including `workshops.html` were present but stale.

**Change:** Added `scripts/deploy-staging.sh` — an explicit source-path allowlist (7 root pages,
`robots.txt`, `sitemap.xml`, `programs/`, `src/`, `legal/`) over rsync/SSH, with `--delete`
scoped per-directory so it can never reach sibling paths. Took a timestamped `cp -a` backup of
the live directory before the real run (`smart-learning-solutions.bak-20260720-034206`). `pics/`
and every repo-internal path were never named as a source anywhere, so structurally excluded
rather than denylist-excluded. See `DECISION_LOG.md` ADR-016 for the allowlist-over-denylist
rationale.

**Findings:** Dry run confirmed ~1.26MB across 9 root files + `programs/`/`src/`/`legal/`,
matching only the allowlist. Real run deployed cleanly (one bash-3.2 "unbound variable" bug in
the script's dry-run-flag handling was found and fixed via the dry run before any real transfer
occurred — no partial state resulted). Post-deploy `curl` verification: `book.html`/`contact.html`
now call `api.web3forms.com`, zero `formspree`/`REPLACE_ME` references; `index.html` `og:image`
now points to `og-image.png`; the PNG is fetchable (200, `image/png`); all pages return 200;
direct `/404.html` correctly still 404s (ADR-009 `internal`); all 5 security headers from SR-008
unaffected; `/AUDIT.md`, `/.git/config`, `/.git/HEAD`, `/.claude/`, `/.agents/skills/.../SKILL.md`,
`/docs/...`, `/plans/...`, `/COMMIT_NOTES.md`, and `/scripts/deploy-staging.sh` itself all
continue to 404.

**Post-review result:** Staging now reflects `main` HEAD. `docs/DEPLOYMENT.md` updated with new
§11 (deploy script) and a corrected §9 (VPS-specific rollback, replacing the inapplicable
git-based rollback text). `docs/governance/PROJECT_RISK_REGISTER.md` R-004 updated to "mitigated
for staging / open for production" (not blanket-closed — production hosting is still undecided
per OD-003). `LESSONS_LEARNED.md` L-013 resolved, new L-016 added.

**Risk:** Low — allowlist-scoped, backed up, dry-run-verified before execution; shared
multi-tenant server, but every command scoped to `/var/www/smart-learning-solutions/` only.

---

## SR-008 — Nginx Security Headers on Staging (server-side, no version bump)
**Date:** 2026-07-19
**Version:** — (no repo code change; server-side config only)
**Commit:** — (nothing to commit for the core change)

**Slice:** Apply `docs/DEPLOYMENT.md` §7's baseline security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`,
`Content-Security-Policy-Report-Only`) to the staging vhost on the VPS.

**Pre-review finding:** The SSH key path documented in prior sessions (`~/.ssh/id_ed25519`) no
longer exists on the local machine; a different, already-authorized local key was found and used
instead. Discovery also revealed the VPS is a shared, multi-tenant host serving several other
unrelated client sites (Jones Barber Shop, Old Fashion Care, Pro Auto Repair, etc.) alongside this
one — not a dedicated host as earlier docs implied. The `smart-learning-solutions` vhost itself had
no pre-existing header directives and no `location` block that would have swallowed
server-level `add_header` inheritance.

**Review method:** Took a timestamped backup of the live vhost config; wrote the 5 directives to a
new `/etc/nginx/snippets/security-headers.conf` (built locally and diffed against
`docs/DEPLOYMENT.md` §7 to rule out transcription drift, then uploaded via `scp` to avoid remote
shell-quoting hazards around the CSP value's embedded quotes); inserted a single idempotent
`include` line into the vhost, anchored on `index index.html;` (unique — `server_name` appears
twice in the file, in both the HTTPS and the plain-HTTP-redirect blocks). Validated with
`nginx -t`, reloaded via `systemctl reload nginx` (graceful, no dropped connections).

**Findings:**
- All 5 headers verified present with correct values on 3 representative pages (root, `/about`,
  `/workshops.html`), all returning 200
- Confirmed `Content-Security-Policy-Report-Only` only — no enforcing `Content-Security-Policy`
  header present
- Custom 404 routing (`try_files`/`error_page 404`, from ADR-009/SR-002) unaffected
- Final config diff against the pre-change backup showed exactly one added line — nothing else
  touched
- HSTS and the separate `X-Robots-Tag` staging-indexing header (§8) intentionally excluded —
  production/HTTPS isn't final, and §8 wasn't part of this task's scope

**Post-review result:** Staging security-header criterion resolved. `docs/DEPLOYMENT.md` §3,
`STATUS.md`, `PHASE_GATES.md` Gate 1 updated to reflect staging done, production still pending
domain/HTTPS finalization (OD-003).

**Risk:** Low — additive, report-only headers on a fully-reversible, backed-up config; verified
against a shared multi-tenant server, but only the `smart-learning-solutions` vhost file was
touched (confirmed via diff).

---

## SR-007 — OG Image PNG Conversion (v2.24.0)
**Date:** 2026-07-18
**Version:** v2.24.0
**Commit:** `d7f48fd`

**Slice:** Resolve M-1 (`AUDIT.md`) — convert `og-image.svg` to a 1200×630 PNG and repoint all
`og:image` references; reconcile tracking docs.

**Pre-review finding:** `og-image.svg` was already authored at the exact 1200×630 target canvas
but no PNG existed anywhere in the repo, and no SVG-rasterization tooling was installed. Two
Explore agents run in parallel confirmed: (1) the SVG is self-contained with no external assets,
9 pages reference it identically, no `twitter:image` tag exists; (2) no ImageMagick/
rsvg-convert/Inkscape/cairosvg is installed, but two fully-functional headless-Chromium binaries
already exist on disk from prior Playwright use.

**Review method:** Rendered via `chrome-headless-shell --headless --screenshot`; verified exact
1200×630 output via `sips`; visually inspected the PNG against the known SVG content; grepped
for zero remaining `.svg` references and exactly 9 `.png` references; spot-checked 5 pages via a
local `serve` instance (200 responses, correct tag).

**Findings:**
- Render was faithful on the first attempt — no fallback binary needed
- `PHASE_GATES.md` carried this requirement twice (Gate 1 "Open Graph metadata verified" and a
  stale Gate 3/Deferred duplicate) — reconciled by checking Gate 1's criterion and removing the
  Gate 3 duplicate, since this is Gate-1 launch-readiness work, not deferred post-launch scope
- `RELEASE_NOTES.md` had a pre-existing 3-version gap (last entry v2.20.0; v2.21.0–v2.23.0 were
  never added) — flagged to the owner, not backfilled in this slice

**Post-review result:** M-1 fully resolved. `BACKLOG.md`, `STATUS.md`, `FILE_MAP.md`,
`PHASE_GATES.md` updated. PNG chosen over JPEG (lossless, no compression artifacts on the
text/gradient graphic) — no repo doc stated a preference either way.

**Risk:** Low — additive PNG asset plus one-line meta-tag edits on 9 pages; SVG source untouched
and left in place.

---

## SR-006 — Web3Forms Merge + Hosting Decision (v2.23.0)
**Date:** 2026-07-18
**Version:** v2.23.0
**Commit:** `7031e21`

**Slice:** Review and merge `feat/web3forms-integration` into `main`; confirm the two items that ADR-015 explicitly left open.

**Pre-review finding:** Branch `feat/web3forms-integration` (2026-07-16/17) implemented a working Web3Forms replacement for the dead Formspree `REPLACE_ME` endpoint, but was unmerged and had two open items per its own plan: unconfirmed inbox delivery, and a still-undecided hosting platform.

**Review method:** Read the full branch diff (`book.html`, `contact.html`, `src/js/web3forms-config.js`, `src/css/main.css`, and all doc updates); read `plans/2026-07-16-web3forms-migration.md` and `DECISION_LOG.md` ADR-015 in full.

**Findings:**
- Implementation is sound: honeypot field, accessible `role="status"` loading/error region, `AbortController` timeout, duplicate-submission guard; access key documented as public/client-safe per Web3Forms' own docs, not a secret
- No `REPLACE_ME` remaining in either form
- Docs (`CLAUDE.md`/`AGENTS.md` Confirmed Decisions, `BACKLOG.md`, `PHASE_GATES.md`, `plans/open-decisions.md`, `DECISION_LOG.md`) were kept consistent with the code change throughout the branch

**Post-review result:** Owner confirmed inbox delivery and the hosting direction (self-host proposal to the client, OD-003). Branch merged into `main` (`--no-ff`) and pushed. C-1/OD-001 launch blocker fully resolved. Deployed-domain verification (Gate 1) remains open pending client acceptance of the self-host proposal.

**Risk:** Low — code change was already reviewed and locally verified before this slice; this slice's own changes are additive documentation plus a conflict-free merge.

---

## SR-005 — Second Production-Readiness Audit (v2.21.0)
**Date:** 2026-06-27
**Version:** v2.21.0
**Commit:** `639159d`

**Slice:** Full read-only production-readiness audit — multi-agent pass across all 10 HTML pages, `src/js/`, `src/css/main.css`, `src/images/`, deployment config, security posture, SEO, accessibility, performance, and all governance docs.

**Pre-review finding:** Branch `audit/production-readiness` clean; last work was v2.20.0 portable fixes (2026-06-25). No code changes since v2.18.1 (mobile CTA center fix). All governance stubs filled as of v2.20.0.

**Audit method:** 3 parallel Explore agents — (1) repo structure, git state, docs; (2) HTML pages, CSS, JS, forms, SEO, images; (3) security, env, deployment, observability, CI/CD.

**Findings:**
- **P0 Launch Blockers (unchanged):** (1) Both forms POST to `REPLACE_ME` Formspree endpoint — zero conversion possible; (2) hosting platform unconfirmed — Wix incompatibility unresolved (ADR-013)
- **P1 High Risk (unchanged):** Internal docs exposed on deploy (R-004); OG image is SVG (M-1); privacy policy unpublished; security headers not applied at server level
- **Notable confirmation:** C-2 (cursor CSS gate) is **verified fixed** in current code — `cursor: none` gated by `body.custom-cursor-enabled` at `src/css/main.css:135-142`; the finding in AUDIT.md was stale (fixed in `43ee9f4`, v2.15.3)

**Post-review result:** No code changes executed. 5 governance/status docs updated to reflect 2026-06-27 audit result. Overall result: BLOCKED (unchanged from v2.20.0). Full audit report archived in `~/.claude/plans/encapsulated-sauteeing-mist.md`.

**Risk:** None from this slice (read-only + doc updates). All code fixes remain held per ADR-013.

---

## SR-004 — V3.4 Project Starter Kit Migration (v2.19.0)
**Date:** 2026-06-21
**Version:** v2.19.0
**Commit:** `2100943`

**Slice:** Install Project Starter Kit V3.4 in MIGRATE_EXISTING_PROJECT mode — governance docs, dual-agent skills, AI ops infrastructure.

**Pre-review finding:** Repo was on v2.18.1 (mobile CTA fix). All tracked files clean. Untracked: `project-starter-kit-v3.4/` only. Installer dry-run confirmed 38 fresh installs, 3 conflicts (`.DS_Store`, `AGENTS.md`, `CLAUDE.md`). No existing tracked file at risk.

**Changes:**
- `docs/governance/` — 15 governance docs installed fresh (no pre-existing `docs/governance/` directory)
- `docs/project/` — 9 project stub docs installed fresh (no pre-existing `docs/project/` directory)
- `ai/agents/`, `ai/prompts/`, `ai/reports/` — AI ops layer installed fresh
- `.agents/skills/` — 4 Codex skill SKILL.md files installed fresh
- `.v34_migration_review/` — AGENTS.md and CLAUDE.md V3.4 candidates quarantined; root copies untouched
- `00_MIGRATION_KICKOFF.md`, `MIGRATION_REPORT.md`, `V34_INSTALL_REPORT.json` — root-level install artefacts

**Post-review result:** `git diff --stat` empty (zero tracked-file modifications). V3.4 validator: `Status: PASS` (exit 0) — all 22 required paths present, all 8 skill frontmatters valid.

**Risk:** V3.4 stub docs in `docs/project/` and `docs/governance/` duplicate root-level equivalents — reconciliation required as a follow-up. AGENTS.md/CLAUDE.md candidates in `.v34_migration_review/` need manual review/merge.

---

## SR-003 — Mobile Responsive Fixes (v2.18.0)
**Date:** 2026-06-19
**Version:** v2.18.0
**Commit:** `ca43fb2`

**Slice:** Four-slice mobile responsive fix pass — nav overlay, photo crop, eyebrow specificity, hamburger breakpoint.

**Pre-review finding:** On-device iPhone screenshots confirmed:
- Open mobile menu leaked page content (heading behind logo, page text below the CTA button)
- Program hero proof photos cropped subjects at forehead level (fixed `180px` + `object-position: center 20%`)
- Corner-radius mismatch between stacked hero images (`--radius-md` vs `--radius-lg`)
- Section-break strip too thin (fixed `180px` + off-center crop)
- Eyebrow label wrapped on mobile due to CSS specificity (`.hero-content p` 16px beat `.eyebrow` 12px)
- iPad portrait (≤1100px): CTA button squished to ~64px by flexbox; label clipped entirely

**Changes:**
- `.mobile-nav`: `inset:0`, solid `--bg`, `padding-top` clears header; `z-index:99`; `opacity`/`transform` open transition
- `body.nav-open .site-header`: opaque while overlay is open
- `closeNav()` helper in `components.js`; closes on link-tap, Escape, `pageshow`
- `@media (max-width: 1100px)`: hide `.site-nav` + `.header-cta`, show `.nav-toggle` + `.mobile-nav`
- `.header-cta { flex-shrink: 0 }` in base styles
- `.hero-content .eyebrow` (specificity 0,2,0) inside `≤1100px` block sets `--text-xs`
- `.page-hero-proof-photo`: `--radius-lg`, `object-position: center center`, `aspect-ratio: 16/10` at ≤768px
- `.program-section-break`: `object-position: center center`, `aspect-ratio: 16/9` at ≤768px
- `.mobile-nav a.btn--primary, :hover { color: #fff }` — specificity fix for CTA colour
- Cache token `?v=mobile-20260619c` on all 10 HTML files

**Post-review result:** Playwright headed preview at 390px and 820px confirmed: no page content bleed-through on open menu; subjects visible in proof photos; eyebrow on one line; hamburger shows at 820px, desktop nav shows on drag past 1100px.

**Risk:** None remaining. Branch `fix/mobile-responsive-20260619` pushed; merge to `main` when owner approves.

---

## SR-002 — VPS nginx Routing Fix (v2.16.1)
**Date:** 2026-06-17
**Version:** v2.16.1

**Slice:** Fix nginx clean URL routing and custom 404 on staging VPS.

**Pre-review finding:** `curl` confirmed `/workshops.html` → 200 but `/workshops` → 404.
nginx default 404 (162 bytes) served instead of custom `404.html`.

**Change:** Updated `/etc/nginx/sites-available/smart-learning-solutions`:
- `try_files $uri $uri/ =404` → `try_files $uri $uri/ $uri.html =404`
- Added `error_page 404 /404.html; location = /404.html { internal; }`

**Post-review result:** `/workshops`, `/about` → 200. Custom 404 → 2795 bytes. `nginx -t` ok.

**Risk:** None remaining. Config backed up to `smart-learning-solutions.bak` on server.

---

## SR-001 — v2 Planning Migration (v2.15.0)
**Date:** 2026-05-16
**Version:** v2.15.0
**Commit:** `docs: migrate project planning system to v2`

**What was reviewed:**
- Phase 1 audit of existing docs against v2 required file list
- Gap analysis: 7 missing files identified
- Overlap analysis: AGENTS.md/CLAUDE.md duplication; confirmed-decisions scattered across 5 files
- Source-of-truth conflicts mapped

**What was changed:**
- Added 8 missing v2 files (PROJECT_BRIEF, PLAN, PHASE_GATES, BACKLOG, DECISION_LOG, SLICE_REVIEWS, LESSONS_LEARNED, PROGRESS_NOTES)
- Updated CLAUDE.md and AGENTS.md with v2 planning system pointers
- Updated STATUS.md and PROGRESS_NOTE.md to v2.15.0

**What was preserved:**
- All existing content in all existing files
- COMMIT_NOTES.md unconditionally
- PROGRESS_NOTE.md unconditionally
- ROADMAP.md, CHANGELOG.md, RELEASE_NOTES.md, STATUS.md, CONTEXT.md
- DECISIONS.md (historical ADRs intact; DECISION_LOG.md is additive)

**Unresolved after this slice:**
- AGENTS.md/CLAUDE.md duplication not yet resolved (additive only; merge deferred)
- Confirmed-decisions tables still exist in 5 places (consolidation deferred)
- TASK-polish-and-seo.md at root level not moved (awaiting specific approval)
- README.md version line not updated (kept out of migration scope)