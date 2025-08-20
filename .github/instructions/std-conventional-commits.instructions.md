---
description: 'Conventional commits standard.'
--- 

# Conventional Commits

Conventional commits are a way of writing commit messages that convey the type of change being made. This helps in automating the release process and generating changelogs.

## Commit Message Structure

### First line

`{type}({scope}): {subject} {issue}`

- **type**: The type of change (e.g., `feat`, `fix`, `docs`, `test`, `chore`, `refactor`).

- **scope**: The optional scope of the change (feature id if available).

- **subject**: A short description of the change.

- **issue**: An optional reference to the issue being addressed (e.g., `#123`) with prefix `close` or `fix`.

### Subsequent lines

- a short list of changes made in the commit message body when necessary

### Example Commit Message

IMPORTANT: USE THE GITHUB ISSUE NUMBER IN THE COMMIT MESSAGE WHEN APPLICABLE.

```bash
feat(f1.2): #123 add user authentication module 
- Implemented user login and registration features
- Added JWT token-based authentication
- Updated user model to include password hashing
```