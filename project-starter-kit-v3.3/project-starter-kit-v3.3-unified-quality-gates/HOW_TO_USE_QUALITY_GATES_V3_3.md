# How to Use Quality Gates v3.3

Use the quality gates to stop AI work from drifting into uncontrolled edits.

## Daily Use

Before work:

1. Read `STATUS.md` and `PLAN.md`.
2. Check `CHANGE_CONTROL.md` if the task touches risky files.
3. Use `ai/agents/AGENT_REVIEW_GATES.md` to decide whether an agent review is required.

After work:

1. Check `DONE_CRITERIA.md`.
2. Update `STATUS.md` and `PLAN.md`.
3. Update `PROJECT_RISK_REGISTER.md` if a risk was found or closed.
4. Update `ROLLBACK_PLAN.md` if the work was risky.
5. Verify before commit.

## Existing Projects

For Prompt Vault, client websites, homelab repos, or any project with code already present, use the existing-project migration prompt.

Do not use the new-repo startup prompt on an active project.

## The Main Rule

The AI may recommend cleanup, but it should not perform cleanup without approval.
