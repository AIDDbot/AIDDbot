# Extract a back container

Domain tier: owns the business logic, and usually the API and the domain model.

## Templates
- [`container.arch.template.md`](../assets/container.arch.template.md) → `{Arch}/{container}.arch.md`.
- [`code.rules.template.md`](../assets/code.rules.template.md) → `{Rules}/{container}.rules.md`.
- [`api.schema.template.md`](../assets/api.schema.template.md) (if it exposes an API) → `{Arch}/api.schema.md`.
- [`db.schema.template.md`](../assets/db.schema.template.md) (if it owns the store) → `{Arch}/db.schema.md`.
- [`ER.template.md`](../assets/ER.template.md) (owns the domain model) → `{Arch}/ER.md`,
  linked from `system.arch.md`'s overview.

## Focus
- Component stereotypes: controller/route handler, service/use case, repository/gateway, entity/model.
- Follow the chain entry point → routing → services → persistence to map the components.
- `ER.md` holds business entities and their main relationships — no attributes or
  constraints (that detail belongs to `db.schema.md`).
- Capture error handling, validation, and testing conventions in the code rules.
