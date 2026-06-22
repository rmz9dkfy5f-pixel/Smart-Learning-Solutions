# Proposed Optional Systems For Approval

These systems are beneficial, but they are not installed by default because they add dependencies, automation risk, or project-specific complexity.

## 1. Git Hooks / Pre-Commit Quality Gates

**What it adds:** Local enforcement before commits.

Possible checks:

- formatting
- linting
- tests
- secret scanning
- large-file detection
- generated-file warnings

**Why not default:** Hooks can block work unexpectedly and differ by language stack.

**Approval decision:** Pending.

## 2. CI Workflow Templates

**What it adds:** GitHub Actions or equivalent CI files for lint/test/build/security checks.

**Why not default:** CI syntax depends on hosting platform, package manager, runtime, and deployment target.

**Approval decision:** Pending.

## 3. Security Scanning Pack

**What it adds:** Dependency audit, secret scanning, SBOM generation, license checks, and Docker image scanning.

**Why not default:** Tool choice depends on stack and can create noisy false positives.

**Approval decision:** Pending.

## 4. Browser / Device Test Matrix

**What it adds:** Playwright-based cross-browser checks, viewport checks, and screenshot comparison.

**Why not default:** Useful for web apps, unnecessary for CLI tools, games, backend services, and docs-only repos.

**Approval decision:** Pending.

## 5. Accessibility / SEO / Performance Audit Pack

**What it adds:** Lighthouse, axe, metadata checks, structured data checks, and page-speed budget.

**Why not default:** Primarily useful for public-facing websites.

**Approval decision:** Pending.

## 6. Devcontainer / Reproducible Environment

**What it adds:** `.devcontainer/` setup for consistent environments across machines.

**Why not default:** Requires Docker or compatible tooling and may be overkill for small repos.

**Approval decision:** Pending.

## 7. ADR / RFC Workflow

**What it adds:** Architecture Decision Records and Request For Comments templates.

**Why not default:** Great for serious projects, but extra ceremony for small solo experiments.

**Approval decision:** Pending.

## 8. Release Automation

**What it adds:** Automated version bumping, changelog generation, release notes, and tagging.

**Why not default:** Release strategy depends on project type.

**Approval decision:** Pending.

## 9. Threat Model Template

**What it adds:** STRIDE-style threat model, asset inventory, trust boundaries, and abuse-case review.

**Why not default:** Should be tailored to app risk, user data, hosting model, and authentication system.

**Approval decision:** Pending.

## 10. Prompt Vault Integration Pack

**What it adds:** Export/import conventions for Prompt Vault Compatible Markdown, prompt scorecards, prompt test cases, and prompt lifecycle states.

**Why not default:** Only needed for repos that directly store or operate on prompt systems.

**Approval decision:** Pending.
