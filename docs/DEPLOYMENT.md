# Deployment

**Status:** Active
**What belongs here:** Deployment process, hosting options, environment requirements, and rollback procedure.
**What does not belong here:** Design direction, content rules, or implementation code.

---

## 1. Deployment Model

This is a static site — no build step required. The repo root is the deploy root.

| Environment | Method |
|---|---|
| Local dev | `npx serve .` or VS Code Live Server |
| Staging | Deploy root folder to the staging host |
| Production | Deploy root folder to Netlify, GitHub Pages, or Nginx static hosting |

## 2. Local Development

ES modules (`type="module"`) require a local HTTP server. Opening HTML files directly via `file://` will silently fail on `src/js/components.js` imports.

**Option A — npx serve:**
```bash
npx serve .
```
Opens on `http://localhost:3000` (or next available port).

**Option B — VS Code Live Server:**
Install the Live Server extension, right-click `index.html` → "Open with Live Server".

## 3. Pre-Deploy Checklist

Before deploying to production:

- [x] Web3Forms access key configured in `src/js/web3forms-config.js` (migrated from Formspree 2026-07-16)
- [ ] All nav links resolve (no 404s)
- [ ] `/programs/` serves `programs/index.html`
- [ ] `sitemap.xml` URLs match the production domain
- [ ] `<link rel="canonical">` URLs match the production domain
- [ ] Open Graph image path is correct for the production domain
- [ ] Production is indexable, and staging is blocked from indexing at the server level
- [ ] Security headers are present on staging/production responses
- [ ] No `console.log` or debug statements left in `animations.js` or `components.js`
- [ ] Test the booking form end-to-end on staging/production

## 4. Hosting Options

**Netlify (preferred):**
- Connect GitHub repo → auto-deploy on push to `main`
- Clean URLs (without `.html`) work out of the box
- Custom domain + HTTPS automatic
- No configuration file required for static HTML

**GitHub Pages:**
- Enable Pages on the `main` branch, root folder
- Clean URLs require a `_config.yml` or redirect rules
- Custom domain requires CNAME file and DNS configuration

**Nginx static hosting:**
- Serve the repo root as the site root.
- Ensure directory index files are enabled so `/programs/` serves `programs/index.html`.
- Apply security and staging-indexing headers in the Nginx site config, not in individual HTML files.

## 5. Environment Variables

This site has no server-side environment variables. The Web3Forms access key is embedded in `src/js/web3forms-config.js` and delivered client-side — it is a public form identifier, not a secret, per Web3Forms' own documentation.

`.env.example` is included for completeness — it has no active entries for this project.

## 6. Domain Configuration

- Production domain: `smartlearningsolutions.org`
- Update `sitemap.xml` and canonical URLs if the domain changes
- Update Open Graph `og:url` if the domain changes

## 7. Nginx Security Headers

Apply security headers in the Nginx site config for both staging and production. Start CSP in report-only mode because the current static pages still use inline styles and inline module scripts.

Example baseline:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://plausible.io 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.web3forms.com https://plausible.io; base-uri 'self'; form-action 'self' https://api.web3forms.com; frame-ancestors 'self'" always;
```

Only add HSTS after HTTPS is final and working for the canonical production domain:

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 8. Staging Indexing

Staging domains should not appear in search results. Keep `robots.txt` production-oriented in the repo, and add this header only on staging:

```nginx
add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
```

Production must not send the staging `X-Robots-Tag` header.

## 9. Rollback

There is no build or database to roll back. To revert a broken deploy:

```bash
git revert HEAD
git push origin main
```

Or reset to a known-good tag and force-push (confirm with owner before force-pushing main):

```bash
git checkout <tag>
git push origin main --force
```

## 10. Known Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Empty/invalid Web3Forms access key deployed | Contact and booking forms silently fail (fails safe with an inline status message, not a fake success) | Pre-deploy checklist item; key lives in `src/js/web3forms-config.js` |
| Canonical URLs pointing to wrong domain | SEO impact | Update before domain switch |
| ES module path differences between local and production | Components fail to load | Always test on a local server, not `file://` |
| Staging indexed by search engines | Duplicate unfinished pages may appear in search | Send staging-only `X-Robots-Tag: noindex, nofollow, noarchive` |
| Missing security headers | Reduced browser-side protection | Apply Nginx headers before collecting user data |
