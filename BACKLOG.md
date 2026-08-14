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
| C-1 | ~~Configure Formspree endpoint — replace `REPLACE_ME` in both forms~~ — **Resolved 2026-07-16, merged to `main` 2026-07-18**: migrated to Web3Forms with a live access key in `src/js/web3forms-config.js`; inbox delivery confirmed | — | `book.html`, `contact.html` |
| H-1 | ~~Confirm `/programs/` directory routing on chosen host~~ — **Resolved v2.16.1**: nginx `try_files` fixed on staging VPS; `/programs/` returns 301→200 correctly | — | — |
| — | **Confirm hosting platform** — self-hosting on the existing VPS (74.208.9.49) proposed to the client 2026-07-18 (OD-003); not yet accepted. Wix remains a risk only if the client rejects the proposal (R-003, ADR-013) | Owner/Client | — |
| — | Point production domain to VPS (74.208.9.49) — **pending client acceptance of self-host proposal** | Owner | DNS |

---

## High Priority (Gate 1 / Gate 2)

| ID | Item | Notes |
|---|---|---|
| M-1 | ~~Convert `og-image.svg` to PNG/JPEG 1200×630~~ — **Resolved 2026-07-18**: rendered via headless Chromium, `src/images/og-image.png` now referenced on all 9 pages | Social share previews will not render until resolved |
| OD-003 | Deployment target decision (self-host proposed, pending client acceptance) | Blocks host setup |

---

## Medium Priority (Post-launch)

| ID | Item | Notes |
|---|---|---|
| H-3 | ~~Pin Plausible analytics URL (version or SRI)~~ — **Superseded 2026-07-23**: owner chose to replace Plausible ($9/mo) with a free privacy-friendly alternative rather than keep pinning it. Google Analytics considered and rejected (would require a cookie-consent banner + privacy-policy rewrite for this site). **Cloudflare Web Analytics attempted twice, blocked both times**: dashboard "Add a site" wizard bug (2026-07-23, reproduced again 2026-08-12) plus a second, independent blocker on the documented API-bypass path (2026-08-13) — no scoped API token permission for Web Analytics/RUM write access could be found, and the Global API Key fallback needs `info@SmartLearningSolutions.org` inbox access the owner does not currently have. **Paused, not abandoned** — resume once that credential access exists; GoatCounter remains the fallback if Cloudflare keeps blocking after that | Provider not yet installed — see `DECISION_LOG.md` ADR-020, ADR-023 |
| ~~H-4~~ | ~~Add timeout fallback to page transition overlay~~ — **Resolved 2026-07-22 (v2.26.1)**: `NAVIGATION_TIMEOUT_MS` (4000ms) fallback timer added to `initPage()` in `src/js/components.js`; force-clears `.is-navigating`/`overflow` if the `pageshow` listener never fires. See `SLICE_REVIEWS.md` SR-013 | `.is-navigating` previously had no safety timer |
| M-4 | Remove inline style blocks where CSS classes are available | Code quality |
| ~~M-5~~ | ~~Update CSS cache-busting query string~~ | Resolved v2.18.0: token updated to `?v=mobile-20260619c` across all 10 files |
| ~~M-7~~ | ~~Populate `_next` redirect field in `book.html`~~ — **Closed 2026-07-22, not applicable**: both forms submit via JS `fetch()` with `e.preventDefault()`, never performing a native POST/redirect, so a `_next`/redirect field would be inert. The field itself no longer exists — removed during the Web3Forms/AJAX migration (v2.23.0). See `DECISION_LOG.md` ADR-018 | Superseded by the Web3Forms AJAX implementation |
| M-8 | Normalise email casing — `info@smartlearningsolutions.org` | `info@SmartLearningSolutions.org` inconsistent — **hold until hosting platform confirmed** |
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
