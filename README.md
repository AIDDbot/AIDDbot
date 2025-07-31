# AIDDbot

**AIDDbot**, aka `Ab` pronounced "/eɪbi:/" is an AI-powered agent to assist software engineers in their daily tasks. It can help with product documentation, code generation, quality testing, and more.

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

- [ ] Clone the repository AIDDbot repository to tem folder inside your repo
`git clone -b main --single-branch https://github.com/yourusername/AIDDbot.git AIDDbot-temp`
- [ ] Copy only the `.github` folder from `AIDDbot-temp` folder to your root folder
- [ ] Remove the `AIDDbot-temp` folder

#### Semi Automatic Installation to any project:

- [ ] Copy the prompt file [aiddbot-install-for-github_copilot](.github/prompts/aiddbot-install-for-github_copilot.prompt.md) to the same location at your folder
- [ ] Open Copilot chat and run the `/aiddbot-install-for-github_copilot` command.

## ℹ️ Usage instructions for GitHub Copilot

### 🤖 Chat modes

There are three main chat modes available for `AIDDbot`, one for each `AIDDbot` role:

- **Architect Mode**: For defining product requirements and managing the development process.
- **Builder Mode**: For code generation and implementation of features.
- **Craftsman Mode**: For ensuring the quality of the code through automated testing and documentation.

Each mode offers a set of tools and prompts tailored to its specific role, allowing the agent to perform its tasks effectively.

### 📋 Prompts

Using the _slash_ command, you can access various prompts designed for each mode. Here are some examples:

#### Architect Prompts

- 📋 **PRD generation** `/PRD`: It generates a Product Requirements Document based on the provided specifications.
  - 📦 **docs/PRD.md**: Goals, requirements, and constraints of the project.

- 📋 **Domain Modeling** `/DOMAIN`: It creates a domain model based on the provided requirements.
  - 📦 **docs/DOMAIN.md**: Entities, relationships, and business rules of the project.

- 📋 **Systems Architecture** `/SYSTEMS`: It generates a systems architecture diagram based on the provided specifications.
  - 📦 **docs/SYSTEMS.md**: System architecture, components and implementation details
  
#### Builder Prompts 

- 📋 **Backlog Management** `/BACKLOG`: It helps in managing the product backlog and prioritizing features.
  - 📦 **docs/BACKLOG.md**: The list of features grouped by epics with their priorities and statuses.
  
- 📋 **Feature Specification** `/feature.spec`: It generates specifications for a feature based on the provided requirements.
  - 📦 **docs/feats/f_id.spec.md**: Behavioral specifications for a feature.
  
- 📋 **Feature Design** `/feature.design`: It creates a design document for the feature.
  - 📦 **docs/feats/f_id.design.md**: Technical design for a feature.

- 📋 **Implementation Plan** `/feature.tasks`: It outlines the tasks required to implement the feature.
  - 📦 **docs/feats/f_id.tasks.md**: Task plan for implementing a feature.

- 📋 **Feature Code** `/feature.code`: It writes the code for the feature by executing the implementation plan.
  - 📦 **src/**: The implementation code for a feature.

  
#### Craftsman Prompts

- 📋 **Automated Testing** `/feature.test`: It generates automated tests for the provided code.
  - 📦 **docs/feats/f_id.tests.md**: Unit and integration tests specifications for a feature.
  - 📦 **src/**: Implementation tests for a feature.
  
- 📋 **Code Review** `/feature.review`: It performs a code review based on the feature changes.
  - 📦 **src/**: Clean Code
  
- 📋 **Documentation Generation** `/feature.docs`: It creates documentation for the provided code.
  - 📦 **src/**: Documented Code
  - 📦 **docs/STRUCTURE.md**: Overview of the folder structure and main components organization.

### 📚 Instructions

Prompts use instructions to guide the agent in performing specific tasks. Sometimes are templates for documentation, others are coding guidelines. Here are some examples:

- **PRD instructions**: A template for generating a Product Requirements Document.
- **Architecture instructions**: A set of guidelines for applying architecture patterns.
- **TypeScript language instructions**: Best practices and coding standards for TypeScript.

They are automatically added as context in the aIDDbot prompt, but you can add them manually if needed.

Example of how to add an instruction manually:

```txt
Write a function that returns the sum of two numbers following #file:lng-typescript.instructions.md 
```

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


---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Company**: [AI code Academy](https://aicode.academy)
- **Blog**: [AIDDbot](https://aiddbot.com)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **This Repository**: [AIcodeAcademy/AIDDbot](https://github.com/AIcodeAcademy/AIDDbot)