# Root AGENTS.md

Fill `AGENTS.md` with findings and human input. It is a map of the whole system (Halloween D59).

- When it exists, change only what the repository contradicts, and keep the content that a human wrote.
- Keep the sections of the template in their order. Remove each comment, and each section that has no content: never leave a heading with no line under it.
- Write only facts of the whole system. List each project with its type and its path: its `{source_root}/AGENTS.md` owns its technology, its slots, its folders and its platform. Never copy them here.
- Architecture and Code: copy them as written when `.product/system.md` exists. Otherwise, remove them.
- Commands: write only the commands of an agent and the hook, as they exist. The commands for a human go to the `README.md`, never here.
- Never list skills or the actions that run them: the orchestrators own that routing.
- Write each `AGENTS.md` in the language of the documents of the Assistant section, English by default. Never add a note that repeats another section.
- Run `node .agents/aidd/aidd.mjs agents check`, and repair each problem that it gives: at most 128 lines, the sections in order, no empty section, no comment.
