# Progress Note — 2026-05-15

## Current Version
v2.14.3 · commit `f8f8028`

## Site Status
The static marketing site for Smart Learning Solutions is feature-complete
for pre-launch. All pages are built, navigation is correct, and the design
system is consistent across the full page set. A full diagnostic audit has
been completed and documented in AUDIT.md.

## What Is Done
- Full 8-page site: Home, Workshops, Programs (×2 detail + 1 landing),
  Resources, About, Book, Contact
- Photo-driven redesign sitewide — hero, program pages, about, workshops (v2.13.x)
- Programs landing page at `/programs/` with sitemap and nav wired up (v2.14.0)
- Both booking forms hardened: validation, maxlength constraints, placeholder guard (v2.14.0)
- Custom cursor gracefully degrades on touch/pointer-only devices (v2.14.0)
- SEO pass complete: canonical tags, Open Graph, `robots.txt`, `sitemap.xml`, Plausible analytics
- Security headers and staging noindex documented in `docs/DEPLOYMENT.md`
- Full site diagnostic audit completed — findings in `AUDIT.md` (v2.14.3)
- All release docs (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG) current to v2.14.3

## Remaining Launch Blockers
1. **Formspree endpoint** — `book.html` and `contact.html` still contain
   `REPLACE_ME`; forms will not submit until replaced
2. **Deployment target** — Production host not yet confirmed; domain not yet pointed
3. **Testimonials** — Still pending owner-supplied quotes (optional for launch)

## Audit Findings Summary (see AUDIT.md for full detail)
- **Critical:** Formspree unconfigured (C-1); `.btn { cursor: none }` ungated (C-2)
- **High:** `/programs/` routing server dependency (H-1); no SRI on GSAP (H-2);
  Plausible mutable URL (H-3); overlay no timeout fallback (H-4)
- **Medium:** SVG OG image (M-1); programs title hyphen (M-2); PSTEM img dimensions (M-3);
  inline style blocks (M-4); stale CSS query strings (M-5); tel: format (M-6);
  empty _next (M-7); email casing (M-8); no robots meta (M-9)

## Next Actions
1. Fix C-2: gate `.btn { cursor: none }` behind `.custom-cursor-enabled`
2. Create Formspree account and replace `REPLACE_ME` in both forms (C-1)
3. Confirm `/programs/` routing on target host (H-1)
4. Add SRI hashes to GSAP CDN script tags (H-2)
5. Convert `og-image.svg` to PNG/JPEG 1200×630 (M-1)
6. Fix title em-dash on programs page (M-2)
7. Add `width`/`height` to PSTEM product image (M-3)
8. Fix `tel:` prefix to `+18773657678` (M-6)
