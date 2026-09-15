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

Through `specify`, the Architect defines one coherent scope, reserves its IDs, creates one small spec branch, and writes the spec and proposed PRD edits together. Requirement text lives only in the PRD; the spec references its IDs. The spec pauses for approval unless the request includes YOLO. Builders implement its solution by project. Verify runs the written E2E acceptance tests. Qualify reviews technical quality. Shipify integrates the code and PRD together when evidence is current.

## Review quality

```markdown
/craft-lasting-quality
```

Craft reviews open TDR entries and runs the quality tools configured by the project team. It records detailed findings in the review, promotes confirmed debt to the TDR, and groups debt entries before creating one repair spec. Repairs use the same verification and qualification flow as requested work.

## More

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
