# Getting Started

Copy AIDDbot in, then walk ABC in order: Architect specifies, Builder implements, Craftsman ships.

AIDDbot is markdown. One `npx` command copies it into your repo; it does not add a dependency.

## 1. Copy AIDDbot into your project

If you cloned this repository, skip this step — the skills and harness adapters are already here.

From the root of any other project (Node 18+):

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/` and the adapters for Cursor, Claude Code, and GitHub Copilot. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`. If the folder is not a git repo, `init` runs `git init` and commits the overlay.

## 2. Start from what you have

**Existing codebase** — map it once:

```markdown
/architect-map
```

`/architect-map` documents architecture, conceptual model, coding rules, and each container. Where evidence is missing, it asks you closed questions.

**New workshop** — stay in that project (an empty folder, not this origin) and run `/scaffoldify`. It asks for a profile (workshop monorepo, Node CLI, or another AIDDbot repo you name), and a domain (a sample or a name you choose). Then `/architect-map`.

**Greenfield, no code yet** — design instead of map:

```markdown
/architect-design
```

That writes the architecture and a spec so Builder can scaffold it. Then skip to step 4.

## 3. Specify a feature

```markdown
/architect-feature riders can rate a trip 1 to 5 stars
```

Architect writes a one-page spec and **stops for your approval**. Check problem, outcomes, and acceptance criteria before anyone codes.

## 4. Implement

```markdown
/builder-implement
```

Builder plans each affected container (plus e2e), then writes the code and unit tests. It does not run the acceptance suite.

## 5. Review and ship

```markdown
/craftsman-review
```

Craftsman verifies against the spec, qualifies the code, and ships. If the report has defects, run `/builder-fix` with that report, then `/craftsman-review` again.

## 6. Keep the shape healthy

Hunt CRAP (complexity and coverage) and lint — not for one spec, for the whole codebase:

```markdown
/craftsman-clean
```

Hand the report to `/builder-fix`.

## What's next?

The usual loop after the first map:

1. `/architect-feature` — you approve the spec
2. `/builder-implement`
3. `/craftsman-review` — `/builder-fix` if the report is red

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
