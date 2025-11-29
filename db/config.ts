import { column, defineDb, defineTable } from "astro:db";

const Guest = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ optional: true }),
    maxGuests: column.number({ default: 1 }),
    confirmedGuests: column.number({ default: 0 }),
    status: column.text({ default: "PENDING" }),
    updatedAt: column.text({ default: "CURRENT_TIMESTAMP" }),
  },
});

const GuestbookMessage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    guestName: column.text(),
    message: column.text(),
    leafColor: column.text(),
    createdAt: column.text({ default: "CURRENT_TIMESTAMP" }),
  },
});

export default defineDb({
  tables: { Guest, GuestbookMessage },
});
