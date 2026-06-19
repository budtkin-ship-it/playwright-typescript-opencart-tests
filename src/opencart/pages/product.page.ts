import { expect, Locator, Page } from '@playwright/test';

export default class ProductPage {
  private readonly heading: Locator;
  private readonly addToCartButton: Locator;
  private readonly successAlert: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = this.page.locator('#button-cart');
    this.heading = this.page.locator('div[id="content"] h1');
    this.successAlert = this.page.locator('.alert-success');
  }

  async expectProductName(productName: string): Promise<void> {
    await expect(this.heading).toHaveText(productName);
  }

  async expectAddToCartAvailable(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async expectProductAdded(productName: string): Promise<void> {
    await expect(this.successAlert).toContainText(
      `Success: You have added ${productName} to your shopping cart!`
    );
  }
}
