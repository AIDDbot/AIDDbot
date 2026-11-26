import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import {
  cpSync,
  existsSync,
  mkdirSync,
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

  test("puts original document types in the brain, in catalog order", () => {
    expect(data.brain).toEqual([
      "readme",
      "glossary",
      "page",
      "agents",
      "roadmap",
      "notepad",
      "journal",
      "spec",
      "feature-file",
      "adr",
      "domain-model",
      "design-system",
      "check-report",
      "test-report",
      "review-report",
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
      "page",
      "wiki-page",
      "domain-model",
      "adr",
      "agents",
    ]);
    expect(ids("Produces")).toEqual(["spec", "feature-file", "roadmap"]);
    expect(data.chapters.types.map((t) => t.id)).not.toContain("impl-plan");
  });

  test("places change documents and other outputs under their step on the change map", () => {
    const owners = Object.fromEntries(
      data.chapters.types.map((t) => [t.id, t.owner?.id]),
    );
    expect(owners).toMatchObject({
      page: undefined,
      "wiki-page": "close",
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

  test("loads the original pages by kind and checks their relative links", () => {
    const pages = data.docs.filter((doc) => doc.type === "page");
    expect(pages.map((doc) => doc.group)).toEqual([
      "process",
      "process",
      "process",
      "process",
      "product",
      "product",
      "technology",
      "technology",
      "technology",
    ]);
    expect(data.docs.some((doc) => doc.path.startsWith("docs/wiki/"))).toBe(false);
    expect(
      data.problems.filter((problem) => problem.message.startsWith("Broken link:")),
    ).toEqual([]);
  });

  test("opens roadmap milestones, dogfooding rules, and relocated specs", () => {
    const roadmap = data.docs.find((doc) => doc.id === "roadmap");
    const dogfooding = data.docs.find((doc) => doc.id === "dogfooding");
    const spec = data.docs.find((doc) => doc.id === "s0001");
    expect(roadmap?.path).toBe("ROADMAP.md");
    expect(dogfooding?.path).toBe("docs/process/dogfooding.md");
    expect(dogfooding?.group).toBe("process");
    expect(spec?.path).toBe(
      "docs/product/specs/s0001-build-aiddbot-wiki/s0001.spec.md",
    );
    expect(spec?.group).toBe("specs");
    expect(roadmap?.toc.map((entry) => entry.id)).toContain(
      "m0--base-documentation",
    );
    expect(data.docs.find((doc) => doc.id === "readme")?.html).toContain(
      'href="#/doc/roadmap"',
    );
    expect(data.docs.find((doc) => doc.id === "readme")?.html).toContain(
      'href="#/doc/dogfooding"',
    );
    expect(spec?.html).toContain(
      'href="#/doc/roadmap/m0--base-documentation"',
    );
  });

  test("a link outside the content scope shows as plain text with a mark", () => {
    const readme = data.docs.find((d) => d.id === "readme");
    expect(readme?.html).toContain("outside the explorer");
    expect(readme?.html).not.toContain('href="LICENSE"');
  });
});

test("s0009-US1R2: lists a nested daily entry under the journal type", async () => {
  const dir = copyRepo();
  const month = "docs/product/journal/2030-01";
  const day = "2030-01-02";
  const id = `journal-${day}`;
  const path = `${month}/${day}.md`;
  mkdirSync(join(dir, month), { recursive: true });
  writeFileSync(join(dir, path), `---
id: ${id}
type: journal
title: "${day}"
status: draft
created: ${day}
updated: ${day}
links:
  sources: []
  related: []
  supersedes: []
---

# ${day}
`);

  const data = await readData(dir);
  const type = data.chapters.types.find((type) => type.id === "journal");
  const doc = data.docs.find((doc) => doc.id === id);
  expect(type?.documents).toContain(id);
  expect(doc).toMatchObject({
    path,
    type: "journal",
    group: "journal",
    meta: { id, type: "journal" },
    warnings: [],
  });
});

describe("brain contract (US1R4)", () => {
  test("a missing chapter anchor stops the build and names the file", async () => {
    const dir = copyRepo();
    edit(dir, "docs/product/intent.md", "## Building blocks", "## Blocks");
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining("docs/product/intent.md: anchor #building-blocks"),
    );
  });

  test("a brain type with no kind stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "| `PROCESS` | `agents`, `notepad` |",
      "| `PROCESS` | `agents` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining("brain type `notepad` has no kind"),
    );
  });

  test("an unknown kind code in the kind table stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "| `PROCESS` | `agents`, `notepad` |",
      "| `PEOPLE` | `agents`, `notepad` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining("unknown Kind `PEOPLE`"),
    );
  });

  test("a renamed column stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "| # | Step | Work | Uses | Produces |",
      "| # | Step | Work | Inputs | Produces |",
    );
    const problems = await contractProblems(dir);
    expect(problems).toContainEqual(
      expect.stringContaining(
        "docs/process/documentation-catalog.md: table #change-flow has columns",
      ),
    );
  });

  test("an unknown document ID stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
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
      "docs/product/intent.md",
      "| Foundation, Close, `wiki-page`, `glossary` |",
      "| Foundation, Deploy, `wiki-page`, `glossary` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining('unknown element "Deploy"'),
    );
  });
});

describe("impact levels (s0005)", () => {
  test("US2R2: reads the Skips and Adds of each level, in table order", async () => {
    const data = await readData(REPO);
    expect(data.impacts).toEqual([
      {
        id: "small",
        skips: ["feature-file", "e2e-test", "test-report"],
        adds: [],
      },
      { id: "medium", skips: [], adds: [] },
      { id: "large", skips: [], adds: ["review-report"] },
    ]);
  });

  test("gives each element its parent map", async () => {
    const data = await readData(REPO);
    const parents = (list: { parent: string }[]) =>
      new Set(list.map((e) => e.parent));
    expect(parents(data.chapters.phases)).toEqual(new Set(["overview"]));
    expect(parents(data.chapters.steps)).toEqual(new Set(["change"]));
    expect(parents(data.chapters.blocks)).toEqual(new Set(["blocks"]));
    for (const type of data.chapters.types)
      expect(type.parent).toBe(
        data.brain.includes(type.id) ? "brain" : "change",
      );
  });

  test("US2R4: an unknown document ID in the Skips cell stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "| `feature-file`, `e2e-test`, `test-report` | — |",
      "| `no-such-doc` | — |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringMatching(
        /^docs\/process\/documentation-catalog\.md: unknown document ID `no-such-doc` in column "Skips"/,
      ),
    );
  });

  test("US2R4: a missing impact levels table stops the build", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "### Impact levels",
      "### Levels",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining(
        "docs/process/documentation-catalog.md: anchor #impact-levels",
      ),
    );
  });
});

describe("Form column (s0003-US2R3)", () => {
  test("a missing Form column stops the build and names the file and the column", async () => {
    const dir = copyRepo();
    const file = "docs/process/documentation-catalog.md";
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
        /^docs\/process\/documentation-catalog\.md: table #document-catalog .*\(missing: Form\)/,
      ),
    );
  });

  test("an unknown Form value stops the build and names the file and the value", async () => {
    const dir = copyRepo();
    edit(
      dir,
      "docs/process/documentation-catalog.md",
      "| `spec` | Change specification | `CHG` | `DOC` |",
      "| `spec` | Change specification | `CHG` | `TEXT` |",
    );
    expect(await contractProblems(dir)).toContainEqual(
      expect.stringContaining(
        "docs/process/documentation-catalog.md: unknown Form value `TEXT` in row `spec`",
      ),
    );
  });
});

describe("smaller problems (US3R2)", () => {
  test("a missing META, an invalid META, and a broken link are listed with their file", async () => {
    const dir = copyRepo();
    edit(dir, "docs/technology/scaffolding.md", /^---[\s\S]*?---\n/, "");
    edit(dir, "docs/process/aiddbot-cli.md", /status: \w+/, "status: maybe");
    edit(dir, "docs/product/intent.md", "(glossary.md#project)", "(glosary.md)");
    const data = await readData(dir);
    expect(data.problems).toContainEqual({
      file: "docs/technology/scaffolding.md",
      message: "META is missing",
    });
    expect(data.problems).toContainEqual({
      file: "docs/process/aiddbot-cli.md",
      message: "META status `maybe` is not valid",
    });
    expect(data.problems).toContainEqual({
      file: "docs/product/intent.md",
      message: "Broken link: glosary.md not found",
    });
    expect(
      data.docs.find((d) => d.path === "docs/technology/scaffolding.md")?.warnings,
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
