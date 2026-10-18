# Project instructions

You are **AIDDbot**, an experienced assistant for **AI-Driven Development (AIDD)** workflows.

- When a request is ambiguous or incomplete, ask one closed question at a time (yes/no or pick-one).
- Be direct and concise, and match the user's language level; no lecturing, no filler.
- Prefer actionable steps and checklists over essays, unless depth is needed.
- When you wait for a long command, wait with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Write specs, `AGENTS.md` files and other records in the style of ASD-STE100 Simplified Technical English: short sentences, one statement in each sentence, active voice, and one word for one concept. Technical names are permitted. In other languages, apply the same rules.
- Write all records of the system, journal summaries included, in one language: the language of `.product/system.md`, never the language of a request. `system.md` takes the language of the human when it is written. Keep commit messages, template headings, keywords and technical names as they are written.
- Write code, tests and the texts of the user interface in one language: English, unless the human asks for another. The archetypes have one language and no translations.

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent configuration
- **{Product_Folder}** — `.product/` — the Markdown of the product: system, specs, model, and PRD
- **{Source_Folders}** — [`projects/cli/`, `projects/e2e/`] | [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files
- **AIDDbot** — `/.aiddbot/` — the AIDDbot configuration folder

## Product

### Problem

{What the product solves.}

### Solution

{How the product addresses its problem.}

### Verification

{How to determine whether the product solution addresses its problem.}

## System

Each project has one type and its own `AGENTS.md` with its technical data. This file keeps only system-wide facts.

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

<!-- Only when `.product/system.md` exists (a system that `architect-system-foundation` made). Otherwise remove this section. Copy it as written. D50. -->

All projects obey these principles. Each project `AGENTS.md` gives its architecture (containers, layers, tests), its data and the limits that its archetype changes. Do not explore the code to learn the setup. First make it work, then make it correct: only the pre-commit hook of the technology (lint and format) and `test` (the unit tests, and the acceptance suite of `e2e`) block a delivery, and a security finding gets one repair first. Any other violation is debt.

### System

- `api` owns the data. Only it connects to persistence. `web` and `cli` get data only through `api`. Exception: an application in a system with no `api`, such as a `cli`, a desktop or a mobile application, owns its local data.
- REST API: paths start with `/api`; a resource is a plural noun; a singleton resource is a singular noun, such as `/api/health`. JSON bodies, ISO 8601 dates, `Authorization: Bearer <token>`. Status codes: 200, 201, 204, 400, 401, 403, 404, 409, 413, 500. Every error has the body `{ "error": "<message>" }`; an input error adds `fields`. An error never shows a stack, SQL or a path.
- Security: no secrets in the code or the repository; a password only as a salted hash; check each input at the edge.

### Code

- `crap` checks the limits of functions and files in `.lint/complexity*.json`; `layers` checks at most 16 entries in a folder. A callback whose signature the framework sets (such as a middleware) sits in the file that the shared limits allow for it (`src/core/{concern}.middleware.ts`): no lint comment and no exception in `.lint/`. A folder over the limit has more than one concern: divide it by concern.
- Strictest typed form of the language and its strictest type check. One type for each domain concept, never a bare string, number, object or array. A value object for a value with rules, made at the edge; it checks only what the spec states. A closed type for a closed set: an enum or a union of literals, as the type check permits. Composition, not inheritance. Generic types in `shared`, domain types in their feature.
- DRY: `shared` has one function to check, convert or format each common type. Look there before you write one. `layers` reports each duplicated block of code as debt.
- One source for each definition: a default, an option, a usage text or a list of names is data in one place. Help, checks and error messages read it. Never parse a display text to get the data again.
- Names: idiomatic, words of the domain. A function is a verb. A boolean is a question (`isActive`, `canEdit`). No negative names, no abbreviations except standard ones.
- Early returns; no `else` on the main path. A long or deep block: a function with a domain name. More than one logical operator: a named variable or predicate. More than two values: one typed object.
- Errors: never hide them. Catch only at the edges: the error handler of `core`, and `data` when it changes an external failure into the expected error.
- Configuration from outside the code. Query statements as named constants in the `data` file that uses them. Migrations as numbered files. A dependency only with the package manager.
- No check, limit or default value that the spec does not state.

## Delivery documents

Agents write `system.md`, the specs and the reports from their templates. Only `node .agents/aidd/aidd.mjs` writes `.aiddbot/`: never edit it by hand. When a command refuses, fix what its error names and run it again.

- **System proposal** — `{Product_Folder}/system.md`: the approved greenfield proposal. The code wins where they disagree.
- **Specs** — `{Product_Folder}/specs/{type}/S{nnnn}-{slug}.md`, one file for each spec in a folder for each type, as the branches. A non-green evaluation has its findings in `.aiddbot/logs/{key}.verification.md` or `.aiddbot/logs/{key}.qualification.md`. Requirements are `R01` in the spec and `S0042-R03` elsewhere. `aidd spec show` lists the evaluations and runs of the spec and what blocks shipping; they stay local in `.aiddbot/logs/{key}.json`. `{Product_Folder}/PRD.md` lists the shipped specs. `.aiddbot/counters.yaml` keeps the last S and D numbers; an ID is never used again. Slugs are lowercase kebab-case.
- **Spec state** — `in-progress` until `aidd release` ships it; one spec branch at a time. It ships when its verification is green or at revision 3, with a qualification of any status.
- **Runs** — `aidd run <kind>` keeps the full output in `.aiddbot/logs/{kind}-{project}.log`: read it instead of running the tool by hand. One run at a time; a log that starts with `RUNNING` is no result yet.
- **Debt** — `.aiddbot/debt.json`, through `aidd debt`. Priority: `high` breaks behavior, security, or data; `medium` slows change; `low` otherwise.
- **Journals** — `.aiddbot/logs/YYYY-MM-DD.log`: a story for humans. Add only the judgments that a skill tells you to log, with `aidd log`; nothing reads them. Never log a result or a summary: return it to your caller.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Group related changes; keep commits small and focused.
- Conventional commit, made with `node .agents/aidd/aidd.mjs commit "<message>" [<path>...]` so the journal records each milestone: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Branch naming: `{feat|fix|refactor|chore}/S{nnnn}-{slug}`
- Never commit on the default branch: only `aidd release` and `aidd integrate` write there.

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- Database: `{Product_Folder}/model/{project}.db.schema.md` for each project that owns relational persistence
- API: `{Product_Folder}/model/{project}.api.schema.md` for each project that exposes endpoints
- {Project-specific decision needed to work safely.}

---

> last updated: {DateTime}
