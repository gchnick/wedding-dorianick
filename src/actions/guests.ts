import { defineAction, ActionError } from "astro:actions";
import { db, eq, Guest } from "astro:db";
import { z } from "astro:schema";

export const guests = {
  getGuest: defineAction({
    accept: "json",
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }) => {
      const guest = await db.select().from(Guest).where(eq(Guest.id, id)).get();

      if (!guest) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Guest not found",
        });
      }

      return {
        id: guest.id,
        name: guest.name,
        status: guest.status as "PENDING" | "ACCEPTED" | "REJECTED",
      };
    },
  }),
  updateGuestStatus: defineAction({
    accept: "json",
    input: z.object({
      id: z.string(),
      status: z.enum(["ACCEPTED", "REJECTED"]),
    }),
    handler: async ({ id, status }) => {
      const guest = await db.select().from(Guest).where(eq(Guest.id, id)).get();

      if (!guest) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Guest not found",
        });
      }

      await db
        .update(Guest)
        .set({ status, updatedAt: new Date().toISOString() })
        .where(eq(Guest.id, id));

      return { success: true };
    },
  }),
};
