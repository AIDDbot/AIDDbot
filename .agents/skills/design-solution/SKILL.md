---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

GOAL: design and materialize a greenfield solution foundation.

SPAWN Architect => FOLLOW [explore](../explore/SKILL.md).
ON first write: REPLACE init seed with complete project rules; CREATE empty architecture, model, and PRD shells.
RESOLVE technical-spec identity.
FROM recorded base: delivery owner CREATE OR compatibly REUSE `chore/{spec_key}`.
SPAWN Architect => FOLLOW [specify](../specify/SKILL.md) with fixed `key`, `kind: technical`, and action; KEEP received branch.
CONFIRM missing material choices.
FOLLOW [scaffoldify](../scaffoldify/SKILL.md) exactly once using validated design.
DO NOT skip scaffoldification because repository is empty or a scaffold is implied.
FOLLOW [map-solution](../map-solution/SKILL.md) after materialization to reconcile documented containers with selected design.
RETURN scaffolded solution, reconciled architecture, and technical specification.
