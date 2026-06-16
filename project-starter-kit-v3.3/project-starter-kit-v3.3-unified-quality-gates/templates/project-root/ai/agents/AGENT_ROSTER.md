# Agent Roster — Project Starter Kit v3.2

This project uses a small, controlled Claude Code sub-agent layer.

The goal is not to create a giant agent army. The goal is to separate inspection, planning, debugging, verification, security review, and documentation promotion so the main Claude Code session stays clean and controlled.

## Runtime agents

These files live in `.claude/agents/`.

| Agent | Use when | Edits files? |
|---|---|---:|
| `repo-cartographer` | Starting or migrating a repo; need structure, stack, entry points, and risky areas mapped | No |
| `project-steward` | Before implementation; need alignment against project source-of-truth files | No |
| `slice-planner` | A goal is too broad and needs the smallest safe vertical slice | No |
| `debugger` | One bug, failing test, runtime issue, or confusing behavior needs root-cause analysis | No by default |
| `test-verifier` | After changes; need safe checks/tests/build verification | No |
| `security-reviewer` | Auth, data, secrets, APIs, forms, storage, Docker, deployment, or exposure changed | No |
| `docs-promoter` | End of session; decide what should update docs, patterns, prompts, decisions, and status | No by default |

## Human-facing agent docs

These files live in `ai/agents/`.

| File | Purpose |
|---|---|
| `AGENT_ROSTER.md` | Shows what agents exist and when to use them |
| `AGENT_USAGE_RULES.md` | Defines guardrails and common workflows |
| `AGENT_HANDOFF_TEMPLATE.md` | Provides a repeatable format for handing work to an agent |

## Core rule

Sub-agents should usually analyze first and edit never, unless the user explicitly approves a follow-up edit.

The main Claude Code session remains the project lead.
