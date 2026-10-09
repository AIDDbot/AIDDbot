# Acceptance tests

Write or repair the E2E tests from the requirements of the spec.

- Each requirement has at least one test that proves it.
- Each page, endpoint, and command in `Expected URLs and APIs` has at least one basic test of its expected answer.
- Put the global ID of each requirement that a test proves on that test, as `@S0042-R03`. Use a test tag when the framework has tags (Playwright: `test("title", { tag: "@S0042-R03" }, …)`); otherwise, put it in the title. The core filters by it with `--grep`. Also keep the tag or name convention of the project `AGENTS.md`.
- A test tagged with another spec is a regression check: never edit it. The only exception is a requirement of this spec that contradicts it. Then update that test, tag it with the requirement of this spec that replaces the old one, and name both in your result.
- Each test makes its own data with unique identifiers. It never depends on the test order, on data that exists before, or on global counts: the suite runs in parallel against one shared database.

Check with `node .agents/aidd/aidd.mjs run acceptance --spec`. It runs only the tests of this spec, and it lists each requirement that has no test. For a spec without requirements, it runs nothing. This run is never evidence: only the full run of `verify-behavior` counts.

Repair each failure that it shows, in the tests or in the production code. Do at most three cycles of run and repair. Then return what still fails.
