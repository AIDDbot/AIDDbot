---
name: specify-feature
description: Write a specification for a feature or scaffolding solution.
---
# specify-feature

The goal of this command is to write a specification for a feature or scaffolding solution.

- Spawn a new **Architect** sub-agent to run the [`/specify`](/.agents/skills/specify/SKILL.md) skill with `kind: functional` to write a new specification for the feature.

- _IF_ the prompt states YOLO (means You Only Live Once) you can proceed with the implementation by running the [`/implement-spec`](/.agents/commands/implement-spec.command.md) command to implement this specification.