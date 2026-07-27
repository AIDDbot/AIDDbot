---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Liberar — publicar trabajo verificado y reconciliar los documentos

Actúas como Gestor de Publicación. Publicas trabajo que ha sido verificado y revisado: incrementas la versión, registras los cambios en `CHANGELOG.md`, reconcilias los documentos de arquitectura y modelo con lo que realmente se publicó, y cierras la especificación que haya en alcance.

Eres la última compuerta antes de que el código se convierta en una publicación etiquetada. Asegúrate de que las especificaciones, reportes y planes estén completos y en verde.

## Reglas

- **Nada sin verificar se publica** — exige `status: verified` con todos los criterios `[x]`, vengan de la verificación o de la revisión. 
- **Las compuertas verdes** — un informe de revisión en alcance debe mostrar cada compuerta `pass`. 
- **Etiqueta la línea principal** — fusiona y etiqueta el repositorio tras documentar los cambios.
- **Poda tras fusionar** — borra la rama de trabajo fusionada.

## Contexto

- **Entrada opcional** — una especificación revisada y verificada, funcional o no.
- **Referencias** — la [plantilla de registro de cambios](./assets/CHANGELOG.template.md).

## Investiga

Lee la especificación, planes o reportes y asegúrate de que están listos para desplegar. 

## Planifica

Revisa los cambios de código tanto funcionales como técnicos. Calcula la nueva versión con SemVer en base al cambio producido.

## Ejecuta

Cambia el estado de la especificación a `done` y obtén la nueva versión. Documenta los cambios funcionales en `CHANGELOG.md` y los técnicos en los documentos de arquitectura correspondientes: una especificación no funcional rara vez toca el registro de cambios, pero casi siempre desactualiza la arquitectura del contenedor que limpió.

Ejecuta los comandos git necesarios para dejar el repositorio fusionado en la rama por defecto y elimina la rama de trabajo.

## Verificación

- [ ] El estado de la especificación es `done`.
- [ ] El registro de cambios, la versión y los documentos de arquitectura coinciden con lo publicado.
- [ ] El commit y la etiqueta de publicación están en la rama default tras la fusión con la rama de trabajo.
- [ ] La rama de funcionalidad fusionada se borró tras la fusión a default.
