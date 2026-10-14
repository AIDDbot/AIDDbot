Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Construye la biblioteca Archetype CLI siguiendo `builder/procedure.md`, pasos 1 a 4. No hagas el paso 5 (el seed). AIDDbot ya está instalado.

La biblioteca: una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".

Esta sesión hace UN SOLO PASO y para. El estado está en los ficheros: antes de empezar, lee `git log`, la rama actual, `git status`, `.product/specs/*/control.json` y `node .agents/aidd/aidd.mjs debt list`. Después haz solo el primer paso sin terminar de esta lista:

1. Los pasos 1 a 3 del procedimiento: el scaffold de cada proyecto, el outline y la integración en `master`.
2. a 7. Una spec de fundación, en este orden: configuration, monitoring, shell, about, health, presentation. No entregues users: un cli local no tiene usuarios. Un paso es: $build-requested-spec con la petición «Entrega la spec del fichero `builder/blueprint/foundation/{spec}.spec.md`», después $craft-lasting-quality, y después `node .agents/aidd/aidd.mjs debt list`.
8. El cierre: $craft-lasting-quality otra vez, hasta que su scan y su hardening no apunten nada y `debt list` quede vacío.
9. El resumen: ejecuta `node .agents/aidd/aidd.mjs run lint`, `run test` y `debt list`, y resume en una tabla cada spec, su versión, la deuda que dejó, las reparaciones de craft y sus tiempos (del journal en `.aiddbot/journals/`).

Una spec sin entregar se termina con su skill pendiente (por ejemplo $ship-spec), nunca se empieza de nuevo. Conserva el trabajo sin commitear: es de la sesión anterior.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- Si después de un $craft-lasting-quality queda deuda, para y explica por qué.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Termina tu último mensaje con una sola línea, la última, exactamente así:
- `AIDD-NEXT` cuando el paso terminó y queda otro.
- `AIDD-DONE` cuando terminaste el paso 9.
- `AIDD-STOP: <motivo>` cuando paraste por deuda, por un bloqueo o por una decisión de producto.
