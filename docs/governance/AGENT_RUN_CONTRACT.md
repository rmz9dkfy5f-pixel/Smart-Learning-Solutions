# Agent Run Contract

`.starter-kit/run-types.json` is the canonical machine-readable registry. This document preserves
the same operating contract for humans and tools that cannot execute the CLI.

A run type is explicitly invoked, bound to one executor, constrained by supported modes and a
mutation boundary, governed by approvals and stop conditions, and required to produce named
evidence. A supervised default never means scheduled or unattended autonomy.

## Lifecycle

`Candidate → Manual Trial → Verified Procedure → Skillized → Evaluated → Supervised Default`

## Mandatory stop conditions

1. Ambiguous or unauthorized scope.
2. Missing required verification.
3. Dirty or unrelated-change state that blocks a clean unit of work.
4. Destructive or irreversible action without explicit authorization.
5. Conflicting or ambiguous target, destination, or environment.

## Registered run types

| ID | Executor | Modes | Mutation boundary |
|---|---|---|---|
| `repository_intake` | `starter_kit.py inspect` | read-only | none |
| `repository_session_start` | `starter-session-start` | read-only | none |
| `scoped_change` | `starter-execution-loop` | plan/apply | approved task files |
| `repository_session_closeout` | `starter-session-closeout` | plan/apply | continuity and evidence |
| `adoption_audit` | `starter_kit.py adopt-audit` | read-only | none |
| `starter_kit_migration` | `starter-migration-loop` | plan/apply/rollback | Starter Kit files and conflict area |
| `production_readiness_review` | `starter-production-readiness` | read-only/report | reports only |
| `release_candidate_review` | `starter-release-evidence` | read-only/report | reports and release metadata |
| `prompt_context_evaluation` | `starter-context-eval-loop` | read/evaluate | prompt and evaluation artifacts |

Automatic deployment, merge, push, tag, credential mutation, database migration execution,
destructive cleanup, and unattended scheduled agent work are not registered defaults.

