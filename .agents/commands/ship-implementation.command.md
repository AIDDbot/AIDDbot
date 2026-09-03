---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification or coordinated change.
---
# ship-implementation

The goal of this internal command is to review and deliver the complete implemented scope.

- Spawn a new **Craftsman** sub-agent to run the [`verify`](/.agents/skills/verify/SKILL.md) skill with the complete specification or change in scope.

- _TRIAGE_ the functional report:
  - _IF_ `verify` finds functional or E2E defects, execute [`fix-defects`](/.agents/commands/fix-defects.command.md) with its report, then restart this command from `verify`.
  - _IF_ `verify` is green, continue to technical qualification.

- Spawn a new **Craftsman** sub-agent to run the [`qualify`](/.agents/skills/qualify/SKILL.md) skill with the same scope.

- _TRIAGE_ the technical report:
  - _IF_ `qualify` finds technical or quality defects, execute [`fix-defects`](/.agents/commands/fix-defects.command.md) with its report, then restart this command from `verify`.
  - _IF_ `qualify` is green, continue to delivery.

- _ONCE_ verify and qualify are green, spawn a new **Craftsman** sub-agent to run the [`shipify`](/.agents/skills/shipify/SKILL.md) skill with the same scope.

Return a short report with the delivery result.
