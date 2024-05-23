import { expect, type Page } from '@playwright/test';

export default class Helper {
	readonly page: Page;
	constructor (page: Page) {
		this.page = page;
	}
	async loginToAdmin (user: string, pw: string) {
		await this.page.goto('/wp-login.php');
		await this.page.locator('#user_login').fill(user);
		await this.page.locator('#user_pass').fill(pw);
		await this.page.locator('#wp-submit').click();
		await expect(this.page.locator('#wpbody')).toBeVisible();
	}

	async removeAnimation()  {
		await this.page.evaluate(()=>{
			document.querySelector('.elementor-motion-effects-element').remove();
			document.querySelector('.elementor-image-carousel-wrapper.swiper').remove();
		});
	}

	async setCustomCssValue(value: string) {
		await this.page.evaluate((value)=>{
			$e.run('document/elements/settings', {
				container: elementor.getPreviewContainer(),
				settings: { custom_css: value }
			});
			$e.run( 'document/save/default' );
		}, value);
	}
}
