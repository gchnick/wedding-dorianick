# Desarrollo Local con Astro DB

Esta guía explica cómo trabajar con Astro DB en tu entorno de desarrollo local usando SQLite.

## Cómo Funciona

Astro DB usa **SQLite localmente** y **Turso en producción**:

- **Desarrollo Local (`node --run dev`)**: Astro DB crea automáticamente una base de datos SQLite en `.astro/content.db`. No necesitas conexión a internet ni configurar Turso.
- **Producción**: La aplicación desplegada usa Turso (libSQL remoto) configurado con las variables de entorno `ASTRO_DB_REMOTE_URL` y `ASTRO_DB_APP_TOKEN`.

## Comandos Disponibles

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo (usa SQLite local)
node --run dev

# Poblar la base de datos local con datos de prueba
node --run db:seed

# Abrir Astro Studio para inspeccionar la DB local
node --run db:studio
```

### Gestión de Esquemas

```bash
# Actualizar el esquema en Turso (producción)
node --run db:push:remote
```

## Flujo de Trabajo Recomendado

### 1. Desarrollo de Nuevas Funcionalidades

1. **Actualiza el esquema** en `db/config.ts` si es necesario
2. **Ejecuta `node --run dev`** - Astro DB aplicará los cambios automáticamente a tu SQLite local
3. **Puebla datos de prueba** con `node --run db:seed` si necesitas datos de ejemplo
4. **Desarrolla y prueba** tu funcionalidad localmente

### 2. Despliegue a Producción

1. **Push del esquema a Turso**: `node --run db:push:remote`
2. **Despliega tu aplicación** - Los cambios de código y esquema estarán sincronizados

## Datos de Prueba

El script `db/seed.ts` crea datos de ejemplo:

- **Invitados** con diferentes estados (PENDING, CONFIRMED, DECLINED)
- **Mensajes del guestbook** con diferentes colores

Ejecuta `node --run db:seed` cada vez que quieras resetear tus datos locales.

## Inspeccionar la Base de Datos

### Opción 1: Astro Studio (Recomendado)

```bash
node --run db:studio
```

Abre una interfaz web para explorar tablas, ejecutar queries y ver datos.

### Opción 2: SQLite CLI

```bash
# Instalar sqlite3 si no lo tienes
# Windows: choco install sqlite
# macOS: brew install sqlite

# Abrir la base de datos
sqlite3 .astro/content.db

# Comandos útiles
.tables              # Listar tablas
.schema Guest        # Ver esquema de tabla
SELECT * FROM Guest; # Query de ejemplo
.quit                # Salir
```

## Variables de Entorno

### Desarrollo Local

No necesitas configurar variables de entorno para desarrollo local. Astro DB usa SQLite automáticamente.

### Producción (Turso)

Configura estas variables en tu plataforma de despliegue (Cloudflare Pages):

```env
ASTRO_DB_REMOTE_URL="libsql://[tu-database].turso.io"
ASTRO_DB_APP_TOKEN="[tu-token]"
JWT_SECRET="[tu-secreto]"
```

## Solución de Problemas

### La base de datos local está corrupta

```bash
# Elimina la base de datos local
rm .astro/content.db

# Reinicia el servidor de desarrollo
node --run dev
```

### Cambios de esquema no se aplican

1. Detén el servidor de desarrollo
2. Elimina `.astro/content.db`
3. Reinicia con `node --run dev`

### Diferencias entre local y producción

Astro DB usa libSQL (fork de SQLite) que es compatible entre local y Turso. Sin embargo:

- **Tipos de datos**: Usa los tipos de Astro DB (`column.text()`, `column.number()`, etc.)
- **Funciones SQL**: Algunas funciones avanzadas pueden comportarse diferente
- **Rendimiento**: Turso está optimizado para producción y puede ser más rápido

## Recursos

- [Astro DB Documentation](https://docs.astro.build/en/guides/astro-db/)
- [Turso Documentation](https://docs.turso.tech/)
- [libSQL Documentation](https://github.com/tursodatabase/libsql)

## Pruebas End-to-End (E2E)

El proyecto utiliza **Playwright** para realizar pruebas end-to-end. Estas pruebas aseguran que los flujos críticos de la aplicación funcionen correctamente desde la perspectiva del usuario.

### Ejecutar Pruebas

Para ejecutar todas las pruebas E2E:

```bash
node --run test:e2e
```

Esto ejecutará Playwright, que levantará el servidor de desarrollo y correrá las pruebas definidas en la carpeta `e2e/`.

### Ver Resultados

Al finalizar, Playwright generará un reporte HTML si hay fallos o si se configura explícitamente. Puedes ver el reporte con:

```bash
npx playwright show-report
```

### Autenticación en Pruebas

Algunas pruebas requieren que el usuario esté "autenticado" (tenga una cookie de sesión válida). Para facilitar esto, existe un script auxiliar `scripts/generate-jwt.js` que permite generar tokens JWT válidos para usar en las pruebas.

Las pruebas suelen encargarse de generar este token y establecerlo en el contexto del navegador, pero es útil saber que existe esta herramienta.
