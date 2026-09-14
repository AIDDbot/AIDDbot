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

Greenfield solutions first go through `scaffoldify` to agree and materialize a foundation. Every solution then goes through `explore` and `extract`.

The result is a compact root `AGENTS.md` and one `.agents/rules/{project}.rules.md` file per project. Each rules file describes the project's Problem, Solution, and Verification.

## Deliver a spec

```markdown
/build-requested-change riders can rate a trip from 1 to 5 stars
```

The Architect reserves IDs, creates one small spec branch, and proposes its PRD edits. The spec pauses for approval unless the request includes YOLO. Builders implement its solution by project. Verify runs the written E2E acceptance tests. Qualify reviews technical quality. Shipify integrates the code and PRD together when evidence is current.

## Review quality

```markdown
/craft-lasting-quality
```

Craft reviews open quality findings and runs the quality tools configured by the project team. It confirms and groups findings before creating one repair spec. Repairs use the same verification and qualification flow as requested work.

## More

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
