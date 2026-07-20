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
| Staging | `scripts/deploy-staging.sh` — explicit path allowlist over rsync/SSH; see §11 |
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
- [x] Security headers are present on staging responses (applied 2026-07-19, see §7); production pending domain/HTTPS finalization (OD-003)
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

**Staging (VPS):** `scripts/deploy-staging.sh` does not currently create its own rollback point
automatically — before a manual redeploy, take a timestamped backup of the live directory first:

```bash
ssh -i ~/.ssh/jones_vps root@74.208.9.49 \
  'cp -a /var/www/smart-learning-solutions /var/www/smart-learning-solutions.bak-$(date +%Y%m%d-%H%M%S)'
```

To roll back, rename the broken live directory aside (don't delete — keep it for a post-mortem)
and restore the backup in its place:

```bash
ssh -i ~/.ssh/jones_vps root@74.208.9.49 '
  mv /var/www/smart-learning-solutions /var/www/smart-learning-solutions.broken-$(date +%Y%m%d-%H%M%S)
  mv /var/www/smart-learning-solutions.bak-<TIMESTAMP> /var/www/smart-learning-solutions
'
```

There is no CI auto-deploy on push to `main` — a `git revert`/`git push` alone does not change
staging content; you must re-run `scripts/deploy-staging.sh` after fixing the issue.

**If/when production ever deploys via git-triggered CI** (Netlify/GitHub Pages, pending OD-003),
the git-based rollback below applies there instead:

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
| Staging silently drifts behind `main` (no deploy tooling) | Live forms/content can run stale or broken code for weeks unnoticed — happened 2026-06-23 to 2026-07-19 | `scripts/deploy-staging.sh` (§11); periodically diff live content against `main` |
| Careless future deploy ships internal docs/governance files | Repo internals (`AUDIT.md`, `CLAUDE.md`, `.claude/`, `.agents/`, `plans/`, etc.) become publicly fetchable | `scripts/deploy-staging.sh` uses an explicit path allowlist, not a denylist — internal paths are never named as a source, so they cannot be shipped regardless of what new internal files land in the repo later |

## 11. Staging Deploy — VPS (rsync over SSH)

Host: `74.208.9.49` (IONOS, shared multi-tenant VPS — several other unrelated client sites live
under sibling `/var/www/` directories; every command must stay scoped to
`/var/www/smart-learning-solutions/`). Web root: `/var/www/smart-learning-solutions/`.

Run `scripts/deploy-staging.sh --dry-run` first, review the output, then
`scripts/deploy-staging.sh` for real. The script deploys an explicit allowlist — the 7 root
pages, `robots.txt`, `sitemap.xml`, `programs/`, `src/`, `legal/` — nothing else. `pics/` and
every repo-internal path (`.git`, `.claude`, `.agents`, `docs/`, `plans/`, `prompts/`, all root
governance `.md` files, etc.) are structurally excluded because they are never named as a source
anywhere in the script, not because of an exclude pattern that could be forgotten later. See
`DECISION_LOG.md` for the allowlist-over-denylist rationale.

Always back up the live directory before a real run (§9) and verify afterward: forms reference
`api.web3forms.com` (not the dead Formspree endpoint), `og:image` resolves, all pages return 200,
the security headers from §7 are present, and internal paths (e.g. `/AUDIT.md`, `/.git/config`)
still return 404.

There is no automatic trigger — `scripts/deploy-staging.sh` must be run manually after merging to
`main` whenever staging should reflect current code. There is currently no CI or scheduled check
that staging is in sync with `main`; this is a known gap (see `LESSONS_LEARNED.md` L-016).
