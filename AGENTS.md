# AIDDbot Agent Instructions

## Project status

AIDDbot is in the design stage. The repository holds its wiki, its plan, and its specs. Do not create code, templates, or skills unless the task asks for them.

For project knowledge, start at [`docs/wiki/index.md`](docs/wiki/index.md). The current milestone is in [PLAN.md](PLAN.md).

## Reference documents

Each topic has one reference document. Read it before you change that topic. Wiki pages follow the [page rules](docs/wiki/knowledge-wiki.md#page-rules).

| Topic | Reference document |
| --- | --- |
| Scope, building blocks, shared core, inclusion criteria | [intent](docs/wiki/intent.md) |
| Milestones, dogfooding rules, findings, future ideas | [PLAN.md](PLAN.md) |
| Change flow, spec, document types, standards, metadata | [documentation catalog](docs/wiki/documentation-catalog.md) |
| Terms | [glossary](docs/wiki/glossary.md) |
| Wiki model, page rules, sources | [knowledge wiki](docs/wiki/knowledge-wiki.md) |
| CLI command form, script contract, candidate commands | [AIDDbot CLI](docs/wiki/aiddbot-cli.md) |
| Bun runtime, CLI development and packaging | [CLI development](docs/wiki/cli-development.md) |
| Folders, skill locations, what ships | [scaffolding](docs/wiki/scaffolding.md) |
| Colors, fonts, Mermaid diagrams | [DESIGN.md](DESIGN.md) |
| Notable changes | [CHANGELOG.md](CHANGELOG.md) |

When you change a rule:

1. Change it in its reference document.
2. Check the documents that the rule affects, and update them. Include the documents that apply the rule without a link to it.
3. Record the reason in the decisions table of the reference document, if it has one.

Git and `CHANGELOG.md` keep the history. Do not add change history sections to the documents.

## Way of working

- **Spec-first.** Every change starts with one [spec](docs/wiki/documentation-catalog.md#spec): goal, scope, and acceptance. A person approves it before any code. When the change closes, record the verification in the spec and update the affected living documents.
  - Temporary exception: until the spec template has been used in a change, changes to the wiki pages and the root documents do not need a spec.
- **Change types** are `chore`, `refactor`, `fix`, and `feat`. An `epic` only groups specs.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The commit type matches the change type.
- **Conventions** for this project are the writing style and script rules below.
- **Skills** define the objective, required context, expected outputs, and verification criteria. The model chooses the approach.
- **Scripts** do deterministic tasks. Skills do not repeat that logic in prose.
- **Shared core.** Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one AI coding tool. [Shared core](docs/wiki/intent.md#shared-core)

## Writing style

Use the terms in the [project glossary](docs/wiki/glossary.md).

All repository content is in English. Write for people and machines:

- Short sentences. One idea per sentence. Active voice. Simple words (ASD-STE100 style).
- Lists and tables instead of long paragraphs.
- Relative Markdown links. Cite sources for external facts.

## Scripts

Follow the [AIDDbot CLI](docs/wiki/aiddbot-cli.md) and [CLI development](docs/wiki/cli-development.md) pages:

- TypeScript on the latest stable Bun.
- Before you finish a script change, run `bun lint`, `bunx tsc --noEmit`, and `bun test`.
- Skills call the exact package version shipped with the skills: `bunx --bun --package <package>@<x.y.z> aiddbot <command>`.
