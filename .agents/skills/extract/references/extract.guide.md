# Extract guide — evidence wins

The goal is to document the components and conventions that exist and prescribe the
missing ones.

- Read the entry point, then map real modules to components; with no code, derive the
  component split from the container's role and chosen framework.
- Stereotype each component by what it does — the tier guide lists the expected
  stereotypes.
- Take contracts from the real routes/interfaces/exports and entities from the real
  schema/models; with no code, take them from the spec.
- Put the field-level detail in the shared docs the tier guide names.
- Lift naming, structure, errors, and tests from the existing code; where the code is
  silent, state the conventions the stack idiomatically expects.
- Pick the cleanest existing unit as the canonical example — quote it, don't rewrite it;
  with no code, write the example you want `/codify` to follow.
- Mark every prescribed diagram, contract, and convention as *intended*.

## Guardrails
- **Evidence wins** — extract what exists; prescribe only where there is no evidence,
  marked *intended*.
- **Observe, don't reform** — if inconsistent, document the dominant pattern and flag
  the rest.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Never invent domain entities or contracts** — ask if the spec is missing.
- **Independent containers** — never promote one container's conventions onto another.
