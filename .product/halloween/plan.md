# Halloween — el arquetipo también para nosotros

> Sprint tras Columbus (v0.3.x). Versión **0.4.x**, codename **Halloween**. Objetivo: **31 de octubre de 2026** (o antes).
> Borrador a partir de `ideas.md`. Las dudas van como 🟡 `P{n}` con `> **R:**` para responder en el fichero; las decisiones están en `decisions.md` (D1–D9).

## Contexto (datos a 2026-10-13, v0.3.11)

1. **El core creció sin red de diseño.** La reescritura lean (v0.1.21, E-D1) fijó un tope de 600 líneas y 8 comandos. Hoy `.agents/aidd/` tiene **964 líneas y 9 comandos**; `commands/work.mjs` solo tiene 436 (`commit`, `config`, `debt`, `log`, `run`). Desde v0.3.0 entraron 187 líneas, cada una por un fallo de una prueba real (D57, D61, K3…), sin revisar el conjunto.
2. **La construcción de arquetipos domina las skills.** `architect-system-foundation` tiene **2131 de 3149 líneas** (68 %) de `.agents/skills/`: specs de fundación, tema CSS, configuraciones de oxlint, ecosistemas y plantillas. Casi todo sirve para fabricar un arquetipo bajo demanda, no para fundar un sistema con una biblioteca (con biblioteca, la fundación no se entrega: D56, D68).
3. **Las versiones van encadenadas.** AIDDbot, Archetype Base y Archetype CLI comparten versión (D55, D58). De las 12 publicaciones 0.3.x, casi todas llevan un commit `pin Archetype Base`: un cambio de arquetipo obliga a publicar AIDDbot, y al revés.
4. **Archetype CLI es mínimo.** `AIDDbot/archetype-cli` (D67, D68) trae `configuration`, `monitoring` y `health`, pero le falta la funcionalidad fundacional de cualquier CLI: **versión, ayuda y configuración** desde la línea de comandos.
5. **Un arquetipo ya trae lo que al core le falta:** herramientas de calidad (lint con fronteras, unit, quality sin avisos) y control funcional (specs de fundación, suite de aceptación con etiquetas `@S….-Rnn`, cero deuda).

## Problema

- **Pr1. Pérdida de control sobre el core.** El core es la pieza que guarda el estado y hace cumplir las reglas, pero él mismo no sigue el proceso que impone: sin specs, sin capas ni fronteras, sin deuda registrada.
- **Pr2. Demasiado peso de arquetipos en AIDDbot.** AIDDbot debería fundar sistemas y entregar specs; hoy además contiene el Archetype Builder disperso dentro de una skill.
- **Pr3. Archetype CLI incompleto.** Sin versión, ayuda ni configuración, un CLI nacido de él no está listo para usuarios, y no sirve como base para nuestras propias herramientas.

## Idea central

**Comer nuestra propia comida:** construir el core (y quizá el Archetype Builder) como proyectos `cli` nacidos de Archetype CLI. Así heredan su calidad y su control funcional, y el core vuelve a tener un contrato (specs) y un límite verificable.

Para eso, primero Archetype CLI tiene que ser un buen CLI (Pr3). El orden natural es: **completar Archetype CLI → rehacer el core sobre él → sacar el Builder de AIDDbot**.

## Opciones de estructura

| Opción | Core | Archetype Builder | Ventajas | Inconvenientes |
| --- | --- | --- | --- | --- |
| **A. Statu quo** | `.agents/aidd/` en AIDDbot | dentro de `architect-system-foundation` | nada que mover | no resuelve Pr1 ni Pr2 |
| **B. Mismo repo, forma de arquetipo** | proyecto `cli` dentro de AIDDbot, con su `AGENTS.md`, `foundation/` y `e2e/` | carpeta o skill propia en AIDDbot | un solo repo y una versión; el instalador sigue copiando | AIDDbot pasa a ser un sistema con proyectos; mezcla entregables y código |
| **C. Repos propios** | `AIDDbot/aidd-core` desde Archetype CLI | `AIDDbot/archetype-builder` | cada pieza con su proceso y su calidad; AIDDbot queda en skills + Blueprint + catálogo | más repos, más pins y publicaciones encadenadas (contexto 3) |
| **D. Mixta** | B (sigue en AIDDbot) | C (repo propio) | el core viaja con las skills que lo usan; el Builder, que es lo que más pesa, sale | dos modelos distintos que mantener |

## Restricciones a respetar

- **Ejecución en el consumidor:** hoy el core es `.mjs` sin dependencias, Node ≥ 18, copiado por el instalador a `.agents/aidd/`. Archetype CLI es TypeScript 7 y `node:sqlite` (Node ≥ 22.5). Un core en TS necesita un paso de build y un artefacto publicado, y no puede añadir requisitos al consumidor (npm-only core).
- **Sin legacy:** beta greenfield; no hay migración para repos consumidores.
- **Skills solo por `/maintain-skills`**, y `npm run adapt` tras cada cambio.
- **Modelos juzgan, scripts guardan estado** (D1 de Oktoberfest): rehacer el core no cambia su contrato hacia las skills, salvo decisión explícita.

## Fases

Cada fase va en una rama corta y termina con un patch publicado, como en Columbus. Cada cambio de skill pasa por `/maintain-skills`.

### Fase 0 · Decisiones ✅

Dudas P1–P8 cerradas; decisiones D1–D8 en `decisions.md`.

### Fase 1 · Versiones independientes (D6) — AIDDbot

Primero, porque las fases siguientes publican patches en varios repos.

- `scripts/release.js`: compara solo `major.minor` entre AIDDbot y cada pin del catálogo. Hoy exige la versión exacta (D58).
- `AGENTS.md` raíz, sección «Releasing»: el orden de publicación y la regla de `major.minor` de D6.
- `archetypes.md`, `docs/getting-started.md`: el texto «Each library has the version of AIDDbot» pasa a «the same major.minor».

**Hecho cuando:** AIDDbot publica un patch sin publicar antes Base ni CLI.

### Fase 2 · El Archetype Builder sale de AIDDbot (D4, D5) — AIDDbot + repo nuevo

- **Inventario:** cada fichero de `architect-system-foundation` (y de otras skills, como `define-spec/references/foundation-spec.md`) se clasifica como «lo usa la fundación con biblioteca» o «solo sirve para fabricar un arquetipo».
- **Repo `AIDDbot/archetype-builder`:** recibe tal cual lo que solo sirve para fabricar: specs de fundación genéricas, `ecosystems.md`, tema, configuraciones de oxlint, plantilla `project.AGENTS.template.md`. En esta fase no tiene herramienta: solo los activos y un `README.md`. La herramienta llega cuando el humano la necesite para una biblioteca nueva.
- **`architect-system-foundation`:** ofrece solo bibliotecas. Si ninguna encaja, lo dice y para. Fuera: la fila «Other projects», la sección «Archetypes made on demand» de `system.template.md`, el `select` «on demand» de `propose.md`.
- **Docs:** `docs/` y `AIDD.workflow.md`, por `/maintain-skills`.

**Hecho cuando:** ninguna skill de AIDDbot nombra un arquetipo bajo demanda. Medida: líneas de `architect-system-foundation` antes y después (hoy 2131).

### Fase 3 · Archetype CLI 0.4 (D7, D8) — Builder + `archetype-cli`

- **Specs genéricas en el Builder:** `usage` nueva (ayuda, códigos de salida, `--json`), y `configuration` con el fichero JSON y `config get|set` para el `cli`.
- **Instancias en `archetype-cli`:** `foundation/S0004-usage` y `configuration` actualizada, con su código y sus pruebas de aceptación con etiqueta. Puerta de biblioteca en verde, cero deuda.
- **Release:** `archetype-cli` v0.4.0 Halloween. AIDDbot fija la etiqueta en el catálogo.

**Hecho cuando:** un `cli` recién fundado responde a `--help`, `--version`, `--json` y `config get|set`, con la suite de aceptación en verde.

### Fase 4 · Prueba real y release 0.4.0 Halloween

- Una prueba real (Codex) por biblioteca: Base y CLI, fundación más una spec de negocio.
- `npm run release -- minor`, codename Halloween, etiqueta `v0.4.0`.

### Fase 5 · El core en su propio repo (D1, D2, D3) — repo nuevo, patches 0.4.x

- **Nombre** con iniciales A-B.
- **Fundación:** `aiddbot init` con AIDDbot v0.4.0, desde Archetype CLI v0.4.x.
- **Una spec por comando**, a partir del contrato actual (`aidd.mjs`, 9 comandos, `test/*.test.mjs`). Las pruebas actuales de AIDDbot son la referencia de aceptación.
- **Distribución (D3):** build, artefacto y versión mínima de Node.
- **Corte:** AIDDbot fija la etiqueta del core, el instalador copia el artefacto a `.agents/aidd/`, y salen de AIDDbot `.agents/aidd/`, `test/` y el lint del core.

**Hecho cuando:** las skills funcionan igual con el core nuevo (una prueba real), y AIDDbot ya no tiene código del core.

## Fuera de alcance

- Brownfield y legacy.
- Nuevas bibliotecas o lenguajes fuera de JS/TS.
- G9 (worktrees) y tests inestables, salvo que entren por decisión.

## Dudas

✅ **P1 → D1. ¿Qué es «perder el control»?** ¿Tamaño (964 líneas), comportamiento que nadie recuerda por qué existe, falta de specs, o miedo a romperlo? La respuesta fija la medida de éxito de la fase 2.
> **R:** Perder el control tiene dos partes:
> - No sé **qué** hace el core. Faltan specs.
> - No sé **cómo** lo hace. Faltan reglas.
>
> El tamaño no es el problema. La medida de éxito: cada comando tiene una spec, y el código cumple unas reglas escritas.

✅ **P2 → D4. ¿Qué es exactamente «construcción de arquetipos»?** Propuesta: todo lo de `architect-system-foundation` que solo se usa sin biblioteca (specs de fundación genéricas, tema, oxlint, `ecosystems.md`, plantilla de `AGENTS.md` de proyecto). ¿Algo de eso debe quedarse en AIDDbot?
> **R:** El Archetype Builder es una herramienta. La uso sobre todo yo. Crea una aplicación para una tecnología, con:
> - una funcionalidad mínima, equivalente en todas las tecnologías (las specs de fundación);
> - un tooling adaptado a esa tecnología;
> - unas reglas adaptadas a esa tecnología.

✅ **P3 → D7, D8. Versión, ayuda y configuración en Archetype CLI:** ¿son specs de fundación nuevas del Blueprint para todo `cli` (como `about` en `front-web`), o solo mejoras del arquetipo? ¿«Configuración» es un comando (`config get|set`) o el fichero de configuración ya cubierto por `configuration`?
> **R:** Son specs de fundación. No todos los tipos de proyecto las tienen, pero algunas equivalen a specs que ya existen:
> - **Versión** equivale a `about`.
> - **Ayuda** lista los comandos y sus opciones.
> - **Configuración** no está clara. Puede ser un comando que lee y edita un fichero de configuración (TOML o YAML).
>
> Queda abierto: el alcance de la configuración.
>
> **R (2):** Hechos: `--version` ya existe (`configuration` R08). El core es el primer usuario de Archetype CLI, y ya tiene ayuda y `config get|set` sobre `.aiddbot/config.json`. Decidido:
> - **Versión:** se queda en `configuration` R08.
> - **Ayuda:** spec de fundación nueva `usage`, solo para `cli`. Es el equivalente de `layout` en `front-web`. `--help` y `help` listan los comandos y su uso. Un comando desconocido muestra la ayuda y sale con código 2.
> - **Configuración:** un fichero JSON del proyecto, con `config get [<key>]` y `config set <key> <value>`. JSON porque Node lo lee sin dependencias, y porque el core ya lo usa. Precedencia: argumento, entorno, fichero, valor por defecto. Va en `configuration`, en la parte del `cli`; esa spec deja de excluir el fichero de configuración para el `cli`.

✅ **P4 → D3. ¿Core en TypeScript con build, o sigue en `.mjs`?** Si usa Archetype CLI tal cual, necesita build y Node ≥ 22.5 en el consumidor. ¿Aceptamos ese requisito, o el arquetipo ofrece una salida JS sin dependencias?
> **R:** El core cumple todo lo de Archetype CLI. La distribución es una decisión aparte, para más adelante. Es posible que el core cambie de nombre, a un nombre con las iniciales A-B.

✅ **P5 → D2, D4. ¿Opción A, B, C o D?** Recomendación inicial: **D** — el core en forma de arquetipo dentro de AIDDbot (viaja con las skills, una versión), y el Builder en su propio repo (es el peso que sobra).
> **R:**
> - **Builder:** sale de AIDDbot, a su propio repo. Decidido.
> - **Core:** sin decidir. Me preocupa el efecto del dogfooding: AIDDbot usaría su propio core para construir su propio core.
>
> Queda abierto: dónde vive el core, y cómo evitamos el riesgo del dogfooding.
>
> **R (2):** Me preocupa el lugar físico donde se programa el core. ¿Qué contiene su carpeta? ¿Lleva `.product/`, `AGENTS.md`, `e2e/`…?

**Propuesta para P5: el core en su propio repo, como un sistema más.**

Un sistema que AIDDbot construye tiene esta forma (ejemplo: `codex-13`):

```
.agents/  .aiddbot/  .product/  AGENTS.md  CHANGELOG.md  package.json
cli/  e2e/  foundation/  model/        ← de Archetype CLI
```

Dentro del repo de AIDDbot esa forma choca con lo que ya hay:

- **`.aiddbot/` y `.product/` van en la raíz del repo git.** El core busca su raíz con `git rev-parse --show-toplevel` y exige `.aiddbot/` allí (`lib/core.mjs`). Un subproyecto `core/` no puede tener su propio `.aiddbot/`.
- **`.product/` ya tiene otro uso:** aquí guarda los sprints de AIDDbot, no specs de un sistema.
- **`.agents/` es código fuente aquí:** son las skills que publicamos. En un sistema, `.agents/` es una copia instalada.
- **Dos releases:** `npm run release` publica AIDDbot; `aidd release` publicaría el core. Las dos escriben `CHANGELOG.md` y `package.json`.

En un repo propio (por ejemplo `AIDDbot/aidd-core`, nombre A-B pendiente) todo encaja:

- Es un sistema normal: `aiddbot init`, fundación desde Archetype CLI, specs por comando, `AGENTS.md` con las reglas. Responde a P1.
- **Dogfooding seguro:** el repo instala la **última versión publicada** de AIDDbot, con su core. El core publicado construye el core siguiente. El código en desarrollo nunca gestiona su propio desarrollo.
- **AIDDbot consume el core publicado:** fija una versión, como hace con las bibliotecas, y el instalador copia el artefacto a `.agents/aidd/`. El paso de build y la distribución (P4) se resuelven en el repo del core.
- **Coste:** un repo más y un pin más. Con P6 (patches independientes) el coste es bajo.

> **R (3):** El core va a su propio repo, como un sistema más.

✅ **P6 → D6. ¿Seguimos con una sola versión para todos los repos (D58)?** Con más repos, cada patch encadena publicaciones. Alternativa: versión compartida solo en `major.minor` y patches independientes (como en D55).
> **R:** Todos los repos comparten `major.minor`. Cada repo publica sus patches de forma independiente.

✅ **P7 → D5. ¿Quién usa el Archetype Builder?** ¿Solo tú (para crear bibliotecas), o también AIDDbot cuando ninguna biblioteca encaja (arquetipo bajo demanda)? Si es lo segundo, ¿cómo lo invoca AIDDbot desde otro repo?
> **R:** Mientras el Builder no esté pulido, solo lo uso yo. Igualmente diseñamos cómo lo invocaría AIDDbot.
>
> **R (2):** AIDDbot ofrece solo lo que está hecho: las bibliotecas (Archetype Base y Archetype CLI). Si ninguna biblioteca encaja, AIDDbot no crea un arquetipo bajo demanda. Así todo queda bajo control. Cuando el Archetype Builder funcione, ampliamos la biblioteca.
>
> **Efecto:** `architect-system-foundation` pierde el camino del arquetipo bajo demanda (la fila «Other projects» del catálogo, `ecosystems.md`, las specs de fundación genéricas, el tema, las configuraciones de oxlint). Esto resuelve la mayor parte de Pr2.

✅ **P8 → D7. ¿Salida para máquinas en Archetype CLI?** El core escribe JSON en la salida estándar, y sus códigos de salida tienen significado: 0 correcto, 1 rechazado por una regla, 2 uso incorrecto, 3 sin configurar. Las skills dependen de eso. ¿Lo hace la fundación de todo `cli` (por ejemplo, con `--json` y esos códigos), o es una feature propia del core?
> **R:** Va en la fundación de todo `cli`, en la spec `usage`:
> - **Códigos de salida:** 0 correcto, 1 rechazado por una regla, 2 uso incorrecto, 3 sin configurar o no disponible.
> - **Salida para máquinas:** con `--json`, cada comando escribe un solo objeto JSON en la salida estándar, también cuando falla. Un proyecto puede hacer del JSON su salida por defecto; el core lo hace, porque sus usuarios son agentes.

✅ **P9 → D9. ¿El core entra en 0.4.0 o en un patch 0.4.x?** El repo del core nace con un AIDDbot publicado (D2), y su fundación necesita Archetype CLI con `usage` (fase 3). Recomendación: publicar 0.4.0 Halloween con las fases 1–4, y hacer el core (fase 5) después, en patches 0.4.x. El contrato hacia las skills no cambia (D2), así que es un patch. Alternativa: retrasar 0.4.0 hasta tener el core, con el riesgo de no llegar al 31 de octubre.
> **R:** Se publica 0.4.0 Halloween con las fases 1–4. El core (fase 5) llega después, en patches 0.4.x.
