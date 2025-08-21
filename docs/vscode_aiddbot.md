# AIDDbot on VSCode and GitHub Copilot

Instructions for using `AIDDbot` with VSCode and GitHub Copilot.

> ℹ️ More info about [GitHub Copilot on VS Code](https://aiddbot.com/vscode-and-github-copilot/)

> 🔍 Look inside [the implementation of AIDDbot for GitHub Copilot](https://github.com/AIDDbot/AIDDbot/tree/main/.github)

## 🔌 Installation

`AIDDbot` is just a set of Markdown files with instructions and configuration adapted to your AI code editor. Install it by cloning this repository and copying the suitable folder into the root of your project.

Or simply use the installation prompt.

1. Copy the raw content from [AIDDbot install for Copilot](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/U_aiddbot-install-for-copilot.prompt.md)
2. Paste it into your Copilot Chat and run it in `Agent` mode.

## 🧑‍💻 Usage

GitHub Copilot is fully customizable to fit your workflow. AIDDbot is a an opinionated customization that enhances Copilot's capabilities by providing specialized chat modes, prompts and instructions.

To use them just open the chat; choose the desired chat mode from the dropdown menu and type a command prompt.

### 🦸 Chat modes

In Copilot, a chat mode sets a specific context and grants the agent access to the prompts and tools aligned with that context. ℹ️ Learn more about [Copilot Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

Copilot Chat ships with three native modes: `Ask`, `Edit`, and `Agent` that can be extended. AIDDbot adds another three based on the software development lifecycle roles: `Architect`, `Builder`, and `Craftsman`.

After installation, you'll get those new dedicated chat modes tailored to AI-Driven Development:

- [🧑‍💼 Architect chat mode](/.github/chatmodes/Architect.chatmode.md) – Discovery, architecture, and project documentation.
- [👷 Builder chat mode](/.github/chatmodes/Builder.chatmode.md) – Feature design and implementation.
- [🧑‍🔧 Craftsman chat mode](/.github/chatmodes/Craftsman.chatmode.md) – Validation, cleanup, testing, and quality engineering.

### 📋 Prompts

Prompts are predefined queries or commands that guide the AI's responses. They help elicit concrete actions or structured outputs. AIDDbot has a library of prompts tailored to various development tasks.

You can reference any prompt manually in chat using the slash prefix `/`. For your convenience, AIDDbot has its prompts organized by chat mode and role following this naming convention:

- **Architect prompts**: `/A_*`
- **Builder prompts**: `/B_*`
- **Craftsman prompts**: `/C_*`
- **User Utilities prompts**: `/U_*`

> ℹ️ Read more at the [📋 Prompts documentation](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts/_prompts.md) for a detailed overview.

### 📚 Instructions

GitHub Copilot lets you define instruction files as reusable context. They function as templates, guidelines, or best-practice references—either generic or highly specialized (libraries, tools, design patterns).

**AIDDbot** automatically injects the right instruction files per chat mode and prompt. You can also reference them manually with the `#file:` prefix.

> 🔍 Explore the [instructions folder](https://github.com/AIDDbot/AIDDbot/tree/main/.github/instructions) to see all available instruction files.
