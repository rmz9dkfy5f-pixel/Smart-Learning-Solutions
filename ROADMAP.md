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

## Current Baseline
- Core page set is live in source: Home, Workshops, Programs, Resources, About, Book, and Contact
- Shared navigation, footer injection, canonical tags, Open Graph tags, `robots.txt`, and `sitemap.xml` are in place
- Plausible analytics is implemented centrally in `src/js/components.js`
- The remaining launch blockers are operational and content decisions, not missing site structure

## Milestones

### Next — Launch Readiness
- Replace Formspree `REPLACE_ME` in `book.html` and `contact.html` with the real endpoint
- Choose the production deployment target and complete domain setup
- Test navigation, forms, and metadata on the production host

### Next — Imagery and Trust Signals
- Add team, venue, or workshop photography where approved
- Publish real testimonials if owner-supplied quotes are available

### Next — Post-Launch Expansion
- Add a Professional Development page if content is approved
- Add an FAQ page if common booking questions emerge
- Add footer social links if active accounts are confirmed

---

See `CHANGELOG.md` for completed version history.

See `BACKLOG.md` for deferred items and the full work queue.

See `STATUS.md` for current blockers.
