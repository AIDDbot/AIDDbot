import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const agentsTemplates = path.join(here, "..", "..", ".agents", "templates");

const GITIGNORE = `# Scratch
/temp
/tmp
*.tmp
*.log

# Secrets and credentials
.env
.env.*
!.env.example
!.env.sample
!.env.template
*.pem
*.key
*.p12
*.pfx
*.p8
id_rsa
id_dsa
id_ecdsa
id_ed25519
*.keystore
*.jks
credentials.json
secrets.json
*.secret
.netrc
*.kdbx

# Agent scratch
/.claude/agents/runs
`;

const REQUIRED_IGNORE = [
  "/temp",
  "/tmp",
  ".env",
  ".env.*",
  "*.pem",
  "*.key",
  "*.p12",
  "*.pfx",
  "id_rsa",
  "credentials.json",
  "secrets.json",
  "*.secret",
];

function ignoreKey(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("!")) return null;
  return trimmed.replace(/^\/+/, "").replace(/\/+$/, "");
}

function missingIgnorePatterns(text) {
  const present = new Set(
    text
      .split(/\r?\n/)
      .map(ignoreKey)
      .filter(Boolean)
  );
  return REQUIRED_IGNORE.filter((pattern) => !present.has(ignoreKey(pattern)));
}

function hasReadme(destRoot) {
  let names;
  try {
    names = fs.readdirSync(destRoot);
  } catch {
    return false;
  }
  return names.some((name) => /^readme(\..+)?$/i.test(name));
}

function print(action, file) {
  process.stdout.write(`${action.padEnd(11)} ${file}\n`);
}

function writeFile(abs, contents, dryRun) {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contents, "utf8");
}

function ensureGitignore(destRoot, dryRun) {
  const rel = ".gitignore";
  const abs = path.join(destRoot, rel);
  if (!fs.existsSync(abs)) {
    print("create", rel);
    writeFile(abs, GITIGNORE, dryRun);
    return rel;
  }
  let stat;
  try {
    stat = fs.lstatSync(abs);
  } catch {
    return null;
  }
  if (!stat.isFile()) {
    print("conflict", rel);
    return null;
  }
  const current = fs.readFileSync(abs, "utf8");
  const missing = missingIgnorePatterns(current);
  if (!missing.length) {
    print("skip-same", rel);
    return null;
  }
  const block = `\n# AIDDbot\n${missing.join("\n")}\n`;
  print("update", rel);
  writeFile(abs, current.replace(/\s*$/, "") + block, dryRun);
  return rel;
}

function ensureReadme(destRoot, dryRun, title = path.basename(destRoot)) {
  const rel = "README.md";
  if (hasReadme(destRoot)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(absPath(destRoot, rel), `# ${title}\n`, dryRun);
  return rel;
}

function ensureAgentSeed(destRoot, dryRun) {
  const written = [];
  for (const [rel, template] of [["AGENTS.md", "AGENTS.seed.md"], ["CLAUDE.md", "CLAUDE.seed.md"]]) {
    const abs = absPath(destRoot, rel);
    if (fs.existsSync(abs)) {
      print("skip-same", rel);
      continue;
    }
    print("create", rel);
    writeFile(abs, fs.readFileSync(path.join(agentsTemplates, template), "utf8"), dryRun);
    written.push(rel);
  }
  return written;
}

function ensureLicense(destRoot, contents, dryRun) {
  const rel = "LICENSE";
  const abs = absPath(destRoot, rel);
  if (fs.existsSync(abs)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(abs, contents, dryRun);
  return rel;
}

function absPath(destRoot, rel) {
  return path.join(destRoot, rel);
}

function ensureSeedFiles(destRoot, dryRun, title) {
  const written = [];
  const gitignore = ensureGitignore(destRoot, dryRun);
  if (gitignore) written.push(gitignore);
  const readme = ensureReadme(destRoot, dryRun, title);
  if (readme) written.push(readme);
  written.push(...ensureAgentSeed(destRoot, dryRun));
  return written;
}

export { ensureLicense, ensureSeedFiles };
