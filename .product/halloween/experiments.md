# Halloween — experimentos

Guion y prompts de la fase 3.2. La prueba se ejecuta en `C:/code/aidd/experiments/cli-1/`: ahí se leen el diario, las specs, los `AGENTS.md`, `config.json` y la transcripción. Su resumen (3.3) va a `notes.md`.

## cli-1 · Archetype CLI a las 7 capacidades

Un sistema de trabajo (D20) que parte de Archetype CLI v0.3.13 y recibe las specs genéricas del Builder, una a una, con un `craft` después de cada spec (D19). Es también la primera prueba real de AIDDbot v0.3.17: el trío de la spec, los tipos `api`/`web`/`cli`/`e2e` (D17), la ranura `test` con `type` en la config (D18) y el `craft` por prioridad (D19).

### 0 · Preparar

```bash
mkdir -p C:/code/aidd/experiments/cli-1 && cd C:/code/aidd/experiments/cli-1
node C:/code/aidd/AIDDbot/bin/aiddbot.js init
mkdir foundation-0.4
cp C:/code/aidd/archetype-builder/blueprint/foundation/{configuration,monitoring,shell,about,health,presentation}.spec.md foundation-0.4/
git add -A && git commit -m "chore: foundation 0.4 spec files from the Archetype Builder"
```

Las specs se copian dentro del sistema porque el agente no lee fuera de su carpeta. `users` no se copia: un `cli` local no tiene usuarios.

### 1 · Fundación desde Archetype CLI

```text
usa la skill $architect-system-foundation en modo YOLO. Para:
Sistema de prueba sin funcionalidad de negocio: solo la fundación.
Propósito: un sistema de trabajo que parte de Archetype CLI tal como está en el catálogo.
Usuarios: un operador local, sin cuentas.
Proyectos: cli y e2e con Archetype CLI del catálogo.
```

No nombrar las 7 capacidades en el propósito: el agente las lee como requisito de la fundación y para, porque la biblioteca solo trae 3 (D5). Ocurrió en el primer intento.

Vigilar:

- Copia `cli/`, `e2e/`, `foundation/` y `model/` en la etiqueta `v0.3.13`, sin `upgrade` ni cambios de código.
- `config.json`: cada proyecto con `type` (`cli`, `e2e`) y las ranuras `lint`, `format`, `upgrade`, `test`, `start`, `quality`; sin `unit` ni `acceptance`.
- El cierre: `run lint` y `run test` en verde. `run test` ejecuta el `cli` y después el `e2e` (3 tests de core y 6 de aceptación).
- Las instancias son `S0001`–`S0003`; la primera spec nueva será `S0004`.

### 2 · Cada spec, con su craft

Para cada spec, en este orden: `configuration`, `monitoring`, `shell`, `about`, `health`, `presentation`.

**a · Entregar:**

```text
usa la skill $build-requested-spec en modo YOLO. Para:
Entrega la spec del fichero `foundation-0.4/{spec}.spec.md`.
```

**b · Reparar la deuda:**

```text
usa la skill $craft-lasting-quality en modo YOLO.
```

**c · Comprobar a mano:** `node .agents/aidd/aidd.mjs debt list` sin items abiertos. Si queda deuda, parar y avisar: no se empieza la spec siguiente (D19).

Vigilar en cada spec:

- `spec.md` con el trío: Problem, Solution (lista corta por proyecto) y Verification (requisitos EARS con `Test:` en línea, y Expected URLs and APIs). Solo las filas de `cli` y `e2e`, requisitos renumerados sin huecos.
- Las regresiones que una spec nueva contradice, y su triaje en `build-requested-spec`:
  - `monitoring`: `S0003-R01` (fallo del almacén) pasa a código 3.
  - `shell`: `S0002-R01` (comando desconocido) pasa a código 2, con la ayuda.
  - `about`: `--version` sale de `configuration`; el test de `S0001-R01` sigue en verde.
- `configuration`: `CONFIG_FILE` relativo a la carpeta del proyecto, sin excepción; `config get` con el origen de cada valor.
- `shell`: el contrato de salida (`--json`) cambia todos los comandos; ningún comando escribe en stdout por su cuenta.
- `presentation`: `health runs` con `--limit` y `--offset`; tablas y `{label}: {value}` desde `core`, nunca desde una feature.
- `craft`: repara por prioridad (`high`, `medium`, `low`) y para en 5 specs. Anotar cuántas pasadas necesita cada spec.
- Tiempo de cada spec y de cada `craft`.

### 3 · Al final

```bash
node .agents/aidd/aidd.mjs run lint
node .agents/aidd/aidd.mjs run test
node .agents/aidd/aidd.mjs debt list
cd cli && npm start --silent -- --help && npm start --silent -- --version && npm start --silent -- config get && npm start --silent -- health runs --json
```

**Hecho cuando** (plan, fase 3): el `cli` responde a `--help`, `--version`, `--json` y `config get|set`, muestra listas y registros con las primitivas de `presentation`, pasa la suite de aceptación, y la deuda es cero. Después, el resumen (3.3) y la decisión de hacer el seed de Archetype CLI 0.4 desde este sistema.
