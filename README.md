# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot**, aka _Ab_ pronounced "/eibi:/", is an AI-powered agent to assist software engineers in their daily tasks. It can help with product documentation, code generation, quality testing, and more.

It consists of a **set of prompts, instructions, rules, and tools** that enable the agent to perform its tasks effectively.

Can work with any major AI powered code editor, such as:

- **GitHub Copilot** 🟢 Ready
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Coming soon

## 🔌Installation instructions for GitHub Copilot

`AIDDbot` comes as a set of folders tailored for your AI code editor. You can install it by cloning the repository and placing the folder in your editor's extensions or plugins directory.

#### Manual Installation for a brand new project: 

- [ ] Clone the repository AIDDbot repository to a new folder for your project
`git clone -b main --single-branch https://github.com/yourusername/AIDDbot.git your-project-name`
- [ ] Keep only the `.github` folder and feel free to remove the rest.

#### Manual Installation to your existing project: 

- [ ] Clone the repository AIDDbot repository to a temporary folder inside your repo
`git clone -b main --single-branch https://github.com/yourusername/AIDDbot.git AIDDbot-temp`
- [ ] Copy only the `.github` folder from `AIDDbot-temp` folder to your root folder
- [ ] Remove the temporary `AIDDbot-temp` folder

#### Semi Automatic Installation to any project:

- [ ] Copy the prompt file [Ab_install-for-copilot.prompt](.github/prompts/Ab_install-for-copilot.prompt.md) to the same location at your folder
- [ ] Open Copilot chat and run the `/Ab_install-for-copilot.prompt` command.

> Read more about [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview)

## ℹ️ Usage instructions for GitHub Copilot

### 🤖 Chat modes

There are three main chat modes available for _Ab_, one for each `AIDD` role:

- **Architect Mode**: For defining product requirements and managing the development process.
- **Builder Mode**: For code generation and implementation of features.
- **Craftsman Mode**: For ensuring the quality of the code through automated testing and documentation.

Each mode offers a set of tools and prompts tailored to its specific role, allowing the agent to perform its tasks effectively.

### 📋 Prompts

Using the _slash_ command, you can access various prompts designed for each mode. Here are some examples:

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

Prompts use instructions to guide the agent in performing specific tasks. Sometimes are templates for documentation, others are coding guidelines. Here are some **examples**:

- 📒 **PRD instructions**: A template for generating a Product Requirements Document.
- 📒 **Architecture instructions**: A set of guidelines for applying architecture patterns.
- 📒 **TypeScript language instructions**: Best practices and coding standards for TypeScript.

They are automatically added as context in the **AIDDbot** prompts, but you can add them manually if needed.

Example of how to add an instruction manually:

```txt
Write a function that sums two numbers following #file:lng-typescript.instructions.md 
```

### 🛠️ To do:

- Some kind of memory for the project workflow and characteristics.
- A journal for the agents to keep track of their work and decisions.

---

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

Work smarter not harder with Ab!

---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Blog**: [AIDDbot](https://aiddbot.com)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Profesor en Español**: [AI code Academy](https://aicode.academy)
- **This Repository**: [AIDDbot](https://github.com/AIDDbot/AIDDbot)