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

---

## Prompt 1 · La base del cli

Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Sigue `builder/procedure.md`, pasos 1, 2 y 3. AIDDbot ya está instalado.

La biblioteca: Archetype CLI, una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".

Antes de empezar, lee `git log`, la rama actual y `git status`, y sigue en el primer paso sin terminar. Conserva el trabajo sin commitear: es de la sesión anterior.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- Ningún código funcional: ni configuración, ni comandos, ni tests de aceptación. Eso llega con las specs.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Para cuando el scaffold de los dos proyectos y el outline estén integrados en `master`. Resume los commits de cada proyecto y las ranuras de `config.json`.

## Prompt 2 · La configuración

Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Archetype CLI ya tiene su scaffold en `master` (pasos 1 a 3 de `builder/procedure.md`). Ahora el paso 4, solo con la primera spec: configuration.

1. Usa la skill $build-requested-spec con la petición «Entrega la spec del fichero `builder/blueprint/foundation/configuration.spec.md`».
2. Después usa $craft-lasting-quality.
3. Después ejecuta `node .agents/aidd/aidd.mjs debt list`.

Antes de empezar, lee `git log`, la rama actual, `git status`, `.product/specs/*/control.json` y `node .agents/aidd/aidd.mjs debt list`, y sigue en el primer paso sin terminar. Una spec sin entregar se termina con su skill pendiente (por ejemplo $ship-spec), nunca se empieza de nuevo. Conserva el trabajo sin commitear: es de la sesión anterior.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- `CONFIG_FILE` es relativo a la carpeta del proyecto, sin excepción.
- Si después de $craft-lasting-quality queda deuda, para y explica por qué.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Al final, resume la versión de la spec, los ciclos de verificación y de triaje, la deuda que dejó la revisión, las reparaciones de craft y sus tiempos (del journal en `.aiddbot/journals/`).

## Prompt 3 · El resto

Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Archetype CLI ya tiene su scaffold y la spec configuration en `master`. Ahora el resto del paso 4 de `builder/procedure.md`. No hagas el paso 5 (el seed).

Las specs, en este orden: monitoring, shell, about, health, presentation. No entregues users: un cli local no tiene usuarios. Para cada spec:
1. Usa la skill $build-requested-spec con la petición «Entrega la spec del fichero `builder/blueprint/foundation/{spec}.spec.md`».
2. Después usa $craft-lasting-quality.
3. Después ejecuta `node .agents/aidd/aidd.mjs debt list`. No empieces la spec siguiente si queda deuda.

Después de la última spec, el cierre: $craft-lasting-quality otra vez, hasta que su scan y su hardening no apunten nada y `debt list` quede vacío.

Este trabajo puede necesitar varias sesiones. Antes de empezar, lee `git log`, la rama actual, `git status`, `.product/specs/*/control.json` y `node .agents/aidd/aidd.mjs debt list`, y sigue en el primer paso sin terminar. Una spec sin entregar se termina con su skill pendiente (por ejemplo $ship-spec), nunca se empieza de nuevo. Conserva el trabajo sin commitear: es de la sesión anterior.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- Si después de un $craft-lasting-quality queda deuda, para y explica por qué.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Al final, ejecuta `node .agents/aidd/aidd.mjs run lint`, `run test` y `debt list`, y resume en una tabla cada spec (también configuration), su versión, la deuda que dejó, las reparaciones de craft y sus tiempos (del journal en `.aiddbot/journals/`).
