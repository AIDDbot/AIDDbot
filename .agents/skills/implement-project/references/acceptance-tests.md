# Acceptance tests

Write or repair the E2E tests from the requirements of the spec.

- Each requirement has at least one test that proves it.
- Each page, endpoint, and command in `Expected URLs and APIs` has at least one basic test of its expected answer.
- Put the global ID of each requirement that a test proves on that test, as `@S0042-R03`. Use a test tag when the framework has tags (Playwright: `test("title", { tag: "@S0042-R03" }, …)`); otherwise, put it in the title. The `test:spec` slot of the `e2e` project filters by it. Also keep the tag or name convention of the project `AGENTS.md`.
- A test tagged with another spec is a regression check: never edit it. The only exception is a requirement of this spec that contradicts it. Then update that test, add the tag of the requirement of this spec next to the old tag, and name both in your result. Remove the old tag only when this spec states that its requirement replaces the old one: never leave a shipped requirement with no tagged test.
- A test checks only what its spec owns. For a list, a table, or a help text that other specs extend, check that each item of this spec is there, with its value: never the whole list, its count, or its order, unless a requirement states them. A later spec adds items, and a closed list breaks.
- Each test makes its own data with unique identifiers. It never depends on the test order, on data that exists before, or on global counts: the suite runs in parallel against one shared database.
- When `{Product_Folder}/system.md` exists, the `e2e` project has no layers, and each test proves one requirement. A test uses only the API, the screens, and the commands. It starts each project with its start command and never opens the database.

Check with `node .agents/aidd/aidd.mjs run test --spec`. It runs only the tests of this spec, and it lists each requirement that has no test. A `fix` of a failing test has no requirements of its own: it runs the test that the spec cites, such as `@S0042-R03`. A spec with no requirements that cites none runs nothing. `verify-behavior` runs it again as its evidence. Never run the full suite yourself: `ship-spec` runs it.

Repair each failure that it shows, in the tests or in the production code. Do at most three cycles of run and repair. Then return what still fails.
