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

`aiddbot init` prepares everything a delivery needs before any skill runs: `.gitignore`, `README.md`, `LICENSE`, `AGENTS.md` (seeded from `outline-system`'s own template, which later fills it in), `.aiddbot/counters.yaml`, an empty `.aiddbot/config.json`, the empty `PRD.md` and `TDR.md`, and the journal's first event. Scaffolding can seed `.gitignore` and `LICENSE` from its bundled defaults if either is missing, and leaves existing files untouched. A scaffold leaves `.aiddbot/aiddbot.system.json` as the system index and initializes the root `package.json` with product name, description, author, and version. It installs each project's dependencies and stops there: no lint, tests, or other command. It does not repeat skill routing or commands executed by the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, branch, spec, PRD proposal, schema impact, and approval |
| Build | **Builder** | `implement-project` for each affected project: code, unit tests, and any required E2E test changes without E2E execution |
| Prove and ship | **Craftsman** | `verify-behavior` executes E2E acceptance, then `review-implementation` and `ship-spec` |

Agent names, descriptions, adapter paths, models, and efforts are configured in `.aiddbot/agents.yaml`; `.agents/agents/{id}.md` contains each canonical prompt. `npm run adapt` combines them to regenerate all harness adapters, and `npm run release` runs the adapter before packaging. An orchestrator keeps one agent per role for its whole run, continued with messages.

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`.

The PRD owns requirement text. A spec marks each affected requirement as `new`, `changed`, `deprecated`, or `related` and declares its acceptance-test work. Approval is required before implementation unless YOLO mode is active.

The product schemas live in `model/`: one conceptual `model.schema.md`, plus `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares every entity, table, or endpoint change as its schema impact; review blocks undeclared shape changes, and shipping updates the schema documents.

Every workflow tells its story in one plain-text daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, which stays out of Git. It is narrative only: no code reads it or decides anything from it, because the process state lives in each spec's `control.json`. Each line holds complete fields separated by ` · ` (time, status, actor, spec, event, summary), with no fixed widths or truncation. The core (`node .agents/aidd/aidd.mjs`) writes an entry for every state change it makes: spec creation and approval, each evaluation, configuration, shipping, and integration. The model adds only its judgments with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt, a `blocked` reason, and an `escalate` triage.

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | `green` or `amber` | Changed-code quality |

Verification runs before qualification. Each evaluation is recorded with its status and revision in the spec's `control.json`, which only the core writes and `aidd spec show` summarizes. Green evaluations leave no report; amber and red evaluations leave a report containing only failures and findings. A red verification returns directly for repair and repeats verification, without qualification, until revision 3. A red qualification also returns for repair and restarts at verification. At revision 3, a red verification continues once to qualification and either current red finding is recorded in the TDR at shipping. Amber findings also enter the TDR. A missing or unexpected report still blocks shipping; the gate reads only `control.json` and the reports, so it gives the same answer in a fresh clone.

Shipping applies the PRD changes, reconciles the schema documents, updates debt, promotes reusable error-prevention lessons into the applicable project rules, and synchronizes one release version across the changelog, spec and tag, the authoritative root `package.json`, and every existing manifest or build file that declares that product version. It does not change dependency, toolchain, schema, API, migration, historical, or independently released component versions. It then integrates the branch.

## Quality review

`craft-lasting-quality` follows:

`scan-quality` → select coherent debt → `/build-requested-spec`

`rule-project` classifies each project's `lint`, `unit`, `acceptance`, and `quality` commands once, by their real effect and never their script name, and records them in `.aiddbot/config.json`. `aidd run <kind> [--project]` executes the classified command and exits unavailable (never a stricter invocation or the build lint) when nothing is configured. During coding, the Builder runs `lint` and `unit`; it may author E2E tests but never runs `acceptance`. The Craftsman runs `acceptance` in `verify-behavior` and every project's `quality` list in `scan-quality`.

The latest system evidence replaces `quality/review.md`; open debt remains indexed in `quality/TDR.md`.

See the [skills catalog](../.agents/skills/skills.catalog.md) for the complete inventory and routing.
