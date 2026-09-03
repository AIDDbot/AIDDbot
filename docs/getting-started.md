# Getting Started

Copy AIDDbot in, then walk the delivery loop. You invoke a public workflow; the orchestrator composes internal commands and spawns Architect, Builder, or Craftsman to execute skills.

AIDDbot is markdown. One `npx` command copies it into your repo; it does not add a dependency.

## 1. Copy AIDDbot into your project

If you cloned this repository, skip this step — the skills and harness adapters are already here.

From the root of any other project (Node 18+):

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/` and the adapters for Cursor, Claude Code, and GitHub Copilot. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`. If the folder is not a git repo, `init` runs `git init`. It writes a basic `.gitignore` (temp and secrets) when missing or incomplete, adds `README.md` only when none exists, and commits the overlay.

## 2. Start from what you have

**Existing codebase** — map it once:

```markdown
/map-solution
```

`/map-solution` spawns Architect to document architecture, conceptual model, coding rules, and each container. Where evidence is missing, it asks you closed questions.

**New workshop** — stay in that project (an empty folder, not this origin) and run `/scaffold-workshop`. Choose any combination of the catalogued back, front, e2e, and CLI archetypes. You can also use a sample domain, name a new one, or omit the domain. It installs the selected projects, runs their minimal smoke checks, documents the monorepo, and commits the green result. Then `/map-solution`.

**Greenfield, no code yet** — design instead of map:

```markdown
/design-solution
```

That spawns Architect to write the architecture and validate its technical specification. Continue with `/deliver-requirement` and provide that specification.

## 3. Deliver a requirement

```markdown
/deliver-requirement riders can rate a trip 1 to 5 stars
```

Architect scopes every requirement. One affected specification uses `feat/{spec_key}`. Several coordinated specifications use `change/{change_key}`. Check each specification's problem, outcomes, and acceptance criteria when the workflow stops for approval.

_IF_ the prompt includes YOLO, `/deliver-requirement` skips approval stops and continues through delivery.

**Several specs, one requirement.** You describe the need; Architect finds which specs to create or amend. One branch, code everything, then one verify, one qualify, one release. Each spec keeps its criteria — the change manifest only coordinates.

## 4. Let delivery complete

No extra slash command is required. The workflow plans and codifies one specification, or codifies coordinated specifications sequentially, then verifies, qualifies, and ships the complete scope. Functional or technical defect reports are fixed internally and review restarts from verify.

## 5. Keep the shape healthy

Hunt CRAP (complexity and coverage) and lint — not for one spec, for the whole codebase:

```markdown
/clean-solution
```

Craftsman reports; the workflow applies findings through its internal defect command.

## What's next?

The usual loop after the first map:

1. `/deliver-requirement` — scope, specify, implement, verify, qualify, and ship
2. `/clean-solution` or `/clean-drift` — optional codebase hygiene

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
