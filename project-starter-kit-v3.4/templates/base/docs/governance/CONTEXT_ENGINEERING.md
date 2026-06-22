# Context Engineering

## Principle

Do not solve context problems by making root instructions huge. Use progressive disclosure:

- root files for stable rules
- skills for repeatable procedures
- docs for durable project facts
- run logs for session-specific outcomes
- evals for reliability evidence

## Context Classes

### Always Loaded

Keep minimal:

- `AGENTS.md`
- `CLAUDE.md`

### Loaded When Needed

Use for procedures:

- `.claude/skills/*/SKILL.md`
- `.agents/skills/*/SKILL.md`

### Durable Knowledge

Use for project facts:

- `docs/project/`
- `docs/governance/`

### Temporary / Session Knowledge

Use for work products:

- `ai/reports/`
- `docs/governance/AGENT_RUN_LOG.md`

## Anti-Patterns

- Giant root instruction files
- Vague “be careful” rules
- Untracked prompt edits
- No failure cases
- No validation commands
- No rollback path
