# Extract an e2e container

Transversal tier: verifies the functional containers from the outside.

## Templates
- `{Arch}/{container}.arch.md` from
  [container arch template](../assets/container.arch.template.md).
- `{Rules}/{container}.rules.md` from [code rules template](../assets/code.rules.template.md).

## Focus
- Stereotype the components as suite/spec, fixture, or page object/helper.
- Treat the suites and helpers as components and the covered user journeys as contracts.
- Organize suites by feature, one per `docs/{feature}.md` — never by spec slug.
- Consume `api.schema.md` and the front routes — this container owns no schema files.
- Ground the suite that `/codify` implements from `e2e.plan.md` and `/verify` judges downstream.
- Capture selector strategy, fixture management, and flake policy in the code rules.
