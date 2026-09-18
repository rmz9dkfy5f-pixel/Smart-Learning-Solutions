# Test Strategy

## Purpose

Define how this project proves changes work.

## Validation Priority

Use the strongest available validation in this order:

1. Automated tests
2. Build
3. Typecheck
4. Lint
5. Security/dependency scan
6. App-specific smoke test
7. Manual verification

## Project Commands

Filled 2026-09-18, per the full project-readiness audit (`AUDIT.md`). This is a hand-coded static
HTML/CSS/JS site with no build step and no package manager — most of these are genuinely "none,"
not unfilled.

```bash
# install
# none — no package.json, no dependencies to install

# test
# none automated — see Failure Rule below; validation is manual

# build
# none — repo root is the deploy root, no compilation step

# lint
# none configured

# typecheck
# none — plain JavaScript, no TypeScript

# smoke test
python3 -m http.server   # local server (ES modules need it; file:// silently fails imports)
# then manually check: nav links resolve, forms submit (Web3Forms), no console errors
# staging verification: curl checks per docs/DEPLOYMENT.md section 11
#   (forms endpoint, og:image, all-pages 200, security headers, internal-path 404s)
```

## Test Case Types

- Normal path
- Edge case
- Bad input
- Regression case
- Security-sensitive case
- Compatibility case

## Failure Rule

If validation fails, do not mark PASS. Fix the relevant issue or mark PARTIAL/BLOCKED with the failure documented.
