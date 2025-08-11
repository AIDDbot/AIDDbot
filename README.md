# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot** is an AI-powered assistant for software engineers' daily work. It helps with product documentation, code generation, quality testing, and more.

It consists of a **set of prompts, instructions, rules, and tools** that let the agent carry out tasks effectively.

It is useful for any language or project type, but it's especially suited for long-term, corporate-grade development.

It can work with several AI-enabled code editors:

- **GitHub Copilot** 🟢 Ready [Look inside](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Coming soon

## 🔌 Installation

`AIDDbot` is a set of instruction and configuration files adapted to your AI code editor. Install it by cloning this repository and copying the suitable folder into the root of your project. Or simply use the installation prompt (for VS Code + GitHub Copilot).

### For GitHub Copilot

> Read more about [GitHub Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)

- [ ] Copy the raw content from [The AIDDbot Installation Prompt](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Paste it into your Copilot Chat in `Agent Mode`.

## ℹ️ Usage (GitHub Copilot)

> Copilot Chat ships with three native modes: `Ask`, `Edit`, and `Agent`. With AIDDbot you now add a new mode tailored to AI Driven Development. Learn more: [Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🤖 Chat Mode

After installation, you'll get a new chat mode: **AIDDbot**.

- **[AIDDbot Chat Mode](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: Mode configured for enterprise architecture, building, and quality engineering workflows.

In Copilot, a chat mode sets a specific context and grants the agent access to prompts and tools aligned with that context.

### 🧭 Roles

This mode has role prompts aligned with the three AI-Driven Development roles: Architect / Builder / Craftsman.

- **[Architect role prompt](/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect` – General project documentation & discovery.
- **[Builder role prompt](/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder` – Feature design & implementation.
- **[Craftsman role prompt](/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman` – Validation, cleanup & documentation.

These role prompts can orchestrate other specialized prompts as needed. Below is a grouped list by role for clarity and manual invocation:

### 📋 Prompts

Use `/` to invoke predefined prompts. Outputs are deterministic file artifacts.

#### Architect Prompts (Ab_Architect)

- 📋 **[PRD Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/PRD.prompt.md)** `/PRD`
  - 📦 **docs/PRD.md**: Project goals, requirements, constraints.
- 📋 **[Domain Modeling](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/DOMAIN.prompt.md)** `/DOMAIN`
  - 📦 **docs/DOMAIN.md**: Entities, relationships, business rules.
- 📋 **[Systems Architecture](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/SYSTEMS.prompt.md)** `/SYSTEMS`
  - 📦 **docs/SYSTEMS.md**: System architecture, components, implementation details.

#### Builder Prompts (Ab_Builder)

- 📋 **[Backlog Management](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/BACKLOG.prompt.md)** `/BACKLOG`
  - 📦 **docs/BACKLOG.md**: Epics & features with priorities and status.
- 📋 **[Feature Specification](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.spec.prompt.md)** `/feature.spec`
  - 📦 **docs/feats/f_id.spec.md**: Behavioral specs for a feature.
- 📋 **[Feature Design](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.design.prompt.md)** `/feature.design`
  - 📦 **docs/feats/f_id.design.md**: Technical design for a feature.
- 📋 **[Implementation Plan](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.tasks.prompt.md)** `/feature.tasks`
  - 📦 **docs/feats/f_id.tasks.md**: Task plan.
- 📋 **[Feature Code](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.code.prompt.md)** `/feature.code`
  - 📦 **src/**: Implementation code.

#### Craftsman Prompts (Ab_Craftsman)

- 📋 **[Automated Testing](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.test.prompt.md)** `/feature.test`
  - 📦 **docs/feats/f_id.test.md**: Unit & integration test specs.
  - 📦 **src/**: Test implementation.
- 📋 **[Clean Code Review](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.clean.prompt.md)** `/feature.clean`
  - 📦 **src/**: Refined code.
- 📋 **[Documentation Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.doc.prompt.md)** `/feature.doc`
  - 📦 **src/**: Documented code.
  - 📦 **docs/STRUCTURE.md**: Folder & component overview.

### 📚 Instructions

GitHub Copilot lets you define instruction files as reusable context. They function as templates, guidelines, or best-practice references—either generic or highly specialized (libraries, tools, design patterns).

**AIDDbot** automatically injects the right instruction files per prompt. You can also reference them manually with the `#file:` prefix.

Examples:

- 📒 **[PRD Instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/PRD.instructions.md)** `#file:PRD.instructions.md`
- 📒 **[Architecture Instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/architecture.instructions.md)** `#file:architecture.instructions.md`
- 📒 **[TypeScript Language Instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/lng-typescript.instructions.md)** `#file:lng-typescript.instructions.md`

Manual usage example:

```txt
Write a function that sums two numbers following #file:lng-typescript.instructions.md
```

#### Adding Instructions

Beyond the built-in instruction set you can create custom ones for your stack—automatically—using the agent itself.

- 📋 **[Instruction Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/Ab_add-instructions.prompt.md)** `/Ab_add-instructions`: Generates custom instruction files for the project technology stack.

This prompt is auto-invoked by the Architect role prompt after stack dependency identification, but you can also call it manually with a scope hint:

```txt
/Ab_add-instructions java language
```

### 🛠️ In progress

- Project workflow & characteristics memory.
- Work log / journal for traceability of decisions.
- Automatic archetype inclusion based on requirements.
- Self-improvement routines for AIDDbot.

## 💭 AIDD Philosophy

AIDD (AI Driven Development) blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full lifecycle.

The `AIDDbot` agent adheres to the three [AIDD Manifesto](https://aiddbot.com/aidd-manifesto) principles:

- **🧑‍💻 Human in the Loop**: Your work becomes more strategic, collaborative, and accountable.
- **🔧 Rules over Tools**: Tools are just means; but rules & processes provide durable value.
- **✅ AI Quality**: Not only higher productivity, but also maintainable, high-quality software.

> Work smarter, not harder, with _Ab_!

---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Cursos en Español**: [AI code Academy](https://aicode.academy)
- **AIDDbot.com Blog**: [AIDDbot.com](https://aiddbot.com)
- **AIDDbot org at GitHub**: [GitHub/AIDDbot](https://github.com/AIDDbot)
- **This Repository**: [GitHub/AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)