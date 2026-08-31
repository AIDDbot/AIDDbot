/**
 * Cursor session audit — ingest
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
/** Filesystem-safe ISO stem, e.g. `2026-08-31T14-40-11.852Z`. */
function formatAuditFileStem(date = new Date()) {
    return date.toISOString().replace(/:/g, "-");
}
function sessionsIndexPath(cwd) {
    return path.join(auditDir(cwd), "_sessions.jsonl");
}
function loadSessionFiles(cwd) {
    const map = new Map();
    const indexPath = sessionsIndexPath(cwd);
    if (!fs.existsSync(indexPath))
        return map;
    for (const line of fs.readFileSync(indexPath, "utf8").split(/\r?\n/)) {
        if (!line.trim())
            continue;
        try {
            const rec = JSON.parse(line);
            if (rec.root && rec.file)
                map.set(rec.root, rec.file);
        }
        catch {
            /* skip a corrupt index line */
        }
    }
    return map;
}
function registerSessionFile(rootId, fileStem, cwd) {
    const root = sanitizeId(rootId);
    if (!root || !fileStem)
        return;
    ensureAuditDir(cwd);
    fs.appendFileSync(sessionsIndexPath(cwd), `${JSON.stringify({ root, file: fileStem })}\n`);
}
function auditPathsForStem(fileStem, cwd) {
    const base = path.join(auditDir(cwd), fileStem);
    return { jsonl: `${base}.jsonl`, md: `${base}.md` };
}
/** Resolve timestamp-named audit files for a root session id. */
function resolveAuditPaths(rootId, cwd, sessionFiles) {
    const map = sessionFiles ?? loadSessionFiles(cwd);
    const stem = map.get(sanitizeId(rootId));
    if (!stem)
        return undefined;
    return auditPathsForStem(stem, cwd);
}
/** Legacy uuid-named path; prefer `resolveAuditPaths` when the session index exists. */
function legacyJsonlPathFor(rootId, cwd) {
    return path.join(auditDir(cwd), `${sanitizeId(rootId)}.jsonl`);
}
function jsonlPathFor(rootId, cwd) {
    return resolveAuditPaths(rootId, cwd)?.jsonl ?? legacyJsonlPathFor(rootId, cwd);
}
function mdPathFor(rootId, cwd) {
    return resolveAuditPaths(rootId, cwd)?.md ?? path.join(auditDir(cwd), `${sanitizeId(rootId)}.md`);
}
/** JSONL is kept after close unless `AUDIT_DISCARD_JSONL=1` (off while debugging). */
function shouldDiscardJsonlOnClose() {
    return process.env.AUDIT_DISCARD_JSONL === "1";
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

const REPORT_MODULE = "./cursor-audit-report.mjs";
function loadParents(filePath) {
    const map = new Map();
    if (!fs.existsSync(filePath))
        return map;
    const text = fs.readFileSync(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
        if (!line.trim())
            continue;
        try {
            const rec = JSON.parse(line);
            if (rec.child && rec.parent)
                map.set(rec.child, rec.parent);
        }
        catch {
            /* skip a corrupt index line */
        }
    }
    return map;
}
function recordLink(filePath, map, child, parent) {
    const childId = sanitizeId(child);
    const parentId = sanitizeId(parent);
    if (!childId || !parentId || childId === parentId)
        return;
    if (map.get(childId) === parentId)
        return;
    fs.appendFileSync(filePath, `${JSON.stringify({ child: childId, parent: parentId })}\n`);
    map.set(childId, parentId);
}
function resolveRoot(id, map) {
    const seen = new Set();
    let current = id;
    while (map.has(current) && !seen.has(current)) {
        seen.add(current);
        const parent = map.get(current);
        if (!parent)
            break;
        current = parent;
    }
    return current;
}
function unknownRootId(payload) {
    const session = sanitizeId(payload.session_id ?? "") || "nosession";
    return `_unknown-${session}`.slice(0, 80);
}
function eventConversationId(payload) {
    return nonempty(payload.conversation_id) || nonempty(payload.session_id);
}
function collectLinks(payload, parentsFile, map) {
    const conversationId = nonempty(payload.conversation_id);
    const parentConversationId = nonempty(payload.parent_conversation_id);
    if (conversationId && parentConversationId && parentConversationId !== conversationId) {
        recordLink(parentsFile, map, conversationId, parentConversationId);
    }
    const subagentId = nonempty(payload.subagent_id);
    if (subagentId && conversationId && subagentId !== conversationId) {
        recordLink(parentsFile, map, normalizeSubagentId(subagentId), conversationId);
    }
    const transcript = nonempty(payload.transcript_path);
    if (transcript) {
        const parsed = parseSubagentTranscript(transcript);
        if (parsed)
            recordLink(parentsFile, map, parsed.child, parsed.parent);
    }
}
function mergeOrphans(rootId, map, cwd, sessionFiles) {
    const dir = ensureAuditDir(cwd);
    const rootPaths = resolveAuditPaths(rootId, cwd, sessionFiles);
    const rootFile = rootPaths?.jsonl ?? legacyJsonlPathFor(rootId, cwd);
    let names;
    try {
        names = fs.readdirSync(dir);
    }
    catch {
        return;
    }
    for (const name of names) {
        if (!name.endsWith(".jsonl"))
            continue;
        if (name.startsWith("_") || name.startsWith("."))
            continue;
        const otherId = name.slice(0, -".jsonl".length);
        if (!otherId || otherId === rootId)
            continue;
        if (resolveRoot(otherId, map) !== rootId)
            continue;
        const otherPath = path.join(dir, name);
        try {
            const extra = fs.readFileSync(otherPath, "utf8");
            if (extra.length > 0) {
                const rewritten = extra
                    .split(/\r?\n/)
                    .filter((line) => line.trim())
                    .map((line) => {
                    try {
                        const event = JSON.parse(line);
                        event.root = rootId;
                        return JSON.stringify(event);
                    }
                    catch {
                        return line;
                    }
                })
                    .join("\n");
                fs.appendFileSync(rootFile, `${rewritten}\n`);
            }
            fs.unlinkSync(otherPath);
            unlinkIfExists(mdPathFromJsonl(otherPath));
        }
        catch {
            /* skip a file we cannot merge this round */
        }
    }
}
function firstUserPromptFromTranscript(transcriptPath) {
    try {
        if (!fs.existsSync(transcriptPath))
            return undefined;
        const text = fs.readFileSync(transcriptPath, "utf8");
        for (const line of text.split(/\r?\n/)) {
            if (!line.trim())
                continue;
            let rec;
            try {
                rec = JSON.parse(line);
            }
            catch {
                continue;
            }
            if (rec.role !== "user")
                continue;
            const parts = rec.message?.content;
            if (!Array.isArray(parts))
                continue;
            const texts = [];
            for (const part of parts) {
                if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
                    texts.push(part.text);
                }
            }
            if (texts.length > 0)
                return extractUserPrompt(texts.join("\n"));
        }
    }
    catch {
        /* fail-open */
    }
    return undefined;
}
function promptForRootEvent(payload, isRoot) {
    if (!isRoot)
        return undefined;
    const fromPayload = extractUserPrompt(payload.prompt);
    if (fromPayload)
        return fromPayload;
    const name = payload.hook_event_name;
    if (name !== "sessionStart" && name !== "sessionEnd")
        return undefined;
    const transcript = nonempty(payload.transcript_path);
    if (!transcript)
        return undefined;
    return firstUserPromptFromTranscript(transcript);
}
function toIngested(payload, rootId, parentId, prompt) {
    const subagent = omitEmpty({
        type: nonempty(payload.subagent_type),
        id: nonempty(payload.subagent_id) ? normalizeSubagentId(payload.subagent_id) : undefined,
        task: clipLine(payload.task, CLIP_EVENT),
        parallel: payload.is_parallel_worker,
        description: clipLine(payload.description, CLIP_EVENT),
        summary: clipLine(payload.summary, CLIP_EVENT),
    });
    const metrics = omitEmpty({
        duration_ms: payload.duration_ms,
        status: nonempty(payload.status),
        tool_call_count: payload.tool_call_count,
        message_count: payload.message_count,
        reason: nonempty(payload.reason),
        final_status: nonempty(payload.final_status),
        error_message: clipLine(payload.error_message, CLIP_EVENT),
    });
    const modified = Array.isArray(payload.modified_files)
        ? payload.modified_files.filter((file) => typeof file === "string" && file.length > 0)
        : undefined;
    return omitEmpty({
        ts: new Date().toISOString(),
        event: payload.hook_event_name,
        root: rootId,
        session: nonempty(payload.session_id),
        parent: parentId,
        model: nonempty(payload.model) || nonempty(payload.model_id) || nonempty(payload.subagent_model),
        composer_mode: nonempty(payload.composer_mode),
        prompt,
        subagent: Object.keys(subagent).length > 0 ? subagent : undefined,
        metrics: Object.keys(metrics).length > 0 ? metrics : undefined,
        modified: modified && modified.length > 0 ? modified : undefined,
    });
}
async function ingest(payload) {
    const project = auditedRoot(payload);
    ensureAuditDir(project);
    const parentsFile = parentsPath(project);
    const map = loadParents(parentsFile);
    collectLinks(payload, parentsFile, map);
    const eventId = eventConversationId(payload);
    const sanitizedEventId = eventId ? sanitizeId(eventId) : "";
    const rootId = sanitizedEventId ? resolveRoot(sanitizedEventId, map) : unknownRootId(payload);
    const parentId = sanitizedEventId && map.has(sanitizedEventId) ? map.get(sanitizedEventId) : undefined;
    const isRoot = Boolean(sanitizedEventId) && sanitizedEventId === rootId;
    const prompt = promptForRootEvent(payload, isRoot);
    const isRootSessionStart = payload.hook_event_name === "sessionStart" && Boolean(sanitizedEventId) && !map.has(sanitizedEventId);
    const isRootSessionEnd = payload.hook_event_name === "sessionEnd" && Boolean(sanitizedEventId) && !map.has(sanitizedEventId);
    const sessionFiles = loadSessionFiles(project);
    let jsonlFile;
    let mdFile;
    if (isRootSessionStart) {
        const stem = formatAuditFileStem();
        const paths = auditPathsForStem(stem, project);
        jsonlFile = paths.jsonl;
        mdFile = paths.md;
        registerSessionFile(rootId, stem, project);
        sessionFiles.set(sanitizeId(rootId), stem);
    }
    else {
        const paths = resolveAuditPaths(rootId, project, sessionFiles) ??
            (() => {
                const legacy = legacyJsonlPathFor(rootId, project);
                return fs.existsSync(legacy) ? { jsonl: legacy, md: mdPathFromJsonl(legacy) } : undefined;
            })();
        if (!paths) {
            console.error(`cursor-audit-ingest: no audit file for root ${rootId} (${payload.hook_event_name}); drop until sessionStart`);
            return;
        }
        jsonlFile = paths.jsonl;
        mdFile = paths.md;
    }
    const line = `${JSON.stringify(toIngested(payload, rootId, parentId, prompt))}\n`;
    // Closed roots leave the markdown and drop the JSONL. A late event must not
    // recreate a partial log and overwrite the finished human report.
    if (!fs.existsSync(jsonlFile) && fs.existsSync(mdFile))
        return;
    try {
        withExclusiveLock(mergeLockPath(project), () => {
            mergeOrphans(rootId, map, project, sessionFiles);
        });
    }
    catch (err) {
        logError("cursor-audit-ingest", err);
    }
    fs.appendFileSync(jsonlFile, line);
    let reported = false;
    try {
        const report = (await import(REPORT_MODULE));
        reported = report.writeAuditReport(jsonlFile);
    }
    catch (err) {
        logError("cursor-audit-report", err);
    }
    if (isRootSessionEnd && reported && shouldDiscardJsonlOnClose())
        unlinkIfExists(jsonlFile);
}
async function main() {
    try {
        let parsed;
        try {
            parsed = readHookPayload();
        }
        catch {
            console.error("cursor-audit-ingest: invalid JSON");
            return;
        }
        if (parsed == null) {
            console.error("cursor-audit-ingest: empty stdin");
            return;
        }
        const payload = parsed;
        if (!nonempty(payload.hook_event_name)) {
            console.error("cursor-audit-ingest: missing hook_event_name");
            return;
        }
        await ingest(payload);
    }
    catch (err) {
        logError("cursor-audit-ingest", err);
    }
}
await main();
process.exit(0);
