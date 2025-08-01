# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot**, aka _Ab_ pronounced "/eibi:/", is an AI-powered agent to assist software engineers in their daily tasks. It can help with product documentation, code generation, quality testing, and more.

It consists of a **set of prompts, instructions, rules, and tools** that enable the agent to perform its tasks effectively.

Can work with any major AI powered code editor, such as:

- **GitHub Copilot** 🟢 Ready [Look inside](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Coming soon

## 🔌Installation for GitHub Copilot

`AIDDbot` comes as a set of folders tailored for your AI code editor. You can install it by cloning this repository and placing the folder in your editor's extensions or plugins directory. Or just use the provided installation prompt.

- [ ] Copy the raw content from [The AIDDbot Installation Prompt](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Paste it into your Copilot Chat in Agent Mode.

> Read more about [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview)

## ℹ️ Usage for GitHub Copilot

### 🤖 Chat modes

There are three main chat modes available for _Ab_, one for each `AIDD` role:

- **Architect Mode**: For defining product requirements and technical solutions.
- **Builder Mode**: For features management and code generation.
- **Craftsman Mode**: For ensuring the quality through testing and documentation.

Each mode offers a set of _tools_ and _prompts_ tailored to its specific role, allowing the agent to perform its tasks effectively.

### 📋 Prompts

Using the `/` command, you can access various prompts designed for each mode. Here are the available prompts and their outcomes for each role:

#### Architect Prompts

- 📋 **PRD generation** `/PRD`: to write a Product Requirements Document.
  - 📦 **docs/PRD.md**: Goals, requirements, and constraints of the project.

- 📋 **Domain Modeling** `/DOMAIN`: to create a domain model.
  - 📦 **docs/DOMAIN.md**: Entities, relationships, and business rules of the project.

- 📋 **Systems Architecture** `/SYSTEMS`: to generate the systems technical documentation.
  - 📦 **docs/SYSTEMS.md**: System architecture, components and implementation details
  
#### Builder Prompts 

- 📋 **Backlog Management** `/BACKLOG`: Manage the product backlog and prioritize features.
  - 📦 **docs/BACKLOG.md**: The list of features grouped by epics with their priorities and statuses.

- 📋 **Feature Specification** `/feature.spec`: Generate specifications for a feature based on the provided requirements.
  - 📦 **docs/feats/f_id.spec.md**: Behavioral specifications for a feature.

- 📋 **Feature Design** `/feature.design`: Create a design document for the feature.
  - 📦 **docs/feats/f_id.design.md**: Technical design for a feature.

- 📋 **Implementation Plan** `/feature.tasks`: Outline the tasks required to implement the feature.
  - 📦 **docs/feats/f_id.tasks.md**: Task plan for implementing a feature.

- 📋 **Feature Code** `/feature.code`: Write the code by executing the implementation plan.
  - 📦 **src/**: The implementation code for a feature.

  
#### Craftsman Prompts

- 📋 **Automated Testing** `/feature.test`: Plan and generate automated tests for the provided code.
  - 📦 **docs/feats/f_id.test.md**: Unit and integration tests specifications for a feature.
  - 📦 **src/**: Implementation tests for a feature.

- 📋 **Clean Code Review** `/feature.clean`: Perform a code review based on the feature changes.
  - 📦 **src/**: Clean Code

- 📋 **Documentation Generation** `/feature.doc`: Create documentation for the provided code.
  - 📦 **src/**: Documented Code
  - 📦 **docs/STRUCTURE.md**: Overview of the folder structure and main components organization.

### 📚 Instructions

_Prompts_ use _instructions_ to guide the agent in performing specific tasks. Sometimes they are templates for documentation, others are coding guidelines. Here are some **examples**:

- 📒 **PRD instructions**: A template for generating a Product Requirements Document.
- 📒 **Architecture instructions**: A set of guidelines for applying architecture patterns.
- 📒 **TypeScript language instructions**: Best practices and coding standards for TypeScript.

Instructions are automatically added as context in the **AIDDbot** prompts, but you can add them manually if needed, just refer to them using the `#` prefix.

Example of how to add an instruction manually:

```txt
Write a function that sums two numbers following #file:lng-typescript.instructions.md 
```

### 🛠️ To do:

- Some kind of memory for the project workflow and characteristics.
- A journal for the agents to keep track of their work and decisions.
- Automated archetype inclusion based on the project requirements.

## 💭 AIDD philosophy

AIDD stands for AI Driven Development, a philosophy that combines the power of AI with software development best practices. It aims to enhance productivity, code quality, and collaboration among developers in the full software development lifecycle.

The `AIDDbot` agent follows AIDD principles and comes with three main roles:

- **Architect**: Helps in defining product requirements and managing the development process.
- **Builder**: Focuses on code generation and implementation of features.
- **Craftsman**: Ensures the quality of the code through automated testing and documentation.

Heavily inspired by : 

- [Kiro Spec-Driven Development](https://kiro.dev/docs/specs/)
- [Burke Holland BeastMode Copilot](https://burkeholland.github.io/posts/beast-mode-3-1/)
- [AI-Driven Development ABC roles (En Español)](https://aicode.academy/blog/es/el-abc-de-la-programacion-con-ia/)

> Work smarter not harder with _Ab_!

---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Instructor en Español**: [AI code Academy](https://aicode.academy)
- **AIDDbot Blog**: [AIDDbot](https://aiddbot.com)
- **AIDDbot en GitHub**: [AIDDbot](https://github.com/AIDDbot)
- **This Repository**: [AIDDbot](https://github.com/AIDDbot/AIDDbot)