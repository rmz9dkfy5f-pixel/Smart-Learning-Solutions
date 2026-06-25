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

---

## Tooling

### L-008 — robocopy exit code 1 is success
**Context:** Robocopy exit codes: 0 = no files copied, 1 = files copied successfully,
2+ = extra files exist, 8+ = errors. Exit code 1 from robocopy is not an error.
**Rule:** Check for snapshot folder existence, not robocopy exit code, to confirm success.
