  ### 1. Fijar el contrato común

  Ampliar change para representar cualquier entrega, con cero, una o varias specs
  y referencias opcionales a findings.

  Definir:

  - origin: petición o Craft.
  - kind: funcional, técnico o mixto.
  - intent: modificación o corrección.
  - complexity: simple o complejo.
  - Objetivo, alcance, criterios, base, rama y evidencias.

  La política de fases seguirá teniendo una única autoridad en el catálogo:

   Condición            Regla
  ━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Simple               Sin plan ni calificación
  ───────────────────  ───────────────────────────────
   Corrección           Sin plan, aunque sea compleja
  ───────────────────  ───────────────────────────────
   Técnico              Sin /verify, salvo Craft
  ───────────────────  ───────────────────────────────
   Funcional o mixto    Con /verify
  ───────────────────  ───────────────────────────────
   Craft                Verificación final del lote
  ───────────────────  ───────────────────────────────
   Complejo             Con calificación

  Cuando no haya calificación, codify debe registrar la evidencia de los
  criterios técnicos. Las fases aplicables se derivan de la clasificación; no son
  interruptores libres.

  Cierre: cada combinación tiene un flujo inequívoco y todos los criterios tienen
  responsable de comprobación.

  ### 2. Unificar la entrega

  Convertir deliver-change en el propietario común de la entrega. Eliminar la
  bifurcación entre una spec y varias; retirar o absorber los workers que queden
  redundantes.

  Adaptar scope-change, implementación y reparación para aceptar el contrato
  común. Eliminar de codify la obligación de inventar un plan cuando no lo
  recibe.

  Separar el estado del trabajo de los resultados de las fases:

  pending → in-progress → ready → released

  Actualizar también las plantillas de specs y el AGENTS.md generado. Evitar que
  una spec y un change compitan por representar el estado de una misma entrega.

  Cierre: un cambio técnico simple llega desde la petición hasta entrega sin spec
  innecesaria, plan, verificación E2E ni calificación.

  ### 3. Adaptar evaluación y cierre

  Modificar ship-implementation, verify, qualify, shipify y sus plantillas:

  - Exigir únicamente las fases aplicables y evidencia suficiente para todos los
    criterios.

  - Distinguir una fase no requerida de una comprobación bloqueada.
  - Invalidar evidencia afectada por correcciones posteriores.
  - Mantener una sola integración, versión y etiqueta.
  - Preservar la reanudación de una entrega interrumpida sin duplicar la release.

  Cierre: omitir una fase no bloquea la entrega ni genera un resultado verde
  ficticio.

  ### 4. Reconstruir Craft por lotes

  Hacer que cada nueva ejecución revise y seleccione hasta cinco grupos de
  corrección elegibles, ordenados por gravedad y alcance.

  Craft:

  - Obtiene hallazgos de su revisión; no acepta peticiones ni findings elegidos
    por humanos.

  - Agrupa causas comunes y descarta evidencias obsoletas.
  - Crea un único change para el lote.
  - Implementa sin plan.
  - Verifica el conjunto, califica si corresponde y entrega una sola vez.

  Un lote interrumpido conserva su identidad y se reanuda sin incorporar nuevos
  findings silenciosamente. Los hallazgos que requieran decisiones de producto
  quedan fuera. Un bloqueo no permite marcar el lote completo como entregado.

  Cierre: cinco correcciones producen una entrega; cero hallazgos elegibles no
  producen rama ni release.

  ### 5. Reconciliar y revisar

  Actualizar catálogo, README, workflow, guía de inicio, YAML descriptivos y
  plantillas afectadas. Reconciliar el borrador adaptativo para que no mantenga
  una segunda política contradictoria.

  Revisar mediante escenarios: funcional simple, técnico simple, técnico
  complejo, corrección humana, cambio mixto, Craft con cinco hallazgos, Craft
  vacío, lote bloqueado y reanudación de release.

  Comprobar enlaces, referencias a workers retirados y obligaciones antiguas como
  «nothing ships without verify and qualify». La validación será de contratos y
  recorridos, acorde con este repositorio.