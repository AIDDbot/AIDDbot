---
name: specify
description: Create one proposed spec and its PRD edits.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to create one proposed spec.

Require the original request, a reserved spec ID, any needed new requirement IDs, and the active spec branch. Do not require new F or T IDs for existing requirements or changes without new requirements. Do not allocate another identity or create a branch; return an identity shortage to the caller.

Translate the request using the current PRD, implementation, acceptance tests, and container rules. Distinguish observed facts from the proposed design: existing code is evidence, not authority to override the requested behavior. Ask only for missing product decisions that materially change scope or acceptance; mark them unresolved until answered. Propose implementation decisions with their rationale instead of requiring the human to supply the design.

Write the spec using the [spec template](./assets/spec.template.md) and edit the PRD using the [PRD template](./assets/PRD.template.md), at the locations defined by the project instructions. Compare the proposal with the branch's starting PRD and reconcile every requirement delta and acceptance-test action. Preserve unrelated requirements. Return unresolved contradictions or missing coverage as blockers, not as a completed proposal.

The result is a reviewable spec and its matching proposed PRD edits, or a draft with explicit blockers.

Commit as `docs(specify): …`.
