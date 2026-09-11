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

- Inspect and clarify to resolve the solution name, problem, intended users, and proposed solution.
- Before suggesting technologies, run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list`as the catalog authority.
- _FOR-EACH_ tier in `back`, `front`, `e2e`, and `cli`, 
    - discuss that tier (responibility, language, framework, destination)
    - offer the the actual arquetype solution, plus an alternative or omit the tier  
    - let user have the final say
- _SPAWN_ _Builder_ to execute [scaffoldify skill](../scaffoldify/SKILL.md) with the table to materialize the arquetypes.
- _FOR-EACH_ tier not yet materialized, 
    - Search for its official scaffolding support on the internet 
    - Materialize the scaffold following the new technology's official scaffolding guide
