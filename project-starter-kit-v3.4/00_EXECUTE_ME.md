# Project Starter Kit V3.4 — Push-Button Execution Document

Version: 3.4.0  
Purpose: Install or migrate a repository into the Project Starter Kit V3.4 agent operating system.

## What This Does

This document is designed to be executed by **Claude Code** or **Codex** from the root of a target repository or new project folder.

It installs a dual-agent-compatible project system using:

- `AGENTS.md` for Codex and agent-neutral project instructions
- `CLAUDE.md` for Claude Code project memory
- `.claude/skills/` for Claude Code skills
- `.agents/skills/` for Codex skills
- `docs/governance/` for quality gates, done criteria, risk tracking, rollback, testing, security, and release readiness
- `ai/` for agent prompts, run logs, subagent roles, reports, and review gates

## Mode Selection

Agent, determine the mode before acting:

- Use **NEW_PROJECT** if the target folder is empty or only contains basic setup files such as `.git`, `.gitignore`, `README.md`, or package manager scaffolding.
- Use **MIGRATE_EXISTING_PROJECT** if the target folder already contains app code, docs, prompts, project files, assets, configs, or history.
- If uncertain, default to **MIGRATE_EXISTING_PROJECT** because it is safer and non-destructive.

## Non-Negotiable Safety Rules

1. Do not overwrite existing project files without explicit user approval.
2. Do not delete existing project files.
3. Do not move existing project files unless migration mode explicitly requires it and the move is documented.
4. Preserve Git history.
5. If conflicts exist, place V3.4 candidate files in `.v34_migration_review/` for manual review.
6. Do not claim completion until validation has run.
7. If Python is unavailable, manually copy files from `templates/` using the same no-overwrite rules.

## Execution Steps

### Step 1 — Inspect

Run safe inspection commands:

```bash
git status --short || true
pwd
ls
```

Determine whether this is a new project or migration.

### Step 2 — Locate This Kit

This document should live inside the extracted folder:

```text
project-starter-kit-v3.4/00_EXECUTE_ME.md
```

The kit root is the folder containing this file.

### Step 3 — Choose Python Command

Use the first command that works:

```bash
python3 --version
python --version
py -3 --version
```

### Step 4 — Dry Run Install

From the target repo root, run one of these commands.

For new projects:

```bash
python3 project-starter-kit-v3.4/scripts/v34_install.py --mode new --target . --dry-run
```

For existing projects:

```bash
python3 project-starter-kit-v3.4/scripts/v34_install.py --mode migrate --target . --dry-run
```

On Windows, replace `python3` with `python` or `py -3` if needed.

### Step 5 — Apply Install

For new projects:

```bash
python3 project-starter-kit-v3.4/scripts/v34_install.py --mode new --target . --yes
```

For existing projects:

```bash
python3 project-starter-kit-v3.4/scripts/v34_install.py --mode migrate --target . --yes
```

### Step 6 — Validate

Run:

```bash
python3 project-starter-kit-v3.4/scripts/v34_validate.py --target .
```

### Step 7 — Agent Review

After installation, read these files:

```text
AGENTS.md
CLAUDE.md
docs/governance/DONE_CRITERIA.md
docs/governance/PHASE_GATES.md
docs/governance/REPO_HEALTH_CHECK.md
docs/governance/EVALS_AND_FAILURE_LOG.md
ai/agents/AGENT_REVIEW_GATES.md
```

Then run the V3.4 loop:

For Claude Code:

```text
/v34-execution-loop Review the V3.4 installation, verify the repo structure, identify migration conflicts, and produce the first agent run log.
```

For Codex:

```text
Use the v34-execution-loop skill to review the V3.4 installation, verify the repo structure, identify migration conflicts, and produce the first agent run log.
```

### Step 8 — Final Report

Return this exact structure to the user:

```md
# V3.4 Installation Result

## Status
PASS / PARTIAL / BLOCKED / FAIL

## Mode Used
NEW_PROJECT / MIGRATE_EXISTING_PROJECT

## Files Installed
[List]

## Existing Files Preserved
[List]

## Conflicts Sent To Review
[List or None]

## Validation Result
[Command output summary]

## Recommended Next Command
[What the user should run next]
```

## Stop Conditions

Stop and report instead of forcing changes if:

- Git status shows unexpected uncommitted work that could be overwritten.
- A required file cannot be written due to permissions.
- The target is not a project folder.
- Existing instructions directly conflict with V3.4 safety rules.
- Validation fails after one fix attempt.
