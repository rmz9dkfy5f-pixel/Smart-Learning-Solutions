# Progress Note — 2026-05-15

## Current Version
v2.14.1 · commit `9457ab9`

## Site Status
The static marketing site for Smart Learning Solutions is feature-complete for
pre-launch. All pages are built, navigation is correct, and the design system
is consistent across the full page set.

## What Is Done
- Full 8-page site: Home, Workshops, Programs (×2 detail + 1 landing), Resources, About, Book, Contact
- Photo-driven redesign sitewide — hero, program pages, about, workshops (v2.13.x)
- Programs landing page at `/programs/` with sitemap and nav wired up (v2.14.0)
- Both booking forms hardened: validation, maxlength constraints, placeholder guard (v2.14.0)
- Custom cursor gracefully degrades on touch/pointer-only devices (v2.14.0)
- SEO pass complete: canonical tags, Open Graph, `robots.txt`, `sitemap.xml`, Plausible analytics
- Security headers and staging noindex documented in `docs/DEPLOYMENT.md`
- All release docs (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG) current to v2.14.2

## Remaining Launch Blockers
1. **Formspree endpoint** — `book.html` and `contact.html` still contain `REPLACE_ME`; forms will not submit until replaced
2. **Deployment target** — Production host not yet confirmed; domain not yet pointed
3. **Testimonials** — Still pending owner-supplied quotes (optional for launch)

## Next Actions
1. Create Formspree account and replace `REPLACE_ME` in both forms
2. Choose hosting (Netlify / Nginx / GitHub Pages) and deploy
3. Test forms, nav, and metadata on the live production URL
4. Confirm or defer footer social links and Professional Development page
