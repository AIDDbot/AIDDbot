# Flow — development

## When to use

- New functionality, spec-driven.
- One item for a single container.
- For-each (one item per container) when the spec spans several.

## Defaults

- oracle: `tcr-test`.
- Builder works in TCR micro-increments against the test command.
- fix-mode: `report-only`.
- max-attempts: 3.

## Ticket skeleton (root)

```yaml
---
id: {slug}
status: open
items: [{container-a}, {container-b}]   # omit for a single-container job
---
# Goal
Implement {feature} per {spec path}.

# Definition of done
Every item below is done and the final cross-item review is PASS.

# Log
```

## Ticket skeleton (item, when for-each)

```yaml
---
id: {container}
parent: {slug}
status: open
attempts: 0
---
# Goal
Implement {container}'s slice of {feature}, per {plan path}.

# Definition of done
Acceptance criteria {AC-list} pass. Test command: `{test command}`.

# Log
```
