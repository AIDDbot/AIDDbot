---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification, change, or findings scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to review and deliver the complete implemented scope.

- Spawn a new **Craftsman** sub-agent to run the [verify skill](../verify/SKILL.md) with the complete specification, coordinated change, or accepted findings in scope.
- _TRIAGE_ the functional report:
  - _IF_ `verify` finds functional or E2E defects, read and execute [fix-defects](../fix-defects/SKILL.md) with its report, then restart this skill from `verify`.
  - _IF_ `verify` is green, continue to technical qualification.
- Spawn a new **Craftsman** sub-agent to run the [qualify skill](../qualify/SKILL.md) with the same scope.
- _TRIAGE_ the technical report:
  - _IF_ `qualify` finds technical or quality defects, read and execute [fix-defects](../fix-defects/SKILL.md) with its report, then restart this skill from `verify`.
  - _IF_ `qualify` is green, continue to delivery.
- _ONCE_ verify and qualify are green, spawn a new **Craftsman** sub-agent to run the [shipify skill](../shipify/SKILL.md) with the same scope.

Return a short report with the delivery result.
