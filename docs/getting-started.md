# Getting Started

Copy the agents in, then run ABC: Architect, Builder, Craftsman.

AIDDbot is markdown. Nothing to install, no binary, no package.  
It works the same on greenfield and legacy repositories.

## 1. Copy `.agents` into your project

From your repository root:

```bash
npx tiged AIDDbot/AIDDbot/.agents .agents
```

Alternatively, copy the `.agents` folder manually from the AIDDbot repository.

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

## 4. Craftsman — refactor for drift

Run:

```markdown
/craftsman-refactor
```

Craftsman detects architecture drift, proposes refactors, and ships them through the same `/ship-spec` path.  
If you already know the improvement, pass it directly:

```markdown
/craftsman-refactor extract shared validation into one module
```

## What's next?

Keep the ABC loop active:

- Architect when context is thin
- Builder when you add value
- Craftsman when structure drifts

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
