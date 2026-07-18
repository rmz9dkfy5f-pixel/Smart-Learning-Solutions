# Slice Reviews

Record of significant work slices reviewed before and after implementation.

---

## SR-006 — Web3Forms Merge + Hosting Decision (v2.23.0)
**Date:** 2026-07-18
**Version:** v2.23.0
**Commit:** `PENDING`

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

---

## SR-002 — (next review)
_Reserved for next significant work slice._
