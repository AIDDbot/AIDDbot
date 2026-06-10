# Extract — greenfield mode

The container has no source code yet. **Prescribe**: define the components and conventions it *should* have.

- **Components** (`{container}.arch.md`): derive the component split from the container's role and chosen framework. Prescribe folders, layers, and how components reference each other; mark every diagram and contract as *intended*.
- **Rules** (`{container}.rules.md`): state the conventions the stack idiomatically expects — one default, no menus. Write the canonical example you want `/codify` to follow, even with no code yet.

## Guardrails
- One strong default over a list of options.
- Never invent domain entities or contracts — ask if the spec is missing.
