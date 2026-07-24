# Plan: Hero Video Background — Two Design-Exploration Branches

**Date:** 2026-07-24
**Status:** In Progress

---

## Objective

Explore using an Edison robot promo video as full-bleed hero background media, on two independent branches (Coding with Robots program page; homepage), while keeping the existing design system intact.

## Current State

No `<video>` element or video CSS pattern exists anywhere in the repo. The homepage (`index.html`) hero uses `.hero.hero--photo` with a `.hero-photo-bg` full-bleed responsive photo and a two-layer scrim (dark gradient + brand-orange tint). `programs/coding-with-robots.html`'s hero uses a different, unrelated pattern (`.page-hero`/`.page-hero-grid`, two-column, no CTAs).

## Assumptions

- Owner-supplied video (Wistia-hosted "Edison V3 robot promo," 2:10, from `meetedison.com`) is used as provided (full length, not trimmed) for this exploration pass.
- `docs/ACCESSIBILITY.md`'s "no auto-playing video" policy needed a precise carve-out (muted/looped/decorative/reduced-motion-aware) rather than being silently violated — owner confirmed autoplay+muted+looped explicitly.
- No `ffmpeg`/`cwebp`/ImageMagick/PIL available locally — video kept as downloaded (audio track present but irrelevant since always muted); poster saved as JPEG (not WebP) at 1280×720, within `docs/PERFORMANCE.md`'s documented WebP-preferred/JPEG-fallback rule.

## Constraints

- Two independent branches off `main`; neither merged or pushed without separate explicit approval.
- No CMS/build-tool/framework additions; no new third-party scripts/embeds (video is self-hosted, not a Wistia embed).
- Reuse the existing `.hero-photo-bg` scrim/layering technique rather than inventing a new visual pattern.

## Files to Review

- `index.html`, `programs/coding-with-robots.html`
- `src/css/main.css` (`.hero-photo-bg`, `.hero--photo`, responsive breakpoints, reduced-motion block)
- `src/js/animations.js`
- `docs/ACCESSIBILITY.md`, `docs/PERFORMANCE.md`

## Files to Change

**Shared foundation (both branches):** `src/videos/edison-robot-promo.mp4` (new), `src/images/edison-robot-promo-poster.jpg` (new), `src/css/main.css`, `src/js/animations.js`, `docs/ACCESSIBILITY.md`, `docs/PERFORMANCE.md`
**Branch A only:** `programs/coding-with-robots.html`
**Branch B only:** `index.html`

## Slice 1 — Shared foundation
**Goal:** Add the reusable video-hero component (asset, CSS, JS gating, doc policy) with no page wired up yet.

**Planned edits:**
- `src/videos/edison-robot-promo.mp4`, `src/images/edison-robot-promo-poster.jpg` — new assets
- `src/css/main.css` — new `.hero-video-bg` block mirroring `.hero-photo-bg`; extend `.hero--photo` shared selectors to also match `.hero--video` (base rules + both responsive breakpoints)
- `src/js/animations.js` — new `initHeroVideo()`, independent of GSAP, sets `video.src` from `data-src` and calls `.play()` only when `!reduceMotion && innerWidth > 768`
- `docs/ACCESSIBILITY.md` §6 — carve-out for muted/looped/reduced-motion-aware background video
- `docs/PERFORMANCE.md` — new §6 "Video Rules"

**Validation:**
- CSS/JS syntax sanity (no page wired up yet, so full visual check happens in Slices 2a/2b)

## Slice 2a — Coding with Robots hero (branch `feat/hero-video-coding-with-robots`)
**Goal:** Restructure this page's hero to the full-bleed video pattern.

**Planned edits:**
- `programs/coding-with-robots.html` — replace `.page-hero`/`.page-hero-grid` with `.hero.hero--video`, reusing existing eyebrow/h1/copy, adding the homepage's CTA pair (Request a Workshop / Explore Workshops), dropping the now-orphaned product/proof photos from the hero (video supersedes the product shot; another students photo already exists lower on the page)

**Validation:**
- Open via local server, check video autoplay/loop/mute/poster, scrim legibility, reduced-motion + mobile fallback, nav links, GSAP hero entrance animation

## Slice 2b — Homepage hero (branch `feat/hero-video-homepage`)
**Goal:** Swap the homepage's existing photo hero background for the same video, forked from the Slice 1 commit (not from Slice 2a).

**Planned edits:**
- `index.html` — `.hero-photo-bg` → `.hero-video-bg`, modifier class `hero--photo` → `hero--video`; copy/CTAs unchanged

**Validation:** Same checklist as Slice 2a.

## Risks

- 2:10 full-length loop may read oddly as a continuous background loop (scene cuts / possible on-screen titles) — shipping as-is for the owner to judge live; trimming is an easy fast-follow.
- ~22MB video is a heavy above-the-fold payload versus the site's typical few-hundred-KB WebP images — mitigated via reduced-motion + `>768px` gating (no fetch at all otherwise), not fully eliminated for desktop visitors on slow connections.
- Video usage rights (Edison/Wistia manufacturer content) not independently verified — owner supplied the link and directed its use.
- No Git LFS configured — both branches carry the ~21MB file in normal git history at full size; fine for exploration, worth reconsidering if either branch is adopted for real.
- Poster saved as JPEG, not WebP, due to no local WebP encoder (`cwebp`/ImageMagick/PIL/sips-webp all unavailable) — within the documented JPEG-fallback rule, not a violation, but noting the tooling gap.

## Rollback

Each branch is independent and untouched by `main`. To abandon: `git checkout main && git branch -D feat/hero-video-coding-with-robots feat/hero-video-homepage`. No production/staging impact either way — nothing here is deployed.

## Open Questions

- Whether the full 2:10 loop feels right once seen live, vs. trimming to a short B-roll loop later.
- Whether to relocate (rather than drop) the Edison product photo / proof photo from the Coding with Robots hero.
