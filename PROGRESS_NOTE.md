**Updated:** v2.15.1 · 2026-05-22

# Progress Note — Current Session

## Milestone
Docs update v2.15.1 — tag and document the untagged hash-correction commit `04875a3`.

---

## Tasks Completed

- Identified `04875a3` as pushed but untagged from the prior session
- Added v2.15.1 entries to `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`
- Updated `PROGRESS_NOTE.md` and `PROGRESS_NOTES.md`
- Updated `ROADMAP.md` Completed line
- Tagged `04875a3` as `v2.15.1` (clean semver)
- Pushed `main` and `v2.15.1` tag to origin
- Created snapshot at `v2.15.1` in WorkSync RepoBackups

---

## Current Baseline

| Hash | Message |
|---|---|
| `452812d` | docs(release): sync all docs to v2.15.1 |

---

## Current Tag

| Tag | Commit |
|---|---|
| `v2.15.1` | `04875a3` (prior hash-correction) |
| `v2.15.1` (docs) | `452812d` |

---

## Files Changed

| File | Change |
|---|---|
| `CHANGELOG.md` | Added v2.15.1 entry |
| `RELEASE_NOTES.md` | Added v2.15.1 entry |
| `COMMIT_NOTES.md` | Added v2.15.1 entry |
| `PROGRESS_NOTE.md` | Updated current-session state |
| `PROGRESS_NOTES.md` | Appended v2.15.1 cumulative entry |
| `ROADMAP.md` | Updated Completed line |

---

## What's Next

**Launch blockers (owner/ops items):**

1. Configure Formspree — replace `REPLACE_ME` in `book.html` and `contact.html`
2. Choose deployment host and confirm `/programs/` directory routing works
3. Add SRI hashes to GSAP `<script>` tags
4. Fix `.btn { cursor: none }` — prefix with `body.custom-cursor-enabled` in `main.css`
