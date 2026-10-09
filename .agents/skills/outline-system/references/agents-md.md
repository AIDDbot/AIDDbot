# Root AGENTS.md

Fill `AGENTS.md` with findings and human input.

- When it exists, change only what the repository contradicts, and keep the content that a human wrote.
- Keep each template section. A section without repository evidence stays as the template writes it: never drop it or summarize it.
- Write only facts of the whole system. List each project with its type, and point to its `{source_root}/AGENTS.md`. That file owns the technology, the tooling, the architecture, and the code rules of the project: never copy them here.
- Blueprint: keep it as written when `.product/system.md` exists. Otherwise, remove it.
- Common stack: when two or more projects share a technology, write each tooling slot and each technology rule that their `{source_root}/AGENTS.md` files repeat, and remove those lines from each of them. Otherwise, remove the section.
- Record the important paths and the product records. Never list skills, commands, or the actions that run them: the orchestrators own that routing.
- Write each `AGENTS.md` in English, the language of its template. Never add a note that repeats another section.
