Create `plans/PLAN_TEMPLATE.md`.

This file is the reusable template for all non-trivial task plans in this repo.

The template must help Claude plan work before editing and keep each task bounded, reviewable, validated, and reversible.

# Required Output

# Plan: [Task Name]

## 1. Objective
State the exact task in one or two sentences.

## 2. Request Summary
Restate the user’s request plainly.

Include:
- what was asked
- what is in scope
- what is out of scope

## 3. Current State
Summarize what currently exists in the repo that matters for this task.

Include:
- relevant files
- relevant implementation
- relevant docs
- known issues

## 4. Source-of-Truth Docs Reviewed
List docs that should be reviewed before work begins.

Examples:
- `CLAUDE.md`
- `docs/STRATEGY.md`
- `ARCHITECTURE.md`
- `docs/DESIGN.md`
- `docs/CONTENT.md`
- `docs/ACCESSIBILITY.md`
- `docs/PERFORMANCE.md`
- `docs/TESTING.md`
- `docs/DEPLOYMENT.md`

Mark each as:
- reviewed
- not needed
- missing
- needs update

## 5. Assumptions
List assumptions being made.

Each assumption should include:
- assumption
- why it is reasonable
- risk if wrong

## 6. Constraints
List task constraints.

Consider:
- scope
- timeline
- design rules
- technical limitations
- accessibility
- performance
- deployment
- compatibility
- user/client requirements

## 7. Files to Review
List files that must be inspected before editing.

Use this format:

| File | Why Review It |
|---|---|

## 8. Files to Change
List expected files to change.

Use this format:

| File | Planned Change | Risk Level |
|---|---|---|

Risk level should be:
- low
- medium
- high

## 9. Slice Plan
Break the task into small slices.

For each slice include:

### Slice [Number]: [Name]

**Goal:**  
[What this slice accomplishes]

**Planned edits:**  
- [edit]
- [edit]

**Files affected:**  
- [file]
- [file]

**Validation:**  
- [command/check]

**Stop condition:**  
[When Claude should stop before continuing]

## 10. Validation Plan
List checks to run.

Examples:
- inspect files manually
- run lint
- run typecheck
- run tests
- run build
- preview locally
- verify links/routes
- check responsive behavior
- check keyboard navigation

## 11. Rollback Plan
Explain how to reverse the task if needed.

Include:
- files to revert
- dependency changes to undo
- config changes to undo
- content/design fallback

## 12. Risks
List risks.

For each risk include:
- risk
- impact
- mitigation

## 13. Open Questions
List questions that may block or affect execution.

For each question include:
- question
- why it matters
- recommended default
- can work continue without it?

## 14. Approval Checkpoint
State what approval is needed before edits begin.

Example:
> Approval needed for Slice 1 before implementation begins.

## 15. Completion Notes
To be filled after execution.

Include:
- what changed
- files changed
- validation run
- validation result
- known follow-up
- next recommended slice

# Template Rules

- Keep plans practical.
- Do not create bloated plans for tiny changes.
- Use this template for non-trivial work only.
- Small fixes may use a shortened version.
- Never let a plan become a substitute for actual validation.