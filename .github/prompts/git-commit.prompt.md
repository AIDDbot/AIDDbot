---
mode: 'agent'
description: 'Commit changes to the repository.'
tools: ['changes', 'runCommands']
---

# Git Commit

Commit changes to the repository.

## Goal

Create commits with clear messages that describe the changes made to the codebase.

## Context

- Use the #changes tool to track changes in the repository.

## Workflow

- [ ] Group changes into logical commits.
- [ ] Use conventional commit messages to describe the changes made.
- [ ] Types: feat, fix, docs, test, chore, refactor.
- [ ] Use the issue number in the commit message when applicable.
- [ ] Add a short list of changes made in the commit message body when necessary.

### Example Commit Message

```bash
feat: add user authentication module Closes #123
- Implemented user login and registration features
- Added JWT token-based authentication
- Updated user model to include password hashing
```

## Validation

- [ ] Use the #runCommands tool to ensure git status is clean.

```bash
git status
git log --oneline --decorate=short --graph --max-count=5
```

> End of the git commit prompt.