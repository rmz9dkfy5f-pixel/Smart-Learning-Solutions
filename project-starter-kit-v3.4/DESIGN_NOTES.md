# V3.4 Design Notes

## Why V3.4 Uses Both Root Instructions And Skills

Root instruction files should stay short because they are loaded frequently. Long procedures are placed in skills and docs.

## Canonical Instruction Strategy

- `AGENTS.md` is the cross-agent source of truth.
- `CLAUDE.md` imports or points to `AGENTS.md` and adds Claude-specific notes.
- `.claude/skills/` gives Claude Code reusable workflows.
- `.agents/skills/` gives Codex reusable workflows.

## Why The Installer Is Non-Destructive

A starter kit that overwrites existing repo files is dangerous. V3.4 preserves existing files and puts candidates in `.v34_migration_review/`.

## Why Optional Systems Are Not Auto-Installed

CI, hooks, browser testing, security scanning, and release automation are useful but stack-specific. Installing them blindly would create false confidence and noise.
