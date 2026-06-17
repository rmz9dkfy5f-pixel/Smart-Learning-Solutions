# nginx 404 Debug Notes

## Problem
Site loads on laptop, but Mac mini pull/open shows `nginx/1.24.0 (Ubuntu) 404 Not Found`.

## Current Repo State (captured from laptop)
- Branch: `debug/nginx-404-mac-mini-pull` (branched from `main` at `926004d`)
- Remote: `git@github.com:rmz9dkfy5f-pixel/Smart-Learning-Solutions.git`
- Status: Clean — no uncommitted files

## Project Type
**Zero-build static HTML site.** No `package.json`, no `npm run build`, no `dist/` folder.
The repo root IS the web root. Every `.html` file can be served directly by nginx.
There is no build step that could produce a missing `dist/`.

## Critical Observation
`nginx/1.24.0 (Ubuntu)` means the request reached a Linux VPS running nginx.
This is NOT a local file-open failure. The request is going over the network to a server.

## Working URL on laptop
- Exact URL: **[TO BE FILLED IN]**
- Is this local dev, local static file, or production domain?

## Failing URL on Mac mini
- Exact URL: `https://smart-learning-solutions.craftandconscious.com/workshops.html`
- Classification: **Production domain → request goes to VPS nginx**
- This confirms the GitHub Desktop pull is NOT the cause. The repo is fine.

## Most Likely Root Causes (ranked)

1. **Mac mini browsed to production domain** — the repo pull itself is fine, but the VPS nginx config
   is misconfigured or files have never been deployed there.
2. **nginx `root` points to wrong folder** — VPS has `root /var/www/site` but files are elsewhere.
3. **Files never deployed to VPS** — manual deploy step was skipped.
4. **Local nginx on Mac mini** — a local nginx process is intercepting port 80/443 before any local server.

## Phase 2 — URL Classification
[x] Production domain — `https://smart-learning-solutions.craftandconscious.com`
[ ] Localhost (http://localhost or http://127.0.0.1)
[ ] Local file (file:///)

## Phase 3 — VPS Nginx Audit (if production domain)
Commands to run on VPS:
```bash
sudo nginx -t
sudo ls -la /etc/nginx/sites-enabled/
sudo grep -R "server_name\|root\|try_files\|location" /etc/nginx/sites-available/ /etc/nginx/sites-enabled/
sudo ls -la /var/www/
```

Reference nginx config (from docs/DEPLOYMENT.md):
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/smartlearning;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```
Note: `$uri.html` is required for clean URLs — without it `/about` 404s even though `about.html` exists.

## Phase 4 — Local nginx Check (if localhost failing)
```bash
which nginx
sudo lsof -i :80
sudo lsof -i :443
```

## Findings
- [to be filled in after VPS/local audit]

## Fix Applied
- [to be filled in]

## Verification
| URL | Expected | Actual |
|-----|----------|--------|
| https://DOMAIN/ | 200 | |
| https://DOMAIN/about | 200 | |
| https://DOMAIN/programs/coding-with-robots.html | 200 | |
| https://DOMAIN/nonexistent | 404 (custom page) | |

## Merge Recommendation
- [ ] Safe to merge
- [ ] Do not merge yet
- [ ] Production deploy required before merge
