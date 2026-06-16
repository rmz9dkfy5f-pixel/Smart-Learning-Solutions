# Agent Handoff Template

Use this when asking Claude Code to invoke a project sub-agent.

```markdown
Use the `<agent-name>` agent.

## Task

<What I need the agent to do.>

## Context files

Read these first if they exist:

- PROJECT_BRIEF.md
- STATUS.md
- PLAN.md
- DECISION_LOG.md
- CLAUDE.md
- AGENTS.md
- <any specific file paths>

## Constraints

- Do not edit files.
- Do not delete files.
- Do not run destructive commands.
- Focus only on this task.
- Report uncertainty explicitly.

## Required output

Return:

1. findings
2. evidence with file paths
3. risks
4. recommended next action
5. approval needed before changes
```

## Common examples

### Inspect repo

```markdown
Use the `repo-cartographer` agent.

Map this repo structure, detect the stack, identify entry points, discover test/build commands, and list risk areas. Do not edit files.
```

### Plan next slice

```markdown
Use the `slice-planner` agent.

Turn the current PLAN.md next task into the smallest safe vertical slice. Include likely files, verification, rollback, and out-of-scope work. Do not implement.
```

### Verify changes

```markdown
Use the `test-verifier` agent.

Find and run safe verification commands for the changes just made. Do not edit files. Report pass/fail and commit readiness.
```
