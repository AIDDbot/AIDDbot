# Change classification

Classify every delivery before writing. A change may touch zero, one, or several specifications. Inspect existing functional and technical specs to decide whether durable contracts must be created or amended.

- **Amend, never fork** — behavior already owned by an existing spec is an `amend`.
- **Create** — genuinely new durable behavior or technical policy with no owning spec.
- **No spec** — a bounded simple adjustment or contract-restoring correction may carry its criteria in the change.

Resolve `origin`, `kind`, `intent`, and `complexity`. `simple` requires one affected container, no more than one durable spec, complete criteria, a known solution, focused automated checks, and local reversibility. Classify as `complex` when any requirement is absent or the work affects architecture, shared contracts, schemas, migrations, dependencies, infrastructure, security, privacy, concurrency, transactions, accessibility, performance-sensitive paths, several containers, or several specs. Diff size alone does not establish simplicity.

Derive stages mechanically:

| Condition | Rule |
| --- | --- |
| `complexity: simple` | no plan and no qualification |
| `intent: fix` | no plan |
| requested `kind: technical` | no verification |
| requested `kind: functional` or `mixed` | verification required |
| `origin: craft` | one final verification for the complete batch |
| `complexity: complex` | qualification required |

A skipped qualification makes implementation the evidence owner for every technical criterion. Every impact-map entry has a stable `key`, `kind: functional | technical`, and `action: create | amend`. Reuse an existing identity for an amend and reserve new IDs atomically. Reserve one change key for every delivery.

Record the default-branch revision as the proposed base. Triage is read-only; the owner persists the approved classification on `change/{change_key}`. Re-evaluate before implementation and after repairs. A discovered exclusion may only enable future stages or return for a scope decision.
