import { test, expect } from '@playwright/test';
import { YourInfoPage } from '../../pageObjects/yourInfoPage';
import { BasePage } from '../../pageObjects/basePage';
import { LoginPage } from '../../pageObjects/loginPage';
import { CartPage } from '../../pageObjects/cartPage';
import { HomePage } from '../../pageObjects/homePage';

test.describe('Your Info', () => {
    test('4.1. successfully fill in your info', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const yourInfoPage = new YourInfoPage(page);
        const cartPage = new CartPage(page);
        const homePage = new HomePage(page);
        await loginPage.visit();
        await loginPage.fillLoginForm('standard_user', 'secret_sauce');
        await homePage.addMultipleProductsToCart();
        await homePage.goToCartPage()
        await cartPage.compareNumberOfItemsInCart();
        await cartPage.selectCheckoutButton();
        await yourInfoPage.completeYourInfoForm('Santiago', 'Polo', '0800011');
    });
});