# Explore — brownfield mode

Source code already exists. **Extract**: document what the code actually is; don't prescribe or redesign.

- **Explore**: infer OS, shell, Git remote. Shallow-scan the tree — read `README.md`, manifests (`package.json`, etc.), and entry points. Detect the real `{Product_Folder}` and `{Source_Folders}` from the layout.
- **{Agents_File}**: record the actual tech stack, paths, and scripts. Fill **Product** problem + solution from `README.md` / existing docs.
- **Architecture**: reverse-engineer containers from real folder/process boundaries. Tech per container = what's installed and imported. Extract entities and relationships (no attributes/constraints).

## Guardrails
- Observe; don't reform. Document reality, not aspiration — if the code is messy, describe it as-is.
- Flag contradictions (e.g. docs vs. code) instead of silently picking one.
