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
- ~~The unused black-line-art JPEG (`pics/Logo/169B49B9-...jpeg`) remains untracked and unused in
  the repo; a future decision is needed on whether to keep it as a reference or remove it.~~
  **Resolved 2026-07-22:** owner chose to keep it — it's the only higher-resolution (552×351 vs.
  the 277×164 AVIF actually used) native mono source of this design. Renamed to
  `pics/Logo/logo-black-line-art.jpeg` and tracked in git (previously untracked under a
  meaningless device-export filename). See `SLICE_REVIEWS.md` SR-011.
- If a monochrome/white treatment is wanted later (e.g. for a dark-on-dark placement this color
  version doesn't suit), `pics/Logo/logo-black-line-art.jpeg` is now the tracked starting point —
  still needs either better local tooling (ImageMagick/PIL) or a dedicated export from the client
  to background-remove it cleanly.

### See Also
- `SLICE_REVIEWS.md` SR-010, SR-011
- `plans/2026-07-22-implement-client-logo.md`
- `AUDIT.md` L-2 (resolved as a side effect of this change)

---

## ADR-018 — M-7 (`book.html` `_next` Redirect Field) Closed as Not Applicable

**Date:** 2026-07-22
**Version:** none (no code change, no version bump)

### Decision
`BACKLOG.md`'s M-7 — "populate `book.html`'s `_next` redirect field" — is closed as not
applicable rather than implemented.

### Reason
Both `book.html` and `contact.html` submit via a JS `submit` handler that calls
`e.preventDefault()` and posts to Web3Forms with `fetch()`; success is shown in-page via
`#form-success`. No native form POST or browser navigation ever occurs. A `_next`/redirect field
only has an effect on a native, non-intercepted form submission — Web3Forms would never see or
act on it here, so adding one would be inert configuration with no observable effect. The
`_next` hidden field that `AUDIT.md`'s original M-7 finding described (`name="_next" value=""`)
no longer exists in `book.html` at all — it was removed when the form was rebuilt for the
Web3Forms/AJAX migration (v2.23.0); M-7's "Formspree uses it for post-submit redirect" framing
predates that migration and no longer describes the current implementation.

### Context
Surfaced during Model Selection Gate scoping for this task rather than adding a field that would
have no effect. Owner chose to close the item outright rather than pursue a real post-success
redirect (e.g., a dedicated thank-you page).

### Alternatives Considered
- Add a real post-success redirect (`window.location.href` to a new thank-you page) — not
  pursued; would require creating a new page and would replace the current in-page
  `#form-success` UX, which is out of scope for what was asked.
- Add the `_next`/redirect field anyway, for documentation/parity with the original audit
  finding — rejected; would be dead configuration with no user-visible effect, which the site's
  own content-accuracy guardrails argue against.

### Consequences
- `BACKLOG.md` M-7 marked closed/not applicable; no functional change to `book.html` or
  `contact.html`.
- `AUDIT.md`'s M-7 finding marked closed, since the field it described no longer exists in the
  current implementation.
- No confirmed next task remains as of this decision.

### See Also
- `BACKLOG.md` M-7
- `AUDIT.md` M-7
- `SLICE_REVIEWS.md` SR-012

---

## ADR-019 — Two-Line Logo Watermark Extends ADR-017's Native-Color Choice; Opacity Set Below Sitewide Convention

**Date:** 2026-07-23
**Version:** v2.27.0

### Decision
The About page's new two-line logo watermark (`src/images/brand-logo-lockup-full.png`) uses the
same native orange/teal color as the header/footer mark (no CSS filter), extending ADR-017's
reasoning. Its background-image opacity is set to 0.08 — below this site's existing 0.09–0.11
decorative-background convention (`.audience-photo-bg`, `.format-card-photo-bg`,
`.cta-band-photo-bg`).

### Reason
ADR-017 already established that this logo's native color composites cleanly (real alpha, no
white-box risk) and already tracks the site's `--accent`/`--cyan` tokens — that reasoning applies
unchanged to a second placement of the same asset family. The opacity choice is new: the mission
column's paragraph text uses `color: var(--text-muted)`, which — independent of this change —
already sits close to the WCAG AA 4.5:1 contrast floor. A hard-edged logo graphic (sharp
letterform/swoosh strokes) sitting behind that text has less room to darken/lighten localized
patches evenly than a smooth photograph would at the same opacity, since the sitewide convention's
proven range was validated against photos, not logo strokes. 0.08 was chosen as a conservative
starting point and confirmed sufficient — not just assumed — via a direct visual legibility check
across all 4 standard breakpoints (375/768/1024/1440px) before shipping, with no patch reading as
harder to read than the rest of the paragraph.

### Context
This is the second use of the same source logo family on the site (following ADR-017's
header/footer placement), and the first use of it as a background element behind body text rather
than as a standalone mark. See `SLICE_REVIEWS.md` SR-014 and
`plans/2026-07-22-two-line-logo-watermark.md` for the full investigation and implementation
record.

### Alternatives Considered
- Match the sitewide 0.09–0.11 decorative-image convention exactly — rejected as the default,
  since that convention was validated against smooth photographs, not a hard-edged logo graphic,
  over already-borderline `--text-muted` text; starting lower and confirming visually was judged
  safer than starting at the photo-convention value and only checking afterward.
- Desaturate/invert the logo for this specific placement (mono/white treatment) — rejected;
  ADR-017 already rejected this for the same asset family for the same tooling-constraint reasons
  (only `sips` available locally, no reliable chroma-key background removal), and at 8% opacity
  hue is barely perceptible against the near-black background regardless — the visible signal is
  overwhelmingly luminance/silhouette, not color.

### Consequences
- The same brand color treatment now appears twice on the About page (small in the header/footer,
  large and faint in the mission section) — reinforces brand recognition rather than fragmenting
  it across two different color treatments.
- If a future placement needs a different (e.g. lighter/whiter) treatment,
  `pics/Logo/logo-black-line-art.jpeg` remains the tracked starting point noted in ADR-017 — still
  blocked on better local tooling or a dedicated client export for clean background removal.

### See Also
- ADR-017
- `SLICE_REVIEWS.md` SR-014
- `plans/2026-07-22-two-line-logo-watermark.md`

---

## ADR-020 — Replace Plausible With a Free Analytics Provider; Google Analytics Rejected; Cloudflare Web Analytics Attempted and Blocked

**Date:** 2026-07-23
**Version:** none (no code change, no version bump)

### Decision
`BACKLOG.md` H-3 (originally "pin the Plausible analytics URL") is superseded: the owner chose to
replace Plausible ($9/mo) with a free, privacy-friendly analytics provider instead of continuing
to maintain it. Google Analytics was considered and explicitly rejected. Cloudflare Web Analytics
was the first replacement attempted; its account was created, but the onboarding flow could not be
completed due to a reproducible product bug. No provider swap has shipped yet — Plausible remains
the live provider in `src/js/components.js` as of this decision.

### Reason
- **Google Analytics rejected:** GA4 sets tracking cookies and shares data with Google for
  ad/profiling purposes. This site's `legal/privacy-policy.md` and Plausible's own no-cookie
  posture currently require no cookie-consent banner; adopting GA would very likely require adding
  one plus rewriting the privacy policy to disclose Google's data sharing — a real scope increase
  for a site whose only conversion goal is a booking-enquiry form, not proportionate to the money
  saved.
- **Cloudflare Web Analytics attempted:** same free, no-cookie category as Plausible/GoatCounter,
  so it was tried first. Account created under `info@SmartLearningSolutions.org` (matching the
  Web3Forms account, per this repo's convention that client-facing service accounts belong to the
  client, not the developer). The "Add a site" wizard's hostname field would not register a typed
  hostname as a valid selection (rejected with "Your website's hostname or selection from your
  existing zones is required" even with the exact text visible in the field), and clicking the
  hostname dropdown's own "No active websites found" element cleared the field entirely, creating
  an unbreakable loop. Reproduced identically across Chrome, Brave, and a private/incognito
  window — ruling out a local browser/extension cause. No site or JS-snippet token was ever
  generated, so no code change was possible.

### Context
Surfaced mid-session while working `BACKLOG.md`'s post-H-4 queue. The owner asked to compare free
alternatives to Plausible before committing to anything, was walked through a short comparison
(Google Analytics, Cloudflare Web Analytics, GoatCounter), and picked Cloudflare Web Analytics.
Account creation and the onboarding wizard were attempted live, in-session, with the owner sharing
screenshots at each step; the wizard bug above was found this way, not assumed.

### Alternatives Considered
- **Keep Plausible, just pin the script URL** (the original, narrower H-3 scope) — superseded by
  the owner's explicit preference to stop paying for it once a free equivalent was identified.
- **Google Analytics** — rejected; see Reason above.
- **GoatCounter** — same free/no-cookie category as Cloudflare Web Analytics, not yet attempted.
  Chosen as the next thing to try, specifically because its signup is a plain account + site-name
  form with no hostname-selection wizard, which sidesteps the exact failure mode hit with
  Cloudflare.
- **Keep troubleshooting Cloudflare further this session** (different account, wait-and-retry,
  Cloudflare support chat) — not pursued once the bug reproduced across three separate
  browser/session combinations; judged as very likely a platform-side issue rather than something
  further local troubleshooting would fix quickly.

### Consequences
- Plausible remains live and unchanged in `src/js/components.js` — the site's analytics have not
  been interrupted.
- `BACKLOG.md` H-3 reframed to track the provider swap rather than the original narrower
  URL-pinning task.
- **Confirmed next task (this session, `REPO_SESSION_END_CLOSEOUT.md` Step 4a):** after the
  already-queued v2.27.0 staging deploy, resume this item by trying GoatCounter's signup instead
  of continuing to fight Cloudflare's onboarding bug.

### See Also
- `BACKLOG.md` H-3
- `PLAN.md` Current State
- `SLICE_REVIEWS.md` SR-015

---

## ADR-021 — Scope and Method for Removing AI-Attribution From Git History

**Date:** 2026-07-24
**Version:** none (no code change, no version bump)

### Decision
Owner asked to remove every mention of "Claude" from this repo's git history. Scoped and executed
as: rewrite all 6 branches (`main`, `feat/hero-video-coding-with-robots`,
`feat/web3forms-integration`, `audit/production-readiness`, `fix/mobile-responsive-20260619`,
`debug/nginx-404-mac-mini-pull`); strip `Co-Authored-By: Claude...` trailers and reword narrative
AI-attribution text; preserve every literal `CLAUDE.md`/`.claude/` filename reference verbatim;
rename affected tags to match new hashes; backfill all downstream doc hash references; force-push
once fully verified. Used `git filter-repo` (not `filter-branch`, upstream-deprecated).

### Reason
- Initial framing ("every commit mentions Claude") was corrected mid-session after direct
  verification: only 13/113 commits on `main` (24 across all 6 branches) carried the formal
  `Co-Authored-By` trailer — confirmed by both `git log --grep` and the owner's own GitHub Desktop
  screenshot showing the dual-avatar co-author badge on only some commits, not all.
- The AntBrainOS vault already documents a standing policy *against* adding these trailers (4
  prompt files under `09_PROMPTS/Claude_Code_Prompts/04_Prompts/` say "do not add
  Co-Authored-By: Claude... ever") — this rewrite is a correction back to established policy, not a
  new one; the trailers should never have been added in the first place.
- `git filter-repo` chosen over `filter-branch` (upstream docs explicitly warn against
  `filter-branch`'s speed/correctness issues on multi-branch, multi-tag repos) and over interactive
  rebase (rebase cannot cleanly rewrite 6 branches with a consistent shared-ancestry commit mapping
  in one pass — would risk two divergent rewrites of the same original commit on different
  branches).
- `CLAUDE.md`/`.claude/` literal references preserved deliberately: those name real repo artifacts
  (the file and directory actually exist and are described accurately in those commits), not
  AI-attribution language — scrubbing them would make several commit messages factually wrong.

### Context
Requested directly by the owner mid-session, after a `REPO_SESSION_START_RECOVERY_AUDIT.md` run.
Scope, branch list, filename-preservation rule, doc-backfill approach, and force-push authorization
were each explicitly confirmed with the owner via targeted questions before any history was
touched, given the operation's size (touches every descendant commit hash) and irreversibility once
pushed (mitigated by a bare-mirror + bundle backup taken first, per this project's own
`~/Projects/GitHub/_backups/` convention — see Consequences).

### Alternatives Considered
- **Leave trailers in place, only change convention going forward** — rejected; owner explicitly
  asked for the existing history to be cleaned, not just future commits.
- **Squash/re-author entire history into fewer commits** — rejected as unnecessarily destructive to
  the commit-by-commit narrative this repo's own docs (`COMMIT_NOTES.md`, `SLICE_REVIEWS.md`) are
  built around; a targeted message-only rewrite preserves that narrative exactly.
- **Blind regex-strip "Claude" everywhere, including `CLAUDE.md`/`.claude/` references** — owner
  explicitly declined this option when asked; would have broken several commits' factual accuracy
  about real files they describe.
- **Rewrite only `main`, leave the other 5 branches untouched** — owner explicitly chose the
  broader "all pushed branches, including the local-only one" scope when asked directly.

### Consequences
- Every commit hash on all 6 branches changed (only for commits whose message actually changed —
  verified via tree-identity diff that file *contents* are byte-identical, only commit metadata
  differs).
- All 74 git tags recreated pointing at new hashes; 64 tag names embedding the old short hash
  renamed to match.
- Discovered, as a byproduct of the tag-rename audit (not caused by this rewrite): 4 tags had a
  **pre-existing** name/target drift predating this operation entirely (their name's embedded hash
  didn't match what they actually pointed to — most likely an untracked `git tag -f` at some point
  during real development). Corrected during the same rename pass; see `SLICE_REVIEWS.md` SR-018
  for the full list.
- 329 stale hash references backfilled across `CHANGELOG.md`, `RELEASE_NOTES.md`,
  `COMMIT_NOTES.md`, `SLICE_REVIEWS.md`, `PROGRESS_NOTES.md`. 4 doc entries (v2.14.3, v2.14.7,
  v2.26.1, v2.27.0) now intentionally show a different hash on their `Tag:` line than their
  `Commit:` line in the same entry — this is accurate, reflecting the drift correction above, not a
  formatting error.
- Discovered and cleaned up, unrelated to this rewrite: an orphaned `refs/original/refs/heads/main`
  backup ref left over from some earlier, unrelated history operation predating this session
  entirely — never reachable from any real branch or tag, never on GitHub, purely local debris.
  Deleted and garbage-collected.
- Full pre-rewrite state preserved as a bare-mirror clone and a `git bundle`, both outside the repo
  (`~/Projects/GitHub/_backups/`), for rollback if ever needed — not itself part of this repo's
  tracked state.

### See Also
- `SLICE_REVIEWS.md` SR-018
- `LESSONS_LEARNED.md` (candidate follow-up: document this as a repeatable runbook if ever needed
  again)

---

## ADR-022 — Shared VPS Gets an Explicit default_server Instead of an Implicit Catch-All Vhost

**Date:** 2026-07-24
**Version:** none (server-side only, no repo code change)

### Decision
Removed `default_server` from the `prompt-vault` nginx vhost on the shared VPS (74.208.9.49) and
added a new, minimal, explicit catch-all vhost (`return 444` for HTTP, `ssl_reject_handshake on`
for HTTPS) so an unmatched hostname on the shared box closes the connection instead of silently
serving whichever vhost happened to hold `default_server` (or whichever SSL vhost nginx loaded
first for an unmatched SNI).

### Reason
Owner reported the two hero-video review subdomains
(`smart-learning-solutions-hero-video-{homepage,coding-with-robots}.craftandconscious.com`)
showing "Prompt Vault" instead of the intended site. Root cause was actually a URL typo — the
owner was visiting the *shortened* hostnames (missing the `smart-learning-solutions-` prefix),
which were never configured with their own vhost; the fully-prefixed URLs were serving correctly
the entire time. But investigating it surfaced a real, separate hygiene gap worth fixing
regardless: `craftandconscious.com` has wildcard DNS (any subdomain resolves to the shared VPS),
and the `prompt-vault` vhost had `listen 80 default_server` — making it the literal HTTP catch-all
for *every* one of the ~15 client sites on that box, not just this project. Any mistyped or
unclaimed subdomain for any client would have silently exposed Prompt Vault's app instead of a
plain 404, and the HTTPS side had no explicit default at all, so an unmatched SNI got whichever
SSL vhost nginx happened to load first (confirmed via `openssl s_client`: a cert belonging to
`admin.jones-barber-shop.craftandconscious.com`, an unrelated client's site).

### Context
Diagnosed live via direct `curl`/`dig`/`openssl s_client` checks against both the URL the owner
was actually using and the correctly-configured one, then via SSH into the VPS to read the actual
nginx config (`prompt-vault`'s `sites-available` file). Confirmed the exact root cause
(`listen 80 default_server` on an unrelated site's vhost) before proposing or making any change.

### Alternatives Considered
- **Just tell the owner to use the correct URL, leave the VPS config as-is** — would have resolved
  the immediate report but left the underlying cross-tenant information-disclosure-adjacent gap in
  place for all ~15 sites on the box; owner explicitly asked for the default_server issue fixed
  too, not just confirmation of the correct URL.
- **Point `default_server` at this project's own vhost instead of removing it from `prompt-vault`**
  — rejected; this project has no more claim to being the "default" for a shared multi-tenant box
  than any other client. A neutral, explicit catch-all that serves no one is the correct fix.
- **Self-signed cert for the HTTPS catch-all instead of `ssl_reject_handshake`** — rejected;
  `ssl_reject_handshake on` (nginx ≥1.19.4, confirmed running 1.24.0) refuses the TLS handshake
  outright for unmatched SNI, which is cleaner than presenting any cert (real or self-signed) for a
  hostname that shouldn't resolve to anything at all.

### Consequences
- `prompt-vault`'s own real domain (`vault.anthonygoins.com`) is unaffected — confirmed it resolves
  to a *different* IP entirely, not even hosted on this shared VPS, so this vhost's own intended
  traffic was never dependent on holding `default_server` in the first place.
- One sibling tenant (`hair-by-alexy.craftandconscious.com`) has no HTTPS vhost of its own
  (HTTP-only, confirmed pre-existing via the nginx config captured *before* this change) — its
  HTTPS behavior changed from "silently served by an unrelated site's mismatched cert" to
  "explicit TLS handshake rejection," which is more correct, not a regression; its actual (HTTP)
  traffic is unaffected.
- Change is additive-only: one new vhost file, a 2-line removal from `prompt-vault`'s existing
  config. Validated with `nginx -t` before reload; verified via curl against 2 sibling tenants
  (`old-fashion-care`, `swarm-defense`) post-reload — zero regression.
- Server-side only; no repo commit corresponds to this change (matches this repo's own precedent
  for infra-only work with no code change).

### See Also
- `SLICE_REVIEWS.md` SR-017
- `docs/DEPLOYMENT.md` §11 (shared-VPS deploy conventions)

---

## ADR-023 — H-3 Cloudflare Retry Blocked a Second Way (API Path); Paused Pending Client Email Access

**Date:** 2026-08-13
**Version:** none (no code change — investigation only, nothing shipped)

### Decision
Paused the H-3 Cloudflare Web Analytics onboarding retry. The owner re-attempted the dashboard
"Add a site" wizard (still blocked by the same bug recorded in ADR-020) and then attempted the
documented API bypass (`POST /accounts/{account_id}/rum/site_info`, which accepts a `host` field
for non-proxied sites specifically to route around that wizard). The API path is blocked by a
different obstacle: no scoped API token permission for Web Analytics/RUM write access could be
found in the Cloudflare dashboard's custom-token permission picker (searched `analytics` under
"Entire Account" — only **Account Analytics** [Read-only], Account Logs, Intel, and Radar
appeared; `rum`/`web` were not separately checked before pausing). The fallback — the account's
Global API Key, which needs no scoped permission — requires the Cloudflare account holder email
(`info@SmartLearningSolutions.org`) to view, and the owner does not currently have access to that
inbox. Work is paused here rather than continued with a workaround, since the correct unblock is
credential access, not further troubleshooting.

### Reason
Three independent Cloudflare surfaces have now individually blocked this same task across two
sessions:
1. **Dashboard wizard** (ADR-020, 2026-07-23; reproduced again 2026-08-12) — typed hostname
   rejected as an invalid selection; the field's own "No active websites found" dropdown clears
   the typed value, an unbreakable loop. Reproduced in Chrome, Brave, and incognito.
2. **Account ID lookup** (2026-08-12) — the dashboard's documented per-domain "API" panel doesn't
   exist for this account because it has zero zones/domains added; resolved via dashboard search
   (Cmd/Ctrl+K → "Copy account ID").
3. **Scoped token permissions** (2026-08-12/13) — no Web Analytics/RUM **Edit** permission surfaced
   in the custom-token picker under "Analytics & Logs"; Account Analytics is Read-only and would
   not authorize creating a site.

Given (1)-(3), the working assumption from ADR-020 — that this account's zero-zones state is an
edge case the platform simply handles worse — looks understated; each surface it touches
independently breaks along the same line. Not yet proven load-bearing, but worth naming since it
affects whether continuing to fight Cloudflare is still the right call at all (see Alternatives).

### Context
Session continued directly from the `REPO_SESSION_START_RECOVERY_AUDIT.md` run earlier this
session (2026-08-12→13), which surfaced H-3 as the owner-confirmed next task ("i want to try
cloudflair anaylticas again before moving on," recorded 2026-08-11). A full implementation plan
for the API path was written and approved (Plan Mode) before any owner action was taken — see
`/Users/ant/.claude/plans/i-tried-a-again-fluttering-nautilus.md` (local plan file, not in the
repo) for the six-slice plan (API creation → code swap → privacy-policy update → nginx CSP/
X-Robots-Tag → validation → release records). Only Slice 1 (obtain the beacon token) was
attempted; it did not complete. No file in this repo was touched before this pause — `git status`
confirms a clean tree throughout.

### Alternatives Considered
- **Global API Key via a different route** (e.g., owner's own personal Cloudflare login if they
  have separate access) — not available this session; the account is specifically
  `info@SmartLearningSolutions.org`, matching the Web3Forms account convention (client-owned
  inbox, not the developer's).
- **Broader custom-token scope** (e.g., grant more of "Entire Account" than Web Analytics alone)
  — not attempted; deferred until it's confirmed no narrower permission exists, since granting
  more than needed to a client-owned account token is worth avoiding if a narrower option is
  still findable.
- **Fall through to GoatCounter now**, per ADR-020's own stated fallback — considered, but not
  taken this session. The owner asked specifically to retry Cloudflare rather than pivot, and the
  actual blocker (credential access) is unrelated to whether Cloudflare's platform is the right
  choice, so switching providers wouldn't address it. Remains the standing fallback if Cloudflare
  continues to block after email access is restored.

### Consequences
- H-3 remains open and unresolved; Plausible remains the live, unchanged analytics provider —
  no functional regression, no interruption (see ADR-020: Plausible is scoped to the
  not-yet-live production domain, so it is not currently collecting meaningful data regardless).
- No code, config, or documentation other than this entry and `BACKLOG.md`'s H-3 row changed.
- **To resume:** owner needs either (a) access to the `info@SmartLearningSolutions.org` inbox to
  retrieve the Global API Key (My Profile → API Tokens → API Keys section → Global API Key →
  View, password-gated), or (b) to locate a Web Analytics/RUM-scoped **Edit** permission in the
  custom-token picker that wasn't found this session (worth a fresh look — dashboard permission
  lists do change). Once either credential is in hand, resume at Slice 1 of the plan referenced
  above.

### See Also
- `BACKLOG.md` H-3
- `DECISION_LOG.md` ADR-020 (original blocker + GoatCounter fallback)
- `PLAN.md` Current State

---

## ADR-024 — Reset the 5950X Workstation's Diverged `main` to `origin/main`, Not a Local Re-Rewrite

**Date:** 2026-08-31
**Version:** none (no code change, no version bump)

### Decision
On the Windows machine (`DESKTOP-8JF1MKA`, `E:\Projects\GitHub\Smart-Learning-Solutions`) — its
first-ever audited session — created a backup branch for the stale `main` tip, exported and
dropped an old superseded stash, then ran `git fetch origin --tags --force --prune --prune-tags`
followed by `git reset --hard origin/main` to bring local `main` from `2e035bd` (2026-06-17) to
`fb560c6` (v2.29.0, 2026-08-17), catching up 121 commits. Did not attempt to replay the clone's
own 59 unique commits, and did not run `git filter-repo` locally.

### Reason
A `REPO_SESSION_START_RECOVERY_AUDIT.md` run found this clone's `main` diverged from
`origin/main` (`ahead 59, behind 121`). Root cause: this clone predates ADR-021's 2026-07-24
`git filter-repo` AI-attribution rewrite entirely. Its 59 "ahead" commits (`git log
fb560c6..2e035bd`) all date 2026-04-24→2026-06-17 — this clone's own old, pre-rewrite lineage, not
new work — and are structurally incompatible with the rewritten `origin/main` lineage (different
SHAs for the same underlying content past the rewrite point). Replaying them would either fail or
reintroduce commits from before the owner-authorized attribution scrub. A plain
`git reset --hard` is the correct, much simpler fix once the old tip is safely preserved
elsewhere.

### Context
This was the first session ever run against this Windows machine's clone — no vault continuity
record had referenced this path or machine before. Planned with the owner in Plan Mode (Explore
and Plan agents independently re-verified the git state and grounded the exact commands in prior
AntBrainOS vault lessons about post-rewrite tag staleness); Model Selection Gate shown (Claude
Code in VS Code, Sonnet 5, high effort — confirmed).

### Alternatives Considered
- **Replay the 59 local-only commits onto the new `origin/main` lineage** — rejected; they predate
  the attribution scrub this repo's owner explicitly authorized (ADR-021), so replaying them would
  partially undo that decision.
- **Run `git filter-repo` locally to rewrite this clone into agreement** — rejected as unnecessary
  complexity; `origin/main` is already the correct, owner-authorized rewritten history, so this
  clone only needs to adopt it, not independently re-derive it.
- **Leave the clone diverged and cherry-pick going forward** — rejected; every future push from
  this machine would carry the same incompatibility risk.

### Consequences
- `backup/main-pre-catchup-20260831-2e035bd` exists locally on this machine only, preserving the
  discarded pre-rewrite tip for as long as anyone wants to inspect it.
- The one stash present (`stash@{0}`, a v2.15.0 planning-docs WIP already superseded per this
  file's own v2.15.2-era changes) was exported to
  `E:\Projects\GitHub\_backups\Smart-Learning-Solutions\stash-cc88cfd-20260831.patch` before being
  dropped.
- No push occurred — purely a local-ref catch-up against an already-correct, already
  owner-authorized `origin/main`.
- Added a new row to `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`'s Snapshot Destination table
  for this machine, closing the gap that file's own text had flagged for an unmatched machine.

### See Also
- ADR-021 (the 2026-07-24 git filter-repo rewrite this remediation responds to)
- AntBrainOS vault: `03_PROJECTS/Active/Smart Learning Solutions/DECISION_LOG.md` 2026-08-31 entry
  (mirrors this decision at the vault level)

---

## ADR-025 — Deploy the v2.29.1 Staging Push via `scp`, Not `rsync`, on the 5950X Workstation

**Date:** 2026-09-04
**Version:** v2.29.1 (deploy only — no code change from this decision itself)

### Decision
Deployed the v2.29.1 changed files to the staging VPS with plain `scp` of the 10 changed files,
instead of running `scripts/deploy-staging.sh` (which requires `rsync`), after confirming via
`find`-based directory listings that the server-side `programs/`/`src/`/`legal/` file sets exactly
matched the repo — meaning `rsync`'s `--delete` semantics had nothing to actually delete this
round, so a plain `scp` copy was safe-equivalent for this specific deploy. Verified every deployed
file's SHA-256 checksum against its local source afterward (all matched), then ran the full
`docs/DEPLOYMENT.md` §11 verification checklist against the live site.

### Reason
`scripts/deploy-staging.sh`'s first dry-run failed with `rsync: command not found` — this Windows
machine's Git Bash does not ship `rsync`, and WSL is not installed (only the `wsl.exe` launcher
stub is present, which prompts to install rather than running anything). Installing `rsync` (via
WSL install, or MSYS2's `pacman`) was judged out of scope for a single deploy — a real system
change beyond what "push to VPS" authorized in-session — so a manual equivalent was used instead,
gated on first confirming it would be safe (no orphaned server-side files this script's `--delete`
would otherwise have caught).

### Alternatives Considered
- **Install `rsync` via `wsl.exe --install`** — rejected for this session: installing a Windows
  subsystem is a significant, scope-expanding system change, not something to do implicitly under
  a "push to VPS" instruction without separately asking.
- **Install `rsync` via MSYS2's `pacman`** — same reasoning; deferred rather than done inline.
- **Recursive `scp -r` of `programs/`, `src/`, `legal/` in full** — rejected as unnecessary; only
  10 files actually changed, and a full recursive copy risked altering timestamps/permissions on
  unchanged files for no benefit over targeting exactly the diff.

### Consequences
- Positive: v2.29.1 deployed and verified without installing new tooling mid-session.
- Risk (documented, not fixed): this workaround is **only safe when no allowlisted file needs
  deleting** in that session's change. A future deploy from this machine that removes a file from
  `programs/`, `src/`, or `legal/` cannot rely on this same shortcut — either install `rsync` first,
  or manually `ssh rm` the stale path after confirming with the owner. See
  `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`'s new "Deploy Tooling by Machine" table (added in
  the same session, commit `86e32f1`) for the standing per-machine record.

### See Also
- `docs/governance/REPOSITORY_HANDOFF_CONFIG.md` — Deploy Tooling by Machine table
- `SLICE_REVIEWS.md` SR-021, `COMMIT_NOTES.md` 2026-09-04 entry
- AntBrainOS vault: `03_PROJECTS/Active/Smart Learning Solutions/SESSION_LOG.md` 2026-09-04 entry

---

## ADR-026 — Strip Reintroduced AI-Attribution Trailers From Published History via Scoped `rebase --exec`, Not `filter-repo`

**Date:** 2026-09-17
**Version:** none (docs/governance only — no site content changed, no version bump)

### Decision
Rewrote the commit messages of the four commits above `95015c4` to remove the
`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` trailer each had acquired, and
force-pushed the result to `origin/main`. Final published hashes: `7a425df`, `a51bea6`, `5ea595b`,
`3b3dc11`.

Method: `git rebase 95015c4 --exec 'git log -1 --format=%B | sed "/^Co-Authored-By: Claude/d" | git commit --amend --file=-'`,
then `git push --force-with-lease`.

### Reason
ADR-021 (2026-07-24) established that these trailers "should never have been added in the first
place" and scrubbed them from all six branches. They were reintroduced by sessions on other machines
on 2026-09-16 and again on 2026-09-17, in breach of that ruling and of the owner's standing
user-level ban. The owner explicitly directed a rewrite-first ordering this session, on the grounds
that reconciling the records before the rewrite would write hashes the rewrite immediately
invalidates — the exact failure being repaired.

### Alternatives Considered
- **`git filter-repo`** (ADR-021's tool) — rejected here despite being installed. ADR-021 chose it
  for a 6-branch, multi-tag, full-history rewrite where `filter-branch` was genuinely unsafe. This
  rewrite is four tip commits on one branch with no tags in range, where a scoped `rebase --exec`
  cannot reach outside the range at all. `filter-repo` also strips the `origin` remote as a
  deliberate safety measure, which would have had to be re-added before pushing.
- **`git filter-branch --msg-filter`** — rejected: upstream-deprecated, and ADR-021's reasoning
  against it stands even though its specific hazards (multi-branch, multi-tag) do not apply here.
- **A repo-wide message filter** — rejected as actively dangerous. Commit `a3a291a`
  ("docs: backfill real commit hashes after history rewrite") *narrates* the 2026-07-24 scrub and
  contains the literal string `Co-Authored-By` in its body. A repo-wide filter would have silently
  corrupted that record into nonsense. Range scoping is what prevents this, and the commit was
  verified intact afterward.
- **Leave the trailers, record an exception** — offered and declined by the owner this session.
- **Rewriting `5ea595b`'s body** to replace its dead `ca44f3f`/`470f81d` references — rejected.
  Corrected in the records instead, matching `a3a291a`'s own precedent of fixing dead hashes in a
  follow-up commit rather than by editing history prose.

### Consequences
- Positive: `origin/main` carries no AI-attribution trailer on any commit. Verified with
  `%(trailers:key=Co-Authored-By)`, not a text grep, so narrative mentions are not confused for
  trailers.
- **Verified non-destructive to content.** `git diff` between the pre-rewrite tip and the rewritten
  tip returned empty, proving the rewrite changed messages only. Author dates preserved; committer
  dates necessarily reset.
- **Other clones have diverged.** Any clone still holding `c809946` or `8fb709c` must run
  `git fetch origin && git reset --hard origin/main` before its next session. Merging or rebasing
  onto the new history would reintroduce the trailered commits — this is ADR-024's situation in
  reverse, and that ADR's reasoning applies directly.
- **Recoverable.** Pre-rewrite state retained in two local backup branches
  (`backup/main-pre-trailer-strip-20260917-c809946`,
  `backup/origin-main-pre-trailer-strip-20260917-8fb709c`) and two verified `git bundle` exports
  under `E:\WorkSync\Projects\RepoBackups\Smart Learning Solutions\`. Note that those artifacts
  deliberately still contain the trailered commits; delete them only once confidence in the
  rewrite is settled.
- **A concurrent push was caught, not clobbered.** `--force-with-lease` rejected the first attempt
  because Anthony's MacBook Pro had pushed `8fb709c` 52 minutes earlier during its own session-end
  run. That commit was fetched, incorporated into the rewrite, stripped, and republished as
  `3b3dc11`; the final tree is byte-identical to what that machine published. Had `--force` been
  used instead of `--force-with-lease`, that machine's work would have been destroyed silently.
- **Risk, documented and not fixed: this will recur.** The trailer was reintroduced *twice* after
  ADR-021, most recently the same night as this rewrite. The ban is configured in the 5950X's
  user-level `~/.claude/CLAUDE.md`; the Mac machines evidently do not carry it, and that config is
  not reachable from this machine. A history rewrite treats the symptom only. Two unclaimed
  remedies: add the ban to each Mac's own user-level config, or add a repo-level `commit-msg` hook
  that rejects the trailer (offered this session and deferred — hooks are not version-controlled by
  default and would need a `scripts/` install step plus an `AGENTS.md` note).

### See Also
- ADR-021 — the original 2026-07-24 scrub and the standing policy this restores
- ADR-024 — the 2026-08-31 diverged-clone remediation; the same hazard, other direction
- `COMMIT_NOTES.md` 2026-09-16/2026-09-17 entries — full hash lineage per commit
- `STATUS.md`, `PROGRESS_NOTE.md` — 2026-09-17 entries
- AntBrainOS vault: `03_PROJECTS/Active/Smart Learning Solutions/SESSION_LOG.md` 2026-09-17 entry

## ADR-027 — Client Moved to Wix (Temporary, Pending Subscription End)

**Date:** 2026-09-17
**Version:** unchanged (docs-only, this entry)

### Decision

The client has decided to host on Wix, effective now, for the duration of their current Wix
subscription/contract term (exact end date not currently known — record it here once confirmed).
This repository is **not** being decommissioned or archived: it remains the intended target for
when the client's Wix subscription ends and they return to a self-hosted, hand-coded static site.

This supersedes two prior, now-incorrect records rather than deleting either:

- **ADR-013** (2026-06-23) framed Wix as a possibility ("owner indicated it *may* go on Wix") and
  held code-level fixes as a precaution. That precaution has now materialized — Wix is not a risk
  anymore, it is the client's actual current platform.
- **The AntBrainOS vault's project `DECISION_LOG.md`, 2026-06-25 entry** ("Hosting confirmed: IONOS
  VPS; Wix risk resolved... Wix option is closed") was itself incorrect, or at minimum has not
  held — R-003 in `docs/governance/PROJECT_RISK_REGISTER.md` was never actually closed in this
  repo, and OD-003 (self-host-on-VPS proposal) was still open as recently as this session's own
  closeout. That vault entry is corrected separately (see `See Also`).

### Context

This decision was communicated verbally in a prior conversation but was never written into any
durable record — not this file, not `STATUS.md`, not `docs/governance/PROJECT_RISK_REGISTER.md`,
not `plans/open-decisions.md`, not any vault file. A 2026-09-17 closeout session searched all of
those and found nothing, which is why this ADR exists now rather than earlier: from any fresh
session's point of view, a decision that is spoken but never recorded is indistinguishable from a
decision that never happened.

### Alternatives Considered

- Treat this repo as effectively dead/archived while the client is on Wix — rejected; the client is
  expected to return once the subscription ends, and this repo is the plan for that return, not a
  historical artifact.
- Leave R-003/OD-003 exactly as previously worded ("may go on Wix," "pending client acceptance")
  — rejected; both are now factually wrong, not merely stale.

### Consequences

- Positive: the repo's real current state (client is elsewhere, this repo is the standby/return
  version) is now discoverable from `DECISION_LOG.md`, `STATUS.md`, and the risk register, instead
  of only existing in conversation.
- Neutral: launch-readiness work (forms, hosting, production domain) has no active urgency while
  the client is on Wix — the repo continues to accept improvement work (see the hero-video merge
  landed the same session, ADR-028) so that it is the best-available version whenever the client
  returns, per the owner's explicit instruction this session.
- Risk: the subscription end date is unknown. Until it's confirmed, there's no way to schedule
  return-readiness work against a real deadline. Record the date here as soon as it's known.
- Follow-up: correct the vault's stale 2026-06-25 "Wix risk resolved" entry (superseding note, not
  deletion) — tracked in the same session's vault write-back.

### See Also

- ADR-013 — the original "may go on Wix" precaution this entry supersedes
- R-003 in `docs/governance/PROJECT_RISK_REGISTER.md` — updated alongside this entry
- OD-003 in `plans/open-decisions.md` — updated alongside this entry
- AntBrainOS vault: `03_PROJECTS/Active/Smart Learning Solutions/DECISION_LOG.md`, 2026-06-25 entry
  — corrected with a superseding note in the same session

---

## ADR-028 — Video Hero Component Built on an Exploratory Branch; Relocated Off Coding-with-Robots to Workshops Per Owner Review, Merged Into `main` 2026-09-17

*(Numbered ADR-028 on merge — this branch independently numbered it "ADR-021" back on 2026-07-24,
before `main`'s own unrelated ADR-021 (AI-attribution scrub) existed; renumbered here to avoid a
collision, content otherwise unchanged from the branch's own record.)*

**Date:** 2026-07-24
**Version:** none (branch `feat/hero-video-coding-with-robots`, not merged, no version bump)

### Decision
Built a reusable full-bleed video-hero component (`.hero-video-bg` in `main.css`, `initHeroVideo()`
in `animations.js`, mirroring the existing `.hero-photo-bg` scrim pattern) and deployed it live to
a review-only subdomain for owner comparison against a sibling branch (`feat/hero-video-homepage`)
that places the same video on the homepage instead. Initially placed the video on the Coding with
Robots program page; after owner review, moved it to the Workshops page instead and reverted
Coding with Robots to its original (pre-video) design. Both changes live on the same subdomain
(`smart-learning-solutions-hero-video-coding-with-robots.craftandconscious.com` — kept as-is
rather than provisioning new DNS for a matching name).

### Reason
- The video (an Edison robot manufacturer promo, owner-supplied) reads more naturally against the
  general "workshops" framing than tied to one specific program page.
- Owner reported the video "not playing" on first review; root-caused to the intentional
  `prefers-reduced-motion`/`<768px` accessibility gate suppressing playback, not a deploy defect —
  confirmed by direct `curl`/headless-browser checks against the live subdomain matching local
  validation exactly. Owner chose to strip that gate on the two review deployments only (patched
  directly on the VPS, never committed to either branch), so reviewers see it regardless of local
  settings while the real gated version — required for production accessibility — stays intact in
  git for any future real deploy.

### Alternatives Considered
- **Combined `certbot -d A -d B` single cert for both review subdomains** (matching a prior
  sibling-project precedent) — rejected: a single ACME transaction fails validation for both
  domains if either has any hiccup, re-coupling two otherwise independent review deploys for no
  real benefit.
- **New, correctly-named subdomain for the relocated content** — rejected for now (owner's
  explicit choice) to avoid another DNS/TTL round-trip; the existing subdomain's name no longer
  matches its content (says "coding-with-robots," shows video on Workshops instead).
- **Bake the always-play (no reduced-motion gate) behavior into the git branch itself** — rejected:
  would ship a real accessibility regression to production if this branch is ever adopted and
  merged without someone remembering to revert it. Kept as a VPS-only, uncommitted patch instead.

### Consequences
- Any future redeploy of either review subdomain from its branch will silently restore the
  reduced-motion gate (since it's not in git) — the uncommitted patch must be reapplied after every
  redeploy. Tracked in vault `SESSION_LOG.md` for this project so it isn't forgotten.
- `programs/coding-with-robots.html` is back to its original, unmodified state on this branch — no
  net diff against `main` for that file, confirmed unchanged by the 2026-09-17 merge.
- ~~Neither branch is merged; this ADR documents exploratory work pending an owner adoption
  decision, not a shipped change.~~ **Superseded 2026-09-17:** `feat/hero-video-coding-with-robots`
  was merged into `main` via a real merge commit (not a rebase — no existing hash rewritten),
  landing this Workshops-page video hero permanently. `feat/hero-video-homepage` remains
  unmerged — not part of this adoption. Merged per explicit owner instruction, prompted by the
  client's move to Wix (`DECISION_LOG.md` ADR-027): keep this repo at its best-available state for
  whenever the client returns.

### See Also
- `plans/2026-07-24-hero-video-background.md`
- `docs/ACCESSIBILITY.md` §6, `docs/PERFORMANCE.md` §6
- Vault `SESSION_LOG.md`/`DECISION_LOG.md` (Smart Learning Solutions project), 2026-07-24 entries
- `DECISION_LOG.md` ADR-027 — the Wix decision that prompted landing this branch now
- `STATUS.md` 2026-09-17 merge entry — commit hash and verification detail

## ADR-029 — Reconstruct and Merge `feat/hero-video-homepage` Into `main` (2026-09-18)

**Date:** 2026-09-18
**Version:** v2.30.0, continued (no separate bump — same release as ADR-028)

### Decision

`feat/hero-video-homepage` — the sibling exploratory branch to ADR-028's `feat/hero-video-coding-with-robots`,
which puts the video hero on the **homepage** instead of Workshops — was reconstructed from its
live VPS deployment and merged into `main` via a second real merge commit (`af55094`), so both
pages that ever had a video-hero variant now have it on `main`.

### Context

This branch was never on GitHub at all — this repo's own 2026-07-24 session record
(`SESSION_LOG.md`, vault) states explicitly that both `feat/hero-video-homepage` and
`feat/hero-video-coding-with-robots` were "local-only, never pushed to `origin`" at deploy time,
and were shipped to their review subdomains via `git archive` directly from a local checkout —
never through GitHub. Only `feat/hero-video-coding-with-robots` was pushed later that same day
(ADR-028's `2a32cc7`). The homepage variant's local branch was never preserved anywhere; the
deployed files on the VPS (`smart-learning-solutions-hero-video-homepage.craftandconscious.com`,
still live) became its only surviving copy.

**Reconstruction method:** pulled the live deployed tree via `rsync`, diffed it against
`fe82292` (the shared-foundation commit both sibling branches forked from — confirmed via `git
show`, no page wired up yet at that commit) and against `feat/hero-video-coding-with-robots`'s
own tip. Found the deployed tree differs from the shared foundation in exactly one file
(`index.html`, wiring up the video hero) plus one file that must be **excluded**: the deployed
`animations.js` carries an uncommitted, always-play review-deploy patch (removing the
`prefers-reduced-motion`/viewport gate — documented in ADR-028) that was never meant to ship.
Created `feat/hero-video-homepage` from `fe82292`, applied only the real `index.html` change, and
pushed it — restoring the branch to git with the *correct*, accessibility-gated behavior rather
than the reviewer-only override.

### Alternatives Considered

- Leave it deployed-only on the VPS — rejected: a single, unbacked-up copy on a shared host is a
  real exposure, and the owner explicitly asked for it to be preserved in git.
- Reconstruct it by diffing the deployed tree wholesale (including the always-play `animations.js`
  patch) — rejected: would ship a real accessibility regression to `main`; the patch was
  deliberately never committed for exactly this reason (see ADR-028).

### Consequences

- `main` now has the video hero on both pages it was ever built for: Workshops
  (`feat/hero-video-coding-with-robots`, ADR-028) and the homepage (this branch).
- The VPS review deployments themselves are untouched by this work — read-only `rsync` pull only,
  no deploy or file changes made to either review subdomain.
- `feat/hero-video-homepage`'s reconstructed history does not match whatever the original,
  never-preserved local branch actually contained commit-for-commit — it matches the *content*
  (verified byte-for-byte against the live deployed `index.html`, minus the debug patch), not the
  original commit sequence, which is unrecoverable.

### See Also

- ADR-028 — the sibling Workshops-page branch and its own merge record
- ADR-027 — the Wix decision that prompted keeping this repo at its best-available state
- Vault `SESSION_LOG.md` (Smart Learning Solutions project), 2026-07-24 entry — the original
  "both local-only, never pushed" deployment record
- `STATUS.md` 2026-09-18 entry — commit hash and verification detail
