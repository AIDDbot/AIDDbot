---
name: deliver-requirement
description: Deliver a requirement as one specification or a coordinated multi-spec change.
---
# deliver-requirement

The goal of this workflow is to take a requirement from initial analysis through delivery.

- Execute the internal [`scope-feature`](/.agents/commands/scope-feature.command.md) command with the requirement in hand.

- _TRIAGE_:
  - _IF_ the requirement affects one specification, execute the internal [`deliver-spec`](/.agents/commands/deliver-spec.command.md) command with the scope report.
  - _IF_ the requirement affects several coordinated specifications, execute the internal [`deliver-change`](/.agents/commands/deliver-change.command.md) command with the scope report.

Return a short report of the delivered specification or coordinated change.
