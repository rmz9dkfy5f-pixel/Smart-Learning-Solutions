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

- Date: 2026-06-27
- Agent: Claude (V3.4 production-readiness skill, multi-agent explore pass)
- Result: BLOCKED (for client launch) — status unchanged from 2026-06-23
- Notes: Full read-only audit across all 10 HTML pages, `src/js/`, `src/css/main.css`,
  `src/images/`, deployment config, security posture, SEO, accessibility, and all governance
  docs. **Hard blockers unchanged:** (1) both forms POST to `REPLACE_ME` Formspree endpoint;
  (2) hosting platform unconfirmed (Wix incompatibility still unresolved). **Notable
  confirmation:** C-2 (cursor CSS gate) is verified fixed in current code — `cursor: none`
  is gated by `body.custom-cursor-enabled` at `src/css/main.css:135-142`; the AUDIT.md
  entry describing it as open is stale. **Remaining gaps (held per ADR-013):** OG image is
  SVG (social previews broken), internal docs exposed if repo root is deployed without
  exclusion rules, privacy policy draft unpublished, security headers not applied at server
  level, form a11y (live region + focus), AVIF without fallback, overlay safety timer.
  Full audit report: plan file `~/.claude/plans/encapsulated-sauteeing-mist.md`.

## Previous Health Check

- Date: 2026-06-23
- Agent: Claude (V3.4 production-readiness skill)
- Result: BLOCKED (for client launch)
- Notes: Read-only audit of all 10 pages, `components.js`, `animations.js`, `main.css`,
  `robots.txt`, `sitemap.xml`. Internal links and image references all resolve; no secrets
  tracked; `.gitignore` sound; no `console`/`debugger` in shipped JS. Hard blockers:
  (1) both forms POST to `REPLACE_ME` Formspree endpoint; (2) no confirmed production
  host/domain. Notable gaps: OG image is SVG, no shipped security headers/CSP, deploy-root
  exposes internal docs, no privacy policy (portable draft added at `legal/privacy-policy.md`),
  AVIF without fallback, form success messages lack live-region/focus handling. Open platform
  decision: owner indicated site may go on Wix.
