---
name: craftsman-refactor
description: Craftsman (C) — implement a technical directive
agent: craftsman
---
# craftsman-refactor

Your goal is to implement a technical directive, never business or feature changes.

Use the argument directive as an input to [`/define-spec`](../.agents/skills/define-spec/SKILL.md) with `kind: technical` to write a specification to fix the defects.

The result is a specification to fix the defects.

Suggest handoff to Builder to run [`/implement-project`](../.agents/skills/implement-project/SKILL.md) with the refactoring specification in hand.
