# Halloween — experimentos

Guion y prompts de la fase 3.2. La prueba se ejecuta en `C:/code/aidd/experiments/halloween/cli-1/`: ahí se leen el diario, las specs, los `AGENTS.md`, `config.json` y la transcripción. Su resumen (3.3) va a `notes.md`.

## cli-1 · Archetype CLI 0.4 desde sus specs

Un sistema de trabajo (D20) que sigue `procedure.md` del Builder desde el paso 1: scaffold vacío con el generador oficial, y todo el código sale de las 6 specs genéricas, entregadas una a una con un `craft` después de cada una (D19). No parte de ninguna biblioteca: una biblioteca nace de sus specs; un sistema de usuario recibe la fundación hecha.

Es también la primera prueba real de AIDDbot v0.3.17: el trío de la spec, los tipos `api`/`web`/`cli`/`e2e` (D17), la ranura `test` con `type` en la config (D18) y el `craft` por prioridad (D19).

> Primer intento (descartado): partió de Archetype CLI v0.3.13 con `$architect-system-foundation`. La fundación trajo hecho `configuration`, `monitoring` y `health`, y las specs nuevas quedaron como deltas sobre código que ninguna spec entregó.

### 0 · Preparar (PowerShell)

```powershell
Remove-Item -Recurse -Force C:\codeidd\experiments\halloween\cli-1
New-Item -ItemType Directory C:\codeidd\experiments\halloween\cli-1 | Out-Null
Set-Location C:\codeidd\experiments\halloween\cli-1
node C:\codeidd\AIDDbotiniddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\codeiddrchetype-builder\procedure.md builderCopy-Item -Recurse C:\codeiddrchetype-builderlueprint buildergit add -A; git commit -m "chore: Archetype Builder procedure and blueprint"
```

`builder/` lleva el procedimiento y el Blueprint dentro del sistema: el agente no lee fuera de su carpeta, y la prueba queda fija aunque el Builder cambie.

### 1 · Pasos 1–3 del procedimiento

```text
Sigue `builder/procedure.md`, pasos 1, 2 y 3, en modo YOLO. AIDDbot ya está instalado.
La biblioteca: Archetype CLI, una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".
No ejecutes $architect-system-foundation. Al terminar el paso 3, para.
```

Vigilar:

- `system.md` con los dos proyectos y sus tipos; la identidad en el `package.json` raíz.
- Por proyecto, tres commits: `generate` (salida del generador, sin tocar), `shape to blueprint` y `register tooling`. Ningún código funcional: ni configuración, ni comandos, ni tests de aceptación.
- `config.json`: `type` en cada proyecto; ranuras `lint`, `format`, `upgrade`, `test`, `start`, `quality`. En `e2e`, `test` = tests de su `core` y después Playwright.
- La prueba de fronteras: un import prohibido hace fallar `lint`, y se quita.
- El `test` de `e2e` sin tests de aceptación todavía: Playwright falla con «No tests found» salvo `--pass-with-no-tests`. Ver cómo lo resuelve.
- `$outline-system` escribe el `AGENTS.md` raíz y `.product/model/`.

### 2 · Cada spec, con su craft

Para cada spec, en este orden: `configuration`, `monitoring`, `shell`, `about`, `health`, `presentation`. `users` no: un `cli` local no tiene usuarios.

**a · Entregar:**

```text
usa la skill $build-requested-spec en modo YOLO. Para:
Entrega la spec del fichero `builder/blueprint/foundation/{spec}.spec.md`.
```

**b · Reparar la deuda:**

```text
usa la skill $craft-lasting-quality en modo YOLO.
```

**c · Comprobar a mano:** `node .agents/aidd/aidd.mjs debt list` sin items abiertos. Si queda deuda, parar y avisar: no se empieza la spec siguiente (D19).

Vigilar en cada spec:

- `spec.md` con el trío y solo las filas de `cli` y `e2e`, requisitos renumerados sin huecos. Ya no hay requisitos repetidos de una fundación anterior.
- El código sale de la spec: `core`, `shared` y features nuevos, sin nada heredado.
- `configuration`: `CONFIG_FILE` relativo a la carpeta del proyecto, sin excepción; `config get` con el origen de cada valor; migraciones.
- `monitoring`: códigos 1, 2 y 3; el log diario de cada invocación.
- `shell`: el contrato de salida (`--json`); ningún comando escribe en stdout por su cuenta.
- `presentation`: `health runs` con `--limit` y `--offset`; tablas y `{label}: {value}` desde `core`, nunca desde una feature.
- `craft`: repara por prioridad y para en 5 specs. Anotar cuántas pasadas necesita cada spec.
- Tiempo de cada spec y de cada `craft`.

### 3 · Al final

```powershell
node .agents/aidd/aidd.mjs run lint
node .agents/aidd/aidd.mjs run test
node .agents/aidd/aidd.mjs debt list
Set-Location cli; npm start --silent -- --help; npm start --silent -- --version; npm start --silent -- config get; npm start --silent -- health runs --json
```

**Hecho cuando** (plan, fase 3): el `cli` responde a `--help`, `--version`, `--json` y `config get|set`, muestra listas y registros con las primitivas de `presentation`, pasa la suite de aceptación, y la deuda es cero. Después, el resumen (3.3) y el seed de Archetype CLI 0.4 desde este sistema (procedimiento, paso 5).
