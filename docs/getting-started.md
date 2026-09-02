# Getting Started

Copy AIDDbot in, then walk the loop: specify, implement, review. You invoke a command; the orchestrator spawns Architect, Builder, or Craftsman to execute the skills.

AIDDbot is markdown. One `npx` command copies it into your repo; it does not add a dependency.

## 1. Copy AIDDbot into your project

If you cloned this repository, skip this step — the skills and harness adapters are already here.

From the root of any other project (Node 18+):

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

`--allow-git=all` is required on npm 12, which blocks git fetches by default.

That copies `.agents/` and the adapters for Cursor, Claude Code, and GitHub Copilot. Existing files are left alone. Preview with `--dry-run`; replace differing files with `--force`. If the folder is not a git repo, `init` runs `git init`. It writes a basic `.gitignore` (temp and secrets) when missing or incomplete, adds `README.md` only when none exists, and commits the overlay.

## 2. Start from what you have

**Existing codebase** — map it once:

```markdown
/map-solution
```

`/map-solution` spawns Architect to document architecture, conceptual model, coding rules, and each container. Where evidence is missing, it asks you closed questions.

**New workshop** — stay in that project (an empty folder, not this origin) and run `/scaffold-workshop`. Choose any combination of the catalogued back, front, e2e, and CLI archetypes. You can also use a sample domain, name a new one, or omit the domain. It installs the selected projects, runs their minimal smoke checks, documents the monorepo, and commits the green result. Then `/map-solution`.

**Greenfield, no code yet** — design instead of map:

```markdown
/design-solution
```

That spawns Architect to write the architecture and a technical spec so Builder can scaffold it. Then skip to step 4.

## 3. Specify a feature

```markdown
/specify-feature riders can rate a trip 1 to 5 stars
```

Architect writes a one-page spec and **stops for your approval**. Check problem, outcomes, and acceptance criteria before anyone codes.

If the prompt includes YOLO, `/specify-feature` continues straight into `/implement-spec` and skips this stop.

## 4. Implement

```markdown
/implement-spec
```

Builder plans each affected container (plus e2e), then writes the code and unit tests. When that finishes, the same command runs `/review-implementation`: Craftsman verifies against the spec, qualifies the code, and ships. Defects go through `/fix-defects` and the review continues.

You can also invoke `/review-implementation` or `/fix-defects` on their own when you want that stretch without a full implement.

## 5. Keep the shape healthy

Hunt CRAP (complexity and coverage) and lint — not for one spec, for the whole codebase:

```markdown
/clean-solution
```

Craftsman reports; `/fix-defects` applies the findings.

## What's next?

The usual loop after the first map:

1. `/specify-feature` — you approve the spec
2. `/implement-spec` — plans, codes, reviews, and ships

Continue with:

- [Workflow](./AIDD.workflow.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [Why AIDD](../README.md#why-aidd)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
