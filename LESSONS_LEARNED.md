# Lessons Learned

Observations, failures, and improvements captured during the project.

---

## Deployment

### L-002 — Static nginx sites need `$uri.html` in `try_files` for clean URLs
**Context:** v2.16.1 — staging VPS showed nginx 404 for clean URLs like `/workshops`.
**What happened:** nginx `try_files $uri $uri/` could not match `workshops` as a file or
directory, so it returned 404 — even though `workshops.html` existed at the root.
Adding `$uri.html` as a third candidate resolves this without any other changes.
**Rule:** For static HTML sites on nginx, always use:
`try_files $uri $uri/ $uri.html =404;`
Also add `error_page 404 /404.html; location = /404.html { internal; }` or the custom
404 page won't be used.

### L-003 — A GitHub Desktop pull is not a VPS deployment
**Context:** v2.16.1 — "Mac mini shows 404 after pull" was actually a VPS nginx routing issue.
**What happened:** The repo was already correctly deployed. The Mac mini browser was hitting
the production domain, not opening a local file. The GitHub Desktop pull was irrelevant.
**Rule:** When a browser shows `nginx/x.x.x (Ubuntu) 404`, the issue is always on the server,
never in the local repo checkout. Diagnose the server first.

---

## Process

### L-001 — Hash self-reference requires a two-round amend cycle
**Context:** v2.14.3 commit — docs that record their own commit hash cannot do so before
the commit is made.
**What happened:** Initial commit used `PLACEHOLDER`; substituted hash; amended; the amend
changed the hash again; required a second round of substitution and amend.
**Rule:** When docs self-reference their own commit hash, accept one level of drift
(docs say hash N-1, tag name uses hash N-1, actual commit is hash N). This is the
established pattern and is not an error.
**Rule:** Use the Edit tool for PLACEHOLDER substitution, never PowerShell's `-replace`
operator — PowerShell `-replace` is case-insensitive by default and will corrupt
lowercase occurrences of the same word in unrelated file sections.

### L-002 — PowerShell Set-Content corrupts UTF-8 encoding
**Context:** v2.14.3 session — using `Set-Content -Encoding utf8` on files originally
written by other tools garbled em-dashes and middle-dots into multi-character sequences.
**What happened:** `Get-Content -Raw` read UTF-8 bytes as Windows-1252 characters; the
subsequent write re-encoded those mojibake characters as valid UTF-8.
**Rule:** Never use PowerShell `Get-Content` / `Set-Content` for targeted text substitution
in markdown files. Use the Edit tool instead — it preserves encoding correctly.

### L-003 — .claude/ directory causes GitHub Desktop noise
**Context:** v2.14.4 — `.claude/` (Claude Code local settings) was not in `.gitignore`,
causing it to appear as untracked in GitHub Desktop.
**Rule:** Add `.claude/` to `.gitignore` at project setup. Done in v2.14.4.

### L-004 — Staged file scope creep
**Context:** Multiple sessions — `git add -A` or broad staging accidentally staged
unintended files (browser cache directories, Claude local settings).
**Rule:** Always stage by explicit file list. Never use `git add .` or `git add -A`
in this project. Stage only the files listed in the plan.

### L-015 — Cross-gate duplicate criteria in PHASE_GATES.md go stale independently
**Context:** v2.24.0 — `PHASE_GATES.md` listed the same OG-image requirement twice: correctly
under Gate 1 ("Open Graph metadata verified") and again, stale, under Gate 3 ("Post-Launch
Expansion", Deferred).
**What happened:** `BACKLOG.md` and `STATUS.md` both treated the item as active Gate 1/2 work,
while `PHASE_GATES.md`'s Gate 3 copy called it deferred — a real cross-document conflict that
took a full session-start audit to surface, because nothing diffs `PHASE_GATES.md` against
itself for duplicate criteria across gate sections.
**Rule:** When a `PHASE_GATES.md` criterion is resolved, grep the whole file for the same
subject before checking a single box — a duplicate elsewhere is easy to miss and will silently
disagree with `BACKLOG.md`/`STATUS.md` until someone notices.

---

## Technical

### L-005 — /programs/ directory routing is host-dependent
**Context:** AUDIT.md H-1 — the nav links to `/programs/` (a directory), not
`/programs/index.html`. Whether this resolves depends entirely on the server's
DirectoryIndex configuration.
**Rule:** Verify `/programs/` routing on the chosen host before confirming Gate 1.
This cannot be verified from source code alone.

### L-006 — .btn { cursor: none } must be gated
**Context:** AUDIT.md C-2 — the CSS rule `.btn { cursor: none }` fires unconditionally.
If GSAP fails to load (CDN down), `custom-cursor-enabled` is never added to `<body>`,
but all buttons still hide the native cursor — complete UX failure.
**Rule:** Any CSS that depends on a JS-applied class must be scoped to that class.
Never write unconditional cursor or pointer overrides without the gating parent class.

### L-007 — ES modules require a local server
**Context:** Recurrent — opening HTML files via `file://` silently fails for ES modules.
**Rule:** Always use `npx serve .` or VS Code Live Server for local development.
Document this in README.md and CONTRIBUTING.md (already done).

---

## CSS / Frontend

### L-009 — CSS specificity when a semantic element also carries a utility class
**Context:** v2.18.0 — the eyebrow label `<p class="eyebrow">` was rendering at 16px on mobile instead of the intended 12px (`--text-xs`).
**What happened:** `.hero-content p` (specificity 0,1,1) was overriding `.eyebrow` (0,1,0) because the element is a `<p>`. The utility class rule lost because its specificity was lower than the parent-scoped element rule.
**Rule:** When a utility class sits on a semantic element AND there is a parent-scoped element rule in the stylesheet, the element rule wins unless the utility class is made at least as specific. Use a compound selector like `.parent .utility-class` (0,2,0) to restore priority.

### L-010 — Hamburger breakpoint must account for full header content width
**Context:** v2.18.0 — the hamburger was originally set to ≤768px but the full desktop header (logo + 6 links + CTA) requires ~1100px to render the CTA label without clipping.
**What happened:** Between 769–1099px the desktop nav was showing but `flex` was squishing the CTA button; `overflow: hidden` on `.btn` clipped the label entirely. iPad portrait (~820px) showed only the hamburger icon where the CTA should be.
**Rule:** When setting a hamburger breakpoint, measure the full header content width (logo + all nav items + CTA) at the intended switch point. Use `scrollWidth > clientWidth` in the browser console to detect overflow. The breakpoint must be wide enough for all header content to fit without shrinking.

### L-011 — Full-screen nav overlay vs content-height dropdown
**Context:** v2.18.0 — the original `.mobile-nav` was a content-height dropdown (top: header-height, no bottom/height). Page content bled through above the header (transparent) and below the panel.
**What happened:** A fixed-height dropdown panel with a semi-transparent header allows the page `<h1>` to show behind the logo and leaves page content visible below the panel's content edge.
**Rule:** For mobile nav menus: use `inset: 0` + solid opaque background to guarantee full-screen coverage. Also add `body.nav-open .site-header` with solid background so the page heading never shows behind the logo. Ensure the nav toggles `body.style.overflow` to lock scroll.

---

## Platform / Deployment

### L-012 — Wix cannot host a hand-coded static site
**Context:** v2.20.0 — audit surfaced that the production host was unconfirmed and the owner
indicated the site "may go on Wix."
**What happened:** Code-level fixes (AVIF fallback, form a11y, OG image, overlay timer) were
scoped and ready to execute when the Wix risk emerged. All code work was held pending platform
confirmation to avoid investing in throwaway fixes.
**Rule:** Confirm the hosting platform before investing in code fixes. Wix is a closed website
builder — it cannot serve an uploaded hand-coded static repo (ES modules, multi-page HTML,
GSAP CDN, JS-injected header/footer). A move to Wix requires a full rebuild in the Wix editor.
Portable work (privacy policy text, repo docs) is always safe; code work is only safe once
the platform is confirmed as a static host (Netlify, GitHub Pages, nginx, etc.).

### L-013 — Deploy-root = repo-root exposes internal docs
**Context:** v2.20.0 — deploying the repo root verbatim (as documented in `docs/DEPLOYMENT.md`
for Netlify) would publish all repo internals publicly.
**What happened:** The repo root contains `AUDIT.md`, `CLAUDE.md`, `plans/`, `prompts/`,
`project-starter-kit-v3.3/`, `project-starter-kit-v3.4/`, and `docs/` with internal
governance material. These are not intended to be public-facing.
**Rule:** Before deploying, configure the host to exclude internal-only files. On Netlify,
use a `netlify.toml` with `publish = "."` and add redirect/ignore rules, or restructure so
only the publishable asset folder (`src/`, HTML pages) is the publish root. Verify by
requesting an internal file URL (e.g. `/AUDIT.md`) and confirming it returns 404.
**Resolved 2026-07-19 (staging only):** Implemented as `scripts/deploy-staging.sh` — an
explicit source-path allowlist rather than a repo-root-minus-excludes approach. See SR-009
and `DECISION_LOG.md`. Production still has no mechanism (R-004).

### L-016 — A confirmed host is not a confirmed deploy pipeline
**Context:** SR-009, 2026-07-19 — the staging VPS had been reachable and correctly configured
(nginx `try_files`, security headers) for over a month, but there was no tracked deploy
mechanism at all in the repo.
**What happened:** Live content silently drifted behind `main` for about four weeks — through
two shipped launch-blocker fixes (Web3Forms migration, OG-image PNG conversion) — before
anyone checked the staging URL's actual served content directly against the repo. The forms on
staging were POSTing to a dead endpoint the whole time.
**Rule:** "Host confirmed/reachable" and "repeatable deploy mechanism exists" are separate
facts — verify both independently. When a host has been live for a while with no deploy
tooling tracked in the repo, treat its content as unverified until checked directly (e.g.
`curl`/`grep` the live page for a known-recent string), regardless of how long the host has
been up or how confident prior session notes sound.

---

## Tooling

### L-008 — robocopy exit code 1 is success
**Context:** Robocopy exit codes: 0 = no files copied, 1 = files copied successfully,
2+ = extra files exist, 8+ = errors. Exit code 1 from robocopy is not an error.
**Rule:** Check for snapshot folder existence, not robocopy exit code, to confirm success.

### L-014 — Headless Chromium (even a Playwright test-cache binary) is a reliable zero-install SVG rasterizer
**Context:** v2.24.0 — needed to convert `og-image.svg` to a 1200×630 PNG; no ImageMagick,
`rsvg-convert`, Inkscape, or `cairosvg` was installed, and this repo intentionally has no build
tooling.
**What happened:** Checked for leftover Playwright-cached Chromium binaries
(`~/Library/Caches/ms-playwright/`) before reaching for `npx <package>` or `sips` (which lists
SVG as a readable format but has an inconsistent fidelity history for gradients/text). A
`chrome-headless-shell --headless --screenshot --window-size=W,H` render matched the source SVG
exactly on the first attempt.
**Rule:** Before adding any tool for a one-off asset conversion, check for already-present
binaries (Playwright/Puppeteer caches, other installed browsers) — a headless-browser screenshot
is a spec-accurate, zero-install SVG rasterizer, and using one doesn't add a repo dependency
since only the output asset gets committed.

### L-017 — Claude Code's default Bash sandbox blocks raw-IP SSH (port 22), even when HTTPS to the same host works
**Context:** 2026-07-24 — running `scripts/deploy-staging.sh` (rsync over SSH to `74.208.9.49:22`)
from Claude Code (VS Code extension) failed with an SSH connection timeout, while `curl` to the
same staging domain over HTTPS succeeded immediately, and general internet access (e.g.
`github.com`) also worked fine. A raw `ping` to the IP also timed out. A direct `nc -zv` port-22
probe timed out under the default sandbox but succeeded immediately with Claude Code's
`dangerouslyDisableSandbox` Bash option enabled for that one command — confirming the block was a
Claude Code environment/network-sandbox restriction, not a VPS or credentials problem (the SSH key
and VPS were both otherwise fine).
**Rule:** If `scripts/deploy-staging.sh` (or any raw-IP SSH/rsync command) times out from inside
Claude Code while HTTPS to the same host works, suspect the Bash sandbox's network policy before
suspecting the VPS, SSH key, or script. No repo or vault precedent documented this before this
session (checked and confirmed absent). The workaround used here was enabling
`dangerouslyDisableSandbox` for just the `ssh`/`rsync` calls, after explicit owner confirmation
since it was undocumented, sandbox-bypass territory.
