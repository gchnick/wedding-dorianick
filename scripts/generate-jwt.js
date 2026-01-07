import { SignJWT } from "jose";

// --- CONFIGURACIÓN MANUAL DEL PAYLOAD ---
const payload = {
  uid: "INV01", // NanoID del invitado (5 chars: 0-9, A-Z)
  name: "Familia Demo", // Nombre para mostrar
  pax: 2, // Número máximo de asientos
  // exp: ...             // Expiración opcional
};
// ----------------------------------------

async function generateToken() {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    console.error(
      "❌ Error: La variable de entorno JWT_SECRET no está definida."
    );
    console.error(
      "Asegúrate de ejecutar el script con acceso a las variables de entorno."
    );
    console.error(
      "Ejemplo (Node 20+): node --env-file=.env scripts/generate-jwt.js"
    );
    process.exit(1);
  }

  const secret = new TextEncoder().encode(secretKey);

  try {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      // .setExpirationTime('2h') // Descomentar si se desea expiración
      .sign(secret);

    console.log("\n✅ Token Generado Exitosamente:\n");
    console.log(jwt);
    console.log("\n🔗 Link de Prueba (Local):\n");
    console.log(`http://localhost:4321/?token=${jwt}`);
  } catch (error) {
    console.error("❌ Error generando el token:", error);
  }
}

generateToken();
