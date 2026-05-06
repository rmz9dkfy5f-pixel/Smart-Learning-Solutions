# Repo Planning

## 1. Project Summary

**Smart Learning Solutions** is a static marketing website for a STEM education company delivering hands-on, in-person robotics and physical science workshops for K–12 students. The site's only job is converting visitors into workshop booking enquiries via a Formspree-powered contact form. There is no CMS, no backend, no database, and no authentication.

Current stage: **production / active maintenance.** The site is live and being incrementally improved.

## 2. Repo Strategy

**Classification: Lean website repo.**

This is a hand-coded static site with a single stylesheet, a shared component module, and 8 HTML pages. There is no build process, no framework, no package manager, and no server-side logic. Adding enterprise structure (API contracts, monitoring, migrations, infrastructure-as-code) would introduce complexity with no benefit.

## 3. Documentation Philosophy

- Fewer useful docs over many empty docs
- One source of truth per topic — never two files covering the same decision
- Root files stay minimal; detail lives in `/docs`
- Duplicate files will be actively prevented
- Docs are living references, not task checklists

## 4. Required Root Files

| File | Purpose | Why Root | What Stays Out |
|---|---|---|---|
| `README.md` | Local dev quickstart and project overview | Entry point for new contributors | Strategy, architecture detail |
| `CLAUDE.md` | Claude Code operating guide | Required at root by Claude Code | Implementation detail |
| `ARCHITECTURE.md` | Technical structure and conventions | Quick reference for structural decisions | Business strategy |
| `CHANGELOG.md` | Release history | Standard open-source convention | Task plans |
| `ROADMAP.md` | Future direction | Quick access for owner | Completed work |
| `DECISIONS.md` | Confirmed decisions log | Quick access for owner and agents | Plans in progress |
| `RELEASE_NOTES.md` | GitHub-style release entries | Owner preference | Changelog prose |
| `COMMIT_NOTES.md` | Full commit log with tags | Owner preference | Strategy |
| `.gitignore` | Ignore rules | Required at root | Everything else |

## 5. Required `/docs` Files

| File | Purpose | Source-of-Truth Responsibility |
|---|---|---|
| `docs/strategy/sls-project-context.md` | Business context, audiences, offerings, constraints | Primary strategy truth — read before any content or copy work |
| `docs/STRATEGY.md` | Structured strategy reference in standard format | Canonical strategy doc; supplements sls-project-context.md |
| `docs/workflow/claude-code-workflow.md` | Claude Code repeatable workflow | Agent operating process |
| `docs/DESIGN.md` | Design system rules and visual direction | Design decisions; read before any CSS or layout work |
| `docs/CONTENT.md` | Content rules and copy guidelines | Copy, tone, CTA strategy; read before any content edits |
| `docs/ACCESSIBILITY.md` | Accessibility expectations | A11y structural rules |
| `docs/PERFORMANCE.md` | Performance rules | Asset and loading rules |
| `docs/TESTING.md` | Manual QA and validation checklist | Test and review process |
| `docs/DEPLOYMENT.md` | Deploy process | Hosting and deployment rules |
| `docs/VERSIONING.md` | Versioning rules | Version bump and release rules |

## 6. Required Workflow / Agent Files

| File | Decision |
|---|---|
| `CLAUDE.md` | **Active** — exists and is the repo operating guide |
| `.claude/settings.json` | **Active** — exists |
| `docs/workflow/claude-code-workflow.md` | **Active** — exists |
| `plans/PLAN_TEMPLATE.md` | **Active** — exists |
| `plans/open-decisions.md` | **Active** — exists |

## 7. Optional Files/Folders to Defer

| File/Folder | Trigger to Add |
|---|---|
| `docs/API.md` / `openapi.yaml` | Only if a backend API is introduced |
| `migrations/` | Only if a database is added |
| `infra/` / `terraform/` | Only if infrastructure-as-code is needed |
| `monitoring/` | Only if uptime or analytics monitoring is added |
| `localization/` | Only if multi-language support is added |
| `docs/SECURITY.md` | If auth, user data, or payment handling is added |
| `CODEOWNERS` | If the project grows to a multi-person team |
| `LICENSE` | If the project becomes open-source |
| `mock-server/` | Not applicable — static site |
| `graphql/` | Not applicable — no API |

## 8. Duplicate Source-of-Truth Prevention

| Topic | Canonical Location | Do Not Duplicate In |
|---|---|---|
| Business strategy | `docs/strategy/sls-project-context.md` | Root docs or other `/docs` files |
| Structured strategy | `docs/STRATEGY.md` | Any other file |
| Technical architecture | `ARCHITECTURE.md` | `docs/` |
| Design system | `docs/DESIGN.md` | `ARCHITECTURE.md` |
| Content/copy rules | `docs/CONTENT.md` | `CLAUDE.md` |
| Versioning rules | `docs/VERSIONING.md` | `CHANGELOG.md` |
| Agent workflow | `CLAUDE.md` + `docs/workflow/claude-code-workflow.md` | Anywhere else |
| Release history | `RELEASE_NOTES.md` | `CHANGELOG.md` (these serve different formats) |

## 9. Recommended File Tree

```
/
├── .claude/settings.json
├── .gitignore
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CLAUDE.md
├── COMMIT_NOTES.md
├── CONTRIBUTING.md
├── DECISIONS.md
├── README.md
├── RELEASE_NOTES.md
├── ROADMAP.md
├── docs/
│   ├── ACCESSIBILITY.md
│   ├── CONTENT.md
│   ├── DEPLOYMENT.md
│   ├── DESIGN.md
│   ├── PERFORMANCE.md
│   ├── STRATEGY.md
│   ├── TESTING.md
│   ├── VERSIONING.md
│   ├── strategy/
│   │   └── sls-project-context.md
│   └── workflow/
│       └── claude-code-workflow.md
├── plans/
│   ├── open-decisions.md
│   ├── PLAN_TEMPLATE.md
│   └── YYYY-MM-DD-task-name.md
├── design/
│   ├── README.md
│   ├── wireframes/README.md
│   └── references/README.md
├── programs/
│   ├── coding-with-robots.html
│   └── pstem.html
├── src/
│   ├── css/main.css
│   ├── js/components.js
│   └── images/
├── index.html
├── workshops.html
├── about.html
├── book.html
├── contact.html
├── resources.html
├── 404.html
├── robots.txt
└── sitemap.xml
```

## 10. Agent Execution Rules

- Inspect before editing — never assume the repo matches the plan
- Read `CLAUDE.md` and relevant canonical docs before any non-trivial change
- Create or update a plan in `plans/` before non-trivial work begins
- Do not create duplicate source-of-truth files
- Update `ARCHITECTURE.md` when structural decisions change
- Do not delete existing work without stating why
- Do not create new docs unless clearly justified — challenge unnecessary structure
- Preserve project intent — booking enquiries are the only conversion goal
- Validate after each slice: check the page loads, links resolve, and no regressions exist

## 11. First Implementation Step

The repo scaffold is already in place. The next recommended step is completing the missing `/docs` files (`STRATEGY.md`, `DESIGN.md`, `CONTENT.md`, `ACCESSIBILITY.md`, `PERFORMANCE.md`, `TESTING.md`, `DEPLOYMENT.md`, `VERSIONING.md`) with project-specific content so agents have complete reference material before making content or code changes.
