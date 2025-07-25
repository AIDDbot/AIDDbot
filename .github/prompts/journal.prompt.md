---
description: 'Add a journal entry with the current job done.'
tools: ['editFiles', 'runCommands']
---

# Journal prompt

This prompt is used to add a journal entry to the `./docs/JOURNAL.md` file with the current date and time, summarizing your actions and decisions.

## Context

- Your current chat mode
- The executed prompts
- The instructions followed

## Workflow

- [ ] Use the #editFiles tool add or append a new entry to the `./docs/JOURNAL.md` file following the template below.

### Template

```markdown
## { date }

### { Summary of Actions and Decisions }
- **Chat Mode**: { chatMode }
- **Executed Prompts**: { executedPrompts }
- **Instructions Followed**: { instructionsFollowed }
- **Actions Taken**: { actionsTaken }
- **Decisions Made**: { decisionsMade }
```

### Summary

- [ ] Use the /git-commit prompt to save the journal entry.