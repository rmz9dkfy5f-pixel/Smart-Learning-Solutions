# Open Decisions

Decisions pending owner input. Nothing in this list should be resolved by Claude without explicit instruction.

---

## OD-001 — Form Backend (was: Formspree Endpoint)
**Status:** ✅ Resolved 2026-07-16, merged to `main` 2026-07-18 — owner switched providers and supplied a Web3Forms access key directly (not a Formspree endpoint); inbox delivery confirmed 2026-07-18
**Resolution:** Both forms migrated to Web3Forms (`https://api.web3forms.com/submit`). Access key centralized in `src/js/web3forms-config.js`. See `plans/2026-07-16-web3forms-migration.md` and ADR-015.
**Files affected:** `book.html`, `contact.html`, `src/js/web3forms-config.js`

---

## OD-002 — Hero Photography
**Blocking:** v1.2.0 (imagery)
**Question:** What image(s) should be used in the homepage hero section and on program pages?
**Context:** The hero currently has no image — the navy background with gradient is functional but the wireframe called for "one strong hero image or montage, premium photography style."
**Action required:** Provide image file(s) and confirm placement.
**Files affected:** `index.html`, `src/css/main.css` (hero background), `src/images/`

---

## OD-003 — Deployment Target
**Status:** Resolved-for-now, 2026-09-17 — client chose Wix, temporarily. Not a rejection of the self-host proposal; a decision made outside this proposal entirely. See `DECISION_LOG.md` ADR-027.
**Blocking:** v1.4.0 (go live); deployed-domain verification for ADR-015/OD-001 — no longer urgent while the client is on Wix
**Question (superseded):** ~~Will the site be self-hosted, or deployed to Netlify/GitHub Pages?~~ Answered: neither, for now — the client is hosted on Wix until their current subscription contract ends (end date unknown).
**Context:** A staging VPS remains configured (`74.208.9.49`, nginx `try_files` pattern documented in ADR-009 and `docs/DEPLOYMENT.md`) and this repo remains the return-target for whenever the client comes off Wix — it is not being decommissioned. The self-host-on-VPS proposal from 2026-07-18 is not withdrawn, just moot until that return happens.
**Action required:** None right now. Revisit when the subscription end date is known or the client returns off Wix — at that point, re-confirm whether self-host-on-VPS is still the plan.

---

## OD-004 — Workshops Page Content
**Status:** ✅ Resolved (2026-04-24)
**Resolution:** Full page written with real content — session formats (half-day, full-day, programme series), audience sections, program selector cards, 3-step booking process, and CTA band. Content derived from existing site context; no new owner decisions required.

---

## OD-005 — Social Media Links
**Blocking:** Footer (currently deferred)
**Question:** Does Smart Learning Solutions have active social media accounts to link in the footer?
**Context:** The footer has a placeholder comment for social links. Currently omitted.
**Action required:** Confirm platform(s) and handle(s), or confirm no social links needed.

---

## OD-006 — Analytics
**Status:** ✅ Resolved (2026-05-06)
**Resolution:** Use Plausible analytics.
**Context:** Analytics is implemented centrally via `src/js/components.js` and tracks both `smartlearningsolutions.org` and `www.smartlearningsolutions.org`.
**Files affected:** `src/js/components.js`

---

## OD-007 — Testimonials
**Status:** Open
**Blocking:** Trust signal sections on homepage and program pages
**Question:** Are real customer testimonials available to publish on the site?
**Context:** `docs/CONTENT.md` and `docs/STRATEGY.md` both flag testimonials as a missing trust signal. Fabricated testimonials are prohibited. Program and homepage sections currently have no social proof. A placeholder is in place but the section has low impact without real quotes.
**Options:**
- Provide real quotes from parents, schools, or community groups
- Use a "results pending" placeholder until quotes are collected
- Remove the testimonials section until real content is available
**Recommendation:** Collect 2–3 short real quotes with name, role, and context. Even a single genuine testimonial is stronger than a placeholder.
**Action required:** Owner provides testimonial copy and approves attribution.
**Can work continue without it:** Yes — placeholder remains in place.
