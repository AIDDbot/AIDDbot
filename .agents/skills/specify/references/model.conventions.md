# Model Design Convention

- **EntityName**: {short description}
    - unique_attribute: type#
    - mandatory_attribute: type
    - optional_attribute: type?
    - enum_attribute: enum [option1, option2]
    - ranged_attribute: type (min, max)
    - relationship: RelatedEntity [cardinality]
    - Rules:
      - rule 1
      - rule 2