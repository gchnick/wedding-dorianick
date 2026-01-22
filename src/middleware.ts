import { defineMiddleware } from "astro:middleware";
import { db, eq, Guest } from "astro:db";
import { createGuestToken, verifyGuestToken } from "./utils/jwt";
import { authStore } from "@/stores/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, locals, redirect } = context;

  // 1. Check for 'i' query parameter (Login attempt)
  const idParam = url.searchParams.get("i");

  if (idParam) {
    // Validate format: 5 chars, alphanumeric (basic check)
    // We can also just query directly since strict checking is okay
    if (/^[a-zA-Z0-9]{5}$/.test(idParam)) {
      const guest = await db
        .select()
        .from(Guest)
        .where(eq(Guest.id, idParam))
        .get();

      if (guest) {
        // Valid guest found. Create JWT with guest data and set session cookie.
        const token = await createGuestToken({
          id: guest.id,
          name: guest.name,
          confirmedGuests: guest.confirmedGuests,
          maxGuests: guest.maxGuests,
          status: guest.status as "PENDING" | "ACCEPTED" | "REJECTED",
        });

        cookies.set("guest_session", token, {
          path: "/",
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        // Redirect to clean URL
        url.searchParams.delete("i");
        return redirect(url.toString(), 302);
      }
    }
    // Invalid ID or format -> Clean URL and continue as public
    url.searchParams.delete("i");
    return redirect(url.toString(), 302);
  }

  // 2. Check for session cookie with JWT
  const sessionCookie = cookies.get("guest_session");
  if (sessionCookie && sessionCookie.value) {
    const token = sessionCookie.value;
    // Verify JWT token and extract guest data (no DB query needed!)
    const guestData = await verifyGuestToken(token);

    if (guestData) {
      locals.user = {
        id: guestData.id,
        name: guestData.name,
        confirmedGuests: guestData.confirmedGuests,
        maxGuests: guestData.maxGuests,
        status: guestData.status,
      };

      // Initialize authStore with user data
      authStore.set(locals.user);
    } else {
      // Invalid or expired token
      cookies.delete("guest_session", { path: "/" });
    }
  }

  return next();
});
