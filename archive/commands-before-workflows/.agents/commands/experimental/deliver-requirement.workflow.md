---
name: deliver-requirement
description: Entrega un requisito como una especificación o como un cambio coordinado.
---
# deliver-requirement

El objetivo de este workflow es conducir un requisito desde su análisis inicial hasta su entrega.

- Ejecuta el comando [`scope-feature`](./scope-feature.command.md) con el requisito en mano.

- _TRIAGE_:
  - _IF_ el requisito afecta a una sola especificación, ejecuta [`deliver-spec`](./deliver-spec.command.md) con el informe de alcance.
  - _IF_ el requisito afecta a varias especificaciones coordinadas, ejecuta [`deliver-change`](./deliver-change.command.md) con el informe de alcance.

Devuelve un informe corto de la especificación o del cambio entregado.
