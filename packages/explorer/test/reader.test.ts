import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { build } from "../src/builder/build.ts";
import { ContractError } from "../src/builder/chapters.ts";
import { ROOT_FILES, validateMeta } from "../src/builder/documents.ts";
import { readData } from "../src/builder/read.ts";
import type { ExplorerData } from "../src/shared/types.ts";

const REPO = resolve(import.meta.dir, "..", "..", "..");
let temp = "";

/** A copy of the content scope that a test can break. */
function copyRepo(): string {
  const dir = mkdtempSync(join(temp, "repo-"));
  cpSync(join(REPO, "docs"), join(dir, "docs"), { recursive: true });
  for (const file of [...ROOT_FILES, "LICENSE"])
    if (existsSync(join(REPO, file))) cpSync(join(REPO, file), join(dir, file));
  return dir;
}

function edit(dir: string, file: string, from: string | RegExp, to: string) {
  const path = join(dir, file);
  const text = readFileSync(path, "utf8");
  const next = text.replace(from, to);
  if (next === text) throw new Error(`edit did not change ${file}`);
  writeFileSync(path, next);
}

async function contractProblems(dir: string): Promise<string[]> {
  try {
    await readData(dir);
  } catch (error) {
    if (error instanceof ContractError)
      return error.problems.map((p) => `${p.file}: ${p.message}`);
    throw error;
  }
  return [];
}

beforeAll(() => {
  temp = mkdtempSync(join(tmpdir(), "aidd-explorer-"));
});
afterAll(() => rmSync(temp, { recursive: true, force: true }));

describe("readData on this repository", () => {
  let data: ExplorerData;
  beforeAll(async () => {
    data = await readData(REPO);
  });

  test("reads the four chapters in table order", () => {
    expect(data.chapters.phases.map((p) => p.name)).toEqual([
      "Foundation",
      "Development",
      "Release",
      "Maintenance",
    ]);
    expect(data.chapters.steps.map((s) => s.name)).toEqual([
      "Analysis",
      "Design",
      "Implementation",
      "Verification",
      "Close",
    ]);
    expect(data.chapters.blocks.length).toBeGreaterThanOrEqual(6);
    expect(data.chapters.types.map((t) => t.id)).toContain("spec");
  });

  test("links every step to the phase that links to the change flow (US2R1)", () => {
    expect(data.flowPhase).toBe("development");
    const phase = data.chapters.phases.find((p) => p.id === "development");
    for (const step of data.chapters.steps) {
      expect(step.links).toContainEqual({
        kind: "phase",
        id: "development",
        label: "Development",
      });
      expect(phase?.links).toContainEqual({
        kind: "step",
        id: step.id,
        label: step.name,
      });
    }
  });

  test("reads the phase table with the Work, Uses, and Produces columns (US2R1)", () => {
    const release = data.chapters.phases.find((p) => p.id === "release");
    expect(release?.fields.map((f) => f.column)).toEqual([
      "#",
      "Phase",
      "Work",
      "Uses",
      "Produces",
    ]);
    for (const column of ["Uses", "Produces"])
      expect(
        release?.fields.find((f) => f.column === column)?.refs.map((r) => r.id),
      ).toEqual(["changelog"]);
  });

  test("puts the LIVE DOC types in the brain, in catalog order (US2R2)", () => {
    expect(data.brain).toEqual([
      "readme",
      "glossary",
      "wiki-page",
      "agents",
      "roadmap",
      "adr",
      "domain-model",
      "design-system",
      "changelog",
    ]);
  });

  test("s0004-US1R2: Analysis reads the brain and writes the spec, the feature file, and the roadmap", () => {
    const analysis = data.chapters.steps.find((s) => s.id === "analysis");
    const ids = (column: string) =>
      analysis?.fields.find((f) => f.column === column)?.refs.map((r) => r.id);
    expect(ids("Uses")).toEqual([
      "roadmap",
      "glossary",
      "wiki-page",
      "domain-model",
      "adr",
      "agents",
    ]);
    expect(ids("Produces")).toEqual(["spec", "feature-file", "roadmap"]);
    expect(data.chapters.types.map((t) => t.id)).not.toContain("impl-plan");
  });

  test("hangs each other type under the first step that produces or uses it", () => {
    const owners = Object.fromEntries(
      data.chapters.types.map((t) => [t.id, t.owner?.id]),
    );
    for (const id of data.brain) expect(owners[id]).toBeUndefined();
    expect(owners).toMatchObject({
      spec: "analysis",
      "feature-file": "analysis",
      code: "implementation",
      "unit-test": "implementation",
      "e2e-test": "implementation",
      "check-report": "implementation",
      "test-report": "verification",
      "review-report": "verification",
    });
  });

  test("README, AGENTS, and CHANGELOG get their type from the file name, with no warning", () => {
    for (const [id, path] of [
      ["readme", "README.md"],
      ["agents", "AGENTS.md"],
      ["changelog", "CHANGELOG.md"],
    ]) {
      const doc = data.docs.find((d) => d.path === path);
      expect(doc?.id).toBe(id);
      expect(doc?.type).toBe(id);
      expect(doc?.warnings.filter((w) => w.startsWith("META"))).toEqual([]);
    }
  });

  test("DESIGN.md keeps its META under the aiddbot key", () => {
    expect(data.docs.find((d) => d.path === "DESIGN.md")?.meta?.id).toBe(
      "design-system",
    );
  });

  test("links to a document of the content scope open the target anchor", () => {
    const intent = data.docs.find((d) => d.id === "intent");
    expect(intent?.html).toContain('href="#/doc/glossary/project"');
  });

  test("a link outside the content scope shows as plain text with a mark", () => {
    const readme = data.docs.find((d) => d.id === "readme");
    expect(readme?.html).toContain("outside the explorer");
    expect(readme?.html).not.toContain('href="LICENSE"');
  });
});

describe("wiki contract (US1R4)", () => {
  test("a missing chapter anchor stops the build and names the file", async () => {
    const dir = copyRepo();
    edit(dir, "docs/wiki/intent.md", "## Building blocks", "## Blocks");
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining("docs/wiki/intent.md: anchor #building-blocks"),
    );
  });

  test("a renamed column stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/wiki/documentation-catalog.md",
      "| # | Step | Work | Uses | Produces |",
      "| # | Step | Work | Inputs | Produces |",
    );
    const problems = await contractProblems(dir);
    expect(problems).toContainEqual(
      expect.stringContaining(
        "docs/wiki/documentation-catalog.md: table #change-flow has columns",
      ),
    );
  });

  test("an unknown document ID stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/wiki/documentation-catalog.md",
      "`design-system` | `spec`, `adr` |",
      "`design-system` | `spec`, `adrs` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining("unknown document ID `adrs`"),
    );
  });

  test("an unknown element in a relations column stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/wiki/intent.md",
      "| Foundation, Close, `wiki-page`, `glossary` |",
      "| Foundation, Deploy, `wiki-page`, `glossary` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining('unknown element "Deploy"'),
    );
  });
});

describe("Form column (s0003-US2R3)", () => {
  test("a missing Form column stops the build and names the file and the column", async () => {
    const dir = copyRepo();
    const file = "docs/wiki/documentation-catalog.md";
    const path = join(dir, file);
    const lines = readFileSync(path, "utf8").split("\n");
    const start = lines.findIndex((l) => l.startsWith("| ID | Document |"));
    for (let i = start; lines[i]?.startsWith("|"); i++) {
      const cells = (lines[i] ?? "").split(" | ");
      cells.splice(3, 1);
      lines[i] = cells.join(" | ");
    }
    writeFileSync(path, lines.join("\n"));
    const problems = await contractProblems(dir);
    expect(problems).toContainEqual(
      expect.stringMatching(
        /^docs\/wiki\/documentation-catalog\.md: table #document-catalog .*\(missing: Form\)/,
      ),
    );
  });

  test("an unknown Form value stops the build and names the file and the value", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/wiki/documentation-catalog.md",
      "| `spec` | Change specification | `CHG` | `DOC` |",
      "| `spec` | Change specification | `CHG` | `TEXT` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining(
        "docs/wiki/documentation-catalog.md: unknown Form value `TEXT` in row `spec`",
      ),
    );
  });
});

describe("smaller problems (US3R2)", () => {
  test("a missing META, an invalid META, and a broken link are listed with their file", async () => {
    const dir = copyRepo();
    edit(dir, "docs/wiki/scaffolding.md", /^---[\s\S]*?---\n/, "");
    edit(dir, "docs/wiki/aiddbot-cli.md", /status: \w+/, "status: maybe");
    edit(dir, "docs/wiki/index.md", "(glossary.md)", "(glosary.md)");
    const data = await readData(dir);
    expect(data.problems).toContainEqual({
      file: "docs/wiki/scaffolding.md",
      message: "META is missing",
    });
    expect(data.problems).toContainEqual({
      file: "docs/wiki/aiddbot-cli.md",
      message: "META status `maybe` is not valid",
    });
    expect(data.problems).toContainEqual({
      file: "docs/wiki/index.md",
      message: "Broken link: glosary.md not found",
    });
    expect(
      data.docs.find((d) => d.path === "docs/wiki/scaffolding.md")?.warnings,
    ).toContain("META is missing");
  });

  test("validateMeta checks fields, dates, and the spec change type", () => {
    const problems = validateMeta(
      {
        id: "s9",
        type: "spec",
        title: "T",
        status: "draft",
        created: "2026-1-1",
        updated: "2026-01-01",
        links: {},
      },
      new Set(["spec"]),
    );
    expect(problems).toContain("META field `created` is not an ISO 8601 date");
    expect(problems).toContain(
      "META field `change` is missing or not a change type",
    );
    expect(problems).toContain(
      "META field `links.sources` is missing or not a list",
    );
  });
});

describe("build (US1R1)", () => {
  test("writes a static site with relative paths only", async () => {
    const out = join(temp, "site", "sub", "explorer");
    await build(REPO, out);
    for (const file of [
      "index.html",
      "main.js",
      "styles.css",
      "theme.css",
      "data.json",
    ]) {
      expect(existsSync(join(out, file))).toBe(true);
    }
    const html = readFileSync(join(out, "index.html"), "utf8");
    expect(html).not.toMatch(/(src|href)="\//);
    const js = readFileSync(join(out, "main.js"), "utf8");
    expect(js).not.toMatch(/from"\/|import\("\//);
    expect(js).toContain('"./data.json"');
  }, 60_000);
});
