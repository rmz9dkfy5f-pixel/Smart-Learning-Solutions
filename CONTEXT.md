# Smart Learning Solutions — Context

## Project Identity

Smart Learning Solutions is a STEM education company that delivers expert-led, hands-on, in-person workshops for K–12 students. This website is the company's primary marketing and lead-generation tool. Its sole conversion goal is getting visitors to submit a workshop booking enquiry. Every page, section, and CTA exists to serve that goal.

---

## Programs

| Program | Platform | Age Range | Structure |
|---|---|---|---|
| **Coding with Robots** | Edison robotics (Microbric) | 5–18 | 4 coding levels: Barcode → EdBlocks → EdScratch → EdPy (Python) |
| **PSTEM** | Whybricks inquiry-based learning | 10–18 | 10 investigation modules — real physical science questions |

---

## Audiences

- **Parents (primary)** — booking on behalf of their child or a group; want safe, high-quality, genuinely educational experiences
- **Schools and Educators** — teachers, curriculum coordinators, administrators seeking curriculum-aligned STEM enrichment
- **Community Groups** — youth clubs, libraries, holiday programmes, and community organisations

---

## Confirmed Decisions

| Decision | Answer |
|---|---|
| Delivery format | In-person only — no virtual language anywhere |
| Primary booker | Parents (hero and audience framing leads with parent) |
| Pricing | Quote only — no prices shown on site |
| Booking flow | Enquiry form → email follow-up (Formspree) |
| CMS | None — hand-coded static site only |

Do not re-open these without explicit owner instruction.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Pages | Static HTML — no CMS, no build tool, no framework |
| Animations | GSAP 3.12.5 loaded from cdnjs CDN; ScrollTrigger plugin |
| Form submission | Formspree (endpoint not yet configured — `REPLACE_ME` placeholder) |
| Analytics | Plausible Analytics, injected via `components.js` |
| Fonts | System sans-serif stack; Google Fonts not used |
| Images | WebP, served from `src/images/` (14 files) |

---

## Architecture

### `src/js/components.js`
- Injects shared `<header>` and `<footer>` into every page via `innerHTML`
- Holds the `NAV_LINKS` array — changing nav means editing this file only, not individual HTML files
- Injects the Plausible analytics `<script>` tag
- Sets `body.is-navigating` on link clicks for page transition overlay; cleared on `pageshow`

### `src/js/animations.js`
- Loads after GSAP; silently exits if `window.gsap` or `window.ScrollTrigger` are absent
- Gates the custom cursor behind `body.custom-cursor-enabled` — only applied when GSAP loads AND the device reports `pointer: fine`
- Handles GSAP ScrollTrigger animations for hero, cards, and section reveals

### `src/css/main.css`
- Single design system stylesheet for the full site
- Cache-busted via query string (e.g. `?v=visual-20260428-navfix`)
- Custom cursor styles must remain gated behind `body.custom-cursor-enabled`

---

## Page Inventory

| Location | File | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage — primary conversion page |
| `/workshops` | `workshops.html` | Workshop formats and audience selector |
| `/programs/` | `programs/index.html` | Programs landing page |
| `/programs/coding-with-robots` | `programs/coding-with-robots.html` | Coding with Robots detail |
| `/programs/pstem` | `programs/pstem.html` | PSTEM detail |
| `/resources` | `resources.html` | Resource library |
| `/about` | `about.html` | About the team |
| `/book` | `book.html` | Workshop booking enquiry form |
| `/contact` | `contact.html` | General contact form |
| `/404` | `404.html` | Custom 404 page |

---

## Repo Structure

| Path | Contents |
|---|---|
| `docs/strategy/` | Business context, audience definitions, confirmed decisions |
| `docs/workflow/` | Claude Code operating rules for this project |
| `plans/` | Active task plans, plan template, open decisions log |
| `src/css/` | Design system — `main.css` |
| `src/js/` | Shared components (`components.js`) and animations (`animations.js`) |
| `src/images/` | Site imagery (14 WebP files) |
| `prompts/` | Saved workflow instruction files (commit, update, snapshot) |

---

## Content Rules

- Use plain, direct language tied to real features, outcomes, and audiences
- Do not fabricate metrics, testimonials, results, or capabilities
- CTAs must be explicit: **"Request a Workshop"** or **"Get a Quote"** — not "Buy Now" or "Order"
- No virtual workshop language — all delivery is in-person
- No pricing on the site
- Navigation maximum 7 items; changing nav requires editing `components.js` only
