# Extract — greenfield mode

- Read this when the container has **no source code** yet.
- You **prescribe**: define the components and conventions the container *should* have.

## Components (`{container}.arch.md`)
- Derive the component split from the container's tier and chosen framework.
- Prescribe folders, layers, and how components reference each other.
- Mark every diagram and contract as **intended**, not observed.
- Detail domain entities only for the container that will own/persist them.

## Rules (`{container}.rules.md`)
- State the conventions the stack idiomatically expects; one default, no menus.
- Write the canonical example you want `/codify` to follow, even with no code yet.

## Guardrails
- One strong default over a list of options.
- Never invent domain entities or contracts — ask if the spec is missing.
