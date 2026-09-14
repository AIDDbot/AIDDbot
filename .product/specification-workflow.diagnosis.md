# Diagnóstico y corrección del flujo de especificación

Fecha: 2026-09-14

## Diagnóstico

La revisión de las skills y plantillas revela huecos de contrato que permiten una
especificación incompleta. No se proporcionó una traza de ejecución fallida; estos
hallazgos explican fallos posibles, sin atribuir un incidente a una causa demostrada.

| Hallazgo anterior | Consecuencia | Corrección |
| --- | --- | --- |
| `build-requested-change` reservaba requisitos antes de determinar su impacto; `specify` exigía S, F y T sin distinguir necesidad | Posibles IDs nuevos para obligaciones existentes o bloqueo de cambios sin requisitos nuevos | Identificar impacto primero; reservar solo IDs nuevos y conservar los existentes |
| `specify` solo permitía hechos del repositorio o validados por el humano | La propuesta de diseño podía quedar vacía o requerir que el humano la diseñase | Separar evidencia, decisiones de diseño propuestas y preguntas de producto pendientes |
| Solution pedía únicamente resultado y papel del contenedor | No exigía componentes, contratos ni interacciones suficientes para implementar | Pedir diseño concreto y justificado por contenedor |
| PRD mostraba una única frase de ejemplo EARS | No exigía condiciones precisas, resultados observables ni obligaciones independientes | Incorporar el contrato de autoría EARS en la plantilla |
| Spec copiaba texto normativo del PRD y etiquetaba cambios sin escenarios ni acciones de test | Dos definiciones podían divergir; no había trazabilidad ejecutable | PRD como propietario del texto; spec como delta por ID y matriz de escenarios y acciones |
| `implement-change` condicionaba E2E a escritura o reparación | La eliminación de tests podía quedar fuera | Consumir también las deprecaciones explícitamente |
| `verify` ejecutaba tests aplicables sin comprobar completitud | Una suite verde podía omitir requisitos nuevos o cambios pendientes | Reconciliar PRD, delta de tests y evidencia por requisito |
| `specify-spec` devolvía siempre una spec aprobada y el orchestrator continuaba | Posible implementación sin autorización de la propuesta actual | Devolver pendientes/bloqueos y esperar el resultado de cada etapa |

## Contrato resultante

Petición → problema formal → solución propuesta → requisitos duraderos en PRD →
delta de la spec → acciones y escenarios de aceptación → implementación → evidencia.

Los requisitos funcionales usan EARS. Las pautas de sintaxis se contrastaron con
la [guía del autor de EARS](https://alistairmavin.com/ears/).
El PRD conserva los requisitos mientras estén vigentes; una deprecación permanece
en la rama hasta que shipping puede integrar su retirada junto con el código.
La spec conserva el ID y el motivo de retirada. No se modifica el historial previo.

## Revisión por escenarios

Revisión estática del recorrido productor–consumidor, no ejecución con un agente
consumidor ni tests de una aplicación.

| Caso | PRD y spec esperados | Consumo y comprobación |
| --- | --- | --- |
| Nueva exportación CSV | Nuevo F: `When a user exports filtered results, the system shall provide a CSV containing exactly the matching records.`; spec `new` | Builder crea un escenario con registros coincidentes y no coincidentes; Verify exige ejecución y correspondencia con el ID |
| Ampliar límite de adjunto de 5 a 10 MiB | Mismo ID, nueva condición EARS; spec `changed` explica antes/después | Actualizar escenarios de límite, admisión y rechazo; cobertura ausente queda explícita |
| Retirar exportación XML | Mantener la línea hasta shipping; spec `deprecated` conserva obligación anterior y motivo | Eliminar assertions XML, conservar las CSV compartidas y comprobar que la operación retirada ya no está disponible según el diseño aprobado |
| Reparar CSV que omite registros coincidentes | PRD intacto; spec `related` | Reparar implementación y cobertura; ejecutar regresión sin inventar requisito ni ID |
| Refactor técnico sin cambio funcional | Ningún nuevo F; explicar ausencia de delta y declarar comprobación técnica | Qualify o Verify ejecuta el control asignado; una regresión funcional verde no prueba por sí sola el resultado técnico |
| Petición sin decisión sobre quién puede exportar | Borrador con decisión de producto pendiente | No autorizar implementación ni devolver una spec aprobada |
| Propuesta completa con aprobación pendiente | Spec y diff de PRD revisables | El worker devuelve pendiente y el orchestrator no inicia Builder |

## Comprobaciones y límites

- Revisados los contratos de autoría, aprobación, implementación y evidencia para
  los escenarios anteriores, incluyendo ausencia de tests y cobertura compartida.
- Comprobados enlaces locales de los archivos modificados y formato del diff.
- Sin ejecución de un workflow sobre una aplicación consumidora: queda pendiente
  contrastar estos contratos con una petición real y su traza de ejecución.
- Preservadas las modificaciones previas en `architect-solution-foundation`,
  `scaffoldify` y `shipify`.
