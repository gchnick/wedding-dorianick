import { db, GuestbookMessage } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { generateId } from "@/utils/id";
import type { LeafColor } from "@/types/guestbook";

const LEAF_COLORS = ["turquoise", "mint", "cream"] as const;

function getRandomLeafColor(): string {
  return LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
}

export const server = {
  getGuestbookMessages: defineAction({
    handler: async () => {
      const messages = await db.select().from(GuestbookMessage).all();

      return {
        messages: messages.map(({ leafColor, ...props }) => ({
          leafColor: leafColor as LeafColor,
          ...props,
        })),
      };
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
      const newMessage = {
        id: generateId(),
        guestName,
        message,
        leafColor: getRandomLeafColor() as LeafColor,
        createdAt: new Date().toISOString(),
      };

      await db.insert(GuestbookMessage).values(newMessage);

      return {
        success: true,
        message: newMessage,
      };
    },
  }),
};
