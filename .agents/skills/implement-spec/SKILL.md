---
name: implement-spec
description: Plan and implement a validated specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-spec

GOAL: plan and implement a validated specification without concurrent writers.

READ specification; KEEP delivery owner's active branch.
AGREE shared contracts and file ownership before planning.
FOR EACH affected container, SEQUENTIALLY:
  SPAWN Builder => FOLLOW [planify](../planify/SKILL.md).
IF specification is functional: INCLUDE `e2e` plan.
WHEN every required plan exists AND shared contracts agree:
  SET aggregate specification status to `planned` (worker only).
BEFORE first implementation write: SET aggregate specification status to `in-progress` (worker only).
FOR EACH plan, SEQUENTIALLY:
  SPAWN Builder => FOLLOW [codify](../codify/SKILL.md).
ALLOW one writer at a time for a shared lockfile, contract, configuration file, specification file, or Git index.
KEEP `in-progress` through implementation and interruption until review advances it.
DO NOT treat container completion as specification completion.
RETURN implemented specification and every plan deviation.
