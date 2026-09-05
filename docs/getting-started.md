# Getting Started

Copy AIDDbot in, then walk the delivery loop. You invoke a public orchestrator skill; it composes internal worker skills and spawns Architect, Builder, or Craftsman where required.

AIDDbot is markdown. One `npx` command copies it into your repo; it does not add a dependency.

## 1. Copy AIDDbot into your project

If you cloned this repository, skip this step — the skills and harness adapters are already here.

From the root of any other project (Node 18+):

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Or, with Bun's package launcher:

```bash
bunx github:AIDDbot/AIDDbot init
```

Plain `bunx` follows the CLI's Node shebang; `bunx --bun github:AIDDbot/AIDDbot init` explicitly uses Bun as the runtime.

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/`, Claude Code skill pointers, and the native agent, rule, and hook adapters. Codex, Cursor, and GitHub Copilot in VS Code discover `.agents/skills/` directly. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`. If the folder is not a git repo, `init` runs `git init`. It writes a basic `.gitignore` (temp and secrets), `README.md`, and minimal `AGENTS.md` plus a Claude `CLAUDE.md` pointer only when each is missing, then commits the overlay. `/explore` replaces the minimal rules after the product and source folders are settled. In Codex, review and trust the project audit hooks with `/hooks` after installation.

## Updating an installed overlay

```bash
npx --allow-git=all github:AIDDbot/AIDDbot update --dry-run
npx --allow-git=all github:AIDDbot/AIDDbot update
```

`update` never initializes Git or touches seed files such as `README.md` and `.gitignore`. It records ownership of safely installed overlay files in `.aiddbot/manifest.json`; an untouched owned file can be refreshed or retired automatically, while an edited file is preserved and reported as a conflict (exit code `2`). `--force` explicitly permits replacement and removal of regular, manifest-validated managed files. Legacy installs without a manifest are adopted only when identical, newly created, or explicitly forced. `--dry-run` changes neither files, metadata, Git index, nor history.

## 2. Start from what you have

Run one entrypoint to establish the solution:

```markdown
/architect-solution-foundation
```

Existing application code is mapped as brownfield. An empty or documentation-only repository is designed as greenfield, scaffolded once, then mapped. If partial files make the choice unclear, you choose which route to follow before anything changes.

For a new solution, it confirms the name, selected tiers, technologies, and product summary, then installs and smoke-tests the scaffold. It resolves author details from the fetched projects or Git before asking for missing values, and preserves unrelated root README content while reconciling a solution summary with links and documented setup details for each selected project. Advanced users can invoke `/scaffoldify` directly.

## 3. Deliver a requirement

```markdown
/build-requested-change riders can rate a trip 1 to 5 stars
```

Architect scopes every requirement. One affected specification uses `feat/{spec_key}`. Several coordinated specifications use `change/{change_key}`. Check each specification's problem, outcomes, and acceptance criteria when the workflow stops for approval.

_IF_ the prompt includes YOLO, `/build-requested-change` skips approval stops and continues through delivery.

**Several specs, one requirement.** You describe the need; Architect finds which specs to create or amend. One branch, code everything, then one verify, one qualify, one release. Each spec keeps its criteria — the change manifest only coordinates.

## 4. Let delivery complete

No extra slash command is required. The orchestrator plans and codifies one specification, or codifies coordinated specifications sequentially, then verifies, qualifies, and ships the complete scope. Functional or technical defect reports are fixed internally and review restarts from verify.

## 5. Improve an existing solution

Turn durable findings and strict quality checks into a reviewed remediation scope:

```markdown
/craft-lasting-quality
```

Craft runs CRAP, coverage, and strict-lint checks, then consolidates that evidence with existing verification and qualification reports in `findings.md`. Accepted behavior-preserving remediation creates `fix/{fix_key}`, then fixes, verifies, qualifies, and ships a patch without creating a spec or plan. Include YOLO to skip the remediation-scope checkpoint. A finding that needs changed observable behavior stays pending because it is outside this workflow.

## What's next?

The usual loop after establishment:

1. `/build-requested-change` — scope, specify, implement, verify, qualify, and ship
2. `/craft-lasting-quality` — optional evidence-backed remediation

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
