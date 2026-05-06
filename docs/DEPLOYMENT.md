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
| Production | Deploy root folder to Netlify or GitHub Pages |

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

- [ ] Formspree endpoint in `book.html` and `contact.html` is replaced (search for `REPLACE_ME`)
- [ ] All nav links resolve (no 404s)
- [ ] `sitemap.xml` URLs match the production domain
- [ ] `<link rel="canonical">` URLs match the production domain
- [ ] Open Graph image path is correct for the production domain
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

## 5. Environment Variables

This site has no server-side environment variables. The only sensitive value is the Formspree endpoint URL, which is embedded in HTML source. Keep it out of public-facing documentation.

`.env.example` is included for completeness — it has no active entries for this project.

## 6. Domain Configuration

- Production domain: `smartlearningsolutions.org`
- Update `sitemap.xml` and canonical URLs if the domain changes
- Update Open Graph `og:url` if the domain changes

## 7. Rollback

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

## 8. Known Risks

| Risk | Impact | Mitigation |
|---|---|---|
| `REPLACE_ME` Formspree endpoint deployed | Contact and booking forms silently fail | Pre-deploy checklist item |
| Canonical URLs pointing to wrong domain | SEO impact | Update before domain switch |
| ES module path differences between local and production | Components fail to load | Always test on a local server, not `file://` |
