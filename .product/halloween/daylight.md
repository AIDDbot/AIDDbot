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
| S0006: `crap` en rojo entró en `master` (`types/named` en un middleware): el Builder dijo verde y nadie lo comprobó. «Confía, pero comprueba»: el orquestador corre `layers` y `crap` de cada proyecto cambiado; rojo vuelve al Builder, 2 vueltas como mucho | `build-requested-spec`, `AIDD.workflow.md` | AIDDbot `95a954c2` | overlay: cli-1 `d9e05a7`, web-1 `04d61b9` |
| S0008: el `e2e` escribe `isRecord` cinco veces (lee JSON sin tipo); D47 lo había dejado sin primitivas | Bedrock (`e2e/shared/values/values.check.ts`, sin test), `project-types.md`, `scaffold`, plantilla | `725cec1` | cli-1 `ac2708a`, web-1 `94a93cb` |
| S0008: los page objects buscan por clase CSS y ruta de etiquetas (`.shell-header span`, `main p`); el Blueprint no decía cómo | `ecosystems.md` (por rol, etiqueta o texto) | `2e2f22f` | cli-1 `ecee3b1`, web-1 `41176b3` |
| S0008: el contraste se calcula dentro de `page.evaluate`, que no ve los helpers de la suite (`colorOf is not defined`) | `ecosystems.md` (el navegador solo lee; Node calcula) | `dbca2eb` | cli-1 `4f83e3a`, web-1 `790749a` |
| S0008: la página sin estilo: cada hoja se importaba como valor (`import theme from "…css"`); la «reparación» fue un plugin que añade `export default` al CSS. Bloqueos del Bedrock: `import/no-unassigned-import` y TS2882 sin tipos de CSS | Bedrock (`vite.config.ts` permite `**/*.css`; `front` con `vite-plus/client`), `ecosystems.md` (imports de efecto por ruta de fichero) | `800bedf`, `b27ab5d` | cli-1 `277230e`, web-1 `a2afeaf` |
| S0002 (D0001): `@types/node` en el `e2e` | el Bedrock web ya no lo lleva | `9d99175` | desde el principio |
