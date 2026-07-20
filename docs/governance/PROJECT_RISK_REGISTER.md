# Project Risk Register

| ID | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|---|---|---:|---:|---|---|---|
| R-001 | Unknown project-specific risks not documented yet | Medium | Medium | Run V3.4 repo health check | Project owner | Closed — audit run 2026-06-23; specific risks now documented as R-002–R-004 |
| R-002 | Forms wired to `REPLACE_ME` Formspree endpoint — primary conversion path is dead | Critical | Certain | Migrated to Web3Forms with a live access key (`src/js/web3forms-config.js`) | Owner | Closed — resolved 2026-07-16, uncommitted pending owner review |
| R-003 | Hosting platform unconfirmed — owner indicated site "may go on Wix"; Wix cannot host this hand-coded static repo as-is | High | Medium | Confirm platform before any further code investment; if static hosting chosen, repo is ready; if Wix, full rebuild required | Owner | Open |
| R-004 | Deploy-root = repo-root exposes internal docs (`AUDIT.md`, `CLAUDE.md`, `plans/`, `prompts/`) publicly | Medium | Low on staging / High on production if unaddressed | Staging: `scripts/deploy-staging.sh` (2026-07-19, SR-009) enforces an explicit path allowlist — internal paths cannot be shipped by this mechanism; verified via `/AUDIT.md`, `/.git/config`, `/.claude/`, `/.agents/...` all returning 404. Production: no mechanism yet — production host is still unconfirmed (OD-003; may not even be this VPS) | Claude / Owner | Open — mitigated for staging; open for production pending OD-003 |

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
