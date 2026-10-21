# AIDD workflow

This is the reference of the process. For an overview, read [How it works](./how-it-works.md).

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |
| Build the Foundation of an archetype on its Bedrock: its foundation specs, in order | `/build-archetype-foundation` |

## Skills

Each executable capability is a skill in `.agents/skills/`. An orchestrator owns its routing and uses primitives. A primitive returns its result and never starts the next stage.

### Orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](../.agents/skills/architect-system-foundation/SKILL.md) | With no project code: propose the system in `.product/system.md` from an archetype of the catalog, copy the whole archetype and close the foundation green. With code: document the architecture. Run it again at any time to align the documentation with the code. |
| [`/build-requested-spec`](../.agents/skills/build-requested-spec/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](../.agents/skills/craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |
| [`/build-archetype-foundation`](../.agents/skills/build-archetype-foundation/SKILL.md) | Build the Foundation of an archetype on its Bedrock, one foundation spec at a time, each with its quality repair, to zero debt |

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
    - "Architect: propose .product/system.md as typed projects from one archetype, and obtain approval; when no archetype fits, stop"
    - "Architect: on chore/foundation, copy the whole archetype with its shipped specs and schema documents; Builder: install and register the slots"
    - "Architect: outline-system for the root AGENTS.md only, then integrate (never rule-project)"
    - "close only when test passes"
  brownfield:
    - "Architect: outline-system, reading code only (no test or quality runs, no debt)"
    - "Architect: rule-project per project"

build-requested-spec:
  - "refuse to start on a greenfield system whose foundation close is red"
  - "Architect: define-spec and obtain approval, for a request; a spec that the core made from debt skips it (the core approves it when it makes it)"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction; affected unit tests only; the pre-commit hook of the technology lints and formats each commit; before it returns, layers and crap of each changed project green"
      e2e-project: "implement-project authors assigned acceptance-test changes and checks them with the spec-scoped run"
  - "trust, then check: the orchestrator runs layers and crap of each changed project; red goes back to the Builder, at most 2 repairs; what stays red ships as debt"
  - Craftsman:
      evaluation: "verify-behavior runs the spec-scoped acceptance tests (feat, fix); review-implementation checks only what lint and tests cannot see (feat, fix, chore); ship-spec runs the full acceptance suite (never the unit tests again: crap ran all of them, and the hook the affected ones at each commit) and triages each failure; a failure too big for the spec becomes high debt and the spec closes; a failing test counts toward revision 3, and only a product question or acceptance that cannot run stops"

craft-lasting-quality:
  - "select the open item of the highest priority that still exists"
  - "high: aidd spec debt makes a minimal fix spec of the high items of one project, approved at once; build-requested-spec with verification and review"
  - "Craftsman: scan-quality, once, only when no high debt is open; it records medium debt (layers, duplicates, folder size)"
  - "medium: aidd spec debt makes a minimal refactor spec, approved at once; build-requested-spec with no verification and no review"
  - "Craftsman: scan-quality in its low mode, once, only when no high or medium debt is open; it records low debt (complexity), one item for each rule"
  - "low: patch, with no spec; Builder: implement-project on a chore task branch, crap green and the affected unit tests green at commit, debt remove and integrate"
  - "repeat while debt remains, at most 5 specs, and stop at a spec that ships a failure recorded as debt"
  - "return the debt list summary"

build-archetype-foundation:
  - "read the state from the files; a spec file with a shipped spec is done, and an unshipped one continues with its next skill"
  - "for each spec file, in order: build-requested-spec approved in advance, then the core check (run layers, run crap): all green with no open debt goes to the next spec, else craft-lasting-quality; the next spec starts only with zero open debt"
  - "after the last spec: craft-lasting-quality until its check (layers and crap green for each project) is green"
  - "return one row for each shipped spec, with its version, debt, repairs and times"
```

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application code | Staged questions → `.product/system.md` → approval → copy of the archetype → `outline-system` → green close | A green system: each project with its `AGENTS.md`, and the foundation of the archetype (its shipped specs, code and tests) proved by the close |
| Existing application code | `outline-system` → `rule-project` | Documentation, rules, and the missing product records |

The foundation keeps the product records that exist.

A greenfield system is a solution of typed projects: `api`, `web`, `cli` and `e2e`. The projects come from one archetype of the catalog: a whole solution. AIDDbot offers only the archetypes of its catalog: when no archetype fits, the foundation stops and makes none. Archetypes are made with the [Archetype Builder](https://github.com/AIDDbot/archetype-builder). For one `api`, one `web`, one `e2e` and users, the first offer is Archetype Base (`AIDDbot/archetype-base`): three projects that ship with the code and the tagged tests of every foundation spec, as an AIDDbot system: the shipped specs in `.product/specs/` and the schema documents in `.product/model/`. For one local `cli` and one `e2e`, the first offer is Archetype CLI (`AIDDbot/archetype-cli`), in the same form.

After the approval, the Architect works on `chore/foundation`, each step for all the projects of the archetype at once:

1. The copy of the whole archetype into the repository, with no change (`chore(scaffold): copy`): the workspace root, the projects, and `.product/specs/`, `.product/model/` and `.product/PRD.md`.
2. The system data in each `AGENTS.md` (`refactor: shape to blueprint`).
3. The tooling, one `chore(scaffold): register tooling` for all the projects.

In the shape, `{project}/AGENTS.md` has the architecture and the data of its project, in short lists: technology, tooling, architecture (the containers, the layers and the tests of its type), folders, primitives, technology and project rules, and connections. When projects share technology, `outline-system` moves the tooling and technology rules that they repeat to the Common stack of the root `AGENTS.md`, one time. The primitives index lists only the helpers that two or more features use; a helper of one feature follows a naming convention and has no row. A `CLAUDE.md` refers to it. The system rules and the code rules are in the Blueprint of the root `AGENTS.md`, one time for the system. The architecture of each project: the composition connects `core` and the features through a manifest, `core` and the features never import each other, `shared` has the contracts and folders by technical concern, and `presentation` → `logic` → `data`, where no layer skips the next one (see the [principles](./principles/README.md)).

The Builder installs with one `npm ci` at the root, which also installs the pre-commit hook, and registers each slot in `.aiddbot/config.json`. After `outline-system`, the branch merges. No foundation spec is delivered again: they come as shipped specs in `.product/specs/`, the close is the only evidence, and a red close is a defect of the environment or of the archetype, never repaired in the system. The core gives the first business spec the ID after the last spec. A failed command stops the run, with no partial commit. The foundation never makes working code again.

Run `/architect-system-foundation` again when the documentation must agree with the code. It refuses while a spec is `in-progress`. It works on `chore/document` and merges it. It writes the structure, the model and the schemas again from the code. It keeps the coding rules that shipping added, and it deletes the records of removed projects.

`aiddbot init` prepares all that a delivery needs before a skill runs: `.gitignore`, `README.md`, `LICENSE`, a root `package.json` at `0.1.0` with the product version, `AGENTS.md` (from the template of `outline-system`, which fills it later), `.aiddbot/counters.yaml`, an empty `.aiddbot/config.json`, the empty debt register `debt.json`, and the first event of the journal. It does not repeat the skill routing or the commands of the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, domain, branch, the spec with its requirements, schema impact, and approval |
| Build | **Builder** | `implement-project` for each project that changes: code, unit tests, and the necessary E2E test changes. It tests only the affected unit tests, and it runs the tests of the spec to check its E2E work |
| Prove and ship | **Craftsman** | `verify-behavior` runs the acceptance tests of the spec, then `review-implementation`, then `ship-spec`, which runs all the tests before the release |

Each step checks only its own work. `crap` runs all the unit tests; only the ship runs the full acceptance suite. Basic lint, format and the affected unit tests are not part of AIDDbot: the technology of each project runs them in its pre-commit hook. AIDDbot owns only what the technology cannot know: the logical layers, the test coverage and the complexity.

| Step | Owner | Unit tests | E2E tests | Other check | On failure | Command |
| --- | --- | --- | --- | --- | --- | --- |
| Build | **Builder** | affected, at commit | — | lint, format and types at commit | fix it on the fly | the pre-commit hook, and `aidd run test --spec` as a check |
| Verify | **Craftsman** | — | affected | — | triage | `aidd run test --spec` |
| Review | **Craftsman** | — | — | security, accessibility… | `high` debt | reading only |
| Ship | **Craftsman** | all | all | — | triage | `aidd run test` |
| Scan | **Craftsman** | — | — | logical layers, duplicates, folder size | `medium` debt | `aidd run layers`, only in `craft`, when no `high` debt is open |
| Harden | **Craftsman** | — | — | complexity, test coverage | `low` debt, one item for each rule | `aidd run crap`, only in `craft`, when no `high` or `medium` debt is open |

The type of the spec sets its steps. The origin sets the definition: a request has a spec that the human approves; debt has its item. The behavior sets the verification: only a `feat` and a `fix` change it.

| Type | Comes from | Definition | Verify | Review |
| --- | --- | --- | --- | --- |
| `feat`, `fix` | a request | `define-spec`, human approval | yes | yes |
| `chore` | a request | `define-spec`, human approval | no | yes |
| `fix` | high debt | `aidd spec debt`, no approval | yes | yes |
| `refactor` | medium debt | `aidd spec debt`, no approval | no | no |
| patch (no spec) | low debt | the item | no | no |

`.aiddbot/agents.yaml` sets the agent names, descriptions, adapter paths, and the model tiers of each harness (`deep`, `standard` and `light`, each a model and an effort). The `.aiddbot/agents.local.yaml` of a consumer changes them at `aiddbot update`. `.agents/agents/{id}.md` has the canonical prompt of each agent. `npm run adapt` uses them to make all harness adapters again, and `npm run release` runs it before packaging. An orchestrator spawns each agent when its first step starts, with a fresh context: it never forks its own conversation into the agent, and it never reads the skill of a step that it hands off. It continues an agent with messages only in the same run, where the harness permits it, and stops each agent that it started when the run ends. `craft-lasting-quality` spawns new agents for each repair, and `build-archetype-foundation` stops the agents of each spec and repair before the next one: an agent carried from spec to spec pays for all its earlier context on each turn.

Spec size: at most 9 requirements (one capability that a user sees each), 3 user stories and 5 business rules, in fewer than 100 lines; `aidd log approved` refuses more.

Spec state: `in-progress` from `aidd spec new` until `aidd release` names it in `CHANGELOG.md`, which makes it `shipped`. Only one spec is open at a time: `aidd spec new` refuses while a different spec branch exists. The human approves the spec in the conversation before the build starts, unless YOLO mode is active or the spec is a `refactor` from debt. In YOLO mode, the spec contains only what the request names. A request never makes a `refactor`: only `aidd spec debt` does. The agent that gets the approval, usually the orchestrator, journals `approved`, which commits the spec. Until then, `aidd commit`, `aidd eval` and `aidd release` refuse the spec.

Each spec owns its requirements: `R01`, `R02`, … in EARS. Other records cite them as `S0042-R03`. Each requirement has at least one acceptance test. A spec looks forward and never lists shipped requirements. A failed test with the tag of a different spec is a regression, until a requirement of the new spec contradicts it. Shipped specs stay in their folders. `aidd release` writes `.product/PRD.md`: one line for each shipped `feat` spec, by domain. Fixes, refactors and chores change features and do not get a line. The PRD is the product view. Nobody writes it by hand.

The product schemas are in `.product/model/`: one conceptual `model.schema.md`, and `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares each change of an entity, a table or a column as its schema impact, and each endpoint with its statuses in its `Expected URLs and APIs`. The review blocks a shape change that the spec does not declare. Shipping updates the schema documents.

### Journal

Each workflow writes its story in one plain-text daily journal at the repository root: `.aiddbot/logs/YYYY-MM-DD.log`. Git ignores it.

- Each skill commit goes through `aidd commit`, which writes it as `committed`. Thus the journal shows each milestone and its time.
- An orchestrator writes a `handoff` line each time that it sends work to a different agent.
- `aidd commit` runs the pre-commit hook of the technology. When the hook refuses the commit, the command fails with the output of the hook.
- The journal is only a story. No code reads it or makes a decision from it: the process state is in the work state of each spec, `.aiddbot/logs/{key}.json`.
- Each line has complete fields with a space between them: time, actor, spec, event, level and summary. The level is `INFO`, `WARN` for a failed run or an amber evaluation, or `ERROR` for a red evaluation or a `blocked` reason. The short columns have a minimum width, so the log reads as a table. The summary stops at 128 characters.
- The core (`node .agents/aidd/aidd.mjs`) writes an entry for each state change that it makes: spec creation, each run and evaluation, configuration, debt changes, shipping, and integration. A run line shows only the projects that apply, each with its result and the summary line of its tool (such as `100 passed` or `1 failed`).
- The model adds only its judgments, with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt or the archetype of each project, each human `approved` proposal or spec (an approved spec is committed by that same command, so its definition never lands before its approval), the `plan` of each implementation before its first edit, the `scaffolded` projects, and a `blocked` reason.

### Evidence

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | The acceptance tests of the spec |
| Regression | a passing full acceptance run at the code that ships, or each failure recorded as open `high` debt | The full acceptance suite; the unit tests are proved by `crap` and the hook |
| Qualification | any recorded status; findings ship as `high` debt after one repair of a failed Security or Requirements gate | Expert review of gross errors that no linter and no test sees: security, data integrity, accessibility |

Verification runs before qualification. A `chore` has no verification, and a `refactor` has neither: `aidd eval` refuses them, and the gate does not ask for them. `aidd eval` records each evaluation with its status, revision and current commit in the work state of the spec, `.aiddbot/logs/{key}.json`. A non-green evaluation needs its report first. A green one removes an earlier report. The core commits nothing: Git ignores the work state.

- `aidd run` refuses to start while another run is alive, because two runs share ports, databases and logs. Until a run ends, the first line of its log says `RUNNING`: the log is no result yet.
- A green verification needs a passing last spec-scoped run of the `e2e` project, from `aidd run test --spec`, with no code change after it, and an acceptance test with the tag or title `@S0042-R03` for each requirement. A spec without requirements has no tagged test: its review and the regression prove it.
- Green evaluations leave no report. Amber and red evaluations leave a report with only the failures and findings.
- A red verification returns for repair and runs again, without qualification, until revision 3.
- If the Builder cannot reproduce a failure and does not change it, the failure becomes `high` debt before verification runs again. Thus a green retry never hides it.
- Qualification never blocks shipping. Shipping records each finding as `high` debt. A failed Security or Requirements gate gets one repair: its report returns to the Builder one time, then verification and qualification run again.
- `aidd release` needs the regression: a passing last acceptance run of each `e2e` project (`aidd run test --project {e2e}`), with no code change after it. It never needs a unit run (Halloween D49). A failed regression ships only with `--debt <D IDs>`, which names open `high` debt that records each failure.
- The ship triages each failure of the full run. The Craftsman writes it into `.aiddbot/logs/{key}.regression.md` with its cause, its owner and the proposed repair. A repair of the Builder stays in the spec, so a regression it can repair never reaches the default branch. A partial test run can miss a change, such as a changed signature: the ship catches it.

| Cause | Owner | Repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior | **Builder** | the production code |
| The acceptance test is wrong, not the behavior | **Builder** | the test, with no weaker assertion |
| A requirement of the spec contradicts a shipped one | the human, then the **Architect** | `Replaces: {global ID}` in the spec; the Builder updates and tags the test |
| Only a product decision can tell | the human | the answer becomes a requirement |
| Too big for the spec: it failed before, its repair is outside the scope, or the Builder could not repair it | debt | a `high` item; ship with `--debt <D IDs>` |

- A spec solves its problem as well as it can, and then it closes. Debt is debt.
- At revision 3, a red verification no longer blocks. Shipping records its current failures as `high` debt.
- `aidd spec show` lists the gate, and `aidd release` enforces it. The gate also refuses an evaluation with a commit that does not exist, so evidence written by hand never ships. It reads only the work state and the reports. The work state is local: a spec resumed in a new clone repeats its evaluations.

### Shipping

Shipping:

1. Makes the spec index again and aligns the schema documents with the code.
2. Updates the debt.
3. Adds each reusable lesson that prevents an error to the project-rules table of the applicable `{project}/AGENTS.md`, as one short row.
4. Runs the full `aidd run test`, because the release needs it at the current code, and triages each failure.
5. Runs `aidd release`. It enforces the gate and gets the version from the spec type: `feat` increases the minor version; `fix`, `refactor` and `chore` increase the patch version. The model adds `--major` only when the request or the spec asks for a major version.

The core writes that version into the root `package.json`, the root of its lockfile, and each file in `release.versionFiles` of `.aiddbot/config.json`. It adds the `CHANGELOG.md` entry from the spec title, commits, merges the branch and adds the tag. It never changes the versions of dependencies, tools, schemas, APIs or migrations.

## Records

| Record | Purpose |
| --- | --- |
| `system.md` | The approved greenfield proposal: purpose, users, projects and scaffold commands. It stays as product context. |
| `PRD.md` | One line for each shipped `feat` spec, by domain. `aidd release` writes it. |
| `specs/{type}/S{nnnn}-{slug}.md` | One delivery, one file in the folder of its type, as its branch (a shorter template for each type but `feat`), with its identity in the frontmatter and the title, and its requirements. It stays after shipping. |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/debt.json` | Open technical debt with priority, evidence and origin. `aidd debt` writes it; `aidd debt list` reads it. |
| `.aiddbot/config.json` | The type, the path of each project and its classified commands `upgrade`, `test`, `test:spec`, `start`, `layers` and `crap` (a slot that does not apply has `{"na": "<reason>"}`), and the optional `release.versionFiles`, `run.timeoutMinutes` and `quality.folderEntries`. The core writes it; `aidd run` and `aidd release` read it. |
| `.aiddbot/logs/` | Ignored by Git. `YYYY-MM-DD.log`: the story of the process by local date; nothing reads it. `{kind}-{project}.log`: the full output of the last run (`debt-medium-back.log` for `layers`). `{key}.json`: the work state of a spec, its evaluations and runs. `{key}.verification.md` and `{key}.qualification.md`: the findings of a non-green evaluation. `{key}.regression.md`: the triage of a failed regression. |

`aiddbot init` makes each shared record above. The core makes each spec file, and `architect-system-foundation` writes `system.md`. `.product/` holds the product, what it is and what it does; `.aiddbot/` holds the process, how it is built. An evaluation report is process: it has only findings, a green verification or qualification has no report file, and after shipping each finding that matters is a debt item. The work state of each spec has the revision, status and commit of each evaluation and the latest run of each kind. Only the core writes it, never a hand edit. The identity of a spec is only in its file, and a spec is shipped when `CHANGELOG.md` names it.

## Language

The records of the system, journal summaries included, use the language of `.product/system.md`, never the language of a request. `system.md` takes the language of the human when it is written. Commit messages, template headings and technical names stay as they are written. The code, the tests and the texts of the user interface use English, unless the human asks for a different language.

## Quality review

`craft-lasting-quality` follows this route:

high debt → `fix` spec → `scan-quality` (`layers`) → medium debt → `refactor` spec → `scan-quality` (`crap`) → low debt → patch, again while debt remains (at most 5 specs in one run) → check: `aidd run layers` and `aidd run crap` green for each project, else a scan of the red one

| Debt | Comes from | Repaired by |
| --- | --- | --- |
| `high` | the review; a triage that the spec cannot solve | a `fix` spec: branch, implement, verify, review, ship |
| `medium` | `layers`: layers, duplicates, folder size | a `refactor` spec: branch, implement with the check green, ship |
| `low` | `crap`: complexity, test coverage | a patch: a task branch for the `low` items of one project, implement until the `crap` of the project is green, integrate; no spec |

`aidd spec debt <D ID>` makes the minimal spec of a `high` or `medium` item: the item is its definition, so no model writes it. It also repairs the other open items of the same priority and project, at most five: each item names its project with `debt add --project`; one with no project goes alone. Neither waits for an approval: the items come from evidence, and a product question still stops the delivery (Halloween D48). The rule that found the debt sets its level, so no one judges "big" or "small". A patch runs only its affected unit tests, in the hook: the ship of the next spec catches a regression (an accepted risk). Each scan runs at most one time in each run, and only when no debt of a higher level is open. A patch repairs until the `crap` of its project is green, also the test coverage that a failing limit hid: thus no scan and no second patch follow it. When no debt is open, the core checks `layers` and `crap` of each project; only a red one gets a scan again.

In greenfield, `architect-system-foundation` registers the slots of each project from its `AGENTS.md`. In brownfield, `rule-project` writes the `AGENTS.md` of each project from the code, the same file that a greenfield project gets. It classifies the commands of each slot by their real effect, never by their script name, and records them in `.aiddbot/config.json`.

- `aidd run <kind> [--project]` runs the classified command. `--spec` runs the `test:spec` slot of each `e2e` with only the tag of the spec, such as `@S0001-`: the slot ends in the filter flag of its runner, so the core never knows the runner. When no command is configured, it exits as unavailable; it never uses a stricter invocation or the lint of the hook. A slot marked `{"na": "<reason>"}` reports its reason and passes.
- `upgrade` increases the dependencies to their latest releases. It is not evidence, and neither is `crap`.
- Each run keeps its full output in `.aiddbot/logs/{kind}-{project}.log` and stops after `run.timeoutMinutes` (20 by default). The journal records it. On a spec branch, the work state of the spec records it as the latest run of that kind for each project.
- During coding, the pre-commit hook of the technology runs the unit tests that each commit affects. A unit test is fast and proves logic only: no disk, database, network or process. A commit of specs or docs only runs no test.
- The Builder checks its acceptance tests with `aidd run test --spec`, which runs only the tagged tests of the spec and lists the requirements that have no test. A `fix` of a failing test has no requirements of its own: it runs the test that the spec cites, such as `@S0042-R03`, which `aidd spec debt` copies from the evidence of the item. For a spec with no requirements that cites none, it runs nothing and reports n/a. The Builder never runs the full suites. It runs `layers` or `crap` only to check a debt repair.
- Quality findings make the code stronger over time. A feature can ship with them. `/craft-lasting-quality` scans them from time to time, never after each spec.
- `layers` runs the dependency rules of the linter, never the commit hook. `crap` runs the complexity rules and the test coverage: `craft` runs it once, when no `high` or `medium` debt remains. Each rule becomes one `low` item with all its places, and one repair fixes them all. A false alarm is disabled in the configuration of the project.
- The Craftsman runs `test --spec` in `verify-behavior`, the full acceptance suite in `ship-spec`, and the `layers` list of each project in `scan-quality`. Each check is its own entry, never one aggregate that stops at its first failure, and `run` executes each entry also after a failure.
- A `layers` run also lists, in `folders`, each folder of a `core`, `shared` or `features` tree with more direct entries than `quality.folderEntries` (16 by default), and, in `subfolders`, each folder inside a feature. In `duplicates`, it lists each block of `quality.duplicateLines` (6 by default) or more logic lines that two or more places of a project repeat, with no blank, comment, import or bracket-only line. Each one makes the layers run of its project red, as a finding of its lint does. `scan-quality` records each one as debt: it divides a full `core` or `shared` folder by technical concern, a feature into two features, and moves a duplicated block to one function (DRY).

Open debt is in `.aiddbot/debt.json`. Only `aidd debt add|list|remove` changes it, and each add or remove commits itself. Each item has a priority, its evidence, its origin (the spec whose branch added it, or `scan`), and its project, which a `medium` item always names. The priority tells the source and the repair: `high` for a review finding or a failure too big for its spec, `medium` for a `layers` finding, and `low` for a `crap` finding. A fixed item goes away: at shipping, when the spec cites it and proves its repair, after a patch, or at a scan whose check ran and no longer shows it. There is no separate review report: the journal records when a scan ran.
