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

## 🚦 Reglas de Negocio

- El RSVP no requiere login con contraseña, solo el token válido.
- Si el token ya fue usado, se muestra el estado actual (ej: "Ya confirmaste asistencia").
- El diseño debe ser "Mobile First".
