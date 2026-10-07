# Coding

## Names

- Use the idioms of the language. Use the words of the domain.
- A function name is a verb. A type or a variable name is a noun.
- A boolean or a predicate name is a question: `isActive`, `hasItems`, `canEdit`, `mustRetry`.
- Do not use negative names, such as `isNotValid`.
- Do not abbreviate, except standard terms such as `id` or `url`.

## Conditions

- A condition has one logical operator at most.
- Move a larger condition to a named variable or a predicate.

## Errors

- Catch errors only at the edges: the error handler of `core`, and `data` to change an external failure into an expected error.
- Do not hide errors.
- Make value objects at the edges. Inside, trust the types.

## Scope

- Get the configuration from the environment. Do not write configuration values in the code.
- Write each query as a named constant in the `data` file that uses it.
- Add a dependency only with the package manager.
- Do not add a check, a limit or a default value that the spec does not state.

---

← [Data](./data.md) · [Principles](./README.md) · [Complexity](./complexity.md) →
