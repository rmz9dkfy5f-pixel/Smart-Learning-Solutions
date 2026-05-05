# Scaffolding Prompt

## Purpose

Create the approved initial project file/folder scaffold for the target repo.

This step happens after `01_REPO_PLANNING.md` has decided what the repo needs.

Do not create implementation code.
Do not create duplicate source-of-truth documents.
Do not create optional enterprise files unless `REPO_PLANNING.md` explicitly approved them.

---

# Required Before Starting

Before creating or editing files:

1. Confirm the target repo root.
2. Confirm you are not writing generated repo files into the setup-documents folder unless explicitly instructed.
3. Inspect the target repo root.
4. Read `REPO_PLANNING.md` if it exists.
5. Preserve existing non-empty files unless the user explicitly approved overwriting them.
6. If a file already exists, update only if it is clearly a placeholder or if `REPO_PLANNING.md` requires the update.

If the target repo root is unclear, stop and ask for the correct path.

---

# Scaffold Rules

- Use forward slashes.
- Keep root files minimal.
- Put detailed documentation in `/docs`.
- Do not create duplicate root/docs versions of the same topic.
- Do not create `API.md`, `SECURITY.md`, `infra/`, `monitoring/`, `migrations/`, `mock-server/`, `graphql/`, or `localization/` unless explicitly approved by `REPO_PLANNING.md`.
- Do not invent project facts.
- Use clear placeholders where project-specific information is missing.
- Every `.md` file must include:
  - an H1 title
  - a short purpose statement
  - a “What belongs here” section
  - a “What does not belong here” section
  - a “Status” section marking it as `Draft`, `Placeholder`, or `Active`
- Every created folder must include a listed `README.md` if one is specified below.
- Do not silently skip files. If a file is skipped, report why.

---

# Files To Create Or Update

Create or update these files only:

```txt
README.md
ARCHITECTURE.md
CLAUDE.md
ROADMAP.md
CHANGELOG.md
CONTRIBUTING.md
.env.example
.claude/settings.json
docs/STRATEGY.md
docs/DESIGN.md
docs/CONTENT.md
docs/ACCESSIBILITY.md
docs/PERFORMANCE.md
docs/TESTING.md
docs/DEPLOYMENT.md
docs/VERSIONING.md
docs/workflow/claude-code-workflow.md
plans/PLAN_TEMPLATE.md
plans/open-decisions.md
design/README.md
design/wireframes/README.md
design/references/README.md
sample-data/README.md
.github/PULL_REQUEST_TEMPLATE.md
.github/ISSUE_TEMPLATE.md