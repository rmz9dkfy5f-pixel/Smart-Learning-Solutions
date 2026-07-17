# Project Risk Register

| ID | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|---|---|---:|---:|---|---|---|
| R-001 | Unknown project-specific risks not documented yet | Medium | Medium | Run V3.4 repo health check | Project owner | Closed — audit run 2026-06-23; specific risks now documented as R-002–R-004 |
| R-002 | Forms wired to `REPLACE_ME` Formspree endpoint — primary conversion path is dead | Critical | Certain | Migrated to Web3Forms with a live access key (`src/js/web3forms-config.js`) | Owner | Closed — resolved 2026-07-16, uncommitted pending owner review |
| R-003 | Hosting platform unconfirmed — owner indicated site "may go on Wix"; Wix cannot host this hand-coded static repo as-is | High | Medium | Confirm platform before any further code investment; if static hosting chosen, repo is ready; if Wix, full rebuild required | Owner | Open |
| R-004 | Deploy-root = repo-root exposes internal docs (`AUDIT.md`, `CLAUDE.md`, `plans/`, `prompts/`) publicly | Medium | High (if deployed without exclusion rules) | Configure host to exclude internal paths; verify by requesting `/AUDIT.md` returns 404 on production | Claude / Owner | Open (deferred until host confirmed) |

## Risk Categories

- Security
- Data loss
- Build failure
- Deployment failure
- Compatibility
- Performance
- Accessibility
- Maintainability
- Agent misuse
- Documentation drift
