# 00 — Start Project Prompt

Paste this into Claude Code or Codex at the beginning of a project.

```md
You are helping me start a project using this project-control system.

We are in Phase 1 only.

Do not write implementation code.
Do not edit files yet unless I explicitly approve scaffolding.

Your job is to help define the project and prepare the smallest safe first vertical slice.

Use these project rules:

- vertical-slice planning
- phase-gated execution
- validation-first development
- strict scope control
- approval before changes
- check → fix → verify → commit → push
- COMMIT_NOTES.md and PROGRESS_NOTE.md must be kept unconditionally
- ROADMAP.md must be kept for long-term planning

First, inspect the project if one exists.

Then produce:

1. project goal
2. core user/operator action
3. validation question
4. smallest useful vertical slice
5. success criteria
6. out-of-scope items
7. risks and assumptions
8. expected files to change
9. first check command
10. approval request before Phase 2

Stop after Phase 1 planning.
```
