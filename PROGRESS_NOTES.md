# Progress Notes — Smart Learning Solutions

This is the cumulative progress log for notable project sessions. `PROGRESS_NOTE.md`
remains the focused current-session note and may be overwritten as work advances.

---

## 2026-09-17 — Record Reconciliation + AI-Attribution Trailer Strip (no version bump)

**Branch:** `main`

### Summary

Opened with a `REPO_SESSION_START_RECOVERY_AUDIT.md` run (verdict 🟡 PASS WITH CONDITIONS). Two
findings drove the session: the 2026-09-16 records were materially wrong about their own
publication state and cited hashes that no longer resolve, and four published commits carried
`Co-Authored-By: Claude` trailers in breach of ADR-021.

### Work Completed

- Stripped the trailer from four published commits via a range-scoped `git rebase --exec`, then
  force-pushed with `--force-with-lease` (ADR-026). Final hashes: `7a425df`, `a51bea6`, `5ea595b`,
  `3b3dc11`.
- Incorporated a concurrent push from Anthony's MacBook Pro (`8fb709c`, landed 52 minutes earlier
  during its own session-end run, also trailered) rather than clobbering it — the lease rejection
  is what surfaced it.
- Corrected `STATUS.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md`; added ADR-026; recorded two commits
  (`5ea595b`, `3b3dc11`) that no record had mentioned at all.
- Reconciled the vault records in the same session.

### Validation Performed

- `git diff` pre-rewrite tip → rewritten tip: **empty**, both before and after incorporating
  `8fb709c` — content provably unchanged, no machine's work lost.
- Zero `Co-Authored-By` trailers reachable from `main`, checked via `%(trailers:key=...)` rather
  than a text grep; `a3a291a`'s narrative mention verified intact outside the rewritten range.
- Post-push: local `HEAD` == `git ls-remote origin refs/heads/main`, clean tree, 0 ahead / 0 behind.

### Not Yet Verified / Open

- Other clones must `git fetch origin && git reset --hard origin/main` before their next session.
- Recurrence unresolved — the Macs' user-level config lacks the ban; not reachable from here.
- Confirmed next task unchanged: review the 9 v3.10 migration conflict candidates.

---

## 2026-09-16 — Project Starter Kit v3.10.0 Installation (no version bump)

**Branch:** `main`

*(Backfilled 2026-09-17 — this session was never recorded in this cumulative log when it ran.)*

### Summary

Resolved a stalled, never-reconciled V3.4 Starter Kit scaffold (installed 2026-06-21, never
finished) by discarding its 3 quarantined `.v34_migration_review/` candidates, then running a real
v3.10.0 migration (`web_application` profile) via the new `project-starter-kit-invoke` vault skill.
Run on a different machine from the 5950X.

### Work Completed

- Discarded the 3 unresolved v3.4 candidates (`7a425df`) — both markdown candidates carried generic
  V3.4 boilerplate with none of this repo's real business rules; root `AGENTS.md`/`CLAUDE.md` left
  untouched and authoritative.
- Ran `inspect` → `plan-migration` → `migrate --apply` → `validate` (`a51bea6`). 14 v3.4-owned
  templates upgraded to v3.10; 28 new files created; 9 pre-existing files preserved with v3.10
  candidates journaled to `.starter-kit/migrations/18d9b002-.../conflicts/` rather than merged.
- Post-apply `validate`: PASS, 0 findings across all 6 layers.
- Session closeout records written (`5ea595b`).

### Validation Performed

- Kit report claims independently checked against real repo state (`git diff --stat`, file counts)
  rather than trusted as written.
- A real invocation bug in the new skill was found and fixed mid-session: its documented
  `python3 -m starter_kit.cli` entry point silently exits 0 (`cli.py` has no `__main__` guard).

### Not Yet Verified / Open

- 9 preserved-conflict candidates still need a merge/keep/retire decision each — **the standing
  confirmed next task.**
- `docs/project/` V3.4-era stubs untouched; `CLAUDE.md` was not in the `web_application` profile's
  plan at all, not investigated.
- **Recorded incorrectly at the time:** this session's records described its commits as "local only
  — not pushed" at `ca44f3f`/`470f81d`. Both were pushed afterwards, replayed onto `95015c4`, and
  rewritten again by ADR-026. See the 2026-09-17 entry above.

---

## 2026-09-04 — Inline Style Cleanup (M-4)

**Branch:** `main`

### Summary
Confirmed next task from the 2026-08-17 and 2026-08-31 closeouts: `BACKLOG.md` M-4. `AUDIT.md`'s
finding named 5 affected pages; direct inspection during planning found 7 —
`book.html`/`contact.html` also had inline `<style>` blocks, likely added during the later
v2.23.0 Web3Forms migration, after the audit was written. Owner confirmed (via `AskUserQuestion`)
to widen scope to all 7.

### Work Completed
- Moved each of the 7 pages' page-specific `<style>` block into `src/css/main.css`, each inserted
  next to its most related existing section — resolving two pre-existing base/modifier
  fragmentations along the way (`.credential-item--photo`, `.format-card:hover ...`).
- De-duplicated an identical `.form-success`/`.form-success.visible` pair `book.html` and
  `contact.html` had each defined independently.
- Removed the resulting empty `<style>` block from all 7 pages; each page's line-6
  FOUC-prevention `<style>` snippet untouched.
- Bumped the `main.css` cache-busting token (`?v=mobile-20260619d` → `?v=20260904`) across all 10
  pages.
- Ran the full release ceremony (`AUDIT.md`, `BACKLOG.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`,
  `SLICE_REVIEWS.md` SR-021, `STATUS.md`, `PLAN.md`); version bumped v2.29.0 → v2.29.1.

### Validation
`main.css` grew 2342 → 2723 lines, brace-balanced (467/467); each moved class resolved to exactly
one base definition. All 10 pages verified `200` via a local Node HTTP server; `grep -c '<style'`
returned 1 per changed file (was 2); zero remaining hits for the old cache-bust token;
`git diff --stat` confirmed only the 10 HTML files + `main.css` changed in slices 1-2.

### Confirmed Final State (2026-09-04)
Committed `1ddcdfe` (functional) → `01b1d10` (docs) → `86e32f1` (docs-only follow-up), all pushed
and remote-verified. Tagged `v2.29.1__inline-style-cleanup__commit-1ddcdfe`, pushed and
remote-verified. Snapshot created and verified. Deployed to staging via a `scp` fallback
(`DECISION_LOG.md` ADR-025, since this machine has no `rsync`) and verified live via `curl` in
full. `COMMIT_NOTES.md` has its entry.

---

## 2026-08-31 — 5950X Workstation Diverged-Clone Remediation

**Branch:** `main`

### Summary
First-ever audited Claude Code session on this Windows machine's clone found `main` diverged from
`origin/main` (`ahead 59, behind 121`) — the clone predated the 2026-07-24 `git filter-repo`
rewrite entirely and had never been updated since 2026-06-17. Ran a session-start recovery audit,
planned the remediation with the owner in Plan Mode (Model Selection Gate shown: Claude Code in
VS Code, Sonnet 5, high effort), then executed and verified it.

### Work Completed
- Created backup branch `backup/main-pre-catchup-20260831-2e035bd` preserving the old, now-stale
  `main` tip before touching anything.
- Exported the one existing stash (`stash@{0}`, a superseded v2.15.0 planning-docs WIP) to
  `E:\Projects\GitHub\_backups\Smart-Learning-Solutions\stash-cc88cfd-20260831.patch`, then dropped
  it.
- Ran `git fetch origin --tags --force --prune --prune-tags` (required — a plain fetch never
  overwrites an existing local tag, and the 2026-07-24 rewrite recreated all 74 tags) then
  `git reset --hard origin/main`, bringing local `main` from `2e035bd` (2026-06-17) to `fb560c6`
  (v2.29.0, 2026-08-17).
- Verified: branch in sync with `origin/main`, working tree clean, no `Co-authored-by` trailers
  remain on any local ref, `docs/governance/REPOSITORY_HANDOFF_CONFIG.md` now present. **No push
  occurred** — only local refs moved to match an already-correct, already-fetched `origin/main`.
- Took a fresh AntBrainOS vault snapshot (concurrency-verified against 15 other live sessions on
  this machine), then updated the vault project folder's `CURRENT_CONTEXT.md`/`SESSION_LOG.md`/
  `DECISION_LOG.md` and this repo's `REPOSITORY_HANDOFF_CONFIG.md` (new snapshot-destination row
  for this machine, owner-confirmed path).

### Validation Performed
`git status -sb`, `git rev-parse HEAD origin/main`, `git status --porcelain=v1
--untracked-files=all`, `git log --branches --tags --grep="^Co-authored-by:" -i` — all matched
expected post-reset state.

### Notes For Next Agent
No application work was done this session. The 2026-08-17 confirmed next task — **M-4** (remove
inline `style=` blocks) — remains the standing pick, now unblocked by this catch-up.

---

## 2026-08-17, continued — Staging Deploy + Snapshot/Config Housekeeping

**Branch:** `main`

### Summary
Owner authorized deploying v2.29.0 (robots meta tags) to staging and asked to clean up the
long-flagged stale vault `PROJECT.md` repo path (hyphenated, nonexistent — `Smart-Learning-
Solutions` vs. the real space-named directory) and orphaned commit hash (`57c28ef`, predates the
2026-07-24 `git filter-repo` rewrite). While closing this session out via the repo-push super
prompt, also found and closed two related housekeeping gaps: the v2.29.0 canonical snapshot had
been skipped when the tag was first pushed, and this repo still had no local
`docs/governance/REPOSITORY_HANDOFF_CONFIG.md` (a gap first flagged 2026-08-11).

### Work Completed
- Deployed v2.29.0 to staging via `scripts/deploy-staging.sh` — live backup taken first
  (`smart-learning-solutions.bak-20260818-005305`), dry-run reviewed, real run applied. Verified
  via direct `curl`: robots meta tags live and correct on all 10 pages, forms still reference
  `api.web3forms.com`, `og:image` 200, security headers intact, internal paths (`/AUDIT.md`,
  `/.git/config`) still 404.
- **SSH key correction:** the deploy script's documented default (`~/.ssh/jones_vps`) does not
  exist on this machine — `~/.ssh/id_ed25519` is the key actually authorized on the VPS. Used via
  `SLS_DEPLOY_SSH_KEY` override; now recorded in the new handoff config below so this doesn't need
  rediscovering.
- Created the missing v2.29.0 canonical snapshot at `/Users/ant/WorkSync/Projects/RepoBackups/
  Smart Learning Solutions/v2.29.0__robots-meta-tags__commit-5b757b4` — 253/253 files matched,
  `diff -rq` identical, all 10 changed-file SHA-256 checksums matched.
- Created `docs/governance/REPOSITORY_HANDOFF_CONFIG.md`, filled with real confirmed values
  (snapshot destination, SSH key, deploy contract, safety boundaries) — closes the gap flagged
  2026-08-11.
- Fixed the vault project folder's `PROJECT.md` `Repo:` line (space-named path, current
  `v2.29.0`/`10fd1b5`) — vault-side, took a pre-edit snapshot first per that SOP
  (`snapshot-20260817-210732-pre-project-md-stale-path-fix`, 7143/7143 files, 1 unrelated
  concurrent-edit checksum drift disclosed in its manifest).

### Validation Performed
- Staging `curl` checks listed above, all passed.
- Repo snapshot: file-count match + `diff -rq` + targeted checksums, all passed.
- Vault snapshot: file-count match, checksum comparison (1 unrelated drift disclosed, not from
  this session's work).

### Notes for the Next Agent
- This entry's own commit/push (recording the deploy + snapshot/config housekeeping above) is
  captured in this same session's closeout — check `git log`/`COMMIT_NOTES.md` for the exact
  final hash rather than assuming this note's own hash references are final.
- Standing queue unchanged: H-3 (paused, `DECISION_LOG.md` ADR-023), M-4 (inline style cleanup),
  V3.4 doc reconciliation, M-8 (email casing, held on OD-003).

---

## 2026-08-17 — Robots Meta Tags (v2.29.0)

**Branch:** `main`

### Summary
Confirmed next task from the 2026-08-14 closeout. `BACKLOG.md`'s M-9 scope note ("staging/
thank-you pages") didn't correspond to any real page in this repo — no thank-you page exists and
staging-noindex is a server-header concern (`docs/DEPLOYMENT.md` §8). Owner confirmed (via
`AskUserQuestion`) the real scope: follow `AUDIT.md`'s own M-9 finding instead — explicit
`index, follow` on all 9 public pages, `noindex, nofollow` on `404.html`.

### Work Completed
- Added the robots meta tag to all 10 HTML pages (9× `index, follow`, 1× `noindex, nofollow` on
  `404.html`), matching existing `<head>` conventions exactly.
- Closed `BACKLOG.md` M-9 and the `AUDIT.md` M-9 finding.
- Ran the full release ceremony (`CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`,
  `SLICE_REVIEWS.md` SR-020, `STATUS.md`, `PLAN.md`); version bumped v2.28.0 → v2.29.0 per
  `docs/VERSIONING.md` §4.

### Validation Performed
- `grep`/`curl` against a local server confirmed exactly one correctly-valued robots tag per
  page, all 10 pages `200`. `git diff --stat` confirmed only the intended files changed.

### Notes for the Next Agent
- Commit/tag/push for this work is pending owner confirmation as of this entry — check
  `HANDOFF_TO_CLAUDE.md`/git state before assuming it landed.
- Standing queue after M-9: H-3 (paused, `DECISION_LOG.md` ADR-023), M-4 (inline style cleanup),
  V3.4 doc reconciliation, M-8 (email casing, held on OD-003).

---

## 2026-08-13 — H-3 Cloudflare Retry Paused (no version bump)

**Branch:** `main`

### Summary
Owner asked to retry Cloudflare Web Analytics onboarding for H-3 (analytics provider swap). The
dashboard "Add a site" wizard is still blocked by the same reproducible bug recorded in
`DECISION_LOG.md` ADR-020. A full implementation plan for the documented API bypass
(`POST /accounts/{account_id}/rum/site_info`) was written and approved before any owner action —
see the local plan file referenced in ADR-023. Attempting that path surfaced a second, independent
blocker: no Web Analytics/RUM write permission could be found in Cloudflare's scoped
custom-token picker, and the Global API Key fallback requires access to the
`info@SmartLearningSolutions.org` inbox that the owner doesn't currently have.

### Work Completed
- Recorded the second blocker and its resolution path in `DECISION_LOG.md` ADR-023.
- Updated `BACKLOG.md` H-3 and `PLAN.md` to reflect **paused, not abandoned** status, with the
  resume condition stated explicitly (either credential becoming available).
- No code changed. Plausible remains the live, unaffected analytics provider.

### Validation Performed
- Confirmed via `git status` that the working tree was clean before and only the intended
  docs/decision-log files changed.

### Notes for the Next Agent
- To resume H-3: check whether the owner has `info@SmartLearningSolutions.org` inbox access (for
  the Global API Key) or has found a Web Analytics/RUM **Edit** permission in the Cloudflare
  custom-token picker that wasn't found this session — either unblocks Slice 1 of the plan
  referenced in ADR-023. If Cloudflare keeps blocking after that, GoatCounter is the standing
  fallback per ADR-020.

---

## 2026-08-11 — Real Favicon From Client Logo (v2.28.0)

**Branch:** `main`

### Summary
Replaced the stale placeholder favicon (predates the real logo, color-mismatched) with a real
favicon + apple-touch-icon derived directly from the client's brand mark, across all 10 HTML
pages. Resolves the long-open `docs/DESIGN.md` "Favicon final?" item and completes the task
confirmed as next at the 2026-07-24 closeout.

### Work Completed
- Cropped the icon (running figure + kite) out of `src/images/brand-logo-mark.png` using
  pixel-level connected-component analysis, since a simple rectangular crop bled into the
  "Learning" wordmark's flourish. Exported `src/images/favicon.png` (32×32, new) and
  `src/images/apple-touch-icon.png` (180×180, new).
- Replaced the placeholder `<link rel="icon">` tag in all 10 HTML pages with the new favicon,
  and added a new `<link rel="apple-touch-icon">` tag to each.
- Updated `docs/DESIGN.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`,
  `SLICE_REVIEWS.md` (SR-019), `STATUS.md`, `PLAN.md`.
- Validated via local server + real headless-browser screenshots (index, 404, one-directory-down
  `programs/coding-with-robots.html`) — no regressions, both assets serve `200`/`image/png`.
- Push/tag held for explicit owner go-ahead, per this repo's standing norm.

---

## 2026-07-24, continued — Git History AI-Attribution Scrub + VPS default_server Hygiene Fix (no version bump)

**Branch:** `main`

### Summary
Two unrelated fixes, both infrastructure/hygiene, no application code changed. (1) Owner asked to
remove all "Claude" mentions from git history; rewrote all 6 branches via `git filter-repo`,
renamed 64 tags (fixing 4 pre-existing drifted tags found along the way), backfilled 329 doc hash
references, force-pushed. (2) Owner reported the two hero-video review subdomains showing "Prompt
Vault" — root-caused to a URL typo (missing prefix) plus a real underlying VPS hygiene gap
(`prompt-vault`'s vhost was the shared box's HTTP `default_server`); fixed both.

### Work Completed
- **Git history:** Verified via direct git commands (not assumed) that only 13/113 commits on
  `main` carried the `Co-Authored-By: Claude` trailer. Classified all 34 Claude-mentioning commits
  by hand: 22 mechanical trailer-strips, 5 hand-reworded (narrative text removed, literal
  `CLAUDE.md`/`.claude/` references preserved), 6 left untouched (filename-only mentions), 1
  borderline commit judged as filename-only. Ran `git filter-repo --commit-callback` across all 6
  branches in one pass (consistent old→new SHA mapping for shared ancestry). Renamed all 64
  hash-suffixed tags; found and fixed 4 tags whose name-embedded hash didn't match their actual
  target — a pre-existing bug (likely an untracked `git tag -f`) unrelated to this rewrite. Backfilled
  329 hash references across 5 doc files via targeted literal-string substitution (never a generic
  hex regex — confirmed this correctly skipped unrelated hex-looking tokens like
  `?v=mobile-20260619d`). Force-pushed all 6 branches and 74 tags; re-synced the local working
  directory (which still had old history) to match. Found and removed an unrelated, pre-existing
  orphaned `refs/original/refs/heads/main` ref (from some earlier, unrelated rewrite predating this
  session) that was locally retaining old commits, invisible on GitHub.
- **VPS routing bug:** Diagnosed via direct `curl`/`dig`/`openssl s_client` checks against both the
  URLs the owner was actually visiting and the correctly-configured ones. Confirmed via SSH that
  `prompt-vault`'s nginx vhost had `listen 80 default_server` — the literal HTTP catch-all for the
  entire ~15-site shared VPS. Removed `default_server` from it; added a new minimal catch-all vhost
  (`return 444` for HTTP, `ssl_reject_handshake on` for HTTPS — no cert needed). Validated with
  `nginx -t` before reload.
- `DECISION_LOG.md` ADR-021 (git history scrub scope/method) and ADR-022 (VPS default_server fix)
  added. `SLICE_REVIEWS.md` SR-017 (VPS fix) and SR-018 (git rewrite) added. `STATUS.md`, `PLAN.md`,
  `COMMIT_NOTES.md` updated.

### Validation Performed
- Tree-identity check: `git diff <old-tree> <new-tree>` empty for all 6 branches — file contents
  byte-identical before/after the rewrite, only commit metadata changed.
- Commit-count parity per branch confirmed unchanged.
- Zero remaining `Claude` mentions (case-insensitive, all branches/tags) except intentional
  `CLAUDE.md`/`.claude/` literal references — verified by direct re-grep after the rewrite.
- All 74 tags resolve; all 64 hash-suffixed tag names verified to match their actual target's
  short hash (0 mismatches on final pass).
- Local vs. origin: every branch hash and all 74 tag hashes verified to match exactly
  (`git ls-remote` diff, zero differences).
- Nginx fix: `curl` confirmed unmatched hostnames now return connection-closed/444, the real
  hero-video URLs still return 200 with correct content/cert/`X-Robots-Tag`, and 2 sibling tenants
  (`old-fashion-care`, `swarm-defense`) still return 200 — zero regression.

### Not Yet Verified / Open
- Confirmed-queue backlog (H-3 GoatCounter signup, then M-9/M-4/...) is unaffected by this session
  and remains the standing next dev task — see `PLAN.md`.
- Rewrite-workspace clone and pre-rewrite backups (`~/Projects/GitHub/_backups/`,
  `~/Projects/GitHub/_rewrite-workspace/`) left in place outside the repo for rollback safety; not
  part of this repo's own tracked state.
- This repo still has no `REPOSITORY_HANDOFF_CONFIG.md` — the canonical snapshot step in this
  session's own closeout will stop rather than guess a destination, same gap noted 2026-07-24
  earlier this same day.

### Launch Blockers (unchanged)
1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0), confirmed live on staging.
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).

---

## 2026-07-24 — Staging Deploy: v2.27.0 + v2.26.1 (no version bump)

**Branch:** `main`

### Summary
Deployed the two-line logo watermark (v2.27.0) and the previously-undeployed page-transition
overlay timeout fix (v2.26.1) to staging via `scripts/deploy-staging.sh` — the confirmed next
task from the 2026-07-23 closeout. No repo code changed; deploy-only session. Running the
`ssh`/`rsync` calls required disabling Claude Code's default Bash network sandbox for those
specific commands (the sandbox blocks raw-IP port-22 connections even though HTTPS to the same
host works) — no vault or repo precedent existed either way, so this proceeded only after
explicit owner confirmation. Logged as `LESSONS_LEARNED.md` L-017. A concurrent session's push
(H-3 analytics-swap entry below) landed on `origin/main` mid-session and had already claimed
SR-015/ADR-020 for unrelated content — this session's own entries were renumbered to SR-016 after
rebasing, the same renumber-on-collision precedent as ADR-018/SR-012.

### Work Completed / Areas Changed
`SLICE_REVIEWS.md` (SR-016, new), `STATUS.md`, `PLAN.md`, `LESSONS_LEARNED.md` (L-017, new),
`COMMIT_NOTES.md`, `PROGRESS_NOTE.md`. No `src/`/`*.html` changes — deploy-only.

### Validation Performed
Dry-run confirmed staging was stale on exactly the expected files before the real run. Post-deploy
`curl` verification directly against the live staging URL: `about.html` references
`brand-logo-lockup-full.png` (asset itself `200`); `components.js` contains
`NAVIGATION_TIMEOUT_MS`; all 7 standard pages return `200` (`/404.html` itself correctly still
`404`s). Staging now matches `main` HEAD.

---

## 2026-07-23 — H-3: Analytics Swap — Cloudflare Web Analytics Attempted, Blocked (no version bump)

**Branch:** `main`

### Summary
Owner decided to replace Plausible ($9/mo) with a free, privacy-friendly analytics provider.
Google Analytics rejected (cookie-consent/privacy-policy overhead disproportionate to this site's
needs). Cloudflare Web Analytics tried first: account created under
`info@SmartLearningSolutions.org`, but its "Add a site" onboarding wizard has a reproducible bug —
a typed hostname is rejected as invalid even while visibly present, and clicking the hostname
dropdown clears the field, looping indefinitely. Reproduced across Chrome, Brave, and a private
window. No site/token was generated; no code change made; Plausible remains live.

### Work Completed / Areas Changed
No code change. `BACKLOG.md` (H-3 reframed), `DECISION_LOG.md` (new ADR-020), `SLICE_REVIEWS.md`
(new SR-015), `STATUS.md`, `PLAN.md`.

### Validation Performed
Live, in-session Cloudflare account-creation and onboarding attempt with the owner sharing
screenshots at each step; the bug was reproduced across three separate browser/session
combinations before concluding further local troubleshooting was unlikely to help.

### Notes for the Next Agent
Confirmed next task, in order: (1) deploy the already-shipped v2.27.0 to staging via
`scripts/deploy-staging.sh` — **done 2026-07-24, see the entry above**; (2) then resume H-3 by
trying GoatCounter's signup instead of Cloudflare — its flow is a plain account + site-name form
with no hostname-selection wizard, sidestepping the exact bug hit here.

---

## 2026-07-23 — Two-Line Logo Lockup Watermark on About Page (v2.27.0)

**Branch:** `main`

### Summary
Closed the non-blocking open item flagged at the end of the v2.26.0 logo session: the full
two-line logo lockup (including the "solutions" script swoosh, deliberately excluded from the
single-line header/footer crop) is now placed as a subtle background watermark behind the "Built
on Real Expertise" mission copy on `about.html`. Owner chose this placement over two alternatives
(a CTA-band accent, a fully visible hero mark) after reviewing mockups of each, and chose
repo-only scope for this pass — staging deploy is a deliberate, separate follow-up. This session
also discovered and reconciled a concurrent-session conflict: another session pushed the H-4 fix
and M-7 closure below (both dated 2026-07-22) to `origin/main` while this work was in progress,
and both sessions had independently used `ADR-018`/`SR-012` for unrelated content — resolved by
rebasing this session's commits onto the new `origin/main` and renumbering this session's entries
to `ADR-019`/`SR-014`.

### Work Completed / Areas Changed
`src/images/brand-logo-lockup-full.png` (new, native 277×164 export from
`pics/Logo/Logo.png.avif`), `about.html` (`.about-mission`/`.about-mission-watermark`),
`CHANGELOG.md`, `RELEASE_NOTES.md`, `SLICE_REVIEWS.md` (SR-014), `DECISION_LOG.md` (ADR-019,
extends ADR-017), `STATUS.md`, `COMMIT_NOTES.md`, `PLAN.md`,
`plans/2026-07-22-two-line-logo-watermark.md` (new).

### Validation Performed
Disposable Playwright script (local static server, real Chromium) across all 10 pages: 200
status, zero console/page errors; new asset loads only on `about.html`; existing header/footer
logo unaffected everywhere. Computed-style check confirmed correct watermark/text stacking order
(`z-index: 0` vs. `1`) and containment within the mission column. Visual check at
375/768/1024/1440px: watermark reads as intentionally subtle at every breakpoint, no bleed into
the credentials list, all copy remains fully legible. `prefers-reduced-motion` fallback confirmed
unaffected.

### Notes for the Next Agent
Staging deploy of this change is a likely near-term follow-up (matching how the original logo
work split code (SR-010) from deploy (SR-011)) — not yet done, by the owner's explicit choice of
scope for this pass. Production hosting remains gated on OD-003. A RepoBackups snapshot folder
(`v2.26.1__page-transition-overlay-timeout-fallback__commit-e1950fb`) initially appeared to
reference a commit absent from local git history — later explained: it was the concurrent
session's real, pushed commit, fetched only after this session ran `git fetch` (see this entry's
Summary). Not a stale/orphaned artifact after all.

---

## 2026-07-22 — H-4: Page-Transition Overlay Timeout Fallback (v2.26.1)

**Branch:** `main`

### Summary
`BACKLOG.md` H-4, first item in the owner-confirmed 2026-07-22 ranked next-task queue
(`PLAN.md`): the shared `.is-navigating` page-transition overlay (`initPage()` in
`src/js/components.js`, used by all 10 pages) had no safety timer — its only removal path was a
`pageshow` listener firing on the destination page. An interrupted/failed navigation (offline, a
stalled load, a `location.assign` edge case) would leave the page stuck under the overlay
indefinitely, scrolling locked. Added a `NAVIGATION_TIMEOUT_MS` (4000ms) fallback timer that
force-clears the state if `pageshow` never fires; the `pageshow` listener now clears the pending
timer so a normal navigation never leaves it dangling.

### Work Completed / Areas Changed
`src/js/components.js` (only file changed — no CSS/HTML needed). Version bumped to v2.26.1
(patch, per `docs/VERSIONING.md`). `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`,
`SLICE_REVIEWS.md` (new SR-013), `STATUS.md`, `BACKLOG.md` (H-4 row closed), `PLAN.md` (queue
advanced to H-3).

### Validation Performed
Local static server + a disposable Playwright script. Golden-path navigation (real clicks across
`index.html`, `book.html`, `workshops.html`) confirmed no regression. Simulated a stalled
navigation via an aborted route: overlay correctly shown immediately after the click, then
force-cleared automatically ~4.3s later by the new safety timer instead of staying stuck.

### Notes for the Next Agent
Not yet deployed to staging — a code-only fix pending the usual `scripts/deploy-staging.sh` run.
Next confirmed task per the ranked queue: H-3 (pin/document the Plausible analytics script URL).

---

## 2026-07-22 — M-7 Closed as Not Applicable (`_next` Redirect Field)

**Branch:** `main`

### Summary
`BACKLOG.md` M-7 ("populate `book.html`'s `_next` redirect field") was scoped via the Model
Selection Gate before implementing it, rather than implemented as originally written. Both
`book.html` and `contact.html` submit via a JS handler that calls `e.preventDefault()` and posts
to Web3Forms with `fetch()` — success is shown in-page via `#form-success`, and no native form
POST or browser navigation ever occurs. A `_next`/redirect field only has an effect on a native,
non-intercepted submission, so it would be inert even if added — and the literal field AUDIT.md's
original finding described no longer exists in `book.html` at all, removed when the form was
rebuilt for the Web3Forms/AJAX migration (v2.23.0). Flagged to the owner rather than adding a
no-op field; owner chose to close the item outright.

### Work Completed / Areas Changed
No code change. `BACKLOG.md` (M-7 row closed), `AUDIT.md` (M-7 finding marked closed),
`DECISION_LOG.md` (new ADR-018), `SLICE_REVIEWS.md` (new SR-012), `STATUS.md`, `COMMIT_NOTES.md`.

### Validation Performed
Direct source inspection of both forms' submit handlers and hidden-field lists confirmed no
`_next`/redirect field present in either file, and confirmed the `preventDefault()` + `fetch()`
pattern in both.

### Notes for the Next Agent
No confirmed next task remains as of this closure — the next session-end closeout should
establish one.

---

## 2026-07-22 — Client Logo Implementation (v2.26.0) + Staging Deploy/Reference-File Hygiene

**Branch:** `main`

### Summary
Replaced the placeholder inline-SVG-badge + text wordmark with the client's actual logo
(owner-confirmed next task from the 2026-07-21 closeout). Source file decoded to a full-color
orange/teal version, not the black line art initially expected — flagged rather than guessed;
owner deferred the color call, used natively (`DECISION_LOG.md` ADR-017). Same day, closed two
loose ends flagged at that session's end: deployed to staging (verified stale before, current
after, per L-016) and resolved the unused reference file's fate (owner: keep, renamed and
tracked). This entry also backfills a gap: `PROGRESS_NOTES.md` had no v2.25.0 entry — see below.

### Work Completed / Areas Changed
`src/images/brand-logo-mark.png` (new), `src/js/components.js`, `src/css/main.css`, `AUDIT.md`
(L-2 resolved), `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md`
(SR-010, SR-011), `DECISION_LOG.md` (ADR-017), `STATUS.md`, `PLAN.md`,
`plans/2026-07-22-implement-client-logo.md` (new),
`pics/Logo/logo-black-line-art.jpeg` (new, renamed from an untracked device-export filename).
VPS: `/var/www/smart-learning-solutions/` redeployed to current `main`.

### Validation Performed
Local server + a disposable Playwright script drove real Chromium across all 10 pages (200
status, zero console errors) and a detailed visual pass (header transparent/scrolled states,
footer, ~1100px breakpoint, mobile). Post-deploy `curl` confirmed the new asset live and the full
SR-009 regression checklist (forms, OG image, security headers, internal-path 404s) unaffected.

### Notes for the Next Agent
No next task confirmed with the owner yet — the next `REPO_SESSION_END_CLOSEOUT.md` run should
establish one. Non-blocking open item: the full two-line logo lockup (with "solutions") isn't
placed anywhere yet. Production hosting remains gated on OD-003.

---

## v2.25.0 — 2026-07-19 — Staging Redeploy + Deploy-Allowlist Hardening

**Branch:** `main`

### Summary
Staging was found serving a stale deploy from ~2026-06-19/23 — predating the Web3Forms migration
and OG-image PNG conversion, with both forms live-POSTing to the dead Formspree endpoint despite
the code fixes having merged weeks earlier. Redeployed current `main` via a new
allowlist-based `scripts/deploy-staging.sh`, chosen over a denylist since this repo has
repeatedly added new internal top-level directories a denylist would need to keep excluding
(`DECISION_LOG.md` ADR-016). *(Backfilled 2026-07-22 — this entry was missing.)*

### Work Completed / Areas Changed
`scripts/deploy-staging.sh` (new), `docs/DEPLOYMENT.md`,
`docs/governance/PROJECT_RISK_REGISTER.md` (R-004), `LESSONS_LEARNED.md` (L-013 resolved, new
L-016), `DECISION_LOG.md` (ADR-016), `FILE_MAP.md`, `STATUS.md`, `PHASE_GATES.md`,
`SLICE_REVIEWS.md` (SR-009), `CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`. VPS:
`/var/www/smart-learning-solutions/` redeployed; pre-change backup taken.

### Validation Performed
Dry run reviewed before the real run; post-deploy `curl` confirmed both forms on
`api.web3forms.com` with zero `formspree`/`REPLACE_ME` matches, `og:image` on the PNG, all pages
200, SR-008's security headers and internal-path 404s unaffected.

### Notes for the Next Agent
`scripts/deploy-staging.sh` has no automatic trigger — must be re-run manually after any future
`main` merge that should reach staging, or drift can recur silently (L-016).

---

## 2026-07-19 — Nginx Security Headers on Staging (server-side, no version bump)

**Branch:** `main` (no repo code change for the core task)

### Summary
Applied `docs/DEPLOYMENT.md` §7's baseline security headers (`X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy-Report-Only`)
to the staging vhost (`smart-learning-solutions.craftandconscious.com`) on the VPS, server-side
only. CSP kept in report-only mode; HSTS and §8's `X-Robots-Tag` intentionally not added in this
pass. Discovered and corrected a stale operational detail: the documented SSH key
(`~/.ssh/id_ed25519`) no longer exists locally — access was re-established via a different,
already-authorized key — and confirmed the VPS is a shared, multi-tenant host serving several
other unrelated client sites, not dedicated to this project.

### Work Completed / Areas Changed
VPS: `/etc/nginx/sites-available/smart-learning-solutions` (server-side, one added `include`
line), new `/etc/nginx/snippets/security-headers.conf` (server-side). Repo docs updated:
`docs/DEPLOYMENT.md`, `STATUS.md`, `PHASE_GATES.md`, `SLICE_REVIEWS.md` (SR-008), this file,
`PROGRESS_NOTE.md`.

### Validation Performed
`nginx -t` passed before and after; `curl -sI` confirmed all 5 headers on 3 pages (root, `/about`,
`/workshops.html`), all 200; confirmed CSP is report-only (no enforcing header); custom 404
routing unaffected; final config diff against a timestamped pre-change backup showed exactly one
added line.

### Notes for the Next Agent
Production security headers, HSTS, and §8's staging `X-Robots-Tag` remain open — all gated on
OD-003 (client acceptance of the self-host proposal) for production, or simply out of this
session's scope for §8. The corrected SSH access path (working key confirmed this session, not
`~/.ssh/id_ed25519`) should be used going forward.

---

## v2.24.0 — 2026-07-18 — OG Image PNG Conversion

**Branch:** `main`

### Summary
Resolved M-1: `og-image.svg` converted to a 1200×630 PNG via headless Chromium (no new
dependency — used an already-present Playwright-cached binary) and wired into all 9 pages'
`og:image` tags. Reconciled a stale `PHASE_GATES.md` duplicate (the same requirement was listed
under both Gate 1 and a deferred Gate 3). Full release ceremony run: `CHANGELOG.md`,
`RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md` updated; tagged and snapshotted.

### Work Completed / Areas Changed
`src/images/og-image.png` (new), `index.html`, `about.html`, `book.html`, `contact.html`,
`resources.html`, `workshops.html`, `programs/index.html`, `programs/coding-with-robots.html`,
`programs/pstem.html`, `BACKLOG.md`, `STATUS.md`, `FILE_MAP.md`, `PHASE_GATES.md`,
`CHANGELOG.md`, `RELEASE_NOTES.md`, `COMMIT_NOTES.md`, `SLICE_REVIEWS.md`, `PROGRESS_NOTE.md`.

### Validation Performed
PNG dimensions confirmed exactly 1200×630 via `sips`; visual inspection matched the source SVG;
grep confirmed zero remaining `.svg` references and exactly 9 `.png` references; 5 pages
spot-checked via a local `serve` instance (200 responses, correct tag).

### Notes for the Next Agent
`RELEASE_NOTES.md` has a pre-existing gap (v2.21.0–v2.23.0 were never added, discovered during
this session) — flagged to the owner, not backfilled. Deployed-domain verification (Gate 1)
remains blocked on OD-003.

---

## v2.23.0 — 2026-07-18 — Web3Forms Merge + Hosting Decision

**Branch:** `main` (merged from `feat/web3forms-integration`, pushed to `origin/main`)

### Summary
Launch blocker C-1/OD-001 is resolved: the Web3Forms migration (2026-07-16/17, replacing the
dead `formspree.io/f/REPLACE_ME` endpoint in `book.html`/`contact.html` with honeypot,
accessible status region, request timeout, duplicate-submission guard) was reviewed, inbox
delivery to `info@SmartLearningSolutions.org` was confirmed, and the branch was merged into
`main`. The owner also confirmed the hosting direction: self-hosting on the existing staging
VPS (`74.208.9.49`) is being proposed to the client (OD-003), superseding the earlier
Netlify/GitHub Pages recommendation. Full detail: `plans/2026-07-16-web3forms-migration.md`,
`DECISION_LOG.md` ADR-015.

### Work Completed / Areas Changed
`src/js/web3forms-config.js` (new), `book.html`, `contact.html`, `src/css/main.css`,
`CLAUDE.md`, `AGENTS.md`, `DECISION_LOG.md` (ADR-015), plus doc-consistency updates across
`.env.example`, `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `STATUS.md`, `BACKLOG.md`,
`PHASE_GATES.md`, `docs/DEPLOYMENT.md`, `docs/STRATEGY.md`, `docs/TESTING.md`,
`docs/governance/PROJECT_RISK_REGISTER.md`, `plans/open-decisions.md` (OD-001, OD-003),
`legal/privacy-policy.md`, `CHANGELOG.md`, `SLICE_REVIEWS.md`, `COMMIT_NOTES.md`.

### Validation Performed
Local browser testing confirmed both forms' loading/success states render correctly with a
live access key. A scripted `curl` probe against the Web3Forms API was correctly rejected
(403) by its anti-bot layer, confirming real-browser-only submission. Inbox delivery
subsequently confirmed by the owner. `grep` confirmed no `REPLACE_ME` remains in `book.html`
or `contact.html`.

### Notes for the Next Agent
Deployed-domain verification (Gate 1) is still blocked on OD-003 — the self-host proposal has
not yet been accepted by the client, and no production domain is live to test against. Once
accepted, point the domain at the VPS and complete the Gate 1 checklist in `PHASE_GATES.md`.

---

## v2.21.0 — 2026-06-27 — Second Production-Readiness Audit + Documentation

**Commit:** `2d30ad0` · branch `audit/production-readiness`

### Summary
Second V3.4 production-readiness audit. Result: **BLOCKED** — same two hard blockers (Formspree
`REPLACE_ME`; hosting platform unconfirmed). Notable confirmation: C-2 (cursor CSS gate) is
verified fixed in current code (`src/css/main.css:135-142`); AUDIT.md entry is stale. No code
changes; docs updated. Full audit report in plan file.

### Work Completed
- Multi-agent read-only audit pass (3 parallel explore agents)
- `STATUS.md` — v2.21.0 audit section + scorecard added
- `docs/governance/REPO_HEALTH_CHECK.md` — Last Health Check updated to 2026-06-27
- `docs/governance/RELEASE_GATE.md` — Release Decision date + notes updated
- `PROGRESS_NOTE.md` + `PROGRESS_NOTES.md` — session logged

---

## v2.20.0 — 2026-06-25 — V3.4 Production-Readiness Audit + Portable Fixes

**Commit:** `97ad30c` · branch `main`

### Summary
V3.4 production-readiness audit run across all 10 pages, shared JS/CSS, forms, SEO,
accessibility, and deployment posture. Result: **BLOCKED for client launch**. New critical
finding: owner indicated site "may go on Wix" — Wix cannot host this hand-coded static repo.
Scope restricted to portable fixes only: privacy policy draft added, governance stubs filled,
README corrected, ADR-013/L-012/L-013/R-002–R-004 logged. All held code fixes documented.

### Work Completed
- V3.4 production-readiness audit — full read-only pass
- `legal/privacy-policy.md` — new portable privacy policy draft
- `docs/governance/REPO_HEALTH_CHECK.md` — filled from empty stub with real audit findings
- `docs/governance/RELEASE_GATE.md` — filled from empty stub — status BLOCKED
- `docs/governance/PROJECT_RISK_REGISTER.md` — R-002, R-003, R-004 added; R-001 closed
- `README.md` — version corrected; stale note removed
- `STATUS.md` — v2.20.0 bump + audit section + ADR/risk/lesson references
- `DECISION_LOG.md` — ADR-013 filled (Wix/portable-fixes-only decision)
- `LESSONS_LEARNED.md` — L-012, L-013 added
- `PHASE_GATES.md` — Gate 1 privacy policy criterion + Wix risk note
- `BACKLOG.md` — hosting blocker added; M-7, M-8 hold conditions noted

### Notes for Next Agent
Two hard blockers: (1) Formspree `REPLACE_ME` in `book.html` + `contact.html`; (2) hosting
platform unconfirmed (possible Wix rebuild). Do not invest in code fixes until platform is
confirmed. Privacy policy draft ready at `legal/privacy-policy.md` — owner must fill
placeholders and publish on chosen platform.

---

## v2.19.0 — 2026-06-21 — V3.4 Project Starter Kit Migration

**Commit:** `25c54ec` · branch `main`

### Summary
Project Starter Kit V3.4 migrated into the repo in MIGRATE_EXISTING_PROJECT mode. Non-destructive install: 40 new files added across `docs/governance/`, `docs/project/`, `ai/`, `.agents/skills/`. Existing AGENTS.md and CLAUDE.md preserved; V3.4 template versions quarantined in `.v34_migration_review/`. V3.4 validator: PASS.

### Work Completed
- Ran V3.4 installer dry-run, confirmed predicted outcome (38 fresh installs, 3 conflicts)
- Applied install: 40 new files; no tracked files modified
- Ran V3.4 validator: `Status: PASS` (exit 0) — all 22 required paths present, all 8 skill frontmatters valid
- Performed agent review of core V3.4 governance files per `00_EXECUTE_ME.md` Step 7

### Files Changed (new — none modified)
- `docs/governance/` — 15 governance documents
- `docs/project/` — 9 project documents
- `ai/agents/`, `ai/prompts/`, `ai/reports/` — agent ops
- `.agents/skills/v34-{execution-loop,migration-loop,production-readiness,context-eval-loop}/SKILL.md`
- `00_MIGRATION_KICKOFF.md`, `MIGRATION_REPORT.md`, `V34_INSTALL_REPORT.json`
- `.v34_migration_review/` — AGENTS.md + CLAUDE.md + .DS_Store V3.4 candidates

### Validation
- Dry-run output matched prediction before apply
- `git diff --stat` empty after install (no tracked file modified)
- V3.4 validator: PASS

### Notes for Next Agent
V3.4 is installed and validated. `.claude/skills/` was already gitignored — reload Claude Code to pick up the new skills from `.claude/skills/`. Follow-up: reconcile V3.4 stub docs in `docs/governance/` and `docs/project/` with existing root-level equivalents; review/merge `.v34_migration_review/` candidates.

---

## v2.18.1 — 2026-06-19 — Mobile-Nav CTA Label Centering

**Commit:** `599bed0` · branch `fix/mobile-responsive-20260619`

### Summary
Follow-up to the v2.18.0 mobile pass. The **Request a Workshop** CTA inside the open mobile nav rendered with its label hard against the left edge instead of centered. Fixed by restoring flex centering on the button, then bumped the `main.css` cache token so the fix is fetched on all 10 pages.

### Work Completed
- Added `display: flex` to `.mobile-nav .btn` (specificity 0,2,0) so the already-present `justify-content: center` takes effect
- Diagnosed root cause: `.mobile-nav a { display: block }` (0,1,1) was overriding `.btn { display: inline-flex }` (0,1,0); the button was a block box, so `justify-content: center` was inert and the label fell back to start/left alignment
- Bumped cache token `?v=mobile-20260619c` → `?v=mobile-20260619d` on `main.css` across all 10 HTML files; `components.js` token left unchanged (not modified)

### Files Changed
- `src/css/main.css` — one declaration added to `.mobile-nav .btn`
- All 10 HTML files — `main.css` cache token bumped
- `STATUS.md`, `PROGRESS_NOTES.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — handoff/release records

### Validation
- CSS brace count balanced
- All 10 HTML files confirmed on `?v=mobile-20260619d` (main.css); `components.js` token unchanged at `?v=mobile-20260619`
- `git diff --stat` reviewed

### Notes for Next Agent
Branch `fix/mobile-responsive-20260619` — merge to `main` when owner approves. Formspree and production domain remain the two launch blockers.

---

## v2.18.0 — 2026-06-19 — Mobile Responsive Fixes

**Code commit:** `d853f03` · branch `fix/mobile-responsive-20260619`

### Summary
Four-slice mobile responsive fix pass. Diagnosed defects from on-device iPhone screenshots and fixed them across all 10 pages: full-screen nav overlay (no page content bleed-through), hamburger breakpoint raised to ≤1100px (iPad CTA clipping fixed), hero proof-photo crop and radius normalised, eyebrow font-size specificity bug fixed, and mobile nav CTA button colour fixed.

### Work Completed
- Converted `.mobile-nav` from content-height dropdown to `inset:0` full-screen overlay with solid `--bg` background (ADR-010)
- Added `body.nav-open .site-header` opaque rule so page `<h1>` no longer shows behind the logo
- Added `closeNav()` helper called on link-tap, Escape, and `pageshow` — menu can never get stuck open
- Raised hamburger breakpoint to ≤1100px (ADR-011); measured: CTA was squished to ~64px at 800px
- Added `.header-cta { flex-shrink: 0 }` to prevent flexbox from collapsing the CTA label
- Fixed `.hero-content .eyebrow` specificity (0,2,0) to beat `.hero-content p` (0,1,1) at 16px
- Program proof photos: `border-radius: --radius-lg`, `object-position: center center`, `aspect-ratio: 16/10` at ≤768px
- Section-break strip: same pattern with `aspect-ratio: 16/9`
- Fixed `.mobile-nav a.btn--primary` colour to stay `#fff` (`.mobile-nav a` muted grey was winning)
- Bumped cache token to `?v=mobile-20260619c` on all 10 HTML files

### Files Changed
- `src/css/main.css` — all layout and style fixes
- `src/js/components.js` — nav open/close logic rewritten with `closeNav()` helper
- All 10 HTML files — cache token bumped
- `DECISION_LOG.md` — ADR-010 + ADR-011
- `PLAN.md`, `plans/2026-06-19-mobile-responsive-fixes.md` — plan records
- `STATUS.md`, `PROGRESS_NOTES.md`, `PROGRESS_NOTE.md`, `COMMIT_NOTES.md`, `CHANGELOG.md`, `SLICE_REVIEWS.md`, `LESSONS_LEARNED.md`, `BACKLOG.md` — handoff docs

### Validation
- CSS brace count balanced: 397 open / 397 close
- JS syntax check: pass
- All 10 HTML files confirmed on `mobile-20260619c` token
- Visual: headed Playwright preview at ~390px (phone) and ~820px (iPad portrait), resizable window confirmed hamburger/desktop nav flip at 1100px

### Notes for Next Agent
Branch `fix/mobile-responsive-20260619` is pushed. Merge to `main` when owner approves. The two launch blockers (Formspree, production domain) are unchanged.

---

## v2.17.0 — 2026-06-17 — Full Production-Readiness Audit

**Tag:** `v2.17.0`
**Commit:** `9ad4410`

### Summary
Read-only production-readiness audit of the full site. Audit confirms the site is content-complete and Gate 0 passed. Gate 1 (Launch Readiness) remains blocked on two owner-gated decisions: Formspree endpoint and production domain DNS. All dev work is otherwise done. Audit documented in `plans/2026-06-17-website-status-audit.md` for cross-machine access.

### Work Completed
- Audited all 10 pages against content rules (CTAs, virtual language, pricing, parent framing, program names)
- Audited shared chrome (components.js, main.css, animations.js)
- Audited planning system consistency (STATUS, PHASE_GATES, BACKLOG, PLAN, DECISION_LOG — all consistent)
- Audited deployment/infra (nginx, sitemap, robots.txt, Formspree, Plausible, CDN deps, asset paths)
- Produced full structured audit report in `plans/2026-06-17-website-status-audit.md`

### Files Changed
- `plans/2026-06-17-website-status-audit.md` — new audit report
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — version records updated

### Validation
- Read-only audit — no code changes; all findings based on repo state at v2.16.1
- Repo working tree was clean before and after audit

### Notes for Next Agent
Both launch blockers are owner-gated. No code work possible until:
1. Formspree endpoint ID provided (C-1 / OD-001)
2. Production domain target confirmed (H-1 / OD-003)
See `plans/2026-06-17-website-status-audit.md` §5 for the 5-step Gate 1 → Production checklist.

---

## v2.16.1 — 2026-06-17 — VPS nginx Routing Fix and SSH Access

**Tag:** `v2.16.1`
**Commit:** `995228e`

### Summary
Diagnosed and fixed nginx 404 on `smart-learning-solutions.craftandconscious.com`. Root cause
was missing `$uri.html` in `try_files` — clean URLs like `/workshops` and `/about` 404'd even
though the `.html` files existed. Custom 404 page was also not configured. Both fixed directly
on the VPS. SSH key added to VPS for future direct Claude Code access. Debug notes documented
in `docs/debug/nginx-404-debug.md`.

### Work Completed
- Diagnosed nginx 404 via curl: `.html` routes returned 200, clean URLs returned 404
- Fixed `/etc/nginx/sites-available/smart-learning-solutions`: added `$uri.html` to `try_files`
  and added `error_page 404 /404.html` with `location = /404.html { internal; }`
- Verified all routes: `/workshops`, `/about`, `/programs` all correct; custom 404 confirmed
- Added SSH public key (`~/.ssh/id_ed25519.pub`) to VPS authorized_keys
- Renamed 9 sloppy RepoBackup snapshot folders (v2.15.0–v2.16.0) to full descriptive names
- Created `docs/debug/nginx-404-debug.md` documenting root cause and fix

### Files
- `docs/debug/nginx-404-debug.md` — new debug notes
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md` — version records updated
- VPS: `/etc/nginx/sites-available/smart-learning-solutions` (server-side, not in repo)

### Validation
- `curl https://smart-learning-solutions.craftandconscious.com/workshops` → 200
- `curl https://smart-learning-solutions.craftandconscious.com/about` → 200
- `curl https://smart-learning-solutions.craftandconscious.com/nonexistent` → 404 (custom page, 2795 bytes)
- `sudo nginx -t` → ok; `systemctl reload nginx` → ok

### Notes for Next Agent
VPS is accessible via `ssh -i ~/.ssh/id_ed25519 root@74.208.9.49`. Formspree REPLACE_ME
and production domain pointing remain the two hard launch blockers.

_(Note: as of 2026-07-19, this key no longer exists on the local machine — see the 2026-07-19
entry above for the corrected access path and additional context.)_

---

## v2.16.0 — 2026-06-16 — Add Project Starter Kit v3.3 and Push Workflow Prompts

**Tag:** `v2.16.0`
**Commit:** `b85af1b`

### Summary
Added project-starter-kit-v3.3/ reference library and two push workflow prompt files
to the repo. No site code changed.

### Files
- `project-starter-kit-v3.3/` — full v3.3 starter kit library (4 root files + subdirectory)
- `prompts/repo_push_handoff_snapshot_tag_prompt.md` — push/handoff/snapshot workflow prompt
- `prompts/_repo_push_handoff_snapshot_tag_prompt_post_check.md` — post-check verification prompt
- `STATUS.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md`, `CHANGELOG.md`, `RELEASE_NOTES.md` — version records updated

### Notes for Next Agent
Formspree REPLACE_ME and deployment host remain the two hard launch blockers.
No site code changed in this push — tooling files only.

---

## v2.15.7 — 2026-06-04 — Remove Program Card Proof Strip

**Tag:** `v2.15.7`
**Commit:** `f96228c`

### Summary
Removed the 80px student photo strip (.program-card-proof) from both program cards
on programs/index.html and index.html. Each card now shows only the product photo.
Removed the corresponding CSS block from main.css. Strengthened the bottom gradient
on .program-card-media--product::after so the light product area fades into the dark
card body rather than cutting hard.

### Files
- `programs/index.html` — proof strip removed from both cards
- `index.html` — proof strip removed from both cards
- `src/css/main.css` — .program-card-proof block removed; ::after gradient strengthened
- `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — version records updated

---

## v2.15.6 — 2026-06-04 — Migration Decision Update and Checklist

**Tag:** `v2.15.6`
**Commit:** `41cb585`

### Summary
Updated ADR-008 in DECISION_LOG.md to reflect completed migration state (v2.15.5):
added Completed date, full files-added list, files-updated list, and Gate 1 fixes note.
Created MIGRATION_CHECKLIST.md — permanent verification record confirming all 18 required
v2 files exist, no app code changed, mandatory files preserved, Gate 0 defined, and file
responsibilities enforced. Result: PASS. Migration complete.

### Files
- `DECISION_LOG.md` — ADR-008 updated with Completed date and full file lists
- `MIGRATION_CHECKLIST.md` — Created
- `STATUS.md` — Version bump to v2.15.6, migration entry added to Done
- `PROGRESS_NOTE.md` — v2.15.6 session entry prepended
- `PROGRESS_NOTES.md` — v2.15.6 cumulative entry added
- `COMMIT_NOTES.md` — v2.15.6 entry prepended

---

## v2.15.5 — 2026-06-04 — File Responsibility Cleanup

**Tag:** `v2.15.5`
**Commit:** `b2b5e05`

### Summary
Enforced single-responsibility boundaries across planning docs per step 8 of the v2
migration guide. No content deleted — overlapping sections replaced with pointers to
canonical files. No application code changed.

### Files
- `ROADMAP.md` — Removed Completed/Deferred/Blockers sections; added pointers to CHANGELOG.md, BACKLOG.md, STATUS.md
- `PROJECT_BRIEF.md` — Condensed Programs/Audiences/Decisions/Tech Stack tables to summaries; deferred detail to CONTEXT.md
- `BACKLOG.md` — Removed Resolved/Closed section; added pointer to CHANGELOG.md
- `STATUS.md` — Condensed Audit Findings to one line; removed Deferred section
- `PLAN.md` — Replaced plan-index structure with Current State prose
- `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — version bump and session records

---

## v2.15.4 — 2026-06-04 — File Responsibility Map

**Tag:** `v2.15.4`
**Commit:** `28a8ae6`

### Summary
Created `FILE_MAP.md` — a full inventory of every tracked file in the repo, grouped by
category (site pages, core assets, planning docs, release tracking, config, docs/, plans/,
prompts/, legacy). Each entry records purpose, owner, and edit frequency. Updated PLAN.md
to reference it.

### Files
- `FILE_MAP.md` — Created
- `PLAN.md` — Updated (pointer to FILE_MAP.md)
- `STATUS.md` — Updated (version to v2.15.4, FILE_MAP entry in Done)
- `PROGRESS_NOTE.md` — Updated (v2.15.4 session entry)
- `PROGRESS_NOTES.md` — Updated (v2.15.4 cumulative entry)
- `COMMIT_NOTES.md` — Updated (v2.15.4 entry)

---

## v2.15.3 — 2026-06-04 — Gate 1 Launch-Readiness Fixes

**Tag:** `v2.15.3`
**Commit:** `b378f03`

### Summary
Executed all dev-executable Gate 1 launch-readiness items. No owner-gated items (Formspree,
deployment host) are included. Five audit findings resolved: C-2 cursor CSS gate, H-2 GSAP
SRI hashes, M-2 title em-dash, M-3 PSTEM image dimensions, M-6 tel: + prefix.

### Files
- `src/css/main.css` — C-2: removed ungated `cursor: none` from `.btn`
- `about.html`, `book.html`, `contact.html`, `index.html`, `resources.html`, `workshops.html`, `programs/coding-with-robots.html`, `programs/index.html`, `programs/pstem.html` — H-2: SRI hashes on GSAP scripts
- `programs/index.html` — M-2: title hyphen → em-dash; M-3: PSTEM image width/height
- `book.html`, `contact.html`, `src/js/components.js` — M-6: tel: + prefix
- `BACKLOG.md`, `PHASE_GATES.md`, `STATUS.md`, `PROGRESS_NOTE.md`, `PROGRESS_NOTES.md`, `COMMIT_NOTES.md` — planning docs updated

---

## v2.15.2 — 2026-06-04 — v2 Planning Migration

**Tag:** `v2.15.2`
**Commit:** `505a500`

### Summary
Completed the v2 project-control planning system migration. Added 7 missing required
files and updated existing docs with planning system pointers. Resolved a remote sync
conflict (remote had advanced to v2.15.1 while migration was in progress) by rebasing
stashed changes onto the synced remote and updating version references to v2.15.2.

### Files
- `PROJECT_BRIEF.md` — Created
- `PLAN.md` — Created
- `PHASE_GATES.md` — Created
- `BACKLOG.md` — Created
- `DECISION_LOG.md` — Created
- `SLICE_REVIEWS.md` — Created
- `LESSONS_LEARNED.md` — Created
- `CLAUDE.md` — Updated (Planning System section appended)
- `AGENTS.md` — Updated (Planning System section appended)
- `STATUS.md` — Updated (version to v2.15.2, migration entry added)
- `PROGRESS_NOTE.md` — Updated (v2.15.2 session entry)
- `PROGRESS_NOTES.md` — Updated (v2.15.2 cumulative entry)
- `COMMIT_NOTES.md` — Updated (v2.15.2 entry prepended, conflict resolved)

---

## v2.15.1 — 2026-05-22 — Hash Correction and Docs Sync

**Tag:** `v2.15.1`
**Commit:** `7df18e5` (tagged) + `19c0cef` (docs update)

### Summary
Tagged the untagged hash-correction commit `7df18e5` as `v2.15.1` and synced
all six release-tracking files to document it.

### Files
- `CHANGELOG.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`
- `ROADMAP.md`

---

## v2.15.0 — 2026-05-22 — Docs Sync and Tag Format Cleanup

**Tag:** `v2.15.0`
**Commit:** `bb0bcfa`

### Summary
All six release-tracking documentation files synced to v2.15.0. Tag format
switched from verbose slug style to clean semver (`vX.Y.Z`) going forward.

### Files
- `CHANGELOG.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `PROGRESS_NOTE.md`
- `PROGRESS_NOTES.md`
- `ROADMAP.md`

---

## v2.14.8 — 2026-05-16 — Update Workflow File List

**Tag:** `v2.14.8__prompts-update-file-list__commit-56be1ea`
**Commit:** `56be1ea`

### Summary
The update workflow prompt was adjusted so future documentation sync sessions name
both progress-note files: `PROGRESS_NOTE.md` for the current focused session and
`PROGRESS_NOTES.md` for the cumulative project progress log.

### Files
- `prompts/Update.md`

---

## v2.14.7 — 2026-05-16 — Documentation Sync

**Tag:** `v2.14.7__docs-sync-v2-14-4-to-v2-14-7__commit-0715806`
**Commit:** `0715806`

### Summary
Release tracking documents were synced through v2.14.7, and the roadmap was
updated to show the creation of root reference docs as completed work.

### Files
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `CHANGELOG.md`
- `PROGRESS_NOTE.md`
- `ROADMAP.md`

---

## v2.14.6 — 2026-05-16 — Session Progress Note

**Tag:** `v2.14.6__session-progress-note__commit-d72e671`
**Commit:** `d72e671`

### Summary
`PROGRESS_NOTE.md` was rewritten as a structured session log for the v2.14.3
through v2.14.5 work block.

### Files
- `PROGRESS_NOTE.md`

---

## v2.14.5 — 2026-05-15 — Context and Status Docs

**Tag:** `v2.14.5__context-and-status-docs__commit-7ea223c`
**Commit:** `7ea223c`

### Summary
Root-level `CONTEXT.md` and `STATUS.md` were created so future sessions can
quickly recover stable project background and present state without digging
through the full documentation set.

### Files
- `CONTEXT.md`
- `STATUS.md`

---

## v2.14.4 — 2026-05-15 — Local Settings Hygiene

**Tag:** `v2.14.4__ignore-claude-local-settings__commit-7269da5`
**Commit:** `7269da5`

### Summary
`.claude/` was added to `.gitignore` so local Claude Code settings do not appear
as untracked files or accidentally enter version control.

### Files
- `.gitignore`

---

## v2.14.3 — 2026-05-15 — Audit Publication and Docs Sync

**Tag:** `v2.14.3__audit-doc-and-docs-sync__commit-46fcf2a`
**Commit:** `46fcf2a`

### Summary
The full site audit was published and the release-tracking docs were brought
current through v2.14.3. This session also recovered from an interrupted docs
sync by carefully updating the remaining files and preserving UTF-8 encoding.

### Files
- `AUDIT.md`
- `RELEASE_NOTES.md`
- `COMMIT_NOTES.md`
- `CHANGELOG.md`
- `PROGRESS_NOTE.md`
- `ROADMAP.md`
- `prompts/Update.md`
