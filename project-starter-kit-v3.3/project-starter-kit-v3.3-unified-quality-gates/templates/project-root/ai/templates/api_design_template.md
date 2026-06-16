# API Design — [Service Name]

Use this template when the work involves an API, service boundary, auth flow, database model, scaling concern, or production-facing integration.

For smaller non-API architecture decisions, use `design_template.md` instead.

---

## 1. System Overview

Describe the purpose of this service and where it fits in the architecture.

> [What this service does and why it exists.]

Architecture style:

- [ ] Monolith
- [ ] Modular monolith
- [ ] Microservice
- [ ] Hybrid
- [ ] Stateless
- [ ] Stateful

Boundary:

- Owns: [responsibilities]
- Does not own: [out-of-scope responsibilities]

---

## 2. Core Responsibilities

- [ ] [Responsibility]
- [ ] [Responsibility]
- [ ] [Responsibility]

---

## 3. Tech Stack Decisions

| Area | Choice | Reason |
|---|---|---|
| Framework | [choice] | [reason] |
| Auth | [choice] | [reason] |
| Database | [choice] | [reason] |
| Cache | [choice] | [reason] |
| Queue | [choice] | [reason] |
| Deployment | [choice] | [reason] |
| Observability | [choice] | [reason] |

---

## 4. Data Model

### Entity: [Name]

Fields:

- `id`: [type / purpose]
- `[field]`: [type / purpose]

Relationships:

- [relationship]

Persistence rules:

- [rule]

Data retention:

- [rule]

---

## 5. API Surface

### Auth

| Method | Path | Purpose | Auth Required | Status |
|---|---|---|---|---|
| POST | `/auth/login` | [purpose] | No | planned |
| POST | `/auth/refresh` | [purpose] | Refresh token | planned |

### Core

| Method | Path | Purpose | Auth Required | Status |
|---|---|---|---|---|
| GET | `/resource` | [purpose] | Yes | planned |
| POST | `/resource` | [purpose] | Yes | planned |

Request/response examples should use placeholders only.

```json
{
  "example": "<EXAMPLE_VALUE>"
}
```

---

## 6. Security Design

Token strategy:

- [ ] [strategy]

Encryption:

- [ ] [at rest / in transit]

Rate limiting:

- [ ] [rule]

Validation:

- [ ] [input validation rule]

Secrets:

- [ ] [how secrets are stored]

Authorization:

- [ ] [RBAC / ownership checks / policy]

Logging safety:

- [ ] [what must not appear in logs]

---

## 7. Failure Scenarios

| Scenario | Impact | Mitigation |
|---|---|---|
| [failure] | [impact] | [mitigation] |
| [failure] | [impact] | [mitigation] |

---

## 8. Scaling Strategy

Horizontal / vertical:

- [ ] [strategy]

Caching:

- [ ] [strategy]

Database scaling:

- [ ] [strategy]

Queue / background work:

- [ ] [strategy]

State handling:

- [ ] [where state lives]

---

## 9. Observability

Logging:

- [ ] [events to log]

Metrics:

- [ ] [metrics to track]

Alerts:

- [ ] [alert conditions]

Dashboards:

- [ ] [dashboard or report]

---

## 10. Future Enhancements

- [ ] [enhancement]
- [ ] [enhancement]
- [ ] [enhancement]

---

## 11. Decisions To Promote

Update these stable files only after the design is approved:

- [ ] `docs/API.md`
- [ ] `docs/DATA_MODEL.md`
- [ ] `docs/SECURITY.md`
- [ ] `docs/ARCHITECTURE.md`
- [ ] `docs/PERFORMANCE.md` if relevant
- [ ] `DECISION_LOG.md`

---

## 12. Approval Gate

Before implementation starts, confirm:

- [ ] The API boundary is clear.
- [ ] Security decisions are explicit.
- [ ] Data model is sufficient for the first slice.
- [ ] Failure scenarios have mitigations.
- [ ] The first vertical slice is defined in `PLAN.md`.
- [ ] Phase 2 is approved.
