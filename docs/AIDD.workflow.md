# AIDD workflow

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Skills

Each executable capability is a skill in `.agents/skills/`. An orchestrator owns its routing and uses primitives. A primitive returns its result and never starts the next stage.

### Orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](../.agents/skills/architect-system-foundation/SKILL.md) | With no project code: propose the system in `.product/system.md`, make the projects and deliver the foundation. With code: document the architecture. Run it again at any time to align the documentation with the code. |
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
| Meta | [`/maintain-skills`](../.agents/skills/maintain-skills/SKILL.md): only for the development of AIDDbot. `aiddbot init` and `update` never install it. |

## Call tree

```yaml
architect-system-foundation:
  greenfield:
    - "Architect: propose .product/system.md as typed projects, with an archetype per project or one made on demand, and obtain approval"
    - "Architect: on chore/foundation, scaffold each project with its AGENTS.md, registered slots, and no orphan samples"
    - "Architect: outline-system, then integrate (never rule-project)"
    - "build-requested-spec per foundation spec: configuration, monitoring, layout when the system has a front-web, health, basic-auth when the system has users, account with basic-auth"
    - "close only when lint, unit, and acceptance pass"
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
| No application code | Staged questions → `.product/system.md` → approval → scaffold → `outline-system` → foundation specs | A green system: each project with its `AGENTS.md`, and `configuration`, `monitoring`, `layout` (with a `front-web`), `health`, and the optional `basic-auth` and `account` shipped |
| Existing application code | `outline-system` → `rule-project` | Documentation, rules, and the missing product records |

The foundation keeps the product records that exist.

A greenfield system is a solution of typed projects: `back-api`, `front-web`, `cli` and `e2e`. Each project uses an archetype of its type from the catalog. Or the Architect makes an archetype for the selected technology: it fills the Archetype-Blueprint (`project.AGENTS.template.md`), keeps it as `.product/archetypes/{project}.AGENTS.md`, and links it from `system.md`, never copies it.

After the approval, the Architect works on `chore/foundation`, one project at a time, with three commits for each project:

1. The scaffold, with no change (`chore(scaffold): generate`).
2. The shape of the Blueprint (`refactor: shape to blueprint`).
3. The tooling (`chore: register tooling`).

In the shape, `{project}/AGENTS.md` has only the data of its project, in short lists: technology, tooling, the variation of its type, folders, primitives, technology and project rules, and connections. A `CLAUDE.md` refers to it. The architecture and the general rules are in the Blueprint of the root `AGENTS.md`, one time for the system: `main` connects `core` and the features through a manifest, `shared` has folders by technical concern, and `presentation` → `logic` → `data` (see [`architect-system-foundation.md`](./architect-system-foundation.md)).

The Architect reorganizes the templates of other generators, removes the samples that cannot operate, installs each missing mandatory slot, and registers each slot in `.aiddbot/config.json`. After `outline-system`, the branch merges. Then `build-requested-spec` delivers the foundation specs, which have no technology, one at a time. A failed command stops the run, with no partial commit. The foundation never makes working code again.

Run `/architect-system-foundation` again when the documentation must agree with the code. It refuses while a spec is `in-progress`. It works on `chore/document` and merges it. It writes the structure, the model and the schemas again from the code. It keeps the coding rules that shipping added, and it deletes the records of removed projects.

`aiddbot init` prepares all that a delivery needs before a skill runs: `.gitignore`, `README.md`, `LICENSE`, a root `package.json` at `0.1.0` with the product version, `AGENTS.md` (from the template of `outline-system`, which fills it later), `.aiddbot/counters.yaml`, an empty `.aiddbot/config.json`, the empty debt register `debt.json`, and the first event of the journal. It does not repeat the skill routing or the commands of the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, domain, branch, the spec with its requirements, schema impact, and approval |
| Build | **Builder** | `implement-project` for each project that changes: code, unit tests, and the necessary E2E test changes, which it can run to check its work |
| Prove and ship | **Craftsman** | `verify-behavior` runs the E2E acceptance, then `review-implementation` and `ship-spec` |

`.aiddbot/agents.yaml` sets the agent names, descriptions, adapter paths, and the model tiers of each harness (`deep`, `standard` and `light`, each a model and an effort). The `.aiddbot/agents.local.yaml` of a consumer changes them at `aiddbot update`. `.agents/agents/{id}.md` has the canonical prompt of each agent. `npm run adapt` uses them to make all harness adapters again, and `npm run release` runs it before packaging. An orchestrator keeps one agent for each role for its full run, and continues it with messages.

Spec state: `in-progress` from `aidd spec new` until `aidd release` marks it `shipped`. Only one spec is open at a time: `aidd spec new` refuses while a different spec branch exists. The human approves the spec in the conversation before the build starts, unless YOLO mode is active.

Each spec owns its requirements: `R01`, `R02`, … in EARS. Other records cite them as `S0042-R03`. Each requirement has at least one acceptance test. A spec looks forward and never lists shipped requirements. A failed test with the tag of a different spec is a regression, until a requirement of the new spec contradicts it. Shipped specs stay in their folders. `aidd release` writes `.product/PRD.md`: one line for each shipped `feat` spec, by domain. Fixes, refactors and chores change features and do not get a line. The PRD is the product view. Nobody writes it by hand.

The product schemas are in `model/`: one conceptual `model.schema.md`, and `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares each change of an entity, a table or a column as its schema impact, and each endpoint with its statuses in its `Expected URLs and APIs`. The review blocks a shape change that the spec does not declare. Shipping updates the schema documents.

### Journal

Each workflow writes its story in one plain-text daily journal at the repository root: `.aiddbot/journals/YYYY-MM-DD.log`. Git ignores it.

- Each skill commit goes through `aidd commit`, which writes it as `committed`. Thus the journal shows each milestone and its time.
- An orchestrator writes a `handoff` line each time that it sends work to a different agent.
- `aidd commit` refuses a commit that changes the code of a project, unless the last `aidd run lint` of that project passed on the same files. Documents (`.md`), `.product/` and `.aiddbot/` need no lint. A format of clean files keeps the lint valid.
- The journal is only a story. No code reads it or makes a decision from it: the process state is in the `control.json` of each spec.
- Each line has complete fields with a space between them: time, actor, spec, event, level and summary. The level is `INFO`, `WARN` for a failed run or an amber evaluation, or `ERROR` for a red evaluation or a `blocked` reason. The short columns have a minimum width, so the log reads as a table. The summary stops at 128 characters.
- The core (`node .agents/aidd/aidd.mjs`) writes an entry for each state change that it makes: spec creation, each run and evaluation, configuration, debt changes, shipping, and integration. A run line shows only the projects that apply, each with its result and the summary line of its tool (such as `100 passed` or `1 failed`).
- The model adds only its judgments, with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt or the archetype of each project, each human `approved` proposal or spec, the `plan` of each implementation before its first edit, the `scaffolded` projects, and a `blocked` reason.

### Evidence

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | any recorded status; findings ship as debt after one repair of a failed Security gate | Expert review of gross errors that no linter sees: security, data integrity, accessibility |

Verification runs before qualification. `aidd eval` records each evaluation with its status, revision and current commit in the `control.json` of the spec. A non-green evaluation needs its report first. A green one removes an earlier report. The core commits the record.

- A green verification needs a passing last `aidd run acceptance` of the spec, with no code change after it, and an acceptance test with the tag or title `@S0042-R03` for each requirement. A failed run is green only with `--preexisting <D IDs>`, which names open debt recorded before the spec.
- Green evaluations leave no report. Amber and red evaluations leave a report with only the failures and findings.
- A red verification returns for repair and runs again, without qualification, until revision 3.
- If the Builder cannot reproduce a failure and does not change it, the failure becomes debt before verification runs again. Thus a green retry never hides it.
- Qualification never blocks shipping. Shipping records each finding as debt, `high` for a blocking one. A failed Security gate gets one repair: its report returns to the Builder one time, then verification and qualification run again.
- At revision 3, a red verification no longer blocks. Shipping records its current failures as debt.
- `aidd spec show` lists the gate, and `aidd release` enforces it. The gate also refuses an evaluation with a commit that does not exist, so evidence written by hand never ships. It reads only `control.json` and the reports, so it gives the same answer in a new clone.

### Shipping

Shipping:

1. Makes the spec index again and aligns the schema documents with the code.
2. Updates the debt.
3. Adds each reusable lesson that prevents an error to the project-rules table of the applicable `{project}/AGENTS.md`, as one short row.
4. Runs `aidd run format` and commits its changes.
5. Runs `aidd release`. It enforces the gate and gets the version from the spec type: `feat` increases the minor version; `fix`, `refactor` and `chore` increase the patch version. The model adds `--major` only for a breaking change.

The core writes that version into the root `package.json`, the root of its lockfile, and each file in `release.versionFiles` of `.aiddbot/config.json`. It adds the `CHANGELOG.md` entry from the spec title, commits, merges the branch and adds the tag. It never changes the versions of dependencies, tools, schemas, APIs or migrations.

## Records

| Record | Purpose |
| --- | --- |
| `system.md` | The approved greenfield proposal: purpose, users, projects and scaffold commands. It stays as product context. |
| `PRD.md` | One line for each shipped `feat` spec, by domain. `aidd release` writes it. |
| `quality/debt.json` | Open technical debt with priority, evidence and origin. `aidd debt` writes it; `aidd debt list` reads it. |
| `specs/S{nnnn}-{slug}/` | One delivery: `spec.md` (a shorter template for each type but `feat`) with its requirements, its `control.json` that the core writes, and the non-green reports. It stays after shipping. |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/config.json` | The path of each project and its classified commands `lint`, `format`, `upgrade`, `unit`, `acceptance` and `quality` (a slot that does not apply has `{"na": "<reason>"}`), and the optional `release.versionFiles`, `run.timeoutMinutes` and `quality.folderEntries`. The core writes it; `aidd run` and `aidd release` read it. |
| `.aiddbot/journals/YYYY-MM-DD.log` | The story of the process by local date, always at the repository root, ignored by Git. Nothing reads it. |

`aiddbot init` makes each shared record above. The core makes each spec folder, and `architect-system-foundation` writes `system.md`. An evaluation report has only findings: a green verification or qualification has no report file. The `control.json` of each spec has its title, domain, state, and the revision, status and commit of each evaluation. Only the core writes it, never a hand edit, so the shipping gate operates in a new clone.

## Quality review

`craft-lasting-quality` follows this route:

`scan-quality` → select coherent debt → `/build-requested-spec`

In greenfield, `architect-system-foundation` registers the slots of each project from its `AGENTS.md`. In brownfield, `rule-project` classifies the `lint`, `unit`, `acceptance` and `quality` commands of each project one time, by their real effect and never by their script name, and records them in `.aiddbot/config.json`.

- `aidd run <kind> [--project]` (and `--spec` for acceptance) runs the classified command. When no command is configured, it exits as unavailable; it never uses a stricter invocation or the build lint. A slot marked `{"na": "<reason>"}` reports its reason and passes.
- `format` changes the files in place. `upgrade` increases the dependencies to their latest releases. Neither is evidence.
- Each run keeps its full output in `.aiddbot/runs/{kind}-{project}.log` and stops after `run.timeoutMinutes` (20 by default). The journal records it. On a spec branch, `control.json` records it as the latest run of that kind for each project.
- During coding, the Builder runs `lint` and `unit`. It checks its acceptance tests with `aidd run acceptance --spec`, which runs only the tagged tests of the spec, lists the requirements that have no test, and is never evidence. It runs `quality` only to check a debt repair.
- Quality warnings make the code stronger over time. A feature can ship with them. `/craft-lasting-quality` scans them from time to time, never after each spec.
- The Craftsman runs `acceptance` in `verify-behavior`, and the `quality` list of each project in `scan-quality`. Each quality check is its own entry, never one aggregate that stops at its first failure, and `run` executes each entry also after a failure.
- A `quality` run also lists, in `folders`, each folder of a `shared` or `features` tree with more direct entries than `quality.folderEntries` (16 by default), and, in `subfolders`, each folder inside a feature. It never fails the run. `scan-quality` records each one as debt: it divides a full `shared` folder by technical concern, and a feature into two features.

Open debt is in `quality/debt.json`. Only `aidd debt add|list|remove` changes it, and each add or remove commits itself. Each item has a priority (`high`, `medium` or `low`), its evidence and its origin: the spec whose branch added it, or `scan`. A fixed item goes away: at shipping, when the spec cites it and verification is green, or at a scan whose check ran and no longer shows it. There is no separate review report: the journal records when a scan ran.
