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
- [ ] Formspree endpoint configured — `REPLACE_ME` replaced in `book.html` and `contact.html` (C-1)
- [x] `.btn { cursor: none }` gated behind `body.custom-cursor-enabled` in `main.css` (C-2)
- [ ] Deployment host confirmed and `/programs/` directory routing verified (H-1)
- [x] SRI hashes added to GSAP CDN `<script>` tags (H-2)
- [ ] Production domain pointed and SSL confirmed
- [ ] Forms tested end-to-end on production URL
- [ ] Navigation tested on production URL
- [ ] Open Graph metadata verified (og:image resolves)
- [ ] Privacy policy published and footer link added (`legal/privacy-policy.md` draft exists; owner placeholders pending)

### Known Issues at Gate 1
- **Hosting platform unconfirmed** (R-003): owner indicated the site "may go on Wix" — Wix cannot host this hand-coded static repo as-is. This gates host-specific work (security headers/CSP, clean-URL routing, deploy-root exclusion) and renders most code-level fixes throwaway until the platform is known. See ADR-013 and L-012.

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
- [ ] `og-image.svg` converted to PNG/JPEG 1200×630 (M-1)
