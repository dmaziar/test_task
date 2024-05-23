import { test, expect } from '@playwright/test';
import Helper from './pages/helper';

test('Make a screenshot', async ({ page }) => {
	const helper = new Helper(page);
	await page.goto('/');
	await helper.removeAnimation();
	await expect(page).toHaveScreenshot({ fullPage: true });
	await helper.loginToAdmin(process.env.USERNAME, process.env.PASSWORD);
	await page.goto('/?elementor');
	await expect(page.getByTitle('I\'m Alex Daniels')).toBeVisible();
	await helper.setCustomCssValue('#main h1{font-size: 100px}');
	await expect(page).toHaveScreenshot({ fullPage: true });
	await helper.setCustomCssValue('');
});
