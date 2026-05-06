# Versioning

**Status:** Active
**What belongs here:** Version bump rules, release note expectations, changelog update process, and version impact labels.
**What does not belong here:** Release history (see `CHANGELOG.md` and `RELEASE_NOTES.md`).

---

## 1. Purpose

This document controls version bumps, release notes, and changelog update expectations for Smart Learning Solutions. Agents must check this file before proposing a version increment.

## 2. Version Format

Semantic versioning: `MAJOR.MINOR.PATCH`

Example: `2.4.0`

## 3. MAJOR Version Rules

Increment MAJOR for breaking changes or significant production milestones.

Increment when:
- Complete visual redesign or design system overhaul
- Structural change to page set or navigation
- Backward-incompatible change to shared components
- New major feature set that changes the site's scope
- Project reaches a new stable production milestone

MAJOR releases must include migration notes in `RELEASE_NOTES.md`.

## 4. MINOR Version Rules

Increment MINOR for new non-breaking additions.

Increment when:
- New page or section added
- New feature or component added
- Animation system extended
- Documentation infrastructure added
- SEO / metadata improvements
- New program content

## 5. PATCH Version Rules

Increment PATCH for fixes and small non-breaking improvements.

Increment when:
- Bug fix
- Copy correction
- CSS polish
- Performance improvement
- Small accessibility improvement
- Link or path fix

## 6. Non-Negotiable Rules

- Every release gets release notes in `RELEASE_NOTES.md`
- No silent version changes
- `PATCH` does not mean feature — do not smuggle features into patch releases
- MAJOR versions require migration notes
- `CHANGELOG.md` must be updated for release-worthy changes
- Version impact must be considered before completing a task plan

## 7. Relationship to Other Files

| File | Role |
|---|---|
| `docs/VERSIONING.md` (this file) | Defines the rules |
| `CHANGELOG.md` | Records what changed in Keep a Changelog format |
| `RELEASE_NOTES.md` | GitHub-style release entries with code names |
| `COMMIT_NOTES.md` | Full commit log with canonical tags |

## 8. Version Impact Labels

Use these labels in task plans and completion notes:

| Label | When to Use |
|---|---|
| `none` | Documentation, planning, or no release impact |
| `patch` | Fix, polish, copy correction, minor cleanup |
| `minor` | New non-breaking feature, page, or section |
| `major` | Breaking change, redesign, or production milestone |

## 9. Tag Naming Standard

All release tags follow this format:

```
vMAJOR.MINOR.PATCH__snapshot-name__commit-HASH
```

Example: `v2.4.0__project-docs-baseline__commit-9e87d2b`

Rules:
- Always prefix with `v`
- Snapshot name uses lowercase kebab-case
- Commit hash is the 7-character short hash
- Every commit with a version bump gets a matching tag

## 10. Release Code Names

Each release has a single proper-word code name (e.g. Signal, Orbit, Obsidian). Code names are included in `RELEASE_NOTES.md` headers.

Format: `## v2.3.0 - 2026-04-28 - Signal`

Code names are optional context — they do not replace version numbers.

## 11. Agent Rules

Agents must:
- Check this file before proposing a version bump
- Update `CHANGELOG.md` when release-worthy changes are made
- Include version impact label in task plans
- Not silently change version numbers
- Not invent release history
- Ask before proposing a MAJOR version bump
- Follow the tag naming standard for all new tags

## 12. Open Questions

| Question | Status |
|---|---|
| Release cadence (ad-hoc vs scheduled) | Ad-hoc — tag when meaningful work ships |
| Pre-1.0.0 strict semver | Moot — project is post-1.0.0 |
| Code name source (themed series?) | Currently informal — open for owner input |
