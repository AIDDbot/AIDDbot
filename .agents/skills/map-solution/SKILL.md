---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# map-solution

Map the solution architecture to have documentation and rules for this codebase.

- _SPAWN_ _Architect_ to read and execute [explore skill](../explore/SKILL.md).
- _FOR-EACH_ container found:
  - _SPAWN_ _Architect_ to read and execute [extract skill](../extract/SKILL.md) for that container.

**Checklist**
- [ ] [explore skill templates](../explore/assets) were used to generate architecture documentation
- [ ] [extract skill templates](../extract/assets) were used to extract container information

_RETURN_ short mapped-solution report.
