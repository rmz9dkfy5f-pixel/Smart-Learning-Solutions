# Evals And Failure Log

## Purpose

A prompt, agent workflow, or repo process is not reliable until it is tested against repeatable cases.

## Eval Loop

```text
Define success → Run case → Score output → Tag failure → Revise → Re-run same case → Log result
```

## Failure Taxonomy

- Missing context
- Wrong assumption
- Ignored instruction
- Bad output format
- Weak reasoning
- Hallucinated fact
- Tool misuse
- Validation skipped
- Over-broad change
- Under-scoped fix
- Security risk
- Regression
- Not actionable

## Eval Case Template

| Field | Value |
|---|---|
| Eval ID | EVAL-001 |
| Target prompt/workflow | |
| Input case | |
| Expected behavior | |
| Pass criteria | |
| Result | PASS / FAIL / PARTIAL |
| Failure tags | |
| Fix applied | |
| Re-test result | |

## Eval Log

| Date | Eval ID | Target | Result | Failure Tags | Notes |
|---|---|---|---|---|---|
