import { parseArgs, UsageError } from "../lib/cli.mjs";
import { readConfig, writeConfig } from "../lib/config.mjs";
import { findRoot } from "../lib/root.mjs";

function keyPath(key) {
  const parts = key.split(".");
  if (parts.some((part) => !part || ["__proto__", "constructor", "prototype"].includes(part))) throw new UsageError(`Invalid key: ${key}`);
  return parts;
}

/** A JSON literal when it parses as one, otherwise the plain string. */
function parseValue(raw) {
  try { return JSON.parse(raw); } catch { return raw; }
}

export function get(argv) {
  const { key } = parseArgs(argv, { optional: ["key"] });
  const config = readConfig(findRoot());
  if (!key) return config;
  let value = config;
  for (const part of keyPath(key)) {
    if (value === null || typeof value !== "object" || !Object.hasOwn(value, part)) throw new Error(`Key not set: ${key}`);
    value = value[part];
  }
  return { key, value };
}

export function set(argv) {
  const { key, value: raw } = parseArgs(argv, { positional: ["key", "value"] });
  const parts = keyPath(key);
  const root = findRoot();
  const config = structuredClone(readConfig(root));
  let node = config;
  for (const part of parts.slice(0, -1)) {
    if (!Object.hasOwn(node, part)) node[part] = {};
    node = node[part];
    if (node === null || typeof node !== "object" || Array.isArray(node)) throw new Error(`Cannot set ${key}: ${part} is not an object.`);
  }
  const value = parseValue(raw);
  node[parts.at(-1)] = value;
  writeConfig(root, config);
  return { key, value };
}
