# Site Debug Remediation

## Objective
Fix the reported Programs navigation failure, add a real `/programs/` landing page, harden form validation without replacing the Formspree endpoint, and document deployment security and staging indexing requirements before production launch.

## Current State
- The shared Programs nav points to `/workshops.html#programs`.
- Same-page hash navigation can be treated as a full page transition, leaving the transition overlay visible.
- `/programs/` is intended to be its own page, but no `programs/index.html` exists yet.
- `book.html` and `contact.html` still use the known `REPLACE_ME` Formspree placeholder.
- Security headers and staging noindex policy are deployment concerns; no Nginx config is tracked in this repo.

## Files to Review
- `src/js/components.js`
- `workshops.html`
- `programs/coding-with-robots.html`
- `programs/pstem.html`
- `book.html`
- `contact.html`
- `sitemap.xml`
- `docs/DEPLOYMENT.md`
- `docs/TESTING.md`

## Files to Change
- `plans/2026-05-13-site-debug-remediation.md`
- `programs/index.html`
- `src/js/components.js`
- `book.html`
- `contact.html`
- `sitemap.xml`
- `docs/DEPLOYMENT.md`
- `docs/TESTING.md`

## Slice Plan
1. Add this plan file.
2. Add `/programs/` as a real Programs landing page using only confirmed Coding with Robots and PSTEM content.
3. Point shared Programs navigation to `/programs/` and prevent same-page hash links from triggering the transition overlay.
4. Restore form validation before AJAX submission while keeping `REPLACE_ME` unchanged.
5. Document Nginx security headers and staging-only indexing controls.
6. Add JS/CDN failure checks to the manual QA checklist.
7. Validate links, JavaScript syntax, local serving behavior, forms, and affected page rendering.

## Validation
- `node --check src/js/components.js`
- `node --check src/js/animations.js`
- Local HTTP server check for `/programs/`, `/workshops.html#programs`, Program detail pages, `book.html`, and `contact.html`.
- Local link/asset target check for HTML and shared component links.
- Manual or automated browser checks for desktop and mobile widths where available.
- Confirm invalid forms do not submit via AJAX.

## Risks
- Final Nginx security headers must be applied outside this repo unless the server config is later added.
- Form delivery remains blocked until the real Formspree endpoint is supplied.
- CSP should begin in report-only mode because current pages still use inline scripts and styles.
- Browser QA depends on locally available browser tooling.

## Open Questions
- What real Formspree endpoint should replace `REPLACE_ME` later?
- Who will apply the Nginx header changes on staging and production?
