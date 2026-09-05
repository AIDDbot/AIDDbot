---
name: implement-spec
description: Plan and implement a validated specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-spec

_GOAL_: plan and implement a validated specification without concurrent writers.

_READ_ specification; _KEEP_ delivery owner's active branch.
AGREE shared contracts and file ownership before planning.
_FOR-EACH_ affected container, _SEQUENTIALLY_:
  _SPAWN_ Builder => _FOLLOW_ [planify](../planify/SKILL.md).
_IF_ specification is functional: _INCLUDE_ `e2e` plan.
_WHEN_ every required plan exists _AND_ shared contracts agree:
  _SET_ aggregate specification status to `planned` (worker only).
_BEFORE_ first implementation write: _SET_ aggregate specification status to `in-progress` (worker only).
_FOR-EACH_ plan, _SEQUENTIALLY_:
  _SPAWN_ Builder => _FOLLOW_ [codify](../codify/SKILL.md).
_ALLOW_ one writer at a time for a shared lockfile, contract, configuration file, specification file, or Git index.
_KEEP_ `in-progress` through implementation and interruption until review advances it.
_DO-NOT_ treat container completion as specification completion.
_RETURN_ implemented specification and every plan deviation.
