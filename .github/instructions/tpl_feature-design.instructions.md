---
description: 'Template for feature design.'
applyTo: '/docs/backlog/*.design.md'
---

# { Feature Id } {Feature Name} Design 

## Overview

{High-level description of the feature and its place in the overall system}

## Data Models

### Model 1

- **Purpose:** {Describe the purpose of this model, Input / Output / Persistence}
- **Tier / Layer:** {Specify the tier or layer where this model belongs}

```code-language
{Define the structure of Model1 in the coding language of the container}
```

## Components

### Component 1

- **Purpose:** {What this component does}
- **Interfaces:** {Public methods/APIs}
- **Dependencies:** {What components/utilities it depends on}
- **Reuses:** {Existing components it builds upon}
  
```code-language
{Define the public API for Component 1}
```

## User interface

{Describe the user or application interfaces for this feature, including any screens, dialogs, pages or other elements that the user will interact with.}

### {Route | Page | Command} 1

- **Purpose:** {What this UI component does}
- **URL:** {The URL for the API or page, or the command name}

## Aspects

### Monitoring

{Describe how this feature will be monitored, including metrics, logging, and alerting}

### Security

{Outline the security considerations for this feature, including data protection, authentication, and authorization}

### Error Handling

{Define the overall strategy for error handling in this feature, including logging, user notifications, and fallback mechanisms.}

## Architecture

{Describe the overall architecture and design patterns used}

### Component Diagram

```mermaid
C4Component
    { The Component level 3 diagram following the C4 model features and layers involved in this feature. }
```

### File Structure

```plaintext
{Describe the file structure for this feature, including any important directories, files, and their purposes.}
```

> End of Feature Design for { Feature Id }, last updated { DATE }.
