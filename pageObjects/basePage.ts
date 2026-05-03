import { expect, Locator, Page} from '@playwright/test';
export class BasePage {
    constructor(protected page: Page){
    }

    async visit(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
        await expect(this.page.locator('.login_logo')).toContainText('Swag Labs');

    }
}