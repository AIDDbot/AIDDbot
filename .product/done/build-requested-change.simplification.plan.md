# Plan de implementación: simplificar la documentación y entrega de cambios

## Encargo para el modelo implementador

Implementa este diseño en los skills y en su documentación pública. El alcance es **exclusivamente prospectivo**: los nuevos proyectos y cambios usarán el nuevo contrato. No construyas migraciones, lectores duales, aliases, adaptadores ni compatibilidad con documentación de proyectos antiguos. Este archivo es un plan de trabajo, no evidencia de que el diseño ya esté implementado.

Lee primero `AGENTS.md`, el [informe del comportamiento anterior](./build-requested-change.informe.md), este plan y los skills afectados. Toda edición bajo `.agents/skills/` debe seguir [skillify](../.agents/skills/skillify/SKILL.md) y su plantilla. Conserva la separación entre orchestrators, workers y primitives y los roles Architect, Builder y Craftsman. No conviertas esta simplificación documental en una reescritura del instalador o de los adaptadores.

El entregable es un contrato coherente que otro agente pueda ejecutar: cambios, plantillas, enlaces, catálogo, documentación y comprobaciones alineados. No basta con renombrar rutas.

## 1. Decisiones cerradas

- Dos entidades principales: **change**, intervención que se entrega, y **spec**, contrato duradero. Un cambio puede afectar cero, una o varias specs; una spec puede evolucionar en muchos cambios.
- Planes y evidencia pertenecen siempre al cambio. Nunca a la carpeta de una spec.
- Un cambio directo produce `change.md` y `report.md`; si necesita planificación produce también `plan.md`. El reporte se crea al obtener evidencia, no como requisito vacío para iniciar trabajo.
- Se conserva el nombre y la ruta `specs/PRD.md`: será el índice compacto de specs funcionales y técnicas, generado mecánicamente desde ellas, sin estados ni taxonomía propios ni mantenimiento manual.
- Desaparecen categorías y tags obligatorios. La identificación del contrato propietario se apoya en el alcance, reglas, criterios y referencias existentes.
- Se eliminan del cambio `origin`, `kind`, `intent`, `complexity` y `stages`. Las comprobaciones necesarias se expresan directamente y una sola vez.
- Solo el cambio tiene estado de entrega: `open`, `released` o `cancelled`. `ready` se deduce de la evidencia; un impedimento mantiene el cambio `open`.
- Las correcciones pueden tener plan si requieren coordinación. Los cambios técnicos pueden necesitar E2E si su impacto lo requiere. Son cambios deliberados respecto de la política anterior.
- Se mantienen aprobación del contrato salvo YOLO autorizado, criterios trazables, evidencia vigente, escritor único para archivos compartidos e índice Git, y release reanudable sin duplicar versiones.

## 2. Estructura y nomenclatura

```text
{Product_Folder}/
├── arch/
├── model/
├── specs/
│   ├── PRD.md            # Índice generado; entrada al descubrimiento
│   ├── F001-pagos.md
│   └── T001-autenticacion.md
├── changes/
│   └── C001-mejorar-pagos/
│       ├── change.md
│       ├── plan.md       # Opcional
│       └── report.md
└── findings.md           # Solo si hay hallazgos duraderos
```

Definir en la plantilla del `AGENTS.md` consumidor:

- `change_key = C{nnn}-{slug}`; `spec_key = F{nnn}-{slug}` o `T{nnn}-{slug}`. Contadores independientes por prefijo, con al menos tres dígitos y sin límite de 999.
- Slugs en minúsculas y kebab-case; clave estable aunque cambie el título. El prefijo distingue contrato funcional y técnico; no añadir otra propiedad `kind` a la spec.
- Rama única de entrega: `change/{change_key}`. El nombre de rama no se repite en el documento.
- Identidad tomada del nombre del archivo/carpeta. Reservar IDs sin colisiones entre trabajos abiertos; nunca reutilizarlos. La política de asignación no exige crear un registro central adicional.
- Criterios duraderos: `AC-F001.1` o `AC-T001.1`; criterios exclusivos de intervención: `AC-C001.1`. No renumerar ni reutilizar criterios retirados.

`{Product_Folder}` sigue siendo configurable. Mantener `arch/` y `model/` y sus contratos actuales; solo sacar de `arch/` el registro de hallazgos. No generar carpetas vacías para artefactos opcionales.

## 3. Descubrimiento selectivo mediante el PRD

### Contenido que hace localizable una spec

Cada spec comienza con su título y una sección `Scope` de una o dos frases breves que describe la capacidad o regla de la que es propietaria: actores cuando apliquen, operación, entidades y límites. Es texto del contrato, no una taxonomía aparte. Las políticas transversales explicitan a qué se aplican en ese alcance. Mantener `Out of scope`, reglas o decisión, solución y criterios observables. Añadir enlaces a contratos relacionados únicamente cuando exista una dependencia real.

Ejemplo de alcance de `F001-pagos.md`: «Creación, confirmación y devolución de pagos de pedidos. Regula sus estados e importes; la emisión de facturas pertenece a otra capacidad».

### Índice generado, sin otro documento que redactar

`specs/PRD.md` contiene una fila por spec: enlace con ID/título y el texto breve de `Scope`. Incluye F y T. No copia criterios, planes, versiones, estados de cambios, categorías ni tags. La spec sigue siendo la fuente; corregir un resumen significa corregir su `Scope` y regenerar el PRD. Una retirada completa debe quedar indicada también en ese alcance para no ofrecer un contrato retirado como vigente.

Un pequeño helper local de `build-requested-change` extrae esos campos de forma determinista, sin llamadas a un modelo ni dependencias externas. Al consultar obtiene la vista actual sin modificar el árbol; después de modificar specs, el owner persiste la misma vista en su rama. Si el índice falta o está desactualizado, la consulta usa la vista recalculada, sin pedir al agente que lea todas las specs ni exigir fechas, hashes o estados nuevos en sus documentos. No reescribir el archivo cuando el contenido sea idéntico.

El recorrido mecánico de archivos para extraer encabezados es trabajo local: no introduce sus cuerpos en el contexto del modelo. Para un índice grande, filtrar la vista por conceptos y sitios afectados y devolver solo filas candidatas, con búsquedas adicionales cuando la evidencia lo justifique. No introducir un servicio de embeddings, base vectorial o catálogo manual para esta tarea.

### Procedimiento obligatorio antes de asignar una nueva spec

1. Consultar primero el índice compacto, o sus filas filtradas si es grande. Seleccionar candidatas por capacidad, entidades, acciones, sinónimos y sitios afectados; incluir políticas técnicas transversales aplicables. No abrir cada spec para volver a leer su alcance.
2. Leer únicamente las specs candidatas. Seguir enlaces a otros contratos solo cuando sus reglas o dependencias puedan verse afectadas por la petición. Contrastar con la arquitectura, código y tests de los sitios relevantes; usar referencias de criterios ya presentes para localizar propietarios.
3. Si quedan dudas de cobertura, hay referencias inesperadas o ninguna candidata convincente, ampliar primero la búsqueda en el índice y luego mediante `rg` sobre secciones pertinentes del repositorio. Leer los nuevos candidatos que aparezcan. No recorrer todos los cuerpos por defecto, tampoco para declarar una nueva capacidad. Distinguir quién posee la regla de dónde se implementa: compartir un contenedor no convierte dos capacidades en una misma spec.
4. Resolver por cada parte de la petición: **amend** si cambia un contrato existente; **reference** si solo debe cumplirse o restaurarse; **create** si necesita un contrato duradero sin propietario; **no spec** si basta con criterios propios de la intervención.
5. Si una petición cruza varios contratos, referenciar o enmendar todos ellos. No crear una spec general del cambio que copie los contratos afectados.
6. Registrar el resultado en la única sección de specs afectadas de `change.md`: enlace y una frase que explique la relación. Si se crea una spec, esa frase explica el límite que no cubren las candidatas. No añadir un informe separado de búsqueda.
7. Si hay propietarios solapados o evidencia insuficiente, resolver esa ambigüedad antes de crear otra spec; preguntar por la decisión de producto solo cuando el repositorio no permita resolverla.

**No encontrar un término no demuestra que la capacidad sea nueva.** Comprobar términos alternativos y propietarios de los sitios afectados antes de crearla, sin exigir una lectura exhaustiva de todas las specs. Si la implementación existe pero carece de contrato, crear una spec puede documentar comportamiento existente; no presentarlo como una funcionalidad nueva ni inventar requisitos. Dar por cerrado el descubrimiento cuando cada parte de la petición tenga propietario o una razón fundada para crear/no crear contrato, sin ampliar por rutina.

Ejemplos: ampliar devoluciones en una spec de pagos es `amend`; arreglar un cálculo contrario a su criterio es `reference`; introducir facturación fuera de su alcance puede ser `create`; ajustar un detalle local sin contrato duradero puede ser `no spec`. La operación se comunica al worker, pero no se duplica en frontmatter y tablas.

Este procedimiento debe estar en una referencia de descubrimiento de `build-requested-change`. El orchestrator entrega identidad y operación resueltas a `specify-spec`. Las invocaciones directas de primitivas que necesitan un cambio deben exigir ese contexto antes de escribir; no crear clasificaciones o ramas alternativas por su cuenta.

## 4. Contratos documentales mínimos

### `change.md`

Frontmatter obligatorio: `status: open` y `base: {commit completo}`. Solo al liberar se añade `release: {version}`. No persistir ID, slug, título, rama, origen, tipo, intención, complejidad, fecha de creación o última actualización: el nombre, el contenido y Git resuelven esos datos.

Secciones de la plantilla:

- `Objective and scope`: resultado, límites, sitios afectados y riesgos relevantes. Una frase explica si la ejecución es directa o requiere plan y por qué; no añadir otra bandera de modo.
- `Related specs`: enlaces y relación, solo si hay contratos afectados. Es la única lista de specs del cambio.
- `Acceptance criteria`: referencias a IDs duraderos y definición de criterios propios `AC-C...`. No copiar el texto de criterios de las specs. Enumerar todos los criterios necesarios para aceptar la intervención, incluida regresión relevante.
- `Checks`: tabla con control o criterio, método, resultado esperado y ejecutor (`codify`, `verify` o `qualify`). Las tareas proceden de aquí; no duplicarlas en `stages`.
- `Source`: referencia a petición o hallazgos, solo si aporta trazabilidad. En Craft fija el conjunto elegido para reanudar el batch.
- `Approval`: solo cuando se ha creado o modificado un contrato; una constancia para el conjunto revisado que identifique la revisión y la aprobación humana o autorización YOLO. No crear estados de aprobación por spec.
- `Blocker`: solo mientras exista un impedimento real, con su próxima acción. Para `cancelled`, registrar motivo en el cuerpo.

Crear un cambio y aprobar sus specs no equivale a tener evidencia de implementación. Cambiar requisitos, límites o criterios después de la aprobación exige revisar de nuevo el contenido afectado. Ajustes puramente editoriales no fuerzan otra aprobación.

### `specs/{spec_key}.md`

Sin frontmatter obligatorio. Título, `Scope`, problema/decisión, reglas o límites, solución y criterios. Mantener dos plantillas F y T por sus diferencias de contenido, sin `category`, `tags`, `status`, `base`, `branch`, `created` o versión de release.

En la rama principal, la spec representa el contrato vigente. En la rama del cambio se edita su propuesta; una spec nueva permanece en esa rama hasta integrar. Los criterios retirados mantienen ID, texto y motivo en `Deprecated criteria`; no exigen plan para autorizar la retirada de un test que haya dejado de representar un requisito aprobado. Una retirada completa conserva el archivo con una nota explícita y sustituto si existe.

### `plan.md`

Un archivo para el cambio completo: secuencia, dependencias, contratos compartidos, propietario único de cada archivo compartido y tareas con rutas y referencias a criterios. Secciones por contenedor o E2E cuando hagan falta. Sin metadatos duplicados, estados adicionales ni copias de specs.

Eliminar `keep/redo/drop` de planes de entregas anteriores. Un cambio empieza su propio plan; solo se actualiza el plan de ese mismo cambio si se replantea su ejecución. Puede planificarse un cambio sin specs: la entrada es `change.md`.

### `report.md`

Un único archivo con secciones `Implementation`, `E2E`, `Review` y `Findings`; omitir las secciones de comprobación que no se han requerido. Cada fila de evidencia identifica control/criterio, revisión evaluada, método o comando, resultado (`pass`, `fail`, `blocked`) y evidencia concreta. No persistir un estado global de reporte ni copiar la base que ya posee el cambio.

`codify` crea y actualiza su sección de implementación por contenedor; `verify` y `qualify` completan sus respectivas secciones. Ninguno sobrescribe resultados ajenos. Solo escribe un agente cada vez. La tabla `Checks` asigna cada obligación; el reporte demuestra su resultado. No duplicar evidencia técnica entre codify y qualify salvo que se requieran comprobaciones diferentes.

El archivo es común, pero los resultados conservan sus revisiones por control: así la escritura del reporte no altera retroactivamente qué código evaluó cada ejecutor. En una nueva comprobación se actualiza la evidencia del mismo control; Git conserva los intentos anteriores. Los hallazgos tienen anclas estables dentro del cambio y no se renumeran; fuentes duraderas pueden enlazar también la revisión del reporte.

### `findings.md`

Solo para asuntos que sobreviven a su corrección inmediata. Conservar identificación, origen y evidencia, alcance, regla incumplida, severidad cuando corresponda y enlace al cambio que los atiende. Usar `open`, `resolved` o `dismissed`; registrar motivo al descartar. La selección se deduce del enlace a un cambio abierto, sin estado `selected`. La resolución y la versión de entrega se consultan en el cambio, sin duplicar su versión en el hallazgo. Marcar `resolved` después del release; los hallazgos de un cambio cancelado siguen abiertos.

## 5. Política de ejecución y evidencia

El catálogo sigue siendo autoridad del routing; las referencias detallan las decisiones propias del skill. No mantener otra matriz paralela con combinaciones de propiedades.

1. **Siempre**: revisar impacto y riesgos, resolver contratos, fijar criterios y métodos, implementar con los checks técnicos aplicables y aportar evidencia.
2. **Plan**: requerido cuando hay pasos dependientes que necesitan orden explícito, coordinación entre contenedores/escritores, migración o reversión no trivial. Una reparación conocida y local puede ser directa. La palabra corrección nunca prohíbe planificar.
3. **E2E**: requerido para criterios funcionales afectados y para regresiones de flujos completos que el impacto exija. Craft conserva una verificación final del batch completo. Un cambio técnico puede requerir E2E de regresión; esos tests no sustituyen sus criterios técnicos específicos.
4. **Revisión técnica**: requerida ante arquitectura, contratos compartidos, esquemas, migraciones, dependencias, infraestructura, seguridad, privacidad, concurrencia, transacciones, accesibilidad, rutas sensibles al rendimiento o impacto transversal. Mantener las seis lentes actuales de qualify como guía de evaluación; registrar controles aplicables y justificar exclusiones no evidentes, sin seis filas vacías obligatorias.
5. **Criterios técnicos**: asignar a `codify` o a `qualify` según el método y la necesidad de revisión independiente. Eliminar la afirmación de que solo qualify puede probar una spec técnica.
6. **Reparación**: defecto corregible vuelve a Builder; un control imposible de ejecutar vuelve como impedimento. Si la reparación necesita plan o altera alcance/contratos, el owner actualiza esos elementos antes de continuar. No debilitar aserciones ni eliminar comprobaciones para conseguir un resultado favorable.
7. **Vigencia**: cambios semánticos en código, tests, configuración, criterios, contratos o reglas invalidan evidencia afectada. Repetir los controles afectados y la regresión completa que la política exija; si no puede determinarse el impacto, repetir los requeridos. Cambiar solo evidencia, fecha o metadatos de cierre no provoca un bucle de verificación.
8. **Reanudación**: leer cambio, plan si existe y reporte; deducir qué falta. No reiniciar por ausencia de un estado intermedio ni repetir evidencia vigente sin motivo. Nuevos riesgos añaden obligaciones; una reducción de alcance necesita decisión explícita y trazable.
9. **Entrega**: comprobar aprobación aplicable, todos los controles requeridos y su evidencia vigente; un control ausente o `blocked` impide liberar. Hallazgos `blocker` o `major` de revisión impiden liberar; `minor` no, salvo que incumplan un criterio obligatorio. Integrar, reconciliar arquitectura/changelog cuando corresponda y registrar una versión y un tag. Una resolución de conflictos que altere semántica obliga a renovar evidencia antes del release.
10. **Cierre reanudable**: conservar el mecanismo actual que detecta el release ya existente y completa solo tag o limpieza pendientes. No escribir estados ni versiones de entrega en las specs. `cancelled` no genera release.

Los comportamientos independientes de esta simplificación —aislamiento de datos de test, comprobación de identidad de procesos al liberar puertos, protección de la rama principal y seguridad Git— se mantienen.

## 6. Cambios por archivos y skills, en orden

### A. Contratos y configuración

- Actualizar `explore/assets/AGENTS.template.md` con claves, rutas, rama y estados únicos; ubicar allí las convenciones del consumidor.
- Sustituir `build-requested-change/assets/change.manifest.template.md` por `change.template.md` con el contrato mínimo.
- Actualizar las dos plantillas de `specify/assets/` con alcance descubrible y sin metadatos de entrega.
- Añadir el índice derivado a las convenciones de rutas y documentar su formato en la referencia de descubrimiento; no crear una plantilla que invite a mantenerlo manualmente.
- Reescribir `planify/assets/plan.template.md` para un cambio completo y eliminar `e2e.plan.template.md`.
- Crear `codify/assets/report.template.md` como esqueleto del reporte común y evidencia de implementación. Sustituir las plantillas de reportes completos de verify/qualify por plantillas locales de sus secciones. No duplicar el esqueleto del documento completo en tres skills.
- Respetar enlaces locales de assets/references: los workers enlazan skills ejecutables; cada primitiva enlaza sus propios recursos. No usar una copia del esquema como autoridad alternativa.

### B. Descubrimiento y especificación

- `build-requested-change/SKILL.md`: sustituir clasificación por delimitación, descubrimiento y comprobaciones; crear el cambio y conservar su rama; pasar las identidades y operaciones resueltas.
- Reemplazar `build-requested-change/references/triage.md` por referencias concisas de descubrimiento y evaluación de impacto. Sin combinatoria de campos eliminados.
- Añadir `build-requested-change/scripts/index-specs.mjs` como helper del skill: extraer títulos y `Scope`, excluir el propio índice, ordenar de forma estable, escapar Markdown y avisar de specs sin alcance en lugar de omitirlas silenciosamente. Admitir consulta sin escritura y persistencia por el owner; devolver solo la vista compacta o filas solicitadas, nunca todos los cuerpos. Ante una spec sin alcance, revisar solo ese archivo para resolver si es candidato.
- El orchestrator consulta el índice antes de seleccionar candidatas y lo regenera en su rama después de crear, enmendar o retirar specs. Mantener un solo escritor y no añadir commits separados de mantenimiento del índice.
- `specify-spec/SKILL.md`: trabajar solo sobre contratos creados o enmendados, sin modificar estado de spec. Devolver contenido para una aprobación conjunta del owner; no preguntar de nuevo por cada referencia sin cambios.
- `specify/SKILL.md` y `references/functional.md`, `references/technical.md`: rutas planas, propietarios resueltos, sustitución de la edición manual del PRD por su regeneración para specs F y T y revisión de reglas antiguas que obligan a plan/qualify o prohíben E2E por ser técnico.

### C. Implementación

- Renombrar `implement-spec/` a `implement-change/`, incluido nombre de skill, encabezado, referencias y catálogo. Sin alias antiguo.
- `implement-change/SKILL.md`: planificar una vez el conjunto cuando se necesita; implementar secuencialmente por contenedor; comprobar que codify registra evidencia en el reporte.
- `planify/SKILL.md`: recibir el cambio, cubrir todos sus contenedores y escribir exclusivamente su `plan.md`.
- `codify/SKILL.md`: aceptar tareas del cambio o plan; escribir evidencia de implementación y conservar las secciones ajenas. Mantener la regla de no ejecutar E2E; esa ejecución pertenece a verify.
- `fix-defects/SKILL.md`: dejar de prohibir plan en cualquier caso. Reparar directamente si es acotado; devolver al owner la necesidad de replantear o modificar criterios. Evitar una recursión entre workers que genere otro cambio para el mismo defecto.

### D. Prueba y release

- `verify/SKILL.md`: leer obligaciones de `Checks`, ejecutar E2E del cambio completo y completar la sección E2E del reporte existente.
- `qualify/SKILL.md` y `references/qualify.gates.md`: leer los controles asignados, evaluar riesgo y criterios técnicos, completar Review y Findings; conservar severidades y controles sustantivos.
- `ship-implementation/SKILL.md`: decidir desde obligaciones reales y vigencia; coordinar reparación y repetición, sin `stages.*`, reclasificación ni estado `ready`.
- `shipify/SKILL.md`: derivar preparación de la evidencia común y registrar únicamente el cierre del cambio. Deducir entradas de changelog del contenido; no reintroducir `kind`/`intent` para decidir entre funcional, técnico y Fixed.

### E. Foundation, Craft y documentación

- `explore/SKILL.md`: reconocer `specs/PRD.md` como índice generado, disponible cuando se indexan las specs; no redactar categorías ni mantener un shell independiente. Retirar la antigua `explore/assets/PRD.template.md`: el generador es el único productor del formato del PRD.
- `craft-lasting-quality/SKILL.md` y `references/finding.contract.md`: usar `findings.md` y los Findings de `changes/*/report.md`; batch fijo de hasta cinco grupos de reparación y reanudación por enlaces. No crear cambio si no hay asuntos elegibles. Revalidar hallazgos abiertos para no seleccionar evidencia obsoleta.
- Alinear `skills.catalog.md`, `README.md`, `docs/AIDD.workflow.md` y `docs/getting-started.md`.
- Eliminar `docs/adaptive-delivery.workflow.yaml`: reproduce la política que ya posee el catálogo. Retirar sus enlaces si existen; no crear otro motor declarativo.
- Añadir una decisión concisa a `docs/design.decisions.md` que identifique la sustitución del contrato anterior. Conservar sus entradas históricas como historial, no convertirlas en instrucciones actuales.
- Marcar `docs/build-requested-change.informe.md` como diagnóstico anterior al cambio cuando la implementación esté terminada; enlazar la documentación vigente. No reescribir sus evidencias como si ya hubieran descrito este diseño.
- Buscar consumidores adicionales en `.agents/`, `bin/` y `scripts/`. Cambiar únicamente referencias o comprobaciones afectadas; los planes y reportes históricos pueden mencionar el contrato anterior.

## 7. Verificación requerida

Este repositorio entrega skills, no una aplicación de producto. No ejecutar un E2E ficticio ni confundir revisión de Markdown con ejecución de un workflow real. Sí hay scripts de comprobación e instalación: `package.json` define `npm test`.

Primero inspeccionar `scripts/verify-skills-migration.js`, `scripts/verify-skills-batch-a.js`, `scripts/verify-cli-update.js` y `scripts/verify-release.js`. Adaptar únicamente aserciones que codifican contratos deliberadamente sustituidos. No borrar cobertura sustantiva para que pase una búsqueda textual. Ejecutar después `npm test`; distinguir fallos del cambio de limitaciones del entorno o fallos previos.

Revisar enlaces locales, nombres de skills, metadata válida y ausencia de referencias operativas a rutas/propiedades eliminadas. La búsqueda debe excluir historial, este plan y el diagnóstico anterior como fuentes normativas; no exigir cero coincidencias en todo el repositorio.

Documentar un recorrido de contrato con estos casos; fixtures pequeñas son útiles si los scripts existentes permiten comprobar artefactos, pero no crear un framework nuevo:

| Caso | Resultado que debe poder ejecutarse sin ambigüedad |
| --- | --- |
| Corrección local sin spec | `change.md` con criterios propios y `report.md`; sin spec ni plan ficticio. |
| Cambio local con muchas specs ajenas | Consulta el índice y lee solo candidatas y dependencias justificadas; no carga todos los cuerpos en el contexto. |
| Índice ausente o desactualizado | El helper produce la vista actual; no exige lectura exhaustiva por el modelo ni inventa un propietario. |
| Spec sin Scope o retirada | La consulta advierte la omisión o muestra la retirada; no la pierde silenciosamente ni la trata como contrato vigente. |
| Cambio descrito con sinónimos de una capacidad existente | La búsqueda progresiva en índice y candidatas descubre su propietaria; no duplica spec. |
| Política técnica transversal | La selección incluye la política aplicable aunque su título no contenga el nombre de la función solicitada. |
| Corrección de comportamiento ya especificado | Referencia el contrato; no enmienda ni pide aprobación de una spec que no cambió. |
| Nueva capacidad duradera | Explica su límite respecto de candidatas, crea una spec y valida el conjunto propuesto. |
| Código existente sin spec | No afirma que el producto adquiere una capacidad nueva por documentarla. |
| Cambio con dos specs y varios contenedores | Un cambio, un plan cuando corresponde y un reporte; criterios sin copias divergentes. |
| Cambio técnico con impacto en flujos | Controles técnicos específicos y E2E de regresión cuando corresponda. |
| Corrección que necesita migración/coordinación | Permite planificar; no aplica la antigua prohibición de fix. |
| Trabajo planificado sin spec duradera | Plan bajo el cambio, sin inventar `spec_key`. |
| Suite o entorno requeridos ausentes | Resultado blocked; cambio open; no release. |
| Criterio nuevo sin fila de evidencia | Impide release aunque las demás comprobaciones hayan pasado. |
| Reparación posterior a evidencia favorable | Invalida y repite comprobaciones afectadas; no acepta reporte obsoleto. |
| Commit que solo actualiza el reporte | No desencadena una repetición infinita de pruebas. |
| Modificación de contrato tras aprobación | Requiere validar el contenido afectado antes de liberar. |
| Batch Craft interrumpido | Conserva los hallazgos seleccionados; no incorpora otros al reanudar. |
| Cancelación | No release; hallazgos pendientes disponibles para trabajo posterior. |
| Release interrumpido tras commit | Reanuda tag/limpieza sin otra versión y sin cerrar specs como entregas. |

## 8. Condiciones de terminación y entrega

- Las plantillas permiten escribir los casos anteriores sin secciones inventadas por el ejecutor.
- Se conserva `specs/PRD.md` como entrada al triage, generado desde las specs F y T. Ningún skill operativo exige categorías/tags, planes por spec, reportes por etapa o estados de entrega en specs.
- Existe un único lugar editable para cada dato: criterios duraderos y alcance en specs, criterios propios y obligaciones en change, tareas en plan, resultados en report, versión en change/Git. El PRD es una vista regenerable, sin información independiente.
- La búsqueda de propietario empieza por el índice y abre solo candidatas justificadas, incluyendo contratos técnicos transversales. No se sustituye por coincidencia literal, creación automática o lectura exhaustiva rutinaria.
- Cambiar un contrato mantiene sus IDs y valida su contenido; reparar su implementación no obliga a reescribirlo.
- No hay lectores legacy, migraciones ni aliases. Una instalación nueva expone `implement-change` como worker interno y no el nombre antiguo.
- Se preservan los controles de calidad y la seguridad de la entrega; menos metadatos no permite aceptar evidencia ausente o caducada.
- Al terminar, entregar resumen de archivos y contratos modificados, resultado de comprobaciones y limitaciones concretas. No afirmar que se ejecutó un producto real si solo se hicieron verificaciones de contrato.

La implementación debe seguir este plan y resolver detalles editoriales con criterio. Una desviación que cambie estructura, garantías de evidencia o descubrimiento de specs debe explicarse expresamente, no introducirse como una decisión menor.
