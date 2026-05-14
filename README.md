# AIDDbot

> AI coding agents can generate code.  
> `AIDDbot` **builds software you can trust.**

**Production-ready agent skills** that plug into any AI coding environment — no CLI, no package install, just markdown files that work everywhere.

Works with: Antigravity · Claude Code · Codex · Copilot · Cursor · OpenCode · VSCode

## The problem with coding agents at scale

Modern agents are impressive for isolated features. Under real project conditions, three failure modes emerge:

| Failure | What it looks like |
|---|---|
| **Detail or invent** | The agent misses critical context — or fabricates it convincingly. |
| **Rules or chaos** | Output that violates your standards or solves the wrong problem entirely. |
| **Verify or hope** | Errors compound silently until they're expensive to fix. |

`AIDDbot` is the answer to all three.

## What you get

A set of skills you invoke directly — or let your agent trigger:

| Skill | What it does |
|---|---|
| `/initialize` | Sets up your project environment and main instructions file |
| `/specify` | Writes clear specifications with formal acceptance criteria |
| `/planify` | Breaks specs into concrete, ordered implementation steps |
| `/codify` | Generates code that follows your plans and your rules |
| `/verify` | Writes and runs E2E tests so specs are actually met |
| `/review` | Reviews code for quality and generates a feedback report |

Not just greenfield projects, get your hands dirty with **brownfield codebases** too:

| Skill | What it does |
|---|---|
| `/reversify` | Reverse-engineers legacy code for architecture insights |
| `/rulify` | Extracts real rules from your codebase to guide new generation |

> See the [AIDD Workflow](/docs/AIDD.workflow.md) for a visual overview of the full development cycle.

## Get started in 2 steps

Skills are plain markdown files — no package to install, no binary to run.

### 1. Clone into your project
```bash
git clone https://github.com/AIDDbot/AIDDbot
cp -r AIDDbot/.agents your-project/.agents
```

### 2. Initialize your environment
```markdown
`/initialize`
> — set up your project environment and main instructions file
```

> [!NOTE]
> For **legacy projects**, also run:

```markdown
`/reversify`   
> — get architecture insights from your legacy code
`/rulify`      
> — extract real coding rules from your existing codebase
```

> See [Initialize Pipelines](/docs/intialize.pipelines.md) for a visual overview.

---

## Feature pipeline

For every new feature, run the skills in order:

```
/specify → /planify → /codify → /verify → /review
```

```markdown
`/specify`  a feature requirement
> → formal spec with acceptance criteria

`/planify`  the specification
> → clear, ordered implementation plan

`/codify`   the plan
> → code that follows your rules

`/verify`   the code
> → E2E tests that confirm specs are met

`/review`   the result
> → actionable quality feedback report
```

> See [Codify Pipelines](/docs/codify.pipelines.md) for a visual overview.

---

## The AIDD philosophy

**AI-Driven Development** blends AI capabilities with proven software engineering practices. `AIDDbot` is built on three principles:

**Human in the loop** — You are the decision-maker. You own every line of code.

**Rules over tools** — Agents should follow your guidelines, not their own defaults.

**Spec-driven development** — Define the problem precisely before any code is written.

---

## Who this is for

- Teams frustrated by agents that generate plausible-but-wrong code
- Engineers who want AI acceleration without sacrificing code quality
- Projects where standards, consistency, and verifiability actually matter

---

> Code smarter!  
> *— [Alberto Basalo](https://albertobasalo.dev)*

---

**Author** · [X / Twitter](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/)  
**Courses in Spanish** · [AI Code Academy](https://aicode.academy)