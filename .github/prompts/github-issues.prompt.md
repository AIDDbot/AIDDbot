---
description: "Create or update a GitHub issue for each feature in the BACKLOG document."
---

# GitHub Issues

This prompt is used to create or update GitHub issues for each feature listed in the `BACKLOG.md` document.

## Context

- [BACKLOG.md](/docs/BACKLOG.md) - The document containing the list of features and their statuses.
- Use the #list_issues tool to retrieve existing issues.

## Workflow

- [ ] Use the #list_issues tool to retrieve existing issues from the GitHub repository.
- [ ] For each feature in the `BACKLOG.md`:
  - [ ] Check if an issue already exists for the feature.
  - [ ] If an issue exists, update it with the latest information from the `BACKLOG.md`.
  - [ ] If no issue exists, create a new issue with the feature details and a link to the `BACKLOG.md`.

- [ ] Use the following template for each issue:

```markdown
# Feature: { F1.1, F1.2, etc. } - { Feature Short Name }

- **Epic**: { Epic code } { Epic Short Name } { Epic Priority ‼️ Critical ❗ High ❕ Normal }

## Definition
{ Content from Feature Section from Backlog }

## Specification
{ Content from Feature specs file, if exists }

## Design
{ Content from Feature design file, if exists }

```

### Issue labeling

- [ ] Label issues based on their type:
  - `type:enhancement` (default for features)
  - `type:bug`
  - `type:task`

- [ ] Label issues based on their epic:
  - `epic: {E1 Epic 1 Short Name}`
  - `epic: {E2 Epic 2 Short Name}`

- [ ] Label issues based on their status (remove and add ensuring only one status label is present):
  - `status: 🔵 RELEASED`
  - `status: 🟢 CODED`
  - `status: 🟡 DESIGNED`
  - `status: 🟠 PENDING`
  - `status: 🔴 BLOCKED`

### Issue linking

- [ ] Link issues to the corresponding feature in the `BACKLOG.md` using the issue ID for commit reference.

## Validation

- [ ] All features in the `BACKLOG.md` have corresponding GitHub issues and the issue ID for commit reference.
- [ ] Issues are updated with the latest status and information.

> End of the GitHub Issues prompt.
