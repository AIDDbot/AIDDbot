# Explore a project in greenfield mode

The goal is to prescribe the default values and ask the user for the missing information.

- Confirm the operating system, shell, and remote Git repository.
- Propose the `{Product_Folder}` and `{Source_Folders}` (the user can override).
- State the intended stack as a decision.
- Fill the **Product** problem + solution from the user's brief; if absent, ask before writing.
- Prescribe the container split and tech per container.
- Diagrams describe the *intended* design; mark assumptions.

## Guardrails
- **One strong default** — prefer it over a menu of options.
- **Never invent requirements** — ask the user.
- **Entities are `/extract`'s** — domain entities and relationships are proposed there,
  by the container that owns the domain model (typically the backend).
