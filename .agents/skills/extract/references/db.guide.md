# Extract a db container

Persistence tier: schema, migrations, and seeds — little or no runnable code.

## Templates
- [`container.arch.template.md`](../assets/container.arch.template.md) → `{Arch}/{container}.arch.md`.
- [`code.rules.template.md`](../assets/code.rules.template.md) → `{Rules}/{container}.rules.md`.
- [`db.schema.template.md`](../assets/db.schema.template.md) (always) → `{Arch}/db.schema.md`;
  the migrations/DDL remain the canonical source.

## Focus
- Component stereotypes: migration, seed, view/procedure.
- Table-level facts go to `db.schema.md`; the arch doc keeps only structure and tooling.
- Capture migration tooling, naming, and rollback conventions in the code rules.
