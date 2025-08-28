---
description: 'Node Framework Best Practices'
applyTo: '**/*.ts'
---

# Node Framework Best Practices

## Overview

Write code using TypeScript language following [lang TypeScript](lng_typescript.instructions.md) best practices.

**CRITICAL: Avoid external dependencies when native Node.js features exist.**

## 🚫 AVOID These Dependencies

**Never install these when using modern Node.js:**

- ~~ts-node~~ - Not needed with native TypeScript support
- ~~nodemon~~ - Use `node --watch` instead
- ~~jest~~ or any other testing library (Use native `node --test` instead)
- ~~tsx~~ - Not needed with native support
- Any ORM or database abstraction layer
- ~~axios~~ or any HTTP client library (use native `node:http` or `node:https`)
- Any TypeScript compilation loaders

## ✔️ Allowed dependencies

Development dependencies:

- `eslint` - For code linting
- `prettier` - For code formatting
- `npm-check-updates` - For managing dependencies

## Import Instructions

- Use the `.ts` suffix for TypeScript files.
- Use `type` for type imports.

> ✔️ Example of importing a TypeScript function and type:

```ts
import { sum } from "./math.utils.ts";
import type { User } from "./user.dto.ts";
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
# Using environment file
"dev": "node --watch --env-file=.env src/main.ts"
```

## TypeScript Configuration

Use minimal tsconfig.json for type checking only (no compilation):

```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "noEmit": true,
    "rewriteRelativeImportExtensions": true,
    "strict": true,
    "target": "esnext",
    "verbatimModuleSyntax": true
  }
}
```

## Built-in Web APIs

```js
const response = await fetch("https://api.example.com/data");
const data = await response.json();
```

## Node --env-file Instructions

Node supports loading environment variables from files with `--env-file` and `--env-file-if-exists`. Prefer this over `dotenv`.

- No dependency required. Run Node with:
  - `node --env-file=.env ./dist/main.js`
  - Multiple files allowed; later files override earlier ones
  - Comments and quotes supported inside env files

- Precedence: process.env overrides values from files
- Security: never commit secrets; use `.env.local` in dev
- Testing: pass `--env-file=test.env` to isolate test config

### Best Practices

- Validate required env vars early (zod)
- Keep defaults in code; env only for overrides/secrets
- Support `--env-file-if-exists` to avoid failures when optional

> End of Node.js with TypeScript Best Practices.
