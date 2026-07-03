# Flow — analysis

## When to use

- Exploring or documenting existing code (explore/extract-like).
- For-each per container when there are several.
- A final cross-check runs once every item is done.

## Defaults

- oracle: `source-crosscheck`.
- Craftsman checks every claim against the actual source — no tests.
- fix-mode: `report-only`.
- Exception: pure prose/doc-only items may set `direct-fix`.
- max-attempts: 3.

## Ticket skeleton (root)

```yaml
---
id: {slug}
status: open
items: [{container-a}, {container-b}]
---
# Goal
Document {scope} per {template path}.

# Definition of done
Every item is done. Final cross-item review confirms no contradictions.

# Log
```

## Ticket skeleton (item, when for-each)

```yaml
---
id: {container}
parent: {slug}
status: open
---
# Goal
Produce {artifact path} for {container}, following {template path}.

# Definition of done
Every template section is filled.
Every claim is verifiable by reading {container}'s actual source.

# Log
```
