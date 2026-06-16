# 06 — Slice Review Prompt

Use this after each completed vertical slice.

```md
Review the completed slice against the original success criteria.

Do not add features.

Tell me:

1. slice name
2. intended validation goal
3. what passed
4. what failed
5. what files changed
6. what checks were run
7. what was manually verified
8. what risks remain
9. whether scope changed
10. whether the slice should be accepted

Then propose updates to:

- STATUS.md
- SLICE_REVIEWS.md
- PROGRESS_NOTE.md
- PROGRESS_NOTES.md
- COMMIT_NOTES.md
- CHANGELOG.md
- RELEASE_NOTES.md
- LESSONS_LEARNED.md

Recommendation must be one of:

- continue
- fix
- cut scope
- revise
- stop
```
