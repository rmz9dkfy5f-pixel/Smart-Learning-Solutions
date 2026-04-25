# Roadmap

## Goal
A clean, fast, credible marketing site that converts visitors into workshop booking enquiries — with zero ongoing CMS maintenance.

## Success Criteria
- A new visitor understands "STEM workshop provider" in under 5 seconds
- "Request a Workshop" CTA is always visible and functional
- Both program pages are complete with real content
- The booking form submits and delivers email to the owner
- No broken links or 404 pages
- Site passes a basic accessibility and mobile check

---

## Milestones

### v1.0.0 — Foundation ✅ (2026-04-24)
Homepage, all core pages, design system, shared header/footer, booking form shell.

### v1.1.0 — Form Live
- Replace Formspree `REPLACE_ME` with real endpoint in `book.html` and `contact.html`
- Test end-to-end form submission
- Confirm email delivery and auto-reply

### v1.2.0 — Imagery
- Add hero image to homepage
- Add supporting photography to program pages
- Update `about.html` with team or venue photography

### v1.3.0 — Workshops Page Complete
- Write full content for `workshops.html` (formats, session lengths, group sizes, booking process)
- Align with confirmed decisions: in-person only, parent-primary framing, quote-only

### v1.4.0 — Deployment
- Choose deployment target: Netlify or GitHub Pages
- Connect custom domain (smartlearningsolutions.org)
- Confirm HTTPS, clean URLs, and redirect from www

### v2.0.0 — First Major Update (TBD)
Scope to be determined. Possible candidates:
- Professional Development page (if content exists)
- Testimonials section (if reviews are collected)
- FAQ page

---

## Deferred
- Professional Development standalone page — no content yet; defer until content confirmed
- Social media links in footer — placeholder exists; defer until accounts confirmed
- Analytics — not yet added; consider adding before v1.4.0 deployment
- Sitemap.xml / robots.txt — needed before SEO matters; add at v1.4.0

## Blockers
- Formspree endpoint not yet created (blocks v1.1.0)
- Hero photography not yet sourced (blocks v1.2.0)
- Deployment target not yet confirmed (blocks v1.4.0)

See `plans/open-decisions.md` for the full list.
