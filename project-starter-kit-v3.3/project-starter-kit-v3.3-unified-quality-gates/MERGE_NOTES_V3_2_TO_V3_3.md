# Merge Notes — v3.2 to v3.3

## Summary

v3.3 adds a Quality Gate Layer to v3.2.

v3.2 introduced Claude Code sub-agents. v3.3 makes the workflow safer by adding done criteria, change control, repo health checks, rollback planning, risk tracking, and agent review gates.

## Added

Project-root files:

- `DONE_CRITERIA.md`
- `CHANGE_CONTROL.md`
- `REPO_HEALTH_CHECK.md`
- `ROLLBACK_PLAN.md`
- `PROJECT_RISK_REGISTER.md`

Agent governance:

- `ai/agents/AGENT_REVIEW_GATES.md`

Core prompts:

- `core-prompts/10_QUALITY_GATE_REVIEW_PROMPT.md`
- `core-prompts/11_ROLLBACK_REVIEW_PROMPT.md`

Top-level prompts:

- `PROJECT_STARTER_KIT_V3_3_PUSH_BUTTON_STARTUP_PROMPT.md`
- `PROJECT_STARTER_KIT_V3_3_EXISTING_PROJECT_MIGRATION_PROMPT.md`

## Updated

- `README.md`
- `START_HERE.md`
- `STRUCTURE_MAP.md`
- `templates/TEMPLATE_INDEX.md`
- `templates/project-root/CLAUDE.md`
- `templates/project-root/AGENTS.md`
- `templates/project-root/ai/README.md`
- `templates/project-root/ai/agents/AGENT_USAGE_RULES.md`

## Why It Matters

The workflow is now less dependent on memory and more dependent on enforceable project files.

The main improvement is not more documentation. It is clearer control over:

- what may change
- what requires approval
- what counts as done
- how to verify
- how to rollback
- when to use sub-agents
