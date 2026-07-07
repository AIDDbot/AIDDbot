# Extract a back container

Domain tier: owns the business logic, and usually the API and the domain model.

## 1. Research
- Map the components along the chain from entry point through routing and services
  to persistence.
- Stereotype the components as controller/route handler, service/use case,
  repository/gateway, or entity/model.

## 2. Plan
- _read_ [container arch template](../assets/container.arch.template.md).
- _read_ [code rules template](../assets/code.rules.template.md).
- If it exposes an API, _read_ [API schema template](../assets/api.schema.template.md).
- If it owns the store, _read_ [db schema template](../assets/db.schema.template.md).
- If it owns the domain model, _read_ [ER template](../assets/ER.template.md).
- Keep `ER.md` to business entities and their main relationships; attributes and
  constraints belong in `db.schema.md`.

## 3. Implement
- Write `{Arch}/{container}.arch.md`.
- Write `{Rules}/{container}.rules.md`.
- If it exposes an API, write `{Arch}/api.schema.md`.
- If it owns the store, write `{Arch}/db.schema.md`.
- If it owns the domain model, write `{Arch}/ER.md`; link it from `system.arch.md`'s
  overview.
- Capture error handling, validation, and testing conventions in the code rules.
