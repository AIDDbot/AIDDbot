# Complexity

## Limits

The limits do not block a delivery. The `quality` check measures them, separate from `lint`. A violation is debt. A later craft pass repairs it.

The archetype can change these numbers.

| Limit | Code | Tests |
| --- | --- | --- |
| Cyclomatic complexity of a function | 8 | 8 |
| Statements in a function | 16 | 64 |
| Nesting depth | 2 | 4 |
| Parameters of a function | 2 | 4 |
| Lines in a file | 128 | 256 |
| Entries in a folder | 16 | — |

- If necessary, disable the parameter limit for one function with a lint comment.
- A folder over the limit has more than one concern. Divide it by concern.

## Functions

- Use early returns. The main path has no `else`.
- Move a long or deep block to a function with a domain name.
- If a function needs more than two values, give it one typed object.
