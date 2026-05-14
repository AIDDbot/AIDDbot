# AIDDbot

> AI coding agents can generate code.
> 
> `AIDDbot` **builds software you can trust.**

**Production-ready agent skills** for any AI coding environment:

Antigravity · Claude Code · Codex · Copilot · Cursor · OpenCode · VSCode...

## Why AIDDbot?

Modern coding agents are impressive for generating isolated features. At scale, they break down:

| Problem | What it looks like |
|---|---|
| **Detail or invent** | The agent either misses important details or invents them. |
| **Rules or chaos** | Code that violates your standards or does not solve the real problem. |
| **Verify or hope** | Errors go unnoticed and compound over time. |

`AIDDbot` optimizes for reliable software delivery.

## What you get

> [!IMPORTANT]
> `AIDDbot` is **a set of skills** that can be directly invoked by you, or triggered by your agent.

| Skill | What it does |
|---|---|
| `initialize` | Sets up your project environment and main instructions file |
| `specify` | Writes clear specifications for features including acceptance criteria |
| `planify` | Breaks down specifications or requirements into implementation plans |
| `codify` | Generates code following your plans and rules |
| `verify` | Writes and runs E2E tests to ensure code meets specifications |
| `review` | Reviews code for quality, and generates feedback reports|
| For Brownfield |---|
| `reversify` | Reverse engineers legacy code to get architecture insights |
| `rulify` | Extracts rules from actual code to generate new code |

> [!NOTE]
> See the [AIDD Workflow](/docs/AIDD.workflow.md) for a visual overview of the full development cycle.

## How it works

### 1. Clone the repo into your project

Skills are just markdown files ready to be used- no CLI, no package install.

```bash
git clone https://github.com/AIDDbot/AIDDbot
cp -r AIDDbot/.agents your-project/.agents
```

### 2. Initialize your project

Agents need a clear environment and instructions to work effectively. 

```markdown
`/initialize`
> -- to set up your project environment and main instructions file
```

#### 2.1 Extract insights from your legacy code (brownfield)

For a brownfield project, you should also run specific skills to extract insights from your legacy code.

```markdown
`/reversify`
> -- to get architecture insights from your legacy code
`/rulify`
> -- to extract rules from your actual code and generate new code based on them
```

> [!NOTE]
> For a visual overview see the [Initialize Pipelines](/docs/intialize.pipelines.md).

### 3. Codify feature by feature

For each feature, run the skills in order: `specify` → `planify` → `codify` → `verify` → `review`.

```markdown
`/specify` a feature requirement
> -- to get a formal specification with acceptance criteria
`/planify` the specification into implementation steps
> -- to break down the specification into a clear implementation plan
`/codify` the implementation plan into code
> -- to generate code following your plans and rules
`/verify` the code with E2E tests
> -- to ensure code meets specifications
`/review` the code 
> -- to get a feedback report on your code
```

> [!NOTE]
> For a visual overview see the [Codify Pipelines](/docs/codify.pipelines.md).

## AIDD philosophy

**AI-Driven Development** blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full lifecycle. `AIDDbot` is built on these core principles:

- **Human in the loop** You are the decision-maker and responsible for the code.

- **Rules over tools** Make your agents behave according to your guidelines.

- **Spec-driven development** Detailed problem definitions with acceptance criteria.

> Code smarter!  
> *— [Alberto Basalo](https://albertobasalo.dev)*

---

**About the Author** [X/Twitter](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/) 

**Formación en Español** [AI Code Academy](https://aicode.academy)
