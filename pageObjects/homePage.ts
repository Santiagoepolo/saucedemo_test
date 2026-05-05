import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    private readonly addToCartButton: Locator;
    private readonly shoppingCartIcon: Locator;
    private readonly shoppingCartBadge: Locator;
    private readonly removeProductFromCartButton: Locator;
    private readonly productText: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.shoppingCartIcon = page.locator('#shopping_cart_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge, [data-test="shopping-cart-badge"]');
        this.removeProductFromCartButton = page.getByRole('button', { name: 'Remove' });
        this.productText = page.getByText('Products');
    }

    async addToCartAleatoriProduct(): Promise<void> {
        const totalAddToCartButtons = await this.addToCartButton.count();

        if (totalAddToCartButtons > 0) {
            const randomIndex = Math.floor(Math.random() * totalAddToCartButtons);
            await this.addToCartButton.nth(randomIndex).click();
        } else {
            throw new Error('There are no items to add to cart');
        }
    }

    async expectShoppingCartIconCountIncrease(): Promise<number> {
    await expect(this.shoppingCartBadge).toBeVisible({ timeout: 10000 });
    const badgeText = await this.shoppingCartBadge.textContent();
    const actualCount = parseInt(badgeText || '0', 10);
    return actualCount;
}

    async addMultipleProductsToCart(): Promise<number> {
        const totalAvailable = await this.addToCartButton.count();

        if (totalAvailable === 0) {
            throw new Error('No hay productos disponibles para agregar');
        }

        const quantity = Math.floor(Math.random() * totalAvailable) + 1;

        for (let i = 0; i < quantity; i++) {
            const currentButtons = await this.addToCartButton.count();
            if (currentButtons === 0) break;
            const randomIndex = Math.floor(Math.random() * currentButtons);
            await this.addToCartButton.nth(randomIndex).click();
            await this.page.waitForTimeout(300);
        }

        return quantity;
    }

    async removeProductFromCart(): Promise<void> {
        const totalRemoveButtons = await this.removeProductFromCartButton.count();

        if (totalRemoveButtons > 0) {
            const randomIndex = Math.floor(Math.random() * totalRemoveButtons);
            await this.removeProductFromCartButton.nth(randomIndex).click();
        } else {
            throw new Error('There are no items to remove from cart');
        }
    }

    async goToCartPage(): Promise<void> {
        await this.shoppingCartIcon.click();
    }
    async validateImInHomePage(): Promise<void> {
        await expect(this.productText).toBeVisible();
    }
}