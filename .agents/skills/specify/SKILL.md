---
name: specify
description: Writes the specification for a functional or technical requirement, defining the problem, solution, and verification criteria. Use this skill when a product requirement needs to be clearly defined and communicated.
---
# Specify skill

## Role

Act as a senior analyst with expertise in defining clear and actionable specifications for software development.

## Task

Create a new specification for a feature or technical requirement. Define the problem, solution, and verification criteria to serve as the source of truth for implementation and testing.

## Context

- The requirement or user story describing the desired feature or bug fix.
- Use the following conventions to write the specification:
    1. The [Specification template](./spec.template.md) for writing specifications.
    2. The [EARS convention](./EARS.convention.md) for defining acceptance criteria.
    3. The model design convention below for defining entities and relationships.

<model-design-convention>
```md
- **EntityName**: {short description of the entity}
    - unique_attribute_name: attribute_type#
    - mandatory_attribute_name: attribute_type
    - optional_attribute_name: attribute_type?
    - enum_attribute_name: enum_type [option1, option2, option3]
    - ranged_attribute_name: attribute_type [min, max]
    - relationship_name: RelatedEntityName [cardinality]
```
</model-design-convention>

## Steps

### Step 1: Understand the requirement
- [ ] Ask the user to provide a clear and concise requirement or user story for the feature or bug fix.
- [ ] Clarify any ambiguities or missing information to ensure a complete understanding of the requirement.
### Step 2: Define the problem
- [ ] Clearly articulate the problem that the feature or bug fix is intended to solve, including any relevant context or constraints.
- [ ] Write a set of user stories to illustrate the problem from the user's perspective.
### Step 3: Propose a solution
- [ ] Think thoroughly about the solution, considering simplicity, maintainability, and alignment with project goals and constraints.
- [ ] Ensure the model design adheres to the provided convention and addresses all required entities, attributes, and relationships.
- [ ] For each applicable tier (backend, frontend, data), outline the proposed solution approach and design.
- [ ] Focus on the overall approach and design; exclude technical implementation details.
### Step 4: Define verification criteria
- [ ] Define clear and actionable verification criteria following the EARS convention for acceptance criteria.
- [ ] Ensure criteria are specific, measurable, and directly related to the problem and solution.
### Step 5: Write the specification file
- [ ] Create a new specification file in the `{Product_Folder}/specs/` directory, following the Specification template.
- [ ] Name it using the convention `spec-slug.spec.md`, where `spec-slug` is a descriptive identifier for the feature or bug.

## Output checklist

- [ ] A specification file is created in `{Product_Folder}/specs/` following the Specification template.
- [ ] The specification clearly defines the problem, solution, and verification criteria.
- [ ] The specification is concise, actionable, and serves as a guide for implementation and testing.
- [ ] The file is named using the convention `spec-slug.spec.md`, where `spec-slug` is a descriptive identifier.