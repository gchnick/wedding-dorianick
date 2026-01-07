# Technical Specifications

## 🔐 Autenticación y Seguridad (JWT)

El sistema utiliza un enfoque "Passwordless" basado en tokens firmados.

- **JSON Object Signing and Encryption:** [jose](https://github.com/panva/jose)
- **Token Source:** URL Parameter (`?token=xyz...`).
- **Algoritmo:** HS256.
- **Payload Estructurado (Ejemplo):**

  ```json
  {
    "uid": "nanoid-invitado",
    "name": "Familia González",
    "pax": 2, // Número máximo de asientos reservados
    "exp": 1735689600 // Fecha expiración (opcional)
  }
  ```

  El agente debe tipar el payload de la siguiente manera:

  ```ts
  type JWTPayload = {
    uid: string; // NanoID del invitado
    name: string; // Nombre para mostrar (ej. "Familia González")
    pax: number; // Max seats allowed (Validación crítica en Backend)
    exp?: number; // Timestamp UNIX (Opcional)
    iat?: number; // Issued At
  };
  ```

- **Validación:** El backend debe verificar la firma del token antes de permitir la mutación (POST) del estado RSVP.

### 🛡️ Protocolo de Seguridad Frontend (Extract, Store & Wipe)

El frontend debe implementar la siguiente lógica al cargar la aplicación:

1.  **Detectar:** Verificar existencia de `?token=` en `window.location.search`
2.  **Validar & Almacenar:** Si existe, guardarlo en `sessionStorage` bajo la key `auth_token`.
3.  **Limpiar (Wipe):** Ejecutar `window.history.replaceState()` inmediatamente para remover el token de la barra de direcciones sin recargar la página.
4.  **Estado:** Si no hay token en URL ni en `sessionStorage`, ocultar el formulario de RSVP.

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
