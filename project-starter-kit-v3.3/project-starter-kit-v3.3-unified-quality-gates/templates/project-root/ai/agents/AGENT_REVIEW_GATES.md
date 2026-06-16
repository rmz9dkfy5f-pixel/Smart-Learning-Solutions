# Agent Review Gates

This file defines when sub-agents should be used and what they must produce.

Sub-agents are not decoration. Use them when they reduce risk or sharpen decisions.

## Default Rule

Use the fewest agents needed.

For ordinary work, use no more than 2–3 agents:

1. one planning or diagnosis agent
2. one verification agent
3. one documentation/security agent only if needed

## Mandatory Review Gates

| Change type | Required agents | Reason |
|---|---|---|
| New repo setup | `repo-cartographer`, `project-steward` | Understand repo and align with project files |
| Existing repo migration | `repo-cartographer`, `project-steward`, `docs-promoter` | Preserve existing work and avoid doc pollution |
| New feature | `slice-planner`, `test-verifier` | Keep scope tight and verify outcome |
| Bug fix | `debugger`, `test-verifier` | Isolate root cause and prove fix |
| Auth/security change | `security-reviewer`, `test-verifier` | Reduce exposure and regression risk |
| API/data model change | `slice-planner`, `security-reviewer`, `test-verifier` | Control schema, surface area, and behavior |
| Deployment/client website change | `security-reviewer`, `test-verifier`, `docs-promoter` | Avoid production/client-facing mistakes |
| Major refactor | `repo-cartographer`, `slice-planner`, `test-verifier` | Prevent broad uncontrolled edits |
| End of long AI session | `docs-promoter` | Promote durable knowledge and create clean checkpoint |

## Agent Invocation Order

### New Repo

```text
repo-cartographer → project-steward → slice-planner → implementation → test-verifier → docs-promoter
```

### Existing Repo Migration

```text
repo-cartographer → project-steward → migration → docs-promoter → test-verifier if commands exist
```

### Bug Fix

```text
debugger → implementation → test-verifier → docs-promoter
```

### Security-Sensitive Work

```text
slice-planner → security-reviewer → implementation → test-verifier → security-reviewer if needed
```

## Required Agent Output

Every agent report must include:

- scope reviewed
- files inspected
- evidence
- findings
- risks
- recommended next action
- what not to change

## Fail Conditions

Stop and ask for approval if any agent finds:

- source-of-truth conflict
- unclear repo state
- missing verification path
- auth/security risk
- destructive operation needed
- broad refactor outside approved scope
- existing work likely to be overwritten
- secret or private credential exposure

## Review Summary Format

Use this format in final summaries:

```text
Agent reviews run:
- repo-cartographer: pass / warnings / fail
- project-steward: pass / warnings / fail
- slice-planner: pass / warnings / fail
- debugger: pass / warnings / fail
- test-verifier: pass / warnings / fail
- security-reviewer: pass / warnings / fail
- docs-promoter: pass / warnings / fail

Blocking issues:
Remaining risks:
Recommended next action:
```

## Anti-Bloat Rule

Do not call every agent for every task. That wastes context and creates noise.

Use agent gates based on risk, not habit.
