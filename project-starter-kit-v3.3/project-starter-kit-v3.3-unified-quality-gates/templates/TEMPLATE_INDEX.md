# Template Index

Use `templates/project-root/` as the starting structure for a new project.

---

## Required Root Files

- README.md
- PROJECT_BRIEF.md
- CONTEXT.md
- STATUS.md
- PLAN.md
- PHASE_GATES.md
- BACKLOG.md
- ROADMAP.md
- DECISION_LOG.md
- SLICE_REVIEWS.md
- LESSONS_LEARNED.md
- CHANGELOG.md
- RELEASE_NOTES.md
- COMMIT_NOTES.md
- PROGRESS_NOTE.md
- PROGRESS_NOTES.md
- CLAUDE.md
- AGENTS.md

---

## Required Docs Folder

- docs/ARCHITECTURE.md
- docs/VERSIONING.md
- docs/TESTING.md
- docs/SECURITY.md
- docs/API.md
- docs/DATA_MODEL.md
- docs/STATE_MODEL.md
- docs/PERFORMANCE.md
- docs/ACCESSIBILITY.md
- docs/WORKFLOW.md

---

## Required Plans Folder

- plans/PLAN_TEMPLATE.md
- plans/FIRST_SLICE_TEMPLATE.md
- plans/PHASE_REVIEW_TEMPLATE.md


---

## v3 AI Engineering Memory Templates

These templates were added in v3:

```text
templates/project-root/START_HERE.md
templates/project-root/ai/README.md
templates/project-root/ai/ai.config.json
templates/project-root/ai/templates/design_template.md
templates/project-root/ai/templates/api_design_template.md
templates/project-root/ai/templates/feature_template.md
templates/project-root/ai/templates/debug_template.md
templates/project-root/ai/templates/checkpoint_template.md
templates/project-root/ai/templates/ai_prompt_template.md
templates/project-root/ai/templates/pattern_template.md
```

Use them to convert AI conversations into durable project memory.


---

## v3.1 API / Service Design Template

Added from the later document stack:

```text
templates/project-root/ai/templates/api_design_template.md
```

Use it before implementation when a slice touches API routes, auth, database models, caching, queues, scaling, failure scenarios, or observability.

## v3.2 Agent Files

Runtime agent definitions:

```text
templates/project-root/.claude/agents/
```

Human-readable agent docs:

```text
templates/project-root/ai/agents/
```

These files are installed into a project repo when using the v3.2 startup or migration prompts.


## v3.3 Quality Gate Templates

- `DONE_CRITERIA.md` — completion requirements.
- `CHANGE_CONTROL.md` — AI edit boundaries and approval rules.
- `REPO_HEALTH_CHECK.md` — repo baseline and verification status.
- `ROLLBACK_PLAN.md` — undo path for risky changes.
- `PROJECT_RISK_REGISTER.md` — open/closed project risks.
- `ai/agents/AGENT_REVIEW_GATES.md` — required agent reviews by change type.
