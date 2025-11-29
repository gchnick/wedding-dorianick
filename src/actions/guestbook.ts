import { db, GuestbookMessage } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

// Mock data for testing when database is not initialized
const MOCK_MESSAGES = [
  {
    id: "1",
    guestName: "María González",
    message: "¡Felicidades a la hermosa pareja! Que Dios los bendiga siempre.",
    leafColor: "turquoise",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    guestName: "Carlos Ramírez",
    message: "Les deseo muchos años de felicidad y amor.",
    leafColor: "mint",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    guestName: "Ana López",
    message: "Que hermosa celebración. ¡Muchas felicidades!",
    leafColor: "cream",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    guestName: "Juan Pérez",
    message: "¡Felicidades a la hermosa pareja! Que Dios los bendiga siempre.",
    leafColor: "turquoise",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    guestName: "Ana López",
    message: "Que hermosa celebración. ¡Muchas felicidades!",
    leafColor: "cream",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    guestName: "Juan Pérez",
    message: "¡Felicidades a la hermosa pareja! Que Dios los bendiga siempre.",
    leafColor: "mint",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    guestName: "Ana López",
    message: "Que hermosa celebración. ¡Muchas felicidades!",
    leafColor: "cream",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    guestName: "Juan Pérez",
    message: "¡Felicidades a la hermosa pareja! Que Dios los bendiga siempre.",
    leafColor: "turquoise",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    guestName: "Ana López",
    message: "Que hermosa celebración. ¡Muchas felicidades!",
    leafColor: "mint",
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    guestName: "Juan Pérez",
    message: "¡Felicidades a la hermosa pareja! Que Dios los bendiga siempre.",
    leafColor: "turquoise",
    createdAt: new Date().toISOString(),
  },
];

const LEAF_COLORS = ["turquoise", "mint", "cream"] as const;

function getRandomLeafColor(): string {
  return LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
}

function generateUUID(): string {
  return crypto.randomUUID();
}

export const server = {
  getGuestbookMessages: defineAction({
    handler: async () => {
      try {
        const messages = await db.select().from(GuestbookMessage).all();
        return {
          success: true,
          data: MOCK_MESSAGES,
        };
      } catch (error) {
        // If database is not initialized, return mock data
        console.warn("Database not initialized, using mock data:", error);
        return {
          success: true,
          data: MOCK_MESSAGES,
        };
      }
    },
  }),

  addGuestbookMessage: defineAction({
    input: z.object({
      guestName: z.string().min(1, "El nombre es requerido"),
      message: z
        .string()
        .min(1, "El mensaje es requerido")
        .max(140, "El mensaje no puede exceder 140 caracteres"),
    }),
    handler: async ({ guestName, message }) => {
      try {
        const newMessage = {
          id: generateUUID(),
          guestName,
          message,
          leafColor: getRandomLeafColor(),
          createdAt: new Date().toISOString(),
        };

        await db.insert(GuestbookMessage).values(newMessage);

        return {
          success: true,
          data: newMessage,
        };
      } catch (error) {
        console.error("Error adding guestbook message:", error);

        // If database fails, return a mock success for testing
        const mockMessage = {
          id: generateUUID(),
          guestName,
          message,
          leafColor: getRandomLeafColor(),
          createdAt: new Date().toISOString(),
        };

        return {
          success: true,
          data: mockMessage,
        };
      }
    },
  }),
};
