#!/usr/bin/env node
// v0.19.1 2026-09-04T16:29:55.264Z

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
import path4 from "node:path";

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
import path2 from "node:path";
var headerKeys = new Set([
  "session_id",
  "harness",
  "event",
  "timestamp",
  "turn"
]);
var detailsByEvent = new Map([
  ["sessionStart", []],
  ["SessionStart", ["model", "permission_mode", "source", "cwd"]],
  ["sessionEnd", ["reason"]],
  ["SessionEnd", ["reason", "cwd"]],
  ["subagentStart", ["task"]],
  ["SubagentStart", ["agent_id", "task"]],
  ["subagentStop", ["response_text"]],
  ["SubagentStop", ["agent_id", "response_text"]],
  ["beforeSubmitPrompt", ["prompt"]],
  ["userPromptSubmitted", ["prompt"]],
  ["UserPromptSubmit", ["prompt", "cwd"]],
  ["stop", []],
  ["agentStop", []],
  ["Stop", ["response_text"]]
]);
var promptKinds = new Set([
  "beforeSubmitPrompt",
  "userPromptSubmitted",
  "UserPromptSubmit"
]);
function isPlainObject(value) {
  if (typeof value !== "object")
    return false;
  if (value === null)
    return false;
  if (Array.isArray(value))
    return false;
  return true;
}
function stringProp(obj, key) {
  const value = obj[key];
  if (typeof value !== "string")
    return "";
  return value;
}
function parseTurn(value) {
  if (typeof value !== "number")
    return 0;
  if (!Number.isInteger(value))
    return 0;
  return value;
}
function bodyValue(value) {
  if (value === null)
    return null;
  if (typeof value === "string")
    return value;
  if (typeof value === "number")
    return String(value);
  if (typeof value === "boolean")
    return String(value);
  return JSON.stringify(value);
}
function bodyFields(obj) {
  const body = {};
  for (const [key, value] of Object.entries(obj)) {
    if (headerKeys.has(key))
      continue;
    if (value === undefined)
      continue;
    body[key] = bodyValue(value);
  }
  return body;
}
function parseSessionObject(obj) {
  return {
    session_id: stringProp(obj, "session_id"),
    harness: stringProp(obj, "harness"),
    event: stringProp(obj, "event"),
    timestamp: stringProp(obj, "timestamp"),
    turn: parseTurn(obj.turn),
    body: bodyFields(obj)
  };
}
function parseSessionRecords(text) {
  const records = [];
  for (const line of text.split(`
`)) {
    if (line.length === 0)
      continue;
    const parsed = JSON.parse(line);
    if (!isPlainObject(parsed))
      continue;
    records.push(parseSessionObject(parsed));
  }
  return records;
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
    const seen = counts.get(doc.event);
    if (seen === undefined)
      order.push(doc.event);
    counts.set(doc.event, (seen ?? 0) + 1);
  }
  return order.map((event) => ({ event, count: counts.get(event) ?? 0 }));
}
function preview(value) {
  const single = value.replace(/\r\n|\n|\r/g, " ");
  if (single.length <= 100)
    return single;
  return `${single.slice(0, 100)}...`;
}
function scalarText(value) {
  if (value === null)
    return "null";
  return preview(value);
}
function formatFieldList(doc, fields) {
  const parts = [];
  for (const name of fields) {
    if (!(name in doc.body))
      continue;
    parts.push(`${name}: ${scalarText(doc.body[name] ?? null)}`);
  }
  return parts.join("; ");
}
function formatSubagent(doc) {
  if (!("subagent" in doc.body))
    return "";
  return scalarText(doc.body.subagent ?? null);
}
function formatDetails(doc) {
  const fields = detailsByEvent.get(doc.event);
  if (fields === undefined)
    return "";
  return formatFieldList(doc, fields);
}
function escapeCell(text) {
  return text.replaceAll("|", "\\|");
}
function reportSessionId(first, sessionId) {
  if (sessionId === undefined)
    return first.session_id;
  return sessionId;
}
function overviewSection(first, last, sessionId) {
  return [
    "## Overview",
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| session_id | ${escapeCell(sessionId)} |`,
    `| harness | ${escapeCell(last.harness)} |`,
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
    "| event | count |",
    "| --- | --- |",
    ...rows
  ];
}
function eventRow(doc) {
  return `| ${escapeCell(doc.timestamp)} | ${escapeCell(doc.event)} | ${escapeCell(formatSubagent(doc))} | ${escapeCell(formatDetails(doc))} |`;
}
function turnGroups(docs) {
  const seen = [];
  const byTurn = new Map;
  for (const doc of docs) {
    const existing = byTurn.get(doc.turn);
    if (existing === undefined) {
      seen.push(doc.turn);
      byTurn.set(doc.turn, [doc]);
    } else {
      existing.push(doc);
    }
  }
  seen.sort((a, b) => a - b);
  return seen.map((turn) => ({ turn, docs: byTurn.get(turn) ?? [] }));
}
function firstPromptDoc(docs) {
  for (const doc of docs) {
    if (promptKinds.has(doc.event))
      return doc;
  }
  return;
}
function turnDuration(group) {
  const last = group.docs[group.docs.length - 1];
  const first = group.docs[0];
  if (last === undefined || first === undefined)
    return "00:00:00";
  if (group.turn < 1)
    return formatDuration(first.timestamp, last.timestamp);
  const prompt = firstPromptDoc(group.docs);
  const start = prompt ?? first;
  return formatDuration(start.timestamp, last.timestamp);
}
function turnPrompt(group) {
  if (group.turn < 1)
    return;
  const promptDoc = firstPromptDoc(group.docs);
  if (promptDoc === undefined)
    return;
  if (!("prompt" in promptDoc.body))
    return;
  return scalarText(promptDoc.body.prompt ?? null);
}
function turnSection(group) {
  const prompt = turnPrompt(group);
  const lines = [
    "",
    `## Turn ${group.turn}`,
    "",
    `Duration: ${turnDuration(group)}`,
    ""
  ];
  if (prompt !== undefined) {
    lines.push(`Prompt: ${escapeCell(prompt)}`, "");
  }
  lines.push("| Time | Event | Subagent | Details |", "| --- | --- | --- | --- |", ...group.docs.map(eventRow));
  return lines;
}
function emitSessionReport(docs, sessionId) {
  const first = docs[0];
  if (first === undefined)
    throw new Error("empty jsonl");
  const last = docs[docs.length - 1] ?? first;
  const lines = [
    ...overviewSection(first, last, reportSessionId(first, sessionId)),
    "",
    ...countSection(docs),
    ...turnGroups(docs).flatMap(turnSection)
  ];
  return `${lines.join(`
`)}
`;
}
async function writeSessionReport(input) {
  const text = await readFile(input.jsonlPath, "utf8");
  const docs = parseSessionRecords(text);
  await writeFile(input.mdPath, emitSessionReport(docs, path2.parse(input.jsonlPath).name));
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
import path3 from "node:path";

// src/yaml.ts
var codexSessionStartFields = [
  { name: "model", cursor: "", copilot: "", "claude-code": "", codex: "model" },
  { name: "permission_mode", cursor: "", copilot: "", "claude-code": "", codex: "permission_mode" },
  { name: "source", cursor: "", copilot: "", "claude-code": "", codex: "source" },
  { name: "cwd", cursor: "", copilot: "", "claude-code": "", codex: "cwd" }
];
var sessionEndFields = [
  { name: "reason", cursor: "reason", copilot: "reason", "claude-code": "reason", codex: "reason" },
  { name: "cwd", cursor: "", copilot: "", "claude-code": "", codex: "cwd" }
];
var subagentStartFields = [
  {
    name: "agent_display_name",
    cursor: "",
    copilot: "agentDisplayName",
    "claude-code": "",
    codex: ""
  },
  { name: "task", cursor: "task", copilot: "", "claude-code": "", codex: "" }
];
var subagentStopFields = [
  {
    name: "agent_display_name",
    cursor: "",
    copilot: "agentDisplayName",
    "claude-code": "",
    codex: ""
  },
  {
    name: "response_text",
    cursor: "summary",
    copilot: "response",
    "claude-code": "last_assistant_message",
    codex: "last_assistant_message"
  }
];
var subagentSourceKeys = ["subagent_type", "agent_type", "agentType", "agentName"];
var promptFields = [
  { name: "prompt", cursor: "prompt", copilot: "prompt", "claude-code": "prompt", codex: "prompt" },
  { name: "cwd", cursor: "", copilot: "", "claude-code": "", codex: "cwd" }
];
var emptyFields = [];
var codexStopFields = [
  { name: "response_text", cursor: "", copilot: "", "claude-code": "", codex: "last_assistant_message" }
];
var bodyByEvent = new Map([
  ["sessionStart", emptyFields],
  ["SessionStart", codexSessionStartFields],
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
  ["Stop", codexStopFields]
]);
var promptKindEvents = new Set([
  "beforeSubmitPrompt",
  "userPromptSubmitted",
  "UserPromptSubmit"
]);
function isPromptKind(event) {
  return promptKindEvents.has(event);
}
function isSessionStartEvent(event) {
  if (event === "sessionStart")
    return true;
  if (event === "SessionStart")
    return true;
  return false;
}
function isPlainObject2(value) {
  if (typeof value !== "object")
    return false;
  if (value === null)
    return false;
  if (Array.isArray(value))
    return false;
  return true;
}
function parseJsonlRecords(text) {
  const records = [];
  for (const line of text.split(`
`)) {
    if (line.length === 0)
      continue;
    const parsed = JSON.parse(line);
    if (!isPlainObject2(parsed))
      continue;
    records.push(parsed);
  }
  return records;
}
function eventField(record) {
  if (typeof record.event !== "string")
    return "";
  return record.event;
}
function countPromptKindEvents(records) {
  let count = 0;
  for (const record of records) {
    if (!isPromptKind(eventField(record)))
      continue;
    count += 1;
  }
  return count;
}
function integerTurn(record) {
  if (typeof record.turn !== "number")
    return;
  if (!Number.isInteger(record.turn))
    return;
  return record.turn;
}
function turnForNativeId(records, nativeTurnId) {
  let highest = 0;
  for (const record of records) {
    const turn = integerTurn(record);
    if (turn === undefined)
      continue;
    if (record.turn_id === nativeTurnId)
      return turn;
    highest = Math.max(highest, turn);
  }
  return highest + 1;
}
function latestPositiveTurn(records) {
  for (let index = records.length - 1;index >= 0; index -= 1) {
    const record = records[index];
    if (record === undefined)
      continue;
    const turn = integerTurn(record);
    if (turn !== undefined && turn > 0)
      return turn;
  }
  return 0;
}
function nativeCodexTurn(records, payload) {
  const nativeTurnId = payload.turn_id;
  if (typeof nativeTurnId !== "string" || nativeTurnId.length === 0) {
    return latestPositiveTurn(records);
  }
  return turnForNativeId(records, nativeTurnId);
}
function conversationTurn(records, input) {
  if (typeof input !== "string" && input.harness === "codex") {
    return nativeCodexTurn(records, input.payload);
  }
  const event = typeof input === "string" ? input : input.event;
  const already = countPromptKindEvents(records);
  if (isPromptKind(event))
    return already + 1;
  return already;
}
function sessionRecordPosition(existingJsonl, input) {
  const records = parseJsonlRecords(existingJsonl);
  return {
    turn: conversationTurn(records, input),
    includeSessionId: isSessionStartEvent(input.event) && records.length === 0
  };
}
function asHarness(value) {
  if (value === "cursor")
    return value;
  if (value === "copilot")
    return value;
  if (value === "claude-code")
    return value;
  if (value === "codex")
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
function assignHeader(obj, input, timestamp) {
  if (input.includeSessionId)
    obj.session_id = input.sessionId;
  obj.harness = input.harness;
  obj.event = input.event;
  obj.timestamp = timestamp;
  obj.turn = input.turn;
}
function assignSubagent(obj, payload) {
  for (const key of subagentSourceKeys) {
    if (!(key in payload))
      continue;
    if (payload[key] !== undefined)
      obj.subagent = payload[key];
    return;
  }
}
function assignCodexTurnId(obj, payload, harness) {
  if (harness !== "codex")
    return;
  if ("turn_id" in payload && payload.turn_id !== undefined)
    obj.turn_id = payload.turn_id;
}
function assignCodexAgentId(obj, payload, harness, event) {
  if (harness !== "codex")
    return;
  if (event !== "SubagentStart" && event !== "SubagentStop")
    return;
  if ("agent_id" in payload && payload.agent_id !== undefined)
    obj.agent_id = payload.agent_id;
}
function assignBody(obj, payload, harness, event) {
  const column = asHarness(harness);
  if (column === undefined)
    return;
  const fields = bodyByEvent.get(event);
  if (fields === undefined)
    return;
  for (const field of fields) {
    const sourceKey = field[column];
    if (sourceKey.length === 0)
      continue;
    if (!(sourceKey in payload))
      continue;
    const value = payload[sourceKey];
    if (value === undefined)
      continue;
    obj[field.name] = value;
  }
}
function emitSessionRecord(input) {
  const obj = {};
  const timestamp = formatLocalHms(sourceInstant(input.payload, input.now));
  assignHeader(obj, input, timestamp);
  assignCodexTurnId(obj, input.payload, input.harness);
  assignSubagent(obj, input.payload);
  assignCodexAgentId(obj, input.payload, input.harness, input.event);
  assignBody(obj, input.payload, input.harness, input.event);
  return `${JSON.stringify(obj)}
`;
}

// src/store.ts
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
async function readExistingJsonl(jsonlPath) {
  try {
    return await readFile2(jsonlPath, "utf8");
  } catch (error) {
    if (errorCode(error) === "ENOENT")
      return "";
    throw error;
  }
}
function countedSessionRecord(existing, sessionId, emit) {
  const position = sessionRecordPosition(existing, {
    harness: emit.harness,
    event: emit.event,
    payload: emit.payload
  });
  return emitSessionRecord({
    payload: emit.payload,
    sessionId,
    harness: emit.harness,
    event: emit.event,
    now: emit.now,
    turn: position.turn,
    includeSessionId: position.includeSessionId
  });
}
async function appendSessionJsonl(input) {
  if (input.sessionId === undefined)
    return;
  if (input.sessionEmit === undefined)
    return;
  const jsonlPath = path3.join(input.dayFolder, `${input.sessionId}.jsonl`);
  const existing = await readExistingJsonl(jsonlPath);
  await appendFile(jsonlPath, countedSessionRecord(existing, input.sessionId, input.sessionEmit));
}
async function writeUnderLock(input) {
  const eventsPath = path3.join(input.dayFolder, "events.jsonl");
  const sessionsPath = path3.join(input.dayFolder, "sessions.json");
  await appendFile(eventsPath, `${input.eventLine}
`);
  await persistSessionIndex(sessionsPath, input.sessionId);
  await appendSessionJsonl({
    dayFolder: input.dayFolder,
    sessionId: input.sessionId,
    sessionEmit: input.sessionEmit
  });
}
async function persistIngest(input) {
  const dayFolder = path3.join(input.projectRoot, "temp", "audit", dayFolderName(input.now));
  await mkdir(dayFolder, { recursive: true });
  const lockPath = path3.join(dayFolder, "ingest.lock");
  const lock = await acquireLock(lockPath);
  try {
    await writeUnderLock({
      dayFolder,
      eventLine: input.eventLine,
      sessionId: input.sessionId,
      sessionEmit: input.sessionEmit
    });
  } finally {
    await releaseLock(lock, lockPath);
  }
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
function positionalOrEmpty(value) {
  if (value === undefined)
    return "";
  return value;
}
function sessionEmit(payload, input, sessionId, now) {
  if (sessionId === undefined)
    return;
  return {
    payload,
    harness: positionalOrEmpty(input.harness),
    event: positionalOrEmpty(input.event),
    now
  };
}
async function persistParsedIngest(args) {
  const sessionId = sessionIdentifier(args.payload);
  const now = args.input.now ?? new Date;
  await persistIngest({
    projectRoot: args.projectRoot,
    eventLine: eventLogLine(args.payload),
    sessionId,
    sessionEmit: sessionEmit(args.payload, args.input, sessionId, now),
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
  const folder = path4.join(args.projectRoot, "temp", "audit", dayFolderName(args.now));
  try {
    await writeSessionReport({
      jsonlPath: path4.join(folder, `${args.sessionId}.jsonl`),
      mdPath: path4.join(folder, `${args.sessionId}.md`)
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
