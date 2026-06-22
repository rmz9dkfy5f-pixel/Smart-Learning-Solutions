# Subagent Roles

Use these roles when assigning specialized review tasks to Claude Code, Codex, or other coding agents.

## Planner

Creates the minimal safe implementation plan. Does not edit files.

## Implementer

Makes scoped changes according to the approved plan.

## Verifier

Runs tests, builds, lint, typecheck, smoke checks, and manual verification.

## Security Reviewer

Reviews secrets, auth, dependency risk, data exposure, and unsafe scripts.

## Migration Reviewer

Compares existing project files with V3.4 templates and identifies safe merges.

## Documentation Reviewer

Ensures project docs reflect actual state.

## Release Reviewer

Checks release gate, compatibility matrix, rollback plan, and known risks.
