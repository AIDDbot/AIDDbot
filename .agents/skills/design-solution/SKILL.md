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
- _IF_ application code or a scaffold already exists, _RETURN_ that the solution is ready for mapping; do not redesign or regenerate it.
- Propose only the required tiers from `back`, `front`, `e2e`, and `cli`; not every solution needs all four. Respect user choices and clarify missing consequential decisions.
- _FOR-EACH_ selected tier, settle its responsibility, language, framework (or none), and destination directory. Technologies may differ across tiers; a Python CLI or a Laravel backend with a Vue frontend is a valid choice, regardless of catalog coverage.
- Confirm the selected tier/technology/directory mapping with the user, reusing decisions already settled. Pass it and the product context to the Builder; do not generate architecture documentation before the scaffold exists.
- Spawn Builder to read and follow [scaffoldify](../scaffoldify/SKILL.md) exactly once. It resolves catalog matches and researches official scaffolding instructions on the internet for every unmatched technology.

_RETURN_ the prepared and reconciled foundation with the selected mapping, or the concrete blocker and any partially materialized directories.
