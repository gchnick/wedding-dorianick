import { test, expect } from "@playwright/test";
import { SignJWT } from "jose";

test.describe("RSVP Flow", () => {
  let token: string;

  test.beforeAll(async () => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const secret = new TextEncoder().encode(secretKey);

    // Generate token for the static test user (Test User from seed)
    // ID: "TEST0", Name: "Usuario Prueba"
    token = await new SignJWT({
      uid: "TEST0",
      name: "Usuario Prueba",
      pax: 2,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(secret);
  });

  test("Guest can confirm attendance", async ({ page }) => {
    // 1. Visit the page with the generated token
    await page.goto(`/?token=${token}`);

    // 2. Verify the user is recognized
    await expect(page.getByText("Hola, Usuario Prueba")).toBeVisible();
    await expect(page.getByText("2 cupos")).toBeVisible();

    // 3. Confirm attendance
    const confirmButton = page.getByRole("button", { name: "¡Sí, acepto!" });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // 4. Verify success message
    await expect(page.getByText("¡Gracias por confirmar!")).toBeVisible();
    await expect(
      page.getByText("Nos alegra mucho que nos acompañes, Usuario Prueba")
    ).toBeVisible();
  });
});
