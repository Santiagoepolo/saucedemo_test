import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
export class CompletePage extends BasePage {
    private readonly thankYouText: Locator;
    private readonly checkMarkIcon: Locator;
    private readonly yourOrderText: Locator;
    private readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.thankYouText = page.getByText('Thank you for your order!');
        this.checkMarkIcon = page.getByRole('img', { name: 'Pony Express' });
        this.yourOrderText = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });

    }
    async verifyThankYouMessage(): Promise<void> {
        await expect(this.thankYouText).toBeVisible();
        await expect(this.checkMarkIcon).toBeVisible();
        await expect(this.yourOrderText).toBeVisible(); 
        await this.backHomeButton.click();
    }
}