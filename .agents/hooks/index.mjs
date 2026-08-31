#!/usr/bin/env node

// src/index.ts
import { readFileSync } from "node:fs";

// src/event.ts
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isOmitted(value) {
  if (value === null || value === "")
    return true;
  if (Array.isArray(value) && value.length === 0)
    return true;
  return isRecord(value) && Object.keys(value).length === 0;
}
function omitRecord(value) {
  const result = {};
  for (const [key, nested] of Object.entries(value)) {
    const cleaned = omitEmpty(nested);
    if (!isOmitted(cleaned))
      result[key] = cleaned;
  }
  return result;
}
function omitArray(value) {
  return value.map((item) => isRecord(item) ? omitEmpty(item) : item);
}
function omitEmpty(value) {
  if (Array.isArray(value))
    return omitArray(value);
  if (isRecord(value))
    return omitRecord(value);
  return value;
}
function buildEvent(input) {
  return {
    ...omitRecord(input.payload),
    harness: input.harness,
    receivedAt: input.receivedAt,
    hookEvent: input.hookEvent
  };
}

// src/project.ts
import path from "node:path";
function nonEmptyString(value) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
function firstString(value) {
  if (!Array.isArray(value))
    return;
  for (const item of value) {
    const found = nonEmptyString(item);
    if (found !== undefined)
      return found;
  }
  return;
}
function nativeProjectPath(value) {
  if (process.platform === "win32") {
    const drive = /^\/([A-Za-z]):(?:\/|\\)(.*)$/.exec(value);
    if (drive !== null) {
      return path.win32.normalize(`${drive[1]}:\\${drive[2]}`);
    }
  }
  return path.normalize(value);
}
function resolveProjectRoot(input) {
  const found = nonEmptyString(input.env.CURSOR_PROJECT_DIR) ?? nonEmptyString(input.env.CLAUDE_PROJECT_DIR) ?? nonEmptyString(input.payload.cwd) ?? firstString(input.payload.workspace_roots);
  return found === undefined ? undefined : nativeProjectPath(found);
}

// src/store.ts
import { appendFile, mkdir, open, stat, unlink } from "node:fs/promises";
import path2 from "node:path";
var lockWaitMs = 400;
var lockRetryMs = 10;
var lockStaleMs = 2000;
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function errorCode(error) {
  if (typeof error !== "object" || error === null)
    return;
  if (!("code" in error))
    return;
  return typeof error.code === "string" ? error.code : undefined;
}
async function unlinkQuiet(lockPath) {
  try {
    await unlink(lockPath);
  } catch {}
}
async function unlinkIfStale(lockPath) {
  try {
    const info = await stat(lockPath);
    if (Date.now() - info.mtimeMs > lockStaleMs)
      await unlink(lockPath);
  } catch {}
}
async function acquireLock(lockPath) {
  const deadline = Date.now() + lockWaitMs;
  for (;; ) {
    try {
      return await open(lockPath, "wx");
    } catch (error) {
      if (errorCode(error) !== "EEXIST")
        throw error;
      if (Date.now() >= deadline)
        throw new Error("lock not acquired");
      await unlinkIfStale(lockPath);
      await delay(lockRetryMs);
    }
  }
}
async function releaseLock(lock, lockPath) {
  try {
    await lock.close();
  } finally {
    await unlinkQuiet(lockPath);
  }
}
async function appendEvent(projectRoot, event) {
  const auditDir = path2.join(projectRoot, "temp", "audit");
  const eventsPath = path2.join(auditDir, "events.jsonl");
  const lockPath = path2.join(auditDir, "events.jsonl.lock");
  await mkdir(auditDir, { recursive: true });
  const lock = await acquireLock(lockPath);
  try {
    await appendFile(eventsPath, `${JSON.stringify(event)}
`);
  } finally {
    await releaseLock(lock, lockPath);
  }
}

// src/ingest.ts
function isRecord2(value) {
  if (typeof value !== "object")
    return false;
  if (value === null)
    return false;
  if (Array.isArray(value))
    return false;
  return true;
}
function utf16BeToString(buf) {
  const swapped = Buffer.from(buf);
  swapped.swap16();
  return swapped.toString("utf16le");
}
function decodeHookStdin(buf) {
  if (buf.length >= 2 && buf[0] === 255 && buf[1] === 254) {
    return buf.subarray(2).toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 254 && buf[1] === 255) {
    return utf16BeToString(buf.subarray(2));
  }
  if (buf.length >= 3 && buf[0] === 239 && buf[1] === 187 && buf[2] === 191) {
    return buf.subarray(3).toString("utf8");
  }
  if (buf.length >= 2 && buf[0] === 123 && buf[1] === 0) {
    return buf.toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 0 && buf[1] === 123) {
    return utf16BeToString(buf);
  }
  return buf.toString("utf8");
}
function parseJsonValue(text) {
  return JSON.parse(text.replace(/^\uFEFF/, "").trim());
}
function parsePayload(input) {
  try {
    let parsed = parseJsonValue(input.stdinText);
    if (typeof parsed === "string")
      parsed = parseJsonValue(parsed);
    if (!isRecord2(parsed))
      return;
    return parsed;
  } catch {
    return;
  }
}
function asNonEmptyString(value) {
  if (typeof value !== "string")
    return;
  if (value.length === 0)
    return;
  return value;
}
function resolveHookEvent(input, payload) {
  const fromPayload = asNonEmptyString(payload.hook_event_name);
  if (fromPayload !== undefined)
    return fromPayload;
  const fromHint = asNonEmptyString(input.hookEventHint);
  if (fromHint !== undefined)
    return fromHint;
  return;
}
function resolveHarness(input) {
  const harness = input.harness;
  if (harness === "cursor")
    return harness;
  if (harness === "claude")
    return harness;
  if (harness === "copilot")
    return harness;
  return;
}
async function ingestOrThrow(input) {
  const payload = parsePayload(input);
  if (!payload)
    return;
  const hookEvent = resolveHookEvent(input, payload);
  if (!hookEvent)
    return;
  const harness = resolveHarness(input);
  if (!harness)
    return;
  const projectRoot = resolveProjectRoot({ env: input.env, payload });
  if (!projectRoot)
    return;
  const event = buildEvent({
    harness,
    receivedAt: new Date().toISOString(),
    hookEvent,
    payload
  });
  await appendEvent(projectRoot, event);
}
async function ingestHook(input) {
  try {
    await ingestOrThrow(input);
  } catch {}
}

// src/usage.ts
var usageMessage = "usage: cli-node ingest {harness} [hookEventHint]";

// src/index.ts
var command = process.argv[2];
async function runIngest() {
  try {
    const stdinText = decodeHookStdin(readFileSync(0));
    await ingestHook({
      harness: process.argv[3],
      hookEventHint: process.argv[4],
      stdinText,
      env: process.env
    });
  } finally {
    process.exitCode = 0;
  }
}
if (command === "ingest") {
  await runIngest();
} else {
  console.error(usageMessage);
  process.exitCode = 1;
}
