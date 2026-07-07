# Extract a db container

Persistence tier: schema, migrations, and seeds — little or no runnable code.

## 1. Research
- Stereotype the components as migration, seed, or view/procedure.

## 2. Plan
- _read_ [container arch template](../assets/container.arch.template.md).
- _read_ [code rules template](../assets/code.rules.template.md).
- _read_ [db schema template](../assets/db.schema.template.md).
- Keep table-level facts in `db.schema.md`; the arch doc holds only structure and tooling.

## 3. Implement
- Write `{Arch}/{container}.arch.md`.
- Write `{Rules}/{container}.rules.md`.
- Write `{Arch}/db.schema.md` — the migrations/DDL remain the canonical source.
- Capture migration tooling, naming, and rollback conventions in the code rules.
