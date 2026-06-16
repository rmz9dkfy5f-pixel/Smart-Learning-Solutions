# Project Starter Kit v3.3 Push-Button Startup Prompt

Use this for a new or mostly empty repo.

Copy this file and the full `project-starter-kit-v3.3-unified-quality-gates/` folder into the repo root, then tell your coding agent:

```text
Read and execute PROJECT_STARTER_KIT_V3_3_PUSH_BUTTON_STARTUP_PROMPT.md from the repo root.
```

## Agent Instructions

You are initializing this repo with Project Starter Kit v3.3.

Your job is to install the project starter structure safely and leave a clean startup state.

## Safety Rules

- Do not delete source code.
- Do not overwrite existing project files.
- Do not run destructive shell commands.
- Do not change dependencies.
- Do not refactor existing code.
- Do not commit unless explicitly asked.
- If this is not an empty or mostly empty repo, switch to existing-project migration behavior.

## Step 1 — Identify Repo State

From the repo root:

1. Identify the current directory.
2. Check whether this is a git repo.
3. Check `git status --short` if git exists.
4. Detect whether meaningful project files already exist:
   - `src/`, `app/`, `pages/`, `components/`
   - `package.json`
   - `README.md`
   - deployment files
   - existing `docs/`, `ai/`, `.claude/`

If the repo has meaningful existing work, stop and recommend using:

```text
PROJECT_STARTER_KIT_V3_3_EXISTING_PROJECT_MIGRATION_PROMPT.md
```

## Step 2 — Find Starter Kit Source

Find the copied starter kit folder.

Prefer:

```text
project-starter-kit-v3.3-unified-quality-gates/templates/project-root/
```

Fallback if needed:

```text
project-starter-kit-v3.2-unified-with-subagents/templates/project-root/
```

Only install from `templates/project-root/`.

Do not copy the entire outer starter-kit folder into the project structure.

## Step 3 — Create Install Log

Create:

```text
.starter-kit/install/INSTALL_LOG.md
.starter-kit/review/conflicts/
.starter-kit/archive/
```

Record:

- date/time
- repo path
- branch
- commit hash if available
- starter kit source folder
- files added
- files skipped
- conflicts
- verification attempted

## Step 4 — Install Starter Structure

Copy the contents of `templates/project-root/` into the repo root.

Rules:

- Add missing files.
- Create missing folders.
- If a file already exists, do not overwrite it.
- Put the starter version of conflicting files in `.starter-kit/review/conflicts/`.
- Preserve `.claude/agents/` files if already present.
- Install missing starter sub-agents only when no conflict exists.

## Step 5 — Quality Gate Initialization

Ensure these files exist:

```text
DONE_CRITERIA.md
CHANGE_CONTROL.md
REPO_HEALTH_CHECK.md
ROLLBACK_PLAN.md
PROJECT_RISK_REGISTER.md
ai/agents/AGENT_REVIEW_GATES.md
```

If any already existed, do not overwrite. Place the starter version in conflicts.

## Step 6 — Repo Health Check

Update `REPO_HEALTH_CHECK.md` with what can be safely detected:

- repo name
- branch
- commit hash
- detected stack
- package manager
- likely build/test/lint commands
- important folders
- risks
- unknowns
- recommended next slice

Do not invent commands. If unknown, write `Unknown`.

## Step 7 — Rollback Plan

Update `ROLLBACK_PLAN.md` with:

- branch
- commit before setup
- files added
- conflicts/quarantined files
- rollback method
- verification after rollback

## Step 8 — Starter Kit Folder Cleanup

After successful installation, move the copied outer starter kit folder into:

```text
.starter-kit/archive/
```

If moving it is unsafe, leave it in place and state that clearly.

Do not delete it.

## Step 9 — Final Report

End with:

```text
Starter Kit v3.3 initialization complete / incomplete
Files added:
Conflicts quarantined:
Quality gates installed:
Repo health summary:
Rollback readiness:
Recommended next action:
Suggested commit message:
```

Do not mark complete unless `DONE_CRITERIA.md` and `ROLLBACK_PLAN.md` are present.
