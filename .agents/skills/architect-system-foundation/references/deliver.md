# Greenfield: deliver the foundation specs

When the projects come from Archetype Base, read the section [With Archetype Base](#with-archetype-base). Otherwise, deliver these specs one at a time, in this order. For each one, execute `build-requested-spec` with the request "Deliver the foundation spec `{spec}` from `.agents/skills/architect-system-foundation/assets/foundation/{spec}.spec.md`". Give it this **Architect**, the same **Builder**, and the **Craftsman**. Each request is approved in advance, because the foundation spec is the contract.

The foundation specs are no business feature. Deliver them also when the human asks for no features yet: without them, the system has no settings, logs, layout, health check, or accounts, and its close proves nothing.

| # | Spec | Condition |
| --- | --- | --- |
| 1 | `configuration` | always |
| 2 | `monitoring` | always |
| 3 | `layout` | the system has a `front-web` |
| 4 | `health` | always |
| 5 | `basic-auth` | the system has users, from its proposal or model; ask the human only when this is not clear |
| 6 | `account` | `basic-auth` was delivered |
| 7 | `about` | the system has a `front-web` |
| 8 | `record-views` | the system has a `front-web` |

## With Archetype Base

The code, the tagged tests, and the review of each spec came with the archetypes, and the library gate of Archetype Base passed them. The instances in `.product/archetypes/foundation/` are the contract of the system. Never create, verify, review, or ship them as specs: go to [the close](#the-close), without the **Craftsman**.

- The close is the only evidence. A red close is a defect of the environment or of Archetype Base: never repair it in the system. Journal `blocked` and return the failure.
- The system keeps the version of its root `package.json`. The first business spec releases the next one.
- The core gives the first business spec the ID after the instances, so the test tags never collide.

## The close

The foundation closes only green:

- After the last spec ships, or after the scaffold with Archetype Base, run `node .agents/aidd/aidd.mjs run lint`, `run unit`, and `run acceptance`, one at a time. Acceptance takes minutes: wait for its JSON result. If one fails, journal `blocked` and return the failure.
- Never start a repair or a spec that is not a foundation spec, also for `high` debt. After a red close, the run stops: also when the human asked for features.
- Return the debt summary of `node .agents/aidd/aidd.mjs debt list`. Recommend `craft-lasting-quality` if an item is `high`.
- Journal nothing for the close: the core journals each run. A result is never a `plan` or a `handoff`.
