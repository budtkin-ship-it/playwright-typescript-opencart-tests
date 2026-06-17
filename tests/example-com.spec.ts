import { test, expect } from '@playwright/test';

// test.describe() is a logical group of related tests.
// It allows us to organize tests in reports and apply shared setup/teardown logic,
// such as test.beforeEach() or test.afterEach(), only to tests inside this block.
test.describe('Example.com page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/');
  });

  test('should have correct heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Example Domain' });

    await expect(heading).toBeVisible();
  });

  test('should navigate to more information page', async ({ page }) => {
    const learnMoreLink = page.getByRole('link', { name: 'Learn more' });

    await learnMoreLink.click();

    await expect(page).toHaveURL(/iana.org/);
  });
});