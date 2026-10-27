# Greenfield: propose

The **Architect** writes `.product/system.md` from `assets/system.template.md`. The system is a solution of typed projects: `api`, `web`, `cli`, or `e2e`.

- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. Projects.
  3. The archetype of `assets/archetypes.md` that fits the projects, as one closed question that names its technologies.
- Archetype Web fits one `api`, one `web`, one `e2e`, and users. Its three projects go together, in the folders `projects/back`, `projects/front` and `projects/e2e`. It has no business feature: it carries only the foundation (scaffold, platform, shell, presentation, about, users, settings). A request for no features yet still fits it.
- Archetype CLI fits one local `cli` (no `api`, no database) and one `e2e`, without users. Its two projects go together, in the folders `projects/cli` and `projects/e2e`. It carries only the foundation (scaffold, platform, shell, presentation, about, settings). A request for no features yet still fits it.
- When the human accepts an archetype, ask nothing more about its technologies or tools.
- No archetype fits when the projects differ, when the request asks for a different technology, or when the human refuses the archetype. Then stop: journal `blocked`, and tell the human that AIDDbot offers only the archetypes of `assets/archetypes.md`. Never make an archetype.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- YOLO mode: never ask. Use the archetype that fits, or stop as above.
- When the human accepts the archetype, the **Architect** journals `node .agents/aidd/aidd.mjs log select "<archetype>: <projects>"`.

Get the approval of the human. In YOLO mode, the written proposal has the approval. Write the date of the approval in the `approved` field of `.product/system.md`. Journal it one time with `node .agents/aidd/aidd.mjs log approved "system proposal"`. Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.
