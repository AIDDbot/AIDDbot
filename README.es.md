
# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot**, es un asistente para ingenieros de software en sus tareas diarias. Puede ayudar con la documentación de producto, la generación de código, las pruebas de calidad y demás tareas.

Consiste en un **conjunto de prompts, instrucciones, reglas y herramientas** que permiten al agente realizar sus tareas de manera efectiva.

Es útil para cualquier lenguaje y tipo de proyecto, aunque está más indicado para desarrollos corporativos y de largo alcance.

Puede trabajar con diferentes editores de código con agentes de IA, como:

- **GitHub Copilot** 🟢 Listo [Ver implementación](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Próximamente

## 🔌Instalación

`AIDDbot` es un conjunto de ficheros con instrucciones y configuraciones adaptados para tu editor de código con IA. Puedes instalarlo clonando este repositorio y colocando la carpeta adecuada a tu editor en el directorio raíz de tu proyecto. O simplemente usa el prompt de instalación proporcionado para el caso de _VsCode con GitHub Copilot_.

### Para GitHub Copilot

> Lee más sobre [Personalización de GitHub Copilot](https://code.visualstudio.com/docs/copilot/copilot-customization)

- [ ] Copia el contenido en bruto de [El Prompt de Instalación de AIDDbot](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Pégalo en tu Chat de Copilot en `Modo Agente`.


## ℹ️ Uso para GitHub Copilot

> El chat de GitHub Copilot funciona de serie en tres modos, `Ask`, `Edit` y `Agent`. Con AIDDbot ahora se agrega un nuevo modo, llamado `AIDDbot`. Lee más sobre [Modos de Chat.](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🤖 Modo de chat

Tras instalarlo, tendrás un nuevo modo de chat: **AIDDbot**.

- **[Modo AIDD](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: Modo configurado para arquitectura, construcción e ingeniería de calidad de proyectos empresariales.

En Copilot, un modo de chat le asigna un contexto específico y le permite acceder a prompts y herramientas adaptadas a ese contexto.

### 📋 Prompts

Usando el comando `/`, puedes acceder a prompts predefinidos para actuar, ejecutar tareas y generar documentación y código. AIDDbot ofrece multitud de estos prompts listos para usar; pero hay tres muy especiales que agrupan tareas de alto nivel para trabajar siguiendo un rol específico.

#### Roles

Este modo dispone de prompts específicos para actuar según los tres roles de la metodología AI-Driven Development: Architect/Builder/Craftsman.

- **[Prompt de rol Arquitecto](/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect` para documentación general del proyecto
- **[Prompt de rol Constructor](/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder` para diseño e implementación de una funcionalidad
- **[Prompt de rol Artesano](/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman` para validación, limpieza y documentación de una funcionalidad

Estos prompts, son capaces de aportar contexto adecuado y llamar a otros prompts específicos según sea necesario. Para que tengas una idea más clara de sus capacidades e incluso puedas invocarlos a voluntad, aquí tienes una lista agrupada por roles:

#### Prompts de Arquitecto(Ab_Architect)

- 📋 **[Generación de PRD](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/PRD.prompt.md)** `/PRD`: para escribir un Documento de Requisitos del Producto.
  - 📦 **docs/PRD.md**: Objetivos, requisitos y restricciones del proyecto.

- 📋 **[Modelado de Dominio](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/DOMAIN.prompt.md)** `/DOMAIN`: para crear un modelo de dominio.
  - 📦 **docs/DOMAIN.md**: Entidades, relaciones y reglas de negocio del proyecto.

- 📋 **[Arquitectura de Sistemas](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/SYSTEMS.prompt.md)** `/SYSTEMS`: para generar la documentación técnica de sistemas.
  - 📦 **docs/SYSTEMS.md**: Arquitectura del sistema, componentes y detalles de implementación

#### Prompts de Constructor(Ab_Builder)

- 📋 **[Gestión del Backlog](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/BACKLOG.prompt.md)** `/BACKLOG`: Gestiona el backlog del producto y prioriza funcionalidades.
  - 📦 **docs/BACKLOG.md**: Lista de funcionalidades agrupadas por épicas con sus prioridades y estados.

- 📋 **[Especificación de Funcionalidad](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.spec.prompt.md)** `/feature.spec`: Genera especificaciones para una funcionalidad según los requisitos proporcionados.
  - 📦 **docs/feats/f_id.spec.md**: Especificaciones de comportamiento para una funcionalidad.

- 📋 **[Diseño de Funcionalidad](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.design.prompt.md)** `/feature.design`: Crea un documento de diseño para la funcionalidad.
  - 📦 **docs/feats/f_id.design.md**: Diseño técnico para una funcionalidad.

- 📋 **[Plan de Implementación](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.tasks.prompt.md)** `/feature.tasks`: Esquematiza las tareas necesarias para implementar la funcionalidad.
  - 📦 **docs/feats/f_id.tasks.md**: Plan de tareas para implementar una funcionalidad.

- 📋 **[Código de la Funcionalidad](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.code.prompt.md)** `/feature.code`: Escribe el código ejecutando el plan de implementación.
  - 📦 **src/**: Código de implementación para una funcionalidad.

#### Prompts de Artesano(Ab_Craftsman)

- 📋 **[Pruebas Automatizadas](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.test.prompt.md)** `/feature.test`: Planifica y genera pruebas automatizadas para el código proporcionado.
  - 📦 **docs/feats/f_id.test.md**: Especificaciones de pruebas unitarias e integradas para una funcionalidad.
  - 📦 **src/**: Pruebas de implementación para una funcionalidad.

- 📋 **[Revisión de Código Limpio](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.clean.prompt.md)** `/feature.clean`: Realiza una revisión de código basada en los cambios de la funcionalidad.
  - 📦 **src/**: Código limpio

- 📋 **[Generación de Documentación](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.doc.prompt.md)** `/feature.doc`: Crea documentación para mantener el código proporcionado.
  - 📦 **src/**: Código documentado según el estándar de cada lenguaje
  - 📦 **docs/STRUCTURE.md**: Resumen de la estructura de carpetas y organización de los componentes principales.
  
### 📚 Instrucciones

Github Copilot permite definir ficheros con contexto específico para cada tarea. Estos ficheros, llamados instrucciones, se usan como plantillas, o guías de buenas prácticas. Pueden ser muy genéricos y aplicarse a cualquier contexto; o muy específicos aplicables solo al uso de una librería, herramienta o patrón de diseño.

**AIDDbot** te ofrece una serie de instrucciones que son adjuntadas como contexto desde sus prompts de forma automática y ajustada a la necesidad de cada caso. Aquí tienes una lista de algunas de las instrucciones que ofrece y que tu puedes extender y ajustar a tu gusto:

- 📒 **[Instrucciones PRD](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/PRD.instructions.md)** `#file:PRD.instructions.md` : Plantilla para generar un Documento de Requisitos del Producto.
- 📒 **[Instrucciones de Arquitectura](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/architecture.instructions.md)** `#file:architecture.instructions.md` : Guía para aplicar patrones de arquitectura de software.
- 📒 **[Instrucciones de lenguaje TypeScript](https://github.com/AIDDbot/AIDDbot/blob/main/.github/instructions/lng-typescript.instructions.md)** `#file:lng-typescript.instructions.md` : Buenas prácticas y estándares de codificación para TypeScript.

Las instrucciones se añaden automáticamente como contexto en los prompts de **AIDDbot**, pero puedes agregarlas manualmente si lo necesitas, solo refiérase a ellas usando el prefijo `#`.

Ejemplo de cómo usar una instrucción manualmente:

```txt
Escribe una función que sume dos números siguiendo #file:lng-typescript.instructions.md 
```

#### Agregar Instrucciones

Además de las instrucciones que vienen, _de fábrica_, con **AIDDbot**, puedes agregar tus propias instrucciones personalizadas para adaptarlas a las necesidades específicas de tu proyecto. Y lo que es mejor, hacerlo de manera automática usando el propio agente de IA.

- 📋 **[Generación de Instrucciones](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/Ab_add-instructions.prompt.md)** `/Ab_add-instructions`: Crea instrucciones personalizadas para el stack tecnológico del proyecto.

Este prompt es invocado automáticamente desde el prompt del Arquitecto (tras la identificación de dependencias del stack tecnológico). Puedes invocarlo a voluntad en cualquier momento e indicarle un ámbito específico de aplicación.

```txt
/Ab_add-instructions java language
```

### 🛠️ En progreso:

- Algún tipo de memoria para el flujo de trabajo y características del proyecto.
- Un diario para que los agentes lleven registro de su trabajo y decisiones.
- Inclusión automática de arquetipos según los requisitos del proyecto.
- Auto-mejora de AIDDbot...

## 💭 Filosofía AIDD

AIDD significa AI Driven Development, una filosofía que combina el poder de la IA con las mejores prácticas de desarrollo de software. Busca aumentar la productividad, la calidad del código y la colaboración entre desarrolladores y agentes en todo el ciclo de vida del software.

El agente `AIDDbot` sigue los tres principios del [Manifiesto AIDD](https://aiddbot.com/aidd-manifesto):

- **🧑‍💻 Humano en el Bucle (Human in the Loop)**: Tu trabajo es más estratégico, colaborativo y responsable.
- **🔧 Reglas sobre Herramientas (Rules over Tools)**: Las herramientas son solo un medio, lo importante son las reglas y procesos.
- **✅ Calidad IA (Quality AI)**: El desarrollo no solo es más productivo, sino también de mayor calidad y fácil de mantener.

> ¡Trabaja más inteligente, no más duro, con _Ab_!

---

- **Autor**: [Alberto Basalo](https://albertobasalo.dev)
- **Redes sociales**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Cursos en Español**: [AI code Academy](https://aicode.academy)
- **Blog de AIDDbot.com**: [AIDDbot.com](https://aiddbot.com)
- **Organización AIDDbot en GitHub**: [GitHub/AIDDbot](https://github.com/AIDDbot)
- **Este repositorio**: [GitHub/AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)