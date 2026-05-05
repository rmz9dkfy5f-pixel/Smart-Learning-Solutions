Create `ARCHITECTURE.md` for this project.

Your job is to define the technical and structural truth of the repo so future AI/code agents understand how the project is built, where files belong, and how changes should be made safely.

Do not write implementation code.
Do not invent a tech stack if it is unknown.
Inspect the existing repo before filling this out if code already exists.
Use placeholders where information is missing.
Flag unknowns clearly.

# Required Output

# Architecture

## 1. Architecture Summary
Briefly describe how the project is structured technically.

Include:
- project type
- frontend framework
- backend/API status
- database status
- deployment target
- current maturity level

## 2. Tech Stack
List the confirmed stack.

Use this format:

| Area | Tool/Technology | Status | Notes |
|---|---|---|---|
| Frontend | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Styling | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Backend | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Database | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Hosting | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Testing | [tool] | Confirmed / Assumed / Unknown | [notes] |
| Build Tool | [tool] | Confirmed / Assumed / Unknown | [notes] |

## 3. Repo Structure
Document the approved file/folder layout.

For each major folder include:
- path
- purpose
- what belongs there
- what does not belong there

Example:

| Path | Purpose | Belongs Here | Does Not Belong Here |
|---|---|---|---|
| `/src` | Application source code | Components, pages, logic | Planning docs |
| `/docs` | Project documentation | Strategy, design, testing docs | Source code |
| `/plans` | Task execution plans | Dated plans, open decisions | Permanent architecture docs |

## 4. Routing / Page Structure
Define the route/page model.

Include:
- current routes/pages
- planned routes/pages
- route ownership
- navigation behavior
- deep-linking expectations
- 404/error page expectations

If routing is not applicable, state why.

## 5. Component Architecture
Define how UI/components should be organized.

Include:
- component folder structure
- reusable component rules
- page-level vs shared components
- naming conventions
- prop/data flow expectations
- what should not become a component yet

## 6. Styling / Design System Structure
Define how styling should be handled.

Include:
- CSS strategy
- design tokens if any
- spacing rules
- responsive layout rules
- typography rules
- color usage
- animation/microinteraction rules
- where design references live

## 7. Data Flow and State Management
Define how data and state should work.

Include:
- where data comes from
- static vs dynamic data
- local state rules
- global state rules
- caching rules
- form state rules
- optimistic updates if applicable

If the project is static, state that clearly.

## 8. API / Backend Contract
Define backend/API status.

Include:
- whether an API exists
- whether an API is planned
- where API contracts should live
- request/response schema expectations
- auth requirements if any
- error-handling expectations

If no backend exists, state what would trigger adding `docs/API.md` or `openapi.yaml`.

## 9. Content Architecture
Define how content is stored and edited.

Include:
- hardcoded content vs CMS/content files
- metadata rules
- SEO title/description handling
- image/content asset rules
- content ownership
- when to update `docs/CONTENT.md`

## 10. Accessibility Architecture
Define structural accessibility expectations.

Include:
- semantic HTML rules
- keyboard navigation
- focus management
- color contrast expectations
- ARIA usage rules
- forms and error messages
- when to update `docs/ACCESSIBILITY.md`

## 11. Performance Architecture
Define performance rules.

Include:
- asset loading
- image optimization
- lazy loading
- bundle size expectations
- third-party script rules
- critical rendering concerns
- when to update `docs/PERFORMANCE.md`

## 12. Security Architecture
Define security expectations.

Include:
- secrets handling
- environment variables
- input validation
- auth/authz if applicable
- CSP/XSS concerns
- dependency risks
- when to add `docs/SECURITY.md`

## 13. Testing Strategy
Define how the project should be tested.

Include:
- current test setup
- recommended test types
- what should be tested first
- fixtures/mocks if needed
- manual QA checklist
- when to update `docs/TESTING.md`

## 14. Build and Deployment
Define how the project is built and shipped.

Include:
- local dev command
- build command
- preview command
- deployment target
- environment variables
- rollback expectations
- when to update `docs/DEPLOYMENT.md`

## 15. File and Naming Conventions
Define naming rules.

Include:
- file naming
- folder naming
- component naming
- branch naming if relevant
- commit message style if relevant

## 16. Agent Editing Rules
Define rules for future AI/code agents.

Include:
- inspect before editing
- do not create duplicate architecture docs
- do not move files without updating references
- do not add dependencies without justification
- keep changes small and reviewable
- update this file when structural decisions change
- validate after each meaningful change

## 17. Known Risks / Technical Debt
List current known risks.

For each include:
- risk
- impact
- recommended mitigation
- priority

## 18. Open Architecture Questions
List missing technical decisions.

For each include:
- question
- why it matters
- options
- recommended default
- whether work can continue without it

# Quality Bar

Be specific.
Separate confirmed facts from assumptions.
Do not invent stack details.
Prefer lean architecture over unnecessary abstraction.
Document decisions that prevent future drift.