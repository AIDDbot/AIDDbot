---
mode: 'agent'
description: 'Install AIDDbot for GitHub Copilot.'
tools: ['changes', 'editFiles', 'fetch', 'runCommands']
---
# Install AIDDbot for GitHub Copilot

Copy the .github directory from AIcodeAcademy/AIDDbot to the current repository.

## Goal

Copy the `.github` directory from the [AIcodeAcademy/AIDDbot](https://github.com/AIcodeAcademy/AIDDbot) repository to the current repository, ensuring all files and configurations are preserved.

## Context
- The `.github` directory contains GitHub Actions workflows, issue templates, and other configurations for GitHub Copilot.
- The source repository is `https://github.com/AIcodeAcademy/AIDDbot`.

## Workflow

- [ ] Use the #fetch tool to clone the `AIcodeAcademy/AIDDbot` repository.
- [ ] Copy the `.github` directory from the cloned repository to the current repository.
- [ ] Maintain the original directory structure.
- [ ] Copy hidden or configuration files.
- [ ] Do not modify the Git configuration of the destination repository or add remotes.

## Validation

- [ ] Use the #changes tool to track changes in the repository.
- [ ] Use the #editFiles tool to ensure the `.github` directory is copied correctly