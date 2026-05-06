# Polish, SEO & Analytics Completion

## Objective
Complete the remaining `TASK-polish-and-seo.md` items without rewriting already-completed SEO, icon, sitemap, robots, or 404 work. Add Plausible analytics sitewide and record the owner decision that both apex and `www` domains should be tracked.

## Current State
- Canonical and Open Graph tags already exist on public HTML pages.
- SVG icons have already replaced the emoji icons in `index.html`, `about.html`, and `resources.html`.
- `sitemap.xml`, `robots.txt`, `404.html`, mobile nav active state, and the `resources.html` background token fix already exist.
- `src/images/og-image.svg` exists and is the preferred social preview asset.
- Analytics is not yet implemented.

## Files to Review
- `TASK-polish-and-seo.md`
- `src/js/components.js`
- Public HTML pages
- `sitemap.xml`, `robots.txt`, `404.html`
- `plans/open-decisions.md`
- `CHANGELOG.md`

## Files to Change
- `src/js/components.js`
- Public HTML pages missing `twitter:card`
- `sitemap.xml`
- `404.html`
- `plans/open-decisions.md`
- `CHANGELOG.md`

## Slice Plan
1. Add Plausible once via `components.js`, tracking `smartlearningsolutions.org,www.smartlearningsolutions.org`.
2. Add missing `twitter:card` tags while preserving existing canonical and `og-image.svg` metadata.
3. Refresh `sitemap.xml` `lastmod` values to `2026-05-06` and align priorities with the task.
4. Lightly adjust `404.html` recovery actions to Home and Request a Workshop.
5. Mark OD-006 as resolved and add a changelog entry.

## Validation
- Serve the repo over local HTTP.
- Check the public pages and `/404.html` load with injected header/footer.
- Confirm the Plausible script appears once per rendered page.
- Confirm `sitemap.xml` and `robots.txt` are accessible at root.
- Confirm no emoji icons remain in the affected HTML files.
- Confirm Formspree placeholders are not changed.

## Risks
- Plausible may require the same comma-separated domains to be configured in its dashboard.
- Existing per-page SVG favicon links remain in place to avoid broad HTML churn.

## Open Questions
- OD-001 Formspree endpoint remains open.
- OD-002 hero photography remains open.
- OD-003 deployment target remains open.
