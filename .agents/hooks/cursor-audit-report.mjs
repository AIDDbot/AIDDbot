/**
 * Cursor session audit — report
 * Copy BOTH files into `.agents/hooks/` of a project (Node >= 24, no deps):
 *   cursor-audit-ingest.mjs
 *   cursor-audit-report.mjs
 * Generated from src/. Edit TypeScript and run `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CLIP_EVENT = 300;
const CLIP_MD_TASK = 80;
const LOCK_TRIES = 5;
const LOCK_WAIT_MS = 20;
function nonempty(value) {
    if (typeof value !== "string")
        return undefined;
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
}
function isUuid(value) {
    return UUID_RE.test(value);
}
/** Filenames: `[a-zA-Z0-9._-]` only, max 80 chars. */
function sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 80);
}
/** Never use as a filename. Trim, collapse interior newlines, cap at 80. */
function normalizeSubagentId(id) {
    return id.trim().replace(/[\r\n]+/g, " ").replace(/ {2,}/g, " ").slice(0, 80);
}
/** Collapse interior newlines to a space, then clip. Append `…` if clipped. */
function clipLine(value, max) {
    if (value == null)
        return undefined;
    const collapsed = String(value).replace(/[\r\n]+/g, " ").replace(/ {2,}/g, " ").trim();
    if (!collapsed)
        return undefined;
    if (collapsed.length <= max)
        return collapsed;
    return `${collapsed.slice(0, max)}…`;
}
/** First user prompt: prefer `<user_query>` inner text, drop timestamps, clip to 300. */
function extractUserPrompt(text) {
    if (typeof text !== "string" || !text.trim())
        return undefined;
    const query = text.match(/<user_query>\s*([\s\S]*?)\s*<\/user_query>/i);
    const body = (query?.[1] ?? text).replace(/<timestamp>\s*[\s\S]*?\s*<\/timestamp>/gi, "").trim();
    return clipLine(body, CLIP_EVENT);
}
function isEmptyValue(value) {
    if (value == null)
        return true;
    if (value === "")
        return true;
    if (value === 0)
        return true;
    if (Array.isArray(value) && value.length === 0)
        return true;
    if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
        return true;
    }
    return false;
}
function omitEmpty(obj) {
    const out = {};
    for (const [key, value] of Object.entries(obj)) {
        if (isEmptyValue(value))
            continue;
        out[key] = value;
    }
    return out;
}
function auditDir(cwd = process.cwd()) {
    return path.join(cwd, "temp", "audit");
}
function isDirectory(dir) {
    try {
        return fs.statSync(dir).isDirectory();
    }
    catch {
        return false;
    }
}
/** Cursor on Windows sends workspace roots like `/C:/code/project`. */
function normalizeFsPath(p) {
    let next = p.trim();
    if (/^\/[A-Za-z]:/.test(next))
        next = next.slice(1);
    return next;
}
/**
 * Directory of the project being audited. Prefer Cursor's workspace root,
 * then payload `cwd`, then the hook process cwd. Never persist these fields.
 */
function auditedRoot(payload) {
    const workspace = nonempty(payload.workspace_roots?.[0]);
    if (workspace) {
        const normalized = normalizeFsPath(workspace);
        if (isDirectory(normalized))
            return normalized;
    }
    const fromPayload = nonempty(payload.cwd);
    if (fromPayload) {
        const normalized = normalizeFsPath(fromPayload);
        if (isDirectory(normalized))
            return normalized;
    }
    return process.cwd();
}
/** Decode hook stdin. Cursor on Windows may send UTF-16 or a UTF-8 BOM. */
function decodeHookStdin(buf) {
    if (buf.length === 0)
        return "";
    if (buf[0] === 0xff && buf[1] === 0xfe)
        return buf.subarray(2).toString("utf16le");
    if (buf[0] === 0xfe && buf[1] === 0xff) {
        const swapped = Buffer.allocUnsafe(buf.length - 2);
        for (let i = 2; i + 1 < buf.length; i += 2) {
            swapped[i - 2] = buf[i + 1] ?? 0;
            swapped[i - 1] = buf[i] ?? 0;
        }
        return swapped.toString("utf16le");
    }
    if (buf[0] === 0x7b && buf[1] === 0x00)
        return buf.toString("utf16le");
    let text = buf.toString("utf8");
    if (text.charCodeAt(0) === 0xfeff)
        text = text.slice(1);
    return text;
}
function parseHookJson(raw) {
    const trimmed = raw.trim();
    if (!trimmed)
        throw new SyntaxError("empty");
    try {
        return JSON.parse(trimmed);
    }
    catch {
        const start = trimmed.indexOf("{");
        const end = trimmed.lastIndexOf("}");
        if (start >= 0 && end > start)
            return JSON.parse(trimmed.slice(start, end + 1));
        throw new SyntaxError("invalid JSON");
    }
}
function readHookPayload() {
    const fd = process.stdin.fd ?? 0;
    const buf = fs.readFileSync(fd);
    if (buf.length === 0)
        return undefined;
    const tries = [decodeHookStdin(buf), buf.toString("utf8"), buf.toString("utf16le")];
    let lastError;
    for (const text of tries) {
        if (!text.trim())
            continue;
        try {
            return parseHookJson(text);
        }
        catch (err) {
            lastError = err;
        }
    }
    throw lastError instanceof Error ? lastError : new SyntaxError("invalid JSON");
}
function jsonlPathFor(rootId, cwd) {
    return path.join(auditDir(cwd), `${sanitizeId(rootId)}.jsonl`);
}
function mdPathFor(rootId, cwd) {
    return path.join(auditDir(cwd), `${sanitizeId(rootId)}.md`);
}
function mdPathFromJsonl(jsonlPath) {
    return jsonlPath.replace(/\.jsonl$/i, ".md");
}
function unlinkIfExists(filePath) {
    try {
        fs.unlinkSync(filePath);
    }
    catch {
        /* already gone */
    }
}
function parentsPath(cwd) {
    return path.join(auditDir(cwd), "_parents.jsonl");
}
function mergeLockPath(cwd) {
    return path.join(auditDir(cwd), "_merge.lock");
}
function ensureAuditDir(cwd) {
    const dir = auditDir(cwd);
    fs.mkdirSync(dir, { recursive: true });
    return dir;
}
function sleepMs(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
/**
 * Exclusive create lock. Returns false if the lock could not be acquired
 * after retries — caller must still do the non-critical work (append).
 */
function withExclusiveLock(lockPath, fn) {
    fs.mkdirSync(path.dirname(lockPath), { recursive: true });
    for (let attempt = 0; attempt < LOCK_TRIES; attempt++) {
        let fd;
        try {
            fd = fs.openSync(lockPath, "wx");
            fn();
            return true;
        }
        catch (err) {
            const code = err.code;
            if (code === "EEXIST") {
                sleepMs(LOCK_WAIT_MS);
                continue;
            }
            throw err;
        }
        finally {
            if (fd !== undefined) {
                try {
                    fs.closeSync(fd);
                }
                catch {
                    /* ignore */
                }
                try {
                    fs.unlinkSync(lockPath);
                }
                catch {
                    /* ignore */
                }
            }
        }
    }
    return false;
}
/** `.../{parent}/subagents/{child}.jsonl` — parent and child path segments. */
function parseSubagentTranscript(transcriptPath) {
    const normalized = transcriptPath.replaceAll("\\", "/");
    const match = normalized.match(/\/([^/]+)\/subagents\/([^/]+)\.jsonl$/i);
    if (!match?.[1] || !match[2])
        return undefined;
    const parent = sanitizeId(match[1]);
    const child = sanitizeId(match[2]);
    if (!parent || !child || parent === child)
        return undefined;
    return { parent, child };
}
function shortAuditId(id) {
    const trimmed = id.replace(/^_unknown-/, "");
    return trimmed.slice(0, 8);
}
/**
 * Compare `import.meta.url` to `process.argv[1]` without `node:url`
 * (hooks may only import fs/path/os).
 */
function isMainModule(metaUrl) {
    const entry = process.argv[1];
    if (!entry)
        return false;
    const expected = fileUrlFromPath(entry);
    if (metaUrl === expected)
        return true;
    return metaUrl.toLowerCase() === expected.toLowerCase();
}
function fileUrlFromPath(filePath) {
    const resolved = path.resolve(filePath);
    const slashed = resolved.replaceAll("\\", "/");
    const encoded = slashed
        .split("/")
        .map((segment, index) => (index === 0 && /^[A-Za-z]:$/.test(segment) ? segment : encodeURIComponent(segment)))
        .join("/");
    return slashed.startsWith("/") ? `file://${encoded}` : `file:///${encoded}`;
}
function logError(prefix, err) {
    const message = err instanceof Error ? err.message : "error";
    console.error(`${prefix}: ${message}`);
}

function readJsonl(jsonlPath) {
    const text = fs.readFileSync(jsonlPath, "utf8");
    const events = [];
    for (const line of text.split(/\r?\n/)) {
        if (!line.trim())
            continue;
        try {
            events.push(JSON.parse(line));
        }
        catch {
            /* skip a corrupt line; fail-open */
        }
    }
    return events;
}
function tasksMatch(a, b) {
    if (a === b)
        return true;
    if (!a || !b)
        return false;
    return a.startsWith(b) || b.startsWith(a);
}
function findOpenMatch(open, stop) {
    const stopId = stop.subagent?.id;
    if (stopId) {
        const byId = open.findIndex((span) => span.id && span.id === stopId);
        if (byId >= 0)
            return byId;
    }
    const type = stop.subagent?.type;
    if (!type)
        return -1;
    const task = stop.subagent?.task ?? "";
    const byTask = open.findIndex((span) => span.type === type && tasksMatch(span.task, task));
    if (byTask >= 0)
        return byTask;
    return open.findIndex((span) => span.type === type);
}
function attachSpan(stack, rootChildren, span) {
    const parent = stack.at(-1);
    if (parent)
        parent.children.push(span);
    else
        rootChildren.push(span);
}
function applyStop(span, stop) {
    span.ended = stop.ts;
    const duration = stop.metrics?.duration_ms;
    if (typeof duration === "number" && duration > 0)
        span.duration_ms = duration;
    if (stop.metrics?.status)
        span.status = stop.metrics.status;
    if (stop.subagent?.summary)
        span.summary = stop.subagent.summary;
    if (stop.modified?.length)
        span.modified = stop.modified;
}
function isRootSessionEvent(event) {
    if (!event.session)
        return true;
    return event.session === event.root;
}
function durationMs(span) {
    if (typeof span.duration_ms === "number" && span.duration_ms > 0)
        return span.duration_ms;
    if (!span.started || !span.ended || span.started === "unknown")
        return undefined;
    const start = Date.parse(span.started);
    const end = Date.parse(span.ended);
    if (Number.isNaN(start) || Number.isNaN(end) || end < start)
        return undefined;
    const ms = end - start;
    return ms > 0 ? ms : undefined;
}
function formatDuration(ms) {
    if (ms == null)
        return "—";
    if (ms < 1000)
        return "<1s";
    const totalSec = Math.round(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    if (minutes === 0)
        return `${seconds}s`;
    if (seconds === 0)
        return `${minutes}m`;
    return `${minutes}m ${seconds}s`;
}
function pad2(n) {
    return String(n).padStart(2, "0");
}
function utcParts(iso) {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
}
function formatUtcStamp(iso) {
    if (!iso)
        return "—";
    const date = utcParts(iso);
    if (!date)
        return "—";
    return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())} UTC`;
}
function formatUtcTime(iso) {
    if (!iso || iso === "unknown")
        return "—";
    const date = utcParts(iso);
    if (!date)
        return "—";
    return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
}
function formatTask(task) {
    const firstLine = (task.split(/\r?\n/)[0] ?? "").replaceAll("|", "/");
    return clipLine(firstLine, CLIP_MD_TASK) ?? "";
}
function flatten(spans, depth, rows) {
    for (const span of spans) {
        rows.push({ span, depth });
        flatten(span.children, depth + 1, rows);
    }
}
function collectModified(spans, into) {
    for (const span of spans) {
        for (const file of span.modified ?? []) {
            if (file)
                into.add(file);
        }
        collectModified(span.children, into);
    }
}
function countSpans(spans) {
    const counts = { total: 0, completed: 0, error: 0, open: 0 };
    const walk = (items) => {
        for (const span of items) {
            counts.total += 1;
            const status = span.status ?? "open";
            if (status === "completed" || status === "success")
                counts.completed += 1;
            else if (status === "error" || status === "failed" || status === "aborted")
                counts.error += 1;
            else
                counts.open += 1;
            walk(span.children);
        }
    };
    walk(spans);
    return counts;
}
function buildTree(events) {
    const rootId = events.find((event) => event.root)?.root ?? "";
    const header = { session: rootId };
    const stack = [];
    const rootChildren = [];
    for (const event of events) {
        if (event.prompt && !header.prompt)
            header.prompt = event.prompt;
        if (event.event === "sessionStart" && isRootSessionEvent(event)) {
            header.session = event.session || event.root || header.session;
            header.started = event.ts;
            if (event.model)
                header.model = event.model;
            if (event.composer_mode)
                header.composer_mode = event.composer_mode;
            continue;
        }
        if (event.event === "sessionEnd" && isRootSessionEvent(event)) {
            header.ended = event.ts;
            header.duration_ms = durationMs({
                duration_ms: event.metrics?.duration_ms,
                started: header.started,
                ended: event.ts,
            });
            header.reason = event.metrics?.reason || event.metrics?.final_status;
            if (event.model && !header.model)
                header.model = event.model;
            for (const span of stack) {
                if (!span.status)
                    span.status = "open";
            }
            continue;
        }
        if (event.event === "subagentStart") {
            const span = {
                type: event.subagent?.type || "unknown",
                id: event.subagent?.id || "",
                task: event.subagent?.task || "",
                started: event.ts,
                session: event.session,
                parallel: event.subagent?.parallel,
                children: [],
            };
            stack.push(span);
            continue;
        }
        if (event.event === "subagentStop") {
            const index = findOpenMatch(stack, event);
            if (index < 0) {
                const orphan = {
                    type: event.subagent?.type || "unknown",
                    id: event.subagent?.id || "",
                    task: event.subagent?.task || "",
                    started: "unknown",
                    session: event.session,
                    parallel: event.subagent?.parallel,
                    children: [],
                };
                applyStop(orphan, event);
                attachSpan(stack, rootChildren, orphan);
                continue;
            }
            const [matched] = stack.splice(index, 1);
            if (!matched)
                continue;
            applyStop(matched, event);
            attachSpan(stack, rootChildren, matched);
        }
    }
    while (stack.length) {
        const span = stack.pop();
        if (!span)
            break;
        if (!span.status)
            span.status = "open";
        attachSpan(stack, rootChildren, span);
    }
    return { header, spans: rootChildren };
}
function agentLabel(span, depth) {
    const indent = "└─ ".repeat(depth);
    const parallel = span.parallel ? " (parallel)" : "";
    return `${indent}${span.type}${parallel}`;
}
function renderMarkdown(header, spans) {
    const counts = countSpans(spans);
    const ended = header.ended ? formatUtcStamp(header.ended) : "—";
    const reason = header.ended ? (header.reason || "—") : "in progress";
    const duration = formatDuration(header.duration_ms ?? durationMs(header));
    const lines = [
        `# Audit ${shortAuditId(header.session)}`,
        "",
        "| | |",
        "|---|---|",
        `| Session | \`${header.session}\` |`,
        `| Mode | ${header.composer_mode || "—"} |`,
        `| Prompt | ${header.prompt ? formatTask(header.prompt) : "—"} |`,
        `| Model | ${header.model || "—"} |`,
        `| Started | ${formatUtcStamp(header.started)} |`,
        `| Ended | ${ended} |`,
        `| Duration | ${duration} |`,
        `| End reason | ${reason} |`,
        `| Subagents | ${counts.total} total · ${counts.completed} completed · ${counts.error} error · ${counts.open} open |`,
        "",
        "## Subagents",
        "",
    ];
    if (spans.length === 0) {
        lines.push("No subagents.", "");
    }
    else {
        lines.push("| Agent | Status | Duration | Started | Ended | Task |");
        lines.push("|---|---|---|---|---|---|");
        const rows = [];
        flatten(spans, 0, rows);
        for (const { span, depth } of rows) {
            const task = formatTask(span.task);
            lines.push(`| ${agentLabel(span, depth)} | ${span.status || "open"} | ${formatDuration(durationMs(span))} | ${formatUtcTime(span.started)} | ${formatUtcTime(span.ended)} | ${task} |`);
        }
        lines.push("");
    }
    const modified = new Set();
    collectModified(spans, modified);
    if (modified.size > 0) {
        lines.push("## Modified files", "");
        for (const file of [...modified].sort()) {
            lines.push(`- \`${file.replaceAll("|", "/")}\``);
        }
        lines.push("");
    }
    return lines.join("\n");
}
export function renderAudit(jsonlPath) {
    const events = readJsonl(jsonlPath);
    const { header, spans } = buildTree(events);
    if (!header.session) {
        header.session = sanitizeId(path.basename(jsonlPath, ".jsonl"));
    }
    return renderMarkdown(header, spans);
}
export function writeAuditReport(jsonlPath) {
    if (!fs.existsSync(jsonlPath) || fs.statSync(jsonlPath).size === 0) {
        console.error("cursor-audit-report: missing or empty JSONL");
        return false;
    }
    const markdown = renderAudit(jsonlPath);
    fs.writeFileSync(mdPathFromJsonl(jsonlPath), markdown, "utf8");
    return true;
}
function resolveJsonlArg(arg) {
    if (arg.endsWith(".jsonl") || arg.includes("/") || arg.includes(path.sep)) {
        return path.resolve(arg);
    }
    return jsonlPathFor(arg);
}
function runCli() {
    try {
        const arg = process.argv[2];
        if (!arg) {
            console.error("cursor-audit-report: usage: node cursor-audit-report.mjs <rootId-or-jsonl-path>");
            return;
        }
        writeAuditReport(resolveJsonlArg(arg));
    }
    catch (err) {
        logError("cursor-audit-report", err);
    }
}
if (isMainModule(import.meta.url)) {
    runCli();
    process.exit(0);
}
