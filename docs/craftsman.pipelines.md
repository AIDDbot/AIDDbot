# Craftsman pipelines

## Repair

```mermaid
flowchart TD  
  HUM[HUMAN]
  RPT["{slug}.report.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/review| RPT
  RPT -->|/repair| COD
 
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

## Release 
```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["{slug}.spec.md"]:::nd
  CHL["CHANGELOG.md"]:::nd

  HUM -->|/release| CHL & SPC
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
``` 



