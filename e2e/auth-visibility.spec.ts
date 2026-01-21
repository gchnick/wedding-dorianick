import { test, expect } from "@playwright/test";

test.describe("Auth Visibility", () => {
  test("Unauthenticated user sees fallback content and hidden sections", async ({
    page,
  }) => {
    // 1. Visit home without auth
    await page.goto("/");

    // 2. Check Hero CTA
    // Should see "Transmisión por Zoom"
    const zoomButton = page
      .locator("#hero-cta a")
      .filter({ hasText: "Transmisión en vivo" });
    await expect(zoomButton).toBeVisible();
    await expect(zoomButton).toHaveAttribute("href", "#live-stream");

    // Should NOT see "Confirmar Asistencia"
    const confirmButton = page
      .locator("#hero-cta a")
      .filter({ hasText: "Confirmar Asistencia" });
    await expect(confirmButton).not.toBeVisible();

    // 3. Check Timeline Section
    // The section with ID 'itinerary' (from anchor) or text "Itinerario" should be hidden
    // Note: The anchor is <Anchor id="itinerary"/> which is empty span, but the section follows.
    // The Title "Itinerario" is inside the section.
    const itineraryTitle = page.getByRole("heading", { name: "Itinerario" });
    await expect(itineraryTitle).not.toBeVisible();

    // 4. Check Header Links
    // "Agenda" and "RSVP" should be hidden
    const agendaLink = page.locator("nav a").filter({ hasText: "Agenda" });
    const rsvpLink = page.locator("nav a").filter({ hasText: "RSVP" });
    await expect(agendaLink).not.toBeVisible();
    await expect(rsvpLink).not.toBeVisible();
  });

  test("Authenticated user sees full content and no Hero CTA", async ({
    page,
  }) => {
    // 1. Visit home with valid ID (TEST0 from seed)
    await page.goto("/?i=TEST0");

    // 2. Check Hero CTA
    // Should NOT see "Transmisión en vivo"
    const zoomButton = page
      .locator("#hero-cta a")
      .filter({ hasText: "Transmisión en vivo" });
    await expect(zoomButton).not.toBeVisible();

    // Should NOT see "Confirmar Asistencia" (as per user request to hide it for auth)
    const confirmButton = page
      .locator("#hero-cta a")
      .filter({ hasText: "Confirmar Asistencia" });
    await expect(confirmButton).not.toBeVisible();

    // 3. Check Timeline Section
    // Should be visible
    const itineraryTitle = page.getByRole("heading", { name: "Itinerario" });
    await expect(itineraryTitle).toBeVisible();

    // 4. Check Header Links
    // "Agenda" and "RSVP" should be visible
    const agendaLink = page.locator("nav a").filter({ hasText: "Agenda" });
    const rsvpLink = page.locator("nav a").filter({ hasText: "RSVP" });
    await expect(agendaLink).toBeVisible();
    await expect(rsvpLink).toBeVisible();
  });
});
