**Updated:** v2.20.0 · 2026-06-25

# Progress Note — Current Session

## v2.20.0 — V3.4 Production-Readiness Audit + Portable Doc/Governance Fixes (2026-06-23–25)

### Summary

Full V3.4 production-readiness audit run across all 10 pages, shared JS/CSS, forms, SEO,
performance, accessibility, and deployment posture. Overall result: **BLOCKED for client
launch** — two hard blockers unchanged from prior audits (Formspree `REPLACE_ME`; host/domain
unconfirmed). A new critical risk surfaced: the owner indicated the site "may go on Wix,"
which cannot host this hand-coded static repo as-is.

Portable fixes only were executed (content + docs; no code changes). All held code fixes are
documented for resumption once the hosting platform is confirmed.

### Work Completed

- **V3.4 production-readiness audit** — full read-only pass; scores and findings documented
  in `docs/governance/REPO_HEALTH_CHECK.md` and `docs/governance/RELEASE_GATE.md`
- **Privacy policy draft** — new file `legal/privacy-policy.md`; covers all data collected via
  forms and Plausible analytics; owner placeholders marked for legal/business details
- **README corrected** — version updated from v2.12.2 → v2.19.0; stale "(not yet added)" image
  note removed
- **STATUS.md updated** — version bumped to v2.20.0; audit section added; Done entry appended;
  ADR/risk/lesson references corrected
- **DECISION_LOG.md** — ADR-013 filled (Wix/portable-fixes-only decision; reserved stub replaced)
- **LESSONS_LEARNED.md** — L-012 (Wix cannot host hand-coded static sites) and L-013
  (deploy-root = repo-root exposes internal docs) appended
- **PHASE_GATES.md** — Gate 1 updated: privacy policy criterion added; Wix hosting risk noted
- **docs/governance/PROJECT_RISK_REGISTER.md** — R-001 closed; R-002 (forms dead), R-003
  (host unconfirmed / Wix incompatible), R-004 (deploy-root exposes internal docs) added
- **BACKLOG.md** — hosting platform confirmation item added as launch blocker; M-7 and M-8
  updated with hold conditions

### Files Changed

| File | Change |
|---|---|
| `README.md` | Version corrected to v2.19.0; stale image note removed |
| `STATUS.md` | v2.20.0 bump; audit section; ADR-013 reference |
| `docs/governance/REPO_HEALTH_CHECK.md` | Filled from empty stub with real audit findings |
| `docs/governance/RELEASE_GATE.md` | Filled from empty stub — status BLOCKED, dated notes |
| `docs/governance/PROJECT_RISK_REGISTER.md` | R-001 closed; R-002, R-003, R-004 added |
| `legal/privacy-policy.md` | New — portable privacy policy draft |
| `DECISION_LOG.md` | ADR-013 added (filled reserved stub) |
| `LESSONS_LEARNED.md` | L-012, L-013 added |
| `PHASE_GATES.md` | Gate 1: privacy policy criterion + Wix risk note |
| `BACKLOG.md` | Hosting blocker item added; M-7, M-8 hold conditions noted |
| `PROGRESS_NOTE.md` | This file |
| `PROGRESS_NOTES.md` | v2.20.0 entry appended |

### Held (throwaway-if-Wix — resume once host confirmed)

- AVIF `<picture>` fallback (`programs/pstem.html` and others)
- Form a11y: live-region success message, focus management, skip link, `aria-current` on nav
- Page-transition overlay safety timer (`.is-navigating` has no fallback)
- OG image SVG → PNG/JPEG 1200×630 conversion

### Launch Blockers (unchanged)

1. **Formspree `REPLACE_ME`** — owner must create account; replace in `book.html` + `contact.html`
2. **Hosting platform unconfirmed** — confirm static hosting or Wix rebuild before further code work
3. **Production domain** — point to VPS after host decision; verify routing end-to-end
