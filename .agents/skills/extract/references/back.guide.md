# Extract a back container

Domain tier: owns the business logic, and usually the API and the domain model.

## Templates
- `{Arch}/{container}.arch.md` from
  [container arch template](../assets/container.arch.template.md).
- `{Rules}/{container}.rules.md` from [code rules template](../assets/code.rules.template.md).
- If it exposes an API, `{Arch}/api.schema.md` from
  [API schema template](../assets/api.schema.template.md).
- If it owns the store, `{Arch}/db.schema.md` from
  [db schema template](../assets/db.schema.template.md).
- If it owns the domain model, `{Arch}/ER.md` from [ER template](../assets/ER.template.md),
  linked from `system.arch.md`'s overview.

## Focus
- Stereotype the components as controller/route handler, service/use case,
  repository/gateway, or entity/model.
- Map the components along the chain from entry point through routing and services
  to persistence.
- Keep `ER.md` to business entities and their main relationships; attributes and
  constraints belong in `db.schema.md`.
- Capture error handling, validation, and testing conventions in the code rules.
