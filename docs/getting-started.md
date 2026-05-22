# Getting started

Skills are plain markdown under `.agents/skills/` — no package install, no binary.

## 1. Add skills to your project

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp
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

## 2. Initialize

In your agent chat:

```markdown
/initialize this project
```

This sets up `AGENTS.md` (paths, slim Technology table per tier) and confirms skills are present. Product and structural detail go to `arch/` via `/explore` on brownfield projects.

### Brownfield (existing codebase)

Run once after initialize:

```markdown
/explore this codebase
/extract from this source code
```

| Skill | Output |
|-------|--------|
| `/explore` | Architecture insights under `{Product_Folder}/arch/` |
| `/extract` | Coding rules under `{Product_Folder}/rules/` |

See [Architect pipelines](./architect.pipelines.md).

## 3. Build a feature

Default loop:

```markdown
/specify → /planify → /codify → /verify
```

Example prompts:

```markdown
/specify a feature requirement
/planify the specification
/codify the plan
/verify the code
```

| Step | What you get |
|------|----------------|
| `/specify` | Spec with acceptance criteria (`{Product_Folder}/specs/`) |
| `/planify` | Ordered implementation plan (`plans/`) |
| `/codify` | Code + unit tests on `feat/{slug}` ([`/repository`](../.agents/skills/repository/SKILL.md) creates the branch before coding) |
| `/verify` | E2E tests against acceptance criteria; failures → report for `/repair` |

Spec `status` stays `in-progress` during `/codify` and `/verify`. `/verify` marks each criterion `[x]` when tests pass.

If verification fails, `/verify` writes `{Product_Folder}/reports/{slug}.verify.report.md`. Run `/repair` on that report, then `/verify` again. When tests pass, `/verify` suggests `/review`.

See [Builder pipelines](./builder.pipelines.md).

## 4. Quality and release

After implementation:

```markdown
/review the source code
/repair reported issues
/release a new version
```

| Skill | What it does |
|-------|----------------|
| `/review` | Quality, accessibility, or compliance report |
| `/repair` | Fixes from review or verify reports |
| `/release` | Semver bump, `CHANGELOG.md`, spec `status: done` and `released-version` |
| `/repository` | Branches and conventional commits (invoked by producing skills) |

Before `/release`: spec at `in-progress`, associated plans `done` — see [`/release` skill](../.agents/skills/release/SKILL.md).

Git: project `AGENTS.md` · [`/repository`](../.agents/skills/repository/SKILL.md).

See [Craftsman pipelines](./craftsman.pipelines.md).

## Optional: UI from design

```markdown
/design from design specification
```

See [Designer pipelines](./designer.pipelines.md).

## Roadmap

`/refactor` is WIP — see [README § What you get](../README.md#what-you-get).

## Next

- [Why AIDD](../README.md#why-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — diagram, artifacts, git rules
- [Skills catalog](../.agents/AIDD.skills-catalog.md) — prerequisites and when to use each skill
- [Skills index](../.agents/skills/README.md) — typical loops and status chains
