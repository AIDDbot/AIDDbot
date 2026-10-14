# Greenfield: scaffold

Work from the repository root, on `chore/foundation`, in a clean working tree. The archetypes of a library are already in the shape of the Blueprint, with their tooling and their tests. Commit each step with `node .agents/aidd/aidd.mjs commit "<message>" {folder}`, so that each step can be reviewed and reverted alone.

Do each step for all the projects at once: the **Architect** does steps 1 and 2 for all of them, then the **Builder** does step 3 for all of them, in one handoff each.

| Step | Commit | Result |
| --- | --- | --- |
| 1 | `chore(scaffold): generate {project}`, one for each project | Each folder copied at the tag of `assets/archetypes.md`, not changed. |
| 2 | `refactor({project}): shape to blueprint`, one for each project | Each `AGENTS.md` with the system data. |
| 3 | `chore(scaffold): register tooling`, one time | Dependencies installed and all tooling slots registered. |

- Step 1: before the first project, copy `foundation/` of the same tag to `.product/archetypes/foundation/` and `model/` to `.product/model/`, and commit them as `chore(scaffold): copy foundation specs and model`. The spec instances are the contract of the system, and the schema documents describe the code of the archetypes.
- Step 2: change only the system data in each `AGENTS.md`: purpose and boundary, connections, ports, and variables. Never move, rename or remove code: each file and each test belongs to a foundation spec.
- Step 3: install with `npm ci`. Never run `upgrade`: the tag pins a tested set of dependencies. Register the slots that each `AGENTS.md` gives, then commit the projects and `.aiddbot/config.json`:

  ```bash
  node .agents/aidd/aidd.mjs config set projects.{project} '{"type":"{type}","path":"{source_root}","commands":{"lint":"npm run lint","lint:files":"npm run lint:files","format":"npm run format","upgrade":"npm run upgrade","test":"npm test","test:files":"npm run test:files","start":"npm start","quality":"npm run quality","harden":"npm run harden"}}'
  ```

  - `type` is the type of the project in `.product/system.md`: `api`, `web`, `cli` or `e2e`.
  - Each of `lint`, `format`, `upgrade`, `test`, `start`, `quality`, and `harden` is a command, a list of commands, or `{"na":"<reason>"}`. The `test` of the `e2e` project is the acceptance suite.
  - `lint:files` and `test:files` take the changed files as arguments, for the Builder. Register each one that the `AGENTS.md` gives. Without one, `run --changed` runs the full slot. An `e2e` project has no `test:files`.
  - Each command runs in `{source_root}`.
  - For a scoped run, the core adds `--grep @S{nnnn}-` to the `test` command of the `e2e` project (after `--` for an npm script).

## After all projects

- The root `package.json` holds the identity of the system: `displayName` (the system name), `description` (one sentence of the purpose), `author` and `homepage` from `.product/system.md`. `aidd release` writes its `version`. The `web` and the `e2e` tests read the identity from this file. Commit it as `chore(scaffold): set the system identity`.
- Journal `node .agents/aidd/aidd.mjs log scaffolded "<the scaffolded projects>"`.
- Never run `rule-project` in greenfield.
- The **Architect** executes `outline-system`, only for the root `AGENTS.md` and its Common stack, because the schema documents came with the archetypes: change only the system name in the title of `model.schema.md`.
- Run `node .agents/aidd/aidd.mjs integrate "chore(foundation): scaffold {system}"` from `chore/foundation`.
- Never run `test` in this phase: the close of `references/close.md` is the only test run of the foundation.

## Failures and reruns

- A copy or an install fails: stop, journal `blocked`, commit nothing partial, and return the failure. It is a defect of the environment or of the library: never repair it in the system.
- Never scaffold when working code exists.
- A committed proposal exists and no code exists: run its commands. Change the proposal only when the human asks.
