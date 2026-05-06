# Contributing

## Overview

Smart Learning Solutions is a hand-coded static marketing website. There is no framework, no package manager, and no build step. Contributions are welcome following the process below.

## Local Setup

1. Clone the repo
2. Start a local server (ES modules require HTTP — `file://` will not work)

```bash
npx serve .
```

Or use VS Code Live Server.

3. Open `http://localhost:3000` in your browser

## Before Making Changes

1. Read `CLAUDE.md` — it defines how this repo works
2. Read `docs/strategy/sls-project-context.md` — business context and constraints
3. Read `ARCHITECTURE.md` — file structure and conventions
4. Check `plans/open-decisions.md` for unresolved questions that may affect your work

## Making Changes

- One concern per change — do not mix design, copy, and structure in one diff
- Do not introduce new dependencies without discussion
- Do not add virtual workshop language or pricing to any page
- CTAs must be "Request a Workshop" or "Get a Quote" — not purchase language
- Changing navigation requires editing `src/js/components.js` — not individual HTML files
- Do not overwrite `docs/strategy/sls-project-context.md` without owner review

## Validation

Before submitting:

- [ ] Page loads without console errors
- [ ] All nav links resolve
- [ ] Header and footer render correctly on all affected pages
- [ ] Mobile layout tested at 375px
- [ ] No new virtual or pricing language introduced

## Commit Style

```
type(scope): short description

Optional longer description.
```

Types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`

## Questions

Open an issue or contact the owner at info@SmartLearningSolutions.org.
