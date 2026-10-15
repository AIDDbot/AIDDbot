# Quality gates: proceso para una sesión nueva

> Escrito 2026-10-15, al final de la sesión de reflexión. Leer entero antes de empezar.

> **No olvidar:**
> - **No publicar AIDDbot solo.** Sale junto con las librerías, o los sistemas se quedan sin lint.
> - **El comando para crear specs mínimas desde un ítem de deuda está por diseñar.**

## Estado

- 2026-10-15: paso 1 hecho en la rama `refactor/quality-gates` (core, skills y docs; `npm test` verde). Sin fusionar: sale con las librerías. Decisiones del paso 1 en el doc, sección "Step 1 decisions".
- Siguiente: paso 2 (tecnología base).

## Contexto

- **Referencia:** `docs/engineering/quality-gates.md` (commits d4df10e, e875d0c). Todo lo decidido está ahí. Si este fichero y el doc chocan, manda el doc.
- **Va en Halloween.** Sin compatibilidad hacia atrás: en beta, tierra quemada.
- **Una sola release:** AIDDbot y las librerías salen juntos en el mismo `major.minor`. Si AIDDbot quita su lint antes de que las librerías traigan el hook de la tecnología, un sistema se queda sin lint. **No publicar AIDDbot solo.**
- Las skills se cambian solo con `/maintain-skills` (AGENTS.md raíz).

## Decisiones (resumen)

1. Lint básico y formato salen de AIDDbot. Los pone la tecnología en su pre-commit.
2. `implement-project`: unitarios afectados; si el hook falla, arregla al vuelo.
3. `verify-behavior`: e2e afectados; si falla, triaje. Se deshace D33.
4. `review-implementation`: solo lo que no ven lint ni e2e (seguridad, accesibilidad…); solo deuda alta.
5. `ship-spec`: todos los unitarios y todos los e2e; triaje. Un marrón → deuda alta, y la spec se cierra.
6. Craft: alta → `fix`; sin alta, `quality` (capas, duplicados, tamaño de carpeta) → media → `refactor`; sin alta ni media, `harden` (complejidad) → baja → parche.
7. Ejes: el origen decide la definición (petición → spec aprobada; deuda → el ítem); el comportamiento decide verify (solo `feat`, `fix`).
8. `refactor`: spec mínima que crea el core desde el ítem; sin aprobación, verify ni revisión. El Builder ejecuta la regla de la deuda antes de entregar.
9. `fix` de deuda alta: spec mínima del core + aprobación humana del ítem (YOLO: automática); verify y revisión.
10. Parche: solo unitarios afectados; la regresión la atrapa el ship siguiente (riesgo aceptado).

## Paso 1: AIDDbot, en una rama

Rama: `refactor/quality-gates` (o la que toque). Commit pequeño por bloque.

### 1.1 Core (`.agents/aidd/`)

- `aidd.mjs`: uso de `run` → `run <upgrade|test|quality|harden> [--project <name>] [--spec | --changed]`.
- `commands/work.mjs`:
  - `RUN_KINDS` sin `lint` ni `format`; `NOT_EVIDENCE` sin `format`.
  - `--changed` solo para `test` (slot `test:files`).
  - Fuera la puerta de lint del commit ("Lint before you commit"), `rememberLint`, `lintStateFile` y el estado `aidd-lint.json`.
  - `quality` mantiene carpetas y duplicados; sus hallazgos son deuda media.
- `commands/release.mjs`: fuera la puerta "Run the full lint before you release". La regresión completa (unitarios + e2e) es la puerta. Admite un test que falla solo si un ítem de deuda alta lo registra (revisar cómo encaja con `--preexisting`).
- `commands/spec.mjs`: crear una spec mínima desde un ítem de deuda (`refactor` desde media, `fix` desde alta). Diseñar la forma del comando en la sesión.
- Tests: `test/commit.test.mjs`, `test/run.test.mjs`, `test/gate.test.mjs`, `test/spec.test.mjs`. Luego `npm test`.

### 1.2 Skills (vía `/maintain-skills`)

- `implement-project`: unitarios afectados (`run test --changed`); el hook de la tecnología arregla/falla al commit; en un refactor, ejecutar la regla de la deuda y dejarla en verde.
- `verify-behavior`: solo e2e afectados (`--spec`); no corre en `refactor` ni `chore`.
- `review-implementation`: alcance estrecho; solo deuda alta; no corre en `refactor`.
- `ship-spec`: sin paso de formato ni commit `style:`; regresión completa; marrón → deuda alta.
- `craft-lasting-quality`: orden alta → media → baja; specs mínimas; aprobación del `fix`; parche sin rama.
- `scan-quality`: modo `quality` (capas, duplicados, carpetas → media) y modo `harden` (complejidad → baja).
- `rule-project`: dejar de clasificar `lint`, `lint:files` y `format`.
- `build-requested-spec`, `build-ordered-specs`: revisar que el flujo salte verify/revisión según el tipo.
- `architect-system-foundation` (`references/scaffold.md`): fuera los slots de lint y formato.
- Después: `npm run adapt`.

### 1.3 Docs

`docs/engineering/features.md`, `docs/core.md`, `docs/principles/verification.md`, `docs/how-it-works.md`, `docs/AIDD.workflow.md`, `docs/principles/glossary.md`. Quitar la marca de borrador de `quality-gates.md` cuando todo encaje.

## Pasos siguientes (no empezar sin cerrar el 1)

2. **Tecnología base:** prueba corta de Vite+ y Bun (`C:\code\temp\viteplus`). Mirar: formato en la misma pasada, reglas de complejidad, estabilidad, hook de pre-commit. Pregunta 5 del doc.
3. **Builder** (`C:\code\aidd\archetype-builder`, `git fetch` antes): lint del commit = lo de serie de la tecnología con arreglos seguros; `oxlint.boundaries*.json` → `quality`; `oxlint.complexity.json` → `harden`; la spec 0 instala el hook.
4. **Librerías:** volver a sembrar `archetype-cli` y `archetype-base`. Aquí entran el renombrado D28 y el nombre de plataforma (`cli-node`/`cli-bun`).
5. **Ejecución real:** cli-9.
6. **Release conjunta** de AIDDbot y librerías.

## Abierto (no bloquea el paso 1)

- ¿Corre la revisión en un `chore`? (actualizar dependencias puede meter un fallo de seguridad).
- ¿El scaffold sigue siendo la spec 0 `chore`, o pasa a `vp create`/`bun create`?
- Preguntas 5 y 6 del doc: tecnología base; unitarios en el pre-commit (propuesta: no).

## Cómo arrancar

En la sesión nueva: "Lee `.product/halloween/quality-gates.prompt.md` y `docs/engineering/quality-gates.md`. Empezamos el paso 1.1."
