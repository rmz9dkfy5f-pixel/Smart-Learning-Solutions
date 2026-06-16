# Sub-Agent Workflow Plan — Project Starter Kit v3.2

## Purpose

Version 3.2 adds a controlled Claude Code sub-agent layer to the Project Starter Kit.

The purpose is to improve context control, review quality, debugging discipline, security review, and end-of-session documentation without turning the workflow into an overbuilt agent army.

## What changed from v3.1

v3.1 had the core project system:

```text
Root files = project control
docs/ = approved documentation
plans/ = planning
ai/ = AI memory, templates, checkpoints, prompts, and patterns
```

v3.2 adds:

```text
.claude/agents/ = Claude Code runtime sub-agent definitions
ai/agents/ = human-readable agent usage documentation
```

## Core distinction

| Folder | Purpose |
|---|---|
| `.claude/agents/` | Runtime Claude Code sub-agents |
| `ai/agents/` | Human-readable rules explaining how to use the sub-agents |
| `ai/templates/` | Session, feature, debug, checkpoint, API, prompt, and pattern templates |
| `ai/sessions/` | Work history |
| `ai/checkpoints/` | Clean context resets |
| `docs/` | Approved source-of-truth documentation |

## Agent roster

| Agent | Job | Default posture |
|---|---|---|
| `repo-cartographer` | Map repo structure, stack, entry points, commands, risks | Inspect only |
| `project-steward` | Compare requested work against source-of-truth files | Read-only |
| `slice-planner` | Convert broad goal into smallest safe vertical slice | Read-only |
| `debugger` | Investigate one bug and identify root cause/minimal fix | Diagnostic only |
| `test-verifier` | Run safe checks/tests/build and summarize pass/fail | Bash allowed, no edits |
| `security-reviewer` | Review practical security risks | Read-only |
| `docs-promoter` | Decide what should become durable docs/patterns/prompts | Read-only first |

## Recommended workflow

```text
repo-cartographer → project-steward → slice-planner
→ main Claude Code implementation
→ test-verifier
→ security-reviewer when needed
→ docs-promoter
→ checkpoint
→ commit
```

## Practical rule

For normal work, do not invoke all agents.

Use the smallest set needed:

| Situation | Agents |
|---|---|
| New repo or migration | `repo-cartographer`, `project-steward` |
| Broad task | `slice-planner` |
| Bug | `debugger`, then `test-verifier` |
| Normal feature | `slice-planner`, then `test-verifier` |
| Auth/API/user data/deployment | `security-reviewer`, then `test-verifier` |
| End of long session | `docs-promoter`, then checkpoint |

## Guardrails

1. Main Claude Code remains project lead.
2. Sub-agents analyze first.
3. Sub-agents do not delete files.
4. Sub-agents do not perform broad refactors.
5. Sub-agents do not run deploys, migrations, resets, or destructive commands without explicit approval.
6. Sub-agents should cite file paths and evidence.
7. Docs are not updated from raw AI chatter without review.
8. Use no more than 2–3 agents for a normal task.

## How to invoke

In Claude Code, either ask naturally:

```text
Use the repo-cartographer agent to inspect this repo. Do not edit files.
```

Or use an explicit agent mention if available in your Claude Code UI:

```text
@agent-repo-cartographer inspect this repo and produce a Repo Cartography Report.
```

## Startup/migration integration

The v3.2 startup and migration prompts install:

```text
.claude/agents/
ai/agents/
```

For new repos, the startup prompt can install the full structure.

For existing projects, the migration prompt must not overwrite existing `.claude/agents/` files. It installs missing agents, quarantines conflicts, and produces a review report.

## Success criteria

The sub-agent layer is successful when:

- the main Claude Code chat stays cleaner
- repo startup is faster
- broad tasks become smaller slices
- bugs are investigated one at a time
- verification is separated from implementation
- security-sensitive work gets reviewed before commit/deploy
- useful session knowledge gets promoted without polluting docs

## Failure criteria

The sub-agent layer is failing if:

- every task uses every agent
- agents produce long reports that are never acted on
- implementation happens before planning
- sub-agents make uncontrolled edits
- docs become filled with raw session chatter
- the process slows down small work more than it improves quality

## Recommended baseline

Use v3.2 for serious projects like Prompt Vault, client websites, homelab automation repos, and security/infrastructure work.

For tiny throwaway scripts, v3.2 is probably too much. Use only `STATUS.md`, `PLAN.md`, and maybe `test-verifier`.
