#!/usr/bin/env node
// v0.11.0 2026-09-01T19:08:57.559Z

// src/index.ts
import { readFileSync } from "node:fs";

// src/argv.ts
function parseArgv(argv) {
  const token = argv[2];
  if (token !== "ingest") {
    return { command: "unknown" };
  }
  return {
    command: "ingest",
    harness: argv[3],
    event: argv[4]
  };
}

// src/ingest.ts
import path3 from "node:path";

// src/event.ts
function nonEmptyString(value) {
  if (typeof value !== "string")
    return;
  if (value.length === 0)
    return;
  return value;
}
function sessionIdentifier(payload) {
  const sessionId = nonEmptyString(payload.session_id);
  if (sessionId !== undefined)
    return sessionId;
  const conversationId = nonEmptyString(payload.conversation_id);
  if (conversationId !== undefined)
    return conversationId;
  return nonEmptyString(payload.parent_conversation_id);
}
function eventLogLine(payload) {
  return JSON.stringify(payload);
}

// src/project.ts
import path from "node:path";
function nonEmptyString2(value) {
  if (typeof value !== "string")
    return;
  if (value.length === 0)
    return;
  return value;
}
function firstString(value) {
  if (!Array.isArray(value))
    return;
  for (const item of value) {
    const found = nonEmptyString2(item);
    if (found !== undefined)
      return found;
  }
  return;
}
function nativeProjectPath(value) {
  if (process.platform !== "win32")
    return path.normalize(value);
  const drive = /^\/([A-Za-z]):(?:\/|\\)(.*)$/.exec(value);
  if (drive === null)
    return path.normalize(value);
  return path.win32.normalize(`${drive[1]}:\\${drive[2]}`);
}
function resolveProjectRoot(input) {
  const fromEnv = nonEmptyString2(input.env.CURSOR_PROJECT_DIR);
  if (fromEnv !== undefined)
    return nativeProjectPath(fromEnv);
  const fromWorkspace = firstString(input.payload.workspace_roots);
  if (fromWorkspace !== undefined)
    return nativeProjectPath(fromWorkspace);
  const fromPayloadCwd = nonEmptyString2(input.payload.cwd);
  if (fromPayloadCwd !== undefined)
    return nativeProjectPath(fromPayloadCwd);
  const fromCwd = nonEmptyString2(input.cwd);
  if (fromCwd !== undefined)
    return nativeProjectPath(fromCwd);
  return;
}
function dayFolderName(now) {
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// src/report.ts
import { readFile, writeFile } from "node:fs/promises";
var headerKeys = new Set([
  "session_id",
  "source_harness",
  "source_event",
  "timestamp"
]);
var detailsByEvent = new Map([
  ["sessionStart", []],
  ["SessionStart", []],
  ["sessionEnd", ["reason"]],
  ["SessionEnd", ["reason"]],
  ["subagentStart", ["agent_type", "agent_display_name", "task"]],
  ["SubagentStart", ["agent_type", "agent_display_name", "task"]],
  ["subagentStop", ["agent_type", "agent_display_name", "response_text"]],
  ["SubagentStop", ["agent_type", "agent_display_name", "response_text"]],
  ["beforeSubmitPrompt", ["prompt"]],
  ["userPromptSubmitted", ["prompt"]],
  ["UserPromptSubmit", ["prompt"]],
  ["stop", []],
  ["agentStop", []],
  ["Stop", []]
]);
function takeChunk(chunks, current) {
  if (!current.some((line) => line.length > 0))
    return;
  chunks.push(current.join(`
`));
}
function yamlChunks(text) {
  const chunks = [];
  let current = [];
  for (const line of text.split(`
`)) {
    if (line === "---") {
      takeChunk(chunks, current);
      current = [];
      continue;
    }
    current.push(line);
  }
  takeChunk(chunks, current);
  return chunks;
}
function parseScalar(raw) {
  if (raw === "null")
    return null;
  if (!raw.startsWith('"'))
    return raw;
  const parsed = JSON.parse(raw);
  if (typeof parsed === "string")
    return parsed;
  return raw;
}
function readBlock(lines, start) {
  const parts = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (line === undefined)
      break;
    if (!line.startsWith("  "))
      break;
    parts.push(line.slice(2));
    i += 1;
  }
  return { value: parts.join(`
`), next: i };
}
function parsePairAt(lines, i) {
  const match = /^([A-Za-z_][A-Za-z0-9_]*):(?: (.*))?$/.exec(lines[i] ?? "");
  if (match === null)
    return;
  const key = match[1];
  const rest = match[2] ?? "";
  if (rest === "|") {
    const block = readBlock(lines, i + 1);
    return { pair: { key, value: block.value }, next: block.next };
  }
  return { pair: { key, value: parseScalar(rest) }, next: i + 1 };
}
function parsePairs(lines) {
  const pairs = [];
  let i = 0;
  while (i < lines.length) {
    const parsed = parsePairAt(lines, i);
    if (parsed === undefined) {
      i += 1;
      continue;
    }
    pairs.push(parsed.pair);
    i = parsed.next;
  }
  return pairs;
}
function stringField(pairs, key) {
  for (const pair of pairs) {
    if (pair.key !== key)
      continue;
    if (pair.value === null)
      return "";
    return pair.value;
  }
  return "";
}
function bodyFields(pairs) {
  const body = {};
  for (const pair of pairs) {
    if (headerKeys.has(pair.key))
      continue;
    body[pair.key] = pair.value;
  }
  return body;
}
function parseYamlChunk(chunk) {
  const pairs = parsePairs(chunk.split(`
`));
  return {
    session_id: stringField(pairs, "session_id"),
    source_harness: stringField(pairs, "source_harness"),
    source_event: stringField(pairs, "source_event"),
    timestamp: stringField(pairs, "timestamp"),
    body: bodyFields(pairs)
  };
}
function parseYamlDocuments(text) {
  return yamlChunks(text).map(parseYamlChunk);
}
function pad2(n) {
  return String(n).padStart(2, "0");
}
function secondsOfDay(hms) {
  const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(hms);
  if (match === null)
    return;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3]);
  return hours * 3600 + minutes * 60 + seconds;
}
function formatHms(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}
function formatDuration(first, last) {
  const start = secondsOfDay(first);
  if (start === undefined)
    return "00:00:00";
  const end = secondsOfDay(last);
  if (end === undefined)
    return "00:00:00";
  if (end <= start)
    return "00:00:00";
  return formatHms(end - start);
}
function eventCounts(docs) {
  const order = [];
  const counts = new Map;
  for (const doc of docs) {
    const seen = counts.get(doc.source_event);
    if (seen === undefined)
      order.push(doc.source_event);
    counts.set(doc.source_event, (seen ?? 0) + 1);
  }
  return order.map((event) => ({ event, count: counts.get(event) ?? 0 }));
}
function preview(value) {
  const single = value.replace(/\r\n|\n|\r/g, " ");
  if (single.length <= 80)
    return single;
  return `${single.slice(0, 80)}...`;
}
function scalarText(value) {
  if (value === null)
    return "null";
  return preview(value);
}
function formatDetails(doc) {
  const fields = detailsByEvent.get(doc.source_event);
  if (fields === undefined)
    return "";
  const parts = [];
  for (const name of fields) {
    if (!(name in doc.body))
      continue;
    parts.push(`${name}: ${scalarText(doc.body[name] ?? null)}`);
  }
  return parts.join("; ");
}
function escapeCell(text) {
  return text.replaceAll("|", "\\|");
}
function overviewSection(first, last) {
  return [
    "## Overview",
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| session_id | ${escapeCell(first.session_id)} |`,
    `| source_harness | ${escapeCell(last.source_harness)} |`,
    `| start | ${escapeCell(first.timestamp)} |`,
    `| end | ${escapeCell(last.timestamp)} |`,
    `| duration | ${formatDuration(first.timestamp, last.timestamp)} |`
  ];
}
function countSection(docs) {
  const rows = eventCounts(docs).map((row) => `| ${escapeCell(row.event)} | ${row.count} |`);
  return [
    "## Event counts",
    "",
    `Total: ${docs.length}`,
    "",
    "| source_event | count |",
    "| --- | --- |",
    ...rows
  ];
}
function eventRow(doc) {
  return `| ${escapeCell(doc.timestamp)} | ${escapeCell(doc.source_event)} | ${escapeCell(formatDetails(doc))} |`;
}
function eventsSection(docs) {
  return [
    "## Events",
    "",
    "| Time | Event | Details |",
    "| --- | --- | --- |",
    ...docs.map(eventRow)
  ];
}
function emitSessionReport(docs) {
  const first = docs[0];
  if (first === undefined)
    throw new Error("empty yaml");
  const last = docs[docs.length - 1] ?? first;
  const lines = [
    ...overviewSection(first, last),
    "",
    ...countSection(docs),
    "",
    ...eventsSection(docs)
  ];
  return `${lines.join(`
`)}
`;
}
async function writeSessionReport(input) {
  const text = await readFile(input.yamlPath, "utf8");
  const docs = parseYamlDocuments(text);
  await writeFile(input.mdPath, emitSessionReport(docs));
}

// src/store.ts
import {
  appendFile,
  mkdir,
  open,
  readFile as readFile2,
  stat,
  unlink,
  writeFile as writeFile2
} from "node:fs/promises";
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
  if (typeof error !== "object")
    return;
  if (error === null)
    return;
  if (!("code" in error))
    return;
  if (typeof error.code !== "string")
    return;
  return error.code;
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
        throw new Error("lock not acquired", { cause: error });
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
function stringIds(parsed) {
  const ids = [];
  for (const item of parsed) {
    if (typeof item === "string")
      ids.push(item);
  }
  return ids;
}
async function loadSessionIndex(sessionsPath) {
  try {
    const parsed = JSON.parse(await readFile2(sessionsPath, "utf8"));
    if (!Array.isArray(parsed))
      throw new Error("sessions.json is not a JSON array");
    return { ids: stringIds(parsed), exists: true };
  } catch (error) {
    if (errorCode(error) === "ENOENT")
      return { ids: [], exists: false };
    throw error;
  }
}
function nextSessionIds(ids, sessionId) {
  if (sessionId === undefined)
    return;
  if (ids.includes(sessionId))
    return;
  return [...ids, sessionId];
}
async function persistSessionIndex(sessionsPath, sessionId) {
  const loaded = await loadSessionIndex(sessionsPath);
  const updated = nextSessionIds(loaded.ids, sessionId);
  if (updated !== undefined) {
    await writeFile2(sessionsPath, JSON.stringify(updated));
    return;
  }
  if (loaded.exists)
    return;
  await writeFile2(sessionsPath, "[]");
}
async function writeUnderLock(input) {
  const eventsPath = path2.join(input.dayFolder, "events.jsonl");
  const sessionsPath = path2.join(input.dayFolder, "sessions.json");
  await appendFile(eventsPath, `${input.eventLine}
`);
  await persistSessionIndex(sessionsPath, input.sessionId);
  if (input.sessionId === undefined)
    return;
  if (input.yamlDocument === undefined)
    return;
  await appendFile(path2.join(input.dayFolder, `${input.sessionId}.yaml`), input.yamlDocument);
}
async function persistIngest(input) {
  const dayFolder = path2.join(input.projectRoot, "temp", "audit", dayFolderName(input.now));
  await mkdir(dayFolder, { recursive: true });
  const lockPath = path2.join(dayFolder, "ingest.lock");
  const lock = await acquireLock(lockPath);
  try {
    await writeUnderLock({
      dayFolder,
      eventLine: input.eventLine,
      sessionId: input.sessionId,
      yamlDocument: input.yamlDocument
    });
  } finally {
    await releaseLock(lock, lockPath);
  }
}

// src/yaml.ts
var sessionEndFields = [
  { name: "reason", cursor: "reason", copilot: "reason", "claude-code": "reason" }
];
var subagentStartFields = [
  {
    name: "agent_type",
    cursor: "subagent_type",
    copilot: "agentName",
    "claude-code": "agent_type"
  },
  {
    name: "agent_display_name",
    cursor: "",
    copilot: "agentDisplayName",
    "claude-code": ""
  },
  { name: "task", cursor: "task", copilot: "", "claude-code": "" }
];
var subagentStopFields = [
  {
    name: "agent_type",
    cursor: "subagent_type",
    copilot: "agentType",
    "claude-code": "agent_type"
  },
  {
    name: "agent_display_name",
    cursor: "",
    copilot: "agentDisplayName",
    "claude-code": ""
  },
  {
    name: "response_text",
    cursor: "summary",
    copilot: "response",
    "claude-code": "last_assistant_message"
  }
];
var promptFields = [
  { name: "prompt", cursor: "prompt", copilot: "prompt", "claude-code": "prompt" }
];
var emptyFields = [];
var bodyByEvent = new Map([
  ["sessionStart", emptyFields],
  ["SessionStart", emptyFields],
  ["sessionEnd", sessionEndFields],
  ["SessionEnd", sessionEndFields],
  ["subagentStart", subagentStartFields],
  ["SubagentStart", subagentStartFields],
  ["subagentStop", subagentStopFields],
  ["SubagentStop", subagentStopFields],
  ["beforeSubmitPrompt", promptFields],
  ["userPromptSubmitted", promptFields],
  ["UserPromptSubmit", promptFields],
  ["stop", emptyFields],
  ["agentStop", emptyFields],
  ["Stop", emptyFields]
]);
function asHarness(value) {
  if (value === "cursor")
    return value;
  if (value === "copilot")
    return value;
  if (value === "claude-code")
    return value;
  return;
}
function pad22(n) {
  return String(n).padStart(2, "0");
}
function formatLocalHms(date) {
  return `${pad22(date.getHours())}:${pad22(date.getMinutes())}:${pad22(date.getSeconds())}`;
}
function sourceInstant(payload, now) {
  const raw = payload.timestamp;
  if (typeof raw === "number") {
    if (Number.isFinite(raw))
      return new Date(raw);
    return now;
  }
  if (typeof raw !== "string")
    return now;
  if (raw.length === 0)
    return now;
  const ms = Date.parse(raw);
  if (Number.isFinite(ms))
    return new Date(ms);
  return now;
}
function needsQuote(value) {
  if (value.length === 0)
    return true;
  if (/^(true|false|yes|no|on|off|null|~)$/i.test(value))
    return true;
  return !/^[A-Za-z_/][A-Za-z0-9_./+-]*$/.test(value);
}
function emitScalar(value) {
  if (value === null)
    return "null";
  if (typeof value === "boolean")
    return value ? "true" : "false";
  if (typeof value === "number") {
    if (Number.isFinite(value))
      return String(value);
    return JSON.stringify(String(value));
  }
  if (typeof value !== "string")
    return JSON.stringify(value);
  if (needsQuote(value))
    return JSON.stringify(value);
  return value;
}
function blockLines(value) {
  return value.split(`
`).map((line) => `  ${line}`).join(`
`);
}
function emitPair(key, value) {
  if (typeof value !== "string")
    return `${key}: ${emitScalar(value)}`;
  if (!value.includes(`
`))
    return `${key}: ${emitScalar(value)}`;
  return `${key}: |
${blockLines(value)}`;
}
function bodyLines(payload, harness, event) {
  const column = asHarness(harness);
  if (column === undefined)
    return [];
  const fields = bodyByEvent.get(event);
  if (fields === undefined)
    return [];
  const lines = [];
  for (const field of fields) {
    const sourceKey = field[column];
    if (sourceKey.length === 0)
      continue;
    if (!(sourceKey in payload))
      continue;
    lines.push(emitPair(field.name, payload[sourceKey]));
  }
  return lines;
}
function emitYamlDocument(input) {
  const timestamp = formatLocalHms(sourceInstant(input.payload, input.now));
  const lines = [
    "---",
    emitPair("session_id", input.sessionId),
    emitPair("source_harness", input.harness),
    emitPair("source_event", input.event),
    emitPair("timestamp", timestamp),
    ...bodyLines(input.payload, input.harness, input.event)
  ];
  return `${lines.join(`
`)}
`;
}

// src/ingest.ts
function isRecord(value) {
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
function startsWithTwo(buf, first, second) {
  if (buf.length < 2)
    return false;
  if (buf[0] !== first)
    return false;
  return buf[1] === second;
}
function hasUtf8Bom(buf) {
  if (buf.length < 3)
    return false;
  if (buf[0] !== 239)
    return false;
  if (buf[1] !== 187)
    return false;
  return buf[2] === 191;
}
function detectBomEncoding(buf) {
  if (startsWithTwo(buf, 255, 254))
    return "utf16le-bom";
  if (startsWithTwo(buf, 254, 255))
    return "utf16be-bom";
  if (hasUtf8Bom(buf))
    return "utf8-bom";
  return;
}
function detectEndianEncoding(buf) {
  if (startsWithTwo(buf, 123, 0))
    return "utf16le";
  if (startsWithTwo(buf, 0, 123))
    return "utf16be";
  return "utf8";
}
function detectHookEncoding(buf) {
  const bom = detectBomEncoding(buf);
  if (bom !== undefined)
    return bom;
  return detectEndianEncoding(buf);
}
function decodeBom(buf, encoding) {
  if (encoding === "utf16le-bom")
    return buf.subarray(2).toString("utf16le");
  if (encoding === "utf16be-bom")
    return utf16BeToString(buf.subarray(2));
  if (encoding === "utf8-bom")
    return buf.subarray(3).toString("utf8");
  return;
}
function decodeEndian(buf, encoding) {
  if (encoding === "utf16le")
    return buf.toString("utf16le");
  if (encoding === "utf16be")
    return utf16BeToString(buf);
  return buf.toString("utf8");
}
function decodeHookEncoding(buf, encoding) {
  const decoded = decodeBom(buf, encoding);
  if (decoded !== undefined)
    return decoded;
  return decodeEndian(buf, encoding);
}
function decodeHookStdin(buf) {
  return decodeHookEncoding(buf, detectHookEncoding(buf));
}
function parseJsonValue(text) {
  return JSON.parse(text.replace(/^\uFEFF/, "").trim());
}
function parsePayload(stdinText) {
  try {
    let parsed = parseJsonValue(stdinText);
    if (typeof parsed === "string")
      parsed = parseJsonValue(parsed);
    if (!isRecord(parsed))
      return;
    return parsed;
  } catch {
    return;
  }
}
function sessionYamlDocument(args) {
  if (args.sessionId === undefined)
    return;
  return emitYamlDocument({
    payload: args.payload,
    sessionId: args.sessionId,
    harness: args.input.harness ?? "",
    event: args.input.event ?? "",
    now: args.now
  });
}
async function persistParsedIngest(args) {
  const sessionId = sessionIdentifier(args.payload);
  const now = args.input.now ?? new Date;
  const yamlDocument = sessionYamlDocument({
    input: args.input,
    payload: args.payload,
    sessionId,
    now
  });
  await persistIngest({
    projectRoot: args.projectRoot,
    eventLine: eventLogLine(args.payload),
    sessionId,
    yamlDocument,
    now
  });
  await maybeWriteReport({
    projectRoot: args.projectRoot,
    sessionId,
    now
  });
}
async function ingestOrThrow(input) {
  const payload = parsePayload(input.stdinText);
  if (payload === undefined)
    return;
  const projectRoot = resolveProjectRoot({
    env: input.env,
    payload,
    cwd: input.cwd
  });
  if (projectRoot === undefined)
    return;
  await persistParsedIngest({ input, payload, projectRoot });
}
async function maybeWriteReport(args) {
  if (args.sessionId === undefined)
    return;
  const folder = path3.join(args.projectRoot, "temp", "audit", dayFolderName(args.now));
  try {
    await writeSessionReport({
      yamlPath: path3.join(folder, `${args.sessionId}.yaml`),
      mdPath: path3.join(folder, `${args.sessionId}.md`)
    });
  } catch {}
}
async function ingestHook(input) {
  try {
    await ingestOrThrow(input);
  } catch {}
}

// src/usage.ts
var usageMessage = "usage: cli-node ingest";

// src/index.ts
var parsed = parseArgv(process.argv);
async function runIngest() {
  if (parsed.command !== "ingest")
    return;
  try {
    const stdinText = decodeHookStdin(readFileSync(0));
    await ingestHook({
      stdinText,
      env: process.env,
      cwd: process.cwd(),
      harness: parsed.harness,
      event: parsed.event
    });
  } finally {
    process.exitCode = 0;
  }
}
if (parsed.command === "ingest") {
  await runIngest();
} else {
  console.error(usageMessage);
  process.exitCode = 1;
}
