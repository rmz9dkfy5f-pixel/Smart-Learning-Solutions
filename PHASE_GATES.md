# Phase Gates

Phase gates define the criteria that must be met before the project advances to the next stage.

---

## Gate 0 — Migration Baseline ✓ CURRENT

**Version:** v2.15.0 · 2026-05-16

**Status:** Complete

The project has a complete, pre-launch static site and a v2 project-control planning system in place.

### Criteria Met
- [x] All 10 pages built and internally consistent
- [x] Navigation, sitemap, and canonical tags correct
- [x] Full site diagnostic audit completed (`AUDIT.md`)
- [x] Design system consistent sitewide
- [x] SEO pass complete (canonical, Open Graph, robots.txt, sitemap.xml, Plausible)
- [x] Both booking forms hardened (validation, maxlength, placeholder guard)
- [x] Custom cursor gracefully degrades on non-fine-pointer devices
- [x] Security headers and staging noindex documented (`docs/DEPLOYMENT.md`)
- [x] All v2 planning docs in place (PROJECT_BRIEF, PLAN, PHASE_GATES, BACKLOG, DECISION_LOG, SLICE_REVIEWS, LESSONS_LEARNED, PROGRESS_NOTES)
- [x] Release docs current (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG)

### Known Issues at Gate 0
- C-1: Formspree `REPLACE_ME` — forms non-functional (launch blocker)
- C-2: `.btn { cursor: none }` not gated — buttons lose cursor if GSAP CDN fails
- H-1: `/programs/` routing depends on server DirectoryIndex
- H-2: No SRI on GSAP CDN scripts

---

## Gate 1 — Launch Readiness

**Status:** Not yet reached

The site is ready to go live. All launch blockers are resolved.

### Criteria to Meet
- [x] Formspree endpoint configured — `REPLACE_ME` replaced in `book.html` and `contact.html` (C-1) — **superseded 2026-07-16, merged to `main` 2026-07-18**: migrated to Web3Forms instead of Formspree; both forms wired to a live access key, inbox delivery confirmed (see `plans/2026-07-16-web3forms-migration.md`, ADR-015)
- [x] `.btn { cursor: none }` gated behind `body.custom-cursor-enabled` in `main.css` (C-2)
- [ ] Deployment host confirmed and `/programs/` directory routing verified (H-1)
- [x] SRI hashes added to GSAP CDN `<script>` tags (H-2)
- [x] Nginx security headers applied on staging (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy-Report-Only`) — resolved 2026-07-19 per `docs/DEPLOYMENT.md` §7; production pending domain/HTTPS finalization (OD-003)
- [ ] Production domain pointed and SSL confirmed
- [ ] Forms tested end-to-end on production URL
- [ ] Navigation tested on production URL
- [x] Open Graph metadata verified (og:image resolves) — resolved 2026-07-18: `og-image.svg` rasterized to `og-image.png` (1200×630), all 9 pages' `og:image` tags updated (M-1)
- [ ] Privacy policy published and footer link added (`legal/privacy-policy.md` draft exists; owner placeholders pending)

### Known Issues at Gate 1
- **Hosting platform unconfirmed** (R-003, OD-003): self-hosting on the existing staging VPS (74.208.9.49) was proposed to the client 2026-07-18; not yet accepted. Staging security headers are now applied (2026-07-19); until OD-003 is accepted, remaining host-specific work (clean-URL routing, deploy-root exclusion, production headers) and the deployed-domain verification for C-1/ADR-015 stay gated. Wix remains a fallback risk only if the client rejects the proposal. See ADR-013 and L-012.

---

## Gate 2 — Post-Launch Stabilisation

**Status:** Not yet reached

The site is live and verified in production.

### Criteria to Meet
- [ ] Live URL confirmed and accessible
- [ ] All forms confirmed functional via production submission
- [ ] Plausible analytics confirmed receiving events
- [ ] No console errors on any page in production
- [ ] Mobile layout tested at 375px on production
- [ ] Footer social links added (if owner confirms active accounts — OD-005)
- [ ] Testimonials added (if owner supplies quotes — OD-007)

---

## Gate 3 — Post-Launch Expansion (Deferred)

**Status:** Deferred

### Criteria
- [ ] Professional Development page (pending content approval)
- [ ] FAQ page (post-launch, if booking questions emerge)
