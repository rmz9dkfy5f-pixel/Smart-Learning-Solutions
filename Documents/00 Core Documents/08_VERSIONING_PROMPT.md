# Versioning Prompt

Create or update the active project versioning document at:

`docs/VERSIONING.md`

Do not create `version_number_system.md`.
Do not create `VERSIONING.md` in the repo root.
Do not create duplicate versioning documents.

## Purpose

This document defines how this project handles semantic versioning, release notes, changelog updates, and migration notes.

## Required Content

Create `docs/VERSIONING.md` with these sections:

# Versioning

## 1. Purpose
Explain that this document controls version bumps, release notes, and migration expectations for the project.

## 2. Version Format
Use semantic versioning:

`MAJOR.MINOR.PATCH`

Example:

`1.3.2`

## 3. MAJOR Version Rules
Major versions are for breaking changes or stable production milestones.

Increment MAJOR when:
- data structures change
- backward compatibility breaks
- storage format changes
- public API behavior breaks
- the project reaches a stable daily-driver or production-ready milestone

Major releases must include migration notes.

## 4. MINOR Version Rules
Minor versions are for new features that do not break existing behavior or data.

Increment MINOR when:
- adding features
- adding templates
- adding new pages or flows
- improving UI while keeping the same core behavior
- adding non-breaking functionality

## 5. PATCH Version Rules
Patch versions are for fixes and small non-breaking improvements.

Increment PATCH when:
- fixing bugs
- polishing UI
- improving performance
- changing text or labels
- making small accessibility improvements
- making non-breaking cleanup changes

## 6. Non-Negotiable Rules
- Every release gets release notes.
- No silent changes.
- Patch does not mean feature.
- Major versions require migration notes.
- Version impact must be considered before completing a task.
- Changelog must be updated for release-worthy changes.

## 7. Relationship to CHANGELOG.md
Explain:
- `docs/VERSIONING.md` defines the rules.
- `CHANGELOG.md` records what changed.
- Task plans should identify expected version impact before implementation.

## 8. Version Impact Labels
Use these labels in plans and completion notes:

- `none` — documentation, planning, or no release impact
- `patch` — fix, polish, text, minor cleanup
- `minor` — new non-breaking feature
- `major` — breaking change, migration, or production milestone

## 9. Optional Release Codenames
Optional examples:
- `v0.0.1` — Foundation
- `v0.1.0` — First Feature Set
- `v1.0.0` — Stable Release

Codenames are optional and should not replace version numbers.

## 10. Agent Rules
Future AI/code agents must:
- check this file before proposing a version bump
- update `CHANGELOG.md` when release-worthy changes are made
- include version impact in task plans
- not silently change version numbers
- not invent release history
- ask before major version bumps

## 11. Open Questions
List unresolved versioning decisions, if any.

Examples:
- starting version
- release cadence
- whether pre-1.0.0 versions use strict semantic versioning
- whether codenames are used

## Quality Bar

Keep this document practical.
Do not overcomplicate release management.
Do not duplicate the full changelog.
Do not invent past releases.
Use placeholders only where needed.