# AIDDbot

`AIDDbot` is an AI-powered agent to assist software engineers in their daily tasks. It can help with product documentation, code generation, quality testing, and more.

`AIDDbot` comes with three main roles:

- **Architect**: Helps in defining product requirements and managing the development process.
- **Builder**: Focuses on code generation and implementation of features.
- **Craftsman**: Ensures the quality of the code through automated testing and documentation.

It consists of a set of prompts, instructions, rules, and tools that enable the agent to perform its tasks effectively.

Heavily inspired by : 

- [Kiro Spec Driven Development](https://kiro.dev/docs/specs/)
- [Burke Holland BeastMode Copilot](https://burkeholland.github.io/posts/beast-mode-3-1/)
- [ABC roles AI Driven Development (En Español)](https://aicode.academy/blog/es/el-abc-de-la-programacion-con-ia/)

Can work with any major AI powered code editor, such as:


- **GitHub Copilot** 🟢 Ready
- _Cursor_ 🟡 Coming soon
- _ClaudeCode_ 🟡 Coming soon
- _GeminiCLI_ 🟡 Coming soon

## Installation 

`AIDDbot` comes as a set of folders tailored for your AI code editor. You can install it by cloning the repository and placing the folder in your editor's extensions or plugins directory.

```bash
git clone https://github.com/yourusername/AIDDbot.git
```

### GitHub Copilot

- **Manual Installation for a brand new project**: 

- [ ] Clone the repository AIDDbot repository to a new folder for your project
- `git clone https://github.com/yourusername/AIDDbot.git your-project-name`
- [ ] Keep only the `.github` folder and feel free to remove the rest.

- **Manual Installation to your existing project**: 

- [ ] Clone the repository AIDDbot repository to tem folder inside your repo
- `git clone https://github.com/yourusername/AIDDbot.git AIDDbot-temp`
- [ ] Copy only the `.github` folder from `AIDDbot-temp` folder to your root folder
- [ ] Remove the `AIDDbot-temp` folder

- **Semi Automatic Installation to any project**
- [ ] Copy the prompt file [aiddbot-install-for-github_copilot](.github/prompts/aiddbot-install-for-github_copilot.prompt.md) to the same location at your folder
- [ ] Open Copilot chat and run the `/aiddbot-install-for-github_copilot` command.

## Usage

### Chat modes

There will be three main chat modes available for `AIDDbot`, one for each `AIDDbot` role:

- **Architect Mode**: For defining product requirements and managing the development process.
- **Builder Mode**: For code generation and implementation of features.
- **Craftsman Mode**: For ensuring the quality of the code through automated testing and documentation.

Each mode comes with a set of tools and prompts tailored to its specific role, allowing the agent to perform its tasks effectively.

### Prompts

Using the _slash_ command, you can access various prompts designed for each mode. Here are some examples:

#### Architect Prompts

- **PRD generation** `/PRD`: It generates a Product Requirements Document based on the provided specifications.
- **Domain Modeling** `/DOMAIN`: It creates a domain model based on the provided requirements.
- **Systems Architecture** `/SYSTEMS`: It generates a systems architecture diagram based on the provided specifications.
- **Backlog Management** `/BACKLOG`: It helps in managing the product backlog and prioritizing features.

#### Builder Prompts 

- **Feature Specification** `/feature.spec`: It generates specifications for a feature based on the provided requirements.
- **Feature Design** `/feature.design`: It creates a design document for the feature.
- **Implementation Plan** `/feature.tasks`: It outlines the tasks required to implement the feature.
- **Feature Code** `/feature.code`: It writes the code for the feature by executing the implementation plan.
  
#### Craftsman Prompts

- **Automated Testing** `/feature.test`: It generates automated tests for the provided code.
- **Code Review** `/feature.review`: It performs a code review based on the feature changes.
- **Documentation Generation** `/feature.docs`: It creates documentation for the provided code.

---

- **Author**: [Alberto Basalo](https://albertobasalo.dev)
- **Company**: [AI code Academy](https://aicode.academy)
- **Socials**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **This Repository**: [AIcodeAcademy/AIDDbot](https://github.com/AIcodeAcademy/AIDDbot)