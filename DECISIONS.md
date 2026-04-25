# Decision Log

All significant decisions made during planning and implementation are recorded here.

---

## ADR-001 — No CMS
**Date:** 2026-04-24
**Decision:** Build as a hand-coded static site with no CMS.
**Context:** Owner wants full control over source code, no subscription cost, and no ongoing CMS operations.
**Options considered:** WordPress, Webflow, static site with Contentful, hand-coded HTML
**Chosen:** Hand-coded HTML/CSS/JS
**Reason:** Lowest ongoing cost, full design freedom, fastest page loads, simplest deployment. Content is stable — no editorial team requires a CMS.
**Consequences:**
- Positive: no hosting fees beyond deployment, no CMS lock-in, no plugin vulnerabilities
- Negative: content changes require editing source files directly; no WYSIWYG for the owner
- Risk: maintenance cost rises if many pages are added without a templating system

---

## ADR-002 — Formspree for Form Handling
**Date:** 2026-04-24
**Decision:** Use Formspree (free tier) for booking and contact forms.
**Context:** Static site has no backend. Owner needs form submissions delivered to email.
**Options considered:** Netlify Forms, EmailJS, custom backend endpoint, Formspree
**Chosen:** Formspree
**Reason:** Free tier supports the expected volume; AJAX-friendly; no backend code required; easy to swap out later.
**Consequences:**
- Positive: zero infrastructure; works on any hosting
- Negative: vendor dependency; free tier has submission limits; requires owner to create a Formspree account and replace the `REPLACE_ME` placeholder before going live

---

## ADR-003 — ES Modules for Shared Header/Footer
**Date:** 2026-04-24
**Decision:** Use native ES module imports to inject shared header and footer from `src/js/components.js`.
**Context:** Without a build tool or server-side includes, sharing header/footer across 8 pages requires a client-side approach.
**Options considered:** Copy-paste (no sharing), JS fetch partials, Web Components, ES module template strings
**Chosen:** ES module template strings
**Reason:** Works without a build step; avoids CORS issues with `file://` that affect fetch-based approaches; single source of truth for nav; easy to read and edit.
**Consequences:**
- Positive: one file to update when nav changes; clean module pattern
- Negative: requires a local server for development (does not work with `file://`); header/footer not in HTML source (minor SEO consideration)

---

## ADR-004 — In-Person Only
**Date:** 2026-04-24
**Decision:** All workshops are in-person. No virtual language anywhere on the site.
**Context:** Owner confirmed delivery format.
**Reason:** Accurate representation of the service.

---

## ADR-005 — Quote-Only Pricing
**Date:** 2026-04-24
**Decision:** No prices shown on the site. CTAs use "Request a Workshop" or "Get a Quote."
**Context:** Owner confirmed pricing model.
**Reason:** Customised workshops require custom quotes. Showing prices without context could disqualify leads prematurely.

---

## ADR-006 — Parent-Primary Audience Framing
**Date:** 2026-04-24
**Decision:** Parents are the primary booker. Hero and audience selector lead with parent framing. Schools and community groups are secondary.
**Context:** Owner confirmed who books most often.
**Reason:** Primary audience should feel immediately addressed on first scroll.

---

## ADR-007 — Booking Flow: Form → Email Follow-Up
**Date:** 2026-04-24
**Decision:** Workshop enquiry form submits via Formspree. Owner follows up by email or phone to confirm details.
**Context:** Owner confirmed preferred booking flow.
**Reason:** Keeps flexibility for customised quotes; no need for a booking calendar system.
