---
description: 'Commit changes to the repository.'
tools: ['changes', 'runCommands']
---

# Git Commit

Commits pending changes to the repository with a conventional commit message.

## Context

- Use the #changes tool to track changes in the repository.

## Workflow

- [ ] Group changes into logical commits.
- [ ] Use conventional commit messages to describe the changes made.
- [ ] Types: feat, fix, docs, style, refactor, perf, test, chore.

### Example commit message:

```bash
# Simple commit message
git commit -m "fix: correct minor typos in documentation"
# Feat and Issue related commit message
git commit -m "feat(feat_id): add new user registration feature #1234"
# Closing an issue
git commit -m "feat(feat_id): add new user registration feature close #5678"
```

## Summary

- [ ] Use the #runCommands tool to ensure git status is clean after committing changes.