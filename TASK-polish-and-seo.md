# TASK — Polish, SEO & Analytics Pass
**Project:** Smart Learning Solutions
**Scope:** Non-breaking improvements — analytics, SEO meta, favicon, SVG icons, nav fix, CSS fix, 404 page
**Prerequisite:** Audit items 1–2 (file path architecture + CLAUDE.md correction) should be resolved before or alongside this task.

---

## Pre-Session Checklist
Before editing anything:
- [ ] Read `CLAUDE.md`
- [ ] Read `docs/strategy/sls-project-context.md`
- [ ] Confirm working directory is the repo root
- [ ] Review this plan in full before touching any file

---

## Owner Decision Required Before Starting — Analytics Platform

**Pause here and ask the owner:**

> "Which analytics platform do you want?
> - **Google Analytics 4 (GA4)** — free, full-featured, widely used. Requires a GA4 Measurement ID (format: `G-XXXXXXXXXX`). Go to analytics.google.com to create a property.
> - **Plausible** — paid (from $9/mo), privacy-focused, no cookie banner needed, clean dashboard. Requires a Plausible script snippet from plausible.io.
>
> Once you choose, provide the ID or snippet and I'll add it to `components.js` so it loads on every page automatically."

Do not proceed with analytics implementation until the owner provides the platform choice and credential.

---

## Scope of Work

### 1. Analytics — inject via `components.js`
Once the owner provides the analytics credential:

**If GA4:** Add the following to the `<head>` section injected by `buildHeader()` in `components.js`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'MEASUREMENT_ID');
</script>
```
Replace `MEASUREMENT_ID` with the owner-supplied value (format: `G-XXXXXXXXXX`).

**If Plausible:** Add the following to the `<head>` section in `buildHeader()`:
```html
<script defer data-domain="smartlearningsolutions.org" src="https://plausible.io/js/script.js"></script>
```

**Important:** Inject analytics via `components.js` only — never add it to individual HTML files. One edit, sitewide coverage.

---

### 2. Favicon — add to `components.js` head injection

The logo SVG already exists in `components.js`. Use an inline SVG data URI favicon derived from it. Add the following inside `buildHeader()` in the `<head>` block:

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' rx='7' fill='%23E85D1A'/%3E%3Cpath d='M8 18l6-8 6 8' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='14' cy='10' r='2' fill='white'/%3E%3C/svg%3E">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">
```

Also generate a `favicon.png` (32×32 or 64×64) from the same SVG shape and place it at the repo root. If image generation isn't available in this session, use the SVG data URI only — it covers all modern browsers.

---

### 3. Open Graph + Canonical Tags — per page

Add to the `<head>` of each HTML file. Use the existing `<meta name="description">` content as `og:description`. Use `og:image` placeholder until photography is confirmed (OD-002).

**Canonical domain:** `https://www.smartlearningsolutions.org`

Apply to each page as follows:

#### `index.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/">
<meta property="og:title" content="Smart Learning Solutions — Hands-On STEM Workshops">
<meta property="og:description" content="Smart Learning Solutions delivers hands-on STEM workshops for K–12 students — bringing robotics, coding, and physical science to life in schools and communities.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `workshops.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/workshops.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/workshops.html">
<meta property="og:title" content="Workshops — Smart Learning Solutions">
<meta property="og:description" content="Explore Smart Learning Solutions STEM workshop formats — in-person, expert-led, tailored for schools, parents, and community groups.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `coding-with-robots.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/programs/coding-with-robots.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/programs/coding-with-robots.html">
<meta property="og:title" content="Coding with Robots — Smart Learning Solutions">
<meta property="og:description" content="Coding with Robots — a hands-on robotics and coding workshop for K–12 students, powered by the Edison platform.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `pstem.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/programs/pstem.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/programs/pstem.html">
<meta property="og:title" content="PSTEM — Smart Learning Solutions">
<meta property="og:description" content="PSTEM — Physical Science, Technology, Engineering and Mathematics workshops powered by the Whybricks inquiry-based learning platform.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `resources.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/resources.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/resources.html">
<meta property="og:title" content="Resources — Smart Learning Solutions">
<meta property="og:description" content="Sample activities, educator guides, and student investigation previews from Smart Learning Solutions STEM workshop programs.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `about.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/about.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/about.html">
<meta property="og:title" content="About — Smart Learning Solutions">
<meta property="og:description" content="About Smart Learning Solutions — a STEM education company staffed by engineers, coders, and educators, and a licensed partner with Microbric and Whybricks.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `book.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/book.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/book.html">
<meta property="og:title" content="Request a Workshop — Smart Learning Solutions">
<meta property="og:description" content="Request a STEM workshop from Smart Learning Solutions — tell us about your group and we'll get back to you within one business day.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### `contact.html`
```html
<link rel="canonical" href="https://www.smartlearningsolutions.org/contact.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.smartlearningsolutions.org/contact.html">
<meta property="og:title" content="Contact — Smart Learning Solutions">
<meta property="og:description" content="Contact Smart Learning Solutions — get in touch by phone, email, or send us a message.">
<meta property="og:image" content="https://www.smartlearningsolutions.org/src/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Note on og:image:** Use `/src/images/og-default.jpg` as the placeholder path. This image doesn't exist yet — it will be added when hero photography is resolved (OD-002). The tag is correct and harmless until then.

---

### 4. sitemap.xml — create at repo root

Create `sitemap.xml` at the repo root with the following content. Use the canonical domain. Adjust `lastmod` to today's date.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.smartlearningsolutions.org/</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/workshops.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/programs/coding-with-robots.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/programs/pstem.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/resources.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/about.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/book.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.smartlearningsolutions.org/contact.html</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

### 5. robots.txt — create at repo root

Create `robots.txt` at the repo root:

```
User-agent: *
Allow: /

Sitemap: https://www.smartlearningsolutions.org/sitemap.xml
```

---

### 6. Replace Emoji Icons with SVGs

Replace every emoji icon across all HTML files with inline SVG. Match the existing SVG style already used in the trust strip: `stroke="currentColor"`, `stroke-width="2"`, `fill="none"`, `aria-hidden="true"`, `width="20" height="20"`.

Wrap each SVG in the same container `<div>` as the replaced emoji, preserving existing class names.

#### `index.html` — Audience Cards (section 4)

| Emoji | Element | Replace with SVG |
|---|---|---|
| 🎒 | `.audience-icon` (Parents) | Backpack / person-with-heart: use a user + heart icon: `<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>` |
| 🏫 | `.audience-icon` (Schools) | Building: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>` |
| 🌍 | `.audience-icon` (Community) | Globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>` |

#### `index.html` — Outcome Tiles (section 6)

| Emoji | Element | Replace with SVG |
|---|---|---|
| 🔧 | `.outcome-tile-icon` (Build and Test) | Tool/wrench: `<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>` |
| 🔍 | `.outcome-tile-icon` (Guided Exploration) | Search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>` |
| 💻 | `.outcome-tile-icon` (Coding Skills) | Monitor: `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>` |
| 🧪 | `.outcome-tile-icon` (STEM Thinking) | Flask/beaker: `<path d="M9 3h6v6l3 9H6l3-9V3z"/><line x1="6" y1="6" x2="18" y2="6"/>` |

#### `index.html` — Differentiators (section 8)

| Emoji | Element | Replace with SVG |
|---|---|---|
| 🎓 | `.diff-icon` (Expert-Led) | Graduation cap: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>` |
| 🤝 | `.diff-icon` (Hands-On) | Handshake: `<path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l8.42 8.42 8.42-8.42a5.4 5.4 0 000-7.65z"/>` — or use a hand/hands icon: `<path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>` |
| 🎯 | `.diff-icon` (Tailored) | Target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>` |
| 🏆 | `.diff-icon` (Trusted) | Award/shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` |

#### `about.html` — Credential Icons

| Emoji | Element | Replace with SVG |
|---|---|---|
| 🤖 | `.credential-icon` (Edison / Microbric) | CPU/chip: `<rect x="9" y="9" width="6" height="6"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2M3 3h18v18H3z"/>` |
| 🔬 | `.credential-icon` (Whybricks / PSTEM) | Microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 100-14h-1"/><path d="M9 14l2-7"/><path d="M12 7l1-4"/><path d="M8 3l5 1"/>` |
| 🎓 | `.credential-icon` (Educators) | Same graduation cap SVG as above |
| 🌐 | `.credential-icon` (Global) | Same globe SVG as used for Community above |

#### `resources.html` — Program Feature Icons

| Emoji | Element | Replace with SVG |
|---|---|---|
| 📋 | `.outcome-tile-icon` (Barcode level) | Clipboard/list: `<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>` |
| 🧩 | `.outcome-tile-icon` (EdBlocks) | Grid/blocks: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>` |
| ⌨️ | `.outcome-tile-icon` (EdScratch) | Code brackets: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>` |
| 🐍 | `.outcome-tile-icon` (Python/EdPy) | Terminal: `<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>` |

**SVG wrapper pattern to use for all replacements:**
```html
<div class="[original-class]" aria-hidden="true">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- path data here -->
  </svg>
</div>
```

---

### 7. Mobile Nav Active State — fix in `components.js`

**Current (broken):**
```js
const mobileItems = NAV_LINKS.map(({ label, href }) =>
  `<a href="${href}">${label}</a>`
).join('');
```

**Fix:** Pass `activePage` into the mobile items map so it mirrors desktop behaviour:
```js
const mobileItems = NAV_LINKS.map(({ label, href, key }) =>
  `<a href="${href}" class="${key === activePage ? 'active' : ''}">${label}</a>`
).join('');
```

The `buildHeader` function already receives `activePage` as a parameter — this is a one-line fix.

---

### 8. Fix `--color-white` CSS Variable — `resources.html`

**Current (broken):**
```html
<section class="section" style="background: var(--color-white);">
```

`--color-white` does not exist in the design token system. The closest appropriate token for a light background panel is `--bg-1` or `--bg-2`.

**Fix:** Replace with the correct token:
```html
<section class="section" style="background: var(--bg-1);">
```

If the intent was a visually distinct section, `--bg-2` is the slightly lighter surface option. Check in browser and choose whichever reads correctly against surrounding sections.

---

### 9. 404.html — create at repo root

Create `404.html` at the repo root. It should:
- Use the same header/footer injection as every other page (`initPage`)
- Match the visual language of the site (dark background, accent colour, premium feel)
- Not be apologetic or alarmist — just clear and helpful
- Offer two recovery paths: go home, or request a workshop

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page not found — Smart Learning Solutions">
  <title>Page Not Found — Smart Learning Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/css/main.css">
</head>
<body>
  <div id="page-header"></div>
  <main>
    <section class="section" style="min-height: 60vh; display: flex; align-items: center;">
      <div class="container" style="text-align: center; max-width: 560px; margin: 0 auto;">
        <p class="eyebrow">404</p>
        <h1 style="margin-bottom: var(--space-6);">This Page Has Gone Off-Script</h1>
        <p style="color: var(--text-muted); font-size: var(--text-lg); margin-bottom: var(--space-10);">
          We can't find what you're looking for — but a STEM workshop is only a click away.
        </p>
        <div class="btn-group" style="justify-content: center;">
          <a href="/index.html" class="btn btn--outline btn--lg">Back to Home</a>
          <a href="/book.html" class="btn btn--primary btn--lg">Request a Workshop</a>
        </div>
      </div>
    </section>
  </main>
  <div id="page-footer"></div>
  <script type="module">
    import { initPage } from '/src/js/components.js';
    initPage({ activePage: '' });
  </script>
</body>
</html>
```

---

## Slice Plan

Execute in this order. One slice = one commit or approval checkpoint.

| Slice | Files Changed | Notes |
|---|---|---|
| 1 | `components.js` | Mobile nav active fix only — test before anything else |
| 2 | `resources.html` | `--color-white` fix — quick, isolated |
| 3 | `components.js` | Add favicon tags to `buildHeader()` |
| 4 | All `.html` files | OG tags + canonical tags — one page at a time |
| 5 | `sitemap.xml` (new) | Create at root |
| 6 | `robots.txt` (new) | Create at root |
| 7 | `index.html` | Replace all emoji icons with SVGs |
| 8 | `about.html` | Replace all emoji icons with SVGs |
| 9 | `resources.html` | Replace all emoji icons with SVGs |
| 10 | `404.html` (new) | Create at root |
| 11 | `components.js` | Add analytics snippet — only after owner provides credential |

---

## Validation Checklist (after all slices)

- [ ] All pages load without console errors
- [ ] Favicon appears in browser tab on every page
- [ ] OG tags visible in page source on every page
- [ ] Canonical URL correct on each page
- [ ] `sitemap.xml` accessible at root
- [ ] `robots.txt` accessible at root
- [ ] No emoji icons visible anywhere on the site
- [ ] SVG icons render at correct size and colour on all affected pages
- [ ] Mobile nav highlights the correct item on each page
- [ ] `resources.html` section background renders correctly
- [ ] `404.html` loads with header, footer, and both CTA buttons
- [ ] Analytics fires on page load (verify in platform dashboard or browser network tab)
- [ ] No regressions in `components.js` header/footer injection

---

## Files Changed Summary

| File | Action |
|---|---|
| `components.js` | Mobile nav fix, favicon injection, analytics injection |
| `index.html` | OG tags, canonical, emoji → SVG |
| `workshops.html` | OG tags, canonical |
| `coding-with-robots.html` | OG tags, canonical |
| `pstem.html` | OG tags, canonical |
| `resources.html` | OG tags, canonical, `--color-white` fix, emoji → SVG |
| `about.html` | OG tags, canonical, emoji → SVG |
| `book.html` | OG tags, canonical |
| `contact.html` | OG tags, canonical |
| `sitemap.xml` | New file |
| `robots.txt` | New file |
| `404.html` | New file |

---

## Open Questions After This Task

- OD-001 (Formspree) still needs to be resolved for forms to work
- OD-002 (hero photography) needed to populate `og:image` with a real asset
- OD-003 (deployment target) needed to confirm URL structure and whether `.html` extensions will be visible or cleaned up
- Update `CHANGELOG.md` when this task is complete
