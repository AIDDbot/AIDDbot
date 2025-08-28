---
description: 'Zod best practices and usage guidelines'
---

# Zod Instructions

## Overview

Zod is a TypeScript-first schema validation library. Use it to validate config, CLI inputs, and external API responses.

## Installation & Setup

- Install: `npm i zod`
- Import: `import { z } from 'zod'`
- Prefer `.safeParse()` in runtime paths; `.parse()` in tests or when you want hard failures

## Core Concepts

- Define schemas: `const S = z.object({ id: z.number().int().positive() })`
- Parse: `const res = S.safeParse(obj)`
- Async: use `.parseAsync()` for promises
- Infer types: `type T = z.infer<typeof S>`

## Best Practices

- Keep schemas next to the boundary they guard (CLI args mapping, adapters)
- Narrow early: validate as soon as you receive external data
- Return typed domain objects after validation/mapping
- Aggregate errors for user-friendly messages
