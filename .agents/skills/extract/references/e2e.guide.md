# Extract an e2e container

Transversal tier: verifies the functional containers from the outside. Its suite is
implemented by `/codify` from `e2e.plan.md` (grounded in the arch/rules extracted here)
and judged by `/verify` downstream.

## Templates
- `{Arch}/{container}.arch.md` from [container arch template](../assets/container.arch.template.md).
- `{Rules}/{container}.rules.md` from [code rules template](../assets/code.rules.template.md).
- No schema files — it consumes `api.schema.md` and the front routes; it owns nothing.

## Focus
- Component stereotypes: suite/spec, fixture, page object/helper.
- Components are the suites and helpers; contracts are the user journeys covered.
- Organize suites **by feature** (one suite per `docs/{feature}.md`), like production
  code — never by spec slug.
- Capture selector strategy, fixture management, and flake policy in the code rules.
