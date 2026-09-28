# Getting started

Install AIDDbot from the root of your repository:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

The command copies `.agents/` and the supported agent adapters. Existing managed files remain unchanged unless you use `--force`.

## What `init` adds

`init` prepares a complete workspace in one pass:

- `.gitignore`, `README.md`, and `LICENSE` — created only when missing, never overwritten.
- `AGENTS.md` — seeded from `outline-system`'s own template; `outline-system` fills it in with your project's specifics.
- `.aiddbot/counters.yaml` starts the permanent S and D identifiers. It is project state: later `update` never changes it.
- An empty `.aiddbot/config.json`. `rule-project` fills it in with each project's path and its classified `lint`, `unit`, `acceptance`, and `quality` commands, which `aidd run` later executes.
- The empty debt register `debt.json` and its `TDR.md` view under `.product/quality/`. There is no PRD: each spec owns its requirements, and shipping lists it in `.product/specs/README.md`.
- The journal's first event, in `.aiddbot/journals/`.

`update` manages skills and the generated agent adapters, but never re-seeds these files. The agent profiles ship with defaults that you can customize in your harness's native configuration.

You can customize the installed agent profiles in your harness's native files. See [Customize agent profiles](./agent-customization.md) for file locations, model and effort guidance, and update behavior.

When `/scaffold-system` runs, it can also create a missing `.gitignore` or `LICENSE` from its bundled defaults. It never overwrites either file.

## Prepare the repository

```markdown
/architect-system-foundation
```

For an existing system, this documents its projects and working rules. When no application source exists, it first asks what projects are needed, scaffolds them, installs their required dependencies, and reconciles their main documentation.

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

- [Workflow and delivery rules](./AIDD.workflow.md)
- [Customize agent profiles](./agent-customization.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
