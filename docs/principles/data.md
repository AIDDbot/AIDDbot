# Data

## Types

- Use the strictest typed form of the language and its strictest type check.
- Give each domain concept its own type. Do not use a bare string or number for it.
- Use a value object for a value with rules. Examples: an email, an amount, an identifier.
- Use a closed type for a closed set of values: an enum or a union of literals.
- Make larger types from smaller types. Use composition, not inheritance.
- Put a generic type in `shared`. Put a type with domain words in the types of its feature.

### Shared utilities

- `shared` has functions for each common type, such as integer, date and email.
- Each function checks, converts or formats one type.
- DRY: use them. Do not write them again.

## Schemas

The system has one data model. Three schemas show it:

- The entity-relationship schema shows the entities and their relations. It has no technology.
- The relational schema shows the tables of `back-api`. Numbered migration files keep it.
- The API schema shows the bodies of the REST API. It does not copy the tables.

When the data model changes, update each schema that the change touches.
