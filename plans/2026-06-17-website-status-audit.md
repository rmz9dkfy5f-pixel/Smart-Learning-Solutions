# Website Status Audit — Production Readiness

**Date:** 2026-06-17
**Version:** v2.17.0
**Branch:** `main` · Working tree: clean · Last commit: `8722f5a`
**Auditor:** Claude Code (read-only — no code changes made)

---

## Objective

Full production-readiness audit: determine what is working, what is broken, what is incomplete, what blocks launch, what can defer, and what the next action is.

---

## Current State

Gate 0 (Migration Baseline) is complete as of v2.15.0. The project is at Gate 1 (Launch Readiness), blocked on two owner-gated decisions. All development work is complete. Staging VPS is operational with clean URL routing and custom 404 fixed at v2.16.1.

---

## Audit Findings

### 1. What is Working

- **All 10 pages** render and pass all content rules: `index.html`, `about.html`, `workshops.html`, `book.html`, `contact.html`, `resources.html`, `404.html`, `programs/index.html`, `programs/coding-with-robots.html`, `programs/pstem.html`
- **Content compliance clean across the board:**
  - Zero virtual/online/Zoom/webinar language anywhere
  - Zero prices, "$" signs, or Buy Now/Order CTAs
  - "Request a Workshop" / "Get a Quote" CTAs used consistently (15× on index.html)
  - Program names correct sitewide ("Coding with Robots" and "PSTEM")
  - Parent framing leads on home and workshops pages
- **Shared chrome:** every page uses `initPage({ activePage: '…' })` from `src/js/components.js` — nav is single-source
- **SEO baseline present** on every page: `<title>`, meta description, `og:*`, `twitter:card`
- **Sitemap + robots.txt** present and consistent with on-disk pages
- **Custom branded 404** wired and matches brand
- **Plausible analytics** active for both apex and `www` domains via `src/js/components.js:18`
- **External deps pinned with SRI hashes** (GSAP 3.12.5, ScrollTrigger 3.12.5)
- **All 14 image references resolve** — no broken `src=` anywhere
- **Staging VPS clean URL routing fixed** at v2.16.1 (`try_files $uri $uri/ $uri.html =404`)
- **Planning system internally consistent** — STATUS, PHASE_GATES, BACKLOG, PLAN, DECISION_LOG cross-reference cleanly with no contradictions

### 2. What is Broken

Nothing actively broken in production-blocking code paths.

- 🔴 **Formspree endpoint placeholder** — `book.html:108` and `contact.html:121` both contain `action="https://formspree.io/f/REPLACE_ME"`. Client-side JS guards submission so this is a silent non-submit, not an error page. Tracked as **C-1 / OD-001**.

### 3. What is Incomplete

- 🟡 **H-1 / OD-003** — Production domain not yet pointed at VPS `74.208.9.49`. DNS + SSL/HSTS gate is owner-pending.
- 🟡 **M-1** — `og-image.svg` not yet rasterized to PNG/JPEG 1200×630 for social previews. Cosmetic, deferrable.
- 🟡 **`sitemap.xml` lastmod dates** — stale at 2026-05-06. Bump on next deploy.
- 🟡 **`programs/index.html` og:title** — uses a hyphen instead of em-dash (minor polish, all other pages use em-dash).
- 🟡 **No CI / GitHub Actions** — by design for a static site; deploy is manual.

### 4. What is Risky for Production

- Forms will silently fail if deployed with `REPLACE_ME` still in place and JS guard ever regresses
- No automated smoke test of form submission post-deploy — README documents the manual step but it is human-only
- Sitemap lastmod will mis-signal recency to search engines if not bumped before deploy
- Several large root-level legacy docs (`AUDIT.md` 33 KB, `TASK-polish-and-seo.md`, `Planning Documents/` folder) are not contradicting current docs but add cognitive load — low risk, not blocking

### 5. What Must Be Fixed Before Deploy

1. **Owner:** create Formspree form, supply real endpoint ID
2. **Code:** replace `REPLACE_ME` in `book.html:108` and `contact.html:121`; test end-to-end on staging VPS
3. **Owner:** confirm production domain (smartlearningsolutions.org), update DNS A record to `74.208.9.49`, request/install certificate
4. **Code:** bump `<lastmod>` entries in `sitemap.xml` to deploy date
5. **Verify on production domain:** nav links resolve, forms submit and arrive in email, `/programs/` clean URL works, custom 404 fires, Plausible reports first pageviews

Optional but recommended before sign-off:

6. Generate PNG/JPEG `og-image` and update `og:image` references (M-1)
7. Fix `programs/index.html` `og:title` em-dash

### 6. What Can Safely Be Deferred

- OD-005 Social media links in footer (Gate 2)
- OD-007 Testimonials / proof quotes (Gate 2)
- GitHub Actions / CI — defer until a build step actually exists
- `AUDIT.md`, `TASK-polish-and-seo.md`, `Planning Documents/` cleanup — archive after launch
- `DECISIONS.md` / `DECISION_LOG.md` merge (already marked deferred in SR-001)

### 7. Next Best Action

Owner action unlocks everything. Concretely:

> Provide the real Formspree form endpoint and confirm the production domain target. Once both are in hand, a single Gate-1 slice can: (a) swap the endpoint into both forms, (b) bump sitemap lastmod, (c) update DNS, (d) run the end-to-end verification checklist, (e) tag v2.17.x "Launch".

Estimated code work after owner inputs land: under 2 hours, plus DNS propagation.

---

## Files Audited

**Pages:** `index.html`, `about.html`, `workshops.html`, `book.html`, `contact.html`, `resources.html`, `404.html`, `programs/index.html`, `programs/coding-with-robots.html`, `programs/pstem.html`

**Shared:** `src/js/components.js`, `src/css/main.css`, `src/js/animations.js`

**Config:** `.gitignore`, `.env.example`, `.vscode/settings.json`, `.github/`, `robots.txt`, `sitemap.xml`

**Planning:** `STATUS.md`, `PHASE_GATES.md`, `BACKLOG.md`, `DECISION_LOG.md`, `PLAN.md`, `ROADMAP.md`, `PROGRESS_NOTE.md`, `LESSONS_LEARNED.md`, `SLICE_REVIEWS.md`, `MIGRATION_CHECKLIST.md`, `plans/open-decisions.md`, `plans/`

**Release/infra:** `RELEASE_NOTES.md` (v2.16.0–v2.16.1), `CHANGELOG.md` tail, `docs/DEPLOYMENT.md`, `docs/debug/nginx-404-debug.md`

---

## Validation Commands

```bash
# Confirm clean tree
git status --short && git branch --show-current

# Confirm Formspree placeholder still present (pre-fix check)
grep -n "REPLACE_ME" book.html contact.html

# Confirm no virtual / pricing language
grep -inE "virtual|online workshop|webinar|zoom|\$[0-9]" *.html programs/*.html

# Confirm Plausible domain config
grep -n PLAUSIBLE_DOMAINS src/js/components.js

# Local smoke test
npx serve .
```

---

## Risks

- Both launch blockers are owner-gated — no code work is possible until Formspree endpoint and production domain are confirmed
- Staging domain (`smart-learning-solutions.craftandconscious.com`) is operational but staging noindex rules must be removed before production go-live

## Open Questions

- OD-001: What is the Formspree form endpoint ID?
- OD-003: Confirm production domain target and DNS ownership
