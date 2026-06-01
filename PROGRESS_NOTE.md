**Updated:** v2.15.0 · 2026-05-22

# Progress Note — Current Session

## Milestone
Documentation sync to v2.15.0 — all six release-tracking files updated.
Tag format switched to clean semver going forward.

---

## Tasks Completed

- Updated `CHANGELOG.md` with v2.15.0 entry
- Updated `RELEASE_NOTES.md` with v2.15.0 entry
- Updated `COMMIT_NOTES.md` with v2.15.0 entry (real hash added after commit)
- Updated `PROGRESS_NOTE.md` for current session
- Appended v2.15.0 entry to `PROGRESS_NOTES.md`
- Updated `ROADMAP.md` Completed section
- Tagged commit as `v2.15.0` (clean semver — no slug or hash in tag name)
- Pushed `main` and `v2.15.0` tag to origin
- Created snapshot at `v2.15.0` in WorkSync RepoBackups

---

## Current Baseline

| Hash | Message |
|---|---|
| `b192aff` | docs(release): sync all docs to v2.15.0 |

---

## Current Tag

| Tag | Commit |
|---|---|
| `v2.15.0` | `b192aff` |

---

## Files Changed

| File | Change |
|---|---|
| `CHANGELOG.md` | Added v2.15.0 entry |
| `RELEASE_NOTES.md` | Added v2.15.0 entry |
| `COMMIT_NOTES.md` | Added v2.15.0 entry |
| `PROGRESS_NOTE.md` | Updated current-session state |
| `PROGRESS_NOTES.md` | Appended v2.15.0 cumulative entry |
| `ROADMAP.md` | Added tag format cleanup to Completed |

---

## What's Next

**Launch blockers (owner/ops items):**

1. Configure Formspree — create account, replace `REPLACE_ME` in `book.html` and `contact.html`
2. Choose deployment host and confirm `/programs/` directory routing works
3. Add SRI hashes to GSAP `<script>` tags
4. Fix `.btn { cursor: none }` — prefix with `body.custom-cursor-enabled` in `main.css`

Full audit findings and next actions tracked in `STATUS.md` and `AUDIT.md`.
