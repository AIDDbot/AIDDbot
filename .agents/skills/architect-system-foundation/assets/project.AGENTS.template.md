<!--
Archetype-Blueprint: technical part of one project (Columbus principles 7, 8, 11; D16, D19).
Three levels fill this file; each fills the empty fields of the level before it and never changes the structure:
  [Blueprint] fixed here, no technology · [Archetype] AGENTS.md of the archetype repository · [Project] {project}/AGENTS.md in the system.
Keep the sections, their order, and their headings. Delete these comments only at the project level.
Implementation hints per ecosystem: ecosystems.md (guidance, never mandatory).
-->
# {Project_Name} — {project_type}

`{project_type}` is one of `back-api`, `front-web`, `cli`, `e2e`. Read this file before any change in `{source_root}/`. It is complete: do not explore the code to learn the technical setup.

## 1 · Purpose and boundary

<!-- [Project] Principle 11. -->

{Why this project exists, what it owns, and what it never does.}

## 2 · Technology

<!-- [Archetype] Principles 8, 11. -->

- **Language**: {language and version}
- **Runtime / framework**: {runtime and framework}
- **Main dependencies**: {library — role}
- **Package manager**: {one only}

## 3 · Tooling

<!-- [Archetype] commands and tools · [Project] registers them with `aidd config set`. D1, D12, D20, D26. -->

Each slot is a capability, not a tool. A slot that does not apply says `n/a` and its reason; an empty slot is an error.

| Slot | Contract | Blocks delivery | Command | Tool |
| --- | --- | --- | --- | --- |
| `lint` | Exits non-zero on errors. Includes the strongest type check of the ecosystem and the layer-boundary check. | Yes | `{command}` | {tool} |
| `format` | Rewrites files in place with the canonical formatter. Run before integration; never checked. | No | `{command}` | {tool} |
| `upgrade` | Raises every dependency to its latest release, majors included, and refreshes the lockfile. Run at the foundation and on request; never per delivery. | No | `{command}` | {tool} |
| `unit` | Runs at least one real test; the foundation leaves a smoke test of `health` logic. | No | `{command}` | {tool} |
| `start` | Starts without a prior build, reads `PORT`, answers on the health route. | No | `{command}` | {tool} |
| `acceptance` | Runs the acceptance tests tagged `@S{nnnn}-R{nn}`. | Yes | `{command}` | {tool} |
| `quality` | Reports complexity and warnings against the general rule thresholds. Feeds the debt register. | No | `{command}` | {tool} |

## 4 · Architecture

<!-- [Blueprint] Fixed shape, not a named pattern. D2–D6, D12, D24. The archetype only maps it to folders in section 5. -->

An entry point, three folders, and layers inside each feature:

| Concept | Contains |
| --- | --- |
| `main` | The minimal entry point that the ecosystem requires. It only starts `core`. |
| `core` | Composition root: configuration, server or shell, router, and the dependencies it creates. |
| features | One subfolder per feature: endpoints, pages, or commands. One **manifest** aggregates their registrations. |
| `shared` | Helpers and DRY code, never business. Organized by the same layers as a feature. |

**Between folders** (blocks delivery through `lint`):

- `main` → `core` only.
- `core` → manifest and `shared`, never a feature directly.
- feature → `shared`, and other features only through their facade.
- `shared` → nothing of the application.
- Only `main` imports `core`. Features and `shared` get configuration by injection. Tests may start `core`.

**Inside a feature and inside `shared`**: `presentation` → `logic` → `data`, never backwards.

- `presentation`: input and output with the caller (route, page, command, test).
- `logic`: rules and decisions, with no knowledge of how data is stored or fetched.
- `data`: everything the project reads or writes outside itself: database, remote API, files.

- **Facade** (D3): each feature exposes one entry file with the minimum: its registration for the manifest and the types that other features need. The registration receives the dependencies that `core` creates (configuration, connections) by injection (D6).
- **Manifest** (D6): one file in the features folder lists every feature registration explicitly. No auto-discovery: no folder scans, no global decorators.
- Where no reasonable boundary linter exists, these rules stay written here and `review-implementation` checks them (D5).

### Variations by project type

<!-- [Blueprint] Principle 7. `n/a` always carries its reason. -->

| Item | `back-api` | `front-web` | `cli` | `e2e` |
| --- | --- | --- | --- | --- |
| `main` | process entry | browser entry | executable entry | n/a — the test runner is the entry |
| `core` | server, configuration, router | app shell, configuration, router | argument parser, configuration | runner configuration, project startup check |
| features | endpoints | pages | commands | tests, one subfolder per spec domain |
| `presentation` | route / controller | page / component | command | test |
| `logic` | service | store / use case | service | n/a — tests hold no business logic |
| `data` | repository | API client | repository / file system | page objects and API clients |
| `shared` | middleware, validation, DB and HTTP clients | base UI components, utilities, HTTP client | output formatting, utilities | fixtures and helpers |
| manifest | route registry | page router | command registry | n/a — the runner discovers tests by convention |
| `unit` | yes | yes | yes | n/a — no own logic; acceptance is its product |
| `start` | yes | yes | n/a — runs per invocation, no server | n/a — starts the projects under test |
| `acceptance` | through `e2e` | through `e2e` | own tests or through `e2e` | yes — it runs the suite |

## 5 · Folder structure

<!-- [Archetype] Map every concept of section 4 to a real folder or file. [Project] adds features as specs ship. -->

| Concept | Path |
| --- | --- |
| `main` | `{source_root}/{main_file}` |
| `core` | `{source_root}/{core_folder}/` |
| features | `{source_root}/{features_folder}/` |
| manifest | `{source_root}/{features_folder}/{manifest_file}` |
| feature facade | `{source_root}/{features_folder}/{feature}/{facade_file}` |
| `presentation` / `logic` / `data` | `{feature}/{presentation_name}`, `{feature}/{logic_name}`, `{feature}/{data_name}` |
| `shared` | `{source_root}/{shared_folder}/` |
| unit tests | `{unit_test_location}` |

```text
{source_root}/
├── {main_file}           # entry point, starts core
├── {core_folder}/        # composition root
├── {features_folder}/    # one folder per feature + manifest
│   └── health/           # tracer bullet from the foundation specs
└── {shared_folder}/      # helpers by layer, no business
```

## 6 · Coding rules

### General rules

<!-- [Blueprint] Technology-neutral guidance with default thresholds; the archetype may adapt the numbers. Thresholds are measured by `quality` and never block. D12. -->

- Names are idiomatic for the language and use the domain vocabulary.
- Functions stay simple: cyclomatic complexity ≤ {10}, ≤ {40} lines, nesting ≤ {3}, ≤ {4} parameters. Files ≤ {300} lines.
- Errors are never silenced. The project handles them in one way only.
- Configuration comes from the environment, never from literals in code.
- Dependencies are added with the package manager's add command, which resolves the latest release; a version is never written by hand or from memory.
- First make it work, then make it right: only `lint` (errors, types, boundaries) and acceptance block a delivery.

### Technology rules

<!-- [Archetype] Rules of the stack that the general rules do not cover. -->

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
