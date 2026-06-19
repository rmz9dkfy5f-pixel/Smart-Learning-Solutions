# Smart Learning Solutions — Status

**Current Version:** v2.18.1 · 2026-06-19

---

## Site Health

Feature-complete for pre-launch. All 10 pages are built, navigation is correct, and the design system is consistent sitewide. A full diagnostic audit has been completed and documented in `AUDIT.md`. The remaining blockers are operational and content decisions — not missing site structure.

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

---

See `BACKLOG.md` for deferred and post-launch items.
