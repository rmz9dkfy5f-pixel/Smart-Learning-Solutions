You are helping me create the first planning document for this repo.

Your task is NOT to create files yet.
Your task is NOT to scaffold the repo yet.
Your task is to co-write a clear `REPO_PLANNING.md` document that decides what this project needs before files and folders are generated.

# Goal

Create a practical repo planning document that defines:
- what kind of project this is
- what documentation is justified
- what files/folders should exist
- what should be deferred
- where each source of truth belongs
- how future AI/code agents should avoid duplicating or bloating the repo

# Project Inputs

Project name:
[INSERT PROJECT NAME]

Project type:
[Website / web app / client site / SaaS app / internal tool / portfolio / other]

Primary goal:
[INSERT PRIMARY GOAL]

Target users/audience:
[INSERT TARGET USERS]

Current stage:
[Idea / planning / existing codebase / redesign / rebuild / production]

Tech stack:
[INSERT STACK IF KNOWN]

Deployment target:
[GitHub Pages / Vercel / Netlify / custom server / unknown]

Backend/API:
[None / planned / existing / unknown]

Database:
[None / planned / existing / unknown]

Authentication:
[None / planned / existing / unknown]

Team size:
[Solo / small team / client handoff / open source]

Expected complexity:
[Simple marketing site / content-heavy website / interactive web app / full-stack app / platform]

# Core Instructions

Create `REPO_PLANNING.md`.

Do not create the repo skeleton yet.
Do not generate implementation code.
Do not overbuild.
Assume the repo should start lean unless the project clearly requires more complexity.
Challenge unnecessary files, folders, and duplicated documentation.

# Required Output

# Repo Planning

## 1. Project Summary
Describe what this repo is for, what it is not for, and the current stage of the project.

## 2. Repo Strategy
Classify the repo as one of the following:
- lean website repo
- small web app repo
- full application repo
- platform/enterprise repo

Explain why.

## 3. Documentation Philosophy
State the documentation rules for this repo.

Include:
- fewer useful docs over many empty docs
- one source of truth per topic
- root files should stay minimal
- detailed docs should live in `/docs`
- avoid duplicate files unless there is a strong reason

## 4. Required Root Files
List only the root files that are justified.

For each file include:
- filename
- purpose
- why it belongs in root
- what should not go in it

## 5. Required `/docs` Files
List only the `/docs` files that are justified.

For each file include:
- filename
- purpose
- source-of-truth responsibility
- what decisions it should preserve

## 6. Required Workflow / Agent Files
Decide whether this repo needs Claude-specific workflow files.

Evaluate:
- `CLAUDE.md`
- `.claude/settings.json`
- `docs/workflow/claude-code-workflow.md`
- `plans/PLAN_TEMPLATE.md`
- `plans/open-decisions.md`

For each one, explain whether it should be created now, deferred, or skipped.

## 7. Optional Files/Folders to Defer
List files/folders that should not be created yet unless the project later requires them.

Consider:
- `docs/API.md`
- `openapi.yaml`
- `graphql/schema.graphql`
- `mock-server/`
- `migrations/`
- `infra/`
- `terraform/`
- `monitoring/`
- `localization/`
- `security/`
- `CODEOWNERS`
- `LICENSE`
- `metrics/`
- `tech-debt/`

For each one, explain the trigger that would justify adding it later.

## 8. Duplicate Source-of-Truth Prevention
Identify possible duplicate docs and choose one official location.

Examples:
- `API.md` vs `docs/API.md`
- `SECURITY.md` vs `docs/SECURITY.md`
- `CONTENT.md` vs `docs/CONTENT.md`
- `ACCESSIBILITY.md` vs `docs/ACCESSIBILITY.md`
- `openapi.yaml` vs `swagger/openapi.yaml`
- `CODEOWNERS` vs `.github/CODEOWNERS`

## 9. Recommended Initial File Tree
Provide a clean initial file tree.

Rules:
- avoid duplicate docs
- keep root minimal
- put detailed docs in `/docs`
- include Claude workflow files only if justified
- include `/plans` only if the project will use plan-first slice execution
- include `/design` only if design references, wireframes, or screenshots will be stored
- include `/sample-data` only if test/dev content is useful

## 10. Scaffolding Instructions
Provide a separate scaffold-ready file list.

Output it as a newline-separated list of paths only inside a code block.

Do not include files that were deferred.
Do not include duplicates.
Do not include unnecessary enterprise folders.

## 11. Agent Execution Rules
Write rules future AI/code agents must follow when working in this repo.

Include:
- inspect before editing
- read canonical docs before changing code
- create/update a plan before non-trivial work
- avoid duplicate source-of-truth files
- update relevant docs when architecture changes
- do not delete existing work without stating why
- do not create new docs unless justified
- preserve project intent
- validate after each slice

## 12. First Implementation Step
Recommend the smallest next action after this planning document is approved.

Do not generate implementation code.
Do not create the full repo yet.

# Quality Bar

Be practical, direct, and selective.
Prefer fewer useful files over many empty files.
Challenge unnecessary structure.
Separate facts, assumptions, and recommendations.