# Columbus — notes

Dudas abiertas. Formato: 🟡 `P{n}` con `> **R:**` para responder en el fichero.

## Evidencia: post-mortem 0.2.2 (Astro-Bookings, greenfield sin arquetipo)

Fuente: `temp/post-mortem/0.2.2/claude/` (`.aiddbot/` incluye la transcripción pegada, `.product/` el resultado). Petición: `architect-system-foundation` (Hono + Vue + Playwright, Vite+) → `build-requested-spec` (flota de cohetes) → `craft-lasting-quality`. Modo YOLO. La ejecución se detuvo en **verificación roja** de S0001 (11/11 requisitos verdes; 40 fallos en tests de muestra del arquetipo `e2e-playwright`).

### Hechos (lo que salió mal, ordenado por relación con Columbus)

1. **Cero lint/unit/quality en back y front.** `config.json` solo tiene comandos de `e2e`. `rule-project` dejó back y front "solo con ruta" porque no había scripts; el Builder no escribió tests unitarios "porque las reglas dicen que no hay". Nada obliga a que exista una red mínima.
2. **Tres gestores de paquetes en un monorepo** (npm en back, pnpm en front, bun en e2e) y **sin workspace raíz**, aunque `system.md` declaraba "npm workspaces". El documento decía una cosa y el código otra.
3. **Contrato de arranque entre proyectos sin definir.** e2e esperaba `GET /api/health`, `bun start`, `PORT`, puertos 3000/4000; back y front no lo cumplían (puerto fijo, `start` que exige build, front sin `start`). Se resolvió dentro de la spec, no en la fundación.
4. **Arquitectura y capas sin criterio.** Back = `index.ts` + un módulo `rockets/` improvisado; persistencia en memoria sin frontera (repositorio/puerto). Front = un componente que hace `fetch`. Nada fija capas (rutas/servicio/dominio/almacenamiento; vista/estado/cliente API) ni sus dependencias permitidas.
5. **`system.md` con decisiones sin verificar** (workspaces) y esquemas `model`/`db` vacíos: la fundación documentó lo que había, no lo que debía haber.
6. **Muestras del arquetipo sin retirar** (auth/content/navigation/routing): 40 tests fallando. La spec pedía borrarlos; el clasificador de permisos denegó `git rm` y el Builder lo dejó pendiente. Un arquetipo trae basura que un greenfield "sin arquetipo" no debería heredar, o debe traer un paso de limpieza.
7. **Convención de etiquetas divergente:** las reglas de e2e decían `@AC-XXX-nn`, `aidd run acceptance` busca `@S0001-Rnn`. La spec tuvo que sobrescribir la regla.
8. **Metas:** rama `master` vs `main` (el agente creó `chore/document` desde `master`); el formulario sin validación nativa por exigencia de los tests (decisión de UI dictada por el test).

### Lectura para Columbus

Los puntos 1–5 son lo que una guía de mínimos sí puede fijar sin conocer la tecnología: **(a)** qué comandos de lint/test/typecheck debe tener cada proyecto antes de la primera spec, **(b)** un gestor de paquetes y un workspace raíz coherentes con `system.md`, **(c)** el contrato de arranque/salud/puertos entre proyectos, **(d)** una separación de capas mínima con dirección de dependencias, **(e)** que `system.md` refleje el código real. Los puntos 6–8 son de arquetipos/flujo y probablemente fuera de alcance.

## Evidencia: fase 6, prueba `codex-1` (Hono + Vue + Playwright, sin negocio, Codex, YOLO)

Fuente: `temp/post-mortem/columbus/codex-1/` (diario, specs, `AGENTS.md`, `config.json` y transcripción de Codex). Instalada la versión de la fase 4 (`8bf7915`). Se paró por falta de tokens con S0003 `health` a medio hacer (back y front listos, falta e2e).

| Paso | Tiempo | Resultado |
| --- | --- | --- |
| Propuesta | 9 min | Aprobada en YOLO |
| Scaffold, `outline-system`, integración | 31 min | Verde tras intervención humana (Vite+) |
| S0001 `configuration` | 36 min | Shipped; verificación y revisión green a la primera; 10/10 requisitos |
| S0002 `monitoring` | 15 min | Shipped; revisión amber → D0001 (log síncrono) |
| S0003 `health` | — | Sin terminar |

### Funcionó

- Los `AGENTS.md` de proyecto salieron completos y útiles: siete secciones, reglas de tecnología con criterio, conexiones con todas las variables.
- «No aplica» bien usado (`acceptance` de back y front, `unit` y `start` de e2e).
- Arquitectura respetada: el agente movió el acceso a ficheros del logger a `shared/data` por las capas.
- Cada spec cuesta menos que la anterior: el coste de arquetipo se concentra en la primera.

### Hechos y acción

1. **Comando de Vite+ inválido en la propuesta** y parada en `blocked` → D25.
2. **Pocos commits en el scaffold** → tres commits por proyecto, uno tras otro.
3. **`runs` de `control.json` se pisaban** entre proyectos → por clase y proyecto.
4. **IDs de decisión (D3, D6) en el `AGENTS.md`** del sistema, donde D es deuda → fuera del texto.
5. **TypeScript 7 rompe `vue-tsc`** → `upgrade` fija la mayor anterior con motivo (D30).
6. **El lint de fronteras daba verde analizando 0 módulos**, con falsos positivos `main → core` y `logic → data` → canario obligatorio en la fundación (D30).
7. **`.gitignore` con `data/` ocultaba la capa `data`** → patrones anclados a la raíz (D30).
8. **npm se tragaba el `--grep` del núcleo** → el contrato de `acceptance` acepta los argumentos extra (D30).
9. **El Architect delegó la reforma del scaffold en el Builder** → se acepta: reformar y montar tooling es código (D30).
10. **R09–R11 de `configuration`** pasaron, pero el metatesting del arnés e2e costó 17 min → resultado técnico, no requisitos; igual R10 de `health`.
11. **Observar:** la plantilla se leyó cortada una vez; ninguna lección pasó a «Project rules» pese a candidatas (7 y 8).


## Evidencia: fase 6, prueba `codex-2` (Hono + Vue + Playwright, sin negocio, Codex con Sol 6.1 light, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-2/`. Versión con D25–D31 (antes de D32–D33). Sin intervención humana. Terminó en verde: `lint`, `unit` y `acceptance` (26 tests) tras las cuatro specs.

| Paso | `codex-1` | `codex-2` |
| --- | --- | --- |
| Propuesta | 9 min | 2 min |
| Scaffold (3 proyectos, 9 commits) | 31 min | 12 min |
| S0001 `configuration` | 36 min | 9 min |
| S0002 `monitoring` | 15 min | 7 min |
| S0003 `health` | sin terminar | 6 min |
| S0004 `basic-auth` | — | 11 min |
| Total | — | 54 min |

Cambian a la vez plantillas, specs y modelo: la mejora no se atribuye a una sola causa.

### Funcionó

- Tres commits por proyecto en el scaffold; reparto Architect/Builder (D30).
- **Canario de fronteras en los tres proyectos** (D30) y **freno de versiones**: TypeScript 7 rompía dependency-cruiser (0 módulos analizados); se fijó la 6 con motivo escrito. Origen de D32.
- Vue reformado según D27: `core/App.vue`, manifiesto con la tabla del router, muestras retiradas.
- D29: el índice de primitivos creció con cada spec (15 entradas en back); la revisión anotó «conditions lack named predicates» como deuda `low`.
- `ship-spec` promovió la primera regla de proyecto (orden de middleware de Hono, S0004).
- Todas las verificaciones green a la primera revisión.

### Hechos y acción

1. **`pnpm-workspace.yaml` del generador de Hono en un proyecto npm** → la reforma retira ficheros de otros gestores.
2. **TypeScript 7 incompatible con dependency-cruiser y `@typescript-eslint/parser`** → D32 (TS 7 obligatorio, oxc, `node --test`) y referencia de fronteras con oxlint probada (D33).
3. **`npm run acceptance` sin `--` otra vez** (segunda prueba) → el núcleo inserta `--` en scripts de npm.
4. **Log síncrono otra vez** (D0002, igual que en `codex-1`) → la spec `monitoring` pide escritura sin bloqueo y pone el escritor en `shared/data`.
5. **Deuda registrada:** D0001 predicados sin nombre (`low`), D0002 log síncrono (`medium`), D0003 error de email duplicado sin enlazar a su campo (`low`).
6. **De la transcripción:** el agente comprobó a mano que el análisis de fronteras leyera los imports de los `.vue`; la referencia de oxlint solo cubría `*.ts` → globs `.vue` añadidos y probados. Un error del arnés («Selected model is at capacity») no rompió la ejecución.
7. **Observar:** las tablas de variaciones (por tipo y de primitivos de entorno) se copian enteras a cada proyecto, con filas de `cli` y `e2e` que no aplican; un commit de README dentro de la rama de S0004; `features/feature/index.ts` literal en `front-web/AGENTS.md`.

## Evidencia: fase 6, prueba `codex-3` (Hono + Vue + Playwright, stack de D32, Codex, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-3/`. Versión con D25–D33, `--` en el núcleo y `monitoring` corregida. El prompt aún nombraba npm, oxlint y oxfmt; el agente eligió solo TypeScript 7, `oxlint-tsgolint` y `node --test`, y dejó fuera `tsc`, Vitest y dependency-cruiser. Sin intervención humana.

| Paso | `codex-1` | `codex-2` | `codex-3` |
| --- | --- | --- | --- |
| Propuesta | 9 min | 2 min | 2 min |
| Scaffold, outline, integración | 31 min | 12 min | 8 min |
| `configuration` | 36 min | 9 min | 6 min |
| `monitoring` | 15 min | 7 min | 4 min |
| `health` | — | 6 min | 4 min |
| `basic-auth` | — | 11 min | 8 min |
| Total | sin terminar | 54 min | 36 min (41 con la reparación S0005 y el cierre) |

### Funcionó

- D32 completo sin pedirlo: sin `tsc`, sin Vitest, sin dependency-cruiser; fronteras con 11 `overrides` de oxlint; hueco de `vue-tsc` escrito en las reglas de tecnología del front.
- Canario en los tres proyectos con la referencia de oxlint («main uses core only»).
- `monitoring` sin la deuda del log síncrono: escritor asíncrono en `shared/data`, como pide ahora la spec.
- `--grep` de spec funcionando con el `--` del núcleo.
- Verificaciones green a la primera en las cuatro specs; 31 tests de aceptación.

### Hechos y acción

1. **El borrador de la propuesta tenía el puerto 5173 y `DATABASE_PATH`**; el agente lo alineó con los contratos de `configuration` antes del commit. Se añade igualmente la regla de leer las specs fundacionales antes de proponer.
2. **`pnpm-workspace.yaml` otra vez**, con la regla ya en el skill → `aidd config set` rechaza un proyecto con ficheros de dos gestores.
3. **Revisión roja en S0001**: el front sirvió `/runtime-config.json` y la spec decía «sin endpoints» → la spec declara `GET /runtime-config.json` (R09, URLs, impacto de esquema). Deuda D0001 `high`.
4. **Bug funcional que los tests no vieron**: Vue reutiliza la página entre `/register` y `/login` y el formulario envía la operación anterior. Lo encontró la revisión → D0002 `high`. La spec `basic-auth` no tiene requisito para el cambio de página sin recarga.
5. **El orquestador reparó D0002 por su cuenta** tras entregar la última spec: S0005 `fix` en 3 min, revisión green, D0002 retirada y regla promovida al `AGENTS.md` del front. Después cerró con `lint`, `unit` y `acceptance` en verde (33 tests). Salió bien, pero no lo pide el skill: la reparación de deuda es de `craft-lasting-quality`.
6. **Observar:** un commit `docs(system): correct archetype code fences` por el apéndice de `system.md`, que duplica los `AGENTS.md` creados al vuelo.

## Evidencia: fase 6, prueba `claude-4` (Express + front sin framework con Vite + Playwright, prompt F, Claude Code con Opus 5.5, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/claude-4/`. Versión `0e52fad` (STE en las specs fundacionales). Réplica de los arquetipos propios (`back-express`, `front-standard`, `e2e-playwright`) sin copiarlos. Sin intervención humana (solo un `stop` antes del prompt real).

| Paso | `codex-3` | `claude-4` |
| --- | --- | --- |
| Propuesta | 2 min | 9 min (probó los tres comandos de scaffold en el scratchpad) |
| Scaffold, outline, integración | 8 min | 12 min |
| `configuration` | 6 min | 7 min |
| `monitoring` | 4 min | 5 min |
| `health` | 4 min | 5 min |
| `basic-auth` | 8 min | 8 min |
| Total | 36 min | 47 min, verde, sin reparaciones |

### Funcionó

- Comprobado a mano: `run lint` y `run acceptance` en verde (34 tests). Canario: `features/health/data` importando `core/settings.ts` → `no-restricted-imports` con el mensaje de la regla.
- Stack D32 sin `tsc` ni build: Node 26 con type stripping, `node:sqlite`, Express 5; `start` del front es `vite`.
- Front con la plataforma Baseline, sin sobredimensionar: router de 38 líneas (Navigation API + `URLPattern`) sobre el manifiesto de páginas con `import()` por página; páginas y shell como custom elements con `<template>`; `fetch` en `data` con `AbortSignal.any` (señal de navegación + timeout); validación nativa con `setCustomValidity`. Total sin tests: 2438 líneas en los tres proyectos, del orden de los arquetipos actuales (~2700).
- Manifiesto del back con `access: public | protected` y el guard aplicado por `core`: protegido por defecto, como `back-express`.
- Verificaciones green a la primera en las cuatro specs. No reparó deuda por su cuenta (al contrario que `codex-3`): recomendó `/craft-lasting-quality`.

### Hechos y acción

1. **Tercera revisión roja en S0001 seguida** (`codex-3`: endpoint no declarado; ahora puertos y URLs escritos en los tests de `configuration`, contra `e2e/AGENTS.md`) → D0001 `high`. Los tests de puertos por defecto (R02, R04) chocan con la instancia de la suite. El helper de puerto libre y de arranque con entorno propio llegó después (`docs(e2e): index the shared process and probe helpers`). Acción a decidir: que el Blueprint de `e2e` traiga ese primitivo desde el scaffold, o que `configuration` no pruebe los puertos por defecto.
2. **Seguridad en verde con una deuda de seguridad `high`**: la spec pide un hash «que OWASP recomienda» y el Builder usó `scrypt` con los valores por defecto (N=2^14 < 2^17) → D0003. La revisión pasó la puerta de seguridad y lo anotó como deuda. Incoherente: incumplir un mínimo que la spec cita debería fallar la puerta.
3. **El Builder inventó un requisito**: `minlength="8"` en el registro, que ni la spec ni la api piden → D0004. El orquestador lo vio y pidió al Craftsman que lo juzgara. Principio a reforzar en `implement-project`: nada de reglas de negocio fuera de la spec.
4. **Import dinámico roto para `auth`**: `web/src/features/manifest.ts` importa `./auth/index.ts` de forma estática (`restoreSession`) y además con `import()`; Vite deja el módulo en el chunk principal. Ni lint ni la revisión lo vieron.
5. **Contratos frente a los arquetipos** (vienen de nuestras specs, no del agente): `GET /api/health` añade `status`; `DATABASE_URL` en lugar de `DB_PATH`. A alinear en la fase 5.
6. **Observar:** `system.md` de 626 líneas, con los tres `AGENTS.md` duplicados como apéndice (igual que `codex-3`); `upgrade` con `npx -y npm-check-updates@latest` porque la instalación global de la máquina estaba rota.

## Evidencia: fase 6, prueba `codex-5` (Express + front sin framework con Vite + Playwright, prompt F, Codex, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-5/`. Versión con D35 (`af31326`). Mismo prompt que `claude-4`. Sin intervención humana. Subagentes con los adaptadores antiguos: Architect `gpt-6-sol` medium, Builder `gpt-6-luna` medium, Craftsman `gpt-6-luna` high. En `codex-3` Codex no aplicaba esos adaptadores y todo corrió con `gpt-6.1-sol` low; por eso los tiempos no son comparables.

| Paso | `codex-3` | `claude-4` | `codex-5` |
| --- | --- | --- | --- |
| Propuesta | 2 min | 9 min | 6 min |
| Scaffold, outline, integración | 8 min | 12 min | 27 min |
| `configuration` | 6 min | 7 min | 33 min |
| `monitoring` | 4 min | 5 min | 17 min |
| `health` | 4 min | 5 min | 17 min |
| `basic-auth` | 8 min | 8 min | 44 min |
| Total | 36 min | 47 min | 2 h 27 min; cierre `blocked` por D0001 |

### Funcionó

- Comprobado a mano: `run lint` y `run acceptance` en verde (34 tests e2e en 13,5 s, con tags `@S0001-R08`…). Canario: `features/health/data` importando `core/configuration.ts` → `no-restricted-imports` con el mensaje «Data uses shared primitives only».
- **D35 confirmada:** S0001 verificada y calificada a la primera; ningún puerto escrito en los tests de `e2e`. Las cuatro verificaciones, en verde a la primera.
- **Seguridad mejor que `claude-4`:** el Builder consultó OWASP y usó scrypt con `N=2^17`, `r=8`, `p=1`, guardados con cada hash; verifica la contraseña también para cuentas que no existen.
- Stack D32: TypeScript 7, oxlint con `oxlint-tsgolint`, oxfmt, `node --test`, sin `tsc` ni Vitest. Tres `AGENTS.md` completos (siete secciones, sin huecos de plantilla). `system.md` de 66 líneas, frente a las 626 de `claude-4`. Guardó también el `AGENTS.md` de cada arquetipo creado al vuelo en `.product/archetypes/`.
- Tamaño sin tests: back 727 líneas, front 729, e2e 693; unas 2150 en total, por debajo de `claude-4` (2438) y de los arquetipos (~2700).
- Las trazas de depuración del test de doble envío no llegaron al commit.

### Hechos y acción

1. **Evasión del guard (D0001 `high`)**: el guard decide qué está protegido comparando la ruta exacta, pero Express enruta sin distinguir mayúsculas ni la barra final. `/API/auth/me` y `/api/auth/me/` llegaban al handler sin token. Hoy no filtra datos (200 con cuerpo vacío), pero cualquier ruta protegida futura quedaría abierta. La calificación falló y la spec se integró igualmente como deuda (D12) → **D40**: un fallo de la puerta Security vuelve al Builder una vez. Para el Blueprint o el Builder: la protección va con la ruta (middleware declarado en el manifiesto, como `access` en `back-express`), nunca en una lista paralela de rutas.
2. **El cierre se declaró `blocked` con `lint`, `unit` y `acceptance` en verde**, por la calificación roja de S0004. El skill pide cerrar en verde según esas tres comprobaciones y devolver el resumen de deuda recomendando `/craft-lasting-quality`. Interpretó de más. Con D40 no se habría llegado aquí; vigilar en la siguiente hornada.
3. **Trampa: `erasableSyntaxOnly`** (S0002). Una parameter property en `shared/logic/errors.ts` pasó `lint` y `unit` y rompió el arranque del back con el soporte nativo de TypeScript de Node; solo lo vio `e2e`. El agente activó `erasableSyntaxOnly` y lo apuntó en `back-api/AGENTS.md`. `back-express` ya lo trae. Acción: el scaffold de JS/TS ejecutado con Node sin build lo activa desde el principio (hoy `ecosystems.md`; mañana el Builder).
4. **Trampa: custom elements en el `constructor`** (S0003). Los componentes añadían su plantilla en el `constructor` y fallaban al crearse desde HTML; dos ejecuciones de aceptación con timeout de 33 s. Lo arregló con `connectedCallback` e inicialización protegida. Acción: plantilla del front sin framework (Builder o Archetype Base).
5. **Lentitud por los modelos de los subagentes**: los comandos tardan 1–6 s y el e2e 2–13 s; el resto es razonamiento con modelos de la generación anterior y más esfuerzo. Acción hecha: `agents.yaml` con `gpt-6.1-sol` en los tres niveles y el esfuerzo de Claude (`137ff3a`).
6. **Observar:** el front inventa su CSS (sin Pico ni tema, P22).

## Evidencia: fase 6, prueba `claude-6` (Express + front sin framework con Vite + Playwright, prompt F, Claude Code con Opus 5.5, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/claude-6/`. Versión `aca391f` (D40–D42). Hornada 2, en paralelo con `codex-6`. Intervenciones humanas: puertos 3006/4006 para no chocar con `codex-6` (fallo del humano al lanzar las dos a la vez, no del agente) y dos `/craft-lasting-quality` hechos a propósito, para comparar al final dos soluciones sin deuda.

| Paso | `claude-4` | `codex-5` | `claude-6` |
| --- | --- | --- | --- |
| Propuesta | 9 min | 6 min | 8 min |
| Scaffold, outline, integración | 12 min | 27 min | 12 min |
| `configuration` | 7 min | 33 min | 9 min (parada por los puertos) |
| `monitoring` | 5 min | 17 min | 5 min |
| `health` | 5 min | 17 min | 7 min |
| `basic-auth` | 8 min | 44 min | 10 min |
| Fundación | 47 min | 2 h 27 min; `blocked` | 52 min; verde |
| Calidad 1 (S0005, `fix`) | — | — | 9 min |
| Calidad 2 (S0006, `refactor`) | — | — | ~5 min (más 27 min parada por el límite de uso de Claude Pro) |

### Funcionó

- Comprobado a mano en `master` (v0.5.2): `run lint` y `run unit` en verde; `run acceptance` 35 pasan y 2 se saltan (S0001-R02/R04, puertos por defecto) en 9,8 s. Canario: `features/health/health.repository.ts` importando `core/settings.ts` → `no-restricted-imports` con «Features never use core, main or the manifest. They get configuration by injection».
- **D40 bien aplicada:** S0004 calificada en rojo, pero con Security en verde, así que no volvió al Builder; los dos fallos se registraron como deuda `high`. Seguridad al nivel de `codex-5`: scrypt `N=2^17`, `r=8`, `p=1` guardado con el hash, `timingSafeEqual`, verificación falsa para emails desconocidos, tokens `randomBytes(32)`.
- **Cierre correcto:** verde con la deuda listada y recomendación de `/craft-lasting-quality` (en `codex-5` declaró `blocked`).
- **D41:** logs en texto plano (`time source LEVEL message`, con test que lo comprueba); SQL en ficheros `.sql` junto a los repositorios.
- **D42** (versión original; las capas por sufijo las sustituye D39): capas por sufijo (`.routes`, `.service`, `.repository`, `.middleware`, `.client`, `.store`, `.page`), sin carpetas de capa; e2e con `core/`, `features/{f}/*.api.spec|*.web.spec` y `shared/` con `page-objects/` y `test-data/`.
- **Guard:** el Architect dejó escrito desde la spec que el guard protege solo las rutas registradas. El primer guard iba en el prefijo y fallaba cerrado (401 en vez de 404), nunca abierto como en `codex-5`. S0005 lo llevó a cada ruta; S0006 hizo que el router de una funcionalidad no pública falle cerrado (`use`, `route`, `param` y rutas sin path dan error al arrancar).
- **Ciclo de deuda autónomo:** cada pasada eligió un grupo coherente y lo resolvió con una spec acotada (S0005 `fix` para D0003–D0004 `high`; S0006 `refactor` para D0005–D0006). El segundo `scan-quality` explicó bien por qué un lint limpio no prueba una reparación. Deuda final: D0007 `low` (nombre de un test), más D0001–D0002 de los puertos, que no cuentan.
- Tamaño sin tests: back 819 líneas, front 826, e2e 633; unas 2280 en total, entre `codex-5` (2150) y `claude-4` (2438). 37 tests e2e.

### Hechos y acción

1. **Lint no se comprueba en el HEAD que se publica.** En S0006 el Builder hizo commit antes de leer el lint (`30ccecb`, TS2339) y lo reparó después (`531c2a7`). `control.json` registra lint y unit en el commit roto; el Craftsman no los repite porque `verify-behavior` lo prohíbe; el orquestador los ejecutó a mano tras el merge. Acción: `ship-spec` (o el core) exige `lint` y `unit` en verde en el HEAD de la rama antes de integrar.
2. **El Builder no aplicó reglas que ya existían:** `setCustomValidity()` para errores del servidor (`front/AGENTS.md`) y el 404 de rutas no registradas (texto de la spec). Ambas dieron la calificación roja de S0004. Acción: `implement-project` repasa las reglas de proyecto y las frases de la spec antes de entregar.
3. **Instrucción equivocada del orquestador** en S0001: un origen no listado recibía `*` en CORS. La revisión del Craftsman lo detectó y se corrigió antes de publicar. El sistema se defendió; vigilar los traspasos del orquestador.
4. **`system.md` de 621 líneas** con los tres `AGENTS.md` copiados como apéndice, igual que `claude-4` (626) y `codex-3`; `codex-5` dejó 66. Acción: `architect-system-foundation` enlaza los `AGENTS.md` y no los copia.
5. **`guardedRouter` sobredimensionado:** reemplaza los métodos del `Router` de Express con `Reflect` (~50 líneas). Un flag `public` por ruta en el manifiesto bastaría. Material para la fase 5 y el Archetype Builder.
6. **Observar:** el último commit («Implement feature X…») es la transcripción pegada, no del agente; el límite de uso de Claude Pro paró la sesión 27 min.

## Evidencia: fase 6, prueba `codex-6` (Express + front sin framework con Vite + Playwright, prompt F, Codex con `gpt-6.1-sol`, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-6/` (transcripción en `codex-session-*.md`). Versión `aca391f` (D40–D42), la misma que `claude-6`. Hornada 2. Intervenciones humanas: un `continúa` tras quedarse sin tokens al empezar S0004 (parada de 81 min, de 15:11 a 16:32, descontada abajo), un `$craft-lasting-quality` hecho a propósito para comparar sin deuda, y la aprobación de su spec (se lanzó sin YOLO, así que preguntar era lo correcto).

| Paso | `claude-6` | `codex-6` |
| --- | --- | --- |
| Propuesta, scaffold, outline, integración | 20 min | 18 min |
| `configuration` | 9 min | 11 min |
| `monitoring` | 5 min | 10 min |
| `health` | 7 min | 9 min |
| `basic-auth` | 10 min | ~19 min (sin la parada) |
| Fundación | 52 min | ~69 min |
| Calidad | 2 pasadas, ~14 min | 1 pasada (S0005 `refactor`), ~10 min |
| **Hasta quedar sin deuda** | **~66 min** | **~79 min** |
| Deuda al cerrar la fundación | 2 `high` (+2 `medium` de puertos) | 3 `low` |
| Deuda final | D0007 `low` | ninguna |
| Código sin tests (back/front/e2e) | 819 / 826 / 633 ≈ 2280 | 599 / 587 / 693 ≈ 1880 |
| `system.md` | 621 líneas | 82 líneas |

### Funcionó

- Comprobado a mano en `master` (v0.5.1): `run lint` y `run unit` en verde; `run acceptance` 102 pasan en 26,6 s (34 tests × Chromium, Firefox y WebKit). Canario: `features/health/health.repository.ts` importando `core/configuration.ts` → `no-restricted-imports` con el mismo mensaje que `claude-6`.
- **Mejor a la primera:** ninguna calificación roja; S0001, S0002 y S0004 en ámbar, cada una con una deuda `low` del mismo tipo (condición compuesta sin predicado con nombre). Una sola pasada de calidad las reparó todas en una spec `refactor`.
- **Comprueba antes de cada commit:** el diario muestra `format → lint → unit → quality → commit` por proyecto. Ningún commit rojo.
- **Guard simple y pegado a la ruta:** `registerProtected((path) => protectedRouter.route(path).all(guard))`. Una línea frente a los ~50 de `guardedRouter` en `claude-6`; ninguna evasión.
- **`system.md` de 82 líneas** que enlaza los `AGENTS.md` en lugar de copiarlos.
- D41: SQL en `.sql` (también el esquema, en un fichero por tabla). D42 original en back y front (sustituido por D39): capas por sufijo, sin carpetas de capa. Seguridad: scrypt `N=2^15`, `r=8`, `p=3` (variante OWASP), `timingSafeEqual`.
- El código más pequeño de todas las pruebas (~1880 líneas sin tests).

### Hechos y acción

1. **Comprobar antes del commit, en el núcleo.** Codex lo hace y Claude no (`30ccecb` en `claude-6`). Acción: `aidd commit` rechaza el commit de un proyecto si su último `lint` no está en verde con el árbol actual. Mecánico → núcleo, no texto en `implement-project`.
2. **Patrón del guard en el Blueprint:** el manifiesto separa el registro público del protegido y cada ruta protegida lleva su guard. Así ningún agente inventa un router envoltorio.
3. **`system.md` enlaza los `AGENTS.md`** (confirma la acción 4 de `claude-6`).
4. **Nombres de e2e de D42 no cumplidos:** `auth-api.spec.ts`, `configuration.spec.ts` en lugar de `*.api.spec.ts` / `*.web.spec.ts`; quedan `.gitkeep` sueltos. Nadie lo comprueba. Acción: regla de nombres en el lint del e2e o chequeo del núcleo.
5. **Shadow DOM** en el shell y el formulario de auth: el CSS global (Pico, P22) no entra. Acción: el Blueprint del `front-web` pide light DOM salvo que el arquetipo diga otra cosa.
6. **Tres navegadores:** prueba que el front Baseline funciona en los tres motores, a cambio de ~17 s por ejecución. **Decisión del humano: por ahora solo Chromium.** Acción: el Blueprint del e2e lo fija.

## Evidencia: fase 6, pruebas `claude-7` y `codex-7` (Express + front sin framework con Vite + Playwright, prompt F, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/claude-7/` y `codex-7/`, 3 oct por la tarde. Versión con D40–D42 originales (capas por sufijo, antes de D39; `codex-7` en `953a9da`). Hornada 3. Intervenciones humanas: en `codex-7`, pedir la reparación tras el `blocked` (una hora después) y la pasada de calidad; en `claude-7`, la pasada de calidad, que se quedó a medias (S0005 sin commits del Builder).

| Paso | `claude-7` | `codex-7` |
| --- | --- | --- |
| Propuesta | 9 min | 5 min |
| Scaffold, outline, integración | 15 min | 9 min |
| `configuration` / `monitoring` / `health` / `basic-auth` | 8 / 8 / 8 / 10 min | 8 / 6 / 6 / 11 min |
| Fundación | 60 min, verde | 45 min, **`blocked`** (`database is locked`) |
| Reparación y calidad | S0005 (D0001–D0002) sin terminar | S0005 aislamiento, 8 min; S0006 predicados, 6 min; v0.5.2 |
| Deuda abierta | 2 `medium` y 1 `low` de spec, 5 `low` de tamaño de tests | D0005, D0006 `medium` |
| Código sin tests (back/front/e2e) | 809 / 703 / 508 ≈ 2020 | 515 / 424 / 426 ≈ 1370 |
| Ficheros planos en `back/src/shared` | 21 | 15 |

### Funcionó

- **D40:** ninguna evasión del guard; `basic-auth` con Security en verde en las dos.
- **D41:** SQL en ficheros `.sql`, también el esquema; log en texto `time source LEVEL message`.
- **D42 (`e2e`):** las dos usan `features/{f}/*.api.spec.ts` y `*.web.spec.ts`, la acción 4 de `codex-6` ya se cumple.
- **`codex-7` bloquea bien:** la comprobación final falla, registra la causa, no repara por su cuenta. La reparación no usa reintentos ni un solo worker: cada instancia de test tiene su propia base de datos temporal.
- `codex-7` tiene el código más pequeño de todas las pruebas (~1370 líneas sin tests).

### Hechos y acción

1. **Base de datos compartida entre instancias de test.** Los tests de `configuration` y `monitoring` arrancan su propia instancia sin `DATABASE_URL`, y todas usan la SQLite por defecto. En paralelo, a veces `database is locked`. `codex-7` lo vio en la comprobación final (intermitente: S0004 había pasado en verde). `claude-7` lo tapó en código de producción: `fix(back): wait for SQLite locks of parallel instances` (busy timeout de 5 s). Acción (hecha, `2ce54c8`): la spec `configuration` pide una base de datos temporal por instancia de test y prohíbe tapar el problema con reintentos o un solo worker.
2. **La fecha sobra en cada línea del log:** `2026-10-03T17:04:27.356Z back-api WARN …`, porque el nombre del fichero ya da la fecha. Acción (hecha, `68d188b`): `monitoring` pide la hora local `HH:MM:SS.mmm` sin fecha.
3. **`shared` como cajón de sastre:** 15 y 21 ficheros planos en `back/src/shared` tras cuatro specs. Confirma D39 (`shared` por tipo), que se prueba en `codex-8`.
4. **`claude-7` registra como deuda el tamaño de los `describe` de los tests** (D0005–D0009 `low`). Ruido: un `describe` es la suite. Acción pendiente: comprobar que `oxlint.complexity.json` (D39) excluye los bloques de suite en tests.

## Evidencia: fase 6, prueba `codex-8` (Express + front sin framework con Vite + Playwright, prompt F, Codex con `gpt-6.1-sol`, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-8/` (transcripción en `codex-session-*.md`). Versión `651f442` (merge del 4 oct: D39 Blueprint v2, `layout`, tema de D37, D40–D42) más `68d188b` (hora del log sin fecha). Sin D43, D44 ni D45, ni la base de datos por instancia de test. Hornada 4. **Sin intervención humana**: un solo prompt.

| Paso | `codex-8` | `codex-7` |
| --- | --- | --- |
| Propuesta (con tres arquetipos a medida en `.product/archetypes/`) | 5 min 39 s | 4 min 56 s |
| Scaffold, outline, integración | 8 min | 9 min |
| `configuration` / `monitoring` | 8 / 5 min | 8 / 6 min |
| `layout` (nueva, D38) | 5 min | — |
| `health` | 7,5 min (una verificación roja) | 6 min |
| `basic-auth` | 16 min (una calificación roja de Security) | 11 min |
| **Fundación** | **57 min, verde** | 45 min, `blocked` |
| Deuda | 4 `medium` | 3 `medium` al cerrar |
| Código sin tests (back/front/e2e) | 494 / 529 (sin Pico) / 347 ≈ 1370 | 515 / 424 / 426 ≈ 1370 |
| Ficheros en `back/src/shared` | 7, en `types/`, `utils/`, `validation/` | 15 planos |
| Tests | 16 `unit`, 31 de aceptación | 37 de aceptación |

### Funcionó

- Comprobado a mano en `master` (v0.6.0): `lint`, `unit` y `acceptance` en verde. **Canario de D39:** `core/app.config.ts` importando la fachada de `health` → `no-restricted-imports` con «core never uses a feature, the manifest or main». Deshecho.
- **D39 tal cual:** `app.main.ts` solo llama a `createApp()` de `app.compose.ts`; `core` con los servicios de plataforma (config, logger, CORS, base de datos, errores, peticiones, shell, router, tema) y su fichero público `core.api.ts`; `shared` por tipo y pequeño. El cajón de sastre de `codex-7` y `claude-7` desaparece.
- **`layout` y D37 a la primera:** Pico copiado en `src/styles/`, fuentes Roboto, Audiowide y Anonymous Pro en `public/fonts/`, `theme.css`, `colors.css` con `--ab-*`, `custom.css`; tema según el sistema y elección guardada.
- **Log sin fecha** (`12:35:52.032 http WARN GET / 404 8ms`), recogido de `68d188b`.
- **D42 (`e2e`):** `features/{f}/*.api.spec.ts` y `*.web.spec.ts`, `shared/page-objects/` y `shared/test-data/`.
- **D40:** la calificación de Security volvió al Builder una vez y la reparación separa en el manifiesto `publicFeatures` de `features` (protegidas por defecto), con test `unit`. Es lo que pide D45 sin tenerlo.
- El hueco entre veredicto y propuesta sigue en ~5 min con tres arquetipos a medida: escribirlos en paralelo no compensa.

### Hechos y acción

1. **`database is locked` por tercera prueba seguida.** El Craftsman lo vio como regresión de `monitoring` al verificar `health`; el Builder lo tapó en producción con `new DatabaseSync(path, { timeout: 15000 })`, como `claude-7`. Acción (hecha, `2ce54c8` y D44): base de datos temporal por instancia de test y migraciones en `configuration`.
2. **Guard opcional ruta a ruta** en la primera implementación de `basic-auth`: la redacción «`core` pone el guard después de las rutas públicas» era ambigua (la precisa se perdió en el merge del 4 oct). Acción (hecha, D45).
3. **Validaciones repetidas** (D0001 enteros, D0004 texto): `parseInteger` no nombraba el campo y la spec pide el nombre de la variable en el error. Acción (hecha, D43): `parseInteger(value, field, min, max)` y `shared` por naturaleza.
4. **Commit en `master` después del release:** `docs(auth): join shared primitive table rows` (`7aa3c73`) se hizo tras la etiqueta `v0.6.0`, fuera de una rama de spec. Es solo documentación, pero salta el flujo. Acción pendiente: que `ship-spec` o el núcleo impidan commits en la rama por defecto después de `release`, salvo `integrate`.
5. Dos predicados sin nombre (D0002, D0003): la deuda habitual de Codex, que una pasada de calidad cierra.

## Evidencia: fase 6, prueba `codex-9` (Express + front sin framework con Vite + Playwright, prompt F, Codex con `gpt-6.1-sol`, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-9/`. Versión `a14862b`: F1–F4 (plan 4c) y D47. Hornada 5, después de `claude-9` (sin puertos compartidos). **Sin intervención humana.**

| Paso | `codex-9` | `codex-8` |
| --- | --- | --- |
| Propuesta, scaffold, integración | ~17 min | ~14 min |
| `configuration` / `monitoring` / `layout` / `health` | 10 / 7 / 6 / 6 min | 8 / 5 / 5 / 7,5 min |
| `basic-auth` | 16 min, verde y verde | 16 min (Security roja, reparada) |
| **Fundación** | **~64 min, verde** | 57 min, verde |
| Deuda | 3 `high` (de calificación) | 4 `medium` |
| Código sin tests (back/front/e2e) | 559 / 550 / 452 ≈ 1560 | ≈ 1370 |
| Tests de aceptación | 44 | 31 |

### Funcionó

- **D47 a la primera:** `core` monta los registros públicos y después `app.use(basePath, sessionGuard, router)` para cada protegido; scrypt con mínimos OWASP, verificación ficticia con email desconocido, digest del token y caducidad. La calificación de S0005 sale en verde por primera vez en Columbus.
- **F1:** la propuesta se commitea en `chore/foundation`; `master` solo tiene el overlay y los merges.
- **F2:** `shared` plano con primitivas en la raíz (`numbers.parse.ts`, `email.normalize.ts`, `types.check.ts`…), sin `utils/` ni carpetas por tipo.
- **D44:** todas las verificaciones verdes a la primera y sin `database is locked`.
- Los comandos de scaffold probados (`027cde8`) se usaron tal cual: los tres proyectos en 6 minutos.

### Hechos y acción

1. **Reglas generales calificadas como `blocking`** (D0001 SQL en código de tests, D0003 `try`/`catch` con más sentencias): se publican como deuda `high` sin romper nada. Causa: «nunca bloquean» (D12) solo estaba en un comentario de la plantilla, que desaparece al rellenarla. `claude-9` tuvo el mismo SQL en `e2e` (D0003). Acción (hecha, D48).
2. **`e2e` hereda `DATABASE_URL` del runner** (D0002): `startProject` mezcla `process.env` y solo crea una BD temporal si queda vacía. Incumple D44. Acción (hecha, D48): la spec dice que el helper nunca la toma del entorno.
3. **Un poco más lenta que `codex-8`** (~7 min), sobre todo en el scaffold y en las dos primeras specs, con commits `fix(` del Builder antes de verificar. A cambio, `basic-auth` hace más en el mismo tiempo y sin reparación.

### Calidad en YOLO (4 oct, 21:38–23:00)

El humano pidió limpiar la deuda todo lo posible. Tres pasadas sin intervención hasta v0.6.3: S0006 aísla la BD de `e2e` (D0002), S0007 saca el SQL de los tests a `.sql` (D0001) y S0008 deja el `try`/`catch` solo (D0003). Quedan dos deudas `medium` de carpetas largas que abrió el scan: D0004 (`back/src/features/auth`, 14 entradas) y D0005 (`e2e/shared`).

4. **S0007 empeora D0005 sin registrarlo:** los `.sql` de inspección van a `e2e/shared`, que pasa de 14 a 17 entradas; el registro sigue diciendo 14. Una aceptación de S0007 falló (`exit 1`) y la repetición pasó sin cambios: posible intermitencia.
5. **El umbral del slot `quality` no coincide con la regla.** El scan marca más de 12 entradas; `AGENTS.md` dice «más de unos 16 ficheros, divide por tema». Con la regla, D0004 no es deuda. Acción pendiente: afinar los límites.
6. **Reparación de D0004 por capas** (la que importa: dependencias dentro de una funcionalidad) (5 oct, en curso; se deja como experimento): `auth` en `presentation/`, `logic/` y `data/`. Contradice la sección 5 de `back/AGENTS.md` (capas por sufijo en una carpeta plana) y la regla «divide por tema». Además, los globs del lint de capas son de un nivel (`src/features/*/*.service.ts`, imports `./*.controller.ts`), así que los ficheros movidos **salen del lint de capas sin que nada falle**. Acción pendiente: globs con `**` o prohibir subcarpetas en una funcionalidad, y un canario dentro de una subcarpeta.
   - **Confirmado (S0010, v0.7.x):** sobre una copia de `back`, `logic/password.service.ts` importando `../presentation/auth.controller.ts` y `data/auth.repository.ts` importando `../logic/auth.service.ts` pasan `oxlint` en verde; la misma violación en `health` (plana) falla con «logic never uses presentation». La verificación (55 tests) y el lint no lo ven.
   - `back/AGENTS.md` registra la excepción: «`auth/presentation/*.controller.ts`… other features keep their existing paths». Dos estructuras en un proyecto: lo contrario de repetible.
   - La calificación de S0010 salió en verde («layer boundaries pass»): el Craftsman tampoco lo vio.
   - Bien: el Craftsman vio que faltaban los ficheros de `auth/data/` en el commit. Causa: el `.gitignore` raíz tenía `data/` sin anclar, pese a la regla de anclarlo; el Builder lo corrigió a `/data/`. No viene de plantillas de AIDDbot (ningún `.gitignore` del repo tiene `data/` sin anclar): lo escribió el agente en el scaffold. La regla existe, pero nadie la comprueba hasta que aparece una carpeta `data`.
7. **Reparación de D0005 en `shared/test-data/`:** el aislamiento de la BD y sus helpers van ahí para dejar `shared` en 12 entradas. Lo honesto sería `shared/database/`, pero la plantilla de `e2e` dice «only `page-objects/` and `test-data/` are subfolders» y contradice la regla general de `shared` (carpetas por tema técnico, `http`, `database`). Acción pendiente: quitar la incongruencia de la plantilla. Prioridad baja: las dependencias de `shared` son libres y solo importa el orden; lo grave es el punto 6, las capas dentro de cada funcionalidad.

### Funcionalidad extra para el generador (5 oct)

Dos specs candidatas a la fundación, pedidas en inglés con `build-requested-spec` YOLO: S0011 (home con tarjetas) y S0012 (cuenta, logout, menú por visibilidad, guard del front, `/users/:id`).

**S0011 · home con tarjetas** (10:04–10:21, v0.8.0): verificación y calificación en verde a la primera; 73 tests de aceptación.

- **Funcionó:** la identidad está en un solo sitio (`front/src/core/app.identity.ts`) y llega al `<title>` (el servidor de Vite lo inyecta), a la cabecera del shell y a la home. Las tarjetas siguen el mecanismo del menú: cada fachada exporta una `CardRegistration` con import dinámico (`health.card.ts`, `auth.card.ts`), el manifiesto las lista y la home las pinta sin conocer ninguna funcionalidad. El canario de D39 sigue valiendo.
8. **Bolsa de servicios con opcionales:** `PageServices` gana `identity?` y `cards?`, y la home los lee con `services.identity!` y `services.cards!`. Cada página recibe todo. Acción pendiente: que la spec diga que la home recibe las tarjetas y la identidad en su registro, no en los servicios comunes.
9. **Palabras de dominio en `shared`:** `InteractionLogger.submission(operation: "register" | "login")` en `shared/services.type.ts` (de S0009). Incumple «`shared` sin palabras de dominio» y nadie lo marcó.
10. **Estilos de las tarjetas en `core/styles/dashboard.css`** (110 líneas), no en cada funcionalidad. Aceptable para una home desechable.

**S0012 · cuenta** (10:23–10:43): verificación en verde a la primera (98 tests), calificación ámbar por un predicado sin nombre; sin publicar al revisarla.

- **Funcionó:** en el back, `users` no tiene capa `data`: devuelve el usuario de la sesión y cualquier otro id da 404, así que el IDOR es imposible por construcción. Queda protegida por defecto (sin marca de pública). El logout borra solo el digest de la sesión actual. En el front, `URLPattern` para `/users/:id`, guard con `returnTo` y `safeApplicationTarget`, que rechaza otro origen, `//`, `\` y rutas no registradas: protección de open redirect que nadie pidió. Menú por `audience` (`everyone`, `anonymous`, `session`).
11. **La bolsa de servicios crece** (punto 8): `PageServices` suma `params?`, `access?` y `navigation?`; hay 10 accesos `services.x!` en el front. Los tipos ya no garantizan nada. Acción pendiente: servicios comunes obligatorios y datos de cada registro (parámetros, tarjetas, identidad) en su propio contrato.
12. **Cuatro marcas en `PageRegistration`:** `audience`, `requiresSession`, `menu: false` y `returnTarget: false`. `audience: "session"` ya implica la sesión, y `anonymous`, no volver. Acción pendiente: que la spec fije una sola marca de acceso.
13. **`InteractionLogger` en `shared` suma `action("logout")`:** más palabras de dominio (punto 9).

**Correcciones para el arquetipo (5 oct):** el humano deshizo S0010 a mano (`auth` plana, `AGENTS.md` sin excepción; canario de capas en rojo, como debe). S0013 (v0.9.1) tipó el contrato de páginas del front (puntos 8, 11, 12 y 13).

14. **Texto corrupto en S0013:** Codex reescribió `front/.oxlintrc.json` y las flechas `→` quedaron como `â†’` (UTF-8 leído como Windows-1252). La calificación lo vio (D0011 `low`). Arreglado a mano. Caso aislado de momento.
15. **Worktree del arnés:** para S0014, Codex creó `codex-9-sql-refactor` y trabajó allí; el diario de la carpeta principal no mostró nada durante 10 minutos y parecía parado. El commit humano en HEAD desacoplado lo rescató el propio agente con una rama `chore/preserve-oclint-update`. Acción pendiente: decidir si el núcleo admite worktrees o exige trabajar en la carpeta del repo.
16. **S0014 aplica D49** (11:12–11:2x, v0.9.2): verificación y calificación en verde a la primera, sin hallazgos; 100 tests. De 25 ficheros `.sql` a 3 (solo las migraciones); solo `app.database.ts` y la inspección de `e2e` leen `.sql`, y solo migraciones. **D0004 y D0005 desaparecen en su origen:** `auth` pasa de 14 a 8 entradas y `e2e/shared` de 18 a 12. 63 líneas añadidas y 88 borradas. Detalle menor: conserva el `\n` final de cada fichero dentro de la constante (`"SELECT …;\n"`) por preservar los bytes.
17. **S0015 (calidad, v0.9.3) la terminó Claude Code** porque Codex se quedó sin tokens a mitad del Builder: las evaluaciones son de un revisor externo, no del Craftsman. Cerró D0006, D0009, D0010, D0012 y D0013. D0009 venía con un truco (`({ baseURL: _baseURL }, use)`, una dependencia falsa para esquivar `no-empty-pattern`); se sustituyó por un override de `e2e` para `shared/fixtures.ts`, que es la forma de Playwright.
18. **D0014 `high`, test intermitente previo:** S0005-R12 falla ~1 de 5 (3 de 15 con el store anterior a S0015). En la captura, `/register` tiene Nombre y Contraseña pero el Email vacío: la página se vuelve a pintar mientras el usuario escribe, y un usuario real perdería lo escrito. Probable re-render tardío tras los cambios de menú de S0012/S0013. El núcleo rechazó `--preexisting D0014` porque la deuda se registró después de crear la spec (bien hecho); la verificación pasó en la segunda ejecución y lo dice. Acción pendiente: arreglarlo antes de usar `codex-9` como arquetipo. **Lección para AIDDbot, sin necesidad de la causa:** S0012, S0013 y S0014 verificaron en verde con este fallo intermitente dentro; una sola ejecución de aceptación no ve lo intermitente, y repetir hasta verde lo esconde. Acción pendiente: decidir si `verify-behavior` repite los tests de la spec (por ejemplo `--repeat-each`) o si el núcleo registra un fallo que después pasa como deuda.

## Evidencia: fase 6, prueba `cursor-10` (prompt F, Cursor con Grok, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/cursor-10/`. Candidata 0.2.5 desde la copia local. Hornada 10. Primera prueba de Columbus en Cursor.

1. **Los subagentes no arrancaban:** el adaptador escribía `name: "Architect"` y Cursor guarda las comillas como parte del nombre. Grok lo dedujo e invocó `"Architect"` con comillas. Acción (hecha, `7a1c8f1`): los adaptadores de Cursor escriben los nombres sin comillas. Sin comprobar: si Cursor acepta los ids de modelo con corchetes (`grok-4.7[context=256k,…]`); si no, `model: inherit` en `.aiddbot/agents.local.yaml`.
2. **Textos de los `AGENTS.md` demasiado largos (humano).** Cada `AGENTS.md` de proyecto tiene unas 2750 palabras, como la plantilla (2792). Cerca de la mitad se repite igual en los tres proyectos: la arquitectura (~790 palabras; back y front difieren en 20 líneas) y las reglas generales (~530). Cada agente carga ese texto en cada sesión. Acción pendiente (0.3.0): reescribir la plantilla con menos texto para lo mismo, y estudiar si el texto común del Blueprint va una sola vez en el `AGENTS.md` raíz (los arneses lo cargan siempre) y el de proyecto queda solo con lo suyo: tecnología, tooling, carpetas, primitivas y conexiones. Choca con el principio 11 (un `AGENTS.md` de proyecto completo): decidirlo antes.

3. **Resultado (valida la 0.2.5):** fundación en ~2 h 05 min (12:37–14:42), cierre en verde (lint, unit 17 + 13, 73 tests de aceptación). Scaffold e integración en 29 min; specs en 12–17 min cada una. `layout`, `health` y `basic-auth` en verde a la primera y sin hallazgos. Lista de la 0.2.5 en verde: sin avisos de carpetas ni subcarpetas, ningún `.sql` fuera de las migraciones, una sola marca de acceso, sin servicios opcionales con `!`, identidad en `core`. La línea nueva del diario se lee bien (`acceptance: e2e ok 22s (73 passed (20.8s))`).
4. **D0001 `high`** (calificación de `configuration`): el timeout de la suite no nombra el proyecto y deja el proceso vivo. Criterio de la Solution, bien visto.
5. **D0002 `high`, falso fallo de S0005-R11:** el test hace `Promise.all([submit.click(), submit.click()])`; `click()` de Playwright espera a que el botón esté habilitado, así que el segundo clic envía de nuevo cuando acaba el primero (409). La aplicación es correcta. El Builder dio tres vueltas al código de la aplicación. Intermitente: pasó en la aceptación final. Acción (0.2.6): la nota de prueba de R11 dice cómo dar dos clics en un solo paso del navegador. S0006 también rompió una vez S0005-R12 (el enlace de registro en la página de login), el mismo test que en `codex-9` (D0014): la zona entre el menú por acceso y los formularios de `auth` es frágil en dos arneses.

## Evidencia: fase 6, prueba `codex-12` (prompt F, Codex con `gpt-6.1-sol`, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-12/`. v0.2.7 (`1688307`): principios de `docs/principles/` en el Blueprint; `core` y features no se importan; contratos en `shared`; registro en `presentation`; facade solo para otras features; `max-params` 2.

| Paso | `codex-11` (0.2.6) | `codex-12` (0.2.7) |
| --- | --- | --- |
| Propuesta, scaffold, outline, integración | 16,5 min | 11 min |
| `configuration` / `monitoring` / `layout` / `health` | 17,7 / 10,5 / 10,8 / 9 min | 5,6 / 5 / 3,4 / 4,4 min |
| `basic-auth` / `account` / `about` | 19,5 / 12,5 / — min | 9 / 6 / 2,6 min |
| **Fundación** | **~1 h 42 min, verde** | **~50 min, verde** |
| Deuda al cerrar | 0 | 5 (3 `high`, 2 `medium`) |
| Tests | unit 15, aceptación 90 (3 navegadores) | unit 13, aceptación 52 |
| Palabras: Blueprint / back / front / e2e | 891 / 849 / 916 / 1205 | 960 / 841 / 902 / 958 |

1. **El modelo nuevo se aplica sin fricción.** Blueprint copiado byte a byte. Ninguna funcionalidad importa `core`; contratos en `shared` (`logger.type.ts`, `http.type.ts`, `page.type.ts`, `identity.ts`) e implementación en `core`. El manifiesto importa solo `*.routes.ts`; el resolver de sesión llega a `core` por la composición. `health` sin facade; `users.service.ts` usa solo `auth.api.ts`. Canario (feature → `core`) falla con el mensaje nuevo.
2. **Todas las verificaciones verdes a la primera** (8 → 17 → 22 → 28 → 41 → 50 → 52).
3. **Velocidad ×2, pero no por un Blueprint más corto:** el Blueprint creció (891 → 960 palabras, con system, REST, seguridad y tests). Causas probables: reglas más claras y menos vueltas (solo Security devuelve al Builder). Una sola ejecución: falta repetir.
4. **La deuda sube (0 → 5):** D0001/D0002 `high` (limpieza de procesos de e2e y parada del back), D0004 `high` (componente de `health` sin custom element), D0003 y D0005 `medium`. Comparar tras `/craft-lasting-quality` hasta deuda cero.
5. **`quality` sin escanear:** `max-params` 3–4 solo en middlewares de Express y el manejador de errores de `core` (firma del framework), sin comentario de excepción; complejidad 9 en `readSettings`; 4 `no-empty-pattern` en las fixtures de Playwright otra vez.
6. **Fallos nuestros (arreglados en 0.2.8, más la excepción de parámetros para callbacks del framework, que generó D0009–D0011):** (a) «An enum for a closed set» choca con `erasableSyntaxOnly` de TS: decir «a closed type (an enum or a union of literals)». (b) El rol `*.card.ts` del front no está en la lista de `presentation` de `oxlint.boundaries.json`. (c) Restos del ejemplo de Vite en `front/src/assets/`.
7. **Pase de craft (humano: «resuelve las deudas»):** `high` en 30 min (S0008–S0010, 7 de pausa por tokens); `medium` de back y front en 23 min (S0011–S0018), una spec por grupo coherente, todas verdes a la primera, 61 tests. Quedan 4 `medium` de `e2e` (D0016–D0019, setup de la suite y arranque de procesos), aplazadas por el humano. Total desde `init` hasta deuda cero fuera de `e2e`: ~2 h 04 min (codex-11: 1 h 42 min con deuda cero en todo, sin pase de craft).
8. **Excepciones de `max-params` bien hechas (S0012):** un `oxlint-disable-next-line` en cada middleware de Express con la razón; confirma la redacción de la 0.2.8.
9. **Código final sin tests:** back 777, front 861, e2e 532 líneas. `quality`: 1 aviso de tipos en back (`unbound-method`) y 1 en front (`no-base-to-string`), que no son límites y no entran al registro; 4 `no-empty-pattern` otra vez en las fixtures de `e2e`, aunque `ecosystems.md` ya pide desactivarla en ese fichero (revisar).
10. **S0019 y S0020, terminadas por Claude Code** (Codex sin tokens). S0019: el test e2e rellenaba `Name` en el login; arreglado, verde. S0020 `record-views` (nueva foundation 8): 10 requisitos verdes a la primera, 76 tests; tres componentes en `shared/components` (card, detail, table) y `records.css`; los tests de S0004, S0005, S0006, S0007 y S0019 siguieron el marcado nuevo. Review ámbar: la spec decía `custom.css`, pero la regla del proyecto deja los ficheros del tema sin cambios (arreglado en la fuente, `c7dc5ae`; D0020 `low`).
11. **Fallo del núcleo:** `ship-spec` formatea después del último `lint`; el commit `style: format` lo rechaza el guard de lint y `aidd release` mete los ficheros formateados en su commit sin pasar `lint`. Sin daño aquí (solo formato, todo verde después), pero el guard queda burlado. Acción pendiente: formatear antes del último `lint`, o que `release` rechace un árbol con código sin lint.

### Preparación para arquetipo (S0021–S0023, 6 oct, 13:08–13:19)

Tres specs `foundation` en ~11 min, todas verdes a la primera; 0.10.0 → 0.10.3. Objetivo explícito de S0022: «The projects will become archetypes, so they must start with no warning and no unused file».

| Spec | Tipo | Cambio | Resultado |
| --- | --- | --- | --- |
| S0021 `e2e-harness` | refactor | Quita los tests de aceptación del propio arnés (S0008 `process-shutdown`, S0009 `owned-descendants`) y sus fixtures y scripts; conserva la limpieza de procesos y su test unitario; parte `setup` y `startProject` en pasos con nombre; apaga `no-empty-pattern` en `shared/fixtures.ts`. | Cierra D0016–D0020. 76 → 68 tests de aceptación (~18 s) |
| S0022 `archetype-cleanup` | chore | `back`: resolver de sesión ligado (`unbound-method`). `front`: valor de formulario como texto solo si es string (`no-base-to-string`); fuera `src/assets/` y `public/` de la muestra de Vite; una sola tabla de primitivas en `AGENTS.md`, sin las dos filas de ficheros inexistentes. | `quality` sin ningún aviso en los tres proyectos |
| S0023 `identity-source` | refactor | La identidad (`displayName`, `description`, `author`, `homepage`, `version`) sale del `package.json` raíz; `front/src/shared/identity.ts` la lee con el valor por defecto `AIDDbot` / `https://aiddbot.com`; `e2e/shared/system.identity.ts` da la identidad esperada a los tests de `layout` y `about`. | Sin texto del sistema en código ni en tests |

Estado final (`e4a5012`): `debt.json` vacío, `quality` sin avisos, unit 15 + 9 + 3, aceptación 68. Es el primer experimento que cumple la puerta de biblioteca de P21 (cero deuda, `quality` en verde), con el tema de marca de D52.

12. **Identidad en el `package.json` raíz (S0023):** mejor que lo que piden `layout` y `about` (nombre y descripción de `system.md` copiados a `shared`; solo la versión del `package.json`). Con la identidad en campos estándar de npm, un proyecto se vuelve arquetipo sin editar código ni tests. Candidato al Blueprint: `layout` y `about` leen los cinco campos del `package.json` raíz; `system.md` lo rellena la fundación; los tests de `e2e` leen la identidad esperada del mismo sitio.
13. **Los tests del arnés no son aceptación (S0021):** S0008 y S0009 probaban la limpieza de procesos de la propia suite con tests de aceptación lentos y fixtures propias. La limpieza es tooling de `e2e`: test unitario, nunca un requisito de spec. Revisar que `configuration` («la suite para lo que arranca») no empuje a escribirlos como aceptación.
14. **`quality` sin avisos como puerta de arquetipo (S0022):** los avisos de tipos (`unbound-method`, `no-base-to-string`) no son límites y no entran al registro (punto 9), así que «deuda cero» no basta. La puerta de Archetype Base tiene que ser `debt.json` vacío **y** `quality` sin ningún aviso.
15. **Deriva del `AGENTS.md` de proyecto:** el del front tenía cuatro tablas de primitivas y dos filas de ficheros que no existían. Lo escribe `ship-spec` spec a spec (ver punto 7 de `codex-11`). Acción: `ship-spec` mantiene una sola tabla y solo con exports que existen.
16. **Ya arreglado en 0.2.8 (la prueba usa 0.2.7):** restos de Vite (punto 6c) y `no-empty-pattern` en las fixtures (`ecosystems.md`). No es una recaída.
17. **`format` del back sin configuración:** el diario dice `oxfmt` «No config found, using defaults» en `back`; `front` sí tiene `.oxfmtrc.json`. Queda un `back/.oxfmtrc.json` sin commitear (y un `package.json` raíz con otro `displayName`, prueba manual de S0023). Acción: la fundación crea la configuración de `format` en cada proyecto, igual que la de `lint`.
18. **Proceso:** S0022 y S0023 no tienen commit `define delivery` (la spec entra con el código), y la verificación y la calificación se registran en el mismo segundo. Aceptable para un `chore` o un `refactor` sin requisitos, pero no hay revisión independiente.

## Evidencia: fase 6, prueba `codex-11` (prompt F, Codex con `gpt-6.1-sol`, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/codex-11/`. Candidata 0.2.6 (D50–D52) desde la copia local.

1. **`AGENTS.md` de proyecto:** back 703, front 773 y e2e 778 palabras, más 891 del Blueprint en la raíz, una vez. Total ~3150 frente a ~8320 en `cursor-10` (−62 %).
2. **Bloqueo por un proceso huérfano de `cursor-10`:** S0001-R04 (front en el puerto 4000 por defecto) no se pudo verificar porque el front de «Scaffold Probe» (`cursor-10`) seguía vivo desde su aceptación final (pid 29488, 14:42). Es D0001 de `cursor-10` («la suite deja el proceso vivo») en la práctica. El Craftsman se bloqueó bien; el humano mató el proceso y relanzó. Las pruebas en serie en la misma máquina necesitan que la suite pare lo que arranca.
3. **`no-empty-pattern` en las fixtures de Playwright otra vez** (como D0009 de `codex-9`). Acción (hecha): `ecosystems.md` desactiva la regla para el fichero de fixtures y prohíbe la dependencia falsa. Para el punto 2, `configuration` pide que la suite pare lo que arranca también tras un fallo o un timeout.

4. **Revisión a mitad (tras `monitoring`, humano y Claude):** el Blueprint en la raíz se cumple aunque no esté en el `AGENTS.md` del proyecto (funcionalidades planas, un solo manejador de errores, rutas relativas a la carpeta del proyecto). Tres fallos nuestros, arreglados en las fuentes:
   - `parseInteger(value, field, min, max)` de la plantilla (D43) tenía 4 parámetros con el límite nuevo de 3: pasa a `parseInteger(value, field, range)`.
   - El manejador de errores de Express exige 4 parámetros: el Blueprint deja fuera del límite un callback con la firma del framework.
   - `*.value.ts` se usó para funciones (`numbers.value.ts`) y no hubo ningún value object: `value` solo para value objects, las primitivas con su verbo (`numbers.parse.ts`), y `basic-auth` siembra el value object `Email`.
   - Codex escribió su propio comprobador de fronteras (`tools/boundaries.mjs`, 62 líneas) para la funcionalidad plana. Bueno, pero no repetible: `ecosystems.md` prohíbe los comprobadores propios; bastan los overrides y el aviso del núcleo.

5. **Resultado (valida la 0.2.6):** seis specs y cierre en verde a las 16:32 (lint, unit 9 + 6, 90 tests de aceptación), **deuda cero en el registro**, primera vez en Columbus. ~1 h 42 min desde el `init` (14:50), con unos 6 min de bloqueo ajeno. Specs en 9–18 min. Solo `monitoring` tuvo un rojo (Security: la traza unida con ` | ` guardaba la cabecera del error y podía filtrar secretos), reparado en 2 min. `account` no rompió los formularios de `auth` (al contrario que en `cursor-10`). Tema de marca copiado byte a byte. Sin `.sql` fuera de las migraciones, sin subcarpetas, sin `services.x!`.
6. **`quality` sin escanear tiene 6 avisos:** 3 ya arreglados en las fuentes (`parseInteger` de 4 parámetros en back y front, el manejador de Express) y 3 de complejidad (9, 10 y 12) en el envío del formulario de `auth` y en el arranque y la parada de procesos de `e2e`. La fundación no escanea, así que el registro dice cero; una pasada de `scan-quality` los registraría.
7. **Los `AGENTS.md` crecen con las specs:** back 703 → 849, front 773 → 876, e2e 778 → 1205 palabras al cerrar (primitivas y reglas de proyecto que añade `ship-spec`). Siguen muy por debajo de las ~2750 de `cursor-10`. Vigilar que `ship-spec` escriba telegráfico.
8. **Pausas sin rastro:** 4–6 min de lectura antes del primer commit del Builder en `layout` y `basic-auth`. Acción (hecha, `7eea22a`): evento `plan` antes de la primera edición.

## Evidencia: fase 6, prueba `claude-9` (Express + front sin framework con Vite + Playwright, prompt F, Claude Code con Opus 5.5, YOLO)

Fuente: `C:/code/aidd/experiments/columbus/claude-9/`. Versión `d625c4e`: D43–D46, sin los comandos de scaffold probados (`027cde8`) ni F1–F4. Hornada 5. Parada por tokens entre S0004 y S0005 (14:03–15:59); el humano relanzó la sesión.

| Paso | `claude-9` | `codex-8` |
| --- | --- | --- |
| Propuesta, scaffold, outline, integración | 21 min | ~14 min |
| `configuration` / `monitoring` / `layout` / `health` | 11 / 6 / 6 / 5 min | 8 / 5 / 5 / 7,5 min |
| `basic-auth` | 9 min (calificación roja, sin reparación) | 16 min (Security roja, reparada) |
| **Fundación** | **58 min de trabajo, verde** | 57 min, verde |
| Deuda al cerrar la fundación | 12 (3 `high` antes del craft) | 4 `medium` |
| Código sin tests (back/front/e2e) | 820 / 923 / 583 ≈ 2330 | ≈ 1370 |
| Tests de aceptación | 46 (51 tras S0006) | 31 |

### Funcionó

- **Todas las verificaciones verdes a la primera** (11 → 19 → 27 → 33 → 46). Sin `database is locked`: D44 (base de datos por instancia y migraciones numeradas en `core`) lo resuelve. Tres migraciones: `schema-versions`, `runs`, `auth`.
- **D37 y D46:** Pico y las fuentes desde npm; `theme.css`, `colors.css`, `custom.css` en el proyecto. Componentes con `<template>` y sin `attachShadow`: light DOM sin pedirlo.
- **D45 en la calificación:** el Craftsman separó bien Security (en verde: el prefijo protege más, no menos) del criterio técnico de la spec.
- **Sentencias en `.sql`** junto a su `data` (D37), también las de `core`.

### Hechos y acción

1. **Guard por prefijo publicado con deuda `high`.** El Builder montó `server.use(basePath, guard, router)` pese a «nunca por prefijo»; solo un rojo de Security vuelve al Builder, así que se publicó como D0012. El craft (S0006) lo «arregló» parcheando los métodos del router de Express (`createGuardedRouter`), que falla abierto con `route()` y `use()` (D0017 `high`) y con un `Router()` propio de la funcionalidad (D0018). La regla de D45 empuja a una solución frágil. Acción (hecha, D47): guard en el base path de cada registro protegido; bajo ese base path, 401 sin sesión.
2. **Sesiones sin caducidad y tokens en claro** (D0013, Security como deuda). S0006 los resolvió en minutos con SHA-256 y `SESSION_TTL_HOURS`. Acción (hecha, D47): mínimos de `basic-auth`.
3. **Traza de error en varias líneas** (D0007). Acción (hecha, D47): `monitoring` une los saltos de línea con ` | `.
4. **`shared/utils/`** en `back`: la versión es anterior a F2. Se comprueba en `codex-9`.
5. **Código ~70 % mayor que `codex-8`**, sobre todo el front (923 líneas). Ruido habitual de Claude frente a Codex; no hay acción.
6. **Aprobación en el craft:** sin YOLO, `define-spec` esperó 12 min a la aprobación del humano. No es fallo del agente.

## ✅ P1 → D1 · ¿Dónde se aplica la guía?

¿La guía es (a) un documento del overlay que lee `architect-system-foundation`, (b) una puerta en `rule-project` (no se aceptan proyectos sin lint/unit/typecheck), o (c) ambas? Mi propuesta: guía como fuente única + `rule-project` la comprueba.

> **R:** Garantizar capacidades: la fundación las instala y `rule-project` registra y comprueba.

## ✅ P2 → D1 · ¿Mínimos exigidos o recomendados?

Con el punto 1, ¿un proyecto sin comando de lint/unit debe **bloquear** la primera spec, o basta con registrarlo como deuda en `debt.json`?

> **R:** Exigidos. Se permite «no aplica» explícito y con motivo; la fundación deja un test de humo. Sin ranura `typecheck`: los tipos se comprueban dentro de `lint`. Se añade `format` (lo mejor posible). Multiecosistema (Go, Rust, PHP…).

## ✅ P3 → D8 · ¿Alcance de los puntos 6–8?

¿Entran en Columbus (limpieza de muestras, etiquetas, rama por defecto) o van a otro sprint?

> **R:** Resuelta en D8: los hechos 6 y 7 entran; el 8 queda fuera.

## Problema 2 — arquitectura (ver D2)

## ✅ P4 → D3 · ¿Una funcionalidad puede usar otra?

Ejemplo: `bookings` necesita saber si un cohete de `rockets` está activo. Opciones: (a) prohibido: lo común baja a `shared`; (b) permitido solo a través del punto público de la otra funcionalidad (su `index`/`mod`), nunca sus capas internas. Propuesta: (b), porque (a) convierte `shared` en un cajón de sastre con negocio.

> **R:** (b), con un artefacto público que exponga solo lo imprescindible, incluidos tipos e interfaces.

## ✅ P5 → D4 · ¿`shared` puede contener negocio?

Propuesta: no. Solo utilidades sin dominio (errores, validación genérica, cliente HTTP, UI base). El negocio común se resuelve con P4 (b).

> **R:** No: ayudas y DRY. Organizado por capas, como las funcionalidades.

## ✅ P6 → D5 · ¿Lint de fronteras obligatorio o lo mejor posible?

Mecanismos: JS/TS `eslint-plugin-boundaries`/`dependency-cruiser`; Go `internal/` + `depguard`; Rust visibilidad de módulos; PHP Deptrac; Python import-linter; Java/Kotlin ArchUnit. Sin herramienta, la regla queda escrita en el fichero de reglas y la comprueba `review-implementation`. Propuesta: lo mejor posible en todos, pero en JS/TS se espera siempre porque es barato. ¿Y e2e queda fuera de D2, con su forma propia (tests, páginas, clientes, fixtures)?

> **R:** Sí, siempre con sentido común.

## ✅ P7 → D6 · ¿Hasta dónde llega `core` en las funcionalidades?

`core` necesita conocerlas para montarlas (rutas, router de páginas, comandos de CLI), pero no debería ver nada más. Propuesta, de más a menos control:

1. **Un único manifiesto.** La carpeta de funcionalidades tiene un fichero índice (`routes/index`, `pages/router`, `commands/index`) que agrega el registro de cada funcionalidad. `core` importa **solo ese fichero**, nunca una funcionalidad concreta.
2. **Solo registro.** El artefacto público de cada funcionalidad (D3) exporta una función o valor de registro (`registerRockets(app, deps)`, una lista de rutas). `core` le pasa las dependencias que ha creado (config, conexión a BD) y no toca servicios ni repositorios.
3. **Nada de autodescubrimiento mágico** (escaneo de carpetas, decoradores globales): oculta la dependencia y el lint no la ve.

Mi recomendación: 1 + 2. `core` → manifiesto → artefacto público de cada funcionalidad, y el lint de fronteras (D5) lo comprueba: `core` solo puede importar el manifiesto.

> **R:** 1 + 2.


## Problema 3 — arquetipos con funcionalidad mezclados con proyectos desde cero

Qué pasó en 0.2.2: `e2e-playwright` trae tests de una app de muestra (auth, items, contenido, navegación) que presuponen un back y un front de esa misma familia. Back y front salieron de `npm create hono` y `vp create`, así que el sistema nació con 40 tests rojos. Borrarlos se dejó para la primera spec, donde el clasificador de permisos bloqueó el `git rm` de ficheros ya versionados.

Distinción útil: una **plantilla** (`npm create hono`, `cargo new`) solo trae esqueleto y equivale a «desde cero»; un **arquetipo con funcionalidad** trae además muestras que dependen de sus proyectos compañeros.

## ✅ P8 → D7 · ¿Qué se hace con la funcionalidad de muestra?

Propuesta: **el sistema nace en verde.** Al cerrar la fundación, todas las ranuras de D1 pasan y la suite de aceptación también. Una muestra solo sobrevive si funciona de extremo a extremo en este sistema, es decir, si están sus compañeros. Si no, se retira **en la fundación y antes del commit del scaffold**, no en la primera spec: son ficheros recién creados y sin versionar, así que borrarlos no es destructivo. Lo único que siempre queda es `health` (D2).

> **R:** Ok.

## ✅ P9 → D8 · ¿Arreglar en origen nuestros arquetipos?

Los arquetipos de AIDDbot son nuestros. Propuesta: cada uno **declara sus muestras y sus compañeros** (un pequeño manifiesto con las rutas de muestra y los arquetipos que requieren), para que la fundación sepa qué retirar sin adivinar, y sigue las convenciones del núcleo (etiquetas `@S{nnnn}-R{nn}`, hecho 7; D1; D2). Así P3 se cierra: 6 y 7 entran por aquí, 8 (`master`/`main`) queda fuera.

> **R:** Ok. Los arquetipos son repos aparte.

## ✅ P10 → D9 · ¿Las plantillas ajenas se reforman a D2?

Una plantilla de terceros (`npm create hono`) trae una estructura mínima o ninguna. Propuesta: la fundación la reorganiza a D2 (`core`, funcionalidades, `shared`, `health`) y completa D1 antes del commit del scaffold. Un arquetipo propio ya debería cumplir D1 y D2 de fábrica.

> **R:** Ok.


## ✅ P11 → D10 · Arquetipos como specs

Idea del humano: specs de arquetipo, agnósticas de la tecnología, que la fundación instancia y entrega con el flujo normal: una previa de **tooling** (D1), una de **health** (D2) y otra de **basic auth**.

Propuesta: sí, y que las specs sean la fuente de verdad. Los repos de arquetipo pasan a ser aceleradores opcionales, es decir, implementaciones ya hechas de esas specs.

- `S0001 chore tooling`: ranuras de D1. La evidencia no es un test de aceptación sino `aidd run lint|format|unit` en verde.
- `S0002 feat health`: esqueleto andante de D2 (`core`, manifiesto, `shared`, funcionalidad `health` con sus tres capas, test de humo y test de aceptación del contrato de salud).
- `S0003 feat basic-auth`: opcional, solo si el sistema tiene usuarios.

Pros: agnóstico de la tecnología por construcción; el sistema nace en verde (D7) con las mismas puertas de siempre; no depende de repos aparte, lo que ayuda a llegar al 12 de octubre.

Contras: coste y tiempo (cada spec es una entrega completa: unos 6 minutos en 0.2.2) y variación entre ejecuciones (se mitiga con requisitos precisos y contratos fijos: ruta, forma de la respuesta, variables de entorno).

> **R:** Ok. Además, permite fabricar arquetipos en serie.

## ✅ P12 → D11 · ¿Basic auth por defecto u opcional?

Propuesta: opcional. No todo sistema tiene usuarios, y la auth fija decisiones de seguridad (sesión o token, almacenamiento de contraseñas) que no conviene imponer. Para este sprint podría incluso quedar fuera: tooling y health bastan para el problema del post-mortem.

> **R:** Opcional y fuera de este sprint.

## Problema 4 — reglas generales de codificación

## ✅ P13 → D12 · ¿Incluir reglas universales de codificación en la guía?

Propuesta: sí, pocas y como valores por defecto que cada proyecto puede ajustar. La regla es la fuente de verdad y el lint la hace cumplir cuando puede (D5); donde no hay lint, la comprueba `review-implementation`.

Por qué, aunque haya lint: la regla en contexto **previene** (el modelo escribe antes de que corra el lint); el lint no ve el **significado** de un nombre; y sin lint la regla es lo único que queda. Por qué pocas: una lista larga se diluye, duplicar la configuración del lint acaba divergiendo, y el estilo canónico de cada ecosistema se delega, no se reescribe.

| Tema | Regla por defecto | ¿Lint? |
| --- | --- | --- |
| Estilo de nombres | El idiomático del ecosistema, sin inventar otro. | Sí (casing) |
| Significado de nombres | Vocabulario del dominio: los nombres de la spec y de `model.schema.md`. Sin abreviaturas; booleanos como preguntas; funciones como verbos. | No, revisión |
| Complejidad | ~10 de complejidad ciclomática, ~40 líneas por función, ≤3 niveles de anidamiento, ≤4 parámetros, ~300 líneas por fichero. | Casi siempre (ESLint `complexity`, gocyclo, clippy, PHPMD) |
| Errores | Nada silenciado; una sola forma de error por proyecto, en `shared`. | Parcial |
| Configuración | Sin valores mágicos ni cableados; config por entorno (el `PORT` de D1). | Parcial |

Consecuencias a decidir:

- Si `lint` aplica los umbrales de complejidad, la ranura opcional `quality` de D1 queda casi vacía: ¿se fusiona con `lint` o se queda para métricas que no bloquean (duplicación, cobertura)?
- La guía da los valores por defecto y `rule-project` los copia al fichero de reglas de cada proyecto, adaptados al ecosistema.

> **R:** Primero hazlo, luego hazlo bien. En desarrollo bloquea lo que resuelve la funcionalidad (lint básico y e2e de la lógica); lo demás es endurecimiento posterior.

## Plan — dudas para dar vueltas (ver `plan.md`)

## ✅ P14 → D15 · ¿Dónde vive la guía de mínimos?

Hoy un skill solo usa recursos de su carpeta (salvo el núcleo). La guía la necesitan `architect-system-foundation`, `rule-project` y `review-implementation`. Propuesta: la guía vive en `architect-system-foundation/assets/` y **se propaga a través del fichero de reglas de cada proyecto**, que `rule-project` ya escribe y que el resto de skills ya leen. Así nadie más necesita leer la guía.

> **R:** Se cierra con P20: la guía es la propia plantilla de reglas, convertida en patrón oro (D15).

## ✅ P15 → D20 · ¿Cómo se registra «no aplica» en `config.json`?

Propuesta: la ranura existe con un objeto en lugar de un comando: `"unit": {"na": "e2e no tiene lógica propia"}`. `aidd run unit` responde «no aplica: <motivo>» y sale con 0; una ranura ausente sigue siendo un error.

> **R:** Aceptada la propuesta (D20).

## ✅ P16 → D21 · ¿Cómo entrega la fundación las specs fundacionales?

Opciones: (a) `architect-system-foundation` llama a `build-requested-spec` una vez por spec, con el flujo completo; (b) un camino corto que implementa y verifica sin revisión. Propuesta: (a), porque es lo que da el «nace en verde» con las mismas puertas. Coste asumido en D16: hasta cuatro entregas (D17). Con un arquetipo conforme, cada una se verifica casi sin cambios.

> **R:** Aceptada la propuesta (D21).

## ✅ P17 → D22 · ¿Qué entra de los repos de arquetipo en este sprint?

Propuesta (revisada con D16–D19): en la fase 5, opcional, cada repo recibe su `AGENTS.md` desde la plantilla del Blueprint y pierde sus muestras. Sin muestras, el manifiesto de muestras de D8 deja de hacer falta. La fabricación en serie pasa al siguiente sprint. Si la fase 5 no llega, la fundación trata el arquetipo como uno creado al vuelo (principio 6).

> **R:** Aceptada la propuesta (D22).

## ✅ P18 → D23 · ¿Qué pasa con `archetypes.md`?

El catálogo actual (`front-standard`, `back-express`, `e2e-playwright`, `cli-node`) ofrece repos con código. Con D16 la fuente de verdad es el Blueprint. Propuesta (revisada): se mantiene como catálogo de arquetipos **por tipo de proyecto** (`back-api`, `front-web`, `cli`, `e2e`; principios 4 y 5), cada uno con su tecnología y la ruta de su `AGENTS.md`. La fundación entrega igualmente las specs fundacionales sobre ellos (D17).

> **R:** Aceptada la propuesta (D23).

## ✅ P19 → D13, D14 · ¿Cómo se reproduce la funcionalidad de los arquetipos actuales?

Duda del humano: ¿se suponen las funcionalidades o se hace ingeniería inversa de los arquetipos?

Propuesta: **ingeniería inversa de contratos, no de código**. De los repos (`archetypes/`) se extrae solo lo observable: rutas, forma de las respuestas, variables de entorno, formato del log y páginas. Lo que es propio del stack se reformula de forma neutra (argon2 con sus parámetros → «hash de contraseñas resistente según OWASP»). Los tests de `e2e-playwright` (`tests/api/health.spec.ts`, `tests/api/auth.spec.ts`, `tests/e2e/auth/`) ya son criterios de aceptación casi literales.

Inventario (1 oct 2026):

| Área | back-express | front-standard | e2e-playwright |
| --- | --- | --- | --- |
| Salud | `GET /api/health` → `{uptime, runs}`; `runs` se guarda en SQLite | página *about* que lo muestra | api y navegación |
| Log | un fichero por día en `LOG_DIR`, niveles por `LOG_LEVEL`, columnas fijas, una línea por petición con nivel según el status | `create-logger` | — |
| Errores | siempre `{ "error": "..." }` con su status; errores de dominio → `ApiError` | `is-error-body` | — |
| Config | `PORT`, `HOST`, `DB_PATH`, `LOG_*`, `CORS_ORIGIN` | `.env` | arranque de back y front con comprobación previa |
| Auth | register, login (bearer token + fila de sesión), `me`; las rutas añadidas tras el middleware quedan protegidas por defecto | login, register, `auth.store`, vuelta a la última ruta | api y UI |
| Shell UI | — | router, navegación, 404, `escape-html` | routing y navegación |
| Muestras | — | home, item-detail | content |

Huecos que ninguna spec cubría: persistencia (la propia `health` cuenta arranques en la BD), contrato de error uniforme, CORS y conexión front↔back, shell del front, arranque desde e2e y el tracer bullet de una CLI. Las muestras (home, item-detail, content) se descartan: son las que acaban como tests huérfanos.

Propuesta de specs:

1. `chore tooling`: sin cambios (D1).
2. `feat health` como **esqueleto andante**: además de la ruta de salud, config por entorno, log de actividad y errores, contrato de error y persistencia mínima. El tracer bullet ya los atraviesa, así que no añade entregas.
3. `feat basic-auth`: dentro del sprint, pero opcional. Es lo único que ejercita D3, D4 y D6 entre funcionalidades.

> **R:** La seguridad entra: da campo para mostrar código y probar la arquitectura, y a muchos les vale para empezar. Opcional también.

## ✅ P20 → D15 · Las plantillas de spec y de reglas como patrón oro

Idea del humano: el análisis de arquitectura para greenfield también debe repercutir en las reglas de brownfield. Las plantillas de spec y de reglas son nuestro patrón oro: las reglas se rellenan según la tecnología y según sea greenfield o brownfield; las specs, según el negocio.

Matices propuestos:

1. **Spec = qué, reglas = cómo.** La spec lleva negocio y contratos; Solution, en conceptos de D1–D6 (D14). Las reglas traducen esos conceptos a carpetas y herramientas, y llevan las ranuras y las reglas por defecto de D12. Excepción: las specs de arquetipo traen el contenido fijo y solo se rellenan los roles.
2. **Greenfield prescribe, brownfield mide.** En greenfield las reglas imponen el patrón oro traducido a la tecnología. En brownfield describen lo que hay (no pueden mentir sobre el código) y anotan las desviaciones del patrón oro, que pasan al registro de deuda. El código nuevo sigue la convención local si es coherente, y el patrón oro donde no la hay. Es la misma plantilla con dos formas de rellenarla; Columbus solo hace la de greenfield.
3. **La plantilla actual de reglas está lejos del patrón oro.** Deja elegir `Layer | Feature | Hybrid` (D2 lo cierra) y le faltan la correspondencia de los conceptos de D2–D6 con las carpetas, las ranuras de D1, las reglas por defecto de D12 y una sección de desviaciones.

Consecuencia para P14: si la plantilla de reglas incorpora el patrón oro, la guía de mínimos es esa plantilla más una tabla de implementaciones por ecosistema.

> **R:** Ok. Cierra P14 con esto.

## Después de Columbus — dudas abiertas (3 oct)

## 🟡 P21 · ¿Sacamos la construcción de arquetipos de AIDDbot?

Evidencia: `architect-system-foundation` es el skill más grande (49 líneas frente a unas 22 de media, más unas 1.000 líneas de assets, 300 de ellas solo en `oxlint.boundaries.json`) y acumula más de 15 commits de «tighten» en tres días. Mezcla dos trabajos con ritmos distintos: **fundar un sistema** (proyectos tipados, `AGENTS.md` por proyecto, specs fundacionales, cierre en verde), que es el núcleo agnóstico de AIDDbot, y **construir arquetipos** (stack de D32, fronteras de oxlint, capa visual, versiones), que es opinable, depende de la tecnología y cambia con cada release de una herramienta.

> **R:** Sí, se separa en tres piezas. Los nombres llevan las iniciales a-b, que también son parte de la marca: **Archetype Blueprint** (el contrato, ya en uso), **Archetype Builder** (el constructor) y **Archetype Base** (la biblioteca). Los repos viven en la organización `AIDDbot` de GitHub (`AIDDbot/archetype-builder`, `AIDDbot/archetype-base`). Se hace en el periodo de refactor posterior a la release 0.2.x, con el informe de `comparison.md` delante.
>
> | Pieza | Quién la usa | Qué hace |
> | --- | --- | --- |
> | **AIDDbot** | Cualquiera | Funda el sistema. Ofrece la biblioteca de arquetipos; si no vale ninguno, invoca al Archetype Builder **en el repo del usuario**. Después sigue igual: `AGENTS.md` por proyecto, ranuras y specs fundacionales. |
> | **Archetype Builder** | Cualquiera (a través de AIDDbot) y el humano directamente | Construye un arquetipo al vuelo con el grado de refinamiento que se pida. |
> | **Archetype Base** (biblioteca) | Cualquiera la lee; la alimenta el humano | Arquetipos ya hechos. Puede ser distinta del Builder. |
>
> Grados de refinamiento del Builder:
>
> - **Básico** (lo que pide AIDDbot por defecto en el repo de un usuario): en verde, con fronteras y con la deuda anotada en `debt.json`.
> - **Máximo** (lo que se usa para alimentar la biblioteca): uno o varios pases de crafting (`/craft-lasting-quality`), tema de marca (P22) y publicar. **Requisito crítico:** el arquetipo de la biblioteca sale limpio y sin deuda, porque la deuda de un arquetipo se copia en cada app que nace de él. Puerta propuesta: `debt.json` vacío, `quality` en verde y la comparativa de `comparison.md` sin defectos abiertos.
>
> Consecuencias:
>
> - AIDDbot adelgaza: la construcción al vuelo, `ecosystems.md`, `oxlint.boundaries.json` y el stack de D32 pasan al Builder. `architect-system-foundation` se queda en elegir o delegar, y fundar.
> - El Blueprint (plantilla `AGENTS.md` de proyecto, specs fundacionales, contrato de fronteras como concepto) tiene un solo dueño: AIDDbot, que se lo pasa al Builder como entrada. La dependencia va en un solo sentido.
>
> **Banco de pruebas (3 oct):** un arquetipo suelto no demuestra nada, porque las specs fundacionales son contratos entre proyectos. Por ejemplo, la página `/health` del front necesita `/api/health` del back, y `basic-auth` cruza los tres proyectos. Un front en Angular puede pasar `lint` y `unit` y no cumplir el contrato. Por eso el Archetype Builder nunca construye un arquetipo para Archetype Base solo: lo construye dentro de un banco con:
>
> - el arquetipo nuevo;
> - los arquetipos de referencia de Archetype Base para los otros tipos;
> - una **suite de conformidad**: los tests e2e de las cuatro specs fundacionales, fija y versionada con el Blueprint.
>
> Todos los arquetipos se miden contra los mismos tests; un `e2e` nuevo se valida contra el back y el front de referencia. En el repo de un usuario no hace falta: la fundación construye todos los proyectos a la vez y la `e2e` del sistema hace de banco.
>
> **Inclinación por el mono repo:** el banco favorece un único repo para Archetype Base, porque reúne el arquetipo nuevo, los de referencia y la suite. Así una sola ejecución lo valida todo, el catálogo declara una sola versión del Blueprint, un cambio en la suite o en el Blueprint muestra a la vez qué arquetipos rompe, y el tema de marca (P22), `oxlint.boundaries.json` y el stack de D32 viven en un solo sitio. Quien solo quiera un arquetipo copia su subcarpeta (`npx degit AIDDbot/archetype-base/archetypes/{arquetipo}` o un sparse checkout), y AIDDbot puede hacerlo por el usuario.
>
> **Método de construcción: ATDD desde la suite (3 oct).** En Archetype Base, el Builder trabaja de fuera hacia dentro. La suite de conformidad es la especificación ejecutable del Blueprint, y `e2e` con Playwright es fijo.
>
> 1. **Suite primero, en rojo:** tests de las cuatro specs fundacionales, sacados solo de sus requisitos y de «Expected URLs and APIs».
> 2. **Back contra los tests de API:** `back-api` hasta que los tests HTTP de la suite pasan; no necesita front.
> 3. **Front contra los tests de UI:** con el back de referencia ya en verde.
> 4. **Terminado cuando su parte de la suite está en verde;** después, pases de crafting hasta cero deuda.
>
> Condición crítica: la suite no depende de ninguna tecnología. Los tests de UI usan solo roles y nombres accesibles (`getByRole`, `getByLabel`), nunca clases ni `data-testid`, y los puertos y URLs vienen del entorno (D35). Por eso las specs fundacionales tienen que fijar qué ve el usuario en cada página (roles y nombres accesibles), además de las URLs. Es un contrato nuevo del Blueprint, y da la vuelta al «fuera de alcance» del plan: los selectores salen de la spec, no de las páginas.
>
> Riesgo: que la suite quede ajustada a la primera implementación. Antes de congelarla, tiene que pasar sin retoques con dos implementaciones distintas, por ejemplo el front sin framework de `claude-4` o `codex-5` y `front-standard`. Material de partida: los e2e de `claude-4` y `codex-5`, y los de `e2e-playwright` sin muestras.
>
> Idea para más adelante: una pieza parecida para analizar brownfields legacy.

Queda abierto:

- Cómo llega el Builder al repo del usuario: lo instala `aiddbot init` o AIDDbot lo trae cuando hace falta.
- Cómo se versiona el Blueprint entre AIDDbot y el Builder.
- La forma de la biblioteca: inclinación por el mono repo (ver arriba). Falta confirmarlo y decidir si los arquetipos se versionan juntos o cada uno con su etiqueta (`back-express@1.2`).
- Quién es el dueño de la suite de conformidad: es la forma ejecutable de las specs fundacionales (Blueprint, AIDDbot), pero está escrita en Playwright. Propuesta: vive en Archetype Base junto al `e2e` de referencia y declara qué versión del Blueprint cumple.

## ✅ P22 · ¿Qué capa visual usa el `front-web`?

El humano quiere el mismo CSS en todos los fronts: Pico CSS (minimalista, pocas clases) con sus colores y su tipografía de marca personal. `front-standard` ya lo tiene (`styles/vendor/pico.min.css`, `fonts.css`, `colors.css` con tokens `--ab-*`, `theme.css`, `custom.css`), pero el front construido al vuelo en los experimentos inventa su propio CSS.

Propuesta: la marca no entra en AIDDbot, que es genérico para cualquiera que lo adopte. AIDDbot solo dice que el `front-web` toma su capa visual (CSS base, tokens y fuentes) del arquetipo o de un design system declarado. Pico con la marca vive fuera de AIDDbot (P21): la aplican el Archetype Builder y los arquetipos de Archetype Base.

> **R:** Opción C: Pico neutro más una capa de tema aparte.
>
> - El arquetipo de front trae Pico y una sola hoja de tokens con valores neutros, mapeados a las variables de Pico (`--pico-primary`, fuentes, radio) en lugar de tokens `--ab-*` paralelos.
> - La marca es un tema intercambiable (colores, fuentes y logo) que vive en el repo de arquetipos y que la construcción al vuelo aplica por defecto. Cambiar de marca es sustituir un fichero de tokens.
> - Los efectos de `custom.css` (mallas, brillos, degradados) quedan fuera de la base; si se quieren, entran en el tema como algo opcional.
> - Fuentes: Roboto, Audiowide y Anonymous Pro vienen de Google Fonts con licencia OFL y se pueden redistribuir en un repo público. La OFL pide incluir su licencia junto a los ficheros: hoy `styles/vendor/fonts/` no la lleva.

## ✅ P23 · ¿Cómo se agrupan `shared` y las features cuando crecen?

Evidencia: en `claude-6`, `back/src/shared` tiene 22 ficheros planos tras solo cuatro specs. El Blueprint dice qué va en `shared`, pero no cómo se ordena; las carpetas por capa estaban prohibidas (D42 original, sustituido por D39) y las carpetas por tipo (`utils/`, `helpers/`) son el cajón de sastre.

Propuesta: agrupar `shared` por tema técnico; agrupar las features por el dominio de sus specs cuando sean muchas; y un aviso de tamaño de carpeta en el núcleo que alimente la deuda.

> **R:** Sí, con estos ajustes:
>
> - **`shared` por tema técnico.** Regla en STE: *Group the files of `shared` in folders by technical concern. Name each folder with a noun for its concern. Never use `utils`, `helpers`, `common` or `misc`. Primitives stay at the root of `shared`.* Ejemplo en `back`: `http/` (middlewares), `logging/`, `database/`; primitivas (`numbers`, `text`, `types`, `errors`…) en la raíz.
> - **Sin regla de «un solo usuario → a la feature».** Al empezar se crean utilidades por si acaso y como ejemplo de cómo hacerlo; esa regla las expulsaría.
> - **Features por dominio, también en `e2e`.** Con muchas features: `features/{domain}/{feature}`, con el `domain` que ya llevan las specs. La regla de la facade sube un nivel: entre dominios, solo por la facade. Al principio la lista plana se lee mejor.
> - **Aviso de tamaño como regla de craftsmanship.** No es de oxlint (mira ficheros, no carpetas): chequeo del núcleo sobre el sistema de ficheros, agnóstico de la tecnología. `WARN` si una carpeta de `shared` o `features` tiene más de N entradas directas (N = 12 por defecto, en `config.json`). No bloquea: `scan-quality` lo registra como deuda y `/craft-lasting-quality` lo resuelve con una spec `refactor` que agrupa.
> - **Cuándo:** periodo de refactor, después de la 0.2.3; probarlo en una hornada.
