# Agent Usage Rules — Project Starter Kit v3.2

## Purpose

Sub-agents are a delegation layer for Claude Code. They keep exploration, review, debugging, and verification out of the main conversation context.

They are not a replacement for the project source of truth.

## Source-of-truth hierarchy

Use this order when instructions conflict:

1. User's explicit instruction in the current session
2. `PROJECT_BRIEF.md`
3. `STATUS.md`
4. `PLAN.md`
5. `DECISION_LOG.md`
6. `CLAUDE.md`
7. `AGENTS.md`
8. `docs/`
9. `ai/checkpoints/`
10. `ai/sessions/`

## Default workflow

```text
repo-cartographer → project-steward → slice-planner
→ main Claude Code implementation
→ test-verifier
→ security-reviewer if risk area changed
→ docs-promoter
→ checkpoint
→ commit
```

## Use only what is needed

For a normal small task, use no more than 2–3 agents:

- before work: `project-steward` or `slice-planner`
- after work: `test-verifier`
- if security-sensitive: `security-reviewer`
- if documentation changed: `docs-promoter`

## When to use each agent

### Start or migration

```text
Use the repo-cartographer agent to inspect this repo. Then use the project-steward agent to compare the repo against PROJECT_BRIEF.md, STATUS.md, PLAN.md, and DECISION_LOG.md. Do not edit files yet.
```

### Broad goal needs a slice

```text
Use the slice-planner agent to turn the next item in PLAN.md into the smallest safe vertical slice. Include likely files, verification steps, risks, rollback, and out-of-scope work. Do not implement yet.
```

### Bug investigation

```text
Use the debugger agent to analyze this issue using ai/templates/debug_template.md. Focus only on root cause and minimal fix. Do not refactor unrelated code.
```

### After implementation

```text
Use the test-verifier agent to identify and run safe verification commands. Summarize pass/fail results and remaining risk. Do not edit files.
```

### Security-sensitive change

```text
Use the security-reviewer agent to review this change for secrets, auth, storage, API, dependency, deployment, and exposure risks. Do not edit files.
```

### End of session

```text
Use the docs-promoter agent to identify what source-of-truth files should be updated after this work. Do not edit docs until I approve the proposed changes.
```

## Hard limits

- No sub-agent should delete files.
- No sub-agent should perform broad refactors.
- No sub-agent should run deploy, publish, migration, reset, or destructive commands without explicit approval.
- No sub-agent should turn raw AI notes into stable docs without review.
- Sub-agents should report file paths, evidence, and remaining risk.
- The main Claude Code session remains responsible for final implementation and commit readiness.


## v3.3 Review Gate Reminder

Before invoking sub-agents, check `AGENT_REVIEW_GATES.md`. Use the fewest agents needed for the risk level. Agent output should include files inspected, evidence, findings, risks, and next action.
