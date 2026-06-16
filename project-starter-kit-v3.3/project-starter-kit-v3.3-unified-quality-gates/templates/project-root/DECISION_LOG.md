# Decision Log

Use this file for important decisions.

Do not use it for tiny task notes.

---

## Decision Template

### YYYY-MM-DD — Decision Title

Decision:

> [What did we choose?]

Reason:

> [Why did we choose it?]

Alternatives considered:

- [Alternative 1]
- [Alternative 2]

Risk:

> [What could go wrong?]

Review trigger:

> [When should we reconsider?]

Status:

```text
Active
```

---

## Decisions

### YYYY-MM-DD — Initial Project Control System

Decision:

> Use phase-gated vertical-slice planning with approval before file changes.

Reason:

> This prevents Claude Code or Codex from overbuilding, editing unrelated files, or mixing planning with implementation.

Alternatives considered:

- Freeform AI implementation
- Full upfront specification
- Single README-only planning

Risk:

> The process may feel heavy for very small tasks.

Review trigger:

> Reconsider if the process slows down trivial tasks without reducing mistakes.

Status:

```text
Active
```
