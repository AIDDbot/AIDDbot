# Extract guide — evidence wins

## Guardrails
- **Evidence wins** — document what exists; if no evidence, propose and ask.
- **Never invent requirements** — propose and ask the user.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Observe, don't reform** — never redesign what exists; flag contradictions instead.
- **Internals are out of your scope** — do not read or write code.

The goal is to document what exists and prescribe defaults only where nothing exists.

- Read the entry point of the container and make a map of the components.
- Stereotype each component by what it does — the tier guide lists the expected stereotypes.
- _read_ the existing code of each stereotype component
- Document the architecture and code rules for each component.

## Tiers

### Db
Persistence tier: schema, migrations, and seeds — little or no runnable code.
Can be part of the back tier or standalone.
- _read_ [db schema template](../assets/db.schema.template.md).
  - _write_ `{Arch}/{container}.db.schema.md`.

### Back
Domain tier: owns the business logic, and usually the API and the domain model.
Can include the db tier.
- _if_ it exposes an API:
  - _read_ [API schema template](../assets/api.schema.template.md).
  - _write_ `{Arch}/{container}.api.schema.md`.
- _if_ it owns the db store:
  - _read_ [db schema template](../assets/db.schema.template.md).
  - _write_ `{Arch}/{container}.db.schema.md`.
- _if_ it owns the domain model:
  - _read_ [ER template](../assets/ER.template.md).
  - _write_ `{Arch}/{container}.ER.md`.

### Front
UI tier: renders views, holds client state, and calls sibling APIs.
- Capture styling and state-management conventions in the code rules.
- _if_ `{container}.api.schema.md` exists
  - _read_ [the API field shapes]({Arch}/{container}.api.schema.md).

### E2E
Transversal tier: verifies the functional containers from the outside.
