import { expect, Locator, Page } from '@playwright/test';

export default class CartPage {
  private readonly cartTable: Locator;
  private readonly cartRows: Locator;
  private readonly checkoutLink: Locator;

  constructor(private readonly page: Page) {
    this.cartTable = this.page.locator('#content table.table-bordered').first();
    this.cartRows = this.cartTable.locator('tbody tr');
    this.checkoutLink = this.page.locator('#content').getByRole('link', { name: 'Checkout' });
  }

  async expectProductVisible(productName: string): Promise<void> {
    const productLink = this.cartTable.locator('a', { hasText: productName });

    await expect(productLink).toHaveText(productName);
  }

  async expectProductsCount(count: number): Promise<void> {
    await expect(this.cartRows).toHaveCount(count);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutLink.click();
  }
}
