# Smart Learning Solutions — Status

**Current Version:** v2.30.0 · 2026-09-18 (both hero-video branches now merged into `main`; the
earlier `v2.30.0` tag was fully deleted, local and remote, during 2026-09-17's ADR-026 cleanup, so
the number is free to reuse)
**Branch:** `main` (`HEAD` `af55094`), in sync with `origin/main`, pushed

---

## Site Health

Feature-complete for pre-launch. All 10 pages are built, navigation is correct, and the design system is consistent sitewide. A full diagnostic audit has been completed and documented in `AUDIT.md`. The remaining blockers are operational and content decisions — not missing site structure.

---

## Hero-Video-Homepage Branch Reconstructed and Merged Into `main` — 2026-09-18 (v2.30.0, continued)

The sibling exploratory branch to the Workshops-page video hero below,
`feat/hero-video-homepage`, was never actually on GitHub — this repo's own 2026-07-24 record
(vault `SESSION_LOG.md`) confirms it was "local-only, never pushed to `origin`," deployed to its
review subdomain via `git archive` directly from a local checkout. That local branch is gone; the
live VPS deployment (`smart-learning-solutions-hero-video-homepage.craftandconscious.com`, still
serving) was its only surviving copy. Pulled that deployed tree via `rsync`, reconstructed the
branch from `fe82292` (the shared-foundation commit both siblings forked from) plus the one real
`index.html` change — deliberately excluding the deployed server's uncommitted, always-play
`animations.js` patch (documented in ADR-028) so the reconstructed branch ships the real,
accessibility-gated behavior instead. Pushed as `feat/hero-video-homepage` (`c58f4a7`), then
merged into `main` (`af55094`) per explicit owner instruction: every page with a video-hero
variant should be on `main`, not just Workshops. One conflict (`index.html`'s script-import line)
resolved by keeping both sides. Full detail: `DECISION_LOG.md` ADR-029.

**Verification:** local server — all 10 pages 200; both `index.html` and `workshops.html`
confirmed containing `.hero-video-bg`. `starter_kit.cli validate`: PASS, 0 findings. Pushed and
remote-verified (`main` == `origin/main` == `af55094`).

---

## Hero-Video Branch Merged Into `main` — 2026-09-17 (v2.30.0)

`feat/hero-video-coding-with-robots` (6 commits, explored to completion 2026-07-24, never merged)
landed via a real merge commit (`--no-ff`, not a rebase — no existing hash rewritten, safe for
this repo's other live clones). Adds a full-bleed, accessibility-gated video hero
(`.hero-video-bg` in `main.css`, `initHeroVideo()` in `animations.js`) to `workshops.html`;
`programs/coding-with-robots.html` — where the video was originally prototyped before the owner's
2026-07-24 relocation decision — confirmed unchanged, no net diff. New assets:
`src/videos/edison-robot-promo.mp4` (22MB), `src/images/edison-robot-promo-poster.jpg`. New
accessibility/performance rules from that branch: `docs/ACCESSIBILITY.md` §6 (muted/looped/
reduced-motion-aware background video now permitted), `docs/PERFORMANCE.md` §6 (Video Rules).

Landed per explicit owner instruction, prompted by the Wix decision above: keep this repo at its
best-available state for whenever the client returns off Wix. `feat/hero-video-homepage` (a
sibling exploratory branch) remains unmerged — not part of this adoption.

3 merge conflicts, all in append-only log docs (`DECISION_LOG.md`, `PROGRESS_NOTES.md`,
`STATUS.md` itself) — resolved by keeping both sides' entries, none dropped. The branch's own
`ADR-021` (a numbering collision with `main`'s unrelated AI-attribution-scrub ADR-021) renumbered
to `ADR-028` on merge; see that entry for the full original decision record.

**Verification:** local server (`python3 -m http.server`) — all 10 pages 200, video + poster
assets 200, `workshops.html` confirmed rendering `.hero-video-bg` with `initHeroVideo()` wired,
`coding-with-robots.html` confirmed clean of any video reference, no stray inline `<style>`
reintroduced (the one `<style>` tag present is the pre-existing sitewide anti-FOUC snippet, matched
on every other page). Cache-busting tokens bumped sitewide: `main.css?v=20260904` →
`?v=20260917`, `animations.js?v=visual-20260426` → `?v=visual-20260917`.

**Not yet pushed, tagged, or snapshotted** — held for explicit authorization, per this session's
established pattern (merging what `main` is affects every other live clone of this repo).

## Client Moved to Wix (Temporary) — 2026-09-17 (no version bump)

The client has decided to host on Wix, effective now, for the duration of their current Wix
subscription/contract term (end date not currently known). **This repo is not being
decommissioned** — it remains the return-target for when the subscription ends and the client
comes back to a self-hosted, hand-coded static site. This decision had been communicated verbally
in an earlier conversation but was never written into any durable record until this session found
the gap and closed it. See `DECISION_LOG.md` ADR-027 for full detail, including the correction of
two prior records that no longer matched reality: ADR-013's "may go on Wix" framing (the risk has
now materialized, it's not a possibility anymore) and the AntBrainOS vault's stale 2026-06-25
"Wix risk resolved, option closed" claim (corrected, not deleted).

**Practical effect:** the self-host-on-VPS proposal (OD-003) is not withdrawn, just moot until the
client returns. Launch-readiness work (forms, production domain, host confirmation) has no active
urgency. This repo continues to accept improvement work in the meantime — see the hero-video merge
landed the same session, below — so it's the best-available version whenever the client returns.

---

## Record Reconciliation + AI-Attribution Trailer Strip — 2026-09-17 (no version bump)

A `REPO_SESSION_START_RECOVERY_AUDIT.md` run found the 2026-09-16 records materially wrong about
their own publication state, and found four published commits carrying `Co-Authored-By: Claude`
trailers in breach of ADR-021.

**Trailer strip (ADR-026).** `7a425df`, `a51bea6`, `5ea595b`, `3b3dc11` are the rewritten, published
forms of the four commits that carried the trailer. Rewrite was message-only and verified content-
identical (`git diff` between pre- and post-rewrite tips: empty); author dates preserved. Force-
pushed with `--force-with-lease`. Pre-rewrite state is retained locally in two backup branches and
two verified `git bundle` exports under
`E:\WorkSync\Projects\RepoBackups\Smart Learning Solutions\`.

> [!warning] **Other clones must hard-reset before their next session.** `main` was force-pushed on
> 2026-09-17. Any clone still holding `c809946` or `8fb709c` has diverged. Run
> `git fetch origin && git reset --hard origin/main` there — do **not** merge or rebase onto the new
> history, which would reintroduce the trailered commits.

**Concurrency caught mid-flight.** `--force-with-lease` rejected the first push attempt: Anthony's
MacBook Pro had pushed `8fb709c` (its own snapshot-destination row) 52 minutes earlier, during a
session-end run. That commit also carried a trailer. It was incorporated into the rewrite rather
than clobbered — the final tree is byte-identical to what that machine published.

**Record corrections.** `STATUS.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md` corrected; the missing
2026-09-16 entry backfilled into `PROGRESS_NOTES.md`. Committed as `367bda8`.

**Vault reconciled in the same session.** `HANDOFF_TO_CLAUDE.md` corrected, and the 2026-09-16
session backfilled into `CURRENT_CONTEXT.md`, `SESSION_LOG.md` and vault-root `AGENT_HANDOFF.md`,
none of which had any entry for it (vault commit `8ee3225`). Vault snapshot taken first:
`RepoBackups\AntBrainOS\snapshot-20260917-024543-pre-sls-record-reconciliation`, verified
2272/2272 files, 0 genuine mismatches. Two gaps in the vault snapshot SOP were found and fixed in
the same session (vault commit `f99d396`): it had no Windows copy branch, and it wrongly recorded
this machine as having no vault git repository.

**Recurrence risk, unresolved.** The trailer was reintroduced on 2026-09-17 by a session on another
machine, well after ADR-021. The ban is configured in this machine's user-level
`~/.claude/CLAUDE.md`; the Macs evidently lack it. A history rewrite cannot prevent recurrence —
see ADR-026's Consequences.

---

## Project Starter Kit v3.10.0 Installation — 2026-09-16 (no version bump)

Resolved a stalled, never-reconciled **V3.4** Starter Kit scaffold (installed 2026-06-21, never
finished) by discarding its 3 quarantined migration-review candidates (`7a425df`) and installing a
real **v3.10.0** migration instead (`web_application` profile, `a51bea6`), via the new
`project-starter-kit-invoke` vault skill. 14 v3.4-owned templates upgraded; 28 new files created;
9 pre-existing files (including `AGENTS.md` and the real `REPOSITORY_HANDOFF_CONFIG.md`) preserved
untouched, with v3.10 template candidates journaled to
`.starter-kit/migrations/18d9b002-.../conflicts/` for review, not merged. Post-apply `validate`:
PASS, 0 findings. **Confirmed next task:** review those 9 conflict candidates. Full detail:
`PROGRESS_NOTE.md` same date.

> **Hashes corrected 2026-09-17.** This entry originally recorded `ca44f3f`/`470f81d` and described
> both commits as "local only — not pushed." Neither hash ever existed on `origin/main`: the work
> was pushed from another machine, replayed onto `95015c4` in the process, and then rewritten again
> by the 2026-09-17 trailer strip (ADR-026). The hashes above are the final published ones. Full
> lineage in `COMMIT_NOTES.md` and ADR-026.

---

## Inline Style Cleanup (M-4) — 2026-09-04 (v2.29.1)

Closed `AUDIT.md`/`BACKLOG.md` M-4: page-specific layout CSS that had been scattered across 7
pages' inline `<style>` blocks (the audit originally named 5 — `book.html`/`contact.html` had each
picked up their own block later, during the v2.23.0 Web3Forms migration, after the audit was
written) is now in `src/css/main.css` under labeled sections. Resolves two pre-existing
base/modifier fragmentations along the way — `main.css` already had photo-variant modifiers
(`.credential-item--photo`, `.format-card:hover ...`) whose base classes lived only inline — and
de-duplicates an identical `.form-success`/`.form-success.visible` pair `book.html`/`contact.html`
had each defined independently. No visual or behavioral change intended; verified via local server
across all 10 pages at their relevant breakpoints. Cache-busting token bumped
(`?v=mobile-20260619d` → `?v=20260904`) across all 10 pages. See `SLICE_REVIEWS.md` SR-021.
**Confirmed final state (2026-09-04):** committed as `1ddcdfe` (functional) → `01b1d10` (docs,
final HEAD at push time) → `86e32f1` (docs-only follow-up recording this machine's `rsync`
gap), all pushed and remote-verified. Tagged `v2.29.1__inline-style-cleanup__commit-1ddcdfe` at
`01b1d10`, pushed and remote-verified. Canonical snapshot created and verified (434/434 files,
21/21 changed-file checksums matched) at
`E:\WorkSync\Projects\RepoBackups\Smart Learning Solutions\v2.29.1__inline-style-cleanup__commit-1ddcdfe`.
**Deployed to staging** via a `scp` fallback (this machine has no `rsync`; see `DECISION_LOG.md`
ADR-025) — all 10 deployed files' checksums matched local source, and the full
`docs/DEPLOYMENT.md` §11 verification checklist passed live. Working tree: **CLEAN**.

---

## 5950X Workstation Diverged-Clone Remediation + Handoff Config Update — 2026-08-31 (no version bump)

This machine's clone (`E:\Projects\GitHub\Smart-Learning-Solutions`, hostname `DESKTOP-8JF1MKA`)
had never been audited or updated since 2026-06-17 — a `REPO_SESSION_START_RECOVERY_AUDIT.md` run
found local `main` diverged from `origin/main` (`ahead 59, behind 121`), because this clone
predated the 2026-07-24 `git filter-repo` rewrite entirely. Remediated (owner-approved plan): a
backup branch preserved the old tip, an old superseded stash was exported then dropped, and
`git fetch --tags --force --prune --prune-tags` + `git reset --hard origin/main` caught this
clone up to `fb560c6` (v2.29.0) with no push required. No application code changed. The only
repo-tracked file change from this session is a new row in
`docs/governance/REPOSITORY_HANDOFF_CONFIG.md`'s Snapshot Destination table for this machine
(owner-confirmed destination), closing the gap that file's own text had flagged for an unmatched
machine. See `DECISION_LOG.md` (this repo) and the AntBrainOS vault project folder's
`SESSION_LOG.md`/`DECISION_LOG.md` 2026-08-31 entries for full detail.

---

## Robots Meta Tags — 2026-08-17 (v2.29.0)

Added an explicit `<meta name="robots">` directive to every page, closing `AUDIT.md`/`BACKLOG.md` M-9. The 9 public pages get `content="index, follow"`; `404.html` gets `content="noindex, nofollow"`. `BACKLOG.md`'s original scope note ("staging/thank-you pages") didn't correspond to any real page in this repo — no thank-you page exists and staging-noindex is a server-header concern (`docs/DEPLOYMENT.md` §8) — so scope followed the audit finding's own recommendation instead, confirmed with the owner. See `SLICE_REVIEWS.md` SR-020.

**Deployed to staging same day (owner-authorized):** `scripts/deploy-staging.sh` — live backup taken first (`smart-learning-solutions.bak-20260818-005305`), verified via direct `curl` against `https://smart-learning-solutions.craftandconscious.com` (robots tags live and correct on all 10 pages, forms still reference `api.web3forms.com`, `og:image` 200, security headers intact, internal paths still 404). Note: the deploy script's documented default SSH key (`~/.ssh/jones_vps`) does not exist on this machine — `~/.ssh/id_ed25519` is the key actually authorized on the VPS; used via `SLS_DEPLOY_SSH_KEY` override. **Two housekeeping gaps closed the same session:** (1) the v2.29.0 canonical snapshot was missed when the tag was first pushed — created and verified retroactively (253/253 files, `diff -rq` identical, all 10 changed-file checksums matched) at `/Users/ant/WorkSync/Projects/RepoBackups/Smart Learning Solutions/v2.29.0__robots-meta-tags__commit-5b757b4`; (2) this repo never had its own `docs/governance/REPOSITORY_HANDOFF_CONFIG.md` (flagged 2026-08-11) — created, filled with real confirmed values including the snapshot destination and SSH-key correction above.

---

## H-3 Cloudflare Retry Paused — 2026-08-13 (no version bump)

Owner retried the Cloudflare Web Analytics dashboard onboarding (still blocked by the same wizard
bug as ADR-020) and then attempted the documented API bypass (`POST .../rum/site_info`, which
accepts a `host` field specifically to route around that wizard). The API path hit a second,
independent blocker: no findable scoped API-token permission for Web Analytics/RUM write access
in the Cloudflare custom-token picker, and the Global API Key fallback needs
`info@SmartLearningSolutions.org` inbox access the owner does not currently have. **Paused, not
abandoned** — H-3 resumes once either credential is available; GoatCounter remains the fallback.
No code changed; Plausible remains the live, unaffected analytics provider. See `DECISION_LOG.md`
ADR-023.

---

## Real Favicon From Client Logo — 2026-08-11 (v2.28.0)

The placeholder SVG favicon (an unrelated hand-drawn orange badge that predated the real client
logo and no longer matched the current accent color) has been replaced across all 10 pages with a
real favicon and apple-touch-icon derived directly from the client's logo mark. Resolves the
long-open `docs/DESIGN.md` "Favicon final?" item. See `SLICE_REVIEWS.md` SR-019.

---

## Git History AI-Attribution Scrub + VPS default_server Hygiene Fix — 2026-07-24 (no version bump)

Two unrelated fixes in one session, both infrastructure/hygiene — no application code changed.

**Git history:** Owner asked to remove all "Claude" mentions from git history. Verification found
only 13 of 113 commits on `main` (24 across all 6 branches) actually carried a
`Co-Authored-By: Claude Sonnet 5` trailer — not every commit, as GitHub Desktop's mixed
co-author-avatar display confirmed. Rewrote all 6 branches via `git filter-repo`: stripped 24
trailers and reworded narrative AI-attribution text in 5 more commits, while preserving every
literal `CLAUDE.md`/`.claude/` filename reference verbatim. Renamed all 64 hash-suffixed tags to
their new hashes — discovering and correcting 4 tags with a **pre-existing** name/target drift
predating this rewrite entirely (e.g. `v2.27.0`'s tag name said `commit-1160a69` but actually
pointed at a different, later commit — most likely an untracked `git tag -f` during real
development). Backfilled 329 stale hash references across `CHANGELOG.md`, `RELEASE_NOTES.md`,
`COMMIT_NOTES.md`, `SLICE_REVIEWS.md`, and `PROGRESS_NOTES.md`. Verified byte-identical file trees
before/after (zero content change, only commit metadata) before force-pushing. Also found and
cleaned up an unrelated, pre-existing orphaned `refs/original/refs/heads/main` backup ref (from
some earlier, unrelated rewrite before this session) that was locally retaining old commits — not
on GitHub, deleted and garbage-collected. See `DECISION_LOG.md` ADR-021, `SLICE_REVIEWS.md` SR-018.

**VPS routing bug:** Owner reported the two hero-video review subdomains showing "Prompt Vault"
instead of the intended site. Root-caused to the owner visiting shortened hostnames (missing the
`smart-learning-solutions-` prefix) that were never configured with their own vhost — the fully
correct URLs were working the whole time. Found the underlying hygiene gap anyway: the
`prompt-vault` vhost on the shared VPS had `listen 80 default_server`, making it the literal
catch-all for the entire multi-tenant box, so *any* unmatched subdomain (for any of the ~15 client
sites on that VPS) would have hit the same failure mode. Fixed by removing `default_server` from
`prompt-vault` and adding an explicit minimal catch-all (`return 444` / `ssl_reject_handshake`).
Verified: unmatched hostnames now close, the real hero-video URLs and all sibling tenants
unaffected. Server-side only — no repo files changed. See `DECISION_LOG.md` ADR-022.

---

## Design Exploration: Video Hero (branch `feat/hero-video-coding-with-robots`) — 2026-07-24, adopted into `main` 2026-09-17

Built a reusable full-bleed video-hero component (`.hero-video-bg` in `main.css`,
`initHeroVideo()` in `animations.js`) and iterated its placement per owner review: first built on
the Coding with Robots program page, then moved to the Workshops page instead per explicit owner
direction, with Coding with Robots reverted to its original design. Deployed live for owner
comparison at `smart-learning-solutions-hero-video-coding-with-robots.craftandconscious.com`
(noindexed, individual Let's Encrypt cert, verified with zero regression to the 8+ other tenants
on the shared VPS). A sibling branch, `feat/hero-video-homepage`, explores the same video on the
homepage instead — also deployed for comparison at its own subdomain; **still not merged**, not
part of this adoption. New accessibility/performance rules this introduced:
`docs/ACCESSIBILITY.md` §6 (muted/looped/reduced-motion-aware background video is now permitted,
replacing a prior blanket "no auto-playing video" line) and `docs/PERFORMANCE.md` §6 (new Video
Rules section). Full build plan: `plans/2026-07-24-hero-video-background.md`.

> **Adopted 2026-09-17.** Left unmerged for over 7 weeks with no owner decision recorded, while
> `main` gained 23 more commits. Merged into `main` this session via a real merge commit (not a
> rebase — no existing hash rewritten) per explicit owner instruction, following the client's
> decision to move to Wix temporarily (`DECISION_LOG.md` ADR-027): this repo is now being kept at
> its best-available state for whenever the client returns off Wix, and this was the most
> complete pending improvement. Full merge record: same date, below.

---

## H-3 Analytics Swap: Cloudflare Web Analytics Attempted, Blocked — 2026-07-23 (no version bump)

Owner decided to replace Plausible ($9/mo) with a free, privacy-friendly analytics provider.
Google Analytics was considered and rejected (would require a cookie-consent banner and a
privacy-policy rewrite for this site). Cloudflare Web Analytics was tried first: an account was
created under `info@SmartLearningSolutions.org` (matching the Web3Forms account), but its "Add a
site" onboarding wizard has a reproducible bug — a typed hostname is rejected as invalid even when
visibly present in the field, and clicking the hostname dropdown clears it entirely. Reproduced
across Chrome, Brave, and a private window, so this is very likely a platform-side issue, not a
local one. No site/token was generated; Plausible remains live and unchanged in
`src/js/components.js`. See `DECISION_LOG.md` ADR-020 and `SLICE_REVIEWS.md` SR-015. **Next
session (after the queued v2.27.0 staging deploy): try GoatCounter instead** — same free/no-cookie
category, simpler signup with no hostname wizard.

---

## About Page Logo Watermark — 2026-07-23 (v2.27.0)

The full two-line logo lockup (including the "solutions" script swoosh, deliberately excluded
from the v2.26.0 header/footer crop) is now placed as a subtle background watermark behind the
"Built on Real Expertise" mission copy on `about.html` — closing that session's flagged open item.
Native orange/teal color (extends `DECISION_LOG.md` ADR-017), 8% opacity (below the sitewide
0.09–0.11 decorative-image convention, given the mission text's `--text-muted` color already sits
close to the AA contrast floor independent of this change — confirmed sufficient via a direct
visual check at all 4 standard breakpoints, not just assumed). Repo-only scope for this pass —
staging deploy is a deliberate, separate follow-up. See `SLICE_REVIEWS.md` SR-014 and
`DECISION_LOG.md` ADR-019.

---

## Staging Deploy — v2.27.0 + v2.26.1 — 2026-07-24 (no version bump)

Deployed the two-line logo watermark (v2.27.0, `about.html`) and the previously-undeployed H-4
page-transition timeout fix (v2.26.1, `components.js`) to staging via `scripts/deploy-staging.sh`
— the confirmed next task from the 2026-07-23 closeout. Followed the standard dry-run → real-run →
curl-verify sequence (SR-009's proven runbook). Verified directly (not assumed): `about.html` now
references `brand-logo-lockup-full.png` (asset itself `200`), `components.js` now contains
`NAVIGATION_TIMEOUT_MS`, and all 7 standard pages return `200` (`/404.html` itself correctly still
`404`s). Staging now matches `main` HEAD. See `SLICE_REVIEWS.md` SR-016.

---

## Page-Transition Overlay Timeout Fallback — 2026-07-22 (v2.26.1)

`BACKLOG.md` H-4 — the shared `.is-navigating` page-transition overlay (used by all 10 pages via
`initPage()` in `src/js/components.js`) had no safety timer: its only removal path was a
`pageshow` listener that fires once the destination page loads. An interrupted or failed
navigation (offline, a stalled load, a `location.assign` edge case) would leave the page stuck
under the overlay with scrolling locked, with no way out short of a manual reload. Added a
`NAVIGATION_TIMEOUT_MS` (4000ms) fallback timer that force-clears the overlay state if `pageshow`
never fires; the `pageshow` listener now clears the pending timer so a normal navigation never
leaves a dangling timeout. Verified via local server + a disposable Playwright script — golden
path unaffected, simulated stalled navigation now self-clears after ~4s instead of staying stuck.
See `SLICE_REVIEWS.md` SR-013. Next confirmed task (per the 2026-07-22 ranked queue): H-3 (pin
Plausible analytics URL).

---

## M-7 Closed as Not Applicable — 2026-07-22 (no version bump)

`BACKLOG.md` M-7 ("populate `book.html`'s `_next` redirect field") was scoped before
implementation, per the Model Selection Gate's task-classification step, rather than implemented
as originally written. Both `book.html` and `contact.html` submit via a JS handler that calls
`e.preventDefault()` and posts to Web3Forms with `fetch()` — success is shown in-page via
`#form-success`, and no native form POST or browser navigation ever occurs. A `_next`/redirect
field only has an effect on a native, non-intercepted submission, so it would be inert even if
added; the literal field AUDIT.md's original finding described no longer exists in `book.html`
at all, having been removed when the form was rebuilt for the Web3Forms/AJAX migration (v2.23.0).
Flagged to the owner rather than adding a no-op field; owner chose to close the item. See
`DECISION_LOG.md` ADR-018 and `SLICE_REVIEWS.md` SR-012. No confirmed next task remains as of
this closure.

---

## Staging Deploy + Reference-File Hygiene — 2026-07-22 (v2.26.0, no new version)

The v2.26.0 client logo is now confirmed live on staging (`smart-learning-solutions.craftandconscious.com`),
not just shipped in the repo — deployed via `scripts/deploy-staging.sh` following the standard
backup → dry-run → real-run → curl-verify sequence (SR-009's proven runbook). Verified directly
(not assumed): the old placeholder logo code was confirmed present on staging before the deploy,
and the new logo asset plus updated `components.js` are confirmed present after, with the full
regression checklist (forms, OG image, security headers, internal-path 404s) unaffected. Also
resolved the one remaining loose end from the logo session: the unused black-line-art reference
file is now tracked in git under a real name (`pics/Logo/logo-black-line-art.jpeg`), closing out
`DECISION_LOG.md` ADR-017's flagged open item. See `SLICE_REVIEWS.md` SR-011.

---

## Client Logo Implementation — 2026-07-22 (v2.26.0)

Replaced the placeholder inline-SVG-badge + text wordmark in the header and footer with the
client's actual logo (`src/images/brand-logo-mark.png`), owner-confirmed as the next task at the
2026-07-19 closeout. The confirmed source file decoded to a full-color orange/teal version with
real alpha transparency, not the black line art a pasted reference image had suggested — used
natively (no CSS filter) since its colors already track the site's existing accent-orange and
cyan tokens and it composites cleanly on the dark background. Cropped to a single-line "icon +
SmartLearning" lockup for the fixed 72px header. Validated live across all 10 pages, the
transparent/scrolled header states, the documented ~1100px nav-squeeze zone (no regression), and
mobile (header, nav-open, footer). Resolves `AUDIT.md` L-2 as a side effect. See
`SLICE_REVIEWS.md` SR-010 and `DECISION_LOG.md` ADR-017.

---

## Staging Redeploy + Deploy-Allowlist Hardening — 2026-07-19 (v2.25.0)

Staging (`smart-learning-solutions.craftandconscious.com`) was found serving a stale deploy from
~2026-06-19/23 — predating the Web3Forms migration and OG-image PNG conversion. Both forms were
live-POSTing to the dead `formspree.io/f/REPLACE_ME` endpoint. Redeployed current `main`
(`cebdea8`) via a new `scripts/deploy-staging.sh`, which uses an explicit path allowlist (not a
denylist) so internal docs structurally cannot be shipped regardless of what new internal files
land in the repo later. Verified via `curl`: forms now hit Web3Forms, OG image is the PNG, all
pages are live and current, security headers and internal-path 404s (from SR-008) unaffected. See
`SLICE_REVIEWS.md` SR-009 and `DECISION_LOG.md` ADR-016.

---

## Nginx Security Headers — Staging — 2026-07-19 (no version bump, server-side only)

Applied the `docs/DEPLOYMENT.md` §7 baseline (`X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy-Report-Only`) to the staging
vhost (`smart-learning-solutions.craftandconscious.com`) on the VPS. Server-side only — no repo
code change. CSP kept in report-only mode per the doc's own guidance (pages still use inline
styles/scripts); HSTS and the separate `X-Robots-Tag` staging-indexing header (§8) were
intentionally not added in this pass. Verified via `curl -sI` on 3 pages (all 5 headers present,
CSP confirmed report-only, existing routing/404 behavior unaffected); config change confirmed as a
single additive `include` line via `diff` against a timestamped pre-change backup. See
`SLICE_REVIEWS.md` SR-008.

Also corrected a stale operational detail found during this session: prior docs
(`PROGRESS_NOTES.md` v2.16.1, `COMMIT_NOTES.md`, `CHANGELOG.md`) reference SSH access via
`~/.ssh/id_ed25519`, but that key no longer exists on the local machine. Working access was
re-established via a different, already-authorized local key. This session also confirmed the VPS
is a shared, multi-tenant host serving several other unrelated client sites alongside this one, not
a dedicated host as earlier docs implied. Historical entries are left as-is (accurate at the time
they were written); this note documents current reality going forward.

---

## OG Image PNG Conversion — 2026-07-18 (v2.24.0)

Resolved M-1: `src/images/og-image.svg` rendered to a 1200×630 PNG via headless Chromium
(an already-present Playwright-cache binary — no new dependency added). All 9 pages carrying an
`og:image` tag now reference `src/images/og-image.png`; the SVG source remains in the repo as
the editable design asset. No `twitter:image` tag exists anywhere, so Twitter/X's
`summary_large_image` card already fell back to `og:image` and needed no separate change.
`PHASE_GATES.md` carried this requirement twice — Gate 1's "Open Graph metadata verified"
criterion and a stale duplicate filed under Gate 3 (Deferred). Gate 1's is now checked; the
Gate 3 duplicate is removed.

---

## Web3Forms Migration + Hosting Decision — 2026-07-18 (v2.23.0)

Launch blocker C-1/OD-001 (Formspree `REPLACE_ME`) is resolved: both forms migrated to
Web3Forms on branch `feat/web3forms-integration`, reviewed, merged into `main`, and pushed.
Inbox delivery to `info@SmartLearningSolutions.org` is confirmed. See
`plans/2026-07-16-web3forms-migration.md` and `DECISION_LOG.md` ADR-015.

Hosting (OD-003): self-hosting on the existing staging VPS (`74.208.9.49`) is being proposed
to the client, superseding the earlier Netlify/GitHub Pages recommendation and the earlier
Wix consideration. Not yet accepted — deployed-domain verification for Gate 1 stays open
until the client accepts and a production domain is live.

---

## Production-Readiness Audit — 2026-06-27 (v2.21.0)

Second V3.4 production-readiness audit run. Overall result: **BLOCKED for client launch** —
same two hard blockers as v2.20.0. Full audit report in plan file
`~/.claude/plans/encapsulated-sauteeing-mist.md`. No code changes executed (all held per
ADR-013 until hosting platform confirmed). One notable confirmation: **C-2 (cursor CSS gate)
is verified fixed** in current code — `cursor: none` is gated by `body.custom-cursor-enabled`
at `src/css/main.css:135-142`; AUDIT.md entry is stale.

### Scorecard (2026-06-27)

| Category | Status | Notes |
|---|---|---|
| Build/runtime | Pass | No build step; `npx serve .` works; ES modules documented |
| Routes/pages | Pass | 10 pages; `programs/` routing verified; custom 404 present |
| Booking/forms | **Fail** | Both forms POST to `REPLACE_ME`; zero conversion possible |
| Security/auth | Fail | No secrets exposed; SRI present; but security headers not applied at server |
| Accessibility | Pass (with gaps) | ARIA, focus states, form validation; gaps: form success a11y, skip links |
| SEO/social | Pass (with gaps) | Canonical, OG, Twitter, robots, sitemap; gap: OG image is SVG |
| Performance | Pass | WebP + responsive `<picture>`; lazy loading; deferred scripts |
| Deployment/HTTPS | **Fail** | Platform unconfirmed; no live config; no HTTPS yet |
| Observability | Pass (minimal) | Plausible configured; form failures visible in Formspree dashboard |
| Documentation/handoff | Pass | README, ARCHITECTURE, DEPLOYMENT, CHANGELOG, PHASE_GATES, DECISION_LOG current |

---

## Production-Readiness Audit — 2026-06-23 (released v2.20.0)

V3.4 production-readiness audit run. Overall result: **BLOCKED for client launch** — same two
hard blockers as below (Formspree `REPLACE_ME`; host/domain unconfirmed). Result recorded in
`docs/governance/REPO_HEALTH_CHECK.md` and `docs/governance/RELEASE_GATE.md`. Risks logged in
`docs/governance/PROJECT_RISK_REGISTER.md` (R-002–R-004); decision logged as ADR-013.

- **Added:** portable privacy policy draft at `legal/privacy-policy.md` (closes the
  "no privacy policy" gap; owner placeholders pending). Footer link + published page are
  deferred until the host platform is confirmed.
- **New open decision — hosting platform:** owner indicated the site may go on **Wix**. Wix
  cannot host this hand-coded static repo as-is (it would require a rebuild in the Wix
  editor). This must be resolved before host-specific work (security headers/CSP, clean-URL
  and 404 wiring, deploy-root doc exclusion) — and before investing further in this
  codebase if the client truly moves to Wix.
- **Held (throwaway-if-Wix):** AVIF `<picture>` fallback, form a11y (live region + focus,
  skip link, `aria-current`), page-transition overlay safety timer, OG image conversion.

---

## Done

- Full 10-page site built: Home, Workshops, Programs (landing + 2 detail), Resources, About, Book, Contact, 404
- Photo-driven redesign sitewide — hero, program pages, about, workshops (v2.13.x)
- Programs landing page at `/programs/` with nav and sitemap wired up (v2.14.0)
- Both booking forms hardened: validation, maxlength constraints, placeholder guard (v2.14.0)
- Custom cursor gracefully degrades on touch/pointer-only devices (v2.14.0)
- SEO: canonical tags, Open Graph, Twitter meta, `robots.txt`, `sitemap.xml`
- Plausible analytics injected via `components.js`
- Security headers and staging noindex documented in `docs/DEPLOYMENT.md`
- Full site diagnostic audit — findings in `AUDIT.md` (v2.14.3)
- `.claude/` added to `.gitignore` (v2.14.4)
- v2 project-control planning system adopted — 7 new docs, CLAUDE.md + AGENTS.md updated (v2.15.2)
- Gate 1 dev-executable fixes: C-2 cursor gate, H-2 SRI hashes, M-2 title, M-3 img dimensions, M-6 tel: (v2.15.3)
- File responsibility map created — `FILE_MAP.md` (v2.15.4)
- File responsibility cleanup — overlapping content removed from ROADMAP, PROJECT_BRIEF, BACKLOG, STATUS, PLAN (v2.15.5)
- Migration complete — ADR-008 updated, MIGRATION_CHECKLIST.md created, result: PASS (v2.15.6)
- Program card proof strip removed — product photo only on programs/index.html and index.html (v2.15.7)
- Project starter kit v3.3 added — tooling reference library under project-starter-kit-v3.3/ (v2.16.0)
- Push workflow prompts added under prompts/ (v2.16.0)
- All release docs (RELEASE_NOTES, COMMIT_NOTES, CHANGELOG) current to v2.16.0
- VPS nginx routing fixed: `$uri.html` added to `try_files`, custom 404 page wired — clean URLs now work (v2.16.1)
- SSH public key added to VPS (74.208.9.49) for direct Claude Code access (v2.16.1)
- nginx 404 root cause documented in `docs/debug/nginx-404-debug.md` (v2.16.1)
- Full production-readiness audit completed and documented — `plans/2026-06-17-website-status-audit.md` (v2.17.0)
- Mobile responsive fixes: full-screen nav overlay, hamburger breakpoint ≤1100px, hero proof-photo crop/radius fixed, eyebrow font-size specificity fixed, CTA button colour in mobile nav — all 10 HTML files cache-busted (v2.18.0)
- Mobile-nav CTA label centring fix: `display: flex` added to `.mobile-nav .btn` so the existing `justify-content: center` takes effect (button was a block box, label left-aligned); `main.css` cache token bumped to `?v=mobile-20260619d` across all 10 HTML files (v2.18.1)
- Project Starter Kit V3.4 migrated into repo — 40 new files: `docs/governance/` (15 governance docs), `docs/project/` (9 project docs), `ai/` (agent prompts, roles, run logs), `.agents/skills/` (4 Codex skills), `MIGRATION_REPORT.md`, `00_MIGRATION_KICKOFF.md`, `V34_INSTALL_REPORT.json`; validator: PASS; AGENTS.md/CLAUDE.md preserved, V3.4 candidates in `.v34_migration_review/` for manual merge (v2.19.0)
- Production-readiness audit (V3.4) + portable doc/governance fixes: BLOCKED result recorded in `REPO_HEALTH_CHECK.md` + `RELEASE_GATE.md`; portable privacy-policy draft added at `legal/privacy-policy.md`; README version/staleness fixed; risks R-002–R-004 + ADR-013 + lessons L-012/L-013 logged (v2.20.0)
- Second production-readiness audit pass: BLOCKED result unchanged (v2.21.0); `main` fast-forwarded to this work after it sat unmerged on `audit/production-readiness` for two weeks
- Mandatory Model Selection Gate adopted repo-wide (`MODEL_SELECTION_GATE.md`, `PROMPT_MODEL_SELECTION_GATE.md`) — see ADR-014; stale `project-starter-kit-v3.3/`/`v3.4/` template folders (and gitignored leftovers) fully removed (v2.22.0)
- Formspree → Web3Forms migration: C-1 launch blocker resolved — both forms wired to a live Web3Forms access key (`src/js/web3forms-config.js`), honeypot spam protection, accessible loading/error states, request timeout added; inbox delivery confirmed; merged to `main` (v2.23.0); see `plans/2026-07-16-web3forms-migration.md`
- Hosting direction logged: self-hosting on the existing VPS proposed to the client (OD-003), pending acceptance (v2.23.0)
- OG image converted from SVG to PNG (1200×630) for social-share compatibility — M-1 resolved via headless-Chromium render; `PHASE_GATES.md` Gate 1/Gate 3 duplicate criterion reconciled (v2.24.0)
- Nginx security headers (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, CSP-Report-Only) applied to the staging vhost per `docs/DEPLOYMENT.md` §7 — server-side only, no repo code change (2026-07-19)
- Staging redeployed to current `main` via new `scripts/deploy-staging.sh` (explicit path allowlist, replacing an untracked, four-week-stale manual deploy) — fixed live forms that were still POSTing to the dead Formspree endpoint and a stale OG image reference; R-004 mitigated for staging (v2.25.0)
- M-7 (`_next` redirect field in `book.html`) closed as not applicable — both forms submit via JS `fetch()` with `e.preventDefault()`, never performing a native POST/redirect, so the field would be inert; it no longer exists in the form at all, removed during the Web3Forms/AJAX migration (v2.23.0); see `DECISION_LOG.md` ADR-018, `SLICE_REVIEWS.md` SR-012 (2026-07-22, no version bump)
- Staging redeployed to current `main` — v2.27.0 logo watermark and v2.26.1 H-4 fix both confirmed live via direct `curl` checks (2026-07-24, no version bump). See `SLICE_REVIEWS.md` SR-016.
- Placeholder favicon replaced with a real PNG favicon + apple-touch-icon derived from the client logo across all 10 pages, resolving the open `docs/DESIGN.md` brand-match question (v2.28.0). See `SLICE_REVIEWS.md` SR-019.

---

## Launch Blockers

| # | Blocker | File(s) | Required? |
|---|---|---|---|
| 1 | ~~**Formspree endpoint** — `REPLACE_ME` still in form action; forms cannot submit~~ — **Resolved in code 2026-07-16**, migrated to Web3Forms; **actually deployed to staging 2026-07-19** — the code fix sat undeployed on staging for 3 weeks (staging was still serving the dead endpoint until this session's redeploy, SR-009) | `book.html`, `contact.html` | Yes |
| 2 | **Deployment target** — **on hold, not blocked, 2026-09-17**: client is hosted on Wix temporarily (ADR-027); staging VPS still configured at `smart-learning-solutions.craftandconscious.com`, production domain not pointed, no active urgency while client is elsewhere | — | Yes, when client returns off Wix |
| 3 | **Testimonials** — owner-supplied quotes pending | — | No (optional) |

---

## Open Audit Items

See `AUDIT.md` for full findings. Open items: H-1 (production domain routing), H-3 (Plausible), M-8 (medium). H-1 staging routing resolved (v2.16.1). C-1 (Formspree) resolved 2026-07-16 — migrated to Web3Forms. M-1 (OG image) resolved 2026-07-18 — converted to PNG. M-6 (`tel:` prefix) resolved v2.15.3. M-7 (`_next` redirect) closed 2026-07-22 — not applicable. H-4 (overlay timeout) resolved 2026-07-22 (v2.26.1). M-9 (robots meta) resolved 2026-08-17 (v2.29.0). M-4 (inline style blocks) resolved 2026-09-04 (v2.29.1) — this line was stale on all three counts before this correction.

---

## Next Actions

| Priority | Action | Finding |
|---|---|---|
| 1 | ~~Create Formspree account → replace `REPLACE_ME`~~ — done via Web3Forms migration, merged to `main` (v2.23.0) | C-1 |
| 2 | Client to accept/reject self-host proposal; once accepted, point production domain to VPS and verify routing end-to-end | H-1 / OD-003 |
| 3 | ~~Convert `og-image.svg` to PNG/JPEG 1200×630~~ — done: `src/images/og-image.png` generated and referenced on all 9 pages, 2026-07-18 | M-1 |
| 4 | ~~Reconcile V3.4 stub docs (`docs/project/`, `docs/governance/`) with existing root-level equivalents~~ — superseded: the V3.4 install itself was discarded 2026-09-16 in favor of a real v3.10.0 migration | V3.4 follow-up (obsolete) |
| 5 | ~~Review V3.4 candidate AGENTS.md/CLAUDE.md in `.v34_migration_review/` and merge any useful additions~~ — done 2026-09-17: the v3.10.0 migration's own 8 conflict candidates (successor to `.v34_migration_review/`) reviewed and dispositioned — `AGENTS.md` merged, 3 files adopted from the kit, 4 kept as-is (live already held real data); see `docs/governance/AGENT_RUN_LOG.md` 2026-09-17 entry | V3.4 follow-up (done) |
| 6 | ~~Run `scripts/deploy-staging.sh` after merging future changes to `main`~~ — done 2026-07-24 (v2.27.0 + v2.26.1 now live on staging, SR-016); no automatic trigger exists, so repeat manually after future merges (L-016) | SR-016 |
| 7 | ~~Confirmed next task (2026-07-24): resume H-3 — try GoatCounter as the free Plausible replacement~~ — carried out and paused per `DECISION_LOG.md` ADR-023 (client email access unavailable); superseded by row 8 below | `DECISION_LOG.md` ADR-020, ADR-023 |
| 8 | Client moved to Wix, temporarily (2026-09-17, `DECISION_LOG.md` ADR-027) — no active next task in this repo until the client's subscription ends and they return; launch-readiness items (hosting, M-8, H-3) are on hold, not blocked | `DECISION_LOG.md` ADR-027 |

---

See `BACKLOG.md` for deferred and post-launch items.
