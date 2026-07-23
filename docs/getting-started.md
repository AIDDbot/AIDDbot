# Getting started

Skills are plain markdown under `.agents/skills/` — no package install, no binary.

## 1. Add skills to your project

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
```

Copy `.agents` into your project, then remove the temporary clone.

**Bash (macOS / Linux / Git Bash)**

```bash
cp -r AIDDbot-tmp/.agents ./.agents
rm -rf AIDDbot-tmp
```

**PowerShell (Windows)**

```powershell
Copy-Item -Path AIDDbot-tmp/.agents -Destination ./.agents -Recurse -Force
Remove-Item -Path AIDDbot-tmp -Recurse -Force
```

## 2. Set up the context

In your agent chat:

```markdown
/explore this project
```

This writes the root agent-instructions file (`AGENTS.md`, or `CLAUDE.md` depending on your harness) — paths, conventions, git rules, spec status chain, product brief — the system architecture document `arch/system.arch.md` (C4 L2: containers with **Tier**), the conceptual model schema `model/model.schema.md` (ER diagram + entity list, no attributes), and the PRD shell `specs/PRD.md`. `/explore` reads the tree and Guide files only, not application source.

Then document each **container** (a runnable unit from `system.arch.md`: `api`, `web`, `db`...). Run once per container:

```markdown
/extract the api container
```

This reads that container's source and writes `{Agents_Folder}/rules/{container}.rules.md`.
Non-`db` containers also get `arch/{container}.arch.md` (C4 L3). The `db` container gets
`model/db.schema.md` (relational schema) **instead of** an arch doc. Containers that expose
an API also update `model/api.schema.md`. Each run sets the container **Detail** link in
`system.arch.md`.

Both skills apply **evidence wins**: document what exists, prescribe defaults (marked
*intended*) where it doesn't — even inside the same repo. When every container is
documented, start building.

See the [AIDD workflow](./AIDD.workflow.md#set-up-the-context).

## 3. Build a feature

See [Build a feature](./AIDD.workflow.md#build-a-feature) for the visual walkthrough. Default loop:

```markdown
/specify → /planify → /codify (×container) → /verify
```

Example prompts:

```markdown
/specify a feature requirement
/planify the specification
/codify the api plan
/codify the web plan
/codify the e2e plan
/verify the feature
```

- `/specify` creates or **amends** a one-page spec (problem, solution, criteria) → `pending`. Amend always replans; create also appends a PRD line.
- `/planify` writes one plan per software container plus `e2e.plan.md` → `planned`. On amend, **Checkpoints** mark prior steps keep / redo / drop.
- `/codify` implements **one plan per run** (then e2e). Software containers: smoke + unit tests. E2e: compile only. Sets `in-progress`.
- `/verify` runs the suite and reports — never fixes → `verified` | `failed`.

See the [AIDD workflow](./AIDD.workflow.md#build-a-feature).

## 4. Quality and release

Default loop:

```markdown
/review → /release
```

Example prompts:

```markdown
/review the source code touched by this feature
/release a new version
```

- `/review` gates a code scope on lint, types, a11y, security, performance, **and** clean-code/DRY, and writes `review.report.md` with a pass/fail verdict per gate plus a handoff per finding (report-only). Failed gates hand off to `/codify`.
- `/release` bumps the version, updates `CHANGELOG.md`, reconciles arch docs, requires the review report's gates all green, and closes the spec when one is in scope.

See the [AIDD workflow](./AIDD.workflow.md#quality-and-release).

## 5. Maintain a released feature

A `done` spec is currently shipped (`released-version`) — amendable, not frozen. The green e2e suite is still the contract. No triage skill: enter through either door.

```markdown
/codify the login lockout crashes on the 5th attempt        (a fix)
/specify amend 001-login-lockout — trigger after 5 attempts (a behavior change)
/planify the specification
```

Both doors ask one mechanical question — *would satisfying the request change what a green e2e test asserts?* — and bounce a misrouted request to the other:

- **No green test flips** → defect or coverage gap: `/codify` fix mode — minimal fix + regression test — then a patch `/release`. No spec.
- **A green test must flip** → behavior change: `/specify` amend (or create) → always `/planify` (checkpoints) → `/codify` → `/verify`.

For accumulated decay no single spec's review can see, run `/refactor` periodically — a whole-app audit (code clarity, UI, a11y, structure, behavior). Every behavior-preserving finding routes to `/planify`, which plans the cleanup for `/codify` to execute and `/verify` to confirm; anything that would change what a green e2e test asserts is not a refactor but a `/specify` feature. See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md).

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — the whole system, visually: pipeline, phases, routing, artifacts
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does and produces
- [Skills lifecycle](../.agents/skills/skills.lifecycle.md) — build, maintain, refactor coverage
