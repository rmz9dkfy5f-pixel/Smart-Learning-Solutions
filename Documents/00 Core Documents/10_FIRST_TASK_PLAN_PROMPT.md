Create the first dated task plan at:

`plans/2026-04-28-initial-project-docs.md`

This plan is for completing the initial project documentation setup after scaffolding.

Before writing the plan:
- read `CLAUDE.md`
- read `docs/STRATEGY.md`
- read `ARCHITECTURE.md`
- read `plans/PLAN_TEMPLATE.md`
- inspect the current repo structure
- do not edit implementation code

# Task

Create a plan to fill in and validate the initial project documentation set.

The plan should cover only documentation setup, not source-code changes.

# Scope

In scope:
- review scaffolded docs
- identify placeholder docs
- fill in missing project-specific information
- ensure docs do not duplicate each other
- confirm source-of-truth responsibilities
- update `CLAUDE.md` if repo rules need clarification
- update `docs/workflow/claude-code-workflow.md` if process rules need clarification
- update `plans/open-decisions.md` with unresolved decisions

Out of scope:
- source-code implementation
- redesign
- dependency installation
- deployment changes
- API creation
- database work
- large repo restructuring

# Required Plan Structure

# Plan: Initial Project Documentation Setup

## 1. Objective
Create a bounded plan for completing the initial repo documentation after scaffolding.

## 2. Current State
Summarize:
- which scaffold files exist
- which files are placeholders
- which files already contain usable project truth
- which files need owner input

## 3. Source-of-Truth Docs Reviewed
Include:
- `REPO_PLANNING.md`
- `docs/STRATEGY.md`
- `ARCHITECTURE.md`
- `CLAUDE.md`
- `docs/workflow/claude-code-workflow.md`
- `plans/PLAN_TEMPLATE.md`

Mark each as reviewed, missing, placeholder, or needs update.

## 4. Assumptions
List assumptions about the project based only on existing docs.

Do not invent facts.

## 5. Files to Review
List all initial docs that must be inspected.

## 6. Files to Change
List only docs expected to change during this task.

## 7. Slice Plan

### Slice 1: Documentation Inventory
Goal:
Identify which docs exist, which are placeholders, and which are missing.

Validation:
Confirm file paths and duplicate-source-of-truth risks.

### Slice 2: Strategy and Architecture Alignment
Goal:
Make sure `docs/STRATEGY.md` and `ARCHITECTURE.md` do not conflict.

Validation:
List confirmed facts, assumptions, and open questions.

### Slice 3: Claude Operating Rules Alignment
Goal:
Update `CLAUDE.md` and workflow docs so Claude follows the project structure correctly.

Validation:
Confirm workflow references correct files and folders.

### Slice 4: Open Decisions Cleanup
Goal:
Update `plans/open-decisions.md` with unresolved project decisions.

Validation:
Each open decision includes owner, options, recommended default, and whether work can continue.

### Slice 5: Final Documentation Check
Goal:
Verify that each doc has a clear responsibility and no duplicate source-of-truth exists.

Validation:
Produce a final documentation map.

## 8. Validation Plan
Use:
- file path inspection
- duplicate doc check
- source-of-truth check
- placeholder check
- broken reference check
- manual review

## 9. Rollback Plan
Explain how to revert documentation-only edits.

## 10. Risks
Include:
- vague project inputs
- duplicated docs
- placeholder docs mistaken for truth
- Claude rules conflicting with architecture docs
- plans becoming too broad

## 11. Open Questions
List unresolved project decisions.

## 12. Approval Checkpoint
State:
> Approval needed before Slice 1 documentation edits begin.

# Quality Bar

This must be a plan, not execution.
Do not fill the docs yet.
Do not edit source code.
Keep the plan bounded to initial documentation setup.