# Greenfield: scaffold

Work from the repository root, on `chore/foundation`, in a clean working tree. Without Archetype Base, complete one project before you start the next. Commit each step with `node .agents/aidd/aidd.mjs commit "<message>" {folder}`, so that each step can be reviewed and reverted alone.

The **Architect** runs the scaffold command and writes the project `AGENTS.md`. The **Builder** changes the code and sets up the tooling.

| Step | Commit | Result |
| --- | --- | --- |
| 1 | `chore(scaffold): generate {project}` | The output of the scaffold command, not changed. |
| 2 | `refactor({project}): shape to blueprint` | The project has the shape of its `AGENTS.md`. |
| 3 | `chore({project}): register tooling` | All tooling slots operate and are registered. |

## Archetype Base

The three archetypes of Archetype Base are already in the shape of the Blueprint, with their tooling and their tests. Do each step for the three projects at once, not one project after the other: the **Architect** does steps 1 and 2 for the three, then the **Builder** does step 3 for the three, in one handoff each. Steps 1 and 2 keep one commit for each project. The steps stay, with these changes:

- Step 1: copy each folder at the tag of `assets/archetypes.md`. Before the first project, copy `foundation/` of the same tag to `.product/archetypes/foundation/` and `model/` to `.product/model/`, and commit them as `chore(scaffold): copy foundation specs and model`. The spec instances are the contract of the system, and the schema documents describe the code of the archetypes.
- Step 2: change only the system data in each `AGENTS.md`. Never move, rename or remove code: each file and each test belongs to a foundation spec.
- Step 3: install with `npm ci`. Never run `upgrade`: the tag pins a tested set of dependencies. Register the slots that each `AGENTS.md` gives. Commit the three projects and `.aiddbot/config.json` one time, as `chore(scaffold): register tooling`.

## Step 2: shape to blueprint

- `{source_root}/AGENTS.md` is the `AGENTS.md` of the archetype (or the one made on demand), with the system data: purpose and boundary, connections, ports, and variables. It keeps the structure of the template. Put a `CLAUDE.md` next to it that contains only `@AGENTS.md`, for harnesses that do not read `AGENTS.md`.
- A third-party template (`npm create`, `ng new`, `cargo new`) comes from the official generator of the framework. Reorganize it into the architecture of that `AGENTS.md`: the composition and its manifest, `core`, features, and `shared` with the contracts of the `core` services.
  - Keep the mechanisms of the framework (injector, router, store, file names) and map them to the concepts.
  - Move folders by technical layer (such as `components/`, `views/`, `stores/`) into `shared` as primitives, or into features.
- Remove each sample of the archetype or the generator that the system does not use (demo pages, images, icons). The branch keeps them recoverable.
- Keep only the package manager of that `AGENTS.md`. Remove the workspace files, lockfiles, and settings of all other package managers (such as `pnpm-workspace.yaml`, `yarn.lock`, or `bun.lock` in an npm project).

## Step 3: register tooling

- Run the `upgrade` command one time, because models remember old releases.
  - If a new major breaks a different tool of the stack, keep the last compatible major. Write the pin and its reason in the technology rules of that `AGENTS.md`.
  - Never pin a major that `assets/ecosystems.md` requires. Replace the tool that breaks.
- Each project has the configuration file of its `format` tool, also when the defaults are enough, so that the tool never runs without configuration.
- The ignore file never hides source. Anchor runtime data patterns to the project root, so that no `data` layer folder is ignored.
- Each tooling slot of that `AGENTS.md` operates. If a mandatory slot is missing (`lint`, `unit`, and `start` for runnable projects), install the usual tool of the stack and write it in that `AGENTS.md` first.
- Register the slots, then commit `.aiddbot/config.json` with the project:

  ```bash
  node .agents/aidd/aidd.mjs config set projects.{project} '{"path":"{source_root}","commands":{"lint":"npm run lint","format":"npm run format","upgrade":"npm run upgrade","unit":"npm test","start":"npm start","acceptance":{"na":"e2e owns acceptance"},"quality":"npm run quality"}}'
  ```

  - Each of `lint`, `format`, `upgrade`, `unit`, `start`, `acceptance`, and `quality` is a command, a list of commands, or `{"na":"<reason>"}`.
  - Each command runs in `{source_root}`.
  - For a scoped run, the core adds `--grep @S{nnnn}-` to the `acceptance` command (after `--` for an npm script).
- `lint` and `unit` pass before the commit.
- Prove the boundary check: add an import that the architecture forbids, make sure that `lint` fails, then remove the import. A boundary check that does not fail is not done, because a bad configuration passes and checks nothing.

## After all projects

- The root `package.json` holds the identity of the system: `displayName` (the system name), `description` (one sentence of the purpose), `author` and `homepage` from `.product/system.md`. `aidd release` writes its `version`. The `front-web` and the `e2e` tests read the identity from this file. Commit it as `chore(scaffold): set the system identity`.
- Journal `node .agents/aidd/aidd.mjs log scaffolded "<the scaffolded projects>"`.
- Never run `rule-project` in greenfield.
- The **Architect** executes `outline-system`. With Archetype Base, only for the root `AGENTS.md` and its Common stack, because the schema documents came with the archetypes: change only the system name in the title of `model.schema.md`.
- Run `node .agents/aidd/aidd.mjs integrate "chore(foundation): scaffold {system}"` from `chore/foundation`.

## Failures and reruns

- A tool or a scaffold command fails:
  - Interactive mode: ask the human.
  - YOLO mode: use the usual option of its ecosystem. Write the change in `.product/system.md` and in the project `AGENTS.md`.
  - No fallback operates: stop, journal `blocked`, commit nothing partial, and return the failure.
- Never scaffold when working code exists.
- A committed proposal exists and no code exists: run its commands. Change the proposal only when the human asks.
