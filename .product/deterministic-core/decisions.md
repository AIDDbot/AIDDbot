# Deterministic core — decisiones

Cada decisión cita su origen (`← Q{n}` en `../d.deterministic-core.proposal.md`; `← B·Q{n}`, la n-ésima pregunta abierta de `../b.spec-first-workflow.proposal.md`; `← P{n}`, una duda de `notes.md`). Si una decisión cambia, se tacha y se añade otra; no se reescribe. Las marcadas *(delegada)* las tomó el agente a petición del humano y conviene revisarlas.

Principio rector: **los modelos juzgan; los scripts guardan el estado.** El journal cuenta lo que pasó; nunca decide nada.

## D1 ← Q1 · El núcleo vive en el overlay *(delegada)*
Un único CLI sin dependencias en `.agents/aidd/` (`aidd.mjs` + `lib/`), que llega con `aiddbot init/update` en la misma versión que los skills. Los skills lo invocan como `node .agents/aidd/aidd.mjs <grupo> <comando>`. Nada de `npx` en tiempo de ejecución: evita red y desajustes de versión. Salida JSON por stdout y códigos de salida fijos: `0` correcto, `1` rechazado por una regla, `2` uso incorrecto. Un skill conserva scripts propios solo si la capacidad es exclusivamente suya (hoy, el materializador del scaffold). Se modifica la regla de la plantilla de skills "recursos solo dentro de su carpeta": un skill puede llamar además al núcleo.

## D2 ← Q2 · Fichero de control por spec
`{spec}/control.json` va versionado y **solo lo escribe el núcleo**. Guarda identidad, tipo, rama, estado, aprobación, la lista de evaluaciones (tipo, revisión, estado, commit, hora), el bloqueo si lo hay y la versión entregada. Está pensado para máquinas; un humano lo consulta con `aidd spec show`. Por eso:
- `spec.md` pierde `status`, `updated_at` y `last_process`, y queda como contenido para humanos y modelos.
- Los informes `verification.md` y `qualification.md` pierden su frontmatter: su existencia se contrasta con la última evaluación en `control.json`.
- La puerta de entrega lee solo `control.json` y la presencia de los informes, así que funciona en un clon limpio.

## D3 ← Q3 · Journal de texto, solo narrativa
Se descarta JSONL. El journal sigue siendo un log de texto diario, sin versionar, en `.aiddbot/journals/YYYY-MM-DD.log`, pero:
- ningún código lo lee ni decide nada a partir de él;
- sin anchos fijos ni truncados: campos separados por ` · `, completos;
- lo escribe `aidd log` y, de forma automática, los comandos del núcleo que cambian estado;
- desaparecen la tabla de etapas por skill y el skill `record-journal`: el modelo usa `aidd log` directamente.

**Matiz (2026-09-28):** «sin anchos fijos» se lee como «sin anchos que nadie parsee». Las columnas cortas (hora, estado, actor, spec, evento) se rellenan con espacios hasta un mínimo (8, 6, 6, 6 y 10 caracteres) para que el log se lea como tabla, y el separador pasa de ` · ` a un solo espacio, que basta y gana ancho; nunca se trunca: un valor más largo desborda su columna y el resumen, al final, no tiene límite. Lo motivó echar de menos la lectura posicional del formato anterior; el alineado era un efecto del parseo por columnas, no su objetivo, y se puede conservar sin perder información.

## D4 ← Q4 · Fuera los hooks
Los hooks son un experimento que se mantiene en otro repo. Se retiran de AIDDbot `.agents/hooks/`, su cableado en `.claude/settings.json`, `.codex/hooks.json`, `.cursor/hooks.json` y `.github/hooks/`, su generación en `adapt.js`, su entrada en `TREES` de `overlay.js` y sus menciones en la documentación. Quien los quiera los instala desde su repo.

## D5 ← Q5 · El modelo solo anota decisiones de criterio
Los únicos eventos del modelo son `verdict` (greenfield o brownfield), `select` (deuda elegida), ~~`blocked` (con su motivo) y `escalate` (triaje de B)~~ y `blocked` (con su motivo) solo fuera de una spec; el bloqueo de una spec y su escalada los anota el núcleo (ver D23). Se eliminan `start`, `done`, `spawn` y los hitos de código, test y lint. El núcleo anota por su cuenta la creación, aprobación, evaluación, deuda, entrega e integración.

## D6 ← Q6 · Configuración y comandos en un solo fichero *(delegada)*
`.aiddbot/config.json` va versionado y lo escribe el núcleo. Contiene los proyectos, cada uno con su ruta y sus comandos clasificados: `lint` (solo de nivel error), `unit`, `acceptance` y `quality` (lista). Además:
- `init` lo siembra vacío; `outline-system` registra los proyectos; `rule-project` clasifica los comandos de cada uno una sola vez, con `aidd config`.
- Más adelante, el CLI de scaffold (A) podrá presembrarlo y `rule-project` lo confirmará.
- `aidd run` falla con un código propio si un comando no está clasificado, y el skill lo registra como no disponible (ámbar); nunca se lo inventa.
- **Derivada:** `.product/` pasa a ser una constante del núcleo y deja de ser configurable, lo que matiza la D13 de frontier-fall. Con beta y solo greenfield, un marcador menos que resolver.

## D7 ← Q7 · Límites de rol en el prompt, no en el arnés *(delegada)*
No se genera por ahora ninguna restricción de herramientas ni ningún hook por rol: costaría adaptadores en cuatro arneses, y con D4 no hay hooks. Los límites de cada rol y las reglas de subagente ("no preguntes al humano", "detén solo lo tuyo") pasan a `.agents/agents/*.md` y salen de skills y orquestadores. Se revisará si una prueba real muestra violaciones.

## D8 ← Q8 · Se mantiene la cadena de estados *(delegada)*
Se mantienen `draft → in-progress → verified → qualified → shipped`, ahora en `control.json` y cambiados solo por el núcleo, que rechaza las transiciones ilegales. Una escalada no es un estado: es un campo `blocked` con motivo que se limpia al reanudar. ~~Queda pendiente de confirmar al decidir B.~~ Confirmada en D24, que fija desde dónde se entrega; el bloqueo lo gobierna D23.

## D9 ← Q9 · Se mantienen los contadores
`.aiddbot/counters.yaml` sigue siendo la fuente de los IDs. Cuando B elimine F y T, quedarán `spec` y `debt`.

## D10 ← Q10 · Orden de fases
Núcleo → control y journal → ejecutor de comandos → B → C → release → A → roles y documentación. El ejecutor va antes de B porque simplifica la trazabilidad de los tests de aceptación.

## D11 ← Q11 · Entregas cortas
Nada de rama larga como en frontier-fall (D14 de allí). Cada fase va en una rama corta, deja el sistema funcionando, se integra en `main` y sale como release *patch*. B cambia la estructura de los registros y ~~sale como `0.2.0`~~ (ver D13), sin migración (beta, solo greenfield).

## D12 · Las preguntas de A, B y C se deciden justo antes de su fase
Cada una de esas fases arranca con un paso de decisiones que responde las preguntas abiertas de su propuesta, a la luz del núcleo ya construido.

## D13 · Versión 0.1.x hasta el final del plan
Ninguna fase sube la versión menor: todas, B incluida, salen como release *patch* dentro de `0.1.x`. El salto de versión menor se decide al final del plan, tras la fase 8. Matiza D11: el cambio de estructura de los registros de B sigue sin migración, pero ya no se marca con `0.2.0`.

## D14 ← B·Q1 · Las specs entregadas se quedan donde están *(delegada)*
El archivo es la propia carpeta `.product/specs/S{nnnn}-{slug}/`: al entregar no se mueve ni se borra nada, y `control.json` en `shipped` es la marca de archivo. Las etiquetas de los tests y las decisiones `preserve`/`replace` apuntan a requisitos de specs anteriores, y la razón de cada cambio de comportamiento vive en su spec; borrarla dejaría esas referencias colgando. Se descarta moverlas a una carpeta de archivo: rompería enlaces y `resolveSpecDir` sin ganar nada.
*Implica:* nada en el núcleo; 4.2 solo retira de la prosa la idea de que el PRD es la historia.

## D15 ← B·Q2 · ~~Nada sustituye al PRD como documento~~ *(tachada; ver D26)*
No hay un nuevo fichero acumulado. El contexto duradero es: el código y sus tests de aceptación etiquetados; las specs archivadas (D14); los esquemas de `model/`; las reglas de proyecto y el registro de deuda. El catálogo de requisitos vigentes es una vista derivada: `aidd trace` sin spec lista cada etiqueta presente en los tests con el texto del requisito leído de su spec. Un requisito reemplazado o sin tests desaparece solo, sin que nadie edite nada. Se descarta un `product.md` resumido que mantenga `ship-spec`: vuelve a poner a un modelo a escribir un registro acumulado, que es lo que se deriva. **Revisar:** si el humano quiere un resumen de producto escrito (visión, usuarios, restricciones no funcionales), ese sería otro documento, no un sustituto del PRD.
*Implica:* 4.2 quita el PRD y `define-spec` lee specs y esquemas; 4.3 añade la vista de catálogo y `define-spec` pasa a leerla.

## D16 ← B·Q6 · Requisitos locales `R01` dentro de la spec *(delegada; revisar)*
La spec gana una sección `## Requirements` con una línea por requisito, `- **R01**: <EARS con palabras clave en mayúsculas>`. Los IDs son `R01`–`R99`, consecutivos y únicos en su spec, y su forma global es `S0042-R03`. Desaparece la distinción F/T: todo requisito debe poder probarse con un test de aceptación, y un resultado técnico que no se pueda probar así no es requisito: va en `Solution` y lo juzga la cualificación. `feat` y `fix` tienen al menos un requisito; `refactor` y `chore` pueden no tener ninguno y se verifican solo con la suite completa. Tras la aprobación, ningún ID aprobado desaparece ni cambia de número; `aidd spec check` lo contrasta con la spec del commit de aprobación de `control.json`. Se descartan tres dígitos (una spec es pequeña) y conservar un tipo técnico (reintroduce dos clases sin regla que las separe). **Confirmada por el humano (2026-09-28):** perder los requisitos técnicos sin test es una elección de producto, y se acepta.
*Implica:* 4.1, plantilla y `aidd spec check`.

## D17 ← B·Q5 · La spec clasifica el comportamiento previo que toca: `preserve` o `replace` *(delegada; revisar)*
Sección opcional `## Affected behavior`, con una tabla `| Requirement | Decision |`, cuyas filas citan requisitos de specs entregadas (`S0017-R02`) y deciden `preserve` o `replace`. No existe `undecided`: lo que no se sabe decidir es una pregunta al humano antes de aprobar, y `aidd spec check` rechaza cualquier otro valor o un requisito que no exista en una spec entregada. La tabla de aceptación pasa a `| Requirement | Acceptance test |`, sin columna `Change`: los requisitos propios son siempre nuevos, y los cambios sobre los ajenos van en esta tabla. Se descarta admitir `undecided`: aplazaría hasta el triaje una decisión que la aprobación ya pone delante del humano. **Confirmada por el humano (2026-09-28):** en modo YOLO, una duda aquí obliga a bloquear (D23) en lugar de seguir.
*Implica:* 4.1, plantilla y `aidd spec check`; 4.4 usa la tabla en el triaje (D22).

## D18 ← B·Q6 · Etiquetas en el título del test y trazabilidad determinista *(delegada)*
Cada test de aceptación lleva en su título uno o más tokens `@S0042-R03`. Playwright los trata como etiquetas nativas y cualquier reporter los muestra, así que no hace falta una API por framework. `aidd trace <spec>` busca esos tokens en los ficheros de los proyectos que tienen `acceptance` en `config.json` y da rojo cuando:
- un requisito de la spec no tiene ningún test;
- una etiqueta cita un requisito que no existe;
- una etiqueta cita un requisito que una spec entregada, o esta misma, marca `replace`;
- la rama deja sin tests un requisito entregado que la spec no reemplaza.

`aidd eval record verification … green` rechaza el verde si `trace` está en rojo.
*Implica:* 4.3; `implement-project` etiqueta cada test que escribe (vía `/maintain-skills`).

## D19 ← B·Q7 · Tests sin etiquetar: aviso, no rojo *(delegada)*
`aidd trace` lista los tests sin etiqueta como aviso, sin cambiar el color. Si uno falla, el triaje lo trata como comportamiento de otra spec no declarado (D22). Se etiqueta cuando una spec lo toca; no hay campaña de reetiquetado, porque solo hay greenfield (D11, D13) y el caso típico son los tests de ejemplo del arquetipo.
*Implica:* 4.3.

## D20 ← B·Q3 · Siempre la suite completa, agrupada por el núcleo; ~~resultados en JUnit XML~~ *(delegada; formato tachado, ver D27)*
La verificación ejecuta una vez la suite de aceptación completa con `aidd run acceptance`, sin subconjuntos. El núcleo separa los resultados en tres grupos: requisitos de esta spec, requisitos de otras specs y tests sin etiquetar. Para asignar fallos a tests, cada proyecto de aceptación declara en `config.json` la ruta de un informe JUnit XML (`acceptanceReport`), que su comando genera y que `rule-project` registra. Sin informe declarado, `aidd run acceptance` devuelve los fallos sin asignar y la verificación no puede ser verde. Se descartan:
- ejecutar primero el subconjunto etiquetado con `--grep`: depende del framework y aplaza las regresiones;
- el JSON de Playwright que dejaba abierto 3.2: JUnit lo emiten Playwright, Jest, Vitest y Cypress.

**Revisar:** JUnit frente a JSON de Playwright.
*Implica:* 4.4 amplía el esquema de `config.json`, `lib/exec.mjs` y `rule-project`; los arquetipos del CLI externo (7.2) deben traer el reporter configurado.

## D21 ← B·Q4 · Un fallo es de la rama salvo que la deuda diga lo contrario *(delegada; confirmada por el humano el 2026-09-28)*
El invariante es que la rama por defecto está verde, salvo lo registrado como deuda: toda spec se entrega con verificación verde, o roja en la revisión 3 con sus fallos anotados como deuda. Por eso no se ejecuta la suite sobre la base. Para cada fallo, el núcleo aporta estos hechos:
- sus etiquetas y la spec dueña de cada una;
- si el fichero del test cambió en la rama (diff contra el merge-base);
- si una entrada de deuda cita ese requisito o ese test.

Un fallo es previo solo cuando la deuda lo registra; si no, pertenece a la rama. Se descarta ejecutar la suite en la base dentro de un worktree: duplica el entorno (servidores, puertos, base de datos) en cada verificación, y el invariante ya da la respuesta. **Revisar:** un test inestable o que depende del entorno rompe el invariante (ver 🟡 P8).
*Implica:* 4.4, en la salida de `aidd run acceptance`; la deuda se busca en `TDR.md` hasta que exista el registro de C.

## D22 ← B·Q5 · Triaje: el núcleo propone y el modelo solo elige donde hace falta criterio *(delegada)*
Lo hace `verify-behavior`, que sigue sin editar código ni tests. El núcleo propone la disposición de cada fallo según su etiqueta:
- requisito de esta spec: fallo de la spec, que se repara como hasta ahora;
- requisito marcado `replace`: cambio intencional; el Builder actualiza o retira el test;
- cualquier otro caso, `preserve` incluido: el modelo elige entre regresión, compatibilidad requerida o ambiguo.

Un cambio intencional solo existe si la spec lo declara: cambiar un comportamiento que la spec no reemplaza es regresión o ambigüedad, nunca una decisión del modelo. `verification.md` gana una columna `Disposition`, que valida `lib/reports.mjs`. Un fallo ambiguo detiene la verificación (D23).
*Implica:* 4.4.

## D23 ← B·Q8, P6 · Bloqueo y reanudación con `aidd spec block|resume` *(delegada)*
El bloqueo y su reanudación tienen comando propio:
- `aidd spec block <spec> <motivo>` escribe `blocked: { reason, at, commit }` en `control.json` y anota `blocked` en el journal.
- `aidd spec resume <spec> <resolución>` lo limpia y anota `resumed` con la resolución.

Mientras la spec está bloqueada, `approve`, `eval record` y `release` salen con código 1, y `eval gate` lo cuenta como bloqueante; `release` deja de limpiar el bloqueo por su cuenta. Una escalada de triaje es un `block` cuyo motivo es la pregunta de producto:
- se bloquea sin registrar la evaluación, así que no consume revisión;
- la respuesta del humano se escribe en la spec (una fila de `## Affected behavior`, o un requisito nuevo) y se comprueba con `aidd spec check` antes de `resume`, y así la razón queda archivada con la spec;
- el ciclo sigue desde la verificación.

`escalate` deja de ser un evento del modelo (tacha parte de D5). `aidd log blocked` queda solo para bloqueos fuera de una spec, como en `architect-system-foundation` o `scaffold-system`. Se descarta un estado `blocked` en la cadena: D8 ya lo descartó, y un campo deja la spec en su estado al reanudar.
*Implica:* 4.5 (`lib/control.mjs`, `spec-control.mjs`, `eval-*`, `release`, `lib/journal.mjs`); en los skills, `build-requested-spec` usa `spec block` en lugar de `log blocked`.

## D24 ← D8, P5 · Se confirma la cadena; `shipped` solo desde `qualified` *(delegada; confirmada por el humano el 2026-09-28)*
Se mantiene D8. `qualified` pasa a significar «cualificación cerrada y entrega elegible». `aidd eval record qualification` lleva a `qualified` cuando la combinación permite entregar: verificación verde con cualificación verde o ámbar, o verificación roja en la revisión 3 o posterior con cualquier cualificación. Hoy ese último caso, con cualificación roja, deja la spec en `in-progress`. En cualquier otra combinación la spec sigue en `verified` o en `in-progress`, como ahora. `shipped` solo se alcanza desde `qualified`, y `aidd release` aplica la puerta por sí mismo, en vez de fiarse de que `ship-spec` haya llamado antes a `eval gate`. Se descarta la tabla permisiva actual (entregar desde `in-progress` o `verified` y que decida la puerta): deja que el estado mienta sobre la elegibilidad. **Revisar:** «cualificada» con una cualificación roja en la vía de la revisión 3 es una convención de nombre.
*Implica:* 4.5 (`TRANSITIONS`, `nextState`, `release`); resuelve la parte de P5 que se dejaba para 6.1.

## D25 ← B·Q9 · IDs, contadores, validación, PRD y registros de entrega *(delegada)*
- **Contadores:** `counters.yaml` queda con `spec` y `debt` (cumple D9), y `aidd spec new` pierde `--functional` y `--technical`.
- **Validación:** `aidd spec check` valida la identidad, el ID de spec reservado, los requisitos (D16), la tabla de aceptación con al menos una fila por requisito, `Affected behavior` (D17) y la estabilidad de los IDs tras la aprobación. Deja de comparar el PRD con la base.
- **PRD:** se elimina en todas partes: siembra de `init`, `aidd spec new`, `aidd spec check`, `ship-spec`, `outline-system` (el modelo ya no se redacta «desde el PRD»), la plantilla de `AGENTS.md`, el catálogo y `docs/`.
- **Entrega:** `ship-spec` no aplica ediciones de requisitos. Sigue reconciliando los esquemas y la deuda, y la deuda de una verificación roja en la revisión 3 cita los requisitos como `S0042-R03`. El registro de entrega es `shipped` en `control.json`, la etiqueta de git y el changelog (fase 6).

*Implica:* 4.1 (contadores, `spec new`, `spec check`) y 4.2 (PRD).

## D26 ← B·Q2, D15 · Índice de specs por dominio, generado por el núcleo
Sustituye a D15. El humano quiere conservar una visión sencilla de lo que hace el producto, sin un registro de requisitos que mantenga un modelo. Existe `.product/specs/README.md`, que solo escribe el núcleo: una línea por spec entregada, `- [S0042](S0042-{slug}/spec.md) título`, agrupadas por dominio. El texto humano es el título de la spec; no hay requisitos. El dominio es un campo nuevo `domain` (un slug) en el frontmatter de la spec: `define-spec` lo elige entre los dominios ya presentes en el índice o crea uno, y el núcleo solo valida el formato. `aidd release` regenera el índice dentro del commit de entrega. Si una spec posterior reemplaza a otra, ambas siguen listadas. `aidd trace` sin spec ya no lista un catálogo de requisitos: conserva solo sus comprobaciones (D18, D19). Se descartan que `define-spec` escriba su línea a mano (vuelve a ser un registro editado por un modelo) y un comando aparte (puede quedar desactualizado).
*Implica:* 4.1 (`domain` en la plantilla y en `spec check`); 4.2 (el índice ocupa el lugar del PRD y `define-spec` lo lee; `aidd release` lo genera); 4.3 (sin vista de catálogo).

## D27 ← B·Q3, D20 · El informe de aceptación es el JSON de Playwright
Sustituye el formato de D20; el resto de D20 sigue. `acceptanceReport` en `config.json` es la ruta del JSON del reporter de Playwright, que el comando de aceptación genera y `rule-project` registra. Las etiquetas `@S0042-R03` de D18 llegan en el campo de etiquetas de cada test. Se descarta JUnit XML por elección del humano (2026-09-28); el núcleo queda atado a Playwright por ahora, pero el catálogo solo tiene `e2e-playwright` como proyecto de aceptación, y otro framework tendría que traer su propio lector.
*Implica:* 4.4 (lector del JSON en `lib/exec.mjs`, esquema de `config.json`, `rule-project`); el arquetipo `e2e-playwright` y el CLI externo de 7.2 deben traer el reporter JSON configurado.

## D28 ← P9 · Un fallo `pre-existing` no cuenta contra la spec
Lo decidió el humano (2026-09-28): «el pasado, pisado». Un fallo que la deuda registrada ya cita (D21) no entra en `verification.md` y no impide el verde. El validador de informes no admite `pre-existing` como disposición.

## D29 ← P8 · Sin reintentos en local
Lo decidió el humano (2026-09-28). Ni el núcleo ni `rule-project` añaden reintentos al comando de aceptación. Los agentes ya evalúan en modo interactivo, y los reintentos arriesgan bucles y lentitud. Un test inestable en local sale como fallo, y el triaje lo trata como cualquier otro. `aidd run acceptance` sigue listando aparte los `flaky` cuando el propio proyecto reintenta, como en CI.

## D30 ← C·Q1 · Un registro de deuda del núcleo y una vista generada
`.product/quality/debt.json` va versionado, y solo lo escribe `aidd debt`: es el estado de la deuda abierta, no un historial. `TDR.md` pasa a ser la vista humana, que el núcleo regenera en cada escritura, como el índice de specs (D26). `review.md` desaparece: el escaneo no necesita un informe propio, porque su evidencia queda en los ítems (D34) y el journal registra cuándo ocurrió. Se descartan un Markdown que el núcleo tenga que parsear y mantener los dos ficheros.

## D31 ← C·Q2 · Prioridad `high` / `medium` / `low`
Cada ítem tiene una prioridad, que asigna el modelo al registrarlo: `high` si rompe comportamiento, seguridad o datos; `medium` si frena o encarece el cambio; `low` en el resto. El núcleo valida el valor y ordena la vista por prioridad.

## D32 ← C·Q2, C·Q4 · Estados `confirmed` y `not-revalidated`; lo resuelto se borra
Un ítem abierto está `confirmed`, porque la última evidencia lo ve, o `not-revalidated`, porque el check que lo detectaba no pudo ejecutarse: lo no disponible nunca resuelve. Un check no disponible por sí solo no crea ningún ítem. Un ítem resuelto sale del registro; git conserva la historia.

## D33 ← C·Q3 · Resolver exige una prueba que el núcleo comprueba
`aidd debt resolve` borra un ítem solo con una de dos pruebas:
- `--spec <S0042>`: la spec cita el D ID en su sección `Technical debt`, su última verificación es verde y está `qualified` o `shipped`;
- `--scan <project>`: el proyecto tiene `quality` configurado, así que el check pudo ejecutarse; que ya no vea el problema lo juzga el modelo.

Cualquier otro caso se rechaza con código 1.

## D34 ← C·Q6 · La evidencia vive en el ítem, breve y con su fuente
Cada ítem guarda título, prioridad, estado, alcance, un hecho observado, su impacto y su fuente: el informe de una spec (`S0042-slug/verification.md`) o el check de un escaneo (`quality:back`). Ningún informe aparte guarda la evidencia de la deuda.

## D35 ← C·Q5 · Origen fijo y última confirmación
`origin` no cambia nunca: es la spec que lo registró o `scan`. `confirmed` guarda la fecha, el commit y la fuente de la última evidencia, y lo actualizan `aidd debt update` y cada escaneo que lo vuelve a ver. Si una spec y un escaneo ven el mismo problema, se conserva el mismo D ID. Se descarta una lista de fuentes, que haría crecer el registro.

## D36 ← C·Q7 · Sin deuda elegible, el resumen del registro
Cuando no hay deuda elegible, `craft-lasting-quality` devuelve el resumen de `aidd debt list` (vacío, o solo con ítems que no se pueden reparar) y lo dice.
