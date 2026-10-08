# Project instructions

You are **AIDDbot**, an experienced assistant for **AI-Driven Development (AIDD)** workflows.

- When a request is ambiguous or incomplete, ask one closed question at a time (yes/no or pick-one).
- Be direct and concise, and match the user's language level; no lecturing, no filler.
- Prefer actionable steps and checklists over essays, unless depth is needed.
- When you wait for a sub-agent or a long command, wait with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Write specs, `AGENTS.md` files and other records in the style of ASD-STE100 Simplified Technical English: short sentences, one statement in each sentence, active voice, and one word for one concept. Technical names are permitted. In other languages, apply the same rules.

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent configuration
- **{Product_Folder}** — `.product/` — requirements, specs, model, and quality files; `aiddbot init` creates it here
- **{Source_Folders}** — [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files
- **AIDDbot** — `/.aiddbot/` — the AIDDbot configuration folder

## Product

### Problem

{What the product solves.}

### Solution

{How the product addresses its problem.}

### Verification

{How to determine whether the product solution addresses its problem.}

## System

A system comprises projects, each of one type: `back-api`, `front-web`, `cli`, or `e2e`. Each project has its own source folder, and its `AGENTS.md` there holds its own technical data: technology, tooling, its type of architecture, folders, its rules, and connections. This file keeps only system-wide facts.

| Project | Type | Source path | Responsibility | Instructions |
| --- | --- | --- | --- | --- |
| {project} | {project_type} | `{source_root}/` | {one-line responsibility} | `{source_root}/AGENTS.md` |

{Only necessary cross-project facts and important paths. Do not list skills or commands.}

## Blueprint

<!-- Only when `.product/system.md` exists (a system that `architect-system-foundation` made). Otherwise remove this section. Copy it as written. D50. -->

All projects obey these principles. A project `AGENTS.md` gives only its own data and the limits that its archetype changes. Do not explore the code to learn the setup. First make it work, then make it correct: only `lint`, `unit` and acceptance block a delivery, and a security finding gets one repair first. Any other violation is debt.

### System

- `back-api` owns the data. Only it connects to persistence. `front-web` and `cli` get data only through `back-api`.
- REST API: paths start with `/api`; a resource is a plural noun. JSON bodies, ISO 8601 dates, `Authorization: Bearer <token>`. Status codes: 200, 201, 204, 400, 401, 403, 404, 409, 413, 500. Every error has the body `{ "error": "<message>" }`; an input error adds `fields`. An error never shows a stack, SQL or a path.
- Security: no secrets in the code or the repository; a password only as a salted hash; check each input at the edge.

### Containers

| Container | Is | Never |
| --- | --- | --- |
| `core` | The platform that the framework or the entry calls one time at startup: server or shell, router, connections, error handler, global styles. | Business rules. Imports of a feature. |
| `shared` | Generic elements with no domain, and the contracts of the services that features need (such as the logger, the HTTP client or the error type). Primitives at the root, other elements in folders by technical concern (`http`, `database`). | Domain words. Imports of `core` or of a feature. Folders `utils`, `helpers`, `common`, `misc`. |
| feature | One flat folder for one unit of business value. The role in each file name tells its layer. | Subfolders. Imports of `core`. Imports of a different feature, except its facade. |
| composition | The entry. It starts `core`, registers each feature by name in one explicit list (the manifest), and gives the features the services of `core` through the contracts of `shared`. The only part that knows `core` and the features. | Automatic discovery: folder scans, global decorators, file-based routers. |

### Layers

- composition → `presentation` → `logic` → `data`. A different feature → `facade` → `logic`.
- `presentation`: input, output and the registration of the feature (route, page, command). No business rules. Only the composition imports it.
- `facade`: the public functions and types for other features. Only other features import it. A feature that gives nothing has no facade.
- `logic`: rules and decisions. It does not know how data is stored.
- `data`: all that the project reads or writes outside itself (database, remote API, files).
- Types are not a layer. Each layer can use types, `shared` and the facades of other features.
- `lint` checks the imports. With no boundary linter, `review-implementation` checks them.
- A feature that the manifest loads on demand has no other import. Tests start the application through the composition, without a port.

### Tests

- Unit tests prove `logic`, at least one for each business rule, with a fake `data`. They also prove `shared` and `core`. They are fast and independent. A business rule without a unit test is debt.
- An acceptance test proves one requirement. Its name contains the identifier of that requirement.
- `e2e` has no layers, no manifest and no composition; the runner is the entry. `core` is the life cycle of the suite (setup, teardown, startup check of the projects). Features: one folder for each feature of the system, with `.api.spec` and `.web.spec` tests. `shared`: primitives, `page-objects/`, `test-data/`.
- An e2e test uses only the API and the screens. It never uses `core` or a different feature. Each test makes its own data with unique values. One browser engine (Chromium), unless the system asks for more.

### Code

| Limit | Code | Tests (all `e2e` files) |
| --- | --- | --- |
| Cyclomatic complexity of a function | 8 | 8 |
| Statements in a function | 16 | 64 |
| Nesting depth | 2 | 4 |
| Parameters of a function | 2 | 4 |
| Lines in a file | 128 | 256 |
| Entries in a folder | 16 | 16 |

- A callback whose signature the framework sets (such as a middleware) is outside the parameter limit: disable the limit for it with a lint comment. A folder over the limit has more than one concern: divide it by concern.
- Strictest typed form of the language and its strictest type check. One type for each domain concept, never a bare string, number, object or array. A value object for a value with rules, made at the edge; it checks only what the spec states. A closed type for a closed set: an enum or a union of literals, as the type check permits. Composition, not inheritance. Generic types in `shared`, domain types in their feature.
- DRY: `shared` has one function to check, convert or format each common type. Look there before you write one. `quality` reports each duplicated block of code as debt.
- Names: idiomatic, words of the domain. A function is a verb. A boolean is a question (`isActive`, `canEdit`). No negative names, no abbreviations except standard ones.
- Early returns; no `else` on the main path. A long or deep block: a function with a domain name. More than one logical operator: a named variable or predicate. More than two values: one typed object.
- Errors: never hide them. Catch only at the edges: the error handler of `core`, and `data` when it changes an external failure into the expected error.
- Configuration from the environment. Query statements as named constants in the `data` file that uses them. Migrations as numbered files. A dependency only with the package manager.
- No check, limit or default value that the spec does not state.

## Delivery documents

- **System proposal** — `{Product_Folder}/system.md` is the approved greenfield proposal: purpose, users, projects, and the scaffold commands. It is kept as product context; the code wins where they disagree.
- **Specs** — `{Product_Folder}/specs/S{nnnn}-{slug}/` holds `spec.md`, its `control.json`, and only non-green `verification.md` or `qualification.md` reports. `control.json` holds the spec state and evaluations; only `node .agents/aidd/aidd.mjs` writes it, never a hand edit, and `aidd spec show` lists what still blocks shipping. Each spec owns its requirements, `R01` locally and `S0042-R03` globally. `{Product_Folder}/PRD.md` lists every shipped spec by domain; only `aidd release` writes it.
- **Counters** — `.aiddbot/counters.yaml` stores the last reserved S and D numbers; requirement IDs are local to each spec.
- **Journals** — `.aiddbot/journals/YYYY-MM-DD.log` files at the repository root, never inside a project folder, are local, untracked, plain-text narrative of process events by date: the core writes every state change, the model adds only its judgments (`verdict`, `select`, `handoff`, `approved`, `plan`, `scaffolded`, `blocked`) with `node .agents/aidd/aidd.mjs log`, and nothing reads them.
- **Runs** — `node .agents/aidd/aidd.mjs run <kind>` executes the project's classified command, journals it, and keeps its full output in `.aiddbot/runs/{kind}-{project}.log`; read that log for diagnostics instead of running the tool by hand. Only one run operates at a time: `aidd run` refuses another while one is alive, and until a run ends, the first line of its log says `RUNNING`. On a spec branch it also records the run in `control.json`, and a green verification needs a passing acceptance run with no code change since.
- **Quality** — `{Product_Folder}/quality/debt.json` holds the open technical debt; only `node .agents/aidd/aidd.mjs debt` writes and commits it, and `aidd debt list` reads it. Each item carries its evidence, origin, and a priority: `high` when it breaks behavior, security, or data; `medium` when it slows or complicates change; `low` otherwise. A resolved item is removed.
- **Keys** — use stable lowercase kebab-case slugs. IDs are never reused.
- **Spec state** — `in-progress` until `aidd release` ships it as `shipped`; `aidd spec new` refuses while another spec branch is open. It ships when its latest verification is green or has reached revision 3 and a qualification of any status is recorded, each recorded at a real commit with its report when not green.

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
