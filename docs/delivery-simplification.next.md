# Próxima simplificación de entrega

Estado: sustituido por `delivery-simplification.implementation.plan.md`; implementado en C001.

- Eliminar `/planify` y `plan.md`. `change.md` tendrá una sección opcional `Execution coordination` para migraciones, dependencias, rollback y archivos compartidos.
- Las specs conservan únicamente contratos duraderos: reglas de producto o técnicas y criterios `AC-F…` / `AC-T…`.
- Renombrar la sección de criterios de `change.md` a `Verification obligations`: referencia criterios de specs sin copiarlos y reserva `AC-C…` para obligaciones transitorias.
- Mantener toda evidencia funcional y de calidad en `changes/{change_key}/report.md`, vinculada a criterios y a la revisión evaluada.
- En greenfield, no generar reglas de código por contenedor desde el scaffold; mantener solo configuración mínima en `AGENTS.md` y tooling ejecutable.
- En legacy, conservar reglas de contenedor únicamente cuando provengan de convenciones reales y no puedan automatizarse.
- Mantener `specs/` y `specs/PRD.md` fuera de `changes/`: los contratos duraderos no se mezclan con los expedientes de entrega.
