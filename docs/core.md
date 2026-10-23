# The core

The core is a small command-line program in your repository: `node .agents/aidd/aidd.mjs`. The agents do the work that needs judgment. The core does the work that has one correct result: it runs the commands, records the results, and refuses the steps that break the process.

It needs only Node.js. It has no dependencies and no server, and it does not use the network. `init` installs it, and `update` replaces it.

> [!NOTE]
> **You never run the core by hand.** The agents call it at each step. You only talk to your agent with the three commands. This page explains what occurs behind them.

## Deterministic and non-deterministic work

AIDDbot divides the work in two parts:

- **Non-deterministic work** needs judgment: design a system, write a spec, write code, review a change. A model does it. The same request can give a different answer each time.
- **Deterministic work** has one correct result: run a test, record a result, check a rule, increase a version. The core does it. The same input gives the same answer each time.

A model never does deterministic work by hand. Each step goes to the part that does it best.

| | The agents (non-deterministic) | The core (deterministic) |
| --- | --- | --- |
| **Reliability** | A model can forget a step, skip a test, or write a record by hand. A skill can only ask it not to. | A rule in code is always true. The core refuses the step, and its message tells the agent what to do. |
| **Speed** | Each step is a turn of reasoning. | Each command runs in a moment. The time of a run is the time of your tests. |
| **Cost** | Each line that a model reads or writes costs tokens. | A check costs no tokens. A test run gives the agent only the last lines of its output; the full output stays in `.aiddbot/logs/`. |
| **Evidence** | The reasons of a decision stay in the conversation. | The state stays in files in Git. A new clone of the repository gives the same answer. |

In a real run, the tests used about 15 % of the time. The reasoning of the models used the rest. Thus each step that moves from the model to the core makes the delivery faster, cheaper and more reliable.

## What it guards

The core refuses a step when a rule is not true. It stops with an error message that tells the agent what to do.

| The core refuses | Until |
| --- | --- |
| A commit, an evaluation or a release of a spec | The human approves the spec. |
| A new spec | The open spec ships. Only one spec is open at a time. |
| A commit that the pre-commit hook refuses | You fix the errors that the hook shows. |
| A commit on the main branch | Never: only `release` and `integrate` write there. |
| A commit of installed dependencies, such as `node_modules/` | Never. |
| A commit of text with garbled characters, as a shell with the wrong encoding writes them | Never. |
| A second run of a test command | The first run ends. Two runs share ports and databases. |
| A green verification | The acceptance tests of the spec (`test --spec`) pass on the current code, and each requirement has an acceptance test. |
| An evaluation that the type does not need | Never: a `chore` has no verification, and a `refactor` has no evaluation. |
| A non-green evaluation | Its report of findings exists. |
| A release | The spec has all the evidence of its type, and the regression passes on the current code: the full `test`, with the unit tests and the full acceptance suite. Open `high` debt can record a failure. |

## What it owns

Only the core writes these files. Nobody edits them by hand.

| File | Content |
| --- | --- |
| `.aiddbot/debt.json` | The open debt. |
| `.product/PRD.md` | One line for each shipped feature. |
| `.aiddbot/config.json` | The projects and their commands. |
| `.aiddbot/counters.yaml` | The next IDs of the specs and the debt. |
| `.aiddbot/logs/` | Ignored by Git: one folder for each day, with its journal (the agents add only their judgments to it, through the core) and the full output of each failed run; the full output of the last run of each command; and the work state of each spec (its runs, its evaluations and their commits). |
| `package.json`, `CHANGELOG.md`, the tags | The version of your product. |

The agents write only the texts: `system.md`, each spec, the reports of findings, and the `AGENTS.md` files.

## Commands

| Command | Purpose |
| --- | --- |
| `spec new` · `spec debt` · `spec show` | Open a spec on its branch, from a request (`feat`, `fix`, `chore`) or from a debt item (`fix` from high, `refactor` from medium). Show the state and the blockers of a spec. |
| `run <kind>` | Run a project command: `upgrade`, `test`, `layers` or `crap`. `test` runs the `e2e` project last. `--spec` runs the `test:spec` slot of each `e2e` with only the tag of the spec (or the tests that a `fix` cites): the evidence of the verification. The full `test` is the evidence of the release. |
| `eval` | Record a verification or a qualification, with its status. |
| `commit` | Commit with the guards above. |
| `debt add` · `list` · `remove` | Change or show the debt register. |
| `release` | Ship the open spec: version, changelog, PRD, the index of each `shared` folder, merge and tag; it refuses an `AGENTS.md` out of form. `--debt <D IDs>` names the open `high` debt that records each failure of the regression. |
| `integrate` | Merge a branch that is not a spec, such as `chore/foundation`. |
| `agents check` · `index` | Check the form of each `AGENTS.md` (at most 128 lines, the sections of its template in order, no empty section, no comment), or write the index of each `shared` folder. `release` runs both. |
| `log` | Add a judgment of an agent to the journal. `log approved` commits the spec definition, and refuses a spec over its size limits: 9 requirements, 3 user stories, 5 business rules, fewer than 100 lines. |
| `config get` · `set` | Read or write `.aiddbot/config.json`. |

The `run` command does not know your technology. It executes the command that the foundation recorded for each project, such as `npm test` or `pytest`. Each run stops after 20 minutes by default.

Each command writes its result as JSON. The exit code is `0` for success, `1` for a refused rule, `2` for a usage error, and `3` when a project has no command for that kind.

## Look inside, if you want

You never need these commands: the agents run them, and the journal shows each result. To examine the state yourself, these commands only read it. On a spec branch, `spec show` needs no ID.

```bash
node .agents/aidd/aidd.mjs spec show S0012   # a spec, its evidence and its blockers
node .agents/aidd/aidd.mjs debt list         # the open debt
node .agents/aidd/aidd.mjs help              # all the commands
```

To see the full rules of the evidence, read the [AIDD workflow](./AIDD.workflow.md#evidence).

---

← [How it works](./how-it-works.md)
