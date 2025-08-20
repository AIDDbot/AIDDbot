---
description: 'Object Calisthenics for OOP paradigm'
---
# Object Calisthenics for OOP paradigm

This rule enforces the principles of Object Calisthenics to ensure clean, maintainable, and robust code in the backend, **primarily for business domain code**.

### Scope and Application

- **Primary focus**: Business domain classes (aggregates, entities, value objects, domain services)
- **Secondary focus**: Application layer services and use case handlers
- **Exemptions**:
  - DTOs (Data Transfer Objects)
  - API models/contracts
  - Configuration classes
  - Simple data containers without business logic
  - Infrastructure code where flexibility is needed
- **Examples**: Written in C# but applicable to any OOP language like Java, TypeScript, etc.

### Key Principles

1. **One Level of Indentation per Method**:
   - Ensure methods are simple and do not exceed one level of indentation.

2. **Don't Use the ELSE Keyword**:
   - Avoid using the `else` keyword to reduce complexity and improve readability.
   - Use early returns to handle conditions instead.
   - Use Fail Fast principle
   - Use Guard Clauses to validate inputs and conditions at the beginning of methods.

3. **Wrapping All Primitives and Strings**:
   - Avoid using primitive types directly in your code.
   - Wrap them in classes to provide meaningful context and behavior.

4. **First Class Collections**:
   - Use collections to encapsulate data and behavior, rather than exposing raw data structures.
     First Class Collections: a class that contains an array as an attribute should not contain any other attributes

5. **One Dot per Line**:
   - Limit the number of method calls in a single line to improve readability and maintainability.

6. **Don't abbreviate**:
   - Use meaningful names for classes, methods, and variables.
   - Avoid abbreviations that can lead to confusion.

7. **Keep entities small (Class, method, namespace or package)**:
   - Limit the size of classes and methods to improve code readability and maintainability.
   - Each class should have a single responsibility and be as small as possible.

   Constraints:
   - Maximum 10 methods per class
   - Maximum 100 lines (excluding blank lines and comments) per class
   - Maximum 10 classes per package or namespace

8. **No Classes with More Than Two Instance Variables**:
   - Encourage classes to have a single responsibility by limiting the number of instance variables.
   - Limit the number of instance variables to two to maintain simplicity.
   - Do not count ILogger or any other logger as instance variable.

9. **No Getters/Setters in Domain Classes**:
   - Avoid exposing setters for properties in domain classes.
   - Use private constructors and static factory methods for object creation.
   - **Note**: This rule applies primarily to domain classes, not DTOs or data transfer objects.

### Implementation Guidelines

- **Domain Classes**:
  - Use private constructors and static factory methods for creating instances.
  - Avoid exposing setters for properties.
  - Apply all 9 rules strictly for business domain code.

- **Application Layer**:
  - Apply these rules to use case handlers and application services.
  - Focus on maintaining single responsibility and clean abstractions.

- **DTOs and Data Objects**:
  - Rules 3 (wrapping primitives), 8 (two instance variables), and 9 (no getters/setters) may be relaxed for DTOs.
  - Public properties with getters/setters are acceptable for data transfer objects.

- **Testing**:
  - Ensure tests validate the behavior of objects rather than their state.
  - Test classes may have relaxed rules for readability and maintainability.

- **Code Reviews**:
  - Enforce these rules during code reviews for domain and application code.
  - Be pragmatic about infrastructure and DTO code.
