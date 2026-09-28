# Deterministic core — decisiones

Cada decisión cita su origen (`← Q{n}` en `../d.deterministic-core.proposal.md`). Si una decisión cambia, se tacha y se añade otra; no se reescribe. Las marcadas *(delegada)* las tomó el agente a petición del humano y conviene revisarlas.

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
Los únicos eventos del modelo son `verdict` (greenfield o brownfield), `select` (deuda elegida), `blocked` (con su motivo) y `escalate` (triaje de B). Se eliminan `start`, `done`, `spawn` y los hitos de código, test y lint. El núcleo anota por su cuenta la creación, aprobación, evaluación, deuda, entrega e integración.

## D6 ← Q6 · Configuración y comandos en un solo fichero *(delegada)*
`.aiddbot/config.json` va versionado y lo escribe el núcleo. Contiene los proyectos, cada uno con su ruta y sus comandos clasificados: `lint` (solo de nivel error), `unit`, `acceptance` y `quality` (lista). Además:
- `init` lo siembra vacío; `outline-system` registra los proyectos; `rule-project` clasifica los comandos de cada uno una sola vez, con `aidd config`.
- Más adelante, el CLI de scaffold (A) podrá presembrarlo y `rule-project` lo confirmará.
- `aidd run` falla con un código propio si un comando no está clasificado, y el skill lo registra como no disponible (ámbar); nunca se lo inventa.
- **Derivada:** `.product/` pasa a ser una constante del núcleo y deja de ser configurable, lo que matiza la D13 de frontier-fall. Con beta y solo greenfield, un marcador menos que resolver.

## D7 ← Q7 · Límites de rol en el prompt, no en el arnés *(delegada)*
No se genera por ahora ninguna restricción de herramientas ni ningún hook por rol: costaría adaptadores en cuatro arneses, y con D4 no hay hooks. Los límites de cada rol y las reglas de subagente ("no preguntes al humano", "detén solo lo tuyo") pasan a `.agents/agents/*.md` y salen de skills y orquestadores. Se revisará si una prueba real muestra violaciones.

## D8 ← Q8 · Se mantiene la cadena de estados *(delegada)*
Se mantienen `draft → in-progress → verified → qualified → shipped`, ahora en `control.json` y cambiados solo por el núcleo, que rechaza las transiciones ilegales. Una escalada no es un estado: es un campo `blocked` con motivo que se limpia al reanudar. Queda pendiente de confirmar al decidir B.

## D9 ← Q9 · Se mantienen los contadores
`.aiddbot/counters.yaml` sigue siendo la fuente de los IDs. Cuando B elimine F y T, quedarán `spec` y `debt`.

## D10 ← Q10 · Orden de fases
Núcleo → control y journal → ejecutor de comandos → B → C → release → A → roles y documentación. El ejecutor va antes de B porque simplifica la trazabilidad de los tests de aceptación.

## D11 ← Q11 · Entregas cortas
Nada de rama larga como en frontier-fall (D14 de allí). Cada fase va en una rama corta, deja el sistema funcionando, se integra en `main` y sale como release *patch*. B cambia la estructura de los registros y sale como `0.2.0`, sin migración (beta, solo greenfield).

## D12 · Las preguntas de A, B y C se deciden justo antes de su fase
Cada una de esas fases arranca con un paso de decisiones que responde las preguntas abiertas de su propuesta, a la luz del núcleo ya construido.
