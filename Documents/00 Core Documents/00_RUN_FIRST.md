# Run First — Project Setup Controller

## Purpose
Read this file first.
This folder contains setup instructions for a target project repo.
Generated project files must be written to the target repo, not this setup folder.
Do not treat README.md or any repo output file as a setup instruction.

## Folder Roles
00_RUN_FIRST.md controls execution order.
core/ contains setup documents the agent executes in order.
reference/ contains source material only and is not executed automatically.
reference/VERSIONING.md is the master reference copy for versioning rules.
The target project repo is where actual project files are created or updated.

## Required Before Starting
Confirm the target repo root.
Confirm this folder is the setup-documents folder.
Inspect the target repo root.
Read this file first.
Execute only the files in core/ in order.
If the target repo root is unclear, stop and ask.

## Execution Order
core/01_REPO_PLANNING.md
core/02_SCAFFOLDING_PROMPT.md
core/03_STRATEGY_PROMPT.md
core/04_ARCHITECTURE_PROMPT.md
core/05_CLAUDE_OS_SPEC.md
core/06_CLAUDE_MD_PROMPT.md
core/07_CLAUDE_WORKFLOW_PROMPT.md
core/08_VERSIONING_PROMPT.md
core/09_PLAN_TEMPLATE_PROMPT.md
core/10_FIRST_TASK_PLAN_PROMPT.md

## Versioning Rule
core/08_VERSIONING_PROMPT.md uses reference/VERSIONING.md as source material.
core/08_VERSIONING_PROMPT.md creates or updates docs/VERSIONING.md in the target repo.
Do not treat reference/VERSIONING.md as the active project versioning file.
Do not create 09_VERSIONING.md in the target repo.
Do not create duplicate versioning files.

## README Rule
README.md is not first.
README.md is not a setup document.
README.md may be created later during scaffolding.

## Stop Conditions
Stop if the target repo root is unclear.
Stop if required core documents are missing.
Stop before overwriting non-empty existing files.
Stop if a destructive or structural change is required.

## Final Report
Report files created, files updated, files skipped, duplicates found, placeholders remaining, validation results, and the next recommended action.