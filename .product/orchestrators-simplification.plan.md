# Plan de simplificación de las orquestadoras

Estado: listo para implementar con Sol o Terra.

Este documento convierte la revisión de las tres orquestadoras en un encargo de implementación. Las decisiones siguientes son el objetivo propuesto; todavía no describen el comportamiento instalado. La preparación de este plan no modifica skills.

## Objetivo

Poder explicar y utilizar AIDDbot mediante tres necesidades:

| Entrada actual | Necesidad | Recorrido público |
| --- | --- | --- |
| `architect-solution-foundation` | Comprender o definir una arquitectura | Comprender → diseñar cuando corresponda → materializar cuando se solicite |
| `build-requested-change` | Desarrollar funcionalidad o un cambio técnico | Especificar → validar → implementar → comprobar → entregar |
| `craft-lasting-quality` | Mantener la calidad de lo existente | Revisar evidencia → priorizar → reparar → comprobar → entregar |

Conservar los tres nombres y los workers útiles. Reducir duplicación y ambigüedad antes de introducir nuevas abstracciones.

## Instrucciones para quien implemente

1. Leer `AGENTS.md`, `.agents/skills/skills.catalog.md` y las skills afectadas en su estado actual. Preservar cambios ajenos; este plan no presupone un árbol limpio.
2. Aplicar obligatoriamente `.agents/skills/skillify/SKILL.md` para toda modificación de skills y sus recursos. Leer su plantilla y clasificación. Mantener las instrucciones ejecutables en inglés y respetar los formatos de primitive, worker y orchestrator.
3. No ejecutar los flujos de desarrollo de aplicaciones para implementar esta revisión: los entregables aquí son instrucciones y documentación. Leer las skills como objeto de edición no equivale a invocarlas.
4. Implementar las fases en orden y cerrar cada una con una comprobación de coherencia. Usar agentes solo cuando las instrucciones aplicables lo requieran; este plan no exige paralelismo.
5. Mantener el catálogo como autoridad de routing, los `SKILL.md` como contratos ejecutables y los YAML como vistas documentales. Las referencias de composición entre skills siguen siendo enlaces a `SKILL.md`.
6. No añadir un motor de workflows, un formato ejecutable nuevo, nuevas dependencias ni una migración de nombres. No publicar ni integrar cambios externos como parte de este encargo.

## Fase 1 — Simplificar la documentación YAML y los resultados

Archivos principales: los tres `SKILL.md` orquestadores y sus tres YAML en `.agents/skills/{orchestrator}/`.

- Sustituir la expansión recursiva de workers por etapas breves que los referencien. Documentar el ciclo común de verificación, cualificación y entrega una sola vez en el workflow humano; su contrato ejecutable sigue en `ship-implementation/SKILL.md`.
- Usar una estructura uniforme y pequeña en los tres YAML: intención, entradas relevantes, etapas, decisiones humanas y resultados. La estructura es documental; no requiere un parser propio ni reglas de ejecución alternativas.
- Conservar en las vistas las diferencias decisivas: una o varias especificaciones, aprobación salvo YOLO, entrega conjunta, diseño sin scaffold y ausencia de hallazgos elegibles.
- Hacer que las orquestadoras propaguen el resultado real de los workers. Un cierre publicado solo se declara cuando existe evidencia de entrega. Una aprobación pendiente, un bloqueo o una salida sin trabajo no se convierten en éxito.
- Describir estos resultados en lenguaje natural. No añadirlos a la cadena de estados de una especificación ni confundirlos con los estados del ledger de findings.

Criterios de aceptación:

- Ningún YAML reproduce los pasos internos de `ship-implementation` ni de `implement-spec`.
- Las decisiones y salidas de cada YAML coinciden con su `SKILL.md` y los workers invocados.
- Build muestra la validación humana; Craft muestra selección posterior al descubrimiento, aceptación antes de reparar y terminación sin hallazgos.
- Se conserva la verificación antes de cualificación, la revisión tras una corrección y la prohibición de entregar con evidencia desactualizada.

## Fase 2 — Arquitectura guiada por la intención

Archivos principales: `architect-solution-foundation/SKILL.md`, su YAML, `design-solution/SKILL.md` y, si el contrato lo necesita, `map-solution/SKILL.md`.

Decisiones de implementación:

- Resolver primero qué pide el usuario: comprender lo existente, diseñar una solución o evolución, o preparar una solución ejecutable. Inferirlo de la petición cuando sea claro; preguntar solo cuando la ambigüedad afecte materialmente al resultado.
- Usar el repositorio como evidencia y restricción. Un repositorio documental no implica que falte diseño ni que haya autorización para instalar un scaffold.
- Para comprender una solución existente, mantener el mapeo como resultado suficiente.
- Para diseñar, admitir un resultado de arquitectura y decisiones técnicas sin scaffold. Leer y reutilizar el diseño previo; reconciliar sus discrepancias con el código cuando exista.
- Para diseñar una evolución de una solución existente, partir de su mapeo y registrar el diseño propuesto mediante el contrato técnico existente. La implementación posterior corresponde al flujo de cambios; el routing se documenta en el catálogo.
- Materializar solo cuando la petición incluya preparar o crear la solución ejecutable y las decisiones materiales estén resueltas conforme a `scaffoldify`. Tras materializar, reconciliar el mapa.
- Mantener la protección de archivos existentes y la confirmación de decisiones materiales todavía desconocidas.
- Resolver la contradicción de Git: `design-solution` actualmente crea o reutiliza `chore/{spec_key}`, mientras el workflow afirma que no crea rama. Alinear la documentación con la propiedad de Git establecida en las reglas del consumidor; `scaffoldify` sigue sin gestionar ramas ni commits. No duplicar reglas generales de Git en la orquestadora.

Criterios de aceptación:

- «Explícame esta arquitectura» acaba con un mapa, sin iniciar implementación.
- «Define la arquitectura de esta idea» puede terminar con un diseño sin instalar nada.
- «Diseña cómo separar este servicio existente» tiene una salida de diseño explícita.
- «Crea la base ejecutable de esta solución» puede llegar al scaffold y su mapeo.
- La documentación deja de decir que todo greenfield se materializa obligatoriamente.

## Fase 3 — Calidad: frontera de reparación y evidencia vigente

Archivos principales: `craft-lasting-quality/SKILL.md`, su YAML, `collect-findings`, `clean-solution`, `fix-defects`, y los contratos de findings consumidos por `verify`, `qualify` y `shipify`.

Decisiones de implementación:

- Definir mantenimiento como preservar o restaurar el contrato aprobado. Distinguir un cambio del contrato del producto de un cambio del comportamiento defectuoso observado.
- Permitir restaurar comportamiento esperado solo con evidencia explícita del contrato existente: criterio aprobado, prueba válida o regla documentada aplicable. Si falta evidencia o se requiere cambiar el contrato, conservar el hallazgo pendiente y devolver la necesidad de especificación; no inventar criterios ni iniciar automáticamente otro alcance.
- Mantener el requisito de scope aceptado antes de reparar. Normalizar evidencia humana antes de seleccionar; después de descubrir y recopilar nuevos hallazgos, volver a seleccionar y aceptar el scope antes de invocar `fix-defects`.
- Conservar la prioridad normal: hallazgo indicado por el usuario, scope aceptado sin terminar, pendiente elegible de mayor importancia respaldada por evidencia. No inventar prioridad de producto ni severidad ausente.
- Permitir una revisión actual cuando el usuario la pida, aunque haya pendientes. Esta revisión no cancela ni sustituye silenciosamente un scope aceptado.
- Antes de reparar un hallazgo antiguo, comprobar que el estado descrito sigue presente. Si dejó de existir, conservar la trazabilidad y marcarlo según el contrato de findings; seleccionar otra tarea elegible.
- No introducir una frecuencia temporal arbitraria ni un servicio de monitorización. La renovación se activa por petición explícita o por evidencia que ya no representa el estado actual.
- Explicar el alcance real del descubrimiento automático: complejidad, cobertura y lint. Otros hallazgos pueden entrar por informes de verificación, cualificación o evidencia aportada. No prometer una auditoría completa de seguridad, arquitectura o dependencias.

Revisar todos los consumidores de findings: sustituir las exigencias de preservar el comportamiento observable que impedirían restaurar un contrato aprobado. Mantener los límites de escritura de pruebas y planes de las primitivas; cuando la corrección requiera un cambio que el flujo de findings no autoriza, devolver esa limitación y la necesidad de especificación.

Criterios de aceptación:

- Una refactorización que conserva comportamiento sigue el flujo de findings.
- Un defecto que contradice un criterio aprobado puede repararse cuando cabe en los permisos de ese flujo.
- Una petición de comportamiento nuevo requiere especificación.
- La ausencia de evidencia del comportamiento esperado no se resuelve inventándolo.
- «Revisa la calidad actual» ejecuta descubrimiento aunque haya pendientes, sin descartar trabajo aceptado.
- Un hallazgo obsoleto no provoca una reparación innecesaria.
- Sin hallazgos elegibles no se crea una rama de reparación ni se declara una entrega.

## Fase 4 — Explicación humana y coherencia transversal

Archivos: `.agents/skills/skills.catalog.md`, `README.md`, `docs/AIDD.workflow.md`, `docs/getting-started.md` y `docs/design.decisions.md` cuando corresponda registrar estas decisiones.

- Abrir la explicación con las tres necesidades y sus resultados. Dejar ramas, manifiestos, estados y agentes para una sección de funcionamiento interno.
- Ofrecer ejemplos cortos de petición para comprender arquitectura, diseñar sin materializar, desarrollar funcionalidad, reparar un defecto documentado y revisar calidad actual.
- Explicar una sola vez el ciclo compartido de comprobación y entrega.
- Corregir el Mermaid: `FIX` identifica actualmente tanto la rama de mantenimiento como el worker de reparación. Usar identificadores distintos o eliminar los detalles de ramas del diagrama público.
- Mantener en el catálogo el routing entre diseño, cambios y mantenimiento. Evitar repetirlo como explicación general dentro de cada skill.
- Buscar afirmaciones vigentes que contradigan los nuevos contratos, especialmente scaffold obligatorio, preservación literal del comportamiento defectuoso y descubrimiento solo sin pendientes.
- Conservar los documentos históricos de caracterización y verificación como evidencia de su versión. Si pueden confundirse con documentación vigente, añadir una nota de contexto en lugar de reescribir sus resultados históricos.

## Verificación final

Realizar una revisión estática y un recorrido razonado de escenarios. No simular que se ejecutó una aplicación ni exigir una suite E2E de producto para validar cambios de prosa.

| Escenario | Resultado esperado |
| --- | --- |
| Repositorio existente; comprender arquitectura | Mapeo y explicación |
| Repositorio documental con diseño previo | Reutilización del diseño; intención resuelta antes de materializar |
| Repositorio vacío; solo definir arquitectura | Diseño sin scaffold |
| Repositorio vacío; crear base ejecutable | Decisiones materiales resueltas, scaffold y mapa reconciliado |
| Evolución de arquitectura existente | Diseño técnico; implementación fuera de ese alcance |
| Cambio con una especificación | Validación antes de implementar, salvo YOLO |
| Cambio con varias especificaciones | Todas validadas, implementación coordinada y una entrega |
| Worker bloqueado o aprobación pendiente | Resultado propagado sin afirmar entrega |
| Hallazgo nuevo aportado por el usuario | Normalizar, seleccionar, aceptar, reparar y comprobar |
| Defecto contrario a contrato aprobado | Restauración respaldada por evidencia o limitación explícita del flujo |
| Cambio de contrato solicitado como reparación | Hallazgo pendiente y necesidad de especificación |
| Revisión explícita con backlog pendiente | Descubrimiento actual sin perder el scope aceptado |
| Hallazgo que ya no existe | Evidencia actualizada y ninguna reparación innecesaria |
| No hay hallazgos elegibles | Salida sin rama de reparación ni entrega |
| Verificación o cualificación falla | Reparación permitida y revisión de nuevo, o bloqueo explícito |

Comprobar además enlaces locales, metadatos, referencias a nombres de skills y consistencia entre YAML y Markdown. Si el repositorio dispone de validadores aplicables, ejecutarlos; no crear una infraestructura de tests para comprobar frases. Revisar el diff final para detectar cambios ajenos o expansión de alcance.

Dejar un informe breve en `docs/orchestrators-simplification.verification.md` con archivos modificados, escenarios revisados, comprobaciones realmente ejecutadas y limitaciones pendientes. No presentar el recorrido estático como validación de una ejecución real con agentes.

## Encargo listo para copiar

> Implementa `docs/orchestrators-simplification.plan.md`. Aplica `/skillify` a las modificaciones de skills, conserva los nombres públicos y las garantías de verificación y entrega, y alinea los tres YAML, el catálogo y la documentación humana. Completa las fases y la verificación estática indicada. Preserva cambios ajenos y documenta cualquier incompatibilidad concreta con los contratos existentes. No publiques ni integres cambios externos.
