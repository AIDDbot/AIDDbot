# Greenfield: propose

The **Architect** writes `.product/system.md` from `assets/system.template.md`. The system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.

- Read the foundation specs in `assets/foundation/` first. The proposal and each `AGENTS.md` keep their contracts (ports, variable names, routes). Never set other values for them.
- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. Projects.
  3. For each project, one archetype of its type from `assets/archetypes.md`, as written.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- Interactive mode: never assume a technology. Before you settle an archetype or a technology, ask about each open choice: language and runtime, framework, package manager, persistence, and the tool of each tooling slot. Offer the catalog archetype or the usual option of `assets/ecosystems.md` first.
- YOLO mode: never ask. Use the choices of the request and the usual option for all other choices.
- Archetype on demand: when the human refuses all archetypes of a type, fill `assets/project.AGENTS.template.md` for the technology that the human selects, with `assets/ecosystems.md` as guidance. Do this in the proposal, before the scaffold.

Get the approval of the human (not in YOLO mode). Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.
