# How to Use Sub-Agents — Project Starter Kit v3.2

## Quick start

Ask Claude Code:

```text
Use the repo-cartographer agent to inspect this repo. Do not edit files.
```

Then:

```text
Use the project-steward agent to compare the repo against PROJECT_BRIEF.md, STATUS.md, PLAN.md, and DECISION_LOG.md. Do not edit files.
```

For a feature:

```text
Use the slice-planner agent to turn the next item in PLAN.md into the smallest safe vertical slice. Do not implement yet.
```

After implementation:

```text
Use the test-verifier agent to run safe verification commands and report commit readiness. Do not edit files.
```

For risky work:

```text
Use the security-reviewer agent to review the recent changes. Do not edit files.
```

At the end:

```text
Use the docs-promoter agent to recommend updates to STATUS.md, PLAN.md, DECISION_LOG.md, docs/, ai/patterns/, and ai/prompts/. Do not edit until I approve.
```

## Minimum useful sequence

For most real projects:

```text
project-steward → slice-planner → implementation → test-verifier
```

Use security and docs agents only when needed.
