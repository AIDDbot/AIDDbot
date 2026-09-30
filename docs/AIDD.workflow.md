# AIDD workflow

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Skills

Every executable capability is a skill under `.agents/skills/`. Orchestrators own their routing and compose primitives; primitives return their result and never invoke the next stage.

### Orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](../.agents/skills/architect-system-foundation/SKILL.md) | Propose the system in `.product/system.md` when no project source code exists, with the scaffold commands for the human to run; otherwise document system architecture; rerun any time to resync documentation with the code |
| [`/build-requested-spec`](../.agents/skills/build-requested-spec/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](../.agents/skills/craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

### Primitives

| Area | Skills |
| --- | --- |
| Context | [`/outline-system`](../.agents/skills/outline-system/SKILL.md), [`/rule-project`](../.agents/skills/rule-project/SKILL.md) |
| Capture | [`/define-spec`](../.agents/skills/define-spec/SKILL.md) |
| Build | [`/implement-project`](../.agents/skills/implement-project/SKILL.md) |
| Prove | [`/verify-behavior`](../.agents/skills/verify-behavior/SKILL.md), [`/review-implementation`](../.agents/skills/review-implementation/SKILL.md), [`/scan-quality`](../.agents/skills/scan-quality/SKILL.md) |
| Ship | [`/ship-spec`](../.agents/skills/ship-spec/SKILL.md) |
| Meta | [`/maintain-skills`](../.agents/skills/maintain-skills/SKILL.md) — AIDDbot development only; `aiddbot init` and `update` never install it |

## Call tree

```yaml
architect-system-foundation:
  greenfield:
    - "Architect: propose .product/system.md and obtain approval"
    - "Architect: run its scaffold commands, then continue as brownfield"
  brownfield:
    - "Architect: outline-system, reading code only (no test or quality runs, no debt)"
    - "Architect: rule-project per project"

build-requested-spec:
  - "Architect: define-spec and obtain approval"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction"
      e2e-project: "implement-project authors assigned acceptance-test changes and checks them with the spec-scoped run"
  - Craftsman:
      evaluation: "verify-behavior, review-implementation, ship-spec; red evaluations and their failure-only reports go back to the Builder; a failing test counts toward revision 3, and only a product question or acceptance that cannot run stops"

craft-lasting-quality:
  - "Craftsman: scan-quality"
  - "Architect: select one coherent group of eligible debt; the repair stays within its evidence"
  - "build-requested-spec with both agents when eligible debt remains"
  - "return the debt list summary when no repair is eligible"
```

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application source | Staged questions → `.product/system.md` → approval | An approved proposal, scaffolded, then documented as below |
| Existing application source | `outline-system` → `rule-project` | Documentation, rules, and missing product records |

Existing product records are preserved. After approval the Architect runs the proposal's scaffold commands in a clean working tree: they download each archetype with `tiged`, install its dependencies with `bun`, and commit `chore(scaffold)` on the current branch. The same run then documents the new projects. A failing command stops the run with nothing partial committed. Working code is never rescaffolded.

Run `/architect-system-foundation` again whenever the documentation should reflect the code. It refuses while a spec is `in-progress`, works on `chore/document`, and merges it. It rewrites structure, model, and schemas from the code, keeps the coding rules learned at shipping, and deletes the records of removed projects.

`aiddbot init` prepares everything a delivery needs before any skill runs: `.gitignore`, `README.md`, `LICENSE`, a root `package.json` at `0.1.0` that carries the product version, `AGENTS.md` (seeded from `outline-system`'s own template, which later fills it in), `.aiddbot/counters.yaml`, an empty `.aiddbot/config.json`, the empty debt register `debt.json`, and the journal's first event. It does not repeat skill routing or commands executed by the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, domain, branch, spec with its requirements, schema impact, and approval |
| Build | **Builder** | `implement-project` for each affected project: code, unit tests, and any required E2E test changes, which it may run to check its work |
| Prove and ship | **Craftsman** | `verify-behavior` executes E2E acceptance, then `review-implementation` and `ship-spec` |

Agent names, descriptions, adapter paths, and per-harness model tiers (`deep`, `standard`, `light`, each a model and effort) are configured in `.aiddbot/agents.yaml`; a consumer's `.aiddbot/agents.local.yaml` overrides them at `aiddbot update`; `.agents/agents/{id}.md` contains each canonical prompt. `npm run adapt` combines them to regenerate all harness adapters, and `npm run release` runs the adapter before packaging. An orchestrator keeps one agent per role for its whole run, continued with messages.

Spec state: `in-progress` from `aidd spec new` until `aidd release` marks it `shipped`. One spec is open at a time: `aidd spec new` refuses while another spec branch exists. The human approves the spec in the conversation before anything is built, unless YOLO mode is active.

Each spec owns its requirements: `R01`, `R02`, … in EARS, cited elsewhere as `S0042-R03`, each with at least one acceptance test. When a spec touches behavior of a shipped spec, it marks each such requirement `preserve` or `replace`. Shipped specs stay in their folders, and `.product/PRD.md` lists them by domain, one line each, generated by `aidd release`; it is the product view, never written by hand.

The product schemas live in `model/`: one conceptual `model.schema.md`, plus `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares every entity, table, or endpoint change as its schema impact; review blocks undeclared shape changes, and shipping updates the schema documents.

Every workflow tells its story in one plain-text daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, which stays out of Git. It is narrative only: no code reads it or decides anything from it, because the process state lives in each spec's `control.json`. Each line holds complete fields separated by a space (time, actor, spec, event, level, summary), where the level is `INFO`, `WARN` for a failed run or an amber evaluation, or `ERROR` for a red evaluation or a `blocked` reason; the short columns are padded to a minimum width so the log reads as a table, and the summary is cut at 128 characters. The core (`node .agents/aidd/aidd.mjs`) writes an entry for every state change it makes: spec creation, each run and evaluation, configuration, debt changes, shipping, and integration. The model adds only its judgments with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt, each human `approved` proposal or spec, the `scaffolded` projects, and a `blocked` reason.

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | any recorded status; findings ship as debt | Expert review of gross errors no linter sees: security, data integrity, accessibility |

Verification runs before qualification. `aidd eval` records each evaluation with its status, revision, and current commit in the spec's `control.json`; a non-green one needs its report first, a green one drops any earlier report, and the core commits the record itself. A green verification needs the spec's last `aidd run acceptance` to have passed with no code change since, and an acceptance test titled `@S0042-R03` for every requirement; a failed run is green only with `--preexisting <D IDs>` naming open debt recorded before the spec. Green evaluations leave no report; amber and red evaluations leave a report containing only failures and findings. A red verification returns for repair and repeats verification, without qualification, until revision 3. A failure the Builder cannot reproduce, and so leaves unchanged, is recorded as debt before verification repeats, so a green retry never hides it. Qualification never blocks: it is recorded once, never repaired within the spec, and shipping records every finding as debt, `high` for a blocking one. At revision 3, a red verification no longer blocks, and its current failures are recorded as debt at shipping. The gate, which `aidd spec show` lists and `aidd release` enforces, also rejects an evaluation whose commit does not exist, so evidence written by hand never ships; it reads only `control.json` and the reports, so it gives the same answer in a fresh clone.

Shipping regenerates the spec index, reconciles the schema documents, updates debt, promotes reusable error-prevention lessons into the applicable project rules, and runs `aidd release`, which enforces the gate and derives the version from the spec type: `feat` bumps the minor, `fix`, `refactor`, and `chore` the patch, and the model adds `--major` only for a breaking change. The core writes that version into the root `package.json`, its lockfile root, and any file declared in `release.versionFiles` of `.aiddbot/config.json`, adds the `CHANGELOG.md` entry from the spec title, commits, integrates the branch, and tags. Dependency, toolchain, schema, API, and migration versions are never touched.

## Records

| Record | Purpose |
| --- | --- |
| `system.md` | The approved greenfield proposal: purpose, users, projects, and scaffold commands; kept as product context |
| `PRD.md` | One line per shipped spec, grouped by domain; core-written by `aidd release` |
| `quality/debt.json` | Open technical debt with priority, evidence, and origin; core-written by `aidd debt`, read with `aidd debt list` |
| `specs/S{nnnn}-{slug}/` | One delivery: `spec.md` (a shorter template for every type but `feat`) with its own requirements, its core-written `control.json`, and non-green reports; kept after shipping |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/config.json` | Each project's path and its classified `lint`, `unit`, `acceptance`, and `quality` commands, plus optional `release.versionFiles` and `run.timeoutMinutes`; core-written, read by `aidd run` and `aidd release` |
| `.aiddbot/journals/YYYY-MM-DD.log` | Narrative process events by local date, always at the repository root, ignored by Git; nothing reads it |

`aiddbot init` creates every shared record above; the core creates each spec folder, and `architect-system-foundation` writes `system.md`. Evaluation reports are finding-only: a green verification or qualification has no report file. Each spec's `control.json` holds its title, domain, state, and each evaluation's revision, status, and commit. Only the core writes it, never a hand edit, so the shipping gate works in a fresh clone.

## Quality review

`craft-lasting-quality` follows:

`scan-quality` → select coherent debt → `/build-requested-spec`

`rule-project` classifies each project's `lint`, `unit`, `acceptance`, and `quality` commands once, by their real effect and never their script name, and records them in `.aiddbot/config.json`. `aidd run <kind> [--project]` (acceptance also takes `--spec`) executes the classified command and exits unavailable (never a stricter invocation or the build lint) when nothing is configured. Each run keeps its full output in `.aiddbot/runs/{kind}-{project}.log`, stops after `run.timeoutMinutes` (20 by default), is journaled, and on a spec branch is recorded as that kind's latest run in `control.json`. During coding, the Builder runs `lint` and `unit`, and checks its acceptance tests with `aidd run acceptance --spec`, which runs only the spec's tagged tests, lists requirements still untested, and is never recorded as evidence, and `quality` only to check a debt repair. Quality warnings harden the code over time: a feature may ship with them, and they are scanned from time to time by `/craft-lasting-quality`, never after every spec. The Craftsman runs `acceptance` in `verify-behavior` and every project's `quality` list in `scan-quality`; each quality check is its own entry, never an aggregate that stops at its first failure, and `run` executes every entry even after one fails.

Open debt lives in `quality/debt.json`, which only `aidd debt add|list|remove` touches; each add or remove commits itself. Each item has a priority (`high`, `medium`, `low`), its evidence, and its origin: the spec whose branch added it, or `scan`. A fixed item is removed: by shipping, when the spec cites it and verification is green, or by a scan whose check ran and no longer shows it. There is no separate review report; the journal records when a scan ran.
