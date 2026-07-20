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

This writes the root agent-instructions file (`AGENTS.md`, or `CLAUDE.md` depending on your harness) — paths, conventions, git rules, spec status chain, product brief — the system architecture document `arch/system.arch.md` (C4 L2: containers with **Tier**), and the conceptual model schema `model/model.schema.md` (ER diagram + entity list, no attributes). `/explore` reads the tree and Guide files only, not application source.

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

- `/specify` captures **what** — a one-page spec with per-container expected results and acceptance criteria, plus a line in `specs/PRD.md` (the functional log). No technical detail.
- `/planify` captures **how** — one implementation plan per affected container, the transversal `e2e.plan.md` included (one scenario per acceptance criterion).
- `/codify` implements **one container plan per run** (sessions can be parallel): functional code + unit tests — and the e2e suite from its plan.
- `/verify` runs the e2e suite and reports — never fixes: defects land in `e2e.report.md` triaged with a handoff each. Code/test bugs go back through `/codify` per affected container; structural defects escalate to `/planify`. Repeat `/verify` until green. Implementation and evaluation never share a session.

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

- `/review` audits a code scope for a11y, security, performance, **and** clean-code/DRY, and writes `review.report.md` with a handoff per finding (report-only; `--fix` applies the mechanical ones). Fixes land via `/codify`.
- `/release` bumps the version, updates `CHANGELOG.md`, reconciles arch docs, and closes the spec when one is in scope.

See the [AIDD workflow](./AIDD.workflow.md#quality-and-release).

## 5. Maintain a released feature

Once released, a spec is closed history — the programming artifact for that change. The green e2e suite is the contract, and there is no triage skill: enter through either door and it routes you.

```markdown
/codify the login lockout crashes on the 5th attempt        (a fix)
/specify lockout should trigger after 5 attempts, not 3     (a behavior change)
```

Both doors ask one mechanical question — *would satisfying the request change what a green e2e test asserts?* — and bounce a misrouted request to the other:

- **No green test flips** → defect or coverage gap: `/codify` fix mode — minimal fix + regression test — then a patch `/release`. No spec.
- **A green test must flip** → behavior change: a new spec via `/specify`, through the full pipeline; the e2e plan lists the scenarios it changes.

For behavior-preserving refactors, no spec is needed: route ugly internals through `/review` (report; `--fix` or `/codify` applies), and contract/component moves through `/planify` (refactor goal) → `/codify` → `/extract`. See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md).

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — the whole system, visually: pipeline, phases, routing, artifacts
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does and produces
- [Skills lifecycle](../.agents/skills/skills.lifecycle.md) — build, maintain, refactor coverage
