@s0005-US1
Feature: A short overview first and the building blocks apart
  As a person who learns AIDDbot,
  I want a short overview first and the building blocks apart,
  so that the first view does not overload me.

  Background:
    Given the explorer is built from the repository wiki

  @s0005-US1R1
  Scenario: The overview shows phases, the brain, and steps only
    When a person opens "#/"
    Then the top row shows "Foundation", "Development", "Release", "Maintenance" in this order
    And one box shows "Project brain"
    And a frame shows "Analysis", "Design", "Implementation", "Verification", "Close" in this order
    And the map shows no document type
    And the map shows no building block

  @s0005-US1R2
  Scenario: The brain box opens the brain map
    Given a person opens "#/"
    When the person clicks "Project brain"
    Then the address is "#/map/brain"

  @s0005-US1R2
  Scenario: The change loop opens the change loop map
    Given a person opens "#/"
    When the person clicks "Design"
    Then the address is "#/map/change"

  @s0005-US1R2
  Scenario: A phase opens its page
    Given a person opens "#/"
    When the person clicks "Release"
    Then the address is "#/phase/release"

  @s0005-US1R3
  Scenario: The blocks view lists the building blocks
    When a person opens "#/blocks"
    Then the view lists "Skills", "Templates", "Scripts", "Wiki", "Distribution", "Project context" in this order
    And each block shows its role
    And each block links to its page

  @s0005-US1R3
  Scenario: The header links to the blocks view
    When a person opens "#/"
    Then the header has a link to "#/blocks"
