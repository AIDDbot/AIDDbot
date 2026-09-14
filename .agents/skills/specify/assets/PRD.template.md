# Product requirements

<!-- Authoring contract: keep one permanent ID and one current requirement per line,
grouped by product category. F identifies functional behavior; T identifies a
durable technical requirement. Never reuse IDs or renumber unaffected requirements.
The PRD owns normative requirement text; it is not an index of specs or test tasks.
Do not add delivery status, change labels, or spec history to requirement lines.

Every F requirement uses EARS with an observable response and precise conditions.
Choose the applicable pattern: The system shall ...; When ..., the system shall ...;
While ..., the system shall ...; Where ..., the system shall ...; If ..., then the
system shall ... . Combine conditions when necessary. Split independently testable
obligations. Avoid vague outcomes such as "correctly", "fast", or "user-friendly".
T requirements must also be measurable; do not invent functional requirements for
implementation tasks. Patterns follow https://alistairmavin.com/ears/ .

On the spec branch, add new lines and replace changed text under its existing ID.
Keep deprecated lines unchanged until shipping passes the required checks; shipping
removes them together with the implementation. Preserve all other current lines.
Remove these comments and replace the illustrative rows in the completed artifact. -->

## {Category}

- F0001: When {trigger}, the system shall {outcome}.

- T0001: The system shall {technical outcome}.

---

> last updated: {DateTime}
