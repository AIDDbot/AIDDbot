---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# map-solution

Your goal is to **map the solution architecture**.

- _SPAWN_ _Architect_ to read and execute [explore skill](../explore/SKILL.md).
- _FOR-EACH_ container found:
  - _SPAWN_ _Architect_ to read and execute [extract skill](../extract/SKILL.md) for that container.

**Checklist**
- [ ] [explore skill](../explore/SKILL.md) templates where used to generate architecture documentation
- [ ] [extract skill](../extract/SKILL.md) templates where used to extract container information

_RETURN_ short mapped-solution report.
