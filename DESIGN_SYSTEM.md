# Design System & UI Kit

## 🎨 Paleta de Colores

Basada en la vestimenta de los novios y el cortejo.

| Color                | Hex Code                      | Uso                                         | Referencia                                                           |
| :------------------- | :---------------------------- | :------------------------------------------ | :------------------------------------------------------------------- |
| **Primary Accent**   | `#40E0D0` (Turquesa Vibrante) | Botones (CTAs), Enlaces, Iconos destacados. | _Tono similar al moño/vestidos damas._ (Ajustar según imagen exacta) |
| **Secondary Accent** | `#98FB98` (Menta Suave)       | Fondos de tarjetas suaves, hovers.          | _Variación pastel del acento._                                       |
| **Neutral Dark**     | `#333333`                     | Texto principal, Títulos.                   | _Contraste legibilidad._                                             |
| **Neutral Mid**      | `#808080`                     | Texto secundario, Bordes inactivos.         | _Gris traje del novio._                                              |
| **Background**       | `#FFFFFF`                     | Fondo general de la página.                 | _Camisa novio / Limpieza._                                           |
| **Background Alt**   | `#F5F5F5`                     | Fondo de secciones alternas.                | _Diferenciación visual._                                             |

## ✒️ Tipografía

- **Display (Títulos):** `Playfair Display` (Serif). Elegante, clásica, para encabezados grandes.
- **Body (Texto):** `Montserrat` o `Lato` (Sans-serif). Geométrica, moderna, alta legibilidad en móviles.

## 🧩 Componentes UI

### Botones

- **Estilo:** Bordes redondeados (Border-radius: 8px). Sombra suave (Shadow-sm).
- **Botón Primario (Aceptar/Ir):** Relleno color `Primary Accent`, Texto Blanco o Negro (según contraste).
- **Botón Secundario (Rechazar):** Borde `Neutral Mid`, Fondo transparente o Gris muy claro.

### Tarjetas (Cards)

- Fondo Blanco sobre fondo gris claro, o viceversa.
- Padding generoso (24px).
- Bordes sutiles o sombra muy ligera (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`).

### Video Player

- Minimalista. Sin controles intrusivos antes de reproducir.
- Marco o borde delgado en `Primary Accent`.
