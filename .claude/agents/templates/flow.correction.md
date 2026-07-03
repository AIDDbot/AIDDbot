# Flow — correction

## When to use

- A known bug: a released acceptance criterion is failing.
- Always a single item — correction never fans out.

## Defaults

- oracle: `tcr-test`.
- The canonical case: one failing test, one fix.
- fix-mode: `report-only`.
- max-attempts: 3.

## Ticket skeleton

```yaml
---
id: {slug}
status: open
attempts: 0
---
# Goal
Fix {bug description} so {acceptance criterion} passes again.
Add a regression test that reproduces it first.

# Definition of done
`{test command}` is green, including the new regression test.
No other existing test changed.

# Log
```
