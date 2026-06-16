# Versioning

Use semantic versioning unless the project has a reason not to.

```text
MAJOR.MINOR.PATCH
```

---

## Version Rules

### Patch

Use patch for:

- bug fixes
- documentation corrections
- small internal improvements
- non-breaking config cleanup

Example:

```text
0.1.0 → 0.1.1
```

### Minor

Use minor for:

- new features
- new vertical slices
- new user/operator workflows
- backwards-compatible additions

Example:

```text
0.1.0 → 0.2.0
```

### Major

Use major for:

- breaking changes
- incompatible data format changes
- major architecture replacement
- removed public behavior

Example:

```text
1.4.2 → 2.0.0
```

---

## Schema Version Rule

Only bump schema version when data format changes.

---

## Release Files

Update these when releasing:

```text
CHANGELOG.md
RELEASE_NOTES.md
STATUS.md
PROGRESS_NOTE.md
COMMIT_NOTES.md
```
