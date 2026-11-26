@s0003-US1
Feature: The map shows the project loop and the change loop apart
  As a person who learns AIDDbot,
  I want the map to show the project loop and the change loop apart, with the knowledge shelf between them,
  so that I see each phase and step once and how closed changes reach a release.

  Background:
    Given the explorer is built from the repository wiki
    And a person opens the map at "#/"

  @s0003-US1R1
  Scenario: The project loop shows the four phases in order
    Then the top row shows "Foundation", "Development", "Release", "Maintenance" in this order
    And a dashed arrow goes from "Maintenance" to "Development"

  @s0003-US1R2
  Scenario: The change loop shows the five steps in order
    Then a framed row shows "Analysis", "Design", "Implementation", "Verification", "Close" in this order
    And a zoom line goes from "Development" to the frame

  @s0003-US1R2
  Scenario: Each name shows once
    Then each of "Analysis", "Design", "Implementation", "Verification" shows exactly once on the map

  @s0003-US1R3
  Scenario: The shelf holds the living documents only
    Then the shelf shows "readme", "glossary", "wiki-page", "agent-instructions", "roadmap", "adr", "domain-model", "design-system", "changelog" in catalog order
    And the shelf does not show "code", "unit-test", "e2e-test", or "spec"

  @s0003-US1R3
  Scenario: Change documents hang under their step
    Then "spec" hangs under "Analysis"
    And "impl-plan" and "feature-file" hang under "Design"
    And "code", "unit-test", "e2e-test", and "check-report" hang under "Implementation"
    And "test-report" and "review-report" hang under "Verification"

  @s0003-US1R4
  Scenario: Closed changes reach a release through the changelog
    Then a link goes from "Close" to "changelog"
    And a link goes from "changelog" to "Release"
    And links go from "Foundation" to "readme", "glossary", "wiki-page", and "agent-instructions"

  @s0003-US1R4
  Scenario: The links of other steps show on pointing
    When the person points at "Analysis"
    Then a link goes from "roadmap" to "Analysis"

  @s0003-US1R5
  Scenario: The Development page lists its steps
    When the person opens "#/phase/development"
    Then the page shows the steps "Analysis", "Design", "Implementation", "Verification", "Close"

  @s0003-US1R5
  Scenario: The Release page shows its documents
    When the person opens "#/phase/release"
    Then the page shows "changelog" under Uses
    And the page shows "changelog" under Produces
