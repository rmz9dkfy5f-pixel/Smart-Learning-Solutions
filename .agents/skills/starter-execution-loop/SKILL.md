---
name: starter-execution-loop
description: Execute scoped project changes through the Starter Kit inspect, plan, change, verify, document, gate, and decide loop.
---

# Starter Execution Loop

1. Read `AGENTS.md`, the classification, run-type registry, handoff config, done criteria, and
   relevant project files.
2. Select the registered `scoped_change` run type and state its authorized file boundary.
3. Plan objective, files, validation contract checks, risks, rollback, and stop conditions.
4. Make the smallest authorized change; preserve unrelated and user-authored work.
5. Run `quality --execute` or document why a configured check cannot run.
6. Preserve evidence, update continuity files, evaluate the gate, and report PASS,
   PASS_WITH_WARNINGS, PARTIAL, BLOCKED, or FAIL.

Never self-authorize push, merge, tag, deployment, credentials, destructive cleanup, or work
outside the registered mutation boundary.

