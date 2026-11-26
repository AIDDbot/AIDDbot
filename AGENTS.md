# AIDDbot Agent Instructions

## Project status

AIDDbot is in the design stage. The repository holds its wiki, its plan, and its specs. Do not create code, templates, or skills unless the task asks for them.

For project knowledge, start at [`docs/wiki/index.md`](docs/wiki/index.md). The current milestone is in [ROADMAP.md](ROADMAP.md).

Read [the notepad](docs/NOTEPAD.txt) at the start of each work session. Update it before the session ends. [Session handoff rules](docs/wiki/documentation-catalog.md#session-handoff)

## Reference documents

Each topic has one reference document. Read it before you change that topic. Wiki pages follow the [page rules](docs/wiki/knowledge-wiki.md#page-rules).

| Topic | Reference document |
| --- | --- |
| Scope, lifecycle phases, building blocks, shared core, inclusion criteria | [intent](docs/wiki/intent.md) |
| Product milestones and outcomes | [ROADMAP.md](ROADMAP.md) |
| Development tasks, dogfooding rules, findings, future ideas | [docs/PLAN.md](docs/PLAN.md) |
| Change flow, spec, session handoff, document types, standards, metadata | [documentation catalog](docs/wiki/documentation-catalog.md) |
| Terms | [glossary](docs/wiki/glossary.md) |
| Wiki model, page rules, sources | [knowledge wiki](docs/wiki/knowledge-wiki.md) |
| CLI command form, script contract, candidate commands | [AIDDbot CLI](docs/wiki/aiddbot-cli.md) |
| Bun runtime, CLI development and packaging | [CLI development](docs/wiki/cli-development.md) |
| Knowledge explorer, wiki contract of the explorer tables | [explorer development](docs/wiki/explorer-development.md) |
| Folders, skill locations, what ships | [scaffolding](docs/wiki/scaffolding.md) |
| Colors, fonts, Mermaid diagrams | [DESIGN.md](DESIGN.md) |
| Notable changes | [CHANGELOG.md](CHANGELOG.md) |

When you change a rule:

1. Change it in its reference document.
2. Check the documents that the rule affects, and update them. Include the documents that apply the rule without a link to it.
3. Record the reason in the decisions table of the reference document, if it has one.

Git and `CHANGELOG.md` keep the history. Do not add change history sections to the documents.

## Way of working

- **Spec-first.** Create a spec only when a person requests one or approves your proposal to create one. If you think a spec is necessary, ask before you create the file or assign an ID. [Spec rules](docs/wiki/documentation-catalog.md#spec)
- **Small changes.** Make small changes directly. Record lasting decisions in the relevant project document. When the Git diff explains the change, the commit is enough. [Routine maintenance](docs/wiki/documentation-catalog.md#routine-maintenance)
- **Spec approval.** State the problem, solution, and verification requirements. For a `small` change, a person approves the spec in the pull request. For other changes, a person approves it before implementation. [Impact levels](docs/wiki/documentation-catalog.md#impact-levels) After approval, the spec changes only in its checkboxes and its `status` and `updated` fields. When the change closes, update the affected living documents.
- **Change types** are `chore`, `refactor`, `fix`, and `feat`. An `epic` only groups specs.
- **Impact levels** are `small`, `medium`, and `large`. They decide how much process a change needs.
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
- Before you finish a script change, run `bun lint`, `bunx tsc --noEmit`, and `bun test`. The same checks apply to the [knowledge explorer](docs/wiki/explorer-development.md) code in `packages/explorer/`.
- The explorer reads seven wiki tables. Keep their headings and columns, or update the explorer in the same change. [Wiki contract](docs/wiki/explorer-development.md#wiki-contract)
- Skills call the exact package version shipped with the skills: `bunx --bun --package <package>@<x.y.z> aiddbot <command>`.
