# Starter Kit Improvement Plan

This plan improves the existing project-planning starter kit without deleting its strengths.

---

## Hard Truth

The existing kit is strong, but it risks becoming too heavy.

It contains useful planning prompts and reference templates, but it needs a cleaner separation between:

```text
starter kit files
```

and

```text
active project files
```

Without that separation, every project can become a documentation maze before it becomes a working system.

---

## What To Keep

Keep these ideas from the existing kit:

- run-first instructions
- repo planning prompt
- scaffolding prompt
- strategy prompt
- architecture prompt
- Claude operating rules
- Claude workflow prompt
- versioning prompt
- plan template prompt
- first task planning prompt
- project file generator
- Codex/Claude bridge concept
- reference architecture/testing/security docs

---

## What To Improve

### 1. Separate Starter Kit From Project Output

The starter kit should live separately from the actual project.

Bad:

```text
/project-name
  entire-starter-kit/
  app-code/
```

Better:

```text
project-starter-kit-v2/
actual-project/
```

The actual project should receive only the project-root template and relevant docs.

---

### 2. Add Missing Execution Files

Add these as first-class files:

```text
PROJECT_BRIEF.md
PHASE_GATES.md
BACKLOG.md
SLICE_REVIEWS.md
LESSONS_LEARNED.md
STATUS.md
CONTEXT.md
```

These files make project execution visible.

---

### 3. Keep Mandatory GitHub Tracking Files

These must stay in every project:

```text
COMMIT_NOTES.md
PROGRESS_NOTE.md
PROGRESS_NOTES.md
```

`COMMIT_NOTES.md` and `PROGRESS_NOTE.md` are GitHub-specific and must be kept unconditionally.

---

### 4. Keep Long-Term Planning

Keep:

```text
ROADMAP.md
```

But use it correctly.

`ROADMAP.md` is not the active build plan.

Use:

```text
PLAN.md = active work
ROADMAP.md = long-term direction
BACKLOG.md = prioritized queue
```

---

### 5. Add Approval Gates

Claude Code and Codex must not make file changes until approval is given.

Add this rule to:

```text
CLAUDE.md
AGENTS.md
core-prompts/04_APPROVAL_BEFORE_CHANGES_PROMPT.md
```

---

## Recommended Action

Use this v2 kit as the new default.

Do not delete the old kit immediately.

Keep it as an archive until this v2 has been used successfully on at least two projects.

---

## Success Criteria

The improved starter kit is successful when:

- a new project can be started in under 10 minutes
- Phase 1 can be completed without coding
- Claude/Codex know not to change files without approval
- the first vertical slice is clear
- status/progress/commit tracking are obvious
- long-term roadmap and short-term execution do not conflict
