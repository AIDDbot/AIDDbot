# Code rules

The rules of all the projects of a system that `architect-system-foundation` made, when `{Product_Folder}/system.md` exists. Each project `AGENTS.md` gives only its data: do not explore the code to learn the setup.

## Architecture

| Container | Is | Never |
| --- | --- | --- |
| `core` | The platform, called one time at startup: composition, server or shell, router, connections, error handler. | Business rules. Imports of a feature. |
| `shared` | Code with no domain, and the contracts of the services of `core`. At its root, only the expected error and the identity type. | Domain words. Imports of `core` or of a feature. |
| feature | One flat folder for one unit of business value. The role in a file name gives its layer. | Subfolders. Imports of `core` or of a different feature, except its facade. |
| `main` | The only file at the root of the source: it awaits `start` of `core/lifecycle/` with the manifest (the features by name) and the identity. `core` gets the features as data. | Logic. Automatic discovery, such as folder scans or file-based routers. |

- In `core` and `shared`, one folder for each concern, from the closed list of the project; never `utils`, `helpers`, `common` or `misc`.
- `presentation` (input, output and the registration) → `logic` (the rules; it does not know the storage) → `data` (all that the project reads or writes outside itself). No layer skips the next. A different feature imports only the `facade`, which calls `logic`.
- A unit test sits beside its module, for each file with code except the entry, the adapters of `core` and the components; at least one for each business rule. It gets each external effect as an argument, with a fake, never by replacing a module.
- An `e2e` has no layers and no unit tests. A test proves one requirement and has its ID in its name. It uses only the API, the screens and the commands, starts each project with its start command, never opens the database, and makes its own unique data.
- `shared/README.md` of each project lists each file and its exports: read it before you write a check, a conversion or a format.

## Code

Each row is the intent of a check and its limits (code / tests). `crap` and `layers` check them; write within them the first time.

| Intent | Limits | How |
| --- | --- | --- |
| Keep each unit small | parameters 2 / 4, complexity 8, statements 16 / 64, nesting 2 / 4, lines of a file 128 / 256 | More values go in one object with a named type, never with outputs. A choice between kinds is a table (`Record<Kind, Handler>`), never a chain of `if` or a `switch`. A function with several steps calls one function for each step. A framework callback, such as a middleware, goes in `core/{concern}/{topic}.middleware.ts`. |
| Make each decision readable | one logical operator between names | The test of each `if`, loop and ternary (`? :`), also in a test file, is a name: `const isUnknown = version === undefined; if (isUnknown)`, never `if (version === undefined)` or `version === undefined ? a : b`. Name it as the code tests it: `if (isMissing)`, never `if (!isPresent)`. A callback goes in a `const` before the condition or the loop: `const active = items.filter(isActive); for (const item of active)`. |
| Name each shape | each parameter, each exported return | A named type, also the props of a component: never an object type or `ReturnType<…>` in a signature. |
| Change nothing that you get | no parameter written | Return a new value. `Object.assign` to a parameter is the same, though the check does not see it. State that changes stays in a closure. |
| Keep the layers apart | 16 entries in a folder | Imports go down the layers. A folder over the limit divides by concern. |
| Prove each decision | coverage 100 of the lines and the functions | An adapter has no branch, no `??` and no default value: the decision goes to a function of `core` that gets the adapter as an argument. |

- One type for each domain concept, never a bare primitive. Generic types in `shared`, domain types in their feature.
- One name for one meaning in a module, and one source for each definition: a default, an option, a usage text or a list of names is data in one place. Never parse a display text to get the data again.
- A function at an edge gets `unknown` and returns the exact type: the caller never checks or converts the value again.
- Catch errors only at the edges: the error handler of `core`, and `data` when it changes an external failure into the expected error.
- No check, limit or default value that the spec does not state. Never a lint comment, and never an exception in the lint configuration, except the one that the evidence of a debt item names for a rule that the framework makes a false alarm.
