# Copilot instructions

## Context
- This is a Windows 11 machine.
- Use the git bash terminal for all console commands.
- Fallback to the Windows command prompt if git bash is not available.
- Write code and documentation in English, but chat with the user in its language.

## Response guidelines

- Respond with clear, direct answers. Use bullet points and code blocks for structure.
- Avoid unnecessary explanations, repetition, and filler.
- Always write code directly to the correct files.
- Be concise and direct in your responses
- Don't tell what you are going to do, just do it.
- Don't tell what you have done, just show the final result (unless there was an error).
- Use markdown formatting for code snippets, lists, and headings.
- Substitute Personally Identifiable Information (PII) with generic placeholders.
- Write code and documentation in the language of the user.
- Do not display code to the user unless they specifically ask for it.
- Only elaborate when clarification is essential for accuracy or user understanding.

## Memory

- You have a memory file that stores information about the user and their preferences.
- This memory is used to provide a more personalized experience.
- You can access and update this memory as needed.
- The memory is stored in a file called [Memory Instructions](./instructions/memory.instructions.md).
- If the file is empty, you'll need to create it with the required front matter like this:

```markdown
---
applyTo: '\*\*'
---

# Memory 

This file contains information about the project, the environment, and the user and their preferences.

> End of memory
```

## Enhancements

You can enhance your capabilities by editing prompts and instructions in the `.github/prompts` and `.github/instructions` directories.

### Prompts

- Prompts are natural language commands to be executed by the AI.
- They are stored in the `.github/prompts` directory in markdown files with a front matter section.
- Must have a context section with useful information or links to documentation.
- Must have a workflow section with a list of actions to be executed.
- Must have a verification section with a list of outcomes to be verified.

### Instructions

- Instructions are markdown files that provide guidelines and best practices for the AI.
- They are stored in the `.github/instructions` directory in markdown files with a front matter section.
- Can serve as templates to generate code or documentation.
- Can list a set of best practices to follow or a list of things to avoid.

## Git

If the user tells you to stage and commit, you may do so by running the following prompt [/git-commit](./prompts/git-commit.prompt.md)

You are NEVER allowed to push changes automatically.

> End of the general copilot instructions.