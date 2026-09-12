# Plan de implementación — entrega mínima sin fase de planificación

Estado: preparado para ejecutar con Sol; no implementado.

## Encargo

Implementa este diseño en AIDDbot y verifica sus contratos. Lee primero `AGENTS.md`, este plan y los archivos afectados. Toda modificación de skills debe seguir `.agents/skills/skillify/SKILL.md` y sus recursos obligatorios. Conserva trabajo ajeno.

Este plan sustituye las propuestas de `delivery-simplification.next.md` sobre `Execution coordination`, `Verification obligations`, criterios locales y distinción greenfield/legacy. La decisión final es un `change.md` mínimo y reglas opcionales según utilidad. El anterior `build-requested-change.simplification.plan.md` es contexto histórico, no una orden de reconstruir sus estructuras.

El alcance es prospectivo: actualizar el contrato para nuevas ejecuciones. No construir migraciones de documentación de productos, lectores duales ni aliases. Este archivo es un encargo humano de implementación; su existencia no conserva `/planify` en el workflow resultante.

## Contrato final

### 1. Implementación por contenedor, sin plan obligatorio

- Eliminar `/planify`, su plantilla y su puntero gestionado en `.claude/skills/planify/`.
- Mantener `implement-change` como coordinador Builder y `codify` por contenedor, secuencialmente. Cada ejecución recibe el alcance, specs y contexto tecnológico relevantes; incluir E2E como contenedor cuando se deban escribir tests.
- El coordinador resuelve dependencias y contratos compartidos antes de delegar. Conserva un único escritor para archivos compartidos, reporte e índice Git.
- No generar `plan.md`, una sección fija `Execution coordination` ni otro documento equivalente. El razonamiento y la descomposición quedan en la ejecución del agente.
- Si una migración, reversión o interrupción exige conservar una decisión no recuperable desde código, specs, reporte o Git, añadir una nota breve al cambio antes de la acción dependiente. No convertirla en una lista completa de tareas.
- Las reparaciones vuelven al coordinador cuando necesitan coordinarse; solo un cambio de alcance o contrato requiere resolver esa decisión antes de seguir. No devolver un requisito de «replanificación».

### 2. `change.md` mínimo

Contenido normal: metadata, título, un texto introductorio y lista de specs afectadas. Ejemplo:

```md
---
status: open
base: {full commit}
---
# Corregir devoluciones duplicadas

Evitar una segunda devolución ante solicitudes concurrentes.
Incluye API y regresión E2E; el contrato vigente se mantiene.

## Related specs

- [F014 — Pagos](../../specs/F014-pagos.md) — reference;
  devolución e idempotencia.
```

- La introducción expresa resultado comprobable, límites y sitios afectados; incluye un riesgo relevante cuando sea necesario para entender la intervención.
- Cada enlace explica qué parte afecta y si crea, enmienda o referencia el contrato. No copiar criterios ni enlazar una spec grande sin contexto.
- Omitir la lista si no hay contratos afectados. Una intervención puntual sin spec debe tener un resultado comprobable en la introducción; no inventar una spec para rellenar el documento.
- Retirar las secciones obligatorias `Acceptance criteria`, `Checks` y la propuesta `Verification obligations`. No introducir un catálogo de `AC-C…`; las obligaciones transitorias se expresan en la introducción y se identifican en el reporte mediante una descripción inequívoca.
- Mantener `status: open | released | cancelled` y `base`; añadir `release` al liberar. Git conserva la evolución, sin fechas ni estados intermedios redundantes.
- Conservar solo cuando apliquen: aprobación con revisión y autorización del contrato cambiado, bloqueo con próxima acción, motivo de cancelación, fuente y conjunto fijo de hallazgos Craft, o nota de ejecución imprescindible. Sin apartados vacíos.

### 3. Criterios y verificación

- Las specs poseen comportamiento y políticas duraderas, con sus criterios `AC-F…` y `AC-T…`. Cambiar comportamiento persistente exige resolver su contrato; corregir una implementación puede limitarse a referenciarlo.
- Mantener `specs/`, el índice generado `specs/PRD.md` y su descubrimiento selectivo fuera de `changes/`.
- El alcance, specs aplicables, diff desde `base` y política de riesgo del catálogo determinan las comprobaciones necesarias. Eliminar toda dependencia de una tabla `Checks` en el cambio.
- `report.md` conserva Implementation, E2E, Review y Findings, omitiendo controles no requeridos. Cada sección registra cobertura requerida y evidencia: criterio/control, revisión evaluada, método, resultado y evidencia concreta.
- Al comenzar una evaluación, el responsable identifica también obligaciones aún no ejecutadas. Puede usar `pending` para estas filas; no equivale a aprobación. Mantener `pass`, `fail` y `blocked`; todos salvo `pass` impiden liberar cuando la obligación es requerida.
- No crear otra tabla maestra que copie las filas de evidencia. Los criterios duraderos se referencian por ID; los controles transitorios se describen sin convertirlos en requisitos de producto nuevos.
- `verify` deriva cobertura funcional de los contratos afectados y las regresiones exigidas por el impacto. Ejecuta la suite completa aplicable; no exige toda prueba del producto por el mero enlace a una spec. Justifica exclusiones no evidentes. Suite ausente, entorno inaccesible o criterio requerido sin cobertura quedan `blocked`.
- `qualify` evalúa el diff completo según riesgos y criterios técnicos aplicables. `codify` registra lint, build, unit tests y comprobaciones técnicas correspondientes. Evitar duplicar evidencia, conservando revisiones independientes cuando el riesgo las requiera.
- Antes de liberar, `ship-implementation` y `shipify` contrastan cobertura con alcance, specs y diff: una obligación omitida también impide liberar, aunque todas las filas existentes estén verdes.
- Conservar aprobación aplicable, invalidación de evidencia por cambios semánticos, regresión tras reparaciones, separación entre escritura de tests y ejecución E2E, y release reanudable.

### 4. Reglas de código opcionales por utilidad

- `extract` deja de producir reglas automáticamente por cada contenedor. Tanto greenfield como legacy pueden carecer de archivo de reglas sin bloquear implementación o revisión.
- Registrar solo restricciones específicas, no evidentes y no automatizables, sustentadas por una decisión explícita o evidencia del proyecto. No convertir automáticamente una costumbre legacy en norma.
- Naming, formato y convenciones evidentes se consultan en código/configuración; lo automatizable pertenece al tooling. No añadir trabajo de configuración ajeno al encargo.
- Simplificar la plantilla de reglas para no exigir tablas de naming, roles, ejemplos copiados ni listas genéricas. Los contratos duraderos mantienen su autoridad en specs: enlazarlos cuando haga falta, sin duplicarlos.
- `codify` y `qualify` consultan reglas cuando existan. Ausencia de archivo no genera un hallazgo ni un bloqueo; las restricciones aplicables de specs, AGENTS y configuración siguen vigentes.
- `AGENTS.md` generado conserva configuración operativa mínima y decisiones específicas necesarias. Evitar personalidad, instrucciones genéricas y diagramas duplicados; enlazar arquitectura cuando corresponda.
- Mantener los archivos de reglas existentes salvo ajuste necesario y justificado. Si `extract` genera adaptadores para una regla nueva, usar el mecanismo gestionado existente y su scope real; no crear punteros globales `**` ni un segundo formato. Inspeccionar `scripts/adapt.command.md` y el instalador antes de elegir la integración mínima. No reescribir el sistema de adaptadores.

## Secuencia y propiedad de archivos

Un implementador coordina el cambio y escribe contratos compartidos, catálogo, reporte e índice Git. Si delega, asigna archivos explícitos y evita escritores simultáneos. No usar la división de este plan para eliminar la ejecución por contenedor del workflow consumidor.

1. **Contratos documentales.** Actualizar `build-requested-change/assets/change.template.md`, `codify/assets/report.template.md`, las plantillas locales de evidencia en verify/qualify y `explore/assets/AGENTS.template.md`. Revisar las plantillas de specs únicamente para alinear propiedad de criterios y quitar referencias retiradas. Resolver aquí las semánticas de cobertura y `pending` antes de adaptar consumidores.
2. **Coordinación e implementación.** Ajustar `build-requested-change/SKILL.md`, su referencia de descubrimiento, `implement-change`, `codify` y `fix-defects`. Mantener alcance sin spec y el conjunto fijo de Craft. Retirar `.agents/skills/planify/` y exclusivamente su puntero gestionado `.claude/skills/planify/` tras comprobar contenido y propiedad.
3. **Verificación y cierre.** Ajustar `verify`, `qualify`, `qualify/references/qualify.gates.md`, `ship-implementation` y `shipify` al contrato de cobertura derivada. Revisar `specify-spec` para conservar constancia condicional de aprobación. Eliminar handoffs a planify en Findings. Mantener los controles sustantivos actuales.
4. **Reglas y contexto.** Ajustar `extract`, `extract/assets/container.rules.template.md`, `explore` y sus consumidores. Revisar el flujo de `architect-solution-foundation` para que mapear arquitectura no obligue a generar reglas. Mantener especialización por tecnología y contratos de arquitectura/esquemas.
5. **Catálogo y documentación.** Alinear `skills.catalog.md`, README, `docs/AIDD.workflow.md`, `docs/getting-started.md` y registrar la decisión en `docs/design.decisions.md`. Marcar `docs/delivery-simplification.next.md` como sustituido por este diseño. Mantener informes/planes históricos como tales. Buscar consumidores adicionales en `.agents/`, `.claude/`, `bin/` y `scripts/`; no dejar punteros huérfanos.
6. **Verificación.** Inspeccionar los cuatro scripts de `npm test`; adaptar solo aserciones de contratos sustituidos. En `verify-skills-migration.js` existen expectativas expresas de `Acceptance criteria`, `Checks` y `planify` que deben reemplazarse por comprobaciones del contrato nuevo. Ejecutar `npm test` y revisar enlaces, metadata, catálogo y referencias operativas retiradas. No exigir cero coincidencias en documentos históricos.

## Casos de aceptación

| Caso | Resultado requerido |
| --- | --- |
| Corrección local sin spec | Introducción comprobable y reporte; sin spec, criterios locales formales ni plan artificiales. |
| Nueva capacidad duradera | Spec con criterios, enlace contextual en change y aprobación de la revisión modificada. |
| Reparación de contrato existente | Referencia la spec sin duplicar criterios ni pedir aprobación de un contrato intacto. |
| Cambio front/back/E2E | Codify secuencial por contenedor, orden y contratos coordinados, un escritor de compartidos. |
| Migración o trabajo interrumpido | Decisión indispensable recuperable; reanuda desde cambio, código, specs, reporte y Git sin exigir plan. |
| Criterio requerido omitido del reporte | El cierre detecta la cobertura incompleta y no libera. |
| Criterio pendiente, fallido o bloqueado | No release; evidencia parcial nunca representa verificación completa. |
| Spec amplia o política transversal | Cobertura justificada por impacto; no omite políticas aplicables ni carga todas las specs por defecto. |
| Reparación posterior a evidencia verde | Refresca controles afectados; una edición exclusiva de evidencia no genera bucle. |
| Greenfield o legacy sin reglas | Implementación y revisión continúan usando contratos, código y configuración. |
| Regla específica justificada | Registro opcional y limitado a su scope; sin generación genérica obligatoria. |
| Craft interrumpido o release parcial | Conserva batch fijo y cierre reanudable sin duplicar versión ni resolver hallazgos antes de release. |

Este repositorio entrega skills: las pruebas acreditan contratos, instalación y scripts, no una ejecución real sobre una aplicación. Añadir únicamente comprobaciones de contrato útiles a los scripts existentes; no crear un framework ni E2E ficticio.

## Entrega del implementador

Entregar cambios coherentes en skills, plantillas, catálogo, adaptadores afectados y documentación, con resultado de `npm test` y revisión de los casos anteriores. Explicar limitaciones y cualquier desviación de este diseño. No presentar la implementación como terminada si quedan consumidores que requieran `plan.md`, `Checks` en change o reglas obligatorias por contenedor.
