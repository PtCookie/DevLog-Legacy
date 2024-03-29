import { test, expect } from '@playwright/test';
import { i18n } from '@/lib/i18n';

test.describe('Homepage', () => {
  test('should has title and links to posts page', async ({ page }) => {
    const { defaultLocale } = i18n;

    await page.goto('/');
    await expect(page).toHaveTitle(/PtCookie\.DevLog/);

    const locator = page.getByRole('link', { name: 'posts' });
    await expect(locator).toHaveAttribute('href', `/${defaultLocale}/posts`);

    await locator.click();
    await expect(page).toHaveURL(/posts/);
  });

  test('should change locale by switch', async ({ page }) => {
    await page.goto('/');

    const locator = page.getByRole('heading', { name: /PtCookie\.DevLog/ });
    await expect(locator).toHaveText(/안녕하세요/);

    const localeButton = page.getByText('en');
    await localeButton.click();
    await expect(page).toHaveURL(/en/);

    await expect(locator).toHaveText(/Hello/);
  });
});
