# Security Baseline

## Baseline Rules

- Do not commit secrets, tokens, API keys, private keys, or credentials.
- Do not weaken authentication, authorization, or input validation without explicit approval.
- Do not add remote code execution paths casually.
- Do not install new production dependencies without documenting why.
- Treat third-party skills, scripts, and generated code as untrusted until reviewed.
- Prefer least privilege.
- Document all security-sensitive assumptions.

## Review Areas

- Secrets handling
- Authentication
- Authorization
- Input validation
- Dependency risk
- File upload/download risk
- Logging of sensitive data
- Network exposure
- Admin routes
- Build/deployment secrets
- Agent-generated scripts

## Security Status

- Last review: 2026-09-18 (full project-readiness audit, see `AUDIT.md`)
- Result: No critical or actively-exploited findings. 2 High, 5 Medium, 1 Low — see `AUDIT.md` for
  full detail.
- Risks: No live privacy policy despite forms collecting PII (H-1, blocked on owner input); HSTS
  not enforced (H-2); CSP is report-only, not enforced (M-1); 21MB unoptimized hero video (M-2,
  performance not security); `Server` header discloses nginx version (M-3).
- Next action: Work the plan in `plans/2026-09-18-audit-remediation.md` — enforce HSTS/CSP on the
  VPS (scoped safely to this project's own vhosts only, confirmed via direct SSH read), compress
  the video, then close H-1 once the owner supplies the four missing legal facts.
