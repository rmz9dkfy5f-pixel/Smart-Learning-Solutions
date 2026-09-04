# Plan: Remove Inline `<style>` Blocks (M-4)

**Date:** 2026-09-04
**Status:** Approved

---

## Objective
Resolve `BACKLOG.md` M-4 / `AUDIT.md`'s M-4 finding: move each page's page-specific inline
`<style>` block into `src/css/main.css`, so page-specific CSS is no longer scattered across HTML
`<head>`s. Confirmed next task at both the 2026-08-17 and 2026-08-31 session closeouts.

## Current State
`AUDIT.md` named 5 affected pages (workshops, about, coding-with-robots, pstem, 404). Current
file state shows **7** pages actually carry a second inline `<style>` block — `book.html` and
`contact.html` also have one (added later, likely during the v2.23.0 Web3Forms migration, after
the audit was written). Owner confirmed 2026-09-04: fix all 7, correcting the stale audit scope.
Each affected page also has an unrelated first `<style>` block on line 6 (FOUC-prevention
snippet) that stays untouched — only the second, page-specific block is removed.

`main.css` (2342 lines) is organized into labeled `/* ==== Section ==== */` blocks. Several
modifier classes already in `main.css` depend on base classes currently defined only inline
(e.g. `.credential-item--photo` needs `.credential-item`, only in `about.html`; `.format-card:hover
...` needs `.format-card`, only in `workshops.html`) — moving the base rules resolves this
existing fragmentation too. `book.html` and `contact.html` each independently define an
identical `.form-success`/`.form-success.visible` pair — collapses to one shared definition.

## Assumptions
- Cache-bust token (`?v=mobile-20260619d` on `main.css` links) is bumped site-wide across all 10
  HTML pages, not just the 7 changed ones — matches repo precedent (v2.16.1, v2.18.1).
- Version impact: `patch` bump per `docs/VERSIONING.md` §5 ("CSS polish" / cleanup). No new
  `DECISION_LOG.md` ADR needed — mechanical code-quality fix, matching the M-9 precedent.

## Constraints
- Start from repo root
- Use small approval slices; validate before the docs/release slice
- Avoid unrelated edits — no visual/behavioral changes intended, pure relocation
- Do not touch each page's line-6 FOUC-prevention `<style>` snippet

## Files to Review
- `src/css/main.css`
- `404.html`, `about.html`, `workshops.html`, `book.html`, `contact.html`,
  `programs/coding-with-robots.html`, `programs/pstem.html`
- `docs/VERSIONING.md`, `AUDIT.md`, `BACKLOG.md`

## Files to Change
- `src/css/main.css` — 7 new/extended sections inserted next to their most related existing
  section (not appended at the end); 2 responsive-block merges into the existing `Responsive`
  section; see mapped insertion points below
- `404.html`, `about.html`, `workshops.html`, `book.html`, `contact.html`,
  `programs/coding-with-robots.html`, `programs/pstem.html` — delete each page's second
  `<style>` block
- All 10 HTML pages — bump the `main.css` cache-bust token
- `AUDIT.md` — mark M-4 resolved, correct 5→7 page count
- `BACKLOG.md` — strike M-4
- `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md`, `STATUS.md`,
  `PLAN.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md` — release ceremony

### `main.css` insertion map
| New/extended section | Location |
|---|---|
| `.levels-grid`/`.level-card`/`.level-badge` (coding-with-robots) | After "Program page — media stack" (ends :1704), before "Split Hero — about page pattern" (:1705) |
| `.investigations-grid`/`.investigation-card*` (pstem) | Same area as above |
| `.about-intro`/`.about-mission*`/`.credentials-list`/`.credential-item` (base) | Between "Split Hero" (ends :1763) and "Credential items — photo header variant" (:1764) |
| `.format-grid`/`.format-card` (base)/`.format-duration`/`.format-features*` | Immediately before "Format card — photo background (workshops page)" (:1594) |
| `.not-found*` (404) | After "Interior page hero" (ends :2041), before "Form" (:2042) |
| `.book-layout`/`.book-form-card*`/`.book-aside`/`.aside-card*`/`.aside-contact*` | After "Form" (ends :2098), before "Form status & spam protection" (:2099) |
| `.contact-layout`/`.contact-card*`/`.contact-methods`/`.contact-method*` | Same area as above |
| `.form-success`/`.form-success.visible` (shared, de-duplicated) | Into existing "Form status & spam protection (Web3Forms)" section (:2099-2144) |
| `.about-intro`/`.format-grid` responsive overrides | Into existing `@media (max-width: 768px)` block (:2192) |
| `.book-layout`/`.book-aside`/`.contact-layout` responsive overrides | New `@media (max-width: 900px)` block, inserted between the 1024px block (:2169-2190) and the 768px block |

## Slice 1
**Goal:** Move all page-specific CSS into `main.css`.

**Planned edits:**
- Add the 7 new/extended sections per the insertion map above
- Merge the two responsive-override groups into the `Responsive` section

**Validation:**
- Read back each inserted section against the source page's original block for exact rule parity

## Slice 2
**Goal:** Strip the moved CSS out of the HTML pages and refresh the cache-bust token.

**Planned edits:**
- Delete each of the 7 pages' second `<style>` block (line-6 FOUC snippet untouched)
- Bump `?v=mobile-20260619d` to a new token on all 10 pages' `main.css` link tag

**Validation:**
- Local server (`python3 -m http.server`) — load all 10 pages, check desktop + ≤1100px/≤900px/
  ≤768px breakpoints for the 7 changed pages; confirm 404 layout, about intro/credentials/
  watermark, workshops format cards, book/contact layouts + form-success success state, program
  detail level/investigation grids
- `grep -c '<style>' <file>` → 1 per changed file (was 2)
- `grep -rn 'mobile-20260619d'` → zero hits after the bump
- Browser console clean; `main.css` returns 200

## Slice 3
**Goal:** Close out M-4 in docs and run the release ceremony.

**Planned edits:**
- `AUDIT.md` M-4 → resolved, 5→7 page count corrected
- `BACKLOG.md` M-4 → struck through
- `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md` (new SR entry),
  `STATUS.md`, `PLAN.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md` updated; patch version bump

**Validation:**
- Cross-check version number is consistent across all updated docs

## Risks
- Copy-paste error during relocation (missed rule, wrong section) — mitigated by exact
  rule-parity check in Slice 1 validation
- `.form-success` de-duplication — functionally identical rules, but both pages' success states
  get explicit re-verification since they're now driven by one shared source
- Cache-bust bump touches all 10 files — verified via the zero-hits grep above

## Rollback
All changes are local commits on `main` until the user authorizes a push (per this repo's own
commit/push authorization rule). `git diff`/`git checkout -- <file>` reverses any slice before
commit; `git revert` after, if needed.

## Open Questions
None — the one ambiguity (5 vs. 7 page scope) was confirmed with the owner before this plan was
finalized: proceed with all 7 pages.
