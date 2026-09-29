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
- An empty `.aiddbot/config.json`. `rule-project` fills it in with each project's path and its classified `lint`, `unit`, `acceptance`, and `quality` commands, which `aidd run` later executes.
- The empty debt register `.product/quality/debt.json`. There is no PRD: each spec owns its requirements, and shipping lists it in `.product/specs/README.md`.
- The journal's first event, in `.aiddbot/journals/`.

`update` manages skills and the generated agent adapters, but never re-seeds these files. The agent profiles ship with defaults that you can customize in your harness's native configuration.

You can choose the models and effort of the installed agents in `.aiddbot/agents.local.yaml`. See [Customize agent profiles](./agent-customization.md) for the format, file locations, and update behavior.

## Prepare the repository

```markdown
/architect-system-foundation
```

For an existing system, this documents its projects and working rules.

When no application source exists, it asks about the product and its projects in short stages, proposes the system in `.product/system.md`, and, after your approval, scaffolds it by running these commands itself:

```bash
npx tiged AIDDbot/front-standard front
npx tiged AIDDbot/back-express back
npx tiged AIDDbot/e2e-playwright e2e
bun install --cwd front && bun install --cwd back && bun install --cwd e2e
git add -A && git commit -m "chore(scaffold): add front-standard, back-express, e2e-playwright"
```

It runs them from the repository root, so the working tree must be clean and [Bun](https://bun.com) installed. It then documents the new projects and records their commands in the same run.

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
