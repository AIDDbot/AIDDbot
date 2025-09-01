---
description: 'Generate instruction files for project technology stack.'
tools: ['editFiles', 'fetch', 'search', 'runCommands']
---

# Updates instructions for AIDDbot

Generate comprehensive instruction files for each tech stack item specified in the project architecture, providing best practices and usage guidelines for AI agents and developers.

## Context

- [SYSTEMS.md](/docs/SYSTEMS.md) - Contains the technology stack and approved dependencies
- [Clean Code Instructions](../instructions/gid-clean-code.instructions.md) - Example of an existing instruction file
- [/.github/instructions](../instructions) - Existing instruction files directory

## Workflow

### 1. Analysis Phase

- [ ] Read and analyze [SYSTEMS.md](/docs/SYSTEMS.md) to identify all approved technologies (technology items), including:
  - Programming Languages
  - Application Frameworks
  - Production Libraries
  - Development Tools
  - Services
- [ ] Double-check the [/.github/instructions](../instructions) directory for existing instruction files
- [ ] Create a list of missing instruction files needed for each technology item

### 2. Research and Generation

For each missing instruction file:

- [ ] Use #fetch tool to visit and read the [copilot custom instructions catalog](https://github.com/github/awesome-copilot?tab=readme-ov-file#-custom-instructions)
- [ ] Use #fetch tool to research the official documentation and best practices for the technology item
- [ ] Use #fetch tool to ask in Google for instructions, rules or other LLM best practices
- [ ] Summarize (less than 250 lines) findings and create a draft for the instruction file.

### 3. File Creation

Create instruction files at [/.github/instructions](../instructions) folder following this naming convention: `{type}-{name}.instructions.md`

Type can be:
- `lng` for languages
- `frm` for frameworks
- `lib` for libraries
- `tol` for tools
- `srv` for services

Try to use simple examples and keep the instructions file concise, ideally under 250 lines.

**Required sections for each instruction file:**

```markdown
---
description: "{Name} best practices and usage guidelines"
applyTo: "**/*.{lang extension if applicable}"
---

# {Name} Instructions

## Setup

## Core Concepts

## Best Practices

{- List of best practices written in one line each -}

## Examples

{ a simple example of usage }

```

- [ ] All approved dependencies have corresponding instruction files
- [ ] Files are properly formatted with front matter
- [ ] Examples are relevant to the development environment
- [ ] Language and framework integration is covered
- [ ] Files follow consistent structure and naming

> End of library instructions generation prompt.
