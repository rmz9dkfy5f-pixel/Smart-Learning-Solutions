**Updated:** 2026-07-19 (no version bump, server-side only)

# Progress Note — Current Session

## Nginx Security Headers on Staging (2026-07-19)

### Summary

Applied `docs/DEPLOYMENT.md` §7's baseline security headers (`X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy-Report-Only`)
to the staging vhost (`smart-learning-solutions.craftandconscious.com`) on the VPS — server-side
only, no repo code change. CSP kept in report-only mode per the doc's own guidance; HSTS and §8's
`X-Robots-Tag` staging-indexing header intentionally not added in this pass.

### Work Completed

- Pre-flight discovery over SSH: confirmed the vhost's single content-serving `server {}` block,
  no pre-existing header directives, no `location` block that would swallow inherited headers.
- Found the documented SSH key (`~/.ssh/id_ed25519`) no longer exists locally; located and used a
  different, already-authorized key instead. This also revealed the VPS is a shared, multi-tenant
  host serving several other unrelated client sites alongside this one, not dedicated as earlier
  docs implied.
- Took a timestamped backup of the live vhost config before editing.
- Wrote the 5 directives to a new `/etc/nginx/snippets/security-headers.conf`, diffed against
  `docs/DEPLOYMENT.md` §7 to confirm exact match, uploaded via `scp`.
- Inserted a single idempotent `include` line into the vhost, anchored on the unique
  `index index.html;` line (`server_name` appears twice in the file, so wasn't a safe anchor).
- Validated with `nginx -t`, reloaded via `systemctl reload nginx`.
- Updated `docs/DEPLOYMENT.md` (§3 checklist), `STATUS.md`, `PHASE_GATES.md` (Gate 1), and added
  `SLICE_REVIEWS.md` SR-008, plus a corrected forward-pointing note on the stale v2.16.1 SSH
  reference in `PROGRESS_NOTES.md` — all confirmed with the owner before editing.

### Validation Performed

- `curl -sI` on 3 pages (root, `/about`, `/workshops.html`): all 5 headers present with correct
  values, all 200.
- Confirmed `Content-Security-Policy-Report-Only` present and no enforcing
  `Content-Security-Policy` header.
- Custom 404 routing (`try_files`/`error_page 404`) unaffected.
- Final config diff against the pre-change backup showed exactly one added line.

### Not Yet Verified / Open

- Production security headers, HSTS, and §8's staging `X-Robots-Tag` remain open — production
  work is gated on OD-003 (client acceptance of the self-host proposal); §8 was out of this
  session's scope.
- Repo doc changes made this session are uncommitted — push to `origin/main` not yet performed,
  pending explicit confirmation (no commit was requested this session).

### Launch Blockers (updated)

1. ~~Formspree `REPLACE_ME`~~ — resolved, merged to `main` (v2.23.0).
2. Production domain not yet pointed to the VPS — unchanged; pending client acceptance of the
   self-host proposal (OD-003).
