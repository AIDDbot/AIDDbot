# Getting started

Copy AIDDbot into a project, then use the entrypoint that matches the outcome you need.

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

The command copies `.agents/` and supported harness adapters. Existing files remain unchanged unless you request `--force`.

## Understand or prepare a solution

```markdown
/architect-solution-foundation explain the current architecture
/architect-solution-foundation prepare an executable foundation for this product
```

Solutions without application or project source code first go through `scaffoldify` to agree and materialize a foundation. Agent files, AIDD product files, harness adapters, and documentation do not count as source code. Every solution then goes through `explore` and `extract`.

The result is a compact root `AGENTS.md` and one `.agents/rules/{project}.rules.md` file per project. Each rules file describes the project's Problem, Solution, and Verification.

## Deliver a spec

```markdown
/build-requested-change riders can rate a trip from 1 to 5 stars
```

The spec pauses for approval unless the request includes YOLO. The delivery flow defines, implements, verifies, and ships one small change. It uses basic checks and records minor technical debt for later instead of running expensive quality analysis. See the [`build-requested-change` skill](../.agents/skills/build-requested-change/SKILL.md) for the exact flow.

## Review quality

```markdown
/craft-lasting-quality
```

Craft runs the project's strict configured quality tools, updates the technical debt register, and delivers one selected repair. See the [`craft-lasting-quality` skill](../.agents/skills/craft-lasting-quality/SKILL.md) for the exact flow.

## More

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
