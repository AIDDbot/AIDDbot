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

<!-- [Blueprint] A fixed shape, not a named pattern. D2–D6, D12, D24, D39. Human guide: docs/architect-system-foundation.md. The archetype only maps it to folders in section 5. -->

The project has one composition root and three folders. Each feature has three layers.

| Concept | Contents |
| --- | --- |
| `main` | The composition root. It exports `createApp()`. This function makes the services of `core`, gets the features from the manifest and connects them. The entry file only calls `createApp()` and starts the process. |
| `core` | The platform services: configuration, logger, connections, server or shell, router. It contains no business rules. |
| features | One subfolder for each feature: endpoints, pages or commands. One **manifest** lists the registration of each feature. |
| `shared` | Generic elements with no domain, in folders by type: types, primitives, validation, utilities. It contains no business rules. |

**Fixed rules.** The `lint` slot checks these rules. A violation blocks the delivery.

1. `main` is the only part that knows all of the features. It gets them only through the manifest.
2. `core` never uses a feature or the manifest. `main` gives data to `core`: routes, menu links, commands.
3. A feature uses a different feature only through the facade of that feature.
4. `shared` uses no part of the application.
5. `core` contains no business rules.

**Access to `core`.** The archetype selects one method and writes it in the technology rules:

- **Injection**: `main` gives the services of `core` to each feature when it registers the feature. Or the injector of the framework gives them.
- **Direct import**: a feature imports the public file of `core`. It never imports a different file of `core`.

Tests start the application with `createApp()`. They do not open a port.

**Dependencies inside a feature.** The direction is `presentation` → `logic` → `data`. Never use the opposite direction.

- `presentation`: the input from the caller and the output to the caller (route, page, command).
- `logic`: rules and decisions. It does not know how the data is stored or found.
- `data`: all that the project reads or writes outside itself: database, remote API, files.
- The types of a feature have no layer. Each layer of the feature can use them.

**`shared`.** Its internal dependencies are free.

- Put a generic element with no domain in `shared` (a type, a check, a conversion, a utility, a test helper), also when only one part uses it now.
- Keep an element with business rules or domain words in its feature. When a second feature needs it, expose it through the facade. Never move it to `shared`.
- Put an element in `shared` when `core` and the features both use it. An example is the error type of the application.
- If a folder has more than approximately {16} files, divide it by topic. The `quality` slot records this as debt.

**The `e2e` project.** It has no layers, no manifest and no `main`. `core` uses `shared`. Tests use `shared`, never `core` and never a different feature. `shared` uses no `core` and no test. If a test calls a helper, the helper goes in `shared`. If only the runner uses it, it goes in `core`. In `shared`, only `page-objects/` and `test-data/` are subfolders. The suite runs in one browser engine (Chromium), unless the system asks for more.

**Facade and manifest.**

- **Facade**: each feature has one public file. This file contains only the registration for the manifest and the types that other features need. The registration gets the services of `core` by the access method of the archetype.
- **Manifest**: one file in the features folder. It lists the registration of each feature explicitly. Do not use automatic discovery: no folder scans and no global decorators.
- If the manifest loads a feature on demand (for example, a page), no other import of that feature is permitted. A second, direct import puts the feature back in the first load. If a feature must also operate at startup, the manifest gives a startup entry that loads it on demand.
- If no applicable boundary linter exists, keep these rules here. Then `review-implementation` checks them.

### Variations by project type

<!-- [Blueprint] Principle 7. Each `n/a` has its reason. [Project] Keep only the column of this project type, and remove the other columns. -->

| Item | `back-api` | `front-web` | `cli` | `e2e` |
| --- | --- | --- | --- | --- |
| `main` | `createApp()` and the process entry | `createApp()` and the browser entry | `createApp()` and the executable entry | n/a — the test runner is the entry |
| `core` | server, configuration, logger, connections, error handler | shell, layout, router, theme, configuration | argument parser, configuration, output | the life cycle of the suite: global setup and teardown, startup check of the projects, settings. No test uses it. |
| features | endpoints | pages | commands | tests: one folder for each feature of the system, with its API tests (`.api.spec`) and browser tests (`.web.spec`) |
| `presentation` | route / controller | page / component | command | n/a — no layers |
| `logic` | service | store / use case | service | n/a — tests contain no business logic |
| `data` | repository | API client | repository / file system | n/a — no layers |
| `shared` | types, validation, utilities | types, base UI components, utilities | types, output format, utilities | `page-objects/` and `test-data/`; fixtures, API clients and the project startup at the root of `shared` |
| manifest | route registry | page and menu registry | command registry | n/a — the runner finds tests by convention |
| `unit` | yes | yes | yes | n/a — no logic of its own; acceptance is its product |
| `start` | yes | yes | n/a — runs for each invocation; no server | n/a — it starts the projects under test |
| `acceptance` | through `e2e` | through `e2e` | its own tests or through `e2e` | yes — it runs the suite |

## 5 · Folder structure

<!-- [Archetype] Map each concept of section 4 to a real folder or file, and to the framework mechanism for it. [Project] Adds features when specs ship. D27. -->

The column "Framework mechanism" tells how the framework makes each concept real (its injector, router, store or file convention). Write `—` if plain code does it.

| Concept | Path | Framework mechanism |
| --- | --- | --- |
| `main` | `{source_root}/{main_file}`, `{source_root}/{compose_file}` | {mechanism} |
| `core` | `{source_root}/{core_folder}/` | {mechanism} |
| public file of `core` | `{source_root}/{core_folder}/{core_public_file}`, or `n/a` with injection | {mechanism} |
| features | `{source_root}/{features_folder}/` | {mechanism} |
| manifest | `{source_root}/{features_folder}/{manifest_file}` | {mechanism} |
| feature facade | `{source_root}/{features_folder}/{feature}/{facade_file}` | {mechanism} |
| `presentation` / `logic` / `data` | `{feature}/{presentation_files}`, `{feature}/{logic_files}`, `{feature}/{data_files}` | {mechanism} |
| `shared` | `{source_root}/{shared_folder}/{type_folder}/` | {mechanism} |
| unit tests | `{unit_test_location}` | {mechanism} |

```text
{source_root}/
├── {main_file}           # entry: calls createApp() and starts
├── {compose_file}        # createApp(): composition root
├── {core_folder}/        # platform services; no business rules
├── {features_folder}/    # one folder for each feature, and the manifest
│   └── health/           # tracer bullet from the foundation specs
└── {shared_folder}/      # shared elements by type; no business rules
```

### Shared primitives

<!-- [Blueprint] Seed and naming convention. [Archetype] Paths and idiomatic names. [Project] `ship-spec` adds each new primitive. D29. -->

This table is the index of the elements in `shared`. Read it before you write a check or a conversion. If two places use the same element, move it to `shared` and add it here.

- Put one topic in each file. Use the topic as the file name.
- Write one function for each contract. Use what the function returns or checks as its name.
- If a check fails, raise the expected error of `monitoring`.

| Primitive | Contract | Path |
| --- | --- | --- |
| `parseInteger(value, field, min, max)` | Returns an integer in the range. Otherwise, raises an expected error with the field name and the range. | `{shared_folder}/{validation_folder}/{numbers_file}` |
| `requireText(value, field)` | Returns the text without spaces at the ends. If the text is empty, raises an expected error with the field name. | `{shared_folder}/{validation_folder}/{text_file}` |
| `isRecord(value)` | Tells if the value is a key-value object. All other type guards use it. | `{shared_folder}/{types_folder}/{types_file}` |
| {environment primitive} | {the row of this project type in the table below} | {path} |

<!-- [Project] Move the row of this project type to the table above, and remove this table. -->

| Project type | Environment primitive | Contract |
| --- | --- | --- |
| `back-api` | `readSetting(name, fallback, parse)` in `{shared_folder}/{utilities_folder}/{settings_file}` | Returns the parsed environment variable, or its fallback. An invalid value stops the startup. |
| `front-web` | `escapeHtml(text)` in `{shared_folder}/{utilities_folder}/{html_file}` | Returns text that is safe to put in a page. |
| `cli` | `fail(message)` in `{shared_folder}/{utilities_folder}/{output_file}` | Writes `error: <message>` to standard error. Exits with code 1. |
| `e2e` | `uniqueValue(prefix)` in `{shared_folder}/test-data/{test_data_file}` | Returns a value that no other test run uses. |

## 6 · Coding rules

### General rules

<!-- [Blueprint] Technology-neutral guidance with default thresholds. The archetype can change the numbers. The `quality` slot measures them. They never block. D12. -->

- Use names that are idiomatic for the language. Use the words of the domain.
- Keep functions simple: cyclomatic complexity ≤ {8}, ≤ {32} lines, nesting ≤ {2}, ≤ {4} parameters. Keep files ≤ {128} lines.
- Tests have relaxed thresholds: ≤ {64} statements for each function, nesting ≤ {4}, files ≤ {256} lines. Do not count the lines of a test function: a suite contains its tests, and each test is one statement of the suite. In an `e2e` project, all files use these thresholds.
- Use early returns. Check the incorrect cases first and return or raise an error. Then the main path has no `else` and no nesting.
- If a block is longer than a few lines or nests more than the limit, move it to a function. Give the function a name from the domain.
- If a condition has more than one logical operator, move it to a predicate. Give the predicate a name from the domain.
- Before you write a check or a conversion, look for it in the shared primitives.
- Do not hide errors. Use one method only to handle errors in the project.
- Catch errors only at the edges: the error handler of `core`, and the `data` layer when it changes an external failure into the expected error. A function with `try`/`catch` contains only the `try`/`catch`. The `try` block calls a different function that does the work.
- Get configuration from the environment. Do not put configuration values in the code.
- If the store has a query language (such as SQL), put each statement in its own file with the extension of that language (such as `.sql`), next to the `data` file that uses it. Give the file a name from the domain. The code loads the file by name one time and does not write statements in code. Keep the schema definition (tables and migrations) in files in one location.
- Anchor the ignore patterns for runtime data to the project root (`/data/`, not `data/`). Then they cannot hide a `data` layer folder.
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
