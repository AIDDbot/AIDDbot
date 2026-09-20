# Skill naming proposal

Record of the explicit skill names adopted on 2026-09-20. The preferred proposals are now canonical; alternatives remain as design context.

Use [`naming-glossary.md`](./naming-glossary.md) to interpret scope terms consistently.

## Naming rule

- Name an orchestrator with exactly three words.
- Name a primitive with exactly two words.
- Use lowercase kebab-case and count each hyphen-separated segment as one word.
- Start with an action and use the remaining words to identify its object or outcome.
- Treat `metadata.aiddbot-kind` as the authoritative classification; word count is its visible naming convention.

## Skill levels

Keep two executable skill levels:

- Public orchestrators own complete outcomes, agent assignment, routing, gates, retries, and human handoffs.
- Primitives execute one focused capability and return evidence or a result without invoking the next pipeline stage.

Remove the `worker` level. Fold the routing from `implement-spec` and `ship-implementation` into `build-requested-spec`, then remove both worker skills. Keep their execution details in the relevant primitives rather than duplicating them in the orchestrator.

The resulting delivery route is:

```text
build-requested-spec
├── Architect: define-spec
├── Builder: implement-project per affected project
└── Craftsman
    ├── verify-acceptance
    ├── review-implementation when verification is green
    └── ship-spec when qualification is green or amber
```

The orchestrator owns the `red` repair loop. Below the revision ceiling it sends the reported findings back to the **Builder**, then asks the **Craftsman** to evaluate again. At the ceiling it stops and asks the human.

## Primitive proposals

| Current name | Preferred proposal | Alternative A | Alternative B | Intended scope |
| --- | --- | --- | --- | --- |
| `scaffoldify` | `scaffold-system` | `initialize-system` | `bootstrap-system` | Create only the initial project scaffold, without functional implementation. |
| `explore` | `document-system` | `map-system` | `describe-system` | Establish system-level instructions, product records, and the high-level model from repository evidence. |
| `extract` | `document-project` | `map-project` | `describe-project` | Document one project or subdomain and its rules or shared contracts. |
| `specify` | `define-spec` | `specify-request` | `prepare-spec` | Turn one natural-language request into an approved spec and proposed PRD edits. |
| `codify` | `implement-project` | `build-project` | `code-project` | Implement the supplied scope or repair findings in one project at a time. |
| `verify` | `verify-acceptance` | `test-acceptance` | `prove-acceptance` | Execute acceptance tests and record verification evidence for one spec. |
| `qualify` | `review-implementation` | `qualify-implementation` | `inspect-implementation` | Review one spec implementation against blocking gates and record technical debt. |
| `audit-quality` | `audit-quality` | `audit-system` | `assess-quality` | Run strict system-wide quality checks and reconcile durable quality records. |
| `shipify` | `ship-spec` | `release-spec` | `integrate-spec` | Integrate and close an evidenced spec, updating product and debt records. |
| `skillify` | `author-skills` | `manage-skills` | `write-skills` | Create or correct canonical AIDDbot skills and their resources. |

## Orchestrator proposals

Every adopted name follows the three-word rule. The A/B/C entrypoint prefixes remain `architect-`, `build-`, and `craft-`.

| Current name | Preferred proposal | Alternative A | Alternative B | Intended scope |
| --- | --- | --- | --- | --- |
| `architect-solution-foundation` | `architect-system-foundation` | `architect-system-structure` | `architect-system-context` | Scaffold when necessary, then document the system and its projects. |
| `build-requested-change` | `build-requested-spec` | `build-product-request` | `build-spec-delivery` | Formalize one request as a spec, coordinate the primitives directly, and carry it through delivery. |
| `craft-lasting-quality` | `craft-lasting-quality` | `craft-system-quality` | `craft-technical-health` | Review system quality and deliver coherent repairs. |

## Remaining decision

- Decide which primitives remain directly invocable by humans.
