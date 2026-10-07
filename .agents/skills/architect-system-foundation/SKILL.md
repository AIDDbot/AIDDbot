---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system. When no code exists, propose it, scaffold it, and deliver it green. When code exists, document it. You can run this skill again at any time to align the documentation with the code.

```text
verdict ─┬─ greenfield ─► propose ─► approve ─► scaffold each project ─► outline-system ─► integrate ─► foundation specs ─► green check
         └─ brownfield ─► outline-system ─► rule-project for each project ─► integrate
```

## Roles and journal

- Route as the **Architect**. Spawn one **Architect** for the full run, or use the one that a calling orchestrator gives you. Continue it with messages. Relay its questions to the human. Stop it only if you started it.
- Spawn the **Builder** at the first scaffold. Spawn one **Craftsman** for all the foundation specs. Use the same **Builder** for all of them.
- Journal with `node .agents/aidd/aidd.mjs log <event> "<summary>"`. Never journal an event of "you" through the **Architect**.

| Event | Who | When | Summary |
| --- | --- | --- | --- |
| `handoff` | you | each time you send work to an agent | `<from> → <to>: <what>` |
| `verdict` | you, one time | before the first path step | `<greenfield\|brownfield>: <the code that settled it>` |
| `select` | **Architect**, one time for each project | when the archetype or the technologies are settled, before an archetype on demand is made | `{project}: <archetype, or on demand: technologies>` |
| `approved` | you, one time | when the human approves, or in YOLO mode | `system proposal` |
| `scaffolded` | you | when all projects are committed | `<the scaffolded projects>` |
| `blocked` | you | when you stop | `<reason>` |

## Verdict

Decide quickly, from working code only. Ignore agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Code exists → brownfield. No code → greenfield.

## Greenfield

### Propose

The **Architect** writes `.product/system.md` from [`system.template.md`](./assets/system.template.md). The system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.

- Read the [foundation specs](./assets/foundation/) first. The proposal and each `AGENTS.md` keep their contracts (ports, variable names, routes). Never set other values for them.
- Ask in short stages, one closed question at a time:
  1. Purpose, users, and needs.
  2. Projects.
  3. For each project, one archetype of its type from [`archetypes.md`](./assets/archetypes.md), as written.
- Do not ask what the request, `README.md`, or an existing proposal already answers.
- Interactive mode: never assume a technology. Before you settle an archetype or a technology, ask about each open choice: language and runtime, framework, package manager, persistence, and the tool of each tooling slot. Offer the catalog archetype or the usual option of [`ecosystems.md`](./assets/ecosystems.md) first.
- YOLO mode: never ask. Use the choices of the request and the usual option for all other choices.
- Archetype on demand: when the human refuses all archetypes of a type, fill [`project.AGENTS.template.md`](./assets/project.AGENTS.template.md) for the technology that the human selects, with [`ecosystems.md`](./assets/ecosystems.md) as guidance. Do this in the proposal, before the scaffold.

Get the approval of the human (not in YOLO mode). Then create the `chore/foundation` branch from the default branch, or continue on it if it exists. Commit the proposal with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.

### Scaffold

Work from the repository root, on `chore/foundation`, in a clean working tree. Complete one project before you start the next. Commit each step with `node .agents/aidd/aidd.mjs commit "<message>" {folder}`, so that each step can be reviewed and reverted alone.

The **Architect** runs the scaffold command and writes the project `AGENTS.md`. The **Builder** changes the code and sets up the tooling.

| Step | Commit | Result |
| --- | --- | --- |
| 1 | `chore(scaffold): generate {project}` | The output of the scaffold command, not changed. |
| 2 | `refactor({project}): shape to blueprint` | The project has the shape of its `AGENTS.md`. |
| 3 | `chore({project}): register tooling` | All tooling slots operate and are registered. |

Step 2, shape to blueprint:

- `{source_root}/AGENTS.md` is the `AGENTS.md` of the archetype (or the one made on demand), with the system data: purpose and boundary, connections, ports, and variables. It keeps the structure of the template. Put a `CLAUDE.md` next to it that contains only `@AGENTS.md`, for harnesses that do not read `AGENTS.md`.
- A third-party template (`npm create`, `ng new`, `cargo new`) comes from the official generator of the framework. Reorganize it into the architecture of that `AGENTS.md`: the composition and its manifest, `core`, features, and `shared` with the contracts of the `core` services.
  - Keep the mechanisms of the framework (injector, router, store, file names) and map them to the concepts.
  - Move folders by technical layer (such as `components/`, `views/`, `stores/`) into `shared` as primitives, or into features.
- Remove each sample of the archetype or the generator that the system does not use (demo pages, images, icons). The branch keeps them recoverable.
- Keep only the package manager of that `AGENTS.md`. Remove the workspace files, lockfiles, and settings of all other package managers (such as `pnpm-workspace.yaml`, `yarn.lock`, or `bun.lock` in an npm project).

Step 3, register tooling:

- Run the `upgrade` command one time, because models remember old releases.
  - If a new major breaks a different tool of the stack, keep the last compatible major. Write the pin and its reason in the technology rules of that `AGENTS.md`.
  - Never pin a major that [`ecosystems.md`](./assets/ecosystems.md) requires. Replace the tool that breaks.
- The ignore file never hides source. Anchor runtime data patterns to the project root, so that no `data` layer folder is ignored.
- Each tooling slot of that `AGENTS.md` operates. If a mandatory slot is missing (`lint`, `unit`, and `start` for runnable projects), install the usual tool of the stack and write it in that `AGENTS.md` first.
- Register the slots, then commit `.aiddbot/config.json` with the project:

  ```bash
  node .agents/aidd/aidd.mjs config set projects.{project} '{"path":"{source_root}","commands":{"lint":"npm run lint","unit":["npm run unit"],"acceptance":{"na":"e2e owns acceptance"}}}'
  ```

  - Each of `lint`, `format`, `upgrade`, `unit`, `acceptance`, and `quality` is a command, a list of commands, or `{"na":"<reason>"}`.
  - Each command runs in `{source_root}`.
  - For a scoped run, the core adds `--grep @S{nnnn}-` to the `acceptance` command (after `--` for an npm script).
- `lint` and `unit` pass before the commit.
- Prove the boundary check: add an import that the architecture forbids, make sure that `lint` fails, then remove the import. A boundary check that does not fail is not done, because a bad configuration passes and checks nothing.

When all projects are committed:

- Never run `rule-project` in greenfield.
- The **Architect** executes `outline-system`.
- Run `node .agents/aidd/aidd.mjs integrate "chore(foundation): scaffold {system}"` from `chore/foundation`.

Rules for the scaffold:

- A tool or a scaffold command fails:
  - Interactive mode: ask the human.
  - YOLO mode: use the usual option of its ecosystem. Write the change in `.product/system.md` and in the project `AGENTS.md`.
  - No fallback operates: stop, journal `blocked`, commit nothing partial, and return the failure.
- Never scaffold when working code exists.
- A committed proposal exists and no code exists: run its commands. Change the proposal only when the human asks.

### Deliver the foundation specs

Deliver these specs one at a time, in this order. For each one, execute `build-requested-spec` with the request "Deliver the foundation spec `{spec}` from `.agents/skills/architect-system-foundation/assets/foundation/{spec}.spec.md`". Give it this **Architect**, the same **Builder**, and the **Craftsman**.

| # | Spec | Condition |
| --- | --- | --- |
| 1 | [`configuration`](./assets/foundation/configuration.spec.md) | always |
| 2 | [`monitoring`](./assets/foundation/monitoring.spec.md) | always |
| 3 | [`layout`](./assets/foundation/layout.spec.md) | the system has a `front-web` |
| 4 | [`health`](./assets/foundation/health.spec.md) | always |
| 5 | [`basic-auth`](./assets/foundation/basic-auth.spec.md) | the system has users, from its proposal or model; ask the human only when this is not clear |
| 6 | [`account`](./assets/foundation/account.spec.md) | `basic-auth` was delivered |
| 7 | [`about`](./assets/foundation/about.spec.md) | the system has a `front-web` |
| 8 | [`record-views`](./assets/foundation/record-views.spec.md) | the system has a `front-web` |

The foundation closes only green:

- After the last spec ships, run `node .agents/aidd/aidd.mjs run lint`, `run unit`, and `run acceptance`. If one fails, journal `blocked` and return the failure.
- Never start a repair or a spec that is not a foundation spec, also for `high` debt.
- Return the debt summary of `node .agents/aidd/aidd.mjs debt list`. Recommend `craft-lasting-quality` if an item is `high`.

## Brownfield

- If a spec is `in-progress`, stop before you document, because its branch owns the pending changes. Journal `blocked`.
- Get the documentation from the code only. Never run lint, tests, acceptance, or quality. Never add debt, because `scan-quality` owns it.
- Create the `chore/document` branch from the default branch. There, the **Architect** executes `outline-system`, then `rule-project` for each project.
- When all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs integrate "docs(system): document foundation"` from `chore/document`. It commits the remaining changes, merges the branch into the default branch, and deletes the branch after a successful merge.

The result is a scaffolded system that ships its foundation specs green, a documented brownfield system, or the reason why this was not possible.
