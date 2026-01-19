# Technical Specifications

## 🔐 Autenticación y Seguridad (NanoID)

El sistema utiliza un enfoque "Passwordless" basado en la posesión de un link único.

- **Método:** Identificador Opaco (NanoID).
- **Token Source:** URL Parameter (`?i=JDHC3`).
- **Formato ID:** 5 caracteres, alfabeto `0-9, A-Z`.
- **Validación:** Middleware de Astro intercepta requests, valida el ID contra la base de datos `guests`.

### 🛡️ Flujo de Autenticación

1.  **Ingreso:** Usuario visita `/?i=JDHC3`.
2.  **Middleware:**
    - Detecta parámetro `i`.
    - Consulta DB: `SELECT * FROM guests WHERE id = 'JDHC3'`.
    - **Si es válido:**
      - Crea cookie de sesión `guest_session` (HttpOnly, Secure, SameSite=Lax).
      - Redirecciona a `/` (Limpia URL).
    - **Si es inválido:** Redirecciona a `/` sin sesión (Muestra estado público).
3.  **Persistencia:** La cookie `guest_session` mantiene al usuario logueado.
4.  **Frontend:**
    - Estado global (NanoStores / Context) se hidrata desde `Astro.locals` o verificando la cookie si es necesario.

### Cabeceras de Seguridad

Implementar meta tag para evitar fugas de token en referers externos:

```html
<meta name="referrer" content="no-referrer" />
```

## 💾 Modelo de Datos (Simplificado)

> **Nota sobre IDs:** Todos los identificadores (incluyendo `guests.id` y `guestbook_messages.id`) se generarán usando **NanoID** con una longitud de **5 caracteres** y el alfabeto: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

Tabla: `guests`

```sql
CREATE TABLE guests (
  -- ID: NanoID de 5 caracteres (0-9, A-Z).
  -- La generación debe hacerse en el Backend (Application-side generation).
  id TEXT PRIMARY KEY NOT NULL,

  name TEXT NOT NULL,

  email TEXT,

  -- INTEGER en SQLite maneja números enteros
  max_guests INTEGER NOT NULL DEFAULT 1,

  confirmed_guests INTEGER NOT NULL DEFAULT 0,

  -- ENUM Emulation: Usar TEXT con una restricción CHECK
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED')),

  -- Fechas: Se almacenan como cadenas ISO8601.
  -- DEFAULT CURRENT_TIMESTAMP inserta la fecha UTC actual.
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

## 🔌 Integraciones

1.  **Google Maps:** Iframe embed en sección Ubicación.
2.  **Zoom:** Enlace directo (`href`) y datos de reunión mostrados en texto plano para fácil copia.
3.  **Video Hosting:** Embed de YouTube (Privado/Oculto).

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (Menú hamburguesa, columnas colapsan a 1).
- **Desktop:** > 768px (Menú horizontal, grids de 2-3 columnas).
```

## 🌳 Especificaciones del Wedding Guest Book (Árbol)

- **Frontend Rendering:** Se recomienda usar **SVG interactivo** o una librería de Canvas ligero (como Konva.js o simplemente CSS Positioning absoluto sobre un container relativo).
- **Posicionamiento de Hojas:**
  - _Opción A (Aleatoria Controlada):_ El frontend calcula una posición aleatoria dentro de coordenadas predefinidas (zonas de ramas) para que no queden flotando en el aire.
  - _Opción B (Pre-definida):_ Tener 50-100 "slots" (coordenadas x,y) invisibles sobre las ramas. Al llegar un mensaje, ocupa el siguiente slot disponible.

- **Schema de Base de Datos (Tabla: `guestbook_messages`):**
  - `id`: NanoID (5 chars, alfabeto personalizado)
  - `guest_name`: String
  - `message`: String (Text)
  - `leaf_color`: Enum/String (Para variar entre turquesa/menta/crema)
  - `created_at`: Timestamp
