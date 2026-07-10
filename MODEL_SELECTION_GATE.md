# Model Selection Gate

Before substantial AI-assisted work begins, show a Model Selection Brief. Do not begin
implementation until the brief has been shown.

## Required Brief

```markdown
## Task
- Requested task:
- Repo/project:
- Expected output:
- Current surface:

## Classification
- Task type:
- Risk: Low / Medium / High / Critical
- Context size: Small / Medium / Large / Repo-wide
- File-change risk: None / Small / Medium / High
- Architecture judgment required: Yes / No

## Routing
| Tool/surface | Visible model | Effort/thinking | Use? | Reason |
|---|---|---|---|---|
| ChatGPT / OpenAI | | | | |
| Codex app | | | | |
| Codex in VS Code | | | | |
| Claude Code in VS Code | | | | |
| Claude Code outside VS Code | | | | |
| Gemini / Google AI Studio | | | | |

## VS Code Choice
- Codex in VS Code: Primary / Fallback / Do not use
- Claude Code in VS Code: Primary / Fallback / Do not use
- Primary VS Code executor:
- Fallback VS Code executor:
- Reason:

## Execution
- Best owner:
- Mode: Plan only / Execute now / Audit first / Split into slices / Escalate
- Escalation trigger:
- One-sentence recommendation:
```

When VS Code is the current surface, show both Codex and Claude Code paths and select a primary
and fallback. Never reduce them to a generic “VS Code” choice.

## Routing Rules

- The actual visible picker is authoritative. Named examples are dated guidance only.
- Use the fastest suitable visible model for routine, low-risk work.
- Use a strong coding model at medium effort for normal implementation.
- Use high effort for difficult diagnosis, broad refactors, or high uncertainty.
- Prefer Codex for focused, implementation-ready slices with clear verification.
- Prefer Claude Code for exploration-heavy, multi-file, context-heavy work.
- Prefer Gemini for large-context or multimodal review and alternate-plan validation.
- Plan or audit first for architecture, security, deployment, credentials, billing, or data loss.

## Current Examples — Verified 2026-07-08

- OpenAI currently recommends GPT-5.5 for most Codex tasks and GPT-5.4-mini for faster, lighter
  work. Codex IDE effort levels are low, medium, and high; start at medium.
- Claude Code supports current aliases such as `sonnet` and `opus`; use the strongest visible
  option justified by task risk.
- Gemini 3 uses dynamic thinking with model-dependent levels; use visible Flash-class options for
  speed and Pro-class options for difficult reasoning.

Official references:

- https://developers.openai.com/codex/models
- https://developers.openai.com/codex/ide/features
- https://docs.anthropic.com/en/docs/claude-code/cli-usage
- https://ai.google.dev/gemini-api/docs/thinking

## Escalation

Escalate after two failed attempts, when the agent starts guessing, scope expands materially,
tests fail without an obvious local fix, or the work reaches high-risk concerns.

## Maintenance

Review monthly and whenever model families, pickers, pricing/limits, or effort controls change.
