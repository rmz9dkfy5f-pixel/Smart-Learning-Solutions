# Version Number System

## MAJOR
Breaking changes or production-ready milestone.

**Increments when:**
- Data structure changes (notes format, storage)
- Backward compatibility is broken
- App reaches a "stable, daily-driver" milestone

**Examples:**
- `0.x.x → 1.0.0` (first stable release)
- `1.x.x → 2.0.0` (significant redesign)

## MINOR
New features that do not break existing data.

**Increments when:**
- Adding features (tags, editing, export)
- Adding templates
- UI improvements with the same core behavior

**Examples:**
- `0.0.1 → 0.1.0` (first feature set)
- `1.2.0 → 1.3.0` (new functionality)

## PATCH
Fixes and tweaks only.

**Increments when:**
- Bug fixes
- UI polish
- Performance improvements
- Text/label changes

**Examples:**
- `0.1.0 → 0.1.1`
- `1.0.0 → 1.0.1`

## Versioning Rules (Non-Negotiable)
1. Every release gets release notes.
2. Version number increments even for small changes.
3. No silent changes.
4. Patch != feature.
5. Major versions require migration notes.

This keeps the project:
- Maintainable
- Resume-worthy
- Future-proof

## Optional Naming Convention (Nice Touch)
You can add codenames if you want:
- `v0.0.1` — Foundation
- `v0.1.0` — Edit Ready
- `v0.2.0` — Organized
- `v1.0.0` — Daily Driver

Optional, but professional.

## Final Rules
- Every release gets release notes.
- Major versions need migration notes.
