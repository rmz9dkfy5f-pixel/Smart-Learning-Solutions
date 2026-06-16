# Context

This file stores stable project context.

Use it for information that should remain true across tasks and conversations.

Do not use this file for temporary status updates. Use `STATUS.md` for that.

---

## Project Background

> [Explain why this project exists.]

---

## Environment

> [Describe environment, platform, server, operating system, runtime, dependencies, or constraints.]

Examples:

- local-only
- server-hosted
- Docker/Podman
- Proxmox
- macOS
- Linux
- GitHub repo
- private network

---

## Important Paths

Use clearly marked placeholders if unknown.

```text
<PROJECT_ROOT>
<CONFIG_PATH>
<DATA_PATH>
<LOG_PATH>
```

---

## Constraints

- [ ] [Constraint]
- [ ] [Constraint]
- [ ] [Constraint]

---

## Non-Negotiable Rules

- Approval is required before file changes.
- Phase 1 planning must complete before Phase 2 implementation.
- `COMMIT_NOTES.md` and `PROGRESS_NOTE.md` must be kept unconditionally.
- `ROADMAP.md` must be kept for long-term planning.
- Use `check → fix → verify → commit → push`.
- Do not add scope outside the approved slice.

---

## Tooling Notes

Claude Code is used for implementation and repo work.

Codex is used for review, alternatives, and validation.

Only one tool should edit files at a time.
