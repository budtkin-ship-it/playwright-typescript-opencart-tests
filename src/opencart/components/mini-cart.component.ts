import { expect, Locator, Page } from '@playwright/test';
import CartPage from '../pages/cart.page';

export default class MiniCartComponent {
  private readonly cartTotalButton: Locator;
  private readonly viewCartLink: Locator;

  constructor(private readonly page: Page) {
    this.cartTotalButton = this.page.locator('#cart-total');
    this.viewCartLink = this.page.getByRole('link', { name: /View Cart/ });
  }

  async expectItemsCount(count: number): Promise<void> {
    await expect(this.cartTotalButton).toContainText(`${count} item(s)`);
  }

  async openCartPage(): Promise<CartPage> {
    await this.cartTotalButton.click();
    await this.viewCartLink.click();

    return new CartPage(this.page);
  }
}
