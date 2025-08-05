---
description: "Generate library-specific instruction files for project dependencies."
tools: ["editFiles", "fetch", "runCommands", "Notion"]
---

# Library Instructions Generator

Generate comprehensive instruction files for each library dependency specified in the project architecture, providing best practices and usage guidelines for AI agents and developers.

## Context

- [SYSTEMS.md](/docs/SYSTEMS.md) - Contains the technology stack and approved dependencies
- [/.github/instructions](/.github/instructions) - Existing instruction files directory

## Workflow

### 1. Analysis Phase

- [ ] Read and analyze [SYSTEMS.md](/docs/SYSTEMS.md) to identify all approved dependencies
- [ ] Check [/.github/instructions](/.github/instructions) directory for existing library instruction files
- [ ] Create a list of missing library instruction files needed

### 2. Dependency Discovery

From the SYSTEMS document, identify and process:

**Allowed Dependencies:**

**Built-in framework packages:**

### 3. Research and Generation

For each missing library instruction file:

- [ ] Use #fetch_webpage to research the official documentation and best practices
- [ ] Gather comprehensive information about:
  - Installation and setup
  - Core concepts and API usage
  - Best practices and common patterns
  - TypeScript integration
  - Common pitfalls and solutions
  - Integration with other project dependencies

### 4. File Creation

Create instruction files following this naming convention: `lib-{libraryname}.instructions.md`

**Required sections for each instruction file:**

```markdown
---
description: "{Library Name} best practices and usage guidelines"
applyTo: "**/*.{lang extension}"
---

# {Library Name} Instructions

## Overview

Brief description of the library and its purpose in the project.

## Installation & Setup

How to install and configure the library.

## Core Concepts

Key concepts and terminology.

## Best Practices

- Recommended usage patterns
- Performance considerations
- Security guidelines
- TypeScript integration

## Common Patterns

Code examples and common use cases.

## Integration Guidelines

How to integrate with other project dependencies.

## Troubleshooting

Common issues and solutions.

## Examples

Practical examples relevant to the development environment.

## References

- Official documentation links
- Useful resources
```


## Output Verification

- [ ] All approved dependencies have corresponding instruction files
- [ ] Files are properly formatted with frontmatter
- [ ] Examples are relevant to the development environment
- [ ] Language and framework integration is covered
- [ ] Files follow consistent structure and naming

> End of library instructions generation prompt.

