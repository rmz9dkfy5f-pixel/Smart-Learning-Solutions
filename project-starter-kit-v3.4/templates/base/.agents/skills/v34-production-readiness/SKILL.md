---
name: v34-production-readiness
description: Use for production-readiness audits covering reliability, security, compatibility, structure, refactoring needs, testing, release readiness, and operational risk.
---

# V3.4 Production Readiness Audit

## Objective

Evaluate whether the project is ready for production or what must be fixed before production.

## Audit Areas

1. Project structure
2. Build/test reliability
3. Security baseline
4. Dependency risk
5. Error handling
6. Data handling
7. Cross-platform compatibility
8. Browser/device/screen compatibility if applicable
9. Accessibility if applicable
10. Performance basics
11. Maintainability/refactor risk
12. Release/rollback readiness
13. Documentation accuracy
14. Agent workflow safety

## Process

### Inspect

Read:

- `docs/governance/REPO_HEALTH_CHECK.md`
- `docs/governance/SECURITY_BASELINE.md`
- `docs/governance/COMPATIBILITY_MATRIX.md`
- `docs/governance/TEST_STRATEGY.md`
- `docs/governance/RELEASE_GATE.md`
- `docs/project/ARCHITECTURE.md`
- `docs/project/STATUS.md`

### Score

Use this scale:

- 0 = missing / unknown
- 1 = weak / high risk
- 2 = partial / needs work
- 3 = acceptable
- 4 = strong
- 5 = production-ready

### Output

```md
# Production Readiness Audit

## Overall Status
PASS / PARTIAL / BLOCKED / FAIL

## Score Summary
| Area | Score | Risk | Recommendation |
|---|---:|---|---|

## Critical Blockers
[List]

## High-Leverage Fixes
[List ordered by impact]

## Validation Performed
[Commands/results]

## Release Gate Result
[Ready / Not ready / Unknown]
```
