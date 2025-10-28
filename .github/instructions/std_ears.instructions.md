---
description: 'The EARS (Easy Approach to Requirements Syntax) standard.'
applyTo: '/docs/specs/*.spec.md'
---

# EARS standard

EARS (Easy Approach to Requirements Syntax) is a structured format for writing clear, unambiguous requirements. Here's a concise guide:

## Basic EARS Templates

**Ubiquitous (always true):**
```md
The <system> SHALL <response>
```

**Event-driven:**
```md
WHEN <trigger>, the <system> SHALL <response>
``` 


**Unwanted behavior:**
```md
IF <condition>, THEN the <system> SHALL <response>
```

**State-driven:**
```md
WHILE <state>, the <system> SHALL <response>
```

**Optional features:**
```md
WHERE <feature is included>, the <system> SHALL <response>
```

**Complex (combining conditions):**
```md
WHILE <state> AND WHEN <trigger>, the <system> SHALL <response>
```

## Key Guidelines
```md
WHERE <feature is included>, the <system> SHALL <response>
```

**Complex (combining conditions):**
```md
WHILE <state> AND WHEN <trigger>, the <system> SHALL <response>
```md

## Key Guidelines
```md
WHERE <feature is included>, the <system> SHALL <response>
```

**Complex (combining conditions):**
```md
WHILE <state> AND WHEN <trigger>, the <system> SHALL <response>
```

## Key Guidelines
```md
WHERE <feature is included>, the <system> SHALL <response>
```

**Complex (combining conditions):**
```md
WHILE <state> AND WHEN <trigger>, the <system> SHALL <response>
```


## Key Guidelines

- Use "SHALL" for mandatory requirements
- Be specific and measurable
- Avoid ambiguous words like "reasonable," "adequate," "user-friendly"
- Include one requirement per statement
- Define clear trigger conditions and expected responses
- Specify quantifiable criteria when possible (timing, accuracy, capacity)

## Example
Instead of: "The system should respond quickly"
Write: "WHEN a user submits a query, the system SHALL return results within 2 seconds"
