export function parseFields(text) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)?.[1];
  if (!frontmatter) throw new Error("Spec frontmatter is missing.");
  const fields = {};
  for (const key of ["id", "slug", "key", "type", "branch", "status"]) {
    fields[key] = new RegExp(`^${key}:\\s*(.+?)\\s*(?:#.*)?$`, "m").exec(frontmatter)?.[1]?.trim();
    if (!fields[key]) throw new Error(`Spec frontmatter is missing ${key}.`);
  }
  return fields;
}

export function counters(text) {
  return Object.fromEntries(["spec", "functional", "technical", "debt"].map((key) => [key, counter(text, key)]));
}

function counter(text, key) {
  const matches = [...text.matchAll(new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "gm"))];
  if (matches.length !== 1) throw new Error(`Counters must contain exactly one numeric ${key} field.`);
  return Number(matches[0][1]);
}

export function requirements(text, label) {
  const result = new Map();
  for (const line of text.split(/\r?\n/)) readRequirement(line, label, result);
  return result;
}

function readRequirement(line, label, result) {
  if (!/\*\*[FT]\d{4}\*\*/.test(line)) return;
  const match = /^- \*\*([FT]\d{4})\*\*: (\S.*)$/.exec(line);
  if (!match) throw new Error(`${label} has a malformed requirement line: ${line}`);
  if (result.has(match[1])) throw new Error(`${label} repeats requirement ${match[1]}.`);
  result.set(match[1], match[2]);
}

export function verificationRows(text) {
  const heading = /^## Verification\s*$/m.exec(text);
  if (!heading) throw new Error("Spec is missing the Verification section.");
  const tail = text.slice(heading.index + heading[0].length);
  const next = /^## /m.exec(tail);
  const section = next ? tail.slice(0, next.index) : tail;
  return rowsIn(section);
}

function rowsIn(section) {
  const result = new Map();
  for (const line of section.split(/\r?\n/)) {
    const match = /^\|\s*([FT]\d{4})\s*\|\s*(new|changed|deprecated|related)\s*\|/i.exec(line);
    if (!match) continue;
    if (result.has(match[1])) throw new Error(`Verification table repeats ${match[1]}.`);
    result.set(match[1], match[2].toLowerCase());
  }
  return result;
}
