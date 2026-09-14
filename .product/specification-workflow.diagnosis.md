# DiagnÃ³stico y correcciÃ³n del flujo de especificaciÃ³n

Fecha: 2026-09-14

Nota: diagnóstico histórico de la primera corrección. La simplificación posterior
elimina `specify-spec`, integra la aprobación en `specify` y reduce las plantillas
a problema, solución y verificación, sin matrices adicionales.

## DiagnÃ³stico

La revisiÃ³n de las skills y plantillas revela huecos de contrato que permiten una
especificaciÃ³n incompleta. No se proporcionÃ³ una traza de ejecuciÃ³n fallida; estos
hallazgos explican fallos posibles, sin atribuir un incidente a una causa demostrada.

| Hallazgo anterior | Consecuencia | CorrecciÃ³n |
| --- | --- | --- |
| `build-requested-change` reservaba requisitos antes de determinar su impacto; `specify` exigÃ­a S, F y T sin distinguir necesidad | Posibles IDs nuevos para obligaciones existentes o bloqueo de cambios sin requisitos nuevos | Identificar impacto primero; reservar solo IDs nuevos y conservar los existentes |
| `specify` solo permitÃ­a hechos del repositorio o validados por el humano | La propuesta de diseÃ±o podÃ­a quedar vacÃ­a o requerir que el humano la diseÃ±ase | Separar evidencia, decisiones de diseÃ±o propuestas y preguntas de producto pendientes |
| Solution pedÃ­a Ãºnicamente resultado y papel del contenedor | No exigÃ­a componentes, contratos ni interacciones suficientes para implementar | Pedir diseÃ±o concreto y justificado por contenedor |
| PRD mostraba una Ãºnica frase de ejemplo EARS | No exigÃ­a condiciones precisas, resultados observables ni obligaciones independientes | Incorporar el contrato de autorÃ­a EARS en la plantilla |
| Spec copiaba texto normativo del PRD y etiquetaba cambios sin escenarios ni acciones de test | Dos definiciones podÃ­an divergir; no habÃ­a trazabilidad ejecutable | PRD como propietario del texto; spec como delta por ID y matriz de escenarios y acciones |
| `implement-change` condicionaba E2E a escritura o reparaciÃ³n | La eliminaciÃ³n de tests podÃ­a quedar fuera | Consumir tambiÃ©n las deprecaciones explÃ­citamente |
| `verify` ejecutaba tests aplicables sin comprobar completitud | Una suite verde podÃ­a omitir requisitos nuevos o cambios pendientes | Reconciliar PRD, delta de tests y evidencia por requisito |
| `specify-spec` devolvÃ­a siempre una spec aprobada y el orchestrator continuaba | Posible implementaciÃ³n sin autorizaciÃ³n de la propuesta actual | Devolver pendientes/bloqueos y esperar el resultado de cada etapa |

## Contrato resultante

PeticiÃ³n â†’ problema formal â†’ soluciÃ³n propuesta â†’ requisitos duraderos en PRD â†’
delta de la spec â†’ acciones y escenarios de aceptaciÃ³n â†’ implementaciÃ³n â†’ evidencia.

Los requisitos funcionales usan EARS. Las pautas de sintaxis se contrastaron con
la [guÃ­a del autor de EARS](https://alistairmavin.com/ears/).
El PRD conserva los requisitos mientras estÃ©n vigentes; una deprecaciÃ³n permanece
en la rama hasta que shipping puede integrar su retirada junto con el cÃ³digo.
La spec conserva el ID y el motivo de retirada. No se modifica el historial previo.

## RevisiÃ³n por escenarios

RevisiÃ³n estÃ¡tica del recorrido productorâ€“consumidor, no ejecuciÃ³n con un agente
consumidor ni tests de una aplicaciÃ³n.

| Caso | PRD y spec esperados | Consumo y comprobaciÃ³n |
| --- | --- | --- |
| Nueva exportaciÃ³n CSV | Nuevo F: `When a user exports filtered results, the system shall provide a CSV containing exactly the matching records.`; spec `new` | Builder crea un escenario con registros coincidentes y no coincidentes; Verify exige ejecuciÃ³n y correspondencia con el ID |
| Ampliar lÃ­mite de adjunto de 5 a 10 MiB | Mismo ID, nueva condiciÃ³n EARS; spec `changed` explica antes/despuÃ©s | Actualizar escenarios de lÃ­mite, admisiÃ³n y rechazo; cobertura ausente queda explÃ­cita |
| Retirar exportaciÃ³n XML | Mantener la lÃ­nea hasta shipping; spec `deprecated` conserva obligaciÃ³n anterior y motivo | Eliminar assertions XML, conservar las CSV compartidas y comprobar que la operaciÃ³n retirada ya no estÃ¡ disponible segÃºn el diseÃ±o aprobado |
| Reparar CSV que omite registros coincidentes | PRD intacto; spec `related` | Reparar implementaciÃ³n y cobertura; ejecutar regresiÃ³n sin inventar requisito ni ID |
| Refactor tÃ©cnico sin cambio funcional | NingÃºn nuevo F; explicar ausencia de delta y declarar comprobaciÃ³n tÃ©cnica | Qualify o Verify ejecuta el control asignado; una regresiÃ³n funcional verde no prueba por sÃ­ sola el resultado tÃ©cnico |
| PeticiÃ³n sin decisiÃ³n sobre quiÃ©n puede exportar | Borrador con decisiÃ³n de producto pendiente | No autorizar implementaciÃ³n ni devolver una spec aprobada |
| Propuesta completa con aprobaciÃ³n pendiente | Spec y diff de PRD revisables | El worker devuelve pendiente y el orchestrator no inicia Builder |

## Comprobaciones y lÃ­mites

- Revisados los contratos de autorÃ­a, aprobaciÃ³n, implementaciÃ³n y evidencia para
  los escenarios anteriores, incluyendo ausencia de tests y cobertura compartida.
- Comprobados enlaces locales de los archivos modificados y formato del diff.
- Sin ejecuciÃ³n de un workflow sobre una aplicaciÃ³n consumidora: queda pendiente
  contrastar estos contratos con una peticiÃ³n real y su traza de ejecuciÃ³n.
- Preservadas las modificaciones previas en `architect-solution-foundation`,
  `scaffoldify` y `shipify`.
