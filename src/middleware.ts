import { defineMiddleware } from "astro:middleware";
import { db, eq, Guest } from "astro:db";

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
        // Valid guest found. Set session cookie.
        cookies.set("guest_session", guest.id, {
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

  // 2. Check for session cookie
  const sessionCookie = cookies.get("guest_session");
  if (sessionCookie && sessionCookie.value) {
    const guestId = sessionCookie.value;
    // Verify guest exists (security check)
    const guest = await db
      .select()
      .from(Guest)
      .where(eq(Guest.id, guestId))
      .get();

    if (guest) {
      locals.user = {
        id: guest.id,
        name: guest.name,
        confirmedGuests: guest.confirmedGuests,
        maxGuests: guest.maxGuests,
        status: guest.status as "PENDING" | "ACCEPTED" | "REJECTED",
      };
    } else {
      // Invalid cookie (stale or forged user)
      cookies.delete("guest_session", { path: "/" });
    }
  }

  return next();
});
