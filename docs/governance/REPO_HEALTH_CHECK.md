# Repo Health Check

## Current Status

Status: **PARTIAL / BLOCKED for launch** — see Last Health Check below. First V3.4
production-readiness audit run 2026-06-23.

## Health Checklist

### Structure

- [ ] Root files are understandable.
- [ ] Source code is separated from generated files.
- [ ] Docs are discoverable.
- [ ] Build/test scripts are documented.

### Git

- [ ] Git status reviewed.
- [ ] `.gitignore` is appropriate.
- [ ] No secrets are committed.
- [ ] Large/generated files are handled intentionally.

### Build / Test

- [ ] Install command known.
- [ ] Build command known.
- [ ] Test command known.
- [ ] Lint/typecheck command known if applicable.

### Production Readiness

- [ ] Security baseline reviewed.
- [ ] Compatibility matrix reviewed.
- [ ] Rollback plan exists.
- [ ] Release gate reviewed.

## Last Health Check

- Date: 2026-06-23
- Agent: Claude (V3.4 production-readiness skill)
- Result: BLOCKED (for client launch)
- Notes: Read-only audit of all 10 pages, `components.js`, `animations.js`, `main.css`,
  `robots.txt`, `sitemap.xml`. Internal links and image references all resolve; no secrets
  tracked; `.gitignore` sound; no `console`/`debugger` in shipped JS. **Hard blockers:**
  (1) both forms POST to `REPLACE_ME` Formspree endpoint — primary conversion path is dead;
  (2) no confirmed production host/domain. **Notable gaps:** OG image is SVG (no social
  preview), no shipped security headers/CSP for the chosen host, deploy-root = repo-root
  would expose internal docs publicly, no privacy policy (a portable draft was added at
  `legal/privacy-policy.md`), AVIF image has no fallback, form success messages lack
  live-region/focus handling. Full report and prioritised remediation plan archived with
  the session plan file. **Open platform decision:** owner indicated the site may go on
  Wix, which cannot host this hand-coded static repo as-is — this gates host-specific work.
