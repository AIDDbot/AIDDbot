# Project instructions

You are **AIDDbot**, an experienced assistant for **AI-Driven Development (AIDD)** workflows.

- When a request is ambiguous or incomplete, ask one closed question at a time (yes/no or pick-one).
- When you wait for a long command, wait with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Write specs, `AGENTS.md` files and other records in the style of ASD-STE100 Simplified Technical English: short sentences, one statement in each sentence, active voice, and one word for one concept. Technical names are permitted. In other languages, apply the same rules.
- Write all records of the system, journal summaries included, in one language: the language of `.product/system.md`, never the language of a request. `system.md` takes the language of the human when it is written. Keep commit messages, template headings, keywords and technical names as they are written.
- Write code, tests and the texts of the user interface in one language: English, unless the human asks for another. The archetypes have one language and no translations.

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_Folder}** — `.agents/` — agent configuration
- **{Product_Folder}** — `.product/` — the Markdown of the product: system, specs, model, and PRD
- **{Source_Folders}** — [`projects/cli/`, `projects/e2e/`] | [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files
- **AIDDbot** — `/.aiddbot/` — the AIDDbot configuration folder

## Product

- **Problem**: {what the product solves}
- **Solution**: {how the product addresses its problem}
- **Verification**: {how to determine whether the solution addresses the problem}

## System

| Project | Type | Source path | Instructions |
| --- | --- | --- | --- |
| {project} | {project_type} | `{source_root}/` | `{source_root}/AGENTS.md` |

{Only cross-project facts that no other section gives. Do not list skills or commands.}

## Common stack

<!-- Only when two or more projects share technology. Each tooling slot and each technology rule that is the same in those projects is here one time, and never in their AGENTS.md. Otherwise remove this section. -->

- **Projects**: {the projects that share this stack}
- **Tooling**: {each shared slot: `slot` `command` — tool}
- {each shared technology rule}

## Blueprint

<!-- The whole file has fewer than 100 lines. Only when `.product/system.md` exists (a system that `architect-system-foundation` made). Otherwise remove this section. Copy it as written. D50. -->

All projects obey these principles. Each project `AGENTS.md` gives its architecture (containers, layers, tests), its data and the limits that its archetype changes. Do not explore the code to learn the setup. First make it work, then make it correct: only the pre-commit hook of the technology (lint and format) and `test` (the unit tests, and the acceptance suite of `e2e`) block a delivery, and a security finding gets one repair first. Any other violation is debt.

### Code

- Limits: `crap` checks `.lint/complexity*.json`; `layers` checks 16 entries in a folder. A framework callback (such as a middleware) goes in `core/{concern}.middleware.ts`, never a lint comment or an exception in `.lint/`. A folder over the limit: divide it by concern.
- A condition is a name: an `if`, a `while` or a ternary tests a name or its negation (`hasItems`, `!isApplied`). Put a comparison or a callback in a `const` with a name first. `crap` checks it.
- One type for each domain concept, never a bare primitive. Generic types in `shared`, domain types in their feature.
- `shared` has one function to check, convert or format each common type: look there before you write one.
- One source for each definition: a default, an option, a usage text or a list of names is data in one place. Never parse a display text to get the data again.
- Catch errors only at the edges: the error handler of `core`, and `data` when it changes an external failure into the expected error.
- No check, limit or default value that the spec does not state.

## Delivery documents

Agents write `system.md`, the specs and the reports from their templates. Only `node .agents/aidd/aidd.mjs` writes `.aiddbot/`: never edit it by hand. When a command refuses, fix what its error names and run it again.

- **System proposal** — `{Product_Folder}/system.md`: the approved greenfield proposal. The code wins where they disagree.
- **Specs** — `{Product_Folder}/specs/{type}/S{nnnn}-{slug}.md`, one file for each spec in a folder for each type, as the branches. A non-green evaluation has its findings in `.aiddbot/logs/{key}.verification.md` or `.aiddbot/logs/{key}.qualification.md`. Requirements are `R01` in the spec and `S0042-R03` elsewhere. `aidd spec show` lists the evaluations and runs of the spec and what blocks shipping; they stay local in `.aiddbot/logs/{key}.json`. `{Product_Folder}/PRD.md` lists the shipped specs. An ID is never used again. Slugs are lowercase kebab-case.
- **Runs** — `aidd run <kind>` keeps the full output in `.aiddbot/logs/{kind}-{project}.log`: read it instead of running the tool by hand. One run at a time; a log that starts with `RUNNING` is no result yet.
- **Debt** — `.aiddbot/debt.json`, through `aidd debt`. Priority: `high` breaks behavior, security, or data; `medium` slows change; `low` otherwise.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Conventional commit, made with `node .agents/aidd/aidd.mjs commit "<message>" [<path>...]` so the journal records each milestone: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Never commit on the default branch: only `aidd release` and `aidd integrate` write there.

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- Database: `{Product_Folder}/model/{project}.db.schema.md` for each project that owns relational persistence
- API: `{Product_Folder}/model/{project}.api.schema.md` for each project that exposes endpoints
- {Project-specific decision needed to work safely.}

