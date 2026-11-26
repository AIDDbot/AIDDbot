@s0003-US2
Feature: The wiki tables hold the two-loop model
  As a person who edits the wiki,
  I want the lifecycle model and the document catalog to hold the new model in their tables,
  so that the explorer and the future skills read one model from one place.

  @s0003-US2R1
  Scenario: The lifecycle phases table has four phases
    Given the first table under "intent.md#lifecycle-phases"
    Then its columns are "#", "Phase", "Work", "Uses", "Produces"
    And its rows are "Foundation", "Development", "Release", "Maintenance" in this order

  @s0003-US2R2
  Scenario: The catalog marks the form of each document type
    Given the first table under "documentation-catalog.md#document-catalog"
    Then a "Form" column comes right after "Life"
    And "code", "unit-test", and "e2e-test" have the form "CODE"
    And every other row has the form "DOC"

  @s0003-US2R2
  Scenario: The Tags section defines Form
    Given the "documentation-catalog.md#tags" section
    Then it defines the Form values "DOC" and "CODE"

  @s0003-US2R3
  Scenario: A missing Form column stops the build
    Given a copy of the wiki where the document catalog has no "Form" column
    When a person runs the build
    Then the build stops
    And the error names "documentation-catalog.md" and the missing column "Form"

  @s0003-US2R3
  Scenario: An unknown Form value stops the build
    Given a copy of the wiki where the "spec" row has the form "TEXT"
    When a person runs the build
    Then the build stops
    And the error names "documentation-catalog.md" and the unknown value "TEXT"
