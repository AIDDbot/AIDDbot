<!--
Archetype-Blueprint: the technical part of one project (Columbus principles 7, 8, 11; D16, D19).
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Three levels fill this file. Each level fills the empty fields of the level before it. No level changes the structure.
  [Blueprint] This file. No technology.
  [Archetype] The AGENTS.md of the archetype repository.
  [Project] {project}/AGENTS.md in the system.
Keep the sections, their order and their headings. Remove these comments only at the project level.
For implementation examples by ecosystem, see ecosystems.md. They are guidance, not rules.
-->
# {Project_Name} — {project_type}

The project type is `{project_type}`. The permitted project types are `back-api`, `front-web`, `cli` and `e2e`.

Read this file before you change `{source_root}/`. This file has all of the technical data. Do not explore the code to learn the technical setup.

## 1 · Purpose and boundary

<!-- [Project] Principle 11. -->

{Why the project exists. What it owns. What it never does.}

## 2 · Technology

<!-- [Archetype] Principles 8, 11. -->

- **Language**: {language and version}
- **Runtime / framework**: {runtime and framework}
- **Main dependencies**: {library — role}
- **Package manager**: {one package manager only}

## 3 · Tooling

<!-- [Archetype] Commands and tools. [Project] Records them with `aidd config set`. D1, D12, D20, D26. -->

Each slot is a capability, not a tool. If a slot does not apply, write `n/a` and the reason. An empty slot is an error.

| Slot | Contract | Blocks delivery | Command | Tool |
| --- | --- | --- | --- | --- |
| `lint` | Exits with a non-zero code if it finds an error. Includes the strongest type check of the ecosystem. Includes the layer-boundary check. | Yes | `{command}` | {tool} |
| `format` | Rewrites the files with the standard formatter of the ecosystem. Runs before integration. Nothing checks its result. | No | `{command}` | {tool} |
| `upgrade` | Changes each dependency to its latest release, major releases included. Updates the lockfile. If a new major release breaks a different tool, keep the last compatible major release and write the reason in the technology rules. Runs at the foundation and when a person asks. Never runs for each delivery. | No | `{command}` | {tool} |
| `unit` | Runs one or more real tests. The foundation adds a smoke test of the `health` logic. | No | `{command}` | {tool} |
| `start` | Starts the project without a build. Reads `PORT`. Answers on the health route. | No | `{command}` | {tool} |
| `acceptance` | Runs the acceptance tests that have the tag `@S{nnnn}-R{nn}`. Sends to the test tool the arguments that the core adds (for example, `--grep @S0001-`). | Yes | `{command}` | {tool} |
| `quality` | Reports complexity and warnings against the thresholds of the general rules. Its findings go to the debt register. | No | `{command}` | {tool} |

## 4 · Architecture

<!-- [Blueprint] A fixed shape, not a named pattern. D2–D6, D12, D24, D38. The archetype only maps it to folders in section 5. -->

The project has one entry point and three folders. The suffix of a file name tells the layer of the file. There are no layer folders.

| Concept | Contents |
| --- | --- |
| `main` | The smallest entry point that the ecosystem requires. It only starts `core`. |
| `core` | The composition root: configuration, server or shell, router, and the dependencies that it makes. |
| features | One flat folder for each feature: endpoints, pages or commands. One **manifest** lists the registration of each feature. |
| `shared` | Helpers and code that more than one feature uses. It contains no business rules. Its files use the same layer suffixes as a feature. |

**Dependencies between folders.** The `lint` slot checks these rules. A violation blocks the delivery.

- `main` uses `core` only.
- `core` uses the manifest and `shared`. It never uses a feature directly.
- A feature uses `shared`. It uses a different feature only through the facade of that feature.
- `shared` uses nothing of the application.
- Only `main` uses `core`. Features and `shared` get their configuration by injection. Tests can start `core`.

**Layers.** The suffix of the file name tells the layer (see the variations by project type). The direction is `presentation` → `logic` → `data`. Never use the opposite direction.

- `presentation`: the input from the caller and the output to the caller (route, page, component, command).
- `logic`: rules and decisions. It does not know how the data is stored or found.
- `data`: all that the project reads or writes outside itself: database, remote API, files.
- Each file of a feature has a layer suffix. Exceptions: the facade, and the type files (suffix `types`) that all layers can use.
- In `shared`, a file with no layer suffix is a **primitive**. A primitive depends on nothing of the application. Each layer can use it.
- Do not make a subfolder for a layer. A feature is one flat folder. If a feature has too many files, divide it into two features.

- **Facade**: each feature has one entry file. This file contains only the registration for the manifest and the types that other features need. The registration gets the dependencies that `core` makes (configuration, connections) by injection.
- **Manifest**: one file in the features folder. It lists the registration of each feature explicitly. Do not use automatic discovery: no folder scans and no global decorators.
- If the manifest loads a feature on demand (for example, a page), no other import of that feature is permitted. A second, direct import puts the feature back in the first load. If a feature must also operate at startup, the manifest gives a startup entry that loads it on demand.
- If no applicable boundary linter exists, keep these rules here. Then `review-implementation` checks them.

### Variations by project type

<!-- [Blueprint] Principle 7. Each `n/a` has its reason. [Project] Keep only the column of this project type, and remove the other columns. -->

| Item | `back-api` | `front-web` | `cli` | `e2e` |
| --- | --- | --- | --- | --- |
| `main` | process entry | browser entry | executable entry | n/a — the test runner is the entry |
| `core` | server, configuration, router | application shell, configuration, router | argument parser, configuration | the life cycle of the suite: global setup and teardown, startup check of the projects, settings. No test uses it. |
| features | endpoints | pages | commands | tests: one folder for each feature of the system, with its API tests (`.api.spec`) and browser tests (`.web.spec`) |
| `presentation` suffixes | `.routes`, `.middleware` | `.page`, `.component` | `.command` | n/a — no layers |
| `logic` suffixes | `.service` | `.service`, `.store` | `.service` | n/a — tests contain no business logic |
| `data` suffixes | `.repository` (stored data), `.client` (other systems and files) | `.client` | `.repository`, `.client` | n/a — no layers |
| `shared` | middleware, validation, database and HTTP clients | base UI components, utilities, HTTP client | output format, utilities | `page-objects/` and `test-data/`; fixtures, API clients and the project startup at the root of `shared` |
| manifest | route registry | page router | command registry | n/a — the runner finds tests by convention |
| `unit` | yes | yes | yes | n/a — no logic of its own; acceptance is its product |
| `start` | yes | yes | n/a — runs for each invocation; no server | n/a — it starts the projects under test |
| `acceptance` | through `e2e` | through `e2e` | its own tests or through `e2e` | yes — it runs the suite |

**The `front-web` project.** Components put their content in the page (light DOM). Thus the global style sheet, form submission and label links reach them. Use an encapsulated tree (such as Shadow DOM) only if the archetype says so.

**The `e2e` project.** It has no layers, no manifest and no `main`. `core` uses `shared`. Tests use `shared`, never `core` and never a different feature. `shared` uses no `core` and no test. If a test calls a helper, the helper goes in `shared`. If only the runner uses it, it goes in `core`. In `shared`, only `page-objects/` and `test-data/` are subfolders. The suite runs in one browser engine (Chromium), unless the system asks for more.

## 5 · Folder structure

<!-- [Archetype] Map each concept of section 4 to a real folder or file, and to the framework mechanism for it. [Project] Adds features when specs ship. D27. -->

The column "Framework mechanism" tells how the framework makes each concept real (its injector, router, store or file convention). Write `—` if plain code does it.

| Concept | Path | Framework mechanism |
| --- | --- | --- |
| `main` | `{source_root}/{main_file}` | {mechanism} |
| `core` | `{source_root}/{core_folder}/` | {mechanism} |
| features | `{source_root}/{features_folder}/` | {mechanism} |
| manifest | `{source_root}/{features_folder}/{manifest_file}` | {mechanism} |
| feature facade | `{source_root}/{features_folder}/{feature}/{facade_file}` | {mechanism} |
| layer suffixes | `{presentation_suffixes}` / `{logic_suffixes}` / `{data_suffixes}` | {mechanism} |
| `shared` | `{source_root}/{shared_folder}/` | {mechanism} |
| unit tests | `{unit_test_location}` | {mechanism} |

```text
{source_root}/
├── {main_file}           # entry point; starts core
├── {core_folder}/        # composition root
├── {features_folder}/    # one folder for each feature, and the manifest
│   └── health/           # tracer bullet from the foundation specs; one flat folder
└── {shared_folder}/      # helpers and primitives; layer by suffix; no business rules
```

### Shared primitives

<!-- [Blueprint] Seed and naming convention. [Archetype] Paths and idiomatic names. [Project] `ship-spec` adds each new primitive. D29. -->

This table is the index of the helpers in `shared`. Read it before you write a check or a conversion. If two places use the same helper, move the helper to `shared` and add it here.

- Put one topic in each file. Use the topic as the file name.
- Write one function for each contract. Use what the function returns or checks as its name.
- If a check fails, raise the expected error of `monitoring`.

| Primitive | Contract | Path |
| --- | --- | --- |
| `parseInteger(value, min, max)` | Returns an integer in the range. Otherwise, raises an expected error. | `{shared_folder}/{numbers_file}` |
| `requireText(value, field)` | Returns the text without spaces at the ends. If the text is empty, raises an expected error with the field name. | `{shared_folder}/{text_file}` |
| `isRecord(value)` | Tells if the value is a key-value object. All other type guards use it. | `{shared_folder}/{types_file}` |
| {environment primitive} | {the row of this project type in the table below} | {path} |

<!-- [Project] Move the row of this project type to the table above, and remove this table. -->

| Project type | Environment primitive | Contract |
| --- | --- | --- |
| `back-api` | `readSetting(name, fallback, parse)` in `{shared_folder}/{settings_file}` | Returns the parsed environment variable, or its fallback. An invalid value stops the startup. |
| `front-web` | `escapeHtml(text)` in `{shared_folder}/{html_file}` | Returns text that is safe to put in a page. |
| `cli` | `fail(message)` in `{shared_folder}/{output_file}` | Writes `error: <message>` to standard error. Exits with code 1. |
| `e2e` | `uniqueValue(prefix)` in `{shared_folder}/test-data/{test_data_file}` | Returns a value that no other test run uses. |

## 6 · Coding rules

### General rules

<!-- [Blueprint] Technology-neutral guidance with default thresholds. The archetype can change the numbers. The `quality` slot measures them. They never block. D12. -->

- Use names that are idiomatic for the language. Use the words of the domain.
- Keep functions simple: cyclomatic complexity ≤ {10}, ≤ {40} lines, nesting ≤ {3}, ≤ {4} parameters. Keep files ≤ {300} lines.
- If a condition has more than one logical operator, move it to a predicate. Give the predicate a name from the domain.
- Before you write a check or a conversion, look for it in the shared primitives.
- Do not hide errors. Use one method only to handle errors in the project.
- Get configuration from the environment. Do not put configuration values in the code.
- If the store has a query language (such as SQL), put each statement in its own file with the extension of that language (such as `.sql`), next to the data file that uses it. Give the file a name from the domain. The code loads the file by name one time and does not write statements in code. Keep the schema definition (tables and migrations) in files in one location in `shared`.
- Anchor the ignore patterns for runtime data to the project root (`/data/`, not `data/`). Then they cannot hide a source folder.
- Add a dependency only with the add command of the package manager. That command gets the latest release. Do not write a version by hand or from memory.
- First make it work. Then make it correct. In a delivery, only `lint` (errors, types, boundaries) and acceptance block.

### Technology rules

<!-- [Archetype] Rules of the stack that the general rules do not cover. D27. -->

- If the framework sets a mechanism (dependency injection, routing, state, file names, CLI generators), use that mechanism and write the reason here. The direction of the dependencies never changes.
- {rule — reason}

### Project rules

<!-- [Project] `ship-spec` adds lessons from shipped specs. Empty at the start. -->

| Rule | Scope | Origin |
| --- | --- | --- |

## 7 · Connections

<!-- [Project] Principle 11. -->

- **Uses**: {sibling projects or external systems}
- **Used by**: {sibling projects or external systems}
- **Port**: `PORT` = {default}
- **Environment variables**: `{NAME}` — {purpose}
