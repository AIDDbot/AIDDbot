# AIDDbot on VSCode and GitHub Copilot

Instructions for using `AIDDbot` with **VSCode** IDE and **GitHub Copilot** agent.

## 🔌 Installation

`AIDDbot` is just **a set of Markdown files** with instructions and configuration adapted to your AI code editor. Install it by cloning this repository and copying the `.github` folder into the root of your project.

Or simply, use the installation prompt.

1. Copy the raw content from [AIDDbot install for Copilot](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/U_aiddbot-install-for-copilot.prompt.md)
2. Paste it into your Copilot Chat and run it in `Agent` mode.

> ℹ️ More info about [GitHub Copilot on VS Code](https://aiddbot.com/vscode-and-github-copilot/)

## 🧑‍💻 Usage

GitHub Copilot is fully customizable to fit your workflow. AIDDbot is a an opinionated customization that enhances Copilot's capabilities by providing specialized _chat modes_, _prompts_ and _instructions_.

To use them just open the Copilot chat; choose the desired chat mode from the dropdown menu and type a command prompt.

### 🦸 Chat modes

- Specialized AI personas and conversation modes for different roles and contexts

In Copilot, a chat mode sets a specific context and grants the agent access to the prompts and tools aligned with that context. 
Copilot Chat ships with three native modes: `Ask`, `Edit`, and `Agent` that can be extended. AIDDbot adds another three based on the software development lifecycle roles: `Architect`, `Builder`, and `Craftsman`.

After installation, you'll get those new dedicated chat modes tailored to AI-Driven Development
  
- **🧑‍💼 Architect chat mode** – Discovery, architecture, and project documentation.
- **👷 Builder chat mode** – Feature design and implementation.
- **🧑‍🔧 Craftsman chat mode** – Validation, cleanup, testing, and quality engineering.

> ℹ️ Read more at the [🦸 Chat modes documentation](https://github.com/AIDDbot/AIDDbot/tree/main/.github/chatmodes/_chatmodes.md) for a detailed overview.

### 📋 Prompts

- Focused, task-specific prompts for generating code, documentation, and solving specific problems

Prompts are predefined queries or commands that guide the AI's responses. They help elicit concrete actions or structured outputs. AIDDbot has a library of prompts tailored to various development tasks.

You can reference any prompt manually in chat using the 🎸 slash prefix `/`. For your convenience, AIDDbot has its prompts organized by chat mode or role following this naming convention:

- **🧑‍💼 Architect prompts**: `/A_*`
- **👷 Builder prompts**: `/B_*`
- **🧑‍🔧 Craftsman prompts**: `/C_*`
- **🧑‍💻 User Utilities prompts**: `/U_*`

> ℹ️ Read more at the [📋 Prompts documentation](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts/_prompts.md) for a detailed overview.

### 📚 Instructions

- Comprehensive coding standards and best practices that apply to specific file patterns or entire projects

GitHub Copilot lets you define instruction files as reusable context. They function as templates, guidelines, or best-practice references—either generic or highly specialized (libraries, tools, design patterns).

**AIDDbot** automatically injects the right instruction files per chat mode and prompt. You can also reference them manually with the `#file:` prefix.

They are grouped into several categories for easier navigation, following a consistent naming convention.

- **Language Instructions**: `#lng_*`
- **Framework Instructions**: `#frw_*`
- **Library Instructions**: `#lib_*`
- **Tooling Instructions**: `#too_*`
- **Standards Instructions**: `#std_*`
- **Best Practices Instructions**: `#bst_*`
- **Template Instructions**: `#tpl_*`

> ℹ️ Read more at the [📚 Instructions documentation](https://github.com/AIDDbot/AIDDbot/tree/main/.github/instructions/_instructions.md) for a detailed overview.

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