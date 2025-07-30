---
description: 'Node Framework Best Practices'
---
# Node Framework Best Practices

## Overview

Write code using TypeScript language following [lang TypeScript](/.github/instructions/lng-typescript.instructions.md) best practices.

**CRITICAL: Avoid external dependencies when native Node.js features exist.**

## 🚫 AVOID These Dependencies

**Never install these when using modern Node.js:**
- `ts-node` - Not needed with native TypeScript support
- `nodemon` - Use `node --watch` instead
- `jest` or any other testing library  (Use native `node --test` instead)
- `tsx` - Not needed with native support
- Any ORM or database abstraction layer 
- Axios or any HTTP client library (use native `node:http` or `node:https`)
- Any TypeScript compilation loaders

## ✔️ Allowed dependencies

Production dependencies :

- `express` - For web server functionality
- `pg` - For PostgreSQL database access

Development dependencies:
- `eslint` - For code linting
- `prettier` - For code formatting

## Import Instructions

- Use the `.ts` suffix for TypeScript files.
- Use `type` for type imports.

> ✔️ Example of importing a TypeScript function and type:
```ts
import { bootstrap } from "./api/api.bootstrap.ts";
import type { ApiConfig } from "./api/api.bootstrap.ts";
```

> 🚫 Bad Example of avoiding classic Node imports:
```ts
// Bad import: Missing suffix
import { bootstrap } from "./api/api.bootstrap";
// Bad import: Missing type keyword
import { ApiConfig } from "./api/api.bootstrap.ts";
```

## Running TypeScript Files

Execute TypeScript files directly with Node.js without needing `ts-node` or any additional compilation step. 

> Example:
```bash
# Development Execute with npm
npm run dev
# Development Execute with node
node --watch src/main.ts
# Production Execute with npm
npm start
# Production Execute with node
node src/main.ts
```

## Testing Node.js with TypeScript

- No need for additional libraries to run tests with TypeScript. 
- Use `node:test` module for testing TypeScript files directly.

> Example of importing Node Test stuff:
```ts
import assert from "node:assert/strict"
import { describe, test } from "node:test";
```

> Example of defining a test:
```ts
const sum = (a: number, b: number): number => a + b;
describe("The Sum function", () => {
  test("should sum 1 and 1", () => {
    assert.strictEqual(sum(1, 1), 2);
  });
});
```

> Example of running tests:
```bash
# Run tests with Node.js
node --test src/test.ts
# Run tests with npm
npm test
```

## TypeScript Configuration

Use minimal tsconfig.json for type checking only (no compilation):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true
  }
}
```

> End of Node.js with TypeScript Best Practices.