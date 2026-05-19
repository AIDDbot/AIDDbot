# AIDDbot

> AI coding agents can generate code.  
> `AIDDbot` **builds software you can trust.**

**Production-ready agent skills** that plug into any AI coding environment — no CLI, no package install, just markdown files that work everywhere.

Try it with Antigravity · Claude Code · Codex · Copilot · Cursor · OpenCode · VSCode

## The problem with coding agents at scale

Modern agents are impressive for isolated features or small apps. Under real project conditions, three failure modes emerge, but AI-Driven Development (AIDD) can solve them all:

| Failure | What it looks like | AIDD |
|---|---|---|
| **Detail or invent** | Critical context is missing — or fabricated convincingly. | _Spec Driven Development_|
| **Rules or chaos** | Code that violates your standards or is unmaintainable. | _Rules over Tools_|
| **Verify or hope** | Errors compound silently until they're expensive to fix. | _Human in the Loop_ |

`AIDDbot` implements all three AI-DD principles to help you solve them all.

## What you get

A set of skills you invoke directly — or let your agent trigger:

> See the full [AIDD Workflow](/docs/AIDD.workflow.md) for a visual overview of the skills catalog.

### Architecture documentation

Start by initializing your project environment:

| Skill | What it does |
|---|---|
| `/initialize` | Sets up your project environment and main instructions file |
| For Brownfield |---|
| `/explore` | Reverse-engineers legacy code for architecture insights |
| `/extract` | Extracts real rules from your codebase to guide new generation |

> See [Architect Pipelines](/docs/architect.pipelines.md) for a visual overview.

### Building features

And then, for every new feature use the following skills in order:

| Skill | What it does |
|---|---|
| `/specify` | Writes clear specifications with formal acceptance criteria |
| `/planify` | Breaks specs into concrete, ordered implementation steps |
| `/codify` | Generates code that follows your plans and your rules |
| `/verify` | Writes and runs E2E tests; on failure, produces a report for `/repair` |

> See [Builder Pipelines](/docs/builder.pipelines.md) for a visual overview.

### Quality, design, and release

| Skill | What it does |
|---|---|
| `/review` | Reviews code for quality, accessibility, or compliance and generates a feedback report |
| `/repair` | Fixes issues from review or verify reports (preferred path for all reported defects) |
| `/render` | *(experimental)* Implements production-grade frontend UI from a design specification |
| `/release` | Bumps version, updates CHANGELOG and docs, marks specs `released` |
| `/repository` | Branches and conventional commits; invoked by other skills (not run alone in the pipeline) |

Roadmap — not yet available:

| Skill | What it will do |
|---|---|
| `/refactor` | Improves existing code without changing its behavior |

> See [Craftsman Pipelines](/docs/craftsman.pipelines.md) for a visual overview.

## Get started in 2 steps

Skills are plain markdown files — no package to install, no binary to run.

### 1. Clone into your project
From inside your destination repository root, clone this repo.

`git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp`

Then move the `.agents` folder to your project root and delete the temporary clone:

```bash
# Bash (macOS/Linux/Git Bash)
cp -r AIDDbot-tmp/.agents ./.agents
rm -rf AIDDbot-tmp
```

```powershell
# PowerShell (Windows)
Copy-Item -Path AIDDbot-tmp/.agents -Destination ./.agents -Recurse -Force
Remove-Item -Path AIDDbot-tmp -Recurse -Force
```

### 2. Initialize your environment
```markdown
`/initialize` this project
> project main instructions
```

> [!NOTE]
> For **legacy projects**, also run:

```markdown
/initialize → /explore → /extract 
```

```markdown
`/explore` this codebase
> architecture insights
`/extract` from this source code      
> actual coding conventions
```

---

## Then, build features you can trust

To build every new feature, run those skills in order:

```markdown
/specify → /planify → /codify → /verify
```

You can check the output of each step. Remember, Human in the loop! 

```markdown
`/specify`  a feature requirement
> formal spec with acceptance criteria
`/planify`  the specification
> clear, ordered implementation plan
`/codify`   the plan
> code on `feat/{slug}` (branch created before coding)
`/verify`   the code
> E2E tests that confirm specs are met
```

If verification fails, `/verify` writes a report under `{Product_Folder}/reports/`. Use `/repair` on that report, then re-run `/verify`.

### Finally craft quality software with confidence

After building, run:

```markdown
`/review`   the source code
> actionable quality feedback report
`/repair`   reported issues (from review or verify)
> fixed code issues
`/release`  a new version
> semver bump, CHANGELOG, README, spec `status: released` (merge `feat/{slug}` to the default branch first unless you explicitly release from the feature branch)
```

Git branching and commits are handled automatically via [`/repository`](/.agents/skills/repository/) when you run other skills (`feat/{slug}` on `/codify`, conventional commits on completion). The `/refactor` skill is on the roadmap ([stub only](/.agents/skills/refactor/)).

---

## The AIDD philosophy

**AI-Driven Development** blends AI capabilities with proven software engineering practices. `AIDDbot` is built on three principles:

- **Human in the loop** — You are the decision-maker. You own every line of code.

- **Rules over tools** — Agents should follow your guidelines, not their own defaults.

- **Spec-driven development** — Define the problem precisely before any code is written.

---

### Who this is for

- Teams frustrated by agents that generate plausible-but-wrong code
- Engineers who want AI acceleration without sacrificing code quality
- Projects where standards, consistency, and verifiability actually matter

---

> Code smarter!  
> *— [Alberto Basalo](https://albertobasalo.dev)*

---

**Author** · [X-Twitter](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/)  
**Courses in Spanish** · [A.I. Code Academy](https://aicode.academy)
**Repository** · [GitHub / AIDDbot](https://github.com/AIDDbot/AIDDbot)