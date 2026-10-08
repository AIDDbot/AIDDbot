# Verification

First make it work. Then make it correct.

## Checks

Each project gives one command for each check. The archetype selects the tool.

| Check | What it does | Blocks the delivery |
| --- | --- | --- |
| `lint` | Finds errors, type errors and incorrect imports between containers and between layers. | Yes |
| `unit` | Runs the unit tests. | Yes |
| `acceptance` | Runs the full acceptance suite: the tests of the spec and of every shipped requirement. | Yes |
| `quality` | Measures the code against the limits. | No |
| `format` | Formats the code. | No |

- A check that does not block makes debt. A later pass repairs it. `quality` also finds duplicated blocks of code (DRY).
- `unit` and `acceptance` must pass at the commit that ships. The core refuses a green verification without them.
- The review finds what a tool cannot find. Its findings are also debt. A security finding gets one repair first.

## Tests

- Each test makes its own data. It does not depend on a different test or on the order of the tests. It gives the same result each time.
- A unit test proves one business rule of `logic`, with a fake `data` and no external system. Also test `shared` and `core`, not the framework. If possible, put it next to the code.
- A business rule without a unit test is debt. No check measures it yet.
- An acceptance test proves one requirement of a spec. Its name contains the identifier of that requirement. It also proves `presentation` and `data`.
- The `e2e` project starts the other projects and checks that they answer. Its tests use only the API and the screens, never the database or the code of other projects. Each feature of the system has one folder of tests.

---

← [Scaffolding](./scaffolding.md) · [Principles](./README.md) · [Glossary](./glossary.md) →
