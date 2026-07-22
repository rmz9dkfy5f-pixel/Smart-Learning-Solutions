**Updated:** 2026-07-22 (M-7 closed as not applicable, no version bump)

# Progress Note — Current Session

## M-7 Closed as Not Applicable (`_next` Redirect Field) (2026-07-22)

### Summary

`BACKLOG.md` M-7 ("populate `book.html`'s `_next` redirect field") was picked up as this
session's task and scoped via the Model Selection Gate before implementing it as originally
written. Investigation found the task's premise no longer matches the current implementation:
both `book.html` and `contact.html` submit via a JS handler that calls `e.preventDefault()` and
posts to Web3Forms with `fetch()` — success is shown in-page via `#form-success`, and no native
form POST or browser navigation ever occurs. A `_next`/redirect field only has an effect on a
native, non-intercepted submission, so adding one would be inert. The literal field AUDIT.md's
original finding described no longer exists in `book.html` at all — it was removed when the form
was rebuilt for the Web3Forms/AJAX migration (v2.23.0). Flagged this to the owner rather than
adding a no-op field; owner chose to close the item outright rather than pursue a real
post-success redirect.

### Work Completed

- Confirmed via direct source inspection: no `_next`/redirect field present in either
  `book.html` or `contact.html`; both use the `preventDefault()` + `fetch()` AJAX pattern.
- `BACKLOG.md` M-7 row struck through and closed.
- `AUDIT.md` M-7 finding (and its priority-table row) marked closed/not-applicable.
- `DECISION_LOG.md` ADR-018 added, recording the decision and alternatives considered.
- `SLICE_REVIEWS.md` SR-012 added.
- `STATUS.md` updated (new session section, Done log, Open Audit Items line corrected — also
  caught and fixed a pre-existing stale reference to M-6, which was actually resolved in v2.15.3).
- `COMMIT_NOTES.md` updated with this session's entry.

### Validation Performed

- `grep` across `book.html`/`contact.html` confirmed no `_next` or `redirect` field/reference
  present anywhere in either form.
- Read both forms' submit handlers directly, confirming `e.preventDefault()` and a `fetch()` POST
  to `https://api.web3forms.com/submit` with an in-page success state — no code path that would
  ever perform a native browser redirect.

### Not Yet Verified / Open

- No confirmed next task remains as of this closure.
- Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
  self-host proposal (OD-003).

### Launch Blockers (unchanged)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
