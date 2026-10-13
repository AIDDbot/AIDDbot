# Greenfield: close the foundation

The code, the tagged tests, and the review of each foundation spec came with the library, and the gate of the library passed them. The instances in `.product/archetypes/foundation/` are the contract of the system. Never create, verify, review, or ship them as specs.

- The close is the only evidence. A red close is a defect of the environment or of the library: never repair it in the system.
- The system keeps the version of its root `package.json`. The first business spec releases the next one.
- The core gives the first business spec the ID after the instances, so the test tags never collide.

## The close

The foundation closes only green:

- After the scaffold, run `node .agents/aidd/aidd.mjs run lint`, then `run test`. `run test` runs the `e2e` project last, and its acceptance takes minutes: wait for its JSON result. If one fails, journal `blocked` and return the failure.
- Never start a repair or a business spec. After a red close, the run stops: also when the human asked for features.
- Return the debt summary of `node .agents/aidd/aidd.mjs debt list`. Recommend `craft-lasting-quality` if an item is `high`.
- Journal nothing for the close: the core journals each run. A result is never a `plan` or a `handoff`.
