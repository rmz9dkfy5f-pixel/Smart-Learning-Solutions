# Claude Code Workflow — Smart Learning Solutions

## Required Reading Before Any Session
1. `CLAUDE.md` — operating guide, content rules, confirmed decisions
2. `docs/strategy/sls-project-context.md` — business context and audiences
3. `plans/open-decisions.md` — check for blockers before starting new work

## Repo Start Procedure
1. Confirm working directory is the repo root
2. Read `CLAUDE.md`
3. Start in Plan Mode
4. Check `plans/open-decisions.md` for anything that affects the task

## Plan-First Rule
Before making any non-trivial changes:
1. Inspect the repo
2. Create a dated plan file in `plans/` (`YYYY-MM-DD-task-name.md`)
3. List all files to be reviewed and changed
4. Break work into approval slices
5. Get approval for slice 1 before editing anything

## Slice Standard
Each slice should be one focused concern:
- One page only
- One component only
- One content section only

Each slice report must include:
- Files changed
- Reason for the change
- How to verify it works
- Known follow-up work

## Good Workflow
```
inspect → plan → get approval → edit slice 1 → verify → report → next slice
```

## Bad Workflow
- Editing without a written plan
- Touching many files in one unapproved change
- Inventing business decisions not documented in `docs/strategy/`
- Changing navigation in individual HTML files (always change `components.js`)

## Key Technical Rules
- Header/footer changes → edit `src/js/components.js` only
- Design token changes → edit `src/css/main.css` `:root` block only
- New pages must follow the existing HTML pattern (import `components.js`, call `initPage()`)
- All pages require a local server to test (ES modules do not work over `file://`)

## Verification Checklist (after any edit)
- [ ] Page loads without console errors
- [ ] Header appears correctly with sticky scroll
- [ ] Mobile nav opens and closes
- [ ] All links in the changed page resolve
- [ ] Footer copyright year is current
- [ ] No new `REPLACE_ME` placeholders introduced

## File Naming Conventions
- Plan files: `plans/YYYY-MM-DD-task-name.md`
- Images: `src/images/[descriptive-name].[ext]` (no spaces, lowercase)
- No new CSS files — extend `main.css` with page-specific styles in `<style>` blocks only if needed
