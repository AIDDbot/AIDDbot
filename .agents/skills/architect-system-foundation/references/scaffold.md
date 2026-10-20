# Greenfield: scaffold

Work from the repository root, on `chore/foundation`, in a clean working tree. The archetype is already in the shape of the Blueprint, with its tooling and its tests. Commit each step with `node .agents/aidd/aidd.mjs commit "<message>" [<path>...]`, so that each step can be reviewed and reverted alone.

The **Architect** does steps 1 and 2, then the **Builder** does step 3, in one handoff each.

| Step | Commit | Result |
| --- | --- | --- |
| 1 | `chore(scaffold): copy {archetype}`, one time | The workspace of the archetype at the tag of `assets/archetypes.md`, not changed. |
| 2 | `refactor({project}): shape to blueprint`, one for each project | Each `AGENTS.md` with the system data. |
| 3 | `chore(scaffold): register tooling`, one time | Dependencies installed, hook active, and all tooling slots registered. |

- Step 1: copy the whole archetype with its copy command into a temporary folder outside the repository. Then, into the repository:
  - Move the workspace root (`package.json`, `package-lock.json`, the tool configuration, the debt checks (`.lint/`), the hook folder, `.gitattributes`) and the project folders.
  - Move `.product/specs/`, `.product/model/` and `.product/PRD.md` of the archetype into `.product/`. They are shipped specs, as in any system: the tests carry their tags, and the schema documents describe the code. Leave out the `.product/system.md` of the archetype: the approved proposal is the one of the system.
  - Merge `.gitignore`: add each line of the archetype that the system does not have. Never remove a line of the system.
  - Leave out the `AGENTS.md`, `CLAUDE.md`, `README.md` and `LICENSE` of the archetype root: the system has its own.
  - Delete the temporary folder.
- Step 2: change only the system data in each `AGENTS.md`: purpose and boundary, connections, ports, and variables. Never move, rename or remove code: each file and each test belongs to a foundation spec.
- Step 3: install with one `npm ci` at the root. Its `prepare` script installs the pre-commit hook. Never run `upgrade`: the tag pins a tested set of dependencies. Register the slots that each `AGENTS.md` gives, then commit `.aiddbot/config.json`:

  ```bash
  node .agents/aidd/aidd.mjs config set projects.{project} '{"type":"{type}","path":"{source_root}","commands":{"upgrade":"npm --prefix ../.. run upgrade","test":"npm test","test:spec":"npm run test:spec","start":"npm start","layers":"npm run layers","crap":"npm run crap"}}'
  ```

  - `type` is the type of the project in `.product/system.md`: `api`, `web`, `cli` or `e2e`.
  - Each slot is a command, a list of commands, or `{"na":"<reason>"}`, as the `AGENTS.md` of the project gives it. The `test` of the `e2e` project is the acceptance suite; `test:spec` is `n/a` in the other projects.
  - Lint, format and the affected unit tests are no slots: the pre-commit hook of the archetype runs them at each commit.
  - Each command runs in `{source_root}`.
  - For a scoped run, the core adds only the tag, such as `@S{nnnn}-`, to the `test:spec` command of the `e2e` project (after `--` for an npm script): that command ends in the filter flag of its runner.

## After all projects

- The root `package.json` holds `name` (the system name in kebab-case), the `license` of `.product/system.md` and `version` `0.0.0`, and no identity. Remove the `codename` and the `repository` of the archetype.
- In the `package.json` of each project that shows the identity (`api`, `web`, `cli`), replace the identity of the archetype with the one of `.product/system.md`: `displayName` (the system name), `description` (one sentence of the purpose), `author` with `name` and `url` (the author and the website of the proposal) and `version` `0.0.0`. Each field is required, with no fallback: the type check rejects a `package.json` without one. The project imports its own `package.json`, so no file copies the identity, and the `e2e` tests check only that it is there. Register these files, so that `aidd release` writes each next `version`: `node .agents/aidd/aidd.mjs config set release.versionFiles '["projects/{project}/package.json", …]'`. Commit them with `package-lock.json` and `.aiddbot/config.json` as `chore(scaffold): set the system identity`.
- Journal `node .agents/aidd/aidd.mjs log scaffolded "<the scaffolded projects>"`.
- Never run `rule-project` in greenfield.
- The **Architect** executes `outline-system`, only for the root `AGENTS.md` and its Common stack, because the schema documents came with the archetype: change only the system name in the title of `model.schema.md`.
- Run `node .agents/aidd/aidd.mjs integrate "chore(foundation): scaffold {system}"` from `chore/foundation`.
- Never run `test` in this phase: the close of `references/close.md` is the only test run of the foundation.

## Failures and reruns

- A copy or an install fails: stop, journal `blocked`, commit nothing partial, and return the failure. It is a defect of the environment or of the archetype: never repair it in the system.
- Never scaffold when working code exists.
- A committed proposal exists and no code exists: run its commands. Change the proposal only when the human asks.
