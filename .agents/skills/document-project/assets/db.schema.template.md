# Relational database schema — {Product_Name}

Source of truth inspected: {migration files | DDL | ORM schema | database configuration}

Every physical table is listed below, including any many-to-many join table. This document records the deployed relational shape; it need not mirror the entity-relationship model.

## `{physical_table_name}`

{Purpose. State whether this is a many-to-many join table.}

| Column | Physical type | Null | Default | Key | References | Constraints and indexes |
|--------|---------------|------|---------|-----|------------|-------------------------|
| `{column_name}` | `{physical_type}` | {yes/no} | {value/-} | {PK/FK/unique/-} | `{table.column}` | {check, unique, index, collation, or -} |

## `{another_physical_table_name}`

{Purpose.}

| Column | Physical type | Null | Default | Key | References | Constraints and indexes |
|--------|---------------|------|---------|-----|------------|-------------------------|
| `{column_name}` | `{physical_type}` | {yes/no} | {value/-} | {PK/FK/unique/-} | `{table.column}` | {check, unique, index, collation, or -} |

---

> last updated: {DateTime}
