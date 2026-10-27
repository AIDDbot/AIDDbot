# AIDD workflow

This is the reference of the process. For an overview, read [How it works](./how-it-works.md).

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-initial-foundation` |
| Define a spec now, build it later | `/architect-requested-spec` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Skills

Each executable capability is a skill in `.agents/skills/`. An orchestrator owns its routing and uses primitives. A primitive returns its result and never starts the next stage.

### Orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-initial-foundation`](../.agents/skills/architect-initial-foundation/SKILL.md) | With no project code: propose the system in `.product/system.md` from an archetype of the catalog, copy the whole archetype and close the foundation green. With code: document the architecture. Run it again at any time to align the documentation with the code. |
| [`/architect-requested-spec`](../.agents/skills/architect-requested-spec/SKILL.md) | Define one requested spec as an approved draft in `.product/drafts/`, with no ID and no spec branch, for a later build |
| [`/build-requested-spec`](../.agents/skills/build-requested-spec/SKILL.md) | Deliver one requested spec, or one draft |
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
architect-initial-foundation:
  greenfield:
    - "Architect: propose .product/system.md (purpose, users, one archetype of the catalog), and obtain approval; when no archetype fits, stop"
    - "aidd found <archetype> on chore/foundation: the copy at its pinned tag, the identity, the slots, the install, two commits"
    - "close: run test of each project that is not e2e; the archetype comes proved, and the acceptance suite runs first with the first business spec"
    - "Architect: outline-system for the root AGENTS.md only, then integrate (never rule-project)"
  brownfield:
    - "Architect: outline-system, reading code only (no test or quality runs, no debt)"
    - "Architect: rule-project per project"

architect-requested-spec:
  - "Architect: define-spec as a draft, on the task branch specs/drafts: .product/drafts/{slug}.md, with no ID, no spec branch and the spec new command on its first line"
  - "human approval, then integrate specs/drafts; a rejected draft deletes the branch"

build-requested-spec:
  - "refuse to start on a greenfield system whose foundation close is red"
  - "Architect: define-spec and obtain approval, for a request; a spec that the core made from debt skips it (the core approves it when it makes it)"
  - "a draft skips define-spec: spec new --from the draft, log approved at once, then a commit that deletes the draft"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction; affected unit tests only; one commit per unit (a core folder, a module or a feature slice), then one for its unit tests; the pre-commit hook of the technology lints and formats each commit; after the last unit, layers and crap of each changed project, repairing only what they show in the changed code or the debt of the scope"
      e2e-project: "implement-project authors assigned acceptance-test changes and checks them with the spec-scoped run"
  - Craftsman:
      evaluation: "verify-behavior runs the spec-scoped acceptance tests (feat, fix); review-implementation checks only what lint and tests cannot see (feat, fix, chore); ship-spec runs the full acceptance suite (never the unit tests again: crap ran all of them, and the hook the affected ones at each commit) and triages each failure; a failure too big for the spec becomes high debt and the spec closes; a failing test counts toward revision 3, and only a product question or acceptance that cannot run stops"

craft-lasting-quality:
  - "select the open item of the highest priority that still exists"
  - "high: aidd spec debt makes a minimal fix spec of the high items of one project, approved at once; build-requested-spec with verification and review"
  - "medium: aidd spec debt makes a minimal refactor spec, approved at once; build-requested-spec with no verification and no review"
  - "low: patch, with no spec; aidd debt patch opens the chore task branch with the low items of the project, at most 5; Builder: implement-project on it, crap green and the affected unit tests green at commit, debt remove and integrate"
  - "repeat while debt remains, at most 5 specs, and stop at a spec that ships a failure recorded as debt"
  - "when no debt is open: check layers and crap; a red check gets a Craftsman scan of its mode for that project, then again from select; a green check stops, with no scan"
  - "return the debt list summary"
```

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application code | Two questions and the archetype → `.product/system.md` → approval → `aidd found` → unit close → `outline-system` | A system with the whole archetype: its projects with their `AGENTS.md`, and its foundation (shipped specs, code and tests) |
| Existing application code | `outline-system` → `rule-project` | Documentation, rules, and the missing product records |

The foundation keeps the product records that exist.

A greenfield system is a solution of typed projects: `api`, `web`, `cli` and `e2e`. The projects come from one archetype of the catalog: a whole solution. AIDDbot offers only the archetypes of its catalog: when no archetype fits, the foundation stops and makes none. Archetypes are made with the [Archetype Builder](https://github.com/AIDDbot/archetype-builder). For one `api`, one `web`, one `e2e` and users, the offer is Archetype Web (`web`). For one local `cli` and one `e2e`, it is Archetype CLI (`cli`). Each one ships the code and the tagged tests of every foundation spec, as an AIDDbot system: the shipped specs in `.product/specs/` and the schema documents in `.product/model/`.

An archetype comes proved: its own gate proved it, and the system takes it as it is (Halloween D66). The core owns the mechanics. `.agents/aidd/archetypes.json` pins the tag, the projects and the slots of each archetype. On `chore/foundation`, `aidd found <archetype>` makes two commits:

1. `chore(scaffold): copy {archetype} {tag}`: the whole archetype at its pinned tag, with no change. The system keeps its own `AGENTS.md`, `README.md`, `LICENSE` and `.product/system.md`, and gets each `.gitignore` line that it lacks.
2. `chore(scaffold): set the system identity`: the name, the purpose, the author and the version `0.0.0` from `.product/system.md`, in the root `package.json`, each version file, the lockfile and the title of `model.schema.md`. Also the slots and the version files in `.aiddbot/config.json`. One `npm ci` installs, and its `prepare` installs the pre-commit hook.

`{project}/AGENTS.md` is a map of its project, in short lists: purpose, technology (stack, dependencies, slots), folders, platform (its contract and one line for each `core` folder) and project rules. A `CLAUDE.md` refers to it. The rules of all the projects are in the code rules of `implement-project` (`references/code-rules.md`), one time for the system: only the skills that write or review code read them, and the root `AGENTS.md` points to them. `aidd release` refuses an `AGENTS.md` over 128 lines, with a comment, or with an empty or misplaced section, and writes the index of each `shared` folder (`src/shared/README.md`): each file and its exports (Halloween D59). The architecture of each project: the composition connects `core` and the features through a manifest, `core` and the features never import each other, `shared` has the contracts and folders by technical concern, and `presentation` → `logic` → `data`, where no layer skips the next one (see the [principles](./principles/README.md)).

The close runs only the unit tests of each project that is not `e2e`: the acceptance suite runs first with the first business spec. After `outline-system`, the branch merges. No foundation spec is delivered again: they come as shipped specs in `.product/specs/`. A red `found` or close is a defect of the environment or of the archetype, never repaired in the system. The core gives the first business spec the ID after the last spec. A failed command stops the run, with no partial commit. The foundation never makes working code again.

Run `/architect-initial-foundation` again when the documentation must agree with the code. It refuses while a spec is `in-progress`. It works on `chore/document` and merges it. It writes the structure, the model and the schemas again from the code. It keeps the coding rules that shipping added, and it deletes the records of removed projects.

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
| `feat`, `chore` | a spec file of an archetype | `aidd spec new --from`, approved by its caller | as its type | yes |
| `fix` | high debt | `aidd spec debt`, no approval | yes | yes |
| `refactor` | medium debt | `aidd spec debt`, no approval | no | no |
| patch (no spec) | low debt | the item | no | no |

`.aiddbot/agents.yaml` sets the agent names, descriptions, adapter paths, and the model tiers of each harness (`deep`, `standard` and `light`, each a model and an effort). The `.aiddbot/agents.local.yaml` of a consumer changes them at `aiddbot update`. `.agents/agents/{id}.md` has the canonical prompt of each agent. `npm run adapt` uses them to make all harness adapters again, and `npm run release` runs it before packaging. An orchestrator spawns each agent when its first step starts, with a fresh context: it never forks its own conversation into the agent, and it never reads the skill of a step that it hands off. It continues an agent with messages only in the same run, where the harness permits it, and stops each agent that it started when the run ends. `craft-lasting-quality` spawns new agents for each repair: an agent carried from spec to spec pays for all its earlier context on each turn.

Spec size: at most 9 requirements (one capability that a user sees each), 3 user stories and 5 business rules, in fewer than 100 lines; `aidd log approved` refuses more.

Spec state: `in-progress` from `aidd spec new` until `aidd release` names it in `CHANGELOG.md`, which makes it `shipped`. Only one spec is open at a time: `aidd spec new` refuses while a different spec branch exists. The human approves the spec in the conversation before the build starts, unless YOLO mode is active or the spec is a `refactor` from debt. In YOLO mode, the spec contains only what the request names. A request never makes a `refactor`: only `aidd spec debt` does. The agent that gets the approval, usually the orchestrator, journals `approved`, which commits the spec. Until then, `aidd commit`, `aidd eval` and `aidd release` refuse the spec.

Each spec owns its requirements: `R01`, `R02`, … in EARS. Other records cite them as `S0042-R03`. Each requirement has at least one acceptance test. A spec looks forward and never lists shipped requirements. A failed test with the tag of a different spec is a regression, until a requirement of the new spec contradicts it. Shipped specs stay in their folders. `aidd release` writes `.product/PRD.md`: one line for each shipped `feat` spec, by domain, with its ID and slug and the first sentence of its Problem, up to the first colon or semicolon. Fixes, refactors and chores change features and do not get a line. The PRD is the product view. Nobody writes it by hand.

The product schemas are in `.product/model/`: one conceptual `model.schema.md`, and `{project}.db.schema.md` and `{project}.api.schema.md` for each project with persistence or endpoints. A spec declares each change of an entity, a table or a column as its schema impact, and each endpoint with its statuses in its `Expected URLs and APIs`. The review blocks a shape change that the spec does not declare. Shipping updates the schema documents.

### Journal

Each workflow writes its story in one plain-text daily journal at the repository root: `.aiddbot/logs/YYYY-MM-DD/journal.log`. Git ignores it.

- Each skill commit goes through `aidd commit`, which writes it as `committed`. Thus the journal shows each milestone and its time.
- An orchestrator writes a `handoff` line each time that it sends work to a different agent.
- `aidd commit` runs the pre-commit hook of the technology. When the hook refuses the commit, the command fails with the output of the hook.
- On a spec branch, a commit of type `feat`, `fix`, `refactor` or `chore` has the type of the spec. `aidd commit` refuses another one. A type that is not a type of spec, such as `docs` or `test`, passes.
- The journal is only a story. No code reads it or makes a decision from it: the process state is in the work state of each spec, `.aiddbot/logs/{key}.json`.
- Each line has complete fields with a space between them: time, actor, spec, event, level and summary. The level is `INFO`, `WARN` for a failed run or an amber evaluation, or `ERROR` for a red evaluation or a `blocked` reason. The short columns have a minimum width, so the log reads as a table. The summary stops at 128 characters.
- The core (`node .agents/aidd/aidd.mjs`) writes an entry for each state change that it makes: spec creation, each run and evaluation, configuration, debt changes, shipping, and integration. A run line shows only the projects that apply, each with its result and the summary line of its tool (such as `100 passed` or `1 failed`).
- The model adds only its judgments, with `aidd log`: the `verdict` (greenfield or brownfield), the `select`ed debt or the archetype of each project, each human `approved` spec (an approved spec is committed by that same command, so its definition never lands before its approval), the `plan` of each implementation before its first edit, and a `blocked` reason. The core journals the `scaffolded` projects.

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
| `drafts/{slug}.md` | A spec of `architect-requested-spec` that waits for its build: the text of a spec with `{id}` for its ID, no frontmatter, and its `spec new --from` command on the first line. It has no ID and no branch, so it blocks nothing. `build-requested-spec` makes the spec from it and deletes it. |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/debt.json` | Open technical debt with priority, evidence and origin. `aidd debt` writes it; `aidd debt list` reads it. |
| `.aiddbot/config.json` | The type, the path of each project and its classified commands `upgrade`, `test`, `test:spec`, `start`, `layers` and `crap` (a slot that does not apply has `{"na": "<reason>"}`), and the optional `release.versionFiles`, `run.timeoutMinutes` and `quality.folderEntries`. The core writes it; `aidd run` and `aidd release` read it. |
| `.aiddbot/logs/` | Ignored by Git. `YYYY-MM-DD/`: the history of one local day: `journal.log`, the story of the process, which nothing reads, and `HHMMSS-{kind}-{project}.log`, the full output of each failed run, named by the time it ended. `{kind}-{project}.log`: the full output of the last run (`debt-medium-back.log` for `layers`). `{key}.json`: the work state of a spec, its evaluations and runs. `{key}.verification.md` and `{key}.qualification.md`: the findings of a non-green evaluation. `{key}.regression.md`: the triage of a failed regression. |

`aiddbot init` makes each shared record above. The core makes each spec file, and `architect-initial-foundation` writes `system.md`. `.product/` holds the product, what it is and what it does; `.aiddbot/` holds the process, how it is built. An evaluation report is process: it has only findings, a green verification or qualification has no report file, and after shipping each finding that matters is a debt item. The work state of each spec has the revision, status and commit of each evaluation and the latest run of each kind. Only the core writes it, never a hand edit. The identity of a spec is only in its file, and a spec is shipped when `CHANGELOG.md` names it.

## Language

AIDDbot talks in the language of the human. The documents use ASD-STE100, in English unless the human chooses a different language. The code is in English. The Assistant section of the root `AGENTS.md` records the three.

## Quality review

`craft-lasting-quality` follows this route:

high debt → `fix` spec → medium debt → `refactor` spec → low debt → patch, again while debt remains (at most 5 specs in one run) → check: `aidd run layers` and `aidd run crap` green for each project, else a scan of the red check (`layers` → medium, `crap` → low) for the red project, and again from high. No scan runs on a green check (Halloween D51).

| Debt | Comes from | Repaired by |
| --- | --- | --- |
| `high` | the review; a triage that the spec cannot solve | a `fix` spec: branch, implement, verify, review, ship |
| `medium` | `layers`: layers, duplicates, folder size | a `refactor` spec: branch, implement with the check green, ship |
| `low` | `crap`: complexity, test coverage | a patch: a task branch for the `low` items of one project, implement until the `crap` of the project is green, integrate; no spec |

`aidd spec debt <D ID>` makes the minimal spec of a `high` or `medium` item: the item is its definition, so no model writes it. It also repairs the other open items of the same priority and project, at most five: each item names its project with `debt add --project`; one with no project goes alone. Neither waits for an approval: the items come from evidence, and a product question still stops the delivery (Halloween D48). The rule that found the debt sets its level, so no one judges "big" or "small". A patch runs only its affected unit tests, in the hook: the ship of the next spec catches a regression (an accepted risk). A scan runs only for a red check, and only when no debt is open. A patch repairs until the `crap` of its project is green, also the test coverage that a failing limit hid: thus no scan and no second patch follow it. When no debt is open, the core checks `layers` and `crap` of each project; only a red one gets a scan again.

In greenfield, `architect-initial-foundation` registers the slots of each project from its `AGENTS.md`. In brownfield, `rule-project` writes the `AGENTS.md` of each project from the code, the same file that a greenfield project gets. It classifies the commands of each slot by their real effect, never by their script name, and records them in `.aiddbot/config.json`.

- `aidd run <kind> [--project]` runs the classified command. `--spec` runs the `test:spec` slot of each `e2e` with only the tag of the spec, such as `@S0001-`: the slot ends in the filter flag of its runner, so the core never knows the runner. When no command is configured, it exits as unavailable; it never uses a stricter invocation or the lint of the hook. A slot marked `{"na": "<reason>"}` reports its reason and passes.
- `upgrade` increases the dependencies to their latest releases. It is not evidence, and neither is `crap`.
- Each run keeps its full output in `.aiddbot/logs/{kind}-{project}.log` and stops after `run.timeoutMinutes` (20 by default). The next run of the slot writes that log again, so a failed run also keeps a copy in the folder of its day; the result of the run gives its path as `failure`. The journal records it. On a spec branch, the work state of the spec records it as the latest run of that kind for each project.
- During coding, the pre-commit hook of the technology runs the unit tests that each commit affects. A unit test is fast and proves logic only: no disk, database, network or process. A commit of specs or docs only runs no test.
- The Builder checks its acceptance tests with `aidd run test --spec`, which runs only the tagged tests of the spec and lists the requirements that have no test. A `fix` of a failing test has no requirements of its own: it runs the test that the spec cites, such as `@S0042-R03`, which `aidd spec debt` copies from the evidence of the item. For a spec with no requirements that cites none, it runs nothing and reports n/a. The Builder never runs the full suites. After the last unit, it runs `layers` and `crap`, and repairs only what they show in the code that it changed or in the debt of its scope.
- Quality findings make the code stronger over time. A feature can ship with them. `/craft-lasting-quality` scans them from time to time, never after each spec.
- `layers` runs the dependency rules of the linter, never the commit hook. `crap` runs the complexity rules and the test coverage: `craft` runs it once, when no `high` or `medium` debt remains. Each rule becomes one `low` item with all its places, and one repair fixes them all. A false alarm is disabled in the configuration of the project.
- The Craftsman runs `test --spec` in `verify-behavior`, the full acceptance suite in `ship-spec`, and the `layers` list of each project in `scan-quality`. Each check is its own entry, never one aggregate that stops at its first failure, and `run` executes each entry also after a failure.
- A `layers` run also lists, in `folders`, each folder of a `core`, `shared` or `features` tree with more direct entries than `quality.folderEntries` (16 by default), and, in `subfolders`, each folder inside a feature. In `duplicates`, it lists each block of `quality.duplicateLines` (6 by default) or more logic lines that two or more places of a project repeat, with no blank, comment, import or bracket-only line. Each one makes the layers run of its project red, as a finding of its lint does. `scan-quality` records each one as debt: it divides a full `core` or `shared` folder by technical concern, a feature into two features, and moves a duplicated block to one function (DRY).

Open debt is in `.aiddbot/debt.json`. Only `aidd debt add|list|remove` changes it, and each add or remove commits itself. Each item has a priority, its evidence, its origin (the spec whose branch added it, or `scan`), and its project, which a `medium` item always names. The priority tells the source and the repair: `high` for a review finding or a failure too big for its spec, `medium` for a `layers` finding, and `low` for a `crap` finding. A fixed item goes away: at shipping, when the spec cites it and proves its repair, after a patch, or at a scan whose check ran and no longer shows it. There is no separate review report: the journal records when a scan ran.
