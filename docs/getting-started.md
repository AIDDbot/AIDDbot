# Getting Started

Copy the agents in, then run ABC: Architect, Builder, Craftsman.

AIDDbot is markdown. Nothing to install, no binary, no package.  
It works the same on greenfield and legacy repositories.

## 1. Copy `.agents` and the editor folders

If you cloned this repository, skip this step — `.claude/`, `.cursor/commands/`, and `.github/prompts/` are already here. Run `/architect-map`.

If you are bringing AIDDbot into another project, copy the origin folders with `tiged` (markdown only, nothing to run):

```bash
npx tiged AIDDbot/AIDDbot/.agents .agents
npx tiged AIDDbot/AIDDbot/.claude .claude
npx tiged AIDDbot/AIDDbot/.cursor/commands .cursor/commands
npx tiged AIDDbot/AIDDbot/.github/prompts .github/prompts
```

That is enough for `/architect-map` in Cursor, Claude Code, and GitHub Copilot. Claude Code also needs a root `CLAUDE.md` whose first line is `@AGENTS.md` — copy it from this repo if it is not already there.

For a workshop monorepo (back + front + e2e + domain) when `/scaffoldify` is already available, run it with `--aidd` instead: it fetches `.agents/` and the same editor folders.

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
