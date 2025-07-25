---
description: 'How to create the PRD for a project.'
---

# PRD Instructions

Create a Project Requirements Document (PRD) that outlines the project's goals, requirements, and constraints.

## Context

- Use the current `/README.md` and `/docs` folder to add context to your responses.
- DO NOT WRITE GOALS, REQUIREMENTS, OR CONSTRAINTS BY YOURSELF. 
- Instead, 
  - Offer the user the option to add files to the `/docs` folder for additional context.
  - Offer #Notion tools for gathering initial requirements from a page in the user Notion workspace.
  - Offer the #fetch tool for retrieving existing documentation or resources from a URL.
  - Ask for any missing information to complete the PRD.

## Template

Use the following template to create the PRD. Fill in the placeholders with relevant information about the project.

The template is a Markdown format. 
Includes placeholders for you to fill.
Includes comments to guide you on what to include in each section.
Do not include the comments in the final document.

```markdown
# Project Requirements Document for { PROJECT_NAME }

## Overview

<!-- Questions to consider:
 - What business problem does it solve?
 - Who is it for?
 - What is the expected benefit? -->

**{ Project name }** aims to { short project description }.

### Goals

<!-- 
  Write between 1 and 5 goals that describe the desired outcomes of the project.
-->

 - { Goal 1 }

## Requirements

<!-- Questions to consider:
- What actions should the user be able to perform?
- What validations or business rules must be met?
- What are the performance, availability, and security expectations?
- Must it comply with any technical or legal standards? -->

<!-- 
  Write between 1 and 9 (ideally 3 to 5) requirements that describe the expected behavior of the system. 
  Use the format R1, R2, etc. to name each requirement.
-->

### { R1 } { Requirement 1 short title }

{ Brief description of the requirement 1 }

## Technical Constraints

<!-- Questions to consider:
 - Which systems must be integrated?
 - Are there any imposed technical decisions? -->

- { Constraint 1 description }

<!-- Draw the system-context diagram here following the C4 model -->

### Context diagram

````mermaid
C4Context
  title Context Diagram for { PROJECT_NAME }
  Person(user, "User", "A user of the system")
  System(system, "{ PROJECT_NAME }", "The system being designed")
  System_Ext(externalSystem, "External System", "Another system to interacts with")
  Rel(user, system, "Uses")
  Rel(system, externalSystem, "Interacts with")
````

## Additional Information

<!-- Add any additional information that is relevant to the project, such as links to design documents, user stories, or other resources. -->

- [Git repository]({ GIT_REPO_URL })
- [DOMAIN Models](./DOMAIN.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

- Update the `README.md` file with links to the PRD, DOMAIN, and SYSTEMS documents.

> End of PRD for { PROJECT_NAME }, last updated on { DATE }.

```

> End of PRD instructions.