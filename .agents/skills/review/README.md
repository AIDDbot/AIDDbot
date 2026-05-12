# Review skill documentation

> [!NOTE]
> In your agents do not natively support skills, call them by prefixing with @ or #. Ex `@review` or `#review`. 

## Sample prompt to invoke the skill  

### Review and fix code
```md
> Use the review skill to review the code of the current project, and generate a report of any issues found.
> Use the planify skill to create a plan to fix the issues found in the report.
> Use the codify skill to implement the plan to fix the issues found in the report.
```