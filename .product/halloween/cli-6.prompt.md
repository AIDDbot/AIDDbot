Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Construye la biblioteca Archetype CLI siguiendo `builder/procedure.md`, pasos 1 y 2. No hagas el paso 3 (el seed). AIDDbot ya está instalado y `builder/` ya está en su sitio.

La biblioteca: una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".

Este trabajo puede necesitar varias sesiones. El estado está en los ficheros: antes de empezar, lee `git log`, la rama actual, `git status`, `.product/specs/*/control.json` y `node .agents/aidd/aidd.mjs debt list`, y sigue en el primer paso que no está terminado. Una spec sin entregar se termina con su skill pendiente (por ejemplo $ship-spec), nunca se empieza de nuevo. Conserva el trabajo sin commitear: es de la sesión anterior.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- Si después de un $craft-lasting-quality queda deuda, para y explica por qué.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Al final, ejecuta `node .agents/aidd/aidd.mjs run lint`, `run test` y `debt list`, y resume en una tabla cada spec, su versión, la deuda que dejó, las reparaciones de craft y sus tiempos (del journal en `.aiddbot/journals/`).
