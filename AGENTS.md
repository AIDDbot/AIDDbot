# AIDDbot Agent Instructions

## Project status

AIDDbot is in the design stage. The repository holds foundational documents only. Do not create code, templates, or skills unless the task asks for them.

## Foundational documents

Read the relevant documents before you change anything:

- [INTENT.md](INTENT.md): scope, engineering foundations, and the roles of skills, hooks, and scripts.
- [DOCUMENTATION-CATALOG.md](DOCUMENTATION-CATALOG.md): document types, change profiles, standards, and metadata. Use it to design templates and workflows.
- [KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md): wiki model, layout, page rules, and operations.
- [SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md): Bun runtime, CLI packaging, script contract, and performance budget.

These documents reference each other. When you change one:

1. Check the others for consistency and update them.
2. Record the change in the document's change history or decisions table, if it has one.

## Way of working

- **Spec-first.** Every change starts with a spec, sized to the change type (`chore`, `refactor`, `fix`, `feat`, `epic`). When the change closes, update the affected living documents.
  - Temporary exception: until the spec templates exist, changes to the foundational documents do not need a spec.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The commit type matches the change type.
- **Skills** define the objective, required context, expected outputs, and verification criteria. The model chooses the approach.
- **Scripts** do deterministic tasks. Skills do not repeat that logic in prose.

## Writing style

All repository content is in English. Write for people and machines:

- Short sentences. One idea per sentence. Active voice. Simple words (ASD-STE100 style).
- Lists and tables instead of long paragraphs.
- Relative Markdown links. Cite sources for external facts.

## Scripts

Follow [SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md):

- TypeScript on the latest stable Bun.
- Before you finish a script change, run `bun lint`, `bunx tsc --noEmit`, and `bun test`.
- Skills and hooks call the exact package version shipped with the skills: `bunx --bun --package <package>@<x.y.z> aiddbot <command>`.
