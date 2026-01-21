import { test, expect } from "@playwright/test";

test.describe("RSVP Flow", () => {
  const guestId = "TEST0"; // ID from db/seed.ts

  test("Guest can see maximum number of allowed guests", async ({ page }) => {
    // 1. Visit the page with the NanoID (no JWT needed)
    await page.goto(`/?i=${guestId}`);

    // 2. Verify the URL is cleaned up
    await expect(page).toHaveURL(/^(?!.*i=).*$/);

    // 3. Verify guest name is displayed
    await expect(page.getByText("Hola, Usuario Prueba")).toBeVisible();

    // 4. Verify maximum guests is displayed
    // According to db/seed.ts, TEST0 has maxGuests: 2
    await expect(page.getByText("2 cupos")).toBeVisible();
    await expect(page.getByText(/Tienes.*2 cupos.*reservados/)).toBeVisible();
  });

  test("Guest can confirm attendance", async ({ page }) => {
    // 1. Visit the page with the NanoID (no JWT needed)
    await page.goto(`/?i=${guestId}`);

    // 2. Verify the user is recognized
    // The URL should be cleaned up
    await expect(page).toHaveURL(/^(?!.*i=).*$/);

    // Verify content
    await expect(page.getByText("Hola, Usuario Prueba")).toBeVisible();

    // 3. Confirm attendance
    const confirmButton = page.getByRole("button", { name: "¡Sí, acepto!" });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // 4. Verify success message
    await expect(page.getByText("¡Gracias por confirmar!")).toBeVisible();
    await expect(
      page.getByText("Nos alegra mucho que nos acompañes, Usuario Prueba"),
    ).toBeVisible();
  });
});
