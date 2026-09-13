# Plan para Sol — lote A: entrega fiable

Estado: listo para implementar. Alcance: **H02–H09** del [informe de revisión](./skills-system.review.md). El informe conserva el diagnóstico, las evidencias y los criterios de validación; este plan añade únicamente decisiones de implementación, orden y cierre.

## Encargo y límites

Sol: implementa este lote mediante [skillify](../.agents/skills/skillify/SKILL.md), leyendo sus recursos y las instrucciones vigentes antes de editar. Contrasta el estado actual con la base del informe; preserva cambios ajenos. No vuelvas a auditar todo el sistema ni crees specs de aplicación para modificar estas skills.

Mantén los nombres y las tres clases de skills. Escribe instrucciones breves en inglés y conserva las plantillas como contrato de los artefactos. Las decisiones siguientes resuelven las alternativas del lote; no necesitan otra ronda de aprobación para empezar.

H01 y H10–H18 siguen fuera de alcance. Se permiten ajustes locales imprescindibles en contratos compartidos, documentación, adaptadores afectados y comprobaciones existentes. No conviertas esos ajustes en una migración de adaptadores, una optimización de agentes ni un framework de evaluación. Conserva los enlaces de composición existentes: la contradicción editorial de H01 no justifica romper el pipeline durante este lote.

Los merges, tags y procesos mencionados en las skills son comportamiento para los proyectos consumidores. No ejecutes una entrega de AIDDbot para probarlos; usa repositorios y procesos temporales controlados.

## Decisiones de implementación

| Área | Decisión para este lote |
| --- | --- |
| Git — H02/H04 | El owner de la entrega decide base, creación/reutilización de rama e integración. Puede delegar commits de etapas, siempre secuencialmente y limitados a sus archivos. `shipify` ejecuta la integración final por delegación expresa. Las demás primitivas no cambian ramas. |
| Nombres — H02 | Conservar `feat/{spec_key}` funcional, `chore/{spec_key}` técnico, `change/{change_key}` coordinado y `fix/{fix_key}` findings. Definir la convención en el AGENTS consumidor y remitir a ella desde las skills. |
| Triage — H03 | Resolver `key`, `kind` y `action` antes de crear la rama. Reutilizar IDs en amend y reservar los nuevos en el alcance coordinado. El triage inicial es de lectura y devuelve el alcance; solo el caso múltiple persiste manifiesto, ya en la rama de entrega. `specify` consume la identidad recibida. |
| Escrituras — H04 | Secuenciales en especificación, planificación e implementación durante este lote. Un solo escritor actualiza cada archivo compartido y el índice Git a la vez. No introducir worktrees ni excepciones paralelas nuevas. |
| Criterios — H05 | Verify acredita criterios funcionales; qualify acredita los técnicos con método y evidencia. Una regresión verde no acredita propiedades técnicas. Conservar IDs retirados también en specs técnicas. |
| Gates — H06 | Mantener los seis gates actuales. Blocker/major bloquean; minor se registra sin bloquear. `n/a` requiere justificación de inaplicabilidad. Los criterios técnicos son una obligación adicional: uno incumplido impide qualify verde aunque los gates pasen. |
| Vigencia — H07 | Registrar base y revisión evaluada. Comparar cambios posteriores, no solo igualdad de HEAD. Solo pueden exceptuarse informes y metadatos de cierre identificados expresamente, sin cambios semánticos. Código, tests, configuración, criterios, planes o reglas relevantes modificados invalidan la evidencia afectada. |
| Bloqueos — H08 | Distinguir verde, defectos corregibles y comprobación bloqueada. El bloqueo es resultado del informe, no un nuevo estado de spec ni un defecto inventado. No repetir una reparación sin nueva evidencia o una hipótesis correctiva distinta; devolver el impedimento al caller. |
| Entorno E2E — H09 | Usar datos de prueba delimitados y detener solo procesos cuya propiedad se pueda demostrar. Un puerto ocupado sin esa evidencia produce alternativa configurada o bloqueo. El puerto o el nombre del ejecutable, por sí solos, no prueban propiedad. |

## Secuencia de trabajo

Completa cada paso antes del siguiente; no copies los hallazgos en nuevos documentos.

- [x] **1. Fijar entradas y propiedad — H02/H03.** Alinear la plantilla `explore/assets/AGENTS.template.md`, `scope-feature`, `scope-change` y su manifiesto/triage, `deliver-spec`, `deliver-change`, `specify-spec`, `specify`, `design-solution` y `fix-defects`. Añadir al manifiesto únicamente los campos que consumirá el flujo, incluido su estado de cierre si falta. El owner valida base y compatibilidad antes de escribir y reutiliza una rama compatible al reanudar. En greenfield, corregir solo la delegación de rama; no resolver el ciclo de fundación de H15.

- [x] **2. Serializar escrituras — H04.** Ajustar `deliver-change`, `implement-spec`, `planify` y `codify` a las decisiones anteriores. Mantener la barrera entre planificación completa e implementación. Establecer quién actualiza PRD, IDs y estado agregado de la spec; ningún hijo debe declarar completado el conjunto por haber terminado su contenedor. Preservar los contratos compartidos entre planes.

- [x] **3. Unificar evaluación — H05/H06.** Actualizar `specify` técnico, `verify`, `qualify`, sus referencias pertinentes y las seis plantillas de informes. Expresar responsable, método y evidencia de criterios técnicos, retirar gates ajenos a la lista y alinear severidad/aplicabilidad. Aplicar las mismas reglas a single-spec, change mixto y findings. Ante fallo o bloqueo, no conservar un estado que permita entregar usando una revisión anterior.

- [x] **4. Cerrar reparación y entrega — H07/H08.** Ajustar `ship-implementation`, `fix-defects`, `shipify` y los informes del paso anterior. Corregir informes multicontenedor secuencialmente y reiniciar desde verify tras cualquier arreglo. Un cambio necesario de criterio vuelve al caller para resolver alcance. Exigir ambos veredictos vigentes en los tres tipos de entrega. Definir una sola secuencia: comprobar evidencia/base → integrar → actualizar metadatos de release → commit final → tag de ese commit → eliminar rama fusionada. Un conflicto o cambio de contenido durante integración exige nueva evaluación antes de cerrar. La reanudación inspecciona pasos ya completados y nunca duplica versiones/tags ni elimina una rama antes de completar el cierre.

- [x] **5. Asegurar preparación E2E — H09.** Modificar `verify` y `verify/scripts/free-port.ps1` / `free-port.sh`. Elegir la interfaz mínima para demostrar propiedad y verificar identidad antes de detener; si no es demostrable, fallar sin matar. Precisar el alcance descartable de datos y comprobar el resultado de la limpieza. No añadir gestión general de procesos.

- [x] **6. Alinear y verificar.** Sincronizar catálogo, README y workflow solo donde cambie lo explicado al usuario: rama técnica, triage simple, secuencialidad, gates y bloqueos. Actualizar punteros gestionados si cambian metadatos; no editar copias independientes del contenido canónico. Ajustar comprobaciones que codifiquen el contrato anterior, manteniendo cobertura equivalente. Ejecutar la validación indicada abajo.

Las rutas de skills anteriores son relativas a `.agents/skills/`. Usa el [catálogo](../.agents/skills/skills.catalog.md) y los enlaces de evidencia del informe para localizar los archivos, sin ampliar lecturas a skills no afectadas.

## Validación y entrega

Reutiliza los escenarios de validación de **H02–H09**; no redactes otra lista equivalente. Cúbrelos con el mínimo de fixtures que compartan contexto: entrega simple funcional/técnica y reanudación, change mixto con archivos compartidos, ciclo de revisión/reparación, y entorno E2E aislado.

Distingue dos clases de evidencia:

- **Ejecutable:** pruebas de los scripts modificados con procesos creados por la propia prueba; fixture Git para vigencia, integración y reanudación cuando haya lógica ejecutable que comprobar; `npm test` y `git diff --check`. En la prueba de colisión, el listener que representa otro proyecto debe seguir vivo tras invocar el helper. Prueba PowerShell y bash donde estén disponibles; identifica plataformas no ejecutadas.
- **De contrato:** recorrido de las instrucciones y artefactos para H02–H08, con entrada y decisión esperada. Registra como revisión de contrato lo que no se haya ejecutado con un agente. Una regex o un flujo simulado por un script no demuestra que un arnés siga la prosa correctamente.

No añadas pruebas de coincidencia literal de párrafos ni un motor que replique el workflow. Comprueba enlaces y coherencia entre productores y consumidores de los campos nuevos. Si cambias una aserción existente, explica qué contrato reemplaza.

Entrega el diff implementado y un único registro breve `docs/skills-system.batch-a.verification.md` con una fila por H02–H09: archivos modificados, evidencia/comando, resultado y limitación pendiente. Enlaza este plan y el informe; no repitas sus diagnósticos. Marca aquí los pasos completados y conserva el informe original como fotografía previa.

El lote queda completo cuando H02–H09 tienen resolución trazable, las comprobaciones ejecutables disponibles pasan y las limitaciones de ejecución se declaran sin atribuirles un PASS. Informa de cualquier requisito sin resolver; no lo des por cerrado solo porque la migración está verde. No hagas push, merge ni tag de este repositorio como parte de este encargo.
