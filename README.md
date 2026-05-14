# AIDDbot

> AI agents are powerful. AIDDbot makes them reliable.

**Spec-driven Development** workflows for any programming agents: 
- Claude Code · Codex · Copilot · Cursor · Gemini · OpenCode...

## Why AIDDbot?

Modern coding agents are impressive for generating isolated features. At scale, they break down:

| Problem | What it looks like |
|---|---|
| **Detail or invent** | The agent either misses important details or invents them. |
| **Rules or chaos** | Well-written code that violates your contracts or does not solve the real problem. |
| **Verify or repeat** | Details vanish between sessions, human validation requires patience. |

**AIDDbot** solves this by adding structure *around* the agent.

## What you get

> [!IMPORTANT]
> A set of Skills that can be directly invoked by you or triggered by your agent.

| Skill | What it does |
|---|---|
| `initialize` | Sets up your project environment and main instructions file |
| `specify` | Writes clear specifications for features and bug fixes |
| `planify` | Breaks down specifications into actionable implementation plans |
| `codify` | Generates code for features and bug fixes following your plans |
| `verify` | Writes and runs E2E tests to ensure code meets specifications |
| `review` | Reviews code for quality, style, and adherence to specifications |
|---|---|
| `reversify` | Reverse engineers legacy code to get architecture insights |
| `rulify` | Extracts rules from actual code to generate new code |
|---|---|
| `design` | Applies a design system to user interfaces (to be renamed) |
| `analyze` | To be done: Analyzes legacy code |
| `refactorize` | To be done: Refactors legacy code |


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

Open your agent chat and run the `initialize` skill.  
It sets up your project paths, product overview, and technical stack.

```md
> Some agents allows you to call skills as slash commands
/initialize
> others require telling the agent to run the skill
Run the "initialize" skill to set up your project environment and main instructions file.
```

#### 2.1 Extract insights from your legacy code (brownfield)

For a brownfield project, you should also run specific skills to extract insights from your legacy code.

```md
/reversify
> -- to get architecture insights from your legacy code
/rulify
> -- to extract rules from your actual code and generate new code based on them
```

> [!NOTE]
> For a visual overview see the [Initialize Pipelines](/docs/intialize.pipelines.md).

### 3. Go feature by feature

For each feature, run the skills in order: `specify` → `planify` → `codify` → `verify` → `review`.

```md
/specify my feature requirement
> -- then... 
/planify the specification into implementation steps
> -- then...
/codify the implementation plan into code
> -- then...
/verify the code with E2E tests
> -- then...
/review the code for quality, style, and adherence to specifications
-->
```

> [!NOTE]
> For a visual overview see the [Codify Pipelines](/docs/codify.pipelines.md).

## AIDD philosophy

**AI-Driven Development** blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full lifecycle.

- **Human in the loop** You are the decision-maker and responsible for the code.

- **Rules over tools** Make your agents behave according to your guidelines.

- **Spec-driven development** Detailed problem definitions with acceptance criteria.

> Code smarter!  
> *— Alberto Basalo*

---

**Author** [Alberto Basalo](https://albertobasalo.dev) · [X](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/) · [Blog](https://aiddbot.com)

**Training in Spanish** [AI Code Academy](https://aicode.academy)
