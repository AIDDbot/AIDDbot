---
name: specify-feature
description: Triage a requirement and write functional spec(s) — single or coordinated multi-spec delivery.
---
# specify-feature

The goal of this command is to write a functional specification for a feature.

- Spawn a new **Architect** sub-agent to inspect the PRD, existing specs, and architecture. Count how many specs the requirement must create or amend. Follow [triage rules](/.agents/skills/scope-change/references/triage.md).

- _IF_ exactly **one** spec is affected:
  - Settle `{spec_key}` from triage (next `F` id and slug for a create; existing key for an amend).
  - Create and checkout `feat/{spec_key}`.
  - Spawn a new **Architect** sub-agent to run the [`/specify`](/.agents/skills/specify/SKILL.md) skill with `kind: functional`.
  - _IF_ not YOLO, stop for human approval of the spec.
  - Run [`/implement-spec`](/.agents/commands/implement-spec.command.md).

- _IF_ **more than one** spec is affected:
  - Present the proposed impact map (spec keys and create/amend actions).
  - _IF_ not YOLO, stop for human approval of the spec.
  - Run [`/deliver-change`](/.agents/commands/deliver-change.command.md) with the requirement in hand.

Return a short report: single spec written, or coordinated change scoped and delivered.
