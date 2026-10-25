# Tamaño de las skills

Fecha: 2026-10-25.

Recuento del archivo `SKILL.md` de cada carpeta de `.agents/skills/`. No incluye assets, referencias ni otros archivos auxiliares. Las palabras se cuentan como secuencias de caracteres separadas por espacios en blanco; se incluye el contenido Markdown y el frontmatter.

| Skill | Líneas | Palabras |
| --- | ---: | ---: |
| [architect-requested-spec](../.agents/skills/architect-requested-spec/SKILL.md) | 30 | 257 |
| [architect-system-foundation](../.agents/skills/architect-system-foundation/SKILL.md) | 56 | 586 |
| [build-archetype-foundation](../.agents/skills/build-archetype-foundation/SKILL.md) | 46 | 556 |
| [build-requested-spec](../.agents/skills/build-requested-spec/SKILL.md) | 68 | 1046 |
| [craft-lasting-quality](../.agents/skills/craft-lasting-quality/SKILL.md) | 56 | 721 |
| [define-spec](../.agents/skills/define-spec/SKILL.md) | 47 | 728 |
| [implement-project](../.agents/skills/implement-project/SKILL.md) | 41 | 648 |
| [maintain-skills](../.agents/skills/maintain-skills/SKILL.md) | 20 | 292 |
| [outline-system](../.agents/skills/outline-system/SKILL.md) | 27 | 295 |
| [review-implementation](../.agents/skills/review-implementation/SKILL.md) | 24 | 301 |
| [rule-project](../.agents/skills/rule-project/SKILL.md) | 43 | 497 |
| [scan-quality](../.agents/skills/scan-quality/SKILL.md) | 34 | 462 |
| [ship-spec](../.agents/skills/ship-spec/SKILL.md) | 51 | 632 |
| [verify-behavior](../.agents/skills/verify-behavior/SKILL.md) | 25 | 281 |
| **Total (14 skills)** | **568** | **7302** |

## Revisión de tamaños tras los tres prompts

Recuento verificado el 2026-10-25. Las tablas principales incluyen los cinco recortes y su corrección semántica y de redacción. Frente a HEAD y a la base inicial: **43 líneas y 911 palabras menos en SKILL.md (11,1 % de palabras)**. La tabla siguiente conserva el balance histórico de la primera pasada.

Los apartados de cada reducción conservan las medidas de aquel momento. La sección final de corrección sustituye sus conclusiones de equivalencia: las revisiones anteriores no detectaron todos los matices perdidos.

| Skill tratada | Palabras iniciales | Tras la primera pasada | Reducción |
| --- | ---: | ---: | ---: |
| build-requested-spec | 1.225 | 929 | 24,2 % |
| craft-lasting-quality | 985 | 660 | 33,0 % |
| ship-spec | 931 | 519 | 44,3 % |
| **Las tres** | **3.141** | **2.108** | **32,9 %** |

La tabla siguiente incluye todos los archivos actuales de references/ y assets/. Es un inventario del texto disponible; no supone que se cargue todo en cada ejecución. Excluye adapters y archivos fuera de esas carpetas.

| Skill | SKILL.md | Referencias | Assets | Total de palabras |
| --- | ---: | ---: | ---: | ---: |
| architect-requested-spec | 257 | 0 | 0 | 257 |
| architect-system-foundation | 586 | 1320 | 536 | 2442 |
| build-archetype-foundation | 556 | 0 | 0 | 556 |
| build-requested-spec | 1046 | 0 | 0 | 1046 |
| craft-lasting-quality | 721 | 0 | 0 | 721 |
| define-spec | 728 | 342 | 708 | 1778 |
| implement-project | 648 | 1247 | 0 | 1895 |
| maintain-skills | 292 | 0 | 668 | 960 |
| outline-system | 295 | 419 | 725 | 1439 |
| review-implementation | 301 | 626 | 92 | 1019 |
| rule-project | 497 | 0 | 325 | 822 |
| scan-quality | 462 | 173 | 0 | 635 |
| ship-spec | 632 | 155 | 84 | 871 |
| verify-behavior | 281 | 0 | 74 | 355 |
| **Total** | **7302** | **4282** | **3212** | **14796** |

En ship-spec, la ruta verde carga 632 palabras de instrucciones propias. Con regresiones, SKILL.md, referencia y plantilla suman 871 palabras, frente a 1.028 en HEAD (15,3 % menos). No se incluyen el resultado de comandos ni el contexto de otras skills.

Siguiente prioridad: build-archetype-foundation. Véase la segunda pasada de [skills-slimming-plan.md](skills-slimming-plan.md). Las comprobaciones de equivalencia que siguen comparan instrucciones; no ejecutan workflows de producto.

## Reducción de `build-requested-spec`

Prioridad 1 de [skills-slimming-plan.md](skills-slimming-plan.md), aplicada mediante `maintain-skills` y su plantilla. El diagrama y la tabla que repetían las fases se sustituyen por una tabla de entradas y otra de etapas por tipo. Las reglas comunes y la tabla de excepciones permanecen en `SKILL.md`.

| Medida | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Palabras de `SKILL.md` | 1225 | 929 | 296 (24,2 %) |
| Líneas de `SKILL.md` | 79 | 68 | 11 (13,9 %) |
| Palabras de referencias propias | 0 | 0 | 0 |
| Texto propio de cada ruta: petición, draft, deuda o archivo | 1225 | 929 | 296 (24,2 %) |

No se añaden referencias: las entradas especiales son breves y dejarlas en la tabla evita otra lectura. Todas las rutas cargan el mismo archivo; la medida por ruta excluye las skills delegadas, que no cambian. El total de las 14 skills baja 296 palabras (3,6 %).

### Equivalencia de rutas

Comparación manual de las reglas anteriores con el texto final. Todas permanecen en `SKILL.md`; no se ha eliminado ninguna por supuesta automatización.

| Caso o regla anterior | Ubicación final y resultado conservado |
| --- | --- |
| Roles y ciclo de agentes | Roles: orquestación del Architect, agentes del caller o nuevos con contexto limpio, handoff con decisiones ausentes de archivos, mensajes solo en esta ejecución si el harness permite, preguntas al humano, cierre incluso tras fallo, espera máxima y journal por etapa y reparación. No delegar todo el flujo ni leer las skills delegadas. |
| Foundation greenfield en rojo | Define: devolver el fallo sin iniciar spec, incluso ante una petición de features. |
| Petición y aprobación | Define: Architect ejecuta `define-spec`; el humano responde al orquestador. No construir antes de aprobar. El orquestador registra `approved` antes del Builder; el comando hace commit. Sin aprobación se rechazan otros commits, evaluaciones y release. |
| YOLO o aprobación previa del caller | Define: no preguntar y registrar aprobación en cuanto se escribe la spec. |
| Draft | Tabla de entradas: omitir `define-spec`, ejecutar la primera línea desde la rama por defecto, registrar aprobación inmediatamente y eliminar el draft sin modificarlo mediante el mismo comando de commit. |
| Deuda alta, media y spec de archivo | Tabla de entradas: deuda alta produce `fix`, media `refactor`, ambas aprobadas por el core; archivo definido y aprobado por el caller. Ninguna pasa por `define-spec`. |
| Implementación y alcance | Implement: Builder por proyecto productivo, en orden ascendente de abstracción; tests unitarios afectados, `layers` y `crap`. E2E si hay requisitos o trabajo E2E; cada requisito lleva test etiquetado. Refactor repara el ítem y ejecuta el check original; lo ajeno queda para otro scan. |
| Etapas según tipo y propiedad del esquema | Tabla de etapas: feat/fix verifican y revisan; chore solo revisa; refactor omite ambas; todos envían. Verificación limitada a la spec, revisión por lectura y suite completa solo al enviar; `crap` ejecuta todos los unitarios. Solo `ship-spec` modifica el modelo; no delegar esquemas ni ejecutar `outline-system`. |
| Verificación roja y fallo no reproducible | Tabla de eventos: informe solo de hallazgos al Builder y nueva verificación; sin cambios por fallo no reproducible, registrar evidencia como deuda alta con el proyecto antes del reintento. En revisión 3 no reparar más: revisar si falta y enviar con los fallos pendientes como deuda alta. |
| Hallazgos de revisión y gates | Tabla de eventos: hallazgos se envían como deuda alta. Security o Requirements permiten una reparación del Builder, seguida de nueva verificación y revisión; los segundos hallazgos se envían como deuda. |
| Regresión del Builder | Tabla de eventos: reparar, verificar si corresponde al tipo y volver a enviar. Repetir revisión solo tras reparar un gate Security o Requirements fallido. |
| Regresión con contradicción de requisito | Tabla de eventos: solo esa contradicción hace obsoleto el requisito anterior. Consultar al humano salvo YOLO; Architect añade `Replaces: {global ID}` en Problem y Builder actualiza y etiqueta el test con el requisito sustituto de esta spec. |
| Regresión solo con deuda | Tabla de eventos: registrar deuda alta, release y cierre de la spec. |
| Pregunta de producto, aceptación no ejecutable y test ausente | Tabla de eventos y regla final: pregunta detiene hasta respuesta, Architect la registra como requisito y se retoma con reparación del Builder. Aceptación que no puede ejecutarse detiene. Test fallido o ausente cuenta hacia revisión 3; no es falta de evidencia. |
| Resultado | Una spec enviada o el motivo que impidió enviarla. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes, con 26 adaptadores sin cambios, cero omisiones y cero colisiones. No cambian rutas, registros ni instrucciones para humanos; no se requiere modificar `docs/AIDD.workflow.md`. No se modifican core, scripts ni tests. Sin commit ni release.

## Reducción de `craft-lasting-quality`

Prioridad 2 de [skills-slimming-plan.md](skills-slimming-plan.md), aplicada mediante `maintain-skills` y su plantilla. Se elimina el diagrama que repetía la ruta. Alta y media comparten el comando, la aprobación y la agrupación; una tabla conserva su origen, tipo y etapas. Patch, comprobación y salida tienen sus reglas en un único lugar.

| Medida | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Palabras de `SKILL.md` | 985 | 660 | 325 (33,0 %) |
| Líneas de `SKILL.md` | 76 | 56 | 20 (26,3 %) |
| Palabras de referencias propias | 0 | 0 | 0 |
| Texto propio de cada ruta: alta, media, patch o upgrade | 985 | 660 | 325 (33,0 %) |

No se añaden referencias. La entrada de upgrade ocupa un párrafo breve; separarla exigiría otra lectura con poco ahorro en la ruta normal. Todas las rutas cargan el mismo archivo; el recuento excluye las skills delegadas, que no cambian. Esta reducción baja el total de 7917 a 7592 palabras (4,1 %). Con la prioridad 1, el ahorro acumulado es de 621 palabras sobre las 8213 iniciales (7,6 %).

### Equivalencia de rutas

Se registraron las reglas antes de editar y se compararon manualmente con el resultado. Todas permanecen en `SKILL.md`; ninguna se elimina por supuesta automatización.

| Caso o regla anterior | Ubicación final y resultado conservado |
| --- | --- |
| Roles y contexto | Roles: Craftsman del caller o agentes nuevos al inicio de cada reparación, con contexto limpio y sin copiar la conversación ni heredar reparaciones anteriores. Preguntas al humano y cierre de agentes propios incluso tras fallo. Orquestación propia, sin leer skills delegadas, espera máxima y journal antes de scan, patch y entrega a `build-requested-spec`. |
| Selección y deuda obsoleta | Select: leer `debt list`, elegir alta antes de media y baja, comprobar que existe en el código, eliminar lo obsoleto y registrar `select` con ID y motivo. |
| Alcance de una spec | Select: la prioridad determina la reparación sin juzgar tamaño; la evidencia limita el alcance. Los hallazgos posteriores quedan para el siguiente scan. |
| Reglas comunes de alta y media | High and medium debt: mismo `spec debt <D ID>`, spec mínima aprobada al crearla y otros ítems abiertos de igual prioridad y proyecto en su `debt`; ejecutar `build-requested-spec`. |
| Alta | Tabla: revisión o triage demasiado grande para su spec; `fix` con implementación, verificación, revisión y envío. |
| Media | Tabla: `layers` por capas, duplicación o tamaño de carpeta; `refactor` con check verde y envío. Sin verificación ni revisión; la regresión prueba que no cambia el comportamiento. |
| Patch y agrupación | Low debt: deuda de complejidad y cobertura de `crap`, sin spec ni release, fuera del límite de cinco specs. Agrupar el ítem seleccionado con otros bajos del mismo proyecto, máximo cinco; rama `chore/{D ID}-{slug}` desde la rama por defecto. |
| Trabajo del Builder en patch | Low debt: `implement-project` del proyecto con ítems y slot `crap` como alcance. Reparar hasta verde, incluidos hallazgos posteriores y cobertura oculta. Commit `refactor({project}): ...` por hook con solo unitarios afectados; el envío de la siguiente spec detecta regresiones. |
| Patch sin reparación o con bug | Low debt: conservar los ítems no reparables o que muestran un bug. Si no se repara ninguno, borrar la rama y elegir el siguiente. Si `crap` sigue rojo, la comprobación posterior lo envía a scan. |
| Cierre del patch | Low debt: quitar con `debt remove` los ítems que `crap` ya no muestra e integrar con el mismo mensaje `refactor({project}): ...`. Un patch exitoso deja `crap` verde sin otro scan o patch del proyecto. |
| Comprobación y scan | Check: solo sin deuda abierta, ejecutar `run layers` y `run crap`. Scan del Craftsman solo para proyecto y check rojos: layers → media, crap → baja. Nunca scan de un check verde. Volver a seleccionar tras scan con deuda. |
| Límites y paradas | Stop: máximo cinco specs enviadas; parar si una spec envía un fallo como deuda, todos los checks de proyectos están verdes o un scan no registra nada. Una petición de un ítem recibe solo su reparación. Retornar el resumen de `debt list`. |
| Upgrade | Upgrade request: omitir deuda; `chore` mediante `build-requested-spec` para los proyectos nombrados o todos, reparar todo lo que rompa el upgrade y detenerse tras esa spec. |
| Resultado | Ítems seleccionados reparados y registro de deuda restante. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes; 26 adaptadores sin cambios, cero omisiones y cero colisiones. No cambian rutas, paths ni registros; `docs/AIDD.workflow.md` sigue describiendo el mismo comportamiento. No se modifican core, scripts ni tests. Sin commit ni release.

## Reducción de `ship-spec`

Prioridad 3 de [skills-slimming-plan.md](skills-slimming-plan.md), aplicada mediante `maintain-skills` y su plantilla. Se acortan las explicaciones de las operaciones del core y se mueve la clasificación de regresiones a `ship-spec/references/regression.md`. Solo se lee si falla un test de la suite completa. `SKILL.md` conserva la selección de ruta, los límites del envío, los propietarios que bloquean y el uso de deuda. La plantilla conserva el formato del informe; su campo Cause remite al triage sin repetir las categorías.

| Medida | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Palabras de `SKILL.md` | 931 | 519 | 412 (44,3 %) |
| Líneas de `SKILL.md` | 62 | 51 | 11 (17,7 %) |
| Palabras de referencias propias | 0 | 148 | Se cargan solo con tests fallidos |
| Palabras de la plantilla de regresión | 97 | 84 | 13 (13,4 %) |
| Ruta con tests verdes: solo `SKILL.md` | 931 | 519 | 412 (44,3 %) |
| Ruta con regresiones: skill, referencia y plantilla | 1028 | 751 | 277 (26,9 %) |

El recuento por ruta excluye las skills delegadas y el texto del core, que no cambian. La reducción baja el total de `SKILL.md` de 7592 a 7180 palabras (5,4 %). Con las prioridades 1 y 2, el ahorro acumulado es de 1033 palabras sobre las 8213 iniciales (12,6 %); este total excluye las referencias y plantillas, medidas arriba por separado.

### Equivalencia de rutas

Se registraron las reglas antes de editar y se compararon manualmente con el resultado. Las explicaciones eliminadas por automatización se contrastaron con el core; no se trasladan nuevas mecánicas ni se cambia el comportamiento.

| Caso o regla anterior | Ubicación final y resultado conservado |
| --- | --- |
| Entrada y bloqueo | Inicio: ejecutar `spec show` desde la rama de spec, detenerse ante blockers y conservar solo hallazgos actuales en informes no verdes. Esto mantiene el control de aprobación y evidencia sin repetirlo. |
| Esquemas | Schemas: modelo conceptual desde la spec; DB y API desde migraciones integradas, ORM y rutas, nunca desde la spec. Timestamps solo al cambiar contenido. |
| Alta o baja de proyecto | Project AGENTS.md: ejecutar `outline-system` para el AGENTS raíz y los esquemas de ese proyecto. |
| Lecciones y plataforma | Project AGENTS.md: reglas duraderas no automatizadas, una línea con motivo basado en evidencia. Sin incidentes únicos, requisitos, salida de herramientas ni descripciones de features. Cambio de plataforma sustituye la línea del core en Platform. |
| Validación de AGENTS e índice shared | Se mantiene `agents check` antes de release y cómo liberar espacio. Se omite enumerar validaciones y generación de índices: `commands/agents.mjs` y `lib/agents.mjs` devuelven problemas concretos de longitud, comentarios y secciones; `commands/release.mjs` aplica esas mismas validaciones y genera los índices shared. |
| Suite completa y límites | Regression: ejecutar el test completo por cada E2E con evidencia en el código actual; no repetir unitarios cubiertos por crap/hooks, no reparar código o tests y no ejecutar lint ni format. Tests verdes no cargan referencia ni plantilla. |
| Informe con tests fallidos | Regression carga la referencia solo tras un fallo y escribe el informe en `.aiddbot/logs/{spec_key}.regression.md` con la misma plantilla, fuera de Product_Folder. Referencia exige una causa y un propietario por fallo; plantilla mantiene una fila por fallo, evidencia, propietario y reparación o D ID. |
| Código de la spec o test incorrecto | Referencia: ambos del Builder; reparar producción o test según causa. Se conserva la prohibición de debilitar assertions. |
| Contradicción o pregunta de producto | Referencia: propietario humano. Contradicción de requisito nuevo con test enviado propone `Replaces: {global ID}` solo con acuerdo humano; ambigüedad de producto formula la pregunta. |
| Fallo demasiado grande para la spec | Referencia: deuda alta si preexistía, está fuera de alcance o el Builder intentó repararlo una vez sin éxito. |
| Filas del Builder o humano | Regression: detenerse sin enviar y devolver el informe. Reparación dentro de la misma spec y nuevo envío después. La primitiva no ejecuta la reparación. |
| Solo filas de deuda | Regression y Debt: registrar deuda alta y pasar sus D IDs a `release --debt`. La spec puede cerrar con esos fallos registrados. |
| Propiedad de deuda y eliminación | Debt: solo comando `debt`; alta de revisión/triage, media y baja exclusivas de scan. Quitar solo IDs citados en Technical debt con verificación verde para feat/fix, qualification verde para fix sin requisitos o layers del proyecto que ya no muestra el ítem refactor. |
| Alta de deuda y deduplicación | Debt: registrar hallazgos de qualification no verde con proyecto de su alcance; fallos rojos restantes en revisión 3; filas de regresión con propietario debt y tag del test en evidencia. Reutilizar el ID de un ítem abierto equivalente. La explicación de agrupación por proyecto se omite aquí: pertenece a `spec debt` y su orquestador, sin alterar el `--project` que la habilita. |
| Release y versión major | Release: mismo comando desde rama de spec y `--major` solo por petición o spec explícita. Control exclusivo de versiones, changelog e índice; no editarlos a mano. `commands/release.mjs` comprueba gate y regresión, calcula y escribe versiones/changelog/índice, hace commit, merge, tag y elimina la rama. Su resultado devuelve spec, versión, tag, rama base, archivos e índices; sus errores dan el bloqueo. |
| Rechazo de release y resultado | Release: devolver error y detenerse sin enviar, sin merge/tag/integración alternativa. Resultado enviado con esquemas y deuda actuales o fallos de regresión. Se conserva el commit del core `chore(release): {version}`. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes; 26 adaptadores sin cambios, cero omisiones y cero colisiones. La comparación de rutas es manual, no una prueba de comportamiento de adapt. No cambia el formato ni la ubicación de los registros, ni el reparto de responsabilidades; `docs/AIDD.workflow.md` sigue vigente. No se modifican core, scripts ni tests. Sin commit ni release.

## Reducción de `define-spec` — segunda pasada

Prioridad 1 de la segunda pasada de [skills-slimming-plan.md](skills-slimming-plan.md), aplicada mediante `maintain-skills` y su plantilla. Se acortan la clasificación de tipos, los límites y la aprobación. La técnica `Test:` queda en las plantillas para petición y draft; la referencia de archivo externo conserva esa regla porque su ruta no usa una plantilla. No se añaden referencias ni lecturas obligatorias.

| Medida | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Palabras de `SKILL.md` | 783 | 683 | 100 (12,8 %) |
| Líneas de `SKILL.md` | 47 | 47 | 0 |
| Palabras de referencias propias | 325 | 340 | −15 |
| Palabras de assets | 708 | 708 | 0 |
| Total de texto propio disponible | 1816 | 1731 | 85 (4,7 %) |
| Petición feat: skill y plantilla | 1287 | 1187 | 100 (7,8 %) |
| Petición fix/chore: skill y plantilla | 987 | 887 | 100 (10,1 %) |
| Draft feat: skill, referencia y plantilla | 1495 | 1395 | 100 (6,7 %) |
| Draft fix/chore: skill, referencia y plantilla | 1195 | 1095 | 100 (8,4 %) |
| Archivo externo: skill y referencia | 900 | 815 | 85 (9,4 %) |

El recuento por ruta excluye la petición, los archivos del producto, la salida de comandos y otras skills. Las referencias son `draft.md` (208 palabras, sin cambios) y `spec-file.md` (117 → 132); las plantillas son `spec.template.md` (504) y `spec.fix.template.md` (204). El total de las 14 skills pasa de 7180 a 7080 palabras (1,4 % menos en esta pasada). El ahorro acumulado frente a las 8213 iniciales es de 1133 palabras (13,8 %).

### Equivalencia de rutas

Comparación manual del texto previo con el final, las dos plantillas, ambas referencias y los comandos implicados. No demuestra una ejecución equivalente; `adapt` valida frontmatter y adapters, no las decisiones del agente.

| Caso o regla anterior | Ubicación final y resultado conservado |
| --- | --- |
| Contexto y bloqueos | Inicio sin cambios: índice, deuda, contadores, modelo y specs enviadas; falta de deuda/contadores exige init, falta de modelo con proyecto exige outline-system; sin proyecto se continúa sin inventar contenido. |
| Alcance y dominio | Scope sin cambios: solo decisiones solicitadas; preguntar por campos, operaciones o pantallas necesarios, omitirlos en YOLO y proponerlos después. Sin migraciones inexistentes, cambio de stack, deuda ajena ni instrucciones a otros agentes. Reutilizar dominio kebab-case del índice. |
| Tipos | Scope conserva feat como comportamiento añadido, fix como restauración de lo prometido y chore sin cambio observable, incluidos scaffolding, tooling, dependencias, docs y reparación de tests sin requisitos. Refactor sigue siendo cambio de código sin cambio de comportamiento, originado en deuda media y creado por el core. |
| Petición normal | Mismo `spec new` cuando título, slug, tipo y dominio están decididos. `commands/spec.mjs` selecciona la plantilla general para feat y la de reparación para fix/chore. No cambia ID, rama ni archivo. |
| Draft | El desvío inicial y `references/draft.md` no cambian: rama specs/drafts, control de duplicados, sin spec new, formato sin frontmatter y con comando inicial e IDs de sustitución, nombres reales de proyectos y aprobación por integrate. Content sigue siendo común. |
| Archivo externo | `references/spec-file.md` sigue sustituyendo Scope: contrato fijo, metadatos del header, spec new, proyectos por rol, eliminación de roles inexistentes, renumeración y traslado del comportamiento a requisitos dentro del límite. Se conserva explícitamente Test para técnicas no obvias sin obligar a leer una plantilla. |
| Límites y división | Content mantiene 9 requisitos, 3 historias, 5 reglas de negocio y menos de 100 líneas, también para draft y archivo. Exceso dividido en specs posteriores por historia. `lib/spec.mjs` define 99/9/3/5 y `commands/work.mjs` rechaza el exceso antes de aprobar; no se elimina el límite por automatización. |
| Capacidad, errores y aceptación | Content mantiene una capacidad observable por requisito con errores y edge cases, test en esta misma spec sin diferirlo y al menos un escenario de error. Esta repetición parcial con la plantilla general es necesaria: la plantilla fix no cubre todos esos puntos y el archivo externo no parte de plantilla. Ambas plantillas conservan Test para técnicas no obvias. |
| Solution, contratos y modelo | Content sin cambios: comportamiento demostrable por aceptación pasa a su requisito, solo interfaces públicas generan requisitos, resultados aún internos van a Solution con unitarios, sin listar requisitos enviados, contradicciones por regresión y triage, errores de URLs/APIs solo causables por esa dirección y esquemas reservados al envío. |
| Humano, orquestador y aprobación previa | Approval conserva espera antes de construir y registro por quien recibe la aprobación, sea esta skill o el orquestador. YOLO o aprobación previa en la petición omiten la consulta y registran en cuanto está escrita. El draft mantiene su excepción por referencia; el archivo externo mantiene la aprobación común. |
| Commit y resultado | Solo log approved hace commit de la definición; nunca la skill por separado. Resultado: spec aprobada en su rama, o draft aprobado en la rama por defecto según su referencia. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes; 26 adaptadores sin cambios y cero colisiones u omisiones. No cambian rutas, paths ni registros, por lo que `docs/AIDD.workflow.md` no necesita cambios. No se modifican core, scripts ni tests; no corresponde ejecutar `npm test` para esta reducción. Se respetan los cambios anteriores. Sin commit ni release.

## Reducción de `implement-project` — segunda pasada

Prioridad 2 de la segunda pasada de [skills-slimming-plan.md](skills-slimming-plan.md), aplicada mediante `maintain-skills` y su plantilla. Se acortan la entrada, los contratos, las explicaciones del hook y el ciclo de checks. Las reglas que coinciden con `code-rules.md` quedan resumidas en el texto común: eliminarlas por completo dejaría sin ellas a la ruta sin `system.md`. Las referencias no cambian y no se añaden lecturas.

| Medida | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Palabras de `SKILL.md` | 762 | 562 | 200 (26,2 %) |
| Líneas de `SKILL.md` | 42 | 41 | 1 (2,4 %) |
| Palabras de referencias propias | 1247 | 1247 | 0 |
| Sin system.md ni E2E: solo skill | 762 | 562 | 200 (26,2 %) |
| Sin system.md, con E2E: skill y acceptance-tests | 1138 | 938 | 200 (17,6 %) |
| Con system.md, sin E2E: skill y code-rules | 1633 | 1433 | 200 (12,2 %) |
| Con system.md y E2E: skill y ambas referencias | 2009 | 1809 | 200 (10,0 %) |

`code-rules.md` conserva 871 palabras y `acceptance-tests.md`, 376. La medida por ruta excluye la spec, los documentos del proyecto, la salida de comandos y otras skills. Spec inicial, reparación y patch cargan el mismo texto propio según esas dos condiciones. El total de las 14 skills pasa de 7080 a 6880 palabras (2,8 % menos en esta pasada); frente a las 8213 iniciales, el ahorro acumulado es de 1333 palabras (16,2 %).

### Equivalencia de rutas

Comparación manual de las reglas anteriores con el diff final y las referencias. No se ha ejecutado un workflow de implementación; `adapt` no comprueba equivalencia de comportamiento.

| Caso o regla anterior | Ubicación final y resultado conservado |
| --- | --- |
| Spec aprobada, reparación y patch | Objetivo e inicio conservan un proyecto y su alcance asignado, spec aprobada o hallazgos/deuda recibidos, rama de spec o patch de craft-lasting-quality y parada en la rama por defecto. No se introduce una aprobación nueva. |
| Con system.md | Inicio exige leer code-rules y AGENTS del proyecto; mismos límites técnicos de carpetas, capas e imports, sin explorar código para descubrir el setup. La referencia no cambia. |
| Sin system.md | Inicio carga AGENTS, sin añadir code-rules. Build y Check mantienen validaciones, límites y defaults solo de la spec, unitarios junto al módulo e inyección de efectos con fakes, sin I/O real. Ninguna de esas reglas depende ahora de una referencia nueva. |
| Plan | Párrafo sin cambios: un journal antes del primer edit, unidades ordenadas y definición de unidad; patch omite --spec. |
| Contrato y aprobación | Build conserva schema impact, Expected URLs and APIs, cada status y contraste con model; una forma no declarada detiene y vuelve para aprobación. Fallo de cliente usa el mecanismo del proyecto y 4xx declarado, nunca éxito vacío ni 500. |
| Reglas y dependencias | Build mantiene reglas uniformes entre proyectos sin validaciones, límites ni defaults propios. Solo cuando la spec pide upgrade se ejecuta primero run upgrade y se repara lo que rompe. Dependencias por comando add del gestor, sin versiones escritas a mano. |
| Unitarios | Check conserva logic/core/shared, exclusión de UI/data/E2E, cobertura crap por archivo, rama y error, rapidez, archivos adyacentes y efectos externos como argumentos con fakes. No disco, base de datos, red ni procesos. Se elimina la explicación del objetivo de deuda, no las obligaciones de cobertura. |
| E2E | Misma lectura condicional de acceptance-tests antes de escribir E2E. Referencia sin cambios: requisitos y contratos cubiertos, tags y regresiones, datos únicos, test de la spec, fix de test citado, máximo tres ciclos de ejecución y reparación y devolución de fallos pendientes. |
| Hook y commits | Check mantiene format, lint, tipos y unitarios afectados en cada commit. Código completo de una unidad y después tests en commit test(project), ambos antes de la siguiente unidad. Rechazo exige reparar todos los errores y reintentar, sin saltar el hook. Solo ship ejecuta test completo. |
| Checks finales y reparación | Check ejecuta layers y crap tras la última unidad. Reparar lo detectado en código cambiado y deuda o check del alcance, incluidos fallos que aparezcan después, como cobertura antes oculta. Cada reparación tiene su commit; hallazgos fuera de alcance esperan al siguiente scan. Cada check rojo y lo no reparado se devuelve. |
| Comando no disponible y assertions | Bullets sin cambios: indicar indisponibilidad sin inventar reemplazos, no debilitar assertions ni construir comportamiento no declarado durante reparaciones. |
| AGENTS y shared | Párrafo sin cambios: actualizar slots, dependencias, carpetas, contrato y líneas core afectadas; sin narrar features, índice shared propiedad del core. |
| Comprobación final y resultado | Releer reglas del AGENTS, code rules aplicables y cada frase de spec del proyecto; contrastar el diff con todas, cualquier omisión falla qualification. Mismo resultado de código y tests del alcance, por hook, y mismo comando de commit limitado al proyecto. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes; 26 adaptadores sin cambios, cero omisiones y cero colisiones. No cambian rutas, registros ni instrucciones para humanos; `docs/AIDD.workflow.md` sigue vigente. No se modifican core, scripts ni tests y no se ejecuta `npm test`. Se conservan los cambios existentes. Sin commit ni release.

## Corrección de los cinco recortes pendientes

Aplicada mediante `maintain-skills` y su plantilla. Se mantienen las tablas de entradas, etapas y eventos de build-requested-spec; las rutas agrupadas de craft-lasting-quality; la aprobación abreviada de define-spec; las secciones de implement-project; y el triage condicional de ship-spec. No se aligera build-archetype-foundation en esta corrección.

Se recuperan estos sentidos de HEAD: release es quien hace commit, merge, tag y elimina la rama de spec; la prohibición de integrar por otros medios es incondicional; release rechaza AGENTS de más de 128 líneas, con comentarios o secciones vacías o fuera de orden; implement-project conserva el ejemplo de longitud mínima de contraseña y la igualdad de reglas entre proyectos; build-requested-spec devuelve el fallo de foundation al humano, recibe su respuesta en lugar del Architect y registra la deuda antes de reintentar para que un resultado verde no oculte el fallo.

Se revisa el texto nuevo frente a HEAD en las cinco skills y en regression.md y spec-file.md. Se usan frases cortas, artículos y voz activa. Se sustituyen gerundios, participios en -ing usados como instrucciones y genitivos por verbos y relaciones explícitas. Se conservan los nombres técnicos, como findings y craft-lasting-quality. Las instrucciones sin cambios respecto de HEAD quedan fuera de esta revisión de estilo.

### Coste de la corrección

| SKILL.md | HEAD | Tras el recorte | Tras la corrección | Coste frente al recorte | Ahorro frente a HEAD |
| --- | ---: | ---: | ---: | ---: | ---: |
| build-requested-spec | 1225 | 929 | 1046 | +117 | 179 (14,6 %) |
| craft-lasting-quality | 985 | 660 | 721 | +61 | 264 (26,8 %) |
| define-spec | 783 | 683 | 728 | +45 | 55 (7,0 %) |
| implement-project | 762 | 562 | 648 | +86 | 114 (15,0 %) |
| ship-spec | 931 | 519 | 632 | +113 | 299 (32,1 %) |
| **Las cinco** | **4686** | **3353** | **3775** | **+422** | **911 (19,4 %)** |

El coste es de 422 palabras en SKILL.md (12,6 % sobre el recorte). Se conservan 911 de las 1333 palabras ahorradas (68,3 %). Las referencias añaden otras 9 palabras: regression.md pasa de 148 a 155 y spec-file.md, de 132 a 134. El coste total frente al recorte es de **431 palabras**. No cambian las plantillas ni se añaden referencias. Las cinco skills con sus referencias y assets suman 6311 palabras, frente a 7063 en HEAD: ahorro neto de 752 palabras (10,6 %).

### Texto propio por ruta tras la corrección

Los recuentos excluyen documentos del producto, salidas de comandos y skills delegadas. Las condiciones de lectura de las referencias no cambian.

| Ruta | HEAD | Final | Ahorro |
| --- | ---: | ---: | ---: |
| build-requested-spec: petición, draft, deuda o archivo | 1225 | 1046 | 179 |
| craft-lasting-quality: alta, media, patch o upgrade | 985 | 721 | 264 |
| define-spec: petición feat, skill y plantilla | 1287 | 1232 | 55 |
| define-spec: petición fix/chore, skill y plantilla | 987 | 932 | 55 |
| define-spec: draft feat, skill, referencia y plantilla | 1495 | 1440 | 55 |
| define-spec: draft fix/chore, skill, referencia y plantilla | 1195 | 1140 | 55 |
| define-spec: archivo externo, skill y referencia | 900 | 862 | 38 |
| implement-project: sin system.md ni E2E | 762 | 648 | 114 |
| implement-project: sin system.md, con E2E | 1138 | 1024 | 114 |
| implement-project: con system.md, sin E2E | 1633 | 1519 | 114 |
| implement-project: con system.md y E2E | 2009 | 1895 | 114 |
| ship-spec: tests verdes | 931 | 632 | 299 |
| ship-spec: regresiones, skill, referencia y plantilla | 1028 | 871 | 157 |

### Equivalencia con HEAD

Comparación manual del diff completo contra HEAD, de las referencias y de las plantillas utilizadas. No es una ejecución de los workflows. Las operaciones resumidas de release y los rechazos de AGENTS se contrastan también con commands/release.mjs y lib/agents.mjs; no se modifica su implementación.

| Skill y caso | Decisión, responsable y salida conservados |
| --- | --- |
| build-requested-spec: agentes | Architect orquesta; agentes del caller o nuevos con contexto limpio, sin copiar conversación; mensajes solo dentro de la ejecución y con soporte del harness. Tarea, ID y decisiones no escritas en el handoff. Preguntas al humano, cierre de agentes propios incluso tras fallo, journal por etapa y reparación y espera máxima. No delegar el flujo completo ni leer las skills delegadas. |
| build-requested-spec: foundation y petición | Foundation greenfield aún roja devuelve el fallo al humano sin iniciar una spec, incluso ante features. Petición pasa por Architect/define-spec; el humano responde al orquestador, no al Architect. No construir antes de aprobar; el orquestador registra approved, que hace commit. |
| build-requested-spec: draft, deuda y archivo | Draft ejecuta su primera línea desde default, registra aprobación inmediata y elimina el draft sin cambiarlo. Deuda alta/medium produce fix/refactor aprobado por el core; archivo tiene aprobación del caller. Las tres entradas omiten define-spec. |
| build-requested-spec: YOLO y aprobación previa | No preguntar; registrar aprobación en cuanto la spec esté completa. Antes de aprobar, el core rechaza otros commits, evaluaciones y release. |
| build-requested-spec: implementación y tipos | Builder por proyecto productivo de menor a mayor abstracción y después E2E si hay requisitos o trabajo E2E. Requisitos con test etiquetado; refactor limitado al ítem y check original. Feat/fix verifican y revisan, chore solo revisa, refactor omite ambas; todos envían. Solo ship-spec cambia el modelo. |
| build-requested-spec: fallos y gates | Informe solo de hallazgos al Builder y nueva verificación. Fallo no reproducible sin cambios se registra como deuda alta con proyecto antes del reintento para impedir que un verde lo oculte. En revisión 3 no hay más reparación: revisar si falta y enviar con deuda alta. Findings de revisión van a deuda, salvo una reparación de Security/Requirements seguida de verificación y revisión. |
| build-requested-spec: regresión y paradas | Filas del Builder se reparan y vuelven a verificar si corresponde y a enviar; repetir revisión solo por gate reparado. Contradicción de requisito pide acuerdo salvo YOLO, añade Replaces y actualiza test/tag. Solo deuda permite release; pregunta de producto espera respuesta y requisito del Architect antes de reparar. Aceptación imposible detiene; test fallido o ausente cuenta hacia revisión 3. |
| craft-lasting-quality: selección, alta y media | Revisar deuda por prioridad, eliminar ítems que ya no existen y registrar selección. Evidencia limita la spec, hallazgos nuevos esperan al scan. spec debt agrupa abiertos de igual prioridad/proyecto, aprueba y pasa a build-requested-spec. Alta es fix con todas las etapas; media es refactor con check verde y regresión, sin verificación ni revisión. |
| craft-lasting-quality: patch | Máximo cinco ítems bajos del proyecto, rama chore desde default, sin spec/release ni contar en el límite de specs. Builder repara el crap del proyecto hasta verde, también cobertura que aparezca después; commits refactor por hook con unitarios afectados. Conservar ítems no reparables o bugs; sin reparación borrar rama y elegir otro. Quitar solo lo que crap ya no muestra e integrar. |
| craft-lasting-quality: checks y límites | Solo sin deuda, layers y crap; scan solo de proyecto/check rojo y prioridad correspondiente. Volver a seleccionar tras scan o reparación. Parar a cinco specs, spec con fallos enviados como deuda, todo verde o scan vacío. Petición de un ítem recibe una reparación. Upgrade omite deuda, usa chore, repara roturas y para tras esa spec. Resumen debt list al parar. |
| define-spec: contexto, alcance y tipo | Sin cambios en lecturas previas, bloqueos por init/modelo ni límites de alcance. Feat añade comportamiento observable, fix corrige lo prometido y chore no cambia lo observable. Refactor viene de deuda media, solo el core crea su spec. Mismo dominio y spec new. |
| define-spec: contenido y entradas | Límite 9/3/5 y menos de 100 líneas también para draft y archivo; exceso dividido por historia. Una capacidad observable con errores/edge cases por requisito, aceptación en esta spec y escenario de error. Test para técnica no obvia queda en ambas plantillas y, para archivo externo, en spec-file.md. Archivo conserva su contrato y adapta roles/IDs; draft conserva rama, formato y aprobación por integrate. |
| define-spec: Solution y aprobación | Comportamiento demostrable pasa a requisito; lo aún interno queda en Solution con unitarios. Sin requisitos enviados ni errores imposibles en URLs/APIs; esquema solo en ship-spec. Humano aprueba o YOLO/aprobación previa omiten consulta. Registra quien recibe aprobación, directamente o por el orquestador; solo log approved hace commit. |
| implement-project: rama y system.md | Un proyecto y alcance recibido, spec aprobada o patch; parada en default. Leer AGENTS y code-rules solo si hay system.md, sin descubrir setup por exploración. Plan antes del primer edit, patch sin --spec. Sin system.md siguen vigentes validaciones, unitarios adyacentes y efectos falsos como argumentos. |
| implement-project: contrato y uniformidad | Misma forma, estados y modelo; forma no declarada vuelve para aprobación. Fallo de cliente usa mecanismo del proyecto y 4xx, nunca éxito vacío/500. Solo reglas de la spec para que todos los proyectos apliquen la misma regla, con el ejemplo de longitud mínima de contraseña. Upgrade primero y dependencias por add, sin versiones manuales. |
| implement-project: tests y checks | Unitarios logic/core/shared, exclusión UI/data/E2E, cobertura por archivo/rama/error, rapidez y sin I/O real. E2E conserva referencia, tags, datos únicos y tres ciclos. Código y tests de cada unidad en commits separados antes de la siguiente, hook sin saltos y todos sus errores reparados. Layers/crap finales reparan solo alcance y fallos posteriores; fuera de alcance espera scan, rojos/indisponibilidad se devuelven sin comandos sustitutos. Assertions intactas. |
| implement-project: documentación y salida | AGENTS mantiene slots, dependencias, carpetas, contrato y core; no describe features, índice shared del core. Relectura final de reglas y cada frase de spec y diff contra todas ellas. Mismo resultado y commit solo del proyecto por hook. |
| ship-spec: entrada, esquemas y AGENTS | spec show y parada ante blocker, informes actuales. Modelo conceptual de spec y DB/API de migraciones/ORM/rutas integradas; timestamp solo si cambia contenido. Alta/baja de proyecto llama outline-system; lecciones duraderas no automatizadas, sin incidentes/requisitos/output/features. Platform sustituye la línea core. Se recuperan los rechazos de AGENTS y agents check antes de release; el core escribe el índice shared. |
| ship-spec: regresión y propietarios | Suite completa por E2E en código actual, sin repetir unitarios ni reparar código/tests o ejecutar lint/format. Referencia solo si falla un test; mismo informe fuera de Product_Folder. Mismas cinco causas y propietarios, sin debilitar assertions. Builder/humano detienen y devuelven informe para reparar en la misma spec; solo deuda permite release --debt. |
| ship-spec: deuda | Solo comando debt; alta de revisión/triage, media/baja exclusivas de scan. Quitar solo IDs de Technical debt con prueba según tipo. Añadir hallazgos de revisión, fallos rojos en revisión 3 y filas de regresión de deuda, con proyecto y tag como corresponda. Reutilizar ID abierto equivalente. La agrupación sigue en spec debt y su orquestador. |
| ship-spec: release y rechazo | Mismo comando desde rama de spec y major solo por petición/spec explícita. Release comprueba gates/regresión, controla versión/changelog/índice y hace commit, merge, tag y elimina la rama. Prohibición de editar versiones/changelog e integrar por otra vía vale siempre, antes de la condición de rechazo. Si rechaza, devolver error sin enviar. |

Validación: `npm run adapt` acepta las 14 skills y los 3 agentes; 26 adaptadores sin cambios y cero colisiones u omisiones. `git diff --check` no informa errores. Revisión manual del estilo de las líneas nuevas, sin genitivos con apóstrofo ni instrucciones en -ing; se mantienen los términos técnicos. No cambian rutas, paths ni registros respecto de HEAD, por lo que docs/AIDD.workflow.md sigue vigente. No se modifican core, scripts ni tests. Sin commit ni release.
