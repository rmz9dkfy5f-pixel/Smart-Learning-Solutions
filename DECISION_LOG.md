# Decision Log

Canonical log of significant architectural and process decisions made during this project.

Historical ADRs (ADR-001 through ADR-007) are in `DECISIONS.md` and are preserved there.
New decisions from v2.15.0 onward are recorded here.

---

## ADR-008 — Adopt v2 Project-Control Planning System
**Date:** 2026-05-16
**Completed:** v2.15.5 · 2026-06-04
**Decision:** Migrate the repo's planning and documentation to the v2 project-control system.
**Context:** The repo had grown to 15+ root-level docs files with overlapping purposes,
no phase gates, no backlog, no lessons-learned record, and no formal decision log.
The v2 system introduces a defined file set, phase gates, a backlog, and a canonical
decision log to bring structure to the pre-launch and post-launch work.
**Options considered:** Keep existing ad-hoc structure; adopt v2 system
**Chosen:** Adopt v2 system
**Reason:** The site is pre-launch and adding structure now costs little; waiting until
post-launch adds it to an already-live maintenance burden.
**Consequences:**
- Positive: clear phase gates; backlog is trackable; lessons are recorded; decisions are findable
- Negative: more files to maintain; some overlap between old and new docs during transition
- Risk: doc maintenance burden if update discipline lapses
**Files added:** PROJECT_BRIEF.md, PLAN.md, PHASE_GATES.md, BACKLOG.md, DECISION_LOG.md,
SLICE_REVIEWS.md, LESSONS_LEARNED.md, PROGRESS_NOTES.md, FILE_MAP.md
**Files updated:** CLAUDE.md, AGENTS.md, STATUS.md, PROGRESS_NOTE.md, COMMIT_NOTES.md,
ROADMAP.md, PROJECT_BRIEF.md, BACKLOG.md, PLAN.md
**Gate 1 fixes (v2.15.3):** C-2 cursor CSS gate, H-2 GSAP SRI hashes, M-2 title em-dash,
M-3 PSTEM image dimensions, M-6 tel: + prefix — all resolved during migration window

---

## ADR-009 — nginx `try_files` Pattern for Static HTML Sites with Clean URLs
**Date:** 2026-06-17
**Version:** v2.16.1

### Decision
Use `try_files $uri $uri/ $uri.html =404` in nginx for this static site, plus
`error_page 404 /404.html` with `location = /404.html { internal; }`.

### Reason
The site uses `.html` files (e.g. `about.html`, `workshops.html`) but links and
users navigate to clean URLs without the extension. Without `$uri.html`, nginx
returns 404 for any clean URL even though the file exists. The custom 404 page
must be declared `internal` to prevent direct access to `/404.html` returning 200.

### Alternatives Considered
- Rename all pages to `index.html` inside subdirectories — rejected as too disruptive
- Use nginx `rewrite` rules — unnecessary; `try_files` handles this cleanly

### Consequences
- All clean URLs resolve correctly
- Custom 404 page served on all unmatched routes
- Pattern must be replicated if site is moved to a new nginx host

---

## ADR-010 — Mobile Nav Becomes a Full-Screen Overlay
**Date:** 2026-06-19

### Decision
Change the open mobile menu from a content-height dropdown panel to a full-screen overlay
(`inset: 0`, solid `--bg` background, `padding-top` clearing the header), and make the header
bar opaque while the menu is open (`body.nav-open .site-header`).

### Reason
On-device screenshots showed page content bleeding through the open menu — the page `<h1>`
behind the transparent header and page content/CTA below the short panel — which read as broken.
The dropdown only covered its own content height. A full-screen overlay fully owns the screen
(matching stripe.com / vercel.com / linear.app), eliminating the bleed-through.

### Alternatives Considered
- Keep the dropdown and add an opaque header + dark scrim behind it — smaller change, but the
  page stays faintly visible behind the dim; rejected in favor of the cleaner overlay (owner choice).

### Consequences
- No page content visible while the menu is open; header opaque on open.
- Menu now closes on link tap and Escape; scroll-lock and `pageshow` reset preserved.
- Purely CSS + existing static template — no new dependency, no user-input innerHTML.
- Shipped with a cache-bust bump (`?v=mobile-20260619`) on `main.css` and `components.js`.

### Related
- Plan: `plans/2026-06-19-mobile-responsive-fixes.md`
- Also in this pass: program-page hero photo crop/radius fixes (CSS only, no decision needed).

---

## ADR-011 — Hamburger Nav Breakpoint Raised to 1100px (Tablet CTA Fix)
**Date:** 2026-06-19

### Decision
Switch the nav from the full desktop horizontal nav to the full-screen hamburger
overlay at **≤1100px** (previously ≤768px). Also normalize the homepage hero
eyebrow to its intended 12px (`--text-xs`) through ≤1100px; desktop (≥1101px) is
unchanged. Added `.header-cta { flex-shrink: 0 }` as belt-and-suspenders.

### Reason
Measured: the full header (logo + 6 nav links + "Request a Workshop" CTA) needs
~1100px to display the CTA label. Between 769–1099px the desktop nav was showing
but flexbox shrank the CTA and `.btn { overflow: hidden }` clipped its label —
severe on iPad portrait (~800–860px), where the button was almost entirely hidden.
Raising the hamburger breakpoint means the desktop nav only appears where it fits.

### Alternatives Considered
- Hamburger only to 1024px — leaves the 1025–1099px band still clipping; rejected.
- Shrink the desktop nav to fit on tablets — nav physically needs ~1127px; cramped
  and unreliable on iPad portrait; rejected.

### Consequences
- iPad portrait + small landscape (≤1100px) use the full-screen overlay menu.
- The compact 12px hero eyebrow is now consistent from phone through tablet.
- Header eyebrow on desktop (≥1101px) intentionally left at its larger 18–20px.
- Related: [[ADR-010]] (mobile nav overlay); plan `plans/2026-06-19-mobile-responsive-fixes.md`.

---

## ADR-012 — Adopt Project Starter Kit V3.4 Agent Operating System
**Date:** 2026-06-21
**Version:** v2.19.0

### Decision
Install Project Starter Kit V3.4 into this repo in MIGRATE_EXISTING_PROJECT mode to establish a dual-agent operating system (governance docs, quality gates, Claude/Codex skills, AI ops layer).

### Reason
The site is being prepared for client sale and production readiness. V3.4 provides a standardised, validated governance layer (`docs/governance/`), agent skill definitions (`.claude/skills/`, `.agents/skills/`), and AI ops infrastructure (`ai/`), making the repo self-documenting and agent-ready for any future maintainer or AI agent.

### Alternatives Considered
- Continue with existing v2 project-control system only — rejected; V3.4 adds governance, skills, and eval infrastructure beyond what v2 provides
- Install V3.4 in NEW_PROJECT mode — rejected; MIGRATE_EXISTING_PROJECT is non-destructive and preserves all existing files

### Consequences
- Positive: repo is now dual-agent compatible (Claude Code + Codex); governance docs installed; skill-based workflows available after Claude Code reload
- Positive: V3.4 validator provides an automated health check going forward
- Neutral: V3.4 installs generic stub docs in `docs/project/` and `docs/governance/` that duplicate root-level equivalents — reconciliation is a documented follow-up, not an immediate requirement
- Risk: AGENTS.md and CLAUDE.md V3.4 candidates in `.v34_migration_review/` require manual review — they should be merged rather than ignored long-term

## ADR-013 — Portable-Fixes-Only Scope / Hold Throwaway-if-Wix Code Work
**Date:** 2026-06-23
**Version:** v2.20.0

### Decision
After the V3.4 production-readiness audit (2026-06-23) surfaced that the site's host is
unconfirmed and the owner indicated it "may go on Wix", restrict immediate work to
host-independent portable fixes only. Hold all code-level fixes (AVIF `<picture>` fallback,
form a11y live region + focus + skip link + `aria-current`, page-transition overlay safety
timer, OG image conversion) until the hosting platform is confirmed.

Portable fixes executed in this window: privacy policy draft added at `legal/privacy-policy.md`
(content survives any platform); README version/staleness corrected; governance stub docs
(`REPO_HEALTH_CHECK.md`, `RELEASE_GATE.md`) filled with real audit findings.

### Context
Wix is a closed website builder. It cannot host a hand-coded static repo (multi-page HTML +
ES-module imports + GSAP CDN + Formspree + JS-injected header/footer). A real move to Wix
means rebuilding in the Wix editor, which discards most code-level work. Code fixes invested
before the platform is confirmed are therefore throwaway under Wix.

### Alternatives Considered
- Continue all code fixes regardless of platform — rejected; wasteful if Wix is chosen
- Halt all work until platform confirmed — rejected; portable doc/content work has value on any platform

### Consequences
- Privacy policy draft is portable and ready regardless of final platform
- Held code fixes are documented in STATUS.md and BACKLOG.md for resumption once platform is known
- Owner must confirm platform before further code investment is recommended
- Risk: platform decision may delay Gate 1 indefinitely if it remains open

### See Also
- R-003 in `docs/governance/PROJECT_RISK_REGISTER.md` (unconfirmed host / Wix incompatibility)
- L-012 in `LESSONS_LEARNED.md` (Wix cannot host hand-coded static sites)
- `STATUS.md` — Production-Readiness Audit section

## ADR-014 — Adopt Mandatory Model Selection Gate
**Date:** 2026-07-10
**Version:** v2.22.0

### Decision
Adopt a mandatory Model Selection Gate: before substantial AI-assisted work, show a Model
Selection Brief (task classification, risk, per-surface routing, VS Code Codex-vs-Claude-Code
choice, execution/escalation plan) and do not begin implementation until it has been shown.
Added `MODEL_SELECTION_GATE.md` (full brief + routing rules) and
`PROMPT_MODEL_SELECTION_GATE.md` (paste-ready prompt form), referenced from `AGENTS.md`,
`CLAUDE.md`, `ai/prompts/TASK_INTAKE.md`, and `docs/governance/AGENT_RUN_LOG.md` (new "Model
Usage Record" section for logging which tool/model/effort was actually used).

### Reason
This repo is now worked by multiple AI tools/surfaces (Claude Code, Codex, potentially others)
across VS Code and standalone. An explicit, shown-every-time gate prevents silently defaulting
to whichever tool is open and makes the model/effort choice auditable per run.

### Context
These files were rolled out repo-wide across ten AntBrainOS-tracked repos on 2026-07-08 as
part of a vault-wide governance pass, and deliberately left uncommitted in each repo pending
individual review. This ADR is that review for Smart Learning Solutions: the diffs are
doc-only and additive, consistent with the pattern applied to the other nine repos.

### Alternatives Considered
- Leave the gate files uncommitted indefinitely — rejected; an unreviewed, uncommitted gate
  doesn't actually gate anything for future sessions or other agents cloning the repo
- Skip the gate for this repo (static marketing site, low architectural complexity) —
  rejected; low complexity doesn't remove the value of an auditable model-choice record

### Consequences
- Every substantial task going forward should show the brief before implementation (see this
  session's own use of it, folded into the same v2.22.0 pass)
- `docs/governance/AGENT_RUN_LOG.md` now has a place to record actual model usage per run —
  currently empty/optional until the next run populates it
- No code, content, or business-decision impact — process/governance only

### See Also
- ADR-012 (Project Starter Kit V3.4 adoption — same category of AI-ops governance tooling)
- `MODEL_SELECTION_GATE.md`, `PROMPT_MODEL_SELECTION_GATE.md`
- AntBrainOS vault: `00_START_HERE/AGENT_HANDOFF.md`, "Model Selection Gate Rollout — 2026-07-08"
