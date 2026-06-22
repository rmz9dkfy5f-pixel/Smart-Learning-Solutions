@AGENTS.md

# CLAUDE.md — Claude Code Project Memory

## Claude Code Specific Rules

Use V3.4 skills for repeatable project work:

- `/v34-execution-loop` for implementation, bugfix, refactor, audit remediation, and repo cleanup.
- `/v34-migration-loop` for existing project migration.
- `/v34-production-readiness` for production readiness checks.
- `/v34-context-eval-loop` for prompt, context, eval, and failure analysis workflows.

## Instruction Loading

Keep this file concise. Long procedures belong in `.claude/skills/` or `docs/`.

## Memory Hygiene

When you learn persistent project-specific facts, update the relevant project doc rather than bloating this file.

Preferred locations:

- Architecture facts → `docs/project/ARCHITECTURE.md`
- Current state → `docs/project/STATUS.md`
- Decisions → `docs/project/DECISION_LOG.md`
- Known risks → `docs/governance/PROJECT_RISK_REGISTER.md`
- Validation rules → `docs/governance/TEST_STRATEGY.md`
- Agent workflow notes → `ai/agents/AGENT_REVIEW_GATES.md`
