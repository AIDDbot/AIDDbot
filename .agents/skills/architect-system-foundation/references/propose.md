# Greenfield: propose

The **Architect** writes `.product/system.md` from `assets/system.template.md`. The system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.

- The proposal and each `AGENTS.md` keep the contracts of the foundation specs (ports, variable names, routes). Never set other values for them. Archetype Base already keeps them: read the specs in `assets/foundation/` only when a project uses no Archetype Base archetype.
- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. Projects.
  3. For each project, one archetype of its type from `assets/archetypes.md`, as written.
- Archetype Base is the first offer when the system fits it: one `back-api`, one `front-web`, one `e2e`, and users. Its three archetypes go together, or none of them goes. Its projects keep the folder names `back`, `front` and `e2e`. If the request asks for a different technology for one of them, use no Archetype Base archetype.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- Interactive mode: never assume a technology. Before you settle an archetype or a technology, ask about each open choice: language and runtime, framework, package manager, persistence, and the tool of each tooling slot. Offer the catalog archetype or the usual option of `assets/ecosystems.md` first.
- YOLO mode: never ask. Use the choices of the request and the usual option for all other choices.
- When the archetype or the technologies of a project are settled, and before an archetype on demand is made, the **Architect** journals `node .agents/aidd/aidd.mjs log select "{project}: <archetype, or on demand: technologies>"`, one time for each project.
- Archetype on demand: when the human refuses all archetypes of a type, fill `assets/project.AGENTS.template.md` for the technology that the human selects, with `assets/ecosystems.md` as guidance. Do this in the proposal, before the scaffold.

Get the approval of the human (not in YOLO mode). Journal it one time with `node .agents/aidd/aidd.mjs log approved "system proposal"`. Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.
