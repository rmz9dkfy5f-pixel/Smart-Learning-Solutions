# Architecture

## Tech Stack
| Layer | Choice | Reason |
|---|---|---|
| Frontend | Vanilla HTML / CSS / JS | No build tool required; full design control; easy to maintain |
| Templating | ES Modules (native browser) | Shared header/footer without a build step or CMS |
| Forms | Formspree | Free tier, zero backend, email delivery, AJAX-friendly |
| Fonts | Google Fonts (Inter) | Single CDN link; no local font files to manage |
| Hosting | Netlify or GitHub Pages | Zero cost; custom domain support; HTTPS automatic |
| CMS | None | Owner preference; content managed directly in source files |

## How Pages Share Header and Footer
All pages import `src/js/components.js` as an ES module. That file exports `initPage()`, which builds the header and footer as template strings and injects them into `#page-header` and `#page-footer` divs on each page. Changing navigation means editing `components.js` only — not every HTML file.

```
Page HTML
  └── <div id="page-header"></div>
  └── <main>...</main>
  └── <div id="page-footer"></div>
  └── <script type="module">
        import { initPage } from '/src/js/components.js';
        initPage({ activePage: 'home' });
      </script>
```

**Important:** ES modules require a local server to work. Opening an HTML file directly via `file://` will silently fail. See README.md for local dev options.

## File Structure
```
/
├── index.html
├── workshops.html
├── resources.html
├── about.html
├── book.html
├── contact.html
├── programs/
│   ├── coding-with-robots.html
│   └── pstem.html
└── src/
    ├── css/
    │   └── main.css          ← single stylesheet; CSS custom properties for all tokens
    ├── js/
    │   └── components.js     ← header, footer, sticky scroll, mobile nav
    └── images/               ← photography and assets (not yet populated)
```

## Routing
This is a flat static site — no client-side routing. Each page is its own HTML file. URL structure:

| URL | File |
|---|---|
| `/` | `index.html` |
| `/workshops` | `workshops.html` |
| `/programs/coding-with-robots` | `programs/coding-with-robots.html` |
| `/programs/pstem` | `programs/pstem.html` |
| `/resources` | `resources.html` |
| `/about` | `about.html` |
| `/book` | `book.html` |
| `/contact` | `contact.html` |

On Netlify, clean URLs (without `.html`) work out of the box. On GitHub Pages they require a `_config.yml` or redirect rules.

## Form Handling
Both `book.html` and `contact.html` submit to Web3Forms (`https://api.web3forms.com/submit`) via `fetch()` with a JSON body, replacing the earlier Formspree integration (migrated 2026-07-16). The shared access key lives in `src/js/web3forms-config.js` — it is a public form identifier, not a secret, and both pages import it so it only needs updating in one place to rotate. Each form includes a `botcheck` honeypot field for baseline spam protection. Web3Forms delivers submissions to `info@SmartLearningSolutions.org` and returns a JSON response consumed by the AJAX handler; success is only shown once both the HTTP response and the response body confirm delivery.

## Design System
All design tokens (colours, type scale, spacing, radii, shadows) are defined as CSS custom properties at `:root` in `src/css/main.css`. Components reference tokens only — no hardcoded values in component styles.

## Deployment Model
| Environment | Method |
|---|---|
| Local dev | `npx serve .` or VS Code Live Server |
| Production | Deploy root folder to Netlify or GitHub Pages |

No build step is required. The repo root is the deploy root.
