# 🤖 AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

> Lee este documento [en Español aquí](https://github.com/AIDDbot/AIDDbot/blob/main/README.es.md)

## ❓ What is AIDDbot?

**It is an AI-powered assistant for software engineers**  that helps with:

- product documentation, 
- code generation, 
- testing and documentation.

## ⚙️ How does it work?

**Enhances your IDE and development agent** with a set of:

- prompts,
- instructions or rules,
- tools and configurations.

## 🎯 Why do you need AIDDbot?

**To develop large and complex projects**, which pose a challenge for LLMs due to:

- memory limitations in providing context,
- hallucinations from training deficiencies, and
- the need to maintain consistency over time.

---

## 🔍 Introduction to AIDDbot

It can work with several AI-enabled code editors:

- **GitHub Copilot** ✔️ Ready [Look inside](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ ⏳ Coming soon

> ℹ️ More info about [AIDDbot Workflow](https://aiddbot.com/aiddbot-in-your-workflow)

## 🔌 Installation

`AIDDbot` is just a set of Markdown files with instructions and configuration adapted to your AI code editor. Install it by cloning this repository and copying the suitable folder into the root of your project. 

Or simply use the installation prompt (for VSCode + GitHub Copilot).

### More info about [GitHub Copilot on VsCode](https://aiddbot.com/vscode-and-github-copilot/)

### For GitHub Copilot

> Read more about [GitHub Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)

- [ ] Copy the raw content from [The AIDDbot Installation Prompt](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Paste it into your Copilot Chat in `Agent Mode`.

## 📋 Usage (GitHub Copilot)

> Copilot Chat ships with three native modes: `Ask`, `Edit`, and `Agent`. With `AIDDbot` you now add a new mode tailored to AI Driven Development. Learn more: [Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🤖 Chat Mode: AIDDbot

After installation, you'll get a new chat mode: **AIDDbot**.

- **[AIDDbot Chat Mode](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: Mode configured for enterprise architecture, building, and quality engineering workflows.

In Copilot, a chat mode sets a specific context and grants the agent access to prompts and tools aligned with that context.

### 🧑‍💻 Roles Prompts

Prompts are predefined queries or commands that guide the AI's responses. They help in eliciting specific information or actions from the AI.

There are three prompts aligned with the three AI-Driven Development roles: Architect / Builder / Craftsman. Calling this prompts makes AIDDbot behave and respond according to the selected role.

- **[Architect role prompt](/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect` – General project documentation & discovery.
- **[Builder role prompt](/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder` – Feature design & implementation.
- **[Craftsman role prompt](/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman` – Validation, cleanup & documentation.

These role prompts will orchestrate other specialized prompts as needed. Feel free to inspect the [prompts folder](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts) to explore all available options.

### 📚 Instructions

GitHub Copilot lets you define instruction files as reusable context. They function as templates, guidelines, or best-practice references—either generic or highly specialized (libraries, tools, design patterns).

**AIDDbot** automatically injects the right instruction files per prompt. You can also reference them manually with the `#file:` prefix.

Go to [instructions folder](https://github.com/AIDDbot/AIDDbot/tree/main/.github/instructions) to explore all available instruction files.

### 🚧 In progress

- Self-improvement routines for AIDDbot.
- Project workflow & characteristics memory.
- Work log / journal for traceability of decisions.
- Automatic archetype inclusion based on requirements.

## 💭 AIDD Philosophy

AIDD (AI-Driven Development) blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full lifecycle.

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
- **AIDDbot.com Blog**: [AIDDbot.com](https://aiddbot.com)
- **AIDDbot org at GitHub**: [GitHub/AIDDbot](https://github.com/AIDDbot)
- **This Repository**: [GitHub/AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)
- **Academia en Español**: [AI code Academy](https://aicode.academy)
- **Curso de formación**: [Aprende a usar GitHub Copilot profesionalmente](https://aicode.academy/cursos/vs-code-copilot/)