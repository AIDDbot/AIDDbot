# Changelog

## 0.4.7 - 2026-10-27

- refactor(skills): the product folder is .product/, as the core writes it: no {Product_Folder} or {Source_Folders} placeholder (7e8ce6ef)
- refactor(skills): tighten /scan-quality: STE in the limits and in the repair of a crowded folder (674a27b2)
- refactor(skills): tighten /ship-spec: the core gives the AGENTS.md problems, the route of a repair stays in build-requested-spec, and the regression has no unit tests (19439b4b)
- refactor(skills): tighten /review-implementation: STE in its gates, and the route of a finding stays in build-requested-spec (0846132f)
- refactor(skills): tighten /verify-behavior: a verification is red or green, and the core rules stay in the core (a8e35f80)
- refactor(skills): tighten /implement-project: STE in its references, one idea in each sentence (45a2388a)
- refactor(skills): tighten /define-spec: the spec template gives the shape of the requirements, the skill gives their rules (9595faf8)
- refactor(skills): tighten /define-spec: no spec-file reference (the core makes a spec from a file) and no case of a system with no project (a4d9f86b)
- refactor(skills): tighten /rule-project: a slot with no clear command is n/a with its reason, as the template and the example say (5f991df9)
- refactor(skills): tighten /outline-system: no case of a system with no project, since an archetype or the code always gives one (f5fbe009)
- docs: recount skill sizes after Halloween D64–D66 (35639116)

## 0.4.6 - 2026-10-27

- refactor(skills): tighten /craft-lasting-quality: build-requested-spec owns the steps of each debt spec, and patch.md drops what the flow already does (af4d92c6)
- refactor(skills): tighten /build-requested-spec: references/events.md becomes checkpoints.md, one row for each result of each checkpoint (05d40ff8)
- refactor(skills): tighten /architect-initial-foundation: the archetype is a library, aidd found does the scaffold, and the close runs the unit tests (Halloween D66) (cba7fe35)
- feat(core): aidd found copies an archetype of the catalog, sets the system identity and registers its slots (Halloween D66) (6356fde6)
- refactor(skills): tighten /craft-lasting-quality: STE in references/patch.md (f0a1f926)
- refactor(skills): tighten /build-requested-spec: STE in references/events.md (d142058b)
- refactor(skills): tighten /architect-initial-foundation: STE in its references, the 0.4 specs of Archetype CLI, and no shape to blueprint (c5364cb6)
- refactor(skills): rename /architect-system-foundation to /architect-initial-foundation (Halloween D65) (28e01333)

## 0.4.5 - 2026-10-27

- refactor(skills): remove /build-archetype-foundation; the Archetype Builder owns the procedure (Halloween D64) (ba2384d0)
- docs: record the ASD-STE100 pass in skill sizes (43ce1476)
- refactor(skills): split sentences over 25 words (6c60ee79)
- refactor(skills): tighten /maintain-skills (4c485066)
- refactor(skills): tighten /outline-system (fa8eebc7)
- refactor(skills): tighten /scan-quality (dc037f7c)
- refactor(skills): tighten /review-implementation (7d6bf9dc)
- refactor(skills): tighten /verify-behavior (e74cc66c)
- refactor(skills): tighten /review-implementation (36471172)
- feat(adapt): warn on skill sentences over 25 words (9121d753)
- refactor(skills): tighten /rule-project (ba38fd72)
- docs: refresh skill size counts (f91b7d86)
- refactor(skills): load failure and patch paths on demand (bbb11aa5)
- refactor(skills): slim the five largest skills (467adaa9)
- docs: add the draft backlog to features (19ad2429)
- docs: add /architect-requested-spec to how it works (7faaada9)
- feat(skills): add /architect-requested-spec (14c46f0f)
- refactor(skills): tighten /implement-project, /verify-behavior, /review-implementation, /build-requested-spec (311e121c)
- Merge branch 'refactor/quality-gates': v0.4.4 pins Archetype Web and CLI v0.4.22 (f61ceabf)
- Merge branch 'refactor/quality-gates': v0.4.3 pins Archetype Web and CLI v0.4.21 (b336a6c1)
- Merge branch 'refactor/quality-gates': v0.4.2 pins Archetype Web and CLI v0.4.20 (800e9a27)
- Merge pull request #2 from AIDDbot/refactor/quality-gates daylight (5344c6c7)
- Merge pull request #1 from AIDDbot/refactor/quality-gates Codename Daylight (593d9c79)

## 0.4.4 - 2026-10-23

- chore(skills): pin Archetype Web v0.4.22 and Archetype CLI v0.4.22 (a README with what comes out of the box, Vite+, and Make it yours) (cbb28b8a)

## 0.4.3 - 2026-10-23

- chore(skills): pin Archetype Web v0.4.21 and Archetype CLI v0.4.21 (no-deprecated in the hook, and no-magic-numbers in crap) (0a2c9888)

## 0.4.2 - 2026-10-23

- chore(skills): pin Archetype Web v0.4.20 and Archetype CLI v0.4.20 (a root start in the cli, and vp run --cache for test, layers and crap) (2f8bd5af)

## 0.4.1 - 2026-10-23

- chore(skills): pin Archetype Web v0.4.4 and Archetype CLI v0.4.18 (the PRD with a summary of each feature) (a89a7f03)
- refactor(skills): tighten /define-spec: the first sentence of the Problem is the summary in the PRD (5dc7bcbc)
- feat(core): each PRD line has the spec ID with its slug, and the first sentence of its Problem (37c57b3a)

## 0.4.0 - 2026-10-23

- docs(product): cli-4 closed 6 of 6 with zero debt, handed over as Archetype CLI v0.4.17 (ee2695ea)
- chore: codename Daylight for 0.4, shared with the Archetype Builder and the archetypes (2e40beaa)
- chore(skills): pin Archetype Web v0.4.3 and Archetype CLI v0.4.17 (Daylight, from cli-4) (382d3d15)
- docs(product): cli-4 ready on AIDDbot 1696bc45 and Builder a4f46c0 (2538bb2c)
- docs(readme): the About block with the author and the links (1696bc45)
- docs(product): D63 the harness gives the environment, and an archetype has no trace of AIDDbot (64f9954e)
- chore(skills): pin Archetype Web v0.4.2 (a root AGENTS.md with no trace of AIDDbot) (9f8871f4)
- refactor(skills): tighten /outline-system: no Records section, the skills and the core impose its rules (d7d7c6c0)
- chore(skills): pin Archetype Web v0.4.1 (the harness gives the OS and the shell) (89fa7036)
- refactor(skills): tighten /outline-system: the harness gives the OS and the shell, never the AGENTS.md (33a9580c)
- docs(product): Archetype Web v0.4.0 handed over from web-4 (d1ba1523)
- chore(skills): pin Archetype Web v0.4.0, which replaces Archetype Base (D38) (c5952e50)
- docs(product): migration versions name their spec (d87a5e28)
- docs(product): the independent review of S0007 and the account theme on reload (197dea69)
- docs(product): web-4 closed at 7 of 7 with zero debt, S0007 finished by hand (48b19417)
- refactor(skills): tighten /implement-project with each form of a named condition (5f62109a)
- docs(product): web-4 ready on AIDDbot d63b837a and Builder 0e5648d (428dfd7f)
- docs(product): D62 the code rules leave the root AGENTS.md (d63b837a)
- docs: the code rules live in implement-project, not in the root AGENTS.md (7520f4f3)
- refactor(skills): tighten /implement-project with the code rules out of the root AGENTS.md (a368d745)
- docs(product): the eval report fix of web-3 (a4a6cd74)
- fix(core): a red or amber eval without its report names the report template and keeps the revision (from web-3) (2bde76c1)
- docs(product): closed ranges replace the open range message (d19f9898)
- docs(product): web-3 closed, S0006 shipped by hand, and the open range fix in the Bedrock (d11ad34e)
- docs(product): web-3 findings to S0003 and the contrast fix in the Bedrock (dfa5b6d4)
- docs(engineering): each small commit has one type: code, tests or docs (a1e88ea9)
- docs(engineering): small commits as a recommendation, about 16 files each (269e1d8e)
- docs(engineering): small commits of one coherent unit of work, at most 64 files (2016425c)
- docs(engineering): commit unit by unit, with the reason measured in web-2 and web-3 (D61) (8aa97c0b)
- docs(product): web-3 ready on AIDDbot dc05f355 and Builder e9ffec5 (7033048c)
- docs(product): the fixes of web-2 in the Builder (dc05f355)
- docs(product): web-2 S0003 to S0007 and its close checks by hand (b134bc0e)
- docs(product): D61 stays, measured in web-2 (080de6e2)
- docs(product): web-2 S0002 shipped, e2e commits unit by unit (50f21e24)
- docs(product): web-2 S0002, one big commit in back and unit commits in front after D61 (94da1786)
- docs(product): D61 small commits in the Builder (db99c115)
- refactor(skills): tighten /implement-project: commit unit by unit, the code and then its unit tests, and run layers and crap on the committed work (Halloween D61, from web-2) (5b8c5bc7)
- refactor(skills): tighten /outline-system: the folders line of the root has no braces to fill (from web-2) (b31d98f1)
- docs(product): first finding of web-2, an approval with a wrong ID (0f917f86)
- fix(core): log approved refuses an ID that names no spec, so that an approval never leaves the definition out of git (from web-2) (8e395026)
- docs(product): web-2 gets the shorter root AGENTS.md (f23905c9)
- refactor(skills): tighten /outline-system: a shorter Architecture, and Records with only what no skill gives (Halloween D59) (e9cb4851)
- docs(product): web-2 ready, its prompt and what to watch (62cfd29c)
- refactor(skills): tighten /outline-system: the commands for a human go to the README, not to AGENTS.md (Halloween D59) (40873ee0)
- refactor(skills): tighten the Assistant of the root AGENTS.md to one language line, with no wait rule (Halloween D60) (dd8350fc)
- fix(core): the index of shared also finds shared at the root of a project, as in an e2e (Halloween D59, from web-1) (26b85835)
- docs(product): D59 closed and done, D60 one language rule (e171ef50)
- refactor(skills): tighten the AGENTS.md templates into maps, one time rules at the root, and one language rule (Halloween D59, D60) (45f8851a)
- feat(core): aidd agents check and index; release refuses an AGENTS.md out of form and writes the index of shared (Halloween D59) (a527bd20)
- docs(product): D59 AGENTS.md is a map, short forever (e3803721)
- docs(product): D58 the registration validates its data (4107c790)
- docs(product): D57 the longer root scripts in tools/scripts/ (464b802b)
- docs(product): D56 one check that hides nothing (f776bfad)
- docs(product): D55 the root starts and tests everything (7bf89c16)
- docs(product): Builder fixes before web-2 or cli-2, and the AGENTS.md idea (3347d765)
- docs(product): D54 no function writes into an object that it gets (a8ded1e1)
- docs(product): user notes on web-1, web-1 closed, and D53 tools/ (e19a1f09)
- refactor(skills): tighten /architect-system-foundation and /outline-system for tools/lint/ (Halloween D53) (0ae9388d)
- docs(product): web-1 state, and evidence for the two open items (a98016ad)
- docs(product): web core session folder, from web-1 (a161eff3)
- docs(product): holdRoute release, from web-1 (4e39431e)
- docs(product): shared/values by type, from web-1 (cfbd3a43)
- docs(product): log write failure, from web-1 (0bd7b3aa)
- docs(product): web-1 core changes in cli-1 (2ce10af6)
- docs(product): web-1 core changes done (79316b7e)
- feat(core): one log folder for each day, with the output of each failed run; a commit has the type of its spec (Daylight, from web-1) (3d60ea4b)
- docs(product): two core candidates from web-1 (8c00ed35)
- docs(product): web-1 findings in Daylight (a5d8bf50)
- docs(product): web-I result (586cd93c)
- docs(product): review reads only source, in Daylight (8a105649)
- refactor(skills): tighten /review-implementation — read only the diff of the source, never a lock file or a record (07390ade)
- docs(product): database in memory, from web-I settings (27e8a405)
- docs(product): flaky read-before-wait test, candidate from web-I (e95e8549)
- docs(product): example data duplicates stay open until web-1 (d244fe7f)
- docs(product): card by name, from web-I users ship (d7c75aa4)
- docs(product): fake response, from web-I users (57024295)
- docs(product): scrypt cost, from web-I users (1a9bae5d)
- docs(product): D52 in Daylight (111a69a8)
- feat(core): spec new --from a spec file; build-archetype-foundation creates each foundation spec with no Architect (Halloween D52) (717e84e9)
- docs(product): D51 in Daylight (30921c1e)
- refactor(skills): tighten /craft-lasting-quality — a scan runs only for a red check (Halloween D51) (51d73b59)
- docs(product): D50 in Daylight (7937a24c)
- refactor(skills): tighten /build-requested-spec — drop the orchestrator check of layers and crap (Halloween D50) (9f4576e1)
- docs(product): D49 in Daylight (4db41e09)
- feat(core): the ship runs only the full acceptance suite; crap and the hook prove the unit tests (Halloween D49) (36bb2845)
- docs(product): route helpers for states, from web-I about (7cdcce4b)
- docs(product): D48 in Daylight (4c50db83)
- feat(core): a fix of high debt is approved when made and repairs the high items of its project (Halloween D48) (34821c80)
- docs(product): no guidance written for a weak model (17681374)
- docs(product): unstyled page of web-I; Grok 4.7 is not frontier (0178f7b9)
- docs(product): page.evaluate trap, from web-I shell (0c66b177)
- docs(product): role locators, from web-I shell (d70f0cc2)
- docs(product): the e2e gets the checks, from web-I shell (c5a2f73d)
- docs(product): trust, then check, in Daylight (380eed00)
- refactor(skills): tighten /build-requested-spec — trust the Builder, then check layers and crap (Daylight, from web-I) (95a954c2)
- docs(product): the import false alarm of web-I (4e536b88)
- fix(core): the duplicate check skips the names of an import on several lines (from web-I) (7a90261f)
- docs(product): D47 primitives of shared in the Bedrock (3d2fdb6c)
- docs(product): two Vite copies, found by the user in web-I (7a849394)
- docs(product): the eslint-disable of web-I came from the user (67444e27)
- docs(product): fourth web-I finding in Daylight (57ae1880)
- docs(product): third web-I finding in Daylight (e467a1f6)
- docs(product): web-I findings feed the Daylight runs (b8b6a2e6)
- docs(product): fix the Daylight runs path (8ed62a06)
- docs(product): Daylight runs recorded (8bb670f8)
- docs(product): Daylight runs cli-1 and web-1 ready (365c6760)
- refactor(skills): rename /build-ordered-specs to /build-archetype-foundation (Halloween D46) (4a540136)
- docs(product): Daylight, bedrock + foundation (D42-D45) (b7527022)
- docs(product): web-I runs in Cursor with grok-4.7 (41123668)
- docs(product): prepare web-I with D40 and D41 (b996d776)
- docs(product): D40 and D41 applied in the Builder (aed6183a)
- docs(product): web-H rule counts add up (09190b7e)
- docs(product): web-H result and post-mortem (c3db98ab)
- docs(product): D41, the seed project is the Prefab (54518bdd)
- docs(product): D41, the narrow screen also failed in Columbus (fffc2f56)
- docs(product): D41, the seed fixes recurring failures such as 375 px (ef7c2e10)
- docs(product): D41, seed project left open (4e45c777)
- docs(product): D41, the Blueprint passes layers and crap too (1ad230c8)
- docs(product): D41, core and shared subfolders; a clean Blueprint (3717963d)
- docs(product): D40 keeps one wiring contract test in shell (cedbf646)
- docs(product): D40, unit tests for everything but visuals; one main at the root (bdf49cac)
- docs(product): apply D39 to the Builder and prepare web-H again (811d016e)
- docs(product): web-G result and post-mortem (c0419970)
- docs(product): D39, infrastructure foundation is a chore; settings and an earlier presentation (9ca66936)
- refactor(skills): tighten /ship-spec (d8b45335)
- docs(product): web-G regression catches a monitoring break in shell (92ebadbf)
- docs(product): web-G ships monitoring; shell uses the new identity (8c9ebe6a)
- docs(product): vp dev starts Vite as a child; createServer runs in one process (9a58ccd0)
- refactor(skills): tighten /architect-system-foundation (6e8a5c2e)
- docs(product): prepare web-H (cccb4644)
- docs(product): web-G resumes with a 204 CORS preflight (a877c229)
- docs(product): web-G stops on a monitoring gap of the Blueprint (4ffb17c5)
- docs(product): web-G monitoring with no human stop (8d52fa71)
- docs(product): web-G through S0003, the first debt (30bd25b8)
- docs(product): web-G resumed with the same model (48ca2178)
- docs(product): web-G repairs the platform branch inside the spec (577de507)
- docs(product): the .lint copy out of format and lint (4521f64d)
- docs(product): web-G progress and the model capacity stop (cdf9df6c)
- docs(product): conditions/named names a condition as the code tests it (b0cddd60)
- docs(product): web-G finding, AIDDbot files out of format and lint (eeec7157)
- docs(product): web-G with the identity in the package.json of each project (ab34a83d)
- docs(product): the new Builder rules on archetype-cli, released as v0.4.16 (20f617a8)
- chore(archetypes): pin archetype-cli v0.4.16 (fba73909)
- docs(product): web-G checks the return type of exported functions (de4442bd)
- docs(product): web-F result, prepare web-G (720b2006)
- chore(archetypes): pin archetype-cli v0.4.15 (752ee261)
- docs(product): fix the web-F path (4f53409f)
- docs(product): web-E result, prepare web-F (d92037cf)
- feat(core): a structure finding makes the layers run red (3903bb1d)
- refactor(skills): tighten /implement-project: layers and crap green before the Builder returns (b0b0ba9e)
- refactor(skills): tighten /build-ordered-specs: the list approves its high-debt fixes in advance (979de8f6)
- refactor(skills): tighten /scan-quality: a full folder divides by the closed list of concerns (c5aa4ffd)
- refactor(skills): tighten /scan-quality: core folders count toward the size limit (a44e4bee)
- docs(product): web-E finding, SQLite EBUSY on cleanup (7a0d3391)
- docs(product): web-E finding, invented #core alias (fb880ce7)
- docs(product): prepare web-E (bc8fb879)
- chore(archetypes): pin archetype-cli v0.4.14 (7d6a4da9)
- refactor(skills): tighten /architect-system-foundation: each project gets a copy of the identity (e757425e)
- chore(archetypes): pin archetype-cli v0.4.13 (2d6bfa4e)
- refactor(skills): tighten /outline-system: the limits of code in the Blueprint (caddee12)
- refactor(skills): tighten /craft-lasting-quality: a patch ends crap green, the core checks (1cd2d32d)
- chore(archetypes): pin archetype-cli v0.4.12 (826696ad)
- chore(archetypes): pin archetype-cli v0.4.11 (d2d71011)
- chore(archetypes): pin archetype-cli v0.4.10 (0299208b)
- refactor(skills): tighten /outline-system: a condition is a name (4ef0287c)
- chore(archetypes): pin archetype-cli v0.4.9 (e80aa124)
- docs(product): lint by import aliases and local files (adcd2367)
- docs(product): fix the web-D path (64ba5947)
- docs(product): prepare web-D (f50e30a4)
- refactor(skills): tighten /architect-system-foundation and /rule-project: one crap command (7c175ed1)
- refactor(skills): tighten /define-spec: specs within the size limits (00150105)
- feat(core): log approved refuses a spec over its size limits (2628ec67)
- chore(archetypes): pin archetype-cli v0.4.8 (652f69da)
- refactor(skills): tighten /outline-system: a Blueprint of code rules only (6279bd47)
- chore(archetypes): pin archetype-cli v0.4.7 (e4c78013)
- refactor(skills): tighten /ship-spec and /rule-project: AGENTS.md under 100 lines (37df4b52)
- refactor(skills): tighten /outline-system: a root AGENTS.md under 100 lines (498eb039)
- chore(archetypes): pin archetype-cli v0.4.6 (19b78cc4)
- refactor(skills): tighten /outline-system: architecture in each project (937f7512)
- docs(product): web-C report (2ed1313f)
- chore(archetypes): pin archetype-cli v0.4.5 (ee17683d)
- refactor(skills): tighten /outline-system: a shorter Blueprint (763b2916)
- chore(archetypes): pin archetype-cli v0.4.4 (92e03cd5)
- docs(product): web-B report and the fixes before web-C (08586afc)
- docs(product): prepare web-C (de7df2db)
- docs(product): web-B tracking, its stop, and the fixes for the next run (9cec1461)
- refactor(skills): tighten /review-implementation: project rules check dependency manifests and lint configuration (e7a8afc9)
- refactor(skills): tighten /build-ordered-specs: fresh agents for each spec and repair (3e6b8974)
- docs(product): prepare web-B (f421d231)
- docs(product): web-A fixes already in place and the plan before the Web seed (af5db190)
- refactor(skills): tighten /outline-system: a framework callback sits in its allowed file, no lint comment (88baf7ba)
- refactor(skills): tighten /implement-project and /define-spec after cli-C and web-A (bf7a8f10)
- docs(product): web-A finding: the about page fetches with useEffect (9c3ddba4)
- docs(product): web-A: a second lint exception in back (f14ebf36)
- docs(product): web-A: the parameter limit hits every middleware (a854483f)
- docs(product): web-A finding: a Windows-only script to prove the clean stop (c19e8fdc)
- docs(product): web-A finding: a lint exception for the Express middleware signature (f216ca1f)
- docs(product): web-A D0001 repaired by injection (29964bf7)
- docs(product): first web-A finding (ab97d11b)
- chore: pin Archetype CLI v0.4.3 (6d297bcf)
- docs(product): web-A gets the Archetype CLI round (15ed04bf)
- docs(product): the limit files at the root, not in .lint (03375f23)
- refactor(skills): tighten /architect-system-foundation: the limit files sit at the root (c80f6027)
- refactor(core): number specs only from .product/specs, the archetype specs included (8f9b401d)
- refactor(skills): tighten /architect-system-foundation: the archetype brings shipped specs (da32a506)
- docs(product): Archetype CLI hand improvements and what they owe the Blueprint (9c2dabb8)
- docs(product): web-A watches the modern style of Express and React (3f9a0949)
- docs(product): web-A prepared: Archetype Web from the Blueprint with React (8f899f75)
- refactor(skills): tighten /implement-project: a spec adds its tag next to the old one (f4a0b814)
- docs(product): D38 Archetype Web on Express and React (7e4fb0b0)
- docs(product): D38 Archetype Base rebuilt as Archetype Web (10b2b997)
- docs: an archetype is a whole solution, never a library (Halloween D28) (e0f3a383)
- refactor(skills): tighten /architect-system-foundation (Halloween D28) (8105a99d)
- docs(product): Archetype CLI 0.4 seeded from cli-C; the gate finds a lost tag (07a89637)
- docs(product): cli-C findings and the hand fixes before the seed (386691d1)
- docs(product): clean cli-C run replaces cli-B2 as the source of the archetype (8be5db02)
- docs(product): plan after cli-B2: seed, whole-workspace copy, greenfield proof (48e2e2b4)
- docs(product): cli-B2 prompt to repair the mocked unit tests (feb87f85)
- docs: debt slots named layers and crap (Halloween D37) (abc721da)
- refactor(skills): tighten slot contracts as layers and crap; e2e start needs no UI package (Halloween D37) (4523cb82)
- refactor(core): debt slots named layers and crap (Halloween D37) (9caba5be)
- docs(product): cli-B post-mortem (ec410e6b)
- docs(product): D37 debt slots named layers and crap (59bf33c5)
- docs(product): cli-B lint exception for mocked file imports (f742e9b8)
- docs(product): normalize line endings after cli-B (fc20ce5d)
- docs(product): cli-B human interventions with times (88cbfe02)
- docs(product): D35 fix, configuration declares the logger settings (e6215952)
- docs(product): cli-B watch list for D35 and D36 (449d1b0e)
- docs(product): D35 health out and no cli database, D36 closed dependency list; cli-B without health (1522733b)
- docs(product): cli-B prepared with coverage as low debt (c58dfff7)
- refactor(skills): test coverage is low debt (88ff8f99)
- docs(product): cli-A closed, cli-B prepared (42ec9383)
- feat(core): commit refuses text with garbled characters (09f4db3e)
- fix(core): run summaries skip table rules and pattern lists (7df3ecf5)
- feat(core): a medium debt item names its project, and its refactor groups by it (a968e63d)
- docs(product): cli-A run notes (36dc48f7)
- refactor(core): a spec is one file, specs/{type}/{key}.md (91f4510b)
- docs(product): cli-A prompt and run notes (64063705)
- fix(core): run summaries skip npm error lines and name each command of a slot (db944e70)
- docs(product): cli-A prepared (abe62582)
- docs(product): projects in projects/ (D1b) (eed9dbe0)
- refactor(skills): tighten /outline-system (c33b83e0)
- refactor(skills): tighten /rule-project (a1df4f2a)
- docs(product): cli-9 fixes status (77ea71f8)
- docs: debt repairs grouped by project (9b9076d0)
- refactor(skills): tighten /craft-lasting-quality (ec75b84e)
- feat(core): a refactor from debt repairs the open medium items of one project together (15753130)
- docs(product): cli-9 note on the argument parser (f221f98e)
- docs(product): cli-9 coverage note covers shared too (1fc3542f)
- docs(product): cli-9 findings after configuration (ecb2c329)
- docs(product): cli-9 note on hook activation (a39a6e13)
- docs(product): cli-9 fixes for the Blueprint (a28c35d3)
- docs(product): the no-data rule of unit tests is done (11ef2a7b)
- docs(product): step 3 done (d47f837a)
- docs(product): step 1b done (bc106a5f)
- docs: debt slots by level, test:spec, unit tests in the hook (step 1b) (4362c48c)
- refactor(skills): tighten /build-ordered-specs (5b13d06c)
- refactor(skills): tighten /review-implementation (b5c56fd8)
- refactor(skills): tighten /verify-behavior (eef3d75f)
- refactor(skills): tighten /ship-spec (b6b24a55)
- refactor(skills): tighten /outline-system (fada36bf)
- refactor(skills): tighten /architect-system-foundation (cf5b6064)
- refactor(skills): tighten /implement-project (3a86fa60)
- refactor(skills): tighten /craft-lasting-quality (c227b835)
- refactor(skills): tighten /scan-quality (b670bbd4)
- refactor(skills): tighten /rule-project (e592583c)
- feat(core): a fix cites the failing test that it repairs, and its verification runs that test again (33e8d552)
- refactor(core): debt slots by level, test:spec for the tests of a spec, no --changed (1323d8f1)
- docs(product): step 3 decisions 3 and 4 — debt slots in the core, test:spec (ae851eec)
- docs(product): step 3 decisions 1 and 2 — flat workspace layout, unit tests in the hook (491706e9)
- docs(product): step 2 — the base is on master (ee77f74c)
- docs(product): step 2 — debt scripts, coverage, identity (f35235fa)
- docs(product): step 2 result — Vite+ passes; changes for the Builder (3947429c)
- docs(product): step 2 goes with Vite+ (91d69138)
- docs: quality gates in the engineering and principle docs; decision recorded (ce0ecd00)
- refactor(skills): quality gates — each skill checks its own work, only the ship checks all (4575cc80)
- fix(core): a commit that the pre-commit hook refuses shows the hook output (8a6d13d9)
- feat(core): spec debt makes the minimal spec of a debt item; gate by type (763a6de5)
- refactor(core): drop lint and format gates; high debt records a shipped failure (e568d15e)
- docs(product): quality gates reminders (721f3f2f)
- docs(product): quality gates handoff for a new session (ff0e6e8d)
- docs(engineering): quality gates decisions (e875d0ce)
- docs(engineering): quality gates draft (d4df10e7)
- docs(product): idea, start from Vite+ (6b2614f2)
- docs(product): cli-8 post-mortem (7557fcac)
- docs(product): cli-8 prompt and watch list (fbd59f6d)

## 0.3.21 - 2026-10-15

- refactor(skills): tighten /implement-project: an acceptance test checks only the items its spec owns (Halloween cli-7) (d2d9b0f)
- refactor(skills): tighten /verify-behavior to run and triage the full regression; --major only on request (Halloween D32-D34) (f7fb33b)
- refactor(core): specs in a folder for each type; a green verification needs the full suites (Halloween D32, D33) (0efb4e0)
- docs(product): cli-7 post-mortem (aa555b7)
- fix(core): journal summaries drop every quote and pictograph (8ac6649)
- fix(core): journal summaries drop quotes, keep apostrophes inside words (d5a9e6a)
- docs(product): idea on specs grouped by type (97e5c7c)
- refactor(skills): tighten the record language to the language of system.md (Halloween D31) (e168bfa)
- refactor(skills): tighten /craft-lasting-quality: no scan while high or medium debt is open (Halloween D30) (cce07c5)
- refactor(skills): tighten report paths to .aiddbot/logs (Halloween D29) (d0e34ef)
- refactor(core): evaluation reports are process, in .aiddbot/logs (Halloween D29) (0d34c06)
- docs(product): D28 archetype is the whole solution (206cfd6)
- docs(product): ideas on catalog naming and builder folder (3c328fb)
- docs(product): cli-7 prompt and watch list (abd8e72)

## 0.3.20 - 2026-10-15

- refactor(skills): tighten paths to .aiddbot/logs and .aiddbot/debt.json (Halloween D27) (9190421)
- refactor(core): one owner per dot folder (Halloween D27) (e594333)
- docs(product): idea on dot folders (6f7f10b)

## 0.3.19 - 2026-10-14

- chore(skills): pin archetype-base v0.3.14 (b5e0a53)
- docs(product): cli-6 review applied (1d47d57)
- refactor(skills): tighten /craft-lasting-quality: quick repair for each scan item, a no-effect repair is a fix; one source for each definition (Halloween cli-6) (e4322bc)
- docs(product): cli-6 preventive code review (7736d44)
- docs(product): cli-6 results; routes and quick quality repairs as ideas (48b837d)
- docs(product): no quality gate per spec (81b9a3d)
- docs(product): cli-6 complexity regression and closing code review (cd01ce2)
- docs(product): cli-6 notes: lint autofix, shared check primitives gap (f79be74)
- refactor(skills): tighten /ship-spec and /rule-project: lint applies safe fixes, format runs last (a743865)
- docs(product): cli-6 Builder commit (9acd259)
- docs(product): cli-5 results and repairs; cli-6 watch list (4df76c4)
- refactor(skills): Requirements gate in the review, test repairs as refactor, e2e starts projects only by start (Halloween cli-5) (0014de2)
- refactor(skills): tighten /craft-lasting-quality with a quick repair for hardening items (Halloween cli-5) (8d63865)
- docs(product): path to archetypes in series (68a8cee)
- docs(product): cli-6 expected scaffold version (01f751c)
- docs(product): cli-6 plan, build-ordered-specs from the manifest (a7c4c86)
- feat(skills): add /build-ordered-specs; define-spec on a system with no project (Halloween cli-6) (9e3bf31)
- docs(product): cli-6 megaprompt, tools from the scaffold spec (653abae)
- docs(product): cli-6 megaprompt follows the whole procedure (a0ae395)
- docs(product): cli-6 megaprompt, YOLO decides, no final lint (54ea8f8)
- docs(product): cli-6 megaprompt in one session, rules from the procedure (88d7a29)
- docs(product): cli-6 megaprompt, specs from the procedure (654c6f4)
- refactor(skills): a chore spec can scaffold a project (Halloween cli-6) (5a4117b)
- docs(product): cli-4 stops, cli-5 megaprompt, one-line prompt and chore scaffold proposals (564b60b)
- docs(product): cli-3 lessons and cli-4 plan, one Codex session per step (1488e26)
- chore: pin Archetype Base v0.3.13 (harden slot, lint errors only) (637870d)
- docs: harden slot, low debt per rule at the end of craft (Halloween D26) (4a87af3)
- refactor(skills): harden as the final polish of craft; lint reports errors only (D26) (d767ac1)
- feat(core): harden run kind, never evidence (Halloween D26) (31515ce)

## 0.3.18 - 2026-10-14

- docs(product): cli-3 plan and gates implemented (9ab4fb7)
- refactor(skills): one gate per step, regression and triage at ship (D22–D25) (53d6395)
- feat(core): run --changed, spec-scoped verification evidence, full regression at release (aa04de1)
- docs: one gate per step, full regression at release (Halloween D22–D25) (7a140f0)
- docs(product): cli-2 session 1 notes and the resume point (7b11622)
- refactor(skills): tighten /craft-lasting-quality to group debt by type (62ae23e)
- docs(product): cli-2 e2e note points to the define-spec rule (3c681e1)
- refactor(skills): tighten /define-spec (e4845f7)
- docs(product): cli-2 note on the e2e black-box break (06315a8)
- refactor(skills): tighten /define-spec (2978179)
- docs(product): cli-2 megaprompt asks for ASD-STE100 English (b36e081)
- docs(product): cli-1 notes and the resumable cli-2 script (5384027)
- docs(product): D19 scans only at the start and the end of a craft run (c83d92d)
- refactor(skills): tighten /craft-lasting-quality to scan only at the start and the end (2659238)
- refactor(skills): an e2e project has no unit tests (Halloween D18) (058cfeb)
- docs(product): D18 start runs every project type (4b0f05d)
- docs(product): fix the Windows paths of the 3.2 script (0f132a6)
- docs(product): 3.2 builds Archetype CLI from an empty scaffold and its specs (d2024b1)
- docs(product): 3.2 runs in experiments/halloween/cli-1 (1f806b2)
- docs(product): 3.2 foundation prompt names no capabilities (f254204)
- docs(product): Halloween 3.2 experiment script (d35e48c)

## 0.3.17 - 2026-10-13

- chore: pin Archetype CLI v0.3.13 (d1b20da)

## 0.3.16 - 2026-10-13

- docs(product): D19 crafts after each foundation spec (a49387d)
- refactor(skills): tighten /craft-lasting-quality to repair all debt by priority (Halloween D19, D20) (b3c1e49)

## 0.3.15 - 2026-10-13

- chore: pin Archetype Base and Archetype CLI v0.3.12 (2bfa9e7)
- feat(core): one test slot, with the project type in the config (Halloween D18) (f26f02c)

## 0.3.14 - 2026-10-13

- refactor(skills): name the project types api, web, cli and e2e (Halloween D17) (9f01e6e)
- refactor(skills): tighten /define-spec with the problem, solution and verification trio (2a61b0d)
- docs(product): foundation for any archetype, D12-D15 (d9117f4)

## 0.3.13 - 2026-10-13

- docs: libraries only, and the Archetype Builder (642dfd8)
- refactor(skills): tighten /architect-system-foundation to offer only libraries (D5) (96fde8b)
- refactor(skills): tighten /define-spec with a generic spec file (D10) (bc2784e)
- docs(product): Builder inventory, D10 and D11, phases 1 and 2 done (2d93147)

## 0.3.12 - 2026-10-13

- chore(release): libraries share major.minor, patches are independent (D6) (e04c47f)
- refactor(skills): tighten /architect-system-foundation for independent library patches (D6) (29e6bf9)
- docs(product): plan the Halloween sprint (51ee5a9)

## 0.3.11 - 2026-10-11

- chore(skills): add Archetype CLI as a library, pin v0.3.11, and record D68 (2072f33)
- refactor(skills): tighten /outline-system for cli acceptance tests (3756348)
- refactor(skills): tighten /architect-system-foundation migrations for a local cli (e563089)
- refactor(skills): tighten /outline-system for applications with local data (0b0c685)
- refactor(skills): tighten /architect-system-foundation for a local cli (74e88f6)

## 0.3.10 - 2026-10-11

- chore(skills): pin Archetype Base v0.3.10, and record D66 (ea45673)
- docs: progressive onboarding, how-it-works and core pages (95c56db)
- fix(core): drop the --allow-git flag from the install help (e1fd967)

## 0.3.9 - 2026-10-09

- chore(skills): pin Archetype Base v0.3.9, and record D65 (f0d8117)
- refactor(skills): tighten /define-spec and /implement-project (ba5dca9)
- refactor(skills): no layer skips the next one (7b2fe1e)
- refactor(skills): tighten /craft-lasting-quality (1e2c568)
- refactor(skills): tighten /architect-system-foundation (b010f4a)

## 0.3.8 - 2026-10-09

- chore(skills): pin Archetype Base v0.3.8, and record D64 (679edc6)
- refactor(skills): tighten /rule-project (0985f46)
- refactor(skills): tighten /rule-project (be32cab)
- refactor(skills): tighten /review-implementation (d07ccda)
- refactor(skills): tighten /verify-behavior (f12270d)
- refactor(skills): tighten /scan-quality (c86ffab)
- refactor(skills): tighten /ship-spec (e74161b)
- refactor(skills): tighten /outline-system (3f69128)
- refactor(skills): tighten /define-spec (2a0e5a5)
- refactor(skills): tighten /implement-project (7d60790)

## 0.3.7 - 2026-10-09

- chore(skills): pin Archetype Base v0.3.7, and record D63 (b2ee19b)
- refactor(skills): wait long for agents, and stop after a red foundation (62154b4)
- refactor(skills): tighten /outline-system (1847b37)
- refactor(skills): the foundation close journals nothing (aea485a)
- refactor(skills): journal the approval of a YOLO proposal too (c2d955a)

## 0.3.6 - 2026-10-08

- chore(skills): pin Archetype Base v0.3.6, and record D62 (88db113)
- refactor(skills): deliver the foundation specs also when no features are asked (9f49386)
- fix(core): never commit installed dependencies (83f83f5)
- refactor(skills): keep commit messages as the skills write them (1333eea)
- refactor(skills): offer Archetype Base first, and let agents write their records (373404f)

## 0.3.5 - 2026-10-08

- chore(skills): pin Archetype Base v0.3.5, and record D61 (9f7402e)
- refactor(skills): fresh agents, root approval, and a quality loop (3b7b7f9)
- feat(core): refuse work on a spec before its approval (a89072e)

## 0.3.4 - 2026-10-08

- chore(skills): pin Archetype Base v0.3.4, and record D59 and D60 (a4f15db)
- refactor(skills): shorter AGENTS.md files with a Common stack and a lean index (8d1fbd3)
- docs: align the principles and the engineering docs with the process (fb96452)
- refactor(skills): align the Blueprint with the delivery rules (e155ac3)
- feat(core): unit blocks a green verification, and quality finds duplicated blocks (6bc4a02)

## 0.3.3 - 2026-10-08

- chore(skills): pin Archetype Base v0.3.3 (D58) (2a857b8)
- docs(product): close the 0.3.3 patch items (79d2be7)
- refactor(skills): tighten the spec flow and the Base scaffold (00f00ba)
- feat(core): log approved commits the spec definition (K3) (ccaf745)
- docs(product): pin the cause of K12 from the exported session (e53ef2e)
- docs(product): note the token budget of the 0.3.2 run (3c4508e)
- docs(product): add the S0010 notes to the 0.3.3 patch (21b3a7b)
- docs(product): add the S0009 notes to the 0.3.3 patch (e112ca8)
- docs(product): start the 0.3.3 patch notes from the 0.3.2 run (33b7e97)
- chore(release): AIDDbot and Archetype Base share one version (D58) (740a428)

## 0.3.2 - 2026-10-08

- feat(core): one aidd run at a time, and a RUNNING log until it ends (D57) (94cfbdf)
- test(core): split the core tests by topic so they run in parallel (625ceec)

## 0.3.1 - 2026-10-08

- test(core): cover spec IDs after the archetype foundation specs (457e6bd)
- refactor(skills): tighten /review-implementation and /outline-system (86afe4b)
- refactor(skills): tighten /architect-system-foundation for Archetype Base (D56) (281166c)
- docs(product): record D56, one green close proves the Archetype Base foundation (d8a2c8e)
- docs(engineering): add the principles of the development (e88073e)
- docs: principles out of scope (54d5e56)
- chore(skills): pin Archetype Base v0.3.0 Columbus (D55) (597b543)
- docs(product): mark the 0.3.0 Columbus release in the plan (5813d54)

## 0.3.0 - 2026-10-07

- chore: set the Columbus codename (0153e5b)
- refactor(skills): tighten /architect-system-foundation (93e0973)
- docs(product): summarize the codex-13 validation of Archetype Base (94879ac)
- chore(skills): pin Archetype Base v0.2.1 and anchor the data ignore (cbba3b5)
- chore(agents): one model per harness for Copilot and Cursor (be65d64)
- docs(product): plan the 0.3.0 delivery with Archetype Base (1d8e350)
- docs(product): bring the Columbus release notes up to Archetype Base (3230a45)
- refactor(skills): tighten /ship-spec (02366b8)
- refactor(skills): tighten /architect-system-foundation (631d89a)
- docs(product): archive cli-node once a CLI enters Archetype Base (694b535)
- docs(product): mark the replaced archetype repos as archived (df72a8c)
- docs(product): record D54, Archetype Base seeded from codex-12 (ed1439b)
- docs(product): review codex-12 against the v0.2.8 and v0.2.9 Blueprint (3821e8e)
- docs(product): summarize the codex-12 archetype preparation (S0021–S0023) (7e158ad)
- refactor(skills): fix formatting in upgrade request section (f2cf74c)
- refactor(skills): tighten /craft-lasting-quality (fc69e2a)
- refactor(skills): tighten /build-requested-spec (19ec45a)
- refactor(skills): tighten /architect-system-foundation (61b2af1)
- refactor(skills): tighten /architect-system-foundation (a850904)
- refactor(skills): tighten /architect-system-foundation (563c593)
- refactor(skills): tighten /maintain-skills (8e23a2d)
- refactor(skills): tighten /architect-system-foundation (9e4694a)
- docs(principles): update various principle documents with new links and content adjustments (a8038aa)

## 0.2.9 - 2026-10-06

- fix(core): refuse release and integrate of code changed since its last lint (93792e4)
- docs(product): add S0019, S0020 and the format gap to the codex-12 summary (64e0ed4)
- fix(skills): keep record styles out of the copied theme files (c7dc5ae)
- feat(skills): add the record table to the record-views foundation spec (f6df627)
- feat(skills): add the record-views foundation spec (63bb02d)
- refactor(skills): state the hidden side of session states in the foundation specs (f96ade2)
- docs(product): add the codex-12 craft pass to its summary (b709cc6)
- refactor(skills): let a failing unit test block and gather the test principles (624f8bd)

## 0.2.8 - 2026-10-06

- refactor(skills): tighten the Blueprint after codex-12 (c255ef3)
- docs(product): summarize the codex-12 experiment (3d0495b)
- docs(product): prepare the codex-12 experiment for v0.2.7 (589ccef)

## 0.2.7 - 2026-10-06

- refactor(skills): apply the lean principles to the Blueprint and foundation (55725d7)
- docs: close open points in the principles and add security (01940ca)
- docs: add lean technology-free principles in docs/principles (432a3eb)
- refactor(skills): tighten /outline-system with the spec-only checks rule (5b89add)
- docs: shorten the coding rules and align them with the Blueprint (22e7485)
- docs: let all feature layers use the facades of other features (dea916b)
- refactor(skills): tighten /architect-system-foundation and /outline-system (f7e877c)
- feat(skills): add the about page and readable dates to the foundation (6dec7c0)
- docs: write the public docs in ASD-STE100 (8f78e6f)
- docs: bring the user docs in line with 0.2.6 (b9aa0cb)

## 0.2.6 - 2026-10-05

- docs(columbus): record codex-11, which validates 0.2.6 (7ecef57)
- feat(core): journal the plan of each implementation before its first edit (7eea22a)
- fix(skills): copy the theme files with a system copy command (570d91d)
- fix(skills): parameters, value objects and boundary tooling in the Blueprint (3ef703e)
- fix(skills): e2e fixtures and suite stop in /architect-system-foundation (11aacf8)
- feat(skills): ship the brand theme in /architect-system-foundation (75a4f29)
- fix(skills): explain the double-click test of basic-auth R11 (433c87e)
- Merge branch 'refactor/short-agents-md' (94070fe)
- refactor(skills): shorten specs in /define-spec and the foundation specs (ac970c8)
- refactor(skills): move the Blueprint to the root AGENTS.md and shorten project AGENTS.md (dfd0699)

## 0.2.5 - 2026-10-05

- docs(columbus): record cursor-10, which validates 0.2.5 (4a21524)
- docs(columbus): plan 0.2.6 shorter AGENTS.md (b3bc9a2)
- docs(columbus): start cursor-10 notes (5911efd)
- fix(agents): write Cursor adapter names without quotes (7a1c8f1)
- docs(columbus): mark 0.2.5 plan done and prepare codex-10 (47e4e13)
- feat(skills): bring codex-9 specs into the foundation of /architect-system-foundation (54afe9c)
- refactor(skills): tighten /architect-system-foundation and /scan-quality (492bb58)
- docs(columbus): plan 0.2.5 (5867840)
- feat(core): journal each run with the tool's summary line (7bfa6c9)
- docs(columbus): record codex-9 lessons, D49 and batch 5 comparison guide (b1b3503)
- refactor(skills): tighten /architect-system-foundation (4568ae1)
- refactor(skills): tighten /architect-system-foundation (247c620)

## 0.2.4 - 2026-10-04

- refactor(skills): tighten /review-implementation (0398fd3)
- refactor(skills): tighten /architect-system-foundation (a14862b)
- refactor(skills): tighten /architect-system-foundation (0809551)
- refactor(skills): tighten /scan-quality (fa6c1ac)
- refactor(skills): tighten /architect-system-foundation (027cde8)
- refactor(skills): tighten /architect-system-foundation (d625c4e)
- docs(product): summarize the codex-8 Columbus experiment (4e257cf)
- refactor(skills): tighten /architect-system-foundation (6a5742f)
- refactor(skills): tighten /architect-system-foundation (c1abd49)
- refactor(skills): tighten /architect-system-foundation (c69c57d)
- docs(product): summarize the claude-7 and codex-7 Columbus experiments (771b750)
- refactor(skills): tighten /architect-system-foundation (2ce54c8)
- refactor(skills): tighten /architect-system-foundation (daa7da3)
- docs(product): point the Columbus canary at core importing a feature (9076b1d)
- refactor(skills): tighten /architect-system-foundation (68d188b)
- merge: integrate origin/main v0.2.3 with local Columbus work (651f442)
- refactor(skills): tighten /implement-project (8b5fb3f)
- refactor(skills): tighten /architect-system-foundation (953a9da)
- feat(core): refuse a commit whose project was not linted on the same files (cf97692)
- docs(product): summarize the codex-6 Columbus experiment (40c1a07)
- refactor(skills): tighten /architect-system-foundation (9f15455)
- docs(product): group shared by concern and features by domain (P23) (b913234)
- docs(product): summarize the claude-6 Columbus experiment (60a8e73)
- fix(bin): start new repos on main unless git sets a default branch (3fcd2ea)
- refactor(skills): tighten /architect-system-foundation (aca391f)
- refactor(skills): tighten /architect-system-foundation (580725d)
- docs(product): summarize the codex-5 Columbus experiment (bd70ddc)
- refactor(skills): tighten /build-requested-spec (459f2cc)
- docs(product): build library archetypes test-first from the conformance suite (60572a0)
- docs(product): build library archetypes on a conformance bench (6838242)
- refactor(agents): run every Codex tier on gpt-6.1-sol with Claude's effort levels (137ff3a)
- docs(product): compare each experiment batch with the archetypes (150bfbf)
- docs(product): name Archetype Builder and Archetype Base (d80ea89)
- docs(product): split archetypes into AIDDbot, Archetype-Builder and library (3f15618)
- docs(product): close P22 with a neutral Pico base and a brand theme (2f8bdf4)
- docs(product): plan a separate archetype repo and the front visual layer (71c6df3)
- docs(product): add the Columbus guide to compare experiments with archetypes (68feb25)
- docs(product): set Columbus direction after the claude-4 experiment (af31326)

## 0.2.3 - 2026-10-04

- refactor(skills): tighten /architect-system-foundation (a023965)
- refactor(skills): tighten /architect-system-foundation (d5be590)
- refactor(skills): tighten /architect-system-foundation (a63cdba)
- docs: add the coding rules and limits for new projects (fa98053)
- refactor(skills): tighten /architect-system-foundation (30f781c)
- docs(product): mark Columbus phase 4b done and update release notes (4b7450e)
- refactor(skills): tighten /architect-system-foundation (cde8b48)
- docs(product): record D36–D39 and the architecture guide (5844814)
- docs(product): record D35 from the claude-4 experiment (4e7357d)
- refactor(skills): tighten /implement-project (a5184e8)
- refactor(skills): tighten /review-implementation (0d8c49a)
- refactor(skills): tighten /architect-system-foundation (6f82a3f)
- docs(product): record the claude-4 Columbus experiment (57fc7b6)
- refactor(skills): write all foundation specs and the fix template in STE (0e52fad)
- docs: describe the Columbus foundation and draft its release notes (2e202a9)
- docs(product): name the Baseline web APIs in experiment prompt F (f590d5b)
- refactor(skills): let acceptance tests carry requirement IDs as tags (ee97b9c)
- refactor(skills): close the foundation without repairs; cover auth page reuse (1c722e0)
- docs(product): correct the codex-3 summary with its full transcript (1838bf6)
- docs(product): summarize the codex-3 experiment in Columbus notes (f82a0e5)
- fix(core,skills): close three codex-3 findings (8c2b4bd)
- docs(product): let D32 set the JS/TS stack in experiment prompt A (d037df1)
- docs(product): add codex-2 transcript findings to Columbus notes (7c13780)
- fix(skills): check Vue components in the oxlint boundary reference (a614a79)
- refactor(skills): keep only the own project type in project AGENTS.md tables (3742ed8)
- docs(product): point Columbus experiments at the experiments folder (122eeed)
- docs(product): summarize the codex-2 experiment in Columbus notes (f777667)
- fix(skills): put the monitoring log writer in shared/data (c91469c)
- fix(core): put -- before core arguments of npm scripts (8c5c22e)
- refactor(skills): let every layer use shared/logic primitives (2bd240e)
- fix(skills): name the layers in oxlint cross-feature boundary patterns (1077d6d)
- feat(skills): add oxlint boundary reference for JS/TS projects (db70a31)
- refactor(skills): type-check JS/TS with oxlint, without tsc (74fae40)
- refactor(skills): require TypeScript 7 and the oxc stack for JS/TS (7fa3c72)
- refactor(skills): tighten /architect-system-foundation (41edf9f)
- refactor(skills): pilot ASD-STE100 in project AGENTS and spec templates (01076f9)
- docs(product): add Columbus experiment prompts and checklist (5e68367)
- docs(product): summarize the codex-1 post-mortem in Columbus notes (6eb337d)
- refactor(skills): tighten /architect-system-foundation from codex-1 (13d81b1)
- fix(skills): keep Columbus decision IDs out of project AGENTS.md text (e0da0f0)
- fix(core): record spec runs per kind and project (f33a80d)
- refactor(skills): tighten /architect-system-foundation (d6f67da)
- refactor(skills): tighten /architect-system-foundation (5ab6e2a)
- refactor(skills): tighten foundation for shared primitives (21ff25a)
- chore(bin): stop treating .agents/rules as an overlay tree (3211358)
- refactor(skills): tighten /architect-system-foundation (de93cf5)
- refactor(skills): tighten /architect-system-foundation (d0c8c34)
- feat(core): add upgrade run kind; dependencies through the package manager (2bf1c53)
- refactor(skills): tighten /architect-system-foundation (a76780d)
- refactor(skills): tighten foundation and delivery skills for project AGENTS.md (8bf7915)
- feat(core): add format run kind and not-applicable slots (e9d80a4)
- refactor(skills): tighten /architect-system-foundation (7d18242)
- feat(skills): add foundation specs to /architect-system-foundation (ad9e5b9)
- refactor(skills): tighten /architect-system-foundation (9b935f4)
- refactor(skills): tighten /architect-system-foundation (c978219)
- docs(product): close Columbus P15-P18 with decisions D20-D23 (acac40f)
- docs(product): rewrite Columbus plan from principles and D16-D19 (5794fae)
- docs(product): align Columbus decisions with principles (D16-D19) (c02db8d)
- docs(product): add Columbus fundamental principles in ASD-STE100 (eb67631)
- docs(product): close Columbus P14, P19 and P20 with decisions D13-D15 (81bbd2b)
- refactor(skills): tighten /architect-system-foundation (65df404)
- docs: author (5541b03)
- docs(readme): add version and codename badges (328918c)
- docs(product): archive Oktoberfest proposals and deterministic-core notes (d2f443d)
- docs(product): open Columbus sprint with decisions D1-D12 and draft plan (008a8f7)

Pending changes included in this release:

```text
M package-lock.json
```

## 0.2.2 - 2026-09-30

- refactor(skills): tighten /implement-project (aa2d77f)
- Revert "refactor(skills): tighten /rule-project" (cbeadb1)
- refactor(skills): tighten /rule-project (7b117bf)

## 0.2.1 - 2026-09-30

- refactor(skills): tighten /build-requested-spec and /craft-lasting-quality (6a91e74)

## 0.2.0 - 2026-09-30

- feat(core): orchestrators journal a handoff whenever they send work to another agent (c7f4248)
- docs: say that Copilot's newest models may fall short of the supported line (2d2f267)
- docs: models from 2025 and earlier are no longer supported (ef516a2)
- docs(product): record decisions D54-D60 and set the Oktoberfest codename (f020673)
- refactor(skills): /outline-system also commits the model before the root instructions (b82dc77)
- refactor(skills): the scaffold commits each project so the journal times its install (e41a776)

## 0.1.31 - 2026-09-30

- refactor(skills): spec type by observable change; the Builder owes E2E tests for every requirement (a6bfcb4)
- refactor(core): the PRD lists shipped features only (f9278c5)
- refactor(skills): /outline-system commits each project's schemas as it goes (f966611)
- feat(core): aidd commit journals every skill milestone; the foundation journals its own verdict once (302f710)

## 0.1.30 - 2026-09-30

- refactor(skills): specs no longer list shipped requirements; regressions are triaged when they fail (787c907)
- refactor(core): the generated spec index becomes .product/PRD.md (35a122a)
- refactor(skills): scoped acceptance for the Builder and a shorter spec for fix, refactor and chore (58ef41f)

## 0.1.29 - 2026-09-30

- test(core): expect the journal level column (bd2af16)
- refactor(core): journal lines carry INFO, WARN or ERROR before the summary (2501055)
- refactor(skills): tighten scope, qualification and scan; core commits the spec counter (216a2a0)

## 0.1.28 - 2026-09-29

- Merge branch 'feat/scaffold-and-approvals' (0569e41)
- feat(skills): scaffold on approval and journal approvals (04e42a8)
- feat(agents): model tiers per harness and a local override applied on update (a10ad2f)

## 0.1.27 - 2026-09-29

- Merge branch 'refactor/flaky-repair-debt' (ce005ec)
- refactor(skills): tighten /review-implementation, /craft-lasting-quality (efa293b)
- refactor(skills): tighten /build-requested-spec (3f38436)

## 0.1.26 - 2026-09-28

- Merge branch 'refactor/dc-c5-expert-review' (2d6ed20)
- refactor(skills): tighten /review-implementation, /implement-project, /ship-spec (D53) (7f8faca)

## 0.1.25 - 2026-09-28

- Merge branch 'refactor/dc-c4-quality-never-blocks' (7383069)
- feat(core): qualification never blocks shipping (D52) (e175ebd)

## 0.1.24 - 2026-09-28

- Merge branch 'refactor/dc-c3-skill-text' (fce7076)
- refactor(skills): tighten /define-spec, /build-requested-spec, /craft-lasting-quality, /architect-system-foundation (2b4b20f)

## 0.1.23 - 2026-09-28

- Merge branch 'refactor/dc-c2-core-commits' (34df9d8)
- refactor(skills): tighten /rule-project, /verify-behavior, /review-implementation, /scan-quality (7c0470e)
- feat(core): commit records in the core and keep one open spec (D51) (fcf4f7e)

## 0.1.22 - 2026-09-28

- Merge branch 'refactor/dc-c1-run-evidence' (56af2da)
- refactor(skills): tighten /verify-behavior (897c44f)
- feat(core): keep run evidence and require it for green verification (D47–D49) (b533517)

## 0.1.21 - 2026-09-28

- Merge branch 'refactor/lean-core' (f47ab44)
- fix(core): clearer message for a missing report; record the rewrite status (672ba99)
- docs: describe the lean core workflow (L3) (da8d9d8)
- refactor(skills): move every skill to the lean core (L2) (83f1d60)
- refactor(core): rewrite the aidd core lean (L1) (5367a31)
- docs(product): accept E-D11 to E-D15; Haiku is the reference model (6a0cdff)
- docs(product): post-mortem of the Copilot + Haiku run into the lean core inventory (f5ebf19)
- docs(product): inventory the core for a lean rewrite (E) (6f229f7)

## 0.1.20 - 2026-09-28

- No new commits.

## 0.1.19 - 2026-09-28

- Merge branch 'fix/dc-fixes' (4871244)
- fix: seed a root package.json and stop ship-spec on a refused release (F2, F3) (06a4d72)
- fix(core): cap journal summaries at 128 characters (F1) (f6b4a79)

## 0.1.18 - 2026-09-28

- Merge branch 'refactor/dc-8-roles-docs' (83c7252)
- docs(product): leave the real multi-harness test to the human (8.3, P10) (33e4f5a)
- docs: merge the skills catalog into AIDD.workflow.md (8.2) (90f11e0)
- refactor(skills): move role limits and sub-agent rules to role prompts (8.1) (d6b73eb)
- Merge branch 'refactor/dc-7-scaffold-lite' (759954c)
- refactor(skills): interim scaffold commands in /architect-system-foundation (668f59f)

## 0.1.17 - 2026-09-28

- Merge branch 'refactor/dc-7-greenfield' (0068d31)
- refactor(skills): remove /scaffold-system (7.3) (dfeca98)
- refactor(skills): tighten /architect-system-foundation (7.1) (9a0da49)
- docs(product): mark create-aiddbot done (7.2) (2ec8ecb)
- docs(product): settle greenfield decisions D39-D45 (7.0) (7c0d5aa)
- docs(product): note pending fixes F1-F3 for after phase 7 (5260652)

## 0.1.16 - 2026-09-28

- Merge branch 'refactor/dc-6-release' (5c1190c)
- refactor(skills): drop the versioning procedure from /ship-spec (6.2) (d3e7ab6)
- feat(core): compute the release version and changelog (6.1) (6f7313e)

## 0.1.15 - 2026-09-28

- Merge branch 'refactor/dc-5-quality-register' (22b30dc)
- refactor(skills): run quality skills on the debt register (5.2) (94186ca)
- feat(core): debt register with aidd debt (5.1) (b327a6f)
- docs(product): decide the quality register (C) (f5a62d6)
- docs(product): settle P8 and P9 as D28 and D29 (23a24c0)
- Merge branch 'refactor/dc-4-spec-first' (c49ccd5)
- feat(core): block and resume specs; ship only from qualified (4.5) (f5d881b)
- feat(core): triage acceptance failures from the Playwright JSON report (4.4) (0488197)
- feat(core): trace requirements to tagged acceptance tests (4.3) (793e517)
- feat(core): replace the PRD with a generated spec index (4.2) (f465a7f)
- feat(core): local spec requirements and domain (4.1) (9caaca2)
- docs(product): review spec-first decisions with the human (10a4e23)
- docs(product): decide spec-first (B) (f3b1adf)
- docs(product): keep 0.1.x until the end of the deterministic-core plan (5085040)
- Merge branch 'refactor/dc-journal-columns' (38ceec1)
- feat(core): align journal columns (4971c42)
- refactor(skills): tighten /scaffold-system (c050fb4)

## 0.1.14 - 2026-09-27

- No new commits.

## 0.1.13 - 2026-09-27

- docs: mention .aiddbot/config.json in getting-started and the catalog (d0a5ada)

## 0.1.12 - 2026-09-27

- refactor(skills): run classified commands through aidd run (3.3) (24f791b)
- feat(core): add aidd run for classified project commands (3.2) (8efde14)
- refactor(skills): tighten /rule-project for command classification (3.1) (d107f15)

## 0.1.11 - 2026-09-27

- refactor(skills): journal only verdict, select, blocked, and escalate (2.4) (32891cc)
- refactor(core): narrative journal written by the core; drop /record-journal (2.3) (76f5c01)
- feat(core): record evaluations in control.json and gate on it alone (2.2) (63662f3)
- feat(core): control.json per spec with approve, show, and legal transitions (2.1) (ae3fc31)

## 0.1.10 - 2026-09-27

- fix(core): load the config seed lazily so --version needs no payload (c9e3605)
- refactor(skills): tighten /maintain-skills for the aidd core (1.4) (eb42c79)
- refactor(core): migrate skill scripts into aidd (1.3) (b35c465)
- feat(core): seed .aiddbot/config.json and add aidd config (1.2) (0cc569c)
- feat(core): add aidd dispatcher and shared lib (1.1) (e0db975)

## 0.1.9 - 2026-09-27

- docs(product): record phase 0 baseline metrics (8f5fbcc)
- refactor(skills): tighten /define-spec (07cb5ed)
- refactor: retire the audit hook bundle (D4) (d235d49)
- docs(product): plan deterministic core rebuild (c86ee11)
- docs(product): capture workflow proposals (d23cb8d)
- refactor(skills): tighten /architect-system-foundation (1386e25)

## 0.1.8 - 2026-09-26

- refactor(skills): simplify spec snapshots and branching (df3f878)

## 0.1.7 - 2026-09-26

- refactor(skills): simplify workflow scripts (c97b29c)
- refactor(skills): tighten /verify-behavior (0eb5cb0)
- refactor(skills): tighten /define-spec (cb9c075)
- refactor(skills): tighten /ship-spec (55219ea)

## 0.1.6 - 2026-09-25

- refactor(skills): keep quality review to open issues (cb783a4)
- refactor(skills): tighten /ship-spec debt cleanup (26ad3b5)
- refactor(skills): reduce green verification reports (fe9cd3d)

## 0.1.5 - 2026-09-25

- No new commits.

## 0.1.4 - 2026-09-25

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/agents/architect.md
 M .agents/agents/builder.md
 M .agents/agents/craftsman.md
 M .agents/skills/skills.catalog.md
 D .aiddbot/efforts.yaml
 M .claude/agents/architect.md
 M .claude/agents/builder.md
 M .claude/agents/craftsman.md
 M .codex/agents/architect.toml
 M .codex/agents/builder.toml
 M .codex/agents/craftsman.toml
 M .cursor/agents/architect.md
 M .cursor/agents/builder.md
 M .cursor/agents/craftsman.md
 M .github/agents/architect.agent.md
 M .github/agents/builder.agent.md
 M .github/agents/craftsman.agent.md
 M README.md
 M docs/AIDD.workflow.md
 M docs/getting-started.md
 M scripts/adapt.js
 M scripts/release.js
?? .aiddbot/agents.yaml
?? docs/agent-customization.md
```

## 0.1.3 - 2026-09-24

- feat: better journals and docs (00742c8)

## 0.1.2 - 2026-09-24

- refactor(skills): split scaffold materializer (255fe5a)
- refactor(skills): seed scaffold root defaults (fff4415)
- refactor(skills): externalize scaffold defaults (f9b0390)
- refactor(skills): tighten /scaffold-system (cbf6c94)

Pending changes included in this release:

```text
M .agents/skills/record-journal/scripts/append.mjs
 M AGENTS.md
 M README.md
 M bin/seeds/GITIGNORE.seed
```

## 0.1.1 - 2026-09-23

- docs(product): mark frontier-fall 7.2 done, v0.1.0 Equinox published (a1ca619)

## 0.1.0 - 2026-09-23

- chore: stop tracking nested audit transcripts, widen temp/tmp ignore (c011e7e)
- Merge branch 'refactor/frontier-fall' (6bdaacf)
- docs(product): checkpoint fontier.md draft and mark 7.2 in progress (db6698b)
- docs(product): mark frontier-fall 7.1 done, a real shipped delivery (b57296e)
- refactor(skills): rename 4 skills, move physical schemas to outline-system (ec7776c)
- docs(product): un-collide document-system/document-project verbs, flag the schema-ownership question (7f1f189)
- docs(product): honor the A/B/C letter reservation for primitives (c4e6185)
- docs(product): add inspect-quality rename options (15de6e6)
- docs(product): rewrite naming.md as a checklist, not a table (53440c1)
- docs(product): move naming work to its own file, cover all 14 skills (8e94fa1)
- docs(product): propose 3 alternatives for the names that don't fit (9e6a0d4)
- docs: sync README and docs/ with the frontier-fall refactor (ea3f56e)
- docs(skills): drop the journal format paragraph from the catalog (db49050)
- refactor(skills): drop the PRD and TDR templates (0af34de)
- refactor(skills): fix effort per role, drop the Delegation section (3877354)
- docs(product): answer the refactor concerns with P22-P24 (94b2554)
- feat(cli): one source for consumer AGENTS.md, synced by adapt (2f612c5)
- docs(product): open P21 on the three Delegation copies (9e7e80d)
- refactor(skills): tighten the three orchestrators (9893535)
- docs(agents): make Delegation the single delegation policy (758e441)
- refactor(skills): tighten the eight delivery primitives (9a19051)
- refactor(skills): stop creating PRD/TDR/counters from skills (862acd6)
- refactor(skills): tighten /scaffold-system, drop run-system (7b2f78b)
- refactor(skills): unify record-journal call sites (483dc96)
- refactor(skills): tighten /record-journal (9540504)
- feat(cli): keep maintain-skills out of consumer repositories (eac395d)
- refactor(skills): tighten /maintain-skills (cdd3b93)
- docs(product): mark frontier-fall phase 1 done (2e5ddbe)
- feat(cli): make aiddbot init prepare a complete AIDDbot workspace (2331d16)
- refactor(scripts): replace adapt.command.md with deterministic adapt.js (e6f500b)
- refactor(scripts): make record-journal/append.mjs deterministic (2795fed)
- docs(product): mark frontier-fall phase 0 done (01674f4)
- chore(scripts): remove unfinished command drafts (7a8b276)
- test(scripts): drop skill-content and CLI-mechanics test scripts (a097cd6)
- audit (5167b4c)
- docs(product): add execution guide and done criteria to frontier-fall plan (424f3d2)
- docs(product): frontier-fall decisions and plan (11c8f9c)

Pending changes included in this release:

```text
M package.json
```

## 0.0.50 - 2026-09-22

- refactor(skills): drop the duplicated efforts path from the seed (29eb763)
- feat(skills): journal orchestrator routing and every delegation (e08a49a)
- refactor(skills): tighten /architect-system-foundation (75761c7)
- refactor(skills): tighten /document-system (234e165)
- refactor(skills): tighten /record-journal (7d460a7)

## 0.0.49 - 2026-09-22

- refactor(skills): declare and enforce API status codes (7df34f4)
- refactor(skills): tighten E2E data isolation in /implement-project and /verify-acceptance (c8aa23f)
- feat: path to aiddbot folder (a6e2853)
- refactor(skills): tighten /document-system delegation rules (ff5f27a)
- refactor(skills): tighten /architect-system-foundation (9a2523b)
- refactor(skills): tighten /document-project (49747d0)
- refactor(skills): tighten /ship-spec (7c5b797)
- refactor(skills): tighten /ship-spec (94b50aa)
- refactor(skills): tighten schema lifecycle across skills (67f9135)

## 0.0.48 - 2026-09-22

- refactor(skills): tighten /scaffold-system (588fcab)
- refactor(skills): tighten /scaffold-system (0870c30)
- refactor(skills): tighten /scaffold-system (6ec7883)
- fix(cli): read gitignore seed on demand (7da9590)
- refactor(skills): tighten /scaffold-system (bfb2e44)

## 0.0.47 - 2026-09-21

- feat(init): seed AIDD policy and counters (75cde6e)
- refactor(skills): avoid nested journal ignore (43d811f)
- fix(cli): harden installer reconciliation (fcb81f4)
- refactor(skills): enable model invocation (d2c879a)

## 0.0.46 - 2026-09-21

- refactor(skills): tighten /build-requested-spec (2816693)
- refactor(skills): tighten /record-journal (b364f06)
- refactor(skills): tighten /record-journal (0f817f4)

## 0.0.45 - 2026-09-21

- refactor(skills): tighten /document-project (c0e65e8)
- refactor(skills): tighten /build-requested-spec (ce1c291)
- refactor(skills): tighten /record-journal (0d2e512)

## 0.0.44 - 2026-09-21

- test(skills): allow model invocation of /maintain-skills (3b2deeb)
- refactor(skills): tighten /record-journal (7e1b5c6)
- refactor(skills): tighten /record-journal (d0f2a6e)
- feat: allow skills (974f140)
- chore: format PRD (9ebc00c)

## 0.0.43 - 2026-09-21

- refactor(skills): tighten /record-journal (b280a55)
- refactor(skills): tighten scaffold and ship (bb33307)

Pending changes included in this release:

```text
M .agents/skills/scaffold-system/SKILL.md
```

## 0.0.42 - 2026-09-21

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-system-foundation/SKILL.md
 M .agents/skills/build-requested-spec/SKILL.md
 M .agents/skills/craft-lasting-quality/SKILL.md
 M .agents/skills/define-spec/SKILL.md
 M .agents/skills/define-spec/assets/PRD.template.md
 M .agents/skills/record-journal/SKILL.md
 M .agents/skills/record-journal/scripts/append.mjs
 M .agents/skills/scaffold-system/SKILL.md
 M .agents/skills/scaffold-system/scripts/materialize.mjs
 M .agents/skills/skills.catalog.md
 M .npmignore
 M .product/spec-first.plan.md
 M .product/specification-workflow.diagnosis.md
 M docs/AIDD.workflow.md
 M scripts/verify-skills-migration.js
?? .agents/skills/scaffold-system/assets/run-system.mjs
```

## 0.0.41 - 2026-09-21

- refactor(skills): tighten /ship-spec (c9e1ea9)
- refactor(skills): tighten /implement-project (6025798)
- refactor(skills): tighten /build-requested-spec (b9ba54a)
- fix(adapt): install Claude hook settings (fdb9e2e)
- refactor(skills): tighten /record-journal (ce4cec3)

## 0.0.40 - 2026-09-21

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-system-foundation/SKILL.md
 M .agents/skills/build-requested-spec/SKILL.md
 M .agents/skills/craft-lasting-quality/SKILL.md
 M .agents/skills/define-spec/SKILL.md
 M .agents/skills/document-system/assets/AGENTS.template.md
 M .agents/skills/implement-project/SKILL.md
 M .agents/skills/review-implementation/SKILL.md
 M .agents/skills/ship-spec/SKILL.md
 M .agents/skills/skills.catalog.md
 M .agents/skills/verify-acceptance/SKILL.md
 M docs/AIDD.workflow.md
 M scripts/adapt.command.md
 M scripts/verify-skills-migration.js
?? .agents/skills/record-journal/SKILL.md
?? .agents/skills/record-journal/scripts/append.mjs
?? .claude/skills/record-journal/SKILL.md
```

## 0.0.39 - 2026-09-20

- No new commits.

## 0.0.38 - 2026-09-20

- refactor(skills): use append-only delivery journal (49ba756)
- refactor(skills): streamline documentation context (758cefe)

## 0.0.37 - 2026-09-20

- refactor(skills): separate build and quality checks (77be651)

## 0.0.36 - 2026-09-20

- refactor(skills): reuse orchestrator agents (2a10e91)
- refactor(skills): group public entrypoints (53044f2)
- refactor(skills): adopt explicit skill names (f89da2d)
- refactor(skills): remove worker layer (60fa206)
- refactor(skills): align names and naming model (7970af1)
- docs: simplify public workflow guidance (ad3ff22)

## 0.0.35 - 2026-09-17

- refactor(skills): tighten /qualify (8bfc421)
- refactor(skills): tighten /curate-quality (47ec8b8)
- refactor(skills): tighten /qualify (7703272)
- refactor(skills): tighten /qualify (40d78e4)
- refactor(skills): tighten /explore (3edc8b8)

Pending changes included in this release:

```text
M .agents/skills/explore/assets/AGENTS.template.md
 M .agents/skills/shipify/assets/CHANGELOG.template.md
```

## 0.0.34 - 2026-09-16

- feat: qualify speed up (b0997b6)

## 0.0.33 - 2026-09-16

- docs(workflow): clarify quality boundary (bad7d16)
- feat: no hard lints at spec loop (ffda48f)
- refactor(skills): tighten /shipify (7119bbd)
- refactor(skills): tighten /curate-quality (4370fbd)
- refactor(skills): tighten /shipify (f805dae)

## 0.0.32 - 2026-09-16

- feat: verify and qualify simplification (12abaae)

## 0.0.31 - 2026-09-16

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/build-requested-change/SKILL.md
 M .agents/skills/codify/SKILL.md
 M .agents/skills/implement-change/SKILL.md
 M .agents/skills/ship-implementation/SKILL.md
 M .agents/skills/specify/SKILL.md
```

## 0.0.30 - 2026-09-16

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-solution-foundation/SKILL.md
 M .agents/skills/explore/SKILL.md
 D .agents/skills/explore/assets/counters.template.yaml
 M .agents/skills/extract/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
?? .agents/skills/specify/assets/counters.template.yaml
```

## 0.0.29 - 2026-09-15

- feat: remove links from skills (81e67f4)

## 0.0.28 - 2026-09-15

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/explore/SKILL.md
```

## 0.0.27 - 2026-09-15

- refactor(skills): tighten /curate-quality (1b9b7cd)
- feat(skills): add /curate-quality (9d6ee2e)
- feat: bold test in templates (120f1ef)
- refactor(skills): tighten /architect-solution-foundation (874ac9b)

## 0.0.26 - 2026-09-15

- refactor(skills): tighten /craft-lasting-quality (07d4857)
- refactor(skills): tighten /specify (ba3bed9)

Pending changes included in this release:

```text
M .agents/skills/explore/SKILL.md
 M .agents/skills/extract/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
 M .agents/skills/specify/assets/spec.template.md
```

## 0.0.25 - 2026-09-15

- refactor(skills): tighten /skillify (274d9fc)
- Update SKILL.md (038058e)
- fix: capitalize agent names (49ed256)
- fix: capitalize agent names (cd4cdad)
- feat: lean scaffoldify (b5d192a)

## 0.0.24 - 2026-09-14

- fix(checks): align skill contracts and specify adapter (3330c17)
- refactor(skills): replace container terminology with project (46ed01f)
- refactor(skills): tighten /scaffoldify (1d841fb)
- refactor(skills): tighten /scaffoldify (581f472)

## 0.0.23 - 2026-09-14

- fix(adapt): use Copilot agent filenames (a8e364b)

## 0.0.22 - 2026-09-14

- refactor(skills): tighten /craft-lasting-quality (e1bda0c)
- refactor(skills): tighten orchestrator skill calls (1aabd26)
- refactor(skills): tighten /architect-solution-foundation (b80f668)
- refactor(skills): tighten /architect-solution-foundation (e97056b)

## 0.0.21 - 2026-09-14

- refactor(skills): tighten /verify and /qualify (918279c)
- refactor(skills): tighten /specify (7ce38b0)
- refactor(skills): tighten /specify (18735c8)
- refactor(skills): tighten /specify (c4bf8ed)
- refactor(skills): tighten /specify (40a6485)
- refactor(skills): tighten /specify (b788b31)

Pending changes included in this release:

```text
M .agents/skills/architect-solution-foundation/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
 M .agents/skills/shipify/SKILL.md
```

## 0.0.20 - 2026-09-14

- Merge branch 'less-harness' into main (19ff5a4)
- refactor(skills): remove obsolete fix-defects skill and update references (d3a3c98)
- feat: timestamp (4e46ece)
- refactor(skills): simplify nested delivery and repair flow (d44f197)
- feat: template impovements (4ce1034)
- feat: nested instructions (4820eaa)
- chore(harness): clean less-harness seed formatting (8717100)
- docs(harness): complete less-harness redesign (4e76c7e)
- feat(quality): route debt through qualification and specs (7456370)
- refactor(context): replace architecture docs with container rules (6b5aa15)
- refactor(skills): make specs the delivery unit (0b420da)
- feat(harness): establish less-harness artifact templates (b049b87)
- docs: split human and product docs (746ddda)

## 0.0.19 - 2026-09-12

- docs(change): record delivery simplification evidence (45983c6)
- fix(skills): make container rules optional (a16d3f8)
- refactor(skills): simplify delivery evidence (022aba1)

## 0.0.18 - 2026-09-12

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/build-requested-change/SKILL.md
 D .agents/skills/build-requested-change/assets/change.manifest.template.md
 D .agents/skills/build-requested-change/references/triage.md
 M .agents/skills/codify/SKILL.md
 M .agents/skills/craft-lasting-quality/SKILL.md
 M .agents/skills/craft-lasting-quality/references/finding.contract.md
 M .agents/skills/explore/SKILL.md
 M .agents/skills/explore/assets/AGENTS.template.md
 D .agents/skills/explore/assets/PRD.template.md
 M .agents/skills/fix-defects/SKILL.md
 D .agents/skills/implement-spec/SKILL.md
 M .agents/skills/planify/SKILL.md
 D .agents/skills/planify/assets/e2e.plan.template.md
 M .agents/skills/planify/assets/plan.template.md
 M .agents/skills/qualify/SKILL.md
 D .agents/skills/qualify/assets/change.qualify.report.template.md
 M .agents/skills/qualify/references/ui.patterns.md
 M .agents/skills/ship-implementation/SKILL.md
 M .agents/skills/shipify/SKILL.md
 M .agents/skills/skills.catalog.md
 M .agents/skills/specify-spec/SKILL.md
 M .agents/skills/specify/SKILL.md
 M .agents/skills/specify/assets/functional.spec.template.md
 M .agents/skills/specify/assets/technical.spec.template.md
 M .agents/skills/specify/references/functional.md
 M .agents/skills/specify/references/technical.md
 M .agents/skills/verify/SKILL.md
 D .agents/skills/verify/assets/change.e2e.report.template.md
 M .claude/skills/build-requested-change/SKILL.md
 M .claude/skills/codify/SKILL.md
 M .claude/skills/craft-lasting-quality/SKILL.md
 M .claude/skills/explore/SKILL.md
 M .claude/skills/fix-defects/SKILL.md
 D .claude/skills/implement-spec/SKILL.md
 M .claude/skills/planify/SKILL.md
 M .claude/skills/qualify/SKILL.md
 M .claude/skills/ship-implementation/SKILL.md
 M .claude/skills/shipify/SKILL.md
 M .claude/skills/specify-spec/SKILL.md
 M .claude/skills/specify/SKILL.md
 M .claude/skills/verify/SKILL.md
 M README.md
 M docs/AIDD.workflow.md
 D docs/adaptive-delivery.workflow.yaml
 M docs/design.decisions.md
 M docs/getting-started.md
 M scripts/verify-skills-migration.js
?? .agents/skills/build-requested-change/assets/change.template.md
?? .agents/skills/build-requested-change/references/discovery.md
?? .agents/skills/build-requested-change/scripts/index-specs.mjs
?? .agents/skills/codify/assets/report.template.md
?? .agents/skills/implement-change/SKILL.md
?? .claude/skills/implement-change/SKILL.md
?? docs/build-requested-change.informe.md
?? docs/build-requested-change.simplification.plan.md
```

## 0.0.17 - 2026-09-12

- Include working tree changes.

Pending changes included in this release:

```text
MM .agents/skills/architect-solution-foundation/SKILL.md
MM .agents/skills/build-requested-change/SKILL.md
R  .agents/skills/scope-change/assets/change.manifest.template.md -> .agents/skills/build-requested-change/assets/change.manifest.template.md
R  .agents/skills/scope-change/references/triage.md -> .agents/skills/build-requested-change/references/triage.md
D  .agents/skills/clean-solution/SKILL.md
D  .agents/skills/collect-findings/SKILL.md
MM .agents/skills/craft-lasting-quality/SKILL.md
R  .agents/skills/collect-findings/references/finding.contract.md -> .agents/skills/craft-lasting-quality/references/finding.contract.md
D  .agents/skills/deliver-change/SKILL.md
D  .agents/skills/deliver-spec/SKILL.md
D  .agents/skills/design-solution/SKILL.md
D  .agents/skills/map-solution/SKILL.md
 M .agents/skills/qualify/assets/change.qualify.report.template.md
 M .agents/skills/qualify/references/qualify.gates.md
D  .agents/skills/scope-change/SKILL.md
 M .agents/skills/skills.catalog.md
 D .claude/skills/clean-solution/SKILL.md
 D .claude/skills/collect-findings/SKILL.md
 D .claude/skills/deliver-change/SKILL.md
 D .claude/skills/deliver-spec/SKILL.md
 D .claude/skills/design-solution/SKILL.md
 D .claude/skills/map-solution/SKILL.md
 D .claude/skills/scope-change/SKILL.md
 D .claude/skills/scope-feature/SKILL.md
 M docs/AIDD.workflow.md
 M docs/adaptive-delivery.workflow.yaml
 M docs/design.decisions.md
 M docs/getting-started.md
 M scripts/verify-skills-migration.js
```

## 0.0.16 - 2026-09-11

- feat: review and delete unused skills (05d59ea)

## 0.0.15 - 2026-09-11

- docs: remove yaml workflows (867771b)
- feat: agents (973810e)

Pending changes included in this release:

```text
M .agents/skills/clean-solution/SKILL.md
 M .agents/skills/collect-findings/SKILL.md
 M .agents/skills/deliver-change/SKILL.md
 M .agents/skills/design-solution/SKILL.md
 M .agents/skills/map-solution/SKILL.md
 M .agents/skills/scope-feature/SKILL.md
```

## 0.0.14 - 2026-09-11

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-solution-foundation/SKILL.md
 M .agents/skills/design-solution/SKILL.md
 M .agents/skills/explore/SKILL.md
 M .agents/skills/extract/SKILL.md
 M .agents/skills/map-solution/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
```

## 0.0.13 - 2026-09-11

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-solution-foundation/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
```

## 0.0.12 - 2026-09-11

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/design-solution/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
```

## 0.0.11 - 2026-09-11

- Include working tree changes.

Pending changes included in this release:

```text
M .agents/skills/architect-solution-foundation/SKILL.md
 M .agents/skills/design-solution/SKILL.md
 M .agents/skills/map-solution/SKILL.md
 M .agents/skills/scaffoldify/SKILL.md
```

## 0.0.10 - 2026-09-11

- fix: simplify scaffold (3b75822)

## 0.0.9 - 2026-09-11

- fix: scaffold (eac19ba)

## 0.0.8 - 2026-09-11

- refactor(skills): tighten /scaffoldify (a663b4e)
- refactor(skills): tighten /design-solution (ad2b48c)

## 0.0.7 - 2026-09-11

- feat: arcchitect workflow (dcf6dd8)
- refactor(skills): tighten /design-solution (ae9d833)
- refactor(skills): tighten /scaffoldify (463a39c)
- feat: rewrite of aiddbot orchestrators (ccfdd04)
- refactor(skills): tighten orchestrator workflows (c03d259)

## 0.0.6 - 2026-09-11

- Include working tree changes.

Pending changes included in this release:

```text
M .npmignore
 M scripts/verify-cli-update.js
 M scripts/verify-skills-migration.js
```

## 0.0.5 - 2026-09-11

- chore: release 004 (8c759d2)

Pending changes included in this release:

```text
M docs/releases.md
 M scripts/release.js
 M scripts/verify-release.js
```

## 0.0.4 - 2026-09-11

- feat: seed agents (c8e0b18)
- Create releases.md (5ced8e9)
- docs: readme releases (0be6e3d)
- feat: version release info (58c5049)

## 0.0.3 - 2026-09-11

- fix: update Bun command syntax for initialization (5fecd38)
- feat: add package version retrieval and enhance summary output (9b163dd)
- refactor: reorder imports and improve printFinalSummary formatting (0a8830e)
- feat: enhance AIDDbot initialization and update commands with Bun support (2a0ada0)
- refactor(skills): unify adaptive change delivery (2889ace)
- chore: pre workflow change (e5d7241)
- docs: orchestation (e0239b1)
- feat: orchestration simplification (5993439)
- chore: plan orchestation simplification (1051903)
- docs: orchestrations (4b4cb57)
- refactor(skills): improve clarity and structure in SKILL.md files (31e4cd2)
- refactor(skills): tighten /craft-lasting-quality (5cc77cf)
- refactor(skills): tighten /craft-lasting-quality (b35b2b6)
- refactor(skills): tighten /craft-lasting-quality (45a25ce)
- refactor(skills): tighten /skillify (02b7c29)
- refactor(skills): tighten /skillify (5d56f76)
- docs: findings (0888d45)
- fix(init): source agent seeds from overlay (2028a6a)
- refactor(skills): tighten greenfield foundation (c7185ed)
- refactor(skills): tighten /shipify and batch A contracts (68f7f3d)
- refactor(skills): tighten delivery reliability (6917b1c)
- chore: plan to fix core defects (fbd92a8)
- feat: esm init update for npmx and bunx (0e2dd85)
- Merge branch 'main' of https://github.com/AIDDbot/AIDDbot (ac4fc55)
- fix: upgrade auditor (fb6a09e)
- feat: simplified and faster auditor (56fdba9)
- feat: include codex hooks in auditor bot (ad440af)
- feat: remove old implmentation (f2a5573)
- feat: pesudocodify craftman commands (e231775)
- feat: pesudocodize builder commands (7557e72)
- feat: pseudocodify architect solution commands (5991e24)
- feat: rewrite orchestation skills as workflows (with pseudo code syntax) (37e6cea)
- fix: avoid fixing lint by relaxing rules (d12456d)
- fix: define npm package contents (a932f44)
- merge: scaffold reliability fixes (3650239)
- refactor(skills): tighten /scaffoldify (5d47b7a)
- fix(scaffold): honor confirmed tier directories (70babbe)
- fix(scaffold): invoke npx through cmd on Windows (0b385f7)
- refactor(scaffold): localize materializer (81c297d)
- feat(skills): add scaffoldify primitive (f18810a)
- docs: align migration status and routing guidance (9047e2b)
- refactor(skills): clarify architect routing (fa60f6b)
- refactor(skills): simplify Craft findings flow (841ccd5)
- refactor(skills): name public ABC commands (be78af9)
- refactor(skills): reduce public entrypoints (707faeb)
- docs: plan three human entrypoints refactoring (b1591bb)
- feat(skills): migrate all workflows to skills (b4e0102)
- docs: plan all-to-skills migration (b80bfcd)
- refactor(skills): add Codex adapters (2129f62)
- feat! : workflows and commands (f5da452)
- refactor(docs): clarify command workflows and update specification processes (d259703)
- feat(hooks): update session handling and refactor event parsing (e79a84f)
- feat(commands): implement coordinated multi-spec delivery and enhance command workflows (31c7c60)
- feat(overlay): add hooks directory to TREES constant (ac0263a)
- refactor(commands): update command documentation to include defect reports (6cf7c7d)
- feat(commands): add clean-drift command for code maintenance (457f036)
- feat(hooks): enhance subagent event fields with agent_display_name (cb744e6)
- feat(commands): introduce clean-solution command and update related documentation (5492319)
- feat(seed): add seed files functionality to initialize .gitignore and README.md (5745de8)
- refactor(commands): update command structure and documentation for agent workflows (9616042)
- feat(workshop): introduce scaffold-workshop command and update documentation (33798e0)
- feat(hooks): enhance ingest configuration for session and subagent events (e0d71a6)
- refactor(commands): remove deprecated architect commands and introduce new mapping and design commands (47cdf14)
- refactor(commands): remove deprecated commands and introduce new implementations (4a9bd5f)
- feat(hooks): add ingest functionality and configuration for session events (64a3ded)
- feat(scaffoldify): enhance command functionality and update documentation (42957b6)
- refactor(agents): streamline agent documentation and workflows (f650a9b)
- feat(overlay): enhance file walking logic and add new tree paths (04e6691)
- feat(audit): add cursor session audit hooks for ingest and report (e92ec79)
- refactor(skills): rename /release to /shipify (93f5442)
- refactor(skills): drop lint from /qualify (2fe773a)
- refactor(skills): tighten /qualify (443172c)
- refactor(skills): tighten /verify (4573b86)
- refactor(skills): tighten /codify (138691f)
- refactor(skills): tighten /planify (2b25a37)
- refactor(skills): kind technical with T series (5356ba3)
- refactor(skills): tighten /specify (dae9f4b)
- refactor(skills): tighten /explore and /extract (8dc9768)
- refactor(skills): tighten /skillify (8bbea67)
- docs: update command documentation to clarify subagent execution requirements (6828bba)
- feat: integrate git initialization and commit functionality into AIDDbot setup (d80a428)
- refactor: enhance npx command handling in scaffold.js for improved platform compatibility (e0462e2)
- docs: update scaffoldify command documentation and remove obsolete skill files (402ce6f)
- docs: enhance agent and command documentation for clarity and detail (20734e5)
- docs: update README and workflow documentation to reflect new ABC command structure (4625eff)
- refactor: update scaffoldify command to streamline domain selection and default technology settings (cf7bb82)
- docs: update architectural and project-specific rules documentation (057ca0d)
- feat: introduce scaffoldify command and related documentation (6dbdb77)
- docs: update README and skills documentation for scaffoldify integration (92b7257)
- feat: add scaffold script and overlay functionality for workshop setup (8ae7bb1)
- docs: update README and command documentation to include --allow-git flag (b9e248d)
- feat: add initial AIDDbot setup with package.json and CLI script (d37d3ac)
- docs: add initial rules and agent documentation for backend, CLI, E2E, and frontend (d31ab5d)
- docs: update command documentation for architect and craftsman roles (853bc72)
- docs: add new agent commands for architect and builder roles (a1bbdc8)
- docs: update README and command documentation for Craftsman roles (9c249c7)
- docs: update command documentation to suggest handoff to Builder and clarify linting process (c8e367c)
- docs(extract): clarify rules folder usage and update instructions for GitHub integration (b5c47d5)
- docs(explore): update SKILL.md and AGENTS.template.md for ISO 8601 timestamps and clarify documentation structure (d2f9a62)
- refactor(scaffoldify): consolidate scaffoldify command documentation into a single file (ccbc98d)
- docs: emphasize the importance of committing at each step in command documentation (196702b)
- fix: timestamp (a548aa1)
- fix: enforce folders and timestap all the work (d2e88f2)
- docs: update README and scaffoldify command documentation (e095a57)
- feat(scaffoldify): introduce /scaffoldify command for workshop repo bootstrapping (d53a243)
- refactor(commands): open skills by path, not slash name (3d172ce)
- feat(skills): add /scaffoldify and ship editor folders (ad55036)
- feat(skills): add /harnessify (f984310)
- docs: update status chain and qualification requirements (ba5634d)
- docs(qualify): update skill descriptions and templates for clarity (59c455c)
- refactor(skill): verify (2b9ec55)
- refactor(skill): codify (02b370e)
- feat: simplify the planify skill (9edaf70)
- feat: reduce specify skill (1fc6da9)
- feat: simplified architect assets (fd7a14f)
- docs: no drift report file (dbbf48d)
- feat: remove the intermediate drift report (eac21e7)
- docs: update README and command flowchart terminology for consistency (c8a2296)
- docs(commands): update command descriptions and flowcharts for clarity (038340d)
- docs: simplify and align core docs with website copy (166ecc5)
- refactor(commands): introduce ABC lifecycle commands and remove deprecated ones (1ee393f)
- refactor(skills): fold /restructure into /specify with F/R id series (2316b02)
- refactor(skills): drop Spanish LEEME twins and English-only canon (c95e42d)
- docs: added flowcharts to commands (8007067)
- feat: explore and refactor (930ea10)
- fix(skills): stop assuming the repository root for artifact paths (c3e5ee9)
- refactor(skills): shorten skills for Claude 5 generation models (fd69bd5)
- docs: remove outdated skills for code simplification, frontend design, and UI engineering (76c1bf8)
- docs: simplify getting-started and workflow around the three doors (8edfe22)
- docs(readme): lead with the commands and say what makes it hold (09def5c)
- docs(workflow): rewrite as a lean picture of the system (aaac940)
- docs(getting-started): cut it back to an overview (2e718bd)
- docs: rewrite getting-started around the commands and a from-zero path (bcdcca5)
- docs: align catalog, lifecycle, workflow and README on the prose skills (f3c79f4)
- feat(commands): add English command files and split the two spec doors (33bab30)
- refactor(skills): rewrite every skill as prose in SKILL.md and LEEME.md (7dccae9)
- feat(spec): add new skills for defining functional and non-functional specifications (98228da)
- refactor(skills): update LEEME and spec templates for restructure and specify (a8a45cc)
- refactor(planify): an e2e plan follows the container, not the spec kind (42d21bd)
- refactor(skills): rename review to qualify and refactor to restructure (858a48a)
- docs(refactor): recast the non-functional spec template on the decision (e966231)
- fix(refactor): keep the gate list in the spec template, not across skills (d659062)
- docs(refactor, review): realign the English files and record the decision (18c42cf)
- refactor(skills): move the lenses to review, drop triage (9687638)
- refactor(skills): review guards the diff, refactor owns the decision (5cf19af)
- refactor(skills): one key shape, two id series (2ce1e9e)
- docs: recast the pipeline diagrams on two doors converging at planify (631bcdb)
- refactor(skills): non-functional specs are independent and id-less (95af6fb)
- refactor(skills): one spec, two doors — /refactor writes a non-functional spec (72f5b29)
- docs(refactor, release): update LEEME for clarity and process alignment (6137b43)
- docs(review): refine LEEME for clarity and process adherence (1692a0b)
- docs(verify): enhance LEEME for clarity and process improvement (3daa634)
- docs(codify): update LEEME for improved clarity and process adherence (fc4cd96)
- docs(codify): refine LEEME for clarity and structure (551f7a4)
- docs(planify): update LEEME and templates for clarity and consistency (3635fa3)
- docs: refactor de los primeros skills en prosa de forma que se usen más adelante para general los definitivos (5480510)
- reports: canonical shape, unified routing, and spec-less storage (fff7115)
- docs: recast artifact-flow doc to the three-scenario diagram (3f1f02f)
- docs: add Spanish artifact-flow companion (business vs. architecture) (c891b9f)
- docs(skills): recast all LEEMEs to the canonical prose schema (235e76e)
- docs: session summary — skills/commands docs overhaul (ae4869c)
- docs: align AGENTS.md align-docs list with skillify's definition (ee61d9e)
- docs(skills): make command README/LEEME first-class align-docs (185a87d)
- docs: record the 7→3 command consolidation and add Spanish LEEMEs (06cea93)
- refactor(commands): consolidate to three orchestrators (73c9422)
- docs: record the /refactor consolidation decision (663498a)
- docs: document /refactor in the workflow and README (b905000)
- docs(skills): rewrite READMEs as faithful prose and parallel Spanish LEEME (67290a1)
- refactor(skills): merge /redesign into /refactor as a whole-app triaging audit (7852cc4)
- chore(skills): verify per container and neutralize _improvements sources (1833643)
- feat(skills): teach /redesign to spot componentization (7c47885)
- feat(skills): add report-only /redesign skill and command (c39af1a)
- feat(skills): add report-only /refactor skill and command (fac7039)
- chore: impro skills (b1d7217)
- feat(verify): ship port-freeing scripts to clear orphaned servers (f8e53bd)
- refactor(skills): concentrate tests in codify and verify (675f31e)
- feat(skills): enforce container rules independent of the harness (20b26c2)
- feat(skills): fresh-branch-per-amend and merge-first release (46cacf5)
- refactor(commands): flatten build-feature to drive skills directly (c48f8cb)
- feat: natural readme versions of the skills (0f5d5a8)
- docs(skills): update LEEME.md and README.md for codify and explore skills (8b08945)
- docs(skills): add Spanish prose specs (LEEME.md) for all skills (085fa13)
- docs(skills): add prose README spec per skill (ef0be0a)
- refactor(skills): update length guardrail in SKILL.md (b9d0456)
- refactor(skills): gate-model /review and add /release gate check (2b0aa61)
- Merge branch 'refactor/deprecatable-criteria' of https://github.com/AIcodeAcademy/AIDDbot into refactor/deprecatable-criteria (797cc49)
- refactor(skills): grammar-align guardrails, glossary, and command orchestrators (2ef9943)
- refactor(skills): enhance clarity in guardrails and glossary (e748972)
- refactor(skills): deprecatable criteria, tag routing, e2e lint (4c9118b)
- chore: skillify for the win (89e7855)
- refactor(skills): amendable specs with planned gate and e2e checkpoints (4e79f4f)
- refactor(skills): tighten specify/explore peers and unify spec identity (56c1733)
- chore: move prd from specify to explore (b02d65f)
- refactor(skills): tighten /explore and /extract (bd52d8d)
- chore: grammar (55ebe41)
- refactor(skills): tighten /explore and /extract (9e99f3c)
- chore: model schema moved to explore from extract (43f633f)
- refactor(skills): tighten /extract (553e55d)
- chore: pre skillify extract (15b4b8d)
- docs(skills): update system.arch.template.md and SKILL.md for clarity (ca7efcb)
- refactor(skills): tighten /explore (8b4d256)
- chore: remove labs and tem stuff (271aec6)
- docs(skills): refine SKILL.md and skill.template.md for clarity and structure (60d5888)
- Update README.md with new content and formatting (0ed9de5)
- docs(skills): update references to model schema in skills documentation (1e709d9)
- docs(skills): enhance explore and extract skills documentation (2b4b219)
- docs(skills): add scripts section to container.arch.template.md (26ec9c5)
- feat: review skill (6f0a305)
- docs(skills): update documentation for codify, planify, specify, and verify skills (3b86f31)
- chore: add .gitattributes to normalize line endings and specify binary files (3189e71)
- fix(skills): correct spelling of _for_each_ to _for-each_ in documentation (bcfc813)
- refactor(skills): formalize conditions and iterations as _if_ and _for_each_ (0572474)
- fix(skills): restore LF line endings in container.arch.template.md (7c94cae)
- fix(skills): make ER.md the single authoritative domain model (ed836d4)
- docs(skills): sync catalog with command style (3cbd3bd)
- refactor(skills): comanditize /release (7fb8073)
- fix(skills): restore LF line endings in review.guidelines.md (eedd773)
- refactor(skills): comanditize /review (c053bd0)
- refactor(skills): comanditize /verify (0c38be9)
- refactor(skills): comanditize /codify (a2ae61c)
- refactor(skills): comanditize /planify (948c982)
- refactor(skills): comanditize /specify (18510ea)
- refactor(skills): teach /skillify the command style (e172cd8)
- refactor(skills): comanditize /explore and /extract (0054d12)
- refactor(docs): update AIDD documentation and remove obsolete files (5358dc1)
- feat(commands): introduce new command documentation and enhance existing skills (bca4cc2)
- refactor(skills): standardize terminology and improve documentation clarity (f999bce)
- refactor(skills): update documentation for PRD and spec lifecycle (59767f4)
- feat(review & verify): add new command documentation for review and verify skills (75ba23f)
- feat(codify): add documentation for executing the /codify skill with subagents (dbab2bd)
- feat(specify): add new documentation for model design conventions and enhance specification templates (5e2c106)
- refactor(skills): standardize spec and plan structures with sequential IDs (cc9bbe3)
- refactor(skills): enhance clarity and structure in planning templates (4044063)
- refactor(skills): update specification templates and business rules (9ba7e7f)
- feat(commands): add explore-and-extract command documentation (0eed49d)
- refactor(skills): move template reads out of tier-guide Implement bullets (707b606)
- refactor(skills): restructure tier guides to mirror the skill Steps (aed97d2)
- refactor(skills): give tier-guide Templates sections verb-first sentences (9e73335)
- refactor(skills): formalize default vs conditional reads in grammar and tier guides (3627ed0)
- refactor(skills): formalize file-action bullets in extract tier guides (e8152b9)
- refactor(skills): dissolve greenfield/brownfield mode into evidence-wins rule (e38315b)
- refactor(skills): streamline explore and extract guides for clarity (fbbf8ae)
- refactor(skills): apply the grammar to the reference guides (f398f68)
- refactor(skills): close the grammar - one syntax per sentence form (f950a6f)
- refactor(skills): update context sections in SKILL.md files to clarify path shorthand definitions (c368462)
- refactor(skills): inline step-scoped references into Steps, References keeps ambient only (f589569)
- refactor(skills): reorder reference notation to when-role-link, read becomes follow (f9741dc)
- refactor(skills): prune verbosity, adopt reference notation (6b59e26)
- refactor(skills): prune verbosity, add concision conventions. (e1b1e3f)
- refactor(docs): update README and skills catalog to reflect new skill names, enhance clarity in the skills pipeline, and introduce a new documentation section for AIDD diagrams (70237ae)
- refactor(docs): update README, skills catalog, and lifecycle documentation to reflect the removal of the `/modify` skill, clarify the maintenance process for released features, and enhance overall clarity and consistency across the skills pipeline (ea5251b)
- refactor(docs): update feature documentation and skills lifecycle to clarify the handling of released features, enhance the `/modify` and `/release` processes, and improve the overall structure of the skills pipeline (a3aed09)
- docs: add design decisions documentation to explain the rationale behind the skills pipeline structure and update references in README and workflow files (292ede4)
- refactor(skills): update skills catalog and lifecycle documentation for clarity, enhance descriptions and guardrails across skills, and improve report templates (72c16f9)
- refactor(skills): enhance documentation for explore and extract skills, update templates and guides for clarity and consistency (9745098)
- refactor(agents): add new agents (architect, builder, craftsman) and flow templates for task management, enhance .gitignore for build artifacts (73d8d9e)
- refactor(skills): refine skillify documentation for clarity and conciseness, update guardrails and remove outdated guides (749b182)
- refactor(skills): introduce the skillify skill for creating and fixing agent skills, enhancing the skills catalog and documentation (7d501ec)
- refactor(skills): improve formatting and clarity in skill templates and catalog documentation (dd0d418)
- refactor(skills): update descriptions for clarity and consistency across codify, specify, and verify skills (e76cfae)
- refactor(skills): enhance descriptions and clarify context across multiple skills (f018570)
- refactor(skills): standardize path references across skills with local aliases (718375b)
- refactor(skills): tag modify References/Mode-guides with read cardinality (2f97b15)
- refactor(skills): tag release References/Mode-guides with read cardinality (77fc525)
- refactor(skills): tag review References with read cardinality (00fdc98)
- refactor(skills): tag verify References/Mode-guides with read cardinality (875e660)
- refactor(skills): tag codify References with read cardinality (38ebccf)
- refactor(skills): tag planify References with read cardinality (789a247)
- refactor(skills): tag specify References with read cardinality (43699f0)
- refactor(skills): tag extract References/Mode-guides with read cardinality (c9950f1)
- refactor(skills): tag explore References/Mode-guides with read cardinality (8f70a85)
- docs(skills): add read cardinality convention to skill.template.md (43effc0)
- docs(skills): codify the guide-split pattern in skill.template.md (88ab07d)
- refactor(skills): split modify into Route A/B guides (bf39622)
- refactor(skills): split release into feature/maintenance guides (a675689)
- refactor(skills): trim generic guardrails from codify (0053d80)
- refactor(skills): drop redundant clarifying-questions line in extract (d311a57)
- refactor(skills): drop redundant clarifying-questions line in explore (88c6860)
- refactor(skills): split verify into first-run/resume guides (b3b9e5c)
- docs: update SKILL.md files to standardize step headings (256bd49)
- docs: align SKILL.md files to skill.template structure (99a6f28)
- docs: add skill template for consistent documentation structure (527cd8c)
- docs: standardize skill names in SKILL.md files (c92bb8e)
- docs: enhance SKILL.md files for Modify, Release, and Review skills (028997d)
- docs: update SKILL.md files for clarity and consistency (c1fc0be)
- feat: schemas extracted to their own files (9f282bb)
- docs: refine ER diagram templates and update system architecture documentation (0a47a30)
- docs: update Explore skill documentation to include ER diagram and refine templates (d54eddc)
- docs: update Explore and Extract skills documentation for clarity and consistency (be26f8a)
- feat(skills): explore skill reduced for clarity and cost efficiency (b0ea900)
- docs: update skills catalog and lifecycle documentation (9eb5181)
- feat! : big transfer (9efcf52)
- docs: enhance medium catalog and introduce lifecycle documentation (7f1a99c)
- docs: enhance medium catalog and SKILL.md for refactoring guidelines (fff72c0)
- docs: update medium catalog and introduce modify skill documentation (5e33fb2)
- docs: enhance SKILL.md and plan templates for contract clarity (64422db)
- docs: update medium catalog and refine skill documentation (3b32cc3)
- feat: small labs refactored (393b6c0)
- docs: remove outdated mode and skill documentation (a785955)
- docs: update SKILL.md for codify role and task clarifications (5f1d087)
- docs: update medium catalog and introduce planify skill documentation (6bd3d73)
- docs: refine extract skill and introduce mode documentation (670d337)
- docs: update medium catalog and establish templates for clarity (0d83c49)
- docs: update SKILL.md for codify and release processes (2140dd4)
- docs: enhance SKILL.md and introduce brownfield/greenfield modes (580e7ac)
- refactor: consolidate and streamline small project skills (261f1f4)
- docs: add templates for AGENTS, architecture, and establish skill (807491e)
- feat: medium size architect (952b20d)
- Merge branch 'main' of https://github.com/AIcodeAcademy/AIDDbot (3831622)
- feat: no DESIGN.md (68ccbad)
- Fix formatting in tier.rules.template.md (8bdc7fd)
- Fix  colon (e2c8b44)
- fix: colon (b562775)
- docs: slim and homogenize architect skills with mode-aware progressive disclosure (bb3d524)
- fix: skills templates mermaid (f8052be)
- docs: update AGENTS and SKILL templates for improved clarity and structure (e3334ff)
- docs: refine AGENTS and SOUL templates for clarity and consistency (e3dbcb0)
- docs: update AGENTS and SKILL templates for clarity and consistency (bb53354)
- feat: branching at planning stage (c49d1d4)
- docs: sdd artifacts table (59f02ea)
- docs(workflow): reorder SDD table and drop Design row (0c2aa09)
- docs(workflow): add output column and homogenize status in SDD table (c132f99)
- refactor(builder): homogenize frontmatter fields across builder templates (659f65e)
- refactor(builder): consolidate spec, plans and verify report per feature folder (d06ec26)
- docs: ground /establish product brief and e2e strategy (9b276d0)
- docs: homogenize green/brown handling across architect skills (ac634ab)
- refactor: fold envision DESIGN.md into /extract (a475bd3)
- docs: rename elaborate skill to excavate (227377d)
- docs: add templates for excavate skill documentation (b6c3ae6)
- docs: envision proposal to do (8ba0f98)
- Merge branch 'main' of https://github.com/AIcodeAcademy/AIDDbot (cd18bef)
- docs: update clone command in README and getting-started documentation (9ae9b48)
- Update clone command in README for efficiency (17fbbc2)
- docs: update envision and codify skills to clarify UI design specification process (b871a57)
- fis: shorter description (ec6e9a1)
- docs: de-duplicate architect skills and unify mode handling (21e5f05)
- docs: update establish and extract skill descriptions for clarity (ad6cb78)
- docs: unify architect workflow into one mode-aware pipeline (9f0a890)
- docs: enhance SOUL.md with updated identity, communication, values, boundaries, and principles (50a4bf3)
- docs: refine AIDD documentation for git rules and skills (ce1a708)
- docs: update skills documentation and remove repair skill (4bc54f1)
- docs: update AGENTS and SOUL documentation for clarity and structure (153ceae)
- docs: enhance AIDD documentation with new envision skill and updates (be1c358)
- docs: update AIDD workflow and skill documentation (43a5390)
- docs: update commands and documentation for AIDD workflow (d0e42da)
- docs: enhance skill documentation with tier definitions (42ce953)
- fix: colon (8af98e3)
- docs: update README and skill documentation (1425adc)
- refactor: update skills documentation for codify, planify, rectify, and verify (941114b)
- feat: enhance review and refactor skills, update documentation (cb23e29)
- feat: repair and rectify (a6179b0)
- docs: skills catalog (2bd14c4)
- docs: aidd and sdd workflows (ebf72f9)
- feat: add excavate skill and update documentation (09d298e)
- feat: simple agents (434f4f9)
- fix: tier scripts (80c63ff)
- feat: initialize (a53a1a4)
- feat: concise initialize (eb888f8)
- docs: update AGENTS.template.md for improved artifact status clarity (fad4e08)
- docs: streamline AGENTS.md and related documentation for improved clarity (58e2d58)
- docs: update AGENTS.md and skills documentation for clarity and consistency (402959d)
- docs: refine SKILL.md for clarity and structure (69c01b2)
- docs: update SKILL.md for release management process clarity (d0c71e4)
- docs: update skills documentation for clarity and consistency (1902e95)
- docs: update Explore and Extract skills documentation for clarity and structure (14ed07b)
- docs: update AGENTS.md and related skills documentation for improved clarity and structure (6f90f5b)
- docs: enhance AGENTS.md and related documentation for clarity on implementation context and skill usage (bff38e9)
- feat: simplification and normalization (bfea11d)
- docs: update AGENTS.md and related documentation to include slim Technology table (32c3d94)
- docs: slim AGENTS template and move stack detail to arch (956ef18)
- docs: enhance AGENTS.md and related skills documentation to clarify brownfield implementation context and update references (e510367)
- docs: centralize git workflow in AGENTS.md and remove shared/git.md references (32f8c3b)
- docs: complete Phase D — link docs to shared git and release skill (983a927)
- docs(architect): link git workflow to shared/git.md (1581ea3)
- docs(skills): deduplicate skills and centralize git helpers (a72994a)
- feat: big refactor (293813b)
- docs: update AGENTS.md and skills documentation to clarify paths, conventions, and skill-specific rules; remove outdated artifact conventions for improved usability (c8d0806)
- docs: update README.md to enhance documentation structure; clarify installation and workflow sections for improved onboarding (9ed861b)
- docs: update AGENTS.md and README.md to reflect renaming of 'Design' to 'Designer'; clarify skill descriptions and remove outdated catalog references for improved usability (92af329)
- Merge branch 'main' of https://github.com/AIcodeAcademy/AIDDbot (b73c873)
- feat: rename render back to design (d8326c1)
- feat: rename render back to design (648732e)
- docs: update README and skills catalog to reflect renaming of 'Design' to 'Designer'; add new documentation for designer pipelines and clarify skill descriptions for improved usability (242a451)
- docs: consolidate 'Why AIDD' content into README for improved accessibility; update links across documentation for better navigation and onboarding (ffc1326)
- docs: add 'Getting started' and 'Why AIDD' documentation; enhance AGENTS.md with new links for improved onboarding and understanding of AIDDbot principles (cb1c22f)
- docs: enhance AGENTS.md and README for clarity; introduce skills index and artifact conventions; update skill descriptions and documentation structure for better usability (478e44d)
- docs: update README and skills catalog for clarity and consistency; enhance skill descriptions and output expectations, including new design and verification processes (2de0efb)
- refactor: rename /design skill to /render (3782cce)
- feat: enhance release skill to manage versioning, changelog updates, and spec status; introduce changelog and version conventions for better documentation (95fc350)
- feat: add documentation for conventional commits and skill integrations; update SKILL.md to reference new files and clarify commit workflow (1aafa8a)
- feat: introduce repository skill for managing git branches and commits; update related skills to follow new git workflow (dcc2928)
- feat: add AIDDbot documentation and skills overview; update README and skill descriptions for clarity (fa278f6)
- fix: update next step suggestions in explore and naming modes to use correct commands (270b69f)
- feat: update workflow documentation to include /release command and changelog updates refactor: streamline craftsman pipelines by removing unnecessary sections and clarifying repair process feat: add image asset for documentation (362133b)
- docs: tables (3cd3e82)
- feat: add repair skill documentation and update workflow with repair command (8fa1272)
- fix: update `/repair` skill description in README to clarify functionality (03b0315)
- refactor: explore extract skills (f257033)
- docs: README (5d198c4)
- fix: initialize arch workflow (c3d37b1)
- feat: add AIDD skills catalog and update README for cloning instructions (91c0520)
- fix: update README to remove AIDDbot directory after cloning and emphasize human oversight in feature building (6794c3d)
- fix: blank lines (92c4f91)
- fix: readme skills groups (80089e7)
- docs: repo url (bc4842c)
- feat: renaming (88e6eaf)
- feat: add discover and extract skills with corresponding modes and templates (c104ed3)
- fix: skills table (da2ad64)
- docs: AIDDbot landing (3984b0d)
- docs: enhance README for clarity and consistency in skill descriptions (23bdbfe)
- docs: update README for clarity and consistency in skill descriptions (16135c4)
- docs: enhance README for clarity and consistency in skill descriptions (460e13b)
- docs: update skill descriptions for clarity and consistency in README (234e910)
- docs: update README and add initialize pipelines documentation for clarity and structure (ea2fb33)
- fix: update AIDD workflow documentation for clarity and accuracy (bfe3ce3)
- feat: rulify (0d652d1)
- feat: add architecture decision records and templates for reversify skill feat: implement system and entity relationship modes and templates for reversify skill (5e71a3c)
- chore: pre big refactor (40b36b8)
- fix: correct spelling and improve clarity in reversify skill documentation (73bc50d)
- feat: reversify (a382255)
- init: reversify (a8be6eb)
- fix: clarify codify and review command descriptions in documentation (67a9264)
- fix: update planify skill documentation for clarity and consistency in patterns fix: refine codify pipelines documentation to standardize plan naming conventions (d4bc230)
- feat: add codify pipelines documentation for various improvement scenarios (a9a20a9)
- fix: update design skill description and clarify implementation steps fix: streamline workflow by removing redundant review step after codify (5f7d508)
- feat: enhance review skill with detailed guidelines and structured reporting (858ed3d)
- fix: refine initialize skill description and update steps for clarity (3a1427b)
- fix: update codify skill description and clarify implementation steps (a303f14)
- feat: enhance planify and specify skills with detailed descriptions and conventions (fc6ecdd)
- fix: planify (ad9ab37)
- docs: workflows (6e1bb07)
- docs: skills readme with samples (8950e00)
- fix: design skill (25fa4e9)
- feat: design skill (5546943)
- fic: report name in diagram (d0c763c)
- feat: add accessibility and compliance review skills with templates and guidelines (fb80c46)
- feat: add accessibility verification skill and related resources (39e5401)
- chore: no ide lock-in (a86cd64)
- docs: read me (da16236)
- docs: update README for clarity and consistency in instructions (e72ebff)
- Revise README.md for clarity and feature descriptions (e06234a)
- docs: aidd workflow (c8774ea)
- feat: add skills for code simplification and verification with detailed guidelines (cc0759a)
- fix: minor changes in the skills (edbc0c4)
- docs: skills (3b2796a)
- fix: skills definitions and standards (c9c1f6d)
- feat: add planify and specify skills with templates and EARS convention (3e8b67f)
- docs: readme (a6a1c1c)
- docs: readme (a0ce5fb)
- chore: tmp (4c1814c)
- chore: move docs to temp (227da2e)
- docs: improve readme (44915fe)
- feat: add agents instructions and initialization skill templates (da214e9)
- docs: update README.md for clarity and consistency in AIDDbot description (f894602)
- chore: remove old copilot stuff (8aa3d04)
- fix: correct link format in Java instructions and update tools list in AIDDbot prompts (6e02909)
- docs: VScode Github Copilot install instructions (44297e8)
- fix: update prompt links in Architect, Builder, and Craftsman chat modes for consistency (98e8381)
- feat: copilot instructions (46fc6e2)
- feat: simplified spec workflow for AIDDbot (a2a33ea)
- feat: enhance chat modes by updating tools list and improving descriptions for clarity (a137cee)
- fix: update tools list in Builder and Craftsman chat modes for consistency refactor: remove reference to BACKLOG.md in git commit prompt (5926c5e)
- feat: update instruction templates for project structure and issue management feat: enhance feature prompts with validation steps and best practices (3ee2977)
- feat: builder prompts (8673e4b)
- docs: update feature specification templates for clarity and consistency (3f14010)
- fix: remove unnecessary lines from SYSTEMS instructions (f3916a0)
- feat: simplify Architect role with just PRD and Systems responsibilities (74eb8c5)
- docs: Update SYSTEMS template for clarity and structure (bc96b3a)
- docs: Change file paths for C3 → C4 diagrams (5b7e39d)
- Fix link formatting for A_docs-DOMAIN prompt (5089d4a)
- fix: markdown links in prompts file (de50d28)
- docs: Refine AIDDbot installation instructions in markdown (4ddfbd5)
- feat: add XUnit test generation instructions and best practices (39f413f)
- feat: add unit test best practices and guidelines for various frameworks (b0d6d3a)
- feat: add AIDDbot workflow diagram for better understanding of the process (5b0cbbd)
- docs: add emojis to section headers for improved clarity and engagement (665d460)
- feat: mix the doc stage into the clean one (7270f47)
- docs: streamline feature status terminology and remove obsolete templates (a6d1728)
- docs: update terminology from 'design' to 'plan' and clarify feature status in prompts and documentation (be35a39)
- docs: update terminology from 'plan' to 'tasks' in feature implementation prompts (371e490)
- docs: update feature status terminology from plan to tasks (78307af)
- docs: update model references in chat modes to 'Auto' (f7a8a70)
- docs: enhance clarity in product description and update code generation details (ff5480e)
- docs: clarify instructions on file replacement and restoration in AIDDbot installation prompt (570be2b)
- docs: tell the user that updates are all in replacement (65b7c19)
- docs: update chat mode model references to remove preview label and enhance prompt clarity docs: refine feature prompts to improve context and workflow instructions docs: enhance README with technical best practices for development (39a9afb)
- docs: add templates for PRD, briefing, spec, and systems architecture documentation docs: create systems architecture documentation for Minimal REST API and Simple CLI Application (4202bd0)
- docs: enhance Architect chat mode prompts with new scenarios and maintenance instructions docs: add AIDDbot glossary for consistent terminology in software development docs: update references to AIDDbot glossary in various prompt documents docs: remove obsolete STRUCTURE prompt and replace with brownfield documentation prompt docs: add maintenance prompt for managing backlog features and bugs (b9bb534)
- docs: update Architect chat mode prompts for clarity and add maintenance tasks (11e257b)
- docs: update prompts and templates for clarity and consistency across documentation (769a5a0)
- docs: add C4 model diagram instructions for project structure documentation docs: enhance Architect chat mode with legacy system considerations and new prompts (5e0853f)
- docs: enhance project structure documentation and prompts (18fe102)
- fix: update tooling instruction identifiers for consistency (a1dd39f)
- docs: add Services Instructions section to guidelines (b9217f1)
- docs: glossary (647b871)
- docs: enhance clarity in architecture and glossary instructions; update feature documentation prompt (3ee115d)
- fix: refine descriptions in Architect, Builder, and Craftsman chat modes for clarity docs: update copilot instructions for improved prompt guidance and scenarios (993e4d4)
- docs: architecture and glossary (a23a5c8)
- docs: structure (532fd01)
- docs: smaller image (5df2c2f)
- docs: repo link (7feb70c)
- feat(gpt5): Update to work with the  free mini model (e72d9e2)
- fix: update prompt list in Builder chat mode to replace feature tasks prompt with feature plan prompt (901537f)
- fix: correct prompt prefixes in Craftsman chat mode and update feature clean prompt description for clarity (cf49751)
- fix: update tools list in Architect, Builder, and Craftsman chat modes to include additional functionalities (30f4497)
- fix: update links in BACKLOG template to point to the correct directory (ec0b961)
- feat: add template for documenting project structure and update feature documentation prompt to reference it (31e9d74)
- fix: update validation steps for .github directory installation instructions (2cda600)
- feat: add C# and Java CLI archetype documentation and configuration files (804aaf5)
- fix: standardize description formatting in markdown files (f8485b5)
- feat: expand glossary with terminology definitions and enhance feature design template descriptions fix: update validation link in feature implementation plan prompt and improve VSCode settings for markdown support chore: remove outdated architecture best practices document (9edef5c)
- fix: correct applyTo order and improve clarity in clean code instructions (54b4364)
- feat: update architecture documentation and add glossary for clarity and consistency (ad9a23d)
- Refactor architecture documentation: consolidate best practices, remove outdated files, and enhance clarity with structured guidelines for software architecture. Introduce a comprehensive project architecture blueprint generator with detailed configuration options and analysis prompts. (1fa58c2)
- feat: enhance Copilot instructions and architecture best practices documentation (f39a4de)
- feat: update VSCode settings and extensions for improved Java development (174e49c)
- feat: vscode java (d3bba8a)
- feat: add VSCode configuration files for improved development experience (5f0aaf5)
- wip: architecture best practices (99c4985)
- feat: add VSCode configuration files for improved development experience (f681094)
- fix: add model to chat modes (d003ebc)
- feat: Add various documentation templates and best practices for TypeScript, EARS, and Object Calisthenics (2b755b0)
- feat: add chat modes and instructions documentation for AIDDbot integration with GitHub Copilot docs: create detailed instructions for using AIDDbot with VSCode and GitHub Copilot refactor: update prompts and chat modes for better organization and clarity delete: remove outdated draft instructions file (e6c530b)
- docs: reorganize prompts and enhance usage instructions for clarity (88ef1a6)
- feat: Update GitHub Copilot instructions and prompts (ed39d06)
- docs: add AIDDbot workflow and usage documentation docs: create VSCode and GitHub Copilot setup guide docs: add archetype for Node.js CLI project docs: create temporary markdown file for future use docs: remove .gitignore file (0368716)
- docs: enhance AIDDbot usage instructions with detailed prompt descriptions (194e298)
- docs: prompt emojis (b406a4e)
- docs: update VS Code guide to reflect new Architect/Builder/Craftsman chat modes and prompts (9f86394)
- docs: remove deprecated Commander instructions (4c3fb75)
- docs: remove applyTo from lib instruction headers (inherit via repo rules) (617d8f5)
- docs(standards): rename Object Calisthenics instructions to std-* and update prompt reference (db33eb4)
- docs(node): document Node --env-file usage and consolidate into framework instructions (2d6ae1e)
- feat: add C# best practices and usage guidelines feat: introduce Object Calisthenics principles for OOP fix: update applyTo patterns in clean code instructions (1cde677)
- feat: add comprehensive Java best practices and usage guidelines (9a95d6d)
- docs: add standard instructions for conventional commits (d847d1f)
- feat status (0fe23fc)
- feat: naming (ec7d57e)
- docs: update instruction templates for feature design, implementation, and specification docs: enhance TypeScript best practices and clean code instructions fix: correct prompt links in feature-related prompts (2810a20)
- feat!: renaming of chat modes, prompts and instructions (fefa56c)
- docs: update README files to correct Spanish document links and enhance clarity on AIDDbot functionality (532454d)
- docs: update README files to include AIDDbot workflow information (7244fc4)
- docs: update README files to clarify AIDDbot functionality and installation instructions (664e3a7)
- docs: update README files to improve clarity on AIDDbot usage with VSCode and GitHub Copilot (f4c6462)
- docs: clarify LLM compatibility and enhance installation instructions in README files (70d84a4)
- docs: update image paths in README files and add new documentation on AIDDbot workflow and usage (ab51e69)
- docs: claim (bae5387)
- docs: add instructions and prompts documentation for better guidance and usage examples (4e89959)
- docs: update installation instructions in README files for clarity and consistency (330ac22)
- docs: update README files with additional information links and improve formatting (047444c)
- docs: enhance README with clearer structure and detailed descriptions; improve formatting and add missing sections (868e49d)
- docs: update software architecture best practices; clarify concepts and improve structure (a8cb919)
- Add best practices for SQL and Node.js testing; update instructions and remove obsolete files (afbcc9c)
- docs: add templates for BACKLOG, DOMAIN, SYSTEMS, and GitHub issue documents; update prompts for generating documentation docs: remove outdated BACKLOG and backlog update prompts (43cc6c8)
- docs: add templates for Domain Model and Project Requirements documents; update prompts for generating documentation (d53486c)
- docs: update AIDDbot chat modes and copilot instructions for clarity and structure; remove memory instructions file (09aa564)
- docs: add comprehensive guide for setting up and using GitHub Copilot in VSCode (de34840)
- docs: enhance README.es.md with additional workflow and usage information (dd0699d)
- docs: update prompts links in README and add AIDDbot workflow documentation (7d3fa94)
- docs: update AIDDbot documentation for clarity and structure improvements (c8396b6)
- fix: correct emoji representation in roles and instructions sections of README.es.md (10bb144)
- docs: sync Spanish README with updated English version (7df8da2)
- feat: add AIDDbot documentation and prompts for improved user guidance (909ea15)
- fix: improve clarity and consistency in README content (8999c8d)
- feat: add prompts documentation with examples for better user guidance (8bd6bde)
- fix: clarify prompt invocation and enhance AIDD principles descriptions for better understanding (980255e)
- docs: update English README to match latest Spanish version (a4f03f6)
- fix: update descriptions for clarity and consistency in instruction files and README (c98e986)
- fix: remove unnecessary wording in AIDDbot description for clarity (4aea9eb)
- fix: correct AIDDD references to AIDD in README and aiddbot.com documentation for consistency (d01ef8f)
- docs: unify to single AIDDD chat mode and convert legacy modes into role prompts across README(en/es) and blog (3798021)
- fix: update links and improve clarity in prompts and instructions; standardize status indicators (b52f968)
- feat: add tech stack section to SYSTEMS instructions; include detailed bill of materials for frontend, backend, and database (93306c0)
- feat: add AIDDbot chat modes and prompts for Architect, Builder, and Craftsman roles; update copilot instructions for clarity (31efa3e)
- fix: update action descriptions in Architect and Builder chat modes for clarity; add new instruction files for libraries and environment variable handling (8a6bfad)
- fix: update descriptions in Architect, Builder, and Craftsman chat modes for consistency (da7b3e8)
- fix: reorder tools in Craftsman chat mode and clarify database instructions in feature prompts (ed97d90)
- fix: update model version to GPT-5 (Preview) in Architect, Builder, and Craftsman chat modes (6314e3b)
- fix: update instruction file length guideline from 100 to 250 lines for clarity (1b5b3ae)
- feat: add example link to Clean Code Instructions and clarify instruction file length in Library Instructions Generator (777763d)
- fix: remove applyTo field from architecture instructions and update SYSTEMS prompt to include architecture instructions link (632b932)
- fix: update file associations for JOURNAL.md and add design file type (56caf05)
- fix: update repository links in installation instructions for AIDDbot (e8208e5)
- feat: enhance prompts and instructions for improved clarity and workflow; add library instructions generator (5d3ce56)
- feat: remove unused tools and update context instructions in git commit prompt (7927613)
- feat: update tools list in Architect, Builder, and Craftsman chat modes for improved functionality and consistency (9a5d9be)
- feat: update Craftsman and feature code prompts for improved workflow and documentation steps (36c4f44)
- feat: enhance BACKLOG documentation and prompts with new structure, status legends, and update workflow instructions (8b59f5f)
- feat: update chat modes and prompts with improved instructions, tools, and context; add library instructions generator (a491b0b)
- feat!: updated after battle test (496004e)
- fix: remove pronunciation reference for AIDDbot in Architect and Builder chat modes; update tool lists in Craftsman and instructions files (bf6b281)
- feat: enhance copilot instructions with response guidelines and memory management; add modern Node.js best practices reference (386eec4)
- fix: correct pronunciation of AIDDbot and improve README clarity (3b9e54b)
- feat: update chat modes and instructions prompts; add GitHub issues prompt and library instructions generator (fdd00eb)
- docs: README AIDD manifesto (e426f4f)
- docs: README and main blog article (7ec61c3)
- docs: links and instructions (ed178c5)
- docs: change github org (1436546)
- feat: change github org (d03cc5a)
- docs: aiddbot image (2203a74)
- feat: playwright instructions (cb7aa7f)
- feat: update backlog instructions and add new guidelines for Playwright tests (829e78f)
- feat: craftsman prompts (cdfa992)
- feat: test prompt for craftsman (210ab99)
- feat: context for builder prompts (013125f)
- docs: refined instructions (4b832d8)
- feat: apply instructions (4dbef2e)
- docs: outcomes and icons (e0829a8)
- feat: backlog to builder, scenarios and role outcomes (4ce26f3)
- feat: enhance Craftsman chat mode and improve TypeScript instructions; remove obsolete files (56def72)
- docs: outline (879f2dd)
- feat: links and meta (55a8865)
- docs: outline and format (41aad79)
- feat: improve readability (c2ccc74)
- docs: Readme installation and usage for GitHub Copilot (e8bc98b)
- fix: install via gi (c6dc425)
- feat: git clone (6896b10)
- fix: install without git (125161e)
- feat: add installation prompts for AIDDbot on GitHub Copilot (e761825)
- feat: angular framework instructions (5ac1893)
- feat: improve builder instructions (f47b137)
- feat: improved chat modes and prompts (9c3c301)
- refactor: update documentation links and statuses in prompts and instructions for clarity and consistency (6a8c886)
- feat: enhance architecture and Node.js with TypeScript instructions for clarity and structure (94e61b5)
- feat: add best practice guidelines for architecture, clean code, database, Node.js with TypeScript, project structure, and TypeScript (3738a3d)
- feat: add .gitignore file to exclude unnecessary files and directories (6859ca3)
- refactor: update chat mode models to Claude Sonnet 4 and enhance documentation templates (91a697b)
- refactor: update model version to GPT-4.1 in architect chat mode documentation (048fecc)
- refactor: update descriptions in architect chat mode and copilot instructions for clarity (13c4ace)
- refactor: remove unused tools from prompt documents for clarity (3a37c58)
- refactor: streamline chat mode tools and enhance prompt instructions for clarity (edd391f)
- chore: remove outdated documentation files for AssetsBoard (3925513)
- refactor: update BACKLOG instructions and prompts for clarity and consistency (d4bdd02)
- feat: add epics summary table to BACKLOG.md (ba88620)
- refactor: update BACKLOG.md format to match template specifications (13e23b8)
- docs: create feature backlog for AssetsBoard project (bc2ae80)
- refactor: simplify systems architecture to minimal dependencies (9d7d487)
- docs: create systems architecture for AssetsBoard (d447c14)
- docs: create domain models for AssetsBoard (2969026)
- refactor: update tools in architect chat mode and remove obsolete PRD prompt (903ce5d)
- docs: create initial PRD and README for AssetsBoard (11e8e67)
- chore: remove README.md file (4674566)
- Merge branch 'main' into assets-board (bf6711b)
- refactor: update git-commit, git-init, and journal prompt files for consistency (f82bab0)
- refactor: update prompt files to agent mode and add new PRD prompt (1b3e7b1)
- feat: update project documentation templates and prompts for clarity and consistency (5b9ff69)
- refactor: update Architect stage documentation for clarity and remove legacy instructions (9d932d1)
- feat: enhance Architect chat mode and PRD instructions with clearer goals and workflows (0f501d6)
- docs: actualiza instrucciones y prompt de git-commit (1fce820)
- chore: elimina plantillas e instrucciones legacy de blueprints en .ai/architect (c4c23d3)
- docs: link to repo (1e379cc)
- feat: update journal prompt, VSCode settings, and add BACKLOG instructions template (b8a0b34)
- Merge branch 'main' of https://github.com/AIcodeAcademy/AIDDbot (f681670)
- chore: remove unused settings and add new documentation for architect chat mode and project instructions (5d1b536)
- fix: update folder and file associations in VSCode settings for clarity (1047eb8)
- fix: correct terminology from 'component' to 'container' in system templates and update folder structure in feature template (e4a1528)
- docs: refine systems architecture documentation and template (f5fca72)
- Update README.md (1e24575)
- docs: update feature and domain model templates with references to Briefing Blueprint (6e6f7fb)
- chore: standardize template syntax and update README for clarity (92f4f27)
- docs: update README with Spanish resources (127b582)
- feat: enhance README and add architect templates (6327a09)
- Initial commit (1ff47c0)
