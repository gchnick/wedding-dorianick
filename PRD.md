# Product Requirements Document (PRD)

## 🎯 Objetivos del Usuario

1.  **Invitados:** Deben poder confirmar su asistencia en menos de 3 clics, encontrar la ubicación fácilmente y acceder la información para conectarse a la trasmición en vivo si no pueden asistir.
2.  **Novios:** Deben poder comunicar su agradecimiento, contar su historia y tener un registro centralizado de confirmaciones.

## 📱 Casos de Uso y Secciones

### 1. Confirmación de Asistencia (RSVP) - _Prioridad Alta_

- **Flujo:** El usuario llega mediante una URL con token.
- **UI:** Muestra saludo personalizado ("Hola Familia Pérez").
- **Acción:** Dos botones grandes: [¡Si acepto!] / [Lo siento, no podré].
- **Feedback:** Pantalla de agradecimiento tras la acción y lanzar conffeti.

### 2. La Boda (Bienvenida y Logística)

- **Video de Bienvenida:** Un reproductor de video destacado donde los novios invitan personalmente a los asistentes. Debe tener controles simples (Play/Pause).
- **Agenda:** Cronograma visual (Icono + Hora + Descripción).
- **Ubicación:** Mapa interactivo (Google Maps embed) y dirección escrita.
- **Recomendaciones:** Lista de hoteles y tips de transporte.

### 3. El Stream (Datos de conecxión a la Transmisión en Vivo)

- **Contenido:** Tarjeta destacada con la hora de la transmisión.
- **Acción:** Botón "Unirse a Zoom" (Visible siempre o activado el día del evento). Credenciales de acceso visibles.

### 4. Contenido Emocional

- **Nuestra Historia:** Breve biografía de la relación.
- **Cortejo Nupcial:** Tarjetas con foto y nombre de amigos/amigas de la pareja.
- **Galería:** Grid de fotos (Masonry layout preferible).

### 5. Pie de Página

- Mensaje de agradecimiento, contacto y enlaces a redes sociales.

### 6. Libro de Firmas Interactivo: "Wedding Guest Book"

- **Concepto:** Una visualización artística de un árbol desnudo (solo tronco y ramas). En el troco se puede visualizar los nombre de la pareja y la fecha de la boda. Cada mensaje dejado por un invitado se convierte en una "hoja" que se agrega al árbol, llenándolo de color y vida.
- **Visualización (Lectura):**
  - Al cargar la sección, el usuario ve el árbol con las hojas de los mensajes anteriores ya colocadas. Sobre cada hoja aparece el nombre del invitado.
  - **Interacción:** Al pasar el mouse (hover) o hacer clic sobre una hoja, aparece un pequeño globo de texto (_tooltip_) con el mensaje del invitado.
- **Acción (Escritura):**
  - Titulo: "Wedding Guest Book"
  - Un mensaje sobre el botón destacado que diga: "Por favor, firma una hoja".
  - Mesaje de descripción: "La hoja se depositará en el lienzo para que siempre recordemos a los seres queridos nos acompañarón"
  - Botón destacado: **[Firmar]**.
  - Abre un modal simple con campos: Nombre y Mensaje (máx 140 caracteres).
  - Al enviar, una nueva hoja cae o aparece en una rama vacía del árbol con una animación suave.

## 🚦 Reglas de Negocio

- El RSVP no requiere login con contraseña, solo el token válido.
- Si el token ya fue usado, se muestra el estado actual (ej: "Ya confirmaste asistencia").
- El diseño debe ser "Mobile First".
