# Smart Learning Solutions — Status

**Current Version:** v2.20.0 · 2026-06-25
**Branch:** `main`

---

## Site Health

Feature-complete for pre-launch. All 10 pages are built, navigation is correct, and the design system is consistent sitewide. A full diagnostic audit has been completed and documented in `AUDIT.md`. The remaining blockers are operational and content decisions — not missing site structure.

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

---

## Launch Blockers

| # | Blocker | File(s) | Required? |
|---|---|---|---|
| 1 | **Formspree endpoint** — `REPLACE_ME` still in form action; forms cannot submit | `book.html`, `contact.html` | Yes |
| 2 | **Deployment target** — staging VPS confirmed at `smart-learning-solutions.craftandconscious.com`; production domain not yet pointed | — | Yes |
| 3 | **Testimonials** — owner-supplied quotes pending | — | No (optional) |

---

## Open Audit Items

See `AUDIT.md` for full findings. Open items: C-1 (Formspree), H-1 (production domain routing), H-3 (Plausible), H-4 (overlay timeout), M-1 (OG image), M-4–M-9 (medium). H-1 staging routing resolved (v2.16.1).

---

## Next Actions

| Priority | Action | Finding |
|---|---|---|
| 1 | Create Formspree account → replace `REPLACE_ME` in `book.html` and `contact.html` | C-1 |
| 2 | Point production domain to VPS; verify routing end-to-end | H-1 |
| 3 | Convert `og-image.svg` to PNG/JPEG 1200×630 | M-1 |
| 4 | Reconcile V3.4 stub docs (`docs/project/`, `docs/governance/`) with existing root-level equivalents | V3.4 follow-up |
| 5 | Review V3.4 candidate AGENTS.md/CLAUDE.md in `.v34_migration_review/` and merge any useful additions | V3.4 follow-up |

---

See `BACKLOG.md` for deferred and post-launch items.
