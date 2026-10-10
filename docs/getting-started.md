# Getting started

This guide takes you through your first session. To understand the process, read [How it works](./how-it-works.md).

## 1. Install

You need:

- Node.js 18 or later, and Git.
- A coding agent: Claude Code, Codex, GitHub Copilot or Cursor.
- A model from 2026 or later. Older models often skip the commands that keep the evidence.

In the root folder of your repository, run:

```bash
npx github:AIDDbot/AIDDbot init
```

`init` adds the skills and the agent profiles, and commits them. If the folder is not a Git repository, it makes one. It never writes over a file that exists. To see the changes first, add `--dry-run`.

## 2. Prepare the system

Open your coding agent in the same folder. Run:

```text
/architect-system-foundation
```

In Codex, start each command with `$` instead of `/`.

- **Brownfield** (existing or legacy code): the agent documents your code. It does not change it.
- **Greenfield** (an empty repository): the agent asks about your product, and proposes a system. Approve it. Then the agent makes the projects and their foundation, and stops when all the tests pass.

For a web system with an API and users, the first offer is [Archetype Base v0.3.9](https://github.com/AIDDbot/archetype-base/tree/v0.3.9). It already has the foundation and its tests.

## 3. Deliver a change

Write your request in natural language:

```text
/build-requested-spec riders can rate a trip from 1 to 5 stars
```

The agent shows a spec with its requirements. Read it, and approve it or ask for changes. Then the agents write the code, test it, and ship it as a new version.

> [!TIP]
> To skip the approval, add `YOLO` to the request.

## 4. Repair debt

From time to time, run:

```text
/craft-lasting-quality
```

The agents scan the quality of the code, record the debt, and repair the most important part. To upgrade the dependencies, ask for it: `/craft-lasting-quality upgrade the dependencies`.

## 5. Update AIDDbot

```bash
npx github:AIDDbot/AIDDbot update
```

`update` replaces the skills and the agent profiles. It keeps your project files and your records. To select the models and the effort of the agents, see [Customize agent profiles](./agent-customization.md).

## Next

- [How it works](./how-it-works.md): the agents, the flows and where to look.
- [Customize agent profiles](./agent-customization.md).
