---
name: build-requested-change
description: Deliver one requested spec with its checks and evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to turn a natural-language request into one specified, approved, and delivered change.

- Spawn an Architect agent with the original request and existing authorization to:
    - Read the PRD, relevant implementation, acceptance tests, container rules, and findings.
    - Identify one coherent scope, its delivery type, and existing requirements to change, deprecate, or preserve. Make any deferred part of the request explicit.
    - Reserve the spec ID and only genuinely new requirement IDs using the project counters; reuse existing identities when resuming. Create or resume the spec branch under the project Git rules.
    - Execute [specify-spec](../specify-spec/SKILL.md) with the request, evidence, scope, reserved identities, and authorization.
- Wait for the Architect result.
- _IF_ the spec is blocked or lacks authorization for its current contents:
    - _RETURN_ the proposed artifacts and concrete blocker or pending approval.
- Spawn a Builder agent to execute [implement-change](../implement-change/SKILL.md) with the approved spec and PRD delta; wait for its result.
- _IF_ implementation is blocked:
    - _RETURN_ the implementation blocker.
- Spawn a Craftsman agent to execute [ship-implementation](../ship-implementation/SKILL.md) with the implemented spec; wait for its result.

_RETURN_ the shipped spec or its concrete blocker.
