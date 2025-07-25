---
description: 'Create a new git repository.'
tools: ['changes', 'editFiles', 'runCommands']
---
# Create a new git repository

Creates a new git repository, initializes it, and pushes it to GitHub.

## Context

- Check if the repository is already initialized.
- Check if the repository is already pushed to GitHub.
- Use the current `/README.md` and `/docs` folder to add context to your responses
- Use the current git user profile to set the author and committer information.

## Workflow

### Step 0: Check Repository Status

- [ ] Check if the repository is already initialized.

### Step 1: Initialize Local Repository

- [ ] If the repository is initialized skip to Step 2.

- [ ] Use the #runCommands tool to run the following commands to initialize it:

```bash
git init
git branch -M main
```

### Step 2: Add common files

- [ ] Use the #editFiles tool to ensure common files are present in the repository, if not, create them:

- `.gitignore` common patterns for environment files, logs, dist and temporary files and folders.
- `README.md` brief description of the project. 
- `LICENSE` file with the project's license information, MIT by default.

- [ ] Use the #runCommands tool to make the initial commit:

```bash
git add .
git commit -m "Initial commit with README, .gitignore, and LICENSE"
```


## Summary

- [ ] Use the /journal prompt to summarize the actions taken in this prompt.