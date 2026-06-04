# Project Brief — Smart Learning Solutions

## What This Is

Smart Learning Solutions is a STEM education company delivering expert-led, hands-on, in-person workshops for K–12 students. This repository is the company's primary marketing and lead-generation website. Its sole conversion goal is getting visitors to submit a workshop booking enquiry.

## Programs

| Program | Platform | Ages | Structure |
|---|---|---|---|
| **Coding with Robots** | Edison (Microbric) | 5–18 | 4 coding levels: Barcode → EdBlocks → EdScratch → EdPy |
| **PSTEM** | Whybricks | 10–18 | 10 inquiry-based physical science investigation modules |

## Audiences

- **Parents (primary)** — booking for their child or a group; need safety, quality, and educational confidence
- **Schools and Educators** — curriculum-aligned STEM enrichment; need credibility and easy organisation
- **Community Groups** — youth clubs, libraries, holiday programmes

## Confirmed Business Decisions

| Decision | Answer |
|---|---|
| Delivery format | In-person only — no virtual language |
| Primary booker | Parents |
| Pricing | Quote only — no prices on site |
| Booking flow | Enquiry form → email follow-up (Formspree) |
| CMS | None — hand-coded static HTML |

## Tech Stack

| Layer | Choice |
|---|---|
| Pages | Static HTML — no build tool, no framework, no CMS |
| Shared components | ES modules (`src/js/components.js`) |
| Animations | GSAP 3.12.5 (cdnjs CDN) |
| Forms | Formspree (endpoint not yet configured) |
| Analytics | Plausible (injected via components.js) |
| Deployment | Netlify or GitHub Pages (not yet confirmed) |

## Site Structure

10 pages: Home, Workshops, Programs (landing + 2 detail), Resources, About, Book, Contact, 404.

## Credentials

- Licensed Microbric (Edison) partner
- Certified Whybricks PSTEM provider
- Team: professional engineers, coders, and educators
- State-aligned lessons; serving students worldwide

## Contact

- Phone: 1-877-365-SMRT (7678)
- Email: info@SmartLearningSolutions.org

## Detail References

- Business context: `docs/strategy/sls-project-context.md`
- Tech architecture: `ARCHITECTURE.md`
- Current status: `STATUS.md`
- Decisions log: `DECISION_LOG.md` + `DECISIONS.md`
