# Revisión del sistema de skills AIDDbot

Fecha: 2026-09-05. Base revisada: `0e2dd85`. Estado: propuestas pendientes de evaluación conjunta.

## Dictamen

La estructura de tres entradas públicas, workers de composición y primitivas especializadas es comprensible y merece conservarse. Las skills individuales ya son breves. El principal problema es la coherencia entre contratos: hay instrucciones incompatibles, entradas que no se transmiten y estados cuyo avance depende de inferencias del agente.

Recomiendo corregir primero esos contratos y después medir el coste de ejecución. Reducir archivos o palabras sin resolver las ambigüedades puede aumentar las repeticiones, preguntas y reparaciones.

Este informe no modifica skills, adaptadores ni reglas, y no aprueba sus propuestas. Tampoco certifica compatibilidad de ejecución con todos los arneses.

## Alcance y evidencia

El [catálogo](../.agents/skills/skills.catalog.md) guio el inventario y el recorrido de las tres entradas hasta sus primitivas. Se leyeron las 25 skills, sus referencias y plantillas, los tres roles, las instrucciones raíz, README y workflow. Se contrastaron los scripts auxiliares, las instrucciones de adaptación, muestras de adaptadores y las verificaciones de migración. No se invocaron los workflows de entrega: el objeto de esta revisión es su contrato, no entregar una aplicación.

Comprobaciones realizadas:

| Comprobación | Resultado | Lo que demuestra |
| --- | --- | --- |
| `node scripts/verify-skills-migration.js` | PASS: 25 skills; 3 orchestrators, 11 workers, 11 primitives | Clasificación, punteros comprobados, distribución en fixture e invariantes estáticas del verificador |
| Enlaces locales del catálogo y los 25 `SKILL.md` | 90 comprobados; 0 destinos ausentes | Existencia de archivos; no corrección semántica de la composición |
| Recuento de los 25 `SKILL.md` | 27.566 caracteres; 3.531 palabras | Tamaño textual, incluidos frontmatter y formato |
| Catálogo, referencias y plantillas | 31 archivos; 42.924 caracteres; 6.438 palabras | Volumen potencial de contexto, no carga obligatoria de cada ejecución |

Los recuentos usan texto leído por PowerShell y palabras separadas por espacios. No son mediciones de tokens de un modelo. No se ha medido consumo real ni ejecutado un workflow completo en cada arnés. La prueba creó y eliminó su fixture temporal; no materializó una aplicación en este repositorio. No se ejecutó la suite completa `npm test`.

En los hallazgos se distingue entre **contradicción comprobada**, **hueco de contrato** y **oportunidad**. Los riesgos describen consecuencias posibles; no se presentan como fallos observados en una entrega real.

Prioridad **alta**: puede invalidar una entrega, bloquearla o afectar trabajo ajeno. **Media**: produce ambigüedad, fricción o coste repetido. **Baja**: optimización o mantenimiento. Esfuerzo relativo **S/M**: cambio local / coordinación de varios contratos; no estimación de horas.

## Hallazgos para decidir

### H01. La norma de autoría contradice la composición actual

**Media · contradicción comprobada · S.**

Evidencia: [AGENTS.md](../AGENTS.md) prohíbe pseudocódigo y dice que el workflow pertenece al command. La [plantilla de skill](../.agents/skills/skillify/assets/skill.template.md) ordena que todos los enlaces permanezcan dentro de la carpeta. Sin embargo, el [contrato de tipos](../.agents/skills/skillify/references/aiddbot-kinds.md) exige componer mediante enlaces a otras skills, y los workers/orchestrators usan `_IF_`, `_THEN_`, `_FOR-EACH_`, `_RETURN_`. La propia `skillify` enlaza el catálogo fuera de su carpeta. `scripts/adapt.command.md` sigue siendo una capacidad ejecutable descrita fuera del inventario de skills.

Consecuencia: una ejecución fiel de `/skillify` puede eliminar composición necesaria o volver a un modelo de commands que el catálogo declara retirado.

Propuesta: distinguir enlaces de recursos locales de enlaces de composición; permitir expresamente estos últimos. Reservar al catálogo el inventario y las rutas públicas, y a cada worker su secuencia ejecutable. Eliminar el vocabulario heredado de commands y decidir si la adaptación se convierte en skill o en herramienta de mantenimiento documentada como excepción. Reescribir condicionales como prosa, sin borrar decisiones.

Validación: una skill compuesta puede cumplir simultáneamente AGENTS, plantilla y catálogo. No queda una capacidad operativa sin ubicación deliberada.

### H02. Propiedad y recuperación de ramas inconsistentes

**Alta · contradicción comprobada · M.**

Evidencia: la [plantilla de AGENTS](../.agents/skills/explore/assets/AGENTS.template.md) dice que las skills nunca cambian de rama y que una spec técnica usa `chore/{spec_key}`. [deliver-spec](../.agents/skills/deliver-spec/SKILL.md) crea siempre `feat/{spec_key}`. [design-solution](../.agents/skills/design-solution/SKILL.md) encarga crear `chore/{spec_key}` al mismo agente que sigue `/specify`, aunque [specify](../.agents/skills/specify/SKILL.md) prohíbe cambiar ramas. [fix-defects](../.agents/skills/fix-defects/SKILL.md) crea una rama desde default, pese a que el workflow atribuye esa responsabilidad al propietario de la entrega. Las rutas de entrega tampoco distinguen creación de reanudación.

Consecuencia: decisiones diferentes ante una spec técnica, una rama ya existente o una sesión reanudada; posibilidad de ramificar desde una base ajena al alcance.

Propuesta: un único propietario de Git por entrega, primitivas sobre la rama recibida, base explícita y regla de reanudación. Elegir entre un prefijo único para specs o prefijos por kind y aplicarlo en un solo contrato. Una rama existente compatible se reutiliza; una divergente se diagnostica antes de escribir.

Validación: spec funcional, técnica, reanudación y ejecución desde otra rama producen una decisión inequívoca y conservan el trabajo previo.

### H03. El triage no entrega todos los datos necesarios y crea un manifiesto innecesario

**Alta · hueco de contrato · M.**

Evidencia: [scope-feature](../.agents/skills/scope-feature/SKILL.md) siempre llama a [scope-change](../.agents/skills/scope-change/SKILL.md), que siempre escribe y hace commit de un manifiesto antes de crear la rama de entrega. Su [plantilla](../.agents/skills/scope-change/assets/change.manifest.template.md) contiene `key` y `action`, pero no `kind`. `/specify` exige que el caller proporcione `kind` y se detiene si falta. `/deliver-spec` necesita `{spec_key}` antes de que `/specify` termine de resolverlo. El triage lee specs funcionales, dejando incompleta la búsqueda de propietarias técnicas.

Consecuencia: preguntas evitables, identidad potencialmente cambiante entre rama y spec, y un manifiesto de una sola spec con `branch: change/...` cuya entrega real ocurre en `feat/...`. La ruta single-spec de `/shipify` no cierra ese manifiesto.

Propuesta: el triage devuelve y reserva `spec_key`, `kind` y `action`, incluyendo specs técnicas existentes. Solo persiste un manifiesto para varias specs. Si se desea registrar también el triage simple, definir su artefacto y cierre sin fingir una entrega coordinada. El owner decide cuándo persistir y hacer commit.

Validación: requisito nuevo sin kind explícito, amend técnico y caso single-spec alcanzan especificación sin datos ausentes ni manifiestos huérfanos.

### H04. Paralelismo de escritura sin propiedad de archivos compartidos

**Alta · hueco de contrato · M.**

Evidencia: [deliver-change](../.agents/skills/deliver-change/SKILL.md) especifica en paralelo; [implement-spec](../.agents/skills/implement-spec/SKILL.md) planifica y codifica en paralelo. Las primitivas hacen commits. `/specify` asigna IDs y actualiza el PRD; `/planify` y `/codify` actualizan la misma spec. Las implementaciones pueden compartir lockfiles, contratos o configuración. No se define aislamiento, propietario del índice Git ni reconciliación. Además, [planify](../.agents/skills/planify/SKILL.md) exige coincidencia entre contratos de planes hermanos que se redactan simultáneamente.

Consecuencia: IDs duplicados, actualizaciones perdidas, commits mezclados y planes incompatibles. La gravedad depende del modelo de workspace del arnés.

Propuesta: secuencial por defecto para escrituras. Paralelizar solo con archivos de propiedad exclusiva y contratos compartidos ya acordados. El owner reserva IDs, actualiza PRD/estados y realiza commits compartidos. No imponer worktrees a tareas pequeñas; usarlos solo cuando compensen su integración.

Validación: dos specs funcionales nuevas y dos contenedores con un lockfile común no compiten por archivos, IDs ni índice Git.

### H05. Los criterios técnicos no tienen un responsable completo de validación

**Alta · contradicción y hueco de contrato · M.**

Evidencia: [verify](../.agents/skills/verify/SKILL.md) manda marcar todos los criterios, pero para specs técnicas prohíbe mapearlos a tests y solo ejecuta regresión. [qualify](../.agents/skills/qualify/SKILL.md) evalúa criterios técnicos contra los gates «que nombran», aunque la [plantilla técnica](../.agents/skills/specify/assets/technical.spec.template.md) no exige nombrar un gate. Tampoco asigna expresamente a qualify el marcado de esos criterios. [shipify](../.agents/skills/shipify/SKILL.md) exige todos los criterios activos `[x]`.

Consecuencia: se puede bloquear una entrega técnica correcta o marcar propiedades técnicas como cumplidas solo porque la regresión está verde. Un manifiesto mixto hereda el problema. La plantilla técnica tampoco incluye cómo conservar criterios retirados al hacer amend.

Propuesta: verify marca únicamente criterios funcionales demostrados; qualify evalúa y marca los técnicos con evidencia y método de comprobación explícitos. No forzar cualquier propiedad técnica dentro de seis gates si necesita una comprobación específica. Incorporar criterios técnicos retirados sin reutilizar IDs.

Validación: una spec de tooling y un manifiesto funcional+técnico llegan a release únicamente cuando cada criterio ha sido comprobado por su evaluador.

### H06. La política de gates tiene tres interpretaciones incompatibles

**Alta · contradicción comprobada · S.**

Evidencia: [qualify](../.agents/skills/qualify/SKILL.md) dice «one violation fails it»; [qualify.gates](../.agents/skills/qualify/references/qualify.gates.md) establece que blocker o major fallan. La lista cerrada de seis gates no incluye `crap` ni `mutation`, presentes en las tres plantillas de informe. Estas permiten `n/a` solo para UI, aunque shipify acepta `n/a` sin esa restricción. La [referencia UI](../.agents/skills/qualify/references/ui.patterns.md) atribuye sus hallazgos a accessibility o clean-code, pese a existir el gate UI.

Consecuencia: un minor puede bloquear o no según la lectura; un backend sin interfaz debe inventar cómo resolver accesibilidad; los informes pueden emitir gates no admitidos.

Propuesta: fijar una sola política. Recomiendo blocker/major bloqueantes, minor registrado sin bloquear; `n/a` justificado cuando un gate no aplica. Alinear plantillas y referencias con los seis gates o ampliar deliberadamente la lista. Asignar cada patrón a su gate correcto.

Validación: el mismo ejemplo minor, un backend sin UI y un hallazgo de complejidad generan veredictos consistentes en los tres tipos de informe.

### H07. Los veredictos no están vinculados a la revisión que se entrega

**Alta · hueco de contrato · M.**

Evidencia: las [plantillas de verify](../.agents/skills/verify/assets/e2e.report.template.md) y [qualify](../.agents/skills/qualify/assets/qualify.report.template.md) registran fecha y alcance, pero no revisión evaluada ni base del diff. La ruta single-spec de [shipify](../.agents/skills/shipify/SKILL.md) no exige expresamente un informe e2e verde, como sí hacen change y findings. Qualify single-spec se apoya en planes/carpeta de spec, mientras los otros alcances usan diff. Shipify mezcla «tag default's post-merge tip» con crear después un commit de release y etiquetarlo.

Consecuencia: un informe antiguo puede parecer suficiente tras cambios posteriores; pueden escapar del examen archivos no previstos en el plan; el commit que se etiqueta admite lecturas distintas.

Propuesta: registrar revisión/base y evidencia mínima de comandos/resultados. Exigir verify y qualify vigentes en todos los alcances, y revisar el diff completo usando planes como contexto. Precisar qué cambios documentales posteriores no invalidan el veredicto; exigir igualdad literal de HEAD sería incorrecto porque los informes también se commitean. Definir una sola secuencia de merge, metadatos, commit de release, tag y limpieza, con reanudación si falla un paso.

Validación: una modificación de código posterior a qualify invalida la entrega; un commit que solo contiene su informe no provoca un bucle de verificación. Se etiqueta el commit final definido, sin borrar la rama antes de completar la entrega.

### H08. El bucle de reparación carece de salida para trabajo que no puede corregir

**Alta · hueco de contrato · M.**

Evidencia: [ship-implementation](../.agents/skills/ship-implementation/SKILL.md) distingue verde o defectos, y ante defectos vuelve a codify indefinidamente. No distingue entorno no disponible, ausencia de suite, falta de cobertura de un criterio o decisión de producto necesaria. Las plantillas de qualify admiten handoff a `/planify` o `/specify`, pero el worker siempre llama a [fix-defects](../.agents/skills/fix-defects/SKILL.md). Este entrega el informe completo a una única ejecución de codify, que trabaja un contenedor por vez.

Consecuencia: ciclos sin progreso, reparación parcial de informes multicontenedor o ampliación del alcance para resolver algo que exige cambiar la spec.

Propuesta: distinguir defecto corregible de comprobación bloqueada y decisión fuera de alcance. Reintentar solo si cambia la evidencia; devolver el bloqueo cuando se repite sin progreso. Descomponer informes por contenedor cuando proceda. Cambiar criterios requiere volver a la decisión de alcance, no un arreglo improvisado. Cero tests o criterios sin prueba nunca equivalen automáticamente a verde.

Validación: servidor no arrancable, suite ausente, mismo fallo repetido y defecto en front+back terminan en un resultado explícito sin inventar un pass.

### H09. La preparación de E2E puede detener procesos ajenos

**Alta · comportamiento comprobado en scripts · S/M.**

Evidencia: [verify](../.agents/skills/verify/SKILL.md) ordena liberar puertos y limpiar datos sin delimitar su propiedad. [free-port.ps1](../.agents/skills/verify/scripts/free-port.ps1) detiene cualquier PID que escuche en el puerto; [free-port.sh](../.agents/skills/verify/scripts/free-port.sh) hace lo equivalente, incluso con terminación forzada. Se inspeccionaron; no se ejecutaron.

Consecuencia: una colisión de puerto puede detener otro proyecto. «Clean the data» deja sin definir qué datos son descartables.

Propuesta: identificar procesos de la ejecución/proyecto y usar datos aislados de prueba. Si un puerto pertenece a otro proceso, elegir otro puerto permitido o declarar el bloqueo. Terminar únicamente procesos identificados como propios y verificar el resultado.

Validación: un proceso ajeno que ocupa el puerto permanece activo; el runner usa una alternativa o informa el conflicto.

### H10. Se confunde identidad del contenedor con tier

**Media · contradicción comprobada · S/M.**

Evidencia: [extract](../.agents/skills/extract/SKILL.md) enumera contenedores como `front`, `back`, `db`, `e2e`, `fullstack`, pero [scaffoldify](../.agents/skills/scaffoldify/references/scaffold.contract.md) permite `cli` y nombres como `api`/`web`. Las [plantillas de arquitectura](../.agents/skills/explore/assets/system.arch.template.md) no incluyen CLI entre sus tiers. El [plan genérico](../.agents/skills/planify/assets/plan.template.md) enlaza `{Arch}/{container}.arch.md`, aunque db se documenta en `model/db.schema.md` y `{Arch}` no está definido en el AGENTS generado.

Consecuencia: una solución CLI soportada por el scaffold no tiene un recorrido documental coherente; nombres arbitrarios o bases de datos pueden acabar con enlaces incorrectos.

Propuesta: `{container}` identifica una entrada de `system.arch.md`; `tier` selecciona su tratamiento. Incluir CLI y definir el tratamiento de tiers no reconocidos. Obtener el enlace de arquitectura desde `Detail`, evitando reconstruirlo con una excepción para db.

Validación: `payments-api`, `admin-web`, `cli` y un contenedor db recorren extract y planify con rutas válidas.

### H11. Dos generadores de reglas producen resultados distintos

**Media · contradicción comprobada · M.**

Evidencia: [extract](../.agents/skills/extract/SKILL.md) genera punteros con globs `**`; [adapt](../scripts/adapt.command.md) exige cuerpos de reglas copiados, marcadores de propiedad y sintaxis nativa. Los [adaptadores actuales](../.cursor/rules/back.rules.mdc) usan `back/**` y marcador. La [plantilla canónica](../.agents/skills/extract/assets/container.rules.template.md) mezcla `paths`, `glob` y `applyTo`.

Consecuencia: extract puede ampliar las reglas de un contenedor a todo el proyecto. Su resultado puede no ser reconocido como gestionado por adapt, que preserva archivos sin marcador. También aumenta contexto potencialmente irrelevante.

Propuesta: un solo responsable del renderizado de adaptadores; extract escribe reglas canónicas con scope real. Definir un formato canónico y traducirlo en el borde de cada arnés. Mantener las diferencias nativas verificadas, sin campos multiformato redundantes.

Validación: ejecutar generación dos veces no cambia nada; editar un archivo front no activa reglas back; no aparecen colisiones producidas por el propio sistema.

### H12. La portabilidad depende de capacidades de delegación no declaradas

**Alta para «cualquier arnés» · hueco de contrato · M.**

Evidencia: [map-solution](../.agents/skills/map-solution/SKILL.md), implement-spec y ship-implementation exigen agentes nuevos con roles concretos, sin alternativa cuando no existe spawn, quedan pocas plazas o no se hereda contexto. El [contrato de tipos](../.agents/skills/skillify/references/aiddbot-kinds.md) aclara correctamente que un enlace no implica invocación anidada del arnés, pero no resuelve estas capacidades. La [verificación histórica](./all-to-skills.verification.md) reconoce comprobaciones interactivas pendientes y ausencia de un workflow completo; es evidencia histórica, no comprobación de versiones actuales.

Consecuencia: portabilidad del Markdown no garantiza portabilidad de ejecución. Un caller puede suponer que un subagente conoce rama, scope, aprobación o archivos que nunca recibió.

Propuesta: contrato mínimo por capacidad: leer y seguir skills en la sesión actual como alternativa secuencial, y delegar cuando esté disponible y aporte valor. Transmitir alcance, paths de entrada, rama/base, restricciones y aprobación. Si se exige independencia real del evaluador y el arnés no puede proporcionarla, declararlo como capacidad requerida. Mantener una matriz de pruebas con versión y fecha; no prometer compatibilidad universal sin condiciones.

Validación: el mismo caso simple en modo sin subagentes, con una plaza y con varias plazas conserva artefactos, checkpoints y resultado. Esto requiere pruebas de ejecución futuras, no queda demostrado por este informe.

### H13. El mayor ahorro potencial está en la fragmentación del contexto

**Media · oportunidad · M.**

Evidencia: en una entrega de una spec sin fallos, con `c` planes totales incluidos los E2E, el flujo exige `2c + 5` agentes nuevos: scope, specify, `c` planificaciones, `c` implementaciones, verify, qualify y shipify. Con cuatro planes son 13, además de la sesión coordinadora. Cada reparación añade nuevos contextos. [qualify](../.agents/skills/qualify/SKILL.md) ordena leer también la referencia UI aunque la revisión no tenga interfaz.

Consecuencia: inicialización y lectura repetida que pueden superar ampliamente lo ahorrado al quitar frases de una skill. El coste exacto depende de herencia y caché del arnés; no se ha medido.

Propuesta: conservar las tres entradas públicas y experimentar con reutilizar Architect durante scope/specify y Builder durante plan/codify por contenedor; mantener un evaluador distinto del implementador. Cargar referencias solo cuando aplican, como ya hace specify con sus dos kinds. No fusionar workers solo por ser cortos: primero medir si el límite aporta reutilización o control.

Validación: comparar un caso simple y uno multicontenedor registrando tokens, tiempo, preguntas, agentes creados y reparaciones, con los mismos criterios de calidad. No fijar un porcentaje de ahorro sin medición.

### H14. El ledger de findings escala por relectura y no define bien la reanudación

**Media · hueco de contrato y oportunidad · M.**

Evidencia: [collect-findings](../.agents/skills/collect-findings/SKILL.md) lee todos los informes en cada ejecución. El [contrato](../.agents/skills/collect-findings/references/finding.contract.md) no define cómo asignar IDs ni cómo reconocer una nueva revisión de evidencia. La búsqueda nombrada no hace explícitos los informes `{fix_key}.e2e.report.md` y `{fix_key}.qualify.report.md`. [craft-lasting-quality](../.agents/skills/craft-lasting-quality/SKILL.md) informa si no quedan pending, pero no termina expresamente; tampoco define reanudar un grupo accepted existente. clean-solution no fija ruta persistente del informe ni la procedencia de umbrales de cobertura/CRAP.

Consecuencia: coste creciente, posible duplicación/reaparición de findings ya cerrados, alcances vacíos y decisiones inventadas sobre cobertura insuficiente.

Propuesta: primera importación completa; después evidencia nueva/cambiada con identidad estable y procedencia. Hacer explícitas las tres familias de informes y preservar el historial de estados. Terminar si el scope elegible está vacío; reanudar accepted por `fix_key`. Usar comandos y umbrales del proyecto; lo no disponible se declara sin inventar un resultado. Elegir entre informe limpio persistente o retorno estructurado reutilizable.

Validación: dos ejecuciones sin novedades no duplican ni reabren findings; una remediación interrumpida conserva su grupo; una herramienta ausente no produce un hallazgo cuantitativo ficticio.

### H15. Aprobaciones y greenfield dependen de estado conversacional implícito

**Media · hueco de contrato · M.**

Evidencia: [specify-spec](../.agents/skills/specify-spec/SKILL.md) decide por la presencia de YOLO «en el prompt», mientras deliver-change puede ejecutar varios specify-spec en paralelo. No se define quién presenta las preguntas ni qué evidencia de aprobación recibe el siguiente agente. Explore y specify piden preguntas cerradas de una en una. [design-solution](../.agents/skills/design-solution/SKILL.md) devuelve arquitectura «validated» sin un checkpoint explícito equivalente; explore documenta lo que existe y no rediseña, por lo que el diseño nuevo debe quedar claramente a cargo de otra etapa. Después del scaffold se vuelve a mapear, sin definir el cierre de la spec técnica inicial.

Consecuencia: aprobaciones repetidas o perdidas al reanudar, preguntas simultáneas y una spec de fundación que puede quedar pending aunque se declare la base lista. «Ready for delivery» no indica si basta un diseño aceptado o exige una base materializada.

Propuesta: el coordinador conserva y transmite la aprobación del alcance/revisión concreta y reúne preguntas independientes. YOLO omite el checkpoint indicado, no resuelve automáticamente decisiones materiales ausentes. Definir el resultado greenfield y el destino de su spec técnica: diseño aceptado pendiente de implementar, o entrega con ciclo completo. Reutilizar decisiones del diseño durante scaffold y reconciliar solo la evidencia que cambió.

Validación: pausar después de aprobar y reanudar no vuelve a pedir lo mismo; cambiar criterios invalida la aprobación correspondiente. Una fundación sin scaffold y otra materializada terminan con estados documentados y diferentes cuando corresponde.

### H16. El verificador protege redacción y cantidades más que comportamiento

**Media · limitación comprobada · M.**

Evidencia: [verify-skills-migration.js](../scripts/verify-skills-migration.js) fija 25 skills y nombres concretos, usa `includes` con frases exactas y saltos de línea, y comprueba enlaces de composición. La [verificación de tres entradas](./three-human-entrypoints.verification.md) llama equivalente de `adapt --check` a una fixture que distribuye archivos ya existentes: eso comprueba distribución/idempotencia, no renderizar de nuevo todos los adaptadores desde las fuentes. La propia documentación aclara que no hay `/adapt` ejecutable. El test pasa junto a H02–H08.

Consecuencia: una mejora de prosa puede romper una prueba mientras una contradicción de estados sigue verde.

Propuesta: mantener las pruebas de migración como caracterización histórica y añadir contratos estables de esquema, enlaces, exposición y renderizado. Probar recorridos con fixtures pequeños: nueva spec, amend, técnica, change mixto, findings, reanudación y bloqueo. Para semántica del agente, evaluar resultados y acciones prohibidas en trazas; no prometer resolverla con regex.

Validación: reformular una instrucción equivalente no falla; omitir kind, emitir un gate desconocido o intentar entregar con evidencia vieja sí se detecta.

### H17. Las referencias convierten heurísticas de revisión en prohibiciones absolutas

**Media · contradicción interna y oportunidad · S.**

Evidencia: [clarity.patterns](../.agents/skills/qualify/references/clarity.patterns.md) dice que cada coincidencia es un finding, incluyendo nombres `data`/`item`, 50+ líneas y tres niveles de anidación. La misma referencia ordena respetar convenciones del proyecto y excluye renombrados por gusto. UI mezcla preferencias estéticas con patrones de accesibilidad y reglas del sistema de diseño. Algunos contenidos se repiten entre gates y sus referencias.

Consecuencia: hallazgos mecánicos de bajo valor, ciclos de reparación y tokens dedicados a justificar excepciones obvias; especialmente si cada minor bloquea por H06.

Propuesta: separar reglas exigibles con evidencia de señales que invitan a inspeccionar. Un umbral heurístico no basta para fallar: describir el daño o la regla local infringida. Mantener en gates la decisión de pass/fail y en referencias los ejemplos, eliminando repeticiones que no aclaren una excepción.

Validación: `item` idiomático y una función declarativa larga no fallan por su forma; duplicación que viola una regla del proyecto sí produce evidencia accionable.

### H18. El scaffold no fija las versiones de lo que materializa

**Baja/Media · oportunidad de reproducibilidad · S/M.**

Evidencia: [materialize.js](../.agents/skills/scaffoldify/scripts/materialize.js) ejecuta `npx --package=tiged` y obtiene `AIDDbot/{tier}-{technology}` sin versión de herramienta ni revisión del arquetipo. El [contrato](../.agents/skills/scaffoldify/references/scaffold.contract.md) exige usar lockfile y smoke checks después, pero no registra qué revisión originó el scaffold. Si una descarga posterior falla, los tiers anteriores pueden quedar materializados y el reintento encuentra carpetas no vacías.

Consecuencia: la misma elección confirmada puede generar contenido distinto en otra fecha; una interrupción requiere interpretación manual. No se ha probado ninguna descarga en esta revisión.

Propuesta: registrar versión/revisión efectiva y permitir fijarlas para reproducción. No bloquear actualizaciones para siempre: hacer explícita su selección. Definir reanudación de una materialización parcial preservando contenido existente.

Validación: una elección fijada produce el mismo punto de partida; el fallo del segundo tier se puede recuperar sin sobrescribir el primero.

## Qué conservaría

- Las tres entradas humanas: expresan intenciones reconocibles y evitan que el usuario tenga que aprender todo el pipeline.
- La separación implementador/evaluador y el reinicio desde verify tras una corrección.
- Los IDs estables, amend en vez de duplicar specs y la distinción entre comportamiento pedido y mantenimiento aceptado.
- La carga por kind en specify y las plantillas fuera de `SKILL.md`.
- El catálogo como inventario y los punteros gestionados como estrategia de distribución, una vez alineados sus contratos.

No recomiendo añadir otra capa de orquestación, un motor genérico de estados ni una clase nueva de skills. Tampoco eliminar verificaciones para ahorrar tokens. Parte de la repetición entre documentación humana y contrato del agente es útil porque atiende públicos distintos; el problema es su divergencia, no su mera existencia.

## Propuesta de decisión conjunta

Orden sugerido; todo permanece pendiente. Se puede aprobar un lote excluyendo IDs concretos.

| Lote | Hallazgos | Decisión propuesta | Coste principal |
| --- | --- | --- | --- |
| A. Entrega fiable | H02–H09 | Corregir primero | Coordinar Git, estados, evidencia y reparación entre varias skills/plantillas |
| B. Contrato portable | H01, H10–H12, H15 | Acordar y corregir | Elegir propietarios, fallback de ejecución y significado de fundación completada |
| C. Menos coste repetido | H13, H14, H17 | Experimentar y medir | Reducir contextos/relecturas sin perder independencia ni trazabilidad |
| D. Mantenimiento reproducible | H16, H18 | Incorporar después de fijar contratos | Fixtures, renderizado comprobable y versiones de scaffold |

Las decisiones de diseño que conviene resolver juntos son: política de minors; ejecución secuencial como alternativa portable; propietario único de Git; y si la fundación greenfield entrega diseño aceptado o una implementación revisada. Mi recomendación es minors no bloqueantes con evidencia, alternativa secuencial, Git centralizado y distinguir explícitamente diseño de implementación.

Si aprobamos cambios, las modificaciones de skills deben pasar por `/skillify`, alineando catálogo y documentación humana donde cambie el comportamiento. Este informe es el artefacto de evaluación previo a esa implementación.
