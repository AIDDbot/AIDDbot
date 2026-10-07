# Greenfield: deliver the foundation specs

Deliver these specs one at a time, in this order. For each one, execute `build-requested-spec` with the request "Deliver the foundation spec `{spec}` from `.agents/skills/architect-system-foundation/assets/foundation/{spec}.spec.md`". Give it this **Architect**, the same **Builder**, and the **Craftsman**.

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

The foundation closes only green:

- After the last spec ships, run `node .agents/aidd/aidd.mjs run lint`, `run unit`, and `run acceptance`. If one fails, journal `blocked` and return the failure.
- Never start a repair or a spec that is not a foundation spec, also for `high` debt.
- Return the debt summary of `node .agents/aidd/aidd.mjs debt list`. Recommend `craft-lasting-quality` if an item is `high`.
