# Strategy

**Status:** Active
**What belongs here:** Business direction, audience definitions, goals, value proposition, content strategy, brand direction, constraints, and non-negotiables.
**What does not belong here:** Implementation code, design system detail, task plans, or architecture decisions.

> For the primary business context document see `docs/strategy/sls-project-context.md`.

---

## 1. Project Overview

**Project name:** Smart Learning Solutions
**Project type:** Static marketing website
**Current stage:** Production / active maintenance
**Primary purpose:** Convert visitors into workshop booking enquiries
**What this project is not:** A learning management system, a virtual classroom, a CMS-driven content site, or an e-commerce platform

## 2. Mission / Purpose

> This project exists to convert parents, schools, and community groups into workshop enquiries for Smart Learning Solutions by clearly communicating the quality, safety, and educational value of in-person STEM workshops for K–12 students.

## 3. Primary Goals

| Goal | Desired Outcome | Why It Matters | Success Signal |
|---|---|---|---|
| Conversion | Visitor submits a workshop enquiry | Revenue generation | Formspree submissions received |
| Credibility | Visitor perceives SLS as premium and expert-led | Trust drives enquiries | No generic or template-like design |
| Clarity | Visitor understands "STEM workshop provider" within 5 seconds | Confused visitors leave | Hero passes 5-second test |
| Simplicity | Clean navigation, no dead pages, no content bloat | Friction reduces conversion | 7 nav items max, all links resolve |

## 4. Target Audiences

**Parents (primary)**
- Who they are: Parents booking on behalf of their child or a small group
- What they need: Confidence that the experience is safe, high-quality, and genuinely educational
- Their problem: Hard to evaluate workshop quality from a website alone
- Desired action: Submit a workshop enquiry
- Messaging must avoid: Jargon, virtual language, pricing guesses, empty claims

**Schools and Educators**
- Who they are: Teachers, curriculum coordinators, and school administrators
- What they need: Credible curriculum-aligned STEM enrichment that is easy to organise
- Their problem: Difficulty justifying spend and logistics to school leadership
- Desired action: Request a workshop quote
- Messaging must avoid: Consumer language, vague learning outcomes, playful framing

**Community Groups**
- Who they are: Youth clubs, libraries, holiday programmes, community organisations
- What they need: Flexible STEM activities for mixed ages and skill levels
- Their problem: Finding engaging activities that don't require specialised resources
- Desired action: Make an enquiry or request a quote
- Messaging must avoid: School-only framing, curriculum jargon

## 5. Core Offering / Value Proposition

**Primary offering:** In-person STEM workshops for K–12 students delivered by certified educators and engineers

**Programs:**
1. **Coding with Robots** — Edison robotics platform (Microbric). Four progression levels: Barcode → EdBlocks → EdScratch → EdPy (Python). Ages 5–18.
2. **PSTEM** — Whybricks inquiry-based physical science. Students investigate real questions through 10 hands-on modules. Ages 10–18.

**Strongest differentiator:**
- Licensed partner with Microbric (Edison platform)
- Certified to deliver Whybricks PSTEM program
- Professional and certified engineers, coders, and educators
- State-aligned lessons

**Proof currently available:**
- Partner/certification credentials
- Program structure and progression (demonstrable depth)
- Professional team

**Proof still missing:**
- Student outcome data
- Testimonials (not fabricated — must be real)
- Photography of workshops in action

## 6. Content Strategy

**Tone:** Direct, confident, credible — not playful or generic
**Voice:** Expert practitioner speaking to a concerned parent or decision-making educator
**Reading level:** Accessible to a general adult audience; no jargon without explanation

**Key messages:**
- Hands-on, in-person STEM that students remember
- Real robotics and science — not screen-based activities
- Expert-led and credentialed
- Easy to book for any group size or setting

**CTA strategy:** All CTAs are "Request a Workshop" or "Get a Quote" — never "Buy Now", "Order", or "Start Free Trial"

**Content types:** Page copy, program descriptions, process explanations, credential statements

**Metadata needs:** Unique `<title>` and `<meta description>` per page; Open Graph tags on all pages

**Claims must never include:**
- Fabricated metrics or statistics
- Invented testimonials
- Capabilities not yet confirmed
- Virtual delivery language
- Pricing (quote-only model)

## 7. Brand / Design Direction

**Desired impression:** Premium, expert, trustworthy — science and tech credibility without sterility
**Visual personality:** Dark, high-contrast, confident; GSAP motion for dynamism
**Design qualities to avoid:** Generic educational templates, bright primary colours, clip-art iconography, corporate blandness

## 8. Constraints

- No CMS — all content is in source HTML files
- No virtual workshop language anywhere on the site
- No pricing displayed — quote-only model
- No fabricated metrics, testimonials, or capabilities
- Navigation maximum 7 items
- No new dependencies without justification in a plan
- Formspree endpoints must be replaced before deploying

## 9. Strategic Non-Negotiables

- Do not invent unsupported claims
- All delivery is in-person — remove any virtual language immediately
- Pricing is quote-only — never show numbers
- CTAs are "Request a Workshop" or "Get a Quote" only
- Programs are "Coding with Robots" and "PSTEM" — do not rename them
- Parent framing is primary; educator and community framing is secondary

## 10. Open Questions

| Question | Why It Matters | Owner | Can Work Continue? |
|---|---|---|---|
| Real testimonials available? | Trust signal; can't fabricate | Business owner | Yes — placeholder until provided |
| Workshop photography available? | Hero and program imagery needed | Business owner | Yes — placeholder images for now |
| Formspree endpoint confirmed? | Book and contact forms broken without it | Business owner | Yes — clearly marked REPLACE_ME |
| Target geographic markets? | May affect copy tone and SEO keywords | Business owner | Yes — national/worldwide for now |

## 11. Source-of-Truth Rules

- This file controls business and project direction
- All content and copy work should reference this file before editing
- The companion file `docs/strategy/sls-project-context.md` contains the original project context — both files are authoritative and must not conflict
- If strategy conflicts with implementation, flag the conflict — do not resolve it by guessing
- Do not overwrite strategic uncertainty with invented certainty
