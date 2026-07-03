# Ticket schema

- Canonical shape for every file under `.claude/agents/runs/{slug}/`.
- A ticket is recursive: root and items share the same shape.
- The only difference: whether `parent`/`items` are present.

```yaml
---
id: {slug}
parent: {parent-id}       # omit at the root
status: open               # open | blocked | done
items: []                    # child ids; omit or empty = leaf, no for-each
attempts: 0                    # omit if this node doesn't loop
max-attempts: 3                  # omit to use the default (3)
---
# Goal
{what is being asked at this node}

# Definition of done
{the rubric Craftsman checks against — concrete and falsifiable.
 Omit to inherit the parent's verbatim.}

# Log
- {author}: {entry, append-only, oldest first}
```

## Rules

- Only Architect creates ticket files.
- Only Architect changes `Goal`, `Definition of done`, or `items`.
- Builder and Craftsman only append to `Log` and update `status`/`attempts`.
- `Log` is the full history.
- Append to it — never summarize past entries away.
- `parent`/`items` express a for-each.
- Parallel vs sequential is Architect's call at run time — not schema.
