# Plan: OG Image SVG → PNG Conversion (M-1)

**Date:** 2026-07-18
**Status:** Complete

---

## Objective
Convert `src/images/og-image.svg` to a 1200×630 PNG/JPEG and update all `og:image` references,
resolving `AUDIT.md` finding M-1 (SVG is not reliably supported by social-platform OG-image
parsers, so shared links showed no preview image).

## Current State (at plan time)
`og-image.svg` was already authored at the exact 1200×630 canvas. 9 pages referenced it via
identical `og:image` tags (`404.html` has none). No PNG existed anywhere in the repo. No
SVG-rasterization tooling was installed (no ImageMagick/`rsvg-convert`/Inkscape/`cairosvg`), but
two fully-functional headless-Chromium binaries were already present on disk from prior
Playwright use.

## Assumptions
- PNG preferred over JPEG (lossless, no compression artifacts on the text/gradient graphic) — no
  repo doc stated a preference either way.
- `og-image.svg` kept in the repo as the editable vector source, not deleted.

## Constraints
- No new repo dependency for the conversion tool itself — only the output PNG gets committed.
- Local commits only until explicit push approval each time.

## Files to Review
- `src/images/og-image.svg`, all 9 pages' `og:image` tags, `AUDIT.md` M-1 finding, `BACKLOG.md`,
  `PHASE_GATES.md`.

## Files to Change
- `src/images/og-image.png` (new), 9 HTML files, `BACKLOG.md`, `STATUS.md`, `FILE_MAP.md`,
  `PHASE_GATES.md`, and (release-ceremony slice) `CHANGELOG.md`, `RELEASE_NOTES.md`,
  `COMMIT_NOTES.md`, `SLICE_REVIEWS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`.

## Slice 1 — Reconcile pending STATUS.md line
**Goal:** Resolve a session-start audit finding (one uncommitted closeout annotation).
**Result:** Line was already correct; committed as-is (`060dacb`).

## Slice 2 — Generate PNG and repoint references
**Goal:** Ship a faithful 1200×630 raster replacement, wired into all 9 pages.
**Method:** Rendered via `chrome-headless-shell --headless --screenshot --window-size=1200,630`
(a Playwright-cache binary already on disk — no new dependency).
**Validation:** `sips` confirmed exact 1200×630 output; visual inspection matched the source SVG;
grep confirmed zero remaining `.svg` references and exactly 9 `.png` references; a local `serve`
instance confirmed 5 representative pages returned 200 with the correct tag.
**Result:** Committed `bf6fcc0`.

## Slice 3 — Update tracking docs
**Goal:** Reflect resolution in `BACKLOG.md`/`STATUS.md`/`FILE_MAP.md`/`PHASE_GATES.md`.
**Result:** Committed `b0bec01`.

## Slice 4 — Release ceremony (added mid-session, owner-requested)
**Goal:** Version bump, full release-record update, tag, snapshot, push.
**Result:** Committed `d7f48fd` (release records) + `8e84e68` (hash backfill); tagged
`v2.24.0__og-image-png-conversion__commit-d7f48fd`; snapshotted to
`RepoBackups/Smart Learning Solutions/v2.24.0__og-image-png-conversion__commit-d7f48fd`; pushed
to `origin/main`.

## Risks
- Headless-Chromium fidelity was unverified until actually run — mitigated by a visual-inspection
  checkpoint; passed on the first attempt, no fallback binary needed.
- `PHASE_GATES.md` carried a stale duplicate of the same criterion under both Gate 1 ("Open Graph
  metadata verified") and Gate 3 ("Post-Launch Expansion", Deferred) — reconciled during the
  release-ceremony slice: Gate 1's is authoritative and now checked; the Gate 3 duplicate is
  removed. See `LESSONS_LEARNED.md` L-015.

## Rollback
Every slice is a standalone commit; any can be reverted independently. The PNG is additive — the
SVG source was never modified or removed.

## Open Questions
- `RELEASE_NOTES.md` has a pre-existing 3-version gap (v2.21.0–v2.23.0 were never added,
  discovered during this session) — flagged to the owner, not backfilled here.

---

This plan is a retrospective record. Live planning happened via Claude Code's own plan-mode
artifact at `~/.claude/plans/reconcile-finding-1-commit-snappy-rocket.md` (outside repo tracking);
this file exists so the work is findable in `plans/` per this repo's own `CLAUDE.md`/`AGENTS.md`
file-placement rule ("Task execution plans go in `plans/` with dated filenames").
