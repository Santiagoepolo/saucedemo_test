import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
export class HomePage extends BasePage {
    private readonly addToCartButton: Locator;
    private readonly shoppingCartIcon: Locator;
    private readonly shoppingCartBadge: Locator;
    private readonly removeProductFromCartButton: Locator;
    constructor (page: Page){
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.shoppingCartIcon = page.getByTestId('shopping_cart_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge, [data-test="shopping-cart-badge"]');
        this.removeProductFromCartButton = page.getByRole('button', { name: 'Remove' });
    }

    async addToCartAleatoriProduct(): Promise<void> {
        const totalAddToCartButtons= await this.addToCartButton.count();

        if(totalAddToCartButtons > 0){
            const randomIndex = Math.floor(Math.random() * totalAddToCartButtons);
            await this.addToCartButton.nth(randomIndex).click();
        } else { throw new Error('There are no items to add to cart');
        }
}
    async expectShoppingCartIconCountIncrease(expectedCount: number): Promise<void> {
        if (expectedCount === 0) {
            await expect(this.shoppingCartBadge).not.toBeVisible();
        } else {
            await expect(this.shoppingCartBadge).toBeVisible({ timeout: 10000 });
            await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
        }
    }
    async addMultipleProductsToCart(quantity: number): Promise<void> {
        const availableAddButtons = await this.addToCartButton.all();
        if (availableAddButtons.length === 0) {
        throw new Error('No hay productos disponibles para agregar');
    }
    if (quantity > availableAddButtons.length) {
        throw new Error(`Solo hay ${availableAddButtons.length} productos disponibles, pero quieres agregar ${quantity}`);
    }
    for (let i = 0; i < quantity; i++) {
        const buttons = await this.addToCartButton.all();
        const randomIndex = Math.floor(Math.random() * buttons.length);
        await this.addToCartButton.nth(randomIndex).click();
        await this.page.waitForTimeout(300);
    }

    }

    async removeProductFromCart(): Promise<void> {
        const totalRemoveButtons = await this.removeProductFromCartButton.count();
        if(totalRemoveButtons > 0){
            const randomIndex = Math.floor(Math.random() * totalRemoveButtons);
            await this.removeProductFromCartButton.nth(randomIndex).click();
        } else { throw new Error('There are no items to remove from cart');
        }

}
    async goToCartPage(): Promise<void> {
        await this.page.waitForSelector('[data-test="shopping_cart_container"]', {
        timeout: 10000,
        state: 'visible'
    });
        await this.shoppingCartIcon.click();
    }
}