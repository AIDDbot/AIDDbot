---
mode: 'agent'
description: 'Install AIDDbot for GitHub Copilot.'
tools: ['changes', 'editFiles', 'fetch', 'runCommands']
---
# Install AIDDbot for GitHub Copilot

Copy the `.github` directory from the [AIcodeAcademy/AIDDbot](https://github.com/AIcodeAcademy/AIDDbot) to the current repository.

DO NOT CLONE THE REPOSITORY.
## Goal

Have the same `.github` directory structure as the source repository, which includes prompts, workflows, and configurations for GitHub Copilot.


## Context
- The source `.github` directory is at https://github.com/AIcodeAcademy/AIDDbot/tree/main/.github
- The target `.github` directory is or will be at [/.github](/.github)

## Workflow

- [ ] Use the #fetch tool to list the `.github` directory content from the https://github.com/AIcodeAcademy/AIDDbot/tree/main/.github.
- [ ] Use the #fetch and #editFiles tools to copy each file and directory from the source to the target repository.
- [ ] Ensure that the directory structure is maintained.
- [ ] Do not modify the Git configuration of the destination repository or add remotes.

## Validation

- [ ] Use the #changes tool to track changes in the repository.
- [ ] Use the #editFiles tool to ensure the `.github` directory is copied correctly