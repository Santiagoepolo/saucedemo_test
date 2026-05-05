import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
export class CheckoutPage extends BasePage {
    private readonly itemPrices: Locator;
    private readonly totalLabel: Locator;
    private readonly paymentInfoText: Locator;
    private readonly shippingInfoText: Locator;
    private readonly priceTotalText: Locator;
    private readonly finishButton: Locator;


    constructor(page: Page) {
        super(page);
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.paymentInfoText = page.getByText('Payment Information');
        this.shippingInfoText = page.getByText('Shipping Information');
        this.priceTotalText = page.getByText('Price Total');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }
    async verifyTotalWithTax(): Promise<void> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const subtotal = prices.reduce((sum, price) => sum + parseFloat(price.replace('$', '')), 0);
    const expectedTotal = subtotal * 1.08;
    const totalText = await this.page.locator('[data-test="total-label"]').textContent();
    const displayedTotal = parseFloat(totalText?.replace('Total: $', '') || '0');
    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
}

    async expectedPaymentFields(): Promise<void> {
        await expect(this.paymentInfoText).toBeVisible();
        await expect(this.shippingInfoText).toBeVisible();
        await expect(this.priceTotalText).toBeVisible();
        await this.finishButton.click();
}}