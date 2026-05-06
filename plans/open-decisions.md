# Open Decisions

Decisions pending owner input. Nothing in this list should be resolved by Claude without explicit instruction.

---

## OD-001 — Formspree Endpoint
**Status:** Still open — owner confirmed not yet available (2026-04-24)
**Blocking:** Forms going live — `REPLACE_ME` placeholder remains in both files
**Question:** What is the Formspree form endpoint URL for the workshop enquiry form and contact form?
**Action required:** Create a Formspree account at formspree.io, create a form, and replace `REPLACE_ME` in `book.html` and `contact.html` with the endpoint URL (e.g. `https://formspree.io/f/YOUR_ID`).
**Files affected:** `book.html`, `contact.html`

---

## OD-002 — Hero Photography
**Blocking:** v1.2.0 (imagery)
**Question:** What image(s) should be used in the homepage hero section and on program pages?
**Context:** The hero currently has no image — the navy background with gradient is functional but the wireframe called for "one strong hero image or montage, premium photography style."
**Action required:** Provide image file(s) and confirm placement.
**Files affected:** `index.html`, `src/css/main.css` (hero background), `src/images/`

---

## OD-003 — Deployment Target
**Blocking:** v1.4.0 (go live)
**Question:** Will the site be deployed to Netlify or GitHub Pages?
**Context:** Both are free. Netlify supports clean URLs (no `.html`) and form handling natively. GitHub Pages is simpler but requires extra config for clean URLs.
**Recommendation:** Netlify — easier setup, better clean URL support, and Netlify Forms is an alternative to Formspree if preferred.
**Action required:** Choose a platform and confirm.

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
