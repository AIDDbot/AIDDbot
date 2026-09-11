---
name: design-solution
description: Choose tiers and technologies for a new solution and materialize its foundation.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to choose the required tiers and technologies for a new solution and materialize its scaffold, without business logic.

- Inspect the request and existing product documentation to resolve the solution name, problem, intended users, and proposed solution.
- Before suggesting technologies, run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list`. Use its output as the catalog authority; do not reconstruct the catalog from memory. Inspect the listed archetype's README or manifest to establish its language and framework; an alias such as `standard` does not identify a stack.
- _IF_ the catalog or an archetype's stack cannot be inspected, report the missing evidence and ask how to proceed; do not invent its contents.
- _FOR-EACH_ tier in `back`, `front`, `e2e`, and `cli`, discuss that tier before moving to the next:
  - Explain briefly whether the product needs it and why. Reuse explicit user decisions already made; your own recommendation is not a decision.
  - For an unresolved choice, present the actual catalog archetype first, with its language/framework and why it fits. Offer one alternative verified against current official documentation on the internet, explaining the relevant tradeoff and whether it is outside the catalog. Include the options to specify another technology or omit the tier.
  - Ask the user to choose for this tier and wait for the answer. Do not select a technology from training, silently accept a default, treat silence as consent, or defer all choices to a final table.
  - _IF_ the user requests another technology, verify its official scaffolding support on the internet and resolve consequential choices with them before accepting it.
  - Record the user's selection or omission; for a selected tier, record responsibility, language, framework (or none), destination, and catalog archetype or official source URL.
- Summarize the resolved choices in one tier/technology/directory/source table. At least one tier must be selected. Resolve requested changes before materialization.
- Spawn Builder to read and follow [scaffoldify](../scaffoldify/SKILL.md), passing the product context, table, and explicit user decisions so it does not ask the same questions again.
- For every catalog selection, explicitly instruct Builder to fetch that exact archetype with `materialize.mjs`. Choosing `express` or `standard` means using the AIDDbot project template, not building a project with that technology from scratch. Preserve the catalog identifier in the handoff.

_RETURN_ the prepared foundation and selected tier table ready to be mapped, or the concrete blocker.
