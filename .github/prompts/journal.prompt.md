---
mode: "agent"
description: "AIDDbot journal entry with the daily job done."
tools: ["editFiles", "runCommands"]
---

# Journal prompt

<!-- To Do: save journal at .ai folder instead, and keep docs for humans -->

This prompt is used to add a journal entry to the `./docs/JOURNAL.md` file with the current date and time, summarizing your actions and decisions.

## Context

- Your current chat mode
- The executed prompts
- The instructions followed

## Workflow

- [ ] Use the #editFiles tool add or append a new entry to the `./docs/JOURNAL.md` file following the template below.

### Template

```markdown
<!-- Only one entry for each day. Is a summary of the agent daily activities -->

## { date }

### { Summary of Actions and Decisions }

- **Chat Modes**: [{ chatMode }]
- **Executed Prompts**: [{ executedPrompts }]
- **Instructions Followed**: [{ instructionsFollowed }]
- **Actions Taken**: { actionsTaken }
- **Decisions Made**: { decisionsMade }
```

### Summary

- [ ] Run [/git-commit](./git-commit.prompt.md) to save changes to the repository.
