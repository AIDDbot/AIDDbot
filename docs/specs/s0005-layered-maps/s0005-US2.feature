@s0005-US2
Feature: Detail maps of the change loop and the project brain
  As a person who learns AIDDbot,
  I want a detail map of the change loop and of the project brain, and a filter by impact level,
  so that I see the documents only when I ask for them.

  Background:
    Given the explorer is built from the repository wiki

  @s0005-US2R1
  Scenario: The change loop map shows steps and their document types
    When a person opens "#/map/change"
    Then a framed row shows "Analysis", "Design", "Implementation", "Verification", "Close" in this order
    And "spec" and "feature-file" hang under "Analysis"
    And the brain band shows "readme", "glossary", "wiki-page", "agents", "roadmap", "adr", "domain-model", "design-system", "changelog"
    And the map shows no phase row
    And the map shows no building block

  @s0005-US2R2
  Scenario: The medium level is the default
    When a person opens "#/map/change"
    Then the impact selector shows "medium"
    And the map shows "feature-file", "e2e-test", and "test-report"

  @s0005-US2R2
  Scenario: The small level hides what it skips
    Given a person opens "#/map/change"
    When the person selects the impact level "small"
    Then the map does not show "feature-file", "e2e-test", or "test-report"
    And the map shows "spec" and "code"

  @s0005-US2R2
  Scenario: The large level marks what it adds
    Given a person opens "#/map/change"
    When the person selects the impact level "large"
    Then "review-report" is marked as required

  @s0005-US2R3
  Scenario: The brain map shows its document types between phases and steps
    When a person opens "#/map/brain"
    Then the middle row shows "readme", "glossary", "wiki-page", "agents", "roadmap", "adr", "domain-model", "design-system", "changelog" in this order
    And the top row shows the four phases
    And the bottom row shows the five steps

  @s0005-US2R3
  Scenario: Pointing at a brain document shows who writes and reads it
    Given a person opens "#/map/brain"
    When the person points at "changelog"
    Then a link goes from "Close" to "changelog"
    And a link goes from "changelog" to "Release"

  @s0005-US2R4
  Scenario: An unknown document ID in the impact table stops the build
    Given the "Skips" cell of the "small" row holds "`no-such-doc`"
    When the explorer builds
    Then the build stops
    And the error names "documentation-catalog.md" and "no-such-doc"
