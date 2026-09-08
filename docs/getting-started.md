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
bun x --package github:AIDDbot/AIDDbot aiddbot init
```

This package form follows the CLI's Node shebang; `bun x --bun --package github:AIDDbot/AIDDbot aiddbot init` explicitly uses Bun as the runtime.

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/`, Claude Code skill pointers, and the native agent, rule, and hook adapters. Codex, Cursor, and GitHub Copilot in VS Code discover `.agents/skills/` directly. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`. If the folder is not a git repo, `init` runs `git init`. It writes a basic `.gitignore` (temp and secrets), `README.md`, and minimal `AGENTS.md` plus a Claude `CLAUDE.md` pointer only when each is missing, then commits the overlay. `/explore` replaces the minimal rules after the product and source folders are settled. In Codex, review and trust the project audit hooks with `/hooks` after installation.

## Updating an installed overlay

```bash
npx --allow-git=all github:AIDDbot/AIDDbot update --dry-run
npx --allow-git=all github:AIDDbot/AIDDbot update
bun x --package github:AIDDbot/AIDDbot aiddbot update --dry-run
bun x --package github:AIDDbot/AIDDbot aiddbot update
```

`update` never initializes Git or touches seed files such as `README.md` and `.gitignore`. It records ownership of safely installed overlay files in `.aiddbot/manifest.json`; an untouched owned file can be refreshed or retired automatically, while an edited file is preserved and reported as a conflict (exit code `2`). `--force` explicitly permits replacement and removal of regular, manifest-validated managed files. Legacy installs without a manifest are adopted only when identical, newly created, or explicitly forced. `--dry-run` changes neither files, metadata, Git index, nor history.

## 2. Understand, design, or prepare the solution

Use the same entrypoint with the outcome you need:

```markdown
/architect-solution-foundation explain the current architecture
/architect-solution-foundation define the architecture for this product without scaffolding
/architect-solution-foundation prepare an executable foundation for this product
```

Understanding existing application code produces a map and explanation. Designing produces a technical design for a new solution or an evolution of an existing one. Preparing a new executable foundation additionally confirms material choices, installs and smoke-tests one scaffold, then reconciles its documented containers. Existing documents are reused as evidence; their presence alone never triggers scaffolding.

When materializing a new solution, it confirms the name, selected tiers, technologies, and product summary. It resolves author details from the fetched projects or Git before asking for missing values, and preserves unrelated root README content while reconciling a solution summary with links and documented setup details for each selected project. Architecture design is captured on its technical working branch; `/scaffoldify` itself never manages branches or commits. Advanced users can invoke `/scaffoldify` directly.

## 3. Deliver a requirement

```markdown
/build-requested-change riders can rate a trip 1 to 5 stars
```

Architect classifies every requirement and creates one `change/{change_key}` delivery. A change may reference zero, one, or several durable specifications. Check each new or amended specification's problem, outcomes, and acceptance criteria when the workflow stops for approval.

_IF_ the prompt includes YOLO, `/build-requested-change` skips approval stops and continues through delivery.

The manifest records origin, kind, intent, complexity, criteria, and applicable stages. Simple changes skip planning and qualification. Corrections skip planning. Requested technical changes skip E2E verification. Functional and mixed changes verify; complex changes qualify.

## 4. Let delivery complete

No extra slash command is required. The orchestrator executes only the stages derived from the persisted classification and ships the complete scope once. Correctable report findings are fixed internally, then all applicable evidence is refreshed.

## 5. Improve an existing solution

Review current quality and deliver a bounded remediation batch:

```markdown
/craft-lasting-quality
```

Craft does not accept defect reports, named findings, or priorities from the prompt; send requested corrections to `/build-requested-change`. A fresh run performs current quality checks, groups findings with a common cause, and selects up to five eligible repair groups. It creates one planless change, implements the batch, verifies it once, qualifies it when complex, and produces one release. An interrupted batch resumes without silently adding new findings.

## What's next?

The usual loop after establishment:

1. `/build-requested-change` — classify and deliver requested work through applicable stages
2. `/craft-lasting-quality` — review and deliver one correction batch

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
