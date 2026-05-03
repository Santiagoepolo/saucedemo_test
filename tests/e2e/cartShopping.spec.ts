import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import { CartPage } from '../../pageObjects/cartPage';
import { BasePage } from '../../pageObjects/basePage';
import { HomePage } from '../../pageObjects/homePage';

test.describe('Cart Shopping', () => {
    test('3.1. successfully add a product to the cart and checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        const homePage = new HomePage(page);
        await loginPage.visit();
        await loginPage.fillLoginForm('standard_user', 'secret_sauce');
        await homePage.addMultipleProductsToCart(2);
        await homePage.goToCartPage()
        await cartPage.compareNumberOfItemsInCart();
        await cartPage.selectCheckoutButton();

    });
});