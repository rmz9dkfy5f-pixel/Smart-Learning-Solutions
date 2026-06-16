# Phase Gates

Phase gates prevent uncontrolled building.

A phase is not complete because work was attempted. It is complete only when gate criteria pass.

---

## Gate 1 — Project Defined

Status:

```text
Not started
```

Pass criteria:

- [ ] Project goal is written.
- [ ] User/operator is identified.
- [ ] Core action is defined.
- [ ] Validation question is written.
- [ ] Smallest useful version is defined.
- [ ] Out-of-scope items are listed.
- [ ] Risks and assumptions are listed.

---

## Gate 2 — First Slice Approved

Status:

```text
Not started
```

Pass criteria:

- [ ] First vertical slice is selected.
- [ ] Slice is small enough to verify.
- [ ] Success criteria are testable.
- [ ] Expected files are listed.
- [ ] Check command is known.
- [ ] Verification method is known.
- [ ] Approval before changes is documented.

---

## Gate 3 — Technical Path Validated

Status:

```text
Not started
```

Pass criteria:

- [ ] Hardest technical uncertainty has been tested.
- [ ] Failure mode is understood.
- [ ] Required access/config/paths are known.
- [ ] Rollback path exists.
- [ ] Findings are documented.

---

## Gate 4 — Minimum Usable Slice Complete

Status:

```text
Not started
```

Pass criteria:

- [ ] Core action works.
- [ ] User/operator can verify behavior.
- [ ] System survives restart if relevant.
- [ ] Errors are visible or documented.
- [ ] `STATUS.md` is updated.
- [ ] `SLICE_REVIEWS.md` is updated.
- [ ] `PROGRESS_NOTE.md` is updated.
- [ ] `COMMIT_NOTES.md` is updated.
- [ ] Changes are committed and pushed if required.

---

## Gate 5 — Reliability Pass

Status:

```text
Not started
```

Pass criteria:

- [ ] Logging exists if needed.
- [ ] Error handling exists.
- [ ] Backup/rollback path exists if relevant.
- [ ] Basic tests or verification commands exist.
- [ ] Security-sensitive defaults reviewed.
- [ ] Known limitations documented.

---

## Gate 6 — Polish and Expansion

Status:

```text
Not started
```

Allowed after this gate:

- UI polish
- extra features
- automation
- dashboard improvements
- multi-user support
- performance tuning
- advanced integrations

Not allowed before this gate unless required by validation.
