# Clean code best practices 

## Variables and naming
- Name variables and functions descriptively to enhance readability.
- Use named constants instead of magic numbers or strings.

## Functions and complexity
- Keep functions small and focused on a single task.
- Avoid nested structures to reduce complexity.
- Use early returns to minimize indentation.

## Classes and modules
- Avoid primitive obsession by defining types.
- Favor composition over inheritance.
- Keep dependencies to a minimum.
- Use adapter pattern to decouple from external systems.
- Maintain a shared module (folder...) for common utilities and types.

## Error handling and comments
- Handle errors gracefully with try-catch blocks and meaningful messages.
- Write comments to explain the "why" behind complex logic, not the "what".

## General principles
- Keep it simple and avoid over-engineering.
- Try to keep it DRY (Don't Repeat Yourself) by reusing code where applicable.

## Bad smells and opportunities for simplification

**Structural complexity:**

| Pattern | Signal | Simplification |
|---------|--------|----------------|
| Deep nesting (3+ levels) | Hard to follow control flow | Extract conditions into guard clauses or helper functions |
| Long functions (50+ lines) | Multiple responsibilities | Split into focused functions with descriptive names |
| Nested ternaries | Requires mental stack to parse | Replace with if/else chains, switch, or lookup objects |
| Boolean parameter flags | `doThing(true, false, true)` | Replace with options objects or separate functions |
| Repeated conditionals | Same `if` check in multiple places | Extract to a well-named predicate function |

**Naming and readability:**

| Pattern | Signal | Simplification |
|---------|--------|----------------|
| Generic names | `data`, `result`, `temp`, `val`, `item` | Rename to describe the content: `userProfile`, `validationErrors` |
| Abbreviated names | `usr`, `cfg`, `btn`, `evt` | Use full words unless the abbreviation is universal (`id`, `url`, `api`) |
| Misleading names | Function named `get` that also mutates state | Rename to reflect actual behavior |
| Comments explaining "what" | `// increment counter` above `count++` | Delete the comment — the code is clear enough |
| Comments explaining "why" | `// Retry because the API is flaky under load` | Keep these — they carry intent the code can't express |

**Redundancy:**

| Pattern | Signal | Simplification |
|---------|--------|----------------|
| Duplicated logic | Same 5+ lines in multiple places | Extract to a shared function |
| Dead code | Unreachable branches, unused variables, commented-out blocks | Remove (after confirming it's truly dead) |
| Unnecessary abstractions | Wrapper that adds no value | Inline the wrapper, call the underlying function directly |
| Over-engineered patterns | Factory-for-a-factory, strategy-with-one-strategy | Replace with the simple direct approach |
| Redundant type assertions | Casting to a type that's already inferred | Remove the assertion |