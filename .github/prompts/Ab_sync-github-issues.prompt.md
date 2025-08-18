---
description: "Create or update a GitHub issue for each feature in the BACKLOG document."
---

# GitHub Issues

This prompt is used to create or update GitHub issues for each feature listed in the `BACKLOG.md` document.

## Context

- [BACKLOG.md](/docs/BACKLOG.md) - The document containing the list of features and their statuses.
- Use the `#list_issues` tool to retrieve existing issues in this GitHub Repository.

## Workflow

- [ ] Use the #list_issues tool to retrieve existing issues from the GitHub repository.
- [ ] For each feature in the `BACKLOG.md`:
  - [ ] Check if an issue already exists for the feature.
  - [ ] If an issue exists, update it with the latest information from the `BACKLOG.md`.
  - [ ] If no issue exists, create a new issue with the feature details and a link to the `BACKLOG.md`.

- [ ] Read and follow the [GitHub Issue Template](../instructions/tpl-github-issue.instructions.md).

### Issue linking

- [ ] Link issues to the corresponding feature in the `BACKLOG.md` using the issue ID for commit reference.

## Validation

- [ ] All features in the `BACKLOG.md` have corresponding GitHub issues and the issue ID.
- [ ] Issues are updated with the latest status and information.

> End of the GitHub Issues prompt.
