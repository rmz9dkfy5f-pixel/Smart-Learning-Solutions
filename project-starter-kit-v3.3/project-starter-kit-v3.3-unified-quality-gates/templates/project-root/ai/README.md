# AI Engineering Memory

This folder stores AI-assisted engineering context that should not be trapped inside chat.

The rule:

```text
AI chat = temporary thinking
Files = permanent intelligence
```

---

## Folders

| Folder | Purpose |
|---|---|
| `templates/` | Reusable session/checkpoint/prompt templates |
| `sessions/designs/` | Architecture and design session outputs |
| `sessions/features/` | Feature implementation session outputs |
| `sessions/debug/` | Debugging session outputs |
| `sessions/optimization/` | Refactor/performance session outputs |
| `checkpoints/` | Clean context summaries for new AI chats |
| `prompts/` | Reusable prompts |
| `patterns/` | Reusable engineering patterns |
| `reports/` | Audits, reviews, threat reports, resume artifacts |

---

## Naming Convention

Use dated filenames:

```text
YYYY-MM-DD_short_name.md
```

Examples:

```text
sessions/features/2026-06-14_auth_refresh_rotation.md
sessions/debug/2026-06-14_intermitent_401_errors.md
checkpoints/2026-06-14_auth_checkpoint.md
patterns/auth_patterns.md
prompts/security_audit_prompt.md
```

---

## Rules

- One feature equals one feature file.
- One bug equals one debug file.
- One architecture topic equals one design file.
- One messy chat equals one checkpoint.
- One repeated solution becomes one pattern.
- One reusable instruction becomes one prompt.

Do not mix architecture, debugging, implementation, and optimization in the same session file.


---

## API Design Sessions

Use `templates/api_design_template.md` when the work involves:

- API routes
- auth flows
- service boundaries
- data models
- cache or queue decisions
- scaling strategy
- observability
- production security behavior

Use `templates/design_template.md` for broader architecture or non-API design work.

Recommended path:

```text
sessions/designs/YYYY-MM-DD_service_name_api_design.md
```

After approval, promote only the stable decisions into:

```text
docs/API.md
docs/DATA_MODEL.md
docs/SECURITY.md
docs/ARCHITECTURE.md
DECISION_LOG.md
```

## Agents

The `ai/agents/` folder explains how to use the project sub-agent layer.

Runtime sub-agent definitions live in `.claude/agents/`.

Use:

- `ai/agents/AGENT_ROSTER.md` to see available agents
- `ai/agents/AGENT_USAGE_RULES.md` for workflow rules
- `ai/agents/AGENT_HANDOFF_TEMPLATE.md` to invoke agents cleanly


## v3.3 Quality Gate Integration

The `ai/` folder now works with project-level quality gates:

- use `DONE_CRITERIA.md` before calling work complete
- use `CHANGE_CONTROL.md` before risky edits
- use `ROLLBACK_PLAN.md` for migrations and risky changes
- use `PROJECT_RISK_REGISTER.md` for recurring or unresolved risks
- use `ai/agents/AGENT_REVIEW_GATES.md` to determine sub-agent review requirements
