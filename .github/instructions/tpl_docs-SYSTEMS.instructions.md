---
description: 'Template for SYSTEMS document for a product.'
applyTo: '/docs/SYSTEMS.md'
---

# Systems Architecture for { PRODUCT_NAME }

## Overview

**{ Product name }** follows a { architecture_style } architecture, designed for { primary_characteristics } with { technology_approach }.

## Presentation Tier

### { P1 } { Application 1 Name }

{ Brief description of this front end Application responsibility }

#### Frontend Technology Stack:

- **Repository:** { repository_url }
- **Root Folder**: { root_folder_path }
- **Architecture Style**: { SPA | MPA | CLI }
- **Language**: { type_script | java | c-sharp }
- **Framework**: { angular | spring-shell | .net }
- **Key Libraries**: { library1 }, { library2 }
- **UI Framework**: { PicoCSS | Bootstrap | Tailwind | etc. }
- **Other Packages**: { package1 }, { package2 }
- **Security**: { JWT | OAuth2 | None | etc. }

**User Interface Design:**

- { UI design approach and principles }
- { Fonts and color schemes }
- { Navigation structure and user flow }

## Application Tier

### { A2 } { Application 2 Name }

{ Brief description of this back end Application responsibility }

#### Backend Technology Stack:

- **Repository:** { repository_url }
- **Root Folder**: { root_folder_path }
- **Architecture Style**: { monolith | microservices | serverless | etc. }
- **Integration Type:** { REST API | GraphQL | Message Queue | etc. }
- **Language**: { type_script | java | c-sharp }
- **Framework**: { express | spring-boot | asp.net }
- **Key Libraries**: { library1 }, { library2 }
- **Other Packages**: { package1 }, { package2 }
- **Security**: { JWT | OAuth2 | None | etc. }

## Data Tier

### { D1 } { Database 1 Name }

#### Database Technology Stack:

- **Database Type:** { relational | NoSQL | filesystem | memory | etc. }
- **Technology:** { postgresql | mongodb | etc. }
- **Access:** { server databse url or file path }

#### Entities and relationships:

- { **entity1** - { brief description } }
- { **entity2** - { brief description } }

{ The Entity Relationship Diagram in mermaid syntax }

```mermaid

```

## External Systems Integration

### { S1 } { External System 1 Name }

- **Data Exchanged:** { brief description of data exchanged with this system }
- **Integration Type:** { REST API | GraphQL | Message Queue | etc. }
- **Technology:** { technology used for integration, e.g., OAuth, API Gateway }

## Systems Architecture Diagram

{ The Container level 2 diagram following the C4 model in mermaid syntax }

```mermaid

```

> End of SYSTEMS for { PROJECT_NAME }, last updated on { DATE }.
