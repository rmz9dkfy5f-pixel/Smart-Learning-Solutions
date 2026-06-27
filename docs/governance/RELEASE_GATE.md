# Release Gate

A project is not release-ready until these checks are complete or explicitly waived.

## Release Checklist

### Functionality

- [ ] Core user flows work.
- [ ] Known critical bugs are resolved or accepted.
- [ ] Regression checks completed.

### Quality

- [ ] Tests pass or manual validation is documented.
- [ ] Build passes.
- [ ] Lint/typecheck pass if applicable.
- [ ] No obvious dead files or broken references.

### Security

- [ ] No secrets committed.
- [ ] Dependencies reviewed.
- [ ] Auth/data exposure risks reviewed.

### Compatibility

- [ ] Required OS/device/browser targets checked.
- [ ] Responsive behavior checked where applicable.
- [ ] Accessibility basics checked where applicable.

### Operations

- [ ] Rollback plan exists.
- [ ] Deployment steps documented.
- [ ] Monitoring/logging expectations documented.
- [ ] Release notes written.

## Release Decision

- Status: BLOCKED (not release-ready)
- Date: 2026-06-27 (re-confirmed; first assessed 2026-06-23)
- Approver: Pending owner — assessed by Claude (V3.4 production-readiness audit)
- Notes: Two hard blockers prevent launch: (1) forms wired to `REPLACE_ME` Formspree
  endpoint — owner must create account and replace in `book.html:108` and `contact.html:121`;
  (2) production host + domain not confirmed (Wix incompatibility unresolved per ADR-013).
  Held until host confirmed: security headers (server-level), OG image PNG/JPEG conversion,
  AVIF fallback, form a11y, overlay safety timer, internal-doc exclusion from deploy root.
  Privacy policy draft exists at `legal/privacy-policy.md` — owner must fill placeholders
  and publish. C-2 (cursor CSS gate) confirmed fixed in current code. Re-run this gate after
  blockers are cleared and a live staging verification pass (Lighthouse, responsive,
  cross-browser, screen reader, end-to-end form test) is complete.
