---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

_GOAL_: design and materialize a greenfield solution foundation.

_SPAWN_ Architect => _FOLLOW_ [explore](../explore/SKILL.md).
_ON_ first write: REPLACE init seed with complete project rules; _CREATE_ empty architecture, model, and PRD shells.
_RESOLVE_ technical-spec identity.
_FROM_ recorded base: delivery owner _CREATE_ _OR_ compatibly _REUSE_ `chore/{spec_key}`.
_SPAWN_ Architect => _FOLLOW_ [specify](../specify/SKILL.md) with fixed `key`, `kind: technical`, and action; _KEEP_ received branch.
_CONFIRM_ missing material choices.
_FOLLOW_ [scaffoldify](../scaffoldify/SKILL.md) exactly once using validated design.
_DO-NOT_ skip scaffoldification because repository is empty or a scaffold is implied.
_FOLLOW_ [map-solution](../map-solution/SKILL.md) after materialization to reconcile documented containers with selected design.
_RETURN_ scaffolded solution, reconciled architecture, and technical specification.
