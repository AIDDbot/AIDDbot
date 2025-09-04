---
description: 'Template for SYSTEMS document for a product.'
applyTo: '/docs/SYSTEMS.md'
---

# Systems Architecture for { PRODUCT_NAME }

## Overview

**{ Product name }** follows a { architecture_style } architecture, designed for { primary_characteristics } with { technology_approach }.

## Presentation Tier

### { A1 } { Application 1 Name }

**Purpose:** { Brief description of Application responsibility }

**Technology Stack:**

- **Architecture Style**: { SPA | MPA | CLI }
- **Language**: { type_script | java | c-sharp }
- **Framework**: { angular | spring-shell | .net }
- **Key Libraries**: { library1 }, { library2 }
- **Other Packages**: { package1 }, { package2 }

**Responsibilities:**

- { responsibility1 }
- { responsibility2 }

**User Interface Design:**
- { UI design approach and principles }
- { Fonts and color schemes }
- { Core screens and views }
- { Navigation structure and user flow }

## Application Tier

### { A2 } { Application 2 Name }

**Purpose:** { Brief description of Application responsibility }

**Technology Stack:**

- **Architecture Style**: { monolith | microservices | serverless | etc. }
- **Integration Type:** { REST API | GraphQL | Message Queue | etc. }
- **Language**: { type_script | java | c-sharp }
- **Framework**: { express | spring-boot | asp.net }
- **Key Libraries**: { library1 }, { library2 }
- **Other Packages**: { package1 }, { package2 }

**Responsibilities:**

- { responsibility1 }
- { responsibility2 }

## Data Tier

### { D1 } { Database 1 Name }

**Database Type:** { relational | NoSQL | etc. }
**Technology:** { postgresql | mongodb | etc. }

**Responsibilities:**

- { responsibility1 }
- { responsibility2 }

## External Systems Integration

### { S1 } { External System 1 Name }
- **Integration Type:** { REST API | GraphQL | Message Queue | etc. }
- **Technology:** { technology used for integration, e.g., OAuth, API Gateway }

- **Responsibilities:**
  - { responsibility1 }
  - { responsibility2 }

## Security Architecture

### Authentication & Authorization

**Authentication Method:** { auth_method }
**Session Management:** { session_approach }
**Authorization Pattern:** { authorization_pattern }

## Systems Architecture Diagram

```mermaid
C4Container
    { The Container level 2 diagram following the C4 model}
```

## Architectural Decisions Record (ADR)
<!-- Add any additional decisions made during the whole project lifecycle -->
- **Decision 1:** { Decision description and rationale }

## Additional Information

<!-- Add any additional technical information -->

- [Git repository]({ GIT_REPO_URL })
- [PRD Document](./PRD.md)
- [DOMAIN Models](./DOMAIN.md)
- [BACKLOG of features](./BACKLOG.md)

> End of SYSTEMS for { PROJECT_NAME }, last updated on { DATE }.
