# Columbus: experimentos frente a arquetipos

Guion para que un agente (Codex) compare lo que genera la fundación con los arquetipos propios. Sirve para decidir la fase 5 de `plan.md`: si conviene mantener los arquetipos, rehacerlos desde los experimentos o generarlos siempre al vuelo.

## Cómo lanzarlo

Abre Codex en `C:/code/aidd` para que vea los tres árboles y pásale:

```text
Lee AIDDbot/.product/columbus/comparison.md y ejecuta la comparativa entera. Escribe el informe donde indica el guion. No modifiques nada más.
```

## Reglas para el agente

- **Solo lectura.** No edites, formatees, instales ni commitees nada en `archetypes/` ni en `experiments/`. La única excepción es el canario del criterio 2, que se deshace en el acto.
- Puedes ejecutar `npm run lint`, `npm test`, `npm run quality:all` (o el script equivalente de cada proyecto) y los tests de Playwright. Nunca ejecutes `fix`, `format` ni `npm install`.
- Al terminar, `git status` debe quedar limpio en cada repo de arquetipo y de experimento, salvo los ficheros que ya ignoran (`coverage/`, `logs/`, `test-results/`, informes).
- No toques los skills de AIDDbot. Si algo apunta a una mejora del Blueprint o de un skill, anótalo en el informe como propuesta.
- Cada afirmación del informe cita un fichero, un comando o una salida. Si algo no se puede comprobar, se dice «sin comprobar».
- Escribe el informe en español.

## Entradas

| Rol | Ruta |
| --- | --- |
| Arquetipos (referencia actual) | `C:/code/aidd/archetypes/{back-express, front-standard, e2e-playwright}` |
| Experimento principal 1 | `C:/code/aidd/experiments/columbus/claude-4` (prompt F) |
| Experimento principal 2 | `C:/code/aidd/experiments/columbus/codex-5` (prompt F, si ya existe y la fundación está cerrada) |
| Experimentos secundarios | `codex-2` y `codex-3` (prompt A: Hono + Vue). Úsalos solo para el back y para ver tendencias |
| Contrato funcional | `{experimento}/.agents/skills/architect-system-foundation/assets/foundation/*.spec.md` |
| Contrato técnico | `{experimento}/.agents/skills/architect-system-foundation/assets/project.AGENTS.template.md` y `oxlint.boundaries.json` |
| Decisiones | `AIDDbot/.product/columbus/decisions.md` (D2–D6, D12, D24, D29, D32, D33, D35) y `principles.md` |

Parejas que se comparan (los nombres de carpeta del experimento varían; usa `.product/system.md` para identificar el tipo de cada proyecto):

| Arquetipo | Proyecto del experimento | Tipo |
| --- | --- | --- |
| `back-express` | `api` o `back-api` | `back-api` |
| `front-standard` | `web` o `front-web` | `front-web` |
| `e2e-playwright` | `e2e` | `e2e` |

### Diferencias conocidas que no penalizan

- Los arquetipos llevan **muestras** (`home`, `item-detail`, `content`, `register`…). La fundación no las genera. Las métricas de tamaño se calculan **sin muestras**, que se listan aparte.
- `front-standard` sirve el front con un servidor Express propio (`src/server`); el prompt F usa Vite. Compara el resultado, no el mecanismo.
- Los contratos fundacionales cambiaron respecto a los arquetipos: `health` añade `status: "ok"`, la página de salud es `/health` (no `/about`), la BD usa `DATABASE_URL` (no `DB_PATH`) y un `PORT` inválido detiene el arranque. Anótalos como «arquetipo desfasado», no como defecto del experimento.

## Criterios

Para cada pareja y criterio, emite un veredicto: **A** (arquetipo mejor), **=** (equivalentes) o **E** (experimento mejor), con su evidencia.

### 1 · Contrato fundacional

Recorre cada requisito (`R01`, `R02`…) de `configuration`, `monitoring`, `health` y `basic-auth`, y marca para cada lado: cumple, parcial, no cumple o no aplica. Localiza el código y el test que lo prueban. Revisa también la sección «Expected URLs and APIs»: ¿responde cada URL y cada API como se declara?

### 2 · Arquitectura y fronteras

- `main` → `core` → manifiesto → funcionalidades; las funcionalidades se usan solo por su fachada; `shared` sin negocio; capas `presentation` → `logic` → `data` (D2–D6, D24, D33).
- Mapa de carpetas real frente al de la plantilla del proyecto.
- **Canario:** en cada proyecto con capas, añade en `{feature}/data` un import de `core`, ejecuta `lint`, anota si falla y deshaz con `git checkout -- <fichero>`. Comprueba `git status` justo después.
- Front: dónde viven los componentes, el router (como manifiesto) y `fetch` (en `data`). Señala routers o componentes sobredimensionados.

### 3 · Stack y tooling (D1, D32)

- TypeScript 7, oxlint con tipos (`oxlint-tsgolint`) y reglas de fronteras, oxfmt y `node --test`.
- Scripts por ranura: `lint`, `unit`, `acceptance`, `quality`, `format` y `upgrade`. En el experimento, compáralos con `.aiddbot/config.json`.
- Dependencias de producción y de desarrollo: cuántas y cuáles sobran.

### 4 · Tests

- Número de tests por tipo (unit, aceptación, e2e). Ejecútalos y anota si pasan y cuánto tardan.
- Cobertura, si el proyecto la mide.
- En `e2e`: ¿cubren las URLs y APIs declaradas? ¿Hay puertos escritos a mano (D35)? ¿Hay tags de requisito (`@S0001-R01`)?

### 5 · Tamaño y complejidad

Sin muestras y sin tests: número de ficheros y líneas de código por proyecto. Salida de `quality` (complejidad y avisos). Una tabla con las dos columnas.

### 6 · Calidad del código (lectura)

Naming, duplicación, sobreingeniería, contrato de error uniforme, mínimos de seguridad (D35: contraseñas, cabeceras, CORS, secretos), logs. Señala de cada lado las tres mejores piezas y los tres peores defectos, citando el fichero.

### 7 · Documentación para agentes

Los arquetipos no tienen `AGENTS.md` (sería la fase 5): compara su `README.md` con el `AGENTS.md` de cada proyecto del experimento. ¿Podría un agente empezar a trabajar sin explorar el código?

### 8 · Deuda conocida

Resume `{experimento}/.product/quality/debt.json` (severidad y tema). Para cada deuda, indica si el arquetipo tiene el mismo problema.

## Informe

Escríbelo en `C:/code/aidd/AIDDbot/.product/columbus/comparison.report.md`, con esta estructura:

1. **Veredicto** (máximo diez líneas): por pareja, A / = / E, y una recomendación para la fase 5 entre:
   - **Mantener:** los arquetipos siguen siendo mejores; se les añade el `AGENTS.md` y se retiran las muestras (plan original).
   - **Rehacer:** se reconstruyen los arquetipos partiendo del mejor experimento, limpiado.
   - **Retirar:** el catálogo sobra y la fundación genera siempre al vuelo (principio 6).
2. **Tabla resumen:** criterios 1–8 × parejas, con A / = / E.
3. **Detalle por criterio**, con las evidencias.
4. **Lo que el arquetipo tiene y el experimento no:** material para mejorar el Blueprint o las specs fundacionales.
5. **Lo que el experimento tiene y el arquetipo no.**
6. **Propuestas** para AIDDbot (skills, plantillas, decisiones), cada una con su evidencia. Son propuestas: no se aplican.
7. **Sin comprobar:** lo que no se pudo verificar y por qué.

No commitees el informe: lo revisamos antes.
