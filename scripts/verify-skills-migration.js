#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { runOverlay, sourceInventory } from "../bin/lib/overlay.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(root, ".agents", "skills");
const failures = [];
for (const seed of ["AGENTS.seed.md", "CLAUDE.seed.md"]) {
  if (!fs.existsSync(path.join(root, ".agents", "seeds", seed))) {
    fail(`init agent seed is missing from .agents/seeds: ${seed}`);
  }
}
const managed = "<!-- managed by /adapt — do not edit here, edit ";
const kinds = new Set(["orchestrator", "worker", "primitive"]);

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

if (counts.orchestrator !== 3 || counts.worker !== 4 || counts.primitive !== 10) {
  fail("skill counts must be 3 orchestrators, 4 workers, and 10 primitives");
}

const publicOrchestrators = skills.filter((name) => {
  const fields = frontmatter(read(path.join(skillsRoot, name, "SKILL.md")), path.join(skillsRoot, name, "SKILL.md"));
  return fields.metadata && fields.metadata["aiddbot-kind"] === "orchestrator";
});
const expectedOrchestrators = ["architect-solution-foundation", "build-requested-change", "craft-lasting-quality"];
if (publicOrchestrators.join(",") !== expectedOrchestrators.join(",")) {
  fail(`public orchestrators must be exactly ${expectedOrchestrators.join(", ")}`);
}
for (const retired of [
  "clean-solution", "collect-findings", "deliver-change", "deliver-spec",
  "design-solution", "map-solution", "scope-change", "scope-feature",
  "deliver-requirement", "establish-solution", "improve-solution", "deliver-work",
  "clean-drift", "scaffold-workshop",
]) {
  if (fs.existsSync(path.join(skillsRoot, retired))) fail(`${retired}: retired public skill must not remain canonical`);
  if (fs.existsSync(path.join(root, ".claude", "skills", retired))) fail(`${retired}: retired managed Claude pointer must not remain`);
}
for (const name of fs.readdirSync(path.join(root, ".claude", "skills"))) {
  if (!skills.includes(name)) fail(`${name}: Claude skill has no canonical source`);
}

for (const required of [
  ".agents/skills/build-requested-change/assets/change.manifest.template.md",
  ".agents/skills/verify/assets/change.e2e.report.template.md",
  ".agents/skills/qualify/assets/change.qualify.report.template.md",
  ".agents/skills/craft-lasting-quality/references/finding.contract.md",
]) {
  if (!fs.existsSync(path.join(root, ...required.split("/")))) fail(`adaptive delivery artifact missing: ${required}`);
}

const buildSkill = read(path.join(skillsRoot, "build-requested-change", "SKILL.md"));
if (!buildSkill.includes("./references/triage.md") || !buildSkill.includes("change/{change_key}")
  || !buildSkill.includes("../specify-spec/SKILL.md") || !buildSkill.includes("../implement-spec/SKILL.md")
  || !buildSkill.includes("../ship-implementation/SKILL.md")) {
  fail("build-requested-change must classify and coordinate one change through release");
}
const changeTemplate = read(path.join(skillsRoot, "build-requested-change", "assets", "change.manifest.template.md"));
for (const field of ["origin:", "kind:", "intent:", "complexity:", "stages:", "findings:"]) {
  if (!changeTemplate.includes(field)) fail(`common change manifest is missing ${field}`);
}
const triage = read(path.join(skillsRoot, "build-requested-change", "references", "triage.md"));
for (const rule of ["simple", "intent: fix", "origin: craft", "requested `kind: technical`", "complexity: complex"]) {
  if (!triage.includes(rule)) fail(`change policy is missing ${rule}`);
}
const implementation = read(path.join(skillsRoot, "implement-spec", "SKILL.md"));
if (!implementation.includes("do not create a plan artifact") || !implementation.includes("technical criterion")) {
  fail("implementation does not support planless work with criterion evidence");
}
const shipping = read(path.join(skillsRoot, "ship-implementation", "SKILL.md"));
if (!shipping.includes("stages.verify") || !shipping.includes("stages.qualify") || !shipping.includes("Set the change `ready`")) {
  fail("shipping does not honor adaptive proof stages");
}
const architectSkill = read(path.join(skillsRoot, "architect-solution-foundation", "SKILL.md"));
if (!architectSkill.includes("../scaffoldify/SKILL.md") || !architectSkill.includes("../explore/SKILL.md")
  || !architectSkill.includes("../extract/SKILL.md") || !architectSkill.includes("an executable foundation is requested")) {
  fail("foundation orchestrator must separate design from requested materialization and mapping");
}
const scaffoldSkill = read(path.join(skillsRoot, "scaffoldify", "SKILL.md"));
if (!scaffoldSkill.includes("wait for user confirmation")) {
  fail("scaffoldify must confirm material choices before materializing");
}
const prdTemplate = read(path.join(skillsRoot, "explore", "assets", "PRD.template.md"));
if (/^## \{category\}|\{spec_id\}/m.test(prdTemplate) || !prdTemplate.includes("Empty index")) {
  fail("initial PRD must be an empty index shell");
}
const scaffoldReadme = read(path.join(skillsRoot, "scaffoldify", "assets", "solution-readme.template.md"));
const solutionStart = "<!-- aidd:solution:start -->";
const solutionEnd = "<!-- aidd:solution:end -->";
if (scaffoldReadme.split(solutionStart).length !== 2
  || scaffoldReadme.split(solutionEnd).length !== 2
  || scaffoldReadme.indexOf(solutionStart) > scaffoldReadme.indexOf(solutionEnd)) {
  fail("scaffold README template must define exactly one replaceable solution block");
}
const craftSkill = read(path.join(skillsRoot, "craft-lasting-quality", "SKILL.md"));
if (!craftSkill.includes("up to five") || !craftSkill.includes("origin: craft") || !craftSkill.includes("../build-requested-change/SKILL.md")) {
  fail("craft-lasting-quality does not own batched change delivery");
}
if (/deliver-work|scope-feature|deliver-spec|planify/.test(craftSkill)) {
  fail("craft-lasting-quality must not route findings through requested specification delivery");
}
if (!craftSkill.includes("findings.md") || !craftSkill.includes("./references/finding.contract.md")
  || !craftSkill.includes("no eligible pending findings remain")) {
  fail("craft-lasting-quality must own finding normalization and an empty-batch exit");
}
for (const template of [
  ".agents/skills/qualify/assets/change.qualify.report.template.md",
]) {
  if (!read(path.join(root, ...template.split("/"))).includes("Accumulated debt")) {
    fail(`qualification template has no structured accumulated-debt section: ${template}`);
  }
}

for (const legacy of [
  ".claude/commands", ".cursor/commands", ".github/prompts",
  ".codex/skills", ".cursor/skills", ".github/skills",
]) {
  const folder = path.join(root, ...legacy.split("/"));
  if (fs.existsSync(folder) && fs.readdirSync(folder).length) fail(`${legacy} contains retired adapters`);
}

const retiredNames = [
  "clean-solution", "collect-findings", "deliver-change", "deliver-spec",
  "design-solution", "map-solution", "scope-change", "scope-feature",
];
for (const relative of [
  "README.md", "docs/AIDD.workflow.md", "docs/getting-started.md",
  "docs/adaptive-delivery.workflow.yaml", ".agents/skills/skills.catalog.md",
]) {
  const file = path.join(root, ...relative.split("/"));
  const content = read(file);
  for (const name of retiredNames) {
    if (content.includes(name)) fail(`${relative}: active documentation names retired skill ${name}`);
  }
  for (const link of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = link[1].split("#", 1)[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) {
      fail(`${relative}: broken local link ${target}`);
    }
  }
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
    const retiredPointer = ".claude/skills/clean-solution/SKILL.md";
    const retiredSource = path.join(fixture, "retired-pointer-source.md");
    const retiredText = "retired managed Claude pointer\n";
    fs.writeFileSync(retiredSource, retiredText);
    const formerInventory = {
      ...sourceInventory(),
      [retiredPointer]: {
        source: retiredSource,
        digest: `sha256:${crypto.createHash("sha256").update(retiredText).digest("hex")}`,
      },
    };
    const first = runOverlay(fixture, { dryRun: false, force: false, inventory: formerInventory });
    if (first.conflicts) fail("clean overlay fixture reported conflicts");
    for (const required of [
      ".agents/skills/architect-solution-foundation/SKILL.md",
      ".agents/skills/scaffoldify/SKILL.md",
      ".agents/skills/scaffoldify/scripts/materialize.mjs",
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
    const updatePreview = runOverlay(fixture, { dryRun: true, force: false });
    if (updatePreview.rows.find((row) => row.file === retiredPointer)?.action !== "remove") {
      fail("overlay update did not plan removal of a retired Claude skill pointer");
    }
    const update = runOverlay(fixture, { dryRun: false, force: false });
    if (update.conflicts || fs.existsSync(path.join(fixture, ...retiredPointer.split("/")))) {
      fail("overlay update retained a retired Claude skill pointer");
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

function verifyScaffoldCli() {
  const scaffold = path.join(root, ".agents", "skills", "scaffoldify", "scripts", "materialize.mjs");
  if (fs.existsSync(path.join(root, ".agents", "skills", "scaffoldify", "scripts", "materialize.js"))) {
    fail("scaffold materializer must use the .mjs extension");
  }
  if (fs.existsSync(path.join(root, "bin", "scaffold.js"))) fail("retired bin/scaffold.js must not remain");
  if (read(path.join(root, "package.json")).includes("aiddbot-scaffold")) fail("retired aiddbot-scaffold binary must not remain");
  const materializer = read(scaffold);
  if (/runOverlay|ensureGit|\bbin[\\/]scaffold/.test(materializer)) {
    fail("scaffold materializer must not own overlay or Git initialization");
  }
  if (!materializer.includes('process.env.ComSpec || "cmd.exe"') || !materializer.includes('["npx", ...args].join(" ")')) {
    fail("scaffold materializer must invoke npx through cmd.exe on Windows");
  }
  const listed = spawnSync(process.execPath, [scaffold, "--list"], { encoding: "utf8" });
  if (listed.status !== 0 || !/default: express/.test(listed.stdout) || /domain/.test(listed.stdout)) {
    fail("scaffold list must expose defaults without a domain surface");
  }
  const unnamed = spawnSync(process.execPath, [scaffold, "--back", "express"], { encoding: "utf8" });
  if (unnamed.status === 0 || !/--name needs letters or digits/.test(unnamed.stderr)) {
    fail("scaffold must require a solution name");
  }
  const dry = spawnSync(process.execPath, [scaffold, "--dry-run", "--name", "Demo app", "--back", "express"], {
    encoding: "utf8",
  });
  if (dry.status !== 0 || !/solution   Demo app \(demo-app\)/.test(dry.stdout) || !/metadata   would/.test(dry.stdout)) {
    fail("scaffold dry run must preserve the solution name and reconcile metadata");
  }
  if (!/back\/package\.json -> demo-app-back/.test(dry.stdout)) {
    fail("scaffold defaults must retain literal tier destinations");
  }
  const named = spawnSync(process.execPath, [
    scaffold, "--dry-run", "--name", "Astro Bookings",
    "--back", "express", "--back-dir", "astro-bookings-api",
    "--front", "standard", "--front-dir", "astro-bookings-web",
    "--e2e", "playwright", "--e2e-dir", "astro-bookings-e2e",
  ], { encoding: "utf8" });
  if (named.status !== 0
    || !/AIDDbot\/back-express -> astro-bookings-api/.test(named.stdout)
    || !/AIDDbot\/front-standard -> astro-bookings-web/.test(named.stdout)
    || !/AIDDbot\/e2e-playwright -> astro-bookings-e2e/.test(named.stdout)
    || !/astro-bookings-api\/package\.json -> astro-bookings-back/.test(named.stdout)) {
    fail("scaffold must materialize catalogued tiers into confirmed destination folders");
  }
  for (const args of [
    ["--name", "Demo", "--back", "express", "--back-dir", "../outside"],
    ["--name", "Demo", "--back", "express", "--back-dir", "same", "--front", "standard", "--front-dir", "SAME"],
    ["--name", "Demo", "--back", "express", "--front-dir", "unused"],
  ]) {
    const invalidDestination = spawnSync(process.execPath, [scaffold, "--dry-run", ...args], { encoding: "utf8" });
    if (invalidDestination.status === 0 || !/(Invalid destination folder|destination folders must be unique|requires --front)/.test(invalidDestination.stderr)) {
      fail("scaffold must reject unsafe or duplicate destination folders");
    }
  }
}

verifyScaffoldCli();

if (failures.length) {
  process.stderr.write(`${failures.map((message) => `FAIL ${message}`).join("\n")}\n`);
  process.exit(1);
}

process.stdout.write(
  `PASS skills: ${skills.length}; orchestrators: ${counts.orchestrator}; workers: ${counts.worker}; primitives: ${counts.primitive}\n`
);
