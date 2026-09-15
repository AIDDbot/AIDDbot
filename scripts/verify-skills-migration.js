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
  "architect-solution-foundation",
  "craft-lasting-quality",
  "skillify",
]);

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
  ".agents/skills/specify/assets/PRD.template.md",
  ".agents/skills/specify/assets/spec.template.md",
  ".agents/skills/verify/assets/verification.template.md",
  ".agents/skills/qualify/assets/qualification.template.md",
  ".agents/skills/explore/assets/counters.template.yaml",
  ".agents/skills/extract/assets/project.rules.template.md",
  ".agents/skills/craft-lasting-quality/assets/findings.template.md",
  ".agents/skills/craft-lasting-quality/assets/review.template.md",
]) if (!exists(required)) fail(`missing new artifact ${required}`);

for (const retired of [
  ".agents/skills/build-requested-change/assets/change.template.md",
  ".agents/skills/build-requested-change/scripts/index-specs.mjs",
  ".agents/skills/codify/assets/report.template.md",
  ".agents/skills/explore/assets/system.arch.template.md",
  ".agents/skills/extract/assets/container.arch.template.md",
  ".agents/skills/extract/assets/container.rules.template.md",
]) if (exists(retired)) fail(`retired artifact remains ${retired}`);

const contract = {
  "architect-solution-foundation/SKILL.md": ["application or project source code", "Ignore agent configuration", "presence of ignored files does not prevent scaffolding", "scaffoldify"],
  "build-requested-change/SKILL.md": ["execute the `specify` skill using the natural-language request", "specify` skill owns", "ship-implementation"],
  "specify/SKILL.md": ["one coherent scope", "determine its spec ID and any new requirement IDs", "reserve those IDs in `counters.yaml` on that branch", "PRD is the only owner of requirement text", "./assets/spec.template.md", "./assets/PRD.template.md", "deprecated PRD line"],
  "codify/SKILL.md": ["basic lint", "unit tests", "Do not create a report"],
  "verify/SKILL.md": ["acceptance tests", "verification.md", "without editing"],
  "qualify/SKILL.md": ["qualification.md", "quality debt"],
  "shipify/SKILL.md": ["status: shipped", "quality/findings.md", "project rules"],
  "craft-lasting-quality/SKILL.md": ["quality/findings.md", "quality configurations", "natural-language repair request", "without defining a spec", "build-requested-change"],
  "explore/SKILL.md": ["counters.yaml", "specs/PRD.md"],
  "extract/SKILL.md": ["rules.md", "Do not create system architecture"],
};
for (const [relative, needles] of Object.entries(contract)) {
  const content = read(path.join(skillsRoot, ...relative.split("/")));
  for (const needle of needles) if (!content.includes(needle)) fail(`${relative}: missing ${needle}`);
}

const specTemplate = read(path.join(skillsRoot, "specify", "assets", "spec.template.md"));
for (const section of ["id: S0001", "slug:", "key:", "branch:", "## Problem", "## Solution", "## Verification", "new", "changed", "deprecated"]) {
  if (!specTemplate.includes(section)) fail(`spec template missing ${section}`);
}
const prdTemplate = read(path.join(skillsRoot, "specify", "assets", "PRD.template.md"));
if (!prdTemplate.includes("F0001") || !prdTemplate.includes("T0001")) fail("PRD template lacks F and T requirements");
const counters = read(path.join(skillsRoot, "explore", "assets", "counters.template.yaml"));
for (const key of ["spec:", "functional:", "technical:", "finding:"]) if (!counters.includes(key)) fail(`counter template missing ${key}`);

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
    for (const required of [".agents/skills/specify/assets/spec.template.md", ".claude/skills/specify/SKILL.md", ".agents/skills/extract/assets/project.rules.template.md"]) {
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
const scaffold = path.join(skillsRoot, "scaffoldify", "scripts", "materialize.mjs");
const listed = spawnSync(process.execPath, [scaffold, "--list"], { encoding: "utf8" });
if (listed.status !== 0 || !/default: express/.test(listed.stdout)) fail("scaffold catalog is unavailable");

if (failures.length) {
  process.stderr.write(`${failures.map((message) => `FAIL ${message}`).join("\n")}\n`);
  process.exit(1);
}
process.stdout.write(`PASS less-harness skills: ${skills.length}\n`);
