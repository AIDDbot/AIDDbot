---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Your goal is to deliver **a requirement that affects several coordinated specifications**.

- Determine `{change_key}` from the scope report.
- Create and checkout `change/{change_key}`.
- **Specification phase**  
  - _FOR-EACH_ specification in the scope report:
    - _PARALLEL_ Execute [specify-spec](../specify-spec/SKILL.md) command for that specification.
- _ONCE_ all specifications are validated or YOLO
- **Implementation phase** 
  - _FOR-EACH_ specification:
    - _SEQUENTIAL_ Execute [implement-spec](../implement-spec/SKILL.md).
- _ONCE_ all specifications are implemented,
  -  Execute [ship-implementation](../ship-implementation/SKILL.md) with the complete change in scope.

_RETURN_ a short report of the delivered coordinated change.
