---
description: 'Generate library-specific instruction files for project dependencies.'
---

# Library Instructions Generator

Generate comprehensive instruction files for each library dependency specified in the project architecture, providing best practices and usage guidelines for AI agents and developers.

## Context

- [SYSTEMS.md](/docs/SYSTEMS.md) - Contains the technology stack and approved dependencies
- [/.github/instructions](/.github/instructions) - Existing instruction files directory
- [fetch-instructions](./fetch-instructions.prompt.md) - Fetches custom instructions from the GitHub awesome catalog

## Workflow

### 1. Analysis Phase

- [ ] Read and analyze [SYSTEMS.md](/docs/SYSTEMS.md) to identify all approved dependencies, including:
  - Production and development dependencies
  - Built-in framework packages
  - Language-specific libraries
- [ ] Check [/.github/instructions](/.github/instructions) directory for existing library instruction files
- [ ] Create a list of missing library instruction files needed

### 2. Research and Generation

For each missing library instruction file:

- [ ] Run the [fetch-instructions](./fetch-instructions.prompt.md) to copy instructions from the GitHub awesome catalog if present.
- [ ] Use #fetch tool to research the official documentation and best practices
- [ ] Gather comprehensive information about the lib, framework, or package.

### 4. File Creation

Create instruction files following this naming convention: `lib-{library_name}.instructions.md`

**Required sections for each instruction file:**

```markdown
---
description: "{Library Name} best practices and usage guidelines"
applyTo: "**/*.{lang extension}"
---

# {Library Name} Instructions

## Overview

## Installation & Setup

## Core Concepts

## Best Practices

## Common Patterns

```

## Output Verification

- [ ] All approved dependencies have corresponding instruction files
- [ ] Files are properly formatted with front matter
- [ ] Examples are relevant to the development environment
- [ ] Language and framework integration is covered
- [ ] Files follow consistent structure and naming

> End of library instructions generation prompt.
