# Greenfield: propose

The **Architect** writes `.product/system.md` from `assets/system.template.md`. The system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.

- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. Projects.
  3. The library of `assets/archetypes.md` that fits the projects, as one closed question that names its technologies.
- Archetype Base fits one `back-api`, one `front-web`, one `e2e`, and users. Its three archetypes go together, in the folders `back`, `front` and `e2e`. It has no business feature: it carries only the foundation (configuration, monitoring, layout, health, accounts, about, record views). A request for no features yet still fits it.
- Archetype CLI fits one local `cli` (no `back-api`) and one `e2e`, without users. Its two archetypes go together, in the folders `cli` and `e2e`. A request for no features yet still fits it.
- When the human accepts a library, ask nothing more about its technologies or tools.
- No library fits when the projects differ, when the request asks for a different technology, or when the human refuses the library. Then stop: journal `blocked`, and tell the human that AIDDbot offers only the libraries of `assets/archetypes.md`. Never make an archetype.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- YOLO mode: never ask. Use the library that fits, or stop as above.
- When the library is settled, the **Architect** journals `node .agents/aidd/aidd.mjs log select "<library>: <projects>"`.

Get the approval of the human. In YOLO mode, the proposal is approved as soon as it is written. Write the date of the approval in the `approved` field of `.product/system.md`. Journal it one time with `node .agents/aidd/aidd.mjs log approved "system proposal"`. Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.
