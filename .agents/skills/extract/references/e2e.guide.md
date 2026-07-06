# Extract an e2e container

Transversal tier: verifies the functional containers from the outside; its tests are owned
by `/verify` downstream.

## Templates
- [`container.arch.template.md`](../assets/container.arch.template.md) → `{Arch}/{container}.arch.md`.
- [`code.rules.template.md`](../assets/code.rules.template.md) → `{Rules}/{container}.rules.md`.

No schema files: it consumes `api.schema.md` and the front routes; it owns nothing.

## Focus
- Component stereotypes: suite/spec, fixture, page object/helper.
- Components = suites and helpers; contracts = the user journeys it covers.
- Capture selector strategy, fixture management, and flake policy in the code rules.
