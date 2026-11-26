# AIDDbot Agent Instructions

## Project status

AIDDbot is in the design stage. The repository holds its wiki, its roadmap, and its specs. Do not create code, templates, or skills unless the task asks for them.

For project knowledge, start at [`docs/wiki/index.md`](docs/wiki/index.md). The current milestone is in [ROADMAP.md](ROADMAP.md).

Read [the notepad](docs/process/NOTEPAD.txt) at the start of each work session. Update it before the session ends. [Session handoff rules](docs/process/documentation-catalog.md#session-handoff)

At the end of the session, write the [journal entry](docs/process/documentation-catalog.md#session-journal) after the other commits. Search the journal when you need context about a past change.

## Reference documents

Each topic has one original reference document in the project brain. Read it before you change that topic. Only agents write the wiki map and summaries, using the [page rules](docs/process/knowledge-wiki.md#page-rules).

| Topic | Reference document |
| --- | --- |
| Scope, lifecycle phases, building blocks, shared core, inclusion criteria | [intent](docs/product/intent.md) |
| Product milestones, outcomes, tasks, and future ideas | [ROADMAP.md](ROADMAP.md) |
| Dogfooding rules, how to use the roadmap, findings | [dogfooding](docs/process/dogfooding.md) |
| Change flow, spec, session handoff, journal, document types, standards, metadata | [documentation catalog](docs/process/documentation-catalog.md) |
| Terms | [glossary](docs/product/glossary.md) |
| Wiki model, page rules, sources | [knowledge wiki](docs/process/knowledge-wiki.md) |
| CLI command form, script contract, candidate commands | [AIDDbot CLI](docs/process/aiddbot-cli.md) |
| Bun runtime, CLI development and packaging | [CLI development](docs/technology/cli-development.md) |
| Knowledge explorer, brain contract of the explorer tables | [explorer development](docs/technology/explorer-development.md) |
| Folders, skill locations, what ships | [scaffolding](docs/technology/scaffolding.md) |
| Colors, fonts, Mermaid diagrams | [DESIGN.md](DESIGN.md) |
| Notable changes | [CHANGELOG.md](CHANGELOG.md) |

When you change a rule:

1. Change it in its reference document.
2. Check the documents that the rule affects, and update them. Include the documents that apply the rule without a link to it.
3. Record the reason in the decisions table of the reference document, if it has one.

Git and `CHANGELOG.md` keep the history. Do not add change history sections to the documents.

## Way of working

- **Spec-first.** Create a spec only when a person requests one or approves your proposal to create one. If you think a spec is necessary, ask before you create the file or assign an ID. [Spec rules](docs/process/documentation-catalog.md#spec)
- **Small changes.** Make small changes directly. Record lasting decisions in the relevant project document. When the Git diff explains the change, the commit is enough. [Routine maintenance](docs/process/documentation-catalog.md#routine-maintenance)
- **Spec approval.** State the problem, solution, and verification requirements. For a `small` change, a person approves the spec in the pull request. For other changes, a person approves it before implementation. [Impact levels](docs/process/documentation-catalog.md#impact-levels) After approval, the spec changes only in its checkboxes and its `status` and `updated` fields. When the change closes, update the affected living documents.
- **Change types** are `chore`, `refactor`, `fix`, and `feat`. An `epic` only groups specs.
- **Impact levels** are `small`, `medium`, and `large`. They decide how much process a change needs.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The commit type matches the change type.
- **Conventions** for this project are the writing style and script rules below.
- **Skills** define the objective, required context, expected outputs, and verification criteria. The model chooses the approach.
- **Scripts** do deterministic tasks. Skills do not repeat that logic in prose.
- **Shared core.** Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one AI coding tool. [Shared core](docs/product/intent.md#shared-core)

## Writing style

Use the terms in the [project glossary](docs/product/glossary.md).

All repository content is in English. Write for people and machines:

- Short sentences. One idea per sentence. Active voice. Simple words (ASD-STE100 style).
- Lists and tables instead of long paragraphs.
- Relative Markdown links. Cite sources for external facts.

## Scripts

Follow the [AIDDbot CLI](docs/process/aiddbot-cli.md) and [CLI development](docs/technology/cli-development.md) pages:

- TypeScript on the latest stable Bun.
- Before you finish a script change, run `bunx tsc --noEmit` and `bun test`. The same checks apply to the [knowledge explorer](docs/technology/explorer-development.md) code in `packages/explorer/`. No linter runs until Bun ships one. [CLI development](docs/technology/cli-development.md)
- The explorer reads seven tables from the project brain. Keep their headings and columns, or update the explorer in the same change. [Brain contract](docs/technology/explorer-development.md#brain-contract)
- Skills call the exact package version shipped with the skills: `bunx --bun --package <package>@<x.y.z> aiddbot <command>`.
