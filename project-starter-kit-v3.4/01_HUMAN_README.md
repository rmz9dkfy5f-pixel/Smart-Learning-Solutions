# Project Starter Kit V3.4

Version: 3.4.0  
Date: 2026-06-21

## What V3.4 Is

V3.4 is a ground-up rebuild of your starter kit around one principle:

> A project starter kit should not just store prompts and docs. It should create a repeatable agent operating system.

V3.4 merges:

- V3.3-style quality gates
- Claude Code skills
- Codex-compatible `AGENTS.md` instructions
- loop-based execution
- context engineering
- eval and failure logging
- migration-safe installation
- production-readiness governance

## Folder Paths

Use the zip like this:

```text
your-repo/
  project-starter-kit-v3.4/
    00_EXECUTE_ME.md
```

Then tell Claude Code or Codex:

```text
Execute project-starter-kit-v3.4/00_EXECUTE_ME.md exactly.
```

## Modes

### New Project

For an empty or fresh repo. Installs the full V3.4 structure.

### Migration

For an existing repo. Installs missing files, preserves existing files, and places conflicts in `.v34_migration_review/`.

## Core Design Decision

`AGENTS.md` is the canonical cross-agent instruction file. `CLAUDE.md` imports or points to it and adds Claude-specific rules. Skills are duplicated under both `.claude/skills/` and `.agents/skills/` so Claude Code and Codex can both use the same workflow.

## What Is New In V3.4

- One push-button execution document
- Dedicated V3.4 execution-loop skill
- Dedicated migration-loop skill
- Dedicated production-readiness skill
- Dedicated context/eval loop skill
- Non-destructive installer script
- Validator script
- Explicit eval/failure log
- Compatibility matrix
- Security baseline
- Release gate
- Subagent role definitions
- Optional-system proposal document

## Recommended First Use

For an existing repo:

```text
Execute project-starter-kit-v3.4/00_EXECUTE_ME.md in migration mode. Preserve all existing files and create a V3.4 installation report.
```

For a new repo:

```text
Execute project-starter-kit-v3.4/00_EXECUTE_ME.md in new-project mode and initialize the V3.4 documentation skeleton.
```
