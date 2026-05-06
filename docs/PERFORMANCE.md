# Performance

**Status:** Active
**What belongs here:** Performance rules, asset loading strategy, third-party script rules, and critical rendering expectations.
**What does not belong here:** Design direction, accessibility rules, or implementation code.

---

## 1. Performance Goals

This is a static marketing site. The primary performance goal is fast first-paint on the index page, since conversion depends on a positive first impression. No formal performance budget is set — this document defines rules to prevent regressions.

## 2. Asset Loading

- **CSS:** Single stylesheet (`src/css/main.css`) loaded in `<head>` — no render-blocking multiple stylesheets
- **JavaScript:** ES modules loaded at end of `<body>` via `type="module"` — non-blocking
- **Images:** Not yet populated. When added: use `webp` format; set explicit `width` and `height` attributes to prevent layout shift; use `loading="lazy"` on below-fold images
- **Fonts:** Google Fonts CDN with `<link rel="preconnect">` tags — no local font files

## 3. Third-Party Scripts

| Script | Source | Rule |
|---|---|---|
| GSAP | CDN (`gsap@3.12.5`, `ScrollTrigger@3.12.5`) | Loaded in `<body>` — do not move to `<head>` |
| Google Fonts | CDN | Preconnect tags in `<head>` |
| Formspree | API (fetch) | No script tag — AJAX only |

**Rule:** Do not add new third-party scripts without justification in a plan. Each new script is a performance and privacy risk.

## 4. Critical Rendering Path

- Early dark paint guard on all HTML pages (inline style in `<head>`) prevents default white first-paint flash before the stylesheet loads
- No render-blocking `<script>` tags in `<head>`
- Preconnect to Google Fonts CDN

## 5. Image Rules (when images are added)

- Format: WebP preferred; fallback JPEG for broad compatibility
- All images need explicit `width` and `height` to prevent Cumulative Layout Shift (CLS)
- Above-fold hero image: do not lazy-load; use `fetchpriority="high"`
- Below-fold images: use `loading="lazy"`
- No unoptimised large images in `src/images/` — compress before committing

## 6. No Build Step

There is no bundler, minifier, or build process. Files are served as-is. CSS and JS are human-readable source. This is intentional — do not introduce a build step without explicit owner decision and a plan.

## 7. Local Dev vs Production

- Local: `npx serve .` or VS Code Live Server (required — ES modules fail on `file://`)
- Production: Netlify or GitHub Pages — files are served statically with HTTPS, compression, and CDN automatically

## 8. Known Risks

| Risk | Impact | Mitigation |
|---|---|---|
| GSAP CDN dependency | Site animation breaks if CDN is unavailable | Low risk; GSAP CDN is highly reliable |
| Google Fonts CDN dependency | Fonts fall back to system fonts if CDN fails | Acceptable — system font fallback set |
| No image optimisation pipeline | Committed images may be unoptimised | Manual optimisation before commit |
| No cache-busting strategy | Stale CSS/JS served to returning visitors | Cache-busted via query string on deploy if needed |
