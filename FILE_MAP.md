# File Responsibility Map

Maps every tracked file to its purpose, owner, and edit frequency.

**Owner key:** `Dev` = developer/agent · `Owner` = site owner input required · `Both` = maintained jointly · `Auto` = generated or derived

**Frequency key:** `Session` = updated most commits · `Launch` = updated at launch milestones · `Rarely` = stable reference · `Never` = do not edit

---

## Site Pages

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `index.html` | Homepage — hero, proof strip, program cards, CTA | Dev | Launch |
| `about.html` | About page — credentials, classroom photo, team story | Dev | Launch |
| `workshops.html` | Workshops overview — format cards, audience section | Dev | Launch |
| `book.html` | Booking enquiry form — Formspree POST, validation | Dev + Owner | Launch |
| `contact.html` | Contact page — phone, email, enquiry form | Dev + Owner | Launch |
| `resources.html` | Resources page — links, downloads, reference content | Dev + Owner | Launch |
| `404.html` | Not-found page — recovery path back to homepage | Dev | Rarely |
| `programs/index.html` | Programs landing — two program cards, nav to detail pages | Dev | Launch |
| `programs/coding-with-robots.html` | Coding with Robots detail — Edison, levels, booking CTA | Dev | Launch |
| `programs/pstem.html` | PSTEM detail — Whybricks, inquiry model, booking CTA | Dev | Launch |

---

## Core Assets

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `src/css/main.css` | Design system — tokens, layout, components, utilities | Dev | Launch |
| `src/js/components.js` | Shared header/footer injection, nav, Plausible analytics | Dev | Launch |
| `src/js/animations.js` | GSAP animations — page entry, scroll triggers, cursor | Dev | Launch |
| `src/images/` | Optimised WebP/AVIF production images | Dev + Owner | Launch |
| `og-image.svg` | Open Graph image — editable vector source (rasterized to `og-image.png` for production use) | Dev | Launch |
| `og-image.png` | Open Graph share image (PNG, 1200×630) — referenced by every page's `og:image` tag | Dev | Launch |

---

## Root Reference Docs

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `CLAUDE.md` | Claude Code operating instructions — canonical rules for this repo | Dev | Rarely |
| `AGENTS.md` | Codex/agent instructions — mirrors CLAUDE.md for other agents | Dev | Rarely |
| `CONTEXT.md` | Stable project background — identity, programs, decisions, tech stack | Dev | Rarely |
| `STATUS.md` | Present state — current version, done list, launch blockers, next actions | Dev | Session |
| `AUDIT.md` | Full site diagnostic audit findings (v2.14.3) — severity-classified | Dev | Rarely |
| `PROJECT_BRIEF.md` | One-page synthesis for new sessions — identity, goal, decisions | Dev | Rarely |
| `README.md` | Repo overview — quick-start for new contributors | Dev | Rarely |
| `REPO_PLANNING.md` | Repo strategy, doc philosophy, source-of-truth map | Dev | Rarely |
| `ARCHITECTURE.md` | Technical architecture — how the site is structured and rendered | Dev | Rarely |
| `CONTRIBUTING.md` | Contributor guide — SLS-specific constraints and process | Dev | Rarely |
| `CONTEXT.md` | Stable background reference — project identity, programs, audiences | Dev | Rarely |
| `TASK-polish-and-seo.md` | Legacy root-level task plan (pre-plans/ convention) | Dev | Never |

---

## v2 Planning System Docs

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `PHASE_GATES.md` | Gate criteria (Gate 0–3) and current pass/fail status | Dev | Launch |
| `BACKLOG.md` | Prioritised work items — launch blockers, high priority, deferred | Dev | Session |
| `DECISION_LOG.md` | Canonical decision log from v2.15.0 (ADR-008 onward) | Dev | Rarely |
| `DECISIONS.md` | Historical ADRs (ADR-001 through ADR-007) — preserved, not replaced | Dev | Never |
| `PLAN.md` | Index of the `plans/` directory with one-line summaries | Dev | Session |
| `SLICE_REVIEWS.md` | Slice review records — what changed and how it was validated | Dev | Session |
| `LESSONS_LEARNED.md` | Process, technical, and tooling lessons from past sessions | Dev | Rarely |
| `PROGRESS_NOTES.md` | Cumulative session log index — one entry per version milestone | Dev | Session |
| `PROGRESS_NOTE.md` | Active current-session progress note — overwritten each session | Dev | Session |

---

## Release Tracking Docs

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `CHANGELOG.md` | Human-readable changelog — one entry per version | Dev | Session |
| `RELEASE_NOTES.md` | Narrative release notes — summary + detail per version | Dev | Session |
| `COMMIT_NOTES.md` | Structured commit log — full description + tag + hash per commit | Dev | Session |
| `ROADMAP.md` | Long-term direction — upcoming milestones, deferred features | Dev | Launch |

---

## Configuration & Meta Files

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `sitemap.xml` | XML sitemap for search engines — all public pages | Dev | Launch |
| `robots.txt` | Crawler directives — allow all in production, noindex on staging | Dev | Launch |
| `.gitignore` | Files excluded from version control | Dev | Rarely |
| `.gitattributes` | Git line-ending and diff rules | Dev | Rarely |
| `.env.example` | Documents that no server-side env vars exist; notes REPLACE_ME location | Dev | Rarely |
| `.vscode/settings.json` | Local VS Code workspace settings | Dev | Rarely |

---

## scripts/ Directory

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `scripts/deploy-staging.sh` | Deploys the public site to the staging VPS via an explicit path allowlist (see `docs/DEPLOYMENT.md` §11) | Dev | Per deploy |

---

## docs/ Directory

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `docs/STRATEGY.md` | Business strategy — goals, audiences, value proposition, claims policy | Dev | Rarely |
| `docs/DESIGN.md` | Design system rules — tokens, typography, colour, GSAP guidelines | Dev | Rarely |
| `docs/CONTENT.md` | Copy rules — tone, CTA strategy, program names, metadata, placeholders | Dev | Rarely |
| `docs/ACCESSIBILITY.md` | WCAG 2.1 AA expectations — semantic HTML, keyboard nav, ARIA | Dev | Rarely |
| `docs/PERFORMANCE.md` | Asset loading rules, third-party script policy, image rules | Dev | Rarely |
| `docs/TESTING.md` | Manual QA checklist — pre-commit, per-component, cross-browser | Dev | Launch |
| `docs/DEPLOYMENT.md` | Deploy process, hosting options, security headers, staging noindex | Dev + Owner | Launch |
| `docs/VERSIONING.md` | Semver definitions, tag naming standard, release code name conventions | Dev | Rarely |
| `docs/strategy/sls-project-context.md` | Primary business and product context (canonical strategy reference) | Dev | Rarely |
| `docs/workflow/claude-code-workflow.md` | Claude Code workflow and process rules for this project | Dev | Rarely |

---

## plans/ Directory

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `plans/PLAN_TEMPLATE.md` | Template for new task plans | Dev | Never |
| `plans/open-decisions.md` | Decisions pending owner input (OD-001 Formspree, OD-003 host, etc.) | Both | Launch |
| `plans/2026-04-28-site-audit-remediation.md` | Audit remediation plan (completed) | Dev | Never |
| `plans/2026-05-05-initial-project-docs.md` | Initial doc scaffold plan (completed) | Dev | Never |
| `plans/2026-05-06-polish-and-seo.md` | Polish, SEO, analytics pass (completed) | Dev | Never |
| `plans/2026-05-06-program-prominence-assets.md` | Program prominence and assets plan (completed) | Dev | Never |
| `plans/2026-05-13-site-debug-remediation.md` | Site debug and remediation plan (completed) | Dev | Never |

---

## prompts/ Directory

| File | Purpose | Owner | Frequency |
|---|---|---|---|
| `prompts/Commit notes` | Saved prompt — GitHub commit-style note generation | Dev | Rarely |
| `prompts/Update.md` | Saved prompt — release docs update workflow | Dev | Rarely |
| `prompts/Snapshot` | Saved prompt — Robocopy snapshot instruction | Dev | Rarely |

---

## Legacy / Unmanaged Directories

| Path | Status | Notes |
|---|---|---|
| `Planning Documents/` | Legacy | Pre-v2 planning templates and wireframes — do not edit; kept for reference |
| `pics/` | Legacy | Raw unoptimised photos — originals before WebP/AVIF conversion; not served |
| `Documents/` | Legacy | Claude Code prompt library (00 Core Documents etc.) — superseded by docs/ |
| `design/` | Placeholder | Empty scaffold directories from v2.8.0 — no content yet |
| `sample-data/` | Placeholder | Placeholder README only — no content |
| `.github/` | Templates | PR and issue templates — used if GitHub pull-request workflow is adopted |
