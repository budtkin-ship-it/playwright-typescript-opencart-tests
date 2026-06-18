import { test, expect } from '@playwright/test';

test.describe('TodoMVC app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should add a new todo item', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    await newTodoInput.fill('Learn Playwright');

    await newTodoInput.press('Enter');

    const todoItem = page.getByText('Learn Playwright');

    await expect(todoItem).toBeVisible();
  });
});