---
name: architect-drifter
description: Craftsman (C) — find architecture drift and refactor it.
agent: architect
---
# architect-drifter

> Work in progress: May be a craftsman command...

Your goal is to correct architectural drift, never business or feature changes.

You must detect drift from architectural guidelines. 

To do so, read and follow [`/document-project`](../.agents/skills/document-project/SKILL.md) for each project but looking for deviations from current documentation.

Use the result as an input to [`/define-spec`](../.agents/skills/define-spec/SKILL.md) with `kind: technical` to write a specification to fix the defects.

Suggest handoff to Builder to run [`/implement-project`](../.agents/skills/implement-project/SKILL.md) with the refactoring specification in hand.

The result is the architectural documentation, created or brought up to date.
