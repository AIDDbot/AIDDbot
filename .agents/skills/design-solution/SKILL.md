---
name: design-solution
description: Choose tiers and technologies for a new solution and materialize its foundation.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Choose the required tiers and technologies for a new solution and materialize its scaffold.

- _SPAWN_ an _Architect_ agent to inspect and clarify solution name, problem, intended users, and proposed solution.
- _SPAWN_ a _Builder_ agent to read and execute [scaffoldify skill](../scaffoldify/SKILL.md) with those inputs.

**Checklist**
- [ ] solution name, problem, and proposed solution are clarified
- [ ] archetypes were chosen when applicable
- [ ] there is at least a tier scaffolded

_RETURN_ short summary of the materialized tiers
