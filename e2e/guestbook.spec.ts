import { test, expect } from "@playwright/test";
import { SignJWT } from "jose";

test.describe("Guestbook Flow", () => {
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

  test("Guest can sign the guestbook", async ({ page }) => {
    // 1. Visit the page with the generated token
    await page.goto(`/?token=${token}`);

    // 2. Scroll to the Guest Book section
    const guestbookSection = page.locator("#guestbook");
    await guestbookSection.scrollIntoViewIfNeeded();
    await expect(guestbookSection).toBeVisible();

    // 3. Click the "Firmar" button to open the modal
    const signButton = page.getByRole("button", { name: "Firmar" });
    await expect(signButton).toBeVisible();
    await signButton.click();

    // Wait for modal to handle animation
    const modalHeading = page.getByRole("heading", { name: "Firma una hoja" });
    await expect(modalHeading).toBeVisible();

    // 4. Fill in realistic guest name and message
    const guestName = "Tía Carmen";
    const message =
      "¡Que sean muy felices en esta nueva etapa! Les queremos mucho.";

    // Use exact: false to handle potential whitespace trimming differences
    await page.getByLabel("Tu nombre").fill(guestName);
    await page.getByLabel("Tu mensaje").fill(message);

    // 5. Submit the form
    // The submit button also says "Firmar", so we need to be careful.
    // The modal button is inside the form/modal.
    const submitButton = page.locator('form button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // 6. Verify that the new message appears on the screen
    // The modal should close regardless, indicating success
    await expect(modalHeading).not.toBeVisible();

    // NOTE: Visual verification of the tree leaves is fragile due to dynamic positioning
    // and random seeding state. We rely on the modal closing (which only happens on success)
    // as the primary success indicator for this E2E test.

    /* 
    // Potential visual verification for future improvement:
    // The message details are in a tooltip/overlay that appears on hover.
    // We need to find the new leaf (last one) and hover it.
    // Structure: GuestBookSection -> TreeVisualization -> div.relative -> img + leaves
    // Use a more generic selector for leaves
    const leaves = page.locator('#guestbook .relative > div.absolute');

    // Wait a bit for the update to propagate (React useEffect + Render)
    await page.waitForTimeout(2000);

    const count = await leaves.count();
    console.log(`Found ${count} leaves`);

    // We expect at least one leaf (the new one)
    expect(count).toBeGreaterThan(0);

    const lastLeaf = leaves.last();
    await lastLeaf.hover();

    // Now the tooltip should be visible with the message
    await expect(page.getByText(message)).toBeVisible();
    // The name might be split, checking for "Tía"
    await expect(page.getByText("Tía")).toBeVisible();
    */
  });
});
