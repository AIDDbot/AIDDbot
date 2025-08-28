---
description: 'Node.js 2025 Testing Best Practices'
applyTo: '**/*.{test.ts,spec.ts}'
---

# Modern Node.js Testing Patterns (2025)

A comprehensive guide to testing Node.js applications using native Node.js features following 2025 best practices.

**CRITICAL: Use only Node.js native testing features. No external testing libraries required.**

## 1. Test Runner Setup (Native Node.js)

## 🚫 AVOID These Dependencies

**Never install these when using modern Node.js:**

- ~~jest~~
- ~~mocha~~
- ~~chai~~
- ~~sinon~~


Good Example (Native Node.js Test Runner):

```bash
# No dependencies needed!
# package.json
"scripts": {
  "test": "node --test",
  "test:watch": "node --test --watch",
  "test:coverage": "node --test --experimental-test-coverage",
  "test:unit": "node --test tests/unit/**/*.test.ts",
  "test:e2e": "node --test tests/e2e/**/*.test.ts"
}
```

---

## 2. Basic Test Structure

```ts
import { describe, test, it } from "node:test";
import assert from "node:assert/strict";
import { add } from "../src/math.ts";

describe("Math operations", () => {
  test("should add numbers correctly", () => {
    const result: number = add(2, 3);
    assert.strictEqual(result, 5);
  });
});
```

## 3. Async Testing Patterns

```ts
describe("Async Operations", () => {
  test("should fetch data successfully", async () => {
    const data: ApiResponse = await fetchData("/api/users");

    assert.ok(data);
    assert.strictEqual(typeof data.users, "object");
    assert.ok(Array.isArray(data.users));
  });

  test("should handle fetch errors gracefully", async () => {
    await assert.rejects(
      async () => {
        await fetchData("/api/invalid");
      },
      {
        name: "FetchError",
        message: /404/,
      }
    );
  });
});
```

## 4. Native Mocking (No External Libraries)

```ts
import { test, mock } from "node:test";
import assert from "node:assert/strict";

describe("Service Layer", () => {
  test("should call external API with correct parameters", async () => {
    // Mock the fetch function
    const mockFetch = mock.method(globalThis, "fetch", async () => ({
      ok: true,
      json: async () => ({ id: 1, name: "Test User" }),
    }));

    const result: User = await userService.getUser(1);

    assert.strictEqual(mockFetch.mock.callCount(), 1);
    assert.deepStrictEqual(
      mockFetch.mock.calls[0].arguments[0],
      "/api/users/1"
    );
    assert.strictEqual(result.name, "Test User");

    // Restore original function
    mockFetch.mock.restore();
  });
});
```
  ---

## 5. Mocking File System Operations

```ts
import { describe, test, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

describe("Config Reader", () => {
  beforeEach(() => {
    mock.method(fs, "readFile", async () => '{"name": "test"}');
  });

  afterEach(() => {
    mock.reset();
  });

  test("should read configuration successfully", async () => {
    const config = await readConfigFile();

    assert.strictEqual(config.name, "test");
    assert.strictEqual(fs.readFile.mock.callCount(), 1);
  });
});
```
> End of Node testing instructions