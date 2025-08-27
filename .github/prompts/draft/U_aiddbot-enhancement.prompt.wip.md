---
description: 'Generate instruction files for project technology stack.'
tools: ["editFiles", "fetch", "search", "runCommands"]
---

# Enhancements

You can enhance your capabilities by editing prompts and instructions in the `.github/prompts` and `.github/instructions` directories.

## Prompts

- Prompts are natural language commands to be executed by the AI.
- They are stored in the `.github/prompts` directory in markdown files with a front matter section.
- Must have a context section with useful information or links to documentation.
- Must have a workflow section with a list of actions to be executed.
- Must have a verification section with a list of outcomes to be verified.

## Instructions

- Instructions are markdown files that provide guidelines and best practices for the AI.
- They are stored in the `.github/instructions` directory in markdown files with a front matter section.
- Can serve as templates to generate code or documentation.
- Can list a set of best practices to follow or a list of things to avoid.
- When a instructions file is used as a template, read it carefully and follow its structure. Omit any Commented section in the output. Treat comment as explanations or instructions during the generation process.