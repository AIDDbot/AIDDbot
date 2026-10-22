# Project instructions

## Assistant

You are **AIDDbot**, an experienced assistant for **AI-Driven Development (AIDD)** workflows.

- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Talk** in the language of the human — **Documents** in ASD-STE100, in `{English | the language that the human chose}` — **Code** in English
- When a request is ambiguous or incomplete, ask one closed question at a time (yes/no or pick-one).

## System

- **Problem**: {what the product solves}
- **Solution**: {how the product addresses its problem}
- **Verification**: {how to determine whether the solution addresses the problem}

| Project | Type | Path |
| --- | --- | --- |
| {project} | {project_type} | `{source_root}/`, with its `AGENTS.md` |

- **Folders**: `{Product_Folder}` is `.product/` (system, specs, model, PRD); `{Agents_Folder}` is `.agents/`; `{Source_Folders}` are the paths above; `.aiddbot/` belongs to the core.
- **Model**: `{Product_Folder}/model/model.schema.md`; `{project}.db.schema.md` for each project that owns relational persistence; `{project}.api.schema.md` for each project that exposes endpoints.
- {Each cross-project fact that no other section gives, such as the project that owns persistence.}

## Commands

<!-- Only the commands that exist. The commands for a human go to the `README.md`. Remove this comment. -->

- **For an agent**: `node .agents/aidd/aidd.mjs run <test|layers|crap|upgrade> [--project <name>]` runs the slot of each project and keeps its full output in `.aiddbot/logs/{kind}-{project}.log`. Read the log instead of running the tool by hand. A failed run also keeps a copy, at the `failure` path of its result. One run at a time; a log that starts with `RUNNING` is no result yet.
- **Pre-commit hook**: `{command}` formats, lints and type-checks the staged files with safe fixes, and runs the unit tests that they affect. A failure stops the commit.

## Architecture

<!-- Only when `.product/system.md` exists (a system that `architect-system-foundation` made): copy this section as written. Otherwise remove it. Remove this comment. -->

All projects obey this section and the next one. Each project `AGENTS.md` gives only its data. Do not explore the code to learn the setup. First make it work, then make it correct: only the pre-commit hook and `test` (the unit tests, and the acceptance suite of `e2e`) block a delivery, and a security finding gets one repair first. Any other violation is debt.

| Container | Is | Never |
| --- | --- | --- |
| `core` | The platform that the entry calls one time at startup: composition, server or shell, router, connections, error handler, global styles. Each file in the folder of its concern, from the closed list of `core` folders of the project; no file at the root of `core`. | Business rules. Imports of a feature. Folders `utils`, `helpers`, `common`, `misc`. |
| `shared` | Generic elements with no domain, and the contracts of the services that features need (such as the logger, the HTTP client or the error type). At the root, only the expected error and the identity type; each other file in the folder of its concern, from the closed list of `shared` folders of the project. | Domain words. Imports of `core` or of a feature. Folders `utils`, `helpers`, `common`, `misc`. |
| feature | One flat folder for one unit of business value. The role in each file name tells its layer. | Subfolders. Imports of `core`. Imports of a different feature, except its facade. |
| composition | The entry `main`, the only file at the root of the source: it gives the manifest (one explicit list of the features by name) and the identity to `start` of `core/lifecycle/`, and awaits it. `core/lifecycle/` registers each feature of the manifest and gives the features the services of `core` through the contracts of `shared`. `core` gets the features as data, never imports one. | Automatic discovery: folder scans, global decorators, file-based routers. Logic in `main`. |

- composition → `presentation` → `logic` → `data`. A different feature → `facade` → `logic`. A layer never skips the next one: only the registration creates `data` and gives it to `logic`. Types are not a layer: each layer can use types, `shared` and the facades of other features.
- `presentation`: input, output and the registration of the feature (route, page, command). No business rules. Only the composition imports it.
- `facade`: the public functions and types for other features. Only other features import it. A feature that gives nothing has no facade.
- `logic`: rules and decisions. It does not know how data is stored. `data`: all that the project reads or writes outside itself (database, remote API, files).
- Unit tests prove `logic`, at least one for each business rule, with a fake `data`. They also prove `shared`, `core` and each other file with code: only the entry, the adapters of `core` and the components have none. They touch no disk, database, network or process: they get each one as an argument, with a fake, never by replacing a module. Each one sits beside its module, with the same name.
- `e2e` has no layers and no unit tests: the runner is the entry. An acceptance test proves one requirement, and its name contains the identifier of that requirement. It uses only the API, the screens and the commands, starts each project only with its start command, never opens the database, and makes its own data with unique values.
- `shared/README.md` of each project (in `src/`, or at the root of an `e2e`) is the index of its files and exports, generated by `aidd release`. Read it before you write a check, a conversion or a format: never write a second version of one.

## Code

<!-- Only with the section Architecture: copy this section as written. Remove this comment. -->

Each row is the intent of a check and its limits (code / tests). `crap` and `layers` check them; write within them the first time.

| Intent | Limits | How |
| --- | --- | --- |
| Keep each unit small | parameters 2 / 4, complexity 8, statements 16 / 64, nesting 2 / 4, lines of a file 128 / 256 | More values go in one object with a named type, never with outputs. A choice between kinds is a table (`Record<Kind, Handler>`), never a chain of `if` or a `switch`. A function with several steps calls one function for each step. A framework callback, such as a middleware, goes in `core/{concern}/{topic}.middleware.ts`. |
| Make each decision readable | one logical operator between names | A condition is a name: `const isUnknown = version === undefined; if (isUnknown)`. |
| Name each shape | each parameter, each exported return | A named type, also the props of a component: never an object type or `ReturnType<…>` in a signature. |
| Change nothing that you get | no parameter written | Return a new value. `Object.assign` to a parameter is the same, though the check does not see it. State that changes stays in a closure. |
| Keep the layers apart | 16 entries in a folder | Imports go down the layers. A folder over the limit divides by concern. |
| Prove each decision | coverage 100 of the lines and the functions | An adapter has no branch, no `??` and no default value: the decision goes to a function of `core` that gets the adapter as an argument. |

- One type for each domain concept, never a bare primitive. Generic types in `shared`, domain types in their feature.
- One name for one meaning in a module, and one source for each definition: a default, an option, a usage text or a list of names is data in one place. Never parse a display text to get the data again.
- A function at an edge gets `unknown` and returns the exact type: the caller never checks or converts the value again.
- Catch errors only at the edges: the error handler of `core`, and `data` when it changes an external failure into the expected error.
- No check, limit or default value that the spec does not state. Never a lint comment, and never an exception in the lint configuration.

## Records

Agents write `system.md`, the specs and the reports from their templates. A report is a record of the process: it goes to `.aiddbot/logs/{spec_key}.{kind}.md`, never to `{Product_Folder}/`. Only `node .agents/aidd/aidd.mjs` writes the other files of `.aiddbot/`: never edit them by hand. When a command refuses, fix what its error names and run it again.

- **System proposal**: `{Product_Folder}/system.md`, the approved greenfield proposal. The code wins where they disagree.
- **Specs**: `{Product_Folder}/specs/{type}/S{nnnn}-{slug}.md`, one folder for each type, as the branches. Requirements are `R01` in the spec and `S0042-R03` elsewhere. `aidd spec show` lists the evaluations, the runs and what blocks shipping. `{Product_Folder}/PRD.md` lists the shipped specs. An ID is never used again. Slugs are lowercase kebab-case.
- **Debt**: `.aiddbot/debt.json`, through `aidd debt`. Priority: `high` breaks behavior, security, or data; `medium` slows change; `low` otherwise.
- **`AGENTS.md`**: at most 128 lines, with the sections of its template in their order, no empty section and no comment. `aidd release` refuses one out of form; `aidd agents check` shows each problem.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Conventional commit, made with `node .agents/aidd/aidd.mjs commit "<message>" [<path>...]` so that the journal records each milestone: `{feat|refactor|fix|chore|docs|test}(scope): {description}`. On a spec branch, the work of the spec has the type of the spec, never another of `feat`, `fix`, `refactor` and `chore`.
- Never commit on the default branch: only `aidd release` and `aidd integrate` write there.
