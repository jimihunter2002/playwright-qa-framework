import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
  }
}
