export function readSpec(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) throw new Error("Spec frontmatter is missing.");
  const fields = Object.fromEntries(["id", "key", "status", "updated_at", "last_process"]
    .map((key) => {
      const raw = new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m").exec(match[1])?.[1];
      return [key, raw === "null" ? null : raw?.replace(/^(['"])(.*)\1$/, "$2")];
    }));
  for (const key of ["id", "key", "status"]) if (!fields[key]) throw new Error(`Spec frontmatter is missing ${key}.`);
  return { fields, frontmatter: match[1], body: text.slice(match[0].length), newline: match[0].includes("\r\n") ? "\r\n" : "\n" };
}

export function updateSpec(text, updates) {
  const parsed = readSpec(text);
  let frontmatter = parsed.frontmatter;
  for (const [key, value] of Object.entries(updates)) {
    const line = new RegExp(`^${key}:.*$`, "m");
    const scalar = value === null ? "null" : typeof value === "string" ? JSON.stringify(value) : String(value);
    frontmatter = line.test(frontmatter)
      ? frontmatter.replace(line, `${key}: ${scalar}`)
      : `${frontmatter}${parsed.newline}${key}: ${scalar}`;
  }
  const result = `---${parsed.newline}${frontmatter}${parsed.newline}---${parsed.newline}${parsed.body}`;
  return result;
}

export function updateReport(text, metadata) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) throw new Error("Finding report frontmatter is missing.");
  const newline = match[0].includes("\r\n") ? "\r\n" : "\n";
  let frontmatter = match[1];
  for (const [key, value] of Object.entries(metadata)) {
    const line = new RegExp(`^${key}:.*$`, "m");
    if (!line.test(frontmatter)) throw new Error(`Finding report frontmatter is missing ${key}.`);
    frontmatter = frontmatter.replace(line, `${key}: ${value}`);
  }
  return `---${newline}${frontmatter}${newline}---${newline}${text.slice(match[0].length)}`;
}
