---
name: implement-spec
description: Plan and implement a validated specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-spec

Your goal is to plan and implement a validated specification without concurrent writers.

Read the specification and keep the delivery owner's active branch. Agree shared contracts and file ownership before planning. Run a Builder following [planify](../planify/SKILL.md) for each affected container sequentially; include the `e2e` plan for a functional specification. After every required plan exists and their shared contracts agree, this worker alone sets the aggregate spec status to `planned`.

Only then run a Builder following [codify](../codify/SKILL.md) for each plan sequentially. A shared lockfile, contract, configuration file, spec file, or Git index has one writer at a time. After all plans are complete, this worker alone sets the aggregate spec status to `in-progress`. No container completion represents completion of the specification.

The result is the implemented specification and a record of any plan deviation.
