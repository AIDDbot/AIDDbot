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
`.agents/skills/` and five commands under `.agents/commands/`.

If `/explore` does not autocomplete in your agent chat, your harness has not discovered the
folder — no need to fight the configuration, asking for the file by path always works:

```markdown
Follow .agents/skills/explore/SKILL.md on this project
```

## 2. Three doors

The lifecycle is simple: you arrive and explore, you build, and over time you re-explore to
correct technical drift. Each door has a command that chains the skills it needs, running every
one in a fresh subagent so no step inherits the previous step's clutter.

| You want to | Command |
|---|---|
| Understand what is there | `/explore-and-extract` |
| Add something new | `/spec-feature` |
| Correct technical drift | `/explore-and-refactor` |

`/spec-feature` hands into `/build-spec`, which carries a spec from plan to release — call
`/build-spec` directly when a spec already exists. `/explore-and-refactor` is the refactor door:
it re-documents, finds drift, and drives each chosen fix through `/spec-refactor` for you.

Run the commands first. Drop to individual skills when you want to redo one step or watch what
it does before trusting it with the next.

## 3. Map the ground

> Example:

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

> Example:

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

## 5. Re-explore for drift

Features ship. Time passes. Routes get exposed five different ways, a validation is copied into
four handlers, a concept is drawn differently on every screen — the product still behaves, but
its shape has drifted from the docs and rules you wrote on day one.

> Example:

```markdown
/explore-and-refactor
```

It documents like `/explore-and-extract`, comparing what exists with what the arch docs and rules
already expect, then writes `arch/drift.report.md`: the contradictions worth fixing. You pick
the top defect together; it runs `/spec-refactor` on that item (same human check, same
`/build-spec` machine underneath), marks the result in the report, and proposes the next one.

The safety net is the e2e suite you already have. A refactor may change *how* a test reaches its
result, never *what* it asserts, so if the suite still passes, the product still behaves. Any
finding that would change what the product does comes back to you as a feature instead.

## What lands in your repo

`AGENTS.md` at the root, plus `arch/` (architecture), `model/` (schemas), `specs/` (one folder
per spec, holding its plans and reports) and `e2e/` (the suite). Paths are yours to choose —
`/explore` records the ones you pick, and every skill reads them from there.

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — each case in pictures: explore, build, re-explore
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does, produces, and routes to
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
