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

## ADR-015 — Replace Formspree with Web3Forms

**Date:** 2026-07-16
**Version:** unreleased (merged to `main` 2026-07-18 from branch `feat/web3forms-integration`)

### Decision
Replace Formspree with Web3Forms as the production form provider for `book.html` and
`contact.html`, resolving launch blocker C-1/OD-001 (the dead `formspree.io/f/REPLACE_ME`
endpoint). Implementation adds a centralized `src/js/web3forms-config.js` access-key constant,
rewrites both forms' submission flow to `fetch()` against `https://api.web3forms.com/submit`
with a honeypot field and an accessible `role="status"` loading/success/error region, and
removes the old Formspree action URL and `REPLACE_ME` alert guard.

### Reason
Formspree was never actually configured — the endpoint has been a placeholder since inception
and was blocking launch. Web3Forms was chosen and executed per the vault's Web3Forms Migration
Execution Plan (`09_PROMPTS/Claude_Code_Prompts/04_Prompts/web3forms_migration_execution_plan.md`),
which also targets two other AntBrainOS-tracked repos.

### Context
This ADR records the decision as of 2026-07-16; it does not certify the site as launch-ready.
The owner supplied a live Web3Forms access key mid-session and local browser testing (via
`python3 -m http.server`) confirmed the loading and success states render correctly on both
forms. **Update 2026-07-18:** inbox delivery to `info@SmartLearningSolutions.org` is now
confirmed. One item remains genuinely open and is **not** resolved by this ADR: the
deployed-domain verification step (migration plan §11.4) is blocked on OD-003 — the owner is
proposing self-hosting to the client, but this is not yet accepted and no production domain is
live, so there is nothing to test against yet.
See `plans/2026-07-16-web3forms-migration.md` for the full slice-by-slice record.

### Alternatives Considered
- Wait for a Formspree account to be created instead — rejected; Web3Forms was the owner's
  chosen direction and this plan had already been triaged and authorized for this repo.
- Retain Formspree as an active fallback alongside Web3Forms — rejected per the migration
  plan's own non-negotiable decisions; a dead second integration adds no value.

### Consequences
- C-1/OD-001 (Formspree `REPLACE_ME` launch blocker) is resolved at the code level; merged to
  `main` 2026-07-18. Inbox delivery is confirmed.
- `PHASE_GATES.md`/`BACKLOG.md` Gate 1 criteria for form functionality still require the
  deployed-domain test (blocked on OD-003) before they can be fully checked off.
- No visual/content redesign — forms keep their existing fields, labels, and layout.

### See Also
- `09_PROMPTS/Claude_Code_Prompts/04_Prompts/web3forms_migration_execution_plan.md` (AntBrainOS vault)

---

## ADR-016 — Staging Deploy Script Uses an Explicit Path Allowlist, Not a Denylist

**Date:** 2026-07-19
**Version:** v2.25.0

### Decision
`scripts/deploy-staging.sh` deploys to the staging VPS using an explicit allowlist of exactly
which paths are public (7 root HTML pages, `robots.txt`, `sitemap.xml`, `programs/`, `src/`,
`legal/`). It never takes the repo root as a source with exclude patterns layered on top.

### Reason
While investigating why the staging site was serving stale, broken content, a broader
discovery: this repo has repeatedly added new internal top-level directories over time
(`docs/governance`, `docs/project`, `ai/`, `.agents/skills` all arrived together in the v2.19.0
V3.4 migration; `Documents/`, `Planning Documents/`, `.v34_migration_review/`, `sample-data/`
are all git-tracked with no corresponding `.gitignore` entry). A denylist-based deploy approach
has to be remembered and updated every time a new internal path appears — and forgetting fails
*silently*: the new internal directory just gets shipped, with nothing to notice until someone
happens to check. An allowlist fails in the opposite, safe direction: forgetting to add a new
*public* path just means a new page doesn't deploy yet, which is immediately obvious (a 404 on
a page that should exist) rather than a silent internal-docs leak.

### Context
Discovered while executing a much narrower originally-scoped task ("add `.claude/`/`.agents/`
to rsync excludes"). That investigation found no rsync/deploy mechanism was actually tracked in
this repo at all, and that the live staging content was stale by about four weeks — predating
the Web3Forms migration (ADR-015) and the OG-image PNG conversion, with both forms still
POSTing to the dead Formspree endpoint on the live site. See `SLICE_REVIEWS.md` SR-009 for the
full investigation and redeploy record.

### Alternatives Considered
- Denylist (exclude internal paths from a repo-root source) — rejected; this is exactly the
  pattern that let internal directories accumulate unnoticed in git tracking, and the failure
  mode (a forgotten exclusion silently ships internal docs) is the worse direction to fail in.
- Restructure the repo so only a dedicated publish folder holds public assets (`LESSONS_LEARNED.md`
  L-013's originally suggested approach) — rejected for now as a larger, unrequested repo
  restructure; the allowlist script achieves the same safety property without moving any files.
- Git-based deploy (checkout/pull directly on the VPS) — not applicable; confirmed this session
  that the actual deploy mechanism has never been git-based, and switching to one now would be a
  larger, separately-scoped change.

### Consequences
- Adding a new public page/asset requires a one-line addition to `scripts/deploy-staging.sh`'s
  `ROOT_FILES`/`DIRS` arrays — a small, deliberate, visible step.
- R-004 (deploy-root internal-doc exposure) is mitigated for staging; production remains open,
  gated on OD-003 (production host still unconfirmed).
- `docs/DEPLOYMENT.md` §9's rollback section needed correcting — it previously described a
  git-based rollback (`git revert && git push`) that does nothing for this VPS deploy mechanism.

### See Also
- `SLICE_REVIEWS.md` SR-009
- `LESSONS_LEARNED.md` L-013 (resolved), L-016 (new)
- `docs/governance/PROJECT_RISK_REGISTER.md` R-004
- `plans/2026-07-16-web3forms-migration.md` (this repo, same branch)
- ADR-013 (portable-fixes-only / hosting-gated work — same "don't overstate readiness" discipline)

---

## ADR-017 — Client Logo Uses Native Color, Not a Forced Monochrome/Invert Treatment

**Date:** 2026-07-22
**Version:** v2.26.0

### Decision
The client logo (`src/images/brand-logo-mark.png`, cropped from `pics/Logo/Logo.png.avif`) is
used in its native orange/teal color in the header and footer, with no CSS filter applied.

### Reason
The owner's pasted reference image looked like black line art, which would have been invisible
against this site's fully dark (`#060A14`-family) background with no color change — the original
plan called for a CSS `invert()` filter to solve that. But the owner-confirmed actual source file
to use, `pics/Logo/Logo.png.avif` (already git-tracked, added 2026-05-08, never wired in), decoded
via `sips` to a full-color version with real alpha transparency — not black art. A second file in
the same folder, `pics/Logo/169B49B9-553F-4E10-82BC-E5EE7636C266.jpeg` (untracked, opaque white
background, no alpha channel), is the actual black-line-art version matching the pasted
reference, but only `sips` is available locally for image work — no ImageMagick, no PIL — so
reliable chroma-key background removal isn't achievable without a much riskier improvised
approach. Recommended and used the color AVIF instead: its alpha channel composites cleanly with
no white-box-artifact risk, and its orange/teal already closely track the site's existing
`--accent`/icon-badge orange (`#E85D1A`) and `--cyan` design tokens, reading as coordinated rather
than clashing.

### Context
Surfaced to the owner mid-implementation rather than guessing a treatment for a file that turned
out not to match the premise the plan was built on. Owner deferred the color-vs-mono call back to
this session's judgment. See `SLICE_REVIEWS.md` SR-010 and `plans/2026-07-22-implement-client-logo.md`
for the full investigation and implementation record.

### Alternatives Considered
- Force the color AVIF to white/mono via a filter anyway, to match the original plan literally —
  rejected; would discard brand colors that already fit the site's palette, for no contrast
  benefit the native colors don't already provide.
- Background-remove the black JPEG and use it instead — rejected for this pass; not reliably
  achievable with the only tool available (`sips`), and would still need an invert/white-force
  step afterward since black art alone is invisible on this background.
- Ask the client for a dedicated white/light-color export — not pursued; would block this task on
  an external round-trip when the already-available color asset works cleanly.

### Consequences
- The header/footer logo now carries brand color (orange/teal) instead of being purely
  monochrome — a visible departure from the "invert to white" premise in the original plan.
- The unused black-line-art JPEG (`pics/Logo/169B49B9-...jpeg`) remains untracked and unused in
  the repo; a future decision is needed on whether to keep it as a reference or remove it.
- If a monochrome/white treatment is wanted later (e.g. for a dark-on-dark placement this color
  version doesn't suit), it will need either better local tooling (ImageMagick/PIL) or a
  dedicated export from the client.

### See Also
- `SLICE_REVIEWS.md` SR-010
- `plans/2026-07-22-implement-client-logo.md`
- `AUDIT.md` L-2 (resolved as a side effect of this change)
