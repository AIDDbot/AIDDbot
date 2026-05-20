# Agents Instructions

### Behavior Guidelines

- When using templates, replace {placeholders} with actual values.
- {Business_Domain_Language}: `English` | `Spanish` | {Other_Language}
- Chat responses should be in the user's language.
- Code and documentation should be in {Business_Domain_Language}.
- Be concise and clear in communication. Sacrifice grammar for concision.
- When in doubt, ask questions one by one with closed answers.

### Environment

- **{Agents_Folder}**: {Folder for agent-related files such as skills, prompts, and specs.}
- **{Product_Folder}**: {Folder for product-related files such as specs, plans, and documentation.}
- **{Source_Folders}**: {Array of source code folders relevant to the project.}
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
│   ├── prompts/          # Reusable prompts directory
│   └── skills/           # Agent skills
├── {Product_Folder}/     # Product related files (specs, plans, arch, rules, reports)
│   ├── specs/            # Specifications (YAML: status, released-version, released-at)
│   ├── plans/            # Implementation plans
│   ├── arch/             # Architecture documentation
│   ├── rules/            # Coding conventions extracted from the codebase
│   ├── design/           # Optional design specs for /design
│   └── reports/          # Review and verify findings for /repair
├── CHANGELOG.md          # Project history and updates
├── README.md             # Human-friendly project summary  
├── {Source_Folders}/     # Source code folders
├── tests/                # Test E2E files
└── other_files/          # Other relevant files and folders
````

### Naming Conventions

— Use conventional commit messaging
— Code branches prefixes must be: `feat/` | `fix/` | `chore/`
— Generate short slugs for artifacts and names (less-than-20-chars when possible)
— Derive `{slug}` from artifact filename, then `feat/{slug}` branch, then requirement title (confirm if ambiguous)

**Slug derivation**

| Source | `{slug}` |
|--------|----------|
| Spec/plan/report filename | segment before first `.` (e.g. `checkout.spec.md` → `checkout`) |
| Branch `feat/checkout` or `fix/checkout` | `checkout` |
| Folder `src/checkout/` | `checkout` (confirm if unclear) |

### Git (producing skills)

Any skill that writes artifacts must finish by applying the repository workflow. Do not improvise branch or commit steps.

1. **Caller** — The active skill is whichever the user invoked (e.g. `/codify`, `/specify`). `/repository` uses that skill's row in `{Agents_Folder}/skills/repository/skill-integrations.md`.
2. **Workflow** — Read and follow `{Agents_Folder}/skills/repository/SKILL.md`. `/repository` is not auto-invoked; run it as the last step of the producing skill.
3. **`/codify` only** — Run repository **Step 2: Start a feature branch** before writing implementation code. Feature-cycle branch rules stay in the repository skill only.

Per-skill branches, commit types, and paths: `{Agents_Folder}/skills/repository/skill-integrations.md`.

### AIDD product artifacts

Paths are under `{Product_Folder}`:

| Artifact | Pattern |
|----------|---------|
| Spec | `specs/{slug}.spec.md` |
| Plan (tiered) | `plans/{slug}.{source}.{tier}.plan.md` |
| Plan (fullstack) | `plans/{slug}.{source}.plan.md` |
| Report | `reports/{slug}.{type}.report.md` |
| Arch | `arch/{name}.md` or `arch/{tier}.arch.md` |
| Rules | `rules/{name}.rules.md` |
| Design | `design/{slug}/DESIGN.md` |

`{source}`: `spec` | `report` | omit for simple requirements. `{type}` (reports): `quality` | `compliance` | `accessibility` | `verify`. Consumed by `/repair`.

### Brownfield context

When `{Product_Folder}/arch/` or `rules/` exist, `/planify` and `/codify` read them before changing code (order: arch → ADR → tier rules → naming → testing). Full detail: `{Agents_Folder}/skills/shared/implementation-context.md`.

### Spec status

YAML frontmatter on each spec: `spec-slug`, `status`, `released-version`, `released-at` (last two empty until release).

**Chain:** `draft` → `planned` → `in-progress` → `verified` → `released` (also `cancelled` when scope is dropped). Per-skill transitions, edge cases, and diagram: `{Agents_Folder}/skills/specify/spec-status.md`.

## Product

{Product_Name} is a {brief description of the product}.

- {Key features of the product.}
  
## Technology

### {Source_Folders} Stack

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
Keep working until all success criteria are met. Loop until verified.

> last updated: {Date of last update, e.g., June 2027}