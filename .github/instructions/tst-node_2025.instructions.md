---
description: "Node.js 2025 Testing Best Practices"
applyTo: "**/*.{test.ts,spec.ts}"
---

# Modern Node.js Testing Patterns (2025)

A comprehensive guide to testing Node.js applications using native Node.js features following 2025 best practices.

**CRITICAL: Use only Node.js native testing features. No external testing libraries required.**

## 1. Test Runner Setup (Native Node.js)

Bad Example (External Framework):

```bash
npm install jest mocha chai
# package.json
"devDependencies": {
  "jest": "^29.0.0",
  "mocha": "^10.0.0",
  "chai": "^4.0.0"
}
"scripts": {
  "test": "jest"
}
```

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

Bad Example (CommonJS + External Assertions):

```js
const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Math operations", () => {
  it("should add numbers", () => {
    expect(add(2, 3)).to.equal(5);
  });
});
```

Good Example (ESM + Native Assertions):

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

---

## 3. Test Organization with Subtests

Bad Example (Flat Test Structure):

```ts
test("user operations", () => {
  // All tests in one function
  assert.strictEqual(createUser().id, 1);
  assert.strictEqual(updateUser().name, "John");
  assert.strictEqual(deleteUser(), true);
});
```

Good Example (Hierarchical Subtests):

```ts
describe("User Management", () => {
  test("user operations", async (t) => {
    await t.test("should create user with valid data", () => {
      const user: User = createUser({ name: "John", email: "john@test.com" });
      assert.strictEqual(user.name, "John");
      assert.ok(user.id);
    });

    await t.test("should update user information", () => {
      const updatedUser: User = updateUser(1, { name: "Jane" });
      assert.strictEqual(updatedUser.name, "Jane");
    });

    await t.test("should delete user successfully", () => {
      const result: boolean = deleteUser(1);
      assert.strictEqual(result, true);
    });
  });
});
```

---

## 4. Async Testing Patterns

Bad Example (Promise Hell + Manual Handling):

```ts
test("async operations", (done) => {
  fetchData()
    .then((data) => {
      assert.ok(data);
      done();
    })
    .catch(done);
});
```

Good Example (Native Async/Await + Proper Error Handling):

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

---

## 5. Native Mocking (No External Libraries)

Bad Example (External Mocking Library):

```js
const sinon = require("sinon");
const stub = sinon.stub(userService, "getUser");
```

Good Example (Native Mock Capabilities):

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

## 6. Mocking File System Operations

Bad Example (Real File System Operations in Tests):

```ts
import { readFile } from "node:fs/promises";

test("should read config file", async () => {
  const config = await readFile("./config.json", "utf8");
  assert.ok(config);
});
```

Good Example (Mocked File System):

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

---

## 7. Timer Mocking

Bad Example (Real Timers in Tests):

```ts
test("should delay execution", (done) => {
  setTimeout(() => {
    assert.ok(true);
    done();
  }, 1000); // Actual 1 second delay!
});
```

Good Example (Mock Timers):

```ts
import { describe, test, mock } from "node:test";
import assert from "node:assert/strict";

describe("Timer Operations", () => {
  test("should mock setTimeout correctly", () => {
    const fn = mock.fn();

    // Enable timer mocking
    mock.timers.enable({ apis: ["setTimeout"] });

    setTimeout(fn, 1000);

    // Advance time by 1000ms
    mock.timers.tick(1000);

    assert.strictEqual(fn.mock.callCount(), 1);

    // Clean up
    mock.timers.reset();
  });

  test("should mock Date.now()", () => {
    mock.timers.enable({ apis: ["Date"], now: 1000 });

    assert.strictEqual(Date.now(), 1000);

    mock.timers.tick(500);
    assert.strictEqual(Date.now(), 1500);

    mock.timers.reset();
  });
});
```

---

## 8. Test Hooks and Setup

Bad Example (Global Setup Without Cleanup):

```ts
let db;
beforeAll(() => {
  db = setupDatabase();
});
// No cleanup
```

Good Example (Proper Setup/Teardown with Native Hooks):

```ts
import {
  describe,
  test,
  before,
  after,
  beforeEach,
  afterEach,
} from "node:test";
import assert from "node:assert/strict";

describe("Database Operations", () => {
  let testDb: TestDatabase;
  let testUser: User;

  before(async () => {
    testDb = await setupTestDatabase();
  });

  after(async () => {
    await testDb.cleanup();
  });

  beforeEach(async () => {
    await testDb.reset();
    testUser = await testDb.createUser({ name: "Test User" });
  });

  afterEach(async () => {
    await testDb.clearTestData();
  });

  test("should perform database operations", async () => {
    const user: User = await testDb.findUser(testUser.id);
    assert.strictEqual(user.name, "Test User");
  });
});
```

---

## 9. Error Testing and Edge Cases

Bad Example (Poor Error Testing):

```ts
test("error handling", () => {
  try {
    riskyOperation();
    assert.fail("Should have thrown");
  } catch (e) {
    // Generic error check
    assert.ok(e);
  }
});
```

Good Example (Precise Error Validation):

```ts
describe("Error Handling", () => {
  test("should throw ValidationError for invalid input", () => {
    const invalidData = { name: "", email: "invalid" };

    assert.throws(() => validateUser(invalidData), {
      name: "ValidationError",
      message: /Invalid email format/,
    });
  });

  test("should reject with NetworkError for connection issues", async () => {
    await assert.rejects(
      async () => {
        await connectToService("invalid-url");
      },
      (error: Error) => {
        assert.strictEqual(error.name, "NetworkError");
        assert.ok(error.message.includes("Connection failed"));
        return true;
      }
    );
  });
});
```

---

## 10. Testing with TypeScript Types

Bad Example (Loose Type Testing):

```ts
test("api response", () => {
  const response = getApiResponse();
  assert.ok(response.data);
});
```

Good Example (Strong Type Validation):

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

describe("API Response Typing", () => {
  test("should return properly typed user response", async () => {
    const response: ApiResponse<User[]> = await getUsersApi();

    assert.strictEqual(typeof response.status, "number");
    assert.strictEqual(typeof response.message, "string");
    assert.ok(Array.isArray(response.data));

    if (response.data.length > 0) {
      const user: User = response.data[0];
      assert.strictEqual(typeof user.id, "string");
      assert.strictEqual(typeof user.name, "string");
    }
  });
});
```

---

## 11. Test Coverage Analysis

Bad Example (No Coverage Information):

```bash
node --test
# No coverage information
```

Good Example (Built-in Coverage Analysis):

```bash
# Run tests with coverage
node --test --experimental-test-coverage

# Output coverage to file
node --test --experimental-test-coverage > coverage-report.txt

# Coverage with specific thresholds (via custom script)
node --test --experimental-test-coverage | grep "all files" | awk '{print $4}' | sed 's/%//' | awk '{if ($1 < 80) exit 1}'
```

Coverage Report Output:

```
ℹ start of coverage report
ℹ ------------------------------------------------------------------------
ℹ file                    | line % | branch % | funcs % | uncovered lines
ℹ ------------------------------------------------------------------------
ℹ src/math.ts            |  83.33 |    66.67 |  100.00 | 3-4
ℹ src/user.ts            |  95.24 |   100.00 |   80.00 | 7
ℹ ------------------------------------------------------------------------
ℹ all files               |  94.74 |    92.86 |   90.91 |
ℹ ------------------------------------------------------------------------
ℹ end of coverage report
```

---

## 12. Test Filtering and Organization

Bad Example (Poor Test Organization):

```ts
test("test1", () => {
  /* ... */
});
test("test2", () => {
  /* ... */
});
test("user stuff", () => {
  /* ... */
});
```

Good Example (Clear Descriptive Organization):

```ts
// tests/unit/user/user.service.test.ts
describe("UserService", () => {
  describe("createUser()", () => {
    test("should create user with valid data", () => {
      /* ... */
    });
    test("should throw ValidationError with invalid email", () => {
      /* ... */
    });
    test("should assign unique ID to new user", () => {
      /* ... */
    });
  });

  describe("updateUser()", () => {
    test("should update existing user properties", () => {
      /* ... */
    });
    test("should throw NotFoundError for non-existent user", () => {
      /* ... */
    });
  });

  describe("deleteUser()", () => {
    test("should remove user from database", () => {
      /* ... */
    });
    test("should return false for non-existent user", () => {
      /* ... */
    });
  });
});
```

### Running Specific Tests:

```bash
# Run tests matching pattern
node --test --test-name-pattern="UserService"

# Run tests with specific tag
node --test --test-name-pattern="@integration"

# Run only failing tests (with custom script)
node --test --test-name-pattern="should throw"
```

---

## 13. Skip and Only Tests

Bad Example (Commenting Out Tests):

```ts
// test("broken test", () => {
//   assert.fail("This is broken");
// });
```

Good Example (Proper Test Control):

```ts
describe("Feature Tests", () => {
  test.skip("temporarily disabled test", () => {
    // This test is skipped
    assert.strictEqual(1, 1);
  });

  test("normal test", () => {
    assert.strictEqual(2 + 2, 4);
  });

  test.only("focus on this test", () => {
    // Only this test will run when using test.only
    assert.strictEqual(3 + 3, 6);
  });
});
```

---

## 14. Testing HTTP Services

Bad Example (External Dependencies):

```ts
const request = require("supertest");
const app = require("../app");

test("GET /users", async () => {
  const response = await request(app).get("/users");
  expect(response.status).toBe(200);
});
```

Good Example (Native HTTP Testing):

```ts
import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../src/app.ts";

describe("API Endpoints", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await buildApp();
  });

  after(async () => {
    await app.close();
  });

  test("GET /users should return user list", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/users",
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(
      response.headers["content-type"],
      "application/json; charset=utf-8"
    );

    const users = JSON.parse(response.payload);
    assert.ok(Array.isArray(users));
  });

  test("POST /users should create user", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };

    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: newUser,
    });

    assert.strictEqual(response.statusCode, 201);

    const createdUser = JSON.parse(response.payload);
    assert.strictEqual(createdUser.name, newUser.name);
    assert.ok(createdUser.id);
  });
});
```

---

## 15. Test Utilities and Helpers

Bad Example (Inline Test Data):

```ts
test("user creation", () => {
  const user = createUser({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    // ... lots of properties
  });
});
```

Good Example (Reusable Test Utilities):

```ts
// tests/helpers/user.fixtures.ts
export const createTestUser = (overrides: Partial<User> = {}): User => ({
  id: generateTestId(),
  name: "Test User",
  email: "test@example.com",
  age: 25,
  createdAt: new Date(),
  ...overrides,
});

export const createTestUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) =>
    createTestUser({ name: `User ${i + 1}` })
  );

// tests/unit/user.service.test.ts
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { createTestUser, createTestUsers } from "../helpers/user.fixtures.ts";

describe("UserService", () => {
  test("should handle multiple users", () => {
    const users: User[] = createTestUsers(5);
    const result: User[] = processUsers(users);

    assert.strictEqual(result.length, 5);
  });
});
```

---

## 16. Test Reports and Output Formats

Bad Example (Default Output Only):

```bash
node --test
# Only console output
```

Good Example (Multiple Report Formats):

```bash
# TAP format
node --test --test-reporter=tap

# Spec format (default)
node --test --test-reporter=spec

# Dot format
node --test --test-reporter=dot

# JUnit XML format
node --test --test-reporter=junit

# Save report to file
node --test --test-reporter=tap --test-reporter-destination=report.txt

# Multiple reporters
node --test --test-reporter=spec --test-reporter-destination=stdout --test-reporter=junit --test-reporter-destination=junit.xml
```

---

## 17. Testing CLI Applications

Bad Example (Testing CLI Through Shell):

```bash
# package.json
"test:cli": "bash test-cli.sh"
```

Good Example (Direct CLI Testing with Node.js):

```ts
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

describe("CLI Application", () => {
  test("should display help message", async () => {
    const { stdout, stderr, exitCode } = await execCommand("node", [
      "src/cli.ts",
      "--help",
    ]);

    assert.strictEqual(exitCode, 0);
    assert.ok(stdout.includes("Usage:"));
    assert.strictEqual(stderr, "");
  });

  test("should handle invalid commands gracefully", async () => {
    const { stdout, stderr, exitCode } = await execCommand("node", [
      "src/cli.ts",
      "invalid-command",
    ]);

    assert.notStrictEqual(exitCode, 0);
    assert.ok(stderr.includes("Unknown command"));
  });
});

async function execCommand(
  command: string,
  args: string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "pipe" });
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => (stdout += data.toString()));
    child.stderr?.on("data", (data) => (stderr += data.toString()));
    child.on("close", (exitCode) =>
      resolve({ stdout, stderr, exitCode: exitCode || 0 })
    );
  });
}
```

---

## 18. Performance Testing

Bad Example (No Performance Metrics):

```ts
test("should process data", () => {
  const result = processLargeDataset(data);
  assert.ok(result);
});
```

Good Example (Built-in Performance Monitoring):

```ts
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

describe("Performance Tests", () => {
  test("should process data within time limit", () => {
    const start = performance.now();

    const result = processLargeDataset(largeData);

    const duration = performance.now() - start;

    assert.ok(result);
    assert.ok(
      duration < 1000,
      `Processing took ${duration}ms, expected < 1000ms`
    );
  });

  test("should handle concurrent requests efficiently", async () => {
    const start = performance.now();

    const promises = Array.from({ length: 10 }, () =>
      processRequest({ id: Math.random() })
    );

    const results = await Promise.all(promises);
    const duration = performance.now() - start;

    assert.strictEqual(results.length, 10);
    assert.ok(duration < 2000, `Concurrent processing took ${duration}ms`);
  });
});
```

---

## 19. Best Practices Summary

### Test File Organization:

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
├── helpers/       # Test utilities
└── fixtures/      # Test data
```

### Key Principles:

- **Use native Node.js features only** - No external testing frameworks needed
- **Write descriptive test names** - Tests should read like specifications
- **Test behavior, not implementation** - Focus on what, not how
- **Keep tests independent** - Each test should be able to run in isolation
- **Use TypeScript properly** - Leverage type safety in tests
- **Follow AAA pattern** - Arrange, Act, Assert
- **Mock external dependencies** - Keep tests fast and reliable
- **Use proper error testing** - Test both success and failure scenarios

### Command Line Usage:

```bash
# Run all tests
node --test

# Run with watch mode
node --test --watch

# Run with coverage
node --test --experimental-test-coverage

# Run specific test files
node --test tests/unit/**/*.test.ts

# Run tests matching pattern
node --test --test-name-pattern="User"

# Run only marked tests
node --test --test-only

# Run with specific reporter
node --test --test-reporter=tap

# Multiple options combined
node --test --watch --experimental-test-coverage --test-name-pattern="@integration"
```

### TypeScript Execution:

```bash
# Modern Node.js runs TypeScript directly
node --test src/**/*.test.ts

# No need for ts-node, tsx, or any compilation step
node src/app.ts  # Works directly with TypeScript files
```

---

## 20. Migration from External Frameworks

### From Jest:

```ts
// OLD (Jest)
describe("Math", () => {
  test("adds", () => {
    expect(add(1, 2)).toBe(3);
  });
});

// NEW (Node.js native)
import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("Math", () => {
  test("adds", () => {
    assert.strictEqual(add(1, 2), 3);
  });
});
```

### From Mocha + Chai:

```ts
// OLD (Mocha + Chai)
const { expect } = require("chai");

describe("User", () => {
  it("should create user", () => {
    expect(createUser()).to.have.property("id");
  });
});

// NEW (Node.js native)
import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("User", () => {
  test("should create user", () => {
    const user = createUser();
    assert.ok(user.hasOwnProperty("id"));
  });
});
```

> End of Node.js 2025 Testing Best Practices.
