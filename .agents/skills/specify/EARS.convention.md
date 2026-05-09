# EARS Format for Acceptance Criteria
EARS (Easy Approach to Requirements Syntax) is a structured format for writing clear and testable acceptance criteria. 
It helps ensure that requirements are unambiguous and verifiable.

## Strict Rules
- Keywords MUST be UPPERCASE: WHEN, THE, SHALL, IF, THEN, WHILE, WHERE
- Always use "THE [System]" - never lowercase "the system"
- Only use SHALL - reject "should", "must", "will", "can", "may"
- Be specific - avoid vague terms like "appropriate", "quickly", "properly"
- Make it testable - each criterion should be verifiable

## EARS Patterns
Here are the common EARS patterns to structure acceptance criteria:
- [ ] THE [System] SHALL [behavior]
- [ ] WHEN [event] THE [System] SHALL [response]
- [ ] WHILE [state] THE [System] SHALL [behavior]
- [ ] WHERE [feature] THE [System] SHALL [behavior]
- [ ] IF [condition] THEN THE [System] SHALL [response]
- [ ] WHILE [state] WHEN [event] THE [System] SHALL [response]