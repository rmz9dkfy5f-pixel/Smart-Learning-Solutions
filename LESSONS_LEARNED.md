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

## Tooling

### L-008 — robocopy exit code 1 is success
**Context:** Robocopy exit codes: 0 = no files copied, 1 = files copied successfully,
2+ = extra files exist, 8+ = errors. Exit code 1 from robocopy is not an error.
**Rule:** Check for snapshot folder existence, not robocopy exit code, to confirm success.
