# Project Starter Kit v3.2 — Existing Project Migration Prompt

Use this prompt when adding Project Starter Kit v3.2 to a repo that already has code, docs, deployment files, or client/project history.

Examples:

- Prompt Vault
- barber website
- client websites
- homelab automation repos
- existing app repos

## Intended use

Place these two items in the root of the existing repo:

```text
project-starter-kit-v3.2-unified-with-subagents/
PROJECT_STARTER_KIT_V3_2_EXISTING_PROJECT_MIGRATION_PROMPT.md
```

Then tell the coding agent in VS Code / Claude Code / Cursor:

```text
Read and execute PROJECT_STARTER_KIT_V3_2_EXISTING_PROJECT_MIGRATION_PROMPT.md from the repo root.
```

## Role

You are migrating an existing repo into the Project Starter Kit v3.2 workflow.

This is a conservative migration.

Your job is to add missing project-control, AI-memory, and sub-agent workflow files without breaking existing code or project history.

## Hard safety rules

- Do not delete existing project files.
- Do not move source code, app routes, assets, deployment files, or config files unless explicitly approved.
- Do not overwrite existing files silently.
- Do not run package installs, package upgrades, migrations, deploys, resets, or destructive commands.
- Do not modify app/business logic.
- Do not reformat the repo.
- Do not restructure `src/`, `app/`, `pages/`, `components/`, `public/`, `server/`, or deployment folders.
- When in doubt, create a review report and stop.

## Expected copied starter kit folder

Look for one of these folders in the repo root:

```text
project-starter-kit-v3.2-unified-with-subagents/
project-starter-kit-v3.2-unified/
project-starter-kit-v3.1-unified/
```

Prefer v3.2 if present.

The actual project skeleton is inside:

```text
<starter-kit-folder>/templates/project-root/
```

Do not copy the entire outer starter kit into the repo root as project files.
Only migrate from `templates/project-root/`.

## Migration strategy

Use additive migration.

Install missing workflow files and folders.
Keep existing project files as primary.
Place conflicts in review folders.

## Required tracking folders

Create:

```text
.starter-kit/migration/
.starter-kit/review/conflicts/
.starter-kit/review/agent-conflicts/
.starter-kit/archive/
```

## File migration rules

### If the starter file does not exist in the repo

Copy it into place.

### If the repo already has a file with the same path

Do not overwrite it.

Copy the starter version to:

```text
.starter-kit/review/conflicts/<path>.starter-kit-version
```

Add the conflict to the migration report.

### If the repo has existing docs

Do not merge automatically. List recommendations in the report.

### If the repo has existing `CLAUDE.md` or `AGENTS.md`

Do not overwrite.

Place starter versions in review conflicts and recommend a merge.

## Sub-agent migration rules

Install the v3.2 sub-agent layer conservatively.

Expected runtime agents:

```text
.claude/agents/repo-cartographer.md
.claude/agents/project-steward.md
.claude/agents/slice-planner.md
.claude/agents/debugger.md
.claude/agents/test-verifier.md
.claude/agents/security-reviewer.md
.claude/agents/docs-promoter.md
```

Expected human docs:

```text
ai/agents/AGENT_ROSTER.md
ai/agents/AGENT_USAGE_RULES.md
ai/agents/AGENT_HANDOFF_TEMPLATE.md
```

If `.claude/agents/` does not exist:

- create it
- install all starter agents

If `.claude/agents/` exists:

- install only missing starter agents
- do not overwrite existing agent files
- place conflicting starter agent files in:

```text
.starter-kit/review/agent-conflicts/
```

If existing agents appear to overlap in purpose, list them in the migration report.

## Initial project memory setup

If these files do not exist, copy starter versions:

```text
PROJECT_BRIEF.md
STATUS.md
PLAN.md
DECISION_LOG.md
CONTEXT.md
```

If they already exist, preserve them.

Add a recommendation to review/update them after migration.

## Do not auto-clean these folders

Never auto-delete or move:

```text
src/
app/
pages/
components/
public/
server/
api/
lib/
utils/
styles/
assets/
content/
.env*
package.json
lock files
Docker files
deployment configs
```

## Migration report

Create:

```text
.starter-kit/migration/MIGRATION_REPORT_V3_2.md
```

Include:

```markdown
# Project Starter Kit v3.2 Migration Report

## Migration mode

Existing project.

## Starter kit source folder

## Existing project type detected

## Files installed

## Folders installed

## Existing files preserved

## Conflicts requiring review

## Sub-agents installed

## Sub-agent conflicts

## Existing agents detected

## Source files not touched

## Recommended manual merges

## Recommended next steps

## Git status summary
```

## After successful migration

Move the copied outer starter kit folder to:

```text
.starter-kit/archive/<starter-kit-folder-name>/
```

Do not archive it if the migration failed.

## Final response

When complete, report:

1. migration success/failure
2. files/folders installed
3. files preserved
4. conflicts requiring review
5. sub-agents installed
6. next exact action

Do not claim success if migration failed.
