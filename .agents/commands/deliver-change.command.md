---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
---
# deliver-change

The goal of this internal command is to deliver a requirement that affects several coordinated specifications.

- Determine `{change_key}` from the scope report.
- Create and checkout `change/{change_key}`.

- **Specification phase** — for every specification in the scope report:
  - Execute [`specify-spec`](/.agents/commands/specify-spec.command.md) _ONCE_.
  - Execute all specification work in parallel.
- _ONCE_ all specifications are validated, continue to implementation.

- **Implementation phase** — for every specification, sequentially:
  - Execute [`implement-spec`](/.agents/commands/implement-spec.command.md).
  - Do not review or deliver specifications individually.

- _ONCE_ all specifications are implemented, execute [`ship-implementation`](/.agents/commands/ship-implementation.command.md) _ONCE_ with the complete change in scope.

Return a short report of the delivered coordinated change.
