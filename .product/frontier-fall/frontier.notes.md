# Frontier fall — notas de brainstorming (Claude)

Reacciones a `fontier.md`. Tu borrador sigue siendo tuyo; aquí van mis propuestas y preguntas.

## Convenio preguntas → respuestas

- Cada pregunta mía tiene un ID estable `P{n}` y nunca se renumera.
- Debajo de cada pregunta hay una línea `> **R:**`. Escribe tu respuesta ahí, con el texto libre que quieras.
- Si la pregunta sobra o quieres aplazarla, responde `descartada` o `aplazada`.
- Cuando me avises, leo tus respuestas y:
  - paso lo acordado a `decisions.md` como `D{n}`, citando la pregunta de origen (`D3 ← P1`);
  - marco la pregunta como `✅ → D3` y dejo tu respuesta intacta;
  - si tu respuesta abre otra duda, la añado como pregunta nueva debajo (`P1.1`).
- Las preguntas nuevas van siempre al final de su sección.
- Marcas de estado: `🟡` **pendiente de tu respuesta** (busca 🟡) · `✅ → D{n}` decidida · `⏸ aplazada` · `↪ P{n}.{m}` tiene preguntas hijas.

## Tesis

A los modelos frontera les sobran instrucciones más que faltarles: con procedimientos rígidos y reglas duplicadas siguen la letra en vez de la intención y gastan contexto en ceremonia. Propongo tres principios:

1. **Objetivo + invariantes, no procedimiento.** Un skill dice qué hay que conseguir, qué no se puede saltar y qué plantilla produce. El modelo decide los pasos.
2. **Los scripts se encargan de la mecánica.** Si un script ya impone algo (formatos, anchos, rutas, IDs), el skill no lo describe.
3. **Una sola fuente de verdad.** El enrutado vive en el orquestador; el catálogo es un índice, no una segunda copia de las reglas.

Dato: los skills son cortos (~25 líneas cada uno). El peso está en `skills.catalog.md` (100 líneas que repiten las reglas de los skills), en los scripts (`materialize` 201, `run-system` 86, `free-port` 173, `append` 96) y en lanzar un subagente por cada etapa.

## Por sección de tu borrador

### SKILLIFY
- "Eliminar npm testing": lo leo como quitar `scripts/verify-*.js` y el `test` de `package.json`. De acuerdo: comprueban el texto de skills que van a cambiar por completo.
- `maintain-skills` justifica la prosa "so older models do not have to interpret indented pseudocode". La regla se mantiene, pero cambia el motivo: legibilidad para humanos y para cualquier harness.

✅ → D1 · **P1.** ¿SKILLIFY es renombrar `maintain-skills` → `skillify`, o rediseñar cómo se crean los skills?
> **R:** Rediseñar, el nombre está bien, pero tiene demasiado peso muerto y cosas del pasado.

✅ → D2 · **P2.** Al quitar los tests, ¿conservamos algo mínimo, como `verify-release.js` o una prueba de humo de `aiddbot init` en un directorio temporal?
> **R:** Vale, pero ahora cada cambio en una skill se siente pesado, la idea es mayor dev experience y menor contendio a mantener

✅ → D3 · **P3.** ¿Debe `maintain-skills` llegar a los repos consumidores, o es solo para desarrollar AIDDbot?
> **R:** Buena pregunta, por ahora diremos que no. Si, al final, quedase muy simple y generilasta... puede llegar a los repos consumidores.

### Naming
- Tu árbol ya sugiere la estructura: 3 orquestadores + primitivas + meta.
- `dev-meta-skill` junta dos cosas distintas: `record-journal` lo usa cada proyecto consumidor en ejecución; `maintain-skills` solo sirve para desarrollar AIDDbot. Yo los separaría.
- Cualquier nombre corto debe evitar los presets del harness (`/review`, `/verify`, `/simplify`, `/init`).

✅ → D4 · **P4.** ¿Qué buscas con el naming: nombres más cortos, una familia de verbos o un prefijo común (`aidd-…`)?
> **R:** Nombres más explicaticos, aún no tengo propuesta. las escribiré en su momento en el fichero frontier con mis ideas draft

### Init / update (semilla)
- De acuerdo con README, LICENSE, AGENTS y `.aiddbot/`.
- `journals/{fecha}.log` con una línea génesis escrita por `aiddbot init` (versión de AIDDbot y marca de tiempo): así la traza empieza antes de ejecutar el primer skill.
- `efforts.yaml` está desactualizado para claude-code (`haiku/sonnet/opus`); hoy la herramienta Agent acepta `haiku | sonnet | opus | fable`. Ver P9.

Sobre dónde vive la semilla. Hoy `.agents/seeds/` (`AGENTS.seed.md`, `CLAUDE.seed.md`, `GITIGNORE.seed`) **no llega al consumidor**: solo la lee `bin/lib/seed.js` desde el paquete. En cambio, `efforts.yaml` sí se copia con el overlay, y la plantilla de contadores está duplicada en `define-spec/assets` y `document-system/assets`. Sacarla de `.agents/` es buena idea: `.agents/` debe contener solo lo que leen los agentes. Hay dos destinos posibles:
- **`.aiddbot/seeds/`** (tu propuesta): encaja con "todo lo de AIDDbot en `.aiddbot/`". Pega: en este repo `.aiddbot/` es también el estado de AIDDbot usándose a sí mismo (journals, efforts), así que mezclaría "estado de este repo" con "fuente del CLI".
- **`bin/seeds/`**: junto a `seed.js`, que es quien la usa. El CLI es dueño de sus plantillas, y `.npmignore` ya publica `bin/**`.

En ambos casos reuniría ahí **toda** la semilla: AGENTS, gitignore, README y LICENSE mínimos, contadores, efforts y la cabecera génesis del journal. Así las plantillas de contadores de los skills desaparecen y `document-system` deja de crear registros "por si no se usó el CLI".

✅ → D12 · **P17.** ¿`.aiddbot/seeds/` o `bin/seeds/`? Yo prefiero `bin/seeds/` por cohesión, pero cualquiera de las dos sirve.
> **R:** vale, es más lógico tenerlos en `bin/`. el destino no simpre es `.aiddbot/`.

✅ → D13 · **P18.** ¿Damos por hecho que siempre se usa `aiddbot init`, y quitamos de los skills la creación de registros como alternativa (plantillas duplicadas de contadores, PRD y TDR)?
> **R:** si, si, vamos a intentar que init deje todo lo más preparado posible para usar aiddbot

### Scaffolding
- Quitar `run-system.mjs` y los scripts raíz `start`/`test:e2e`: un modelo frontera lee `aiddbot.system.json` y el README de cada proyecto y sabe arrancarlo. De paso desaparece el acoplamiento `run-system.mjs` ↔ `verify-acceptance/scripts/free-port.*` (~260 líneas).
- `scaffold-system` tiene 14 pasos numerados. Candidato a reescribirlo como objetivo + invariantes: rama `chore/scaffold`, arquetipo del catálogo primero, nada de código funcional, merge al final.

✅ → D5 · **P5.** "No lint format test": ¿significa que el scaffold no los **ejecuta** (hoy corre un lint básico), o que los arquetipos no **traen** esas herramientas? Lo primero es fácil; lo segundo cambia los arquetipos y pasa la calidad a `craft-lasting-quality`.
> **R:** lo fácil; no ejecutar, solo copiar e instalar

### Journaling
- El script valida el vocabulario (`stage`, `event` y `status` como enumeraciones) y rechaza valores inválidos. El skill queda en ~5 líneas: "ejecuta `append.mjs` con estos flags".
- El párrafo de anchos, relleno, `Info/Warn/Error`… pertenece al script, no al skill ni al catálogo.
- Una única forma de invocarlo, p. ej. `record-journal define/approved green "resumen"`. Cada orquestador dice *qué* eventos importan, no *cómo* se anotan.

⏸ aplazada · **P6.** ¿Usamos **hooks** (`SubagentStart/Stop` en Claude Code, equivalentes en Codex) para anotar automáticamente cada subagente lanzado? Es más fiable que pedírselo al modelo, pero menos portable.
> **R:** Lo he intentado... de hecho tengo un proyecto paralelo a este... pero es muy complicado encontrar un estandard para todos los arneses, y además hay info que se pierde. Estoy abierto a que incorporemos hooks que esciban también aquí con este formato... pero algunas llamadas es muy complicado meterlas en hoosk. Pero, llegado el momento , lo hablamos en detalle.

## Temas que no están en tu borrador

### A. Delegación: menos subagentes
Hoy cada etapa lanza un subagente (Architect/Builder/Craftsman) con su nivel de esfuerzo. Con modelos frontera y contexto largo, cada subagente empieza de cero y vuelve a deducir el contexto. Propuesta:
- El orquestador ejecuta `define-spec` **directamente**, sin subagente; de todas formas necesita tu aprobación.
- Lanzar subagente solo donde la independencia aporta: **Craftsman** para verificar y cualificar (ojos nuevos, sin el sesgo de quien implementó) y, opcionalmente, Builders en paralelo para proyectos independientes.

✅ → D8 · **P7.** ¿Mantenemos los tres roles como subagentes, o pasan a ser "sombreros" que se pone el agente principal?
> **R:** Pues merece la pena investigar más. Me siguen gustando los subagentes porque ofrece: rol, esfuerzo y contexto limpio. ¿Podemos mantener una instancia de cada durante todo el proceso?

✅ → D6 · **P8.** ¿Te vale la propuesta concreta: `define-spec` sin subagente, Craftsman siempre aparte, Builder aparte solo en paralelo?
> **R:** muy radical, por ahora no. Si acaso, intentamos lo dico antes, una instacia por rol durante todo el proceso...

Respuesta a tu pregunta en P7 (¿una instancia de cada rol durante todo el proceso?): **sí, es viable**, y el catálogo ya lo pide a medias ("Orchestrators retain spawned agents for their complete flow"; las reparaciones vuelven al mismo Builder). Claude Code permite continuar un subagente con su contexto intacto (`SendMessage`) y Codex tiene un equivalente. Hay dos matices:
- **Contexto limpio vs. continuidad.** Una instancia larga acumula contexto: el Builder arrastra los proyectos anteriores y las rondas de reparación; el Craftsman recuerda los hallazgos previos. Esto último ayuda a detectar regresiones, pero puede sesgarlo.
- **Aprobación de `define-spec`.** Un subagente no habla con el humano directamente: la aprobación pasa por el agente principal, que actúa de relevo.

✅ → D8 · **P7.1.** ¿Adoptamos "una instancia por rol en cada ejecución de orquestador, continuada con mensajes; se relanza solo si el harness no permite continuar o se agota el contexto"? Los orquestadores anidados (`craft-lasting-quality` → `build-requested-spec`) reutilizarían las mismas instancias.
> **R:** si, vamos a probar con eso, es una solución de compormiso (cambiamos rol y esfuerzo, por mantener contexto)

✅ → D9 · **P7.2.** ¿Te vale que la aprobación de la spec pase por el agente principal como relevo, o prefieres que el Architect sea la única excepción y trabaje en el hilo principal?
> **R:** No acabo de entender esto. Por ahora escoje la opción que sea más sencilla y fácil de implementar.La cambiaremos si hace falta.

### B. Esfuerzos: simplificar
- Con los journals registrando el modelo resuelto de cada subagente, la regla de "ámbar si hereda" podría desaparecer si aceptamos heredar como opción por defecto.

⏸ aplazada · **P9.** Para claude-code, ¿`low: sonnet`, `medium: opus`, `high: fable`? ¿O eliminamos `low`, ya que queda poco trabajo mecánico si los scripts se encargan de la mecánica?
> **R:** Por ahora esto es un detalle menor. Ya iremos ajustando el fichero de esfuerzos según aparezcan modelos... No te rayes con esto ahora mismo.

### C. De reglas legalistas a invariantes
El bucle de "revisión 3" ocupa un párrafo largo en `build-requested-spec` y otro en el catálogo. Cabe en dos líneas: "máximo 3 rondas de reparación; lo que quede sin resolver se entrega como deuda técnica; la evidencia caducada bloquea". El resto lo deduce el modelo.

✅ → D7 · **P10.** ¿Aceptas reducir el bucle de reparación a esos invariantes?
> **R:** Si, si, eso lo tenemos que simplificar. La idea es entregar lo mejor posible, pero no bloquear ni quedarse atrapado en un ciclo infinito.

### D. El catálogo como índice
Reducir `skills.catalog.md` a: tabla de skills + diagrama de enrutado + tabla de registros. Lo demás (formato del journal, clasificación de comandos, esquemas) va al skill que lo posee, o se borra si un script ya lo impone.

⏸ aplazada · **P11.** ¿De acuerdo con adelgazar el catálogo así?
> **R:** ese documento es m´´as para humanos que para agentes. quizá debamos llevarlo a docs. hay varias formas de explorar el catálogo. como lista, como arbol de llamadas (depndencias)... No me preocupe ahora mismo.

### E. Journaling: skill mínima, script determinista
Hoy el script solo formatea: el modelo tiene que decidir y escribir 5–10 flags en cada llamada. Además, 14 skills describen la llamada cada una a su manera ("with `stage: define` and the spec ID", "passing the known harness and model"…). Las etiquetas de estado (`Info/Warn/Error`) se traducen desde 8 alias (`green`, `success`, `info`…) y el resto de valores pasa sin validar.

Propuesta: **el modelo solo aporta lo que no se puede deducir (qué pasó y cómo fue); el script deduce, valida y formatea todo lo demás.**

| Dato | Hoy | Propuesta |
|---|---|---|
| `spec` | lo pasa el modelo | el script lo deduce de la rama `{feat\|fix\|chore}/S{nnnn}-{slug}`; `--spec` solo para forzarlo |
| `stage` | lo pasa el modelo | se deduce del skill que llama (`--skill define-spec` → `define`), con una tabla en el script |
| `revision` | lo pasa el modelo | ~~contarla desde el journal~~ → la sigue pasando el agente, que la tiene en memoria (D10) |
| `harness` / `model` | se piden "en el primer evento" | detección por variables de entorno cuando existan (p. ej. `CLAUDECODE`); flag solo como respaldo |
| `status` | 8 alias sin validar | solo `green`, `amber` o `red`; cualquier otro valor da error |
| `event` | texto libre | ~~vocabulario cerrado~~ → sigue libre; solo se exige y se recorta (D10) |
| cabecera diaria | la escribe el primer evento | igual, y con la línea génesis de `aiddbot init` (ver Init) |

Además:
- **Invocación corta y única:** `node …/append.mjs <skill> <event> <status> "<resumen>" [--project x] [--agent Builder]`. Los orquestadores dicen *qué* eventos importan; ninguna skill vuelve a describir *cómo* se anota.
- **Errores que enseñan:** si falta algo o es inválido, el script sale con código ≠ 0 e imprime el uso y los valores permitidos; el modelo se corrige solo. El `SKILL.md` deja de listar vocabulario y anchos de columna.
- **Confirmación:** el script imprime la línea escrita, así el agente ve el resultado sin leer el fichero.
- **Lectura (idea):** un subcomando `show [--spec S0012]` que devuelve la traza del día o del spec. Sirve para retomar tras una compactación de contexto o para que el orquestador sepa por qué revisión va.
- **Eventos de subagente:** un evento `spawn` con `--role`, `--effort` y `--model` para cumplir la regla de delegación con una sola forma.

Resultado esperado: `record-journal/SKILL.md` en ~5 líneas ("ejecuta el script con skill, evento, estado y resumen; no edites el journal ni lo commitees") y el párrafo de formato desaparece del skill y del catálogo.

✅ → D10 · **P13.** ¿Te encaja el reparto "el modelo aporta evento, estado y resumen; el script deduce lo demás"?
> **R:** vale

✅ → D10 · **P14.** ¿Cerramos el vocabulario de `event` por etapa en el script (más rígido, pero validable), o lo dejamos libre y solo validamos `stage` y `status`?
> **R:** lo que sea más fácil (si va mal ya lo mejoraremos)

✅ → D10 · **P15.** Deducir `revision` del propio journal lo hace depender de un fichero ignorado por git y que cambia cada día. ¿Lo leemos mejor de `verification.md`/`qualification.md` del spec, o seguimos pasándolo a mano?
> **R:** buena pregunta, creo que leer el fichero ralentiza... el agente tien la verisón en momoria... 

⏸ aplazada · **P16.** ¿Añadimos el subcomando de lectura `show` ahora, o lo dejamos para después?
> **R:** después, ahora no sé ni que ese eso

### F. Ejecución del plan (`plan.md`)

✅ → D14 · **P19.** ¿Cómo lo integramos? Propongo una rama `refactor/frontier-fall` con un commit por paso del plan y un solo merge al final, porque a mitad del refactor los skills y los scripts no encajan entre sí. La alternativa es trabajar en `main` fase a fase, con releases intermedias.
> **R:** crea rama

✅ → D15 · **P20.** ¿Qué versión marca la "base publicable de otoño"? Propongo saltar de `0.0.x` a `0.1.0` al cerrar la fase 7.
> **R:** ok a la versión

### G. Tres copias de la sección Delegation (fase 4)

La política de delegación es ahora una sola definición, pero vive en tres ficheros con el texto idéntico: el `AGENTS.md` de este repo, `document-system/assets/AGENTS.template.md` y `bin/seeds/AGENTS.seed.md` (lo que escribe `init` antes de que corra `document-system`). Nada las mantiene sincronizadas.

✅ → D16 · **P21.** ¿Cómo lo resolvemos? Opciones: (a) que `init` siembre directamente `AGENTS.template.md` y desaparezca `AGENTS.seed.md` (queda con placeholders hasta `document-system`, pero con una sola fuente para consumidores); (b) que `adapt.js` compruebe que las tres secciones coinciden y falle la release si no; (c) dejarlo así y confiar en `/maintain-skills`. Propongo (a) + (b) para el `AGENTS.md` de este repo.
> **R:** sí, todo lo que sea determinista y que reduzca peso de skills es bueno

### H. Tus inquietudes durante el refactor (`fontier.md`, tras la fase 4)

**Mi lectura de las cuatro.** Las tres primeras son un mismo problema. D8 fija una instancia por rol en toda la ejecución, pero cada orquestador sigue pidiendo esfuerzos distintos para el mismo rol: el Architect es `medium` en `architect-system-foundation` y `high` en `build-requested-spec`, y en `craft-lasting-quality` era `low` hasta que lo subí a `high` en la fase 4. Con una sola instancia, manda el esfuerzo del primer lanzamiento y el resto de peticiones se ignoran en silencio. Eso obliga a mantener en `## Delegation` toda la ceremonia de leer `efforts.yaml`, pasar controles nativos y registrar `spawn`/`reuse`, y a que cada orquestador repita roles y esfuerzos.

**Propuesta de fondo (determinista, quita peso).** Asignar el esfuerzo al **rol**, no a la etapa: Architect `high`, Builder `medium`, Craftsman `high`. Así `adapt.js` puede escribir el modelo resuelto directamente en el agente de cada arnés: `model:` en `.claude/agents/architect.md`, y los campos equivalentes en Codex, Cursor y Copilot, todo desde `efforts.yaml` y en la release, como el resto de adaptadores. Lanzar un Architect ya lo lanza con su modelo, sin que nadie lea ni pase nada. Consecuencias:
- `## Delegation` se queda en dos reglas: una instancia por rol retomada con mensajes, y los subagentes no preguntan al humano. O desaparece y esas dos frases van a los orquestadores.
- Los orquestadores dejan de nombrar esfuerzos; solo dicen qué rol ejecuta qué skill.
- El evento `spawn` deja de necesitar `--effort` y `--model` (el modelo es fijo y conocido), o se sustituye más adelante por los hooks (P6).
- `efforts.yaml` pasa a mapear rol → esfuerzo → modelo por arnés. Encaja con P9: se ajusta en AIDDbot, no en cada consumidor.
- Riesgo a comprobar en la fase 7: que cada arnés respete el modelo declarado en la definición del agente. Claude Code sí lo hace.

✅ → D17 · **P22.** ¿Esfuerzo fijo por rol (Architect `high`, Builder `medium`, Craftsman `high`) escrito por `adapt.js` en los agentes de cada arnés, en lugar de esfuerzo por etapa?
> **R:** sí a todo lo que haga el sistema más simple

✅ → D18 · **P23.** Si P22 es sí, ¿qué hacemos con `## Delegation`: (a) la reducimos a las dos reglas que quedan, o (b) la eliminamos y cada orquestador lleva esas dos frases (con lo que la plantilla del consumidor y `adapt.js` dejan de sincronizar nada)? Me inclino por (b): la política solo la leen los orquestadores.
> **R:** sí a todo lo que haga el sistema más simple

**Sobre PRD y TDR sin plantilla.** Estoy de acuerdo. La plantilla del TDR es una sola línea de cabecera, y el formato de cada entrada ya lo define `debt.contract.md`. La del PRD es una cabecera, un comentario sobre EARS y una línea de ejemplo. Propuesta: borrar las dos y poner en `define-spec` una frase con la forma de la línea (`- **F0001**: …` en EARS, palabras clave en mayúsculas). `init` sigue creando los ficheros vacíos, y como son una sola línea, las semillas de `bin/seeds/` pueden pasar a ser cadenas dentro de `seed.js`.

✅ → D19 · **P24.** ¿Quitamos las plantillas de PRD y TDR (y convertimos sus semillas en cadenas dentro de `seed.js`)?
> **R:** sí a todo lo que haga el sistema más simple

### I. Nombres para la fase 6 (tu fontier.md)

He revisado los 14 skills contra tus cuatro propuestas y busqué además cualquier otro choque real (verbo repetido de forma confusa, nombre que no cubre lo que hace el skill). Encontré uno más que tú no habías anotado — `build-requested-spec` — y creo que es el que más lo necesita. Para los otros tres, mi lectura no siempre coincide con la tuya; lo explico en cada fila y dejo "dejar" como una de las tres propuestas cuando creo que el nombre actual ya es el mejor.

| Skill | Problema | Propuesta 1 | Propuesta 2 | Propuesta 3 | Mi favorita |
| --- | --- | --- | --- | --- | --- |
| `build-requested-spec` (orq.) | "build" solo cubre la fase de código; el skill define, construye, verifica, revisa y publica | `deliver-requested-spec` | `ship-requested-spec` | `fulfill-requested-spec` | **`deliver-requested-spec`** — es literalmente la descripción de una línea que ya tiene en el catálogo: "Deliver one requested spec" |
| `implement-project` | libera el verbo "build" al renombrar el orquestador; el área del catálogo que lo agrupa ya se llama "Build" | `build-project` | `code-project` | `implement-project` (dejar) | **`build-project`** — coincide con la fila "Build" del catálogo, que hoy ya usa esa palabra para agruparlo |
| `document-system` | tu propuesta `stablish-system`: se solapa con "foundation" del orquestador que lo llama (`architect-system-foundation`) — dos nombres evocando "fundar" | `document-system` (dejar) | `outline-system` | `profile-system` | **`document-system` (dejar)** — hace pareja clara con `document-project` (mismo verbo, dos alcances); "establish" pisa el terreno que ya cubre "foundation" |
| `document-project` | tu propuesta `guide-project`: una "guía" suena a instrucciones para humanos, pero el skill también escribe hechos (esquemas de BD y API), no solo reglas | `document-project` (dejar) | `record-project` | `profile-project` | **`document-project` (dejar)**, por la misma pareja con `document-system` |
| `verify-acceptance` | tu propuesta `verify-criteria`: es más genérica ("criteria" podría ser cualquier criterio), no más clara que "acceptance" | `verify-acceptance` (dejar) | `verify-behavior` | `run-acceptance` | **`verify-acceptance` (dejar)** — ya nombra exactamente lo que verifica (criterios de aceptación, tests E2E) |

**Efecto en cadena de aceptar la primera fila:** si `build-requested-spec` pasa a `deliver-requested-spec`, la palabra "build" queda libre y `implement-project` → `build-project` deja de chocar con nada. Si solo aceptas la fila 1 y no la 2, no pasa nada — son independientes.

🟡 **P25.** ¿Qué filas aceptas? Indica cada una con el nombre final (el tuyo, uno de los tres, u otro que se te ocurra al verlos así).
> **R:**

**Sobre tu nota "¿`adapt` está sesgado hacia Claude?"**: no — cubre los cuatro arneses. `syncAgents` escribe en `.claude/agents/`, `.cursor/agents/`, `.codex/agents/` y `.github/agents/` (Copilot) para los tres roles; `syncSkills` sí genera puntero solo para Claude Code porque es el único de los cuatro que no lee `.agents/skills/` directamente — Codex, Cursor y Copilot lo hacen ya, sin adaptador (D11). Si veías algo puntual que parecía sesgado, dime dónde y lo reviso.

## Limpieza local (no requiere decisión)
- En `.claude/skills/` quedan carpetas sin versionar de skills renombrados: `implement-change`, `implement-spec`, `ship-implementation`, `specify-spec`.
- ~~Mi memoria sobre la familia "-ify" se refiere a nombres que ya no existen~~ → borrada tras D4.

✅ → D4, D11 · **P12.** `scripts/z_architect-*.md` y `scripts/adapt.command.md`: ¿siguen en uso o se borran?
> **R:** Lo de la famili -ify ya no aplica. eso era cuando pretendia lanzar las skill a mano con palabra corta que no colisionaes con los arneses. ahora vamos a palabras completas descriptivas. 2 para las primitivas , tres para los orquestadores.

✅ → D11 · **P12.1.** Tu respuesta a P12 era sobre la familia -ify (recogida en D4); la pregunta original sigue abierta: `scripts/z_architect-drifter.md`, `scripts/z_architect-refactor.md` y `scripts/adapt.command.md`, ¿siguen en uso o se borran?
> **R:** te digo lo que necesitamos, y con eso decide lo que sobra. Actualmente las skills, los hooks y los agentes son distintos para cada arnés soportado (claude, codex, copilot y cursor). Afortunadmanete ya no se necista el CLAUDE.md ;-) Pero necesitamos tener esas adaptaciones... cómo y cuándo hacerlas? lo que tu digas!

## Orden sugerido
🟡 Pendientes: P25 (nombres de la fase 6).
