import { db, Guest, GuestbookMessage } from "astro:db";
import { customAlphabet } from "nanoid";

/**
 * Seed script para poblar la base de datos local con datos de prueba.
 * Ejecutar con: pnpm astro db execute db/seed.ts
 */

// Alfabeto personalizado para IDs (0-9 y A-Z)
const ID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Generar ID de 5 caracteres
const generateId = customAlphabet(ID_ALPHABET, 5);

// Datos de prueba para invitados
const sampleGuests = [
  {
    id: generateId(),
    name: "María García",
    email: "maria.garcia@example.com",
    maxGuests: 2,
    confirmedGuests: 2,
    status: "CONFIRMED",
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    maxGuests: 4,
    confirmedGuests: 3,
    status: "CONFIRMED",
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    maxGuests: 1,
    confirmedGuests: 0,
    status: "DECLINED",
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    maxGuests: 3,
    confirmedGuests: 0,
    status: "PENDING",
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Laura Rodríguez",
    email: "laura.rodriguez@example.com",
    maxGuests: 2,
    confirmedGuests: 1,
    status: "CONFIRMED",
    updatedAt: new Date().toISOString(),
  },
  // Usuario estático para pruebas e2e
  {
    id: "TEST0",
    name: "Usuario Prueba",
    email: "test.user@example.com",
    maxGuests: 2,
    confirmedGuests: 0,
    status: "PENDING",
    updatedAt: new Date().toISOString(),
  },
];

// Datos de prueba para mensajes del guestbook
// Generar 200 mensajes de prueba
const generateSampleMessages = () => {
  const messages = [];
  const colors = ["turquoise", "mint", "cream"];
  const simpleMessages = [
    "¡Felicidades!",
    "Que sean muy felices",
    "Los mejores deseos",
    "Viva el amor",
    "Bendiciones",
    "Enhorabuena",
    "Hermosa boda",
    "Gracias por invitarnos",
  ];

  for (let i = 0; i < 200; i++) {
    messages.push({
      id: generateId(),
      guestName: `Invitado ${i + 1}`,
      message:
        simpleMessages[Math.floor(Math.random() * simpleMessages.length)],
      leafColor: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000000000),
      ).toISOString(),
    });
  }
  return messages;
};

const sampleMessages = generateSampleMessages();

export default async function seed() {
  console.log("🌱 Iniciando seed de la base de datos...");

  try {
    // Limpiar tablas existentes
    console.log("🗑️  Limpiando datos existentes...");
    await db.delete(GuestbookMessage);
    await db.delete(Guest);

    // Insertar invitados
    console.log("👥 Insertando invitados de prueba...");
    await db.insert(Guest).values(sampleGuests);
    console.log(`   ✓ ${sampleGuests.length} invitados insertados`);

    // Insertar mensajes del guestbook
    console.log("💬 Insertando mensajes del guestbook...");
    await db.insert(GuestbookMessage).values(sampleMessages);
    console.log(`   ✓ ${sampleMessages.length} mensajes insertados`);

    console.log("✅ Seed completado exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   - Invitados: ${sampleGuests.length}`);
    console.log(`   - Mensajes: ${sampleMessages.length}`);
    console.log(
      `   - Estados: ${
        sampleGuests.filter((g) => g.status === "CONFIRMED").length
      } confirmados, ${
        sampleGuests.filter((g) => g.status === "PENDING").length
      } pendientes, ${
        sampleGuests.filter((g) => g.status === "DECLINED").length
      } rechazados`,
    );
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    throw error;
  }
}
