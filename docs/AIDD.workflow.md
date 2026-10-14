# AIDD workflow

This is the reference of the process. For an overview, read [How it works](./how-it-works.md).

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
| [`/architect-system-foundation`](../.agents/skills/architect-system-foundation/SKILL.md) | With no project code: propose the system in `.product/system.md` from a library of archetypes, copy the projects and close the foundation green. With code: document the architecture. Run it again at any time to align the documentation with the code. |
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
    - "Architect: propose .product/system.md as typed projects from one library, and obtain approval; when no library fits, stop"
    - "Architect: on chore/foundation, copy each project of the library with its spec instances and schema documents; Builder: register the slots"
    - "Architect: outline-system for the root AGENTS.md only, then integrate (never rule-project)"
    - "close only when lint and test pass"
  brownfield:
    - "Architect: outline-system, reading code only (no test or quality runs, no debt)"
    - "Architect: rule-project per project"

build-requested-spec:
  - "refuse to start on a greenfield system whose foundation close is red"
  - "Architect: define-spec and obtain approval"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction; lint and unit tests of the changed files only"
      e2e-project: "implement-project authors assigned acceptance-test changes and checks them with the spec-scoped run"
  - Craftsman:
      evaluation: "verify-behavior runs the spec-scoped acceptance tests; review-implementation; ship-spec runs the full lint and the full regression, and a failure goes to triage; red evaluations and their failure-only reports go back to their owner; a failing test counts toward revision 3, and only a product question or acceptance that cannot run stops"

craft-lasting-quality:
  - "Craftsman: scan-quality, only when no medium debt is open; the scan records only medium debt"
  - "Craftsman: scan-quality to harden, once, when no high or medium debt remains; it records low debt, one item for each rule"
  - "Architect: select the eligible debt of one type, `fix` or `refactor`, in one group; the repair stays within its evidence"
  - "build-requested-spec with both agents for the selected group; the repair is approved in advance"
  - "repeat the selection and the repair while debt remains, highest priority first, at most 5 specs, and stop at a spec that ships an unresolved failure; no scan between two repairs and no scan at the end"
  - "return the debt list summary"
```

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application code | Staged questions → `.product/system.md` → approval → copy of the library → `outline-system` → green close | A green system: each project with its `AGENTS.md`, and the foundation of the library (its spec instances, code and tests) proved by the close |
| Existing application code | `outline-system` → `rule-project` | Documentation, rules, and the missing product records |

The foundation keeps the product records that exist.

A greenfield system is a solution of typed projects: `api`, `web`, `cli` and `e2e`. The projects come from one library of the catalog. AIDDbot offers only libraries: when no library fits, the foundation stops and makes no archetype. Libraries are made with the [Archetype Builder](https://github.com/AIDDbot/archetype-builder). For one `api`, one `web`, one `e2e` and users, the first offer is Archetype Base (`AIDDbot/archetype-base`): three archetypes that ship with the code and the tagged tests of every foundation spec, with the spec instances in `foundation/`, and with the schema documents in `model/`. For one local `cli` and one `e2e`, the first offer is Archetype CLI (`AIDDbot/archetype-cli`), in the same form.

After the approval, the Architect works on `chore/foundation`, each step for all the projects of the library at once:

1. The scaffold, with no change (`chore(scaffold): generate`).
2. The system data in each `AGENTS.md` (`refactor: shape to blueprint`).
3. The tooling, one `chore(scaffold): register tooling` for all the projects.

In the shape, `{project}/AGENTS.md` has only the data of its project, in short lists: technology, tooling, the variation of its type, folders, primitives, technology and project rules, and connections. When projects share technology, `outline-system` moves the tooling and technology rules that they repeat to the Common stack of the root `AGENTS.md`, one time. The primitives index lists only the helpers that two or more features use; a helper of one feature follows a naming convention and has no row. A `CLAUDE.md` refers to it. The architecture and the code rules are in the Blueprint of the root `AGENTS.md`, one time for the system: the composition connects `core` and the features through a manifest, `core` and the features never import each other, `shared` has the contracts and folders by technical concern, and `presentation` → `logic` → `data`, where no layer skips the next one (see the [principles](./principles/README.md)).

The Builder installs with `npm ci` and registers each slot in `.aiddbot/config.json`. After `outline-system`, the branch merges. No foundation spec is delivered: the instances stay in `.product/archetypes/foundation/` as the contract, the close is the only evidence, and a red close is a defect of the environment or of the library, never repaired in the system. The core gives the first business spec the ID after the instances. A failed command stops the run, with no partial commit. The foundation never makes working code again.

Run `/architect-system-foundation` again when the documentation must agree with the code. It refuses while a spec is `in-progress`. It works on `chore/document` and merges it. It writes the structure, the model and the schemas again from the code. It keeps the coding rules that shipping added, and it deletes the records of removed projects.

`aiddbot init` prepares all that a delivery needs before a skill runs: `.gitignore`, `README.md`, `LICENSE`, a root `package.json` at `0.1.0` with the product version, `AGENTS.md` (from the template of `outline-system`, which fills it later), `.aiddbot/counters.yaml`, an empty `.aiddbot/config.json`, the empty debt register `debt.json`, and the first event of the journal. It does not repeat the skill routing or the commands of the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, domain, branch, the spec with its requirements, schema impact, and approval |
| Build | **Builder** | `implement-project` for each project that changes: code, unit tests, and the necessary E2E test changes. It lints and tests only the changed files, and it runs the tests of the spec to check its E2E work |
| Prove and ship | **Craftsman** | `verify-behavior` runs the acceptance tests of the spec, then `review-implementation`, then `ship-spec`, which runs the full regression before the release |

Each step tests only its own surface. The full system is tested one time, at the end:

| Step | Owner | Gate | Command |
| --- | --- | --- | --- |
| Build | **Builder** | `lint` and unit tests of the changed files | `aidd run lint --changed`, `aidd run test --changed`, and `aidd run test --spec` as a check |
| Verify | **Craftsman** | the acceptance tests of the spec | `aidd run test --spec` |
| Review | **Craftsman** | debt: `high` for a blocking finding, `low` for the others | reading only |
| Ship | **Craftsman** | the full `lint`, and the full regression: unit tests and the full acceptance suite | `aidd run lint`, `aidd run test` |
| Scan | **Craftsman** | debt `medium` | `aidd run quality`, only in `craft`, and only when no `medium` debt is open |
| Harden | **Craftsman** | debt `low`, one item for each rule | `aidd run harden`, only in `craft`, once, when no `high` or `medium` debt remains |

`.aiddbot/agents.yaml` sets the agent names, descriptions, adapter paths, and the model tiers of each harness (`deep`, `standard` and `light`, each a model and an effort). The `.aiddbot/agents.local.yaml` of a consumer changes them at `aiddbot update`. `.agents/agents/{id}.md` has the canonical prompt of each agent. `npm run adapt` uses them to make all harness adapters again, and `npm run release` runs it before packaging. An orchestrator spawns each agent when its first step starts, with a fresh context: it never forks its own conversation into the agent, and it never reads the skill of a step that it hands off. It continues an agent with messages only in the same run, where the harness permits it, and stops each agent that it started when the run ends. `craft-lasting-quality` spawns new agents for each repair.

Spec state: `in-progress` from `aidd spec new` until `aidd release` marks it `shipped`. Only one spec is open at a time: `aidd spec new` refuses while a different spec branch exists. The human approves the spec in the conversation before the build starts, unless YOLO mode is active or the spec repairs recorded debt. In YOLO mode, the spec contains only what the request names. A repair that changes what an observer sees is a `fix` with a requirement, not a `refactor`. The agent that gets the approval, usually the orchestrator, journals `approved`, which commits the spec. Until then, `aidd commit`, `aidd eval` and `aidd release` refuse the spec.

Each spec owns its requirements: `R01`, `R02`, … in EARS. Other records cite them as `S0042-R03`. Each requirement has at least one acceptance test. A spec looks forward and never lists shipped requirements. A failed test with the tag of a different spec is a regression, until a requirement of the new spec contradicts it. Shipped specs stay in their folders. `aidd release` writes `.product/PRD.md`: one line for each shipped `feat` spec, by domain. Fixes, refactors and chores change features and do not get a line. The PRD is the product view. Nobody writes it by hand.

The product schemas are in `.product/model/`: one conceptual `model.schema.md`, and `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares each change of an entity, a table or a column as its schema impact, and each endpoint with its statuses in its `Expected URLs and APIs`. The review blocks a shape change that the spec does not declare. Shipping updates the schema documents.

### Journal

Each workflow writes its story in one plain-text daily journal at the repository root: `.aiddbot/journals/YYYY-MM-DD.log`. Git ignores it.

- Each skill commit goes through `aidd commit`, which writes it as `committed`. Thus the journal shows each milestone and its time.
- An orchestrator writes a `handoff` line each time that it sends work to a different agent.
- `aidd commit` and `aidd integrate` refuse code of a project that changed since the last passing `aidd run lint` of that project, or since the last passing `aidd run lint --changed` of each changed file. `aidd release` needs a passing full `lint` of each project on its current files. Documents (`.md`), `.product/` and `.aiddbot/` need no lint. A format that rewrites code needs a new lint.
- The journal is only a story. No code reads it or makes a decision from it: the process state is in the `control.json` of each spec.
- Each line has complete fields with a space between them: time, actor, spec, event, level and summary. The level is `INFO`, `WARN` for a failed run or an amber evaluation, or `ERROR` for a red evaluation or a `blocked` reason. The short columns have a minimum width, so the log reads as a table. The summary stops at 128 characters.
- The core (`node .agents/aidd/aidd.mjs`) writes an entry for each state change that it makes: spec creation, each run and evaluation, configuration, debt changes, shipping, and integration. A run line shows only the projects that apply, each with its result and the summary line of its tool (such as `100 passed` or `1 failed`).
- The model adds only its judgments, with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt or the archetype of each project, each human `approved` proposal or spec (an approved spec is committed by that same command, so its definition never lands before its approval), the `plan` of each implementation before its first edit, the `scaffolded` projects, and a `blocked` reason.

### Evidence

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | The acceptance tests of the spec |
| Regression | a passing full `lint` and `test` at the code that ships | The full system: unit tests and the full acceptance suite |
| Qualification | any recorded status; findings ship as debt after one repair of a failed Security gate | Expert review of gross errors that no linter sees: security, data integrity, accessibility |

Verification runs before qualification. `aidd eval` records each evaluation with its status, revision and current commit in the `control.json` of the spec. A non-green evaluation needs its report first. A green one removes an earlier report. The core commits the record.

- `aidd run` refuses to start while another run is alive, because two runs share ports, databases and logs. Until a run ends, the first line of its log says `RUNNING`: the log is no result yet.
- A green verification needs a passing last spec-scoped run of the `e2e` project, from `aidd run test --spec`, with no code change after it, and an acceptance test with the tag or title `@S0042-R03` for each requirement. A spec without requirements has no tagged test: its verification is green with no run, and the regression proves it.
- Green evaluations leave no report. Amber and red evaluations leave a report with only the failures and findings.
- A red verification returns for repair and runs again, without qualification, until revision 3.
- If the Builder cannot reproduce a failure and does not change it, the failure becomes debt before verification runs again. Thus a green retry never hides it.
- Qualification never blocks shipping. Shipping records each finding as debt: `high` for a blocking one, `low` for a debt one. A failed Security gate gets one repair: its report returns to the Builder one time, then verification and qualification run again.
- `aidd release` needs the regression: a passing full `lint` of each project on the current files, and a passing last unit run of each project and acceptance run of the `e2e` project, from the full `aidd run test`, with no code change after them. A failed regression ships only with `--preexisting <D IDs>`, which names open debt recorded before the spec, or after a red verification at revision 3.
- A failed regression goes to triage. The Craftsman writes each failure into `verification.md` with its cause, its owner and the proposed repair, and records a red verification. Thus it counts as one more revision. The repair stays in the spec, so a regression never reaches the default branch.

| Cause | Owner | Repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior | **Builder** | the production code |
| The acceptance test is wrong, not the behavior | **Builder** | the test, with no weaker assertion |
| A requirement of the spec contradicts a shipped one | the human, then the **Architect** | `Replaces: {global ID}` in the spec; the Builder updates and tags the test |
| Only a product decision can tell | the human | the answer becomes a requirement |
| Open debt recorded before the spec explains it | nobody | ship with `--preexisting <D IDs>` |

- At revision 3, a red verification no longer blocks. Shipping records its current failures, and each failure of the regression, as `high` debt.
- `aidd spec show` lists the gate, and `aidd release` enforces it. The gate also refuses an evaluation with a commit that does not exist, so evidence written by hand never ships. It reads only `control.json` and the reports, so it gives the same answer in a new clone.

### Shipping

Shipping:

1. Makes the spec index again and aligns the schema documents with the code.
2. Updates the debt.
3. Adds each reusable lesson that prevents an error to the project-rules table of the applicable `{project}/AGENTS.md`, as one short row.
4. Runs `aidd run format` and commits its changes.
5. Runs the full `aidd run lint` and `aidd run test`: the regression. A failure goes to triage, and the spec does not ship.
6. Runs `aidd release`. It enforces the gate and gets the version from the spec type: `feat` increases the minor version; `fix`, `refactor` and `chore` increase the patch version. The model adds `--major` only for a breaking change.

The core writes that version into the root `package.json`, the root of its lockfile, and each file in `release.versionFiles` of `.aiddbot/config.json`. It adds the `CHANGELOG.md` entry from the spec title, commits, merges the branch and adds the tag. It never changes the versions of dependencies, tools, schemas, APIs or migrations.

## Records

| Record | Purpose |
| --- | --- |
| `system.md` | The approved greenfield proposal: purpose, users, projects and scaffold commands. It stays as product context. |
| `PRD.md` | One line for each shipped `feat` spec, by domain. `aidd release` writes it. |
| `quality/debt.json` | Open technical debt with priority, evidence and origin. `aidd debt` writes it; `aidd debt list` reads it. |
| `specs/S{nnnn}-{slug}/` | One delivery: `spec.md` (a shorter template for each type but `feat`) with its requirements, its `control.json` that the core writes, and the non-green reports. It stays after shipping. |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/config.json` | The type, the path of each project and its classified commands `lint`, `lint:files`, `format`, `upgrade`, `test`, `test:files`, `start`, `quality` and `harden` (a slot that does not apply has `{"na": "<reason>"}`), and the optional `release.versionFiles`, `run.timeoutMinutes` and `quality.folderEntries`. The core writes it; `aidd run` and `aidd release` read it. |
| `.aiddbot/journals/YYYY-MM-DD.log` | The story of the process by local date, always at the repository root, ignored by Git. Nothing reads it. |

`aiddbot init` makes each shared record above. The core makes each spec folder, and `architect-system-foundation` writes `system.md`. An evaluation report has only findings: a green verification or qualification has no report file. The `control.json` of each spec has its title, domain, state, and the revision, status and commit of each evaluation. Only the core writes it, never a hand edit, so the shipping gate operates in a new clone.

## Language

The records of the system, journal summaries included, use the language of the human, as `.product/system.md` uses it. Commit messages, template headings and technical names stay as they are written. The code, the tests and the texts of the user interface use English, unless the human asks for a different language.

## Quality review

`craft-lasting-quality` follows this route:

`scan-quality`, only when no `medium` debt is open → select the debt of one type → `/build-requested-spec`, again from the selection while debt remains, highest priority first (at most 5 specs in one run)

At most one scan runs in each run, at its start, so that its findings get their repair in the same run. Open `medium` debt skips it: a scan would only find that debt again. There is no scan at the end: the review of each repair records the debt that the repair leaves, and the next scan finds the rest. The only later scan is `harden`: one time, when no `high` or `medium` debt remains, before the selection.

In greenfield, `architect-system-foundation` registers the slots of each project from its `AGENTS.md`. In brownfield, `rule-project` writes the `AGENTS.md` of each project from the code, the same file that a greenfield project gets. It classifies the commands of each slot by their real effect, never by their script name, and records them in `.aiddbot/config.json`.

- `aidd run <kind> [--project]` runs the classified command. `--spec` runs only the tests of the spec in `e2e`. `--changed` runs `lint` or `test` only on the files that the branch changes. When no command is configured, it exits as unavailable; it never uses a stricter invocation or the build lint. A slot marked `{"na": "<reason>"}` reports its reason and passes.
- `format` changes the files in place. `upgrade` increases the dependencies to their latest releases. Neither is evidence.
- Each run keeps its full output in `.aiddbot/runs/{kind}-{project}.log` and stops after `run.timeoutMinutes` (20 by default). The journal records it. On a spec branch, `control.json` records it as the latest run of that kind for each project.
- During coding, the Builder runs `lint --changed` and `test --changed`. Git gives the changed files: the diff from the merge base with the default branch, the uncommitted changes and the new files, never the deleted ones. `lint --changed` gives the changed files to the `lint:files` slot. `test --changed` gives the changed test files, and the test beside each changed source file (`x.ts` → `x.test.ts`), to the `test:files` slot. A project without a `:files` slot runs its full slot. A project with no changed file reports n/a.
- The Builder checks its acceptance tests with `aidd run test --spec`, which runs only the tagged tests of the spec and lists the requirements that have no test. For a spec without requirements, it runs nothing and reports n/a. The Builder never runs the full suites. It runs `quality` only to check a debt repair.
- Quality findings make the code stronger over time. A feature can ship with them. `/craft-lasting-quality` scans them from time to time, never after each spec.
- `lint` reports only errors, so the warnings of the linter are not noise in each build. `harden` reports them, with stricter rules, as the final polish: `craft` runs it once, when no `high` or `medium` debt remains. Each rule becomes one `low` item with all its places, and one repair fixes them all. A false alarm is disabled in the configuration of the project.
- The Craftsman runs `test --spec` in `verify-behavior`, the full `lint` and `test` in `ship-spec` (the unit tests first, then the acceptance suite), and the `quality` list of each project in `scan-quality`. Each quality check is its own entry, never one aggregate that stops at its first failure, and `run` executes each entry also after a failure.
- A `quality` run also lists, in `folders`, each folder of a `shared` or `features` tree with more direct entries than `quality.folderEntries` (16 by default), and, in `subfolders`, each folder inside a feature. In `duplicates`, it lists each block of `quality.duplicateLines` (6 by default) or more logic lines that two or more places of a project repeat, with no blank, comment, import or bracket-only line. It never fails the run. `scan-quality` records each one as debt: it divides a full `shared` folder by technical concern, a feature into two features, and moves a duplicated block to one function (DRY).

Open debt is in `quality/debt.json`. Only `aidd debt add|list|remove` changes it, and each add or remove commits itself. Each item has a priority, its evidence and its origin: the spec whose branch added it, or `scan`. The priority tells the source: `high` for what breaks (a blocking review finding, an unresolved failure), `medium` for a `quality` finding, and `low` for a debt finding of a review or a `harden` finding (origin `scan`). For now, the priority only orders the repairs. A fixed item goes away: at shipping, when the spec cites it and verification is green, or at a scan whose check ran and no longer shows it. There is no separate review report: the journal records when a scan ran.
