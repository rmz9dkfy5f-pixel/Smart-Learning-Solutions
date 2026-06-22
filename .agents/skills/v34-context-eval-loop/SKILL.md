---
name: v34-context-eval-loop
description: Use for prompt engineering, context engineering, eval design, failure analysis, prompt vault workflows, and repeatable AI workflow improvement.
---

# V3.4 Context + Eval Loop

## Purpose

Improve prompts and agent workflows through repeatable testing instead of subjective polishing.

## Loop

```text
Intent → Context → Draft → Run Cases → Score → Tag Failures → Revise → Re-run → Version
```

## Required Sections

For each prompt/workflow, define:

- Purpose
- Target model/tool
- Required context
- Expected input type
- Expected output format
- Pass criteria
- Failure taxonomy
- Test cases
- Version history

## Test Case Minimum

Create at least:

1. Normal case
2. Edge case
3. Bad input case
4. Ambiguous input case
5. High-stakes accuracy case

## Failure Tags

Use tags from `docs/governance/EVALS_AND_FAILURE_LOG.md`.

## Output

```md
# Context/Eval Loop Result

## Target
[Prompt/workflow]

## Version
[Version]

## Test Cases Run
[List]

## Results
| Case | Result | Failure Tags | Notes |
|---|---|---|---|

## Prompt/Workflow Changes
[List]

## Remaining Failure Modes
[List]

## Promotion Decision
Promote / Keep testing / Archive
```
