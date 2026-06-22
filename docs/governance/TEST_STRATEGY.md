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

Fill these in after inspection:

```bash
# install

# test

# build

# lint

# typecheck

# smoke test
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
