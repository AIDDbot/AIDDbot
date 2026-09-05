---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to design and materialize a greenfield solution foundation.

- Spawn a new **Architect** sub-agent to run [explore](../explore/SKILL.md). Its first write replaces the init seed with the complete project rules and creates empty architecture, model, and PRD shells.
- Resolve the technical spec identity. The delivery owner establishes or compatibly reuses `chore/{spec_key}` from the recorded base, then an Architect runs [specify](../specify/SKILL.md) with that fixed `key`, `kind: technical`, and action. The sub-agent keeps the branch it receives.
- Run [scaffoldify](../scaffoldify/SKILL.md) exactly once using the validated design. Confirm missing material choices. Do not skip this step because the repository is empty or because a scaffold is merely implied.
- Run [map-solution](../map-solution/SKILL.md) after materialization so its documented containers reconcile with the selected design.

_RETURN_ the scaffolded solution, reconciled architecture, and technical specification.
