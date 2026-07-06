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

## 2. Architect the project

In your agent chat:

```markdown
/explore this project
```

This writes the root agent-instructions file (`AGENTS.md`, or `CLAUDE.md` depending on your harness) — paths, conventions, git rules, product brief — and the system architecture document `arch/system.arch.md` (C4 L2: containers) and the domain Entity-Relationship diagram `arch/ER.md`.

Then document each **container** (a runnable unit from `system.arch.md`: `api`, `web`, `db`...). Run once per container:

```markdown
/extract the api container
```

This writes `arch/{container}.arch.md` (C4 L3 components, contract surface) and `rules/{container}.rules.md` (coding rules for that container). When a container owns the persistence store or exposes an API, the field-level schema is split into the system-wide `arch/db.schema.md` and/or `arch/api.schema.md` (written while extracting that container, linked from any container that benefits) so the container arch stays readable.

Both skills are **mode-aware**: they **prescribe** on greenfield (no source code yet) and **extract from the codebase** on brownfield. When every container is documented, start building.

See [Architect pipelines](./architect.pipelines.md).

## 3. Build a feature

Default loop:

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

- `/specify` captures **what** — a one-page spec with per-container expected results and acceptance criteria. No technical detail.
- `/planify` captures **how** — one implementation plan per affected container, the transversal `e2e.plan.md` included (one scenario per acceptance criterion).
- `/codify` implements **one container plan per run** (sessions can be parallel): functional code + unit tests — and the e2e suite from its plan.
- `/verify` runs the e2e suite and reports — never fixes: defects land in `e2e.report.md` triaged with a handoff each. Code/test bugs go back through `/codify` per affected container; structural defects escalate to `/planify`. Repeat `/verify` until green. Implementation and evaluation never share a session.

See [Builder pipelines](./builder.pipelines.md).

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
- `/release` bumps the version, updates `CHANGELOG.md` and docs, reconciles the architecture docs, and closes the spec (`status: done`, `released-version`).

See [Craftsman pipelines](./craftsman.pipelines.md).

## 5. Maintain a released feature

Once a spec is `done` it is immutable. Changes to released features enter via `/modify`:

```markdown
/modify the login feature: lockout should trigger after 5 attempts, not 3
```

`/modify` asks one triage question — *does the current code pass the released acceptance criteria?* — and routes:

- **Violates a criterion** → implementation defect: direct fix + regression test, then a patch `/release`.
- **Matches the criteria** (the behavior itself must change) → requirement change: a new spec via `/specify` with `amends: {old-slug}`, through the full pipeline.

For behavior-preserving refactors, no spec is needed: route ugly internals through `/review` (report; `--fix` or `/codify` applies), and contract/component moves through `/planify` (refactor goal) → `/codify` → `/extract`. See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md).

## Next

- [Why AIDD](../README.md#why-do-you-need-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — diagram, artifacts
- [Design decisions](./design.decisions.md) — why the pipeline is shaped this way
- [Skills catalog](../.agents/skills/skills.catalog.md) — what each skill does and produces
- [Skills lifecycle](../.agents/skills/skills.lifecycle.md) — build, maintain, refactor coverage
