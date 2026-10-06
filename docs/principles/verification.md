# Verification

First make it work. Then make it correct.

## Checks

Each project gives one command for each check. The archetype selects the tool.

| Check | What it does | Blocks the delivery |
| --- | --- | --- |
| `lint` | Finds errors, type errors and incorrect imports between containers and between layers. | Yes |
| `acceptance` | Runs the acceptance tests of the spec. | Yes |
| `unit` | Runs the unit tests. | No |
| `quality` | Measures the code against the limits. | No |
| `format` | Formats the code. | No |

- A check that does not block makes debt. A later pass repairs it.
- The review finds what a tool cannot find. Its findings are also debt.

