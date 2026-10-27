# Greenfield: propose

The **Architect** writes `.product/system.md` from `assets/system.template.md`.

- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. The archetype of `assets/archetypes.md` that fits them, as one closed question that names its projects and technologies.
- When the human accepts an archetype, ask nothing more about its projects, technologies, or tools.
- No archetype fits when the human asks for other projects or another technology, or refuses the archetype. Then stop:
  1. Journal `blocked`.
  2. Tell the human that AIDDbot offers only the archetypes of `assets/archetypes.md`.
  3. Never make an archetype.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- YOLO mode: never ask. Use the archetype that fits, or stop as above.
- When the human accepts the archetype, the **Architect** journals `node .agents/aidd/aidd.mjs log select "<archetype>: <projects>"`.

Get the approval of the human. In YOLO mode, the written proposal has the approval. Write the date of the approval in the `approved` field of `.product/system.md`: the core founds no system without it. Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.
