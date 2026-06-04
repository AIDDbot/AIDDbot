# Extract — brownfield mode

- Read this when the container **already has source code**.
- You **extract**: document the components and conventions that exist. Don't redesign.

## Components (`{container}.arch.md`)
- Read the container's entry point, then map real modules to components.
- Stereotype each component by what it actually does (controller, service, repository, ...).
- Contracts = real routes / interfaces / exports; entities = real schema / models.

## Rules (`{container}.rules.md`)
- Lift naming, structure, errors, and tests from the existing code.
- Pick the **cleanest existing unit** as the canonical example — quote it, don't rewrite it.

## Guardrails
- Observe; don't reform. If the tier is inconsistent, document the dominant pattern and flag the rest.
- Extract each container independently; don't promote one tier's conventions onto another.
