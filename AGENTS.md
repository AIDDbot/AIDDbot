# AIDDbot Agent Instructions

## Project status

AIDDbot is in the design stage. The repository holds foundational documents only. Do not create code, templates, or skills unless the task asks for them.

Keep the foundational documents at the repository root, with uppercase file names. Milestone H1 moves them into the AIDDbot wiki in `docs/wiki/`. The current milestone is in [PLAN.md](PLAN.md).

## Reference documents

Each topic has one reference document. Read it before you change that topic.

| Topic | Reference document |
| --- | --- |
| Scope, building blocks, shared core, inclusion criteria | [INTENT.md](INTENT.md) |
| Milestones, dogfooding rules, findings, future ideas | [PLAN.md](PLAN.md) |
| Change flow, spec, document types, standards, metadata | [DOCUMENTATION-CATALOG.md](DOCUMENTATION-CATALOG.md) |
| Terms | [GLOSSARY.md](GLOSSARY.md) |
| Wiki model and page rules | [KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md) |
| Bun runtime, CLI, script contract | [SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md) |
| Folders and skill locations | [SCAFFOLDING.md](SCAFFOLDING.md) |
| Colors, fonts, Mermaid diagrams | [DESIGN.md](DESIGN.md) |
| Notable changes | [CHANGELOG.md](CHANGELOG.md) |

When you change a rule:

1. Change it in its reference document.
2. Check the documents that the rule affects, and update them. Include the documents that apply the rule without a link to it.
3. Record the reason in the decisions table of the reference document, if it has one.

Git and `CHANGELOG.md` keep the history. Do not add change history sections to the documents.

## Way of working

- **Spec-first.** Every change starts with one [spec](DOCUMENTATION-CATALOG.md#spec): goal, scope, and acceptance. A person approves it before any code. When the change closes, record the verification in the spec and update the affected living documents.
  - Temporary exception: until the spec template has been used in a change, changes to the foundational documents do not need a spec.
- **Change types** are `chore`, `refactor`, `fix`, and `feat`. An `epic` only groups specs.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The commit type matches the change type.
- **Conventions** for this project are the writing style and script rules below.
- **Skills** define the objective, required context, expected outputs, and verification criteria. The model chooses the approach.
- **Scripts** do deterministic tasks. Skills do not repeat that logic in prose.
- **Shared core.** Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one AI coding tool. [Shared core](INTENT.md#shared-core)

## Writing style

Use the terms in the [project glossary](GLOSSARY.md).

All repository content is in English. Write for people and machines:

- Short sentences. One idea per sentence. Active voice. Simple words (ASD-STE100 style).
- Lists and tables instead of long paragraphs.
- Relative Markdown links. Cite sources for external facts.

## Scripts

Follow [SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md):

- TypeScript on the latest stable Bun.
- Before you finish a script change, run `bun lint`, `bunx tsc --noEmit`, and `bun test`.
- Skills call the exact package version shipped with the skills: `bunx --bun --package <package>@<x.y.z> aiddbot <command>`.
