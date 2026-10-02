# Columbus — experimentos

Guion y prompts para cada prueba de la fase 6. Cada prueba se ejecuta en `C:/code/aidd/experiments/columbus/{prueba}/` (por ejemplo `codex-2`, `claude-1`, `codex-go-1`): ahí se leen el diario, las specs, los `AGENTS.md`, `config.json` y la transcripción. Su resumen va a `notes.md`.

## 0 · Preparar

En una carpeta vacía, fuera de este repo, instalar **desde la copia local** (el `main` local va por delante de `origin`):

```bash
mkdir C:/code/aidd/experiments/columbus/{prueba} && cd C:/code/aidd/experiments/columbus/{prueba}
node C:/code/aidd/AIDDbot/bin/aiddbot.js init
```

Para traer cambios a una prueba ya instalada: `node C:/code/aidd/AIDDbot/bin/aiddbot.js update`.

Comprobar que existen `.agents/skills/architect-system-foundation/assets/foundation/` y `project.AGENTS.template.md`.

## 1 · Fundación

Elegir un prompt. En Claude Code se invoca `/architect-system-foundation`; en Codex, `$architect-system-foundation`.

### A · JS/TS sin negocio (base)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar el scaffold. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api con Hono, front-web con Vue, e2e con Playwright. Rechazo los arquetipos del catálogo: créalos al vuelo para esas tecnologías.
```

### B · Go sin front (agnosticismo)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar que el Blueprint no depende de la tecnología. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api en Go con net/http, e2e con Playwright. Sin front. Rechazo los arquetipos del catálogo: créalos al vuelo.
```

### C · Angular (frameworks con convenios propios, D27)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar el scaffold con un framework con convenios propios. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api con Hono, front-web con Angular, e2e con Playwright. Rechazo los arquetipos del catálogo: créalos al vuelo.
```

### F · Sin framework, con la tecnología de los arquetipos propios

```text
usa la skill $architect-system-foundation en modo YOLO. Para:
Sistema de prueba sin funcionalidad de negocio: solo la fundación.
Propósito: validar el scaffold.
Usuarios: un operador genérico, así que incluye basic-auth.
Proyectos: back-api con Node y Express; front-web con HTML, CSS y TypeScript modernos sin framework, servido con Vite; e2e con Playwright.
Rechazo los arquetipos del catálogo: créalos al vuelo para esas tecnologías.
```

Sin framework que guíe, el router y los componentes los construye el agente desde el Blueprint. Comparar el resultado con `back-express` y `front-standard` sin que los copie: material para la fase 5. Vigilar: router y componentes sobredimensionados; `start` sin build (`vite`).

### D · Interactivo (D25)

```text
/architect-system-foundation Sistema de prueba sin funcionalidad de negocio: solo la fundación.
```

Sin YOLO: debe preguntar por propósito, usuarios, proyectos y cada elección técnica abierta, una pregunta cerrada cada vez, ofreciendo primero el arquetipo o la opción habitual. Anotar cuántas preguntas hace y si alguna sobra.

### E · Catálogo (arquetipos propios, tras la fase 5)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api, front-web y e2e con los arquetipos del catálogo.
```

## 2 · Comprobar a mano

```bash
cat back/AGENTS.md                                # siete secciones, sin huecos {…}
node .agents/aidd/aidd.mjs config get projects    # todas las ranuras o {"na": …}
node .agents/aidd/aidd.mjs run lint
node .agents/aidd/aidd.mjs run acceptance
git log --oneline --graph
```

- **Canario:** en `back`, hacer que `features/health/data` importe algo de `core`; `run lint` **debe fallar**. Deshacer.
- `system.md` coincide con lo instalado (tecnologías y cambios de YOLO).
- Tres commits por proyecto en el scaffold (`generate`, `shape to blueprint`, `register tooling`).
- Specs `configuration`, `monitoring`, `health` y `basic-auth` en `shipped`.

## 3 · Negocio (solo si la fundación sale limpia)

```text
/build-requested-spec YOLO los operadores pueden dar de alta un cohete con nombre y capacidad, y listarlos
```

El diff no toca tooling, `config.json` ni el arranque; solo registra la funcionalidad en el manifiesto.

## 4 · Calidad (opcional)

```text
/craft-lasting-quality
```

```text
/craft-lasting-quality actualiza las dependencias
```

## 5 · Entregar

Nada que copiar si la prueba se ejecutó en `C:/code/aidd/experiments/columbus/{prueba}/`. Si no, copiar ahí:

- `.aiddbot/` (diario, `config.json`, `runs/`), `.product/`, `AGENTS.md` raíz y el `AGENTS.md` de cada proyecto.
- La transcripción de la sesión del arnés.
- Una línea con lo que hubo que hacer a mano, si algo.

| Prueba | Arnés | Prompt | Versión | Resultado |
| --- | --- | --- | --- | --- |
| `codex-1` | Codex | A (con Vite+) | `8bf7915` | S0001–S0002 shipped; S0003 a medias por tokens |
| `codex-2` | Codex (Sol 6.1 light) | A | D25–D31 | Cuatro specs shipped en 54 min, verde, sin intervención; 3 deudas |
| `codex-3` | Codex | A sin herramientas | D25–D33 | Cuatro specs en 36 min, sin intervención; stack D32; reparó D0002 por su cuenta (S0005, v0.5.1); cierre verde a los 41 min |
