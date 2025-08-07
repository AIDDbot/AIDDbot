---
mode: 'agent'
description: 'Commit changes to the repository.'
---

# Git Commit

Commit changes to the repository.

## Goal

Create commits with clear messages that describe the changes made to the codebase.

Keep commits linked to features, tasks, or issues when applicable.

## Context

- Use the #changes tool to track changes in the repository.
- Read the [Backlog](/docs/BACKLOG.md) to understand the context of the changes if applicable.

## Workflow

- [ ] Group changes into logical commits.
- [ ] Use conventional commit messages to describe the changes made.
- [ ] Available Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`.
- [ ] Use the feature code with the type when applicable.
- [ ] Use the github issue number at the beginning of the commit message when applicable.
- [ ] Add a short list of changes made in the commit message body when necessary.

### Example Commit Message

IMPORTANT: USE THE GITHUB ISSUE NUMBER IN THE COMMIT MESSAGE WHEN APPLICABLE.

```bash
feat(f1.2): #123 add user authentication module 
- Implemented user login and registration features
- Added JWT token-based authentication
- Updated user model to include password hashing
```

## Validation

- [ ] Use the #runCommands tool to ensure git status is clean.

```bash
git status
```

> End of the git commit prompt.
