# 📋 Prompts

Prompts are reusable queries and commands to work with agents.

They use instructions as templates and guides for the work. You can customize the prompts behavior by editing their respective instruction files.

Use `/` to invoke predefined prompts. 

Some are meant to work with a specific chat mode.


## 🧑‍💼 Architect chat-mode Prompts (`/A_*`)

### 📦 [/A_docs-PRD](/.github/prompts/A_docs-PRD.prompt.md)
- Product Requirements Document (The business problem specifications)
  
### ⚙️ [/A_docs-SYSTEMS](/.github/prompts/A_docs-SYSTEMS.prompt.md)
- System Design, tech stack and architecture (The technical solution specifications)

## 👷 Builder chat-mode Prompts (`/B_*`)

### 📝 [/B_feature-spec](/.github/prompts/B_feature-spec.prompt.md)
- Detailed Problem Specification, Solution Design Plan and Acceptance Criteria

### ✨ [/B_feature-code](/.github/prompts/B_feature-code.prompt.md)
- Implementation of the feature specifications

## 🧑‍🔧 Craftsman chat-mode Prompts (`/C_*`)

### ✅ [/C_feature-test](/.github/prompts/C_feature-test.prompt.md)
- Feature Testing Suite and report

### ✔️ [/C_feature-clean](/.github/prompts/C_feature-clean.prompt.md)
- Code Cleanup and Documentation

## 🧑‍💻 User Utilities Prompts (`/U_*`)

### 🛠️ [/U_aiddbot-instructions-update](/.github/prompts/U_aiddbot-instructions-update.prompt.md)
- Generate Instructions as best-practice documentation

### 🛠️ [/U_git-commit](/.github/prompts/U_git-commit.prompt.md)
- Git Commit procedure and standards

> 🔍 Explore the [prompts folder](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts) to see all available prompt files. 
