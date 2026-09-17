# First-Session Closeout and Receiving-Audit Rehearsal

Run this once, at the end of this project's first real working session — not at install time,
when there is nothing yet to rehearse against. Its purpose is to prove the V3.5 installation
actually supports a clean handoff before anyone depends on that assumption.

## Part A — Closeout Rehearsal

Walk through what a normal session closeout would need, and confirm each item is genuinely
populated (or explicitly marked `TBD`, never silently blank):

- [ ] `docs/project/STATUS.md` reflects the real current state, not the install-time skeleton.
- [ ] `docs/project/DECISION_LOG.md` has an entry for any non-trivial decision made this session.
- [ ] `docs/governance/AGENT_RUN_LOG.md` has a Model Usage Record for this session.
- [ ] `docs/governance/PROJECT_CLASSIFICATION.md` classification is confirmed, not left `TBD`.
- [ ] `docs/governance/REPOSITORY_HANDOFF_CONFIG.md` has real values for every section that
      applies to this classification (others explicitly marked `N/A — <reason>`).
- [ ] Verification commands in `REPOSITORY_HANDOFF_CONFIG.md`'s Validation Contract were actually
      run this session, with results recorded, not merely listed.
- [ ] Branch/commit/upstream/working-tree state (if Git-backed) is recorded accurately.
- [ ] Incomplete or unverified work is named explicitly, not implied by omission.

## Part B — Receiving-Audit Rehearsal

Imagine a different agent or tool, with no access to this session's conversation history, opening
this repository cold. Confirm:

- [ ] `AGENTS.md` alone gives enough context to know where to start.
- [ ] No fact required to safely continue exists only in this session's chat history.
- [ ] No file in this repository states a path, credential, or environment detail as fact that
      was actually only assumed or templated (re-check every `TBD` was either filled or left
      visibly `TBD` — never silently deleted to hide an unconfirmed value).
- [ ] The next recommended task is stated somewhere a cold reader would find it (e.g.
      `docs/project/STATUS.md` or the repository's own handoff file).
- [ ] Any protected paths or do-not-touch areas are stated explicitly, not left to inference.

## Result

```md
## Rehearsal Result: PASS / PASS WITH CONDITIONS / FAIL

- Part A gaps found:
- Part B gaps found:
- Conditions (if any):
- Rehearsed by:
- Date:
```

A `FAIL` means this project is not yet safely handoff-ready — fix the gaps found before treating
any closeout or cross-agent transfer from this repository as reliable.
