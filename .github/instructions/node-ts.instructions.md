---
description: Best practices for Node with TypeScript code
---
# Node.js with TypeScript Best Practices

## Overview

Modern Node.js supports TypeScript natively, allowing you to run TypeScript files directly without needing a separate compilation step. 

Avoid using external libraries and look for native Node.js features to ensure simplicity and maintainability.


## Import Instructions

To do so, follow these import instructions:

- Use the `.ts` suffix for TypeScript files.
- Use `type` for type imports to ensure proper type checking and avoid runtime errors.


> Example of importing a TypeScript function and type:
```ts
import { bootstrap } from "./api/api.bootstrap.ts";
import type { ApiConfig } from "./api/api.bootstrap.ts";
```

> Bad Example of avoiding classic Node imports:
```ts
// Bad import: Missing suffix
import { bootstrap } from "./api/api.bootstrap";
// Bad import: Missing type
import { ApiConfig } from "./api/api.bootstrap.ts";
```

## Running TypeScript Files

Execute TypeScript files directly with Node.js without needing `ts-node` or any additional compilation step. 

> Example:
```bash
# Execute with npm
npm start
# Execute with node
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

> End of Node.js with TypeScript Best Practices.