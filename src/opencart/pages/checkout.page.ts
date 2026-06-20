import { expect, Locator, Page } from '@playwright/test';

export default class CheckoutPage {
  private readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = this.page.locator('div[id="checkout-checkout"] h1');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/route=checkout\/checkout/);
    await expect(this.heading).toHaveText('Checkout');
  }
}
