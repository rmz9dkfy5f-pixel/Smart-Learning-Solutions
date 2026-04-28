# AGENTS.md

## Project Identity
This repository is the static marketing website for **Smart Learning Solutions** — a STEM education company delivering hands-on, in-person robotics and physical science workshops for K–12 students.

The site's single primary goal is converting visitors into workshop booking enquiries. Every page, section, and CTA should serve that goal. The two flagship programs are **Coding with Robots** (Edison robotics platform) and **PSTEM** (Whybricks inquiry-based physical science). There is no CMS — all content is hand-coded static HTML.

Do not invent decisions that the repository does not support. When strategy is ambiguous, flag it rather than guessing.

## Canonical Repo Structure
Treat this as the source of truth for where things belong:

- `docs/strategy/` — business context, audience definitions, confirmed decisions, strategic reference
- `docs/workflow/` — Codex operating rules for this project
- `plans/` — active task plans, plan template, open decisions log
- `src/css/` — design system (`main.css`)
- `src/js/` — shared components (`components.js`)
- `src/images/` — site imagery

Canonical files:
- `docs/strategy/sls-project-context.md` — primary business and product context
- `docs/workflow/claude-code-workflow.md` — workflow and process rules
- `plans/PLAN_TEMPLATE.md` — template for new task plans
- `plans/open-decisions.md` — decisions pending owner input

File placement rules:
- Strategy and reference docs go in `docs/strategy/`
- Workflow and process docs go in `docs/workflow/`
- Task execution plans go in `plans/` with dated filenames (`YYYY-MM-DD-task-name.md`)
- Do not create duplicate versions of the same doc in multiple folders

## Working Mode
- Start in the repo root
- Read `AGENTS.md` and relevant docs before proposing edits
- Use Plan Mode for any non-trivial task
- Create or update a plan file in `plans/` before making broad edits
- Approve and execute changes in small slices
- Validate after each slice

## Confirmed Decisions (do not re-open without owner instruction)
| Decision | Answer |
|---|---|
| Delivery format | In-person only — no virtual language anywhere on the site |
| Primary booker | Parents (hero and audience selector lead with parent framing) |
| Pricing | Quote only — no prices shown; CTAs say "Request a Workshop" |
| Booking flow | Inquiry form → email follow-up (Formspree) |
| CMS | None — hand-coded static site only |

## Content Rules
- Use direct, plain language tied to real features, outcomes, and audiences
- Do not fabricate metrics, testimonials, results, or capabilities
- Keep CTAs explicit: "Request a Workshop" or "Get a Quote" — not "Buy Now" or "Order"
- No virtual workshop language — all delivery is in-person
- Parent framing is primary; schools and community groups are secondary audiences
- Programs are Coding with Robots (Edison) and PSTEM (Whybricks) — do not rename them

## Editing Guardrails
- Do not rewrite unrelated files
- Do not reformat the entire repo unless explicitly asked
- Do not introduce new dependencies without a clear reason in the plan
- Do not add a CMS, build tool, or framework without explicit owner instruction
- Do not move `components.js` header/footer definitions without updating all page references
- Keep strategy, content, and implementation work logically separated
- Changing the nav requires updating `components.js` — not individual HTML files

## Planning Standard
Every non-trivial plan in `plans/` should include:
- Objective
- Current State
- Files to Review
- Files to Change
- Slice Plan (one slice = one focused change set)
- Validation
- Risks
- Open Questions

## Preferred Execution Pattern
1. Read repo root and relevant docs
2. Summarize current state
3. Create or update a plan in `plans/`
4. Get approval on the plan or first slice
5. Execute one slice
6. Validate (check page in browser, check links, check form)
7. Report what changed, what remains, and any new risks

## Definition of Done
A task is not done until:
- The approved slice is complete
- The changed page loads correctly in a browser (via local server)
- All nav links in the affected page resolve
- No regressions introduced in `components.js` (header/footer)
- Changed files are listed
- The user has been given a clear summary of what changed and what's next
