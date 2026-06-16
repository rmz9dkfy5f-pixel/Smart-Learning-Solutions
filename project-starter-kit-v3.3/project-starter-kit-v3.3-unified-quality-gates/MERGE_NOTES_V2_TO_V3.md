# Merge Notes — v2 Project Starter Kit + New AI Engineering Design

## Verdict

The two systems are complementary, not competing.

- Project Starter Kit v2 is strong at **project governance**.
- The new design is strong at **AI context hygiene**.

The merged v3 system keeps v2 as the project-control layer and adds `/ai` as the AI-memory layer.

---

## What v2 Did Well

- Phase 1 vs Phase 2 separation
- Approval before file changes
- Vertical-slice planning
- GitHub progress and commit tracking
- Claude Code and Codex role separation
- Root source-of-truth files
- Validation-first execution
- Check → fix → verify → commit → push loop

---

## What the New Design Adds

- One problem per chat
- One clean result per file
- AI session templates
- Debug session templates
- Feature implementation logs
- Clean context checkpoints
- Reusable prompts
- Reusable engineering patterns
- Better recovery from context drift

---

## Main Conflict

If copied directly on top of v2, the new design makes the system too heavy.

The fix is separation:

```text
Root files = current project truth
/docs = stable technical documentation
/plans = active and historical slice plans
/ai = AI session memory, checkpoints, prompts, and patterns
```

---

## Main Change From v2

v2 said every project should keep many root files unconditionally.

v3 keeps that for serious GitHub-backed projects, but adds a smaller MVP starting set for small projects.

This prevents the project-control system from becoming heavier than the project itself.

---

## New Rule

Every meaningful AI-assisted session must end with one of these:

- updated project-control file
- feature session file
- debug session file
- checkpoint
- pattern
- prompt
- slice review
- commit note

If nothing durable comes out of the session, the session probably did not create lasting project value.
