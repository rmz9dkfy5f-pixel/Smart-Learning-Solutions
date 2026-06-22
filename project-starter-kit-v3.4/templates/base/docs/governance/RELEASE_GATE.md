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

- Status: PASS / PARTIAL / BLOCKED / FAIL
- Date:
- Approver:
- Notes:
