# Merge Notes — v3.1 to v3.2

## Summary

Project Starter Kit v3.2 adds a controlled Claude Code sub-agent layer.

v3.1 focused on project memory, session templates, checkpoints, and API design.
v3.2 keeps that structure and adds runtime delegation through `.claude/agents/`.

## Added

```text
.claude/agents/
├── repo-cartographer.md
├── project-steward.md
├── slice-planner.md
├── debugger.md
├── test-verifier.md
├── security-reviewer.md
└── docs-promoter.md

.claude/settings.example.json

ai/agents/
├── AGENT_ROSTER.md
├── AGENT_USAGE_RULES.md
└── AGENT_HANDOFF_TEMPLATE.md
```

## Updated intent

The starter kit now has three layers:

```text
Root/docs/plans = source of truth and project control
ai/ = durable AI memory and templates
.claude/agents/ = runtime delegation for Claude Code
```

## Migration rule

For existing projects, do not overwrite existing `.claude/agents/` files. Install only missing agents and move conflicts to `.starter-kit/review/agent-conflicts/`.

## Recommendation

Use v3.2 only where the added review and delegation layer helps. For very small repos, v3.1 or a minimal subset may be enough.
