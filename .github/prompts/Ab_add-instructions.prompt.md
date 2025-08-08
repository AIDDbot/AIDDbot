---
description: 'Generate library-specific instruction files for project dependencies.'
---

# Library Instructions Generator

Generate comprehensive instruction files for each library dependency specified in the project architecture, providing best practices and usage guidelines for AI agents and developers.

## Context

- [SYSTEMS.md](/docs/SYSTEMS.md) - Contains the technology stack and approved dependencies
- [Clean Code Instructions](/.github/instructions/clean_code.instructions.md) - Example of an existing instruction file
- [/.github/instructions](/.github/instructions) - Existing instruction files directory
- [fetch-instructions](./fetch-instructions.prompt.md) - Fetches custom instructions from the GitHub awesome catalog

## Workflow

### 1. Analysis Phase

- [ ] Read and analyze [SYSTEMS.md](/docs/SYSTEMS.md) to identify all approved dependencies, including:
  - Production and development dependencies
  - Built-in framework packages
  - Language-specific libraries
  - Any other relevant packages or tool
- [ ] Double-check the [/.github/instructions](/.github/instructions) directory for existing library instruction files
- [ ] Create a list of missing instruction files needed

### 2. Research and Generation

For each missing library instruction file:

- [ ] Use #fetch tool to visit and read the [copilot custom instructions catalog](https://github.com/github/awesome-copilot?tab=readme-ov-file#-custom-instructions)
- [ ] Use #fetch tool to research the official documentation and best practices
- [ ] Use #fetch tool to ask in Google for instructions, rules or other LLM best practices
- [ ] Summarize findings and create a draft for the instruction file.

### 3. File Creation

Create instruction files following this naming convention: `{type}-{name}.instructions.md`

Type can be:
- `lib` for libraries
- `frm` for frameworks
- `lng` for languages
- `pck` for packages or tools

Try to use simple examples and keep the instructions file concise, ideally under 250 lines.

**Required sections for each instruction file:**

```markdown
---
description: "{Name} best practices and usage guidelines"
applyTo: "**/*.{lang extension if applicable}"
---

# {Name} Instructions

## Overview

## Installation & Setup

## Core Concepts

## Best Practices


```

## Output Verification

- [ ] All approved dependencies have corresponding instruction files
- [ ] Files are properly formatted with front matter
- [ ] Examples are relevant to the development environment
- [ ] Language and framework integration is covered
- [ ] Files follow consistent structure and naming

> End of library instructions generation prompt.
