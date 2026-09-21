#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { runOverlay, sourceInventory } from "../bin/lib/overlay.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(root, ".agents", "skills");
const failures = [];
const fail = (message) => failures.push(message);
const read = (file) => fs.readFileSync(file, "utf8");
const exists = (relative) => fs.existsSync(path.join(root, ...relative.split("/")));
const skills = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
  .map((entry) => entry.name).sort();
const explicitOnly = new Set([
  "architect-system-foundation",
  "craft-lasting-quality",
  "maintain-skills",
]);

const adaptCommand = read(path.join(root, "scripts", "adapt.command.md"));
for (const required of [
  ".claude/settings.json",
  "${CLAUDE_PROJECT_DIR}/.agents/hooks/index.mjs",
  "Preserve every other top-level setting, hook event, matcher group, and handler",
  "Remove duplicate or stale owned handlers",
  "invalid JSON or a non-object `hooks` value",
  "Claude project hooks require review through `/hooks`",
]) if (!adaptCommand.includes(required)) fail(`adapt command lacks Claude hook contract: ${required}`);
if (adaptCommand.includes("Do not synthesize hooks for the other harnesses")) {
  fail("adapt command still excludes Claude hook generation");
}

function frontmatter(text) {
  return text.match(/^(---\r?\n[\s\S]*?\r?\n---)/)?.[1] || "";
}

for (const name of skills) {
  const source = path.join(skillsRoot, name, "SKILL.md");
  const content = read(source);
  if (!frontmatter(content)) fail(`${name}: missing frontmatter`);
  if (!content.includes(`name: ${name}`)) fail(`${name}: name differs from folder`);
  if (!content.includes("aiddbot-kind:")) fail(`${name}: missing skill kind`);
  const expectedInvocation = explicitOnly.has(name) ? "true" : "false";
  if (!content.includes(`disable-model-invocation: ${expectedInvocation}`)) {
    fail(`${name}: disable-model-invocation must be ${expectedInvocation}`);
  }
  if (/_IF_|_FOR-EACH_|_REPEAT_|_ALWAYS_|_SPAWN_|_RETURN_/.test(content)) {
    fail(`${name}: indented pseudocode command remains`);
  }
  for (const link of content.matchAll(/\]\(([^)]+\/SKILL\.md)\)/g)) {
    if (link[1].startsWith("../")) fail(`${name}: eager composition link ${link[1]}`);
  }
  for (const link of content.matchAll(/\]\(([^)]+\/SKILL\.md)\)/g)) {
    if (!fs.existsSync(path.resolve(path.dirname(source), link[1]))) fail(`${name}: broken skill link ${link[1]}`);
  }
  const pointer = path.join(root, ".claude", "skills", name, "SKILL.md");
  if (!fs.existsSync(pointer)) fail(`${name}: missing Claude pointer`);
  else {
    const pointerText = read(pointer);
    if (frontmatter(pointerText) !== frontmatter(content)) fail(`${name}: Claude pointer frontmatter differs`);
    if (!pointerText.includes(`edit .agents/skills/${name}/SKILL.md instead -->`)) fail(`${name}: Claude pointer marker is wrong`);
    if (!pointerText.includes(`../../../.agents/skills/${name}/SKILL.md`)) fail(`${name}: Claude pointer target is wrong`);
  }
}

for (const required of [
  ".agents/skills/define-spec/assets/PRD.template.md",
  ".agents/skills/define-spec/assets/spec.template.md",
  ".agents/skills/verify-acceptance/assets/verification.template.md",
  ".agents/skills/review-implementation/assets/qualification.template.md",
  ".agents/skills/document-system/assets/counters.template.yaml",
  ".agents/skills/document-project/assets/project.rules.template.md",
  ".agents/skills/inspect-quality/assets/TDR.template.md",
  ".agents/skills/inspect-quality/assets/review.template.md",
  ".agents/skills/inspect-quality/references/debt.contract.md",
]) if (!exists(required)) fail(`missing new artifact ${required}`);

for (const retired of [
  ".agents/skills/build-requested-spec/assets/change.template.md",
  ".agents/skills/build-requested-spec/scripts/index-specs.mjs",
  ".agents/skills/implement-project/assets/report.template.md",
  ".agents/skills/document-system/assets/system.arch.template.md",
  ".agents/skills/document-project/assets/container.arch.template.md",
  ".agents/skills/document-project/assets/container.rules.template.md",
]) if (exists(retired)) fail(`retired artifact remains ${retired}`);

const contract = {
  "architect-system-foundation/SKILL.md": ["application or project source code", "Ignore agent configuration", "presence of ignored files does not prevent scaffolding", "scaffold-system"],
  "build-requested-spec/SKILL.md": ["execute the `define-spec` skill using the natural-language request", "execute the `implement-project` skill for each affected production project sequentially", "execute the `verify-acceptance` skill", "execute `review-implementation`", "execute `ship-spec`", "Keep the three agents available", "existing implementation agent", "existing evaluation agent", "revision count is below 3"],
  "define-spec/SKILL.md": ["one coherent scope", "determine its spec ID and any new requirement IDs", "reserve those IDs in `counters.yaml` on that branch", "PRD is the only owner of requirement text", "./assets/spec.template.md", "./assets/PRD.template.md", "deprecated PRD line", "record-journal", "stage: define"],
  "implement-project/SKILL.md": ["error-level lint", "effective flags", "Never enumerate or execute commands classified as `Acceptance` or `Quality`", "unit tests", "record-journal", "stage: build"],
  "verify-acceptance/SKILL.md": ["commands classified as `Acceptance`", "verification.md", "Do not edit code", "record-journal", "stage: verify"],
  "review-implementation/SKILL.md": ["qualification.md", "quality debt", "record-journal", "stage: qualify"],
  "ship-spec/SKILL.md": ["status: shipped", "inspect-quality", "declared D IDs", "project rules", "record-journal", "stage: ship"],
  "craft-lasting-quality/SKILL.md": ["inspect-quality", "natural-language request", "Do not edit the quality records", "build-requested-spec", "reuses both"],
  "inspect-quality/SKILL.md": ["commands classified as `Quality`", "effective flags", "aggregate quality command", "never construct a stricter invocation", "TDR.md", "quality/review.md", "counters.yaml"],
  "document-system/SKILL.md": ["important repository paths and product records", "Do not inventory skills, commands", "orchestrator skills own that routing"],
  "document-project/SKILL.md": ["important project paths and files", "Do not inventory skills, commands", "rules.md", "Do not create system architecture"],
};
for (const [relative, needles] of Object.entries(contract)) {
  const content = read(path.join(skillsRoot, ...relative.split("/")));
  for (const needle of needles) if (!content.includes(needle)) fail(`${relative}: missing ${needle}`);
}

const journalSkill = read(path.join(skillsRoot, "record-journal", "SKILL.md"));
for (const needle of ["journal.log", "initial date header", "system clock immediately before", "untruncated single-line summary last", "exactly eight characters", "`INFO`, `WARN`, and `ERROR`", "Physical line order is canonical", "legacy `journal.jsonl`", "Do not stage or commit files", "calling skill includes the journal update"]) {
  if (!journalSkill.includes(needle)) fail(`record-journal: missing journal contract ${needle}`);
}

for (const relative of ["document-system/assets/AGENTS.template.md", "document-project/assets/project.rules.template.md"]) {
  const content = read(path.join(skillsRoot, ...relative.split("/")));
  if (/^#{2,3} Commands$/m.test(content)) fail(`${relative}: must not document commands`);
  if (/\| Phase \| Command \|/m.test(content)) fail(`${relative}: must not contain a command inventory`);
}

const specTemplate = read(path.join(skillsRoot, "define-spec", "assets", "spec.template.md"));
for (const section of ["id: S0001", "slug:", "key:", "branch:", "## Problem", "## Solution", "## Verification", "## Technical debt", "new", "changed", "deprecated"]) {
  if (!specTemplate.includes(section)) fail(`spec template missing ${section}`);
}
const prdTemplate = read(path.join(skillsRoot, "define-spec", "assets", "PRD.template.md"));
if (!prdTemplate.includes("F0001") || !prdTemplate.includes("T0001")) fail("PRD template lacks F and T requirements");
const counters = read(path.join(skillsRoot, "document-system", "assets", "counters.template.yaml"));
for (const key of ["spec:", "functional:", "technical:", "debt:"]) if (!counters.includes(key)) fail(`counter template missing ${key}`);

for (const relative of ["README.md", "docs/AIDD.workflow.md", "docs/getting-started.md", ".agents/skills/skills.catalog.md"]) {
  const content = read(path.join(root, ...relative.split("/")));
  for (const retired of ["change/{change_key}", "change.md", "report.md", "system.arch.md", "index-specs.mjs", "up to five"]) {
    if (content.includes(retired)) fail(`${relative}: retains ${retired}`);
  }
}

function verifyOverlay() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "aiddbot-less-harness-"));
  try {
    const result = runOverlay(temp, { inventory: sourceInventory() });
    if (result.conflicts) fail("overlay fixture has conflicts");
    for (const required of [".agents/skills/define-spec/assets/spec.template.md", ".claude/skills/define-spec/SKILL.md", ".agents/skills/document-project/assets/project.rules.template.md"]) {
      if (!fs.existsSync(path.join(temp, ...required.split("/")))) fail(`overlay misses ${required}`);
    }
    const repeat = runOverlay(temp, { dryRun: true, inventory: sourceInventory() });
    if (repeat.conflicts || repeat.written.length) fail("overlay is not idempotent");
  } finally {
    const resolved = path.resolve(temp);
    if (path.dirname(resolved) === fs.realpathSync(os.tmpdir())) fs.rmSync(resolved, { recursive: true, force: true });
  }
}

verifyOverlay();

function verifyJournal() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "aiddbot-journal-"));
  const journal = path.join(temp, "journal.log");
  const script = path.join(skillsRoot, "record-journal", "scripts", "append.mjs");
  try {
    for (const [stage, event, status, summary] of [
      ["define", "created", "green", "Specification created"],
      ["verification", "checked-long", "red", "Acceptance failed"],
      ["qualify", "reviewed", "amber", "Debt remains"],
    ]) {
      const result = spawnSync(process.execPath, [script, "--journal", journal, "--stage", stage, "--event", event, "--status", status, "--summary", summary], { encoding: "utf8" });
      if (result.status !== 0) fail(`record-journal failed: ${result.stderr.trim()}`);
    }
    const content = read(journal);
    if ((content.match(/^# Journal · \d{4}-\d{2}-\d{2}$/gm) || []).length !== 1) fail("record-journal must write one initial date header");
    if (content.indexOf("Specification created") > content.indexOf("Acceptance failed")) fail("record-journal changed physical event order");
    if (!/^\d{2}:\d{2}:\d{2} \| define__ \| created_ \| INFO____ \| -_______ \| -_______ \| Specification created$/m.test(content)) fail("record-journal padded line format differs");
    if (!/^\d{2}:\d{2}:\d{2} \| verifica \| checked- \| ERROR___ \| -_______ \| -_______ \| Acceptance failed$/m.test(content)) fail("record-journal truncation or error level differs");
    if (!/^\d{2}:\d{2}:\d{2} \| qualify_ \| reviewed \| WARN____ \| -_______ \| -_______ \| Debt remains$/m.test(content)) fail("record-journal warning level differs");
  } finally {
    const resolved = path.resolve(temp);
    if (path.dirname(resolved) === fs.realpathSync(os.tmpdir())) fs.rmSync(resolved, { recursive: true, force: true });
  }
}

verifyJournal();
const scaffold = path.join(skillsRoot, "scaffold-system", "scripts", "materialize.mjs");
const listed = spawnSync(process.execPath, [scaffold, "--list"], { encoding: "utf8" });
if (listed.status !== 0 || !/default: express/.test(listed.stdout)) fail("scaffold catalog is unavailable");

if (failures.length) {
  process.stderr.write(`${failures.map((message) => `FAIL ${message}`).join("\n")}\n`);
  process.exit(1);
}
process.stdout.write(`PASS less-harness skills: ${skills.length}\n`);
