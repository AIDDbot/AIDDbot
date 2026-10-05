# Getting started

In the root folder of your repository, run this command:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

The command copies `.agents/` and the adapters of the supported harnesses. It does not change a managed file that exists, unless you use `--force`.

## What `init` adds

`init` prepares the full workspace in one step:

- `.gitignore`, `README.md` and `LICENSE`. It makes each file only if it does not exist. It never writes over a file.
- A root `package.json` at version `0.1.0`, only if it does not exist. `aidd release` increases the version for each shipped spec.
- `AGENTS.md`, from the template of `outline-system`. Later, `outline-system` writes the data of your project in it.
- `.aiddbot/counters.yaml`, with the permanent S and D identifiers. It is project state: `update` never changes it.
- An empty `.aiddbot/config.json`. The foundation adds the path of each project and its commands: `lint`, `format`, `upgrade`, `unit`, `acceptance` and `quality`. `aidd run` executes these commands.
- The empty debt register `.product/quality/debt.json`. The core makes the PRD `.product/PRD.md`: each spec has its requirements, and each shipped spec gets one line in the PRD.
- The first event of the journal, in `.aiddbot/journals/`.

`update` manages the skills and the agent adapters. It never makes these files again. The agent profiles have default values. You can change them in the configuration of your harness.

To select the models and the effort of the agents, use `.aiddbot/agents.local.yaml`. For the format, the file locations and the update behavior, see [Customize agent profiles](./agent-customization.md).

## Prepare the repository

```markdown
/architect-system-foundation
```

For an existing system, this command documents the projects and their rules.

When the repository has no application code, the command asks about the product and its projects, one stage at a time. Then it proposes the system in `.product/system.md`. The system is a set of typed projects: `back-api`, `front-web`, `cli` or `e2e`. Each project uses an archetype of its type from the catalog. Or the Architect makes an archetype for the technology that you select. With the archetypes of the catalog, the scaffold runs these commands:

```bash
npx tiged AIDDbot/front-standard front
npx tiged AIDDbot/back-express back
npx tiged AIDDbot/e2e-playwright e2e
```

After your approval, the scaffold runs from the root folder of the repository. Thus the working tree must be clean, and Node.js with npm must be installed. Then, for each project, one at a time:

- It writes the architecture and the general coding rules one time, in the Blueprint section of the root `AGENTS.md`. Each project gets a short `AGENTS.md` with only its own data: technology, tooling, folders, shared primitives, its rules and its connections. Your agents read these files. They do not explore the code.
- It changes the code into one architecture. `main` connects `core` and the features through a manifest. Each feature has the layers `presentation`, `logic` and `data`. `shared` has primitives, and folders by technical concern (see [`architect-system-foundation.md`](./architect-system-foundation.md)). The `e2e` project has its tests by feature, with page objects and test data in `shared`. From the first day, `lint` makes these boundaries mandatory. The foundation proves it with a forbidden import.
- It installs and records the tooling slots: `lint`, `format`, `upgrade`, `unit`, `acceptance` and `quality`. A slot that does not apply gets the reason.

Then it delivers the foundation specs, one at a time: `configuration`, `monitoring`, `layout` (only with a web front), `health`, `basic-auth` (only with users) and `account` (only with `basic-auth`). Thus the system is green before your first feature. In JS/TS, it uses TypeScript 7, oxlint, oxfmt and the native Node.js test runner. A web front starts with Pico CSS, its fonts and the AIDDbot theme in `colors.css`, `theme.css` and `custom.css`. Change the colors in these files.

To see the progress, read `.aiddbot/journals/`. Each handoff, plan, run with its result, commit, evaluation and release is one line.

## Deliver a change

```markdown
/build-requested-spec riders can rate a trip from 1 to 5 stars
```

The flow defines one small specification and asks for approval. Then it writes the code, verifies the acceptance behavior, reviews the changed code and ships the change. To skip the approval, add `YOLO`.

## Review quality

```markdown
/craft-lasting-quality
```

The flow runs the quality checks of the repository and updates the technical debt records. When the register has debt that it can repair, it delivers one coherent repair.

## Learn more

- [Workflow, skills, and delivery rules](./AIDD.workflow.md)
- [Customize agent profiles](./agent-customization.md)
