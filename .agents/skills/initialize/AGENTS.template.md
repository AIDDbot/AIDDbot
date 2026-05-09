# Agents Instructions

### Behavior Guidelines

- When using templates, replace {placeholders} with actual values.
- {Business_Domain_Language}: `English` | `Spanish` | {Other_Language}
- Chat responses should be in the user's language.
- Code and documentation should be in {Business_Domain_Language}.
- Be concise and clear in communication.Sacrifice grammar for concision.
- When in doubt, ask questions one by one with closed answers.

### Environment

- **{Agents_Folder}**: {Folder for agent-related files such as skills, prompts, and specs.}
- **{Product_Folder}**: {Folder for product-related files such as specs, plans, and documentation.}
- **{Source_folders}**: {Array of source code folders relevant to the project.}
- **OS dev**: `Windows` | `Linux` | `MacOS`
- **Terminal**: ` cmd` | `PowerShell` | `bash` | `zsh`
- **Git remote**: {Remote URL for the git repository, e.g., `https://github.com/user/repo.git`}
- **Default branch**: `main` | `master` 

### Folder structure
````text
.                         # Project root  
├── AGENTS.md             # This file with the main guidelines for agents
├── {Agents_Folder}/      # Files related to agents (skills, commands, etc)
│   ├── agents/           # Specific agent role definitions
|   ├── prompts/          # Reusable prompts directory
|   └── skills/           # Custom agent skills
├── {Product_Folder}/     # Files related to the product (specs, plans, etc)
|   └── specs/            # Specifications and plans
├── CHANGELOG.md          # Project history and updates
├── README.md             # Human-friendly project summary
├── {Source_folders}/     # Source code folders
├── tests/                # Test E2E files
└── other_files/          # Other relevant files and folders
````

### Naming Conventions

— Use conventional commit messaging
— Code branches prefixes must be: `feat/` | `fix/` | `chore/`
— Generate short slugs for artifacts and names (less-than-20-chars).

## Product

{Product_Name} is a {brief description of the product}.

- {Key features of the product.}
  
## Technology

### {Source_folders} Stack

- **Tier**: {e.g., Frontend, Backend, Database}
- **Language**: {language and version}
- **Framework**: {framework and version}
- **Testing**: {testing framework}
- **Storage**: {storage solution}
- **Security**: {security strategy}
- **Logging**: {logging strategy}

- **Development workflow**:
  - Init: `{commands to initialize the project}`
  - Build: `{build tool and commands}`
  - Run: `{commands to run the project}`
  - Test: `{commands to test the project}`
  - Lint: `{commands to lint the project}`
  - Deploy: `{commands to deploy the project}`

- **Folder structure**:
````text
.                                 # Tier source root (e.g., src, back, front)
├── {main_tech_file}.{json|xml}   # Main tech file (e.g., package.json, pom.xml)
├── {app_folder_1}                # Source code folder 1 (e.g., app, lib, src)
└── other_files                   # Other relevant files
````

- **Agent Skills**:
  - {Skill_Name}: {Brief description of the skill and its purpose.} 

## Principles

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.
3. Surgical Changes
Touch only what you must. Clean up only your own mess.
4. Goal-Driven Execution
Define success criteria. Loop until verified.

> last updated: {Date of last update, e.g., June 2027}