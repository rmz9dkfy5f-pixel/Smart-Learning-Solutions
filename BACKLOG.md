# Backlog

Work items not yet scheduled. Grouped by priority.

See `ROADMAP.md` for the long-term direction.
See `plans/open-decisions.md` for items that require owner input before work can begin.
See `PHASE_GATES.md` for the gate criteria that govern when each group becomes active.

---

## Launch Blockers (Gate 1 required)

These must be resolved before the site can go live.

| ID | Item | Owner | Files |
|---|---|---|---|
| C-1 | Configure Formspree endpoint — replace `REPLACE_ME` in both forms | Owner (account creation required) | `book.html`, `contact.html` |
| H-1 | Confirm `/programs/` directory routing on chosen host | Owner (host decision required) | Server config |
| — | Choose and configure production host; point domain | Owner | — |

---

## High Priority (Gate 1 / Gate 2)

| ID | Item | Notes |
|---|---|---|
| M-1 | Convert `og-image.svg` to PNG/JPEG 1200×630 | Social share previews will not render until resolved |
| OD-001 | Formspree endpoint (owner must create account) | Blocks C-1 above |
| OD-003 | Deployment target decision (Netlify or GitHub Pages) | Blocks host setup |

---

## Medium Priority (Post-launch)

| ID | Item | Notes |
|---|---|---|
| H-3 | Pin Plausible analytics URL (version or SRI) | Plausible does not currently support SRI; monitor |
| H-4 | Add timeout fallback to page transition overlay | `.is-navigating` has no safety timer |
| M-4 | Remove inline style blocks where CSS classes are available | Code quality |
| M-5 | Update CSS cache-busting query string to match last-change date | `?v=visual-20260428-navfix` is stale |
| M-7 | Populate `_next` redirect field in `book.html` | Empty field; Formspree uses it for post-submit redirect |
| M-8 | Normalise email casing — `info@smartlearningsolutions.org` | `info@SmartLearningSolutions.org` inconsistent |
| M-9 | Add `<meta name="robots">` to pages that should not be indexed | Staging / thank-you pages |

---

## Deferred (Gate 3 or owner-gated)

| Item | Waiting for |
|---|---|
| Professional Development page | Owner-supplied content |
| Footer social links | Owner confirms active accounts (OD-005) |
| Testimonials section | Owner-supplied real quotes (OD-007) |
| FAQ page | Post-launch if booking questions emerge |

---

See `CHANGELOG.md` for resolved items.
