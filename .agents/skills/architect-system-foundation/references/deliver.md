# Greenfield: deliver the foundation specs

When the projects come from Archetype Base, read the section [With Archetype Base](#with-archetype-base). Otherwise, deliver these specs one at a time, in this order. For each one, execute `build-requested-spec` with the request "Deliver the foundation spec `{spec}` from `.agents/skills/architect-system-foundation/assets/foundation/{spec}.spec.md`". Give it this **Architect**, the same **Builder**, and the **Craftsman**.

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

The code and the tagged tests of each spec are already in the system, so each spec is verified and recorded, not built. Deliver the eight specs of `.product/archetypes/foundation/` in the order of their IDs, one at a time, with this **Architect**, the same **Builder** and the **Craftsman**:

- The **Architect** creates the spec with `node .agents/aidd/aidd.mjs spec new feat {slug} "{title}" --domain foundation`, with the slug and the title of the instance. If the core gives an ID that is not the ID of the instance, stop and journal `blocked`: the test tags would name the wrong spec.
- The **Architect** replaces the body of the new `spec.md` with the instance, as written, and keeps the frontmatter of the core. Journal `approved` for the spec, and commit `docs(spec): define delivery`. No human approval: the instance is part of the approved proposal.
- The **Craftsman** executes `verify-behavior`, then `review-implementation`, then `ship-spec`.
- A red verification goes to the **Builder**, who executes `implement-project` to repair it. The repair and debt rules of `build-requested-spec` apply.

## The close

The foundation closes only green:

- After the last spec ships, run `node .agents/aidd/aidd.mjs run lint`, `run unit`, and `run acceptance`. If one fails, journal `blocked` and return the failure.
- Never start a repair or a spec that is not a foundation spec, also for `high` debt.
- Return the debt summary of `node .agents/aidd/aidd.mjs debt list`. Recommend `craft-lasting-quality` if an item is `high`.
