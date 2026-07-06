# Extract a container in brownfield mode

The goal is to document the components and conventions that exist; don't redesign.

- Read the entry point, then map real modules to components.
- Stereotype each component by what it does — the tier guide lists the expected stereotypes.
- Contracts are the real routes/interfaces/exports; entities are the real schema/models.
- Keep field-level detail in the shared docs the tier guide names; the container arch lists
  only the contract surface and links them.
- Lift naming, structure, errors, and tests from the existing code.
- Pick the cleanest existing unit as the canonical example — quote it, don't rewrite it.

## Guardrails
- **Observe, don't reform** — if inconsistent, document the dominant pattern and flag the rest.
- **Independent containers** — never promote one container's conventions onto another.
