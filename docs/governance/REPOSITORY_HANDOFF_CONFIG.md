# Repository Handoff Configuration

Project-local configuration for the `handoff-repository` skill (see
`20_TOOLS/KITS/handoff-repository/.claude/skills/handoff-repository/SKILL.md` in the AntBrainOS
vault). Filled in 2026-08-17 to close a previously-flagged gap: this repo had no local copy of
this file, so the snapshot destination had to be supplied directly by the owner in-session each
time (first noted 2026-08-11, `SLICE_REVIEWS.md` SR-019).

## Repository Identity

- Project name: Smart Learning Solutions
- Repository root: `/Users/ant/Projects/GitHub/Smart Learning Solutions` (space, not hyphen — the
  `.git` remote name uses a hyphen, `Smart-Learning-Solutions.git`, but the local directory name
  uses spaces)
- Canonical remote: `git@github.com:rmz9dkfy5f-pixel/Smart-Learning-Solutions.git`
- Default branch: `main`
- Canonical handoff file: none repo-local — this repo tracks state via `STATUS.md`, `PLAN.md`,
  `BACKLOG.md`, `DECISION_LOG.md`, `COMMIT_NOTES.md` (its own v2 project-control planning system,
  see `CLAUDE.md`/`AGENTS.md`); the agent-neutral handoff role is filled by the linked AntBrainOS
  vault project folder's `HANDOFF_TO_CLAUDE.md` instead (`03_PROJECTS/Active/Smart Learning
  Solutions/`)

## Validation Contract

- Install command: none — static HTML/CSS/JS, no build step, no package manager
- Focused test commands: none automated — manual local-server + browser verification
  (`python3 -m http.server`, per `docs/DEPLOYMENT.md` §2)
- Full test command: none
- Lint/type-check commands: none configured
- Production build command: none — repo root is the deploy root
- Runtime smoke test: local server + `curl`/browser checks of changed pages (nav links, forms,
  console errors); staging verification via `curl` per `docs/DEPLOYMENT.md` §11 (forms endpoint,
  `og:image`, all-pages 200, security headers, internal-path 404s)
- Manual or device checks: mobile/responsive spot-check when layout-affecting changes are made

## Snapshot Contract

- Snapshot required: yes, for every tagged (versioned) release
- Naming rule: `vMAJOR.MINOR.PATCH__slug__commit-<7charhash>` — identical to the git tag name, per
  `docs/VERSIONING.md` §9
- Exclusions: `.git/` only
- Verification method: file-count comparison (source vs. snapshot) plus `diff -rq`; targeted
  SHA-256 checksum comparison of the files actually changed in that release
- Checksum requirement: yes, for changed files only — not a full-tree checksum manifest (no
  `SNAPSHOT_SHA256SUMS.txt`/`SNAPSHOT_MANIFEST.md` convention here, unlike the AntBrainOS vault's
  own snapshot SOP)
- Retention policy: none formal — no snapshots have been pruned to date
- Restore/rollback procedure: see `docs/DEPLOYMENT.md` §9

### Snapshot Destination by Machine

```bash
scutil --get ComputerName 2>/dev/null || hostname
```

| Machine | Detection | Snapshot destination | Notes |
|---|---|---|---|
| Ant's MacBook Air | `ComputerName` = "Ant's MacBook Air" | `/Users/ant/WorkSync/Projects/RepoBackups/Smart Learning Solutions/<tag>` | Confirmed in use since v2.16.0 (earliest snapshot present); owner explicitly re-supplied it 2026-08-11 when this config file was found missing |
| 5950X Workstation | `hostname` = `DESKTOP-8JF1MKA` (Windows 11) | `E:\WorkSync\Projects\RepoBackups\Smart Learning Solutions\<tag>` | Added 2026-08-31 — first-ever audited session on this machine's clone found no row matched it (repo root here is `E:\Projects\GitHub\Smart-Learning-Solutions`, hyphenated, not the Mac's space-named path); owner-confirmed destination, matching this machine's existing `RepoBackups\AntBrainOS` convention |

If the current machine does not match any row above, or more than one row could plausibly match,
**stop and ask the user** for the correct destination — do not guess or infer a path pattern.

## Deployment Contract

- Deployment in scope: conditional — staging only; production hosting is undecided (OD-003)
- VPS/server alias: IONOS staging VPS, `74.208.9.49` (shared, multi-tenant — several unrelated
  client sites live under sibling `/var/www/` directories)
- Deployment root: `/var/www/smart-learning-solutions/`
- Deployment branch or artifact: `main`, via `scripts/deploy-staging.sh` (explicit path allowlist
  over `rsync`/SSH — see `docs/DEPLOYMENT.md` §11)
- Service/container names: none — static files served directly by the shared Nginx instance
- Read-only health checks: `curl` against `https://smart-learning-solutions.craftandconscious.com`
  — forms reference `api.web3forms.com`, `og:image` resolves, all pages 200, security headers
  present (`docs/DEPLOYMENT.md` §7), internal paths (`/AUDIT.md`, `/.git/config`, etc.) still 404
- Log locations: not documented — no SSH-based log access convention established yet
- Rollback target: timestamped `.bak-<TIMESTAMP>` directory taken before every deploy (see
  `docs/DEPLOYMENT.md` §9)
- Actions requiring approval: every deploy — no CI/auto-deploy exists; `scripts/deploy-staging.sh`
  is always run manually and only on separate, explicit per-session authorization (never inferred
  from a git push alone)

## Safety Boundaries

- Protected paths: `.git/`, `.claude/`, `.agents/`, `docs/`, `plans/`, `prompts/`, all root
  governance `.md` files — never named as a deploy source in `scripts/deploy-staging.sh`'s
  allowlist, so structurally excluded from staging regardless of what new internal paths appear
  later (see `DECISION_LOG.md` for the allowlist-over-denylist rationale)
- Secret-bearing files: none tracked — the Web3Forms access key in
  `src/js/web3forms-config.js` is a public form identifier, not a secret, per Web3Forms' own docs
  (`docs/DEPLOYMENT.md` §5)
- Prohibited actions: force-push to `main` without explicit owner confirmation; pointing production
  DNS or treating hosting as finalized while OD-003 is unresolved; fabricating deployed-domain test
  results
- Commit/push authorization rule: commit freely for authorized work; push to `origin/main` only
  with the owner's explicit authorization for that session
- Tag/release authorization rule: tag per `docs/VERSIONING.md`'s version-bump rules; MAJOR bumps
  require asking first (§11)
- Deploy/merge authorization rule: staging deploy requires separate, explicit, per-session
  authorization — never assumed from a push alone; no merge workflow in use (single `main` branch
  is the norm; feature branches are occasionally used but merged directly, not via PR)
