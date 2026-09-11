---
name: design-solution
description: Choose tiers and technologies for a new solution and materialize its foundation.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to choose the required tiers and technologies for a new solution and materialize its scaffold, without business logic.

- Inspect the request and existing product documentation to resolve the solution name, problem, intended users, and proposed solution.
- Respect user choices and clarify missing consequential decisions.
- Propose optional tiers from `back`, `front`, `e2e`, and `cli`; not every solution needs all four. 
- _FOR-EACH_ selected tier, settle its responsibility, language, framework (or none), and destination directory. 
- Confirm the selected tier/technology/directory mapping with the user in a single table.
- _SPAWN_ _Builder_ to execute [scaffoldify](../scaffoldify/SKILL.md) 

_RETURN_ the tier table ready to be mapped .
