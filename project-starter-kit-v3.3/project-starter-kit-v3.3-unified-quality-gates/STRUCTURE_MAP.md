# Structure Map — Unified v3

This document explains the starter kit structure and the generated project structure.

---

## Starter Kit Structure

```text
project-starter-kit-v3-unified/
  START_HERE.md
  README.md
  RUN_FIRST.md
  STRUCTURE_MAP.md
  PHASE_1_VS_PHASE_2_GUIDE.md
  HOW_TO_USE_WITH_CLAUDE_AND_CODEX.md

  core-prompts/
    00_START_PROJECT_PROMPT.md
    01_REPO_PLANNING_PROMPT.md
    02_PROJECT_SCAFFOLDING_PROMPT.md
    03_FIRST_TASK_PLAN_PROMPT.md
    04_APPROVAL_BEFORE_CHANGES_PROMPT.md
    05_PHASE_GATE_REVIEW_PROMPT.md
    06_SLICE_REVIEW_PROMPT.md
    07_PROJECT_RESET_REVIEW_PROMPT.md
    08_CLEAN_CONTEXT_RESET_PROMPT.md
    09_PROMOTE_PATTERN_PROMPT.md

  templates/
    project-root/
      START_HERE.md
      README.md
      PROJECT_BRIEF.md
      CONTEXT.md
      STATUS.md
      PLAN.md
      PHASE_GATES.md
      BACKLOG.md
      ROADMAP.md
      DECISION_LOG.md
      SLICE_REVIEWS.md
      LESSONS_LEARNED.md
      CHANGELOG.md
      RELEASE_NOTES.md
      COMMIT_NOTES.md
      PROGRESS_NOTE.md
      PROGRESS_NOTES.md
      CLAUDE.md
      AGENTS.md
      docs/
      plans/
      ai/
        README.md
        ai.config.json
        templates/
        sessions/
        checkpoints/
        prompts/
        patterns/
        reports/
```

---

## Source-of-Truth Rules

| Location | Purpose |
|---|---|
| Root files | Project control, current state, approvals, tracking |
| `docs/` | Stable technical documentation |
| `plans/` | Active or historical slice plans |
| `ai/sessions/` | AI-assisted work-session records |
| `ai/checkpoints/` | Clean context summaries for restarting chats |
| `ai/prompts/` | Reusable prompts |
| `ai/patterns/` | Reusable engineering patterns |
| `ai/reports/` | Audit, review, threat, and resume artifacts |

---

## File Boundaries

Do not duplicate the same truth in multiple places.

| Question | File |
|---|---|
| What is the project? | `PROJECT_BRIEF.md` |
| What is true long-term? | `CONTEXT.md` |
| What is happening now? | `STATUS.md` |
| What is the active plan? | `PLAN.md` |
| What did we decide? | `DECISION_LOG.md` |
| What changed? | `CHANGELOG.md` |
| What will be committed? | `COMMIT_NOTES.md` |
| What did this AI session produce? | `ai/sessions/...` |
| How do we restart cleanly? | `ai/checkpoints/...` |
| What lesson should be reused? | `ai/patterns/...` |
```


## v3.3 Quality Gate Files

```text
DONE_CRITERIA.md                 # what complete means
CHANGE_CONTROL.md                # what AI may edit
REPO_HEALTH_CHECK.md             # baseline repo inspection
ROLLBACK_PLAN.md                 # recovery path
PROJECT_RISK_REGISTER.md         # project risks
ai/agents/AGENT_REVIEW_GATES.md  # when sub-agents are required
```
