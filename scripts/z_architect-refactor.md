---
name: craftsman-refactor
description: Craftsman (C) — implement a technical directive
agent: craftsman
---
# craftsman-refactor

Your goal is to implement a technical directive, never business or feature changes.

Use the argument directive as an input to [`/specify`](../skills/specify/SKILL.md) with `kind: refactor` to write a specification to fix the defects.

The result is a specification to fix the defects.

Suggest handoff to Builder to implement the fixes by running [`/builder-implement`](./builder-implement.command.md) with the refactoring specification in hand.
