# Frontier fall — plan de implementación

Aplica las decisiones D1–D19 de `decisions.md`. Las fases van ordenadas por dependencias: primero los scripts deterministas, porque los skills reescritos se apoyan en ellos; después `maintain-skills`, porque todo cambio de skill pasa por él; y los nombres al final, cuando renombrar sea barato.

Estado de cada paso: `[ ]` pendiente · `[~]` en curso · `[x]` hecho. Las dudas abiertas van en `frontier.notes.md` con 🟡.

## Cómo ejecutar

Una sesión por fase, nunca todo el plan de una vez: así un error de criterio no se propaga antes de que el humano lo revise, y ninguna fase llega a compactar contexto. Al final de cada fase, el humano revisa los commits y decide si se sigue.

| Fase | Modelo | Motivo |
|---|---|---|
| 0 · Limpieza | Sonnet | Mecánica |
| 1 · Scripts | Sonnet | Bien especificada y con criterio de "hecho cuando" comprobable |
| 2 · `maintain-skills` | **Opus** | Marca el estilo de todos los skills siguientes |
| 3.1–3.4 · Primitivas concretas | Sonnet | Siguen la plantilla nueva y decisiones cerradas |
| 3.5 · Repaso con la tesis | **Opus** | Hay que decidir qué instrucción deduce el modelo solo y cuál no |
| 4 · Orquestadores | **Opus** | Semántica de delegación y del bucle de reparación |
| 5 · Docs | Sonnet | Sincronizar |
| 6 · Nombres | Sonnet | Renombrado mecánico con nombres ya decididos |
| 7.1 · Prueba real | Los de `efforts.yaml` | Hay que probar con los modelos que usará un consumidor |
| 7.2 · Release | Sonnet | Mecánica |

Instrucción de arranque de cada sesión:

```text
Estás en la rama refactor/frontier-fall. Lee .product/frontier-fall/plan.md y decisions.md.
Ejecuta solo la fase {N}. Marca cada paso [~] al empezarlo y [x] al cumplir su "hecho cuando".
Haz un commit por paso. Cambia los skills solo a través de /maintain-skills.
Si una decisión no cubre un caso, no improvises: anota la duda en frontier.notes.md como 🟡 P{n}
y sigue con lo que no dependa de ella. Para al terminar la fase y resume qué quedó hecho y qué dudas abriste.
```

## Fase 0 · Limpieza (sin dependencias)

- [x] **0.1 Quitar los tests de contenido** (D2). Borrar `scripts/verify-skills-migration.js`, `verify-skills-batch-a.js` y `verify-cli-update.js`, y dejar en `package.json` como mucho un `test` que no lea texto de skills. Decidir si `verify-release.js` sobrevive tal cual o se reduce.
  *Hecho cuando:* cambiar un `SKILL.md` no rompe ningún test. **Verificado:** `verify-release.js` sobrevive tal cual, solo ejerce `release.js`; se confirmó tocando `define-spec/SKILL.md` y repitiendo `npm test`.
- [x] **0.2 Borrar borradores** (D11). `scripts/z_architect-drifter.md` y `scripts/z_architect-refactor.md`.
- [x] **0.3 Limpieza local.** Carpetas sin versionar de `.claude/skills/` (`implement-change`, `implement-spec`, `ship-implementation`, `specify-spec`).

## Fase 1 · Scripts deterministas

- [x] **1.1 Journal** (D10). Reescribir `record-journal/scripts/append.mjs`:
  - invocación `append.mjs <skill> <event> <status> "<resumen>" [--project] [--agent] [--revision] [--spec]`;
  - `spec` deducido de la rama `{feat|fix|chore}/S{nnnn}-{slug}`; `stage` deducido del skill con una tabla interna;
  - `harness`/`model` por variables de entorno cuando existan, con flags como respaldo;
  - `status` solo `green|amber|red`; `event` libre, obligatorio y recortado;
  - evento `spawn` con `--role`, `--effort` y `--model`;
  - imprime la línea escrita; ante un error, sale con código ≠ 0 y muestra el uso.
  *Hecho cuando:* una llamada desde una carpeta de proyecto en una rama `feat/S0001-x` escribe la línea completa en el journal raíz con solo 4 argumentos. **Verificado** con la invocación mínima, `spawn`, los tres niveles de estado, y cada camino de error (skill/estado/agente inválido, `spawn` sin flags, argumentos de más/menos). Solo `claude-code` se autodetecta hoy (`CLAUDECODE=1`); los demás arneses quedan para `--harness`.
- [x] **1.2 Adaptadores** (D11). Crear `scripts/adapt.js` a partir de `scripts/adapt.command.md` y borrar este:
  - punteros de skills solo para Claude Code (antes, comprobar si Claude Code ya lee `.agents/skills/`; si lo hace, no se generan);
  - agentes: 3 roles × 4 arneses;
  - hooks: solo el cableado de `.agents/hooks/index.mjs` por arnés;
  - reglas: ninguna; se retiran `.claude/rules`, `.cursor/rules` y `.github/instructions` de `overlay.js` (`TREES`) y de `.npmignore`;
  - `--check` compara sin escribir; `npm run adapt`; `release.js` lo ejecuta y aborta si hay diferencias.
  *Hecho cuando:* dos ejecuciones seguidas no cambian nada y `release.js` falla si un adaptador está desfasado. **Verificado**, con dos hallazgos: (1) Claude Code sí necesita el puntero — esta misma sesión lo lee desde `.claude/skills/`, no desde `.agents/skills/`; (2) `--check` contra los adaptadores ya commiteados encontró y corrigió una deriva real preexistente (`record-journal`'s pointer le faltaba la línea en blanco que tienen los otros 13).
- [x] **1.3 Semilla e init** (D12, D13; depende de 1.1 para la cabecera del journal).
  - Mover `.agents/seeds/*` a `bin/seeds/` y quitar `.agents/seeds` de `.npmignore`; borrar `CLAUDE.seed.md` y su uso en `seed.js`.
  - Reunir en `bin/seeds/` toda la semilla: AGENTS, gitignore, README, LICENSE, contadores, efforts, PRD y TDR vacíos.
  - `init` escribe la cabecera inicial del journal con la versión de AIDDbot, reutilizando el formato de `append.mjs`, sin duplicarlo.
  - `{Product_Folder}` por defecto (`.product/`) fijado por `init` y registrado en el AGENTS sembrado; `document-system` puede cambiarlo.
  - Decidir si `efforts.yaml` pasa de overlay (se actualiza en cada `update`) a semilla (se crea una vez). Mi propuesta: sigue en el overlay, porque el mapeo de modelos lo mantiene AIDDbot.
  *Hecho cuando:* `aiddbot init` en un directorio vacío deja un repo listo para `/architect-system-foundation`, sin que ningún skill tenga que crear registros. **Verificado** en un directorio externo: primer `init` crea los 8 ficheros de semilla y el evento génesis en un commit; el segundo `init` da `skip-same` en todo, incluido el journal (sin génesis duplicada); `update` no siembra nada; `--dry-run` no escribe nada. **Nota:** `document-system`, `define-spec` e `inspect-quality` conservan su lógica y plantillas duplicadas para crear estos registros — siguen funcionando (se limitan a "preservar" lo que `init` ya creó) pero ya no hacen falta; quitarlas es la fase 3.4, vía `/maintain-skills`. **Hallazgo corregido en el camino:** la primera versión de la génesis invocaba la copia canónica de `append.mjs` (la de este propio checkout) contra un directorio externo; como ese script resuelve su raíz subiendo desde su propia ubicación, escribía en el journal de *este* repo en vez del destino — casi cuela 6 líneas de prueba en `.aiddbot/journals/2026-09-23.log` de AIDDbot (ya limpiadas, el fichero no estaba trackeado). Arreglado invocando la copia recién instalada en el destino, después del overlay.

## Fase 2 · `maintain-skills` (D1, D3)

- [x] **2.1 Rediseñar `maintain-skills`** y su `assets/skill.template.md` según la tesis: objetivo + invariantes, sin procedimiento; lo mecánico, en scripts; una sola fuente de verdad. Quitar el peso muerto ("older models", reglas que ya impone `adapt.js`). Al terminar, `adapt.js` regenera los adaptadores.
  **Hecho:** la plantilla pasa a ser la única especificación (forma, frontmatter, tipos, recursos, composición, journal) y absorbe `references/aiddbot-kinds.md`, que se borra. El `SKILL.md` queda en objetivo + invariantes: nada que el agente deduzca, que una plantilla especifique o que un script imponga; lo mecánico va a `scripts/`; `npm run adapt` valida el frontmatter y regenera adaptadores. La sección "Editing skills" del `AGENTS.md` de este repo, que duplicaba casi todo, queda en una regla: pasar por `/maintain-skills`.
- [x] **2.2 Fuera del overlay** (D3). Excluir `maintain-skills` y su puntero de lo que copian `init` y `update`.
  *Hecho cuando:* un `aiddbot init` no trae `maintain-skills` y editar un skill en este repo es: `/maintain-skills` → `npm run adapt` → commit. **Verificado:** `init` nuevo sin rastro de `maintain-skills`; en un consumidor creado con el código anterior, `update` borra sus tres ficheros (el manifiesto ya retira lo que sale del inventario). El flujo de edición es el que siguió el propio 2.1. El catálogo marca el skill como solo de desarrollo.

## Fase 3 · Primitivas (vía `/maintain-skills`)

- [x] **3.1 `record-journal`** (D10). `SKILL.md` en unas pocas líneas; fuera anchos, alias y cabeceras.
  *Hecho cuando:* el `SKILL.md` no menciona ningún detalle de formato y un agente puede anotar un evento leyendo solo ese fichero. **Verificado:** el skill pasó de 8 líneas de reglas de formato a 4 líneas de invariantes (invocación, cuándo añadir cada flag, no construir la línea, no editar el journal); `grep` de anchos/padding/Info/Warn/Error no encuentra nada.
- [x] **3.2 Unificar las llamadas al journal** en los 14 skills que lo invocan: cada uno dice *qué* evento anota, con la forma corta, nunca *cómo*.
  *Hecho cuando:* `grep` no encuentra en ningún skill flags como `--stage`, `--harness` o `--model`, ni valores de estado distintos de `green|amber|red`. **Verificado** en las 11 primitivas y los 3 orquestadores (excepto `scaffold-system`, que la 3.3 reescribe entera). Cada uno dice ahora solo *qué* evento y, cuando aplica, *qué* estado — nunca la etapa (ya la deduce el script) ni el harness/modelo (ya los detecta).
- [x] **3.3 `scaffold-system`** (D5). Reescribirlo como objetivo + invariantes; copiar e instalar sin ejecutar lint, format ni tests. Quitar `assets/run-system.mjs`, los scripts raíz `start`/`test:e2e` y su generación en `materialize.mjs`. Revisar si `verify-acceptance/scripts/free-port.*` sigue haciendo falta sin `run-system`; si no, borrarlo.
  *Hecho cuando:* ninguna referencia a `run-system` sobrevive en `.agents/` y el materializador sigue funcionando con `--list` y con un arquetipo real. **Verificado:** `--list`, `--dry-run` y un `cli-node` real de principio a fin — el manifiesto ya no lleva `commands`, y el `package.json` raíz queda sin `start`/`test:e2e` inyectados. `free-port.ps1`/`.sh` siguen haciendo falta: los usa `verify-acceptance` para sus propias ejecuciones E2E, sin relación con `run-system`. El `SKILL.md` pasó de 14 pasos numerados a objetivo + invariantes, y ya no ejecuta lint (D5): instala y ya.
- [x] **3.4 Registros solo desde `init`** (D13). Quitar de `document-system`, `define-spec` e `inspect-quality` la creación de contadores, PRD y TDR, sus plantillas duplicadas y `initialize-product-docs.mjs`. Si falta un registro, el skill pide ejecutar `aiddbot init`.
  *Hecho cuando:* ningún skill contiene plantillas de contadores, PRD o TDR, y ninguno crea esos ficheros. **Verificado** por grep en las tres skills y en todos los scripts. **Nota de criterio:** `define-spec/assets/PRD.template.md` e `inspect-quality/assets/TDR.template.md` sobreviven — no son la plantilla del fichero vacío (esa desapareció con `document-system`), son la guía de forma que cada skill usa en marcha: `define-spec` para redactar filas EARS nuevas, `inspect-quality` para reconciliar junto a `debt.contract.md`. `document-system` ya no toca PRD/TDR/counters en absoluto, así que sus tres copias (huérfanas tras `init`) desaparecen sin sustituto.
- [x] **3.5 Repaso del resto de primitivas** con la tesis (`define-spec`, `implement-project`, `verify-acceptance`, `review-implementation`, `ship-spec`, `inspect-quality`, `document-system`, `document-project`): quitar procedimiento que el modelo deduce y reglas duplicadas en el catálogo.
  *Hecho cuando:* cada skill cumple la plantilla nueva y ninguna regla aparece a la vez en un skill y en el catálogo; lo eliminado queda listado en el mensaje de commit. **Hecho**, con un arreglo de paso: las ramas `refactor/S{nnnn}-…` no aparecían en la convención de ramas ni en la deducción de spec de `append.mjs` (la plantilla del spec sí admite `refactor`); ambas lo aceptan ya. Del catálogo salen también el párrafo obsoleto de `scaffold-system`/`run-system` y la frase de que `document-system` crea registros (adelanta parte del 5.1).

## Fase 4 · Orquestadores (vía `/maintain-skills`)

- [x] **4.1 Delegación** (D6, D8, D9) en los tres orquestadores: como mucho una instancia por rol en cada ejecución, retomada con mensajes; se relanza solo si el harness no permite continuarla o se agota su contexto; los orquestadores anidados reutilizan las instancias de quien los llama; la aprobación de la spec pasa por el agente principal. Cada lanzamiento se anota con el evento `spawn`.
  *Hecho cuando:* los tres orquestadores describen la misma política, en pocas líneas y sin contradicciones con D8 y D9. **Hecho:** cada orquestador dice en una frase “delega como describe `## Delegation`” y solo añade lo suyo: sus roles con su esfuerzo y su enrutado. `craft-lasting-quality` lanza ahora al Architect con esfuerzo `high` (antes `low`), porque con D8 ese mismo agente redactará después la spec de reparación.
- [x] **4.2 Bucle de reparación** (D7) en `build-requested-spec`: máximo 3 rondas; lo no resuelto se entrega como deuda técnica; solo la evidencia caducada o ausente bloquea.
  *Hecho cuando:* la regla cabe en un párrafo corto y no se repite en el catálogo. **Hecho:** un párrafo en `build-requested-spec`; las “3 rondas” de D7 se expresan como “tercera revisión” para coincidir con la guarda de entrada de `ship-spec`, que la comprueba por su cuenta porque también se invoca suelta. El catálogo pierde los bullets del estado de la spec y del bucle, y el YAML ya no repite el umbral.
- [x] **4.3 Sección "Delegation" del `AGENTS.md`** de este repo y de `AGENTS.template.md`: alinearla con D8 y con el evento `spawn`.
  *Hecho cuando:* ambos textos coinciden y ninguno contradice a los orquestadores. **Hecho:** la sección pasa a ser la **única** definición de la política (D6, D8, D9): esfuerzo desde `efforts.yaml`, una instancia por rol retomada con mensajes, `spawn`/`reuse` en el journal, los subagentes nunca preguntan al humano, y cada uno detiene solo lo suyo. Idéntica en `AGENTS.md` de este repo, `AGENTS.template.md` y `bin/seeds/AGENTS.seed.md` (tercera copia que el plan no nombraba). **Después, D16:** la semilla desaparece — `init` siembra la plantilla — y `adapt.js` sincroniza la sección en el `AGENTS.md` de este repo, así que queda una sola fuente. **Después, D17 + D18:** el esfuerzo pasa a ser fijo por rol y `adapt.js` lo escribe como modelo en el agente de cada arnés; la sección `## Delegation` desaparece y sus reglas restantes (una instancia por rol, agentes del llamante, subagentes sin hablar con el humano, parar lo propio) viven en los tres orquestadores. `efforts.yaml` ya no llega a los consumidores. **D19:** sin plantillas de PRD ni TDR; la línea del PRD la describe `define-spec`, la del TDR `debt.contract.md`, y las semillas de una línea viven en `seed.js`.

## Fase 5 · Documentación

- [x] **5.1 Catálogo, sincronización mínima.** Quitar lo que ya dicen los scripts o los skills (formato del journal, revisión 3, `run-system`, seeds); su rediseño completo sigue aplazado (P11).
  *Hecho cuando:* el catálogo no describe nada que haya dejado de existir y enruta los skills tal como están. **Hecho:** el párrafo del formato del journal (anchos, `Info/Warn/Error`, relleno) desaparece — ahora solo vive en `append.mjs` — y queda una frase que explica por qué hay un solo journal y apunta al script como fuente del formato. Comprobado por grep: no quedan `efforts.yaml` de consumidor, evento `reuse`, plantillas de PRD/TDR, `run-system` ni `revision 3`; ya habían salido en la 3.5 y la 4.
- [ ] **5.2 `README.md` y `docs/`**: solo lo que cambia para un humano (init prepara todo, el scaffold no ejecuta nada, adaptadores por release).
  *Hecho cuando:* los pasos de `docs/getting-started.md` funcionan tal cual en un directorio vacío.

## Fase 6 · Nombres (D4; bloqueada hasta tus propuestas en `fontier.md`)

- [ ] **6.1 Renombrado en una sola pasada**: carpetas, `name:` en el frontmatter, referencias cruzadas, tabla de etapas de `append.mjs`, catálogo y docs. `adapt.js` regenera los adaptadores, así que el coste es solo el de las fuentes.
  *Hecho cuando:* `grep` no encuentra ningún nombre antiguo fuera de `.product/done/` y `CHANGELOG.md`, y `adapt --check` no da diferencias.

## Fase 7 · Validación y release

- [ ] **7.1 Prueba real** en un repo temporal: `aiddbot init` → `/architect-system-foundation` → una spec pequeña con `/build-requested-spec`. Revisar el journal: cabecera inicial, un `spawn` por rol, revisiones y cierre.
  *Hecho cuando:* la spec llega a `shipped` sin intervención salvo la aprobación, y el journal cuenta la historia completa sin huecos. Lo que falle se anota como 🟡 antes de la release.
- [ ] **7.2 Release `0.1.0`** (D15) con `release.js` (incluye `adapt --check`) y merge de `refactor/frontier-fall` en `main` (D14).
  *Hecho cuando:* `npx github:AIDDbot/AIDDbot --version` informa `0.1.0` y un `init` desde el paquete publicado reproduce la prueba 7.1.

## Fuera de alcance (aplazadas)
P6 hooks del journal · P9 `efforts.yaml` · P11 rediseño del catálogo · P16 subcomando `show`.
