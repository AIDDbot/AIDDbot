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
      "Analysis",
      "Design",
      "Implementation",
      "Verification",
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

  test("links a step to the phase with the same name, in both directions", () => {
    const step = data.chapters.steps.find((s) => s.id === "design");
    const phase = data.chapters.phases.find((p) => p.id === "design");
    expect(step?.links).toContainEqual({
      kind: "phase",
      id: "design",
      label: "Design",
    });
    expect(phase?.links).toContainEqual({
      kind: "step",
      id: "design",
      label: "Design",
    });
  });

  test("hangs each document type under a phase or a step", () => {
    for (const type of data.chapters.types) expect(type.owner).toBeDefined();
  });

  test("README, AGENTS, and CHANGELOG get their type from the file name, with no warning", () => {
    for (const [id, path] of [
      ["readme", "README.md"],
      ["agent-instructions", "AGENTS.md"],
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
      "`feature-file`, `adr`, `impl-plan` |",
      "`feature-file`, `adrs`, `impl-plan` |",
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
