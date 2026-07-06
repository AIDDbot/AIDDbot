# Extract a container in greenfield mode

The goal is to prescribe the components and conventions the container should have.

- Derive the component split from the container's role and chosen framework — the tier
  guide lists the expected stereotypes.
- Prescribe folders, layers, and how components reference each other.
- Mark every diagram and contract as *intended*.
- Put the intended schemas in the shared docs the tier guide names; the container arch
  lists only the contract surface and links them.
- State the conventions the stack idiomatically expects, applying **One strong default**.
- Write the canonical example you want `/codify` to follow, even with no code yet.

## Guardrails
- **One strong default** — prefer it over a menu of options.
- **Never invent domain entities or contracts** — ask if the spec is missing.
