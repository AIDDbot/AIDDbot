# Frontier fall — decisiones

Cada decisión cita su origen (`← P{n}` en `frontier.notes.md`, o `← fontier.md`). Si una decisión cambia, se tacha y se añade otra nueva; no se reescribe.

## D1 ← P1 · Rediseñar `maintain-skills`
Se mantiene el nombre. Se rediseña quitando el peso muerto y los restos de etapas anteriores (p. ej. la justificación "older models").

## D2 ← P2 · Tests: priorizar la experiencia de desarrollo
Se eliminan los tests que inspeccionan el contenido de los skills (`scripts/verify-*.js` y el `test` de `package.json`). Cambiar un skill no debe obligar a tocar un test. Como mucho sobrevive una prueba mínima del CLI o de la release, y solo si no depende del texto de los skills.

## D3 ← P3 · `maintain-skills` no llega a los consumidores
Por ahora es solo para desarrollar AIDDbot. Se reconsiderará si acaba siendo simple y generalista.

## D4 ← P4, P12 · Convención de nombres
Nombres completos y descriptivos: **2 palabras para primitivas, 3 para orquestadores**. Se descarta la familia "-ify" (palabras cortas para invocar a mano). Las propuestas concretas llegarán en `fontier.md`.
Nota: los nombres actuales ya cumplen la forma (p. ej. `define-spec`, `build-requested-spec`); la revisión es de significado, no de longitud.

## D5 ← P5, fontier.md · El scaffold solo copia e instala
`scaffold-system` materializa los arquetipos e instala dependencias. No ejecuta lint, format ni tests. Se elimina `run-system` del `package.json` raíz.

## D6 ← P8 · Se mantienen los subagentes por rol
Architect, Builder y Craftsman siguen siendo subagentes porque aportan rol, esfuerzo y contexto limpio. Se descarta, por ahora, ejecutar `define-spec` sin subagente. La siguiente línea a explorar es **una instancia por rol durante todo el proceso** (ver P7.1).

## D7 ← P10 · Bucle de reparación como invariantes
Entregar lo mejor posible sin bloquear ni quedar atrapado en un ciclo infinito: máximo 3 rondas de reparación; lo que quede sin resolver se entrega como deuda técnica; solo la evidencia caducada o ausente bloquea.

## D8 ← P7, P7.1 · Una instancia por rol durante todo el proceso
Cada ejecución de orquestador lanza como mucho un Architect, un Builder y un Craftsman, y los retoma con mensajes en lugar de relanzarlos. Solo se relanzan si el harness no permite continuarlos o se agota su contexto. Los orquestadores anidados reutilizan las instancias del que los llama. Es un compromiso: se conserva rol y esfuerzo por agente, a cambio de un contexto que crece.

## D9 ← P7.2 · La aprobación de la spec pasa por el agente principal
Opción más sencilla, que coincide con cómo funciona ya: el Architect redacta la spec, el agente principal se la enseña al humano y le devuelve la aprobación o los cambios. Se revisará si da problemas.

## D10 ← P13, P14, P15 · Journaling: skill mínima, script determinista
El agente aporta skill, evento, estado, resumen y, cuando aplique, revisión (la tiene en memoria). El script deduce el spec de la rama y la etapa del skill, detecta harness y modelo por el entorno cuando pueda, valida `status` (`green`, `amber`, `red`) y formatea. `event` sigue siendo texto libre por sencillez; se endurecerá si da problemas. `record-journal/SKILL.md` queda en unas pocas líneas, y el formato sale del skill y del catálogo.

## D11 ← P12.1 · Adaptadores de arnés: script determinista en la release
Qué necesitamos: skills, agentes y hooks en el formato nativo de cada arnés (Claude, Codex, Copilot y Cursor), partiendo de una única fuente en `.agents/`.

- **Cómo:** `scripts/adapt.command.md` (un comando en prosa que ejecuta un modelo) se sustituye por un script de Node, `scripts/adapt.js`. Es un mapeo fijo de fuente a destino, igual que el journal (D10): mecánica para un script. Con `--check` compara sin escribir.
- **Cuándo:** solo en el repo de AIDDbot. `release.js` lo ejecuta antes de cada release y también se puede lanzar a mano (`npm run adapt`). Los adaptadores se commitean y llegan a los consumidores con el overlay de `aiddbot init/update`, como ahora. Los consumidores nunca generan adaptadores.
- **Qué se genera (mínimo):**
  - *Skills:* solo punteros para Claude Code en `.claude/skills/`; Codex, Copilot y Cursor leen `.agents/skills/` directamente. Si se confirma que Claude Code también lee `.agents/skills/`, los punteros desaparecen.
  - *Agentes:* 3 roles × 4 arneses, punteros finos al fichero de `.agents/agents/`.
  - *Hooks:* solo conectar `.agents/hooks/index.mjs` en la configuración de cada arnés. Su contenido queda fuera (P6, aplazada).
  - *Reglas:* **no se generan adaptadores**. `AGENTS.md` ya enlaza `.agents/rules/{project}.rules.md` y los cuatro arneses leen `AGENTS.md`. Así desaparece el único caso que obligaba a regenerar en el repo consumidor.
- **Semilla:** fuera `CLAUDE.seed.md`, ya no hace falta `CLAUDE.md`.
- **Limpieza:** se borran `scripts/z_architect-drifter.md` y `scripts/z_architect-refactor.md` (borradores sin terminar; quedan en el historial de git). La deriva arquitectónica y los refactors técnicos los cubre `craft-lasting-quality`.
- Con D3, `maintain-skills` y su puntero quedan fuera del overlay.

## D12 ← P17 · La semilla vive en `bin/seeds/`
Todas las plantillas que usa `aiddbot init` pasan de `.agents/seeds/` a `bin/seeds/`, junto a `seed.js`, su único consumidor. Sus destinos en el consumidor varían (raíz, `.aiddbot/`, `.gitignore`…), así que la ubicación de la fuente no debe sugerir ninguno. `.agents/` queda solo para lo que leen los agentes.

## D13 ← P18 · `aiddbot init` deja todo preparado
`init` es siempre el punto de entrada y crea todo lo necesario para empezar: AGENTS, gitignore, README y LICENSE mínimos, contadores, efforts, PRD y TDR vacíos, y la cabecera inicial del journal. Los skills dejan de crear registros como alternativa, y desaparecen sus plantillas duplicadas (contadores en `define-spec` y `document-system`, PRD, TDR) y `document-system/scripts/initialize-product-docs.mjs`. Si falta un registro, el skill indica que hay que ejecutar `aiddbot init`.

## D14 ← P19 · Una rama para todo el refactor
Se trabaja en `refactor/frontier-fall`, con un commit por paso de `plan.md` y un solo merge a `main` al final: a mitad del refactor los skills y los scripts no encajan entre sí.

## D15 ← P20 · Versión `0.1.0`
Al cerrar la fase 7, la release salta de `0.0.x` a `0.1.0`, que marca la base publicable de otoño.

## D16 ← P21 · Una sola fuente para el `AGENTS.md` de los consumidores
Se aplican (a) y (b). `AGENTS.template.md` de `document-system` es la única plantilla: absorbe la personalidad que llevaba la semilla y fija `.product/` como `{Product_Folder}`. `init` la siembra tal cual y `bin/seeds/AGENTS.seed.md` desaparece; `document-system` rellena después los marcadores. Es la única excepción a D12: esa plantilla la necesita el skill, así que `seed.js` la lee de su sitio en vez de duplicarla. `adapt.js` copia la sección `## Delegation` de la plantilla al `AGENTS.md` de este repo, y `--check` (y con él la release) falla si difieren. Criterio general: todo lo determinista que quite peso a los skills va a un script.

## D17 ← P22 · Esfuerzo fijo por rol, resuelto en la release
El esfuerzo pertenece al rol, no a la etapa: Architect `high`, Builder `medium`, Craftsman `high`. `scripts/adapt.js` lee `.aiddbot/efforts.yaml` y escribe el modelo de cada rol en la definición del agente de cada arnés. Ningún agente lee ya `efforts.yaml`, que deja de llegar a los consumidores. Así una instancia por rol (D8) nunca choca con dos esfuerzos distintos, y los orquestadores dejan de nombrar esfuerzos. Matiza D8 sin anularla.

## D18 ← P23 · Sin sección `## Delegation`
Tras D17 solo quedan reglas que únicamente usan los orquestadores: una instancia por rol retomada con mensajes, la reutilización de los agentes del llamante, que los subagentes no preguntan al humano y que cada uno detiene solo lo suyo. Van en los tres orquestadores y la sección desaparece de la plantilla y del `AGENTS.md` de este repo. La sincronización de secciones de D16 deja de tener objeto y se retira; D16 sigue vigente en lo demás. El evento `spawn` solo exige `--role`, y `reuse` desaparece.

## D19 ← P24 · PRD y TDR sin plantilla
Se borran `define-spec/assets/PRD.template.md` e `inspect-quality/assets/TDR.template.md`. La forma de una línea del PRD pasa a una frase de `define-spec`, y la del TDR ya la define `debt.contract.md`. Las semillas de una línea (PRD, TDR, contadores y LICENSE) pasan a ser cadenas dentro de `seed.js`; solo `GITIGNORE.seed` sigue siendo fichero.

## Aplazadas
- **P6 · Hooks para el journal:** abierto a que los hooks escriban con el mismo formato, pero hay llamadas difíciles de cubrir con hooks. Se tratará en detalle más adelante.
- **P9 · `efforts.yaml`:** detalle menor; se irá ajustando conforme salgan modelos.
- **P16 · Subcomando `show` del journal:** para más adelante.
- **P11 · Catálogo:** es más para humanos que para agentes; quizá vaya a `docs/`, con varias vistas (lista, árbol de llamadas). No es prioritario.
