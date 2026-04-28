# Site Audit Remediation Plan

## Objective
Verify the 2026-04-24 audit findings against the current repository state and close the remaining launch-blocking defects that can be resolved without new owner decisions.

## Current State
- Program pages now live under `programs/` and site links point to `/programs/coding-with-robots.html` and `/programs/pstem.html`.
- Shared CSS and JavaScript now live under `src/css/` and `src/js/`; pages reference those paths.
- `robots.txt`, `sitemap.xml`, `404.html`, favicon links, canonical links, and Open Graph tags are present.
- `workshops.html` has full page content rather than a placeholder.
- Mobile nav active-state logic has already been added in `src/js/components.js`.
- `book.html` and `contact.html` still use the Formspree `REPLACE_ME` placeholder. This remains blocked by OD-001.
- Open Graph tags now reference `src/images/og-image.svg`, which has been added as a branded placeholder asset.
- `AGENTS.md` now references the actual workflow file, `docs/workflow/claude-code-workflow.md`.

## Files to Review
- `AGENTS.md`
- `CLAUDE.md`
- `docs/workflow/claude-code-workflow.md`
- `plans/open-decisions.md`
- `src/js/components.js`
- All `.html` pages
- `sitemap.xml`
- `robots.txt`

## Files to Change
- `AGENTS.md`
- `src/images/og-image.svg`
- HTML pages that reference the missing Open Graph image

## Slice Plan
1. Documentation correction: update `AGENTS.md` to point to the existing workflow file. Completed.
2. Social preview asset correction: add a real `src/images/og-image.svg` asset and update page `og:image` references to that file. Completed.
3. Validation: run static link/path checks and start a local server to verify affected pages load. Completed.

## Validation
- Confirmed there are no references to the missing workflow file.
- Confirmed every local `href`, stylesheet, script import, and Open Graph image path resolves to an existing file where applicable.
- Confirmed `REPLACE_ME` remains only in the known Formspree-blocked files/docs.
- Loaded all pages and core assets through a local server.
- Verified browser-rendered header/footer injection and desktop/mobile active nav state on `resources.html`.

## Risks
- Form submission cannot be made production-ready until the owner provides real Formspree endpoint URL(s).
- SVG Open Graph images may be less broadly supported than JPG/PNG on some social platforms; this is a valid placeholder asset until final brand imagery is supplied.

## Open Questions
- What Formspree endpoint URL should replace `REPLACE_ME` in `book.html` and `contact.html`?
- Should the final Open Graph image be a branded JPG/PNG exported from the eventual visual identity or photography?
