---
description: 'Java best practices and usage guidelines'
applyTo: '**/*.java'
---

# Java Instructions

Follow [Clean Code Best Practices](./bst_clean-code.instructions.md) for general guidance.

## Installation & Setup

- JDK: Use an LTS JDK (17 or 21). Set JAVA_HOME; ensure UTF-8 default encoding. Prefer toolchains to pin versions.
- Build tools
  - Gradle: enable Java Toolchain; use BOMs (`org.junit:junit-bom`, SLF4J) to align versions.
  - Maven: import BOMs; depend on `junit-jupiter`; apps add one SLF4J provider (e.g., Logback), libraries depend only on `slf4j-api`.
- Formatting: enforce Google Java Style (100 columns, no wildcard imports) with Spotless + google-java-format. Run checks in CI.
- Compiler: enable warnings (`-Xlint:all`); keep builds warning-free in CI. Align `--release` with toolchain.
- Testing: JUnit 5 (Jupiter) with `@Test`, lifecycle callbacks, `assertThrows`, and parameterized tests.
- Logging: SLF4J API with parameterized messages; exactly one provider for applications.

## Core Concepts

- Types and immutability: prefer immutable types; make fields `private final`; initialize via constructors/factories; use records for pure data.
- Contracts: implement `equals`, `hashCode`, `toString` consistently; annotate overrides. Records handle these automatically.
- Validation and errors: validate inputs early; throw specific exceptions. Checked for recoverable conditions; unchecked for programming errors.
- Resources: always use try-with-resources; prefer NIO (`java.nio.file`).
- Collections and generics: avoid raw types; return unmodifiable views or copies; do not expose internals.
- Concurrency: avoid shared mutable state; prefer `ExecutorService`, `CompletableFuture`, and high-level concurrency utilities; set timeouts.
- Streams and Optionals: keep streams side-effect free; extract methods for readability; use `Optional` only as a return type, not fields/params.
- Modules and packaging: minimize public surface; package by feature; prefer package-private visibility.
- Logging and observability: use SLF4J placeholders; never log secrets; use MDC when correlation IDs are needed.

### Examples

- Try-with-resources

```java
try (var in = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
  return in.readLine();
}
```

- SLF4J parameterized logging

```java
private static final Logger log = LoggerFactory.getLogger(MyService.class);
log.info("User {} logged in", userId);
```

- JUnit 5 test

```java
class CalculatorTest {
  private Calculator calc;

  @BeforeEach void setUp() { calc = new Calculator(); }

  @Test void addsTwoNumbers() {
    assertEquals(5, calc.add(2, 3));
  }

  @Test void throwsOnOverflow() {
    assertThrows(ArithmeticException.class, () -> calc.add(Integer.MAX_VALUE, 1));
  }
}
```

## Best Practices

- Target JDK 17/21 via toolchains; align source/target/release.
- Enforce Google Java Style with Spotless; forbid wildcard imports; keep lines ≤100 chars.
- Keep classes small and cohesive; prefer composition over inheritance; minimize visibility.
- Prefer immutability; avoid setters in domain code; expose behavior; use records for DTO-like aggregates.
- Validate inputs with guard clauses (`Objects.requireNonNull`); fail fast with actionable messages.
- Implement `equals`/`hashCode` together; include `@Override`; avoid leaking mutable state in these methods.
- Avoid `null` in public APIs; prefer `Optional<T>` for potentially absent return values.
- Use try-with-resources for `AutoCloseable`; avoid manual close in finally.
- Prefer modern APIs: `java.time`, `java.nio.file`, `java.net.http.HttpClient`.
- Program to interfaces; use constructor injection; keep side effects at boundaries.
- Use SLF4J placeholders; avoid string concatenation and expensive computations when the log level is disabled.
- Applications include exactly one SLF4J provider (e.g., Logback); libraries depend only on `slf4j-api`.
- Throw specific exceptions; wrap low-level exceptions with context when crossing boundaries; avoid `catch (Exception)`.
- Keep stream pipelines short and readable; extract methods for complex steps; choose loops if clearer.
- Prefer `var` for obvious locals; use explicit types when it clarifies intent.
- Concurrency: prefer immutable data and high-level concurrency utilities; apply timeouts; handle interruption.
- Collections: return unmodifiable views; defensively copy incoming mutable inputs; don’t expose internals.
- Testing: use JUnit 5; Arrange-Act-Assert; use `assertThrows`; parameterize when data-driven; avoid test order dependence.
- Packaging: package by feature; keep `public` API minimal; consider sealed types on JDK 21 for closed hierarchies.
- Serialization: avoid native Java serialization; prefer JSON/Protobuf; only implement `Serializable` when required.
- Performance: measure before optimizing; use `StringBuilder` in loops; favor logging placeholders.
- Security: never log secrets; validate and escape untrusted input; use `SecureRandom`; avoid deserializing untrusted data.
- Build hygiene: use BOMs to align versions; enable `-Xlint:all`; treat warnings as errors in CI.
- Documentation: concise Javadoc; document contracts, nullability, ranges, and thread-safety.

### Naming Conventions
- Follow Google's Java style guide:
- UpperCamelCase for class and interface names.
- lowerCamelCase for method and variable names.
- UPPER_SNAKE_CASE for constants.
- lowercase for package names.
- Use nouns for classes (UserService) and verbs for methods (getUserById).
- Avoid abbreviations and Hungarian notation.

> End of Java Instructions

