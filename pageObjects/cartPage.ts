import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { HomePage } from './homePage';
import { LoginPage } from './loginPage';
export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartItems: Locator;
    constructor (page: Page){
        super(page);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Go back Continue Shopping' });
        this.cartItems = page.locator('.cart_item');

    }
    async selectCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
}
    async selectContinueShoppingButton(): Promise<void> {
        await this.continueShoppingButton.click();
    }
    async compareNumberOfItemsInCart():Promise<void> {
        const homePage = new HomePage(this.page);
        await this.page.waitForSelector('.cart_item', { timeout: 10000 });
        const totalItemsInCart = await this.cartItems.count();
        const badge = this.page.locator('.shopping_cart_badge, [data-test="shopping-cart-badge"]');
        const isBadgeVisible = await badge.isVisible();
        if (totalItemsInCart === 0) {
            await expect(badge).not.toBeVisible();
        } else {
            await expect(badge).toBeVisible();
            const badgeText = await badge.textContent();
            expect(totalItemsInCart).toBe(parseInt(badgeText || '0', 10));
        }


    }
}