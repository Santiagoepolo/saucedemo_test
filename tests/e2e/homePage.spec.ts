import { test, expect } from '@playwright/test';
import { HomePage } from '../../pageObjects/homePage';
import { BasePage } from '../../pageObjects/basePage';
import { LoginPage } from '../../pageObjects/loginPage';

test.describe('Home Page', () => {
    test('2.1. successfully add a product to the cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.visit();
        await loginPage.fillLoginForm('standard_user', 'secret_sauce');
        await homePage.addToCartAleatoriProduct();
        await homePage.expectShoppingCartIconCountIncrease();
    });
test('2.2. successfully add multiple products to the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.visit();
    await loginPage.fillLoginForm('standard_user', 'secret_sauce');
    await homePage.addMultipleProductsToCart();
    await homePage.expectShoppingCartIconCountIncrease();
});
test('2.3. successfully remove a product from the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.visit();
    await loginPage.fillLoginForm('standard_user', 'secret_sauce');
    await homePage.addMultipleProductsToCart();
    await homePage.removeProductFromCart();
    await homePage.expectShoppingCartIconCountIncrease();
});
});