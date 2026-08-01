# Getting started

AIDDbot is markdown. Nothing to install, no binary, no package — just a folder of instructions
your coding agent reads. It works the same on an empty repository and on a twenty-year-old one:
what exists gets described, what does not gets proposed to you.

The lifecycle is **ABC** — **A**rchitect, **B**uilder, **C**raftsman:

| | Role | Command | Job |
|---|------|---------|-----|
| **A** | Architect | `/architect-map` | Map what is there |
| **B** | Builder | `/builder-ship` | Ship something new |
| **C** | Craftsman | `/craftsman-refactor` | Correct technical drift |

Each door chains the skills it needs in fresh subagents so no step inherits the previous step's
clutter. Run the commands first; drop to individual skills when you want to redo one step or
watch what it does before trusting the next.

## 1. Copy the skills in

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
```

Copy `.agents` into your project, then delete `AIDDbot-tmp`. You now have nine skills under
`.agents/skills/` and four commands under `.agents/commands/`.

If `/explore` does not autocomplete in your agent chat, your harness has not discovered the
folder — no need to fight the configuration, asking for the file by path always works:

```markdown
Follow .agents/skills/explore/SKILL.md on this project
```

## 2. Architect — map the ground

> Example:

```markdown
/architect-map
```

**Architect** (`/architect-map`) maps what is there. `/explore` reads the repo tree and Guide
files — never source — and writes your agent instructions, the container architecture, the
conceptual model and an empty PRD. `/extract` then takes each **container** (a piece that runs
on its own: `api`, `web`, `db`, `e2e`) and documents it from its source, along with its coding
rules.

Both ask closed questions where evidence is missing. Answering them is the work — this
documentation is every later step's context.

## 3. Builder — ship a feature

> Example:

```markdown
/builder-ship riders can rate a trip 1 to 5 stars
```

**Builder** (`/builder-ship`) ships something new. `/specify` turns that into a one-page spec —
problem, expected outcome per container, numbered acceptance criteria — and **stops for you to
read it**. That is the one checkpoint that cannot be delegated: everything downstream is
derived from this file, so a wrong spec buys you correct code for the wrong problem.

Once you approve, `/ship-spec` plans, codes, runs the e2e suite, grades the result against
six quality gates, and releases. `/builder-ship` hands into it automatically; call
`/ship-spec` directly when a spec already exists. A red test or a failed gate loops back to
`/codify` on its own. Nothing ships until both are green.

## 4. Craftsman — correct drift

Features ship. Time passes. Routes get exposed five different ways, a validation is copied into
four handlers, a concept is drawn differently on every screen — the product still behaves, but
its shape has drifted from the docs and rules you wrote on day one.

> Example — detect, then fix:

```markdown
/craftsman-refactor
```

> Example — directive already in hand:

```markdown
/craftsman-refactor homogenize how the api exposes its routes
```

**Craftsman** (`/craftsman-refactor`) restores craft when shape drifts. With no directive it
documents like Architect (`/architect-map`), comparing what exists with what the arch docs and
rules already expect, then writes `arch/drift.report.md`. You pick the top defect together; for
each item it runs `/specify` (`kind: refactor`), the human check, and `/ship-spec`, marks the
result in the report, and proposes the next one. With a directive already clear, it skips
detection and takes that path straight away.

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
- [AIDD workflow](./AIDD.workflow.md) — ABC in pictures: Architect, Builder, Craftsman
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does, produces, and routes to
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
