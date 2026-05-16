# Smart Learning Solutions — Status

**Current Version:** v2.14.4 · 2026-05-15

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
- All release docs (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG) current to v2.14.4

---

## Launch Blockers

| # | Blocker | File(s) | Required? |
|---|---|---|---|
| 1 | **Formspree endpoint** — `REPLACE_ME` still in form action; forms cannot submit | `book.html`, `contact.html` | Yes |
| 2 | **Deployment target** — production host not confirmed; domain not pointed | — | Yes |
| 3 | **Testimonials** — owner-supplied quotes pending | — | No (optional) |

---

## Audit Findings

Full detail in `AUDIT.md`. Summary:

**Critical**
- **C-1:** Formspree `REPLACE_ME` — both forms non-functional
- **C-2:** `.btn { cursor: none }` not gated by `.custom-cursor-enabled` — if GSAP CDN fails, all button cursors disappear

**High**
- **H-1:** `/programs/` directory routing — requires server DirectoryIndex; may 404 on some hosts
- **H-2:** No SRI hashes on GSAP CDN `<script>` tags
- **H-3:** Plausible loaded from mutable URL (no version pin, no SRI)
- **H-4:** Page transition overlay has no timeout fallback

**Medium (9 items)**
SVG OG image (M-1) · programs title hyphen (M-2) · PSTEM img dimensions (M-3) · inline style blocks (M-4) · stale CSS query strings (M-5) · `tel:` format (M-6) · empty `_next` field (M-7) · email casing (M-8) · no `robots` meta tag (M-9)

---

## Next Actions

| Priority | Action | Finding |
|---|---|---|
| 1 | Fix `.btn { cursor: none }` — prefix with `body.custom-cursor-enabled` in `main.css` | C-2 |
| 2 | Create Formspree account → replace `REPLACE_ME` in `book.html` and `contact.html` | C-1 |
| 3 | Choose deployment host; verify `/programs/` directory routing resolves | H-1 |
| 4 | Add SRI hashes to GSAP `<script>` tags | H-2 |
| 5 | Convert `og-image.svg` to PNG/JPEG 1200×630 | M-1 |
| 6 | Fix `<title>` on `programs/index.html` — hyphen → em-dash | M-2 |
| 7 | Add `width`/`height` to PSTEM product image | M-3 |
| 8 | Fix `tel:` href to `+18773657678` | M-6 |

---

## Deferred

- **Professional Development page** — no content yet; defer until content is confirmed
- **Footer social links** — placeholder exists; defer until active accounts are confirmed
- **FAQ page** — add post-launch if common booking questions emerge
