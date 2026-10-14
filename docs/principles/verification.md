# Verification

First make it work. Then make it correct.

## Checks

Each project gives one command for each check. The archetype selects the tool.

| Check | What it does | Blocks the delivery |
| --- | --- | --- |
| `lint` | Finds errors, type errors and incorrect imports between containers and between layers. It reports only errors, never warnings. `lint:files` does the same for the given files only. | Yes |
| `test` | Runs the tests of the project. In an `e2e` project, it runs the full acceptance suite: the tests of the spec and of every shipped requirement. In other projects, it runs the unit tests. `test:files` runs the given test files only. | Yes |
| `quality` | Measures the code against the limits. | No |
| `harden` | Polishes code that works: the warnings of the linter, and stricter rules. | No |
| `format` | Formats the code. | No |

- A check that does not block makes debt. A later pass repairs it. `quality` also finds duplicated blocks of code (DRY).
- `harden` runs last, only when no `high` or `medium` debt remains. Its findings are `low` debt, one item for each rule. A false alarm is disabled in the configuration of the project, never in each place.
- During the build, `lint` and the unit tests run only on the changed files, and the verification runs only the acceptance tests of the spec. Thus each failure is near its cause.
- The full `lint` and the `test` of each project must pass at the commit that ships: the regression. The core refuses a release without them.
- The review finds what a tool cannot find. Its findings are also debt. A security finding gets one repair first.

## Tests

- Each test makes its own data. It does not depend on a different test or on the order of the tests. It gives the same result each time.
- A unit test proves one business rule of `logic`, with a fake `data` and no external system. Also test `shared` and `core`, not the framework. If possible, put it next to the code.
- A business rule without a unit test is debt. No check measures it yet.
- An acceptance test proves one requirement of a spec. Its name contains the identifier of that requirement. It also proves `presentation` and `data`.
- The `e2e` project has no unit tests: each run of the suite proves its `core`.
- The `e2e` project starts the other projects and checks that they answer. Its tests use only the API, the screens and the commands, never the database or the code of other projects. Only the migration tests open the database. Each feature of the system has one folder of tests.

---

← [Scaffolding](./scaffolding.md) · [Principles](./README.md) · [Glossary](./glossary.md) →
