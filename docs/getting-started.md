# Getting started

AIDDbot is markdown. There is nothing to install, nothing to run, no binary and no package —
just a folder of instructions your coding agent reads. This page takes you from an empty
directory to a released feature.

It works on an empty repository and on a twenty-year-old one alike. The difference is only
where the documentation comes from: an existing codebase gets **described**, an empty one gets
**proposed to you** and you confirm.

## 1. Copy the skills in

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
```

Copy `.agents` into your project, then remove the temporary clone.

**Bash (macOS / Linux / Git Bash)**

```bash
cp -r AIDDbot-tmp/.agents ./.agents && rm -rf AIDDbot-tmp
```

**PowerShell (Windows)**

```powershell
Copy-Item -Path AIDDbot-tmp/.agents -Destination ./.agents -Recurse -Force
Remove-Item -Path AIDDbot-tmp -Recurse -Force
```

You now have `.agents/skills/` (ten skills) and `.agents/commands/` (four commands).

## 2. Make them reachable from your agent

Harnesses discover skills differently, and some need the folder pointed at or linked into
their own conventional location. If `/explore` does not autocomplete in your chat, you do not
need to fight the configuration — every skill is a file, and asking for it by path always works:

```markdown
Follow .agents/skills/explore/SKILL.md on this project
```

Everything below is written with the slash form for brevity. Substitute the path form if that
is what your harness gives you.

## 3. Two gears

Skills are the units of work. Commands chain them, running each skill in its own fresh subagent
so no step inherits the previous step's clutter.

| | Command | What it chains |
|---|---|---|
| Map the ground | `/explore-and-extract` | `/explore`, then `/extract` per container |
| Build a feature | `/spec-feature` | `/specify` → *your check* → `/build-spec` |
| Change the structure | `/spec-refactor` | `/restructure` → *your check* → `/build-spec` |
| Take a spec to release | `/build-spec` | `/planify` → `/codify` → `/verify` → `/qualify` → `/release` |

Start with the commands. Drop to individual skills when you want to redo one step, work on one
container, or watch what a step does before trusting it with the next.

## 4. Map the ground

```markdown
/explore-and-extract
```

**`/explore`** runs first. It reads the repository tree and the Guide files — `README.md`,
`CHANGELOG.md`, manifests like `package.json` or `pom.xml` — and never application source. From
those it derives your environment, your **containers** (the pieces that run or deploy on their
own: `api`, `web`, `db`, `e2e`) and your domain entities. It writes four files:

| File | What it holds |
|---|---|
| `AGENTS.md` (or `CLAUDE.md`) | Environment, paths, git rules, status chain, product brief |
| `arch/system.arch.md` | Containers diagram (C4 L2), each with a **Tier** and a **Detail** link |
| `model/model.schema.md` | Conceptual ER diagram and entity list — no attributes |
| `specs/PRD.md` | The functional log, as an empty shell |

**`/extract`** then runs once per container. This one *does* read source — the files it judges
key or archetypal — and writes that container's architecture (`arch/{container}.arch.md`), or
its relational schema (`model/db.schema.md`) when the tier is `db`, plus its coding rules in
`{Agents_Folder}/rules/{container}.rules.md`. A container that exposes an API also lands in
`model/api.schema.md`.

Both steps apply **evidence wins**: where something exists they describe it; where nothing does
they propose a default and ask you a closed question. That is why an empty repository works —
you answer a handful of yes/no and pick-one questions and the documentation is the result.

Expect to be asked things. Answering is the work.

See the [AIDD workflow](./AIDD.workflow.md#set-up-the-context).

## 5. Build a feature

```markdown
/spec-feature riders can rate a trip 1 to 5 stars
```

`/specify` turns that sentence into a one-page spec under `specs/{spec_key}/spec.md` — the
problem, user stories, business rules, what is out of scope, the expected outcome per container,
and numbered acceptance criteria `AC-{spec_id}.{n}`. It appends a line to the PRD and cuts a
`feat/{spec_key}` branch.

**Then it stops and asks you to read it.** This is the one checkpoint that matters: everything
downstream is derived from this file, so a wrong spec produces correct code for the wrong
problem. Read it, correct it, then let it continue.

Once you approve, `/build-spec` takes over and does not need you again until something fails:

```markdown
/planify  (once per affected container, e2e included)  → planned
/codify   (once per plan)                              → in-progress
/verify   (runs the e2e suite, reports, never fixes)   → verified | failed
/qualify  (grades the code against six gates)
/release  (version, changelog, arch docs, merge, tag)  → done
```

A red `/verify` or a failed `/qualify` gate loops back through `/codify` with the report in
hand. Nothing ships until both are green.

The same thing by hand, when you want to drive:

```markdown
/specify riders can rate a trip 1 to 5 stars
/planify the api container
/planify the e2e container
/codify the api plan
/codify the e2e plan
/verify the feature
/qualify the feature branch
/release
```

- `/specify` creates or **amends** a spec → `pending`. Amend always replans.
- `/planify` writes **one plan per run**, for the container in scope → `planned` once none is
  left unplanned. On amend, **Checkpoints** mark prior steps keep / redo / drop.
- `/codify` implements **one plan per run**. Software containers get unit tests; e2e only has to
  compile. Sets `in-progress`.
- `/verify` runs the suite and reports — it never fixes → `verified` | `failed`.
- `/qualify` grades a11y, security, performance, clean-code, UI and your own per-container rules,
  and writes `qualify.report.md`. Lint, types and build are not gates — they are a precondition.
- `/release` bumps the version, updates `CHANGELOG.md`, reconciles the arch docs, merges and tags.

See [Build a feature](./AIDD.workflow.md#build-a-feature) and
[Quality and release](./AIDD.workflow.md#quality-and-release).

## 6. Change something already released

A `done` spec is shipped, not frozen. The green e2e suite is the contract, and there is no triage
skill — you enter through either door, and a misrouted request gets bounced to the other. Both
doors ask one mechanical question:

> **Would satisfying this change what a green e2e test asserts?**

- **No** → a defect or a coverage gap. `/codify` in fix mode: minimal fix plus a regression test,
  then a patch `/release`. No spec.
- **Yes** → a behavior change. `/spec-feature` amending the existing spec, then the full pipeline.

```markdown
/codify the login lockout crashes on the 5th attempt          (a fix)
/spec-feature amend 001-login-lockout — trigger after 5 tries (a behavior change)
```

A "bug" the suite disagrees with is a behavior change wearing a disguise: the code, the tests and
the docs all agree with each other and are wrong together. The gate makes hot-fixing it
structurally impossible — `/codify` cannot flip a green test without a plan, and a plan needs a
current spec.

## 7. Change how it is built

Sometimes nothing about the product should change, only its shape: five routes exposed five
ways, one validation copied into four handlers, a concept drawn differently in every screen. No
single diff reveals it, so no code review catches it.

```markdown
/spec-refactor homogenize how the api exposes its routes
```

`/restructure` takes your directive, bounds how far it reaches, lists the affected sites per
container, and writes a `kind: refactor` spec — its own `R` series, outside the PRD, on a
`refactor/{spec_key}` branch. From there it travels the same pipeline as a feature.

What changes is who judges it. Its first criterion is always **suite non-regression**, proved by
`/verify`; the rest name one of `/qualify`'s gates. The e2e suite may change shape — *how* a test
reaches its result — but never its verdict.

Anything that would change what the product does is not structural: it comes back to you as a
feature. The accumulated decay `/qualify` notes in passing, release after release, is the raw
material for these directives.

See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md).

## What you actually do

The agent writes; you decide. Concretely:

| When | Your job |
|---|---|
| `/explore`, `/extract` | Answer closed questions. Correct anything it got wrong about your project — it becomes every later step's context. |
| After `/specify` or `/restructure` | **Read the spec.** The one checkpoint that cannot be delegated. |
| `/verify` red | Nothing — the report loops back to `/codify` on its own. Step in when it loops twice on the same defect. |
| `/qualify` red | Read the findings. A `behavioral` one is aimed at you: it means the change wants a new spec. |
| `/release` | Confirm the version bump reads right. |

## Where everything lives

```
your-repo/
├── AGENTS.md                  # agent instructions (/explore)
├── CHANGELOG.md               # (/release)
├── .agents/
│   ├── skills/                # the ten skills
│   ├── commands/              # the four commands
│   └── rules/
│       └── {container}.rules.md   # per container (/extract)
├── arch/
│   ├── system.arch.md         # containers, C4 L2 (/explore)
│   └── {container}.arch.md    # components, C4 L3 (/extract)
├── model/
│   ├── model.schema.md        # conceptual ER (/explore)
│   ├── db.schema.md           # relational (/extract, db tier)
│   └── api.schema.md          # API shapes (/extract)
├── specs/
│   ├── PRD.md                 # functional index (/explore + /specify)
│   └── {spec_key}/
│       ├── spec.md            # (/specify or /restructure)
│       ├── {container}.plan.md, e2e.plan.md   # (/planify)
│       ├── e2e.report.md      # (/verify)
│       └── qualify.report.md  # (/qualify)
└── e2e/                       # the suite (/codify)
```

Paths are yours to change — `/explore` records the ones you pick in `AGENTS.md`, and every skill
reads them from there.

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — the whole system, visually: pipeline, phases, routing, artifacts
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does and produces
- [Skills lifecycle](../.agents/skills/skills.lifecycle.md) — build, maintain, refactor coverage
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
