# Extract — brownfield mode

The container already has source code. **Extract**: document the components and conventions that exist; don't redesign.

- **Components** (`{container}.arch.md`): read the entry point, then map real modules to components and stereotype each by what it does (controller, service, repository, ...). Contracts = real routes/interfaces/exports; entities = real schema/models.
- **Rules** (`{container}.rules.md`): lift naming, structure, errors, and tests from the existing code. Pick the cleanest existing unit as the canonical example — quote it, don't rewrite it.

## Guardrails
- Observe; don't reform. If the container is inconsistent, document the dominant pattern and flag the rest.
- Extract each container independently; don't promote one container's conventions onto another.
