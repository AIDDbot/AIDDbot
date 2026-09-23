# AIDD workflow

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application source | `scaffold-system` → `outline-system` → `rule-project` | Scaffold, dependencies, documentation, rules, and product records |
| Existing application source | `outline-system` → `rule-project` | Documentation, rules, and missing product records |

Existing product records are preserved. A completed scaffold is merged from `chore/scaffold`.

Run `/architect-system-foundation` again whenever the documentation should reflect the code. It refuses while a spec is `in-progress`, works on `chore/document`, and merges it. It rewrites structure, model, and schemas from the code, keeps the coding rules learned at shipping, and deletes the records of removed projects.

`aiddbot init` prepares everything a delivery needs before any skill runs: `.gitignore`, `README.md`, `LICENSE`, `AGENTS.md` (seeded from `outline-system`'s own template, which later fills it in), `.aiddbot/counters.yaml`, the empty `PRD.md` and `TDR.md`, and the journal's first event. No skill creates these as a fallback; a missing one means `init` was skipped. A scaffold leaves `.aiddbot/aiddbot.system.json` as the system index and initializes the root `package.json` with product name, description, author, and version. It installs each project's dependencies and stops there: no lint, tests, or other command. It does not repeat skill routing or commands executed by the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, branch, spec, PRD proposal, schema impact, and approval |
| Build | **Builder** | `implement-project` for each affected project: code, unit tests, and any required E2E test changes without E2E execution |
| Prove and ship | **Craftsman** | `verify-behavior` executes E2E acceptance, then `review-implementation` and `ship-spec` |

Each role runs at a fixed effort — **Architect** and **Craftsman** `high`, **Builder** `medium` — that `npm run adapt` resolves from `.aiddbot/efforts.yaml` into the model of every harness's agent definition at release time, so spawning a role spawns it with its model already set: nothing is chosen at delegation time. An orchestrator keeps one agent per role for its whole run, continued with messages, and journals each spawn once with its role.

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`.

The PRD owns requirement text. A spec marks each affected requirement as `new`, `changed`, `deprecated`, or `related` and declares its acceptance-test work. Approval is required before implementation unless YOLO mode is active.

The product schemas live in `model/`: one conceptual `model.schema.md`, plus `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares every entity, table, or endpoint change as its schema impact; review blocks undeclared shape changes, and shipping updates the schema documents.

Every workflow records high-level events in one human-readable, append-only daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, which stays out of Git. Agents working inside a project folder still append to that single root journal, so one file holds the whole day's timeline. The foundation run opens that trace before it inspects anything, so the session's harness, the greenfield or brownfield verdict, and the scaffold selection are recorded before the first file is written. Physical line order is canonical within each daily file and is never replaced by timestamp sorting; `record-journal/scripts/append.mjs` is the single source for the line format.

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | `green` or `amber` | Changed-code quality |

Verification runs before qualification. A red verification returns directly for repair and repeats verification, without qualification, until revision 3. A red qualification also returns for repair and restarts at verification. At revision 3, a red verification continues once to qualification and either current red finding is recorded in the TDR at shipping. Amber findings also enter the TDR. Missing or stale evidence still blocks shipping.

Shipping applies the PRD changes, reconciles the schema documents, updates debt, promotes reusable error-prevention lessons into the applicable project rules, and synchronizes one release version across the changelog, spec and tag, the authoritative root `package.json`, and every existing manifest or build file that declares that product version. It does not change dependency, toolchain, schema, API, migration, historical, or independently released component versions. It then integrates the branch.

## Quality review

`craft-lasting-quality` follows:

`scan-quality` → select coherent debt → `/build-requested-spec`

Commands are classified by their effective behavior, not their script names. During coding, the Builder runs only error-level lint and affected unit tests; it may author E2E tests but does not execute them. The Craftsman executes acceptance tests afterward. Quality review runs configured warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening.

The latest system evidence replaces `quality/review.md`; open debt remains indexed in `quality/TDR.md`.

See the [skills catalog](../.agents/skills/skills.catalog.md) for the complete inventory and routing.
