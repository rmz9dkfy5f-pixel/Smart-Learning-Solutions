# Project Starter Kit v3.2 — Push-Button Startup Prompt

Use this prompt when installing the Project Starter Kit v3.2 into a new or mostly empty repository.

## Intended use

Place these two items in the root of the target repo:

```text
project-starter-kit-v3.2-unified-with-subagents/
PROJECT_STARTER_KIT_V3_2_PUSH_BUTTON_STARTUP_PROMPT.md
```

Then tell the coding agent in VS Code / Claude Code / Cursor:

```text
Read and execute PROJECT_STARTER_KIT_V3_2_PUSH_BUTTON_STARTUP_PROMPT.md from the repo root.
```

## Role

You are installing the Project Starter Kit v3.2 into this repo.

Your job is to make the repo ready for controlled AI-assisted development.

## Hard safety rules

- Do not delete existing project source code.
- Do not overwrite existing user files without first preserving the original.
- Do not run package installs, migrations, deploys, resets, or destructive commands.
- Do not modify app/business logic.
- Do not edit files outside the current repo root.
- If uncertainty exists, create a review report instead of guessing.

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
Only install from `templates/project-root/`.

## Installation tasks

1. Confirm repo root.
2. Detect starter kit folder.
3. Locate `templates/project-root/`.
4. Copy missing starter files and folders into repo root.
5. Preserve any existing file before replacement.
6. Install the v3.2 sub-agent layer:

```text
.claude/agents/
.claude/settings.example.json
ai/agents/
```

7. Create install tracking folders:

```text
.starter-kit/install/
.starter-kit/review/conflicts/
.starter-kit/archive/
```

8. Move the copied outer starter kit folder to:

```text
.starter-kit/archive/<starter-kit-folder-name>/
```

Only do this after successful installation.

## Conflict handling

If a file already exists in the repo root and the starter kit also provides that file:

1. Do not overwrite silently.
2. Keep the existing project file in place.
3. Copy the starter version to:

```text
.starter-kit/review/conflicts/<path>.starter-kit-version
```

4. Add the conflict to the install report.

## Special handling for `.claude/agents/`

If `.claude/agents/` does not exist, install the full v3.2 agent pack.

If `.claude/agents/` already exists:

- install missing starter agents
- do not overwrite existing agent files
- place conflicting starter agent files in:

```text
.starter-kit/review/agent-conflicts/
```

## Required final files

After installation, the repo should contain, at minimum:

```text
START_HERE.md
PROJECT_BRIEF.md
STATUS.md
PLAN.md
DECISION_LOG.md
CLAUDE.md
AGENTS.md
docs/
plans/
ai/templates/
ai/sessions/
ai/checkpoints/
ai/prompts/
ai/patterns/
ai/agents/
.claude/agents/
```

## Install report

Create:

```text
.starter-kit/install/INSTALL_REPORT_V3_2.md
```

Include:

```markdown
# Project Starter Kit v3.2 Install Report

## Install mode

New or mostly empty repo.

## Starter kit source folder

## Files installed

## Folders installed

## Conflicts preserved

## Sub-agents installed

## Sub-agent conflicts

## Files not touched

## Recommended next steps

## Git status summary
```

## Final response

When complete, report:

1. install success/failure
2. files/folders installed
3. conflicts that need review
4. sub-agents installed
5. next exact command or action

Do not claim success if install failed.
