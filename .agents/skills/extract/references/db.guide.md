# Extract a db container

Persistence tier: schema, migrations, and seeds — little or no runnable code.

## Templates
- Write `{Arch}/{container}.arch.md` from
  [container arch template](../assets/container.arch.template.md).
- Write `{Rules}/{container}.rules.md` from
  [code rules template](../assets/code.rules.template.md).
- Write `{Arch}/db.schema.md` from [db schema template](../assets/db.schema.template.md)
  — the migrations/DDL remain the canonical source.

## Focus
- Stereotype the components as migration, seed, or view/procedure.
- Keep table-level facts in `db.schema.md`; the arch doc holds only structure and tooling.
- Capture migration tooling, naming, and rollback conventions in the code rules.
