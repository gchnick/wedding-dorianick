import { test, expect } from "@playwright/test";

test.describe("Guestbook Tree Visualization", () => {
  const guestId = "TEST0"; // ID from db/seed.ts

  test("Render 200 leaves on the tree", async ({ page }) => {
    // 1. Visit the page
    await page.goto(`/?i=${guestId}`);

    // 2. Scroll to the Guest Book section
    const guestbookSection = page.locator("#guestbook");
    await guestbookSection.scrollIntoViewIfNeeded();

    // 3. Wait for leaves to appear
    // The leaves are divs with absolute positioning inside the tree container
    // We can target them by a class that we know they have, like 'hover:scale-110'
    // or we can add a specific test-id to the leaves in the component if needed.
    // Based on previous code: className={`absolute cursor-pointer ... hover:scale-110`}

    // Let's use a selector that targets the leaf containers
    const leaves = guestbookSection.locator(
      ".relative > div.absolute.cursor-pointer",
    );

    // Wait for at least some leaves to be present
    await expect(leaves.first()).toBeVisible();

    // 4. Verification
    // We expect 200 leaves from the seed data
    // Note: The count might be slightly off if any message failed to load or similar,
    // but with static seed it should be exact.
    await expect(leaves).toHaveCount(200);

    // Optional: Take a screenshot to verify visual distribution
    // await page.screenshot({ path: 'tree-visualization.png' });
  });
});
