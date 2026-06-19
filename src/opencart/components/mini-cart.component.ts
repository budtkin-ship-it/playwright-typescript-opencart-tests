import { Locator, Page } from '@playwright/test';

export default class MiniCartComponent {
  private readonly cartTotalButton: Locator;
  private readonly viewCartLink: Locator;

  constructor(private readonly page: Page) {
    this.cartTotalButton = this.page.locator('#cart-total');
    this.viewCartLink = this.page.getByRole('link', { name: /View Cart/ });
  }

  async openCartPage() {
    await this.cartTotalButton.click();
    await this.viewCartLink.click();
  }
}
