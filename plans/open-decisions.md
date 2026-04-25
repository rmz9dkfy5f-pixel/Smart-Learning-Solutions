# Open Decisions

Decisions pending owner input. Nothing in this list should be resolved by Claude without explicit instruction.

---

## OD-001 — Formspree Endpoint
**Blocking:** v1.1.0 (form goes live)
**Question:** What is the Formspree form endpoint URL for the workshop enquiry form and contact form?
**Action required:** Create a Formspree account at formspree.io, create a form, and replace `REPLACE_ME` in `book.html` and `contact.html` with the endpoint URL.
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
**Blocking:** v1.3.0 (workshops page)
**Question:** What content should appear on `workshops.html`?
**Context:** The page is currently a placeholder shell. The wireframe described it as "overview of workshop formats, audiences, outcomes, duration options, and booking process."
**Needed from owner:** Session lengths offered, group size range, any format variations (half-day, full-day, multi-session).

---

## OD-005 — Social Media Links
**Blocking:** Footer (currently deferred)
**Question:** Does Smart Learning Solutions have active social media accounts to link in the footer?
**Context:** The footer has a placeholder comment for social links. Currently omitted.
**Action required:** Confirm platform(s) and handle(s), or confirm no social links needed.

---

## OD-006 — Analytics
**Blocking:** v1.4.0 (go live)
**Question:** Should the site include analytics tracking before launch?
**Context:** No analytics are currently implemented. Options include Google Analytics 4 (free), Plausible (paid, privacy-focused), or no tracking.
**Action required:** Confirm preference.
