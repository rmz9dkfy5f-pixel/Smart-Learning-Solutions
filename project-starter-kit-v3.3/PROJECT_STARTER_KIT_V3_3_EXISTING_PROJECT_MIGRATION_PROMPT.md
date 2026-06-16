# Project Starter Kit v3.3 Existing Project Migration Prompt

Use this for an existing project such as Prompt Vault, a client website, a homelab repo, or any repo that already contains source code or documentation.

Copy this file and the full `project-starter-kit-v3.3-unified-quality-gates/` folder into the repo root, then tell your coding agent:

```text
Read and execute PROJECT_STARTER_KIT_V3_3_EXISTING_PROJECT_MIGRATION_PROMPT.md from the repo root.
```

## Agent Instructions

You are migrating an existing repo into the Project Starter Kit v3.3 workflow.

Your job is to add the starter kit structure without breaking or overwriting the existing project.

## Non-Negotiable Safety Rules

- Do not overwrite existing files.
- Do not delete existing files.
- Do not move source code.
- Do not refactor code.
- Do not change dependencies.
- Do not change deployment files.
- Do not commit unless explicitly asked.
- Do not treat cleanup suggestions as approval to perform cleanup.
- Quarantine conflicts instead of resolving them automatically.

## Step 1 — Inspect First

From the repo root, inspect:

- git status
- current branch
- current commit hash
- top-level files/folders
- detected framework/runtime
- package manager
- existing docs
- existing `ai/`
- existing `.claude/`
- build/test/lint scripts if available

Create:

```text
.starter-kit/install/PRE_MIGRATION_INVENTORY.md
```

Include:

- files/folders found
- likely project type
- high-risk areas
- do-not-touch areas
- existing source-of-truth docs

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

## Step 3 — Create Migration Workspace

Create:

```text
.starter-kit/install/INSTALL_LOG.md
.starter-kit/review/conflicts/
.starter-kit/review/merge-candidates/
.starter-kit/archive/
```

## Step 4 — Install Missing Starter Files Only

For every file in `templates/project-root/`:

- If the file does not exist, copy it.
- If the file exists, do not overwrite it.
- Copy the starter version to `.starter-kit/review/conflicts/`.
- Record the conflict in the install log.

For folders:

- Create missing folders.
- Preserve existing folder contents.
- Add `.gitkeep` only to empty starter folders when needed.

## Step 5 — Install Sub-Agents Conservatively

For `.claude/agents/`:

- Create the folder if missing.
- Install missing starter agents.
- If an agent with the same name exists, do not overwrite.
- Put the starter version in `.starter-kit/review/conflicts/.claude/agents/`.
- Record conflicts in the install log.

## Step 6 — Add Quality Gate Layer

Ensure these exist or are quarantined as conflicts:

```text
DONE_CRITERIA.md
CHANGE_CONTROL.md
REPO_HEALTH_CHECK.md
ROLLBACK_PLAN.md
PROJECT_RISK_REGISTER.md
ai/agents/AGENT_REVIEW_GATES.md
```

Do not overwrite existing project-specific versions.

## Step 7 — Update Repo Health Check Safely

If `REPO_HEALTH_CHECK.md` was newly added, fill in what can be detected.

If it already existed, create:

```text
.starter-kit/review/merge-candidates/REPO_HEALTH_CHECK_MIGRATION_UPDATE.md
```

Include:

- detected stack
- package manager
- build/test/lint commands
- important files
- high-risk files
- unknowns
- recommended first cleanup slice

## Step 8 — Create Rollback Plan

If `ROLLBACK_PLAN.md` was newly added, fill it in.

If it already existed, create:

```text
.starter-kit/review/merge-candidates/ROLLBACK_PLAN_MIGRATION_UPDATE.md
```

Include:

- pre-migration branch
- pre-migration commit
- added files
- skipped files
- conflicts
- rollback instructions

## Step 9 — Do Not Perform Cleanup Yet

You may recommend cleanup, but do not perform it.

Examples of cleanup that require later approval:

- removing old docs
- consolidating duplicate READMEs
- moving project files
- changing folder structure
- renaming components
- updating dependencies
- changing build scripts

## Step 10 — Starter Kit Folder Cleanup

After successful migration, move the copied outer starter kit folder into:

```text
.starter-kit/archive/
```

If moving it is unsafe, leave it in place and state that clearly.

Do not delete it.

## Step 11 — Final Migration Report

End with:

```text
Starter Kit v3.3 migration complete / incomplete
Existing project preserved: yes/no
Files added:
Files skipped because they already existed:
Conflicts quarantined:
Sub-agents installed:
Quality gates installed:
Repo health summary:
Rollback readiness:
Cleanup recommendations requiring approval:
Recommended next action:
Suggested commit message:
```

Do not mark complete unless no existing project files were overwritten and rollback notes exist.
