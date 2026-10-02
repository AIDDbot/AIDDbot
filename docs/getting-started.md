# Getting started

Install AIDDbot from the root of your repository:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

The command copies `.agents/` and the supported agent adapters. Existing managed files remain unchanged unless you use `--force`.

## What `init` adds

`init` prepares a complete workspace in one pass:

- `.gitignore`, `README.md`, and `LICENSE` — created only when missing, never overwritten.
- A root `package.json` at version `0.1.0`, only when missing. `aidd release` bumps its version at each shipped spec.
- `AGENTS.md` — seeded from `outline-system`'s own template; `outline-system` fills it in with your project's specifics.
- `.aiddbot/counters.yaml` starts the permanent S and D identifiers. It is project state: later `update` never changes it.
- An empty `.aiddbot/config.json`. The foundation fills it in with each project's path and its `lint`, `format`, `upgrade`, `unit`, `acceptance`, and `quality` commands, which `aidd run` later executes.
- The empty debt register `.product/quality/debt.json`. The PRD `.product/PRD.md` is generated: each spec owns its requirements, and shipping lists it there.
- The journal's first event, in `.aiddbot/journals/`.

`update` manages skills and the generated agent adapters, but never re-seeds these files. The agent profiles ship with defaults that you can customize in your harness's native configuration.

You can choose the models and effort of the installed agents in `.aiddbot/agents.local.yaml`. See [Customize agent profiles](./agent-customization.md) for the format, file locations, and update behavior.

## Prepare the repository

```markdown
/architect-system-foundation
```

For an existing system, this documents its projects and working rules.

When no application source exists, it asks about the product and its projects in short stages, and proposes the system in `.product/system.md` as typed projects: `back-api`, `front-web`, `cli`, or `e2e`. Each project takes an archetype of its type from the catalog, or one made on demand for the technology you choose. For example, with the catalog archetypes the scaffold runs:

```bash
npx tiged AIDDbot/front-standard front
npx tiged AIDDbot/back-express back
npx tiged AIDDbot/e2e-playwright e2e
```

After your approval, it runs the scaffold from the repository root, so the working tree must be clean and Node.js with npm installed. Then, one project at a time:

- It gives each project its own `AGENTS.md` with all its technical data: technology, tooling, architecture, folders, coding rules, and connections. Your agents read it instead of exploring the code.
- It reshapes the code into one architecture: `main` starts `core`; `core` registers the features through a manifest; each feature has `presentation`, `logic`, and `data` layers; `shared` holds helpers. Lint enforces these boundaries from day one, and the foundation proves it with a forbidden import.
- It installs and records the tooling slots: `lint`, `format`, `upgrade`, `unit`, `acceptance`, and `quality`, or "not applicable" with a reason.

Then it delivers the foundation specs one by one (`configuration`, `monitoring`, `health`, and `basic-auth` when the system has users), so the system starts green before your first feature. In JS/TS, it uses TypeScript 7, oxlint, oxfmt, and the native Node.js test runner.

## Deliver a change

```markdown
/build-requested-spec riders can rate a trip from 1 to 5 stars
```

The flow defines one small specification, asks for approval, implements it, verifies its acceptance behavior, reviews the changed code, and ships it. Add `YOLO` when you want the proposal approved without a pause.

## Review quality

```markdown
/craft-lasting-quality
```

The flow runs the repository's configured quality checks, updates its technical-debt records, and delivers one coherent repair when eligible debt exists.

## Learn more

- [Workflow, skills, and delivery rules](./AIDD.workflow.md)
- [Customize agent profiles](./agent-customization.md)
