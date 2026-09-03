---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Your goal is to deliver a requirement that affects several coordinated specifications.

- Determine `{change_key}` from the scope report.
- Create and checkout `change/{change_key}`.
- **Specification phase** — for every specification in the scope report:
  - Read and execute [specify-spec](../specify-spec/SKILL.md) _ONCE_.
  - Execute all specification work in parallel.
- _ONCE_ all specifications are validated, continue to implementation.
- **Implementation phase** — for every specification, sequentially:
  - Read and execute [implement-spec](../implement-spec/SKILL.md).
  - Do not review or deliver specifications individually.
- _ONCE_ all specifications are implemented, read and execute [ship-implementation](../ship-implementation/SKILL.md) _ONCE_ with the complete change in scope.

Return a short report of the delivered coordinated change.
