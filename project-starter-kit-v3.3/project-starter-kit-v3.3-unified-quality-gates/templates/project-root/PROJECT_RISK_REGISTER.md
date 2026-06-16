# Project Risk Register

Use this to track risks that could affect correctness, security, delivery, maintainability, data safety, client trust, or deployment stability.

## Risk Rating

| Level | Meaning |
|---|---|
| Low | Minor inconvenience or cleanup issue |
| Medium | Could slow delivery or create visible defects |
| High | Could break core functionality, data, deployment, or trust |
| Critical | Could cause data loss, security exposure, production outage, or irreversible damage |

## Open Risks

| ID | Risk | Area | Impact | Likelihood | Level | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| R-001 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Open |

## Closed Risks

| ID | Risk | Resolution | Date closed |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## Risk Categories

Use these categories when adding risks:

- scope drift
- architecture
- data/schema
- imports/exports
- auth/security
- secrets/privacy
- deployment
- dependency/versioning
- testing/verification
- performance
- accessibility
- client content
- documentation drift
- AI workflow/process

## Project-Specific Examples

### Prompt Vault Example

| ID | Risk | Area | Impact | Likelihood | Level | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| PV-001 | JSON schema changes break old exports | data/schema | High | Medium | High | Add schema versioning and migration tests | TBD | Open |

### Client Website Example

| ID | Risk | Area | Impact | Likelihood | Level | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| WEB-001 | Contact form attracts spam or exposes email | security | Medium | High | High | Add validation, rate limiting, CAPTCHA or hosted form protection | TBD | Open |

## Review Cadence

Review this file:

- before implementation of risky work
- after bugs
- before deployment
- before dependency upgrades
- before client handoff
- at the end of each major slice
