// YAML-like frontmatter of flat `key: value` lines, the only shape AIDDbot records use.
const BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Split a document into its frontmatter block, body, and newline style; null when absent. */
export function split(text) {
  const match = BLOCK.exec(text);
  if (!match) return null;
  return { block: match[1], body: text.slice(match[0].length), newline: match[0].includes("\r\n") ? "\r\n" : "\n" };
}

/** Scalar value: drops a trailing ` # comment` and surrounding quotes; `null` becomes null. */
function scalar(raw) {
  const value = raw.trim();
  const quoted = /^(['"])(.*)\1$/.exec(value);
  if (quoted) return quoted[2];
  const bare = value.replace(/\s+#.*$/, "").trim();
  return bare === "null" ? null : bare;
}

/** Every `key: value` field of the frontmatter; throws when there is no frontmatter. */
export function read(text, label = "Document") {
  const parts = split(text);
  if (!parts) throw new Error(`${label} frontmatter is missing.`);
  const fields = {};
  for (const line of parts.block.split(/\r?\n/)) {
    const match = /^([A-Za-z_][\w-]*):(.*)$/.exec(line);
    if (match) fields[match[1]] = scalar(match[2]);
  }
  return fields;
}

/** Read and require the named fields. */
export function requireFields(text, keys, label = "Document") {
  const fields = read(text, label);
  for (const key of keys) if (!fields[key]) throw new Error(`${label} frontmatter is missing ${key}.`);
  return fields;
}
