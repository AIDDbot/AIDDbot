# Getting started

Install AIDDbot from the root of your repository:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

The command copies `.agents/` and the supported agent adapters. It also adds the AIDDbot audit handlers to `.claude/settings.json` without replacing unrelated Claude settings or hooks. Review and enable project hooks in Claude Code when prompted. Existing managed files remain unchanged unless you use `--force`.

## What `init` adds

`init` prepares a complete workspace in one pass, so no skill has to create these as a fallback:

- `.gitignore`, `README.md`, and `LICENSE` — created only when missing, never overwritten.
- `AGENTS.md` — seeded from `outline-system`'s own template; `outline-system` fills it in with your project's specifics.
- `.aiddbot/counters.yaml` starts the permanent S, F, T, and D identifiers. It is project state: later `update` never changes it.
- The empty `PRD.md` and `TDR.md` under `.product/`.
- The journal's first event, in `.aiddbot/journals/`.

`update` manages skills and adapters, including each agent's model for its role, but never re-seeds these files.

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
- [Skills catalog](../.agents/skills/skills.catalog.md)
