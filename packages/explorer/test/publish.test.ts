import { describe, expect, test } from "bun:test";
import { checkSource, type SourceState } from "../src/publish.ts";

const clean: SourceState = { branch: "main", dirty: false, ahead: 0, behind: 0 };

describe("checkSource", () => {
  test("publishes a clean main that matches origin without a push", () => {
    expect(checkSource(clean)).toEqual({ push: false });
  });

  test("pushes a clean main that is ahead of origin", () => {
    expect(checkSource({ ...clean, ahead: 3 })).toEqual({ push: true });
  });

  test("stops on another branch", () => {
    expect(checkSource({ ...clean, branch: "feat/x" })).toHaveProperty("stop");
  });

  test("stops when the working tree has changes", () => {
    expect(checkSource({ ...clean, dirty: true, ahead: 1 })).toHaveProperty("stop");
  });

  test("stops when main is behind or diverged", () => {
    expect(checkSource({ ...clean, behind: 1 })).toHaveProperty("stop");
    expect(checkSource({ ...clean, behind: 1, ahead: 2 })).toHaveProperty("stop");
  });
});
