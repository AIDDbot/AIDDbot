# Explore a project in brownfield mode

The goal is to document the code as it is; don't prescribe or redesign.

- Perform a shallow scan of the tree and entry points. Detect the `{Product_Folder}` for documenting the product and `{Source_Folders}` where the source code is.

- Do not read code files (only  **Guide files**).

- Define the problem and solution of the **Product** from the `README.md` and existing documentation.

- Identify the containers (source code folders).

For each container:

- Obtain its technical stack, paths, and scripts for developers.

- Perform reverse engineering to extract business entities and main relationships.

## Guardrails
- Observe; don't reform.

- Document the reality, not the aspirations.

- Flag contradictions (e.g. between documentation and code).
