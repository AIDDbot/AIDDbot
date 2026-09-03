#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { runOverlay } = require("../bin/lib/overlay");

const root = path.resolve(__dirname, "..");
const skillsRoot = path.join(root, ".agents", "skills");
const managed = "<!-- managed by /adapt — do not edit here, edit ";
const kinds = new Set(["orchestrator", "worker", "primitive"]);
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function frontmatter(text, file) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    fail(`${path.relative(root, file)} has no YAML frontmatter`);
    return {};
  }
  const fields = {};
  let inMetadata = false;
  for (const line of match[1].split(/\r?\n/)) {
    if (line === "metadata:") {
      fields.metadata = {};
      inMetadata = true;
      continue;
    }
    const metadata = line.match(/^  ([^:\s]+):\s*(.+)$/);
    if (inMetadata && metadata) {
      fields.metadata[metadata[1]] = metadata[2];
      continue;
    }
    const field = line.match(/^([^:\s]+):\s*(.+)$/);
    if (field) {
      fields[field[1]] = field[2];
      inMetadata = false;
    }
  }
  return fields;
}

function skillDirs() {
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
}

if (fs.existsSync(path.join(root, ".agents", "commands"))) {
  fail(".agents/commands must not exist");
}

const skills = skillDirs();
const counts = { orchestrator: 0, worker: 0, primitive: 0 };
for (const name of skills) {
  const file = path.join(skillsRoot, name, "SKILL.md");
  const text = read(file);
  const fields = frontmatter(text, file);
  const kind = fields.metadata && fields.metadata["aiddbot-kind"];
  if (fields.name !== name) fail(`${name}: name must match its directory`);
  if (!kinds.has(kind)) fail(`${name}: invalid aiddbot-kind`);
  else counts[kind] += 1;
  if (fields["disable-model-invocation"] !== "true") fail(`${name}: implicit invocation must be disabled`);
  const expectedPublic = kind !== "worker";
  if ((fields["user-invocable"] === "true") !== expectedPublic) {
    fail(`${name}: user-invocable does not match ${kind}`);
  }
  if (/\.agents\/commands|\.workflow\.md|\.command\.md/.test(text)) {
    fail(`${name}: contains a retired command/workflow reference`);
  }
  for (const target of text.matchAll(/\]\(([^)]+\/SKILL\.md)\)/g)) {
    const resolved = path.resolve(path.dirname(file), target[1]);
    if (!fs.existsSync(resolved)) fail(`${name}: broken skill link ${target[1]}`);
  }

  const pointer = path.join(root, ".claude", "skills", name, "SKILL.md");
  if (!fs.existsSync(pointer)) {
    fail(`${name}: Claude pointer missing`);
  } else {
    const pointerText = read(pointer);
    const pointerFields = frontmatter(pointerText, pointer);
    if (!pointerText.includes(`${managed}.agents/skills/${name}/SKILL.md instead -->`)) {
      fail(`${name}: Claude pointer ownership marker is wrong`);
    }
    if (!pointerText.includes(`../../../.agents/skills/${name}/SKILL.md`)) {
      fail(`${name}: Claude pointer target is wrong`);
    }
    for (const key of ["name", "description", "user-invocable", "disable-model-invocation"]) {
      if (pointerFields[key] !== fields[key]) fail(`${name}: Claude pointer ${key} differs from canonical skill`);
    }
    if (!pointerFields.metadata || pointerFields.metadata["aiddbot-kind"] !== kind) {
      fail(`${name}: Claude pointer kind differs from canonical skill`);
    }
  }
}

const publicOrchestrators = skills.filter((name) => {
  const fields = frontmatter(read(path.join(skillsRoot, name, "SKILL.md")), path.join(skillsRoot, name, "SKILL.md"));
  return fields.metadata && fields.metadata["aiddbot-kind"] === "orchestrator";
});
const expectedOrchestrators = ["architect-solution-foundation", "build-requested-change", "craft-lasting-quality"];
if (publicOrchestrators.join(",") !== expectedOrchestrators.join(",")) {
  fail(`public orchestrators must be exactly ${expectedOrchestrators.join(", ")}`);
}
for (const former of ["clean-drift", "clean-solution", "design-solution", "map-solution", "scaffold-workshop"]) {
  const fields = frontmatter(read(path.join(skillsRoot, former, "SKILL.md")), path.join(skillsRoot, former, "SKILL.md"));
  if (!fields.metadata || fields.metadata["aiddbot-kind"] !== "worker" || fields["user-invocable"] !== "false") {
    fail(`${former}: former orchestrator must be an internal worker`);
  }
}
for (const retired of ["deliver-requirement", "establish-solution", "improve-solution"]) {
  if (fs.existsSync(path.join(skillsRoot, retired))) fail(`${retired}: retired public skill must not remain canonical`);
  if (fs.existsSync(path.join(root, ".claude", "skills", retired))) fail(`${retired}: retired managed Claude pointer must not remain`);
}

for (const legacy of [".claude/commands", ".cursor/commands", ".github/prompts"]) {
  const folder = path.join(root, ...legacy.split("/"));
  if (fs.existsSync(folder) && fs.readdirSync(folder).length) fail(`${legacy} contains retired adapters`);
}

if (fs.existsSync(path.join(root, ".vscode", "settings.json"))) {
  fail(".vscode/settings.json must not be generated for skill discovery");
}

const overlay = read(path.join(root, "bin", "lib", "overlay.js"));
for (const retired of [".agents/commands", ".claude/commands", ".cursor/commands", ".github/prompts"]) {
  if (overlay.includes(`"${retired}"`)) fail(`overlay still copies ${retired}`);
}
if (!overlay.includes('".claude/skills"')) fail("overlay does not copy Claude skill pointers");

function verifyOverlayFixture() {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const fixture = fs.mkdtempSync(path.join(tempRoot, "aiddbot-skills-fixture-"));
  try {
    const first = runOverlay(fixture, { dryRun: false, force: false });
    if (first.conflicts) fail("clean overlay fixture reported conflicts");
    for (const required of [
      ".agents/skills/architect-solution-foundation/SKILL.md",
      ".claude/skills/build-requested-change/SKILL.md",
      ".claude/skills/craft-lasting-quality/SKILL.md",
      ".codex/hooks.json",
    ]) {
      if (!fs.existsSync(path.join(fixture, ...required.split("/")))) {
        fail(`clean overlay fixture missed ${required}`);
      }
    }
    for (const retired of [".agents/commands", ".claude/commands", ".cursor/commands", ".github/prompts"]) {
      if (fs.existsSync(path.join(fixture, ...retired.split("/")))) {
        fail(`clean overlay fixture retained ${retired}`);
      }
    }
    const second = runOverlay(fixture, { dryRun: true, force: false });
    if (second.conflicts || second.written.length) fail("overlay fixture is not idempotent");
  } finally {
    const resolved = path.resolve(fixture);
    if (path.dirname(resolved) !== tempRoot) throw new Error(`unsafe fixture cleanup target: ${resolved}`);
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}

verifyOverlayFixture();

if (failures.length) {
  process.stderr.write(`${failures.map((message) => `FAIL ${message}`).join("\n")}\n`);
  process.exit(1);
}

process.stdout.write(
  `PASS skills: ${skills.length}; orchestrators: ${counts.orchestrator}; workers: ${counts.worker}; primitives: ${counts.primitive}\n`
);
