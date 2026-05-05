Create `CLAUDE.md` for this repo.

This file is Claude’s repo-specific operating guide. It must define how Claude should behave when working inside this specific project.

Before writing:
- Read `docs/STRATEGY.md`
- Read `ARCHITECTURE.md`
- Read `REPO_PLANNING.md` if it exists
- Do not invent project facts
- Use placeholders only where information is missing
- Flag missing information clearly

# Required Output

# CLAUDE.md

## 1. Project Identity
Summarize what this repo is, who it serves, and what it must stay aligned with.

Include:
- project name
- project type
- primary goal
- target audience
- current stage
- non-negotiable project direction

## 2. Canonical Source-of-Truth Files
Define which files control which decisions.

Use this structure:

| File | Controls | Claude Must Use It For |
|---|---|---|
| `docs/STRATEGY.md` | Business/project direction | Audience, messaging, goals, constraints |
| `ARCHITECTURE.md` | Technical structure | Stack, routing, components, data flow, conventions |
| `docs/DESIGN.md` | Design system | Layout, visual direction, interaction rules |
| `docs/CONTENT.md` | Content rules | Copy, metadata, tone, CTA strategy |
| `docs/ACCESSIBILITY.md` | Accessibility rules | Semantic HTML, keyboard, focus, ARIA |
| `docs/PERFORMANCE.md` | Performance rules | Assets, loading, bundle discipline |
| `docs/TESTING.md` | Testing rules | QA, checks, fixtures, test coverage |
| `docs/DEPLOYMENT.md` | Release/deploy rules | Build, hosting, env vars, rollback |
| `plans/` | Active work plans | Sliced execution and validation |

## 3. Working Mode
Claude must follow this repo workflow:

1. Inspect
2. Plan
3. Get approval when needed
4. Execute one slice
5. Validate
6. Summarize
7. Stop or ask for the next approved slice

For git-related work, use this order:

check → fix → verify → commit → push

Never skip the check step.

## 4. Planning Rules
For non-trivial work:
- create or update a plan in `plans/`
- use `plans/PLAN_TEMPLATE.md`
- define scope before editing
- list files to review
- list files to change
- break work into small slices
- include validation and rollback
- identify open questions

Do not start broad edits without a written plan.

## 5. Editing Guardrails
Claude must not:
- rewrite unrelated files
- create duplicate source-of-truth documents
- move files without updating references
- delete existing work without explaining why
- invent business claims, metrics, testimonials, pricing, or capabilities
- add dependencies without justification
- combine strategy, design, content, and implementation into one uncontrolled edit
- make large unreviewable changes
- modify environment secrets

## 6. Documentation Update Rules
When changing project structure, update:
- `ARCHITECTURE.md`

When changing audience, offer, positioning, or goals, update:
- `docs/STRATEGY.md`

When changing design direction, update:
- `docs/DESIGN.md`

When changing copy/content rules, update:
- `docs/CONTENT.md`

When changing accessibility expectations, update:
- `docs/ACCESSIBILITY.md`

When changing deployment/build process, update:
- `docs/DEPLOYMENT.md`

When changing test strategy, update:
- `docs/TESTING.md`

## 7. Repo Interpretation Rules
Claude must:
- treat strategy docs as project truth, not optional notes
- treat architecture docs as structural truth
- treat plans as temporary execution artifacts
- flag conflicts between docs and implementation
- separate confirmed facts from assumptions
- ask for decisions only when blocked
- otherwise make the smallest safe assumption and label it clearly

## 8. Response Standard
When reporting work, Claude should include:

1. What was inspected
2. What was found
3. What changed
4. Files changed
5. Validation performed
6. Risks or follow-up work
7. Next recommended slice

## 9. Definition of Done
A task is not done until:
- approved scope is complete
- relevant files are updated
- validation has been run or skipped with reason
- changed files are listed
- known risks are stated
- next step is clear

## 10. Project-Specific Rules
Add project-specific rules here.

Examples:
- preserve existing brand direction
- keep pages static unless dynamic behavior is required
- avoid unnecessary dependencies
- prioritize accessibility and performance
- do not fabricate content
- keep client-facing language clear and specific

# Quality Bar

Make this file strict, practical, and specific.
Do not make it motivational.
Do not duplicate the full contents of strategy or architecture docs.
This file controls Claude’s behavior, not the entire project.