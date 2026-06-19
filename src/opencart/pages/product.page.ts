import { Locator, Page } from '@playwright/test';

export default class ProductPage {
  private readonly addToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = this.page.locator('#button-cart');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
