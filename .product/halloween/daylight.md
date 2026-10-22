# Daylight · arquetipo = semilla + specs

Vía nueva dentro de Halloween (abierta 2026-10-21). El nombre viene del cambio de hora (25 de octubre). «Semilla» es un nombre de trabajo; en D41 se llamó **Prefab**.

## Contexto

- Cada run web (web-A … web-I) rehace lo mismo antes de llegar a lo que ve el usuario: el scaffold, `platform` y `presentation`. En web-H, `about` llega a los 59 min.
- D39 ya lo dijo: el núcleo del arquetipo es un framework. `scaffold`, `platform` y `presentation` son `chore`, con código y unitarios, sin e2e.
- D41 dejó abierto el Prefab: código limpio de partida que cumple el Blueprint. Lo que falla en cada run (los 375 px) se arregla una vez en él, no en cada sistema.
- La idea de hoy: **arquetipo = semilla + specs**. La semilla es lo común. Las specs hacen el resto.

## La pregunta

¿Qué puede tener la semilla que sea común a todas las implementaciones de un arquetipo que siguen las specs?

## Criterio propuesto

Una pieza entra en la semilla solo si cumple las cuatro condiciones:

1. **Es igual en todas las implementaciones.** No depende del juicio del agente.
2. **No es un comportamiento que vea el usuario.** Lo que ve el usuario es una spec `feat`, con su test de aceptación.
3. **Se comprueba sola, sin una run.** Pasa `fmt`, `lint`, `layers`, `crap` y `test` por sí misma (D41: el Blueprint no entrega código sucio).
4. **Tiene evidencia.** Salió igual, o falló igual, en varias runs. Se fija lo que salió, sin inventar (como D41).

## Inventario candidato, por capas

Tres capas, de lo más común a lo más concreto. Igual que los tres niveles de `project-types.md` (genérico → por tipo → por tecnología).

### A · Común a todo arquetipo, de cualquier tecnología

| Pieza | Hoy la hace | Evidencia |
| --- | --- | --- |
| `.product/`: `system.md`, `PRD.md`, `model/`, specs fundacionales numeradas | `seed-product.mjs` del Builder, al sembrar | Ya es determinista |
| Raíz del repositorio: `.gitattributes` (LF), `.gitignore` con secretos y `logs/`, `LICENSE`, `README.md`, `AGENTS.md` raíz (intro + reglas de código), `CLAUDE.md` | `scaffold` | cli-C perdió el `.gitignore` raíz; R21 y LF |
| Registro de proyectos: tipo y slots en `.aiddbot/config.json` | `scaffold`, paso 3 | Lista cerrada de slots (D18, D37) |
| Contratos escritos: variables de entorno con default y check, línea de log, códigos de salida 0/1/2/3, `{ error }`, `X-Request-Id`, `GET /api`, `GET /api/about`, `/runtime-config.json` | Texto de `platform` y `shell`, rehecho en código en cada run | Mismo texto en todas las runs |

### B · Común a un tipo de arquetipo (web, cli), de cualquier tecnología

| Pieza | Hoy la hace | Evidencia |
| --- | --- | --- |
| Tema CSS (`colors`, `theme`, `custom`) con las reglas de 375 px | Copia de `blueprint/theme/` + arreglos en cada run | Columbus (menú, tablas), web-H (`about` arregla tablas) |
| `e2e`: ajustes, arranque de la suite, preflight, helpers de arranque y de error, `uniqueValue`, `tree-kill` | `platform` del `e2e` | web-B, web-D (EBUSY), web-F |
| `.env.example` de cada proyecto | `platform` | Lista fija de variables |

El `e2e` habla con el sistema por HTTP, navegador o proceso: no ve Express ni React. Por eso vale para cualquier tecnología del mismo tipo.

### C · Común a las implementaciones de una tecnología (JS / TS en Node, Vite+)

| Pieza | Hoy la hace | Evidencia |
| --- | --- | --- |
| Workspace raíz: `vite.config.ts`, hook pre-commit, `check`/`fix`/`upgrade`, `.lint/` | `scaffold` | Cada run lo reconstruye igual |
| Forma de cada proyecto: `main` solo, `core/` y `shared/` con sus listas cerradas, manifiesto vacío, `imports` `#core` `#shared`, `AGENTS.md` de proyecto | `scaffold`, paso 2 | D40, D41 |
| Primitivas semilla: `shared/errors`, `shared/identity`, `shared/values/` con sus unitarios | `scaffold` | cli-6, web-C (identidad como argumento) |
| El framework: settings, logger, middleware, migraciones, ciclo de vida, cliente HTTP, parser y salidas del `cli`, los cinco primitivos de `presentation` | `platform` y `presentation` | D39; web-G (84 % del e2e era infraestructura) |

### Fuera de la semilla

- Las features: `shell`, `about`, `users`, `settings`. Son `feat`: las entrega el Builder, cada una con su test de aceptación.
- Toda decisión de producto del sistema del usuario.
- Deuda: la semilla sale con cero deuda o no sale.

## Dónde cortar

> Superado por D42: una semilla por tipo de arquetipo, con todo el tooling y sin framework. Queda como historia.

| Corte | La semilla tiene | Las specs hacen | Ahorra en cada run |
| --- | --- | --- | --- |
| 1 | A | todo el código | casi nada |
| 2 | A + B | `scaffold`, `platform` y `presentation` de cada tecnología, y las features | el tema, el `e2e` base |
| 3 | A + B + C | solo las features | `scaffold`, `platform` y `presentation` (~45 min en web-H) |

**Recomendación: corte 3, con una regla uniforme: `chore` → semilla; `feat` → spec.** Es la línea que ya trazó D39 (sin e2e ↔ con e2e), y se comprueba sola. Las capas A y B se comparten entre tecnologías; la C es una por tecnología. Un arquetipo nuevo en otra tecnología (Hono + Vue, NestJS + Angular) reutiliza A y B y solo hace su C.

La tensión: la regla de 2026-10-13 (cli-1) pide que el código de un arquetipo salga de specs, no «por arte de magia». Con el corte 3, el código de la semilla sigue saliendo de specs (las tres `chore`), pero se construye una vez, se endurece y se congela. No se reconstruye en cada run.

## Preguntas

**P26.** ¿«Distintas implementaciones de un arquetipo» son varias runs con la misma tecnología (web-A … web-I), o varias tecnologías del mismo arquetipo (Express + React frente a Hono + Vue)? Mi propuesta sirve para las dos, por capas.
> **R:** Una semilla por tipo de arquetipo: primero `cli` y `web`. ✅ → D42

**P27.** ¿La línea es `chore` → semilla, `feat` → spec (corte 3)?
> **R:** No. Corte nuevo: la semilla tiene todo el tooling (Vite+, Vitest, Playwright en `web`, `.lint/`), sin framework. ✅ → D42

**P28.** ¿Cómo se fabrica la semilla? (a) A mano. (b) Una run que entrega solo las tres `chore`, y después se endurece y se congela. (c) Se extrae de la mejor run (web-I, si sale limpia). Recomiendo (b): el código sigue saliendo de specs, y la run es corta y repetible.
> **R:** Se extrae de lo que ya hay en los arquetipos actuales, con un comando `upgrade` para tenerla al día. ✅ → D43

**P29.** El `e2e` de la semilla, ¿solo infraestructura (helpers, arranque, preflight), o también los tests de aceptación de las features fundacionales, escritos de antemano? Con los tests dentro, implementar una feature es «hacer pasar una suite fija»: muy controlable, pero los tests ya no salen de su spec. Recomiendo solo infraestructura por ahora.
> **R:** Solo el tooling del `e2e`: Vitest en `cli`, Playwright en `web`. ✅ → D42

**P30.** ¿Dónde vive la semilla? (a) En el Builder, una carpeta por capa (`seed/common/`, `seed/{tipo}/`, `seed/{tecnología}/`). (b) Un repositorio por tecnología. Recomiendo (a) mientras solo hay una tecnología.
> **R:** En el Builder. ✅ → D43

**P31.** El nombre. Candidatos con la metáfora de construcción (Blueprint, Builder): **Prefab** (D41), **Frame** (la estructura del edificio; encaja con «el núcleo es un framework», D39), **Kit**. Ocupados: Foundation, Scaffold, Core, Shell. No bloquea: sigo con «semilla» hasta que decidas.
> **R:** Bedrock, por ahora. ✅ → D44

## Siguiente paso

Con P26–P29 respondidas: las paso a `decisions.md` como D42 y escribo el inventario cerrado de la semilla. Después decidimos si la primera prueba es una run `daylight-1` que entrega solo las tres `chore`.

## Runs

Carpeta nueva: `C:/code/aidd/experiments/daylight/`. La numeración empieza en 1 (`cli-1`, `web-1`). Las lanza el usuario. Grok 4.7 no cuenta como modelo frontera (web-I es su única prueba, a la espera de 4.8): las runs de Daylight van con un modelo frontera, y su referencia es web-H, no web-I.

Preparadas 2026-10-21, las dos igual, con `construction.md` del Builder:

- AIDDbot `refactor/quality-gates` `4a540136` (`node bin/aiddbot.js init` local, todos los harnesses), Builder `8b1d8e3`. `core.autocrlf false`, ningún CRLF.
- Commit 1: el overlay de AIDDbot. Commit 2: el Bedrock en la raíz, `foundation/` en `.product/foundation/`, `blueprint/` en `.product/blueprint/` y el manifiesto en `.product/system.md`. `npm install` antes del commit 2: el hook pasó en él.
- `cli-1`: commits `cb54394 86c35d6`. Prompt: [`daylight/cli-1.md`](./daylight/cli-1.md) (6 specs, sin users).
- `web-1`: commits `b874dd2 22690e9`. Prompt: [`daylight/web-1.md`](./daylight/web-1.md) (7 specs, con users).

Qué mirar:

- Que `scaffold` parta del Bedrock: sin generador, sin reescribir `.lint/`, el tema, la identidad ni el `.gitignore`; solo el framework con los comandos de `ecosystems.md`.
- El tiempo hasta `about`, frente a web-H (59 min) y web-I.
- Que el `check` de la raíz siga con `--passWithNoTests`, y que `upgrade` no rompa la pila.
- En `web-1`: que se instale Chromium (`npm exec -w e2e -- playwright install chromium`).

## Lo que entra de web-I

web-I sigue hasta el final (decisión del usuario, 2026-10-21). Cada hallazgo suyo que cambie la Foundation o el Blueprint entra en las runs de Daylight mientras no se lancen:

1. Arreglo en el Builder, con commit y push.
2. En cada run: copiar otra vez `foundation/` y `blueprint/` a `.product/`, y un commit `chore: the Foundation and the Blueprint of Builder {hash}`.
3. Una línea en esta tabla.

| Hallazgo de web-I | Dónde | Builder | En las runs |
| --- | --- | --- | --- |
| S0003: el log no cambia de fichero a medianoche (la ruta se calcula al arrancar) | `platform`, todos | `0bd6bf2` | cli-1 `3aa7e0a`, web-1 `a164064` |
| S0003: el `front` no lee `.env` (Vite lo carga después de su configuración) | `platform`, `web` | `0bd6bf2` | cli-1 `3aa7e0a`, web-1 `a164064` |
| S0003: el `e2e` pasó una carpeta como `DATABASE_URL` («una carpeta temporal por cada ajuste que es una ruta») | `platform`, `e2e` | `7fabddd` | cli-1 `5784e5a`, web-1 `304b052` |
| S0003/S0004: el middleware de Vite que sirve `/runtime-config.json` (3 parámetros) cae en un adaptador de `lifecycle/` y rompe `max-params`; solo `core/http/*.middleware.ts` admite los de Express | `platform` `web`, `ecosystems.md` | `397c2b5` | cli-1 `7e32bcd`, web-1 `530f971` |
| S0003: `/* eslint-disable */` en el `vite.config.ts` del `front` | lo puso el usuario: el editor marcaba `Excessive stack depth…` y `Plugin<any>[]` no asignable a `PluginOption`. Causa: dos Vite (el de Vite+ y el `vite` que instalan `@vitejs/plugin-react` y `vitest`); `vp check` pasa, el TypeScript del editor no. Arreglo: `overrides` de `vite` al core de Vite+ en la raíz del Bedrock, con instalación limpia (el lockfile viejo conserva la copia). Probado en una copia de web-I: 2 errores → 0 | Bedrock, `ecosystems.md` | `08be22c` | cli-1 `03f4c45`, web-1 `dd202ba` |
| (idea del usuario) las primitivas de `shared` en el Bedrock, con sus unitarios; el scaffold ya no las escribe | Bedrock, `scaffold`, plantilla del `AGENTS.md` | `60f3a1e` (D47) | cli-1 `9842e1a`, web-1 `714eb38` |
| D0005: falsa deuda medium por un import de varias líneas (los nombres importados contaban como lógica duplicada); D0006, sí duplicación real | core de AIDDbot (`work.mjs`), con test (49/49) | AIDDbot `7a90261f` | overlay: cli-1 `388896c`, web-1 `28265d8` |
| S0006: `crap` en rojo entró en `master` (`types/named` en un middleware): el Builder dijo verde y nadie lo comprobó. «Confía, pero comprueba»: el orquestador corre `layers` y `crap` de cada proyecto cambiado; rojo vuelve al Builder, 2 vueltas como mucho | `build-requested-spec`, `AIDD.workflow.md`; quitado después en D50 (repetía los unitarios; lo caza el `crap` de después del ship) | AIDDbot `95a954c2`, retirado en `9f4576e1` | overlay: cli-1 `d9e05a7`, web-1 `04d61b9` |
| S0008: el `e2e` escribe `isRecord` cinco veces (lee JSON sin tipo); D47 lo había dejado sin primitivas | Bedrock (`e2e/shared/values/values.check.ts`, sin test), `project-types.md`, `scaffold`, plantilla | `725cec1` | cli-1 `ac2708a`, web-1 `94a93cb` |
| S0008: los page objects buscan por clase CSS y ruta de etiquetas (`.shell-header span`, `main p`); el Blueprint no decía cómo | `ecosystems.md` (por rol, etiqueta o texto) | `2e2f22f` | cli-1 `ecee3b1`, web-1 `41176b3` |
| S0008: el contraste se calcula dentro de `page.evaluate`, que no ve los helpers de la suite (`colorOf is not defined`) | ninguno: quitado en `a40c7ef`, es tutela para un modelo débil | `dbca2eb` | cli-1 `4f83e3a`, web-1 `790749a` |
| S0008: la página sin estilo: cada hoja se importaba como valor (`import theme from "…css"`); la «reparación» fue un plugin que añade `export default` al CSS. Bloqueos del Bedrock: `import/no-unassigned-import` y TS2882 sin tipos de CSS | Bedrock (`vite.config.ts` permite `**/*.css`; `front` con `vite-plus/client`), `ecosystems.md` (una línea: imports de efecto por ruta de fichero; el texto largo, quitado en `a40c7ef`) | `800bedf`, `b27ab5d` | cli-1 `277230e`, web-1 `a2afeaf` |
| S0004–S0006: tres `fix` de una sola review, cada uno con su aprobación y su vuelta | D48: core `spec.mjs` (fix aprobado al crearse, agrupado por proyecto), `craft-lasting-quality`, `build-requested-spec`, `ship-spec` (`--project`) | AIDDbot `34821c80` | overlay: cli-1 `fa4993f`, web-1 `3025053` |
| S0010: el `e2e` copia en dos tests el helper que retiene `/api/about` para ver el estado de carga; `presentation` decía «n/a» para los estados del `e2e` | `presentation` (`holdRoute`, `failRoute`) | `ec225ec` | cli-1 `0a896dd`, web-1 `d4eea66` |
| S0010: el ship repite todos los unitarios que `crap` acaba de pasar | D49: core `eval.mjs`, `ship-spec`, `build-requested-spec` (el ship solo corre la aceptación) | AIDDbot `36bb2845` | overlay: cli-1 `ce10d7c`, web-1 `92b5676` |
| S0011: escaneo low con `crap` ya en verde (un agente para nada), y después el check otra vez | D51: `craft-lasting-quality` (solo se escanea un check en rojo) | AIDDbot `51d73b59` | overlay: cli-1 `1b86fde`, web-1 `b3ba6d3` |
| El Architect tarda 3–6 min por spec en adaptar una plantilla genérica (~30 min por run) | D52: `foundation/{cli,web}/` en el Builder, `aidd spec new --from`, `build-archetype-foundation` sin Architect | AIDDbot `717e84e9`, Builder `d773330` | cli-1 `1801d1e`, web-1 `bf90311` (`.product/foundation/` = la instancia del arquetipo) |
| S0012: el hash de las contraseñas usa el coste por defecto de `scrypt` en Node (N=16384), por debajo de OWASP; `ecosystems.md` no daba parámetros | `ecosystems.md` (N 2^17, r 8, p 1, sal de 16 bytes, `maxmem` 256 MiB; ~300 ms por hash) | `4b65505` | cli-1 `6c6d313`, web-1 `a62d85c` |
| S0012: el fake de la respuesta HTTP de los unitarios de rutas, copiado en dos tests del `back` | `web/shell` (el fake de petición y respuesta en `shared/http/`) | `719429c` | web-1 `aef5bf7` |
| Ship de S0012: 4 tests de `about` rompen porque buscaban «el» artículo (`getByRole('article')`) y `users` añade otra tarjeta | `ecosystems.md` (una tarjeta se busca por su nombre) | `704de00` | cli-1 `2d024e1`, web-1 `116ed4e` |
| S0017: los unitarios de los repositorios llevan un fake que imita SQL (lee `query.sql` y los parámetros por posición), copiado en dos tests | Bedrock `web` (`shared/database/`: el contrato `Database` y `openMemoryDatabase()` con su test), `platform`, `scaffold`, `ecosystems.md`, plantilla | `96f40e3` | web-1 `80a6ed4` |
| La review lee «the full diff»: también la spec, `.aiddbot/` y `package-lock.json` (generado, de cientos o miles de líneas) | `review-implementation`: solo el diff del código de los proyectos, nunca un lock ni un registro; los `package.json` se quedan | AIDDbot `07390ade` | overlay: cli-1 `82d5621`, web-1 `8f1c88c` |
| S0002 (D0001): `@types/node` en el `e2e` | el Bedrock web ya no lo lleva | `9d99175` | desde el principio |

Criterio (usuario, 2026-10-21): no meter en las skills ni en el Blueprint directrices escritas para los fallos de un modelo que no es frontera. Entra lo que fallaría con cualquier modelo: una ambigüedad de la spec, un hueco de estructura, un bug nuestro, o una comprobación determinista. Lo demás se queda fuera.

## Lo que entra de web-1

web-1 se lanzó con Codex a las 18:40. Mismo proceso: arreglo en el Builder y copia en cli-1 mientras no se lance.

| Hallazgo de web-1 | Dónde | Builder | En las runs |
| --- | --- | --- | --- |
| S0001: el `crap` deja `coverage/` en cada proyecto y entra en un commit (luego, tres commits para sacarlo). `ecosystems.md` ya decía que la raíz lleva `.vite/` y `coverage/`; el Bedrock no lo cumplía | Bedrock `web` y `cli` (`.gitignore` de la raíz) | `9441205` | cli-1 `bbff9c5` |
| S0002: D0001 high, una escritura fallida del log tumba el `back` (cadena de promesas sin rechazo). La spec decía «nunca bloquea», pero no qué pasa si falla una escritura. S0003 lo reparó en 2 min: la línea a la salida de error, y la cola sigue | `platform`, `cli` y `web` | `215cdfb` | cli-1 `e550a69` |
| S0005: `shared/values` sale del Bedrock con 16 entradas, el límite de `layers`; la primera primitiva de valores nueva lo rompe (18). Decisión del usuario: partir por tipo. `values.check` en la raíz y una carpeta por tipo (`text/`, `numbers/`, `booleans/`, `dates/`, `lists/`); `Email` irá a `values/email/` | Bedrock `cli` y `web`, plantilla del `AGENTS.md`, `project-types.md`, `scaffold`, `presentation`, `users` | `798a091` | cli-1 `5cf4dfa` |
| S0006: R04 falla en la verificación (`route is already handled`): el `release` de `holdRoute` (escrito en S0005, sin unitarios en el `e2e`) quitaba la interceptación antes de que acabara la petición retenida. La spec no decía qué hace el `release` | `presentation` `web` | `ff4fab4` | no aplica a cli-1 |
| S0007: el `front` crea `core/session/` para el adaptador del token en `localStorage`; no estaba en la lista cerrada de `core` del `web`, y no lo escribe en su `AGENTS.md`. La spec decía «en el almacenamiento del navegador», sin carpeta | `project-types.md`, `users` `web` | `fb24e65` | cli-1 `a7adf48` (Blueprint) |
| S0001: con npm 12, `@vitejs/plugin-react` del `front` instala su propio `vite@8.3.5`: el override de la raíz solo vale para lo que instala la raíz. Probado en una copia del Bedrock: el override anidado solo no basta; el plugin en la raíz, sí | `ecosystems.md` (fila de React y dependencias de la raíz) | `ca1759c` | cli-1 `bbff9c5` |

Cambios en el core (2026-10-21, hechos; 51/51 tests; AIDDbot `3d60ea4b`, overlay: cli-1 `a849299`; web-1 no, está en marcha). Diseño final: `.aiddbot/logs/{fecha}/` es la historia del día, con `journal.log` y `HHMMSS-{slot}-{proyecto}.log` de cada fallo; el resultado del `run` da la ruta como `failure`. La raíz de `logs/` se queda con el estado actual: el último log de cada slot y el estado de cada spec. Lo que crece cada día va en su carpeta. Propuesta inicial:

1. **La salida de cada `run` que falla.** Hoy `exec` (`work.mjs`) abre `{slot}-{proyecto}.log` con `"w"`: cada pasada borra la anterior, y del fallo solo queda una línea recortada en el diario. En S0002 se perdieron dos fallos del `crap` (18:56:45, 18:56:52).
   - Qué: la salida completa del fallo, tal como queda en el log.
   - Dónde: `.aiddbot/logs/fails/{fecha}-{hora}-{slot}-{proyecto}.log`, una copia por fallo. La línea del diario da su ruta. `{slot}-{proyecto}.log` sigue siendo la última pasada. La carpeta ya está fuera de git.
2. **El tipo del commit, el de la spec.** En S0002 (`chore`) el Builder hizo `feat(back): implement platform services`. Ninguna skill lo dice. Mejor una comprobación que una frase: `aidd commit` ya rechaza dependencias instaladas y texto mal codificado; también rechaza un tipo `feat`, `fix`, `refactor` o `chore` distinto del de la rama de la spec (`chore/S0002-platform`). Los ámbitos del core (`spec`, `release`) y los `docs` quedan fuera.

Para vigilar: en S0001 el `front` renderiza en `document.body` (`<body id="root">`) para no tener la rama `if (container)`. React lo desaconseja. Entra si da un fallo.

## Abierto: datos de ejemplo duplicados en los tests

- En web-I (S0012 `users`), el detector de duplicados del core contó como lógica repetida un usuario de ejemplo escrito en dos tests: seis líneas `clave: "valor",`. Dio D0010 (`back`) y D0011 (`front`), dos refactors.
- Dos opciones: dejar el detector como está (uniforme; un `test-data` por feature), o no contar las líneas que solo asignan un literal a una propiedad (un literal es dato, no lógica).
- Decisión del usuario (2026-10-21): no cambiar nada todavía. Medirlo en web-1, con un modelo frontera: cuántas features pagan un refactor por datos de ejemplo. Con esa evidencia, se decide.
- Evidencia de web-1 (hasta S0008): un solo caso, en S0008 (`settings.routes.test.ts`, una identidad de ejemplo de 6 líneas). El Builder lo arregló en 20 s dentro de la spec (importa la identidad del `package.json`), sin `refactor` ni deuda. Los otros duplicados de web-1 (S0007) eran preparación de tests, no datos. Apoya dejar el detector como está.

## Candidato: tests inestables por leer antes de esperar

- En web-I, `about-card.test.ts` (S0010-R04, «About unavailable») falló en el ship de `users`, pasó tras la reparación y volvió a fallar en el refactor S0013, que solo tocó unitarios del `back`. Es un test inestable. El triage lo registró como D0013 high.
- Causa probable: el test lee el texto (`expect(await locator.innerText()).toBe(…)`) antes de que la página pinte el estado. Una aserción que espera sola (`await expect(locator).toHaveText(…)`) no depende de la velocidad.
- No entra en el Blueprint todavía: un modelo frontera suele usar esas aserciones (criterio del usuario). Si web-1 tiene un test inestable por esto, se añade con esa evidencia.
- Evidencia de web-1 (Codex, modelo frontera): S0007-R06 falló en la aceptación porque el page object de login rellenaba el formulario antes de que su página estuviera a la vista (tras navegar, los campos de la página anterior todavía coinciden). Arreglo: esperar al encabezado. Entra en `ecosystems.md`: un page object espera a su página antes de leer o actuar, con aserciones que esperan. Builder `68ff090`, cli-1 `a0df571`.

## Estado de web-1 (Codex, 2026-10-21)

- Arranque 18:40. Se para a las ~20:18 al acabarse los tokens de Codex, en S0008 `settings`: `back` hecho (2 commits), `front` a medias, sin commit (11 ficheros en el árbol de trabajo, rama `feat/S0008-settings`).
- Enviadas: S0001 `scaffold` 0.0.1 (12 min), S0002 `platform` 0.0.2 (19 min), S0003 `fix` de D0001 0.0.3 (2 min), S0004 `shell` 0.1.0 (10 min), S0005 `presentation` 0.1.1 (10 min), S0006 `about` 0.2.0 (11 min), S0007 `users` 0.3.0 (26 min). Cero deuda tras cada ship; `layers` y `crap` en verde.
- `about` aprobada a los 56 min del arranque (web-H: 59 min; web-I: 178 min) y enviada a 1 h 07 min. Seis de siete fundacionales en 1 h 34 min (web-I: las siete en 5 h 31 min).
- Cerrada (usuario, 2026-10-22): web-1 no se relanza. Sus hallazgos van al Builder, y la siguiente run (web-2 o cli-2) sale del Builder corregido.

## Sensaciones del usuario sobre web-1 (2026-10-22)

Sin decidir. Cada punto es una observación de la run parada en S0008.

### Arranque desde la raíz

1. La app no tiene un comando de arranque en la raíz.
2. Hace falta un `npm start` en la raíz. Este comando arranca el `back` y el `front` en paralelo.
3. Hace falta un comando en la raíz para los tests unitarios.
4. Hace falta otro comando en la raíz para los tests e2e.
5. Duda abierta: ¿estos comandos son parte del Bedrock?

### Validación del registro

6. El registro no valida los datos. Ahora acepta `a`, `a`, `a`.
7. El nombre necesita una longitud mínima.
8. La contraseña necesita una longitud mínima.
9. El email necesita un formato válido.

### Legibilidad del código

Síntoma: `projects/back/src/shared/http/fields.read.ts` y su llamador `features/auth/auth.input.ts`. No es el caso concreto: es una clase de defecto.

10. No hay líneas en blanco. Los imports, los tipos y las funciones van seguidos.
11. El tipo genérico no se usa. `FieldValues<Readers>` existe, pero `readFields` devuelve `Record<string, unknown>`. El llamador valida otra vez (`readEmail(fields.email)`, `String(fields.password)`).
12. Un término tiene dos significados. En `readFields`, `fields` son los errores; en el llamador, `fields` son los valores. `FieldInput` es el tipo de la entrada y también el de la salida.
13. Hay parámetros de salida escondidos. `ReadFieldInput` junta los datos de entrada y dos acumuladores (`values`, `fields`). `readField` los muta y devuelve `void`. Así esquiva `max-params: 2`: la regla se cumple, la intención no.
14. Hay condiciones con nombre que no aportan nada: `const isObject = isRecord(value)`. El alias tiene un nombre peor que la función. Causa probable: `conditions/named` exige nombre también para una llamada a un predicado.
15. El código del borde está duplicado. `inputRecord` (`auth`) y `isObject ? value : {}` (`settings`) hacen lo mismo, porque `readFields` no acepta `unknown`.
16. Los readers no tienen la misma forma. `password` llama a `requireText` y después a `String(value)`; `name` devuelve lo que da `requireText`.

Conclusión: `max-params` y `conditions/named` cambian la forma del código, no siempre su calidad. Cada límite necesita una regla al lado que cierre la forma de esquivarlo.

Criterio del usuario: no hacer plugins de lint nuevos. Usar reglas de oxlint y de los plugins que ya existen.

- Oxlint (1.88) no tiene una regla que limite las propiedades de un objeto literal ni de un objeto de parámetros (`vue/max-props` es solo para Vue). El tamaño y la cohesión de un objeto de parámetros quedan para el revisor.
- Reglas en prueba, en `.lint/complexity.json` de web-1:
  - `eslint/no-param-reassign` con `props: true`: prohíbe mutar un objeto recibido.
  - `unicorn/prefer-object-from-entries`: prefiere `Object.fromEntries` a un bucle que rellena un `{}`.
  - `unicorn/no-immediate-mutation`: prohíbe crear un objeto y mutarlo justo después.
- Resultado en el `back` (4 errores, todos de `no-param-reassign`):
  - `fields.read.ts:27` y `:31`: los acumuladores del punto 13. La regla los encuentra.
  - `core/http/session.middleware.ts:22-23`: `request.session = user` y `request.token = token`. Es la forma habitual de Express, pero también muta un objeto recibido.
  - Las otras dos reglas no dan errores.
  - Propuesta uniforme: la regla sin excepción. La sesión va en un `WeakMap<Request, Session>` en `core/http/`. El middleware hace `sessions.set(request, { user, token })` y quien la necesita llama a `readSession(request)`. El tipo `Request` ya no se amplía.
  - Duda abierta: un override de la regla para `*.middleware.ts`, como el de `max-params`. Rompe la uniformidad.
- Resultado en el `front` (6 errores, todos de `no-param-reassign`):
  - `shared/components/form/record.form.ts` (5) y `features/auth/auth.service.ts` (1). Es el mismo patrón: el store crea un objeto `context` con estado mutable y lo pasa a funciones del módulo, que lo mutan (`context.state.busy = false`, `context.state = state`). Es la bolsa del punto 13, en forma de store.
  - La regla no ve `Object.assign(context.state, { … })` (`record.form.ts:82`), que también muta. `eslint/prefer-object-spread` solo mira un `Object.assign` con un literal como primer argumento.
  - Las otras dos reglas no dan errores.
  - Confirma el candidato de web-I: los stores del `front` repiten `snapshot`, `subscribe` y los `listeners`.
  - Propuesta uniforme: una primitiva de store en el Bedrock, `createStore(initial)` → `{ read, set, subscribe }`. El estado vive en una variable local de la primitiva: es la única mutación, y no es un parámetro. Las features calculan el estado nuevo sin mutar: `store.set((s) => ({ ...s, busy: false }))`.
- Total: 10 errores en web-1, todos de `no-param-reassign`. `prefer-object-from-entries` y `no-immediate-mutation` no dan ninguno.
- Candidatas a regla escrita (para el revisor):
  - Un nombre tiene un solo significado en un módulo.
  - Una función de borde acepta `unknown` y devuelve el tipo exacto. El llamador no valida otra vez.
  - Una función devuelve su resultado. No escribe en las estructuras que recibe.
  - Un objeto de parámetros agrupa datos que van juntos. Nunca lleva salidas.
  - Todos los readers tienen la misma forma: reciben `unknown` y devuelven el valor validado.

### Check y formato

17. `vp check` para en el formato y no ejecuta el lint. Un fallo de formato esconde los fallos de lint.
18. Los finales de línea de la carpeta de trabajo no coinciden con `.gitattributes`. Unos 55 ficheros del `back` están en LF en el índice y en CRLF en la carpeta de trabajo (`git ls-files --eol`: `i/lf w/crlf`). `git status` no muestra cambios, pero el formato falla. Causa sin confirmar: un checkout anterior al `.gitattributes`, o una herramienta de Windows. `vp check --fix` lo arregla sin cambios en git.
19. El código commiteado no pasa el lint de la raíz. `app.main.ts` (`back`) y `app.main.tsx` (`front`) tienen `typescript/no-floating-promises` en `start({ features, identity })`. No se veía porque el formato fallaba antes.
20. Hay dos configs de lint con reglas distintas: el de la raíz (`vite.config.ts`, lo corre `vp check`) y el de complejidad (`.lint/complexity.json`, lo corre `crap` en cada proyecto). Quien corre `check` cree que el código cumple todas las reglas, y no es así.

## Mejoras del Builder antes de web-2 o cli-2

1. Hecho: `.lint/` pasa a `tools/lint/` (D53).
2. Hecho: nadie escribe en un objeto que recibe: `no-param-reassign`, `createStore`, la sesión en un `WeakMap` (D54).
3. Hecho: comandos en la raíz: `npm start` (`web`), `npm test` (unitarios) y `npm run test:e2e` (D55).
4. Hecho: un solo `check`, que ejecuta cada paso y no esconde ninguno; `app.main` espera a `start` (D56).
5. Spec `users`: validar el registro (longitud mínima del nombre y de la contraseña, email válido).
6. Redefinir, estandarizar y reducir los `AGENTS.md` generados (idea del usuario, 2026-10-22). Necesita una sesión de brainstorm antes de cambiar nada: no se hace a la ligera.

## Resultado de web-I (Grok 4.7 en Cursor, 2026-10-21)

- 09:01 → 14:32 (5 h 31 min). Las 7 specs fundacionales enviadas, v0.5.0, cero deuda, `layers` y `crap` en verde (cobertura de líneas al 100 %: 818 en `back`, 649 en `front`). Es la primera run que llega al final de la Foundation web.
- 17 specs en total: 7 fundacionales, 5 `fix` (S0002, S0004–S0006, S0014) y 5 `refactor` (S0007, S0011, S0013, S0015, S0016).
- Tiempo hasta `about`: 178 min (web-H: 59 min con Codex). Las `chore` (`scaffold`, `platform`) y sus reparaciones se llevaron la mitad del día.
- Unos veinte arreglos llevados a Daylight (tabla «Lo que entra de web-I»). Los fallos que solo eran del modelo (`page.evaluate`, los apaños del logout, localizadores ambiguos, el `recordForm` sin usar) se quedan fuera, por criterio del usuario.
- Evidencia de D51: tras el ship de `settings`, con `layers` y `crap` ya en verde (14:29:46), el craft lanzó dos escaneos (medium y low) y otro check: unos 2,5 min para nada.
- Abiertos para web-1: los datos de ejemplo duplicados en los tests, y los tests que leen antes de esperar. También el store del `front` (`about`, `users`, `settings` repiten `snapshot`, `subscribe`, `start`): candidato a primitiva del Bedrock si web-1 lo repite.
