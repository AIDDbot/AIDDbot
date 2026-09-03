---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
---
# deliver-spec

The goal of this internal command is to deliver a requirement that affects one specification.

- Determine `{spec_key}` from the scope report.
- Create and checkout `feat/{spec_key}`.
- Execute [`specify-spec`](/.agents/commands/specify-spec.command.md) _ONCE_ for the requirement.
- _ONCE_ the specification is validated, execute [`implement-spec`](/.agents/commands/implement-spec.command.md) _ONCE_ for that specification.
- _ONCE_ implementation finishes, execute [`ship-implementation`](/.agents/commands/ship-implementation.command.md) _ONCE_ with the specification in scope.

Return a short report of the delivered specification.
