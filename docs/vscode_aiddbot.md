# AIDDbot on VSCode and GitHub Copilot

> ℹ️ More info about [GitHub Copilot on VsCode](https://aiddbot.com/vscode-and-github-copilot/)

> 🔍 Look inside [the implementation of AIDDbot for GitHub Copilot ](https://github.com/AIDDbot/AIDDbot/tree/main/.github)

## 🔌 Installation

`AIDDbot` is just a set of Markdown files with instructions and configuration adapted to your AI code editor. Install it by cloning this repository and copying the suitable folder into the root of your project. 

Or simply use the installation prompt.

1. Copy the raw content from [The AIDDbot Installation Prompt](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
2. Paste it into your Copilot Chat in `Agent Mode`.

## 📋 Usage 

Copilot Chat ships with three native modes: `Ask`, `Edit`, and `Agent`. With `AIDDbot` you now add a new mode tailored to AI Driven Development. 

> ℹ️ Learn more about [Copilot Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🦸 Chat Mode: AIDDbot

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
