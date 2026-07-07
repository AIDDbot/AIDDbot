# Extract an e2e container

Transversal tier: verifies the functional containers from the outside.

## 1. Research
- Foreach functional container, _read_ [its component architecture]({Arch}/{container}.arch.md).
- If `api.schema.md` exists, _read_ [the API field shapes]({Arch}/api.schema.md).
- Stereotype the components as suite/spec, fixture, or page object/helper.
- Treat the suites and helpers as components and the covered user journeys as contracts.

## 2. Plan
- _read_ [container arch template](../assets/container.arch.template.md).
- _read_ [code rules template](../assets/code.rules.template.md).
- Organize suites by feature area (as grouped in `{PRD}`) — one suite per feature, never by spec slug.
- Ground the suite that `/codify` implements from `e2e.plan.md`; `/verify` judges it downstream.

## 3. Implement
- Write `{Arch}/{container}.arch.md`.
- Write `{Rules}/{container}.rules.md`.
- Link the shared schemas — this container owns none.
- Capture selector strategy, fixture management, and flake policy in the code rules.
