@s0005-US3
Feature: Breadcrumbs and mini-map show the map of each element
  As a person who explores AIDDbot,
  I want breadcrumbs and a mini-map that show the map of each element,
  so that I always know where I am and how to go back.

  Background:
    Given the explorer is built from the repository wiki

  @s0005-US3R1
  Scenario: A step page shows the path through the change loop
    When a person opens "#/step/design"
    Then the breadcrumbs show "Map", "Change loop", "Design" in this order
    And "Map" links to "#/"
    And "Change loop" links to "#/map/change"

  @s0005-US3R1
  Scenario: A brain document page shows the path through the brain
    When a person opens "#/type/glossary"
    Then the breadcrumbs show "Map", "Project brain", "glossary" in this order
    And "Project brain" links to "#/map/brain"

  @s0005-US3R1
  Scenario: A phase page shows the path from the overview
    When a person opens "#/phase/foundation"
    Then the breadcrumbs show "Map", "Foundation" in this order

  @s0005-US3R1
  Scenario: A block page shows the path through the blocks view
    When a person opens "#/block/skills"
    Then the breadcrumbs show "Map", "Building blocks", "Skills" in this order
    And "Building blocks" links to "#/blocks"

  @s0005-US3R2
  Scenario: The mini-map draws the parent map
    When a person opens "#/type/spec"
    Then the mini-map draws the change loop map
    And "spec" is marked on the mini-map

  @s0005-US3R2
  Scenario: A click on the mini-map opens the parent map
    Given a person opens "#/type/glossary"
    When the person clicks the mini-map
    Then the address is "#/map/brain"
