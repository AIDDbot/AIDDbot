# Extract a container in greenfield mode

The goal is to prescribe the components and conventions the container should have.

- Derive the component split from the container's role and chosen framework.
- Prescribe folders, layers, and how components reference each other.
- Mark every diagram and contract as *intended*.
- Put the intended database/API schema in the shared `db.schema.md` / `api.schema.md` files.
- The container arch lists only the contract surface and links those files.
- State the conventions the stack idiomatically expects — one default, no menus.
- Write the canonical example you want `/codify` to follow, even with no code yet.

## Guardrails
- Prefer one strong default over a menu of options.
- Never invent domain entities or contracts — ask if the spec is missing.
