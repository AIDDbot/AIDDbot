# Getting started

AIDDbot is markdown. Nothing to install, no binary, no package — just a folder of instructions
your coding agent reads. It works the same on an empty repository and on a twenty-year-old one:
what exists gets described, what does not gets proposed to you.

## 1. Copy the skills in

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
```

Copy `.agents` into your project, then delete `AIDDbot-tmp`. You now have ten skills under
`.agents/skills/` and four commands under `.agents/commands/`.

If `/explore` does not autocomplete in your agent chat, your harness has not discovered the
folder — no need to fight the configuration, asking for the file by path always works:

```markdown
Follow .agents/skills/explore/SKILL.md on this project
```

## 2. The path

Commands chain the skills, running each one in a fresh subagent so no step inherits the
previous step's clutter. Four of them cover the whole cycle:

| | Command | What it chains |
|---|---|---|
| Map the ground | `/explore-and-extract` | `/explore`, then `/extract` per container |
| Build a feature | `/spec-feature` | `/specify` → **your check** → `/build-spec` |
| Change the structure | `/spec-refactor` | `/restructure` → **your check** → `/build-spec` |
| Take a spec to release | `/build-spec` | `/planify` → `/codify` → `/verify` → `/qualify` → `/release` |

Run the commands first. Drop to individual skills when you want to redo one step or watch what
it does before trusting it with the next.

## 3. Map the ground

```markdown
/explore-and-extract
```

`/explore` reads the repo tree and Guide files — never source — and writes your agent
instructions, the container architecture, the conceptual model and an empty PRD. `/extract` then
takes each **container** (a piece that runs on its own: `api`, `web`, `db`, `e2e`) and documents
it from its source, along with its coding rules.

Both ask closed questions where evidence is missing. Answering them is the work — this
documentation is every later step's context.

## 4. Build a feature

```markdown
/spec-feature riders can rate a trip 1 to 5 stars
```

`/specify` turns that into a one-page spec — problem, expected outcome per container, numbered
acceptance criteria — and **stops for you to read it**. That is the one checkpoint that cannot
be delegated: everything downstream is derived from this file, so a wrong spec buys you correct
code for the wrong problem.

Once you approve, `/build-spec` plans, codes, runs the e2e suite, grades the result against six
quality gates, and releases. A red test or a failed gate loops back to `/codify` on its own.
Nothing ships until both are green.

## 5. Change what already shipped

A released spec is shipped, not frozen. One question routes everything:

> **Would satisfying this change what a green e2e test asserts?**

- **No** — a defect. `/codify` in fix mode: minimal fix plus a regression test, then a patch release.
- **Yes** — a behavior change. `/spec-feature` amending the spec, then the full cycle.

When nothing about the product should change and only its shape should — routes exposed five
ways, one validation copied into four handlers — that is `/spec-refactor`. It captures your
directive as a refactor spec that travels the same pipeline, where the e2e suite may change
shape but never its verdict.

## What lands in your repo

`AGENTS.md` at the root, plus `arch/` (architecture), `model/` (schemas), `specs/` (one folder
per spec, holding its plans and reports) and `e2e/` (the suite). Paths are yours to choose —
`/explore` records the ones you pick, and every skill reads them from there.

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — the whole system, visually: pipeline, phases, routing, artifacts
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does and produces
- [Skills lifecycle](../.agents/skills/skills.lifecycle.md) — build, maintain, refactor coverage
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
