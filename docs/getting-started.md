# Getting Started

Copy AIDDbot in, then run ABC: Architect, Builder, Craftsman.

AIDDbot is markdown. One `npx` command copies it into your repo; it does not add a dependency.  
It works the same on greenfield and legacy repositories.

## 1. Copy AIDDbot into your project

If you cloned this repository, skip this step — the skills and harness adapters are already here.

From the root of any other project (Node 18+):

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/` and the adapters for Cursor, Claude Code, and GitHub Copilot. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`.

To assemble a new workshop monorepo from AIDDbot archetypes, then copy the overlay:

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --back {tech} --front {tech} --e2e {tech} --domain {name}
```

From this origin, use `node bin/scaffold.js --dest {workshop} …` instead. `--list` prints known techs if `gh` is installed. `--dest` writes to another folder (not this origin). Existing `back/`, `front/`, `e2e/`, and `docs/domain/` are skipped.

Then `/architect-map` is available in those editors.

## 2. Architect — map the project

Run:

```markdown
/architect-map
```

`/architect-map` maps what already exists: architecture, conceptual model, coding rules, and container-level documentation.  
Where evidence is missing, it asks you closed questions so the map stays grounded.

## 3. Builder — ship a feature

Run:

```markdown
/builder-ship my new feature with requirements
```

Builder starts with `/specify`, creates a one-page spec, and **stops for your approval**.  
After approval, `/ship-spec` plans, codes, verifies, qualifies, and releases.

## 4. Craftsman — keep the shape healthy

Three commands, same `/ship-spec` path.

A directive you already hold:

```markdown
/craftsman-refactor extract shared validation into one module
```

Architecture drift against current docs:

```markdown
/craftsman-drifter
```

CRAP — cyclomatic complexity and poor test coverage:

```markdown
/craftsman-craptor
```

## What's next?

Keep the ABC loop active:

- Architect when context is thin
- Builder when you add value
- Craftsman when you have a directive, drift, or CRAP to clear

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
