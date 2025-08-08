# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot**, also known as _Ab_ pronounced "/ab/", is an AI-powered agent to assist software engineers in their daily tasks. It can help with product documentation, code generation, quality testing, and other tasks.

It consists of a set of prompts, instructions, rules, and tools that allow the agent to perform their tasks effectively.

It is useful for any language and type of project, although it is more suitable for corporate and long-range developments.

_Ab_ can work with any AI-powered code editor, such as:

- **GitHub Copilot** 🟢 Ready [Look inside](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Coming soon

## 🔌Installation for GitHub Copilot

`AIDDbot` comes as a set of folders tailored for your AI code editor. You can install it by cloning this repository and placing the folder in your editor's extensions or plugins directory. Or just use the provided installation prompt.

- [ ] Copy the raw content from [The AIDDbot Installation Prompt](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Paste it into your Copilot Chat in Agent Mode.

> Read more about [GitHub Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)

## ℹ️ Usage for GitHub Copilot

### 🤖 Chat mode

There is now a single chat mode: **AIDD**.

- **[AIDD Chat Mode](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: The unified mode for architecture, building, and craftsmanship workflows.

Roles are prompts you can invoke inside AIDD to set focus:

- **[Architect role prompt](/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect`
- **[Builder role prompt](/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder`
- **[Craftsman role prompt](/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman`

Use a role prompt first, then run the specific task prompts listed below.

### 📋 Prompts

Using the `/` command, you can access various prompts designed for each mode. Here are the available prompts and their outcomes for each role:

#### Architect Prompts

- 📋 **[PRD generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/PRD.prompt.md)** `/PRD`: to write a Product Requirements Document.
  - 📦 **docs/PRD.md**: Goals, requirements, and constraints of the project.

- 📋 **[Domain Modeling](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/DOMAIN.prompt.md)** `/DOMAIN`: to create a domain model.
  - 📦 **docs/DOMAIN.md**: Entities, relationships, and business rules of the project.

- 📋 **[Systems Architecture](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/SYSTEMS.prompt.md)** `/SYSTEMS`: to generate the systems technical documentation.
  - 📦 **docs/SYSTEMS.md**: System architecture, components and implementation details
  
#### Builder Prompts 

- 📋 **[Backlog Management](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/BACKLOG.prompt.md)** `/BACKLOG`: Manage the product backlog and prioritize features.
  - 📦 **docs/BACKLOG.md**: The list of features grouped by epics with their priorities and statuses.

- 📋 **[Feature Specification](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.spec.prompt.md)** `/feature.spec`: Generate specifications for a feature based on the provided requirements.
  - 📦 **docs/feats/f_id.spec.md**: Behavioral specifications for a feature.

- 📋 **Feature Design** `/feature.design`: Create a design document for the feature.
  - 📦 **docs/feats/f_id.design.md**: Technical design for a feature.

- 📋 **[Implementation Plan](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.tasks.prompt.md)** `/feature.tasks`: Outline the tasks required to implement the feature.
  - 📦 **docs/feats/f_id.tasks.md**: Task plan for implementing a feature.

- 📋 **[Feature Code](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.code.prompt.md)** `/feature.code`: Write the code by executing the implementation plan.
  - 📦 **src/**: The implementation code for a feature.

  
#### Craftsman Prompts

- 📋 **[Automated Testing](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.test.prompt.md)** `/feature.test`: Plan and generate automated tests for the provided code.
  - 📦 **docs/feats/f_id.test.md**: Unit and integration tests specifications for a feature.
  - 📦 **src/**: Implementation tests for a feature.

- 📋 **[Clean Code Review](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.clean.prompt.md)** `/feature.clean`: Perform a code review based on the feature changes.
  - 📦 **src/**: Clean Code

- 📋 **[Documentation Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.doc.prompt.md)** `/feature.doc`: Create documentation for the provided code.
  - 📦 **src/**: Documented Code
  - 📦 **docs/STRUCTURE.md**: Overview of the folder structure and main components organization.

### 📚 Instructions

_📋Prompts_ use _📒instructions_ to guide the agent in performing specific tasks. Sometimes they are templates for documentation, others are coding guidelines. Here are some **examples**:

- 📒 **[PRD instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/PRD.instructions.md)**: A template for generating a Product Requirements Document.
- 📒 **[Architecture instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/architecture.instructions.md)**: A set of guidelines for applying architecture patterns.
- 📒 **[TypeScript language instructions](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/lng-typescript.instructions.md)**: Best practices and coding standards for TypeScript.

Instructions are automatically added as context in the **AIDDbot** prompts, but you can add them manually if needed, just refer to them using the `#` prefix.

Example of how to add an instruction manually:

```txt
Write a function that sums two numbers following #file:lng-typescript.instructions.md 
```

### 🛠️ To do:

- Some kind of memory for the project workflow and characteristics.
- A journal for the agents to keep track of their work and decisions.
- Automated archetype inclusion based on the project requirements.
- AIDDbot auto improvement...

## 💭 AIDD philosophy

AIDD stands for AI Driven Development, a philosophy that combines the power of AI with software development best practices. It aims to enhance productivity, code quality, and collaboration among developers in the full software development lifecycle.

The `AIDDbot` agent follows the three [AIDD Manifesto](https://aiddbot.com/aidd-manifesto) principles:

- **🧑‍💻 Human In the Loop**: Your job more strategist, collaborative and responsible.
- **🔧 Rules over Tools**: Tools are just a means to an end, the rules and processes are what matter.
- **✅ AI Quality**: Development is not only more productive but also of higher quality and easy to maintain.

> Work smarter not harder with _Ab_!

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