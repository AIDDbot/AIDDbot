# Getting Started

Copy the agents in, then run ABC: Architect, Builder, Craftsman.

AIDDbot is markdown. Nothing to install, no binary, no package.  
It works the same on greenfield and legacy repositories.

## 1. Copy `.agents` and the harness folders

If you cloned this repository, skip this step — `.claude/`, `.cursor/commands/`, and `.github/prompts/` are already here. 

If you are bringing AIDDbot into another project, copy the origin folders with `tiged` (markdown only, nothing to run):

```bash
# Mandatory copy
npx tiged AIDDbot/AIDDbot/.agents .agents
# Optional harness copies
npx tiged AIDDbot/AIDDbot/.claude .claude
npx tiged AIDDbot/AIDDbot/.cursor/commands .cursor/commands
npx tiged AIDDbot/AIDDbot/.github/prompts .github/prompts
```

That is enough for `/architect-map` in Cursor, Claude Code, and GitHub Copilot.

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
