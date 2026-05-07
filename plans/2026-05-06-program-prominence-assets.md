# Plan: Program Prominence and Asset Placement

**Date:** 2026-05-06
**Status:** Complete

---

## Objective
Increase the practical prominence of Coding with Robots and PSTEM after comparing the new site with the old public site. Use the newly added `pics` source assets selectively so the two flagship programs are easier to notice without turning the homepage into a cluttered gallery.

## Current State
The current site already has dedicated program pages and homepage/workshops program cards, but the top navigation points "Programs" directly to Coding with Robots. The old public site treated Coding with Robots and PSTEM as separate top-level offerings, so the new site should make both offerings feel equally important.

## Assumptions
- The user-approved planning review is the approval checkpoint for this implementation slice.
- `pics/Edison` assets belong to Coding with Robots.
- `pics/Whybricks` assets belong to PSTEM.
- Remaining people photos are social proof candidates and should be used selectively, not automatically.

## Constraints
- Start from repo root.
- Avoid unrelated edits and do not touch the pre-existing `RELEASE_NOTES.md` modification.
- Keep in-person workshop and quote-only positioning.
- Do not fabricate testimonials, metrics, or capabilities.
- Change shared navigation only through `src/js/components.js`.

## Files to Review
- `index.html`
- `workshops.html`
- `programs/coding-with-robots.html`
- `programs/pstem.html`
- `src/css/main.css`
- `src/js/components.js`
- `pics/Edison/`
- `pics/Whybricks/`

## Files to Change
- `index.html`
- `workshops.html`
- `programs/coding-with-robots.html`
- `programs/pstem.html`
- `src/css/main.css`
- `src/js/components.js`
- `src/images/program-coding-edison.jpg`
- `src/images/program-pstem-whybricks.avif`

## Slice 1
**Goal:** Make both flagship programs equally visible in shared navigation and program selector cards.

**Planned edits:**
- Point the shared Programs nav item to the neutral workshops program selector.
- Add program-specific media to the homepage and workshops program cards.
- Add a stable `id` to the workshops program selector for the shared nav target.

**Validation:**
- Check the affected pages through a local static server.
- Confirm the Programs nav target resolves.
- Confirm the program cards remain balanced on desktop and mobile.

## Slice 2
**Goal:** Strengthen each program page hero without changing the content strategy.

**Planned edits:**
- Add an Edison product image to the Coding with Robots hero.
- Add a Whybricks kit image to the PSTEM hero.
- Add responsive CSS for media-backed program cards and interior heroes.

**Validation:**
- Check both program pages through a local static server.
- Confirm images load and do not overlap text.
- Confirm existing CTAs and form links are unchanged.

## Risks
- Whybricks source images are AVIF files, so older browsers may not show them. The files are small and valid, and modern browsers support AVIF.
- Product images add clarity, but adding too many people photos before testimonials are approved could imply social proof the owner has not confirmed.
- The Programs nav item can link to a neutral section, but active-state behavior remains page-based.

## Rollback
Remove the copied `src/images/` program assets and revert the markup/CSS/navigation changes from this slice.

## Open Questions
- Which people photo, if any, should become the primary social proof image once testimonials are approved?
- Should the homepage hero eventually use a real workshop image, or should OD-002 remain open until owner-provided hero photography is selected?
