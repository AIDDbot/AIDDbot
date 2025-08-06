---
description: "Node 2025 Framework Best Practices"
applyTo: "**/*.ts"
---

# Modern Node.js Patterns (2025)

A concise reference to generate modern Node applications, with bad and good examples for each category.

## 1. Module System (ESM + `node:` Prefix)

Bad Example (CommonJS):

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require("./math");
console.log(add(2, 3));
```

Good Example (ESM + `node:` Prefix + Top-Level Await):

```js
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";
import { readFile } from "node:fs/promises";
const config = JSON.parse(await readFile("config.json", "utf8"));
console.log(add(2, 3), config);
```

---

## 2. Built-in Web APIs

Bad Example (External HTTP Lib):

```js
const axios = require("axios");
const response = await axios.get("https://api.example.com/data");
```

Good Example (Native Fetch + AbortSignal):

```js
const response = await fetch("https://api.example.com/data", {
  signal: AbortSignal.timeout(5000),
});
const data = await response.json();
```

---

## 3. Built-in Testing

Bad Example (External Framework):

```bash
npm install jest
// package.json scripts: "test": "jest"
```

Good Example (Node’s Built-in Runner):

```js
// test/math.test.js
import { test, describe } from "node:test";
import assert from "node:assert";
import { add } from "../math.js";

describe("add()", () => {
  test("adds numbers", () => {
    assert.strictEqual(add(2, 3), 5);
  });
});
```

```bash
# Run
node --test --watch
```

---

## 4. Async Patterns

Bad Example (Serial + Manual IIFE):

```js
(async () => {
  const config = await readFile("config.json", "utf8");
  const data = await fetch("/api").then((r) => r.json());
})();
```

Good Example (Parallel + Structured Error Handling):

```js
async function processData() {
  try {
    const [raw, user] = await Promise.all([
      readFile("config.json", "utf8"),
      fetch("/api").then((r) => r.json()),
    ]);
    // ...
  } catch (err) {
    console.error({ error: err.message });
    throw err;
  }
}
```

---

## 5. Streams

Bad Example (Callback Pipeline):

```js
const read = fs.createReadStream("in.txt");
const write = fs.createWriteStream("out.txt");
read.on("data", (chunk) => write.write(chunk.toString().toUpperCase()));
read.on("end", () => write.end());
```

Good Example (Promise-based `pipeline` + Transform):

```js
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
await pipeline(
  createReadStream("in.txt"),
  new Transform({
    transform(chunk, _, cb) {
      cb(null, chunk.toString().toUpperCase());
    },
  }),
  createWriteStream("out.txt"),
);
```

---

## 6. Worker Threads

Bad Example (Synchronous CPU Work):

```js
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(40)); // blocks event loop
```

Good Example (Non-Blocking with Worker):

```js
// worker.js
import { parentPort, workerData } from "node:worker_threads";
function fib(n) {
  /* ... */
}
parentPort.postMessage(fib(workerData.n));

// main.js
import { Worker } from "node:worker_threads";
const result = await new Promise((res, rej) => {
  const w = new Worker("./worker.js", { workerData: { n: 40 } });
  w.on("message", res);
  w.on("error", rej);
});
```

---

## 7. Development Experience

Bad Example (nodemon + dotenv):

```bash
npm install nodemon dotenv
# package.json scripts: "dev": "nodemon app.js"
```

Good Example (`--watch` + `--env-file`):

```json
// package.json
"scripts": {
  "dev": "node --watch --env-file=.env app.js"
}
```

---

## 8. Security & Performance Monitoring

Bad Example (No Restrictions + External APM):

```bash
# no permission flags
npm install newrelic
```

Good Example (Permissions + Built-in Perf Hooks):

```bash
node --experimental-permission --allow-net=api.example.com app.js
```

```js
import { performance, PerformanceObserver } from "node:perf_hooks";
new PerformanceObserver((list) =>
  list.getEntries().forEach((e) => console.log(e)),
).observe({ entryTypes: ["function", "http"] });
```

---

## 9. Application Distribution

Bad Example (Tarball + Manual Setup):

```bash
tar -czf app.tar.gz .
scp app.tar.gz server:~/ && ssh server "tar -xzf app.tar.gz && npm install"
```

Good Example (Single Executable Blob):

```bash
node --experimental-sea-config sea-config.json
```

```json
// sea-config.json
{ "main": "app.js", "output": "my-app.blob" }
```

---

## 10. Error Handling & Diagnostics

Bad Example (Raw try/catch + console.log):

```js
try {
  await db.query(sql);
} catch (err) {
  console.log(err);
}
```

Good Example (Structured AppError + diagnostics_channel):

```js
class AppError extends Error {
  constructor(msg, code, ctx) {
    super(msg);
    this.code = code;
    this.context = ctx;
  }
}

import diagnostics_channel from "node:diagnostics_channel";
const dbChan = diagnostics_channel.channel("db");

async function query(sql) {
  const start = performance.now();
  try {
    const res = await db.query(sql);
    dbChan.publish({ sql, duration: performance.now() - start, success: true });
    return res;
  } catch (err) {
    dbChan.publish({
      sql,
      duration: performance.now() - start,
      success: false,
      error: err.message,
    });
    throw new AppError("DB failed", "DB_ERR", { sql });
  }
}
```

---

## 11. Package Management & Module Resolution

Bad Example (Relative Path Hell):

```js
import util from "../../utils/helper.js";
```

Good Example (Import Maps + Dynamic Imports):

```json
// import-map.json
{
  "imports": {
    "#utils/": "./src/utils/",
    "#db": "./src/db/index.js"
  }
}
```

```js
import helper from "#utils/helper.js";
const env = process.env.FEATURE;
if (env) {
  const feature = await import(`#features/${env}.js`);
}
```
